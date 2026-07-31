/* ==========================================================================
   intuition.js · the mental picture behind each formula.
   A formula you can picture is a formula you can rebuild under exam pressure.
   Keyed by drill id. Shown as a panel on the formula and sequence drills.
   ========================================================================== */
'use strict';

VBM.data.intuition = {

  /* ------------------------------------------------------------ EVA core */
  'eva-f-core': {
    hook: 'Earnings minus rent.',
    story: 'The business is sitting on a big pile of other people\'s money, some from lenders, '
      + 'some from owners. That pile charges rent every single year, and <b>WACC × Invested Capital '
      + 'is the rent bill</b>. NOPAT is what the shop actually earned. Pay the rent out of the '
      + 'earnings and whatever is left over is genuinely yours. That leftover is EVA.',
    sticky: '"Earnings minus rent." Say that sentence and the formula rebuilds itself. It also '
      + 'explains the thing students find weird: a firm can report a healthy net income and still '
      + 'have a badly negative EVA, because net income charges rent on the debt and forgets to '
      + 'charge any on the equity.'
  },

  'eva-f-rona': {
    hook: 'Spread times size.',
    story: 'Take the first version and divide the whole thing by the capital. Now RONA is the rate '
      + 'you actually earned on the pile and WACC is the rate you owed on it, so the gap between '
      + 'them is your margin <i>per euro</i>. Multiply by how many euros you were running and you '
      + 'have the profit. It is exactly how a bank thinks: borrow at 10, lend at 14, the spread is '
      + '4, and the money you make is 4 % of however much you pushed through.',
    sticky: '"Spread times size." Once you see it that way, one recycled MC item dies instantly: a '
      + 'positive spread multiplied by a positive capital base <b>cannot</b> come out negative.'
  },

  /* ------------------------------------------------------------ adjustments */
  'adj-f-nopat': {
    hook: 'Undo the accountant, then do it your way.',
    story: 'The accountant dumped the entire R&D bill into this one year. You think that is unfair '
      + 'to a manager who is building something that lasts three years, so you make two moves. '
      + 'First you hand the money back: <b>add the whole expense</b>. Then you charge your own, '
      + 'smaller instalment instead: <b>subtract this year\'s amortisation</b>. Refund, then re-charge.',
    sticky: '"Refund the whole thing, charge one slice." And notice there is no (1 − t) anywhere, '
      + 'because you are not touching the tax bill, just moving a cost between years.'
  },

  'adj-f-ic': {
    hook: 'If you called it an asset, it has to sit on the balance sheet.',
    story: 'You just decided the R&D spend is an asset rather than a cost. Assets live on the '
      + 'balance sheet, valued at whatever is left of them, so the part you have not written off '
      + 'yet gets added to invested capital. This is the half people forget, and forgetting it is '
      + 'suspiciously convenient: you would get the flattering profit without paying rent on the '
      + 'thing that produced it.',
    sticky: '"Whatever is left of it goes on the books." Then brace yourself, because a bigger '
      + 'capital base means a bigger rent bill, which is why capitalising R&D often barely moves EVA.'
  },

  /* ------------------------------------------------------------ RBCAR */
  'cong-f-z': {
    hook: 'Split the bill by who ate what.',
    story: 'Three periods sit down to dinner and the investment is the bill. Instead of splitting '
      + 'it evenly, you ask what fraction of the eating each period did, and charge that period the '
      + 'same fraction of the bill. z_t <i>is</i> that fraction. The only twist is that a helping '
      + 'served later is worth less than one served now, so you discount everything before you '
      + 'compare portions.',
    sticky: '"Split the bill by who ate what, in today\'s money." Because the denominator is '
      + 'discounted and the numerator is not, <b>the shares do not add up to 1</b>. On the test '
      + 'exam they add to about 1.16. If yours add to 1, you forgot to discount.'
  },

  'cong-f-ri': {
    hook: 'Cash in, minus your slice of the bill.',
    story: 'This period brought in θ·x_t. Its share of the investment is z_t·b. Subtract one from '
      + 'the other and you are finished. The reason there is no depreciation row and no interest '
      + 'row is that <b>z_t·b already contains both of them</b>, rolled into a single allocated cost.',
    sticky: '"One row, not three." If you find yourself reaching for a separate capital charge, you '
      + 'have drifted back into the straight-line table by mistake.'
  },

  'cong-f-identity': {
    hook: 'Every period is a shrunken photocopy of the NPV.',
    story: 'Substitute the weight back in and the whole thing collapses to RI_t = z_t × NPV. Since '
      + 'z_t is always positive, each period\'s residual income is just the project\'s NPV scaled '
      + 'down. Good project, and every single year looks good. Bad project, and every single year '
      + 'looks bad. There is nowhere for a manager with a short horizon to hide.',
    sticky: '"Same sign, every year." That is the entire goal-congruence argument, and it doubles as '
      + 'your arithmetic check: compute the NPV once, and if any of your RIs has the wrong sign, the '
      + 'mistake is arithmetic, not conceptual.'
  },

  /* ------------------------------------------------------------ ROI / depreciation */
  'dep-f-roi': {
    hook: 'Profit over the money you started the year with.',
    story: 'On top, what you actually made once you account for wear and tear. Underneath, the '
      + 'capital that was already sitting there on the first of January, because that is the money '
      + 'that did the earning. Capital that arrived in December did not earn a full year, so it has '
      + 'no business being in the denominator.',
    sticky: '"Opening balance, never closing." And remember what a ratio hides: scale. A manager '
      + 'paid on ROI will turn down a big, genuinely valuable project purely because it drags their '
      + 'percentage down.'
  },

  'dep-f-sinking': {
    hook: 'Reverse-engineered from a wish.',
    story: 'Somebody wanted ROI to come out at exactly the IRR every year. So they wrote down '
      + 'ROI = IRR, substituted the ROI definition, and solved for depreciation. That is literally '
      + 'the whole derivation. Whatever is left of the cash flow after paying the IRR on the opening '
      + 'capital gets labelled depreciation, and if that leftover is negative, so be it.',
    sticky: '"Pay the IRR first, call the rest depreciation." Two consequences fall straight out: '
      + 'you need the IRR, so you need the <b>whole</b> future cash-flow stream; and the charge can '
      + 'go negative in a weak early year, which makes book value <i>rise</i>. That is not a mistake.'
  },

  /* ------------------------------------------------------------ compensation */
  'comp-f-earned': {
    hook: 'A flat fee for hitting target, plus commission on the overshoot.',
    story: 'Hit the number exactly and you collect the target bonus, nothing more. Beat it and you '
      + 'keep a slice of the excess. Miss it and the very same slice is taken off you, which is how '
      + 'a bonus can come out <b>negative</b> and how the bank ends up underwater.',
    sticky: '"Flat fee plus commission, and the commission cuts both ways." That symmetry is the '
      + 'point: it is what stops a manager gambling with the firm and walking away clean.'
  },

  /* ------------------------------------------------------------ cost of capital */
  'cap-f-capm': {
    hook: 'Risk-free pay, plus danger money.',
    story: 'Start with what a government bond pays you for taking no risk whatsoever. Then add '
      + 'danger money: the market\'s going rate for bearing one unit of risk, scaled by how exposed '
      + 'you personally are to it. That is all β is doing in there, turning the market\'s premium '
      + 'into <i>your</i> premium.',
    sticky: '"Safe rate, plus your exposure times the going rate for risk." Test it on the extreme: '
      + 'β = 0 earns you the bond rate and not a cent more, no matter how violently your own share '
      + 'price jumps around. Only market risk gets paid for.'
  },

  'cap-f-beta': {
    hook: 'The market is the ruler. You are the thing being measured.',
    story: 'On top: do you move with the market at all. Underneath: how much the market itself '
      + 'moves. Dividing by the market\'s variance is what calibrates the scale so that the market '
      + 'measured against itself comes out at exactly 1, which is the only sensible place to put the '
      + 'zero point.',
    sticky: '"Always divide by the ruler." Your own variance never appears anywhere in the formula, '
      + 'so when a paper hands you Var(R_i) it is not being helpful, it is fishing. SS17 hands you '
      + '0.06 for no other reason.'
  },

  'cap-f-wacc': {
    hook: 'A weighted average with a tax discount on the debt half.',
    story: 'Two sources of money, two different prices, blended in proportion to how much of each '
      + 'you actually used. The one asymmetry is the whole story: interest is tax-deductible and '
      + 'dividends are not, so <b>only the debt term</b> gets the (1 − T_C) discount.',
    sticky: '"Only debt gets the tax discount." That single bracket answers three exam questions at '
      + 'once: why debt is cheap, why leverage can raise firm value, and why swapping debt for '
      + 'equity pushes WACC up and future EVAs down.'
  },

  'cap-f-relever': {
    hook: 'Take their coat off, put yours on.',
    story: 'You borrowed a beta from a listed lookalike, but that beta is wearing the lookalike\'s '
      + 'debt as well as its business risk. So you undress it (divide by their levering factor) to '
      + 'get the pure business risk, then dress it in your own gearing (multiply by yours).',
    sticky: '"Divide to undress, multiply to dress." And the direction sanity-checks itself: more '
      + 'debt means a jumpier equity beta, because the same business risk now rides on a thinner '
      + 'slice of equity.'
  },

  /* ------------------------------------------------------------ ratios */
  'rat-f-payables': {
    hook: 'Suppliers bill you for what you bought, not for what you sold.',
    story: 'COGS is what walked out of the warehouse. Purchases is what walked in. If the warehouse '
      + 'ended the year fuller than it started, you must have bought more than you sold, so you add '
      + 'the increase back. Accounts payable were created by the buying, so purchases is the only '
      + 'numerator that matches.',
    sticky: '"Warehouse got fuller, so you bought more. Add the difference." Skip this one step and '
      + 'you get a wrong turnover, wrong days-payables and a wrong cash cycle, which is exactly why '
      + 'SS19 prices this single ratio at 3 points.'
  },

  'rat-f-cycle': {
    hook: 'How long is your money stuck?',
    story: 'Follow one euro through the business. It sits on a shelf as stock, then it sits in a '
      + 'drawer as an unpaid customer invoice. Add those two waits together and you have the '
      + 'operating cycle. But you did not pay your own supplier the moment the goods arrived either, '
      + 'and <i>that</i> stretch was financed by them rather than by you, so knock it off.',
    sticky: '"Stock, plus waiting on customers, minus making suppliers wait." What is left is the '
      + 'stretch you have to fund yourself. Shorter cash cycle means less working capital, a smaller '
      + 'capital base, a smaller rent bill and a higher EVA.'
  },

  /* ------------------------------------------------------------ real options */
  'opt-f-rule': {
    hook: 'Waiting is not doing nothing. It is holding an option.',
    story: 'If you wait, you get to look before you leap, and you only put money in when the good '
      + 'state shows up. In the bad state you simply walk away, so it contributes <b>zero</b>, not a '
      + 'loss. That chopped-off downside is the entire value of waiting, and it is why the expected '
      + 'value of waiting is not the same thing as the expected value of the deferred project.',
    sticky: '"You cannot lose money in a state you never entered." Which leads to the answer that '
      + 'surprises people: a project with a perfectly good positive NPV today can still be worth '
      + 'postponing, because investing now destroys your right to avoid the bad state.'
  },

  /* ------------------------------------------------------------ identities */
  'id-f-mva': {
    hook: 'What you put in, plus a bonus for beating the going rate.',
    story: 'Invested capital is the money that actually went into the business. Anything the market '
      + 'pays on top of that is a bet that the firm will earn more than its cost of capital. If you '
      + 'expect EVA of exactly zero forever, the firm is worth precisely its invested capital and not '
      + 'a euro more.',
    sticky: '"Capital in, plus the premium for being better than average." Keep the plus sign '
      + 'welded on and both of the examiner\'s favourite mutilations become obvious on sight.'
  },

  'id-f-dcf': {
    hook: 'Same cake, sliced differently.',
    story: 'EVA is free cash flow rearranged. Instead of taking the whole investment on the chin the '
      + 'year you spend it, you charge rent on it a little at a time as you use it. Rearranging when '
      + 'you recognise a cost cannot change how much value there is, so discount either stream and '
      + 'you land in the same place, once you add back the capital that EVA has already charged for.',
    sticky: '"Add the capital back and the two valuations meet." This is also why EVA is usable as '
      + 'an annual scorecard while DCF is not: DCF gives you one number for the whole project, EVA '
      + 'gives you a figure per year whose present value is that same number.'
  },

  /* ------------------------------------------------------------ procedures */
  'adj-seq-lease': {
    hook: 'A lease is a secret purchase funded by a secret loan.',
    story: 'Economically you bought the asset and borrowed to pay for it, but the accounts show you '
      + 'neither the asset nor the debt, just a rent line. Capitalising puts both halves back where '
      + 'they belong: the asset onto invested capital, the interest buried in the rent back into '
      + 'NOPAT (minus its tax shield, exactly as in the ordinary ladder), and the liability into the '
      + 'WACC as real debt.',
    sticky: '"Balance sheet, income statement, cost of capital, recompute." Four places, in that '
      + 'order, and the payoff is worth stating: the net effect on EVA turns out to be tiny.'
  },

  'id-seq-fcf': {
    hook: 'Depreciation leaves for the taxman and comes back for the cash.',
    story: 'You subtract D&A before tax because it genuinely lowers the tax bill, which is real '
      + 'money. Then you add it straight back afterwards because no cash ever actually left the '
      + 'building. Once you are on a cash footing, you take out the money that really did leave: '
      + 'capital expenditure and whatever got swallowed by working capital.',
    sticky: '"Out for tax, back for cash." For every line just ask "did money actually move?" '
      + 'D&A no, so add it back. CapEx yes and nothing has deducted it yet, so subtract. Taxes yes '
      + 'and already deducted, so leave them alone.'
  },

  'id-seq-ebit': {
    hook: 'Walk back up the statement, undoing things in reverse order.',
    story: 'The income statement took things off one at a time on the way down. To climb back up '
      + 'you undo them in the opposite order. Tax was the last thing removed, so it is the first '
      + 'thing you add back, which lands you at EBT. Financing came before tax, so it goes next, and '
      + 'that lands you at EBIT.',
    sticky: '"Last out, first back in." The signs then look after themselves: an expense that was '
      + 'subtracted gets added back, an income that was added gets taken out.'
  }
};
