---
type: Study Note
title: "TicTacBench: Benchmarking Timing Closure Capabilities of Coding Agents"
description: Thirty RTL repair tasks show that post-place-and-route timing and functional equivalence are stronger acceptance gates than synthesis-time timing proxies for hardware coding agents.
resource: https://arxiv.org/abs/2609.23363v1
source: /archive/tictacbench-timing-closure-coding-agents.pdf
tags: [coding-agents, agents, benchmark, verification, evaluation, agent-skills]
timestamp: 2026-09-24T03:45:00Z
---

# TicTacBench: Benchmarking Timing Closure Capabilities of Coding Agents — Study Notes

**Authors**: Bowei Wang, Zhigang Fang, Zhijie Yang, Renzhi Chen, Shanshan Li, and Lei Wang  
**Venue**: arXiv:2609.23363v1 [cs.AI]  
**Date**: September 20, 2026

## What It Is

TicTacBench asks a coding agent to repair a suboptimal RTL design that violates setup timing while preserving interface, function, and permitted latency. Success is decided after **place and route (post-PnR)**, not merely by synthesis- or pre-PnR timing estimates. The task forces the distinction between a plausible source change, functionally valid hardware, and a design that actually closes timing under the supplied physical flow.

The authors select **25 designs** from 90 candidates with meaningful arithmetic, pipeline, or control critical paths and add **five latency-changeable** tasks, for **30 total**. Each provides RTL, SDC constraints, timing reports, and equivalence-check artifacts. Agents may inspect and modify RTL and use limited pre-PnR static timing analysis, but cannot query the hidden post-PnR evaluator while exploring. Yosys, SymbiYosys, and LibreLane/OpenROAD/OpenSTA underpin the open-source validation flow; hold repair is outside the task.

## Evaluation and Results

**Timing Closure Rate** is the fraction of final designs with post-PnR setup WNS = 0. Improvement figures compare each optimized design with its own baseline; negative ADP improvement means area–delay degradation. The eight-model leaderboard reports **GPT-5.4 at 53.3% closure (16/30)**, **Kimi K2.6 at 43.3% (13/30)**, **DeepSeek V4 Pro at 40.0% (12/30)**, and **MiniMax M2.7 at 23.3% (7/30)**. Claude Sonnet 4.6's stated **41.4%** appears to reflect a missing run (12/29), but that denominator is not explicitly explained. Approximately **23%** of tasks are not closed by any tested agent.

The best closure rate does not mean the best change on every dimension. The model-labeled Figure 3 gives GPT-5.4 **48.7% mean WNS repair, +5.5% EDDP improvement, and −2.5% ADP improvement**. DeepSeek V4 Pro has **55.9%** WNS repair but only **40.0%** closure. Every baseline agent's mean ADP improvement is negative. Pre-PnR timing is a poor acceptance substitute: Figure 1 shows substantial prediction errors and only **62.1%** agreement in one pre-PnR winner-selection comparison; the second displayed winner comparison has **48.3%** agreement but ambiguous source labels.

An LLM-assisted analysis of **240 complete trajectories** identifies failure themes: poor STA-report localization, weak datapath/pipeline/control-path restructuring, unproductive search, and accepting pre-PnR improvements that do not survive physical evaluation. The authors report **46.9%** of failures lack at least one of three structural changes; this is a trajectory classification, not a controlled estimate of a cause.

**TicTacSkill** instructs the agent to locate the actual critical cone, state the structural mechanism of a planned edit, check moved register boundaries, inspect control/decode placement, and avoid declaring closure on a weak proxy. Paired 30-task comparisons report GPT-5.4 **53.3% → 56.7%** closure, MiniMax **23.3% → 36.7%**, and DeepSeek V4 Flash **33.3% → 43.3%**. Their mean gain is approximately **nine percentage points**, not a nine-percent relative increase for every model. MiniMax's EDDP worsens **−0.7% → −7.2%** despite its closure gain; GPT-5.4 and MiniMax also worsen ADP.

## Analyst Takeaways

1. **Use the production-near outcome as the final gate.** Cheap static timing gives actionable feedback but cannot certify post-PnR behavior. The parallel in ordinary software is integration/performance measurement after unit-level compilation.
2. **Require an explicit change hypothesis.** Have the agent connect a cited critical path to the intended structural edit, verify equivalence, and then compare the actual timing and resource result.
3. **Treat a skill as a tested intervention, not a magic checklist.** Paired task comparisons are useful, but closure gain can hide power, area, or energy regression; monitor the full acceptance vector.

## Questions and Limitations

- Thirty selected small designs omit CDC, memory-centered cases, industrial sign-off variation, and hold repair. One task changes a 30-task success rate by 3.33 percentage points; no uncertainty intervals or repeated-seed variability are printed.
- The abstract's **7.18% ADP degradation and 8.83% EDDP improvement** for the best agent conflict with the GPT-5.4-labeled **−2.5% ADP and +5.5% EDDP** in Figure 3/Table IV. This dossier uses explicitly model-labeled values and does not silently reconcile them.
- The missing Claude result and ambiguous labels on Figure 1 complicate direct leaderboard/proxy comparisons. Physical-flow success is not proof of closure under other tools, corners, libraries, or chip-level constraints.
- LLM-coded trajectory diagnoses need independent review before treating their categories as causal explanations.

## Vault Ideas Extracted

* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md)
* [Intended-Path Benchmark Validation](/vault/intended-path-benchmark-validation.md)
