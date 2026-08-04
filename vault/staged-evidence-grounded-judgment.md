---
type: Synthesis
title: Staged Evidence-Grounded Judgment
description: Decomposing a consequential evaluation into scoped analysis stages, evidence verification, and final synthesis so the verdict is downstream of inspectable support rather than a single direct model judgment.
tags: [llm-as-judge, evaluation, decomposition, verification, peer-review]
timestamp: 2026-07-28T21:39:03Z
---

# Staged Evidence-Grounded Judgment

A staged evidence-grounded judge does not move directly from an artifact to a score. It produces bounded intermediate analyses, checks substantive criticisms against the artifact, and only then synthesizes a verdict. The aim is to make the final judgment depend on inspectable support while giving different evaluation jobs their own retrieval and verification procedures.

## Pattern

1. Define distinct evaluation stages that match the decision, such as external novelty, multidimensional quality, and internal reliability.
2. Give each stage its own evidence boundary and tools. Novelty may require literature retrieval, while a methodological criticism should be grounded in the evaluated artifact.
3. Convert broad criticisms into checkable claims and attach source passages, missing evidence, and confidence.
4. Reconcile conflicting or unsupported intermediate findings before scoring.
5. Synthesize the final assessment from the verified stage outputs, preserving enough provenance for a human to inspect the path.

## Practical Use

Use this pattern for paper review, code review, diligence, policy assessment, and other consequential judgments where a fluent direct verdict can conceal shallow analysis. Keep stage outputs structured and bounded; require evidence for negative claims; and evaluate whether each added stage improves decision quality enough to justify its cost.

This is an execution pattern for producing a judgment. It complements [Verification-Centric Generated-Review Evaluation](/vault/verification-centric-generated-review-evaluation.md), which describes how to evaluate whether a generated critique is actually reliable.

## Limitations

- Decomposition can distribute an error across several confident-looking stages rather than remove it.
- Retrieved literature and quoted passages can be incomplete, misread, or selected to support an early hypothesis.
- More stages increase latency, cost, and opportunities for prompt injection or state inconsistency.
- A traceable rationale is not proof that the model's visible intermediate text faithfully represents its internal computation.

## Sources

- [DeepReview dossier](/dossiers/deepreview-structured-llm-paper-review.md) — decomposes paper review into retrieval-grounded novelty verification, multidimensional review reconstruction, evidence-based reliability verification, and final meta-review synthesis.
