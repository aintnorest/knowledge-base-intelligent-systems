---
type: Study Note
title: How Many Instructions Can LLMs Follow at Once?
description: IFScale measures per-keyword adherence across 10–500 simultaneous inclusion requirements, revealing model-specific decay, primacy and omission patterns without establishing all-satisfied response reliability.
resource: https://arxiv.org/abs/2507.11538v1
source: /archive/ifscale-how-many-instructions.pdf
tags: [prompting, evaluation, reliability, context-engineering, benchmark]
timestamp: 2026-10-04T06:39:21Z
---

# How Many Instructions Can LLMs Follow at Once? — Study Notes

**Authors**: Daniel Jaroslawicz, Brendan Whiting, Parth Shah, and Karime Maamari; Distyl AI.  
**Status**: arXiv:2507.11538v1, July 15, 2025; preprint, with no peer-reviewed venue listed in the retrieved record. Version 1 is the only revision listed at ingest.

## What It Is

**IFScale** tests a professional business-report task with **10–500 keyword-inclusion instructions**, in increments of ten, across **20 models and seven providers**. Five random seeds per density supply different sampled keyword sets. Its value is a wide count ladder under one simple rule family, not broad coverage of instruction semantics.

## Problem and Motivation

A long context window makes hundreds of requirements fit in the input; it does not establish that they will all survive generation. Sparse instruction benchmarks miss capacity cliffs, variance, positional neglect, and the cost of stronger reasoning under dense loads. IFScale asks how the same kind of requirement behaves as the active set grows.

## Mechanism as an Idea

A vocabulary of **500 business terms** is derived from SEC 10-K filings, checked against the source corpus, deduplicated and lemmatized, filtered for valid English terms and semantic redundancy, and selected using a generation-difficulty proxy. At each density, sampled instructions each require one exact word to occur in a coherent, multi-section report. Stratified sampling aims to hold vocabulary difficulty consistent across runs.

**Accuracy is per-instruction inclusion rate, not an all-satisfied report rate:** for a report with N requested keywords, count correctly included keywords and divide by N; the plotted model-density score averages the five seed-level scores. Searches are case- and style-insensitive deterministic regular-expression checks. A morphological approximation does not satisfy the requested exact term. Approximate matches sharing at least an **80%-length prefix** identify **modification errors**; absent terms identify **omissions**. Error rates are also computed for early, middle and late thirds of the instruction list.

The reported adherence operates within a **retry-and-validity protocol**: constraint dumps, very short refusals, and reports failing a model-based coherence screen trigger regeneration. It is therefore not an unconditional first-attempt deployment success rate. Coherence is a separate model-judged measure, assessed over all attempted generations; keyword presence is not evidence that the report's claims are true or its prose useful.

## Results and Admissions

The abstract summarizes the best result at 500 instructions as **68%**; Appendix A gives **Gemini 2.5 Pro preview 68.9% ± 2.6%**, and **o3 high 62.8% ± 10.6%**. These are average satisfied-keyword percentages with sample standard deviation across seeds, not percentages of completely compliant reports. Other 500-instruction scores include **GPT-4.1 48.9%**, **Claude Sonnet 4 42.9%**, **GPT-4o 15.4%**, and **Llama 4 Scout 6.7%**.

Figure 1 identifies three descriptive decay shapes:

- **Threshold decay**: o3 and Gemini 2.5 Pro stay near-perfect through **150 or more** simple keyword requirements before declining. The paper broadly describes reasoning-model plateaus in the **100–250** range. Appendix A gives o3 high **97.8% at 250**, versus Gemini 2.5 Pro **84.8%** there; “near-perfect through 250” is not a claim about every reasoning model.
- **Linear decay**: GPT-4.1 and Claude Sonnet 4 in Figure 1. The main text also names Claude 3.7 Sonnet as an example.
- **Exponential decay**: rapid early loss and a low floor, illustrated by GPT-4o and Llama 4 Scout in Figure 1; the main text also names Claude 3.5 Haiku.

These are empirical curve descriptions, not established architectural classes. Newness and reasoning correlate with better results but do not impose a total ordering: Claude 3.7 Sonnet scores **52.7% at 500**, above newer Opus 4 **44.6%** and Sonnet 4 **42.9%**; DeepSeek-R1-0528 is **30.9%** despite being a reasoning model. Appendix A lists Qwen3-235B-A22B at **20.9%**, whereas the main text says **26.9%**; this dossier does not reconcile those inconsistent values into a single score.

**Primacy bias** is the final-third error rate divided by the first-third error rate. Bias generally peaks around **150–200 instructions**, then weakens as failure becomes widespread. Most ratios approach **1.0–1.5** at extreme density, but this is not universal: the best model's Appendix A ratio at 500 is **1.78**. Earlier placement may protect important requirements before overload; it does not recover universal compliance after saturation.

**Omissions dominate modifications** at large counts. Llama 4 Scout's omission:modification ratio reaches **34.88 at 500**. The categorization distinguishes dropping a requirement from approximately realizing it; the prefix heuristic is not a semantic diagnosis of intent.

**Accuracy costs time and can displace core-task quality.** o3 high rises from **26.30 seconds at ten** to **219.58 at 250**; o4-mini medium rises from **12.40 to 436.19 seconds** over the same counts. Most models preserve judged report coherence, but o3 and o4-mini show marked declines under load. The paper suggests limited output length as one explanation rather than proving cognitive-resource competition. Appendix B's efficiency caption praises reasoning-model efficiency, whereas the main text describes several smaller models as better accuracy-per-latency choices; use the underlying measured trade-off rather than a universal efficiency claim.

## Reconciliation with the Other Count Studies

[When Instructions Multiply](/dossiers/when-instructions-multiply.md) reports both average individual-rule accuracy and **all-satisfied prompt accuracy** for heterogeneous text constraints and code-style rules. Its GPT-4o score at ten instructions is **0.85 per-rule but 0.21 all-satisfied** (Tables 9 and 8). IFScale's headline is on the first kind of axis. A high average inclusion rate does not establish a high chance of producing a perfect report, and no independence assumption can turn these seed averages into observed whole-report success.

[Prompt Design at Scale](/dossiers/prompt-design-at-scale.md) uses **perfect-response rate** as its primary instruction metric. Its near-zero outcome by 80 rules concerns five persistent structural obligations plus many lexical constraints, whereas this benchmark's large-count plateau concerns average presence of keywords. There is no contradiction between the two. The former also changes its rule mix with count and evaluates a different, July 2026 model generation; IFScale evaluates a 2025 pool including Gemini 2.5, o3 and Claude 4. Neither study establishes a portable safe instruction limit.

## Analyst Takeaways

1. **Instruction capacity is not context capacity.** Count and rule difficulty deserve their own stress test even when the input fits comfortably.
2. **Use density curves, not a single leaderboard score.** A plateau, a steady decline and a steep early fall imply different operating envelopes; include variance and latency.
3. **Ordering is a partial defense.** Protect high-consequence requirements early, then independently verify them; primacy is not enforcement.
4. **Measure usefulness and compliance separately.** Exact inclusion, readable prose, factual validity, and all-satisfied success are different outcomes.
5. **Staged disclosure and decomposition are hypotheses to test.** The results motivate reducing simultaneous obligations, but IFScale does not directly measure whether those interventions improve end-to-end work.

## Questions and Limitations

English business reports with one-word inclusion requirements do not model conditional policy, semantic reasoning, code correctness, tool actions, or multi-turn persistence. Five seeds per count offer limited evidence about rare failures. Retry screening changes the population being scored, and model-judged coherence is not a human quality oracle. Defaults, hidden reasoning, output budgets, model snapshots and provider behavior can all affect the curves. “Cognitive load,” attention saturation and architectural explanations are interpretations of observed behavior, not demonstrated internal causes. Does splitting the same requirements preserve whole-task quality and mandatory cross-part constraints, rather than merely raising a local inclusion score?

## Vault Ideas Extracted

* [Instruction-Density Compliance Decay](/vault/instruction-density-compliance-decay.md)
* [Prompt Contingency](/vault/prompt-contingency.md)
