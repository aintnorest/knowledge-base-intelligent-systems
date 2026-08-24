---
type: Synthesis
title: Complementary Failure Directions Under Downgrade
description: When cheaper model configurations are tried against one qualification suite, each may fail a different fixture in a different direction — and where that happens, the spread of directions is more informative than the pass counts, which a fail-fast harness leaves incomparable.
tags: [evaluation, routing, reliability, llm-as-judge, inference-efficiency]
timestamp: 2026-08-23T00:00:00Z
---

# Complementary Failure Directions Under Downgrade

A qualified model configuration is expensive, and the obvious question is whether something cheaper will do. Run the candidates against the same suite and the results may not line up as a quality ranking at all. In the matrix below, each cheaper configuration failed a *different* fixture, in a *different* direction — one got noisy, one went blind, one went blind earlier, one went provenance-blind. Where that spread appears it is a measurement result about the suite as much as about the models, and the direction of each failure, rather than the pass count, is what decides whether a candidate can be placed anywhere in the pipeline.

## The Pattern

1. A judgment-heavy call is qualified on a fixture suite that has grown one fixture at a time, each pinning a defect class that actually occurred: seeded overclaims, a leakage-bait draft, a severed-context regression, a clean-draft false-positive control.
2. The shipped configuration passes the whole suite. Cheaper candidates are then tried against it — a lower effort level on the same model, a smaller model at high effort, that model with more thinking, a different model entirely.
3. No candidate fails the same way. One flags a blocker on the clean control; one misses a real catch; one misses a different real catch; one passes the fixtures the others missed and then fails a fixture nobody else did.
4. Each result is legible as a distinct capability deficit: calibration (false positives against a threshold), recall (a real defect goes unseen), and provenance judgment (evidence whose standing depends on where it came from is misread).
5. The suite is fail-fast, so a candidate that fails fixture 4 has an untested tail behind it. "Cheaper and passed most fixtures" describes an interrupted experiment, not a result.

The rebuttal-shaped observation is the one to hold onto: in this matrix the four failures were complementary rather than correlated. If the suite were measuring one latent thing called "quality", weaker configurations would be expected to fail the same hardest fixture first. They did not, which is evidence consistent with the fixtures probing different behaviors — one round of it, on one suite.

## Why It Happens

A well-built suite accumulates around real incidents, and real incidents are not samples from one distribution. A false-positive control tests where a threshold sits. A seeded-defect fixture tests whether the defect is seen at all. A severed-context regression tests whether the model honors the *provenance* of a fact — that a claim traced to user confirmation is full-strength evidence and not a fabrication to flag. These are plausibly separable competencies, and a downgrade need not degrade them together.

Effort and quality are not obviously monotone either. More thinking gives a model more opportunity to talk itself out of a correct catch, and the extra deliberation may move where the suite cracks rather than pushing the crack later. A single observation of the same model failing *earlier* at a higher effort level is the most interesting thing in such a matrix and the least secure; it is a candidate refutation of "more effort is strictly better", not a finished one.

Latency is the least informative axis and the most seductive. A configuration an order of magnitude faster that also clears the fixtures its siblings missed looks like the obvious winner right up to the fixture that exposes what it does not understand about evidence.

## How To Work With It

- Read the failure direction before the pass count. **Noisy** (false positives on clean input) is the direction most plausibly survivable, since a human triage step or a corroboration rule sits between the finding and the artifact; **blind** (misses real defects) removes the reason the call exists; **provenance-blind** (misreads the standing of evidence by its source) is the most dangerous, because its output is confident, specific, and wrong in exactly the way the pipeline was built to prevent.
- Treat any such placement as a proposal to be tested, not a conclusion the matrix supports. That a noisy configuration *could* sit behind triage is an argument about the pipeline's shape; whether it actually holds requires qualifying the pair — configuration plus triage step — against the same suite. A matrix that only tells you how candidates fail alone has not evaluated any of them in a mitigated position.
- Never accept "cheaper and passed most fixtures" as a qualification argument. Under a fail-fast suite the pass counts alone were insufficient and are not comparable across untested tails: each candidate stopped at a different point, so the counts measure where each run halted, not how much each candidate can do.
- Treat a spread of failure directions across candidates as a positive signal about the suite, and a cluster on one fixture as a warning that the suite may be measuring one thing several times.
- Do not assume effort-up rescues a missed catch. Requalify the whole suite on the new effort level and compare *which* fixture cracks, not just how many passed. An earlier crack point at higher effort is a provisional result — worth acting on cautiously, worth a rerun before it is cited as a property of the model, and not yet reproduced here.
- Keep the false-positive control in the suite and keep it hard. It is the fixture that catches the cheap-and-fast candidate, and it is the one a suite of seeded defects would never contain on its own.
- When a candidate fails on provenance judgment, check whether the fixture it failed encodes a class the pipeline was *rebuilt* to fix. That is not a marginal miss; it is a proposal to reintroduce a solved failure.

## Evidence

First-party, GSL resume pipeline, the V2r-era effort/model trial on `resume_check` — the cross-family auditor that reads a drafted resume against its evidence packet and returns a claim audit with findings (`gsl` repo, `docs/resume-prompt-decisions.md`, the V2r matrix entry retro-recorded 2026-08-23; the 2026-08-14 graph-v2 entry records the severed-context failure the pipeline was rebuilt to fix, and the V3d and V3g entries record the nine-fixture suite passing 9/9 on the shipped configuration).

The suite is nine fixtures. Among them: seeded-defect catches, a leakage-bait draft, a **negative-scoping** case (the draft's summary discloses a true but self-limiting fact — "customer facing work is limited to a self-serve diagnostics tool" — instead of positioning the strength underneath it; a positioning defect that must be caught at `material` and must never be scored as a fabrication), a **dropped-evidence audit** (the posting names a success measure, the evidence packet supports it concretely, the alignment step even mapped it, and the draft omits it entirely — a `material` finding naming the omitted coverage), a severed-context regression (a claim grounded only in the owner's gap-gate confirmation is never an overclaim), and a clean-draft false-positive control. Baseline `gpt-5.6-sol` at high effort: 9/9. Four cheaper configurations were tried, one run each; each failed a different fixture in a different direction.

- **`sol` at medium effort — miscalibrated.** A blocker plus three material findings on the clean-draft control. Its fastest and cheapest call was the one it got wrong.
- **`gpt-5.6-luna` at high effort — blind.** Missed the example-leakage catch the baseline made.
- **`luna` at extra-high effort — blind earlier.** Missed a *different* catch, at an earlier fixture than the high-effort leg. More thinking appeared to move the crack point backwards; on one run each, this is a direction worth a rerun, not an established property.
- **`gpt-5.6-terra` at medium effort — provenance-blind.** Passed both fixtures the `luna` legs missed *and* the false-positive control, and was the fastest leg by a wide margin, then returned blocker findings on user-confirmed facts as fabrications — the exact severed-context class the pipeline's graph rebuild existed to eliminate. Note the direction carefully: the failure is *over-skepticism* about provenance, not credulity. The configuration did not believe too much; it refused to credit evidence whose standing came from the owner's own confirmation, which is the specific reading the auditor exists to get right.

Four candidates, four fixtures, four directions: calibration, recall, recall-under-more-deliberation, and evidence-provenance judgment. None of the four was placed. The decisions record states the reasoning directly: no leg's pass count was an argument, because the fail-fast tail behind each failure is untested. Terra is recorded as the interesting future candidate — its sole miss is prompt-addressable in principle — but as a new trial with full requalification, never a config flip.

## Limitations

- One suite, one job shape (a cross-family claim auditor), one round of candidates. The claim that downgrades fail on complementary axes is argued from a single well-instrumented matrix, not measured across pipelines — and the complementarity is what this matrix showed, not what downgrades must do.
- One run per configuration, on a fail-fast harness. Judgment fixtures near a decision boundary in this pipeline are documented to flake, so a single failure is a direction rather than an effect size, and the untested tail behind each failure is genuinely unknown.
- Effort levels are vendor-defined and not comparable across models or stable across revisions. "Medium" on one model and "medium" on another name budget policies, not quantities.
- The latency comparison rests on single-run, fixture-scale observations, with the fastest leg's headline figure coming from one fixture. It says the cheap candidate was much faster on this suite; it does not establish a production envelope.
- The placement guidance — noisy behind triage, blind never — is reasoning about the directions, not a tested result. No mitigated configuration was qualified.
- Complementary failures are evidence that a suite measures several things, not proof that it measures the *right* things. A suite grown from real incidents inherits whichever incidents happened to occur.

## Related

- [[effort-conditioned-prompt-qualification]] — the axis this page runs orthogonal to: the same model at a different effort is a different system, and here two efforts on one model failed at different points in the same suite.
- [[prompt-contingency]] — a prompt recipe is contingent on model and scoring; this is the qualification-side consequence, where one prompt's suite sorts candidate configurations by failure direction rather than by score.
- [[llm-as-judge-with-anti-inflation]] — judge calibration as a designed property; the medium-effort false positive is what an uncalibrated judge looks like from the suite's side.
- [[verification-centric-generated-review-evaluation]] — evaluating critique by evidence support and known-error detection is what makes the failure directions separable in the first place.
