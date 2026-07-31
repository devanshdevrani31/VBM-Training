/* ==========================================================================
   drills-eva.js · Chapter 1: The EVA Engine.
   Data is transcribed verbatim from the papers; every target number is checked
   against an official answer key unless the drill says "derived".
   ========================================================================== */
'use strict';

(function (V) {

  /* ---------- the SS23/24/25/26 test-exam statements (identical papers) ---------- */
  const T26_IS = {
    t: 'Income statement 2006 (in thousands of EUR)',
    rows: [
      ['Sales', '200,000'], ['Cost of Sales', '120,000'],
      ['Selling, general and administrative', '40,000'], ['Research and development', '30,000'],
      ['<b>Operating income</b>', '<b>10,000</b>'], ['Interest income *', '600'],
      ['Interest expense', '3,000'], ['<b>Income before taxes</b>', '<b>7,600</b>'],
      ['Provision for income taxes', '3,040'], ['<b>Net income</b>', '<b>4,560</b>']
    ],
    fn: '* Interest income stems from cash and marketable securities <b>held for operating activities</b>.'
  };
  const T26_BS = {
    t: 'Balance sheet as of December 31, 2006 (in thousands of EUR)',
    cols: ['2005', '2006'],
    rows: [
      ['<b>Current assets</b>', '', ''],
      ['Cash and cash equivalents', '20,000', '15,000'],
      ['Marketable securities', '10,000', '10,000'],
      ['Accounts receivable (trade) - net', '30,000', '40,000'],
      ['Inventories', '60,000', '50,000'],
      ['Other current assets', '10,000', '15,000'],
      ['<b>Property, plant and equipment, net</b>', '<b>120,000</b>', '<b>130,000</b>'],
      ['<b>TOTAL ASSETS</b>', '<b>250,000</b>', '<b>260,000</b>'],
      ['<b>Current liabilities</b>', '', ''],
      ['Short-term debt', '20,000', '20,000'],
      ['Trade accounts payable', '30,000', '40,000'],
      ['Accrued expenses', '15,000', '10,000'],
      ['Other current liabilities †', '15,000', '10,000'],
      ['<b>Total current liabilities</b>', '<b>80,000</b>', '<b>80,000</b>'],
      ['Long-term debt', '30,000', '35,000'],
      ['Other noncurrent liabilities', '10,000', '5,000'],
      ['<b>Shareholders\' equity</b>', '<b>130,000</b>', '<b>140,000</b>']
    ],
    fn: '† The position "other current liabilities" does <b>not</b> include interest-bearing liabilities. Corporate tax rate 40 %, WACC 10 %.'
  };

  /* ---------- the SS19 real-exam statements ---------- */
  const S19_IS = {
    t: 'Income statement 2018 (in thousands of EUR)',
    rows: [
      ['Sales', '4,500'], ['Cost of Sales', '2,400'],
      ['Selling, general and administrative', '900'], ['Research and development', '500'],
      ['<b>Operating income</b>', '<b>700</b>'], ['Interest expense', '75'],
      ['<b>Income before taxes</b>', '<b>625</b>'], ['Provision for income taxes', '125'],
      ['<b>Net income</b>', '<b>500</b>']
    ],
    fn: 'After-tax WACC 10 %, tax rate 20 %. Note: <b>no interest income</b> on this paper.'
  };
  const S19_BS = {
    t: 'Balance sheet as of December 31, 2018 (in thousands of EUR)',
    cols: ['2017', '2018'],
    rows: [
      ['Cash and cash equivalents', '200', '420'],
      ['Accounts receivable - net', '300', '400'],
      ['Inventories', '800', '1,000'],
      ['Other current assets', '500', '600'],
      ['<b>Total current assets</b>', '<b>1,800</b>', '<b>2,420</b>'],
      ['Property, plant and equipment, net', '2,700', '2,700'],
      ['<b>TOTAL ASSETS</b>', '<b>4,500</b>', '<b>5,120</b>'],
      ['Short-term debt', '300', '400'],
      ['Trade accounts payable', '230', '250'],
      ['Accrued expenses', '300', '300'],
      ['Other current liabilities †', '400', '400'],
      ['<b>Total current liabilities</b>', '<b>1,230</b>', '<b>1,350</b>'],
      ['Long-term debt', '900', '900'],
      ['Other long-term liabilities', '300', '300'],
      ['<b>Shareholders\' equity</b>', '<b>2,070</b>', '<b>2,570</b>']
    ],
    fn: '† The position "other current liabilities" does <b>not</b> include interest-bearing liabilities.'
  };

  V.sheets = { T26_IS, T26_BS, S19_IS, S19_BS };

  /* ====================================================================== */
  V.reg([

    /* ------------------------------------------------ 1. the core formula */
    {
      id: 'eva-f-core', kind: 'formula', chapter: 'eva', pts: 4,
      title: 'Write the definition of EVA',
      q: 'Assemble the definition of EVA that starts from NOPAT. Click the tokens in order.',
      note: 'No formula sheet in the exam. This is the single line the whole of Question 1 is built on.',
      tokens: ['EVA', '=', 'NOPAT', '−', 'WACC', '×', 'Invested Capital'],
      decoys: ['+', 'RONA', '÷', 'Net Assets', 'Net income', 'Total Assets'],
      accept: [['EVA', '=', 'NOPAT', '−', 'WACC', '×', 'Invested Capital']],
      hints: [
        'It is a <i>residual</i> measure: a profit figure minus a charge for the capital that produced it.',
        'The profit figure is NOPAT. The charge is the cost of capital multiplied by the capital base.',
        'EVA = NOPAT − WACC × Invested Capital. The second term is also called the <i>capital charge</i>.'
      ],
      why: '<b>Read it as a sentence:</b> "the operating profit the business made, after taxes, minus the rent the business owes on the capital tied up in it." WACC × Invested Capital <i>is</i> that rent: it is what the providers of debt and equity expect to earn. Anything left over is genuinely new value; anything missing is value destroyed. That is why EVA can be comfortably negative for a firm reporting a positive net income: net income never charges for equity, and EVA does.'
    },

    {
      id: 'eva-f-rona', kind: 'formula', chapter: 'eva', pts: 4,
      title: 'Write the spread form of EVA',
      q: 'Assemble the form of EVA that uses RONA. This is the form the multiple-choice questions attack.',
      tokens: ['EVA', '=', '(', 'RONA', '−', 'WACC', ')', '×', 'Invested Capital'],
      decoys: ['NOPAT', '+', '÷', 'Net Assets'],
      accept: [['EVA', '=', '(', 'RONA', '−', 'WACC', ')', '×', 'Invested Capital']],
      hints: [
        'It is a <i>spread</i> times a <i>base</i>: a percentage margin multiplied by the amount of capital.',
        'The spread is the return the assets actually earned minus the return they were supposed to earn.',
        'EVA = (RONA − WACC) × Invested Capital, with RONA = NOPAT / Net Assets.'
      ],
      why: 'Divide the first form by invested capital and you get this one. They are the same statement. Its value is diagnostic: it separates <b>"am I earning more than my cost of capital?"</b> (the spread) from <b>"on how much capital?"</b> (the base). It also settles a recurring MC item instantly: if RONA &gt; WACC the spread is positive, and if invested capital is positive too, then EVA is <b>strictly positive</b>, so "EVA cannot be negative if RONA exceeds WACC and IC is positive" is a <b>true</b> statement, not a wrong one.'
    },

    /* ------------------------------------------------ 2. the NIBL rule */
    {
      id: 'eva-nibl-sort', kind: 'classify', chapter: 'eva', pts: 6,
      title: 'The NIBL rule: sort the balance sheet',
      q: 'For each balance-sheet line: does it get subtracted from total assets as NIBL, or does it stay inside invested capital?',
      note: 'NIBL = non-interest-bearing liabilities. This one rule decides more marks on Question 1 than any other.',
      buckets: ['Subtract: it is NIBL', 'Stays in invested capital'],
      items: [
        { t: 'Trade accounts payable', sub: 'a current liability', b: 0, why: 'Suppliers do not charge you interest. This is free financing, so it is netted off the capital base.' },
        { t: 'Accrued expenses', sub: 'a current liability', b: 0, why: 'Wages and costs incurred but not yet paid. No interest is charged, so it is NIBL.' },
        { t: 'Other current liabilities', sub: 'footnote: "does not include interest-bearing liabilities"', b: 0, why: 'That footnote is planted on every paper for exactly this reason. It tells you the line is non-interest-bearing, so it belongs in NIBL.' },
        { t: 'Short-term debt', sub: 'a current liability', b: 1, why: 'THE trap. Short-term debt is <b>interest-bearing</b>. It is a genuine source of financing that expects a return, so it stays <b>inside</b> invested capital. Never subtract it.' },
        { t: 'Long-term debt', sub: 'a non-current liability', b: 1, why: 'Interest-bearing and non-current. NIBL only ever contains <i>current</i> non-interest-bearing items.' },
        { t: 'Other noncurrent liabilities', sub: 'a non-current liability', b: 1, why: 'Not current, so it is outside the NIBL definition regardless. It stays in.' },
        { t: 'Retained earnings', sub: 'shareholders\' equity', b: 1, why: 'Equity is the most expensive capital there is. It stays in: the whole point of EVA is to charge for it.' },
        { t: 'Inventories', sub: 'a current asset', b: 1, why: 'An asset, not a liability. It is part of total assets and therefore part of invested capital.' }
      ],
      why: '<b>Invested Capital = Total Assets − NIBL.</b> The logic: you charge WACC on every euro of capital that <i>demands a return</i>. Suppliers and accrued wages demand none, so netting them off is right. Every lender does demand one, so short-term debt, long-term debt and equity all stay in the base. If you subtract total current liabilities instead of NIBL, you quietly remove short-term debt from the capital base and your EVA comes out too high.'
    },

    /* ------------------------------------------------ 3. the NOPAT ladder */
    {
      id: 'eva-t-nopat26', kind: 'table', chapter: 'eva', pts: 3,
      title: 'Draw the NOPAT ladder (test exam 2023/24/25/26)',
      source: 'SS23/SS24/SS25/SS26 test exam Q1.1 · official solution',
      q: 'Draw the NOPAT block, then fill it in. Tax rate 40 %, WACC 10 %.',
      note: 'First lay out the rows, the structure itself earns marks in the official key. Then compute.',
      data: [T26_IS],
      cols: ['2006'],
      skeleton: {
        prompt: 'Pick the rows in the order you would write them on the exam paper.',
        bank: ['Operating income', '+ Interest income', '− Provision for income taxes',
          '− Tax shield = t × interest expense', '= NOPAT',
          '− Interest expense', '+ Tax shield', '+ Depreciation & amortisation', '− Net income'],
        order: ['Operating income', '+ Interest income', '− Provision for income taxes',
          '− Tax shield = t × interest expense', '= NOPAT'],
        why: {
          '− Interest expense': 'Interest expense is <b>never</b> subtracted from NOPAT. NOPAT is a pre-financing figure, subtracting interest would double-count the cost of debt, which the WACC already charges.',
          '+ Tax shield': 'The sign is wrong. The reported tax bill was already <i>reduced</i> by deducting interest, so you must <b>remove</b> that benefit: subtract it.',
          '+ Depreciation & amortisation': 'That belongs to the free-cash-flow bridge, not to NOPAT. NOPAT starts from operating income, which is already after D&A.',
          '− Net income': 'Net income is an output of the income statement, not a step in the NOPAT ladder.'
        }
      },
      rows: [
        { label: 'Operating income', cells: [{ a: 10000, f: 'read off the income statement', h: ['It is the bold line in the income statement, above interest.'] }] },
        {
          label: '+ Interest income', cells: [{
            a: 600, f: '+600: the footnote says it is operating',
            h: ['Check the footnote. Do you include it or not?', 'The footnote says the interest income stems from cash and securities held <b>for operating activities</b>, so it is operating income and it goes in.']
          }]
        },
        {
          label: '− Provision for income taxes', cells: [{
            a: -3040, f: '−3,040: the actual tax bill', h: ['Enter it as a negative number.', 'The provision for income taxes is 3,040, so the row is −3,040.'],
            diag: [{ v: 3040, m: 'Right magnitude, wrong sign. This row is a subtraction, so enter −3,040.' }]
          }]
        },
        {
          label: '− Tax shield = t × interest expense', cells: [{
            a: -1200, f: '−(40 % × 3,000) = −1,200',
            h: ['The tax shield is the tax rate times the <i>interest expense</i>, not times operating income.',
              't = 40 %, interest expense = 3,000.',
              '−0.40 × 3,000 = −1,200.'],
            diag: [
              { v: -3000, m: 'You subtracted the whole interest expense. Only the <b>tax benefit</b> of the interest is removed: t × 3,000 = 1,200.' },
              { v: 1200, m: 'Right magnitude, wrong sign. The tax shield is <b>subtracted</b>: you are removing a benefit the reported tax figure already contained.' },
              { v: -4000, m: 'That is 40 % of 10,000. The tax shield multiplies the tax rate by <b>interest expense</b> (3,000), not by operating income.' }
            ]
          }]
        },
        {
          label: '= NOPAT', total: true, cells: [{
            a: 6360, f: '10,000 + 600 − 3,040 − 1,200 = 6,360',
            h: ['Add the four rows above.'],
            diag: [
              { v: 7560, m: 'That is 10,000 + 600 − 3,040. You left out the tax shield of 1,200, the single most common lost mark on this paper.' },
              { v: 5760, m: 'That is 10,000 − 3,040 − 1,200. You dropped the interest income of 600, which the footnote tells you to include.' },
              { v: 4560, m: 'That is net income. NOPAT is built from operating income upward, not copied off the bottom of the statement.' },
              { v: 6000, m: 'That is 10,000 × (1 − 40 %). The exam wants the <i>actual</i> tax provision from the statement, not a synthetic tax charge.' }
            ]
          }]
        }
      ],
      why: '<b>Why this exact ladder?</b> EVA charges for <i>all</i> capital through WACC, so NOPAT must be measured <b>as if the firm had no debt</b>. The reported tax provision, however, was computed after deducting interest, the firm paid less tax because it was levered. Subtracting the tax shield (t × interest expense) strips that financing benefit back out, leaving a clean unlevered operating profit. Interest income is added only when it is <i>operating</i>, because invested capital includes the cash and securities that generated it, the return and the capital base must match.'
    },

    /* ------------------------------------------------ 4. the invested-capital block */
    {
      id: 'eva-t-ic26', kind: 'table', chapter: 'eva', pts: 5,
      title: 'Draw the invested-capital block (test exam)',
      source: 'SS23/SS24/SS25/SS26 test exam Q1.1 · official solution',
      q: 'Build invested capital for both years and the average. Watch the NIBL line.',
      data: [T26_BS],
      cols: ['2005', '2006'],
      skeleton: {
        prompt: 'Lay out the invested-capital block.',
        bank: ['Total assets', '− NIBL', '= Invested Capital', 'Ø Invested Capital',
          '− Total current liabilities', '− Total liabilities', '+ NIBL'],
        order: ['Total assets', '− NIBL', '= Invested Capital', 'Ø Invested Capital'],
        why: {
          '− Total current liabilities': 'This is the trap. Total current liabilities <b>includes short-term debt</b>, which is interest-bearing and must stay in the capital base. Subtract NIBL, not total current liabilities.',
          '− Total liabilities': 'That would leave you with equity only. EVA charges for debt capital too.',
          '+ NIBL': 'Wrong direction. NIBL is netted <b>off</b> total assets.'
        }
      },
      rows: [
        { label: 'Total assets', cells: [{ v: '250,000' }, { v: '260,000' }] },
        {
          label: '− NIBL', cells: [
            {
              a: -60000, f: '−(30,000 AP + 15,000 accrued + 15,000 other CL) = −60,000',
              h: ['NIBL = trade accounts payable + accrued expenses + other current liabilities.',
                'Short-term debt of 20,000 is interest-bearing, leave it <b>out</b> of NIBL.',
                '30,000 + 15,000 + 15,000 = 60,000, entered as −60,000.'],
              diag: [{ v: -80000, m: 'That is total current liabilities. You included the 20,000 of short-term debt. It is interest-bearing and stays inside invested capital.' },
              { v: 60000, m: 'Right magnitude, wrong sign: NIBL is subtracted.' }]
            },
            {
              a: -60000, f: '−(40,000 AP + 10,000 accrued + 10,000 other CL) = −60,000',
              h: ['Same three lines, 2006 column.', '40,000 + 10,000 + 10,000 = 60,000. (It happens to equal 2005, the mix changed, the total did not.)'],
              diag: [{ v: -80000, m: 'Total current liabilities again. Exclude the short-term debt of 20,000.' }]
            }]
        },
        {
          label: '= Invested Capital', total: true, cells: [
            { a: 190000, f: '250,000 − 60,000 = 190,000', h: ['Total assets minus NIBL.'], diag: [{ v: 170000, m: 'You subtracted the 80,000 of total current liabilities instead of the 60,000 of NIBL.' }] },
            { a: 200000, f: '260,000 − 60,000 = 200,000', h: ['Total assets minus NIBL.'], diag: [{ v: 180000, m: 'You subtracted total current liabilities (80,000) rather than NIBL (60,000).' }] }]
        },
        {
          label: 'Ø Invested Capital', total: true, cells: [null, {
            a: 195000, f: '½ × (190,000 + 200,000) = 195,000',
            h: ['Average the two years.', '½ × (190,000 + 200,000).'],
            diag: [{ v: 200000, m: 'That is the year-end figure. Unless the question says otherwise, use the <b>average</b> invested capital.' },
            { v: 190000, m: 'That is the opening figure. The default on this paper is the average of the two.' }]
          }]
        }
      ],
      why: '<b>Why average, and why does it matter?</b> NOPAT is a <i>flow</i> earned across the whole year; invested capital is a <i>stock</i> measured at a point in time. Charging a full year of WACC on the closing balance would penalise capital that was only in place at the very end. The average is the standard reconciliation, and the official keys award a separate mark for computing it. The exception to watch: SS19 Q4 explicitly says to use the capital <b>at the beginning</b> of the period: when the paper overrides the default, it says so in words.'
    },

    /* ------------------------------------------------ 5. finish the test-exam EVA */
    {
      id: 'eva-n-eva26', kind: 'numeric', chapter: 'eva', pts: 2,
      title: 'Close it out: the test-exam EVA',
      source: 'SS23/SS24/SS25/SS26 test exam Q1.1 · official solution',
      q: 'NOPAT is 6,360 and average invested capital is 195,000. The WACC is 10 %. What is the EVA in 2006?',
      unit: 'thousand EUR',
      a: -13140,
      f: 'EVA = NOPAT − WACC × Ø IC = 6,360 − 0.10 × 195,000 = 6,360 − 19,500 = −13,140',
      hints: [
        'Write the formula first: EVA = NOPAT − WACC × Ø Invested Capital.',
        'The capital charge is 0.10 × 195,000 = 19,500.',
        '6,360 − 19,500. Do not be alarmed by the sign.'
      ],
      diag: [
        { v: 13140, m: 'Sign. 6,360 − 19,500 is <b>negative</b>. A negative EVA is the official answer here, the firm earned 6,360 on a capital base that demanded 19,500.' },
        { v: -13640, m: 'You used the year-end invested capital of 200,000. The default is the average, 195,000.' },
        { v: -12640, m: 'You used the opening invested capital of 190,000. The default is the average, 195,000.' },
        { v: 6360, m: 'That is NOPAT: you have not charged for the capital yet. Subtract WACC × Ø IC.' }
      ],
      why: 'Sit with what −13,140 <i>means</i>. The firm reported a positive net income of 4,560 and still destroyed value, because net income charges for debt but never charges for the 140,000 of equity. RONA here is 6,360 / 195,000 ≈ 3.3 %, well under the 10 % WACC, so the spread is negative and EVA follows. <b>Do not "fix" a negative answer</b>: three of the four traps above are students who assumed they had erred and adjusted something.'
    },

    /* ------------------------------------------------ 6. SS19, the real exam */
    {
      id: 'eva-t-ss19', kind: 'table', chapter: 'eva', pts: 10,
      title: 'The full EVA question (SS19 real exam)',
      source: 'SS19 Q1.1 · official solution (point allocation in brackets is the examiner\'s)',
      q: 'Calculate the company\'s EVA in 2018 without any adjustments, based on the average invested capital. (10 points)',
      note: 'Different numbers, same machine. Note there is <b>no interest income</b> on this paper, and the tax rate is 20 %.',
      data: [S19_IS, S19_BS],
      cols: ['2017', '2018'],
      rows: [
        { label: 'Operating income', cells: [null, { a: 700, f: 'given', h: ['Straight off the income statement.'] }] },
        { label: '− Provision for income taxes', cells: [null, { a: -125, f: '−125', h: ['Enter as a negative.'] }] },
        {
          label: '− Tax shield (t × interest expense)', cells: [null, {
            a: -15, f: '−(0.2 × 75) = −15',
            h: ['t = 20 %, interest expense = 75.', '−0.20 × 75 = −15.'],
            diag: [{ v: -75, m: 'That is the whole interest expense. Only its tax benefit, 0.2 × 75 = 15, comes out.' }]
          }]
        },
        {
          label: '= NOPAT', total: true, cells: [null, {
            a: 560, f: '700 − 125 − 15 = 560   [3 points]',
            h: ['Add the three rows.'],
            diag: [{ v: 575, m: 'That is 700 − 125: the tax shield of 15 is missing. The official key awards the NOPAT line 3 points and this is where they are lost.' },
            { v: 500, m: 'That is net income. Build NOPAT from operating income.' }]
          }]
        },
        { label: 'Total assets', section: false, cells: [{ v: '4,500' }, { v: '5,120' }] },
        {
          label: '− NIBL', cells: [
            {
              a: -930, f: '−(230 AP + 300 accrued + 400 other CL) = −930',
              h: ['Three lines only, short-term debt of 300 is not one of them.', '230 + 300 + 400 = 930.'],
              diag: [{ v: -1230, m: 'Total current liabilities. The 300 of short-term debt is interest-bearing and stays in.' }]
            },
            {
              a: -950, f: '−(250 + 300 + 400) = −950',
              h: ['250 + 300 + 400 = 950.'],
              diag: [{ v: -1350, m: 'Total current liabilities again, exclude the 400 of short-term debt.' }]
            }]
        },
        {
          label: '= Invested Capital', total: true, cells: [
            { a: 3570, f: '4,500 − 930 = 3,570   [2 points]', h: [], diag: [{ v: 3270, m: 'You netted off total current liabilities (1,230) instead of NIBL (930).' }] },
            { a: 4170, f: '5,120 − 950 = 4,170   [2 points]', h: [], diag: [{ v: 3770, m: 'You netted off total current liabilities (1,350) instead of NIBL (950).' }] }]
        },
        {
          label: 'Ø Invested Capital', total: true, cells: [null, {
            a: 3870, f: '0.5 × (3,570 + 4,170) = 3,870   [1 point]', h: ['Average the two.']
          }]
        },
        {
          label: 'EVA', total: true, cells: [null, {
            a: 173, f: 'EVA = 560 − 0.10 × 3,870 = 560 − 387 = 173   [2 points]',
            h: ['Capital charge = 0.10 × 3,870 = 387.', '560 − 387.'],
            diag: [
              { v: 143, m: 'You used the year-end capital of 4,170. The question says "based on the average invested capital".' },
              { v: 203, m: 'You used the opening capital of 3,570. The question asks for the average.' },
              { v: 188, m: 'That is 575 − 387, the tax shield went missing upstream in NOPAT.' }
            ]
          }]
        }
      ],
      why: 'This is the same eight lines as the test exam, and it is worth noticing how the marks are distributed: <b>8 of the 10 points sit in the intermediate steps</b>, only 2 in the final EVA. That is the strongest possible argument for writing the full labelled ladder even when you are unsure of a number. Contrast the result with the test exam: here EVA is <b>+173</b>, because NOPAT of 560 on a base of 3,870 is a RONA of 14.5 % against a 10 % WACC. Same machine, positive spread, value created.'
    },

    /* ------------------------------------------------ 7. SS17 */
    {
      id: 'eva-t-ss17', kind: 'table', chapter: 'eva', pts: 10,
      title: 'Third run (SS17 real exam)',
      source: 'SS17 Q1.2 · numbers derived by applying the method the SS19/SS26 official keys fix',
      q: 'Calculate the company\'s EVA in 2016 without adjustments, on average invested capital. Assume the after-tax WACC is 10 % and the tax rate is 30 %.',
      note: 'By now you should not need the hints. Target: under four minutes.',
      data: [
        {
          t: 'Income statement 2016 (in thousands of EUR)',
          rows: [['Sales', '5,000'], ['Cost of Sales', '2,900'], ['Selling, general and administrative', '1,140'],
            ['Research and development', '480'], ['<b>Operating income</b>', '<b>480</b>'], ['Interest expense', '80'],
            ['<b>Income before taxes</b>', '<b>400</b>'], ['Provision for income taxes', '120'], ['<b>Net income</b>', '<b>280</b>']],
          fn: 'Tax rate 30 %. After-tax WACC assumed 10 % from question 1.2 onward.'
        },
        {
          t: 'Balance sheet as of December 31, 2016 (in thousands of EUR)',
          cols: ['2015', '2016'],
          rows: [['<b>TOTAL ASSETS</b>', '<b>4,900</b>', '<b>5,320</b>'],
            ['Short-term debt', '350', '450'], ['Trade accounts payable', '300', '400'],
            ['Accrued expenses', '500', '440'], ['Other current liabilities †', '300', '300'],
            ['<b>Total current liabilities</b>', '<b>1,450</b>', '<b>1,590</b>'],
            ['Long-term debt', '900', '900'], ['Other long-term liabilities', '300', '300'],
            ['<b>Shareholders\' equity</b>', '<b>2,250</b>', '<b>2,530</b>']],
          fn: '† "Other current liabilities" does not include interest-bearing liabilities.'
        }
      ],
      cols: ['2015', '2016'],
      rows: [
        {
          label: '= NOPAT', total: true, cells: [null, {
            a: 336, f: '480 − 120 − 0.30 × 80 = 480 − 120 − 24 = 336',
            h: ['Operating income − provision for taxes − t × interest expense.', '480 − 120 − 24.'],
            diag: [{ v: 360, m: 'The tax shield of 0.3 × 80 = 24 is missing.' }, { v: 280, m: 'That is net income.' }]
          }]
        },
        {
          label: '− NIBL', cells: [
            { a: -1100, f: '−(300 + 500 + 300) = −1,100', h: ['AP + accrued + other CL.'], diag: [{ v: -1450, m: 'Total current liabilities, the 350 of short-term debt stays in.' }] },
            { a: -1140, f: '−(400 + 440 + 300) = −1,140', h: ['AP + accrued + other CL.'], diag: [{ v: -1590, m: 'Total current liabilities, the 450 of short-term debt stays in.' }] }]
        },
        {
          label: '= Invested Capital', total: true, cells: [
            { a: 3800, f: '4,900 − 1,100 = 3,800', h: [] },
            { a: 4180, f: '5,320 − 1,140 = 4,180', h: [] }]
        },
        { label: 'Ø Invested Capital', total: true, cells: [null, { a: 3990, f: '½ × (3,800 + 4,180) = 3,990', h: [] }] },
        {
          label: 'EVA', total: true, cells: [null, {
            a: -63, f: 'EVA = 336 − 0.10 × 3,990 = 336 − 399 = −63',
            h: ['Capital charge = 399.'],
            diag: [{ v: 63, m: 'Sign: 336 − 399 is negative.' }, { v: -82, m: 'You used the year-end base of 4,180 rather than the average.' }]
          }]
        }
      ],
      why: 'Three papers, three different sign outcomes: −13,140, +173, −63. The machine never changes. <b>Only the inputs do</b>. If you can produce these five rows from a blank page in four minutes, Question 1 is banked, and every paper for a decade has opened with it.'
    },

    /* ------------------------------------------------ 8. concept MC */
    {
      id: 'eva-mc-negative', kind: 'mc', chapter: 'eva', pts: 2,
      title: 'SS17 MC 1: the EVA identities',
      source: 'SS17 MC Q1 · options transcribed from the paper',
      q: 'Which of the following statements is <em>wrong</em>?',
      opts: [
        { t: 'The present value of future EVAs plus the value of the invested capital is equal to the present value of future free cash flows.', ok: false, y: 'True. This is the EVA to DCF bridge.' },
        { t: 'The market value of a firm is equal to the present value of future EVAs.', ok: true, y: 'Wrong, so this is the answer. It leaves out the invested capital: market value = invested capital <b>plus</b> the PV of future EVAs.' },
        { t: 'The EVA cannot be negative if the RONA exceeds the WACC and if the invested capital is positive.', ok: false, y: 'True. EVA = (RONA − WACC) × IC, so a positive spread times a positive base is strictly positive.' }
      ],
      why: 'Both identities in this item come from the same equation, so learn it as one line: <b>PV(future EVAs) + Invested Capital = PV(future FCFs) = Market value of the firm.</b> The examiner\'s favourite mutilations are (a) flipping the plus to a minus, and (b) dropping invested capital altogether, "market value equals the PV of future EVAs" on its own is <b>wrong</b>, and it appeared in exactly that form on SS17.'
    },

    {
      id: 'eva-v-taxshield', kind: 'verbal', chapter: 'eva', pts: 3,
      title: 'Explain the tax shield line',
      q: 'In your own words: why is <em>t × interest expense</em> subtracted when building NOPAT? Write two or three sentences.',
      must: [
        { k: ['unlever', 'as if', 'without debt', 'no debt', 'debt-free', 'independent of financing', 'pre-financing', 'capital structure'], label: 'NOPAT must be measured as if unlevered' },
        { k: ['already', 'reduced', 'lower tax', 'less tax', 'deduct', 'deducti'], label: 'the reported tax bill was already reduced by deducting interest' },
        { k: ['wacc', 'cost of capital', 'capital charge', 'double'], label: 'the cost of debt is already charged through the WACC' }
      ],
      model: 'NOPAT has to be an <b>as-if-unlevered</b> operating profit, because the cost of debt is charged separately through the WACC in the capital-charge term. The tax provision reported in the income statement, however, was <b>already reduced</b> by deducting interest expense, so the firm paid less tax purely because it is levered. Subtracting t × interest expense removes that financing benefit again and prevents the cost of debt being counted twice.',
      why: 'This is the one line in the ladder that students can reproduce but not justify, and the justification is what makes the ladder impossible to forget: <b>everything financing-related must be stripped out of NOPAT, because WACC handles all of it.</b> Interest expense itself never appears (it is in WACC), and the tax saving it created must be reversed for the same reason.'
    }

  ]);

})(window.VBM);
