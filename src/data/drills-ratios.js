/* ==========================================================================
   drills-ratios.js · Chapter 7: Ratio analysis, operating and cash cycle.
   18 points on SS19; four MC items on SS17.
   ========================================================================== */
'use strict';

(function (V) {

  V.reg([

    /* ------------------------------------------------ the one non-obvious formula */
    {
      id: 'rat-f-payables', kind: 'formula', chapter: 'ratios', pts: 3,
      title: 'Write the payables turnover ratio',
      q: 'Assemble the accounts-payable turnover ratio. Get the numerator right. SS19 awards 3 points for this one ratio because of it.',
      tokens: ['Payables turnover', '=', 'Purchases', '/', 'average accounts payable', 'where', 'Purchases', '=', 'COGS', '+', 'Δ inventory'],
      decoys: ['Sales', '−', 'average inventory', 'COGS', '/'],
      accept: [['Payables turnover', '=', 'Purchases', '/', 'average accounts payable', 'where', 'Purchases', '=', 'COGS', '+', 'Δ inventory']],
      hints: [
        'The denominator is the average payables balance. The numerator is <b>not</b> COGS.',
        'Payables arise from what you <i>bought</i>, not from what you <i>sold</i>. Those differ by the change in inventory.',
        'Purchases = COGS + Δinventory, and the ratio is Purchases / average accounts payable.'
      ],
      why: '<b>The reasoning behind the bridge.</b> COGS is what left the warehouse; purchases are what entered it. If inventory grew by 200, you must have bought 200 more than you sold, so Purchases = COGS + Δinventory. Since accounts payable are created by <i>buying</i>, purchases is the matching numerator.<br><br>On SS19: COGS 2,400, inventory 800 → 1,000, so purchases = 2,400 + 200 = <b>2,600</b>. Using 2,400 gives 10.0 instead of the official 10.8333, and then a wrong days-payables figure and a wrong cash cycle. <b>One skipped step contaminates three answers</b>, which is exactly why the examiner prices it at 3 points.'
    },

    {
      id: 'rat-f-cycle', kind: 'formula', chapter: 'ratios', pts: 3,
      title: 'Write the operating and cash cycles',
      q: 'Assemble both cycle definitions as one chain.',
      tokens: ['Operating cycle', '=', 'days inventory in stock', '+', 'days receivables outstanding', 'and', 'Cash cycle', '=', 'operating cycle', '−', 'days payables outstanding'],
      decoys: ['+', '−', 'days payables outstanding', 'days inventory in stock', '×'],
      accept: [['Operating cycle', '=', 'days inventory in stock', '+', 'days receivables outstanding', 'and', 'Cash cycle', '=', 'operating cycle', '−', 'days payables outstanding']],
      hints: [
        'Trace one euro of goods through the business: how long is it stock, and then how long is it an unpaid invoice?',
        'That sum is the operating cycle. Now ask how long <i>you</i> delayed paying your own supplier.',
        'Operating cycle = days inventory + days receivables; cash cycle = operating cycle − days payables.'
      ],
      why: '<b>Read them as a physical story.</b> Goods sit in the warehouse (days inventory), then sit as an unpaid customer invoice (days receivables), together, the <b>operating cycle</b>: how long from buying the goods to collecting the cash. But you did not pay your supplier immediately either, and that delay is free financing, so subtracting days payables gives the <b>cash cycle</b>: how many days of working capital you actually have to fund yourself.<br><br>The link back to EVA is direct and is exactly what SS19 Q2.2 asks about: a shorter cash cycle means less working capital, which means a smaller invested capital, a smaller capital charge, and a <b>higher</b> EVA.'
    },

    {
      id: 'rat-c-avg', kind: 'classify', chapter: 'ratios', pts: 4,
      title: 'Average balance, or year-end balance?',
      q: 'For each ratio: does the denominator use the <em>average</em> of the two years, or the <em>year-end</em> figure?',
      note: 'Getting this wrong changes every number without changing your method, the most invisible way to lose marks here.',
      buckets: ['Average of both years', 'Year-end figure only'],
      items: [
        { t: 'Inventory turnover', b: 0, why: '<b>Average.</b> COGS is a flow over the whole year, so it must be matched to an average stock.' },
        { t: 'Receivables turnover', b: 0, why: '<b>Average.</b> Same logic: sales are a flow.' },
        { t: 'Payables turnover', b: 0, why: '<b>Average.</b> Purchases are a flow.' },
        { t: 'Return on equity (after tax)', b: 0, why: '<b>Average.</b> Net income is a flow: SS19 uses 500 / 0.5(2,070 + 2,570) = 0.2155.' },
        { t: 'Current ratio', b: 1, why: '<b>Year-end.</b> A liquidity ratio is a snapshot, "can I pay my bills <i>now</i>?" SS19 uses 2,420 / 1,350 = 1.7926, both 2018 figures.' },
        { t: 'Quick ratio', b: 1, why: '<b>Year-end.</b> Also a snapshot of liquidity.' },
        { t: 'Cash ratio', b: 1, why: '<b>Year-end.</b> Same family.' },
        { t: 'ROA (EBIT / total assets)', b: 0, why: '<b>Average.</b> EBIT is a flow, so the asset base is averaged.' }
      ],
      why: '<b>One rule covers every case: match a flow to an average, match a stock to a point in time.</b> Turnover ratios and returns put an income-statement flow (sales, COGS, purchases, net income, EBIT) over a balance-sheet item, so the balance must be averaged across the period the flow was earned. Liquidity ratios put one balance-sheet item over another. Both are snapshots at the same date, so no averaging.<br><br>This is the same principle that makes EVA use <i>average</i> invested capital: NOPAT is a flow.'
    },

    /* ------------------------------------------------ SS19 ratios */
    {
      id: 'rat-t-ss19', kind: 'table', chapter: 'ratios', pts: 9,
      title: 'The four ratios (SS19 Q2.1)',
      source: 'SS19 Q2.1 · official solution',
      q: 'Using the SS19 financial statements, calculate for 2018: the inventory turnover ratio, the accounts payable turnover ratio, the current ratio, and the after-tax return on equity. (9 points)',
      data: [V.sheets.S19_IS, V.sheets.S19_BS],
      cols: ['2018'],
      rows: [
        {
          label: 'Inventory turnover', cells: [{
            a: 2.6667, tol: 0.02, f: '2,400 / [0.5 × (800 + 1,000)] = 2,400 / 900 = 2.6667   [2 points]',
            h: ['Cost of goods sold over <b>average</b> inventory.', 'Average inventory = 0.5 × (800 + 1,000) = 900.'],
            diag: [{ v: 2.4, m: 'You used the year-end inventory of 1,000. Turnover ratios use the average.' },
            { v: 4.5, m: 'You used sales instead of cost of sales. Inventory turnover uses COGS.' }]
          }]
        },
        {
          label: 'Accounts payable turnover', cells: [{
            a: 10.8333, tol: 0.06, f: 'Purchases = 2,400 + (1,000 − 800) = 2,600\n2,600 / [0.5 × (230 + 250)] = 2,600 / 240 = 10.8333   [3 points]',
            h: ['The numerator is purchases, not COGS.', 'Purchases = COGS + Δinventory = 2,400 + 200 = 2,600.', 'Average payables = 0.5 × (230 + 250) = 240.'],
            diag: [{ v: 10, m: 'You used COGS (2,400) as the numerator. Purchases = COGS + Δinventory = 2,600. This is the step the 3 points are for.' },
            { v: 10.4, m: 'You used the year-end payables of 250 rather than the average of 240.' }]
          }]
        },
        {
          label: 'Current ratio', cells: [{
            a: 1.7926, tol: 0.01, f: '2,420 / 1,350 = 1.7926   [2 points]',
            h: ['Current assets over current liabilities, both at year-end 2018.'],
            diag: [{ v: 1.4634, m: 'You used the 2017 figures. The question asks for 2018.' },
            { v: 1.9679, m: 'Check the denominator: total current liabilities in 2018 are 1,350, which includes the short-term debt.' }]
          }]
        },
        {
          label: 'After-tax return on equity', cells: [{
            a: 0.2155, tol: 0.002, f: '500 / [0.5 × (2,070 + 2,570)] = 500 / 2,320 = 0.2155   [2 points]',
            h: ['Net income over <b>average</b> shareholders\' equity.', 'Average equity = 0.5 × (2,070 + 2,570) = 2,320.'],
            diag: [{ v: 0.1946, m: 'You used the year-end equity of 2,570. ROE uses the average.' },
            { v: 0.2179, m: 'You may have used NOPAT or operating income. ROE is <b>after tax</b>: use net income of 500.' }]
          }]
        }
      ],
      why: '<b>Four ratios, four different denominators, and the marks are not equal:</b> 2 + 3 + 2 + 2. The payables ratio is worth an extra point solely because of the purchases bridge, which tells you where the examiner expects failure.<br><br>Two habits that protect you across the whole topic: (1) write the ratio\'s <b>name and formula</b> before substituting, since the marks are for the method; (2) before dividing, ask <b>"is my numerator a flow?"</b>: if yes, average the denominator.'
    },

    {
      id: 'rat-t-cycle', kind: 'table', chapter: 'ratios', pts: 6,
      title: 'Draw the cycle ladder (SS19 Q2.3)',
      source: 'SS19 Q2.3 · official solution',
      q: 'Calculate the length of the operating cycle and the length of the cash cycle. (6 points)',
      note: 'You need one more turnover ratio than Q2.1 gave you, the receivables turnover.',
      data: [{
        t: 'Turnover ratios already computed',
        rows: [['Inventory turnover', '2.6667'], ['Accounts payable turnover', '10.8333'], ['Receivables turnover', '4,500 / [0.5 × (300 + 400)] = 12.8571']]
      }],
      cols: ['Days'],
      skeleton: {
        prompt: 'Lay out the ladder.',
        bank: ['Average no. of days inventory in stock', '+ Average no. of days receivables outstanding',
          '= Length of the operating cycle', '− Days payables outstanding', '= Length of the cash cycle',
          '+ Days payables outstanding', '− Average no. of days receivables outstanding'],
        order: ['Average no. of days inventory in stock', '+ Average no. of days receivables outstanding',
          '= Length of the operating cycle', '− Days payables outstanding', '= Length of the cash cycle'],
        why: {
          '+ Days payables outstanding': 'Wrong sign. Payment days you take from suppliers <b>shorten</b> the cash cycle, because that period is financed by them and not by you.',
          '− Average no. of days receivables outstanding': 'Receivables days are <b>added</b>: they lengthen the time before cash comes back.'
        }
      },
      rows: [
        { label: 'Average no. of days inventory in stock', cells: [{ a: 136.8733, tol: 0.6, f: '365 / 2.6667 = 136.8733   [1 point]', h: ['365 divided by the inventory turnover.'] }] },
        { label: '+ Average no. of days receivables outstanding', cells: [{ a: 28.389, tol: 0.4, f: '365 / 12.8571 = 28.3890   [2 points, including the turnover ratio]', h: ['First the receivables turnover: 4,500 / 350 = 12.8571.', 'Then 365 / 12.8571.'] }] },
        { label: '= Length of the operating cycle', total: true, cells: [{ a: 165.2623, tol: 0.8, f: '136.8733 + 28.3890 = 165.2623   [1 point]', h: [], diag: [{ v: 165.2639, m: 'That is the unrounded result, the key explicitly accepts it. Marked correct.', ok: true }] }] },
        { label: '− Days payables outstanding', cells: [{ a: -33.6924, tol: 0.5, f: '−365 / 10.8333 = −33.6924   [1 point]', h: ['365 divided by the payables turnover, entered as a negative.'], diag: [{ v: -36.5, m: 'You used a payables turnover of 10. That comes from using COGS instead of purchases.' }] }] },
        {
          label: '= Length of the cash cycle', total: true, cells: [{
            a: 131.5699, tol: 0.9, f: '165.2623 − 33.6924 = 131.5699   [1 point]', h: [],
            diag: [{ v: 131.5716, m: 'The unrounded result, which the key accepts. Marked correct.', ok: true },
            { v: 198.9547, m: 'You added the payables days. They are <b>subtracted</b>: supplier credit shortens the cash cycle.' }]
          }]
        }
      ],
      why: 'The official key carries a note that is worth reading twice: <i>"This solution is based on using rounded intermediate results; using non-rounded values (which is permitted) leads to slightly different results: operating cycle 165.2639 and cash cycle 131.5716."</i> So <b>rounding is explicitly not penalised</b>: do not waste exam minutes chasing decimals.<br><br>What the numbers say: this firm needs to fund roughly <b>132 days</b> of working capital itself. Cutting that: faster inventory turns, quicker collection, or slower payment, releases capital, shrinks invested capital, and raises EVA. It is the cleanest link in the course between an operational lever and the value measure.'
    },

    {
      id: 'rat-v-apturn', kind: 'verbal', chapter: 'ratios', pts: 3,
      title: 'From a ratio to EVA (SS19 Q2.2)',
      source: 'SS19 Q2.2 · official solution',
      q: 'Explain how and why the EVA calculated in Q1.1 will change if purchases remain unchanged but the accounts payable turnover ratio <em>increases</em>. Assume changes in accounts payable are financed with short-term debt. (3 points)',
      note: 'The key is a three-link chain, one point per link. Write it as arrows if you like.',
      must: [
        { k: ['payable', 'ap'], label: 'accounts payable decrease' },
        { k: ['decrease', 'fall', 'lower', 'down', 'reduc'], label: '…decrease' },
        { k: ['invested capital', 'capital increase', 'nibl'], label: 'invested capital increases' },
        { k: ['eva'], label: 'EVA decreases' }
      ],
      model: 'Accounts payable turnover increases ⇒ with purchases unchanged, <b>accounts payable decrease</b> (1) ⇒ NIBL is smaller, so <b>invested capital increases</b> (1) ⇒ the capital charge rises while NOPAT is unchanged, so <b>EVA decreases</b> (1).',
      why: '<b>Why the chain runs that way.</b> Turnover = purchases / average payables. Hold the numerator fixed and raise the ratio, and the denominator must fall, the firm is paying suppliers faster. Payables are NIBL, and Invested Capital = Total Assets − NIBL, so a smaller NIBL means a <b>larger</b> capital base. NOPAT is untouched (paying earlier is a financing decision, not an operating cost), so the bigger capital charge drives EVA down.<br><br>The clause "financed with short-term debt" closes the loop: the cash to pay suppliers early comes from interest-bearing debt, which <i>stays inside</i> invested capital. So free supplier financing is swapped for financing you pay for, and this is the same insight as the cash cycle, seen through the balance sheet instead of the calendar.'
    },

    /* ------------------------------------------------ SS17 MC ratios */
    {
      id: 'rat-t-ss17', kind: 'table', chapter: 'ratios', pts: 8,
      title: 'Four ratio MC items (SS17 Q7-Q10)',
      source: 'SS17 MC Q7-Q10 · each result matches exactly one of the printed answer options',
      q: 'Using the SS17 statements, compute the four ratios the multiple-choice section asks for (2016). Use 1 year = 365 days.',
      data: [{
        t: 'SS17 statements, the lines you need',
        cols: ['2015', '2016'],
        rows: [['Sales', ', ', '5,000'], ['Cost of Sales', ', ', '2,900'], ['Net income', ', ', '280'],
          ['Cash and cash equivalents', '100', '120'], ['Accounts receivable - net', '500', '600'],
          ['Inventories', '700', '800'], ['Other current assets', '800', '800'],
          ['<b>Total current liabilities</b>', '<b>1,450</b>', '<b>1,590</b>']],
        fn: 'There are <b>no marketable securities</b> on this balance sheet, relevant for the quick ratio.'
      }],
      cols: ['2016'],
      rows: [
        {
          label: 'Average no. of days inventory in stock', cells: [{
            a: 94.3966, tol: 0.5, f: 'inventory turnover = 2,900 / [0.5 × (700 + 800)] = 2,900 / 750 = 3.8667\n365 / 3.8667 = 94.3966 days',
            h: ['Compute the inventory turnover first, then 365 divided by it.', 'Average inventory = 750, so turnover = 3.8667.'],
            diag: [{ v: 54.75, m: 'That is 365 / 6.6667, i.e. sales over average inventory. Inventory turnover uses <b>COGS</b>.' },
            { v: 51.4568, m: 'That is a printed distractor. It comes from using the year-end inventory and sales. Use COGS over average inventory.' }]
          }]
        },
        {
          label: 'Receivables turnover', cells: [{
            a: 9.0909, tol: 0.05, f: '5,000 / [0.5 × (500 + 600)] = 5,000 / 550 = 9.0909',
            h: ['Sales over average trade receivables.'],
            diag: [{ v: 5.2727, m: 'A printed distractor. That uses cost of sales rather than sales. Receivables arise from <b>selling</b>, so the numerator is sales.' },
            { v: 8.3333, m: 'You used the year-end receivables of 600. Turnover ratios use the average, 550.' }]
          }]
        },
        {
          label: 'Quick ratio at 31 Dec 2016', cells: [{
            a: 0.4528, tol: 0.004, f: '(cash 120 + marketable securities 0 + receivables 600) / 1,590 = 720 / 1,590 = 0.4528',
            h: ['(cash + marketable securities + receivables) / current liabilities. All at year-end.',
              'There are no marketable securities here, so the numerator is 120 + 600 = 720.'],
            diag: [{ v: 1.4591, m: 'That is the <b>current</b> ratio (2,320 / 1,590). The quick ratio excludes inventories and other current assets.' },
            { v: 0.0755, m: 'That is the cash ratio (120 / 1,590), receivables are missing.' }]
          }]
        },
        {
          label: 'Profit margin 2016 (in %)', cells: [{
            a: 5.6, tol: 0.05, f: 'net income / sales = 280 / 5,000 = 5.60 %',
            h: ['Profit margin is net income over sales.'],
            diag: [{ v: 9.6, m: 'That is the <b>operating</b> margin (480 / 5,000). The profit margin uses net income.' },
            { v: 8, m: 'That is EBT / sales (400 / 5,000). Profit margin uses net income after tax.' }]
          }]
        }
      ],
      why: '<b>Every distractor on this paper is a real ratio, just the wrong one.</b> 54.75 days is sales-over-inventory; 5.2727 is COGS-over-receivables; 1.4591 is the current ratio; 9.60 % is the operating margin. The examiner is not testing arithmetic, they are testing whether you can keep twenty near-identical definitions apart.<br><br>Hence the drill that actually pays: for each ratio, memorise <b>which income-statement line goes on top</b>. Inventory → COGS. Receivables → Sales. Payables → Purchases. Margins → the specific profit line named. Get the numerator right and the distractors become visibly wrong.'
    },

    {
      id: 'rat-mc-cash', kind: 'mc', chapter: 'ratios', pts: 2,
      title: 'SS17 MC 5: the cash cycle',
      source: 'SS17 MC Q5 · options transcribed from the paper',
      q: 'Which of the following statements is <em>true</em>? The length of the cash cycle equals…',
      opts: [
        { t: '…the length of the operating cycle plus the number of days receivables are outstanding.', ok: false, y: 'Receivables days are already <i>inside</i> the operating cycle. Adding them again double-counts.' },
        { t: '…the number of days inventories are in stock minus the number of days payables are outstanding.', ok: false, y: 'This drops the receivables days entirely, but a sale on credit still delays the cash.' },
        { t: '…the length of the operating cycle minus the number of days payables are outstanding.', ok: true, y: 'Correct: the definition. Supplier credit shortens the period you must self-finance.' }
      ],
      why: 'Do not memorise four sentences, <b>rebuild the cycle from the story</b> and every option answers itself. Cash goes out when you pay the supplier; cash comes back when the customer pays you. Inventory days and receivables days both delay the inflow, so they <b>add</b>. Payables days delay your outflow, so they <b>subtract</b>. Any option that adds payables days, or forgets receivables days, contradicts the story.'
    }

  ]);

})(window.VBM);
