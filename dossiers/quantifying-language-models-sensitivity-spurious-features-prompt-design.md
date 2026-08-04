---
type: Study Note
title: Quantifying Language Models' Sensitivity to Spurious Features in Prompt Design
description: Study notes on FORMAT SPREAD, which measures performance variance across semantically equivalent few-shot prompt formats.
resource: https://arxiv.org/abs/2310.11324v2
source: /archive/quantifying-language-models-sensitivity-spurious-features-prompt-design.pdf
tags: [prompting, evaluation, reliability, in-context-learning]
timestamp: 2026-07-30T17:40:00Z
---

# Quantifying Language Models' Sensitivity to Spurious Features in Prompt Design - Study Notes

**Authors**: Melanie Sclar, Yejin Choi, Yulia Tsvetkov, Alane Suhr  
**Venue**: ICLR 2024; arXiv:2310.11324 [cs.CL]  
**Publication date**: October 17, 2023 (arXiv v1)  
**Version date**: July 1, 2024 (v2)  
**Pages**: 26

## What It Is

This paper measures how much few-shot LLM accuracy can change when prompt meaning is held fixed but formatting changes: separators, label casing, option wrappers, descriptor phrases, and example layout. It calls this sensitivity to **spurious prompt features** and proposes FORMAT SPREAD to estimate the range of plausible-format performance within a bounded evaluation budget.

## Method

The authors define a grammar of semantically equivalent prompt formats, hold task instructions and few-shot example identity/order fixed, and use accuracy spread—best minus worst format—as the sensitivity measure. FORMAT SPREAD uses adaptive sampling to evaluate a subset of formats and estimates the interval without model-weight access; naive sampling is its primary comparison.

The paper also tests whether individual formatting edits predict effects, whether the space is locally smooth, whether rankings transfer across models, and whether representations of whole prompts predict spread.

## Evidence

On classification tasks, formatting alone produces large and unpredictable differences: the abstract reports up to 76 accuracy points for Llama-2-13B. Larger models, more shots, and instruction tuning reduce neither the phenomenon nor its relevance. For Llama-2-70B 1-shot, the reported median spread is 0.171 across tasks (maximum 0.876); GPT-3.5 still has median 0.064 and maximum 0.562 under the paper's setup.

FORMAT SPREAD estimates spread within two accuracy points while exploring 5% of a 320-format space with 2,500 examples. The format-performance landscape is non-monotonic, single atomic choices are weak predictors, and a format that wins for one model only weakly preserves its ordering for another. Separation of prompt embeddings correlates with observed spread, but is analysis rather than a deployable guarantee.

## Implications

A single prompt is a point estimate with an unreported nuisance variable. It may be acceptable for a product choosing one validated format, but is insufficient evidence for a model-comparison, capability, robustness, bias, or safety claim. Benchmarks should report plausible-format ranges or a pre-registered format policy, and production systems should regression-test their templates across representative perturbations.

## Limitations

The grammar defines a useful but incomplete set of “plausible” formats; semantic equivalence is an assumption, not a human study. Experiments focus largely on classification and selected models/tasks. The 2024 model results and the chosen evaluation budget do not automatically transfer to current chat systems or long-form prompts.

## Analyst Takeaways

1. **Version prompt format as an evaluation variable.** Separators and label syntax can be model behavior, not presentation.
2. **Report a distribution or interval for comparative claims.** A winning number under one arbitrary template is weak evidence of a durable ordering.
3. **Test portability before moving prompts across models.** Reuse the task intent, then revalidate the template.
4. **Distinguish optimization from robustness.** Finding a best prompt does not reveal the worst plausible behavior users may encounter.
