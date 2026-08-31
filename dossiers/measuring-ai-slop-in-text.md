---
type: Study Note
title: "Measuring AI Slop in Text"
description: "Human-centered taxonomy and annotation study of low-quality AI-like prose, including evidence that generic metrics and prompted LLM judges poorly reproduce expert assessments."
resource: https://arxiv.org/abs/2509.19163v2
source: /archive/measuring-ai-slop-in-text.pdf
tags: [evaluation, llm-as-judge, reliability, taxonomy]
timestamp: 2026-08-31T22:15:22Z
---

# Measuring AI “Slop” in Text — Study Notes

**Authors**: Chantal Shaib, Tuhin Chakrabarty, Diego Garcia-Olano, and Byron C. Wallace  
**Venue**: arXiv:2509.19163v2 [cs.CL], preprint under review  
**Pages**: 32

## What It Is

This paper turns the colloquial label “AI slop” into an observable, multidimensional text-quality construct. From definitions elicited from 19 experts, the authors derive three themes—information utility, information quality, and style quality—and seven final codes: density, relevance, factuality, bias, structure, coherence, and tone. Three expert annotators then mark spans and overall slop judgments in news and MS MARCO passages.

The distinction from AI-text detection is essential: the target is deficient writing, not provenance. Human writing can be sloppy and machine writing can be good, so detecting whether a model produced the text does not answer whether the text serves its reader.

## Findings

More marked issue spans correlate with overall slop judgments (Spearman ρ = 0.63 overall; 0.70 for news and 0.51 for MS MARCO). All seven codes positively predict the label, with relevance, density, and tone strongest in the pooled analysis. The useful dimensions are domain-dependent: news judgments emphasize relevance, verbosity, coherence, tone, and bias, while short QA passages emphasize factuality and structure.

Overall slop labels remain subjective: annotators called about 34% of articles slop, with poor-to-fair Cohen agreement. Span overlap was substantially stronger, and factuality, bias, and structure were the most reliable codes. The operational lesson is to ask reviewers to locate and classify concrete defects instead of relying only on a global aesthetic verdict.

Automatic approximations were weak. Regularized linear models reached AUPRC 0.52 on news and 0.55 on MS MARCO, roughly twice prevalence but far from a replacement for annotation. A writing-quality reward model correlated only modestly with labels. GPT-5, DeepSeek-V3, and o3-mini substantially under-predicted slop and had near-zero agreement with humans; prompted GPT-5 also aligned poorly at span level. A fine-tuned Qwen-7B span extractor improved to 0.26 character-level F1 overall, still leaving most issues unresolved.

## Analyst Takeaways

1. **Evaluate fitness for purpose, not an undifferentiated style score.** The same symptom matters differently in news and factual QA.
2. **Prefer defect spans plus categories over one binary label.** Concrete evidence is more reproducible and more actionable for editing.
3. **Do not make an LLM judge the sole quality gate for prose.** The tested judges systematically missed the construct and over-focused on density.
4. **Separate origin detection from quality evaluation.** AI-like phrasing is neither necessary nor sufficient evidence of low utility, factuality, or coherence.

## Questions and Limitations

- The study is English-only, uses three final annotators, and covers two domains.
- The expert-derived taxonomy reflects a particular population and time; other genres may require different weights or codes.
- The binary construct is explicitly subjective, and some code agreement remains moderate-to-challenging.
- The automated-model results are snapshots of specific prompts and models rather than a proof that model-assisted review cannot improve.

## Vault Ideas Extracted

* [Quality Versus Correctness Prompt Evaluation](/vault/quality-versus-correctness-prompt-evaluation.md)
* [LLM-as-Judge with Anti-Inflation](/vault/llm-as-judge-with-anti-inflation.md)
