/* ==========================================================================
   drills-adjust.js · Chapter 2: Accounting adjustments.
   Capitalising R&D / advertising (8 of 8 papers) and operating leases.
   ========================================================================== */
'use strict';

(function (V) {

  V.reg([

    /* ------------------------------------------------ the two adjustment lines */
    {
      id: 'adj-f-nopat', kind: 'formula', chapter: 'adjust', pts: 4,
      title: 'Write the NOPAT adjustment',
      q: 'Assemble the R&D / advertising adjustment to NOPAT.',
      note: 'Read "Σ amortisation this year" as one token. It means every charge from every past and current cohort that lands in this year.',
      tokens: ['NOPAT adj.', '=', '+', 'current year\'s expense', '−', 'Σ amortisation this year'],
      decoys: ['×', '(1 − t)', '÷ N', '+ Σ amortisation this year', '− current year\'s expense'],
      accept: [['NOPAT adj.', '=', '+', 'current year\'s expense', '−', 'Σ amortisation this year']],
      hints: [
        'You are undoing the accountant\'s treatment and imposing your own. What did the accountant do that you want to reverse?',
        'The accountant expensed the whole spend this year, so add it back. In its place you charge only this year\'s amortisation, so subtract that.',
        'NOPAT adj. = + current year\'s expense − Σ amortisation this year. No tax factor anywhere.'
      ],
      why: '<b>The reasoning, not the formula:</b> R&D and advertising build an asset that lasts several years, but accounting rules force them through the income statement in one go. That makes NOPAT, and therefore EVA, look terrible in a year of heavy investment and flattering afterwards, which is exactly the wrong incentive for a manager. So you <i>capitalise</i>: add the full expense back (it was never really a cost of this year alone) and instead deduct only the slice that belongs to this year (the amortisation). <b>No (1 − t) factor:</b> not one official solution grosses this adjustment up for tax. Do not invent one.'
    },

    {
      id: 'adj-f-ic', kind: 'formula', chapter: 'adjust', pts: 3,
      title: 'Write the invested-capital adjustment',
      q: 'Assemble the R&D / advertising adjustment to invested capital.',
      tokens: ['IC adj.', '=', '+', 'unamortised book value', 'at year-end'],
      decoys: ['−', 'current year\'s expense', 'Σ amortisation this year', '× (1 − t)'],
      accept: [['IC adj.', '=', '+', 'unamortised book value', 'at year-end']],
      hints: [
        'If you have decided the spend is an asset, where does that asset have to appear?',
        'On the balance sheet, at its remaining, not-yet-amortised book value.',
        'IC adj. = + unamortised book value at year-end. Do this for <b>each</b> year you need.'
      ],
      why: 'The two adjustments are a matched pair, and that is the point: capitalising means the spend becomes an <b>asset</b>, so it must show up in <i>both</i> statements, as amortisation in NOPAT and as remaining book value in invested capital. Miss the second one and the manager gets the flattering profit without being charged for the capital that produced it, which defeats the whole purpose. Remember the capital charge then rises too, so the adjustment does <b>not</b> automatically improve EVA.'
    },

    /* ------------------------------------------------ the amortisation grid */
    {
      id: 'adj-t-grid26', kind: 'table', chapter: 'adjust', pts: 4,
      title: 'Draw the amortisation grid (test exam)',
      source: 'SS23/SS24/SS25/SS26 test exam Q1.2 · official solution',
      q: 'R&D is capitalised and amortised straight-line over <em>3 years</em>, the first charge falling in the year the expense takes place. Complete the grid. The 2004 cohort is done for you.',
      note: 'This grid is mechanical. Draw it the same way every time and it costs you ninety seconds.',
      data: [{
        t: 'R&D expenses (in thousands of EUR)',
        cols: ['2004', '2005', '2006'],
        rows: [['R&D expenses', '24,000', '27,000', '30,000']]
      }],
      cols: ['Annual charge', '2004', '2005', '2006', '2007', '2008'],
      rows: [
        {
          label: 'From the 2004 spend (24,000)',
          cells: [{ v: '8,000' }, { v: '8,000' }, { v: '8,000' }, { v: '8,000' }, null, null]
        },
        {
          label: 'From the 2005 spend (27,000)',
          cells: [
            { a: 9000, f: '27,000 / 3 = 9,000 per year', h: ['Divide the spend by the 3-year amortisation life.'] },
            null,
            { a: 9000, f: 'first charge in the year of the spend → 2005', h: ['The first charge is due in the <b>same</b> year the expense takes place.'] },
            { a: 9000, f: 'second of three charges', h: [] },
            { a: 9000, f: 'third and last charge → 2007', h: [] },
            null
          ]
        },
        {
          label: 'From the 2006 spend (30,000)',
          cells: [
            { a: 10000, f: '30,000 / 3 = 10,000 per year', h: [] },
            null, null,
            { a: 10000, f: 'first charge → 2006', h: [] },
            { a: 10000, f: '→ 2007', h: [] },
            { a: 10000, f: '→ 2008', h: [] }
          ]
        },
        {
          label: 'Total amortisation hitting the year', total: true,
          cells: [
            null,
            { a: 8000, f: '8,000 (2004 cohort only)', h: [] },
            { a: 17000, f: '8,000 + 9,000 = 17,000', h: [] },
            {
              a: 27000, f: '8,000 + 9,000 + 10,000 = 27,000  ← the number you need',
              h: ['Add down the 2006 column: all three cohorts are charging in 2006.'],
              diag: [
                { v: 17000, m: 'You delayed the first charge by a year. Every paper states the first charge is due <b>in the same year</b> the expense takes place, so the 2006 spend already charges in 2006.' },
                { v: 30000, m: 'That is the 2006 <i>spend</i>, not the amortisation. The spend gets added back to NOPAT; the amortisation is what you subtract.' },
                { v: 19000, m: 'That is the 2007 column. Read across carefully. You want 2006.' }
              ]
            },
            { a: 19000, f: '9,000 + 10,000 = 19,000 (the 2004 cohort has run out)', h: [] },
            { a: 10000, f: '10,000 (only the 2006 cohort is left)', h: [] }
          ]
        }
      ],
      why: '<b>Why the grid is triangular:</b> each year\'s spend starts its own three-year run of equal charges, and the runs overlap. Once three cohorts are live, the annual charge stabilises, which is exactly why the total peaks at 27,000 in 2006 and then decays as older cohorts expire. Two structural checks you can apply in seconds: each row must sum to its original spend (9,000 × 3 = 27,000 ✓), and in a year where three full cohorts overlap the total is just the sum of the three annual charges.'
    },

    {
      id: 'adj-t-block26', kind: 'table', chapter: 'adjust', pts: 6,
      title: 'The adjustment block (test exam)',
      source: 'SS23/SS24/SS25/SS26 test exam Q1.2 · official solution',
      q: 'Unadjusted NOPAT is 6,360; unadjusted invested capital is 190,000 (2005) and 200,000 (2006); WACC 10 %. Total amortisation hitting 2006 is 27,000. Now produce the adjusted EVA.',
      cols: ['2005', '2006'],
      skeleton: {
        prompt: 'Lay out the adjustment block.',
        bank: ['NOPAT: + current year\'s expense', 'NOPAT: − total amortisation this year', '= Adjusted NOPAT',
          'IC: + unamortised book value', '= Adjusted Invested Capital', 'Ø Adjusted Invested Capital', 'Adjusted EVA',
          'NOPAT: × (1 − t)', 'IC: − unamortised book value'],
        order: ['NOPAT: + current year\'s expense', 'NOPAT: − total amortisation this year', '= Adjusted NOPAT',
          'IC: + unamortised book value', '= Adjusted Invested Capital', 'Ø Adjusted Invested Capital', 'Adjusted EVA'],
        why: {
          'NOPAT: × (1 − t)': 'No official solution taxes this adjustment. Add the expense, subtract the amortisation, stop.',
          'IC: − unamortised book value': 'Wrong direction. You have decided the spend is an asset, so invested capital goes <b>up</b>.'
        }
      },
      rows: [
        { label: 'NOPAT: + current year\'s expense', cells: [null, { a: 30000, f: '+30,000 (the 2006 R&D expense)', h: ['The whole of this year\'s spend comes back.'] }] },
        { label: 'NOPAT: − total amortisation this year', cells: [null, { a: -27000, f: '−27,000 (from the grid)', h: ['Enter as a negative. It is the 2006 column total of the grid.'] }] },
        {
          label: '= Adjusted NOPAT', total: true, cells: [null, {
            a: 9360, f: '6,360 + 30,000 − 27,000 = 6,360 + 3,000 = 9,360',
            h: ['Net adjustment is +3,000. Add it to the unadjusted NOPAT of 6,360.'],
            diag: [{ v: 3000, m: 'That is just the net adjustment. Add it to the unadjusted NOPAT of 6,360.' },
            { v: 36360, m: 'You added the expense but forgot to subtract the 27,000 of amortisation.' }]
          }]
        },
        {
          label: 'IC: + unamortised book value', cells: [
            {
              a: 26000, f: '2004 cohort: 24,000 − 2×8,000 = 8,000 remaining; 2005 cohort: 27,000 − 1×9,000 = 18,000. Total 26,000',
              h: ['At the end of 2005, how much of each cohort has <i>not</i> yet been charged?',
                'The 2004 spend has been charged in 2004 and 2005 → 1 charge of 8,000 left. The 2005 spend has been charged once → 2 charges of 9,000 left.',
                '8,000 + 18,000 = 26,000.'],
              diag: [{ v: 51000, m: 'That is the full 24,000 + 27,000 of spend. Only the <b>unamortised</b> remainder is capitalised, the charges already taken are gone.' }]
            },
            {
              a: 29000, f: '2004 cohort: fully amortised → 0; 2005 cohort: 9,000 left; 2006 cohort: 20,000 left. Total 29,000',
              h: ['End of 2006: the 2004 cohort has taken all three charges and is finished.',
                '2005 cohort has 1 charge of 9,000 left; the 2006 cohort has 2 charges of 10,000 left.',
                '0 + 9,000 + 20,000 = 29,000.'],
              diag: [{ v: 37000, m: 'You are still carrying 8,000 of the 2004 cohort. It was charged in 2004, 2005 and 2006. It is fully amortised.' }]
            }]
        },
        {
          label: '= Adjusted Invested Capital', total: true, cells: [
            { a: 216000, f: '190,000 + 26,000 = 216,000', h: [] },
            { a: 229000, f: '200,000 + 29,000 = 229,000', h: [] }]
        },
        { label: 'Ø Adjusted Invested Capital', total: true, cells: [null, { a: 222500, f: '½ × (216,000 + 229,000) = 222,500', h: [] }] },
        {
          label: 'Adjusted EVA', total: true, cells: [null, {
            a: -12890, f: 'EVA = 9,360 − 0.10 × 222,500 = 9,360 − 22,250 = −12,890',
            h: ['Adjusted capital charge = 0.10 × 222,500 = 22,250.'],
            diag: [
              { v: -13140, m: 'That is the <i>unadjusted</i> EVA. You need the adjusted NOPAT and the adjusted capital base.' },
              { v: -13540, m: 'You used the year-end adjusted capital of 229,000. Use the average, 222,500.' },
              { v: 12890, m: 'Sign, 9,360 − 22,250 is negative.' }
            ]
          }]
        }
      ],
      why: '<b>The lesson hiding in the numbers.</b> EVA improved only from −13,140 to −12,890, a mere 250. NOPAT rose by 3,000, but capitalising also pushed the capital base up by roughly 27,500, and 10 % of that is 2,750 of extra capital charge. Net effect: +250. This is the honest answer to "does capitalising R&D make the firm look better?", <b>not much, and not necessarily at all.</b> What it really does is remove the manager\'s incentive to slash R&D to hit this year\'s number, because the spend no longer lands entirely in this year\'s profit. That is a <i>performance-measurement</i> fix, not a cosmetic one.'
    },

    /* ------------------------------------------------ SS19 advertising, 4 cohorts */
    {
      id: 'adj-t-ss19', kind: 'table', chapter: 'adjust', pts: 10,
      title: 'Advertising, four cohorts (SS19 real exam)',
      source: 'SS19 Q1.2 · official solution',
      q: 'Customer advertising expenses are capitalised and amortised straight-line over <em>three</em> years, first charge in the year the expense takes place. Unadjusted NOPAT 560; unadjusted IC 3,570 (2017) and 4,170 (2018); WACC 10 %. Find the adjusted EVA for 2018.',
      note: 'Four cohorts this time, and the oldest one has already expired. That is the whole difficulty.',
      data: [{
        t: 'Customer advertising expenses (in thousands of EUR)',
        cols: ['2015', '2016', '2017', '2018'],
        rows: [['Expense', '21', '27', '42', '18']]
      }],
      cols: ['Annual charge', '2015', '2016', '2017', '2018'],
      rows: [
        { label: 'From the 2015 spend (21)', cells: [{ a: 7, f: '21 / 3 = 7', h: [] }, { a: 7, f: '2015', h: [] }, { a: 7, f: '2016', h: [] }, { a: 7, f: '2017: last charge', h: [] }, { a: 0, f: '0: fully amortised by the end of 2017', h: ['2015, 2016, 2017, three charges taken. What is left for 2018?'], diag: [{ v: 7, m: 'The 2015 cohort has already taken its three charges (2015, 2016, 2017). Nothing lands in 2018.' }] }] },
        { label: 'From the 2016 spend (27)', cells: [{ a: 9, f: '27 / 3 = 9', h: [] }, null, { a: 9, f: '2016', h: [] }, { a: 9, f: '2017', h: [] }, { a: 9, f: '2018: last charge', h: [] }] },
        { label: 'From the 2017 spend (42)', cells: [{ a: 14, f: '42 / 3 = 14', h: [] }, null, null, { a: 14, f: '2017', h: [] }, { a: 14, f: '2018', h: [] }] },
        { label: 'From the 2018 spend (18)', cells: [{ a: 6, f: '18 / 3 = 6', h: [] }, null, null, null, { a: 6, f: '2018: first charge', h: [] }] },
        {
          label: 'Total amortisation this year', total: true,
          cells: [null, null, null, { a: 30, f: '7 + 9 + 14 = 30', h: [] }, {
            a: 29, f: '0 + 9 + 14 + 6 = 29   [2 points]',
            h: ['Add down the 2018 column, remembering the 2015 cohort contributes nothing.'],
            diag: [{ v: 36, m: 'You included 7 from the 2015 cohort. It finished at the end of 2017.' }]
          }]
        },
        {
          label: '= Adjusted NOPAT', total: true, cells: [null, null, null, null, {
            a: 549, f: '560 − 29 + 18 = 549   [1 point]',
            h: ['Subtract the amortisation, add back this year\'s expense of 18.'],
            diag: [{ v: 571, m: 'Signs swapped: the <b>expense</b> is added (+18) and the <b>amortisation</b> subtracted (−29).' },
            { v: 542, m: 'You used 36 of amortisation, the 2015 cohort has expired.' }]
          }]
        },
        {
          label: 'IC: + unamortised book value', cells: [null, null, null, {
            a: 37, f: '2015: 0 · 2016: 27 − 2×9 = 9 · 2017: 42 − 1×14 = 28  →  37   [part of 4 points]',
            h: ['End of 2017. Which cohorts still have charges outstanding?', '2015 is done. 2016 has one 9 left. 2017 has two 14s left.', '0 + 9 + 28 = 37.']
          }, {
            a: 26, f: '2016: 0 · 2017: 42 − 2×14 = 14 · 2018: 18 − 1×6 = 12  →  26   [part of 4 points]',
            h: ['End of 2018. The 2016 cohort has now also finished.', '0 + 14 + 12 = 26.']
          }]
        },
        {
          label: '= Adjusted Invested Capital', total: true, cells: [null, null, null,
            { a: 3607, f: '3,570 + 37 = 3,607', h: [] },
            { a: 4196, f: '4,170 + 26 = 4,196', h: [] }]
        },
        { label: 'Ø Adjusted Invested Capital', total: true, cells: [null, null, null, null, { a: 3901.5, f: '½ × (3,607 + 4,196) = 3,901.5   [1 point]', h: [] }] },
        {
          label: 'Adjusted EVA', total: true, cells: [null, null, null, null, {
            a: 158.85, f: '549 − 0.10 × 3,901.5 = 549 − 390.15 = 158.85   [1 point]',
            h: ['Adjusted capital charge = 390.15.'],
            diag: [{ v: 173, m: 'That is the unadjusted EVA from Q1.1. Use the adjusted NOPAT and the adjusted base.' }]
          }]
        }
      ],
      why: 'Here EVA <b>fell</b>, from 173 to 158.85. The reason is visible in the data: advertising spend dropped sharply in 2018 (18, against 42 the year before), so adding back a small current expense while subtracting amortisation from three fat earlier cohorts <i>reduces</i> NOPAT, and the capitalised asset still enlarges the capital base. <b>That is the adjustment working exactly as intended.</b> A manager who cuts advertising to flatter this year\'s EVA is caught by it, which is precisely why the papers ask for it "to improve the accuracy of the EVA number for the purpose of performance measurement."'
    },

    /* ------------------------------------------------ SS17 R&D */
    {
      id: 'adj-t-ss17', kind: 'table', chapter: 'adjust', pts: 10,
      title: 'R&D, four cohorts (SS17 real exam)',
      source: 'SS17 Q1.3 · numbers derived by applying the method the SS19/SS26 official keys fix',
      q: 'R&D capitalised and amortised straight-line over three years, first charge in the year of the spend. Unadjusted NOPAT 336; unadjusted IC 3,800 (2015) and 4,180 (2016); WACC 10 %. Find the adjusted EVA for 2016.',
      note: 'No hand-holding this time. Only the totals and the result. Build the grid on paper first.',
      data: [{
        t: 'R&D expenses (in thousands of EUR)',
        cols: ['2013', '2014', '2015', '2016'],
        rows: [['Cash flow', '300', '390', '420', '480']]
      }],
      cols: ['2015', '2016'],
      rows: [
        {
          label: 'Total amortisation hitting the year', cells: [null, {
            a: 430, f: 'annual charges 100 / 130 / 140 / 160 → 2016 gets 0 + 130 + 140 + 160 = 430',
            h: ['Annual charges are 300/3, 390/3, 420/3, 480/3.',
              'The 2013 cohort charges in 2013, 2014, 2015. Nothing in 2016.',
              '0 + 130 + 140 + 160 = 430.'],
            diag: [{ v: 530, m: 'You included 100 from the 2013 cohort, which expired at the end of 2015.' }]
          }]
        },
        {
          label: '= Adjusted NOPAT', total: true, cells: [null, {
            a: 386, f: '336 + 480 − 430 = 386', h: ['Add this year\'s 480, subtract the 430 of amortisation.']
          }]
        },
        {
          label: 'IC: + unamortised book value', cells: [
            { a: 410, f: '2013: 0 · 2014: 390 − 2×130 = 130 · 2015: 420 − 1×140 = 280  →  410', h: ['End of 2015.'] },
            { a: 460, f: '2014: 0 · 2015: 420 − 2×140 = 140 · 2016: 480 − 1×160 = 320  →  460', h: ['End of 2016.'] }]
        },
        {
          label: '= Adjusted Invested Capital', total: true, cells: [
            { a: 4210, f: '3,800 + 410 = 4,210', h: [] }, { a: 4640, f: '4,180 + 460 = 4,640', h: [] }]
        },
        { label: 'Ø Adjusted Invested Capital', total: true, cells: [null, { a: 4425, f: '½ × (4,210 + 4,640) = 4,425', h: [] }] },
        {
          label: 'Adjusted EVA', total: true, cells: [null, {
            a: -56.5, f: '386 − 0.10 × 4,425 = 386 − 442.5 = −56.5', h: ['Capital charge 442.5.'],
            diag: [{ v: -63, m: 'That is the unadjusted EVA. Use the adjusted figures.' }]
          }]
        }
      ],
      why: 'Here the adjustment <b>improved</b> EVA, from −63 to −56.5, because R&D spend was <i>rising</i> (480 against a 100-140 range of older charges), so adding back a big current expense outweighs the amortisation of smaller past ones. Put the three papers side by side and the pattern is complete: capitalising helps when spend is <b>rising</b> (SS17), hurts when spend is <b>falling</b> (SS19), and barely moves the needle when spend is <b>flat</b> (test exam). The direction is never something to memorise. It falls out of the data.'
    },

    /* ------------------------------------------------ leases */
    {
      id: 'adj-seq-lease', kind: 'sequence', chapter: 'adjust', pts: 5,
      title: 'Capitalising operating leases, the five steps',
      source: 'SS17 Q1.4 and SS19 Q1.3 · official solution (SS19)',
      q: 'Describe all steps necessary to capitalise operating leases and recognise them as debt financing. Put the five steps in order. (5 points)',
      note: 'Pure recall, asked almost verbatim on two real papers. Five free marks.',
      items: [
        'Invested capital: compute the lease liability as the present value of the future lease payments, and add it to invested capital.',
        'NOPAT: estimate the interest portion of the lease payments (pretax borrowing cost × average lease value) and add it back to NOPAT.',
        'NOPAT: deduct the tax shield on that interest amount.',
        'WACC: recompute the WACC treating the lease liability as additional debt.',
        'Recompute EVA with the adjusted figures.'
      ],
      hints: [
        'The official key groups them: invested capital first (2 points), then NOPAT (2 points), then WACC (1 point).',
        'Within NOPAT the order mirrors the ordinary NOPAT ladder: add the interest back, then remove its tax shield.',
        'Balance sheet → income statement → cost of capital → recompute.'
      ],
      why: '<b>Why these steps and no others?</b> An operating lease is economically a purchase financed by borrowing, but accounting hides both halves: no asset, no debt, just a rent expense. Capitalising restores both. The asset (= PV of the payments) enters invested capital; the "rent" is split into an interest component, which belongs to financing and so must come <b>out</b> of NOPAT\'s cost base (add it back), and its tax shield, which must be stripped for exactly the reason it is stripped in the ordinary ladder. Finally the liability is real debt, so it changes the weights in the WACC. <b>The punchline worth writing down:</b> the net effect on EVA is <i>minor</i>, with zero MVA it is exactly nil, with positive MVA EVA falls slightly, with negative MVA it rises slightly.'
    },

    /* ------------------------------------------------ MC on the two traps */
    {
      id: 'adj-mc-tax', kind: 'mc', chapter: 'adjust', pts: 2,
      title: 'Spot the mistake: does the R&D adjustment get taxed?',
      q: 'You are capitalising R&D of 30,000 with total amortisation of 27,000 this year, at a tax rate of 40 %. Which treatment matches the official solutions?',
      opts: [
        { t: 'NOPAT adjustment = +30,000 − 27,000 = +3,000', ok: true, y: 'Correct. Every official key adds the gross expense and subtracts the gross amortisation. No tax factor.' },
        { t: 'NOPAT adjustment = (+30,000 − 27,000) × (1 − 0.40) = +1,800', ok: false, y: 'Plausible in theory, but no published solution does this. Applying (1 − t) here will cost you the marks.' },
        { t: 'NOPAT adjustment = +30,000 − 27,000 − 0.40 × 30,000 = −9,000', ok: false, y: 'Invented. There is no separate tax charge on the capitalised spend.' },
        { t: 'No NOPAT adjustment. Only invested capital changes', ok: false, y: 'Both statements are adjusted. Leaving NOPAT alone gives the manager the enlarged capital base with none of the profit benefit.' }
      ],
      why: 'There is a defensible theoretical argument for a tax gross-up, and the professor simply does not use it. In a closed-book exam graded against a fixed key, <b>match the key</b>: add the expense, subtract the amortisation, move on. Note where tax <i>does</i> legitimately appear in this course: in the NOPAT tax shield (t × interest expense), in the after-tax WACC (r_B × (1 − T_C)), and in un-/re-levering beta. Not here.'
    },

    {
      id: 'adj-mc-timing', kind: 'mc', chapter: 'adjust', pts: 2,
      title: 'Spot the mistake: when does the first charge fall?',
      q: 'A spend of 30,000 in 2006 is amortised straight-line over three years. Under the convention stated on every past paper, which years carry a charge?',
      opts: [
        { t: '2006, 2007, 2008', ok: true, y: 'Correct. "The first depreciation charge is due in the same year the expense takes place."' },
        { t: '2007, 2008, 2009', ok: false, y: 'This is the intuitive guess and it is wrong here. It shifts your whole grid by one year and changes every total.' },
        { t: '2006, 2007, 2008, 2009, a part-year in the first and last', ok: false, y: 'No pro-rating anywhere in this course. Equal charges, N of them.' },
        { t: 'It depends on the month of the spend', ok: false, y: 'The papers never give you a month. Annual periods only.' }
      ],
      why: 'One sentence, repeated on every paper, and it silently determines every figure in the grid. If you shift the convention by a year the test-exam total for 2006 becomes 17,000 instead of 27,000 and the adjusted EVA is wrong by thousands. <b>Read that sentence out loud before you draw the grid</b>, and note it is stated explicitly in the question precisely because the professor knows it is arbitrary.'
    }

  ]);

})(window.VBM);
