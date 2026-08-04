---
type: Study Note
title: "ReviewEval: An Evaluation Framework for AI-Generated Reviews"
description: "Study notes on a five-dimension evaluation framework for AI-generated scholarly reviews and its guideline-aware ReviewAgent pipeline."
resource: https://aclanthology.org/2025.findings-emnlp.1120/
source: /archive/revieweval-ai-generated-reviews.pdf
tags: [peer-review, evaluation, llm-as-judge, agents]
timestamp: 2026-07-22T00:32:30Z
---

# ReviewEval: An Evaluation Framework for AI-Generated Reviews — Study Notes

**Authors**: Madhav Krishan Garg, Tejash Prasad, Tanmay Singhal, Chhavi Kirtani, Murari Mandal, and Dhruv Kumar
**Venue**: Findings of EMNLP 2025
**Pages**: 23
**DOI**: 10.18653/v1/2025.findings-emnlp.1120

## What It Is

This paper argues that an AI-generated scholarly review should not be judged mainly by how closely it resembles a human-written review. Similarity can reward agreeable prose that misses factual errors, lacks a usable recommendation, or ignores the target venue's actual criteria. The authors introduce **ReviewEval**, a multi-axis framework, and **ReviewAgent**, a review-generation pipeline designed to optimize against that framework.

ReviewEval covers five broad concerns: alignment with expert reviews (semantic similarity and topic coverage), factual correctness, constructiveness/actionability, analytical depth, and adherence to reviewer guidelines. The proposal is useful beyond peer review as a reminder that a generative evaluator needs separate measures for correctness, usefulness, scope compliance, and surface resemblance.

## How ReviewEval Works

For alignment, the framework compares semantic embeddings and asks an LLM to map topics in the generated review to topics in expert reviews. Factuality is more involved: it turns each generated critique into verification questions, decomposes them, retrieves relevant manuscript sections, produces evidence-grounded answers, and generates a rebuttal-like check of whether the critique's claims are supported.

Constructiveness is scored from extracted criticism, methodological feedback, and improvement suggestions. An insight counts as actionable when it is sufficiently specific, feasible, and implementation-oriented. Depth is judged across five dimensions: comparison to prior work, logical gaps, methodological scrutiny, interpretation of results, and theoretical contribution. Guideline adherence separates subjective from objective venue criteria and grades whether the review follows them.

The proposed ReviewAgent first retrieves and parses target-conference guidelines, converts them into section-specific prompts, and uses a supervisor model to refine those prompts. It then generates section-level reviews, aggregates them, and runs one external improvement loop using ReviewEval feedback. That structure makes the feedback target explicit, but it also means several scores remain downstream of LLM judgment.

## Evaluation and Reported Results

The evaluation uses a 120-paper corpus from UAI 2024, NeurIPS 2024, and ICLR 2024–25, with a 30-paper stratified subset for more expensive configurations. It compares ReviewAgent variants with MARG and the AI Scientist reviewer across model families.

The abstract reports that the selected ReviewAgent configuration improves actionable-insight scores by 6.78% over the AI baselines and 47.62% over expert reviews, analytical depth by 3.97% and 12.73%, and guideline adherence by 10.11% and 47.26%, respectively. The tables do not show one universally dominant system: some baseline variants lead on topic coverage, semantic similarity, or factuality. The more defensible result is that optimizing several dimensions exposes those trade-offs instead of hiding them behind a single similarity score.

## Analyst Takeaways

1. **Turn generated critique into checkable claims.** A review can sound authoritative while making unsupported assertions. Claim decomposition plus evidence retrieval gives factuality a concrete evaluation path, even if the final adjudication is still model-mediated.
2. **Keep dimensions separate.** Topic overlap, factual grounding, actionability, depth, and venue compliance answer different questions. Aggregate dashboards should retain the component scores and their scoring rubrics.
3. **Bind feedback to the task's governing rubric.** Venue instructions are part of the evaluation contract, not decorative prompt context. The same principle applies to code review, policy review, or incident analysis.
4. **Do not interpret LLM-judge scores as ground truth.** The authors themselves note judge bias, prompt sensitivity, and metric interdependence. Human sampling and audit trails remain necessary for high-consequence use.

## Questions and Limitations

- The corpus is drawn from AI conferences, so the claim that the design generalizes to other scholarly fields remains untested.
- Several measurements rely on LLM extraction and judging; keeping model versions fixed reduces variation but does not establish calibration or independence.
- Semantic similarity, factuality, depth, and actionability can be correlated, so an apparent multi-metric improvement may not represent fully independent gains.
- The refinement, retrieval, and judging loops add cost. A deployment should measure the marginal benefit of each stage rather than assuming the full pipeline is warranted.

## Vault Ideas Extracted

* [Verification-Centric Generated-Review Evaluation](/vault/verification-centric-generated-review-evaluation.md)
