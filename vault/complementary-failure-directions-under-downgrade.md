---
type: Synthesis
title: Complementary Failure Directions Under Downgrade
description: When cheaper model configurations are tried against one qualification suite, each tends to fail a different fixture in a different direction — and that spread of directions is both evidence the suite measures something real and the fact that decides where, if anywhere, a downgrade can be placed.
tags: [evaluation, routing, reliability, llm-as-judge, inference-efficiency]
timestamp: 2026-08-23T00:00:00Z
---

# Complementary Failure Directions Under Downgrade

A qualified model configuration is expensive, and the obvious question is whether something cheaper will do. Run the candidates against the same suite and the results rarely line up as a quality ranking. Each cheaper configuration fails a *different* fixture, in a *different* direction — one gets noisy, one goes blind, one gets credulous. The pattern is a measurement result about the suite as much as about the models, and the direction of each failure, not the pass count, is what decides whether a candidate can be placed anywhere in the pipeline.

## The Pattern

1. A judgment-heavy call is qualified on a fixture suite that has grown one fixture at a time, each pinning a defect class that actually occurred: seeded overclaims, a leakage-bait draft, a severed-context regression, a clean-draft false-positive control.
2. The shipped configuration passes the whole suite. Cheaper candidates are then tried against it — a lower effort level on the same model, a smaller model at high effort, that model with more thinking, a different model entirely.
3. No candidate fails the same way. One flags a blocker on the clean control; one misses a real catch; one misses a different real catch; one passes the fixtures the others missed and then fails a fixture nobody else did.
4. Each result is legible as a distinct capability deficit: calibration (false positives against a threshold), recall (a real defect goes unseen), and provenance judgment (evidence whose standing depends on where it came from is misread).
5. The suite is fail-fast, so a candidate that fails fixture 4 has an untested tail behind it. "Cheaper and passed most fixtures" describes an interrupted experiment, not a result.

The rebuttal-shaped observation is the one to hold onto: the four failures are complementary rather than correlated. If the suite were measuring one latent thing called "quality", weaker configurations would fail the same hardest fixture first. They did not, which is evidence the fixtures pin separate capabilities.

## Why It Happens

A well-built suite accumulates around real incidents, and real incidents are not samples from one distribution. A false-positive control tests where a threshold sits. A seeded-defect fixture tests whether the defect is seen at all. A severed-context regression tests whether the model honors the *provenance* of a fact — that a claim traced to user confirmation is full-strength evidence and not a fabrication to flag. These are separable competencies, and a downgrade does not degrade them together.

Effort and quality are not monotone either. More thinking gives a model more opportunity to talk itself out of a correct catch, and the extra deliberation can move where the suite cracks rather than pushing the crack later — the same model at a higher effort level failing *earlier* in the suite is the cleanest available refutation of "more effort is strictly better."

Latency is the least informative axis and the most seductive. A configuration an order of magnitude faster that also clears the fixtures its siblings missed looks like the obvious winner right up to the fixture that exposes what it does not understand about evidence.

## How To Work With It

- Read the failure direction before the pass count. **Noisy** (false positives on clean input) is placeable behind a human triage step or a corroboration rule; **blind** (misses real defects) removes the reason the call exists; **credulous about provenance** (misreads where evidence came from) is the most dangerous, because its output is confident, specific, and wrong in exactly the way the pipeline was built to prevent.
- Never accept "cheaper and passed most fixtures" as a qualification argument. Under a fail-fast suite the untested tail is unknown, and the fixtures a candidate never reached are not evidence of anything.
- Treat a spread of failure directions across candidates as a positive result about the suite, and a cluster on one fixture as a warning that the suite may be measuring one thing several times.
- Do not assume effort-up rescues a missed catch. Requalify the whole suite on the new effort level and compare *which* fixture cracks, not just how many passed. An earlier crack point at higher effort is a real result, not a flake, until a rerun says otherwise.
- Keep the false-positive control in the suite and keep it hard. It is the fixture that catches the cheap-and-fast candidate, and it is the one a suite of seeded defects would never contain on its own.
- When a candidate fails on provenance judgment, check whether the fixture it failed encodes a class the pipeline was *rebuilt* to fix. That is not a marginal miss; it is a proposal to reintroduce a solved failure.

## Evidence

First-party, GSL resume pipeline, the V2r-era effort/model trial on `resume_check` — the cross-family auditor that reads a drafted resume against its evidence packet and returns a claim audit with findings (`gsl` repo, `docs/resume-prompt-decisions.md`; the 2026-08-14 graph-v2 entry records the severed-context failure the pipeline was rebuilt to fix, and the V3d and V3g entries record the nine-fixture suite passing 9/9 on the shipped configuration).

The suite is nine fixtures: seeded-defect catches, a leakage-bait draft, a negative-scoping case, a dropped-evidence audit, a severed-context regression (a claim traced to user confirmation is never an overclaim), and a clean-draft false-positive control. Baseline `gpt-5.6-sol` at high effort: 9/9. Four cheaper configurations were tried; each failed a different fixture in a different direction.

- **`sol` at medium effort — miscalibrated.** False-positive blockers on the clean-draft control. Its fastest and cheapest call was the one it got wrong.
- **`gpt-5.6-luna` at high effort — blind.** Missed a real contamination catch the baseline made.
- **`luna` at extra-high effort — blind earlier.** Missed a *different* catch, at an earlier fixture than the high-effort leg. More thinking moved the crack point backwards; effort is not a monotone quality dial.
- **`gpt-5.6-terra` at medium effort — credulous about provenance.** Passed both fixtures the `luna` legs missed *and* the false-positive control, at roughly a tenth the baseline's latency, then returned blocker findings on user-confirmed facts as fabrications — the exact severed-context class the pipeline's graph rebuild existed to eliminate.

Four candidates, four fixtures, four directions: calibration, recall, recall-under-more-deliberation, and evidence-provenance judgment. None of the four was placed. The pass counts were similar and told nothing; the directions decided it.

## Limitations

- One suite, one job shape (a cross-family claim auditor), one round of candidates. The claim that downgrades fail on complementary axes is argued from a single well-instrumented matrix, not measured across pipelines.
- One run per configuration, on a fail-fast harness. Judgment fixtures near a decision boundary in this pipeline are documented to flake, so a single failure is a direction rather than an effect size, and the untested tail behind each failure is genuinely unknown.
- Effort levels are vendor-defined and not comparable across models or stable across revisions. "Medium" on one model and "medium" on another name budget policies, not quantities.
- The latency ratio is a single-run observation on fixture-scale inputs. It says the cheap candidate was much faster on this suite; it does not establish a production envelope.
- Complementary failures are evidence that a suite measures several things, not proof that it measures the *right* things. A suite grown from real incidents inherits whichever incidents happened to occur.

## Related

- [[effort-conditioned-prompt-qualification]] — the axis this page runs orthogonal to: the same model at a different effort is a different system, and here two efforts on one model failed at different points in the same suite.
- [[prompt-contingency]] — a prompt recipe is contingent on model and scoring; this is the qualification-side consequence, where one prompt's suite sorts candidate configurations by failure direction rather than by score.
- [[llm-as-judge-with-anti-inflation]] — judge calibration as a designed property; the medium-effort false positive is what an uncalibrated judge looks like from the suite's side.
- [[verification-centric-generated-review-evaluation]] — evaluating critique by evidence support and known-error detection is what makes the failure directions separable in the first place.
