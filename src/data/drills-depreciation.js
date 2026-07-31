/* ==========================================================================
   drills-depreciation.js · Chapter 4: Depreciation methods, ROI and RI.
   Built on SS19 Question 4 (32 points), the deepest worked example available.
   ========================================================================== */
'use strict';

(function (V) {

  const S19Q4 = {
    t: 'The project (SS19 Q4)',
    cols: ['2019', '2020', '2021'],
    rows: [['Cash flow (EUR)', '30,800', '484,000', '656,183']],
    fn: 'Cash outlay <b>900,000</b> in 2018 · owner\'s discount rate r = <b>10 %</b> · IRR = <b>11 %</b> (given in 4.3).<br>'
      + 'The company measures invested capital by the capital at the <b>beginning</b> of the period: <b>no averaging</b>. '
      + 'The first depreciation charge falls at the end of 2019, whichever method is used.'
  };

  V.reg([

    /* ------------------------------------------------ formulas */
    {
      id: 'dep-f-roi', kind: 'formula', chapter: 'depreciation', pts: 3,
      title: 'Write ROI for a period',
      q: 'Assemble the return on investment for period t as this course defines it.',
      tokens: ['ROI_t', '=', '(', 'cash flow_t', '−', 'depreciation_t', ')', '/', 'Invested capital_{t−1}'],
      decoys: ['+', 'r · B_{t−1}', 'NOPAT', 'Invested capital_t', 'θ · x_t'],
      accept: [['ROI_t', '=', '(', 'cash flow_t', '−', 'depreciation_t', ')', '/', 'Invested capital_{t−1}']],
      hints: [
        'Numerator: an accounting profit for the period. Denominator: the capital it was earned on.',
        'The profit is cash flow less depreciation. The capital is measured at the <b>start</b> of the period.',
        'ROI_t = (cash flow_t − depreciation_t) / Invested capital_{t−1}.'
      ],
      why: 'The subscript <b>t−1</b> on the denominator is not decoration. It is where marks are lost. Capital earns during the period, so it must be measured at the period\'s <i>opening</i>. SS19 makes this explicit ("measure the invested capital by the invested capital at the beginning of the respective period and not to use any averaged values") precisely because the default elsewhere in the course is the average. <b>Notice the contrast with EVA:</b> ROI is a ratio and gives no signal about scale, while EVA is an absolute amount. That is why a manager paid on ROI may reject a value-creating project that happens to dilute their current ratio.'
    },

    {
      id: 'dep-f-sinking', kind: 'formula', chapter: 'depreciation', pts: 4,
      title: 'Write sinking-fund depreciation',
      q: 'Assemble the sinking-fund depreciation charge for period t.',
      note: '"Cash operating margin" is simply the period\'s cash flow.',
      tokens: ['depr_t', '=', 'cash operating margin_t', '−', 'IRR', '×', 'invested capital_{t−1}'],
      decoys: ['r', '+', 'b / T', 'z_t · b', 'WACC', 'invested capital_t'],
      accept: [['depr_t', '=', 'cash operating margin_t', '−', 'IRR', '×', 'invested capital_{t−1}']],
      hints: [
        'The rule is reverse-engineered from a target: it forces ROI to equal the IRR in every single period.',
        'So set (cash flow − depreciation) / capital = IRR and solve for depreciation.',
        'depr_t = cash operating margin_t − IRR × invested capital_{t−1}.'
      ],
      why: '<b>The formula is a rearrangement of its own purpose.</b> Demand ROI_t = IRR for every t; substitute the ROI definition; solve for depr_t. That is all it is, which is why "sinking-fund depreciation makes ROI equal the IRR in every period" is a definition rather than a discovery. Two consequences the exams love: (1) you need the <b>IRR</b>, and the IRR requires the entire future cash-flow stream, so this rule needs far more information than RBCAR; (2) the charge can come out <b>negative</b> in an early low-cash-flow year, on SS19 the 2019 charge is −68,200, meaning book value <i>rises</i>. That is not an error.'
    },

    /* ------------------------------------------------ 4.1 NPV */
    {
      id: 'dep-n-npv19', kind: 'numeric', chapter: 'depreciation', pts: 3,
      title: 'Should the company accept? (SS19 Q4.1)',
      source: 'SS19 Q4.1 · official solution',
      q: 'Should the company accept the project? Give the NPV. (3 points)',
      data: [S19Q4],
      unit: 'EUR',
      a: 21000, tol: 40,
      f: 'NPV = −900,000 + 30,800/1.1 + 484,000/1.1² + 656,183/1.1³\n    = −900,000 + 28,000 + 400,000 + 493,000\n    = +21,000   → Yes, accept the project',
      hints: [
        'Discount all three flows at the owner\'s rate of 10 %, then subtract the 900,000 outlay.',
        'The three present values are exactly 28,000, 400,000 and 493,000, the numbers were chosen to be clean.',
        '921,000 − 900,000.'
      ],
      diag: [
        { v: 270983, m: 'That is the <b>undiscounted</b> sum minus the outlay. Discount at 10 % first.' },
        { v: 921000, m: 'That is the present value of the inflows. Subtract the 900,000 outlay.' },
        { v: -21000, m: 'Sign: the inflows of 921,000 exceed the outlay of 900,000, so the NPV is positive.' }
      ],
      why: '<b>Hold on to two numbers for the rest of the question.</b> First, <b>NPV = +21,000</b>: shareholders want this project, so every later sub-question is asking "does the manager\'s performance measure also want it?" Second, <b>921,000</b> is the discounted sum of the cash flows, and that is exactly the denominator of the RBCAR weights in Q4.5. As on the test exam, the NPV calculation quietly does double duty.'
    },

    /* ------------------------------------------------ 4.2 straight-line ROI */
    {
      id: 'dep-n-roi19', kind: 'numeric', chapter: 'depreciation', pts: 6,
      title: 'Straight-line ROI, and the departing manager (SS19 Q4.2)',
      source: 'SS19 Q4.2 · official solution',
      q: 'Calculate the ROI of the project in 2019 under <em>straight-line</em> depreciation. Give your answer as a percentage. (part of 6 points)',
      data: [S19Q4],
      unit: 'per cent (e.g. enter 12.5 for 12.5 %)',
      a: -29.9111, tol: 0.2,
      f: 'Straight-line depreciation = 900,000 / 3 = 300,000\nROI(2019) = (30,800 − 300,000) / 900,000 = −269,200 / 900,000 = −29.9111 %',
      hints: [
        'Straight-line over three years: 900,000 / 3.',
        'Numerator = 30,800 − 300,000 = −269,200. Denominator = the opening capital of 900,000.',
        '−269,200 / 900,000 = −0.299111.'
      ],
      diag: [
        { v: 3.4222, m: 'You forgot the depreciation. ROI is (cash flow − depreciation) / capital, not cash flow / capital.' },
        { v: 29.9111, m: 'Sign. The 2019 cash flow of 30,800 does not come close to covering a 300,000 depreciation charge.' },
        { v: -0.2991, m: 'That is the decimal. Enter it as a percentage: −29.91.' }
      ],
      why: 'The examiner\'s follow-up is worth more than the arithmetic: <i>"Suppose the manager\'s compensation depends on the ROI of the firm and he knows he leaves the company after 2019. Will he accept the project?"</i> The official answer is conditional, and that is what earns the 3 points: <b>"It depends on the current ROI of the firm. If it is lower than −29.9111 % the manager will accept the project; if it is higher, he will reject it."</b><br><br>Sit with how bad that is. The project has a <b>positive</b> NPV of 21,000: shareholders unambiguously want it. But a departing manager sees a ROI of −29.9 % in the only year they will be measured on, and almost any healthy firm has a current ROI above that. So the manager rejects a value-creating project. This is the mirror image of the test exam, where straight-line made the manager <i>accept</i> a value-destroying one. <b>Straight-line distorts in both directions</b>: the failure is not a bias, it is the absence of any link to NPV.'
    },

    /* ------------------------------------------------ 4.3 sinking fund */
    {
      id: 'dep-t-sink19', kind: 'table', chapter: 'depreciation', pts: 8,
      title: 'Sinking-fund depreciation (SS19 Q4.3)',
      source: 'SS19 Q4.3 · official solution',
      q: 'The junior controller has calculated that the project\'s internal rate of return is <em>IRR = 11 %</em>. Assume the company uses sinking-fund depreciation. Calculate the depreciation in 2019 and 2020, then the ROI in 2021. (8 points)',
      note: 'Book value is <b>opening capital minus the charges already taken</b>. A negative charge makes book value rise.',
      data: [S19Q4],
      cols: ['2019', '2020', '2021'],
      rows: [
        { label: 'Opening invested capital', cells: [{ v: '900,000' }, { a: 968200, f: '900,000 − (−68,200) = 968,200, the negative charge <i>raised</i> book value', h: ['Opening capital minus the 2019 depreciation charge.', 'The 2019 charge was −68,200, so 900,000 + 68,200.'], diag: [{ v: 831800, m: 'You subtracted 68,200. The charge is <b>negative</b>, so subtracting it increases the book value to 968,200.' }] }, { a: 590702, f: '968,200 − 377,498 = 590,702', h: [] }] },
        { label: 'Cash flow', cells: [{ v: '30,800' }, { v: '484,000' }, { v: '656,183' }] },
        {
          label: 'Depreciation = CF − IRR × opening capital', total: true, cells: [
            {
              a: -68200, f: '30,800 − 0.11 × 900,000 = 30,800 − 99,000 = −68,200   [2 points]',
              h: ['Use the sinking-fund formula with IRR = 11 %.', '0.11 × 900,000 = 99,000.'],
              diag: [{ v: 68200, m: 'Sign. The cash flow of 30,800 is far below the 99,000 capital charge, so the charge is negative.' },
              { v: 300000, m: 'That is straight-line. Sinking-fund is cash flow − IRR × opening capital.' },
              { v: -59200, m: 'You used r = 10 % instead of the IRR of 11 %. Sinking-fund uses the <b>IRR</b>.' }]
            },
            {
              a: 377498, f: '484,000 − 0.11 × 968,200 = 484,000 − 106,502 = 377,498   [2 points]',
              h: ['Opening capital for 2020 is 968,200.', '0.11 × 968,200 = 106,502.'],
              diag: [{ v: 392500, m: 'You used an opening capital of 831,800, but the negative 2019 charge <i>raised</i> book value to 968,200.' }]
            },
            { a: 591205.78, tol: 3, f: '656,183 − 0.11 × 590,702 = 656,183 − 64,977.22 = 591,205.78', h: ['Opening capital for 2021 is 590,702.'] }]
        },
        {
          label: 'ROI = (CF − depreciation) / opening capital', total: true, cells: [null, null, {
            a: 11, tol: 0.15, f: '(656,183 − 591,205.78) / 590,702 = 64,977.22 / 590,702 = 11 %   [2 points]',
            h: ['You can compute it, or you can quote the property of the rule.',
              'Sinking-fund depreciation is defined so that ROI equals the IRR in every period.',
              'ROI = 11 %.'],
            diag: [{ v: 0.11, m: 'Enter it as a percentage: 11.' }, { v: 10, m: 'The rule sets ROI equal to the <b>IRR</b> (11 %), not to the cost of capital (10 %).' }]
          }]
        }
      ],
      why: 'The official key notes the ROI "can be derived by calculation <b>or by the relation ROI = IRR = 11 %</b>", so quoting the property is worth full marks and takes five seconds. That is the whole appeal of the rule: a constant, meaningful ROI that no longer drifts upward as book value shrinks.<br><br>But look at the price. The 2019 charge is <b>−68,200</b>: book value <i>grows</i> to 968,200 because the project earned less than the 11 % it must. And the examiner\'s follow-up exposes the real limitation: <i>"May the manager\'s decision depend on his time preferences under sinking-fund?"</i>: <b>"Yes, because the ROIs of the firm without the project may differ between years. The project may improve the ROI in some years and impair it in others, so the manager\'s decision then depends on his time preferences."</b> Constant project ROI is not enough, because the manager is measured on the <i>firm\'s</i> ROI. Hence sinking-fund reaches only <b>weak</b> goal congruence.'
    },

    /* ------------------------------------------------ 4.4 straight-line RI */
    {
      id: 'dep-t-ri19', kind: 'table', chapter: 'depreciation', pts: 6,
      title: 'Residual income under straight-line (SS19 Q4.4)',
      source: 'SS19 Q4.4 · official solution',
      q: 'The company uses straight-line depreciation and employs Residual Income (at 10 %) instead of ROI. Calculate the RI in each year and the NPV of the three. (6 points)',
      data: [S19Q4],
      cols: ['2019', '2020', '2021'],
      skeleton: {
        prompt: 'Lay out the residual-income table.',
        bank: ['Cash flow', '− Depreciation (900,000 / 3)', '− Capital charge (10 % × opening capital)', '= RI',
          '− IRR × opening capital', '− z_t · b'],
        order: ['Cash flow', '− Depreciation (900,000 / 3)', '− Capital charge (10 % × opening capital)', '= RI'],
        why: {
          '− IRR × opening capital': 'The IRR belongs to sinking-fund depreciation. Residual income charges the <b>owner\'s</b> rate, 10 %.',
          '− z_t · b': 'That is the RBCAR row, question 4.5.'
        }
      },
      rows: [
        { label: 'Cash flow', cells: [{ v: '30,800' }, { v: '484,000' }, { v: '656,183' }] },
        { label: '− Depreciation (900,000 / 3)', cells: [{ a: -300000, f: '−300,000', h: [] }, { a: -300000, f: '−300,000', h: [] }, { a: -300000, f: '−300,000', h: [] }] },
        {
          label: '− Capital charge (10 % × opening capital)', cells: [
            { a: -90000, f: '−10 % × 900,000 = −90,000', h: ['Opening capital 900,000.'] },
            { a: -60000, f: '−10 % × 600,000 = −60,000', h: ['Book value has fallen to 900,000 − 300,000 = 600,000.'], diag: [{ v: -90000, m: 'Book value shrinks by 300,000 a year under straight-line. In 2020 the opening capital is 600,000.' }] },
            { a: -30000, f: '−10 % × 300,000 = −30,000', h: [] }]
        },
        {
          label: '= RI', total: true, cells: [
            { a: -359200, f: '30,800 − 300,000 − 90,000 = −359,200   [1 point]', h: [] },
            { a: 124000, f: '484,000 − 300,000 − 60,000 = +124,000   [1 point]', h: [] },
            { a: 326183, f: '656,183 − 300,000 − 30,000 = +326,183   [1 point]', h: [] }]
        },
        {
          label: 'NPV of the three RIs', total: true, cells: [null, null, {
            a: 21000, tol: 60, f: 'NPV = −359,200/1.1 + 124,000/1.1² + 326,183/1.1³ = 21,000   [1 point]\nOr in one line: NPV of RIs = NPV of the project = 21,000 (Preinreich-Lücke)',
            h: ['You can discount the three rows, or you can quote a theorem.',
              'Preinreich-Lücke: the present value of residual incomes equals the project\'s NPV regardless of the depreciation schedule.',
              'It is the 21,000 from Q4.1.'],
            diag: [{ v: 90983, m: 'That is the undiscounted sum of the RIs. Discount each at 10 %.' }]
          }]
        }
      ],
      why: 'The official key accepts <b>"NPV = NPV from 4.1 = 21,000 (explanation required)"</b>: a theorem quoted with justification beats three discountings, and it cannot be arithmetically wrong.<br><br>The examiner then asks for a situation where the manager does not decide in the owner\'s interest, and the key is one sentence: <b>"If the manager knows that he will leave the company after 2019, he will reject the project even though it is beneficial for the company."</b> RI in 2019 is <b>−359,200</b> on a project worth <b>+21,000</b>. Straight-line depreciation front-loads the whole cost of a back-loaded project, so the early years look catastrophic and the late years look wonderful, and the manager\'s horizon decides everything.'
    },

    /* ------------------------------------------------ 4.5 RBCAR on SS19 */
    {
      id: 'dep-t-rbcar19', kind: 'table', chapter: 'depreciation', pts: 9,
      title: 'RBCAR on the same project (SS19 Q4.5)',
      source: 'SS19 Q4.5 · official solution',
      q: 'Now use the relative benefit cost allocation rule instead of straight-line depreciation. Calculate the residual income in 2019, and the depreciation in 2019 and 2020. (9 points)',
      note: 'Here b = 900,000 and the discounted sum of the cash flows is the 921,000 you already found in Q4.1.',
      data: [S19Q4, {
        t: 'Already established', rows: [['Discounted sum of the cash flows', '921,000'], ['NPV', '+21,000']]
      }],
      cols: ['2019', '2020'],
      rows: [
        {
          label: 'z_t = CF_t / 921,000', cells: [
            {
              a: 0.0334, tol: 0.0004, f: '30,800 / 921,000 = 0.0334   [1 point]',
              h: ['Cash flow divided by the discounted sum.'],
              diag: [{ v: 0.0254, m: 'That looks like 30,800 / 1,211,000 or similar, the denominator is the discounted sum, 921,000.' }]
            },
            { a: 0.5255, tol: 0.0006, f: '484,000 / 921,000 = 0.5255   [1 point]', h: [] }]
        },
        {
          label: 'RI_t = CF_t − z_t · b', total: true, cells: [
            {
              a: 740, tol: 45, f: 'RI(2019) = 30,800 − 0.0334 × 900,000 = 30,800 − 30,060 = 740   [2 points]\n[Unrounded z gives 702.28, the key accepts both]',
              h: ['This period\'s cash flow minus its allocated share of the 900,000.',
                '0.0334 × 900,000 = 30,060.'],
              diag: [{ v: -359200, m: 'That is the straight-line figure from Q4.4. Under RBCAR the answer is <b>positive</b>: that is the point of the question.' },
              { v: 702.28, m: 'That is the unrounded answer, and the official key explicitly accepts it. Marked correct.', ok: true }]
            }, null]
        },
        {
          label: 'Depreciation = z_t · b − capital charge', total: true, cells: [
            {
              a: -59940, tol: 400, f: 'depr(2019) = 0.0334 × 900,000 − 0.10 × 900,000 = 30,060 − 90,000 = −59,940   [1.5 points]',
              h: ['The allocated cost z_t·b covers depreciation <i>and</i> interest. Strip the interest out.',
                'Capital charge = 10 % × 900,000 = 90,000.'],
              diag: [{ v: 59940, m: 'Sign. The allocated cost of 30,060 is smaller than the 90,000 capital charge, so depreciation is negative.' }]
            },
            {
              a: 376956, tol: 1200, f: 'depr(2020) = 0.5255 × 900,000 − 0.10 × (900,000 + 59,940) = 472,950 − 95,994 = 376,956   [1.5 points]',
              h: ['Book value grew in 2019 because depreciation was negative: 900,000 + 59,940 = 959,940.',
                'Capital charge = 10 % × 959,940 = 95,994.'],
              diag: [{ v: 382950, m: 'You used 900,000 as the opening capital. The negative 2019 charge raised book value to 959,940.' }]
            }]
        }
      ],
      why: '<b>Compare the 2019 numbers across the three rules on one identical project:</b> straight-line gives <b>−359,200</b>, RBCAR gives <b>+740</b>. The project\'s NPV is +21,000. Only RBCAR reports a first-year figure whose sign matches the shareholders\' verdict, and it does so in every year, because RI_t = z_t × 21,000 with z_t &gt; 0.<br><br>Check it: 0.0334 × 21,000 = 701 ≈ 740 (the difference is the rounding of z the key itself flags). The official answer to the final part is exactly this: <b>"Yes. With the RBCAR the RI of each period is proportional to the NPV of the project. Hence, if the NPV is positive, all RIs are positive and vice versa."</b> Same sentence as the test exam, different numbers. <b>Write it and take the marks.</b>'
    },

    /* ------------------------------------------------ synthesis */
    {
      id: 'dep-c-methods', kind: 'classify', chapter: 'depreciation', pts: 6,
      title: 'Which depreciation rule does this?',
      q: 'Attribute each property to the depreciation rule it belongs to.',
      note: 'These three columns are the spine of Lecture 7. Every MC item on the topic lives in the gaps between them.',
      buckets: ['Straight-line', 'Sinking-fund', 'Relative-benefit (RBCAR)'],
      items: [
        { t: 'ROI and EVA rise over the asset\'s life.', b: 0, why: '<b>Straight-line.</b> The charge is constant while book value shrinks, so the same profit is divided by an ever-smaller base. A manager can therefore "improve" performance by simply doing nothing and letting assets age.' },
        { t: 'ROI equals the project\'s IRR in every single period.', b: 1, why: '<b>Sinking-fund.</b> This is the rule\'s defining property, the formula is derived by imposing it.' },
        { t: 'Residual income is proportional to the project\'s NPV in every period.', b: 2, why: '<b>RBCAR.</b> RI_t = z_t · NPV, and z_t &gt; 0, so every period carries the NPV\'s sign.' },
        { t: 'Achieves strong goal congruence.', b: 2, why: '<b>RBCAR</b>, and only RBCAR, of these three. Straight-line achieves none; sinking-fund only weak.' },
        { t: 'Needs only a forecast of the inter-temporal pattern X, not the magnitude θ.', b: 2, why: '<b>RBCAR.</b> The weights are built from X alone, which is exactly why it works when θ is the manager\'s private information.' },
        { t: 'Needs a forecast of the full future cash flows, because the IRR must be known.', b: 1, why: '<b>Sinking-fund.</b> The recycled MC item swaps this property with RBCAR\'s, watch for it.' },
        { t: 'EVA improvement on the current capital base is harder to achieve under this rule.', b: 1, why: '<b>Sinking-fund.</b> EVA declines over the asset\'s life here, whereas under straight-line it rises, so beating last year is harder. This is a word-for-word MC item on five papers.' },
        { t: 'Early residual income can be strongly negative on a good project, so a manager leaving early rejects it.', b: 0, why: '<b>Straight-line.</b> SS19 Q4.4: RI of −359,200 in 2019 on a project worth +21,000.' },
        { t: 'The periodic charge can be negative, so book value rises.', b: 1, why: '<b>Sinking-fund.</b> SS19 2019: 30,800 − 0.11 × 900,000 = −68,200. (RBCAR\'s <i>depreciation component</i> can also be negative, −59,940 on the same paper. Once you split z_t·b into interest and write-off.)' },
        { t: 'The charge is 1/T of the investment, every year, regardless of the cash flows.', b: 0, why: '<b>Straight-line.</b> Complete indifference to the cash-flow pattern is precisely why it cannot track NPV.' }
      ],
      why: '<b>The one-line summary of Lecture 7:</b> a depreciation rule cannot change how much value a project creates (Preinreich-Lücke), only <b>when the manager is shown it</b>. Straight-line ignores the cash flows entirely and so shows the manager a pattern unrelated to NPV. Sinking-fund anchors on the IRR, better, but it needs the whole stream and only fixes the <i>project\'s</i> ROI, not the firm\'s. RBCAR anchors on the <b>relative benefit pattern</b>, which is the minimum information that makes every period\'s sign match the NPV\'s.'
    },

    {
      id: 'dep-mc-roiirr', kind: 'mc', chapter: 'depreciation', pts: 2,
      title: 'SS17 MC 3: depreciation rules',
      source: 'SS17 MC Q3 · answer per the blueprint\'s reading of the official key',
      q: 'Which of the following statements is <em>true</em>?',
      opts: [
        { t: 'If the Relative Benefit Cost Allocation Rule is applied, then a project with a positive net present value makes a positive contribution to the manager\'s performance measure of residual income in every period.', ok: true, y: 'True. RI_t = z_t · NPV with z_t &gt; 0, so a positive NPV means a positive RI in every period.' },
        { t: 'The Relative Benefit Depreciation Rule leads to ROI ratios which equal the project\'s internal rate of return in each period.', ok: false, y: 'That is <b>sinking-fund</b> depreciation. RBCAR delivers proportionality of <i>residual income</i> to NPV, not ROI = IRR.' },
        { t: 'It depends on the pattern of cash flows whether changing from straight-line to relative benefit depreciation changes the present value of future EVAs.', ok: false, y: 'It never depends on anything. Preinreich-Lücke says the present value is invariant to the depreciation schedule.' }
      ],
      why: 'All three distractors are property-swaps between the rules, which is how this topic is always examined. Keep the three signature properties strictly separate: <b>RBCAR → RI ∝ NPV</b>; <b>sinking-fund → ROI = IRR</b>; <b>any rule → same present value of EVAs</b> (Preinreich-Lücke). If a statement attaches the wrong signature to a rule, it is the wrong answer, however plausible the sentence sounds.'
    }

  ]);

})(window.VBM);
