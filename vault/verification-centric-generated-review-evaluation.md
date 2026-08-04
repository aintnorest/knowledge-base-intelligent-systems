---
type: Synthesis
title: "Verification-Centric Generated-Review Evaluation"
description: "Evaluating AI-generated critique through evidence support, known-error detection, actionability, rubric adherence, and manipulation resistance rather than text similarity alone."
tags: [evaluation, peer-review, llm-as-judge, verification, prompt-injection]
timestamp: 2026-07-22T00:32:30Z
---

# Verification-Centric Generated-Review Evaluation

Similarity to a human reference review is not enough evidence that an AI critic is useful. A generated critique may match tone and topics while missing a central contradiction, inventing an unsupported weakness, ignoring the governing rubric, or following adversarial text embedded in the artifact it reviews. Verification-centric evaluation measures those failure modes separately.

## Evaluation Pattern

1. Turn each substantive critique into a checkable claim and link it to supporting or contradicting source evidence.
2. Measure factual grounding, useful actionability, analytical depth, topic coverage, and task- or venue-specific rubric adherence as separate dimensions.
3. Add known-defect probes: real errors where available and controlled inserted contradictions where natural ground truth is scarce. Preserve whether each result is synthetic or natural.
4. Break error-detection results down by severity and by the evidence required to find the defect, not only by an aggregate score.
5. Compare score or focus distributions with competent human reviews without treating human-text overlap as the sole target.
6. Test the reviewer itself against indirect instructions, misleading claims, and document manipulations; log whether it detects, ignores, or obeys them.
7. Audit model-judge calibration, model version, retrieval corpus, cost, and human disagreement samples.

## Practical Use

Use this pattern for paper review, code review, policy analysis, incident postmortems, or any agent that critiques an untrusted artifact. The output should identify evidence, uncertainty, and a practical next action instead of merely supplying a fluent score or summary.

Synthetic defects make benchmarks scalable and unambiguous, but they can have artifacts and can be easier than naturally occurring failures. Treat a result on them as controlled capability evidence and pair it with human adjudication or natural-error data before making deployment claims.

## Limitations

- Evidence retrieval and LLM judging can themselves introduce omissions, bias, and prompt sensitivity.
- Multiple quality dimensions can be correlated, so a dashboard is more honest than an uncalibrated composite score.
- Resistance to one manipulation template does not establish robustness to adaptive document attacks.

## Sources

- [ReviewEval dossier](/dossiers/revieweval-ai-generated-reviews.md) — multi-axis measures of factuality, actionability, depth, similarity/coverage, and guideline adherence.
- [Beyond Imitation dossier](/dossiers/beyond-imitation-llm-assisted-peer-review.md) — graph-grounded synthetic contradictions, reviewer-focus analysis, and explicit manipulation tests.
