---
type: Study Note
title: "Requirements Ambiguity Detection and Explanation with LLMs: An Industrial Study"
description: Small instruction-tuned models improve industrial ambiguity classification with labeled demonstrations, but expert review finds domain-blind explanations and substantially weaker usefulness than linguistic quality.
resource: https://doi.org/10.1109/ICSME64153.2025.00063
source: /archive/requirements-ambiguity-detection-explanation-industrial-study.pdf
tags: [requirements-engineering, in-context-learning, evaluation, enterprise, reliability]
timestamp: 2026-10-05T23:18:21Z
---

# Requirements Ambiguity Detection and Explanation with LLMs — Study Notes

**Authors**: Sarmad Bashir, Alessio Ferrari, Abbas Khan (Muhammad Abbas Khan in publication metadata), Per Erik Strandberg, Zulqarnain Haider, Mehrdad Saadatmand, and Markus Bohlin.  
**Published**: September 2025, pages 620–631; institutional PDF created July 1, 2025.  
**Status**: Peer-reviewed *2025 IEEE International Conference on Software Maintenance and Evolution (ICSME)* Industry Track paper. The archived file is the open institutional manuscript linked by the [conference program as a preprint](https://conf.researchr.org/details/icsme-2025/icsme-2025-industry-track/8/Requirements-Ambiguity-Detection-and-Explanation-with-LLMs-An-Industrial-Study), not the paginated publisher PDF. The [Mälardalen publication record](https://www.ipr.mdu.se/publications/7221-Requirements_Ambiguity_Detection_and_Explanation_with_LLMs__An_Industrial_Study) confirms the same work's DOI and publication. Neither record explicitly labels the file an accepted author manuscript; that precise version status remains unconfirmed.

## What It Is

An industrial study of **explanation-augmented binary classification**: decide whether a natural-language requirement is ambiguous, then give a short rationale. It compares small instruction-tuned models and labeled in-context examples on confidential railway and industrial-network requirements, followed by eight experts' assessment of explanation quality. It does not resolve ambiguity with stakeholders or demonstrate fewer downstream implementation defects.

## Problem and Motivation

Requirements can appear precise while admitting competing readings or leaving compliance conditions unstated. Manual review creates lengthy feedback loops. Earlier detectors often identify suspicious words without explaining the consequential uncertainty, and evaluation on public academic data may not transfer to specialized industrial language.

The important tension is between ambiguity **to a general model** and ambiguity **to an informed practitioner**. A term can have a settled technical meaning that the model does not know; a reference to a standard can also look authoritative while leaving relevant clauses or test levels unspecified.

## Mechanism as an Idea

Each model receives a requirement and labeled demonstrations drawn from the same project's held-out demonstration pool. Examples are selected either randomly or by sentence-embedding similarity. No weights are updated. The compared models are Qwen-2.5-1.5B-Instruct, Phi-3-mini-3.8B-Instruct, and Llama-3-8B-Instruct, with zero, one, five, or ten examples.

The demonstration labels have **no ground-truth rationales**. Empty rationale positions sometimes teach the model to omit its own explanation despite the task instruction; a second generation stage requests the missing rationale given the model's label. This exposes an instruction-versus-example conflict rather than establishing that the eventual explanation faithfully caused the classification.

The binary formulation deliberately avoids overlapping ambiguity subtypes because those distinctions have limited practical value for the partners. Human review evaluates naturalness, adequacy, usefulness, and relevance independently, preserving the distinction between readable language and actionable domain analysis.

## Results / Admissions

- **Data and protocol**: Westermo contributes **219 requirements (56 ambiguous)**, Alstom Project A **179 (74)**, and Project B **265 (48)**, totaling **663 requirements and 178 ambiguous labels**. Duplicates are removed within datasets and across the two Alstom projects. Three stratified splits use approximately 20% as a demonstration pool and 80% as test data: respective test sizes **175, 143, and 219**. Results average those three splits, not three independent industrial deployments. Precision, recall, and F1 are **class-weighted**, not ambiguous-class-only detection metrics.
- **Demonstrations help, not monotonically everywhere**: The abstract claims a **20.2% average performance increase** from zero to ten examples. Treat this as the authors' headline, not a 20.2-percentage-point accuracy gain or an ambiguous-class recall result. Table II's Llama-3 random-selection F1 rises **61.3→68.6**, **56.0→61.3**, and **63.1→72.6** across the three datasets. Friedman and Nemenyi tests find significant ten-versus-zero and ten-versus-one contrasts (**p < 0.05**), not ten-versus-five or all lower-count pairings.
- **No universal model winner**: The best listed Alstom A and B configurations are Phi-3 with ten semantic examples: **67.1% and 75.2% weighted F1**. Qwen is significantly worse overall than both larger models in the reported post-hoc comparison, while Phi-3 and Llama-3 are not significantly different. Model family and size co-vary; this is not a controlled scaling law.
- **Semantic retrieval is not established as superior**: Across **27 paired comparisons**, random versus semantic selection yields **p > 0.05**. For ten-example Llama-3 on Project B, random selection achieves **72.6% F1**, semantic **66.5%**. Similarity retrieves plausible neighbors, not necessarily the most informative decision boundary.
- **Explanation quality is uneven**: **Eight unique industry experts** (three Westermo, five Alstom; four Alstom evaluators also assess Project B) rate a 20% sample of generated explanations, including true and false positive detections. The exact rated-instance and judgment counts are not stated. Aggregated means (standard deviations), on a five-point scale, are **naturalness 4.08 (1.21)**, **adequacy 3.99 (1.24)**, **usefulness 3.38 (1.40)**, and **relevance 3.87 (1.24)**. The abstract's **3.84/5** averages across dimensions; it hides weaker usefulness.
- **Domain failures are concrete**: Models mistake established terms such as rising edge, single failure, and grease-free chains for unclear language, while accepting references to standards without checking compliance-test levels or specific clauses. Experts sometimes reconsider their original labels after reading rationales, but the study does not independently distinguish genuine discovery from persuasion.

## Analyst Takeaways

1. **Check premises before escalating uncertainty.** A model's unfamiliarity is not necessarily a stakeholder's missing intent. [Clarification Need Decision](/vault/clarification-need-decision.md) should distinguish recoverable domain context from questions only the owner can answer.
2. **Fluent explanations are review artifacts, not adjudication.** The gap between naturalness and usefulness argues against treating persuasive prose as evidence of correct classification or a validated rewrite.
3. **Domain grounding is a two-sided safeguard.** It can prevent false alarms on established terminology and false reassurance from vague standards references. [Kiro's requirements analysis](/dossiers/kiro-requirements-analysis.md) reaches the same boundary through missing background constraints rather than binary classification.
4. **Retain independent acceptance intent.** As in [What Prompts Don't Say](/dossiers/prompt-underspecification-what-prompts-dont-say.md), examples and instructions are an intervention, not the complete requirement model. Few-shot agreement with historical labels cannot establish that all consequential ambiguities have been found.

## Questions and Limitations

- A results paragraph attributes Qwen's **72.9%** and Llama's **66.5%** to Project A, but Table II places both in **Project B**. The table is the basis for dataset-specific values here.
- The headline's 20.2% improvement is not accompanied by an explicit aggregation formula in the manuscript; do not silently reinterpret its denominator or metric.
- Weighted F1 on imbalanced data can conceal poor ambiguous-class recall. Table II does not establish a safety-critical detection guarantee.
- The sampled explanation evaluation includes positive detections, not a comprehensive assessment of false negatives. Without exact sample counts, ground-truth rationales, or inter-rater agreement, explanation correctness remains difficult to quantify.
- The manuscript does not detail how historical ambiguity labels were established or adjudicated. An expert changing a label after model output can reflect a flawed reference or anchoring; neither possibility is isolated experimentally.
- Standards and glossaries are proposed future retrieval targets, **not an evaluated RAG improvement** in this study. Model privacy compatibility and protected inference do not themselves validate every organizational data-handling requirement.
- Confidential data make direct public-corpus contamination unlikely, not logically impossible. Findings from two organizations in related domains are not universal industrial generalization.
- No measured reduction in review time, clarification iterations, rework, or deployed defects is provided.

## Vault Ideas Extracted

* [Domain-Grounded Requirements Review](/vault/domain-grounded-requirements-review.md)
* [Clarification Need Decision](/vault/clarification-need-decision.md)
