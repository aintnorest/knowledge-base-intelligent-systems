---
type: Synthesis
title: Effort-Conditioned Prompt Qualification
description: Reasoning effort belongs to a prompt's deployment identity — the same model and prompt text behave like different systems at different effort levels, so prompt and effort must be qualified together and requalified whenever either moves.
tags: [prompting, reasoning, evaluation, reliability, inference-efficiency]
timestamp: 2026-08-21T00:00:00Z
---

# Effort-Conditioned Prompt Qualification

The thing you are actually prompting is not the model name. It is (model × reasoning effort × job shape). Moving only the effort dial — same weights, same prompt text, same inputs — changes which prompt constructs are cheap and which are latency bombs, and it can flip the direction the system fails in. A prompt qualified at one effort level requires the same requalification discipline at another that it would on a different model, although the mechanism differs: an effort change moves how much deliberation the model can fund, while a model change moves its learned dispositions.

## The Pattern

1. A prompt is written and qualified at one effort level. Fixtures pass, and the wording is filed away as a property of the prompt and the model.
2. Effort later moves — up for quality, down for latency or cost — or the same prompt text is reused in a call configured differently.
3. Instruction shapes whose cost scales with the granted thinking budget change behavior. Verification protocols, universal quantifiers ("for every section, every bullet"), and literal counting are expensive to execute honestly only where there is budget to execute them; the proposed mechanism is that a small budget forces the model to gesture at them and a large one lets it perform them in full.
4. The failure direction can flip with the dial. High effort over-verifies: latency tails, deliberation explosions, exhaustive re-checking of finished work. Low effort under-discriminates: judgment-heavy calls get coarser, and the fastest, cheapest call is the one that is wrong.
5. Job shape decides which end bites. A job holding many simultaneous invariants over a whole document is the high-effort risk. A job requiring calibrated judgment against a threshold is the low-effort risk. The same effort change can be a fix on one and a regression on the other.

## Why It Happens

Effort is the thinking-volume knob, and prompt instructions are not executed at fixed cost — the working hypothesis is that they are executed as far as the budget allows. "Verify, for every section, every role, and every bullet" is a bounded gesture with little budget and an items × units × passes audit loop with a lot of it. Judgment rules plausibly run the opposite way: telling a real blocker from a plausible-looking one is deliberation the budget has to fund, so cutting the budget should cut the discrimination first.

Both halves of that account are mechanism, not measurement. What has been observed here is the *outcome* pattern — a construct that was survivable at one budget and ruinous at another, a judgment call that got noisier when its budget was cut. No run in this evidence held a single instruction constant across three effort levels and measured the cost curve, so "nearly free at low effort, multiplicative at high" is the explanation being carried, not a demonstrated relationship.

Model swaps do not sit on this axis at all. A different model at the same effort changes learned dispositions — literalism, scope discipline, what it treats as license to edit — which is why "swap the model" and "move the dial" fail in unrelated ways and cannot stand in for each other.

## How To Work With It

- Treat effort as part of the prompt's identity. Record it beside the prompt and requalify the full suite on any effort change. An empty prompt diff is not evidence of unchanged behavior.
- Write verification language against the effort level it will run at. At high effort, closing blocks are one-line reminders plus an explicit "apply these as you draft; do not re-verify the finished document item by item" and a statement that deterministic gates re-measure downstream.
- When a latency tail appears, effort-down on the unchanged prompt is the cheaper first experiment: one reversible line, a measurable suite result, and none of the dispositional risk a model swap carries.
- When a judgment-calibration failure appears — false positives, missed severity, threshold sloppiness — consider effort-up or a model change alongside prompt work rather than prompt patches alone. Some discrimination failures are budget-starved and prompt wording will not fund them; others are genuine underspecification, where naming the threshold or the direction of the defect is exactly the fix. Establish which kind you have before spending on the dial.
- Gate qualification on wall time and token volume as well as correctness. The effort axis is invisible to a correctness-only suite.
- Expect job-shape asymmetry inside one pipeline. Two calls on the same model may need different dials, and homogenizing effort across a pipeline for tidiness is a simultaneous change to every prompt in it.
- Compare suites to suites and fixtures to fixtures. An effort change's headline number is easy to inflate by measuring per-fixture time against a whole-suite total.

## Evidence

First-party, GSL resume pipeline (`gsl` repo, `docs/resume-prompt-decisions.md`, entries V2z and V3f). The pipeline is a chain of separately-configured model calls; each is a **bundle** — a prompt, its input and output schemas, its fixtures, and its model configuration, versioned as one unit — dispatched over a **route**, the provider-and-model string that names where the call runs (`cli:claude/sonnet`, `cli:codex/gpt-5.6-sol`). `resume_author` drafts the tailored resume; `resume_revise` folds review findings back into that draft under minimal-diff, compression, or page-fit rules depending on the round. Both run on Claude Sonnet 5; the cross-family auditor between them runs on the codex route.

- **Same model, same prompt, effort as the variable.** At high effort, a restructure whose closing block was a quantified verification checklist with literal word-counting instructions produced a deliberation explosion on `resume_author`: output tokens grew about 9x (roughly 20K to 180,266) while wall time grew about 13.6x (126s to 1709s) — two different multiples, and quoting the token figure for both understates the latency damage. `resume_revise` was killed at its 1800s deadline in the same run. The same constructs had been survivable in earlier body-position wording at lower thinking volume. The V2z fix was prompt-side and effort-aware: reminders not protocols, estimation not counting, an explicit "you are not the last line of defense." See [[recency-checklist-deliberation-explosion]] for the mechanism in full, and for why that fix improved the median without removing the tail.
- **Effort-down as the tail fix.** After those fixes, `resume_revise` at high still ran 571 / 1148 / 1221s with two production runs killed at the 1800s deadline, while `resume_author` on the same model and effort stayed at ~400-455s — the tail tracked job shape (many simultaneous invariants over a whole document) crossed with effort, not the provider or the route. Dropping only `reasoning_effort` to medium — same model, same prompt text, zero prompt changes — passed the four-fixture qualification suite 4/4 on the first attempt. Compared suite to suite, that is **~5.5 minutes of wall time at medium against ~10.1-10.5 minutes at high** on the same four fixtures; per fixture, 49-116s at medium. Medium is the shipped configuration for that bundle only.
- **A model swap fails on a different axis.** Opus at high effort on the same bundle and prompt failed qualification twice, both times for scope discipline: it deleted an entire document section unprompted during minimal-diff rounds, reading job-scoped trimming guidance as general license. Its latency was excellent (~77-100s per fixture). Speed was never its problem; disposition was.
- **Effort-down as a regression elsewhere.** The pipeline's cross-family reviewer (`gpt-5.6-sol` via codex) is calibrated and shipped at high effort; observed at medium it produced false-positive blockers on a clean document — its fastest, cheapest call was the one it got wrong. Same dial, opposite sign, different job shape. Three further downgrade candidates on that same bundle each failed a different fixture in a different direction; see [[complementary-failure-directions-under-downgrade]].
- **First production run at medium, with a weaker anchor than the rest of this page.** The first production run after medium shipped on `resume_revise` is recorded as 530s against roughly 55k output tokens. That observation is **not in any committed document** in the `gsl` repo: it comes from the application's production run store, which is where per-step elapsed times and token counts durably live, and no decisions entry or commit message carries it. What *is* committed is the envelope it was checked against — the V3f entry's extrapolated 300-900s, restated as the standing comment on the bundle's `reasoning_effort` line in `parts/bundles/resume_revise/bundle.toml`. Read at that strength, the run landed inside the predicted envelope and did not reproduce the deadline kills seen at high (571 / 1148 / 1221s plus two runs killed at 1800s, at 118-128k output tokens). One run is not a distribution, and the V3f entry's own instruction was that the *first production runs* — plural — must confirm the tail; more runs are needed before the tail can be called gone.

## Limitations

- The medium revision configuration was qualified at fixture scale only, and its production envelope was extrapolated from the 49-116s fixture range rather than measured — the standing caveat from the same incident being that fixtures are too small to trigger production-scale deliberation. The single production run since is consistent with the extrapolation and is one observation, from an uncommitted run store, of direction and magnitude only.
- The reviewer-at-medium false positive is a single observed run, not a qualification suite. Treat it as a direction, not an effect size.
- No cost-curve measurement anywhere in this evidence. Every claim about *why* effort changes behavior is mechanism reasoning over outcome observations, with the confound that job shape and effort moved together in the cases where the direction flipped.
- Effort levels are vendor-defined, not comparable across providers, and not stable across model revisions. "Medium" names a budget policy, not a quantity.
- One pipeline, one family of document-writing jobs. That effort belongs in the prompt's identity is a discipline argued from a small number of expensive incidents, not a measured law.

## Related

- [[recency-checklist-deliberation-explosion]] — the concrete high-effort failure this generalizes; prompt constructs that only detonate when the budget can execute them.
- [[reasoning-budget-calibration]] — the loop for choosing a budget; this page adds that the prompt is not held constant while the budget moves.
- [[prompt-contingency]] — the same argument one axis over: a prompt recipe is contingent on model, task, and scoring, and effort is a contingency the recipe must name.
- [[model-aware-harness-design]] — per-model prompt adaptation under a shared contract; effort is a per-bundle configuration governed by the same rule, and one that fails differently from a model change.
