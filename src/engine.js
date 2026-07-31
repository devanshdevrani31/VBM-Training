/* ==========================================================================
   engine.js, state, progress, scoring, and the small helpers everything uses.
   ========================================================================== */
'use strict';

window.VBM = {
  data: { drills: {}, chapters: [], formulas: [], pattern: null, exams: [] }
};

(function (V) {

  /* ---------------- persistence ---------------- */
  const KEY = 'vbm_value_desk_v1';

  function blank() {
    return { xp: 0, streak: 0, best: 0, items: {}, chapters: {}, exams: {}, seen: 0, examDate: null, ack: false };
  }
  let S = blank();
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (raw && raw.items) S = Object.assign(blank(), raw);
  } catch (e) { /* first run */ }

  V.S = S;
  V.save = function () { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  /* Wiping progress keeps the acknowledgement and the exam date. They are
     settings, not score. */
  V.reset = function () {
    const keep = { ack: S.ack, examDate: S.examDate };
    S = Object.assign(blank(), keep); V.S = S; V.save();
  };

  /* item record: {n: attempts, ok: times cleared, rv: times revealed} */
  V.item = function (id) {
    if (!S.items[id]) S.items[id] = { n: 0, ok: 0, rv: 0 };
    return S.items[id];
  };

  /* ---------------- ranks ---------------- */
  const RANKS = [
    [0, 'Trainee'], [90, 'Junior Controller'], [220, 'Controller'],
    [400, 'Senior Controller'], [620, 'Group Controller'], [880, 'Head of Controlling'],
    [1200, 'VP Finance'], [1600, 'CFO'], [2100, 'Value Architect']
  ];
  V.rank = function () {
    let r = RANKS[0][1];
    for (const [t, n] of RANKS) if (S.xp >= t) r = n;
    return r;
  };
  V.nextRank = function () {
    for (const [t, n] of RANKS) if (S.xp < t) return { at: t, name: n };
    return null;
  };

  V.rail = function () {
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('xpval', S.xp);
    set('streakval', S.streak);
    set('rankchip', V.rank());
  };

  /* Award value. `pts` is the drill's exam-point weight; revealed answers earn nothing. */
  V.award = function (id, outcome, pts) {
    const it = V.item(id);
    it.n++;
    const base = Math.max(2, Math.round((pts || 4) * 1.5));
    if (outcome === 'clean') {          // right, no hints, no reveal
      it.ok++; S.xp += base + Math.min(S.streak, 6); S.streak++;
    } else if (outcome === 'guided') {  // right, but used hints
      it.ok++; S.xp += Math.round(base * 0.6); S.streak++;
    } else if (outcome === 'revealed') {
      it.rv++; S.streak = 0;
    } else {                            // 'wrong'
      S.streak = 0;
    }
    S.best = Math.max(S.best, S.streak);
    V.save(); V.rail();
  };

  /* mastery of a chapter: share of its drills cleared at least once */
  V.mastery = function (ch) {
    const ids = ch.drills;
    if (!ids.length) return 0;
    let done = 0;
    for (const id of ids) { const it = S.items[id]; if (it && it.ok > 0) done++; }
    return done / ids.length;
  };

  /* every drill of one kind, in module order */
  V.byKind = function (kind) {
    const out = [];
    for (const ch of V.data.chapters) {
      for (const id of ch.drills) {
        const d = V.data.drills[id];
        if (d && d.kind === kind) out.push(id);
      }
    }
    return out;
  };

  /* how many of a kind have been cleared at least once */
  V.clearedOf = function (ids) {
    return ids.filter(id => S.items[id] && S.items[id].ok > 0).length;
  };

  /* drills the learner got wrong or revealed and has never since cleared */
  V.weakItems = function () {
    const out = [];
    for (const ch of V.data.chapters) {
      for (const id of ch.drills) {
        const it = S.items[id];
        if (it && it.ok === 0 && (it.n > 0 || it.rv > 0)) out.push(id);
      }
    }
    return out;
  };

  /* ---------------- number parsing & formatting ---------------- */

  /* Accepts 6360 · 6,360 · 6.360 (German grouping) · 6 360 · -13140 · −13.140,50 ·
     (1,200) · 12.25% · 1.7926, and returns a Number, or NaN. */
  V.parseNum = function (raw) {
    if (raw == null) return NaN;
    let s = String(raw).trim();
    if (!s) return NaN;
    s = s.replace(/[\u2212\u2013\u2014]/g, '-').replace(/\s|'|_/g, '');
    let neg = false;
    if (/^\(.*\)$/.test(s)) { neg = true; s = s.slice(1, -1); }
    s = s.replace(/%$/, '').replace(/^EUR|^€|EUR$|€$/gi, '');
    if (s.startsWith('-')) { neg = !neg; s = s.slice(1); }
    if (s.startsWith('+')) s = s.slice(1);

    const hasDot = s.includes('.'), hasCom = s.includes(',');
    if (hasDot && hasCom) {
      // whichever separator comes last is the decimal mark
      if (s.lastIndexOf(',') > s.lastIndexOf('.')) s = s.replace(/\./g, '').replace(',', '.');
      else s = s.replace(/,/g, '');
    } else if (hasCom) {
      // 1,234 / 1,234,567 → grouping;  0,5 / 12,345678 → decimal comma
      s = /^\d{1,3}(,\d{3})+$/.test(s) ? s.replace(/,/g, '') : s.replace(',', '.');
    } else if (hasDot) {
      // Two or more dot-groups can only be German grouping: 1.234.567
      // A single group (28.389) is genuinely ambiguous. Treat it as a decimal
      // here, and let V.nums() offer the grouped reading as an alternative.
      if (/^\d{1,3}(\.\d{3}){2,}$/.test(s)) s = s.replace(/\./g, '');
    }
    if (!/^\d*\.?\d+$/.test(s) && !/^\d+\.?\d*$/.test(s)) return NaN;
    const n = parseFloat(s);
    if (!isFinite(n)) return NaN;
    return neg ? -n : n;
  };

  /* Every plausible reading of what the learner typed. "6.360" could be 6.36
     (English decimal) or 6,360 (German grouping); "1,234" could be 1234 or
     1.234. We accept whichever one matches, so keyboard habits never cost a
     mark, but a genuinely wrong number still fails both readings. */
  V.nums = function (raw) {
    const primary = V.parseNum(raw);
    const out = isFinite(primary) ? [primary] : [];
    const s = String(raw == null ? '' : raw).trim().replace(/[\u2212\u2013\u2014]/g, '-').replace(/\s|'|_/g, '');
    const grouped = /^[-+]?\d{1,3}\.\d{3}$/.test(s);   // 6.360  → also 6360
    const decimal = /^[-+]?\d{1,3},\d{3}$/.test(s);    // 1,234  → also 1.234
    if (grouped && isFinite(primary)) out.push(primary * 1000);
    if (decimal && isFinite(primary)) out.push(primary / 1000);
    return out;
  };

  /* Rounding is explicitly tolerated by the official keys, so be generous:
     0.5 % relative, or an absolute floor, whichever is larger. */
  V.numOk = function (given, expected, tol) {
    if (!isFinite(given)) return false;
    const abs = tol != null ? tol : Math.max(Math.abs(expected) * 0.005, 0.51);
    return Math.abs(given - expected) <= abs;
  };

  /* Does anything the learner could have meant hit the target? */
  V.hits = function (raw, expected, tol) {
    return V.nums(raw).some(n => V.numOk(n, expected, tol));
  };

  V.fmt = function (n, dp) {
    if (n == null || !isFinite(n)) return '';
    const d = dp != null ? dp : (Math.abs(n % 1) > 1e-9 ? (Math.abs(n) < 10 ? 4 : 2) : 0);
    return n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  };

  /* ---------------- text helpers ---------------- */
  /* Escapes quotes too, learner input is interpolated into value="…". */
  V.esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };
  /* For prose: strip punctuation so keyword matching is forgiving. */
  V.norm = function (s) {
    return String(s).toLowerCase()
      .replace(/[\u2212\u2013\u2014]/g, '-')
      .replace(/[^a-z0-9%+\-*/=(). ]/g, ' ')
      .replace(/\s+/g, ' ').trim();
  };

  /* For formula tokens: keep EVERY symbol. × must not compare equal to ÷,
     and > must not compare equal to <, or the formula drills would accept a
     wrong formula. Only case and whitespace are ignored. */
  V.tnorm = function (s) {
    return String(s).toLowerCase().replace(/[\u2212\u2013\u2014]/g, '-').replace(/\s+/g, '');
  };
  V.shuffle = function (a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };

  /* ---------------- the exam date ----------------
     Deliberately not hardcoded: the exam moves every year, and this trainer
     should still work for whoever is sitting it next. The learner sets it. */
  V.setExamDate = function (iso) {
    S.examDate = (iso && /^\d{4}-\d{2}-\d{2}$/.test(iso)) ? iso : null;
    V.save();
  };
  V.examDate = function () { return S.examDate || null; };

  /* Whole days from today until the exam, or null if no date has been set.
     Both sides are floored to local midnight so "tomorrow" is always 1. */
  V.daysLeft = function () {
    if (!S.examDate) return null;
    const p = S.examDate.split('-').map(Number);
    const target = new Date(p[0], p[1] - 1, p[2]);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((target - today) / 86400000);
  };

  V.prettyDate = function (iso, opts) {
    if (!iso) return '';
    const p = iso.split('-').map(Number);
    return new Date(p[0], p[1] - 1, p[2]).toLocaleDateString(undefined,
      opts || { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  /* The date a given day of the N-day plan falls on, counting back from the
     exam so that the last plan day is the day before the paper. */
  V.planDate = function (day, totalDays) {
    if (!S.examDate) return null;
    const p = S.examDate.split('-').map(Number);
    const d = new Date(p[0], p[1] - 1, p[2]);
    d.setDate(d.getDate() - (totalDays - day + 1));
    return d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
  };

  /* ---------------- registration ---------------- */
  V.reg = function (list) {
    for (const d of list) {
      if (V.data.drills[d.id]) console.warn('duplicate drill id: ' + d.id);
      V.data.drills[d.id] = d;
    }
  };

})(window.VBM);
