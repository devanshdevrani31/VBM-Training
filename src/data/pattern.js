/* ==========================================================================
   pattern.js — What actually gets examined. Every past paper, mapped.
   T = test exam, R = real exam.  y = full open question, mc = appeared as MC.
   ========================================================================== */
'use strict';

VBM.data.pattern = {

  exams: [
    { k: 'WT16', kind: 'R' }, { k: 'SS17', kind: 'R' }, { k: 'SS18', kind: 'R' }, { k: 'SS19', kind: 'R' },
    { k: 'SS23', kind: 'T' }, { k: 'SS24', kind: 'T' }, { k: 'SS25', kind: 'T' }, { k: 'SS26', kind: 'T' }
  ],

  /* hit = one entry per exam above: 'y' | 'mc' | '-' */
  rows: [
    { topic: 'EVA: NOPAT + Invested Capital + capital charge', hit: ['y','y','y','y','y','y','y','y'], rate: '8/8', tier: 1 },
    { topic: 'Accounting adjustment: capitalise R&D / advertising', hit: ['y','y','y','y','y','y','y','y'], rate: '8/8', tier: 1 },
    { topic: 'Relative Benefit Cost Allocation Rule (RBCAR)', hit: ['-','y','y','y','y','y','y','y'], rate: '7/8', tier: 1 },
    { topic: 'Residual income & straight-line vs. other depreciation', hit: ['y','y','y','y','y','y','y','y'], rate: '8/8', tier: 1 },
    { topic: 'Goal congruence (weak / strong / robust)', hit: ['y','y','y','y','y','y','y','y'], rate: '8/8', tier: 1 },
    { topic: 'Bonus banks & NPV consistency', hit: ['-','y','y','y','-','-','-','-'], rate: '3/8*', tier: 1 },
    { topic: 'Ratio analysis + operating / cash cycle', hit: ['y','y','-','y','-','-','-','-'], rate: '3/8*', tier: 2 },
    { topic: 'CAPM & after-tax WACC calculation', hit: ['-','y','y','mc','mc','mc','mc','mc'], rate: '7/8', tier: 2 },
    { topic: 'Sinking-fund depreciation, ROI = IRR', hit: ['y','mc','-','y','mc','mc','mc','mc'], rate: '7/8', tier: 2 },
    { topic: 'Real options / option to wait', hit: ['y','y','-','mc','mc','mc','mc','mc'], rate: '7/8', tier: 2 },
    { topic: 'Capitalising operating leases (the 5 steps)', hit: ['-','y','y','y','-','-','-','-'], rate: '3/8*', tier: 2 },
    { topic: '4 objectives of management compensation', hit: ['-','y','-','y','-','-','-','-'], rate: '2/8*', tier: 2 },
    { topic: 'EVA ↔ MVA ↔ DCF relationships', hit: ['-','mc','-','mc','-','-','-','-'], rate: '2/8', tier: 3 },
    { topic: 'Balanced Scorecard / non-financial value drivers', hit: ['y','-','-','-','-','-','-','-'], rate: '1/8', tier: 3 },
    { topic: 'Capital structure / Modigliani–Miller', hit: ['-','-','-','mc','-','-','-','-'], rate: '1/8', tier: 3 },
    { topic: 'Siemens compensation system', hit: ['-','mc','-','-','-','-','-','-'], rate: '1/8', tier: 3 }
  ],

  starNote: 'The test-exam papers are short — 2 open questions only. Bonus banks, ratios and leases appear in <b>3 of the 4 real exams</b>, so their true hit rate on a <i>real</i> paper is ~75%, not 3/8. Weight them as Tier 1.',

  facts: [
    ['Format', 'MC (20 pts) + <b>three</b> open questions (100 pts) = <b>120 points in 120 minutes</b>. Exactly one point per minute. This has held across every paper in the table below — but <b>check your own semester\'s Q&amp;A slide</b>, since only the chair can confirm the current format.'],
    ['Conditions', 'Written, in-person, paper-based, two hours. No computer; all arithmetic by hand with a non-programmable calculator. Set your own exam date on the desk to switch on the countdown.'],
    ['The chair\'s own words', '"Structure, content and level of detail equivalent to previous exams on Moodle. No additional sample exams." On that basis the past papers are not practice — they are the specification.'],
    ['Scope', 'All lecture content + all exercises are relevant, <b>except "Identify Industries"</b> — officially excluded. Do not spend a minute on it.'],
    ['Formulas', 'All formulas are relevant, whether from lecture <i>or</i> exercise. <b>No formula sheet</b> — only a non-programmable calculator and a dictionary.'],
    ['Tables', '<b>Tables must be drawn by hand.</b> Pre-memorise the shape of the NOPAT block, the invested-capital block, the R&D amortisation grid and the bonus-bank grid.'],
    ['Statements', 'Financial statements will be similar to the exercises; extra information is marked with an asterisk (*) — that is where the tax rate, the WACC or an adjustment trigger hides.']
  ],

  prediction: {
    head: 'The structural prediction',
    body: 'Every real exam = MC (20) + 3–4 open questions (100). The open questions are drawn from a pool of archetypes, and the papers consistently pick one from each of these families:',
    fams: [
      ['Q1', 'EVA from financial statements + an accounting adjustment — often bundled with ratios or WACC. <b>Certain.</b>'],
      ['Q2', 'Management compensation / bonus banks + NPV consistency.'],
      ['Q3', 'Goal-congruent performance measures: RBCAR vs. straight-line vs. sinking fund, <i>or</i> residual income & the option to wait.']
    ],
    tail: 'Q1 is certain. Prepare Q2 and Q3 to the same depth and you have covered roughly 100 of the 120 points.'
  },

  marking: [
    'Points are given for <b>intermediate steps</b>, not just the final number. In the SS19 key: NOPAT (3), each year\'s invested capital (2 each), the average (1), the final EVA (2).',
    '<b>Always write the full ladder, label every line, and show the formula before substituting.</b> Partial credit lives there.',
    'A wrong final number with a correct, labelled method still scores most of the marks.',
    'Rounding is explicitly tolerated — SS19 notes that both rounded and unrounded intermediate results are accepted.',
    'If you are stuck on a number, <b>state the method in words</b> and carry a symbol forward. Verbal method statements score in every official key.'
  ],

  playbook: [
    ['Minute 0–3', 'Read all three open questions first. Identify which archetype each one is. Note every asterisk (*).'],
    ['Minute 3–15', 'Do the MC. Most items come from the recycled bank. Do not agonise — flag and move on. Hard stop at 15.'],
    ['Minute 15–120', 'Open questions in <b>descending order of your confidence</b>, not paper order. ~33 minutes each; hard-stop at 35 and move on.'],
    ['Every table', '<b>Draw the table before you calculate.</b> The structure itself earns marks.'],
    ['Every formula', 'Write the formula, then substitute, then evaluate. Three lines, every time.'],
    ['Free marks', 'Verbal sub-questions are free marks: the five lease steps (5), NPV consistency (3), the four objectives (4), why RBCAR works (6). Bank these <i>before</i> polishing arithmetic.'],
    ['Last 8 minutes', 'Check signs — a negative EVA is normal. Check you used <i>average</i> invested capital. Check the tax shield is there.']
  ],

  plan: [
    { d: 1, focus: 'EVA engine', tier: 1, task: 'Learn the NOPAT ladder and the NIBL rule cold. Rebuild the test-exam EVA three times from a blank page, then do SS19 Q1.1 and SS17 Q1.2. Target: 8 minutes, no notes.', chapters: ['eva'] },
    { d: 2, focus: 'Adjustments', tier: 1, task: 'R&D capitalisation until it is automatic. Then memorise the five operating-lease steps. Do SS19 Q1.2 (advertising, 4-year data) and SS17 Q1.3.', chapters: ['adjust'] },
    { d: 3, focus: 'Goal congruence', tier: 1, task: 'RBCAR: derive z_t and RI_t, reproduce the full test-exam question. Memorise the three goal-congruence definitions and the verbatim RBCAR answer. Do SS19 Q4.5.', chapters: ['congruence', 'depreciation'] },
    { d: 4, focus: 'Compensation', tier: 1, task: 'Bonus banks: work the SS19 grid, then the Problem-Set-3 tranche variant, then SS17 Q2 — the hardest bonus-bank question in the corpus. Memorise the four objectives and the NPV-consistency definition.', chapters: ['comp'] },
    { d: 5, focus: 'Ratios + WACC + depreciation', tier: 2, task: 'Drill the ratio table with the SS19 data. Then CAPM/WACC. Then sinking-fund vs straight-line ROI.', chapters: ['ratios', 'capital'] },
    { d: 6, focus: 'Real options + full mock', tier: 2, task: 'Morning: option to wait. Afternoon: sit the SS19 real exam under strict 120-minute conditions — closed book, hand-drawn tables. Mark it against the key.', chapters: ['options'] },
    { d: 7, focus: 'Consolidate', tier: 3, task: 'Re-sit only the questions you lost marks on. Recite the whole Vault from memory. Skim Lecture 9 (Balanced Scorecard) and Lecture 1 (shareholder vs stakeholder, ESG). Sleep.', chapters: ['identities', 'traps'] }
  ],

  short: 'If you have less time than this, do Days 1–4 only. EVA + adjustments + RBCAR + bonus banks is roughly 90 of the 120 points, and every one of those topics rewards drilling more than understanding.'
};
