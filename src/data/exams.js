/* ==========================================================================
   exams.js — full papers, sat under the clock. No hints, no reveals.
   Each entry reuses the drills, in the order the real paper asks them.
   ========================================================================== */
'use strict';

VBM.data.exams = [

  {
    id: 'x-test26',
    title: 'Test exam SS23 / SS24 / SS25 / SS26',
    sub: 'The chair\'s own template — these four papers are literally identical. 50 points on the open questions plus the MC bank.',
    minutes: 60,
    note: 'The course Q&A slide describes the real paper as "equivalent in structure, content and level of detail" to these. If that still holds for your semester, sitting this cleanly means you have seen the shape of your exam.',
    parts: [
      { head: 'Part I — Multiple choice', drills: ['cong-mc-info', 'cap-mc-equity', 'opt-mc-revers', 'cap-mc-betaproblems', 'cap-mc-betaassume'] },
      { head: 'Question 1 — EVA and the R&D adjustment (20)', drills: ['eva-t-nopat26', 'eva-t-ic26', 'eva-n-eva26', 'adj-t-grid26', 'adj-t-block26'] },
      { head: 'Question 2 — RBCAR and residual income (30)', drills: ['cong-n-npv26', 'cong-t-rbcar26', 'cong-v-rbcar', 'cong-t-sl26', 'cong-v-sl'] }
    ]
  },

  {
    id: 'x-ss19',
    title: 'SS19 real exam — the full 120 points',
    sub: 'MC (20) + EVA & ratios (25) + ratio analysis (18) + bonus banks (25) + investment decision & compensation (32).',
    minutes: 120,
    note: 'The richest paper in the corpus, and the only real exam with a complete published answer key. Sit it closed-book, draw every table by hand on paper as you go, and only then type your numbers in.',
    parts: [
      { head: 'Part I — Multiple choice (20)', drills: ['eva-mc-negative', 'id-mc-fcf', 'id-mc-capstruct', 'cong-mc-info', 'opt-mc-wait', 'comp-mc-total', 'cap-t-ss19beta'] },
      { head: 'Question 1 — EVA, adjustments and ratio analysis (25)', drills: ['eva-t-ss19', 'adj-t-ss19', 'adj-seq-lease'] },
      { head: 'Question 2 — Ratio analysis (18)', drills: ['rat-t-ss19', 'rat-v-apturn', 'rat-t-cycle'] },
      { head: 'Question 3 — Management compensation and bonus banks (25)', drills: ['comp-t-bank19', 'comp-v-npvcons', 'comp-n-npv19', 'comp-c-objectives'] },
      { head: 'Question 4 — Investment decision and management compensation (32)', drills: ['dep-n-npv19', 'dep-n-roi19', 'dep-t-sink19', 'dep-t-ri19', 'dep-t-rbcar19'] }
    ]
  },

  {
    id: 'x-pred26',
    title: 'The predicted paper',
    sub: 'Assembled from the archetypes the pattern board says are certain: MC + EVA/adjustment + compensation + goal congruence.',
    minutes: 120,
    note: 'Not a real paper, and not a leak — it is the structural prediction, one question from each family that every real exam has drawn from, built out of verified past material. Treat it as a rehearsal of the shape, not a forecast of the content. Use it the day before.',
    parts: [
      { head: 'Part I — Multiple choice (20)', drills: ['cong-mc-info', 'cap-mc-equity', 'opt-mc-revers', 'cap-mc-betaproblems', 'cap-mc-betaassume', 'eva-mc-negative', 'id-mc-fcf', 'rat-mc-cash', 'cong-mc-preinreich', 'dep-mc-roiirr'] },
      { head: 'Question 1 — EVA from financial statements + an accounting adjustment (25)', drills: ['eva-t-ss17', 'adj-t-ss17', 'cap-t-ss17'] },
      { head: 'Question 2 — Management compensation / bonus banks + NPV consistency (25)', drills: ['comp-n-ss17earned', 'comp-t-bank19', 'comp-n-npv19', 'comp-v-npvcons', 'comp-c-objectives'] },
      { head: 'Question 3 — Goal-congruent performance measures (32)', drills: ['cong-n-npv26', 'cong-t-rbcar26', 'cong-v-rbcar', 'cong-t-sl26', 'cong-v-sl', 'opt-t-ss17'] }
    ]
  }
];
