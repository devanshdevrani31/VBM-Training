/* ==========================================================================
   drillui.js, the drill runner.
   Practice mode: guided, one step at a time, escalating hints, answer only
   when you have genuinely tried. Exam mode: everything at once, no help.
   ========================================================================== */
'use strict';

(function (V) {

  let R = null;   // live drill state

  /* ---------------------------------------------------------------- helpers */

  function sheet(s) {
    let h = '<div class="sheet"><div class="sh">' + s.t + '</div><div class="swrap"><table>';
    if (s.cols) {
      h += '<tr class="b"><td></td>' + s.cols.map(c => '<td>' + c + '</td>').join('') + '</tr>';
    }
    for (const r of s.rows) {
      const bold = /<b>/.test(r[0]) ? ' class="b"' : '';
      h += '<tr' + bold + '>' + r.map(c => '<td>' + (c == null ? '' : c) + '</td>').join('') + '</tr>';
    }
    h += '</table></div>';
    if (s.fn) h += '<div class="fn">' + s.fn + '</div>';
    return h + '</div>';
  }

  function progress(total, at, res) {
    let h = '<div class="mprog">';
    for (let i = 0; i < total; i++) {
      let c = '';
      if (res && res[i] === 'ok') c = 'done';
      else if (res && res[i] === 'shown') c = 'miss';
      else if (i === at) c = 'cur';
      h += '<i class="' + c + '"></i>';
    }
    return h + '</div>';
  }

  function coach(kind, head, body) {
    return '<div class="coach ' + kind + '"><div class="ch">' + head + '</div>' + body + '</div>';
  }

  /* The mental picture behind a formula. Collapsed by default so it does not
     spoil the drill, forced open once the drill is finished so it always gets
     read at least once. Suppressed under exam conditions like every other aid. */
  function intuBox() {
    const it = (V.data.intuition || {})[R.drill.id];
    if (!it || R.mode === 'exam') return '';
    const open = !!R.showIntu || R.done;
    let h = '<div class="intu' + (open ? ' open' : '') + '">';
    h += '<button class="intuhead" onclick="VBM.Drill.act(\'intu\')" aria-expanded="' + open + '">'
      + '<span class="bulb">✦</span>'
      + '<span class="il">' + (open ? 'The intuition' : 'The intuition (open this if the formula will not stick)') + '</span>'
      + '<span class="chev">' + (open ? '−' : '+') + '</span></button>';
    if (open) {
      h += '<div class="intubody"><p class="hook">' + it.hook + '</p><p>' + it.story + '</p>'
        + (it.sticky ? '<p class="sticky">' + it.sticky + '</p>' : '') + '</div>';
    }
    return h + '</div>';
  }

  /* Shell around every drill. */
  function shell(body, opts) {
    const d = R.drill;
    opts = opts || {};
    let h = '<div class="card">';
    h += '<div class="qhead"><span class="qmeta">' + (R.label || 'Drill') + ' · ' + KIND[d.kind].tag + '</span>';
    if (d.pts) h += '<span class="pts">' + d.pts + ' exam pts</span>';
    h += '</div>';
    h += '<h2 style="margin:6px 0 0;font-size:17px">' + d.title + '</h2>';
    h += '<div class="qtext">' + d.q + '</div>';
    if (d.note) h += '<div class="qnote">' + d.note + '</div>';
    if (d.data) for (const s of d.data) h += sheet(s);
    h += body;
    if (opts.prog) h += opts.prog;
    /* The coach message is rendered from state, so a repaint never eats it. */
    h += '<div id="coach">' + (R.coachHtml || '') + '</div>';
    h += '<div class="btnrow" id="btns"></div>';
    if (d.source) h += '<div class="srcline">Source: ' + d.source + '</div>';
    return h + '</div>';
  }

  function setCoach(html) {
    R.coachHtml = html || '';
    const el = document.getElementById('coach');
    if (el) el.innerHTML = R.coachHtml;
  }

  function btns(list) {
    const el = document.getElementById('btns');
    if (!el) return;
    el.innerHTML = list.filter(Boolean).map(b =>
      '<button class="btn ' + (b.cls || '') + '"' + (b.dis ? ' disabled' : '') +
      ' onclick="VBM.Drill.act(\'' + b.a + '\')">' + b.t + '</button>'
    ).join('') + (R.mode === 'exam' ? '' : '<span class="grow"></span>');
  }

  /* Escalating help. In exam mode there is none. */
  function helpBtns(canCheck, hintPool, extra) {
    if (R.mode === 'exam') {
      return btns([{ t: R.last ? 'Submit paper' : 'Submit & continue', a: 'submit', dis: !canCheck }]);
    }
    const hints = hintPool || [];
    const mayReveal = R.att >= 2 || R.hn >= Math.max(1, hints.length);
    btns([
      { t: 'Check', a: 'check', dis: !canCheck },
      hints.length && R.hn < hints.length ? { t: 'Hint (' + (hints.length - R.hn) + ' left)', a: 'hint', cls: 'ghost' } : null,
      { t: 'Show the answer', a: 'reveal', cls: 'warn', dis: !mayReveal },
      ...(extra || [])
    ]);
  }

  function finish(frac, extra) {
    R.done = true;
    R.extra = extra || '';
    R.score = Math.max(0, Math.min(1, frac));
    R.outcome = R.usedReveal ? 'revealed'
      : (R.score < 0.999 ? 'wrong' : (R.usedHint || R.wrongEver ? 'guided' : 'clean'));
    if (R.mode === 'practice') {
      V.award(R.drill.id, R.outcome, R.drill.pts);
      const it = V.item(R.drill.id);
      if (R.outcome === 'clean' && it.ok === 1) V.S.seen++;
    }
    paintDone();
  }

  const DONE_MSG = {
    clean: ['ok', 'Clean run',
      'No hints, no reveals, nothing wrong on the way. That is the pace you want on the day.'],
    guided: ['hint', 'Got there with a nudge',
      'Correct in the end, but it is not automatic yet. Come back to this one later and do it cold.'],
    wrong: ['bad', 'Partly there',
      'Some of it did not land. Have a read below, then run it again. It stays in your review queue until you clear it.'],
    revealed: ['bad', 'Answer revealed, so this one comes back',
      'It is in your review queue now. Worth another go before the exam, because a formula you have read is not a formula you can write.']
  };

  function paintDone() {
    const d = R.drill;
    /* Under exam conditions nothing is fed back until the paper is handed in. */
    let h = R.mode === 'practice' ? (R.extra || '') : '';
    if (R.mode === 'practice') {
      const [cls, head, msg] = DONE_MSG[R.outcome] || DONE_MSG.guided;
      h += coach(cls, head, '<p>' + msg + '</p>' +
        (R.score < 0.999 && R.outcome !== 'revealed'
          ? '<p>Score on this run: <b>' + Math.round(R.score * 100) + '%</b>.</p>' : ''));
      if (d.why) h += coach('info', 'Understand it', '<p>' + d.why + '</p>');
      btns([{ t: R.last ? 'Finish' : 'Next drill', a: 'next' }, { t: 'Run it again', a: 'again', cls: 'ghost' }]);
    } else {
      btns([{ t: R.last ? 'Submit paper' : 'Next question', a: 'next' }]);
    }
    setCoach(h);
  }

  /* =======================================================================
     KIND: mc
     ===================================================================== */
  const KIND = {};

  KIND.mc = {
    tag: 'multiple choice',
    init() { R.order = V.shuffle(R.drill.opts.map((_, i) => i)); R.pick = null; },
    paint() {
      const d = R.drill;
      /* Marked only once you have committed, and only in practice mode. */
      const marked = R.mode === 'practice' && R.done;
      let b = '<div class="opts">';
      R.order.forEach((oi, n) => {
        const o = d.opts[oi];
        let cls = '', mark = '';
        if (marked) {
          if (o.ok) { cls = 'right'; mark = '<span class="mark">✓</span>'; }
          else if (R.pick === oi) { cls = 'wrong'; mark = '<span class="mark">✗</span>'; }
          else cls = 'muted';
        } else if (R.pick === oi) cls = 'sel';
        b += '<button class="opt ' + cls + '"' + (R.done ? ' disabled' : '') +
          ' onclick="VBM.Drill.act(\'pick\',' + oi + ')">' +
          '<span class="key">' + String.fromCharCode(65 + n) + '</span>' +
          '<span class="ot">' + o.t + '</span>' + mark + '</button>';
      });
      b += '</div>';
      if (!R.done) {
        b += '<div class="kbhint">Tap an answer, or press <kbd>A</kbd>' +
          (R.order.length > 1 ? ' to <kbd>' + String.fromCharCode(64 + R.order.length) + '</kbd>' : '') +
          '. Then <kbd>Enter</kbd> to ' + (R.mode === 'exam' ? 'submit' : 'commit') + '.</div>';
      }
      document.getElementById('drillhost').innerHTML = shell(b);
      if (!R.done) {
        btns([{
          t: R.mode === 'exam' ? (R.last ? 'Submit paper' : 'Submit & continue') : 'Check answer',
          a: R.mode === 'exam' ? 'submit' : 'check', dis: R.pick == null
        }]);
      }
    },
    /* One compact verdict instead of an explanation bolted under every option. */
    verdict(ok) {
      const d = R.drill;
      const picked = d.opts[R.pick], right = d.opts.find(o => o.ok);
      const letter = o => String.fromCharCode(65 + R.order.indexOf(d.opts.indexOf(o)));
      if (ok) {
        return coach('ok', 'Correct: ' + letter(right),
          right.y ? '<p>' + right.y + '</p>' : '<p>That is the one.</p>');
      }
      return coach('bad', 'Not that one',
        '<p><b>You picked ' + letter(picked) + '.</b> ' + (picked.y || '') + '</p>' +
        '<p><b>The answer is ' + letter(right) + ':</b> ' + right.t + '</p>' +
        (right.y ? '<p>' + right.y + '</p>' : ''));
    },
    act(a, arg) {
      if (a === 'pick') {
        if (R.done) return;
        R.pick = arg;
        KIND.mc.paint();          // select only, so a mis-tap is not fatal
        return;
      }
      if (a === 'check' || a === 'submit') {
        if (R.pick == null) return;
        const ok = !!R.drill.opts[R.pick].ok;
        if (!ok) R.wrongEver = true;
        finish(ok ? 1 : 0, KIND.mc.verdict(ok));
        KIND.mc.paint(); paintDone();
      }
    }
  };

  /* Keyboard for multiple choice: letters or digits to pick, Enter to commit
     and again to move on. Rapid-fire practice is unusable without it. */
  document.addEventListener('keydown', function (e) {
    if (!R || R.drill.kind !== 'mc') return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target && e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    let idx = -1;
    if (/^[1-9]$/.test(k)) idx = +k - 1;
    else if (/^[a-z]$/.test(k)) idx = k.charCodeAt(0) - 97;
    if (idx >= 0 && idx < R.order.length) {
      e.preventDefault();
      V.Drill.act('pick', R.order[idx]);
      return;
    }
    if (k === 'Enter' || k === ' ') {
      e.preventDefault();
      if (R.done) V.Drill.act('next');
      else if (R.pick != null) V.Drill.act(R.mode === 'exam' ? 'submit' : 'check');
    }
  });

  /* =======================================================================
     KIND: formula  (token assembly)
     ===================================================================== */
  KIND.formula = {
    tag: 'write the formula',
    init() {
      const d = R.drill;
      R.bank = V.shuffle(d.tokens.concat(d.decoys || []));
      R.seq = [];
      R.att = 0; R.hn = 0;
    },
    paint() {
      const d = R.drill;
      const mark = R.done && R.mode === 'practice';
      let b = '<div class="fline' + (mark ? (R.score >= 1 ? ' good' : ' bad') : '') + '" id="fline">';
      if (!R.seq.length) b += '<span class="ph">Click tokens below to build the formula…</span>';
      else b += R.seq.map((t, i) =>
        '<span class="tok' + (/^[=+\-−×÷/()><]|^·$/.test(t) ? ' op' : '') + '"' +
        (R.done ? '' : ' onclick="VBM.Drill.act(\'pop\',' + i + ')" title="remove"') + '>' + t + '</span>').join('');
      b += '</div>';
      if (!R.done) {
        b += '<div class="bank">' + R.bank.map((t, i) =>
          '<button onclick="VBM.Drill.act(\'push\',' + i + ')">' + t + '</button>').join('') + '</div>';
      }
      b += intuBox();
      document.getElementById('drillhost').innerHTML = shell(b);
      if (!R.done) helpBtns(R.seq.length > 0, d.hints, [{ t: 'Clear', a: 'clear', cls: 'ghost' }]);
    },
    check() {
      const d = R.drill;
      const norm = a => a.map(x => V.tnorm(x)).join(' ');
      const mine = norm(R.seq);
      return (d.accept || [d.tokens]).some(acc => norm(acc) === mine);
    },
    act(a, arg) {
      const d = R.drill;
      if (a === 'push') { R.seq.push(R.bank[arg]); KIND.formula.paint(); return; }
      if (a === 'pop') { R.seq.splice(arg, 1); KIND.formula.paint(); return; }
      if (a === 'clear') { R.seq = []; KIND.formula.paint(); return; }
      if (a === 'submit') { finish(KIND.formula.check() ? 1 : 0); KIND.formula.paint(); paintDone(); return; }
      if (a === 'check') {
        if (KIND.formula.check()) { finish(1); KIND.formula.paint(); paintDone(); return; }
        R.att++; R.wrongEver = true;
        const used = R.seq.map(V.tnorm);
        const wrong = R.seq.filter(t => !d.tokens.some(x => V.tnorm(x) === V.tnorm(t)));
        const missing = d.tokens.filter(t => !used.includes(V.tnorm(t)));
        let m = '';
        if (wrong.length) m = '<p>These do not belong: <b>' + wrong.join('</b>, <b>') + '</b>. Take them out.</p>';
        else if (missing.length) m = '<p>Every token you used belongs, but <b>' + missing.length + '</b> ' +
          (missing.length === 1 ? 'is' : 'are') + ' still missing.</p>';
        else m = '<p>Right tokens, wrong order. Read it left to right as a sentence.</p>';
        setCoach(coach('bad', 'Not yet', m + (R.att >= 2 ? '<p>Try a hint, or reveal it and read the explanation carefully.</p>' : '')));
        helpBtns(true, d.hints, [{ t: 'Clear', a: 'clear', cls: 'ghost' }]);
        return;
      }
      if (a === 'hint') {
        setCoach(coach('hint', 'Hint ' + (R.hn + 1) + ' of ' + d.hints.length, '<p>' + d.hints[R.hn] + '</p>'));
        R.hn++; R.usedHint = true;
        helpBtns(true, d.hints, [{ t: 'Clear', a: 'clear', cls: 'ghost' }]);
        return;
      }
      if (a === 'reveal') {
        R.usedReveal = true;
        R.seq = (d.accept ? d.accept[0] : d.tokens).slice();
        finish(0);
        KIND.formula.paint(); paintDone();
      }
    }
  };

  /* =======================================================================
     KIND: sequence  (order the steps)
     ===================================================================== */
  KIND.sequence = {
    tag: 'order the steps',
    init() {
      R.bank = V.shuffle(R.drill.items.map((t, i) => ({ t, i })));
      R.seq = []; R.att = 0; R.hn = 0;
    },
    paint() {
      const d = R.drill;
      let b = '<div class="seq">';
      const mark = R.done && R.mode === 'practice';
      R.seq.forEach((s, n) => {
        const cls = mark ? (s.i === n ? 'good' : 'shown') : (R.done ? '' : 'good');
        b += '<div class="item ' + cls + '"><span class="n">' + (n + 1) + '</span><span>' + s.t + '</span></div>';
      });
      if (!R.done && R.seq.length < d.items.length) {
        b += '<div class="item"><span class="n">' + (R.seq.length + 1) + '</span><span style="color:var(--faint)">choose the next step…</span></div>';
      }
      b += '</div>';
      if (!R.done) {
        b += '<div class="bank">' + R.bank.map((s, i) =>
          '<button onclick="VBM.Drill.act(\'push\',' + i + ')">' + s.t + '</button>').join('') + '</div>';
      }
      b += intuBox();
      document.getElementById('drillhost').innerHTML = shell(b, { prog: progress(d.items.length, R.seq.length, null) });
      if (!R.done) helpBtns(R.seq.length === d.items.length, d.hints, R.seq.length ? [{ t: 'Undo', a: 'pop', cls: 'ghost' }] : null);
    },
    act(a, arg) {
      const d = R.drill;
      if (a === 'push') {
        const s = R.bank.splice(arg, 1)[0];
        R.seq.push(s);
        // instant nudge in practice mode: is this the right slot?
        if (R.mode === 'practice' && s.i !== R.seq.length - 1) {
          R.att++; R.wrongEver = true;
          setCoach(coach('bad', 'That is not the next step',
            '<p>Step ' + R.seq.length + ' is something else. Undo and think about what has to happen before this.</p>'));
        } else if (R.mode === 'practice') setCoach('');
        KIND.sequence.paint();
        if (R.seq.length === d.items.length && R.mode === 'practice') KIND.sequence.act('check');
        return;
      }
      if (a === 'pop') { const s = R.seq.pop(); if (s) R.bank.push(s); setCoach(''); KIND.sequence.paint(); return; }
      if (a === 'check' || a === 'submit') {
        const right = R.seq.filter((s, n) => s.i === n).length;
        finish(right / d.items.length);
        KIND.sequence.paint(); paintDone();
        return;
      }
      if (a === 'hint') {
        setCoach(coach('hint', 'Hint ' + (R.hn + 1) + ' of ' + d.hints.length, '<p>' + d.hints[R.hn] + '</p>'));
        R.hn++; R.usedHint = true; KIND.sequence.paint(); return;
      }
      if (a === 'reveal') {
        R.usedReveal = true;
        R.seq = d.items.map((t, i) => ({ t, i }));
        R.bank = [];
        finish(0); KIND.sequence.paint(); paintDone();
      }
    }
  };

  /* =======================================================================
     KIND: classify  (one item at a time into buckets)
     ===================================================================== */
  KIND.classify = {
    tag: 'sort them',
    init() {
      R.items = V.shuffle(R.drill.items.map((it, i) => ({ it, i })));
      R.at = 0; R.res = []; R.picked = null;
    },
    paint() {
      const d = R.drill;
      if (R.at >= R.items.length) { document.getElementById('drillhost').innerHTML = shell(''); return; }
      const cur = R.items[R.at].it;
      let b = '<div class="bigitem">' + cur.t + (cur.sub ? '<small>' + cur.sub + '</small>' : '') + '</div>';
      b += '<div class="bkt">';
      d.buckets.forEach((bk, bi) => {
        let cls = '';
        if (R.picked != null && R.mode === 'practice') {
          if (bi === cur.b) cls = 'good'; else if (bi === R.picked) cls = 'bad';
        }
        b += '<button class="' + cls + '"' + (R.picked != null ? ' disabled' : '') +
          ' onclick="VBM.Drill.act(\'pick\',' + bi + ')">' + bk + '</button>';
      });
      b += '</div>';
      document.getElementById('drillhost').innerHTML = shell(b,
        { prog: progress(R.items.length, R.at, R.mode === 'practice' ? R.res : null) });
      if (R.picked != null) {
        const ok = R.picked === cur.b;
        if (R.mode === 'practice') {
          setCoach(coach(ok ? 'ok' : 'bad', ok ? 'Yes' : 'No, ' + d.buckets[cur.b],
            '<p>' + cur.why + '</p>'));
          btns([{ t: R.at + 1 < R.items.length ? 'Next item' : 'See the summary', a: 'adv' }]);
        } else btns([{ t: 'Next item', a: 'adv' }]);
      } else btns([]);
    },
    act(a, arg) {
      const d = R.drill;
      if (a === 'pick') {
        if (R.picked != null) return;
        R.picked = arg;
        const ok = arg === R.items[R.at].it.b;
        R.res[R.at] = ok ? 'ok' : 'shown';
        if (!ok) R.wrongEver = true;
        KIND.classify.paint();
        return;
      }
      if (a === 'adv' || a === 'submit') {
        R.at++; R.picked = null;
        if (R.at >= R.items.length) {
          const right = R.res.filter(x => x === 'ok').length;
          finish(right / R.items.length);
          document.getElementById('drillhost').innerHTML = shell(
            '<div class="bigitem">' + right + ' / ' + R.items.length + ' sorted correctly</div>');
          paintDone();
          return;
        }
        setCoach(''); KIND.classify.paint();
      }
    }
  };

  /* =======================================================================
     KIND: numeric  (single answer)
     ===================================================================== */
  KIND.numeric = {
    tag: 'calculate',
    init() { R.att = 0; R.hn = 0; },
    paint() {
      const d = R.drill;
      /* When done, practice shows the correct value in the box; exam mode
         shows back what you actually wrote, and says nothing about it. */
      let b = '<div class="inrow"><input id="nin" inputmode="decimal" placeholder="your answer"' +
        (R.done ? ' disabled value="' + V.esc(R.mode === 'practice' ? V.fmt(d.a) : (R.raw || '')) + '"' : '') +
        ' onkeydown="if(event.key===\'Enter\')VBM.Drill.act(\'' + (R.mode === 'exam' ? 'submit' : 'check') + '\')">' +
        (d.unit ? '<span class="suffix">' + d.unit + '</span>' : '') + '</div>';
      document.getElementById('drillhost').innerHTML = shell(b);
      if (!R.done) { helpBtns(true, d.hints); const i = document.getElementById('nin'); if (i) i.focus(); }
    },
    work(head, cls, lead) {
      return coach(cls || 'info', head || 'The working',
        (lead ? '<p>' + lead + '</p>' : '') + '<div class="work">' + R.drill.f + '</div>');
    },
    act(a) {
      const d = R.drill;
      if (a === 'hint') {
        setCoach(coach('hint', 'Hint ' + (R.hn + 1) + ' of ' + d.hints.length, '<p>' + d.hints[R.hn] + '</p>'));
        R.hn++; R.usedHint = true; helpBtns(true, d.hints); return;
      }
      if (a === 'reveal') {
        R.usedReveal = true;
        finish(0, KIND.numeric.work('The answer is ' + V.fmt(d.a), 'bad'));
        KIND.numeric.paint(); paintDone(); return;
      }
      const el = document.getElementById('nin');
      const raw = el ? el.value : '';
      R.raw = raw;
      if (a === 'submit') {
        const ok = V.hits(raw, d.a, d.tol) || (d.diag || []).some(x => x.ok && V.hits(raw, x.v, x.tol || d.tol));
        finish(ok ? 1 : 0, KIND.numeric.work(ok ? 'Correct' : 'The answer is ' + V.fmt(d.a), ok ? 'ok' : 'bad'));
        KIND.numeric.paint(); paintDone(); return;
      }
      if (a === 'check') {
        if (!V.nums(raw).length) { setCoach(coach('hint', 'Nothing to check', '<p>Type a number first.</p>')); return; }
        const alt = (d.diag || []).find(x => x.ok && V.hits(raw, x.v, x.tol || d.tol));
        if (V.hits(raw, d.a, d.tol) || alt) {
          finish(1, KIND.numeric.work('Correct', 'ok', alt ? alt.m : ''));
          KIND.numeric.paint(); paintDone(); return;
        }
        R.att++; R.wrongEver = true;
        const dg = (d.diag || []).find(x => V.hits(raw, x.v, x.tol || d.tol));
        setCoach(coach('bad', dg ? 'I can see what happened' : 'Not correct',
          '<p>' + (dg ? dg.m : 'That is not it. Check the formula, then each substitution in turn.') + '</p>'));
        helpBtns(true, d.hints); return;
      }
    }
  };

  /* =======================================================================
     KIND: table  (draw the skeleton, then fill it)
     ===================================================================== */
  KIND.table = {
    tag: 'draw the table',
    init() {
      const d = R.drill;
      R.blanks = [];
      d.rows.forEach((row, ri) => (row.cells || []).forEach((c, ci) => {
        if (c && c.a != null) R.blanks.push({ ri, ci });
      }));
      R.res = R.blanks.map(() => null);
      R.vals = R.blanks.map(() => '');
      R.at = 0; R.att = 0; R.hn = 0;
      R.phase = (d.skeleton && R.mode === 'practice') ? 'skeleton' : 'fill';
      R.picked = [];
      if (R.phase === 'skeleton') R.bank = V.shuffle(d.skeleton.bank.slice());
    },
    cellOf(b) { return R.drill.rows[b.ri].cells[b.ci]; },
    grid() {
      const d = R.drill;
      const visible = R.phase === 'skeleton'
        ? d.rows.filter(r => R.picked.includes(r.label))
        : d.rows;
      let h = '<div class="tbwrap"><table class="tb"><thead><tr><th></th>' +
        d.cols.map(c => '<th>' + c + '</th>').join('') + '</tr></thead><tbody>';
      if (!visible.length) {
        h += '<tr><td class="lab" style="color:var(--faint)" colspan="' + (d.cols.length + 1) +
          '">Your table is empty, pick the first row from the bank below.</td></tr>';
      }
      for (const row of visible) {
        const ri = d.rows.indexOf(row);
        h += '<tr class="' + (row.total ? 'total' : '') + '"><td class="lab">' + row.label + '</td>';
        for (let ci = 0; ci < d.cols.length; ci++) {
          const c = (row.cells || [])[ci];
          if (!c) { h += '<td class="num blank"></td>'; continue; }
          if (c.v != null) { h += '<td class="num ghost">' + c.v + '</td>'; continue; }
          const bi = R.blanks.findIndex(b => b.ri === ri && b.ci === ci);
          const st = R.res[bi];
          if (R.phase === 'skeleton') { h += '<td class="num todo">?</td>'; continue; }
          if (R.mode === 'exam' && R.done) {
            /* Hand the paper in and it stays handed in: your own figures,
               no marking, no answers. Review comes after the whole paper. */
            h += '<td class="num ghost">' + V.esc(R.vals[bi] || ', ') + '</td>';
            continue;
          }
          if (R.mode === 'exam') {
            h += '<td class="num"><input class="cellin" inputmode="decimal" value="' +
              V.esc(R.vals[bi] || '') + '" aria-label="value" ' +
              'oninput="VBM.Drill.act(\'set\',' + bi + ',this.value)"></td>';
            continue;
          }
          if (st === 'ok') h += '<td class="num good">' + V.fmt(c.a) + '</td>';
          else if (st === 'shown') h += '<td class="num shown">' + V.fmt(c.a) + '</td>';
          else if (bi === R.at) h += '<td class="num active">' + (R.vals[bi] || '?') + '</td>';
          else h += '<td class="num todo">?</td>';
        }
        h += '</tr>';
      }
      return h + '</tbody></table></div>';
    },
    paint() {
      const d = R.drill;
      let b = '<div class="tbuild">' + KIND.table.grid() + '</div>';

      if (R.phase === 'skeleton') {
        b += '<div class="qnote"><b>Step 1: draw the skeleton.</b> ' + d.skeleton.prompt + '</div>';
        b += '<div class="bank">' + R.bank.map((t, i) =>
          '<button' + (R.picked.includes(t) ? ' disabled' : '') +
          ' onclick="VBM.Drill.act(\'lab\',' + i + ')">' + t + '</button>').join('') + '</div>';
        document.getElementById('drillhost').innerHTML = shell(b,
          { prog: progress(d.skeleton.order.length, R.picked.length, null) });
        btns([]);
        return;
      }

      if (!R.done && R.mode === 'practice' && R.at < R.blanks.length) {
        const bl = R.blanks[R.at], row = d.rows[bl.ri];
        b += '<div class="qnote"><b>Step 2: fill it in.</b> Now: <b>' + row.label + '</b>' +
          (d.cols.length > 1 ? ' &middot; column <b>' + d.cols[bl.ci] + '</b>' : '') + '</div>';
        b += '<div class="inrow"><input id="nin" inputmode="decimal" placeholder="value for this cell" ' +
          'onkeydown="if(event.key===\'Enter\')VBM.Drill.act(\'check\')"></div>';
      }
      document.getElementById('drillhost').innerHTML = shell(b,
        { prog: progress(R.blanks.length, R.at, R.mode === 'practice' ? R.res : null) });

      if (R.done) return;
      if (R.mode === 'exam') { btns([{ t: R.last ? 'Submit paper' : 'Submit & continue', a: 'submit' }]); return; }
      const cell = KIND.table.cellOf(R.blanks[R.at]);
      helpBtns(true, cell.h || [], [{ t: 'Skip this cell', a: 'skip', cls: 'ghost' }]);
      const i = document.getElementById('nin'); if (i) i.focus();
    },
    advance() {
      // move to the next unresolved cell
      let n = R.at + 1;
      while (n < R.blanks.length && R.res[n]) n++;
      if (n >= R.blanks.length) {
        n = R.res.findIndex(x => !x);
        if (n < 0) {
          const right = R.res.filter(x => x === 'ok').length;
          finish(right / R.blanks.length,
            coach(right === R.blanks.length ? 'ok' : 'hint',
              'Table complete, ' + right + ' of ' + R.blanks.length + ' cells found unaided',
              '<p>Practise redrawing this shape on paper from memory. On the real paper the structure ' +
              'itself earns marks before a single number is written.</p>'));
          KIND.table.paint(); paintDone(); return;
        }
      }
      R.at = n; R.att = 0; R.hn = 0; setCoach(''); KIND.table.paint();
    },
    act(a, arg, arg2) {
      const d = R.drill;

      if (a === 'lab') {
        const t = R.bank[arg];
        if (R.picked.includes(t)) return;
        const want = d.skeleton.order[R.picked.length];
        if (t === want) {
          R.picked.push(t);
          if (R.picked.length === d.skeleton.order.length) {
            R.phase = 'fill'; setCoach(coach('ok', 'Skeleton drawn',
              '<p>That is the shape to reproduce on paper. Now fill it in.</p>'));
            KIND.table.paint();
            const el = document.getElementById('nin'); if (el) el.focus();
          } else { setCoach(''); KIND.table.paint(); }
        } else {
          R.wrongEver = true;
          const w = (d.skeleton.why || {})[t];
          setCoach(coach('bad', 'Not that row, not here',
            '<p>' + (w || 'That row does not come next. Ask yourself what the previous line logically leads to.') + '</p>'));
          KIND.table.paint();
        }
        return;
      }

      if (a === 'set') { R.vals[arg] = arg2; return; }

      if (a === 'submit') {
        let right = 0;
        R.blanks.forEach((b, i) => {
          const c = KIND.table.cellOf(b);
          const dg = (c.diag || []).find(x => x.ok && V.hits(R.vals[i], x.v, x.tol || c.tol));
          const ok = V.hits(R.vals[i], c.a, c.tol) || !!dg;
          R.res[i] = ok ? 'ok' : 'shown';
          if (ok) right++;
        });
        finish(right / R.blanks.length,
          coach(right === R.blanks.length ? 'ok' : 'hint',
            right + ' of ' + R.blanks.length + ' cells correct',
            '<p>Cells shown in red were wrong or left blank. The correct value is now printed in each.</p>'));
        KIND.table.paint(); paintDone(); return;
      }

      const cell = KIND.table.cellOf(R.blanks[R.at]);

      if (a === 'hint') {
        const hs = cell.h || [];
        if (R.hn < hs.length) {
          setCoach(coach('hint', 'Hint ' + (R.hn + 1) + ' of ' + hs.length, '<p>' + hs[R.hn] + '</p>'));
          R.hn++; R.usedHint = true;
        }
        KIND.table.paint(); return;
      }

      if (a === 'reveal') {
        R.usedReveal = true; R.res[R.at] = 'shown';
        const msg = coach('bad', 'This cell is ' + V.fmt(cell.a), '<div class="work">' + cell.f + '</div>');
        KIND.table.advance();          // advance() clears the coach…
        if (!R.done) setCoach(msg);    // …so put the explanation back
        return;
      }

      if (a === 'skip') { R.res[R.at] = 'shown'; R.usedReveal = true; KIND.table.advance(); return; }

      if (a === 'check') {
        const el = document.getElementById('nin');
        const raw = el ? el.value : '';
        if (!V.nums(raw).length) { setCoach(coach('hint', 'Nothing to check', '<p>Type a number for this cell.</p>')); return; }
        const alt = (cell.diag || []).find(x => x.ok && V.hits(raw, x.v, x.tol || cell.tol));
        if (V.hits(raw, cell.a, cell.tol) || alt) {
          R.res[R.at] = 'ok';
          const msg = alt ? coach('ok', 'Accepted', '<p>' + alt.m + '</p>') : '';
          KIND.table.advance();
          if (msg && !R.done) setCoach(msg);
          return;
        }
        R.att++; R.wrongEver = true;
        const dg = (cell.diag || []).find(x => V.hits(raw, x.v, x.tol || cell.tol));
        setCoach(coach('bad', dg ? 'I can see what happened' : 'Not that number',
          '<p>' + (dg ? dg.m : 'Not right. Write the formula for this line before substituting. That is where the marks are anyway.') + '</p>'));
        KIND.table.paint(); return;
      }
    }
  };

  /* =======================================================================
     KIND: verbal  (keyword-scored written answer)
     ===================================================================== */
  KIND.verbal = {
    tag: 'write the answer',
    init() { R.att = 0; R.hn = 0; },
    paint() {
      const d = R.drill;
      let b = '<textarea class="free" id="tin" placeholder="Write your answer as you would on the exam paper…"' +
        (R.done ? ' disabled' : '') + '>' + (R.text || '') + '</textarea>';
      if (!R.done && R.mode === 'practice') {
        b += '<div class="qnote">The marks go to specific phrases. ' + d.must.length +
          ' key elements are being looked for.</div>';
      }
      document.getElementById('drillhost').innerHTML = shell(b);
      if (!R.done) {
        if (R.mode === 'exam') btns([{ t: R.last ? 'Submit paper' : 'Submit & continue', a: 'submit' }]);
        else btns([{ t: 'Check my answer', a: 'check' }, { t: 'Show the model answer', a: 'reveal', cls: 'warn', dis: R.att < 1 }]);
      }
    },
    grade() {
      const d = R.drill;
      const t = ' ' + V.norm(document.getElementById('tin') ? document.getElementById('tin').value : (R.text || '')) + ' ';
      return d.must.map(m => ({ m, hit: m.k.some(k => t.includes(V.norm(k))) }));
    },
    act(a) {
      const d = R.drill;
      const el = document.getElementById('tin');
      if (el) R.text = el.value;
      if (a === 'reveal') {
        R.usedReveal = true;
        finish(0, coach('bad', 'The model answer', '<p>' + d.model + '</p>'));
        KIND.verbal.paint(); paintDone(); return;
      }
      const g = KIND.verbal.grade();
      const hits = g.filter(x => x.hit).length;
      let kw = '<div class="kwlist">' + g.map(x =>
        '<span class="kw ' + (x.hit ? 'on' : 'off') + '">' + (x.hit ? '✓ ' : '✗ ') + x.m.label + '</span>').join('') + '</div>';
      if (a === 'submit') {
        finish(hits / g.length, coach(hits === g.length ? 'ok' : 'hint',
          hits + ' of ' + g.length + ' key elements found',
          kw + '<p style="margin-top:10px"><b>Model answer:</b> ' + d.model + '</p>'));
        KIND.verbal.paint(); paintDone(); return;
      }
      if (a === 'check') {
        if (hits === g.length) {
          finish(1, coach('ok', 'All ' + g.length + ' key elements present', kw +
            '<p style="margin-top:10px"><b>The official wording, for comparison:</b> ' + d.model + '</p>'));
          KIND.verbal.paint(); paintDone(); return;
        }
        R.att++; R.wrongEver = true;
        setCoach(coach('bad', hits + ' of ' + g.length + ' key elements. Keep going',
          kw + '<p style="margin-top:10px">Add the missing elements above and check again. ' +
          'Each one is a phrase the official key awards marks for.</p>'));
        KIND.verbal.paint(); return;
      }
    }
  };

  /* ---------------------------------------------------------------- public */

  V.Drill = {
    start(id, ctx) {
      const d = V.data.drills[id];
      if (!d) { console.error('no drill ' + id); return; }
      R = {
        drill: d, mode: (ctx && ctx.mode) || 'practice',
        label: ctx && ctx.label, last: !!(ctx && ctx.last),
        onDone: ctx && ctx.onDone, onNext: ctx && ctx.onNext,
        done: false, score: 0, usedHint: false, usedReveal: false, wrongEver: false,
        att: 0, hn: 0
      };
      const host = document.getElementById('screen');
      host.innerHTML = (ctx && ctx.headerHtml ? ctx.headerHtml : '') + '<div id="drillhost"></div>';
      KIND[d.kind].init();
      KIND[d.kind].paint();
      window.scrollTo(0, 0);
    },
    act(a, arg, arg2) {
      if (!R) return;
      if (a === 'next') { if (R.onNext) R.onNext(R.score); return; }
      if (a === 'again') { V.Drill.start(R.drill.id, { mode: R.mode, label: R.label, last: R.last, onNext: R.onNext }); return; }
      if (a === 'intu') { R.showIntu = !R.showIntu; KIND[R.drill.kind].paint(); return; }
      KIND[R.drill.kind].act(a, arg, arg2);
      if (R.done && R.onDone) { R.onDone(R.score); R.onDone = null; }
    },
    kinds: KIND,
    state: () => R
  };

})(window.VBM);
