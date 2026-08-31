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

Leniency is measurable and reproducible across evaluators. In PEEM, judge means ran above human means on the same 210 instances (4.70 vs 4.58), and absolute score levels differed sharply between evaluator models (Gemma ~4.5–4.6, Qwen ~3.9) while the relative ranking of task models held. Two consequences: never compare absolute judge scores produced by different models, and check each axis's score *distribution* before trusting it — PEEM's Objectivity axis averaged 4.94 and correlated with humans at only ρ = 0.35, a ceiling effect rather than a definitional problem.

Inflation is not the only direction of failure. On a human-authored “slop” taxonomy, GPT-5, DeepSeek-V3, and o3-mini severely *under*-called the positive class and reached approximately zero agreement with human binary labels. Their rationales also narrowed the construct, over-emphasizing density while missing relevance, coherence, tone, bias, and factuality. A conservative rubric therefore needs construct-validity checks, not merely lower score priors: compare category prevalence, span evidence, abstention, and domain slices against expert annotations before trusting a judge's apparent strictness.

## Related

- [Verbosity Bias in Preference Evaluation](/vault/verbosity-bias-in-preference-evaluation.md) — the other systematic judge pathology: length-favoring preference rather than upward score drift.

## Sources

- [PaperOrchestra dossier](/dossiers/paperorchestra.md) — Literature Review Quality autorater with anti-inflation rules
- [PEEM dossier](/dossiers/peem-prompt-engineering-evaluation-metrics.md) — nine-axis rubric with per-axis rationales; documents judge leniency, ceiling compression, and cross-evaluator level shifts under preserved rankings
- [Measuring AI “Slop” in Text dossier](/dossiers/measuring-ai-slop-in-text.md) — shows near-zero judge–human agreement, strong positive-class underprediction, and category narrowing when capable LLMs apply an expert text-quality guide.
