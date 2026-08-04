---
type: Synthesis
title: LLM-as-Judge with Anti-Inflation
description: A structured LLM evaluation framework with explicit score caps, penalties, and weighted axes to prevent the score inflation common in naive LLM judging.
tags: [llm-as-judge, evaluation, peer-review, agents]
timestamp: 2026-07-11T16:00:00Z
---

# LLM-as-Judge with Anti-Inflation

A framework for using LLMs as evaluators that combats the natural tendency of LLMs to inflate scores through explicit caps, penalties, and conservative scoring rubrics.

## The Problem

Naive LLM-as-judge setups often produce scores clustered in the 70–90 range regardless of actual quality. Without guardrails, the evaluator becomes a participation trophy dispenser.

## The Rubric

Evaluate across six axes (0–100 each), weighted into an overall score:

| Axis | Weight | Description |
|------|--------|-------------|
| Coverage & Completeness | 20% | Breadth across major threads; inclusion of foundational and recent work |
| Relevance & Focus | 15% | Alignment with research problem; minimal tangents |
| Critical Analysis & Synthesis | 25% | Thematic grouping; discussion of tradeoffs and gaps |
| Positioning & Novelty | 25% | Clear literature-grounded gap; explicit differentiation from closest work |
| Organization & Writing | 10% | Logical structure, flow, and signposting |
| Citation Practices & Rigor | 5% | Key claims supported; credible sources; density relative to length |

## Anti-Inflation Rules

- Default expectation: overall score between 45–70.
- Scores >85 require strong evidence across ALL axes.
- Scores >90 are extremely rare (near-survey-level mastery).
- If any axis <50, overall score should rarely exceed 75.
- Purely descriptive reviews cap Critical Analysis at ≤60.
- Novelty asserted without close comparison caps Positioning at ≤60.

## Penalties

| Issue | Deduction |
|-------|-----------|
| Overclaiming novelty without close comparison | −5 to −15 |
| Missing key recent work | −5 to −15 |
| Mostly descriptive review with weak synthesis | −5 to −10 |
| Weak or generic gap statements | −5 to −10 |
| Citation dumping or consistency issues | −5 to −10 |

## Validation

Human correlation checks are essential. In PaperOrchestra, GPT-5 achieved Pearson r=0.6458 with human scores on overall quality, but only r=0.2764 on literature review quality. LLMs tend to act as structural graders (rewarding explicit "Problem-Gap-Solution" formatting), while human experts prioritize dense, pragmatic factuality and narrative flow.

## Sources

- [PaperOrchestra dossier](/dossiers/paperorchestra.md) — Literature Review Quality autorater with anti-inflation rules
