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

## Staged Code Review and Diagnosis

**PR review.** Parallel agents can each search for a distinct class of bug. An evidence-verification step should come before severity ranking and publication, and generated critique must never grant approval. Anthropic reports around 20 minutes and $15–25 average cost per review, so extra stages must earn human-adjudicated gains in consequential defect finding. Give the reviewer and the reviser separate contracts: state each negative claim as a falsifiable issue, verify it independently before requesting a change, then check the revised patch. CodeAgent's QA-Checker keeps multi-role conversations on topic, but topical alignment is not correctness. Measure reviewer targeting, executor uptake, actual repair or damage, and added cost, not critique volume.

**Root-cause analysis.** Expose the evidence boundary before the model decides: timestamped anomaly cards, candidate components, topology, traces and selected log windows, followed by a bounded diagnosis and next checks. Audit candidate recall (was the true cause surfaced?) separately from discrimination (was it chosen?). On OpenRCA, EviRCA reaches 40.6–43.9% exact diagnosis but misses the true component in 89.6% of one network-failure subset. Practitioners at Westermo valued inspectable evidence and next steps but warned that a plausible wrong cause anchors investigation. A cited log makes a hypothesis inspectable; it does not prove it.

## Limitations

- Decomposition can distribute an error across several confident-looking stages rather than remove it.
- Retrieved literature and quoted passages can be incomplete, misread, or selected to support an early hypothesis.
- More stages increase latency, cost, and opportunities for prompt injection or state inconsistency.
- A traceable rationale is not proof that the model's visible intermediate text faithfully represents its internal computation.

## Sources

- [DeepReview dossier](/dossiers/deepreview-structured-llm-paper-review.md) — decomposes paper review into retrieval-grounded novelty verification, multidimensional review reconstruction, evidence-based reliability verification, and final meta-review synthesis.
- [Bringing Code Review to Claude Code dossier](/dossiers/claude-code-review.md) — parallel bug search, verification, ranking and human-only approval.
- [CodeAgent: Autonomous Communicative Agents for Code Review dossier](/dossiers/codeagent-communicative-code-review.md) — QA-Checker keeps conversations focused but is not a correctness oracle.
- [Reviewer Capability Governs Rejection Targeting, Not Repair Skill: Evidence from LLM Execute–Review–Revise Pipelines dossier](/dossiers/reviewer-capability-rejection-targeting.md) — separates reviewer targeting, uptake, repair and damage.
- [AI-powered Code Review with LLMs: Early Results dossier](/dossiers/ai-powered-code-review-early-results.md) — prompted multi-role review without validated staging.
- [EviRCA: Decoupling Evidence Extraction from Reasoning for Microservice Root-Cause Analysis dossier](/dossiers/evirca-microservice-root-cause-analysis.md) — deterministic evidence cards with measured candidate-coverage errors.
- [Supporting Industrial Test-Failure Analysis with LLM-Based Systems: An Experience Report dossier](/dossiers/westermo-llm-test-failure-analysis.md) — practitioner preference for evidence and next checks without verified ground truth.
