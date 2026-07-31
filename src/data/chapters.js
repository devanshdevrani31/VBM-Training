/* ==========================================================================
   chapters.js, the training modules, ordered by points-per-hour-of-study.
   ========================================================================== */
'use strict';

VBM.data.chapters = [
  {
    id: 'mcbank', n: '00', tier: 1, hit: 'every',
    title: 'Exam MC Bank',
    blurb: 'Every multiple-choice question from every paper, in the exam\'s own three-option format. Part I is 20 of the 120 points and it is heavily recycled.',
    drills: ['mcb-s17-2', 'mcb-s17-6', 'mcb-s17-7', 'mcb-s17-8', 'mcb-s17-9', 'mcb-s17-10',
      'mcb-s19-1', 'mcb-s19-7', 'mcb-s19-8', 'mcb-s19-9', 'mcb-s19-10']
  },
  {
    id: 'eva', n: '01', tier: 1, hit: '8/8',
    title: 'The EVA Engine',
    blurb: 'NOPAT ladder · NIBL · invested capital · average capital. Worth 10-25 points on every paper for a decade.',
    drills: ['eva-f-core', 'eva-f-rona', 'eva-nibl-sort', 'eva-t-nopat26', 'eva-t-ic26',
      'eva-n-eva26', 'eva-t-ss19', 'eva-t-ss17', 'eva-mc-negative', 'eva-v-taxshield']
  },
  {
    id: 'adjust', n: '02', tier: 1, hit: '8/8',
    title: 'Accounting Adjustments',
    blurb: 'Capitalising R&D and advertising, the amortisation grid, plus the five operating-lease steps.',
    drills: ['adj-f-nopat', 'adj-f-ic', 'adj-t-grid26', 'adj-t-block26', 'adj-t-ss19',
      'adj-t-ss17', 'adj-seq-lease', 'adj-mc-tax', 'adj-mc-timing']
  },
  {
    id: 'congruence', n: '03', tier: 1, hit: '7/8',
    title: 'Goal Congruence & the RBCAR',
    blurb: 'z_t, RI_t, the verbatim 6-point answer, and the straight-line failure that follows it every year.',
    drills: ['cong-f-z', 'cong-f-ri', 'cong-f-identity', 'cong-n-npv26', 'cong-t-rbcar26',
      'cong-t-sl26', 'cong-v-rbcar', 'cong-v-sl', 'cong-c-defs', 'cong-mc-preinreich', 'cong-mc-info']
  },
  {
    id: 'depreciation', n: '04', tier: 1, hit: '8/8',
    title: 'Depreciation, ROI & Residual Income',
    blurb: 'Straight-line vs sinking-fund vs RBCAR on one project. SS19 Question 4, all 32 points of it.',
    drills: ['dep-f-roi', 'dep-f-sinking', 'dep-n-npv19', 'dep-n-roi19', 'dep-t-sink19',
      'dep-t-ri19', 'dep-t-rbcar19', 'dep-c-methods', 'dep-mc-roiirr']
  },
  {
    id: 'comp', n: '05', tier: 1, hit: '3/4 real',
    title: 'Compensation & Bonus Banks',
    blurb: 'The five-row bank grid, NPV consistency, the four objectives. 25-40 points when it appears.',
    drills: ['comp-f-earned', 'comp-t-bank19', 'comp-n-npv19', 'comp-v-npvcons', 'comp-mc-payout',
      'comp-n-ss17earned', 'comp-c-objectives', 'comp-mc-total', 'comp-v-interest']
  },
  {
    id: 'capital', n: '06', tier: 2, hit: '7/8',
    title: 'Cost of Capital',
    blurb: 'β → cost of equity → after-tax WACC. Three lines for three points, plus MC every single year.',
    drills: ['cap-f-capm', 'cap-f-beta', 'cap-f-wacc', 'cap-t-ss17', 'cap-t-ss19beta',
      'cap-f-relever', 'cap-c-risk', 'cap-mc-betaproblems', 'cap-mc-betaassume', 'cap-mc-equity']
  },
  {
    id: 'ratios', n: '07', tier: 2, hit: '3/4 real',
    title: 'Ratio Analysis & the Cash Cycle',
    blurb: 'Twenty one-line formulas, one purchases bridge worth 3 points, and the cycle ladder.',
    drills: ['rat-f-payables', 'rat-f-cycle', 'rat-c-avg', 'rat-t-ss19', 'rat-t-cycle',
      'rat-v-apturn', 'rat-t-ss17', 'rat-mc-cash']
  },
  {
    id: 'options', n: '08', tier: 2, hit: '7/8',
    title: 'Real Options',
    blurb: 'Irreversibility, uncertainty, flexibility, and the option to wait, worked end to end.',
    drills: ['opt-c-chars', 'opt-mc-revers', 'opt-mc-wait', 'opt-f-rule', 'opt-t-ss17', 'opt-v-congruence']
  },
  {
    id: 'identities', n: '09', tier: 3, hit: '2/8',
    title: 'EVA / MVA / DCF & Free Cash Flow',
    blurb: 'Multiple choice only, but the same three identities, mutilated in the same three ways.',
    drills: ['id-f-mva', 'id-f-dcf', 'id-seq-fcf', 'id-mc-fcf', 'id-seq-ebit', 'id-mc-capstruct']
  },
  {
    id: 'traps', n: '10', tier: 1, hit: 'every paper',
    title: 'Trap Radar',
    blurb: 'Eleven mistakes from the examiner\'s own list. Rapid-fire: run it the night before.',
    drills: ['trap-nibl', 'trap-taxshield', 'trap-interestincome', 'trap-average', 'trap-rdtax',
      'trap-timing', 'trap-beta', 'trap-purchases', 'trap-bank', 'trap-proportional', 'trap-negative']
  }
];
