/* ==========================================================================
   drills-identities.js — Chapter 9: EVA / MVA / DCF identities and free cash flow.
   Multiple choice only — but on SS17 and SS19 both.
   ========================================================================== */
'use strict';

(function (V) {

  V.reg([

    {
      id: 'id-f-mva', kind: 'formula', chapter: 'identities', pts: 3,
      title: 'Write MVA and the market-value identity',
      q: 'Assemble the market value of the firm in terms of EVA.',
      tokens: ['Market value of firm', '=', 'Invested Capital', '+', 'PV of future EVAs'],
      decoys: ['−', 'PV of future FCFs', 'NOPAT', 'WACC', '×'],
      accept: [['Market value of firm', '=', 'Invested Capital', '+', 'PV of future EVAs']],
      hints: [
        'Two components: the capital already in the business, plus the value of the excess returns it will earn.',
        'MVA = Σ EVA_t/(1+WACC)^t is the second component on its own.',
        'Market value of firm = Invested Capital + PV of future EVAs.'
      ],
      why: '<b>The identity is a statement about where firm value comes from.</b> Invested capital is what has been put in; MVA — the present value of future EVAs — is the premium the market pays over that, and it is positive only if the firm is expected to earn more than its WACC. A firm with a permanently zero EVA is worth exactly its invested capital.<br><br>Both mutilations the examiner uses attack the first term: <b>"market value = the PV of future EVAs"</b> alone is <b>wrong</b> (it forgets the capital in the business — SS17 MC Q1), and <b>"PV of EVAs <i>minus</i> invested capital = PV of FCFs"</b> is <b>wrong</b> (the sign is flipped — SS19 MC Q1). Learn the identity with the plus sign and both fall out.'
    },

    {
      id: 'id-f-dcf', kind: 'formula', chapter: 'identities', pts: 3,
      title: 'Write the EVA ↔ DCF bridge',
      q: 'Assemble the identity linking discounted EVAs to discounted free cash flows.',
      tokens: ['Σ EVA_t·(1+WACC)^−t', '+', 'Invested Capital', '=', 'Σ FCF_t·(1+WACC)^−t'],
      decoys: ['−', 'NOPAT', 'MVA', '×'],
      accept: [['Σ EVA_t·(1+WACC)^−t', '+', 'Invested Capital', '=', 'Σ FCF_t·(1+WACC)^−t']],
      hints: [
        'It says the two valuation approaches agree.',
        'Discounted EVAs alone are not enough — you have to add back the capital base to reach the DCF value.',
        'Σ EVA_t·(1+WACC)^−t + Invested Capital = Σ FCF_t·(1+WACC)^−t.'
      ],
      why: '<b>Why it must be true.</b> EVA is free cash flow rearranged — it just charges the capital as it is used rather than when it is spent. Discounting either stream must therefore give the same value, provided you add back the capital base that EVA has already charged for. This is the same invariance idea as Preinreich–Lücke, one level up: <b>accounting choices redistribute value across periods; they never create or destroy it.</b><br><br>Practically, this is why EVA is usable as a <i>periodic</i> performance measure while DCF is not. DCF gives one number for the whole project; EVA gives an annual figure whose present value is that same number.'
    },

    {
      id: 'id-seq-fcf', kind: 'sequence', chapter: 'identities', pts: 4,
      title: 'Build the free-cash-flow bridge',
      q: 'Put the free-cash-flow ladder in order, starting from EBITDA and passing through NOPAT.',
      note: 'Notice that D&A appears twice, with opposite signs. That is not a typo.',
      items: [
        'EBITDA',
        '− D&A',
        '− Taxes',
        '= NOPAT',
        '+ D&A',
        '− CapEx',
        '− ΔWCR',
        '= Free Cash Flow'
      ],
      hints: [
        'The first half computes an after-tax operating profit; the second half converts it into cash.',
        'D&A must be subtracted before tax (it is tax-deductible) and added back after (it is not a cash outflow).',
        'EBITDA − D&A − Taxes = NOPAT, then + D&A − CapEx − ΔWCR = Free Cash Flow.'
      ],
      why: '<b>Why D&A appears twice.</b> It is subtracted before tax because depreciation genuinely reduces the tax bill; it is added back afterwards because no cash left the business. The net effect is the depreciation <i>tax shield</i> — which is exactly why you cannot simply skip both steps.<br><br>The exam version of this is short: <b>from NOPAT to FCF, add back D&A, then subtract CapEx and ΔWCR.</b> The traps on SS17 MC Q4 and SS19 MC Q2 are: "subtract D&A from NOPAT" (wrong — NOPAT is already after D&A, so you add it back), "add back tax payments to NOPAT" (wrong — taxes are a real cash cost), and "subtract the tax shield from NOPAT" (wrong — that belongs in the NOPAT ladder, not here).'
    },

    {
      id: 'id-mc-fcf', kind: 'mc', chapter: 'identities', pts: 2,
      title: 'MC — free cash flow from NOPAT',
      source: 'SS19 MC Q2 · official solution',
      q: 'To calculate the free cash flow from NOPAT, you <em>need</em> to…',
      opts: [
        { t: '… subtract capital expenditures from NOPAT.', ok: true, y: 'Correct. CapEx is a genuine cash outflow that never appears in NOPAT.' },
        { t: '… add back tax payments to NOPAT.', ok: false, y: 'No. Taxes really are paid in cash, so they stay subtracted. FCF is an after-tax measure.' },
        { t: '… subtract depreciation and amortisation from NOPAT.', ok: false, y: 'Wrong direction. NOPAT is already after D&A, and D&A is not a cash flow, so it must be <b>added back</b>.' }
      ],
      why: 'The test is simply "did cash actually move?" <b>D&A</b> — no cash moved, and it has already been deducted, so add it back. <b>CapEx</b> — cash left the business and nothing has deducted it yet, so subtract it. <b>ΔWCR</b> — cash is tied up in inventory and receivables, so subtract an increase. <b>Taxes</b> — cash left, already deducted, so leave them alone.<br><br>Apply that one question to each line and you never need to memorise the ladder as a list.'
    },

    {
      id: 'id-seq-ebit', kind: 'sequence', chapter: 'identities', pts: 3,
      title: 'Build EBIT from the bottom up',
      q: 'Put the bottom-up EBIT bridge in order — the route the lecture recommends when the statement does not report EBIT directly.',
      items: [
        'Net profit',
        '+ income taxes',
        '= EBT',
        '+ interest & other financial expense',
        '− interest & other financial income',
        '= EBIT'
      ],
      hints: [
        'Start at the bottom of the income statement and undo, in reverse order, everything that was deducted.',
        'Undo tax first to reach EBT, then undo the financing items to reach EBIT.',
        'Net profit + income taxes = EBT; EBT + interest expense − interest income = EBIT.'
      ],
      why: '<b>You are walking back up the income statement</b>, reversing each deduction in the order it was made. Tax was the last thing taken out, so it is the first thing you add back; financing came before tax, so it comes second. The signs follow automatically: an <i>expense</i> that was subtracted gets added back, and an <i>income</i> that was added gets removed.<br><br>The <b>top-down</b> route is worth knowing too: Net sales − COGS = gross profit; − SG&A − R&D − other = EBITDA; − D&A = EBIT. Use whichever direction the paper\'s statement supports — and note that most VBM papers hand you "Operating income" directly, in which case neither bridge is needed.'
    },

    {
      id: 'id-mc-capstruct', kind: 'mc', chapter: 'identities', pts: 2,
      title: 'MC — capital structure',
      source: 'SS19 MC Q3 · official solution',
      q: 'Which of the following statements is <em>wrong</em>?',
      opts: [
        { t: 'In a world without taxes and bankruptcy costs and with perfect capital markets, there is an optimal capital structure.', ok: true, y: 'Wrong, so this is the answer. Those are exactly the Modigliani–Miller conditions, under which capital structure is <b>irrelevant</b> — there is no optimum.' },
        { t: 'Costs for financial distress decrease the benefit of a high debt-to-equity ratio.', ok: false, y: 'True. Distress costs are one half of the trade-off theory.' },
        { t: 'Because of the tax-deductibility of interest payments a higher leverage may result in a higher firm value.', ok: false, y: 'True. The interest tax shield is the other half of the trade-off.' }
      ],
      why: '<b>Modigliani–Miller is a statement about a world that does not exist</b>, and its value is diagnostic: if capital structure matters in reality, it can only be because one of the assumptions fails. The two remaining options name the two failures the course cares about — <b>taxes</b> (interest is deductible, so debt adds value) and <b>bankruptcy / distress costs</b> (too much debt destroys it). Together they give the trade-off theory and an interior optimum.<br><br>The connection back to EVA: this is why <b>"increasing the portion of equity"</b> lowers future EVAs. In MM\'s frictionless world it would change nothing; with deductible interest it raises the WACC and so raises capital charges.'
    }

  ]);

})(window.VBM);
