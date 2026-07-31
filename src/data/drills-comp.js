/* ==========================================================================
   drills-comp.js · Chapter 5: Management compensation and bonus banks.
   3 of the 4 real exams; 25-40 points when it appears.
   ========================================================================== */
'use strict';

(function (V) {

  const S19Q3 = {
    t: 'The bonus bank (SS19 Q3)',
    cols: ['2020', '2021', '2022'],
    rows: [['Bonus earned (EUR)', '−10,000', '60,000', '15,000']],
    fn: 'Bonus bank value at the end of <b>2019</b>, before interest: <b>5,000</b>.<br>'
      + '<b>Payout rule:</b> if the bonus bank is positive (after the yearly earned bonus was added or subtracted), '
      + 'the target bonus of <b>35,000 plus 20 %</b> of the remaining amount of the bonus bank is paid out. '
      + 'The bank value cannot drop below zero by a bonus <i>payment</i>; it <b>can</b> become negative by earning a '
      + 'negative bonus, and is not capped in any direction. At the end of each year, <b>interest of 10 %</b> '
      + '(the company\'s WACC) is paid on the bonus bank account.'
  };

  V.reg([

    /* ------------------------------------------------ the earned-bonus formula */
    {
      id: 'comp-f-earned', kind: 'formula', chapter: 'comp', pts: 3,
      title: 'Write the earned-bonus formula',
      q: 'Assemble the general form of the annual bonus earned under an EVA-based plan.',
      note: 'On SS17 the concrete version is: Bonus earned in year t = 20,000 + 0.01 · (EVA in year t − 10,000,000).',
      tokens: ['Bonus earned_t', '=', 'target bonus', '+', 'y', '×', '(', 'EVA_t', '−', 'target EVA', ')'],
      decoys: ['×', 'WACC', '/', 'Invested Capital', 'NOPAT'],
      accept: [['Bonus earned_t', '=', 'target bonus', '+', 'y', '×', '(', 'EVA_t', '−', 'target EVA', ')']],
      hints: [
        'Two pieces: a fixed amount you get for hitting target, plus a share of however far you beat or miss it.',
        'The deviation is EVA achieved minus EVA targeted; y is the sharing rate.',
        'Bonus earned_t = target bonus + y × (EVA_t − target EVA).'
      ],
      why: '<b>Read the structure, because the exam varies the numbers and keeps the shape.</b> The fixed term makes the plan competitive enough to retain the manager; the variable term supplies the incentive. Note the deviation is symmetric: the bonus <i>decreases</i> by y × the shortfall, and on SS17 the 2018 EVA of 2,000,000 against a 10,000,000 target produces an earned bonus of 20,000 + 0.01 × (−8,000,000) = <b>−60,000</b>. A negative earned bonus is normal and it is what makes the bank able to go negative.<br><br><b>Why EVA <i>improvements</i> rather than levels</b> in many plans: a division with a structurally negative EVA could otherwise never earn a bonus at all, and a division with an inherited high EVA would be paid for its predecessor\'s work.'
    },

    /* ------------------------------------------------ the bank table */
    {
      id: 'comp-t-bank19', kind: 'table', chapter: 'comp', pts: 12,
      title: 'Draw the bonus-bank grid (SS19 Q3.1)',
      source: 'SS19 Q3.1 · official solution',
      q: 'Calculate the paid-out bonus in 2020, 2021 and 2022, and the bonus-bank value at the end of each year. (12 points)',
      note: 'The official key awards <b>2 points for each paid-out bonus and 2 for each ending bank value</b>. Draw all five rows.',
      data: [S19Q3],
      cols: ['2019', '2020', '2021', '2022'],
      skeleton: {
        prompt: 'Lay out the five rows of the bonus-bank grid. This shape never changes between papers.',
        bank: ['Bonus bank beginning (prior ending × 1.10)', 'Bonus earned', 'Bonus bank after earned bonus',
          'Bonus paid out', 'Bonus bank ending',
          'Bonus bank beginning (prior ending)', '− Capital charge', '+ Interest on the payout'],
        order: ['Bonus bank beginning (prior ending × 1.10)', 'Bonus earned', 'Bonus bank after earned bonus',
          'Bonus paid out', 'Bonus bank ending'],
        why: {
          'Bonus bank beginning (prior ending)': 'Interest of 10 % accrues on the bank, so the opening figure is the prior ending <b>× 1.10</b>.',
          '− Capital charge': 'There is no capital charge in a bonus bank. The interest on the bank is the only time-value element.',
          '+ Interest on the payout': 'Interest accrues on the <b>bank balance</b>, not on amounts already paid out.'
        }
      },
      rows: [
        {
          label: 'Bonus bank beginning (prior ending × 1.10)', cells: [null,
            { a: 5500, f: '5,000 × 1.10 = 5,500', h: ['The 2019 bank of 5,000 earns 10 % interest.'], diag: [{ v: 5000, m: 'Interest of 10 % accrues on the bank each year, so the opening 2020 figure is 5,500.' }] },
            {
              a: -4950, f: '−4,500 × 1.10 = −4,950', h: ['The 2020 bank ended at −4,500. Interest accrues on negative balances too.'],
              diag: [{ v: -4500, m: 'Interest accrues on a <b>negative</b> bank as well: that is what keeps the incentive symmetric. −4,500 × 1.10 = −4,950.' },
              { v: 0, m: 'A negative bank is carried forward, not reset. It becomes −4,950 after interest.' }]
            },
            { a: 17644, f: '16,040 × 1.10 = 17,644', h: [] }]
        },
        {
          label: 'Bonus earned', cells: [null,
            { v: '−10,000' }, { v: '60,000' }, { v: '15,000' }]
        },
        {
          label: 'Bonus bank after earned bonus', cells: [null,
            { a: -4500, f: '5,500 − 10,000 = −4,500', h: [] },
            { a: 55050, f: '−4,950 + 60,000 = 55,050', h: [] },
            { a: 32644, f: '17,644 + 15,000 = 32,644', h: [] }]
        },
        {
          label: 'Bonus paid out', total: true, cells: [null,
            {
              a: 0, f: '0: the bank is negative, so nothing is paid out   [2 points]',
              h: ['Check the rule: a payout happens only "if the bonus bank is positive".', 'The bank stands at −4,500. So what is paid?'],
              diag: [{ v: 35000, m: 'The rule pays out only when the bank is <b>positive</b>. The bank is at −4,500. Nothing is paid.' },
              { v: -4500, m: 'A payout is never negative. When the bank is negative the manager simply receives nothing; the deficit is carried forward.' }]
            },
            {
              a: 39010, f: '35,000 + 20 % × (55,050 − 35,000) = 35,000 + 20 % × 20,050 = 35,000 + 4,010 = 39,010   [2 points]',
              h: ['Target bonus 35,000, plus 20 % of the <i>remaining</i> amount in the bank.',
                'The remainder is 55,050 − 35,000 = 20,050.',
                '35,000 + 0.20 × 20,050.'],
              diag: [{ v: 46010, m: 'You took 20 % of the whole bank (55,050). The rule pays 20 % of the amount remaining <b>after</b> the target bonus: 55,050 − 35,000 = 20,050.' },
              { v: 11010, m: 'That is 20 % of 55,050. You left out the 35,000 target bonus.' },
              { v: 55050, m: 'The whole bank is not paid out. Only target plus 20 % of the excess. The cap only binds when that total exceeds the bank.' }]
            },
            {
              a: 32644, f: '35,000 + 20 % × (32,644 − 35,000) would exceed the bank → capped at the bank value = 32,644   [2 points]',
              h: ['Apply the rule, then check it against the cap.',
                'The bank (32,644) is below the target bonus (35,000), so the formula would pay more than the bank holds.',
                'The payout is capped at the bank value: 32,644.'],
              diag: [{ v: 35000, m: 'The payout cannot exceed the bank balance, and the bank only holds 32,644.' },
              { v: 34528.8, m: 'You applied the formula without the cap. The paid-out bonus can never be higher than the bonus bank value.' }]
            }]
        },
        {
          label: 'Bonus bank ending', total: true, cells: [
            { v: '5,000' },
            { a: -4500, f: '−4,500 − 0 = −4,500   [2 points]', h: ['After-earned-bonus figure minus the payout.'] },
            { a: 16040, f: '55,050 − 39,010 = 16,040   [2 points]', h: [] },
            { a: 0, f: '32,644 − 32,644 = 0   [2 points]', h: [] }]
        }
      ],
      why: '<b>Three rules do all the work here, and the exam tests each one exactly once.</b><br>(1) <b>Interest accrues on the bank, including negative balances.</b> 2021 opens at −4,950, not −4,500. Symmetric interest is deliberate: it stops the manager treating a negative bank as a costless write-off and so discourages excessive risk-taking. (2) <b>No payout when the bank is negative.</b> 2020 pays zero even though the target bonus is 35,000. (3) <b>The payout is capped at the bank balance.</b> 2022 pays 32,644 rather than the formula\'s answer.<br><br>And notice what the bank achieves overall: the manager\'s catastrophic 2020 (−10,000 earned) is not forgiven, it is <i>carried</i>, and it reduces what the strong 2021 pays out. That is the entire purpose, <b>to stop a manager being rewarded for a good year that followed a bad one they caused.</b>'
    },

    /* ------------------------------------------------ NPV consistency */
    {
      id: 'comp-n-npv19', kind: 'numeric', chapter: 'comp', pts: 6,
      title: 'Is it NPV-consistent? (SS19 Q3.3)',
      source: 'SS19 Q3.3 · official solution',
      q: 'Is this bonus-bank system net-present-value consistent if the manager\'s personal discount rate equals 10 %? Give the NPV of the bonuses <em>earned</em>, discounted to the end of 2019. (6 points)',
      note: 'The official key flags one thing explicitly: <b>the ending 2019 bank of 5,000 has to be included in NPV(earned)</b>.',
      data: [S19Q3, {
        t: 'From Q3.1', cols: ['2020', '2021', '2022'],
        rows: [['Bonus earned', '−10,000', '60,000', '15,000'], ['Bonus paid out', '0', '39,010', '32,644']]
      }],
      unit: 'EUR',
      a: 56765.59, tol: 120,
      f: 'NPV(earned) = 5,000 − 10,000/1.1 + 60,000/1.1² + 15,000/1.1³ = 56,765.59   [2 points]\n'
        + 'NPV(paid)   =     0/1.1 + 39,010/1.1² + 32,644/1.1³ = 56,765.59   [2 points]\n'
        + '→ Yes, the system is NPV consistent.   [2 points]',
      hints: [
        'Discount to the end of 2019, so 2020 flows get one year, 2021 two, 2022 three.',
        'Do not forget the 5,000 already sitting in the bank at end-2019. It counts as earned, undiscounted.',
        '5,000 − 9,090.91 + 49,586.78 + 11,269.72.'
      ],
      diag: [
        { v: 51765.59, m: 'You left out the 5,000 opening bank. The official key notes explicitly that the ending 2019 bank must be included in NPV(earned).' },
        { v: 70000, m: 'That is the undiscounted sum. Every flow needs discounting at the manager\'s 10 %.' },
        { v: 56765.59 / 1.1, m: 'Discount to the <b>end of 2019</b>, not to 2018: the 2020 flow gets one year of discounting, not two.' }
      ],
      why: '<b>Why the two NPVs must match, and what it would mean if they did not.</b> The bank does nothing but move money between years, and it pays exactly the manager\'s own discount rate (10 % = WACC) while it does so. Shifting a euro forward by one year multiplies it by 1.1 and discounting it back divides by 1.1, the two cancel. So NPV(earned) = NPV(paid) is not a coincidence of these numbers; it is a structural property of paying interest at the manager\'s rate.<br><br>If the bank paid <b>no</b> interest, deferral would be a pay cut, and the manager would rationally front-load EVA to get money out early, destroying the goal congruence the EVA measure was chosen to provide. That is precisely the answer to "why is NPV consistency desirable from the owners\' perspective". Note also the condition: consistency holds <b>because</b> the manager\'s personal rate happens to equal the bank rate. Ask what happens if the manager discounts at 15 %, the question is now open, and deferral genuinely costs them.'
    },

    {
      id: 'comp-v-npvcons', kind: 'verbal', chapter: 'comp', pts: 3,
      title: 'Define NPV consistency',
      source: 'SS19 Q3.2 · official solution',
      q: 'Define the term "net present value consistency" with respect to bonus banks. Why is it desirable from the perspective of the owners of the firm? (3 points)',
      must: [
        { k: ['npv', 'present value'], label: 'stated as an equality of present values' },
        { k: ['earned'], label: 'the NPV of the bonuses earned' },
        { k: ['paid'], label: 'equals the NPV of the bonuses paid out' },
        { k: ['goal congruen', 'congruence'], label: 'it preserves goal congruence' },
        { k: ['time value', 'time values'], label: 'by respecting the time value of money' }
      ],
      model: 'NPV consistency means that the <b>NPV of the bonuses earned equals the NPV of the bonuses paid out</b>. (2 points) It is desirable because once we have a bonus based on a <b>goal-congruent performance measure</b>, we must take care not to destroy that goal congruence by allocating the bonuses earned across different periods without paying attention to the <b>time value of money</b>. (1 point)',
      why: 'The mark split in the key is worth knowing: <b>2 points for the definition, 1 for the justification.</b> So lead with the equality. One clean sentence, before reaching for the reasoning. The logic of the justification is a chain: the performance measure was chosen because it is goal-congruent; the bonus bank redistributes the resulting payments across time; therefore if the redistribution mishandles the time value of money, it can reintroduce exactly the timing distortions that the measure was designed to eliminate. <b>Goal congruence in the measure is worthless if the payment mechanism undoes it.</b>'
    },

    /* ------------------------------------------------ the payout rule varies */
    {
      id: 'comp-mc-payout', kind: 'mc', chapter: 'comp', pts: 3,
      title: 'Spot the mistake: which payout rule is this?',
      source: 'Rules quoted verbatim from SS19 Q3, SS17 Q2 and Problem Set 3',
      q: 'The bonus bank stands at 60,000 after this year\'s earned bonus. The paper says: <em>"the target bonus of 35,000 plus 20 % of the remaining amount of the bonus bank is paid out."</em> What is paid?',
      opts: [
        { t: '35,000 + 20 % × (60,000 − 35,000) = 40,000', ok: true, y: 'Correct. "Remaining amount" means what is left after the target bonus is taken out.' },
        { t: '35,000 + 20 % × 60,000 = 47,000', ok: false, y: 'This takes 20 % of the whole bank. On SS19 that would give 46,010 instead of the official 39,010.' },
        { t: '20 % × 60,000 = 12,000', ok: false, y: 'This drops the target bonus entirely.' },
        { t: '60,000: the whole bank', ok: false, y: 'The whole bank is paid only when the formula\'s result exceeds it, in which case the cap binds.' }
      ],
      why: '<b>The payout rule is the one thing that genuinely changes between papers, so read it before you draw anything.</b> The three rules in the corpus: <br>• <b>SS19</b>: target bonus 35,000 + <b>20 %</b> of the amount in excess of the target, capped at the bank balance, nothing paid when the bank is negative.<br>• <b>SS17</b>: target bonus + <b>one third</b> of the remainder, capped at the bank value; the bank is forfeited if the manager leaves.<br>• <b>Problem Set 3</b>: the earned bonus is split into <b>three equal tranches</b>, one paid immediately and the other two in the following two years, with interest at the WACC on the outstanding balance.<br><br>The grid is identical in all three cases. Only the "Bonus paid out" row differs.'
    },

    {
      id: 'comp-n-ss17earned', kind: 'numeric', chapter: 'comp', pts: 3,
      title: 'Earned bonuses under an EVA-target plan (SS17 Q2)',
      source: 'SS17 Q2 · earned bonuses computed directly from the formula stated in the question',
      q: 'The plan is <em>Bonus earned in year t = 20,000 + 0.01 · (EVA in year t − 10,000,000)</em>. The actual EVA in 2018 is 2,000,000. What is the earned bonus for 2018?',
      note: 'EVAs on the paper: 2018 → 2,000,000 · 2019 → 16,000,000 · 2020 → 4,000,000.',
      unit: 'EUR',
      a: -60000, tol: 10,
      f: '20,000 + 0.01 × (2,000,000 − 10,000,000) = 20,000 + 0.01 × (−8,000,000) = 20,000 − 80,000 = −60,000\n'
        + '(2019: 20,000 + 0.01 × 6,000,000 = +80,000  ·  2020: 20,000 + 0.01 × (−6,000,000) = −40,000)',
      hints: [
        'Substitute into the formula the question gives you. Start with the deviation from target.',
        'EVA − target = 2,000,000 − 10,000,000 = −8,000,000.',
        '20,000 + 0.01 × (−8,000,000).'
      ],
      diag: [
        { v: 60000, m: 'Sign. The EVA of 2,000,000 <b>missed</b> the 10,000,000 target by 8,000,000, so the bonus is negative.' },
        { v: 20000, m: 'You stopped at the target bonus. The variable term is 1 % of the deviation, which here is a large negative amount.' },
        { v: -80000, m: 'That is only the variable term. Add the 20,000 target bonus.' }
      ],
      why: 'This is the setup for the hardest bonus-bank question in the corpus, and getting the earned bonuses right is half of it: <b>−60,000 / +80,000 / −40,000</b>. Two things to notice. First, <b>a plan can produce a negative earned bonus</b>, which is what makes the bank go negative. No negative bank, no meaningful clawback. Second, SS17\'s payout rule is <b>one third</b> of the remainder rather than 20 %, and the bank is <b>forfeited if the manager leaves</b>: a retention device that also, deliberately, gives a departing manager an incentive problem worth discussing in part 2.5.'
    },

    /* ------------------------------------------------ the four objectives */
    {
      id: 'comp-c-objectives', kind: 'classify', chapter: 'comp', pts: 4,
      title: 'The four objectives of managerial compensation',
      source: 'SS19 Q3.4 · official solution (0.5 points per name, 0.5 per explanation)',
      q: 'Each description matches one of the four general objectives for managerial compensation systems. Which?',
      buckets: ['Alignment', 'Wealth leverage', 'Retention', 'Shareholder cost'],
      items: [
        { t: 'Choosing the right performance measures in order to align the manager\'s and the shareholders\' interests.', b: 0, why: '<b>Alignment.</b> This is the <i>measure-selection</i> objective: everything the course says about EVA, RBCAR and goal congruence serves it.' },
        { t: 'Giving management sufficient incentives to work hard and to take the necessary risk in order to maximise shareholder value.', b: 1, why: '<b>Wealth leverage.</b> How <i>steeply</i> pay responds to performance. Note "and to take the necessary risk", too little leverage produces a manager who avoids risk shareholders would want taken.' },
        { t: 'Giving good managers sufficient total compensation to retain them, even during periods of poor performance caused by market or industry factors.', b: 2, why: '<b>Retention.</b> The clause about market or industry factors is the point: a manager should not leave because of a downturn they did not cause.' },
        { t: 'Limiting the cost of management compensation to levels sufficient to maximise the wealth of current shareholders.', b: 3, why: '<b>Shareholder cost.</b> Pay is itself a cost to the owners, so more incentive is not automatically better.' },
        { t: 'The objective that pulls in the opposite direction from wealth leverage and retention.', b: 3, why: '<b>Shareholder cost.</b> This is the tension the four objectives exist to expose: leverage and retention both push pay up, shareholder cost pushes it down, and alignment decides what the pay is measured on.' },
        { t: 'The objective that a bonus bank paying interest on negative balances most directly serves.', b: 0, why: '<b>Alignment.</b> Symmetric interest keeps the manager\'s incentives matched to the owners\' across time and discourages the excessive risk-taking a one-sided scheme would reward.' }
      ],
      why: 'Four names, 4 points, and the key awards <b>0.5 for the name and 0.5 for the explanation</b>, so a bare list scores half marks. Learn one clause with each name.<br><br>The set is genuinely a design framework rather than a list: <b>alignment</b> fixes <i>what</i> you measure, <b>wealth leverage</b> fixes <i>how steeply</i> you pay on it, <b>retention</b> fixes the <i>floor</i>, and <b>shareholder cost</b> fixes the <i>ceiling</i>. SS17 Q2.5 asks for one advantage and one disadvantage of a specific plan <i>with respect to each of the four</i>, which is impossible unless you can see the tensions between them.'
    },

    {
      id: 'comp-mc-total', kind: 'mc', chapter: 'comp', pts: 2,
      title: 'MC: redesigning a compensation plan',
      source: 'SS19 MC Q6 · official solution',
      q: 'Which of the following statements is <em>true</em>?',
      opts: [
        { t: 'When redesigning a manager\'s compensation plan one should consider the effect on the manager\'s total pay (the sum of all remuneration components).', ok: true, y: 'True. Changing one component alters total pay, which bears directly on retention and on shareholder cost.' },
        { t: 'Only complex compensation packages can incentivise executives to act in the shareholders\' interest.', ok: false, y: 'False. Complexity is not a requirement, and it tends to obscure the link between action and reward.' },
        { t: 'Short-term bonuses should be the key incentive for managing the strategic agenda.', ok: false, y: 'False, and it is the opposite of the course\'s whole argument. A strategic agenda pays off over years; tying it to short-term bonuses is what bonus banks and goal-congruent measures exist to prevent.' }
      ],
      why: 'Each distractor maps onto one of the four objectives. "Only complex packages work" fails <b>wealth leverage</b>: an incentive the manager cannot understand cannot motivate. "Short-term bonuses drive strategy" fails <b>alignment</b>, and it is the exact failure mode of straight-line depreciation and of an un-banked annual bonus. And the correct answer is the <b>retention</b> and <b>shareholder cost</b> point: you cannot evaluate a change to one component in isolation, because the manager experiences only the total.'
    },

    {
      id: 'comp-v-interest', kind: 'verbal', chapter: 'comp', pts: 3,
      title: 'Why interest on the bank, and why on negative balances?',
      q: 'Explain why interest is paid on the bonus bank, and why it is also charged on <em>negative</em> bank balances.',
      must: [
        { k: ['time value', 'compensat', 'delay', 'defer'], label: 'interest compensates for delayed payment / time value of money' },
        { k: ['symmetr', 'both direction', 'same way'], label: 'symmetry of incentives' },
        { k: ['risk', 'gambl'], label: 'it prevents excessive risk-taking' }
      ],
      model: 'Interest is paid on the bank because the manager receives the money <b>later</b> than it was earned; paying the WACC on the balance <b>compensates for the delay</b> and reflects the <b>time value of money</b>, which is what makes the scheme NPV-consistent. Interest is charged on negative balances as well so that the scheme is <b>symmetric</b>: a deficit is not quietly forgiven over time. Without that, a manager could take an <b>excessive risk</b>, and if it failed simply carry an interest-free deficit while keeping the full upside of any success.',
      why: 'These two clauses are the "why" behind the mechanics you drilled in the grid, and they turn a table into an argument. The positive-balance half is the <b>NPV-consistency</b> argument: interest at the manager\'s rate is exactly what makes NPV(earned) = NPV(paid). The negative-balance half is the <b>risk-taking</b> argument: an asymmetric scheme is a free option, unlimited upside, a decaying downside, and options are worth more the riskier the underlying. Charging interest both ways removes the free option.'
    }

  ]);

})(window.VBM);
