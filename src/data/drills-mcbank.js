/* ==========================================================================
   drills-mcbank.js · the exam multiple-choice bank.
   Real papers use EXACTLY THREE options and a narrow set of stems:
     "Indicate which of the following statements is wrong."
     "Which of the following statements is true?"
     "Which of the following is not a problem related to ...?"
   Numeric items offer three candidate values, all of which are real ratios.
   Everything here follows that shape. Options are the printed ones wherever
   the paper was available; where they were not, the drill says so.
   ========================================================================== */
'use strict';

(function (V) {

  /* The SS17 statements, trimmed to the lines the MC items need. */
  const S17_MC = {
    t: 'SS17 financial statements (the lines these items use)',
    cols: ['2015', '2016'],
    rows: [
      ['Sales', '', '5,000'],
      ['Cost of Sales', '', '2,900'],
      ['Operating income', '', '480'],
      ['Income before taxes', '', '400'],
      ['Net income', '', '280'],
      ['Cash and cash equivalents', '100', '120'],
      ['Accounts receivable, net', '500', '600'],
      ['Inventories', '700', '800'],
      ['Other current assets', '800', '800'],
      ['<b>Total current assets</b>', '<b>2,100</b>', '<b>2,320</b>'],
      ['<b>Total current liabilities</b>', '<b>1,450</b>', '<b>1,590</b>']
    ],
    fn: 'There are <b>no marketable securities</b> on this balance sheet. Use 1 year = 365 days.'
  };

  const S19_MC = {
    t: 'Market and stock data (SS19)',
    cols: ['Market return', 'Stock price firm A (EUR)'],
    rows: [['2015', '', '200'], ['2016', '0.3', '220'], ['2017', '0.5', '176'], ['2018', '0.1', '88']],
    fn: 'Variance of the return of firm A: <b>0.06</b>.'
  };

  V.reg([

    /* ================================================== SS17, conceptual */

    {
      id: 'mcb-s17-2', kind: 'mc', chapter: 'mcbank', pts: 2,
      title: 'SS17 MC 2: beta and diversification',
      source: 'SS17 MC Q2 · options transcribed from the paper',
      q: 'Which of the following statements is <em>true</em>?',
      opts: [
        { t: 'The Beta in CAPM reflects the company-specific risk.', ok: false, y: 'False. Beta is built from the covariance with the market, so it can only measure market risk.' },
        { t: 'The capital market pays investors for bearing the company-specific risk.', ok: false, y: 'False. Company-specific risk can be diversified away for free, so nobody pays you to carry it.' },
        { t: 'The market risk cannot be eliminated through diversification.', ok: true, y: 'True, and that is precisely why it is the only risk the CAPM prices.' }
      ],
      why: 'One test settles all three: <b>can a diversified investor make this risk disappear for free?</b> If yes it is unsystematic and unpriced. If no it is systematic, it is what beta measures, and it is what earns a premium.'
    },




    {
      id: 'mcb-s17-6', kind: 'mc', chapter: 'mcbank', pts: 2,
      title: 'SS17 MC 6: the Siemens compensation system',
      source: 'SS17 MC Q6 · options transcribed from the paper. NO published key was available for this '
        + 'item, so the answer below is reasoned, not verified. Check it against the Siemens slide in the '
        + 'compensation lecture before you trust it.',
      q: 'Which of the following statements is <em>wrong</em> concerning the compensation system for top '
        + 'and senior management at Siemens AG?',
      note: 'This is the one item in the bank whose answer is not confirmed by an official solution. It is '
        + 'here because it is on the paper, and because Siemens appeared exactly once in a decade, so it is '
        + 'worth two minutes and no more.',
      opts: [
        { t: 'The total target compensation consists of the three equally weighted components "Base compensation", "Variable compensation", and "Long-term stock-based compensation".', ok: false, y: 'Matches the structure described in the lecture: roughly a third each.' },
        { t: 'The variable compensation also includes a bonus based on the achievement of individual targets.', ok: false, y: 'Matches the lecture: the variable component blends company performance with individual targets.' },
        { t: 'To link variable compensation to the company\'s success and to put an emphasis on an ownership culture, the variable compensation is not capped by a maximum amount, which cannot be exceeded.', ok: true, y: 'This is the statement to pick as wrong. Variable pay at Siemens <b>is</b> capped, and a maximum on variable remuneration is standard German governance practice. Note the sentence also does not hang together: an uncapped bonus is not what an ownership culture argues for.' }
      ],
      why: 'Read this one as a <b>plausibility</b> question rather than a recall question, which is how to survive any item on a topic you skimmed. Two options describe ordinary, unremarkable plan design. The third makes a claim that cuts against everything else the course says about compensation, namely that payouts should be bounded and that short-term variable pay should not run the strategic agenda. <b>When one option contradicts the spirit of the whole course, that is usually the one the examiner wants.</b><br><br>Being straight with you: this answer is reasoning, not a published key. Spend two minutes on the Siemens slide and settle it yourself.'
    },

    /* ================================================== SS17, numeric ratios */
    {
      id: 'mcb-s17-7', kind: 'mc', chapter: 'mcbank', pts: 2,
      title: 'SS17 MC 7: days inventory in stock',
      source: 'SS17 MC Q7 · options transcribed from the paper',
      q: 'The "Average Number of Days Inventory in Stock" for 2016 is',
      note: 'Every wrong option here is a real ratio, just the wrong one. That is how the numeric items are built.',
      data: [S17_MC],
      opts: [
        { t: '54.75 days', ok: false, y: 'This is 365 / (sales ÷ average inventory). Inventory turnover uses <b>cost of sales</b>, not sales.' },
        { t: '94.3966 days', ok: true, y: 'Correct. Turnover = 2,900 / [½ × (700 + 800)] = 3.8667, and 365 / 3.8667 = 94.3966.' },
        { t: '51.4568 days', ok: false, y: 'This comes from a year-end inventory and sales. Turnover ratios use the <b>average</b> balance and COGS.' }
      ],
      why: 'The examiner is not testing arithmetic, they are testing whether you can keep twenty near-identical definitions apart. So drill the <b>numerator</b>: inventory takes COGS, receivables take sales, payables take purchases. Get the numerator right and the distractors become visibly wrong.'
    },

    {
      id: 'mcb-s17-8', kind: 'mc', chapter: 'mcbank', pts: 2,
      title: 'SS17 MC 8: receivables turnover',
      source: 'SS17 MC Q8 · options transcribed from the paper',
      q: 'The "Receivables Turnover" for 2016 is',
      data: [S17_MC],
      opts: [
        { t: '9.0909', ok: true, y: 'Correct. 5,000 / [½ × (500 + 600)] = 5,000 / 550.' },
        { t: '5.2727', ok: false, y: 'This uses cost of sales as the numerator. Receivables arise from <b>selling</b>, so the numerator is sales.' },
        { t: '9.6727', ok: false, y: 'Close, which is the point. It comes from a slightly different balance, not the clean average of 550.' }
      ],
      why: 'Note how tight the third distractor is. There is no way to eliminate it by eyeballing, so you have to actually compute the average receivables of 550. <b>Numeric MC items on this paper reward doing the arithmetic properly, not estimating.</b>'
    },

    {
      id: 'mcb-s17-9', kind: 'mc', chapter: 'mcbank', pts: 2,
      title: 'SS17 MC 9: the quick ratio',
      source: 'SS17 MC Q9 · options transcribed from the paper',
      q: 'The "Quick Ratio" for December 31, 2016 is',
      data: [S17_MC],
      opts: [
        { t: '0.4528', ok: true, y: 'Correct. (cash 120 + marketable securities 0 + receivables 600) / 1,590 = 720 / 1,590.' },
        { t: '0.0755', ok: false, y: 'This is the <b>cash</b> ratio, 120 / 1,590. Receivables are missing.' },
        { t: '1.4591', ok: false, y: 'This is the <b>current</b> ratio, 2,320 / 1,590. It wrongly includes inventories and other current assets.' }
      ],
      why: 'The three liquidity ratios are a ladder of strictness on the same denominator: <b>cash ratio</b> takes cash and securities, <b>quick ratio</b> adds receivables, <b>current ratio</b> adds everything current. All three use year-end figures, because a liquidity ratio is a snapshot. The examiner simply offers you all three and sees which one you reach for.'
    },

    {
      id: 'mcb-s17-10', kind: 'mc', chapter: 'mcbank', pts: 2,
      title: 'SS17 MC 10: the profit margin',
      source: 'SS17 MC Q10 · options transcribed from the paper',
      q: 'The "Profit Margin" for 2016 is',
      data: [S17_MC],
      opts: [
        { t: '9.60 %', ok: false, y: 'This is the <b>operating</b> margin, 480 / 5,000.' },
        { t: '8.00 %', ok: false, y: 'This is income before taxes over sales, 400 / 5,000.' },
        { t: '5.60 %', ok: true, y: 'Correct. Profit margin is net income over sales, 280 / 5,000.' }
      ],
      why: 'All three options are the same shape, <i>something</i> ÷ sales, and only the profit line differs. So the item is purely about which line "profit margin" names, and the answer is the bottom one: <b>net income</b>. Gross margin takes gross profit, operating margin takes operating income, profit margin takes net income.'
    },

    /* ================================================== SS19, conceptual */
    {
      id: 'mcb-s19-1', kind: 'mc', chapter: 'mcbank', pts: 2,
      title: 'SS19 MC 1: the EVA identities again',
      source: 'SS19 MC Q1 · answer per the official solution; option wording reconstructed',
      q: 'Which of the following statements is <em>wrong</em>?',
      opts: [
        { t: 'The present value of future EVAs minus the value of the invested capital is equal to the present value of future free cash flows.', ok: true, y: 'Wrong, so this is the answer. The sign is flipped: invested capital is <b>added</b>, not subtracted.' },
        { t: 'The market value of a firm is equal to the present value of future EVAs plus the value of the invested capital.', ok: false, y: 'True. This is the identity stated correctly.' },
        { t: 'The EVA cannot be negative if the RONA exceeds the WACC and if the invested capital is positive.', ok: false, y: 'True, for the same reason as on SS17.' }
      ],
      why: 'Same identity as SS17 MC 1, mutilated a different way. SS17 <b>deleted</b> invested capital; SS19 <b>flipped its sign</b>. Both are caught by the same single line held firmly in mind: <b>PV(future EVAs) + Invested Capital = PV(future FCFs) = market value.</b>'
    },

    /* ================================================== SS19, numeric statistics */
    {
      id: 'mcb-s19-7', kind: 'mc', chapter: 'mcbank', pts: 2,
      title: 'SS19 MC 7: mean return of firm A',
      source: 'SS19 MC Q7 · value from the official solution; option list reconstructed',
      q: 'The mean return of firm A over 2016 to 2018 is',
      note: 'You are given prices, not returns. Convert first.',
      data: [S19_MC],
      opts: [
        { t: '−0.2', ok: true, y: 'Correct. Returns are +0.1, −0.2 and −0.5, and their mean is −0.6 / 3.' },
        { t: '−0.6', ok: false, y: 'That is the sum of the three returns. Divide by 3.' },
        { t: '−0.56', ok: false, y: 'That is the total return across the whole period, 88 / 200 − 1. The question asks for the mean of the annual returns.' }
      ],
      why: '<b>Prices are not returns.</b> The paper hands you a price series precisely to see whether you convert: each return is next price ÷ previous price − 1, which gives 220/200 − 1 = +0.1, then −0.2, then −0.5. Everything downstream, the variance, the covariance and beta, is built on these three numbers, so an error here poisons four MC items at once.'
    },

    {
      id: 'mcb-s19-8', kind: 'mc', chapter: 'mcbank', pts: 2,
      title: 'SS19 MC 8: variance of the market return',
      source: 'SS19 MC Q8 · value from the official solution; 0.0267 is the printed distractor',
      q: 'The variance of the market return is',
      data: [S19_MC],
      opts: [
        { t: '0.04', ok: true, y: 'Correct, and this is the official answer. Squared deviations sum to 0.08, divided by n − 1 = 2.' },
        { t: '0.0267', ok: false, y: 'This is 0.08 / 3, the <b>population</b> divisor. The official key uses the sample divisor, n − 1.' },
        { t: '0.2', ok: false, y: 'That is the standard deviation, not the variance.' }
      ],
      why: 'The mean market return is 0.3, so the deviations are 0, +0.2 and −0.2 and the squares sum to 0.08. The only judgement call is the divisor, and <b>the official key uses n − 1</b>, offering the n-divisor answer as the distractor. Be consistent: use n − 1 for the covariance too. Since beta is a ratio of the two, the divisor cancels there, but these intermediate items do not forgive it.'
    },

    {
      id: 'mcb-s19-9', kind: 'mc', chapter: 'mcbank', pts: 2,
      title: 'SS19 MC 9: covariance with the market',
      source: 'SS19 MC Q9 · value from the official solution; option list reconstructed',
      q: 'The covariance between the market return and the return of firm A is',
      data: [S19_MC],
      opts: [
        { t: '0.03', ok: true, y: 'Correct. Only 2018 contributes: (−0.5 + 0.2) × (0.1 − 0.3) = 0.06, divided by n − 1 = 2.' },
        { t: '0.02', ok: false, y: 'That is 0.06 / 3, the population divisor. Stay consistent with the variance and use n − 1.' },
        { t: '0.06', ok: false, y: 'That is the sum of the cross-products. You still have to divide by n − 1.' }
      ],
      why: 'Pair each year\'s deviation from its <i>own</i> mean and multiply. In 2016 the market sits exactly on its mean, so it contributes nothing; in 2017 firm A sits exactly on its mean, so that contributes nothing either. <b>The entire covariance comes from 2018.</b> Spotting that turns a fiddly calculation into one multiplication.'
    },

    {
      id: 'mcb-s19-10', kind: 'mc', chapter: 'mcbank', pts: 2,
      title: 'SS19 MC 10: beta of firm A',
      source: 'SS19 MC Q10 · value from the official solution; option list reconstructed',
      q: 'The Beta of firm A is',
      note: 'One of the numbers you have been given is a deliberate distractor.',
      data: [S19_MC],
      opts: [
        { t: '0.75', ok: true, y: 'Correct. β = cov / Var(R_M) = 0.03 / 0.04.' },
        { t: '0.5', ok: false, y: 'This divides by 0.06, the variance of <b>firm A\'s own</b> return. That number is on the paper purely to tempt you.' },
        { t: '1.3333', ok: false, y: 'Inverted. Covariance goes on top, the market variance underneath.' }
      ],
      why: 'Beta divides by the variance of the <b>market</b>, always, because that is what calibrates the market itself to exactly 1. Read the result too: β = 0.75 means firm A is <i>less</i> exposed to market risk than the market, even though its share price collapsed from 200 to 88. Most of that collapse was company-specific, and <b>company-specific risk is exactly what beta does not measure and the market does not pay for.</b>'
    }

  ]);

  /* ------------------------------------------------------------------------
     The exam MC bank, in paper order. Every multiple-choice question from
     every paper in the corpus, mapped onto the drills that carry it. Where two
     papers ask the same question, one drill serves both.

       Test exam SS23/24/25/26 : 1.1 - 1.5   (5 items)
       SS17 real exam          : Q1 - Q10    (10 items)
       SS19 real exam          : Q1 - Q10    (10 items)

     SS18 and WT16 are in the corpus but their MC sections were not available,
     so nothing here claims to reproduce them.
     ------------------------------------------------------------------------ */
  V.data.examMc = [
    /* test exam 1.1 - 1.5 */
    'cong-mc-info', 'cap-mc-equity', 'opt-mc-revers', 'cap-mc-betaproblems', 'cap-mc-betaassume',
    /* SS17 Q1 - Q10 */
    'eva-mc-negative', 'mcb-s17-2', 'dep-mc-roiirr', 'id-mc-fcf', 'rat-mc-cash',
    'mcb-s17-6', 'mcb-s17-7', 'mcb-s17-8', 'mcb-s17-9', 'mcb-s17-10',
    /* SS19: Q1, Q3, Q5, Q6 and the statistics chain Q7 - Q10.
       SS19 Q2 is the same question as SS17 Q4, and SS19 Q4 the same as test
       exam 1.1, so those two are already covered above. */
    'mcb-s19-1', 'id-mc-capstruct', 'opt-mc-wait', 'comp-mc-total',
    'mcb-s19-7', 'mcb-s19-8', 'mcb-s19-9', 'mcb-s19-10'
  ];

})(window.VBM);
