---
type: Study Note
title: An LLM Compiler for Parallel Function Calling
description: ICML 2024 evidence for dependency-graph planning, deterministic ready-task dispatch, streamed execution, and replanning instead of one model turn per tool call.
resource: https://arxiv.org/abs/2312.04511v3
source: /archive/llmcompiler-parallel-function-calling.pdf
tags: [orchestration, tool-use, agents, inference-efficiency, decomposition, evaluation]
timestamp: 2026-10-04T05:20:08Z
---

# An LLM Compiler for Parallel Function Calling — Study Notes

**Authors**: Sehoon Kim, Suhong Moon, Ryan Tabrizi, Nicholas Lee, Michael W. Mahoney, Kurt Keutzer, and Amir Gholami  
**Source**: Peer-reviewed ICML 2024 paper; archived arXiv v3, June 5, 2024.

## What It Is

LLMCompiler replaces a serial reason–call–observe loop with a model-generated directed acyclic graph of tool work and a runtime that executes ready nodes concurrently. Its compiler analogy is about dependency analysis and scheduling, not compiling model weights or guaranteeing a correct plan.

## Problem and Motivation

A model turn between every independent lookup adds decoding, repeated prompt exposure, and tool latency. It also lets intermediate observations derail a known investigation: the authors observe repeated identical calls and decisions made before all requested evidence is gathered. Parallelism alone does not remove repeated reasoning if the model still has to rediscover dependencies after every group of calls.

## Mechanism as an Idea

The **planner** identifies tasks, arguments, and result dependencies. A **task-fetching unit**, implemented without another LLM, substitutes completed results and greedily dispatches ready tasks. The **executor** runs those tasks concurrently with local intermediate memory and forwards outputs to dependents. A final reasoning step combines results.

Streaming starts execution as soon as a complete task and its dependencies are available, overlapping plan generation with tool execution. Where future work depends on unknown observations, the system returns results to the planner and builds another graph. Thus a static graph covers known dataflow, while replanning handles genuinely new decisions; the system does not pretend every task is knowable upfront.

## Results and Admissions

The evaluation covers 1.5K HotpotQA comparison questions, 500 movie-recommendation questions, 113 custom ParallelQA examples, 100 Game-of-24 problems, and WebShop. With GPT models, Table 1 reports:

- HotpotQA: **3.95 s versus 7.12 s**, a **1.80×** speedup over the specially prompted ReAct baseline; accuracy is **62.00% versus 62.47%**, not an improvement.
- Movie recommendation: **5.47 s versus 20.47 s**, **3.74×** faster, with **77.13% versus 72.47%** accuracy.
- ParallelQA: **16.69 s versus 35.90 s**, **2.15×** faster; GPT accuracy is **89.38% versus 89.09%**. LLaMA-2 accuracy rises from **59.59% to 68.14%**, an **8.55-point** gain, but its listed latency rises from **15.47 s to 26.20 s** despite a reported **2.27×** speedup. Those latency cells and the speedup are internally inconsistent.

Table 2 reports cost reductions of **3.37×, 6.73×, and 4.65×** for these three GPT workloads. These are historical token/pricing comparisons, not current serving economics. Streamed planning reduces ParallelQA latency from **21.72 s to 16.69 s** (**1.30×**); its gains on the shorter-search workloads are much smaller.

WebShop illustrates a different tradeoff: GPT-4 success improves from **35.2% to 55.6%** versus ReAct, but latency increases from **19.90 s to 26.73 s**. The headline **101.7×** speedup is against exhaustive LATS exploration, not ReAct. The 50-example GPT-3.5 comparison gives **44.0%** success versus LATS's **38.0%**; the 500-example run reaches **48.2%**. LATS and LASER quality numbers are taken from their papers rather than reproduced uniformly.

Planner and final-answer overhead limit scaling; movie planning and answer generation take **1.88 s** and **1.62 s** on average. In ParallelQA's failure analysis, **8%, 64%, and 28%** of failures are attributed to planning, execution, and final synthesis. Better scheduling does not fix wrong attributes, unit conversions, or conclusions.

## Analyst Takeaways

1. **Known dependency resolution belongs in the runtime.** A completed prerequisite is a scheduling fact, not a reason to spend another model turn authorizing an already-planned action.
2. **Parallelism is a dataflow property.** Independent work can overlap; result-dependent work must wait. Streamed plans further overlap planning with execution.
3. **A complete evidence plan can improve behavior as well as latency.** It reduces accidental repeated searches and premature decisions, while still needing replanning when evidence changes the task.
4. **Compare the actual baseline and quality target.** Broader exploration can improve success while being slower than a shallow serial baseline; headline speedups can refer to a much more expensive search policy.

## Questions and Limitations

- ParallelQA deliberately favors facts available in Wikipedia's first paragraph, minimizing retrieval failures rather than testing realistic open-world search.
- Several reporting inconsistencies warrant caution: Game-of-24 LLaMA speedup is 2.09× in Table 1 but 2.01× in the text; Appendix A quotes movie-recommendation values while describing HotpotQA. The ParallelQA latency/speedup mismatch above is more consequential.
- Side-effect ordering, rate limits, resource saturation, cancellation, and unsafe generated graphs are not established by these benchmark results.
- Prompted baselines, model versions, and 2023-era pricing affect both cost and accuracy comparisons. Task success, cache behavior, tail latency, and total verified progress should be measured again for a new harness.

## Vault Ideas Extracted

* [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md)
