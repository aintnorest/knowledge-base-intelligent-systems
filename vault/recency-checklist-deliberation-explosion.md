---
type: Synthesis
title: Recency-Checklist Deliberation Explosion
description: Failure mode where a closing verification checklist plus literal counting instructions cause a literal, high-effort reasoning model to re-verify exhaustively in thinking, multiplying latency and token spend ~9x at production input sizes while small evals pass.
tags: [prompting, reasoning, agent-harness, evaluation]
timestamp: 2026-08-19T00:00:00Z
---

# Recency-Checklist Deliberation Explosion

A failure mode in single-shot task prompts for literal, high-effort reasoning models (observed on Claude Sonnet 5): instructions placed in the prompt's highest-attention closing position that ask the model to *verify* or *count* things about its own output trigger exhaustive in-thinking re-verification whose cost scales with output size — invisible on small eval inputs, explosive at production scale.

## The Pattern

1. A long task prompt is restructured per best practice: critical invariants restated in a closing block (recency position).
2. The closing block is phrased as a verification protocol — "Before you finish, verify, for every section, every role, and every bullet: [13 items]" — rather than as reminders.
3. One or more items demand literal arithmetic over the output ("count your output's words; if over, compress and recount").
4. The model, being documented-literal at high reasoning effort, executes the protocol in extended thinking: every item × every unit of the document, sometimes across multiple count/edit/recount cycles.
5. Qualification evals pass — fixtures are small, so the multiplication never detonates. In production (full-size document, real findings), generation volume explodes: observed 126s → 1709s wall clock and ~20k → 180k output tokens on the same task, with normal per-token throughput (~105 tok/s). A sibling call was killed at its 30-minute deadline.

Three compounding sub-causes observed: (a) the universal quantifier over the checklist ("every X, not just the first"); (b) literal counting duplicated into both body and closing positions; (c) removal of a "downstream audits run after you" clause, making the model believe it is the last line of defense — precisely when a high-effort model verifies hardest.

## Why It Happens

Recency placement maximizes compliance — including compliance with instructions whose honest execution is O(items × document units). Vendor-documented literalism ("does not silently generalize; state scope explicitly") cuts both ways: explicit scope makes the model actually do the quadratic work. Adaptive thinking at high effort gives it the budget to try. Small-input evals structurally cannot catch it because the cost term scales with output size, not correctness.

## How To Avoid It

- Closing blocks carry *reminders*, never verification protocols: one line per fatal invariant, plus "apply these as you draft; do not re-verify the finished document item by item."
- Never ask a model to count what infrastructure can measure. Replace "count your words" with "estimate by line count — the deterministic gate re-measures downstream."
- Keep (or restore) an explicit safety valve naming the downstream checks: "you are not the last line of defense; extended re-checking here adds latency without adding safety; when in doubt, finish directly."
- Gate prompt qualification on *wall time and token volume per fixture*, not correctness alone — and include at least one production-scale fixture, because that is where this failure lives.
- After any prompt restructure, compare production step records (elapsed, output tokens) against the prior version's; a same-throughput, higher-volume signature distinguishes deliberation growth from a slow provider.

## Evidence

First-party incident, GSL resume workflow, 2026-08-18/19: prompt restructure V2y → author call 1709s / 180,266 output tokens (prior: 126s / ~20k); revise call killed at 1800s hard deadline; prepare (lightly restructured, same model/effort/run) and the GPT-family checker unaffected. Delta fix V2z (reminders-not-protocols, estimation-not-counting, restored safety valve) requalified 8/8 with the production-scale fixture at ~5 min and shadow cost −32%. Full incident record: `gsl` repo, `docs/resume-prompt-decisions.md` (V2z entry).

## Related

- [[context-collapse]] — the sibling failure of monolithic prompt rewrites; both argue for itemized, delta-based prompt maintenance.
- [[reasoning-budget-calibration]] — measure reasoning spend against the production baseline, not a convenient one.
- [[prompt-contingency]] — a prompt change can help one model and hurt another; the checker on another family got *faster* under its own restructure while this one exploded.
- [[answer-engineering]] — the deterministic gate that re-measures output is what makes "don't count, estimate" safe.
