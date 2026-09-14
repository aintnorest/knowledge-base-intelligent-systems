---
type: Study Note
title: "GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning"
description: "Study notes on GEPA's natural-language reflective mutations, instance-wise Pareto candidate selection, rollout efficiency, six-task comparisons with GRPO and MIPROv2, and the limits of its cost and latency claims."
resource: https://arxiv.org/abs/2507.19457v2
source: /archive/gepa-reflective-prompt-evolution.pdf
tags: [prompt-optimization, self-improvement, agents, reinforcement-learning, evaluation, inference-efficiency]
timestamp: 2026-09-14T17:12:33Z
---

# GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning — Study Notes

**Authors**: Lakshya A. Agrawal, Shangyin Tan, Dilara Soylu, Noah Ziems, Rishi Khare, Krista Opsahl-Ong, Arnav Singhvi, Herumb Shandilya, Michael J. Ryan, Meng Jiang, Christopher Potts, Koushik Sen, Alexandros G. Dimakis, Ion Stoica, Dan Klein, Matei Zaharia, and Omar Khattab  
**Affiliations**: UC Berkeley, Stanford, BespokeLabs.ai, University of Notre Dame, Databricks, and MIT  
**Venue**: ICLR 2026 Oral  
**Preprint**: arXiv:2507.19457v2 [cs.CL], February 14, 2026  
**Pages**: 96  
**Code**: [gepa-ai/gepa](https://github.com/gepa-ai/gepa)

## What It Is

GEPA (**Ge**netic-**Pa**reto) is a prompt optimizer for compound AI systems: programs containing one or more LLM modules, arbitrary control flow, and potentially retrieval, tools, or other external calls. It keeps model weights fixed and searches over the modules' natural-language instructions.

Its central bet is that an LLM can learn more from a small number of semantically rich traces than a policy-gradient method can learn from the same number of terminal scalar rewards. A rollout exposes module inputs, outputs, reasoning, tool or retrieval behavior, and often evaluator artifacts such as missing-document lists, failed constraints, compiler errors, or profiling results. GEPA gives these traces to a reflection model, which diagnoses what worked or failed and writes a revised instruction. It then treats prompt versions as an evolutionary population rather than greedily retaining only one incumbent.

The paper's evidence is unusually broad for a prompt optimizer: six adaptation tasks, both Qwen3-8B and GPT-4.1 Mini, comparisons with GRPO and several prompt optimizers, full prompts and search trees in the appendix, cross-model transfer, and preliminary inference-time code search. The headline is credible as a result about **rollout sample efficiency in these harnesses**. It is not evidence that prompt search universally costs less, runs faster end to end, or replaces weight training in every regime.

## Why Natural-Language Feedback Matters

A scalar reward says whether the whole system succeeded. The serialized execution and evaluation traces can say which module made the consequential decision and what evidence was missing. GEPA uses that additional channel for implicit credit assignment:

1. Run a selected prompt configuration on a three-example feedback minibatch.
2. Record the selected module's prompt, inputs, outputs, reasoning, final score, and any textual evaluator feedback.
3. Ask a reflection LM to infer the task format, extract domain-specific lessons and reusable strategies from all examples, and produce a replacement instruction.
4. Re-run the updated program on the same minibatch. Discard the candidate unless its average score improves.
5. If it passes that gate, evaluate it on the larger `D_pareto` validation split and add it to the candidate pool with its ancestry.

Modules are selected round-robin, so mutation is localized even though acceptance uses end-to-end performance. The update meta-prompt explicitly asks the reflector to preserve niche factual knowledge and generalizable strategies discovered in the traces. Figure 5 makes this accumulation concrete on PUPA: successive prompts add increasingly explicit privacy abstractions, output structure, transformation rationales, and prohibitions, moving the displayed lineage from 82.26 to 97.60 validation score.

The feedback is task-specific rather than magically supplied by GEPA:

- **HotpotQA and HoVer** identify relevant documents already retrieved and documents still missing at each hop.
- **IFBench** enumerates output constraints that the response satisfied or violated.
- **PUPA** exposes the response-quality and PII-leakage components of its aggregate score.
- **AIME-2025 and LiveBench-Math** use single-step chain-of-thought programs with their task metrics; these settings offer less domain-rich evaluator feedback than retrieval or constraint checking.
- **Kernel search** can surface compiler errors and profiling results and retrieve relevant hardware-manual passages.

This is a real advantage where evaluators already emit diagnostic artifacts. Where the environment yields only a binary answer, the reflection model mainly has the execution trace and outcome, so the information advantage over scalar optimization narrows.

## The Genetic–Pareto Search

GEPA starts with the seed program as the only candidate. Each accepted reflective mutation becomes a child in an ancestry tree. After the rollout budget is exhausted, the candidate with the best aggregate score on `D_pareto` is returned.

### Instance-wise Pareto candidate selection

The paper's use of “Pareto” is specific: the objectives are **validation-instance scores**, not a production frontier over accuracy, cost, safety, and latency.

For every validation instance, GEPA records the best score achieved by any candidate. A candidate survives if it is tied for best on at least one instance; candidates strictly dominated across the per-instance score vector are removed. The optimizer then samples among survivors with probability proportional to the number of instances on which each candidate is a winner.

This preserves specialized but promising branches that an aggregate-score argmax would starve. In the Qwen3-8B ablation across HotpotQA, IFBench, HoVer, and PUPA:

| Selector | Aggregate score | Gain over seed |
|---|---:|---:|
| Always select best | 54.89 | +6.05 |
| Beam search, width 4 | 53.95 | +5.11 |
| GEPA's instance-wise Pareto sampling | 61.28 | +12.44 |

Pareto sampling beat the greedy and beam variants by 6.40 and 7.33 aggregate points, respectively. The accompanying trees show why: greedy search quickly commits to one branch and stalls, while instance winners keep multiple lineages available. This is the paper's cleanest algorithmic ablation.

### System-aware merge

GEPA+Merge adds sparse crossover for modular programs. Two candidates may be merged when they share an ancestor, are Pareto-optimal, both improve on that ancestor, and have changed complementary module prompts. The child takes evolved module versions from the corresponding lineages; if both changed the same module, it takes the version from the higher-scoring parent.

Merge helped GPT-4.1 Mini, raising the six-task aggregate from 65.22 for GEPA to 66.36, but hurt Qwen3-8B overall, lowering 54.85 to 52.40 and sharply regressing IFBench and PUPA. The authors used the same merge timing and budget allocation across models and limit merge to five invocations. Their own conclusion is appropriately cautious: crossover needs mature, genuinely complementary lineages, and its timing and budget should adapt rather than be fixed.

## Six-Task Results

The tasks cover multi-hop QA (**HotpotQA**), instruction following with unseen constraints (**IFBench**), retrieval-augmented claim verification (**HoVer**), privacy-aware model delegation (**PUPA**), competition math (**AIME-2025**), and refreshed math questions (**LiveBench-Math**). Optimizers receive training examples and labels, use validation scores for selection, and are evaluated on held-out test splits.

### Qwen3-8B: direct comparison with GRPO and MIPROv2

| Method | HotpotQA | IFBench | HoVer | PUPA | AIME-2025 | LiveBench-Math | Aggregate |
|---|---:|---:|---:|---:|---:|---:|---:|
| Seed | 42.33 | 36.90 | 35.33 | 80.82 | 27.33 | 48.70 | 45.23 |
| GRPO, 24,000 rollouts | 43.33 | 35.88 | 38.67 | 86.66 | **38.00** | 51.26 | 48.91 |
| MIPROv2 | 55.33 | 36.22 | 47.33 | 81.55 | 20.00 | 46.60 | 47.84 |
| GEPA | **62.33** | **38.61** | **52.33** | **91.85** | 32.00 | **51.95** | **54.85** |
| GEPA+Merge | 64.33 | 28.23 | 51.67 | 86.26 | 32.00 | 51.95 | 52.40 |

GEPA beats GRPO on five of six tasks by 19.00, 2.73, 13.66, 5.19, and 0.69 points; AIME is the exception, where GRPO leads by 6 points. Averaged across the six heterogeneous task metrics, GEPA is 5.94 points ahead of GRPO, the source of the paper's “6% on average” shorthand. Its best prompts are reported to require 4–35× fewer rollouts than GRPO's fixed 24,000, and it matches GRPO's best validation scores in 243–1,179 rollouts, up to 78× fewer.

The comparison is not merely LoRA versus prompts: the appendix reports a two-hop HoVer experiment with full-parameter GRPO and says the relative gap remains similar. Still, GRPO is one manually tuned training recipe, not the entire space of RLVR methods, and prompt optimization and weight optimization produce different deployment artifacts.

### GPT-4.1 Mini: prompt-optimizer comparison

| Method | HotpotQA | IFBench | HoVer | PUPA | AIME-2025 | LiveBench-Math | Aggregate gain over seed |
|---|---:|---:|---:|---:|---:|---:|---:|
| Seed | 38.00 | 47.79 | 46.33 | 78.57 | 49.33 | 58.20 | — |
| MIPROv2, instructions + demos | 58.00 | 49.15 | 48.33 | 83.37 | 51.33 | 61.84 | +5.64 |
| TextGrad | 62.33 | 48.64 | 47.67 | 85.68 | 46.67 | 63.84 | +6.11 |
| GEPA | **69.00** | 52.72 | 51.67 | 94.47 | **59.33** | **64.13** | +12.19 |
| GEPA+Merge | 65.67 | **55.95** | **56.67** | **96.46** | **59.33** | **64.13** | **+13.33** |

GEPA's instruction-only search beats MIPROv2's joint instruction-and-demonstration search on every task under both evaluated models. The most memorable single comparison is Qwen AIME-2025: GEPA scores 32 versus MIPROv2's 20, a 12-point gain, though both trail GRPO's 38. The broader result is stronger than that cherry-picked task: GEPA's aggregate seed improvement is +9.62 on Qwen and +12.19 on GPT-4.1 Mini, compared with MIPROv2's +2.61 and +5.64.

The prompts also transfer across model families. Prompts optimized with Qwen3-8B and evaluated unchanged on GPT-4.1 Mini gain 9.00 aggregate points over the GPT seed, outperforming prompt optimizers run directly on GPT in the reported setup. That is useful evidence that the evolved text contains task rules rather than only model-specific incantations, but it does not make all optimized prompts portable.

## Rollout Efficiency: Strong Result, Narrow Accounting Unit

The paper is careful enough to reveal what the headline omits:

- Most GEPA rollouts are **validation executions used only for candidate selection**, not rollouts that produce reflective learning signals. Only 79–737 training rollouts are needed to reach the reported task optima.
- GEPA uses 1,839–7,051 total optimization rollouts across the six Qwen tasks, versus GRPO's 24,000 each. To match GRPO's best validation score on four tasks, it needs only 6–179 feedback-set rollouts.
- Against MIPROv2, GEPA is capped to the latter's per-benchmark rollout budget; exact usage can still differ by as much as 10.15% because proposal and validation procedures differ.
- Rollouts do not count reflection-model calls. Appendix N reports 21–92 reflection calls per GPT-4.1 Mini task and 17–90 per Qwen task, each potentially carrying a minibatch of long traces and feedback.

So the sample-efficiency claim is meaningful—GEPA extracts more improvement per expensive system execution—but “35× fewer rollouts” is not “35× cheaper.” A rollout, an LM reflection over several traces, an RL forward pass, and an RL backward update have different token, memory, and hardware costs. The paper does not normalize those into FLOPs, tokens, GPU-hours, or wall-clock time.

## Cost and Latency Claims, Separated

The paper makes two different efficiency claims that should not be conflated.

### Optimization-time cost

For all six GPT-4.1 Mini experiments in Table 2, the appendix reports **$86 for GEPA**, **$67 for GEPA+Merge**, **$76 for MIPROv2**, and **$172 total for Trace and TextGrad**. Basic GEPA is therefore slightly *more* expensive than MIPROv2 in the reported dollar accounting, despite producing better prompts. No comparable dollar or wall-clock total is provided for Qwen GRPO; the disclosed recipe uses 24,000 rollouts, an H100/A100 for training, and separate inference GPUs, while the full-parameter experiment uses eight GPUs.

This supports “low enough to run in the authors' API setup,” not a universal cost ordering. The unexplained fact that GEPA+Merge costs less than GEPA also warns that accepted-candidate paths and actual token usage matter beyond the nominal budget.

### Deployment-time prompt cost

GEPA emits instructions only; MIPROv2 can attach up to four demonstrations to every module. Across the displayed optimized systems, GEPA/GEPA+Merge use roughly 4.3–4.8× fewer aggregate prompt tokens than MIPROv2 for GPT-4.1 Mini and 4.5–4.9× fewer for Qwen3-8B, with a task-level maximum of 9.2× on Qwen PUPA. Shorter recurring prefixes plausibly reduce billed input tokens and prefill work.

But prompt token count is explicitly used as a **cost proxy**. The paper does not measure end-to-end latency, time to first token, throughput, KV-cache hit rates, output-token changes, network or tool time, or provider prompt-caching discounts. It also does not compare the optimized prompt lengths with GRPO's deployment prompts. The safe conclusion is that GEPA found smaller prompt artifacts than demonstration-heavy MIPROv2 in these systems; actual latency and serving savings remain deployment-dependent and unmeasured.

## Extended Applications

The code-generation studies repurpose GEPA as inference-time search by putting the exact target problems in both feedback and Pareto sets, intentionally overfitting them while sharing lessons across tasks.

- On an early NPUEval setup for AMD XDNA2, a ten-step GPT-4o refinement agent scored 4.25% mean vector utilization; RAG reached 16.33%, RAG plus MIPROv2 19.03%, GEPA's Pareto search 30.52%, and the final reusable GEPA prompt 26.85% without runtime RAG. Individual generated kernels reached 70% utilization.
- On 35 representative KernelBench tasks for NVIDIA V100, GEPA raised GPT-4o's near-zero `fast_1` score above 20% as rollout budget approached 3,000.

These are promising demonstrations of compiler and profiler feedback becoming prompt-search signal, not a mature evaluation of code correctness, portability, total search cost, or competitive kernel-generation systems. The paper labels them preliminary.

GEPA can also optimize *against* performance. With 150 generations over AIME 2022–2024, it evolved one universal distractor instruction that reduced GPT-5 Mini pass@1 on AIME-2025 from 76% to 10%. Manual inspection found that the model often emitted the literal `### <final answer>` placeholder. This is evidence that reflective evolutionary search can discover prompt vulnerabilities as readily as useful policies.

## Analyst Takeaways

1. **Expose evaluator traces before inventing a better scalar.** Missing documents, failed rubrics, compiler messages, and privacy-score components already contain localized repair information. Preserve them through the evaluator API rather than collapsing them prematurely.
2. **Treat parent selection as a first-class algorithm.** A better mutation model cannot help if greedy selection repeatedly spends the budget on one plateaued lineage. Per-instance winners provide a simple, inspectable diversity mechanism.
3. **Keep three ledgers.** Count environment rollouts, optimizer/reflection tokens and calls, and deployment-time tokens separately. Each answers a different economic question.
4. **Version the entire optimized program.** The artifact is the vector of module prompts plus model versions, control flow, metrics, feedback functions, data splits, and selection policy—not a free-floating “best prompt.”
5. **Use merge only when lineage evidence justifies it.** Complementary module changes are a defensible crossover boundary; fixed merge timing is not. The Qwen regressions show that recombination can spend budget and erase gains.
6. **Audit learned instructions.** The appendix prompts are often rich declarative task guides, but some include dataset-specific facts, questionable generalizations, or instructions to rely on model knowledge beyond retrieved evidence. Human readability makes these defects visible; it does not make them harmless.

## Questions and Limitations

- **No repeated-run uncertainty is reported for the main tables.** With stochastic decoding and small validation sets, point estimates and selected maxima can overstate stable differences; statistical significance is not established.
- **The acceptance gate reuses the mutation minibatch.** A candidate is proposed from a minibatch's failures and accepted for improving that same minibatch before validation, which invites a small-sample winner's effect even though final testing is held out.
- **Aggregate scores average unlike metrics.** QA accuracy, retrieval success, instruction compliance, privacy/quality utility, and math accuracy are all placed on a 0–100 scale, but a six-task arithmetic mean is not a single operational utility.
- **The strongest mechanism depends on diagnostic feedback.** The method is most compelling when the evaluator can name missing evidence or failed constraints. Sparse or noisy feedback may leave reflection with plausible storytelling rather than reliable credit assignment.
- **“Pareto” does not optimize production trade-offs.** Candidate diversity is defined over per-instance task scores; cost, safety, latency, and prompt length do not participate in survivor selection.
- **GRPO is a configured baseline, not a categorical defeat of RL.** The compound-system comparison uses Qwen3-8B LoRA with one manually explored hyperparameter family; the full-parameter result is limited to one HoVer setup. Different RL methods, larger training budgets, or amortization over much larger deployment volume could change the engineering choice.
- **Validation dominates the rollout budget.** The authors suggest smaller or dynamically selected validation subsets, but do not test whether doing so preserves selection quality.
- **Merge is not robust across backbones.** It improves GPT aggregate performance and degrades Qwen, underlining that search-control hyperparameters are model- and task-dependent.
- **Latency is inferred, not observed.** Prompt length is a useful prefill proxy, but the paper supplies no serving measurements and no end-to-end accounting of tools, outputs, caching, or reflection overhead.
- **Extended applications intentionally overfit their target set.** They demonstrate inference-time search, not generalization, and the kernel experiments remain preliminary.
- **Reproduction needs more than the released package.** The paper links public code, but exact model snapshots, API behavior, retrieval corpora, stochastic seeds, evaluator implementations, and hardware still condition the reported results.

## Vault Ideas Extracted

* Updated [Prompt Optimization](/vault/prompt-optimization.md)
* Updated [Rationale-Guided Prompt Rewriting](/vault/rationale-guided-prompt-rewriting.md)
* Updated [Quality–Progress–Novelty Parent Selection](/vault/quality-progress-novelty-parent-selection.md)
* Updated [Budget-Matched Harness-Evolution Evaluation](/vault/budget-matched-harness-evolution-evaluation.md)
