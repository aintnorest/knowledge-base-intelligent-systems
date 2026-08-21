---
type: Synthesis
title: Effort-Conditioned Prompt Qualification
description: Reasoning effort belongs to a prompt's deployment identity — the same model and prompt text behave like different systems at different effort levels, so prompt and effort must be qualified together and requalified whenever either moves.
tags: [prompting, reasoning, evaluation, reliability, inference-efficiency]
timestamp: 2026-08-21T00:00:00Z
---

# Effort-Conditioned Prompt Qualification

The thing you are actually prompting is not the model name. It is (model × reasoning effort × job shape). Moving only the effort dial — same weights, same prompt text, same inputs — changes which prompt constructs are cheap and which are latency bombs, and it flips the direction the system fails in. A prompt qualified at one effort level is unqualified at another, exactly as it would be on a different model.

## The Pattern

1. A prompt is written and qualified at one effort level. Fixtures pass, and the wording is filed away as a property of the prompt and the model.
2. Effort later moves — up for quality, down for latency or cost — or the same prompt text is reused in a bundle configured differently.
3. Instruction shapes whose cost scales with the granted thinking budget change behavior discontinuously. Verification protocols, universal quantifiers ("for every section, every bullet"), and literal counting are nearly free at low effort, because the model has no budget to execute them honestly, and quadratic at high effort, where it does.
4. The failure direction flips with the dial. High effort over-verifies: latency tails, deliberation explosions, exhaustive re-checking of finished work. Low effort under-discriminates: judgment-heavy calls get coarser, and the fastest, cheapest call is the one that is wrong.
5. Job shape decides which end bites. A job holding many simultaneous invariants over a whole document is the high-effort risk. A job requiring calibrated judgment against a threshold is the low-effort risk. The same effort change is a fix on one and a regression on the other.

## Why It Happens

Effort is the thinking-volume knob, and prompt instructions are not executed at fixed cost — they are executed as far as the budget allows. "Verify, for every section, every role, and every bullet" is a bounded gesture with little budget and an O(items × units) audit loop with a lot of it. Judgment rules run the opposite way: telling a real blocker from a plausible-looking one is deliberation the budget has to fund, so cutting the budget cuts the discrimination first.

Model swaps do not sit on this axis at all. A different model at the same effort changes learned dispositions — literalism, scope discipline, what it treats as license to edit — which is why "swap the model" and "move the dial" fail in unrelated ways and cannot stand in for each other.

## How To Work With It

- Treat effort as part of the prompt's identity. Record it beside the prompt and requalify the full suite on any effort change. An empty prompt diff is not evidence of unchanged behavior.
- Write verification language against the effort level it will run at. At high effort, closing blocks are one-line reminders plus an explicit "apply these as you draft; do not re-verify the finished document item by item" and a statement that deterministic gates re-measure downstream.
- When a latency tail appears, effort-down on the unchanged prompt is the cheaper first experiment: one reversible line, a measurable suite result, and none of the dispositional risk a model swap carries.
- When a judgment-calibration failure appears — false positives, missed severity, threshold sloppiness — reach for effort-up or a model change, not prompt patches alone. A prompt cannot buy discrimination the budget does not fund.
- Gate qualification on wall time and token volume as well as correctness. The effort axis is invisible to a correctness-only suite.
- Expect job-shape asymmetry inside one pipeline. Two bundles on the same model may need different dials, and homogenizing effort across a pipeline for tidiness is a simultaneous change to every prompt in it.

## Evidence

First-party, GSL resume pipeline (`gsl` repo, `docs/resume-prompt-decisions.md`, entries V2z and V3f):

- **Same model, same prompt, effort as the variable.** On Claude Sonnet 5 at high effort, a document-revision restructure whose closing block was a quantified verification checklist with literal word-counting instructions produced a ~9x deliberation explosion (126s → 1709s, ~20k → 180k output tokens); a sibling call was killed at its 1800s deadline. The same constructs had been survivable in earlier body-position wording at lower thinking volume. The V2z fix was prompt-side and effort-aware: reminders not protocols, estimation not counting, an explicit "you are not the last line of defense." See [[recency-checklist-deliberation-explosion]] for the mechanism in full.
- **Effort-down as the tail fix.** After those fixes, `resume_revise` at high still ran 571 / 1148 / 1221s with two production runs killed at the 1800s deadline, while `resume_author` on the same model and effort stayed at ~400-455s — the tail tracked job shape (many simultaneous invariants over a whole document) crossed with effort, not the provider or the route. Dropping only `reasoning_effort` to medium — same model, same prompt text, zero prompt changes — passed the four-fixture qualification suite 4/4 on the first attempt at roughly half the wall time (49-116s per fixture against a ~10 min suite at high). Medium is the shipped configuration for that bundle only.
- **A model swap fails on a different axis.** Opus at high effort on the same bundle and prompt failed qualification twice, both times for scope discipline: it deleted an entire document section unprompted during minimal-diff rounds, reading job-scoped trimming guidance as general license. Its latency was excellent (~77-100s per fixture). Speed was never its problem; disposition was.
- **Effort-down as a regression elsewhere.** The pipeline's cross-family reviewer (`gpt-5.6-sol` via codex) is calibrated and shipped at high effort; observed at medium it produced false-positive blockers on a clean document — its fastest, cheapest call was the one it got wrong. Same dial, opposite sign, different job shape.

## Limitations

- The medium revision configuration is qualified at fixture scale only. Its production envelope is extrapolated from the 49-116s fixture range, not measured at production input sizes — and the standing caveat from the same incident is exactly that fixtures are too small to trigger production-scale deliberation. The mechanism (effort is the thinking-volume knob) is the reason to expect the tail to be gone; the first production runs are what would confirm it.
- The reviewer-at-medium false positive is a single observed run, not a qualification suite. Treat it as a direction, not an effect size.
- Effort levels are vendor-defined, not comparable across providers, and not stable across model revisions. "Medium" names a budget policy, not a quantity.
- One pipeline, one family of document-writing jobs. That effort belongs in the prompt's identity is a discipline argued from a small number of expensive incidents, not a measured law.

## Related

- [[recency-checklist-deliberation-explosion]] — the concrete high-effort failure this generalizes; prompt constructs that only detonate when the budget can execute them.
- [[reasoning-budget-calibration]] — the loop for choosing a budget; this page adds that the prompt is not held constant while the budget moves.
- [[prompt-contingency]] — the same argument one axis over: a prompt recipe is contingent on model, task, and scoring, and effort is a contingency the recipe must name.
- [[model-aware-harness-design]] — per-model prompt adaptation under a shared contract; effort is a per-bundle configuration governed by the same rule, and one that fails differently from a model change.
