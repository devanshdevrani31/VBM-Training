/* ==========================================================================
   drills-capital.js · Chapter 6: Cost of capital.
   Recurring MC every year, plus a cheap 3-point sub-question.
   ========================================================================== */
'use strict';

(function (V) {

  const S17CAP = {
    t: 'Cost-of-capital data (SS17 Q1.1)',
    rows: [
      ['Market value of equity S', '5,400'],
      ['Market value of debt B', '1,350'],
      ['Risk-free rate R_f', '1 %'],
      ['Expected market return E(R_M)', '10 %'],
      ['Cost of debt r_B', '6 %'],
      ['Tax rate T_C', '30 %'],
      ['cov(R_i, R_M)', '0.05'],
      ['Var(R_M)', '0.04'],
      ['Var(R_i), the firm\'s own return', '0.06']
    ],
    fn: 'In thousands of EUR. One of these nine numbers is a <b>deliberate distractor</b>.'
  };

  const S19MKT = {
    t: 'Market and stock data (SS19 MC 7-10)',
    cols: ['Year', 'Market return', 'Stock price firm A (EUR)'],
    rows: [['2015', ', ', '200'], ['2016', '0.3', '220'], ['2017', '0.5', '176'], ['2018', '0.1', '88']]
  };

  V.reg([

    /* ------------------------------------------------ formulas */
    {
      id: 'cap-f-capm', kind: 'formula', chapter: 'capital', pts: 3,
      title: 'Write the CAPM',
      q: 'Assemble the CAPM expression for the expected return on asset i.',
      tokens: ['E(R_i)', '=', 'R_f', '+', 'β_i', '×', '[', 'E(R_M)', '−', 'R_f', ']'],
      decoys: ['×', '(1 − T_C)', 'Var(R_M)', '/', 'r_B', 'cov(R_i, R_M)'],
      accept: [['E(R_i)', '=', 'R_f', '+', 'β_i', '×', '[', 'E(R_M)', '−', 'R_f', ']']],
      hints: [
        'Two parts: what you earn for taking no risk, plus what you earn for the risk you did take.',
        'The reward for risk is your exposure (β) times the price of one unit of market risk.',
        'E(R_i) = R_f + β_i × [E(R_M) − R_f]. The bracket is the market risk premium.'
      ],
      why: 'The bracket <b>[E(R_M) − R_f]</b> is the market risk premium, the extra return the market as a whole pays for bearing one unit of market risk. β then scales it to <i>your</i> exposure. Two implications the MC items rely on: an asset with β = 0 earns only R_f no matter how volatile it is on its own, and only <b>market</b> risk is priced at all. That is the whole content of "the capital market does not pay investors for bearing company-specific risk."'
    },

    {
      id: 'cap-f-beta', kind: 'formula', chapter: 'capital', pts: 3,
      title: 'Write beta',
      q: 'Assemble beta. Choose the denominator carefully. This exact distractor is on the papers.',
      tokens: ['β_i', '=', 'cov(R_i, R_M)', '/', 'Var(R_M)'],
      decoys: ['Var(R_i)', 'Var(stock prices)', '×', 'σ_i', 'R_f'],
      accept: [['β_i', '=', 'cov(R_i, R_M)', '/', 'Var(R_M)']],
      hints: [
        'The numerator is how the asset moves <i>with</i> the market.',
        'The denominator normalises by how much the <b>market</b> moves, so that the market itself has β = 1.',
        'β_i = cov(R_i, R_M) / Var(R_M).'
      ],
      why: '<b>Why the market\'s variance and not the firm\'s?</b> Because β must be a measure of <i>relative</i> exposure, calibrated so the market portfolio has β exactly 1. Dividing by Var(R_M) does that. Dividing by the firm\'s own variance would instead give you a correlation-like quantity that no longer scales the risk premium correctly.<br><br>Two distractors to recognise on sight: <b>Var(R_i)</b>: the firm\'s own return variance, handed to you on SS17 as 0.06 purely to tempt you; and <b>Var(stock prices)</b>: beta is built from <i>returns</i>, never from price levels, which is why SS19 makes you convert prices to returns before anything else.'
    },

    {
      id: 'cap-f-wacc', kind: 'formula', chapter: 'capital', pts: 3,
      title: 'Write the after-tax WACC',
      q: 'Assemble the after-tax weighted average cost of capital.',
      tokens: ['WACC', '=', 'S/(S+B)', '·', 'r_S', '+', 'B/(S+B)', '·', 'r_B', '·', '(1 − T_C)'],
      decoys: ['·', '(1 − T_C)', 'β', 'R_f', '−'],
      accept: [['WACC', '=', 'S/(S+B)', '·', 'r_S', '+', 'B/(S+B)', '·', 'r_B', '·', '(1 − T_C)']],
      hints: [
        'A weighted average of two costs, with market-value weights.',
        'Only <b>one</b> of the two terms carries the (1 − T_C) factor.',
        'WACC = S/(S+B)·r_S + B/(S+B)·r_B·(1 − T_C).'
      ],
      why: '<b>The (1 − T_C) sits on the debt term only</b>, because interest is tax-deductible and dividends are not. That single asymmetry generates several exam answers at once: it is why debt is <i>cheaper</i> than equity beyond its lower risk; it is why "a higher leverage may result in a higher firm value" is a <b>true</b> statement; and it is why <b>increasing the portion of equity raises the WACC and therefore lowers future EVAs</b>, which is a recycled MC item in its own right.<br><br>Also note the weights are <b>market</b> values, not book values, and that r_S comes from the CAPM. The three formulas chain: β → r_S → WACC.'
    },

    /* ------------------------------------------------ SS17 chain */
    {
      id: 'cap-t-ss17', kind: 'table', chapter: 'capital', pts: 3,
      title: 'β → cost of equity → WACC (SS17 Q1.1)',
      source: 'SS17 Q1.1 / SS18 · official solution (via the blueprint)',
      q: 'Calculate the company\'s after-tax WACC. (3 points)',
      note: 'Three lines. Cheap points, and it recurs as MC every year.',
      data: [S17CAP],
      cols: ['Value'],
      rows: [
        {
          label: 'β = cov(R_i, R_M) / Var(R_M)', cells: [{
            a: 1.25, tol: 0.02, f: '0.05 / 0.04 = 1.25',
            h: ['Covariance over the variance of the <b>market</b> return.'],
            diag: [{ v: 0.8333, m: 'You divided by 0.06, the variance of the <b>firm\'s own</b> return. That number is on the paper purely as a distractor.' },
            { v: 0.002, m: 'You multiplied. Beta is a ratio: cov / Var(R_M).' }]
          }]
        },
        {
          label: 'r_S = R_f + β · [E(R_M) − R_f]', cells: [{
            a: 12.25, tol: 0.1, f: '0.01 + 1.25 × (0.10 − 0.01) = 0.01 + 0.1125 = 0.1225 = 12.25 %',
            h: ['The market risk premium is 10 % − 1 % = 9 %.', '0.01 + 1.25 × 0.09.'],
            diag: [{ v: 12.5, m: 'You used 1.25 × 0.10 and forgot to subtract R_f inside the bracket. The premium is E(R_M) − R_f = 9 %.' },
            { v: 0.1225, m: 'Enter it as a percentage: 12.25.' }]
          }]
        },
        {
          label: 'WACC (in %)', total: true, cells: [{
            a: 10.64, tol: 0.06, f: 'S/(S+B) = 5,400/6,750 = 0.8 ;  B/(S+B) = 1,350/6,750 = 0.2\nWACC = 0.8 × 0.1225 + 0.2 × 0.06 × (1 − 0.30) = 0.098 + 0.0084 = 0.1064 = 10.64 %',
            h: ['Total capital is 5,400 + 1,350 = 6,750, so the weights are 0.8 and 0.2.',
              'The debt term is 0.2 × 0.06 × 0.7 = 0.0084.',
              '0.098 + 0.0084.'],
            diag: [{ v: 11, m: 'You omitted the (1 − T_C) factor on the debt term: 0.8 × 0.1225 + 0.2 × 0.06 = 0.11.' },
            { v: 9.5, m: 'Check your weights, equity is 0.8 of total capital here, not 0.2.' }]
          }]
        }
      ],
      why: 'Three mechanical lines for 3 points, so it is among the best points-per-minute on the paper. The step people skip is the <b>weights</b>: total capital is S + B, and both weights must be computed from <i>market</i> values.<br><br>Then notice how the answer is used: the very next line of SS17 says <i>"Now, assume that the after-tax WACC is 10 %."</i> The examiner deliberately <b>decouples</b> the WACC sub-question from the EVA calculation, so a wrong 10.64 % cannot cascade. That is a general feature of these papers, <b>a mistake in one sub-question rarely destroys the next</b>, so never abandon a question because you doubt an earlier number.'
    },

    /* ------------------------------------------------ SS19 statistics chain */
    {
      id: 'cap-t-ss19beta', kind: 'table', chapter: 'capital', pts: 8,
      title: 'From stock prices to beta (SS19 MC 7-10)',
      source: 'SS19 MC Q7-Q10 · official solution',
      q: 'Four consecutive MC items build one chain. Work through it.',
      note: 'The official answers use the <b>sample</b> statistics: divide by (n − 1), not by n. The n-divisor answer 0.0267 is offered as a distractor and marked wrong.',
      data: [S19MKT],
      cols: ['Value'],
      rows: [
        {
          label: 'Mean return of firm A', cells: [{
            a: -0.2, tol: 0.005, f: 'returns: 220/200 − 1 = 0.1 ; 176/220 − 1 = −0.2 ; 88/176 − 1 = −0.5\nmean = (0.1 − 0.2 − 0.5) / 3 = −0.6 / 3 = −0.2',
            h: ['Convert the four prices into three returns first: each is next price / previous price − 1.',
              'The three returns are +0.1, −0.2 and −0.5.',
              'Average them: −0.6 / 3.'],
            diag: [{ v: -0.6, m: 'That is the sum of the three returns. Divide by 3.' },
            { v: -0.3864, m: 'This is the distractor on the paper. It comes from averaging price changes rather than returns, or from a geometric mean. The key wants the arithmetic mean of the three simple returns.' },
            { v: -0.56, m: 'That is 88/200 − 1, the total return over three years. The question asks for the mean of the annual returns.' }]
          }]
        },
        {
          label: 'Variance of the market returns', cells: [{
            a: 0.04, tol: 0.0015, f: 'market returns 0.3, 0.5, 0.1 → mean 0.3\ndeviations 0, +0.2, −0.2 → squares 0, 0.04, 0.04\nVar = 0.08 / (3 − 1) = 0.04',
            h: ['Mean market return is (0.3 + 0.5 + 0.1)/3 = 0.3.',
              'The squared deviations sum to 0.08.',
              'Divide by n − 1 = 2, giving 0.04.'],
            diag: [{ v: 0.0267, m: 'This is the offered distractor: 0.08 / 3, using the <b>population</b> divisor. The official key uses the <b>sample</b> divisor n − 1, giving 0.04.' },
            { v: 0.0048, m: 'Not one of the accepted routes, recompute the squared deviations from the mean of 0.3.' }]
          }]
        },
        {
          label: 'Covariance between market and firm A', cells: [{
            a: 0.03, tol: 0.0015, f: 'firm deviations: +0.3, 0, −0.3 ; market deviations: 0, +0.2, −0.2\nproducts: 0, 0, +0.06 → sum 0.06\ncov = 0.06 / (3 − 1) = 0.03',
            h: ['Pair each year\'s deviation from its own mean and multiply.',
              'Only 2018 contributes: (−0.5 − (−0.2)) × (0.1 − 0.3) = (−0.3) × (−0.2) = 0.06.',
              'Divide by n − 1 = 2.'],
            diag: [{ v: 0.02, m: 'That is 0.06 / 3, the population divisor. Be consistent with the variance and use n − 1.' },
            { v: 0.06, m: 'That is the sum of the cross-products. Divide by n − 1 = 2.' }]
          }]
        },
        {
          label: 'β of firm A', total: true, cells: [{
            a: 0.75, tol: 0.02, f: 'β = cov / Var(R_M) = 0.03 / 0.04 = 0.75',
            h: ['Now just apply the definition.'],
            diag: [{ v: 0.5, m: 'You divided by the variance of firm A\'s own returns rather than the market\'s.' },
            { v: 1.3333, m: 'Inverted: cov goes on top, Var(R_M) underneath.' }]
          }]
        }
      ],
      why: '<b>Two habits this chain enforces.</b> First, <b>prices are not returns.</b> The exam hands you a price series precisely to see whether you convert. Second, <b>be consistent about the divisor</b>: the official key uses the sample statistics (n − 1) for both the variance and the covariance, and it offers the population answer (0.0267) as a distractor for the variance. Because β is a <i>ratio</i> of the two, the divisor actually cancels, 0.06/0.08 = 0.75 either way, but the intermediate MC answers do not cancel, so match the key.<br><br>Also worth reading: β = 0.75 &lt; 1, so firm A is <i>less</i> exposed to market risk than the market. Its stock collapsed from 200 to 88, yet its beta is low, because most of that collapse was <b>company-specific</b>, and company-specific risk is exactly what beta does not measure and the market does not pay for.'
    },

    {
      id: 'cap-f-relever', kind: 'formula', chapter: 'capital', pts: 3,
      title: 'Write the un-levering and re-levering formulas',
      q: 'Assemble the two-step beta adjustment: strip out the comparable\'s leverage, then impose your own.',
      note: 'Build them as one line: un-lever first, then re-lever.',
      tokens: ['β_U', '=', 'β_L', '/', '[1 + (1 − T_C)·B/S]', 'then', 'β_L^own', '=', 'β_U', '·', '[1 + (1 − T_C)·B^own/S^own]'],
      decoys: ['×', '−', '(1 + T_C)', 'R_f'],
      accept: [['β_U', '=', 'β_L', '/', '[1 + (1 − T_C)·B/S]', 'then', 'β_L^own', '=', 'β_U', '·', '[1 + (1 − T_C)·B^own/S^own]']],
      hints: [
        'The observed beta of a comparable firm mixes business risk with that firm\'s financing. You want only the business risk.',
        'Removing leverage <i>divides</i> by the levering factor; applying your own leverage <i>multiplies</i> by yours.',
        'β_U = β_L / [1 + (1 − T_C)·B/S], then β_L^own = β_U · [1 + (1 − T_C)·B^own/S^own].'
      ],
      why: '<b>Why you ever need this:</b> to price a division or an unlisted firm you borrow a beta from a listed comparable, but that beta reflects the comparable\'s <i>capital structure</i> as well as its business. Un-levering strips the financing out, leaving pure <b>asset (business) risk</b>. Re-levering then adds <i>your</i> financing back.<br><br>The direction is the only thing to get right: <b>divide to un-lever, multiply to re-lever.</b> And more debt means a higher levered beta, equity holders in a levered firm bear the same business risk on a thinner slice of capital, so their returns swing harder.'
    },

    /* ------------------------------------------------ concepts */
    {
      id: 'cap-c-risk', kind: 'classify', chapter: 'capital', pts: 4,
      title: 'Systematic or unsystematic?',
      q: 'Classify each item. The examiner cares mainly about one consequence: does the market pay you for bearing it?',
      buckets: ['Systematic (market) risk', 'Unsystematic (company-specific) risk'],
      items: [
        { t: 'A change in GDP growth', b: 0, why: '<b>Systematic.</b> It moves the whole economy, so no amount of diversification escapes it.' },
        { t: 'Inflation', b: 0, why: '<b>Systematic.</b> Economy-wide.' },
        { t: 'A change in interest rates', b: 0, why: '<b>Systematic.</b> Economy-wide.' },
        { t: 'Management errors at one firm', b: 1, why: '<b>Unsystematic.</b> Idiosyncratic to that firm, so a diversified portfolio nets it away against other firms\' idiosyncratic outcomes.' },
        { t: 'Production downtime at a single plant', b: 1, why: '<b>Unsystematic.</b> Company-specific and diversifiable.' },
        { t: 'The risk β measures', b: 0, why: '<b>Systematic.</b> β is built from the covariance with the market, so by construction it captures only the market-linked component.' },
        { t: 'The risk that <i>can</i> be diversified away', b: 1, why: '<b>Unsystematic.</b> And because it can be diversified away for free, the market does <b>not</b> pay you for bearing it.' },
        { t: 'The risk the capital market pays investors for bearing', b: 0, why: '<b>Systematic.</b> This is the whole logic of the CAPM: only non-diversifiable risk earns a premium.' }
      ],
      why: '<b>One test settles every item: can a diversified investor make it disappear for free?</b> If yes it is unsystematic and unpriced; if no it is systematic and priced. That is why the CAPM has exactly one risk term, and why β divides by the market\'s variance. It is measuring only the part that survives diversification.<br><br>The exam wording to recognise: "β reflects the company-specific risk" is <b>wrong</b> (SS26 MC 1.5, SS17 MC 2); "the capital market pays investors for bearing the company-specific risk" is <b>wrong</b>; "the market risk cannot be eliminated through diversification" is <b>true</b>.'
    },

    {
      id: 'cap-mc-betaproblems', kind: 'mc', chapter: 'capital', pts: 2,
      title: 'MC: problems in determining β',
      source: 'SS23/SS24/SS25/SS26 test exam MC 1.4 · official solution',
      q: 'Calculating β with the CAPM imposes some problems. Which of the following is <em>not</em> a problem related to the determination of β?',
      opts: [
        { t: 'Choice of the right rate of return for the company\'s debt.', ok: true, y: 'Correct: this is the answer. β concerns <b>equity</b> returns. The cost of debt is a separate WACC input and has nothing to do with estimating β.' },
        { t: 'Choice of the right return interval.', ok: false, y: 'A genuine estimation problem, daily, weekly or monthly returns give different betas.' },
        { t: 'Choice of the right time period for data.', ok: false, y: 'A genuine estimation problem, how far back you sample changes the estimate.' }
      ],
      why: 'The trick is a <b>category error</b>, not a factual one: r_B is a real input to the WACC, just not to β. β is estimated by regressing the firm\'s <i>equity</i> returns on market returns, so every genuine problem concerns that estimation, the return interval, the sample period, the choice of market index, whether to use raw or adjusted betas. <b>Ask which formula the item belongs to</b> and this type of question resolves itself. This item has appeared identically on SS23, SS24, SS25 and SS26.'
    },

    {
      id: 'cap-mc-betaassume', kind: 'mc', chapter: 'capital', pts: 2,
      title: 'MC: assumptions on β',
      source: 'SS23/SS24/SS25/SS26 test exam MC 1.5 · official solution',
      q: 'Which of the following assumptions on β is <em>wrong</em>?',
      opts: [
        { t: 'β reflects the company-specific risk.', ok: true, y: 'Wrong, so this is the answer. β measures <b>market / systematic</b> risk only. Company-specific risk is diversifiable and unpriced.' },
        { t: 'β measures the volatility of a company\'s stock price with respect to the overall stock market.', ok: false, y: 'True: that is a fair verbal description of cov(R_i, R_M)/Var(R_M).' },
        { t: 'β reflects the market risk.', ok: false, y: 'True, and it is the direct contradiction of the wrong option. When two options contradict each other, one of them is the answer.' }
      ],
      why: 'Word-for-word on four consecutive test exams, and it comes with a free technique: <b>options 1 and 3 directly contradict each other</b>, so one of them must be the answer and the third option is noise. Whenever an MC item contains a contradictory pair, you have already reduced it to a coin-flip you can win on knowledge, and here the knowledge is one line: β is built from the covariance with the market, so it can only ever measure market risk.'
    },

    {
      id: 'cap-mc-equity', kind: 'mc', chapter: 'capital', pts: 2,
      title: 'MC: how can future EVAs be improved?',
      source: 'SS23/SS24/SS25/SS26 test exam MC 1.2 · official solution',
      q: 'Which of the following statements is <em>wrong</em>? Future EVAs of a company can be improved by…',
      opts: [
        { t: '… increasing the portion of equity.', ok: true, y: 'Wrong, so this is the answer. Equity is <b>more expensive</b> than debt: it has no tax shield and it bears more risk, so raising the equity share <b>increases</b> the WACC, increases capital charges, and <b>lowers</b> EVA.' },
        { t: '… decreasing operational expenses without influencing future cash-flows.', ok: false, y: 'Genuinely raises EVA: NOPAT rises with the capital base unchanged.' },
        { t: '… decreasing the capital employed without influencing future cash-flows.', ok: false, y: 'Genuinely raises EVA: the capital charge falls with NOPAT unchanged.' }
      ],
      why: 'This item quietly tests whether you can see the <b>three levers on EVA</b> in the formula EVA = NOPAT − WACC × IC: raise NOPAT, cut invested capital, or cut the WACC. The two correct-sounding options are simply the first two levers. The wrong option targets the third lever <b>in the wrong direction</b>: swapping cheap tax-deductible debt for expensive equity pushes WACC <i>up</i>.<br><br>Note the clause "without influencing future cash-flows" doing real work in options 2 and 3. Cutting costs or capital in a way that <i>does</i> damage future cash flows is precisely the short-termism the whole course is about, and the qualifier is what makes those statements true.'
    }

  ]);

})(window.VBM);
