---
type: Study Note
title: "Prompt Design at Scale: How Format, Instruction Count, and Context Length Shape Instruction Adherence and Hallucination in Large Language Models"
description: VeyraBench crosses instruction density with format and placement, and separately tests long-context recall and abstention, distinguishing near-zero perfect responses from per-rule compliance and qualifying several headline claims.
resource: https://arxiv.org/abs/2607.19257v1
source: /archive/prompt-design-at-scale.pdf
tags: [prompting, evaluation, context-engineering, long-context, reliability, benchmark]
timestamp: 2026-10-04T06:39:21Z
---

# Prompt Design at Scale — Study Notes

**Author**: Netanel Eliav, Machine Human Intelligence Lab; single-author paper.  
**Status**: arXiv:2607.19257v1, July 21, 2026; explicitly non-peer-reviewed preprint. Version 1 is the only revision listed at ingest. Model names and ceilings below are the paper's reported experimental identities, not independent certifications of vendor specifications.

## What It Is

Two experiments released as **VeyraBench**. Experiment 1 tests instruction compliance while varying rule count, rendering format and instruction placement. Experiment 2 tests factual recall, false-premise agreement and absent-fact fabrication over increasingly long renderings of the synthetic **Book of Veyra**. The five reported models are **Claude Sonnet 5**, **Claude Haiku 4.5**, **Gemini 3.5 Flash**, **Qwen 27B**, and **Qwen 35B**. The Qwen identifiers are local aliases, not fully specified public checkpoint revisions, and their reasoning generation is disabled.

## Problem and Motivation

Format advice is often promoted without specifying the model or the scale of its input. A format can be harmless at a few rules or a short document and behave differently when hundreds of obligations compete or context approaches an effective ceiling. The study tries to separate format choice from instruction placement, simultaneous rule count, context size, and distinct kinds of factual failure.

## Mechanism as an Idea

**Experiment 1** asks for a benign short essay with **N = 10, 20, 40, 80, 120 or 160 rules**, crossed with **four formats** (markdown, plain text, prose, table) and **two placements** (system or user). Twenty trials per cell yield **960 calls per model**, **4,800 across five models**. Five rules are always present: word-count range, exact first word, exact closing sentence, no exclamation marks, and paragraph count. The remaining rules require or forbid words. Deterministic checks grade the responses.

The primary metric is **perfect-response rate: the fraction of essays satisfying every rule**. Format and placement differences are also reported as **per-instruction-check adherence**, a different denominator. At N=160, all-satisfied success can be zero while the individual-check score still distinguishes placements.

**Important composition caveat:** the five fixed structural obligations are **half the rules at N=10 but only about 3% at N=160**. Average rule difficulty is not held constant as N grows. Perfect-response rate avoids diluting a failed structural rule among easy lexical checks, but it does **not** make this a pure count intervention: adding requirements still changes the task and its joint-success probability. The author says the qualitative floor also holds when scoring only the fixed structural subset.

**Experiment 2** renders the same fictional entity facts in the four formats across nominal **2k, 16k, 64k, 128k, 256k and 512k** context rungs. Questions test recall of stated facts, response to a false premise, and answers to facts never supplied. Main-set questions change with rung; a fixed **20-question anchor set** is repeated to check cross-rung comparisons. Three repeats per question are used. Sonnet 5 and Gemini Flash reach 512k; the other three stop at 128k. Nominal rung labels are not equal token budgets: at the 512k rung the source measures **374,446 plain-text tokens versus 511,985 table tokens** with one proxy tokenizer, holding facts constant instead of tokens.

## Results and Admissions

### Joint compliance approaches a floor, not literal zero everywhere at 80

Table 4 pools formats and placements:

| Model | Perfect at N=10 | Perfect at N=40 | Perfect at N=80 |
|---|---:|---:|---:|
| Sonnet 5 | 0.938 | 0.238 | 0.000 |
| Claude Haiku | 0.850 | 0.119 | 0.000 |
| Gemini Flash | 0.919 | 0.312 | 0.019 |
| Qwen 27B | 0.588 | 0.094 | 0.006 |
| Qwen 35B | 0.725 | 0.100 | 0.000 |

The abstract's “zero by N=80 for every model” is too literal: **Gemini retains 1.9% and Qwen 27B 0.6%** pooled perfect responses there. All Table 4 entries at N=120 and N=160 are zero. The supported summary is **near-zero by 80**, not proof of an exact universal cutoff.

### Placement and format effects are model-specific

At N=160, placement is at least as consequential as format in **four of five models** according to the paper. User-minus-system per-check adherence is **+6.6 percentage points for Haiku**, **+5.1 for Qwen 35B**, **−8.7 for Gemini Flash**, and **−1.8 for Qwen 27B**; Sonnet 5 is not statistically distinguishable from zero. This is not evidence that the user role should supersede system authority in a deployed application: the experiment moves an identical benign block while leaving the other role empty.

There is **no reliable universal markdown advantage**. Qwen 35B favors plain text at five of six counts, with markdown-minus-plain adherence **−4.8 points at N=160**. Gemini's prose/table per-check adherence at N=40 is **18.1/13.7 points below plain**, linked by transcript inspection to missing essays and apparent planning-text leakage. Thus “no general winner” does not mean format effects are always small.

The scorer detects duplicate-content anomalies: **72 flagged responses**, of which **43 Qwen responses** have recoverable essays extracted using fixed opening/closing anchors and re-scored. The other 29 remain failures. Reported scores therefore include deterministic artifact recovery rather than uniformly grading every raw visible response unchanged.

### Long-context factual failure is not one outcome

Recall is **0.98–1.00 through 64k** in the reported cells; separation begins at 128k for some models, not every model failing beyond one shared limit. At Haiku's 128k rung, Table 7 gives **plain 0.383**, **markdown 0.817**, and **prose/table 0.867**, a **48.4-point best-minus-worst spread**. Sonnet 5 at 512k gives **plain 0.867**, **table 0.817**, and **markdown/prose 0.667**. Format preference reverses across models and rungs.

Across **5,760 main-set absent-fact probes**, the paper reports **zero fabricated specific answers**. The maximum false-premise agreement rate is **8.3%**, **5 of 60 Qwen 35B responses at 128k/markdown**. Neither result proves absence of hallucination or sycophancy in other tasks. Declining an absent-fact question is scored as correct and cannot distinguish successful absence detection from reflexive abstention.

Table 8 shows **false-premise-probe refusal**, not an all-task refusal rate: Haiku goes from **0% at 2k to 89.6% at 128k**; Sonnet 5 reaches **78.8% at 512k**, but starts at **15.4%, not 0%**. Other endpoints are much lower: Gemini Flash **25.0% at 512k**, Qwen 27B **36.2% at 128k**, and Qwen 35B **15.4% at 128k**. The abstract's “0% to 79–90%” compresses selected endpoints and must not be generalized to every model or probe. Refusal is an omitted answer, not necessarily a safety-policy refusal.

Format costs also differ: measured overhead relative to plain is **+25.8% markdown**, **+22.1% prose**, and **+36.7% table**. At Haiku 128k, prose and table tie on raw recall but prose has better accuracy divided by relative token cost (**0.710 vs. 0.634**). This is a proxy-token efficiency calculation, not exact billed cost or an experiment at equal token budgets.

## Reconciliation with the Other Count Studies

[IFScale](/dossiers/ifscale-how-many-instructions.md) scores **average inclusion of individual keywords**, not perfect responses. Its strongest 2025 models can be near-perfect on that softer metric through 150+ simple inclusion rules while VeyraBench's 2026 model pool almost never satisfies every lexical and structural obligation by 80. Neither result measures the same task or denominator, so the difference is not evidence of regression in newer models.

[When Instructions Multiply](/dossiers/when-instructions-multiply.md) is a peer-reviewed comparison of both metrics. At ten heterogeneous text rules, GPT-4o achieves **0.85 instruction-level accuracy but 0.21 prompt-level success**. This demonstrates the metric gap directly. Here, perfect-response rates and pooled per-check placement effects must likewise remain separate. VeyraBench's changing structural-rule fraction further prevents a raw per-rule curve from being interpreted as constant-difficulty instruction capacity.

The shared empirical lesson is **declining joint reliability under more simultaneous obligations**, not one universal limit at ten, forty, eighty or five hundred. Rule family, output length, scoring and artifact recovery, model generation and reasoning policy all condition the result.

## Analyst Takeaways

1. **Test count, format and placement together.** A validated sparse prompt is not evidence for its dense form; preserve authority boundaries when testing role placement.
2. **Report both joint and per-check metrics.** A zero perfect-response score can coexist with meaningful differences in partial compliance.
3. **Separate incorrect answers, false-premise agreement, fabrication and non-answers.** Lower fabrication can coexist with poor answer coverage.
4. **Use stable questions for length comparisons.** Changing question sets can create spurious improvement; the anchor set is the stronger cross-rung control.
5. **Test redesigns rather than announcing their benefit.** Splitting rules across turns, tools or validation passes is recommended, but Section 10 identifies recovery under those interventions as future work.

## Questions and Limitations

This is one non-peer-reviewed study of synthetic essay rules and fictional fact lookup, not code, legal compliance, real retrieval corpora or agent actions. Twenty trials per instruction cell and 60 repeated responses per recall cell are modest; individual checks and repeated questions are clustered rather than independent evidence. Wilson intervals over pooled checks should not automatically be read as prompt-level uncertainty. The corpus is described as 8,780 entities, while the largest Table 3 slice contains 8,779. Novel synthetic names reduce contamination but do not by themselves prove every name absent from every training set.

Several reporting inconsistencies require caution: Experiment 2's stated **30,480 total responses**, **5,520 per full-context model**, and smaller counts for the other three do not reconcile as written; the contribution list still says “four-model” despite the five-model design. Some prose descriptions of format rankings disagree with Table 7. The table values, rather than those broad prose rankings, ground this dossier. Exact checkpoint identities behind the Qwen aliases, scoring recovery, and call accounting warrant raw-result audit before quantitative reuse. These issues do not justify inventing corrected denominators.

What matters more causally: number of obligations, fixed structural-rule interference, output budget, or token exposure? Would an equal-token format experiment preserve these rankings? Does selective disclosure restore end-to-end compliance without hiding mandatory obligations? The archived preprint motivates these tests but does not settle them.

## Vault Ideas Extracted

* [Instruction-Density Compliance Decay](/vault/instruction-density-compliance-decay.md)
* [Prompt Contingency](/vault/prompt-contingency.md)
