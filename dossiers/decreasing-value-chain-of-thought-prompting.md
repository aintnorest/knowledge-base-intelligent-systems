---
type: Study Note
title: "Prompting Science Report 2: The Decreasing Value of Chain of Thought in Prompting"
description: Personal study notes on a Wharton Generative AI Labs report testing when an explicit chain-of-thought prompt improves GPQA Diamond performance, reliability, and latency.
resource: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5285532
source: /archive/decreasing-value-chain-of-thought-prompting.pdf
tags: [chain-of-thought, prompting, evaluation, reliability]
timestamp: 2026-07-13T02:32:26Z
---

# Prompting Science Report 2: The Decreasing Value of Chain of Thought in Prompting - Study Notes

**Authors**: Lennart Meincke, Ethan Mollick, Lilach Mollick, Dan Shapiro  
**Venue**: Prompting Science Report 2; SSRN 5285532  
**Pages**: 19  
**Benchmark**: GPQA Diamond (198 graduate-level multiple-choice science questions)

## What It Is

This short empirical report tests whether the generic instruction *“Think step by step”* still adds value to contemporary LLMs. It compares an explicit chain-of-thought (CoT) request with a forced direct-answer prompt, and—where applicable—with unprompted default behavior.

The central result is conditional: explicit CoT can raise average accuracy for non-reasoning models, especially when the alternative prevents them from producing any intermediate reasoning, but it can also make answers less consistent on items the model otherwise solves reliably. For dedicated reasoning models, it produces only marginal accuracy changes while adding substantial latency and token use.

## The Problem It Studies

“Use CoT” is often treated as generic prompting advice. The report asks three more operational questions:

1. Does CoT improve the deployment-relevant metric, rather than merely an average score?
2. Does it help after accounting for a model's default tendency to produce short reasoning traces?
3. Is any gain worth the additional time and token cost?

This framing matters because a prompt that helps difficult items can still reduce perfect reliability by introducing errors on easy items.

## Method

The authors evaluate five non-reasoning models—Claude 3.5 Sonnet, Gemini 2.0 Flash, GPT-4o-mini, GPT-4o, and Gemini 1.5 Pro—and three reasoning models—o3-mini, o4-mini, and Gemini 2.5 Flash. Every model/prompt/question combination is run 25 times at temperature 0, for 4,950 runs per condition and model.

The three prompt conditions are:

- **Direct**: require only the final answer, without explanation or thinking.
- **Step by step**: append the generic CoT instruction.
- **Default**: remove the suffix and answer-format constraint, allowing the model to choose its response style.

Instead of relying on one pass rule, the study reports the overall trial-level average and the fraction of questions answered correctly on all 25 trials (100%), at least 23 times (90%), or at least 13 times (51%). It uses paired bootstrap-permutation tests with 5,000 replicates. A supplement finds that, for the effects examined on GPT-4o-mini, 25 trials yielded precision and power comparable with 100 trials.

## Results That Stood Out

- **Non-reasoning models vs. forced direct answers**: CoT raised average performance across the set. The largest average gains were Gemini 2.0 Flash (+0.135) and Claude 3.5 Sonnet (+0.117); GPT-4o-mini's +0.044 was not statistically significant.
- **Reliability can move the other way**: CoT significantly reduced 100%-correct performance for Gemini 2.0 Flash (-0.131), GPT-4o-mini (-0.091), and Gemini 1.5 Pro (-0.172), even where it improved average accuracy. Claude 3.5 Sonnet was the exception, improving at the strict and average measures.
- **Default behavior narrows the benefit**: many non-reasoning models already emitted a short CoT-like trace without an instruction. Relative to that default, explicit CoT delivered smaller and mixed changes; the report found significant average gains for Gemini 2.0 Flash (+0.062) and GPT-4o (+0.069), but not for Claude 3.5 Sonnet or GPT-4o-mini.
- **Reasoning models**: explicit CoT produced small average gains for o3-mini (+0.029) and o4-mini (+0.031), while Gemini 2.5 Flash fell (-0.033). Threshold metrics changed little except for regressions by Gemini 2.5 Flash at 100% and 90%.
- **Efficiency**: CoT added 35–600% (about 5–15 seconds) to requests for the non-reasoning models and 20–80% (about 10–20 seconds) for the reasoning models.

## My Takeaways

1. **Compare CoT with the right baseline.** A prohibition on reasoning makes CoT look more valuable than a normal unconstrained chat experience when models already reason by default. The relevant comparison is the intended production prompt.

2. **Separate mean accuracy from dependable correctness.** CoT can improve hard cases yet create rare regressions on easy cases. The right choice depends on whether the workflow can tolerate those regressions, retry, vote, or verify answers.

3. **Reasoning-model users should be skeptical of redundant external CoT instructions.** The evidence here says to preserve the model's native reasoning policy unless a task-specific evaluation demonstrates a benefit.

4. **Generic prompt recipes are lower-confidence than task-specific ones.** The tested variants were simple generic CoT prompts. They do not rule out a structured, domain-specific decomposition with tools or verification.

## What I Would Question

- The report tests a single benchmark, GPQA Diamond, and a limited snapshot of 2024–2025 model versions. It supports a conditional practice rule, not a universal claim about all reasoning tasks.
- The direct baseline deliberately suppresses visible reasoning. That is useful for isolating an intervention, but it is not always representative of a real application.
- GPQA is multiple choice and does not test tool use, open-ended tasks, or workflows where an intermediate trace can be checked mechanically.
- The 25-versus-100 trial result is evidence for this study's effect sizes and setup, not a general sample-size guarantee for every evaluation.

## Vault Ideas Extracted

* [Chain-of-Thought Prompting](/vault/chain-of-thought-prompting.md)
* [LLM Evaluation Methods](/vault/llm-evaluation-methods.md)
