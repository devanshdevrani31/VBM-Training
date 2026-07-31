/* ==========================================================================
   app.js — screens and routing.
   ========================================================================== */
'use strict';

(function (V) {

  const SC = () => document.getElementById('screen');
  const TIERNAME = { 1: 'do first', 2: 'high', 3: 'last' };

  /* The exam date is whatever the learner tells us — nothing is baked in, so
     this still works for next year's cohort. */
  function countdown(dl) {
    const iso = V.examDate();
    const shape = 'The format has been stable for a decade: <b>MC (20 points) plus three open questions ' +
      '(100) = 120 points in 120 minutes</b> — one point per minute. No formula sheet, tables drawn by hand.';
    if (!iso) {
      return '<div class="banner"><div><div class="big">?</div><div class="lbl">exam date</div></div>' +
        '<div class="txt"><b>Set your exam date</b> to switch on the countdown and to date the study plan. ' +
        shape + '</div>' +
        '<div><input type="date" id="exdate" style="background:var(--panel2);border:1px solid var(--line);' +
        'color:var(--ink);border-radius:7px;padding:8px 10px;font:inherit;font-size:13px">' +
        '<button class="btn sm" style="margin-left:8px" onclick="VBM.saveDate()">Set</button></div></div>';
    }
    const label = dl > 1 ? 'days left' : dl === 1 ? 'day left — tomorrow' : dl === 0 ? 'today' : 'days ago';
    const cls = dl != null && dl <= 2 && dl >= 0 ? ' style="border-left-color:var(--bad)"' : '';
    return '<div class="banner"' + cls + '><div><div class="big">' + Math.abs(dl) + '</div>' +
      '<div class="lbl">' + label + '</div></div>' +
      '<div class="txt"><b>' + V.prettyDate(iso) + '.</b> ' + shape + '</div>' +
      '<div><button class="btn ghost sm" onclick="VBM.clearDate()">Change date</button></div></div>';
  }

  V.saveDate = function () {
    const el = document.getElementById('exdate');
    if (!el || !el.value) return;
    V.setExamDate(el.value); home();
  };
  V.clearDate = function () { V.setExamDate(null); home(); };

  /* An entry notice, shown once per device before the desk is usable. This is
     a student project, not courseware, and that has to be said up front. */
  V.gate = function () {
    if (V.S.ack) return;
    const el = document.createElement('div');
    el.id = 'gate';
    el.innerHTML =
      '<div class="box" role="dialog" aria-modal="true" aria-labelledby="gt">' +
      '<div class="eyebrow">Before you start</div>' +
      '<h2 id="gt">This is not an official course resource</h2>' +
      '<p>The Value Desk is a <b>student-built revision tool</b>. It is <b>not affiliated with, produced by, ' +
      'or endorsed by TUM, the TUM School of Management, or the chair that teaches this course.</b></p>' +
      '<p>Every drill was transcribed by hand from past papers, published solutions, lecture slides and ' +
      'problem sets. It may contain <b>transcription errors, stale content, or wrong interpretations</b>, and ' +
      'exam format, scope and conventions change between years. Drills say so where a convention is ambiguous ' +
      'or a figure was derived rather than taken from an official answer key.</p>' +
      '<div class="src"><b>Your lecture slides, exercise sheets and the official solutions are the source of ' +
      'truth.</b> Where this tool disagrees with them, they are right and it is wrong.</div>' +
      '<p>Use it to drill mechanics and spot patterns — not as your only source, and not as a substitute for ' +
      'the course material.</p>' +
      '<div class="btnrow"><button class="btn" onclick="VBM.ack()">Understood — open the desk</button></div>' +
      '</div>';
    document.body.appendChild(el);
    const b = el.querySelector('button'); if (b) b.focus();
  };

  V.ack = function () {
    V.S.ack = true; V.save();
    const el = document.getElementById('gate'); if (el) el.remove();
  };

  V.showNotice = function () { V.S.ack = false; V.gate(); };

  function meter(frac) {
    const n = 8, on = Math.round(frac * n);
    let h = '<div class="meter">';
    for (let i = 0; i < n; i++) h += '<i class="' + (i < on ? 'on' : '') + '"></i>';
    return h + '<span class="pct">' + Math.round(frac * 100) + '%</span></div>';
  }

  /* ============================================================ HOME */
  function home() {
    const dl = V.daysLeft();
    const weak = V.weakItems();
    let h = '';

    h += countdown(dl);

    h += '<h1>The Value Desk</h1>';
    h += '<p class="sub">A training floor for TUM Value-based Management. Every number here is ' +
      'transcribed from a past paper and checked against the official answer key. Work the modules ' +
      'top-down — they are ordered by points per hour of study, not by lecture order.</p>';

    const nr = V.nextRank();
    h += '<div class="qnote" style="margin-bottom:18px">Rank <b>' + V.rank() + '</b> · ' +
      V.S.xp + ' EVA' + (nr ? ' — ' + (nr.at - V.S.xp) + ' more to reach <b>' + nr.name + '</b>' : ' — top rank reached') +
      (V.S.best > 1 ? ' · best streak ' + V.S.best : '') + '</div>';

    if (weak.length) {
      h += '<div class="eyebrow">Review queue</div>';
      h += '<div class="rows"><button class="row" onclick="VBM.runList(\'review\')">' +
        '<span class="idx">↻</span><span class="body"><span class="t">' + weak.length +
        ' drill' + (weak.length === 1 ? '' : 's') + ' to redo</span>' +
        '<span class="d">Things you got wrong or revealed and have not yet cleared. Clear these first — they are your cheapest marks.</span>' +
        '</span></button></div>';
    }

    h += '<div class="eyebrow">Training modules</div><div class="rows">';
    for (const ch of V.data.chapters) {
      const m = V.mastery(ch);
      h += '<button class="row" onclick="VBM.go(\'chapter\',\'' + ch.id + '\')">';
      h += '<span class="idx">' + ch.n + '</span>';
      h += '<span class="body"><span class="t">' + ch.title + '</span><span class="d">' + ch.blurb + '</span></span>';
      h += '<span class="rt"><span class="badge t' + ch.tier + '">' + TIERNAME[ch.tier] + '</span>' +
        '<span class="hit">' + ch.hit + '</span>' + meter(m) + '</span>';
      h += '</button>';
    }
    h += '</div>';

    h += '<div class="eyebrow">The exam room</div><div class="rows">';
    for (const x of V.data.exams) {
      const st = V.S.exams[x.id];
      h += '<button class="row exam" onclick="VBM.go(\'exambrief\',\'' + x.id + '\')">';
      h += '<span class="idx">⏱</span>';
      h += '<span class="body"><span class="t">' + x.title + '</span><span class="d">' + x.sub + '</span></span>';
      h += '<span class="rt"><span class="hit">' + x.minutes + ' min</span>' +
        (st ? '<span class="hit">best ' + st.best + '%</span>' : '') + '</span></button>';
    }
    h += '</div>';

    h += '<div class="eyebrow">Reference</div><div class="rows">';
    h += '<button class="row" onclick="VBM.go(\'pattern\')"><span class="idx">▦</span><span class="body">' +
      '<span class="t">Pattern Board</span><span class="d">All eight past papers mapped topic by topic, the structural prediction, ' +
      'how marks are actually awarded, and the day-by-day plan.</span></span></button>';
    h += '<button class="row" onclick="VBM.go(\'vault\')"><span class="idx">ƒ</span><span class="body">' +
      '<span class="t">The Vault</span><span class="d">Every formula you must memorise, tier by tier, with the traps attached. ' +
      'No formula sheet is permitted in the exam.</span></span></button>';
    h += '</div>';

    h += '<p class="footnote">Unofficial student project — not affiliated with TUM; your course material is the ' +
      'source of truth. <button class="btn ghost sm" onclick="VBM.showNotice()">Read the notice</button><br><br>' +
      'Progress is saved in this browser only — nothing leaves your device. ' +
      '<button class="btn ghost sm" onclick="VBM.wipe()">Reset progress</button></p>';

    SC().innerHTML = h;
  }

  /* ============================================================ CHAPTER */
  function chapter(id) {
    const ch = V.data.chapters.find(c => c.id === id);
    if (!ch) return home();
    let h = '<div class="eyebrow">Module ' + ch.n + ' · ' + TIERNAME[ch.tier] + ' · appears on ' + ch.hit + '</div>';
    h += '<h1>' + ch.title + '</h1><p class="sub">' + ch.blurb + '</p>';
    h += '<div class="btnrow" style="margin:0 0 18px">' +
      '<button class="btn" onclick="VBM.runList(\'' + ch.id + '\')">Run the whole module</button>' +
      '<button class="btn ghost" onclick="VBM.go(\'home\')">Back to the desk</button></div>';

    h += '<div class="rows">';
    ch.drills.forEach((did, i) => {
      const d = V.data.drills[did];
      if (!d) return;
      const it = V.S.items[did];
      const state = !it ? '' : (it.ok > 0 ? 'cleared' : 'to redo');
      h += '<button class="row" onclick="VBM.runList(\'' + ch.id + '\',' + i + ')">';
      h += '<span class="idx">' + (i + 1) + '</span>';
      h += '<span class="body"><span class="t">' + d.title + '</span>' +
        '<span class="d">' + V.Drill.kinds[d.kind].tag + (d.source ? ' · ' + d.source.split('·')[0].trim() : '') + '</span></span>';
      h += '<span class="rt">' + (d.pts ? '<span class="hit">' + d.pts + ' pts</span>' : '') +
        (state ? '<span class="badge ' + (it.ok > 0 ? 't3' : 't2') + '">' + state + '</span>' : '') +
        '</span></button>';
    });
    h += '</div>';
    SC().innerHTML = h;
  }

  /* ============================================================ RUN A LIST */
  let RUN = null;

  V.runList = function (which, startAt) {
    let ids, title;
    if (which === 'review') { ids = V.weakItems(); title = 'Review queue'; }
    else {
      const ch = V.data.chapters.find(c => c.id === which);
      ids = ch.drills.slice(); title = ch.title;
    }
    if (!ids.length) return home();
    RUN = { ids, title, at: startAt || 0, back: which === 'review' ? 'home' : which, kind: which };
    step();
  };

  function step() {
    if (!RUN || RUN.at >= RUN.ids.length) {
      const t = RUN ? RUN.title : '';
      const back = RUN && RUN.kind !== 'review' ? RUN.kind : null;
      RUN = null;
      let h = '<h1>Module complete</h1><p class="sub">' + t + ' — every drill in the list is done. ' +
        'Anything you revealed is now in the review queue on the desk.</p><div class="btnrow">' +
        '<button class="btn" onclick="VBM.go(\'home\')">Back to the desk</button>' +
        (back ? '<button class="btn ghost" onclick="VBM.go(\'chapter\',\'' + back + '\')">Review this module</button>' : '') +
        '</div>';
      SC().innerHTML = h;
      return;
    }
    const id = RUN.ids[RUN.at];
    const hdr = '<div class="eyebrow plain" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">' +
      '<button class="btn ghost sm" onclick="VBM.go(\'home\')">← desk</button>' +
      '<span>' + RUN.title + ' · ' + (RUN.at + 1) + ' of ' + RUN.ids.length + '</span></div>';
    V.Drill.start(id, {
      mode: 'practice',
      label: RUN.title,
      last: RUN.at === RUN.ids.length - 1,
      headerHtml: hdr,
      onNext: () => { RUN.at++; step(); }
    });
  }

  /* ============================================================ EXAM */
  function exambrief(id) {
    const x = V.data.exams.find(e => e.id === id);
    if (!x) return home();
    const flat = x.parts.reduce((a, p) => a + p.drills.length, 0);
    const pts = x.parts.reduce((a, p) => a + p.drills.reduce((s, d) => s + (V.data.drills[d].pts || 0), 0), 0);
    let h = '<div class="eyebrow">Exam room</div><h1>' + x.title + '</h1>';
    h += '<p class="sub">' + x.sub + '</p>';
    h += '<div class="card"><div class="scoregrid">' +
      '<div><div class="k">Questions</div><div class="v">' + flat + '</div></div>' +
      '<div><div class="k">Points</div><div class="v">' + pts + '</div></div>' +
      '<div><div class="k">Time</div><div class="v">' + x.minutes + '\'</div></div>' +
      '</div>';
    h += '<div class="coach info" style="margin-top:14px"><div class="ch">House rules</div>' +
      '<p>No hints. No revealed answers. No feedback until you hand the paper in. ' +
      'One submission per question, then it is gone.</p><p>' + x.note + '</p></div>';
    h += '<div class="btnrow"><button class="btn" onclick="VBM.startExam(\'' + id + '\')">Begin — start the clock</button>' +
      '<button class="btn ghost" onclick="VBM.go(\'home\')">Not yet</button></div></div>';
    h += '<p class="footnote">Reminder: this is an unofficial student reconstruction of past papers. ' +
      'Point weights and wording are approximations of the originals, and auto-marking cannot judge a written ' +
      'argument the way a human examiner does. Treat the score as a rough signal, not a grade.</p>';
    SC().innerHTML = h;
  }

  let EX = null;

  V.startExam = function (id) {
    const x = V.data.exams.find(e => e.id === id);
    const flat = [];
    for (const p of x.parts) for (const d of p.drills) flat.push({ part: p.head, id: d });
    EX = { x, flat, at: 0, scores: [], t0: Date.now(), tick: null };
    EX.tick = setInterval(examTick, 1000);
    examStep();
  };

  function examTick() {
    const el = document.getElementById('timer');
    if (!el) return;
    const left = EX.x.minutes * 60 - Math.floor((Date.now() - EX.t0) / 1000);
    const m = Math.floor(Math.abs(left) / 60), s = Math.abs(left) % 60;
    el.textContent = (left < 0 ? '+' : '') + m + ':' + String(s).padStart(2, '0');
    el.className = left < 300 ? 'low' : '';
  }

  function examStep() {
    if (EX.at >= EX.flat.length) return examEnd();
    const q = EX.flat[EX.at];
    const hdr = '<div class="eyebrow plain" style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">' +
      '<span>' + EX.x.title + '</span><span>·</span><span>' + q.part + '</span>' +
      '<span style="flex:1"></span><span id="timer">' + EX.x.minutes + ':00</span>' +
      '<span>' + (EX.at + 1) + '/' + EX.flat.length + '</span></div>';
    V.Drill.start(q.id, {
      mode: 'exam', label: q.part, last: EX.at === EX.flat.length - 1, headerHtml: hdr,
      onDone: s => { EX.scores[EX.at] = s; },
      onNext: () => { EX.at++; examStep(); }
    });
    examTick();
  }

  function examEnd() {
    clearInterval(EX.tick);
    const x = EX.x;
    let got = 0, tot = 0;
    const rows = EX.flat.map((q, i) => {
      const d = V.data.drills[q.id];
      const s = EX.scores[i] || 0;
      got += s * (d.pts || 0); tot += (d.pts || 0);
      return { q, d, s };
    });
    const pct = tot ? Math.round(got / tot * 100) : 0;
    const mins = Math.round((Date.now() - EX.t0) / 60000);
    const prev = V.S.exams[x.id];
    if (!prev || pct > prev.best) V.S.exams[x.id] = { best: pct };
    V.S.xp += Math.round(got / 4);
    V.save(); V.rail();

    let h = '<div class="eyebrow">Paper handed in</div><h1>' + x.title + '</h1>';
    h += '<div class="card"><div class="bigscore">' + Math.round(got * 10) / 10 + ' <span style="font-size:20px;color:var(--muted)">/ ' + tot + '</span></div>';
    h += '<div class="scoregrid">' +
      '<div><div class="k">Score</div><div class="v">' + pct + '%</div></div>' +
      '<div><div class="k">Time taken</div><div class="v">' + mins + '\'</div></div>' +
      '<div><div class="k">Allowed</div><div class="v">' + x.minutes + '\'</div></div>' +
      '</div>';
    h += '<div class="coach ' + (mins <= x.minutes ? 'ok' : 'bad') + '" style="margin-top:14px"><div class="ch">Pace</div><p>' +
      (mins <= x.minutes
        ? 'Inside the time limit. The exam is exactly one point per minute, and you held it.'
        : 'You ran over by ' + (mins - x.minutes) + ' minutes. The real paper stops at ' + x.minutes +
        '. Practise hard-stopping each open question at 35 minutes and moving on.') + '</p></div>';
    h += '</div>';

    h += '<div class="eyebrow">Question by question</div><div class="rows">';
    let lastPart = null;
    rows.forEach((r, i) => {
      if (r.q.part !== lastPart) {
        lastPart = r.q.part;
        h += '<div class="eyebrow plain" style="margin:12px 0 2px">' + lastPart + '</div>';
      }
      const cls = r.s >= 0.999 ? 't3' : (r.s > 0 ? 't2' : 't1');
      const lbl = r.s >= 0.999 ? 'full' : (r.s > 0 ? Math.round(r.s * 100) + '%' : 'lost');
      h += '<button class="row" onclick="VBM.reviewOne(\'' + r.q.id + '\')">' +
        '<span class="idx">' + (i + 1) + '</span><span class="body"><span class="t">' + r.d.title + '</span>' +
        '<span class="d">' + Math.round(r.s * (r.d.pts || 0) * 10) / 10 + ' of ' + (r.d.pts || 0) + ' points — tap to rework it with hints</span></span>' +
        '<span class="rt"><span class="badge ' + cls + '">' + lbl + '</span></span></button>';
    });
    h += '</div>';

    h += '<div class="btnrow"><button class="btn" onclick="VBM.go(\'home\')">Back to the desk</button>' +
      '<button class="btn ghost" onclick="VBM.startExam(\'' + x.id + '\')">Sit it again</button></div>';
    EX = null;
    SC().innerHTML = h;
    window.scrollTo(0, 0);
  }

  V.reviewOne = function (id) {
    V.Drill.start(id, {
      mode: 'practice', label: 'Rework', last: true,
      headerHtml: '<div class="eyebrow plain"><button class="btn ghost sm" onclick="VBM.go(\'home\')">← desk</button></div>',
      onNext: () => home()
    });
  };

  /* ============================================================ PATTERN BOARD */
  function pattern() {
    const P = V.data.pattern;
    let h = '<div class="eyebrow">Reference</div><h1>Pattern Board</h1>';
    h += '<p class="sub">The course Q&amp;A slide states the paper will be "equivalent in structure, content and ' +
      'level of detail to previous exams". If that still holds for your semester, the past papers are a ' +
      'specification rather than practice. Here is what they actually contain — verify the format against ' +
      'your own semester\'s announcements.</p>';

    h += '<div class="eyebrow">The exam, decoded</div><div class="card">';
    for (const [k, vv] of P.facts) h += '<p style="margin:0 0 10px"><b>' + k + '.</b> ' + vv + '</p>';
    h += '</div>';

    h += '<div class="eyebrow">What actually gets examined — all eight papers</div>';
    h += '<div class="pwrap"><table class="pat"><thead><tr><th>Topic</th>' +
      P.exams.map(e => '<th>' + e.k + '<br><span style="font-weight:400;opacity:.6">' + e.kind + '</span></th>').join('') +
      '<th>Rate</th></tr></thead><tbody>';
    for (const r of P.rows) {
      h += '<tr><td>' + r.topic + '</td>';
      for (const x of r.hit) {
        if (x === 'y') h += '<td class="y">✓</td>';
        else if (x === 'mc') h += '<td class="mc">MC</td>';
        else h += '<td class="n">–</td>';
      }
      const bg = r.tier === 1 ? 'var(--tier1)' : r.tier === 2 ? 'var(--tier2)' : 'var(--tier3)';
      h += '<td class="rate" style="background:' + bg + '">' + r.rate + '</td></tr>';
    }
    h += '</tbody></table></div>';
    h += '<p class="legend">✓ = full open question · MC = appeared as multiple choice · T = test exam, R = real exam. ' +
      P.starNote + '</p>';

    h += '<div class="eyebrow">' + P.prediction.head + '</div><div class="card"><p style="margin-top:0">' +
      P.prediction.body + '</p>';
    for (const [k, vv] of P.prediction.fams) h += '<p><b>' + k + '</b> — ' + vv + '</p>';
    h += '<p style="margin-bottom:0"><b>' + P.prediction.tail + '</b></p></div>';

    h += '<div class="eyebrow">How marks are actually awarded</div><div class="card">';
    for (const s of P.marking) h += '<p>' + s + '</p>';
    h += '</div>';

    h += '<div class="eyebrow">Exam-day playbook</div><div class="card">';
    for (const [k, vv] of P.playbook) h += '<p><b>' + k + '.</b> ' + vv + '</p>';
    h += '</div>';

    const dl = V.daysLeft();
    const N = P.plan.length;
    h += '<div class="eyebrow">The ' + N + '-day plan' +
      (dl == null ? '' : dl > 0 ? ' — ' + dl + ' day' + (dl === 1 ? '' : 's') + ' left'
        : dl === 0 ? ' — exam today' : ' — exam has passed') + '</div>';
    if (dl != null && dl > 0 && dl < N) {
      h += '<div class="coach bad"><div class="ch">Compressed</div><p>Only ' + dl + ' day' +
        (dl === 1 ? '' : 's') + ' remain for a ' + N + '-day plan. ' + P.short + '</p></div>';
    }
    h += '<div class="rows">';
    for (const p of P.plan) {
      const chs = p.chapters.map(c => V.data.chapters.find(x => x.id === c)).filter(Boolean);
      const when = V.planDate(p.d, N);
      h += '<button class="row" onclick="VBM.go(\'chapter\',\'' + p.chapters[0] + '\')">' +
        '<span class="idx">D' + p.d + '</span><span class="body"><span class="t">' + p.focus +
        (when ? ' <span style="font-weight:400;color:var(--faint)">· ' + when + '</span>' : '') + '</span>' +
        '<span class="d">' + p.task + '</span></span>' +
        '<span class="rt"><span class="badge t' + p.tier + '">' + TIERNAME[p.tier] + '</span>' +
        meter(chs.length ? chs.reduce((a, c) => a + V.mastery(c), 0) / chs.length : 0) + '</span></button>';
    }
    h += '</div>';
    h += '<div class="coach hint" style="margin-top:14px"><div class="ch">If you have less time</div><p>' + P.short + '</p></div>';

    h += '<div class="btnrow"><button class="btn" onclick="VBM.go(\'home\')">Back to the desk</button></div>';
    SC().innerHTML = h;
  }

  /* ============================================================ VAULT */
  function vault() {
    let h = '<div class="eyebrow">Reference</div><h1>The Vault</h1>';
    h += '<p class="sub">No formula sheet is permitted — only a non-programmable calculator and a dictionary. ' +
      'Everything below has to be in your head. Reading it is not learning it: use the ' +
      '<b>write the formula</b> drills in the modules to produce each one from a blank page.</p>';

    for (const tier of [1, 2, 3]) {
      const list = V.data.formulas.filter(f => f.tier === tier);
      if (!list.length) continue;
      h += '<div class="eyebrow">Tier ' + tier + ' — ' +
        (tier === 1 ? 'memorise cold, these carry the paper' : tier === 2 ? 'high value' : 'know them for the MC') +
        '</div>';
      for (const f of list) {
        h += '<div class="card vgroup"><h3>' + f.id + ' · ' + f.title +
          '<span class="badge t' + f.tier + '">tier ' + f.tier + '</span></h3>';
        h += '<p class="vd">' + f.desc + '</p>';
        if (f.fml) for (const l of f.fml) h += '<div class="fml">' + l + '</div>';
        if (f.table) {
          h += '<div class="tbwrap"><table class="tb"><thead><tr>' +
            f.table.head.map(x => '<th>' + x + '</th>').join('') + '</tr></thead><tbody>';
          for (const r of f.table.rows) h += '<tr>' + r.map((c, i) =>
            '<td' + (i === 0 ? ' class="lab"' : '') + '>' + c + '</td>').join('') + '</tr>';
          h += '</tbody></table></div>';
        }
        if (f.notes) for (const n of f.notes) h += '<p class="vnote">' + n + '</p>';
        if (f.verbal) {
          h += '<div class="coach ok" style="margin-top:12px"><div class="ch">Learn verbatim — ' + f.verbal.pts + ' points</div>' +
            '<p><i>' + f.verbal.q + '</i></p><p>' + f.verbal.a + '</p></div>';
        }
        if (f.trap) h += '<div class="vtrap"><b>Trap.</b> ' + f.trap + '</div>';
        h += '</div>';
      }
    }
    h += '<div class="btnrow"><button class="btn" onclick="VBM.go(\'home\')">Back to the desk</button>' +
      '<button class="btn ghost" onclick="VBM.runList(\'traps\')">Run the Trap Radar</button></div>';
    SC().innerHTML = h;
  }

  /* ============================================================ router */
  V.go = function (name, arg) {
    if (EX) { clearInterval(EX.tick); EX = null; }
    RUN = null;
    window.scrollTo(0, 0);
    if (name === 'chapter') chapter(arg);
    else if (name === 'pattern') pattern();
    else if (name === 'vault') vault();
    else if (name === 'exambrief') exambrief(arg);
    else home();
    V.rail();
  };

  V.wipe = function () {
    if (!confirm('Reset all progress on this device? This cannot be undone.')) return;
    V.reset(); V.go('home');
  };

  /* ---- boot ---- */
  V.rail();
  V.go('home');
  V.gate();

})(window.VBM);
