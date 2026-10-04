---
type: Study Note
title: LLM Evaluators Recognize and Favor Their Own Generations
description: Summarization experiments link self-recognition and self-preference, showing why hidden authorship alone does not establish independent judging and why human quality controls remain necessary.
resource: https://arxiv.org/abs/2404.13076v1
source: /archive/llm-evaluators-self-preference.pdf
tags: [llm-as-judge, evaluation, reliability, fine-tuning]
timestamp: 2026-10-04T06:15:44Z
---

# LLM Evaluators Recognize and Favor Their Own Generations — Study Notes

**Authors**: Arjun Panickssery, Samuel R. Bowman, and Shi Feng; MATS, New York University, and Anthropic affiliations.  
**Venue**: NeurIPS 2024, peer-reviewed paper; this dossier covers the earlier archived arXiv revision 1 of April 15, 2024, not an assumed camera-ready text.

## What It Is

An experimental study of whether model evaluators favor their own outputs partly because they can recognize them. The same underlying model is used in separate generator, quality-evaluator and authorship-identifier roles. “Self” is a behavioral label, not a claim that the model has a conscious identity or memory of producing the particular text.

## Problem and Motivation

A model judge can become a source-dependent evaluator rather than an impartial quality assessor. That matters both for benchmarks and for feedback loops where a model's own judgments train or refine its future outputs. Removing an explicit author label may not suffice if style or other textual cues reveal provenance.

## Mechanism as an Idea

The study samples **1,000 articles each** from XSUM and CNN/DailyMail and generates summaries with GPT-4, GPT-3.5 and Llama-2-7b-chat, alongside human summaries. Pairwise evaluation asks either which summary is better or which is the evaluator's own; order is swapped and confidence scores averaged to reduce position bias. Individual evaluation separately measures authorship confidence and probability-weighted quality ratings.

Fine-tuning changes self-recognition while quality evaluation continues on summaries from the original generators. A **500-article training / 500-article evaluation** split and cross-dataset tests probe transfer. Controls train on length, vowel count, readability, constant choices or random labels. Additional experiments assign correct or reversed authorship labels. The intended causal argument is capability-level: increasing recognition capability also increases preference for the model's original output distribution.

## Results and Admissions

- The introduction reports **73.5% GPT-4 self-recognition accuracy** against other models and humans, and **over 90%** recognition for GPT-3.5 and Llama 2 after 500-example fine-tuning. These headline accuracy claims are not the same as the appendix's confidence scores.
- Without fine-tuning, pairwise GPT-4 recognition/preference scores are **0.672 / 0.705 on XSUM** and **0.747 / 0.912 on CNN**. GPT-3.5 is **0.535 / 0.582** and **0.481 / 0.431**, respectively. Thus neither preference nor recognition uniformly exceeds chance across every model–dataset slice.
- Fine-tuned GPT-3.5 on CNN reaches **0.959 recognition and 0.970 preference** there, while transferring to **0.764 / 0.787** on XSUM. These are averaged scores, not the fraction of unanimously recognized examples.
- Models reverse pairwise choices when order is swapped at average rates of **25% GPT-4, 58% GPT-3.5 and 89% Llama 2** across tasks and datasets. Confidence averaging provides a quantitative summary but does not make those ambiguous decisions reliable.
- On XSUM, reversing source labels changes GPT-4's self-preference score from **0.73 to 0.32** and GPT-3.5's from **0.61 to 0.46**. The same reversal does not reliably work on CNN or Llama 2.
- Fine-tuning and control conditions lie along a linear recognition–preference trend. Evaluators do not systematically prefer newly generated fine-tuned summaries: excluding degraded generations, average preference for them is **0.46**. This challenges improved generation quality as the explanation for the observed preference shift.

## Analyst Takeaways

1. **Author-blind is weaker than provenance-independent.** Omitting names removes an explicit cue, not detectable stylistic or model-family resemblance.
2. **Use cross-model review as a risk-reduction hypothesis, not a guarantee.** This study motivates separating generator and evaluator but does not test coding-review independence or certify any reviewer pairing.
3. **Keep humans in bias calibration.** Preference for one's own outputs is not automatically unfair if those outputs are genuinely better. Measure error relative to independently assessed quality.
4. **Counterbalance order and inspect ambiguity.** A single pairwise vote can be mostly position preference, especially for weaker judges. This adds a distinct concern to [LLM-as-Judge with Anti-Inflation](/vault/llm-as-judge-with-anti-inflation.md).

## Questions and Limitations

The abstract defines self-preference relative to equal-quality human judgments, but this revision does **not** provide a matched human quality-annotation control. It explicitly acknowledges that disproportionate preference is supported indirectly, including pairs of judges that both prefer themselves. Correlation, interventions and confound controls support the causal hypothesis without fully validating its mechanism or example-level direction. Two summarization datasets and three 2024 models do not establish generality to code, current models or heterogeneous review teams. Individual judgments show much weaker discrimination than pairwise judgments. Authorship obfuscation is proposed for future validation, not shown to eliminate bias. The paper's stronger introductory rhetoric should be read alongside these admissions.

## Vault Ideas Extracted

* [LLM-as-Judge with Anti-Inflation](/vault/llm-as-judge-with-anti-inflation.md)
