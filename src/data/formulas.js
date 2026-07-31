/* ==========================================================================
   formulas.js — The Vault.  No formula sheet is permitted in the exam, so
   everything here has to end up in your head.  Grouped in the same tiers the
   past papers reward.
   ========================================================================== */
'use strict';

VBM.data.formulas = [

  /* ------------------------------------------------------------------ D1 */
  {
    id: 'D1', tier: 1, title: 'EVA — core',
    desc: 'On 8 of 8 past papers. Both forms are examinable; the second one is what MC questions attack.',
    fml: [
      'EVA = NOPAT − WACC × Invested Capital     (= NOPAT − Capital Charges)',
      'EVA = (RONA − WACC) × Invested Capital',
      'RONA = NOPAT / Net Assets'
    ],
    notes: [
      'If <b>RONA &gt; WACC</b> and invested capital is positive, EVA is <b>strictly positive</b> — it cannot be negative. That exact sentence is an MC item on SS17 and SS19.',
      'A <b>negative EVA is a perfectly normal answer</b>. The official test-exam answer is −13,140.'
    ]
  },
  {
    id: 'D1b', tier: 1, title: 'NOPAT from the income statement',
    desc: 'The exact ladder the official keys award marks for. Write every line, even the ones that are zero.',
    fml: [
      'Operating income (EBIT)',
      '+ Interest income          ← only if a footnote says it is operating',
      '− Provision for income taxes',
      '− Tax shield = t × interest expense',
      '= NOPAT'
    ],
    notes: [
      '<b>Why the tax shield is subtracted:</b> NOPAT must be as-if-unlevered. The reported tax bill was already reduced by deducting interest, so that benefit has to be removed again.',
      '<b>Interest income:</b> add it only when the paper carries the footnote "interest income stems from cash and marketable securities held for operating activities" (SS23–SS26 do). SS17 and SS19 have no interest income at all.'
    ],
    trap: 'Forgetting <b>− t × interest expense</b>. It is worth explicit marks in every single official key.'
  },
  {
    id: 'D1c', tier: 1, title: 'Invested capital from the balance sheet',
    desc: 'Two lines, and one rule that decides most of the marks on Question 1.',
    fml: [
      'Invested Capital = Total Assets − NIBL',
      'NIBL = all current liabilities EXCEPT short-term (interest-bearing) debt',
      '     = trade accounts payable + accrued expenses + other current liabilities',
      'Ø Invested Capital = ½ × (IC_beginning + IC_end)'
    ],
    notes: [
      'Long-term debt and other non-current liabilities are <b>never</b> subtracted — only <i>non-interest-bearing current</i> items are.',
      'Default to the <b>average</b> invested capital unless the question explicitly says otherwise. SS19 Q4 does say otherwise ("measure the invested capital by the invested capital at the beginning of the period") — read it.'
    ],
    trap: 'Subtracting <b>short-term debt</b>. It is interest-bearing, so it <b>stays inside</b> invested capital. The papers plant the footnote <i>"the position other current liabilities does not include interest-bearing liabilities"</i> precisely to tell you that line belongs in NIBL.'
  },

  /* ------------------------------------------------------------------ D2 */
  {
    id: 'D2', tier: 1, title: 'Accounting adjustment — capitalising R&D or advertising',
    desc: 'Paired with the EVA question on 8 of 8 papers, always worth about 10 points.',
    fml: [
      'Annual amortisation of the year-k spend = Expense_k / N        (N = amortisation years)',
      'NOPAT adj. = + current year\'s expense − Σ (all amortisation charges hitting this year)',
      'IC adj.    = + unamortised (remaining) book value of past & current spend at year-end'
    ],
    notes: [
      '<b>Timing convention, stated on every paper:</b> "the first depreciation charge is due in the same year the expense takes place." A 2006 spend amortised over 3 years is therefore charged in 2006, 2007 and 2008.',
      'Then re-run the whole EVA ladder on the adjusted figures: Ø adjusted IC, adjusted capital charge, adjusted EVA.'
    ],
    trap: 'Grossing the adjustment up for tax. <b>No official solution applies tax to the R&D or advertising adjustment.</b> Add the expense, subtract the amortisation, done.'
  },

  /* ------------------------------------------------------------------ D3 */
  {
    id: 'D3', tier: 1, title: 'Relative Benefit Cost Allocation Rule (RBCAR)',
    desc: '7 of 8 papers, 30 points on every test exam. Three formulas and one verbal argument.',
    fml: [
      'γ = 1/(1+r)',
      'z_t*(X) = x_t / Σ_{i=1..T} x_i · γ^i        ← denominator is the DISCOUNTED sum of the pattern',
      'RI_t = θ · x_t − z_t*(X) · b',
      'equivalently   RI_t = z_t*(X) · NPV(θ)'
    ],
    notes: [
      'The identity <code>RI_t = z_t · NPV</code> is the fastest check you have: every RI must carry the same sign as the NPV.',
      'RBCAR needs only the <b>inter-temporal pattern X</b> of the cash flows, not their magnitude θ. That is exactly why it works when θ is the manager\'s private information.'
    ],
    verbal: {
      pts: 6,
      q: 'Will the manager decide in the shareholders\' interest under RBCAR? Why? Refer to time preferences.',
      a: 'The relative benefit cost allocation rule guarantees that the residual income in each period is <b>proportional to the NPV</b> of the project. A positive-NPV project therefore produces a positive residual income in <b>every</b> period, and a negative-NPV project a negative one in every period. Hence the manager always decides in the shareholders\' interest, and this holds <b>independently of the manager\'s time preferences</b> — this is <b>strong goal congruence</b>.'
    }
  },
  {
    id: 'D3b', tier: 1, title: 'Splitting the allocated cost into depreciation + capital charge',
    desc: 'Asked as a sub-question on SS19 Q4.5 and in Problem Set 6.',
    fml: [
      'z_t = d_t + r · (1 − Σ_{i=1..t−1} d_i)        with Σ_t d_t = 1',
      'B_t = B_{t−1} − d_t · b            (book value)',
      'Capital charge_t = r · B_{t−1}',
      'Depreciation_t = z_t · b − capital charge_t'
    ],
    notes: [
      '<b>Constant cash flows special case</b> (Problem Set 6 Q1.6): if x_1 = x_2 = … = x_T then z_t is constant. Book value falls over time → interest charges fall → since depreciation + interest must stay constant, <b>depreciation charges rise over time</b>.'
    ]
  },

  /* ------------------------------------------------------------------ D4 */
  {
    id: 'D4', tier: 1, title: 'Residual income, ROI, depreciation methods',
    desc: 'On 8 of 8 papers, usually as the follow-up that shows straight-line depreciation failing.',
    fml: [
      'RI_t = Income_t − r · BV_{t−1}   =   c_t − d_t · b − r · B_{t−1}',
      'ROI_t = (cash flow_t − depreciation_t) / Invested capital_{t−1}',
      'Sinking-fund depreciation:  depr_t = cash operating margin_t − IRR × invested capital_{t−1}'
    ],
    table: {
      head: ['Method', 'Key property', 'Exam-ready consequence'],
      rows: [
        ['Straight-line', 'd_t = 1/T each year',
          'ROI and EVA <b>rise</b> over the asset\'s life because book value shrinks. Early RI can be negative on a good project → a manager who leaves early rejects it. <b>No goal congruence.</b>'],
        ['Sinking-fund', 'ROI = IRR in every period',
          'EVA <b>declines</b> over the life. Needs a forecast of the <b>full future cash flows</b> (you need the IRR). EVA improvement on the current capital base is <b>harder</b> than under straight-line. Only <b>weak</b> goal congruence.'],
        ['Relative-benefit (RBCAR)', 'RI_t ∝ NPV in every period',
          '<b>Strong goal congruence.</b> Needs only the inter-temporal pattern X, not the magnitude θ.']
      ]
    },
    notes: [
      '<b>Preinreich–Lücke theorem:</b> the NPV of all future EVAs / residual incomes is the <b>same under any depreciation schedule</b> and equals the project\'s NPV. SS19 Q4.4 explicitly allows "NPV of RIs = NPV of the project" as a full-mark one-liner — <i>with</i> an explanation.'
    ]
  },

  /* ------------------------------------------------------------------ D5 */
  {
    id: 'D5', tier: 1, title: 'Goal congruence — the three definitions',
    desc: 'Learn these verbatim. 8 of 8 papers, and the wording is what earns the marks.',
    table: {
      head: ['Type', 'Definition', 'Criterion'],
      rows: [
        ['<b>Weak</b>', 'The manager decides in the shareholders\' interest <b>if and only if</b> the manager\'s time preference (discount rate) is <b>identical</b> to the shareholders\'.', 'E[Σ k_t·RI_t | θ] for k_t <b>equal to the owner\'s</b>'],
        ['<b>Strong</b>', 'Decisions stay aligned <b>even when</b> the manager\'s and shareholders\' discount rates <b>differ</b> — assuming no uncertainty, or a risk-neutral manager.', 'E[Σ k_t·RI_t | θ] for arbitrary <b>non-negative</b> k_t'],
        ['<b>Robust</b>', 'Decisions stay aligned when preferences differ <b>and</b> there is uncertainty <b>and</b> the manager is risk-averse.', 'E[U(RI_1,…,RI_T) | θ] for any U weakly increasing in each argument']
      ]
    }
  },

  /* ------------------------------------------------------------------ D6 */
  {
    id: 'D6', tier: 2, title: 'Cost of capital — CAPM and WACC',
    desc: 'Recurring MC every year plus a cheap 3-point sub-question.',
    fml: [
      'WACC = S/(S+B) · r_S  +  B/(S+B) · r_B · (1 − T_C)',
      'CAPM:  E(R_i) = R_f + β_i · [E(R_M) − R_f]',
      'β_i = cov(R_i, R_M) / Var(R_M)',
      'Un-/re-levering:  β_U = β_L / [1 + (1−T_C)·B/S]     then     β_L^own = β_U · [1 + (1−T_C)·B^own/S^own]'
    ],
    notes: [
      '<b>Systematic (market) risk</b> — GDP, inflation, interest rates. Cannot be diversified away; the market pays you for bearing it. This is what β measures.',
      '<b>Unsystematic (company-specific, idiosyncratic) risk</b> — management errors, production downtime. <b>Can</b> be diversified away, so the market does <b>not</b> pay for it.'
    ],
    trap: 'β divides by the variance of the <b>market</b> return — never by the variance of the firm\'s own return, and never by the variance of stock <i>prices</i>. SS17 hands you Var(own) = 0.06 purely as a distractor; SS19 MC Q10 asks it directly.'
  },

  /* ------------------------------------------------------------------ D7 */
  {
    id: 'D7', tier: 2, title: 'Ratio analysis',
    desc: '18 points on SS19. Lots of formulas, but each is one line.',
    table: {
      head: ['Ratio', 'Formula'],
      rows: [
        ['Inventory turnover', 'Cost of goods sold / <b>average</b> inventory'],
        ['Receivables turnover', 'Sales / average trade receivables'],
        ['Payables turnover', '<b>Purchases</b> / average accounts payable, where <b>Purchases = COGS + Δinventory</b>'],
        ['Avg. no. of days …', '365 / the corresponding turnover ratio'],
        ['<b>Length of operating cycle</b>', 'days inventory in stock + days receivables outstanding'],
        ['<b>Length of cash cycle</b>', 'operating cycle − days payables outstanding'],
        ['Fixed / total asset turnover', 'Sales / average fixed (or total) assets'],
        ['Current ratio', 'current assets / current liabilities'],
        ['Quick ratio', '(cash + marketable securities + receivables) / current liabilities'],
        ['Cash ratio', '(cash + marketable securities) / current liabilities'],
        ['CFO ratio', 'cash flow from operations / current liabilities'],
        ['Debt to equity / to capital', 'total debt / total equity  ·  total debt / (debt + equity)'],
        ['Times interest earned', 'EBIT / interest expense'],
        ['Capital expenditure ratio', 'CFO / capital expenditures'],
        ['CFO to debt', 'CFO / total debt'],
        ['Gross / operating / profit margin', 'gross profit ÷ Sales · operating income ÷ Sales · net income ÷ Sales'],
        ['Margin before interest & tax', 'EBIT / Sales'],
        ['ROA (pre-int., pre-tax)', 'EBIT / average total assets'],
        ['ROTC (pre-int., pre-tax)', 'EBIT / average (total debt + shareholders\' equity)'],
        ['ROE (after tax)', 'net income / average shareholders\' equity']
      ]
    },
    trap: 'Using COGS instead of <b>purchases</b> for payables turnover. SS19 awards 3 points for that one ratio precisely because of this step.'
  },

  /* ------------------------------------------------------------------ D8 */
  {
    id: 'D8', tier: 3, title: 'Free cash flow, and the EVA / MVA / DCF identities',
    desc: 'MC only — but three years running.',
    fml: [
      'EBITDA − D&A − Taxes = NOPAT   + D&A − CapEx − ΔWCR = Free Cash Flow',
      'MVA = Σ EVA_t /(1+WACC)^t',
      'Market value of firm = Invested Capital + PV of future EVAs',
      'Σ EVA_t·(1+WACC)^−t + Invested Capital = Σ FCF_t·(1+WACC)^−t'
    ],
    notes: [
      '<b>FCF from NOPAT:</b> add back depreciation & amortisation, then subtract capital expenditures and ΔWCR. Do <b>not</b> add back taxes; do <b>not</b> subtract D&A.',
      '<b>EBIT bottom-up</b> (the route recommended in the lecture): Net profit + income taxes = EBT; EBT + interest & other financial expense − interest & other financial income = EBIT.',
      '<b>EBIT top-down:</b> Net sales − COGS = gross profit; − SG&A − R&D − other = EBITDA; − D&A = EBIT.'
    ],
    trap: 'The statement "the market value of a firm equals the PV of future EVAs" <b>alone</b> is wrong — it omits invested capital. So is "PV of EVAs <i>minus</i> invested capital = PV of FCFs".'
  },

  /* ------------------------------------------------------------------ D9 */
  {
    id: 'D9', tier: 2, title: 'Capitalising operating leases — the five steps',
    desc: 'Pure recall, 5 points, asked almost verbatim on SS17 (1.4) and SS19 (1.3).',
    fml: [
      '1. Invested capital: compute the lease liability as the present value of future lease payments; add it to invested capital.',
      '2. NOPAT: estimate the interest portion of the lease payments (pretax borrowing cost × average lease value) and add it back to NOPAT.',
      '3. NOPAT: deduct the tax shield on that interest amount.',
      '4. WACC: recompute WACC treating the lease liability as additional debt.',
      '5. Recompute EVA with the adjusted figures.'
    ],
    notes: [
      '<b>Punchline worth stating:</b> the effect on EVA is minor. With zero MVA the adjustment leaves EVA exactly unchanged; with positive MVA EVA declines slightly, with negative MVA it rises slightly.'
    ]
  },

  /* ------------------------------------------------------------------ D10 */
  {
    id: 'D10', tier: 1, title: 'Bonus banks',
    desc: '25–40 points when it appears, and it appeared on 3 of the 4 real exams.',
    fml: [
      'Bonus earned_t = target bonus + y × (EVA_t − target / expected EVA)',
      'Cumulative bonus earned = cumulative bonus paid + ending bonus bank'
    ],
    notes: [
      '<b>The bank table always has the same five rows:</b> bank beginning (= prior ending × (1+r)) · bonus earned · bank after earned bonus · bonus paid out · bank ending.',
      '<b>Read the payout rule — it changes between papers.</b> SS19: target bonus 35,000 + <b>20%</b> of the amount in excess, capped at the bank balance, nothing paid when the bank is negative. SS17: target bonus + <b>one third</b> of the remainder, capped at the bank value. Problem Set 3: the bonus is split into <b>three equal tranches</b>, one paid immediately and the other two in the following two years with interest at the WACC.',
      '<b>Why interest is paid on the bank</b> — it compensates the manager for delayed payment and reflects the time value of money. <b>Why also on negative balances</b> — it keeps incentives symmetric and prevents excessive risk-taking. <b>Why EVA <i>improvements</i> rather than levels</b> — a division with a structurally negative EVA could otherwise never earn a bonus, and one with a high EVA would be paid for inherited performance.'
    ],
    verbal: {
      pts: 3,
      q: 'Define net-present-value consistency with respect to bonus banks, and say why owners want it.',
      a: 'NPV consistency means the <b>NPV of the bonuses earned equals the NPV of the bonuses paid out</b>. It matters because once you have a bonus based on a goal-congruent performance measure, you must not destroy that goal congruence by allocating the bonuses earned across different periods without paying attention to the time value of money.'
    }
  },

  /* ------------------------------------------------------------------ D11 */
  {
    id: 'D11', tier: 2, title: 'Real options',
    desc: 'A guaranteed MC item, and a full 32–38 point question on SS17 and WT16.',
    fml: [
      'The three defining characteristics:   Irreversibility  ·  Uncertainty  ·  Flexibility',
      'Wait if   E[V_0(c_2)] > V_0(c_1)      — the discounted expected value of waiting beats investing now'
    ],
    notes: [
      'To achieve <b>strong goal congruence</b> with an option to wait, the <b>option value must itself be capitalised and depreciated</b> — charged when the option is exercised or expires. Treated that way, no knowledge of the manager\'s discount rate is needed.',
      'Types: option to wait/defer, to expand, to abandon, to switch, to temporarily shut down.'
    ],
    trap: 'The distractor asked every single year: <i>"Reversibility: management can reverse fund allocation decisions."</i> The real characteristic is <b>IRREVERSIBILITY</b>. Also: an option to wait is <b>not</b> the option to temporarily shut down and resume — that is a separate option type.'
  },

  /* ------------------------------------------------------------------ D12 */
  {
    id: 'D12', tier: 2, title: 'The four objectives of managerial compensation',
    desc: 'Pure memorisation, 4 points, asked on SS17 (2.5) and SS19 (3.4).',
    table: {
      head: ['Objective', 'What it means'],
      rows: [
        ['<b>Alignment</b>', 'Choosing the <b>right performance measures</b> in order to align the manager\'s and the shareholders\' interests.'],
        ['<b>Wealth leverage</b>', 'Giving management <b>sufficient incentives</b> to work hard and to take the necessary risk in order to maximise shareholder value.'],
        ['<b>Retention</b>', 'Giving good managers <b>sufficient total compensation to retain them</b>, even during periods of poor performance caused by market or industry factors.'],
        ['<b>Shareholder cost</b>', '<b>Limiting the cost</b> of management compensation to levels sufficient to maximise the wealth of current shareholders.']
      ]
    },
    notes: [
      'On redesign questions: you <b>must</b> consider the effect on the manager\'s <b>total pay</b> (the sum of all remuneration components). Complex packages are <b>not</b> required, and short-term bonuses should <b>not</b> be the key incentive for the strategic agenda.'
    ]
  }
];
