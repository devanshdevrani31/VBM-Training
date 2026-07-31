/* ==========================================================================
   drills-options.js — Chapter 8: Real options and the option to wait.
   A guaranteed MC item every year; a 32-point question on SS17 and WT16.
   ========================================================================== */
'use strict';

(function (V) {

  const S17Q3 = {
    t: 'The project (SS17 Q3)',
    rows: [
      ['Fixed budget b (payable when you invest)', '220'],
      ['Invest at t = 0 → cash flow c₁ at t = 1', 'θ, with certainty'],
      ['Wait one period → invest b at t = 1 → cash flow c₂ at t = 2', '605 with prob. 50 %, or 231 with prob. 50 %'],
      ['WACC r', '10 %']
    ],
    fn: 'The firm is <b>risk-neutral</b>. If it waits, it learns the true realisation of c₂ <b>before</b> deciding whether to invest at t = 1.'
  };

  V.reg([

    /* ------------------------------------------------ the three characteristics */
    {
      id: 'opt-c-chars', kind: 'classify', chapter: 'options', pts: 4,
      title: 'The three defining characteristics',
      source: 'Lecture 8; the distractor is the recycled MC item on SS23–SS26',
      q: 'Real options are real investment projects with all of the following characteristics — except the ones that are not. Sort them.',
      buckets: ['A defining characteristic', 'Not a characteristic'],
      items: [
        { t: '<b>Irreversibility</b> — the investment decision cannot be undone', b: 0, why: 'One of the three. Irreversibility is what gives waiting any value at all: if you could costlessly reverse the decision, there would be nothing to lose by acting now.' },
        { t: '<b>Uncertainty</b> — payoffs are subject to some form of (market) risk', b: 0, why: 'One of the three. Without uncertainty there is nothing to learn by waiting, so the option is worthless.' },
        { t: '<b>Flexibility</b> — management possesses degrees of freedom in allocating corporate funds or assets', b: 0, why: 'One of the three. Without discretion there is no option to exercise.' },
        { t: '<b>Reversibility</b> — management can reverse fund allocation decisions', b: 1, why: '<b>THE distractor</b>, asked in these exact words every single year. It is the <i>negation</i> of the real characteristic. Do not be fooled by the plausible-sounding sentence.' },
        { t: '<b>Certainty</b> — the payoffs are known in advance', b: 1, why: 'A distractor, and it appeared on SS19 in the list "Irreversibility, <i>certainty</i> and flexibility". Uncertainty is the requirement; certainty destroys the option.' },
        { t: '<b>Diversifiability</b> — the project\'s risk can be diversified away', b: 1, why: 'Not part of the definition, and irrelevant to whether waiting has value.' }
      ],
      why: '<b>The three conditions are not a list to memorise but a joint requirement.</b> Drop any one and the option is worthless: with no <i>uncertainty</i> there is nothing to learn by waiting; with no <i>irreversibility</i> there is nothing at stake in acting early; with no <i>flexibility</i> there is no choice to make. That is why the examiner\'s two distractors are the negations of the first two — and why noticing "Reversibility" or "certainty" in the list is enough to answer instantly.'
    },

    {
      id: 'opt-mc-revers', kind: 'mc', chapter: 'options', pts: 2,
      title: 'MC — the recycled real-options item',
      source: 'SS23/SS24/SS25/SS26 test exam MC 1.3 · official solution',
      q: 'Indicate the <em>wrong</em> statement: real options are real investment projects with all of the following characteristics:',
      opts: [
        { t: 'Reversibility: Management can reverse fund allocation decisions.', ok: true, y: 'Wrong, so this is the answer. The real characteristic is <b>IRREVERSIBILITY</b>.' },
        { t: 'Uncertainty: Payoffs are subject to some form of (market) risk.', ok: false, y: 'Correct as stated — one of the three.' },
        { t: 'Flexibility: Management possesses certain degrees of freedom in allocating corporate funds or assets.', ok: false, y: 'Correct as stated — one of the three.' }
      ],
      why: 'Word-for-word on four consecutive test exams, and it is the cheapest 2 points on the paper — <b>if</b> you read the option label rather than the explanatory clause after it. The clause "management can reverse fund allocation decisions" is a perfectly sensible English sentence and describes something managers genuinely value. It is simply the opposite of the required characteristic. <b>Read the noun, not the sentence.</b>'
    },

    {
      id: 'opt-mc-wait', kind: 'mc', chapter: 'options', pts: 2,
      title: 'MC — what an option to wait is not',
      source: 'SS19 MC Q5 · official solution',
      q: 'Which of the following statements is <em>true</em>?',
      opts: [
        { t: 'When treating an option as an interest-bearing asset that has to be depreciated when exercised or expired, no knowledge of the manager\'s discount rate is necessary in order to achieve a goal-congruent residual income measure.', ok: true, y: 'True. Capitalising and depreciating the option value is exactly the treatment that delivers strong goal congruence — see SS17 Q3.3–3.4.' },
        { t: 'An option to wait describes a manager\'s option to temporarily shut down operations or investments and resume them later.', ok: false, y: 'False — that is the <b>option to temporarily shut down</b>, a different option type. An option to wait is about <i>deferring</i> a decision not yet made.' },
        { t: 'Real options are real investment projects with all of the following characteristics: Irreversibility, certainty and flexibility.', ok: false, y: 'False — the requirement is <b>uncertainty</b>, not certainty. Same distractor, wearing a different hat.' }
      ],
      why: 'Note how the same two traps recur in one item: a <b>swapped option type</b> and the <b>certainty/uncertainty</b> flip. Keep the taxonomy straight — option to <b>wait/defer</b>, to <b>expand</b>, to <b>abandon</b>, to <b>switch</b>, to <b>temporarily shut down</b>. Waiting means the project has not started; temporary shutdown means it has, and you are pausing it.<br><br>The correct answer is also the punchline of the whole topic, so it is worth being able to state: <b>capitalise the option value and depreciate it when the option is exercised or expires</b>, and the residual income measure becomes goal-congruent without anyone needing to know the manager\'s discount rate.'
    },

    /* ------------------------------------------------ the decision rule */
    {
      id: 'opt-f-rule', kind: 'formula', chapter: 'options', pts: 3,
      title: 'Write the wait-or-invest rule',
      q: 'Assemble the condition under which the firm should wait rather than invest now.',
      tokens: ['Wait if', 'E[V₀(c₂)]', '>', 'V₀(c₁)'],
      decoys: ['<', 'b', '−', 'r', 'NPV = 0'],
      accept: [['Wait if', 'E[V₀(c₂)]', '>', 'V₀(c₁)']],
      hints: [
        'Compare two present values, both measured at t = 0.',
        'One is the value of investing now; the other is the <i>expected</i> value of the strategy of waiting.',
        'Wait if E[V₀(c₂)] > V₀(c₁).'
      ],
      why: '<b>The subtlety is inside the expectation.</b> The value of waiting is not simply the expected value of the deferred project — it is the expected value of <i>optimal behaviour after learning</i>. Because you invest at t = 1 only in the good state and walk away in the bad one, the bad state contributes <b>zero</b>, not a negative number. Waiting truncates the downside, and that truncation <i>is</i> the option value.<br><br>This also explains why a project with a positive NPV today can still be worth deferring: investing now captures the NPV but destroys the ability to avoid the bad state. The option to wait always has non-negative value, so <b>"positive NPV" is not by itself a sufficient reason to invest immediately.</b>'
    },

    {
      id: 'opt-t-ss17', kind: 'table', chapter: 'options', pts: 8,
      title: 'When should the firm wait? — SS17 Q3.1',
      source: 'SS17 Q3.1 · derivation (no published key for SS17; the method is the standard one from Lecture 8)',
      q: 'Depending on θ — the cash flow at t = 1 if the firm invests at t = 0 — in which case would the firm wait one period instead of investing right away? (8 points)',
      note: 'Work it in three steps: value the waiting strategy, value investing now, then compare.',
      data: [S17Q3],
      cols: ['Value'],
      rows: [
        {
          label: 'At t = 1, invest only if c₂ / 1.1 > 220, i.e. c₂ >', cells: [{
            a: 242, tol: 1, f: 'c₂ / 1.1 > 220  ⇔  c₂ > 242\n→ invest if c₂ = 605; do not invest if c₂ = 231',
            h: ['At t = 1 the firm pays 220 and receives c₂ one period later.', 'Investing is worthwhile if c₂/1.1 exceeds 220.'],
            diag: [{ v: 220, m: 'Do not forget to discount c₂ back one period: the threshold is 220 × 1.1 = 242.' },
            { v: 200, m: 'You divided instead of multiplying. The threshold is 220 × 1.1 = 242.' }]
          }]
        },
        {
          label: 'Value of the waiting strategy, measured at t = 1', cells: [{
            a: 165, tol: 1, f: '0.5 × (−220 + 605/1.1) + 0.5 × 0 = 0.5 × (−220 + 550) + 0 = 0.5 × 330 = 165',
            h: ['In the good state the firm invests; in the bad state it walks away and gets nothing.',
              'Good state value at t = 1: −220 + 605/1.1 = −220 + 550 = 330.',
              '0.5 × 330 + 0.5 × 0.'],
            diag: [{ v: 60, m: 'You included the bad state as a loss: 0.5 × 330 + 0.5 × (−220 + 210) = 160 − 5. But the firm is not obliged to invest — the bad state contributes <b>zero</b>. That truncation is the option value.' },
            { v: 330, m: 'That is the good state only. It occurs with probability 50 %, so multiply by 0.5.' }]
          }]
        },
        {
          label: 'Value of waiting, discounted to t = 0', cells: [{
            a: 150, tol: 1, f: '165 / 1.1 = 150',
            h: ['Bring the t = 1 value back one period at 10 %.'],
            diag: [{ v: 181.5, m: 'You compounded instead of discounting. 165 / 1.1 = 150.' }]
          }]
        },
        {
          label: 'Wait if θ <', total: true, cells: [{
            a: 407, tol: 2, f: 'Invest now: V₀(c₁) = −220 + θ/1.1\nWait if 150 > −220 + θ/1.1  ⇔  θ/1.1 < 370  ⇔  θ < 407\n→ the firm waits whenever θ < 407, and invests immediately whenever θ > 407',
            h: ['Write the value of investing now as a function of θ, then set the inequality.',
              '150 > −220 + θ/1.1.',
              'θ/1.1 < 370, so θ < 407.'],
            diag: [{ v: 370, m: 'That is θ/1.1, not θ. Multiply by 1.1 to get 407.' },
            { v: 165, m: 'That is the t = 1 value of waiting, not the θ threshold. Set 150 = −220 + θ/1.1 and solve.' },
            { v: 242, m: 'That is the c₂ threshold from step one. You now need the θ threshold — a different comparison.' }]
          }]
        }
      ],
      why: '<b>Read the answer economically.</b> The firm waits unless investing now is <i>very</i> attractive: θ must exceed 407 to beat a waiting strategy worth only 150. Yet investing now has a positive NPV as soon as θ > 242. So over the whole range <b>242 < θ < 407 the project is worth doing immediately and the firm should still wait</b> — sacrificing a positive NPV to keep the ability to avoid the bad state.<br><br>That is the central lesson of Lecture 8, and it is why real options matter for performance measurement. A manager measured on this year\'s residual income will exercise too early, because waiting shows up as nothing achieved. Which is exactly what SS17 Q3.2–3.4 goes on to ask: strong goal congruence is restored only when the <b>option value itself is capitalised and depreciated</b> when the option is exercised or expires.'
    },

    {
      id: 'opt-v-congruence', kind: 'verbal', chapter: 'options', pts: 4,
      title: 'Making the option to wait goal-congruent',
      source: 'SS17 Q3.3–3.4 and SS19 MC Q5 · official solution (SS19)',
      q: 'How must the option to wait be treated in the residual income measure so that <em>strong</em> goal congruence is achieved, and why does that treatment work?',
      must: [
        { k: ['capitalis', 'capitaliz', 'capital'], label: 'the option value is capitalised' },
        { k: ['depreciat', 'amortis', 'amortiz'], label: 'and depreciated' },
        { k: ['exercis', 'expire'], label: 'charged when exercised or expires' },
        { k: ['discount rate', 'time preference', 'no knowledge', 'without knowing'], label: 'no knowledge of the manager\'s discount rate is needed' }
      ],
      model: 'The <b>value of the option to wait must itself be capitalised</b> and treated as an interest-bearing asset, then <b>depreciated</b> — the charge falling when the option is <b>exercised or expires</b>. Treated that way, waiting is no longer reported as "nothing achieved": the manager holds an asset that earns its cost of capital, so residual income is positive whenever waiting is the value-maximising choice. Consequently <b>no knowledge of the manager\'s discount rate</b> is necessary to achieve a goal-congruent residual income measure, which is strong goal congruence.',
      why: '<b>The problem this fixes.</b> Under a naive residual income measure that capitalises only the investment outlay b, a manager who waits has invested nothing, so reports nothing, while the capital charge on any existing base continues. Waiting therefore looks like failure — and the manager exercises too early, destroying exactly the option value the firm wanted to preserve.<br><br>Capitalising the option makes the balance sheet reflect what the manager actually holds: <b>a valuable asset</b>. Then the residual income of waiting is positive precisely when waiting is optimal, and the alignment no longer depends on how patient the manager happens to be. <b>Notice the pattern across the whole course:</b> whenever a performance measure fails, the fix is to capitalise the thing the measure was ignoring — R&D, operating leases, and now the option to wait.'
    }

  ]);

})(window.VBM);
