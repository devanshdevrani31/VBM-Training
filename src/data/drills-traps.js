/* ==========================================================================
   drills-traps.js · Chapter 10: Trap Radar.
   Every item is a real mistake from the examiner's own list of what students
   get wrong. Read the extract, find the broken line.
   ========================================================================== */
'use strict';

(function (V) {

  V.reg([

    {
      id: 'trap-nibl', kind: 'mc', chapter: 'traps', pts: 2,
      title: 'Trap 1: the invested-capital line',
      q: 'A candidate writes the following. Which line is wrong?',
      note: 'Balance sheet 2006: total assets 260,000 · short-term debt 20,000 · trade AP 40,000 · accrued expenses 10,000 · other current liabilities 10,000 (footnote: not interest-bearing) · total current liabilities 80,000.',
      opts: [
        { t: '− NIBL = −(20,000 + 40,000 + 10,000 + 10,000) = −80,000', ok: true, y: 'Wrong. The 20,000 of short-term debt is <b>interest-bearing</b>, so it is not part of NIBL and must stay inside invested capital. NIBL = 60,000.' },
        { t: 'Invested Capital = Total Assets − NIBL', ok: false, y: 'Correct: that is the definition.' },
        { t: 'Other current liabilities belong in NIBL because the footnote says they are not interest-bearing', ok: false, y: 'Correct, and that is exactly why the footnote is there.' },
        { t: 'Long-term debt is not subtracted', ok: false, y: 'Correct. NIBL contains only <i>current</i> non-interest-bearing items.' }
      ],
      why: 'The examiner\'s own note on this: <i>"Short-term debt is interest-bearing. It stays in invested capital. NIBL = AP + accrued expenses + other current liabilities only."</i> The mistake is seductive because "total current liabilities" is a printed subtotal on the balance sheet and NIBL is not, so the lazy route is right there in front of you. <b>Never use a printed subtotal for NIBL; always add the three lines yourself.</b>'
    },

    {
      id: 'trap-taxshield', kind: 'mc', chapter: 'traps', pts: 2,
      title: 'Trap 2: the NOPAT ladder',
      q: 'A candidate writes: <em>Operating income 700 − provision for income taxes 125 = NOPAT 575.</em> Interest expense is 75 and the tax rate is 20 %. What is missing?',
      opts: [
        { t: '− tax shield = 0.2 × 75 = 15, giving NOPAT = 560', ok: true, y: 'Correct. This line is worth explicit marks in every official key, and the SS19 NOPAT line is worth 3 points.' },
        { t: '− interest expense of 75, giving NOPAT = 500', ok: false, y: 'No. Interest expense never enters NOPAT, the cost of debt is charged through the WACC.' },
        { t: '+ tax shield = 15, giving NOPAT = 590', ok: false, y: 'Right item, wrong sign. You are <b>removing</b> a benefit the reported tax figure already contained.' },
        { t: 'Nothing, 575 is correct', ok: false, y: 'The tax shield is missing. This is the single most common lost mark on Question 1.' }
      ],
      why: 'The examiner\'s note: <i>"Always − t × interest expense. It is worth explicit marks in every official key."</i> The reason it is so easily forgotten is that the income statement gives you no line to copy. You have to <b>construct</b> it from two separate figures. Build a habit: the moment you see an interest-expense line anywhere on the paper, write the tax-shield row immediately, before you compute anything else.'
    },

    {
      id: 'trap-interestincome', kind: 'mc', chapter: 'traps', pts: 2,
      title: 'Trap 3: interest income',
      q: 'When should interest income be added in the NOPAT ladder?',
      opts: [
        { t: 'Only when a footnote states it stems from cash or securities held for operating activities', ok: true, y: 'Correct. SS23-SS26 carry exactly that footnote; SS17 and SS19 have no interest income at all.' },
        { t: 'Always: it is income, so it belongs in NOPAT', ok: false, y: 'No. Purely financial income is not operating, and it would not be matched by anything in invested capital.' },
        { t: 'Never: NOPAT is an operating measure', ok: false, y: 'Too strict. When the footnote makes it operating, leaving it out costs marks on the test exam.' },
        { t: 'Only when it exceeds interest expense', ok: false, y: 'Invented rule. The comparison is irrelevant.' }
      ],
      why: 'The rule follows from <b>matching</b>: invested capital includes the cash and marketable securities that generated the income, so the return they generate must sit in NOPAT alongside them. Take the income out while leaving the assets in, and you charge WACC on capital whose return you refused to count.<br><br>Practically: <b>scan for asterisks and footnotes before you start.</b> That is where the tax rate, the WACC, the NIBL hint and this decision all hide.'
    },

    {
      id: 'trap-average', kind: 'mc', chapter: 'traps', pts: 2,
      title: 'Trap 4: which capital base?',
      q: 'The question says only "calculate the EVA". Invested capital is 3,570 (opening) and 4,170 (closing). Which base do you use?',
      opts: [
        { t: 'The average, 3,870', ok: true, y: 'Correct. The average is the default across the whole course, and the official keys award it a separate mark.' },
        { t: 'The closing figure, 4,170', ok: false, y: 'Only if the question says so. NOPAT is a flow over the year, so it must be matched to an average stock.' },
        { t: 'The opening figure, 3,570', ok: false, y: 'Only when the paper explicitly says so. SS19 Q4 does, and it says it in words.' },
        { t: 'Whichever gives a positive EVA', ok: false, y: 'A negative EVA is a perfectly normal answer. Do not reverse-engineer the method from the sign.' }
      ],
      why: 'The examiner\'s note: <i>"Default to the average unless the question explicitly says to use the beginning-of-period value. SS19 Q4 does exactly that. Read carefully."</i> So the decision is not a judgement call, it is a <b>reading</b> task: the default is the average, and any override is stated in words in the question stem. <b>Underline the capital-base instruction before calculating.</b>'
    },

    {
      id: 'trap-rdtax', kind: 'mc', chapter: 'traps', pts: 2,
      title: 'Trap 5: the R&D adjustment and tax',
      q: 'Adjusting NOPAT for capitalised R&D: expense 30,000, amortisation 27,000, tax rate 40 %. What is the adjustment?',
      opts: [
        { t: '+3,000', ok: true, y: 'Correct. Gross expense minus gross amortisation. No tax factor.' },
        { t: '+1,800', ok: false, y: 'That is +3,000 × (1 − 0.4). Defensible in theory, but no official solution does it.' },
        { t: '−9,000', ok: false, y: 'Invented: there is no separate tax charge on the capitalised spend.' },
        { t: '+30,000', ok: false, y: 'You added the expense and forgot to subtract the amortisation.' }
      ],
      why: 'The examiner\'s note: <i>"No official solution applies tax to the R&D or advertising adjustment. Add the expense, subtract the amortisation, done."</i> Keep a mental list of where tax legitimately enters this course, the NOPAT tax shield, the after-tax WACC, and un-/re-levering beta, and <b>nowhere else</b>. Applying (1 − t) by reflex is a way of losing marks by knowing too much.'
    },

    {
      id: 'trap-timing', kind: 'mc', chapter: 'traps', pts: 2,
      title: 'Trap 6: dating the first charge',
      q: 'A 2006 spend of 30,000 is amortised over 3 years. A candidate charges it in 2007, 2008 and 2009. What is the consequence on the test exam?',
      opts: [
        { t: 'The 2006 amortisation total becomes 17,000 instead of 27,000, and every later figure is wrong', ok: true, y: 'Correct. The 2006 cohort contributes nothing, so the total collapses and the adjusted NOPAT, capital base and EVA all follow it.' },
        { t: 'No consequence. Only the timing changes', ok: false, y: 'The timing <i>is</i> the answer. Every number in the grid shifts by a year.' },
        { t: 'Only the invested-capital adjustment changes', ok: false, y: 'Both statements change: the amortisation total and the unamortised balances.' },
        { t: 'The EVA is unaffected because of Preinreich-Lücke', ok: false, y: 'Preinreich-Lücke is about the <i>present value across all periods</i>, not about a single year\'s EVA.' }
      ],
      why: 'The examiner\'s note: <i>"The exams state the first charge is due in the same year the expense takes place. A 3-year 2006 spend hits 2006, 2007 and 2008."</i> The convention is arbitrary, which is exactly why the papers state it explicitly every time, and why they expect you to have read it. <b>Copy that sentence onto your answer sheet before drawing the grid.</b>'
    },

    {
      id: 'trap-beta', kind: 'mc', chapter: 'traps', pts: 2,
      title: 'Trap 7: the beta denominator',
      q: 'cov(R_i, R_M) = 0.05, Var(R_M) = 0.04, Var(R_i) = 0.06. What is β?',
      opts: [
        { t: '1.25', ok: true, y: 'Correct: 0.05 / 0.04. The denominator is the variance of the <b>market</b> return.' },
        { t: '0.8333', ok: false, y: 'That is 0.05 / 0.06, the firm\'s own variance. It is on the paper purely as a distractor.' },
        { t: '0.0021', ok: false, y: 'You multiplied. Beta is a ratio.' },
        { t: '1.5', ok: false, y: 'That is 0.06 / 0.04, two variances, no covariance.' }
      ],
      why: 'The examiner\'s note: <i>"β = cov(R_i, R_M) / Var(R_M). The firm\'s own variance is always a distractor."</i> SS17 hands you Var(R_i) = 0.06 for no other purpose, and SS19 MC Q10 asks the question outright with "variance of returns of firm A" and "variance of stock prices of firm A" as the two wrong options. <b>If a problem gives you the firm\'s own variance, that is a signal you are being tested, not helped.</b>'
    },

    {
      id: 'trap-purchases', kind: 'mc', chapter: 'traps', pts: 2,
      title: 'Trap 8: the payables numerator',
      q: 'COGS 2,400; inventory rose from 800 to 1,000; average payables 240. What is the payables turnover?',
      opts: [
        { t: '10.8333', ok: true, y: 'Correct: purchases = 2,400 + 200 = 2,600, over 240.' },
        { t: '10.0', ok: false, y: 'That uses COGS as the numerator. SS19 awards 3 points for this ratio precisely because of the purchases bridge.' },
        { t: '18.75', ok: false, y: 'That uses sales. Payables come from buying, not selling.' },
        { t: '9.2308', ok: false, y: 'That subtracts the inventory change. Inventory <i>grew</i>, so you bought more than you sold: add it.' }
      ],
      why: 'The examiner\'s note: <i>"Purchases = COGS + Δinventory. SS19 awards 3 points for this one ratio precisely because of this step."</i> And the damage spreads: a wrong payables turnover gives wrong days-payables, which gives a wrong cash cycle, three answers from one skipped line. <b>The sign is worth reasoning out rather than memorising:</b> if the warehouse ended fuller than it started, you must have bought more than you sold.'
    },

    {
      id: 'trap-bank', kind: 'mc', chapter: 'traps', pts: 2,
      title: 'Trap 9: the bonus payout',
      q: 'The bank stands at 32,644 after the earned bonus. The rule is "target bonus of 35,000 plus 20 % of the remaining amount, and the paid-out bonus cannot be higher than the bonus bank value." What is paid?',
      opts: [
        { t: '32,644: capped at the bank balance', ok: true, y: 'Correct, and it is the official SS19 answer for 2022. The bank ends at zero.' },
        { t: '35,000: the target bonus', ok: false, y: 'That exceeds the bank balance, which the rule forbids.' },
        { t: '34,528.80: the formula\'s result', ok: false, y: 'The formula gives this, but the cap overrides it.' },
        { t: '0: the bank is below the target bonus', ok: false, y: 'A payout of zero happens only when the bank is <b>negative</b>. Here it is positive, so the capped amount is paid.' }
      ],
      why: 'The examiner\'s note: <i>"The payout is capped at the bank balance, and no payout at all when the bank is negative."</i> Two distinct rules, and the exam tests each once: 2020 pays <b>0</b> (bank negative), 2022 pays <b>32,644</b> (bank positive but below the formula\'s result). <b>Compute the formula first, then apply the cap</b>, and check the sign of the bank before doing either.'
    },

    {
      id: 'trap-proportional', kind: 'mc', chapter: 'traps', pts: 2,
      title: 'Trap 10: the RBCAR wording',
      q: 'Which answer to "why does RBCAR deliver strong goal congruence?" scores the 6 points?',
      opts: [
        { t: 'Residual income in each period is proportional to the NPV, so a positive-NPV project gives a positive RI in every period, independently of the manager\'s time preferences.', ok: true, y: 'Full marks. "Proportional", "every period" and "independently of time preferences" are all present.' },
        { t: 'Because the cost is allocated according to the benefit each period receives, which is fairer than straight-line depreciation.', ok: false, y: 'Describes the mechanism but never reaches the conclusion. "Fairer" is not a criterion in this course.' },
        { t: 'Because the manager will always make the right decision under RBCAR.', ok: false, y: 'The conclusion with no argument. It cannot score the reasoning marks.' },
        { t: 'Because the NPV of the residual incomes equals the NPV of the project.', ok: false, y: 'True, but it is Preinreich-Lücke, and it holds for <b>every</b> depreciation rule, including the ones that fail goal congruence. So it cannot be the reason.' }
      ],
      why: 'The examiner\'s note: <i>"The key phrase is RI in each period is <b>proportional to the NPV</b> and <b>independent of the manager\'s time preferences</b> → strong goal congruence."</i><br><br>The fourth option deserves attention because it is a genuinely correct statement that is nonetheless <b>the wrong answer</b>. The NPV of RIs equals the project NPV under straight-line depreciation too, and straight-line fails goal congruence badly. So that property cannot possibly explain why RBCAR succeeds. <b>The distinguishing property is per-period proportionality, not the total.</b>'
    },

    {
      id: 'trap-negative', kind: 'mc', chapter: 'traps', pts: 2,
      title: 'Trap 11: when the answer looks wrong',
      q: 'You compute EVA = 6,360 − 0.10 × 195,000 = −13,140. What should you do?',
      opts: [
        { t: 'Write it down, state the formula, and move on', ok: true, y: 'Correct. −13,140 is the official answer on the test exam.' },
        { t: 'Re-check by using year-end invested capital instead', ok: false, y: 'That is changing a correct method to chase a preferred sign. It gives −13,640 and loses the average-capital mark.' },
        { t: 'Take the absolute value, since EVA measures value created', ok: false, y: 'EVA measures value created <b>or destroyed</b>. The sign is the information.' },
        { t: 'Assume a slip and set the capital charge to NOPAT so EVA is zero', ok: false, y: 'Never manufacture an answer. A stated method with an honest number scores; a fabricated number scores nothing.' }
      ],
      why: 'This is the trap that costs marks through <b>lack of confidence</b> rather than lack of knowledge. Of the four papers you have, the EVA answers are −13,140, +173, −63 and −12,890: <b>three of four are negative.</b> A negative EVA simply says the firm earned less than its cost of capital, which is common and unremarkable.<br><br>The exam-day habit: check the three things that <i>are</i> worth checking: is the tax shield there, did you use average invested capital, is NIBL free of short-term debt, and then <b>trust the arithmetic</b>. The examiner rewards a labelled method, not a comfortable-looking number.'
    }

  ]);

})(window.VBM);
