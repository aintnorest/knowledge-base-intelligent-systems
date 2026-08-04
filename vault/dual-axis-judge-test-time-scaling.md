---
type: Synthesis
title: Dual-Axis Judge Test-Time Scaling
description: Scaling an evaluator independently through deeper reasoning paths and wider ensembles of perspectives, then selecting the least costly combination that meets the decision-quality target.
tags: [llm-as-judge, test-time-scaling, reasoning, evaluation]
timestamp: 2026-07-28T21:39:03Z
---

# Dual-Axis Judge Test-Time Scaling

An LLM judge can spend additional inference compute along two different axes. **Depth scaling** executes more stages or a longer reasoning path for one assessment. **Width scaling** generates multiple reviewer perspectives and aggregates them. These controls address different failure modes and should be calibrated independently rather than collapsed into one token budget.

## Pattern

1. Define a small set of depth modes, from direct assessment to full retrieval and evidence verification.
2. Define a bounded ensemble width for independent perspectives or reviewers.
3. Hold the evaluation set and outcome metrics constant while sweeping depth, width, output tokens, latency, and cost.
4. Inspect task slices separately: score estimation, ranking, pairwise choice, factual critique, and safety may respond differently.
5. Route each case to the least expensive depth-width combination that meets its reliability target, escalating uncertain or consequential cases.

## Practical Use

Depth is useful when a judgment needs sequential evidence gathering or verification. Width is useful when independent viewpoints reduce variance or expose different weaknesses. Combine them only when the measured benefit exceeds the added cost; a wide set of shallow reviewers and one deep reviewer are not interchangeable.

This pattern specializes [Reasoning-Budget Calibration](/vault/reasoning-budget-calibration.md) for evaluators by treating perspective count as a separate control from reasoning-path length.

## Limitations

- Additional reviewers may be correlated because they share a model, prompt, training distribution, or retrieval corpus.
- Aggregation can suppress a correct minority critique in favor of a plausible consensus.
- More compute does not guarantee monotonic improvement; results can depend on the ensemble size seen during training.
- Token counts are an operational proxy, not a direct measure of useful reasoning.

## Sources

- [DeepReview dossier](/dossiers/deepreview-structured-llm-paper-review.md) — evaluates Fast, Standard, and Best reasoning paths alongside one-to-six simulated reviewers, with different gains across scoring, ranking, and pairwise selection.
