---
type: Study Note
title: Prompt Engineering is Complicated and Contingent
description: Personal study notes on a Wharton Generative AI Labs report showing that LLM benchmark conclusions depend heavily on scoring thresholds, repeated sampling, and prompt formatting choices.
resource: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5165270
source: /archive/prompt-engineering-complicated-contingent.pdf
tags: [prompting, evaluation, reliability]
timestamp: 2026-07-12T20:07:25Z
---

# Prompt Engineering is Complicated and Contingent - Study Notes

**Authors**: Lennart Meincke, Ethan Mollick, Lilach Mollick, Dan Shapiro  
**Venue**: Prompting Science Report 1; SSRN 5165270; arXiv:2503.04818  
**Date**: March 4, 2025  
**Pages**: 10  

## What It Is

This short report tests how fragile LLM benchmark conclusions can be when the evaluator changes the scoring standard or the surface form of the prompt. The authors use GPQA Diamond, a difficult 198-question graduate-level multiple-choice benchmark, and test GPT-4o and GPT-4o-mini under several prompting conditions.

The main contribution is methodological rather than a new prompting trick. The report argues that a single benchmark score can hide reliability differences, and that prompt advice such as "be polite" or "use strict formatting" should be treated as empirical hypotheses rather than universal rules.

## The Problem It Studies

The report targets two common weaknesses in prompt engineering claims:

1. **Benchmark scores depend on the pass rule.** A model can look much stronger or weaker depending on whether success means one correct answer, a modal answer, a majority of repeated attempts, 90% consistency, or perfect consistency.
2. **Prompt effects are contingent.** Small prompt changes can help on some questions, hurt on others, or wash out when averaged across the benchmark.

This matters because many real deployments care about reliability, not only whether the model can sometimes reach the right answer.

## Method

The authors evaluate GPT-4o and GPT-4o-mini on GPQA Diamond. Each question is asked 100 times per model and prompt condition, with temperature set to 0. That design lets the report distinguish "can answer correctly at least sometimes" from "answers correctly consistently."

The scoring thresholds are:

- **100% correct** - all 100 attempts must be correct.
- **90% correct** - at least 90 of 100 attempts must be correct.
- **51% correct** - the model must be correct on a majority of attempts.

The report contrasts these with more permissive standards such as PASS@100, where a single correct answer among 100 attempts can count as success, and modal-answer consensus methods.

The prompt conditions are:

- **Formatted baseline** - the GPQA reference style with a specific answer format and system prompt.
- **Unformatted** - removes the explicit answer-format suffix.
- **Polite** - changes the prefix to a polite request.
- **Commanding** - changes the prefix to an order.

## Results That Stood Out

- At the strictest 100% threshold, GPT-4o and GPT-4o-mini only exceeded random guessing by about 5.1 and 4.5 percentage points under the formatted condition, and those differences were not statistically significant.
- At lower thresholds, the picture changed. GPT-4o beat random guessing in more comparisons at the 90% and 51% levels, while GPT-4o-mini only clearly beat random guessing at the 51% level.
- Removing the explicit answer format significantly reduced performance for both models at the strict threshold.
- Polite and commanding prompts produced large question-level swings in both directions, but those effects mostly disappeared when aggregated across all questions.
- Repeated sampling exposed inconsistency that a one-shot benchmark score would miss.

## My Takeaways

1. **Evaluation standards should match deployment risk.** PASS-style metrics can be useful for model development, but they are misleading for applications where the system must be reliably correct on the first try or across repeated use.

2. **Prompting advice needs error bars.** A prompt variant that helps one question or benchmark slice may not help the overall task. Treat prompt recipes as local empirical findings, not durable laws.

3. **Formatting is a real intervention.** In this report, the explicit answer-format constraint improved strict-threshold performance. That does not prove formatting always helps, but it does show that output constraints can change measured capability.

4. **Repeated attempts reveal reliability.** Asking the same benchmark item many times changes the evaluation question from "can the model solve this?" to "how often does the model solve this under the same nominal setup?"

## What I Would Question

- The study uses GPT-4o and GPT-4o-mini, not newer reasoning models. The reliability conclusions are still useful, but model-specific numbers should not be generalized.
- GPQA Diamond is intentionally difficult and multiple-choice. Results may differ for open-ended generation, tool use, or tasks with external verification.
- Temperature is set to 0, yet repeated calls still vary enough to matter. That is important operationally, but the mechanism behind the variance is outside the report's scope.
- The polite versus commanding comparison is intentionally simple. It is most useful as evidence against universal prompt folklore, not as a full theory of tone.

## Vault Ideas Extracted

* [Prompt Contingency](/vault/prompt-contingency.md)
* [LLM Evaluation Methods](/vault/llm-evaluation-methods.md)
