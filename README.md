# The Value Desk — a VBM exam trainer

A guided, self-marking drill game for a university **Value-based Management** course. You draw the
tables, write the formulas, and get told *which mistake you made* rather than just "wrong".

**Live:** deploy to Vercel (see below) — it is a static site, no build step.

---

## ⚠️ Unofficial

This is a **student-built revision tool**. It is **not affiliated with, produced by, or endorsed by
TUM, the TUM School of Management, or the chair that teaches the course.**

Everything in it was transcribed by hand from past papers, published solutions, lecture slides and
problem sets, and it may contain transcription errors, stale content or wrong interpretations. Exam
format, scope and conventions change between years.

**Your lecture slides, exercise sheets and the official solutions are the source of truth.** Where
this tool disagrees with them, they are right and it is wrong.

Drills are labelled with their provenance:

- `· official solution` — every number checked against a published answer key.
- `· derived` — the key was not available, so the figures were computed by applying the method that
  the official keys elsewhere fix. Flagged in the drill text.

No exam date is hardcoded. You set your own on the desk; the countdown and the study plan date
themselves from it.

---

## What is in it

**Ten training modules**, ordered by points per hour of study rather than by lecture order:

| # | Module | Covers |
|---|--------|--------|
| 01 | The EVA Engine | NOPAT ladder, NIBL, invested capital, average capital |
| 02 | Accounting Adjustments | R&D / advertising capitalisation, the amortisation grid, operating leases |
| 03 | Goal Congruence & the RBCAR | z_t, RI_t, weak/strong/robust, the straight-line failure |
| 04 | Depreciation, ROI & Residual Income | straight-line vs sinking-fund vs RBCAR on one project |
| 05 | Compensation & Bonus Banks | the five-row bank grid, NPV consistency, the four objectives |
| 06 | Cost of Capital | β → cost of equity → after-tax WACC, un-/re-levering |
| 07 | Ratio Analysis & the Cash Cycle | twenty ratios, the purchases bridge, the cycle ladder |
| 08 | Real Options | irreversibility/uncertainty/flexibility, the option to wait |
| 09 | EVA / MVA / DCF & Free Cash Flow | the three identities and how they get mutilated |
| 10 | Trap Radar | eleven mistakes taken from the examiner's own list |

**Three papers under the clock** — a test-exam template, a full 120-point real paper, and a
structural prediction assembled from the archetypes.

**Two reference screens** — a Pattern Board mapping every past paper topic by topic, and the Vault
holding every formula that has to be memorised (no formula sheet is permitted in the exam).

## How the teaching works

Seven drill types, each chosen to rehearse a specific exam action:

- **draw the table** — pick the row labels in order from a bank of correct rows and plausible wrong
  ones, *then* fill the cells. Because tables must be drawn by hand and the structure itself earns
  marks.
- **write the formula** — assemble it from tokens with distractors mixed in. `×` and `÷`, `>` and
  `<` are compared strictly, so a swapped operator is never accepted.
- **calculate** — a single number, with generous rounding tolerance (the official keys accept both
  rounded and unrounded intermediate results).
- **write the answer** — free text scored against the phrases the official keys award marks for,
  showing you which are present and which are missing.
- **sort them** / **order the steps** / **multiple choice** — for taxonomies, procedures and the
  recycled MC bank.

Three things make it a tutor rather than a quiz:

1. **Misconception diagnosis.** Wrong numeric answers are matched against known wrong answers. Enter
   `7,560` for NOPAT and it says *"that is 10,000 + 600 − 3,040 — you left out the tax shield"*.
2. **Escalating hints, gated answers.** Hints go from nudge to near-answer. "Show the answer" stays
   disabled until you have genuinely tried; revealed drills go into a review queue.
3. **An explanation on every drill** that argues *why* the formula is shaped the way it is, not just
   what it is.

Progress, ranks and the review queue live in `localStorage`. Nothing leaves the browser.

## Run it locally

Any static server; it needs HTTP rather than `file://` because the scripts are separate files.

```bash
python -m http.server 5178
```

Then open <http://localhost:5178>.

## Deploy to Vercel

No build step, no dependencies, no framework.

```bash
vercel --prod
```

Or point Vercel at the GitHub repo and accept the defaults — framework preset **Other**, build
command empty, output directory the repository root.

## Layout

```
index.html              shell, rail, footer
assets/app.css          design system, light + dark
src/engine.js           state, ranks, number parsing, exam date
src/drillui.js          the seven drill types and the guidance ladder
src/app.js              screens and routing
src/data/formulas.js    the Vault
src/data/pattern.js     the Pattern Board
src/data/chapters.js    module definitions
src/data/exams.js       the papers
src/data/drills-*.js    89 drills
```

Adding a drill means appending an object to a `drills-*.js` file and listing its `id` in
`chapters.js`. Nothing else.

## Credits

Built by [Devansh Devrani](https://www.linkedin.com/in/devansh-devrani/).
If it saved you an afternoon, [buy me a coffee](https://buymeacoffee.com/devanshdevrani31).
