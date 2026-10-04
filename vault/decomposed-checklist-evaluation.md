---
type: Synthesis
title: Decomposed Checklist Evaluation
description: Replace opaque quality ratings with explicit criterion-level decisions while keeping construct design, aggregation, and judge-call partitioning separate.
tags: [llm-as-judge, evaluation, decomposition, reliability]
timestamp: 2026-10-04T06:41:38Z
---

# Decomposed Checklist Evaluation

A checklist evaluator turns a broad quality judgment into narrow, observable questions and explicitly records whether each criterion is met. Aggregation then exposes how the final score arose. The mechanism reduces ambiguity in both the construct being judged and the response scale; it does not make the model an independent source of truth.

## The Pattern

1. Define the intended construct and its distinct requirements before generating questions.
2. Write questions whose positive answers consistently mean that a requirement was satisfied. Remove overlaps, irrelevant criteria, and assumptions about unavailable evidence or capabilities.
3. Require explicit decisions for the questions, rather than merely showing a rubric and requesting a holistic score.
4. Aggregate using a declared weighting and failure policy. A satisfied fraction must not silently override a fatal safety, factuality, or admissibility failure.
5. Calibrate criterion labels and final decisions against human or executable evidence. Measure human alignment, cross-evaluator agreement, and repeated or cross-model stability separately.

## Criteria Are Not Calls

Semantic decomposition and inference decomposition are different decisions. Several binary questions can be answered in one call; alternatively, each question can be judged separately. Neither architecture follows automatically from choosing a checklist.

TICK's archived protocol uses separate question-level judgments and finds better preference agreement from explicit checklist aggregation than from checklist-guided holistic scoring. That comparison does not isolate call partitioning. CheckEval obtains improved agreement with batched binary questions and reports no noticeable single-versus-multi-question pilot difference, without quantitative results. Therefore checklist evidence does not warrant a universal preference for separate component judges. A workload-specific whole-rubric-call result can coexist with useful criterion decomposition; test the call boundary independently under fixed criteria and comparable resources.

## Practical Use and Limits

- Use criterion decisions when a score must be auditable or failed requirements must guide repair.
- Human-grounded fixed dimensions suit repeated evaluation of one construct; instruction-generated questions suit varied tasks but require checks for invented or omitted criteria.
- Question count is a weighting decision. Splitting one concern into many questions can change the metric even when every item has equal weight.
- Binary labels compress partial quality, especially in long or uniformly poor texts. Retain a holistic or gradient signal when that distinction matters.
- High agreement can reflect shared blind spots. Criterion traceability is not proof of correctness, unbiasedness, or faithful hidden reasoning.

## Related

- [LLM-as-Judge with Anti-Inflation](/vault/llm-as-judge-with-anti-inflation.md) — calibrating the intended judgment rather than only constraining score levels.
- [Rule-Based Rewards](/vault/rule-based-rewards.md) — using atomic compliance checks as one reward term alongside independent outcome and fidelity signals.

## Sources

- [TICKing All the Boxes dossier](/dossiers/ticking-all-the-boxes.md) — separate question-level judgments; exact human-preference agreement 46.4% → 52.2%; no batched-versus-separate call ablation in archived arXiv v1.
- [CheckEval dossier](/dossiers/checkeval-reliable-checklist-judging.md) — EMNLP 2025 study across 12 evaluators, human-grounded seed criteria, batched binary questions, and controls showing binarization alone does not close the agreement gap.
