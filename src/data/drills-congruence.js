/* ==========================================================================
   drills-congruence.js · Chapter 3: Goal congruence and the RBCAR.
   7 of 8 papers; 30 points on every test exam.
   ========================================================================== */
'use strict';

(function (V) {

  const CASE26 = {
    t: 'The project (test exam Q2)',
    rows: [
      ['Initial investment b at t = 0', '2,100'],
      ['Cash-flow pattern X = (x₁, x₂, x₃)', '(1,400, 300, 500)'],
      ['Actual cash flow at t', 'θ · x_t'],
      ['Magnitude parameter θ', '{1 ; 1.2}'],
      ['Cost of capital r', '10 %']
    ],
    fn: 'θ is <b>private information to the divisional manager</b>. Headquarters know only the pattern X.'
  };

  V.reg([

    /* ------------------------------------------------ the formulas */
    {
      id: 'cong-f-z', kind: 'formula', chapter: 'congruence', pts: 4,
      title: 'Write the RBCAR weight z_t',
      q: 'Assemble the relative-benefit weight z_t*(X).',
      note: 'γ = 1/(1+r). The denominator is the <b>discounted</b> sum of the pattern. That is the part people get wrong.',
      tokens: ['z_t*(X)', '=', 'x_t', '/', 'Σ_i x_i · γ^i'],
      decoys: ['Σ_i x_i', '×', 'b', 'NPV(θ)', 'θ · x_t', '1/T'],
      accept: [['z_t*(X)', '=', 'x_t', '/', 'Σ_i x_i · γ^i']],
      hints: [
        'It is a <i>share</i>: this period\'s benefit as a fraction of all the benefits.',
        'The numerator is this period\'s pattern element. The denominator is the sum of all of them, but discounted, because they arrive at different dates.',
        'z_t*(X) = x_t / Σ_i x_i · γ^i, with γ = 1/(1+r).'
      ],
      why: '<b>What z_t actually is:</b> the fraction of the project\'s total discounted benefit that arrives in period t. The rule then charges each period that same fraction of the total cost b. Hence the name: cost is allocated in proportion to <i>relative benefit</i>. Two consequences worth holding on to: (1) the weights are built from <b>X alone</b>, so you never need θ, which is exactly why the rule survives the manager knowing more than headquarters; (2) because the denominator is discounted, <b>the z_t do not sum to 1</b>, on the test exam they sum to about 1.16. If yours sum to 1 you forgot to discount.'
    },

    {
      id: 'cong-f-ri', kind: 'formula', chapter: 'congruence', pts: 4,
      title: 'Write residual income under RBCAR',
      q: 'Assemble the residual income for period t under the relative benefit cost allocation rule.',
      tokens: ['RI_t', '=', 'θ · x_t', '−', 'z_t*(X)', '·', 'b'],
      decoys: ['+', 'r · B_{t−1}', 'd_t · b', '/', 'NPV(θ)'],
      accept: [['RI_t', '=', 'θ · x_t', '−', 'z_t*(X)', '·', 'b']],
      hints: [
        'It is this period\'s actual cash flow minus this period\'s share of the cost.',
        'The actual cash flow is θ·x_t. The allocated cost is z_t times the whole investment b.',
        'RI_t = θ·x_t − z_t*(X)·b.'
      ],
      why: 'Notice what is <b>not</b> here: no separate depreciation line and no separate capital charge. <b>z_t·b covers both at once</b>: it is the allocated cost of capital <i>and</i> the write-off rolled into one number. (If a sub-question asks you to split them, use z_t = d_t + r·(1 − Σ_{i&lt;t} d_i).) And the identity that makes the whole thing work: substitute and you get <b>RI_t = z_t·NPV(θ)</b>. Since z_t &gt; 0 always, every period\'s residual income carries the <b>same sign as the NPV</b>. That single line is the entire goal-congruence argument.'
    },

    {
      id: 'cong-f-identity', kind: 'formula', chapter: 'congruence', pts: 3,
      title: 'Write the RBCAR identity',
      q: 'Assemble the identity that makes RBCAR goal-congruent, the one you use as a check on every answer.',
      tokens: ['RI_t', '=', 'z_t*(X)', '·', 'NPV(θ)'],
      decoys: ['−', 'b', 'θ · x_t', '+', 'r'],
      accept: [['RI_t', '=', 'z_t*(X)', '·', 'NPV(θ)']],
      hints: [
        'Residual income in period t is <i>proportional</i> to something. To what?',
        'To the NPV of the whole project, with z_t as the constant of proportionality.',
        'RI_t = z_t*(X) · NPV(θ).'
      ],
      why: 'Use this as your <b>arithmetic check in the exam</b>. Compute the NPV once, compute the z_t once, and every RI is then a single multiplication, and all of them must share the NPV\'s sign. On the test exam: NPV(θ=1) = −203.68 is negative, so all three RIs must be negative (−150.37, −32.22, −53.70 ✓). If one of your RIs has the wrong sign, you have an arithmetic error, not a conceptual one.'
    },

    /* ------------------------------------------------ NPV first */
    {
      id: 'cong-n-npv26', kind: 'numeric', chapter: 'congruence', pts: 6,
      title: 'Is the project worth doing? (test exam Q2.1)',
      source: 'SS23/SS24/SS25/SS26 test exam Q2.1 · official solution',
      q: 'Is it advantageous for the shareholders to undertake the project when <em>θ = 1</em>? Give the NPV. (6 points)',
      note: 'Write NPV(θ) as a function of θ first. You need it for both states, and the discounted sum reappears as the RBCAR denominator.',
      data: [CASE26],
      unit: 'EUR',
      a: -203.68, tol: 1.5,
      f: 'NPV(θ) = −2,100 + θ·[1,400/1.1 + 300/1.1² + 500/1.1³] = −2,100 + θ·1,896.33\nNPV(θ=1) = −2,100 + 1,896.33 = −203.68   → NOT advantageous\nNPV(θ=1.2) = −2,100 + 2,275.58 = +175.58 → advantageous',
      hints: [
        'Discount each cash flow: 1,400/1.1, then 300/1.1², then 500/1.1³.',
        'The three present values are 1,272.73 + 247.93 + 375.66 = 1,896.33.',
        'NPV(θ=1) = −2,100 + 1 × 1,896.33.'
      ],
      diag: [
        { v: 100, m: 'That is −2,100 + 2,200, the <b>undiscounted</b> sum of the cash flows. Every flow has to be discounted at 10 %.' },
        { v: 203.68, m: 'Sign. The discounted inflows of 1,896.33 fall short of the 2,100 outlay, so the NPV is negative.' },
        { v: 175.58, m: 'That is NPV at θ = 1.2. The question asks about θ = 1, the point being that the answer differs by state.' },
        { v: 1896.33, m: 'That is the discounted sum of the inflows. Subtract the initial investment of 2,100.' }
      ],
      why: '<b>Keep the 1,896.33.</b> It is not just an intermediate step. It is the exact denominator of every z_t in the next sub-question, so computing it once serves both. The structural point of the question: the project is <b>value-destroying at θ = 1 and value-creating at θ = 1.2</b>. Since only the manager knows θ, headquarters cannot simply mandate "accept" or "reject". They must design a performance measure that makes the manager <i>want</i> to accept exactly when θ = 1.2. That is the problem RBCAR solves.'
    },

    /* ------------------------------------------------ the RBCAR grid */
    {
      id: 'cong-t-rbcar26', kind: 'table', chapter: 'congruence', pts: 10,
      title: 'Draw the RBCAR grid (test exam Q2.2)',
      source: 'SS23/SS24/SS25/SS26 test exam Q2.2 · official solution',
      q: 'Calculate the residual income in each period for <em>both</em> possible values of θ. (10 points)',
      note: 'Fastest route: get the three z_t, then multiply each by the NPV of the relevant state.',
      data: [CASE26, {
        t: 'Already established in Q2.1',
        rows: [['Discounted sum Σ x_i·γ^i', '1,896.33'], ['NPV(θ = 1)', '−203.68'], ['NPV(θ = 1.2)', '+175.58']]
      }],
      cols: ['t = 1', 't = 2', 't = 3'],
      skeleton: {
        prompt: 'Lay out the grid.',
        bank: ['z_t = x_t / 1,896.33', 'RI_t (θ = 1)', 'RI_t (θ = 1.2)',
          'z_t = x_t / 2,200', 'd_t = 1/T', '− Capital charge'],
        order: ['z_t = x_t / 1,896.33', 'RI_t (θ = 1)', 'RI_t (θ = 1.2)'],
        why: {
          'z_t = x_t / 2,200': 'That is the <b>undiscounted</b> sum. The RBCAR denominator is Σ x_i·γ^i = 1,896.33.',
          'd_t = 1/T': 'That is straight-line depreciation, the rule RBCAR is being contrasted with.',
          '− Capital charge': 'Under RBCAR there is no separate capital-charge row: z_t·b already contains it.'
        }
      },
      rows: [
        {
          label: 'z_t = x_t / 1,896.33', cells: [
            { a: 0.7383, tol: 0.002, f: '1,400 / 1,896.33 = 0.7383', h: ['Divide the pattern element by the discounted sum.'], diag: [{ v: 0.6364, m: 'That is 1,400 / 2,200. You used the undiscounted sum.' }] },
            { a: 0.1582, tol: 0.002, f: '300 / 1,896.33 = 0.1582', h: [] },
            { a: 0.2637, tol: 0.002, f: '500 / 1,896.33 = 0.2637', h: [], diag: [{ v: 0.1039, m: 'Do not discount x_t itself. Only the denominator is discounted; the numerator is the raw pattern element.' }] }]
        },
        {
          label: 'RI_t (θ = 1)', cells: [
            {
              a: -150.37, tol: 1.5, f: 'z₁ · NPV(1) = 0.7383 × (−203.68) = −150.37\n(check: 1,400 − 0.7383 × 2,100 = −150.37)',
              h: ['Multiply z₁ by the NPV at θ = 1.', '0.7383 × (−203.68).'],
              diag: [{ v: 150.37, m: 'Sign. The NPV is negative, so every RI must be negative. That is the whole mechanism.' },
              { v: 490, m: 'That is the <b>straight-line</b> RI for period 1, which comes in Q2.4. Under RBCAR the answer is negative.' }]
            },
            { a: -32.22, tol: 1.5, f: '0.1582 × (−203.68) = −32.22', h: [] },
            { a: -53.7, tol: 1.5, f: '0.2637 × (−203.68) = −53.70', h: [] }]
        },
        {
          label: 'RI_t (θ = 1.2)', cells: [
            { a: 129.63, tol: 1.5, f: '0.7383 × (+175.58) = +129.63', h: ['Same weights, the other NPV.'] },
            { a: 27.78, tol: 1.5, f: '0.1582 × (+175.58) = +27.78', h: [] },
            { a: 46.3, tol: 1.5, f: '0.2637 × (+175.58) = +46.30', h: [] }]
        }
      ],
      why: '<b>Look at the sign pattern. It is the answer to Q2.3.</b> At θ = 1 all three residual incomes are negative; at θ = 1.2 all three are positive. So whatever the manager\'s horizon, and whatever discount rate they privately apply, they see losses in the bad state and gains in the good state. A manager paid on this measure accepts the project exactly when shareholders want it accepted, <b>even though headquarters never learn θ</b>. Note also that the weights z_t are identical in both states: they depend only on X, which is the public information.'
    },

    /* ------------------------------------------------ straight-line contrast */
    {
      id: 'cong-t-sl26', kind: 'table', chapter: 'congruence', pts: 8,
      title: 'The straight-line contrast (test exam Q2.4)',
      source: 'SS23/SS24/SS25/SS26 test exam Q2.4 · official solution',
      q: 'Calculate residual income for each period at <em>θ = 1</em> using <em>straight-line depreciation</em>. Might the manager have an incentive to decide against the shareholders\' interest? (8 points)',
      note: 'Now you do need separate depreciation and capital-charge rows. Book value opens at 2,100 and falls by 700 a year.',
      data: [CASE26],
      cols: ['t = 1', 't = 2', 't = 3'],
      skeleton: {
        prompt: 'Lay out the straight-line RI table.',
        bank: ['Cash flow', '− Depreciation (2,100 / 3)', '− Capital charge (10 % × opening book value)', '= RI_t',
          '− z_t · b', '+ Capital charge'],
        order: ['Cash flow', '− Depreciation (2,100 / 3)', '− Capital charge (10 % × opening book value)', '= RI_t'],
        why: {
          '− z_t · b': 'That is the RBCAR row. Under straight-line you charge depreciation and interest separately.',
          '+ Capital charge': 'The capital charge is always <b>subtracted</b>: it is the cost of the capital tied up.'
        }
      },
      rows: [
        { label: 'Cash flow', cells: [{ a: 1400, f: 'θ·x₁ = 1 × 1,400', h: [] }, { a: 300, f: '300', h: [] }, { a: 500, f: '500', h: [] }] },
        {
          label: '− Depreciation (2,100 / 3)', cells: [
            { a: -700, f: '−700', h: ['Equal charges: 2,100 / 3.'] },
            { a: -700, f: '−700', h: [] }, { a: -700, f: '−700', h: [] }]
        },
        {
          label: '− Capital charge (10 % × opening book value)', cells: [
            { a: -210, f: '−10 % × 2,100 = −210', h: ['Opening book value in period 1 is the full 2,100.'] },
            {
              a: -140, f: '−10 % × 1,400 = −140', h: ['Book value has fallen to 2,100 − 700 = 1,400.'],
              diag: [{ v: -210, m: 'The book value shrinks each year. After one 700 charge it is 1,400, so the capital charge is 140.' }]
            },
            { a: -70, f: '−10 % × 700 = −70', h: ['Book value is now 700.'] }]
        },
        {
          label: '= RI_t', total: true, cells: [
            {
              a: 490, f: '1,400 − 700 − 210 = +490', h: [],
              diag: [{ v: -150.37, m: 'That is the RBCAR figure. Under straight-line, period 1 is strongly <b>positive</b>, which is precisely the problem.' }]
            },
            { a: -540, f: '300 − 700 − 140 = −540', h: [] },
            { a: -270, f: '500 − 700 − 70 = −270', h: [] }]
        }
      ],
      why: '<b>This table is the exam\'s punchline.</b> The project has a negative NPV of −203.68 at θ = 1, shareholders do not want it. Yet straight-line depreciation reports a residual income of <b>+490 in period 1</b>. A manager who knows they will leave the company after the first year sees a bonus, takes the project, and destroys value. <b>Straight-line depreciation therefore fails to deliver goal congruence.</b><br><br>Now check Preinreich-Lücke: 490/1.1 − 540/1.1² − 270/1.1³ = 445.45 − 446.28 − 202.86 = <b>−203.68</b>: exactly the NPV, and exactly what the RBCAR residual incomes also discount to. <b>The total is always right; only the timing differs.</b> RBCAR\'s achievement is not a better total, it is spreading the total so that <i>every single period</i> carries the NPV\'s sign, leaving a short-horizon manager nowhere to hide.'
    },

    /* ------------------------------------------------ the verbal answers */
    {
      id: 'cong-v-rbcar', kind: 'verbal', chapter: 'congruence', pts: 6,
      title: 'The 6-point RBCAR answer',
      source: 'SS23-SS26 test exam Q2.3 and SS19 Q4.5 · official solutions',
      q: 'Will the manager decide in the interest of the shareholders when applying the relative benefit cost allocation rule? Why? Refer to the manager\'s time preferences. (6 points)',
      note: 'Learn this one close to word-for-word. Two phrases carry most of the marks.',
      must: [
        { k: ['proportional'], label: 'the word "proportional"' },
        { k: ['npv', 'net present value'], label: 'proportional to the NPV' },
        { k: ['every period', 'each period', 'all periods', 'every year'], label: 'in every period' },
        { k: ['time preference', 'discount rate', 'independent of', 'regardless of'], label: 'independently of time preferences' },
        { k: ['strong'], label: 'the verdict: strong goal congruence' }
      ],
      model: 'Yes. The relative benefit cost allocation rule guarantees that the residual income in each period is <b>proportional to the NPV</b> of the project. A positive-NPV project therefore produces a positive residual income in <b>every</b> period, and a negative-NPV project a negative residual income in every period. Hence the manager always decides in the shareholders\' interest, and this holds <b>independently of the manager\'s time preferences</b>: this is <b>strong goal congruence</b>.',
      why: 'Marks here are awarded for <b>specific words</b>, not general understanding. "Proportional" is the load-bearing one: it is what rules out any weighting of periods, positive, negative, front-loaded, back-loaded, flipping the sign of the manager\'s objective. "In every period" is what makes the horizon irrelevant. "Independently of time preferences" is what upgrades the verdict from <i>weak</i> to <i>strong</i>. Write all three and the marks are unavoidable.'
    },

    {
      id: 'cong-v-sl', kind: 'verbal', chapter: 'congruence', pts: 8,
      title: 'The 8-point straight-line answer',
      source: 'SS23-SS26 test exam Q2.4 · official solution',
      q: 'Might the manager have incentives to decide against the interest of the shareholders under straight-line depreciation? Illustrate with an example. (8 points)',
      must: [
        { k: ['negative npv', 'npv is negative', 'value-destroying', 'destroy', '-203', '−203'], label: 'the project has a negative NPV at θ = 1' },
        { k: ['positive', '490'], label: 'residual income in period 1 is positive (+490)' },
        { k: ['leave', 'leaves', 'horizon', 'first year', 'short'], label: 'a manager who leaves after the first year' },
        { k: ['accept', 'undertake', 'invest'], label: 'would undertake it anyway' },
        { k: ['no goal congruence', 'not goal congruent', 'fails', 'no congruence'], label: 'so straight-line fails goal congruence' }
      ],
      model: 'Yes. Although the project has a <b>negative NPV</b> at θ = 1 (−203.68), the residual income in period 1 under straight-line depreciation is <b>positive (+490)</b>. A manager who intends to <b>leave the company after the first year</b> would therefore <b>undertake</b> the project even though it destroys shareholder value. Straight-line depreciation thus <b>fails to deliver goal congruence</b>.',
      why: 'The structure of the answer is worth internalising because it recurs: <b>state the shareholder verdict, state the manager\'s reported number, name the horizon that makes them diverge, draw the conclusion.</b> Same four moves answer SS19 Q4.2 (ROI, manager leaves after 2019) and SS19 Q4.4. Note the example is <i>required</i> by the question, "illustrate your arguments with an example" means naming the departing manager explicitly, not just asserting that incentives may be distorted.'
    },

    /* ------------------------------------------------ the three definitions */
    {
      id: 'cong-c-defs', kind: 'classify', chapter: 'congruence', pts: 6,
      title: 'Weak, strong, or robust?',
      q: 'Each statement describes one of the three grades of goal congruence. Which one?',
      note: 'On 8 of 8 papers. The distinguishing features are: whose discount rate, and is there uncertainty.',
      buckets: ['Weak', 'Strong', 'Robust'],
      items: [
        { t: 'The manager decides in the shareholders\' interest if and only if the manager\'s discount rate is identical to the shareholders\'.', b: 0, why: '<b>Weak.</b> "If and only if identical" is the signature. The criterion holds only for k_t <b>equal to the owner\'s</b> rate: the moment preferences diverge, alignment can break.' },
        { t: 'Decisions stay aligned even when the manager\'s and the shareholders\' discount rates differ, assuming no uncertainty or a risk-neutral manager.', b: 1, why: '<b>Strong.</b> The criterion holds for <b>arbitrary non-negative</b> k_t: any time preference at all. This is what RBCAR achieves, and it is why "independently of the manager\'s time preferences" is the mark-scoring phrase.' },
        { t: 'Decisions stay aligned when preferences differ and there is uncertainty and the manager is risk-averse.', b: 2, why: '<b>Robust.</b> The strongest grade: E[U(RI₁,…,RI_T) | θ] is maximised for <b>any</b> utility function U weakly increasing in each argument. It survives risk aversion, not merely differing discount rates.' },
        { t: 'The criterion is E[Σ k_t·RI_t | θ] evaluated for arbitrary non-negative k_t.', b: 1, why: '<b>Strong.</b> "Arbitrary non-negative k_t" is precisely the formal definition of strong goal congruence.' },
        { t: 'The criterion is E[U(RI₁,…,RI_T) | θ] for any U weakly increasing in each argument.', b: 2, why: '<b>Robust.</b> Moving from a linear weighted sum to an arbitrary increasing utility function is exactly the step from strong to robust.' },
        { t: 'Sinking-fund depreciation achieves this grade, and no better.', b: 0, why: '<b>Weak.</b> Sinking-fund makes ROI equal the IRR in every period, which aligns the manager only when their discount rate matches the owner\'s. RBCAR is the rule that reaches <i>strong</i>.' }
      ],
      why: 'Think of it as three widening circles of things the mechanism can survive. <b>Weak:</b> survives nothing, manager and owner must discount identically. <b>Strong:</b> survives <i>any</i> difference in time preference, but still assumes away risk (no uncertainty, or a risk-neutral manager). <b>Robust:</b> survives differing preferences <i>and</i> uncertainty <i>and</i> risk aversion. Each grade relaxes one more assumption about how alike the manager and the owner have to be.'
    },

    /* ------------------------------------------------ MC items */
    {
      id: 'cong-mc-preinreich', kind: 'mc', chapter: 'congruence', pts: 2,
      title: 'MC: the Preinreich-Lücke theorem',
      source: 'Consistent with SS17 MC Q3 and SS19 Q4.4',
      q: 'You computed the residual incomes of a project under straight-line depreciation, then again under RBCAR. What is true of the two present values?',
      opts: [
        { t: 'They are equal, and both equal the project\'s NPV.', ok: true, y: 'Correct: the Preinreich-Lücke theorem. The present value of residual incomes is invariant to the depreciation schedule.' },
        { t: 'The RBCAR present value is higher, because it is goal-congruent.', ok: false, y: 'No. Goal congruence is about the <i>distribution across periods</i>, never the total. Both discount to −203.68 on the test-exam data.' },
        { t: 'They differ whenever the cash-flow pattern is uneven.', ok: false, y: 'The pattern changes the individual RIs but never their present value.' },
        { t: 'They are equal only if the manager\'s discount rate equals the WACC.', ok: false, y: 'The theorem is about the owner\'s discounting of the RI stream. It holds regardless of the manager\'s private rate.' }
      ],
      why: 'This is the most useful theorem in the course because it converts a long calculation into one line. SS19 Q4.4 asks for the NPV of three residual incomes and the official key accepts <b>"NPV of RIs = NPV of the project = 21,000"</b> for full marks, <i>with an explanation</i>. It is also your free check on every RI table: discount your rows, and if they do not sum to the NPV, you have an arithmetic error. And it clarifies what the depreciation rule is actually for: it cannot change how much value there is, only <b>when the manager is shown it</b>.'
    },

    {
      id: 'cong-mc-info', kind: 'mc', chapter: 'congruence', pts: 2,
      title: 'MC: what does each rule need to know?',
      source: 'SS23-SS26 test exam MC 1.1 · official solution',
      q: 'Which of the following statements is <em>wrong</em>?',
      opts: [
        { t: 'Sinking fund depreciation needs only a forecast of the inter-temporal pattern of project cash flows.', ok: true, y: 'Wrong, so this is the answer. Sinking-fund needs the <b>IRR</b>, and to get the IRR you need the full future cash flows, magnitude included. It is <b>RBCAR</b> that needs only the pattern.' },
        { t: 'Sinking fund depreciation needs a forecast of future cash flows.', ok: false, y: 'True: depr_t = cash operating margin_t − IRR × invested capital_{t−1}, and the IRR requires the whole stream.' },
        { t: 'EVA improvement on the current capital basis is harder to achieve when sinking fund depreciation is used compared to straight-line depreciation.', ok: false, y: 'True. Under sinking-fund, EVA declines over the asset\'s life; under straight-line it rises as book value shrinks. Improving on last year is therefore harder.' }
      ],
      why: 'This exact item has appeared word-for-word on SS19, SS23, SS24, SS25 and SS26, and the trap is a <b>swap</b>: the "only the inter-temporal pattern" property is genuinely true, just of the <i>other</i> rule. Fix the contrast in your head: <b>RBCAR needs the pattern X only</b> (which is why it works when θ is private); <b>sinking-fund needs the IRR</b>, hence the full stream (which is why it manages only weak goal congruence).'
    }

  ]);

})(window.VBM);
