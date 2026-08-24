---
type: Synthesis
title: Recency-Checklist Deliberation Explosion
description: Failure mode where a closing verification checklist plus literal counting instructions cause a literal, high-effort reasoning model to re-verify exhaustively in thinking — output tokens grew ~9x and wall time ~13.6x at production input sizes in the observed case, while the small qualification fixtures passed at normal wall times.
tags: [prompting, reasoning, agent-harness, evaluation]
timestamp: 2026-08-19T00:00:00Z
---

# Recency-Checklist Deliberation Explosion

A failure mode in single-shot task prompts for literal, high-effort reasoning models (observed on Claude Sonnet 5): instructions placed in the prompt's closing position that ask the model to *verify* or *count* things about its own output trigger exhaustive in-thinking re-verification whose cost scales with output size — cheap on small eval inputs, ruinous at production scale.

## The Pattern

1. A long task prompt is restructured per best practice: critical invariants restated in a closing block, at the recency position.
2. The closing block is phrased as a verification protocol — "Before you finish, verify, for every section, every role, and every bullet: [13 items]" — rather than as reminders.
3. One or more items demand literal arithmetic over the output ("count your output's words; if over, compress and recount").
4. The model, being documented-literal at high reasoning effort, executes the protocol in extended thinking. The honest cost is *items × document units × verification passes*: thirteen checks against roughly twenty-five bullets, and the count/edit/recount cycle supplies the third factor by re-running the whole sweep after each edit.
5. Qualification evals pass at normal wall times — the fixtures are small, so the product stays small. In production, on a full-size document and real findings, generation volume grows sharply.

Three compounding sub-causes were identified in the observed case: (a) a universal quantifier over the checklist ("every X, not just the first"); (b) literal counting duplicated into both body and closing positions; (c) removal of a "downstream audits run after you" clause, leaving the model as the last line of defense — precisely the condition under which a high-effort model verifies hardest.

## Why It Happens

Recency placement raises compliance — including compliance with instructions whose honest execution multiplies out. Vendor-documented literalism ("does not silently generalize; state scope explicitly") cuts both ways: explicit scope is what makes the model actually perform every one of those passes rather than gesture at them. Adaptive thinking at high effort supplies the budget to try. And ordinary small fixtures can miss the whole thing, because the cost term scales with output size rather than with correctness — a suite gated only on correctness has no reason to notice.

Recency is an aggravating position rather than a demonstrated sole cause. The same counting language had been survivable in body position at lower thinking volume in this pipeline's own earlier prompts; what detonated was that language *plus* the quantifier *plus* the missing safety valve, arriving together at the end of the prompt. The interaction is what was observed; the contribution of each ingredient separately was not measured.

## How To Avoid It

- Closing blocks carry *reminders*, never verification protocols: one line per fatal invariant, plus "apply these as you draft; do not re-verify the finished document item by item."
- Never ask a model to count what infrastructure can measure. Replace "count your words" with "estimate by line count — the deterministic gate re-measures downstream."
- Keep (or restore) an explicit safety valve naming the downstream checks: "you are not the last line of defense; extended re-checking here adds latency without adding safety; when in doubt, finish directly."
- Gate prompt qualification on *wall time and token volume per fixture*, not correctness alone — and include at least one production-scale fixture, because that is where this failure lives.
- After any prompt restructure, compare production step records (elapsed, output tokens) against the prior version's. Volume growth that outpaces any plausible provider slowdown is the signature of deliberation growth; a provider problem moves wall time without moving output tokens.
- Watch the ratio, not just the wall clock. Wall time and output tokens are different measurements and can move by different multiples; quoting one figure for both hides whether the model generated more or merely generated slower.

## Evidence

First-party incident, GSL resume workflow, 2026-08-18/19 (`gsl` repo, `docs/resume-prompt-decisions.md`, the V2z entry). The pipeline is a chain of separately-prompted model calls: `resume_prepare` builds the evidence packet and gap questions, `resume_author` drafts the document, `resume_check` audits the draft against the packet on a different model family, and `resume_revise` folds findings back into the document. **V2y** is the whole-prompt restructure that introduced the defect — four prompts rewritten together under six owner rulings, 2,410 to 1,935 lines. **V2z** is the same-week set of targeted deltas that repaired it.

**V2y's qualification passed.** All four rewritten prompts requalified against their fixture suites — 20/20 fixtures with zero fixture repairs — at normal wall times. That is the load-bearing fact about this failure mode, not a footnote: the suite that would have to catch it saw nothing, because the fixtures are too small to make the multiplication expensive. The decisions record states the same conclusion in its own words: the explosion only manifests at production input sizes.

**Production, on the two Sonnet document-writing calls.** `resume_author` took 1709s and emitted 180,266 output tokens, against a prior run on the pre-V2y prompt at 126s and roughly 20K output tokens including thinking. Those are two different multiples and should be quoted as two:

- **Output tokens: ~9x** (roughly 20K to 180,266).
- **Wall time: ~13.6x** (126s to 1709s).

The gap between them means effective throughput *fell* — about 159 tok/s before, about 105 tok/s during, both derived from the two recorded pairs rather than separately measured. The decisions record's own shorthand, "a ~9x thinking blowup", is the token figure; using it for latency understates the wall-clock damage by about half again. `resume_revise` was killed at its 1800s hard deadline in the same run. `resume_prepare` was normal, and `resume_check` — a bigger prompt on the GPT-family route — got *faster*, which is what rules out a provider or route problem.

**The fix, and what it does and does not establish.** V2z applied four deltas at once: both closing blocks cut to one-line reminders with an explicit "apply them as you draft; do not re-verify the finished document against them item by item"; every counting instruction replaced with a cheap proxy ("estimate by line count — the deterministic gate re-measures"); a downstream-gates statement written into both closing blocks; and the vendor's own thinking-steering framing added ("extended re-checking here adds latency without adding safety … when in doubt, finish directly"). Three of the four reverse the three diagnosed constructs; the fourth adds steering language that was not previously present in any position. No delta was shipped or measured alone.

**The V2z requalification, with latency as a gate** (recorded in the V2z commit message, `gsl` commit `6733f5f`, rather than in the decisions entry): 8/8 across the two repaired bundles — `resume_author` 4/4 in 1120s total, roughly 4.7 minutes per fixture, with a production-scale fixture added to the suite so the failure mode would have somewhere to detonate; `resume_revise` 4/4 in 589s total. Author *shadow cost* fell about 32% against V2y; revise's was flat. Shadow cost is the would-have-cost figure this project books for calls made over flat-rate subscription routes — nothing is billed, so the number is a spend proxy for comparing runs, not an invoice.

The honest outcome record is more modest than the diagnosis. The decisions record's later V3f entry, reviewing this fix as rung 1 of its escalation ladder, states that the V2z closing-block fixes together with a subsequent unit's delta framing *improved the median, not the tail* — `resume_revise` at high effort still ran 571 / 1148 / 1221s with two further production runs killed at the 1800s deadline. What finally removed that tail was an effort change, not a prompt change; see [[effort-conditioned-prompt-qualification]].

## Limitations

- **No causal ablation.** V2y changed a great deal at once and V2z reversed three of its constructs simultaneously, plus added a fourth. Which construct carried how much of the cost — the quantifier, the counting, the missing safety valve, or the recency position itself — was never isolated, because each production run is expensive and the incident was being repaired, not studied.
- **One production comparison, one direction.** The 126s/1709s pair is a single before-and-after on one call, not a distribution. The prior figure's token count is recorded as approximate ("~20K"), so the ~9x token multiple carries that imprecision and the derived throughput figures carry it twice.
- **Model-specific, and family-specific.** This was observed on one Sonnet revision at high reasoning effort. The GPT-family checker in the same pipeline, under its own restructure in the same unit, got faster. Nothing here establishes the failure mode for models whose thinking is not adaptively budgeted, or for the same model at lower effort — where the mechanism argument predicts the instructions become nearly free precisely because the budget cannot fund them.
- **The V2z improvement is not attributable to a single edit,** and it is smaller than the requalification suggests. The suite went 8/8 with latency gated and shadow cost down about a third on the author bundle — and the production tail on the revise bundle survived it, by the pipeline's own later record. A green suite with a production-scale fixture in it was still not sufficient evidence that the failure mode was gone. Treating this page's prescriptions as *proven* fixes overstates what the incident shows; they are the constructs a diagnosis implicated, repaired together, with a partial improvement following.
- The recency claim is an argument from position plus one interaction, not a measurement. No unit here moved one instruction from body to closing position with everything else held constant.

## Related

- [[effort-conditioned-prompt-qualification]] — the axis that eventually resolved this call's latency tail; the same prompt text at a lower thinking budget is a different system.
- [[context-collapse]] — the sibling failure of monolithic prompt rewrites; both argue for itemized, delta-based prompt maintenance.
- [[reasoning-budget-calibration]] — measure reasoning spend against the production baseline, not a convenient one.
- [[prompt-contingency]] — a prompt change can help one model and hurt another; the checker on another family got *faster* under its own restructure while this one exploded.
- [[answer-engineering]] — the deterministic gate that re-measures output is what makes "don't count, estimate" safe.
