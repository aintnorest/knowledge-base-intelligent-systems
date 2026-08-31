---
type: Synthesis
title: Paraphrase–Adversarial Evaluator Validation
description: Validating an automatic evaluator with a two-sided test — invariance under meaning-preserving paraphrase and measurable degradation under semantic corruption — since either property alone is trivially gameable.
tags: [evaluation, llm-as-judge, adversarial-robustness, verification]
timestamp: 2026-08-25T00:00:00Z
---

# Paraphrase–Adversarial Evaluator Validation

Correlation with a gold metric is not enough to trust an evaluator. Two further properties must hold *simultaneously*, and testing them together is what makes the test informative:

- **Invariance**: rewording an input without changing its meaning should not move the score.
- **Sensitivity**: corrupting the input's meaning should move the score, downward, by a visible margin.

Each half alone is trivial to pass. A constant function is perfectly invariant. A lexical-diff scorer is exquisitely sensitive. Only an evaluator that is stable on one axis and responsive on the other is tracking semantics rather than surface form.

## Protocol

1. Sample a fixed instance set spanning the task types the evaluator will see.
2. For each instance generate (a) several meaning-preserving paraphrases that hold numbers, named entities, and task semantics constant, and (b) several semantic corruptions of distinct kinds — misleading, contradictory, underspecified, and instruction-subverting variants each fail differently.
3. Run the full pipeline per variant, generating a fresh output rather than reusing the original one. Testing the evaluator in isolation misses how corruption propagates.
4. For paraphrases, report within-set score variance and a **robustness rate**: the fraction of instances whose paraphrase set stays within a declared variance and max-deviation bound. Publish the threshold — a robustness rate without its threshold is not a number.
5. For corruptions, report the mean score change per corruption type, separately for the input-side and output-side rubrics if both exist.
6. Repeat across every evaluator model you might deploy. Sensitivity is not a property of the protocol; it is a property of the protocol *and* the model running it.

## What the Results Tell You

Corruption types are not interchangeable and should never be averaged into one number. Instruction-subverting inputs in particular can *raise* input-side quality scores — a jailbreak reads as clear and directive — while collapsing output quality. Averaging that in would cancel out a real detection.

Cross-evaluator spread is the finding practitioners most need. An evaluator can reproduce the reference ranking faithfully and still barely register semantic corruption: small open-weight judges have shown score movements near −0.05 to −0.10 where frontier judges show −0.4 to −0.8 on the same manipulations. Ranking agreement does not imply shared sensitivity, so an evaluator swap justified on ranking grounds can silently remove your adversarial detection.

## Practical Use

- Run this before adopting a cheaper evaluator, not only when introducing a new rubric.
- Use the sensitivity margins to set alerting thresholds: a corruption that moves the score less than paraphrase noise is undetectable in production regardless of what the study reports.
- Keep the paraphrase and corruption sets versioned alongside the rubric. Both are part of the evaluator's specification.

## Limitations

- LLM-generated paraphrases are not guaranteed meaning-preserving, and LLM-generated corruptions are not guaranteed meaning-breaking. Spot-check both sets by hand; errors here contaminate both metrics.
- The robustness rate depends entirely on a chosen threshold and is not comparable across studies that pick different ones.
- Invariance and sensitivity trade off. An evaluator weighting semantics heavily over form scores high on paraphrase stability and may under-react to stylistic degradation; the right balance depends on whether the deployment cares more about consistency or about catching subtle drift.
- The test covers the corruption types you thought to generate. It bounds detection of known failure modes, not of unknown ones.

## Sources

- [PEEM dossier](/dossiers/peem-prompt-engineering-evaluation-metrics.md) — reports paraphrase robustness rates of 76.7–80.6% alongside per-type adversarial score deltas across three evaluator models, exposing both the jailbreak inversion and the sensitivity gap between small and frontier evaluators.
