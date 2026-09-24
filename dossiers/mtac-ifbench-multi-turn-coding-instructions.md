---
type: Study Note
title: "MTAC-IFBench: Benchmarking Instruction-Following in Multi-Turn Agentic Coding"
description: A 100-task coding-agent benchmark separating turn-by-turn constraint compliance from executable and functional outcomes as requirements accumulate and change.
resource: https://arxiv.org/abs/2609.14992v1
source: /archive/mtac-ifbench-multi-turn-coding-instructions.pdf
tags: [coding-agents, agents, benchmark, evaluation, verification, reliability]
timestamp: 2026-09-24T03:45:00Z
---

# MTAC-IFBench: Benchmarking Instruction-Following in Multi-Turn Agentic Coding — Study Notes

**Authors**: Bosi Wen, Cunxiang Wang, Jiayi Gui, Haoke Zhang, Yilin Niu, Pei Ke, Dayong Yang, Hongning Wang, and Minlie Huang  
**Venue**: arXiv:2609.14992v1 [cs.CL]  
**Date**: September 14, 2026

## What It Is and Why It Matters

MTAC-IFBench evaluates coding agents that progressively build one project across multiple user turns while retaining repository rules and changing user constraints. Ordinary software benchmarks emphasize final functionality; this benchmark asks whether the agent also followed instructions about tools, workflow, language, style, files, and implementation while delivering the project. A project can run and meet many final features yet have violated important instructions along the way.

Its 100 instances average 7.04 turns, 91.33 turn-level constraint checklist items per instance, and 16.07 final function checklist items per instance. The 9,133 constraint items span six primary and 18 secondary categories: content, language, quantity, style, environment, and workflow. Repository-policy rules persist; earlier user constraints can be replaced. Examples include encoding, comment language, test execution, complexity, and file operations—not merely output format.

## Construction and Evaluation

Starting from curated development requests and two source benchmarks, a model expanded requests into 374 candidate multi-turn sequences; other models integrated constraints and drafted checklists. Seventeen annotators revised retained items, an inspector checked each instance, and the final set contains 100 tasks. The turn sequences and many constraints are constructed rather than observed unedited user sessions.

Each agent receives turns sequentially, preserving project and trace. At every turn, checklist items are evaluated by verification scripts where deterministic or by judge agents with trace and project access. Final-function items use a judge, including browser interactions where appropriate. The protocol reports constraint satisfaction rate (CSR: mean item compliance), strict constraint instruction success (C-ISR: every constraint at a turn), final function satisfaction (FSR), strict final function success (F-ISR: every function for a project), and build success (BSR: runnable project). Their units differ: C-ISR counts turns; F-ISR and BSR count final projects. The main environment is Claude Code v2.1.14; an OpenCode subset tests harness dependence.

## Findings

- Among 11 Claude Code model configurations, GLM-5.2 leads the reported overall CSR at **80.4%** and C-ISR at **12.7%**. Claude-Opus-4.6 obtains **78.6% CSR / 8.7% C-ISR**; Gemini-3.1-Pro **71.0% / 11.1%**. GLM-5.2's strict turn success falls from **27.6%** for turns 1–2 to **2.6%** for turns 9–10. These buckets have different eligible-turn counts; the overall averages are not a pooled count of 9,133 checklist items.
- The final-function table reports only six of the 11 configurations. Claude-Opus-4.6 produces **98/100 runnable projects**, averages **90.2%** function-item satisfaction, and meets *all* final functions on **37/100**. GLM-5.1 reports **98% BSR, 83.0% FSR, 29% F-ISR**. Do not infer missing final-function scores for GLM-5.2 or other omitted models.
- For GLM-5.2, changing the harness to OpenCode yields **76.8% CSR / 6.7% C-ISR**, versus **80.4% / 12.7%** in Claude Code. Not every paired model favors Claude Code; harness is part of the tested configuration, not a neutral conduit.
- A manual reliability audit of **600 sampled items** reports agreement with human consensus of **92.1%** for script-checked constraints (**164** items), **92.4%** for judge-checked constraints (**236**), and **85.5%** for judge-checked functions (**200**). Function negative-class F1 is **0.764**, an important reminder that judged feature outcomes are not ground truth.
- Category and placement analyses describe difficult orchestration, quantitative controls, and project-wide consistency, and more durable repository-policy than user-turn constraints. The paper's 30-instance placement comparison is suggestive, not a production causal estimate.

## Analyst Takeaways

1. **Keep final behavior and process compliance as separate acceptance gates.** Compile and exercise the deliverable, but independently check persistent repository policy, latest-turn requirements, and tool/process constraints against project state and trace.
2. **Track rule scope and supersession explicitly.** A previous user rule can be replaced, whereas repository policy remains active; blindly carrying every previous instruction forward creates false positives and false negatives.
3. **Use item-level checklists but audit the auditors.** Script checks suit observable invariants; subjective checks need cited evidence and human calibration, especially negative judgments.
4. **Evaluate the deployed model–harness pairing.** A model leaderboard under one agent scaffold cannot be treated as its context-free capability, and strict all-constraints pass rates expose failures obscured by high mean satisfaction.

## Questions and Limitations

- Only 100 constructed sequences, from a selected development-task mix; security fixes and schema migration are named coverage gaps. Some imposed rules are unusual and may conflict with ordinary engineering quality.
- Checklist correctness is imperfect even on sampled audits; model-based judges may exhibit self-enhancement and verbosity bias, and multi-call verification is costly.
- The report does not establish that placing constraints in repository files improves production quality or that all constraint categories are equally important. Strict all-items success falls mechanically as applicable rule count grows.
- The functional and strict-constraint percentages cannot be directly subtracted: they have different units and populations.

## Vault Ideas Extracted

* [Machine-Readable Agent Specifications](/vault/machine-readable-agent-specifications.md)
* [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md)
