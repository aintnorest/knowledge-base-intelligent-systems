---
type: Study Note
title: "CodeCRDT: Observation-Driven Coordination for Multi-Agent LLM Code Generation"
description: Shared observable convergent state enables implicit parallel coordination, but task-dependent latency, semantic conflicts, and eventual claim convergence limit the guarantee.
resource: https://arxiv.org/abs/2510.18893v1
source: /archive/codecrdt-observation-driven-coordination.pdf
tags: [multi-agent, coding-agents, orchestration, evaluation, reliability, agents]
timestamp: 2026-10-04T06:15:45Z
---

# CodeCRDT: Observation-Driven Coordination — Study Notes

**Author**: Sergey Pugachev; single author, no institutional affiliation stated.  
**Status**: October 18, 2025 arXiv preprint; no peer-reviewed venue is named.

## What It Is

An implementation and empirical study of coordination through **shared observable state**, rather than explicit agent messages. CRDTs provide the convergent substrate, but the broader idea descends from blackboards, tuple spaces, and stigmergy: agents infer what remains to do by observing the environment other agents change.

## Problem and Motivation

Sequential role handoffs preclude overlap; independent branches defer reconciliation. Concurrent generation needs visible progress and a way to avoid redundant work, but mathematical text convergence does not ensure compatible program behavior. The source distinguishes this coordination pattern from a claim that CRDTs outperform every alternative substrate.

## Mechanism as an Idea

An outliner creates a TypeScript/React skeleton containing pending work markers. Implementers observe updates, claim markers through a shared last-writer-wins ownership map, and fill regions concurrently. They skip completed work, absorb new imports and naming, and back off from overlapping edits. An evaluator waits for completion and scores the result; compiler diagnostics can support later semantic repair.

The claim protocol writes an owner, waits for synchronization, rereads ownership, and proceeds only if it appears to have won. Deterministic resolution selects one eventual owner. The appendix's safety argument applies **after convergence** and assumes the verification wait exposes that state. Eventual convergence is not instantaneous exclusion: a fixed wait cannot by itself stop two partitioned agents from acting on locally successful claims. Crashed claims are reclaimed after a **120-second timeout**.

A shared text document converges character edits; the ownership map coordinates tasks; an append-only trail records activity. The reference deployment has a centralized relay despite the CRDT's distributed convergence semantics. Observation callbacks incur work proportional to agent count times update frequency, and changing context can force renewed reasoning.

## Results and Admissions

Claude Sonnet 4.5 is both generator and evaluator across **600 trials: six tasks × two modes × 50 runs**. Parallel and sequential modes use the same observation-driven pattern; there is no experimental comparison against alternative consistency substrates. At most **five agents** are measured.

Mean response time is **60.92 s sequential versus 68.90 s parallel (+13.1%)**. Per-task changes range from **21.1% faster** for Tic-Tac-Toe to **39.4% slower** for an algorithm visualizer; registration and Markdown improve **7.1% and 7.2%**, while Pomodoro and dashboard slow **35.9% and 29.1%**.

Code generation inflates **81.9% Pomodoro, 97.6% dashboard, and 188.6% visualizer**. Time per thousand characters improves for **five of six tasks (11–52%)**, while Markdown worsens **5.8%**. These ratios do not isolate causal coordination overhead: generated volume is itself an outcome of parallel policy. The abstract and validity discussion acknowledge confounding by volume, latency, and observation cost, while later prose more strongly attributes raw slowdowns to volume.

LLM rubric scores report **+25.0% performance** (11.06→13.82, paired effect size **1.51**), **−7.7% code quality** (17.13→15.81, **−0.71**), and **−5.6% accessibility** (14.18→13.39, **−0.59**). “Performance” is a judged code property, not measured runtime speed. Architecture is not significantly changed (**p=0.158**). Overall score rises **1.0%**, **p=0.029**, and latency **p=0.022**; neither clears the paper's stated six-metric Bonferroni threshold **0.05/6**.

The pipeline completes **600/600 with zero crashes, convergence failures, or character-level data loss**. This does not mean generated code passes tests or compiles: TypeScript errors span **0.59–5.93 per thousand characters**. A **60-run manual inspection** yields a preliminary **5–10% semantic-conflict estimate**. The same passage states **20% for simple and 80% for complex tasks** without a clear denominator; those figures are not reconciled with the aggregate estimate.

Latency analysis removes **83/600 observations (13.8%)**, split **42 parallel and 41 sequential**; scores retain all samples. Coupling labels come from post-hoc inspection. Projected behavior at tens of agents is explicitly speculative, not a measured scalability result.

## Analyst Takeaways

1. **Observe durable progress rather than narrating every action.** Shared task and artifact state can reduce messaging and redundant generation when components are separable.
2. **Convergent ownership is not an enforceable lease.** A system requiring pre-write exclusion needs an authoritative admission boundary, not a wait-and-reread assumption under eventual consistency.
3. **Retaining both edits is not retaining both intentions.** Duplicate declarations and mismatched references remain semantic failures even with zero merge intervention.
4. **Measure delivered behavior and total cost, not bytes per second alone.** Extra code can improve a judged optimization score while increasing latency and reducing maintainability.
5. **Preserve negative outcomes and uncertainty.** Task coupling and context invalidation can reverse the benefit of concurrency; source-level speedup maxima are not system-wide productivity evidence.

## Questions and Limitations

Six small UI tasks, one model family, same-model judging, no human quality baseline, and no functional runtime benchmark limit generalization. The description of tasks as **under 100 lines** sits uneasily with table outputs of **11,509–53,068 characters**; the source does not clarify whether that bound describes task seeds rather than generated artifacts.

The paper reports update latency **median 50 ms / P95 200 ms**, but elsewhere says **sub-10 ms synchronization**; those may measure different spans, which are not defined sufficiently to equate them. Its claimed at-most-one-winner theorem needs actual convergence before action, not merely a 50 ms wait. Eventual register agreement cannot retroactively undo duplicate effects.

Paired tests and paired effect sizes are reported without clearly identifying stochastic run matching. Table commentary claims negligible effect heterogeneity with consistent directions even though latency directions reverse across tasks. Normalized efficiency is descriptive, not proof that coordination is free. Stronger [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md) and independent integration checks address boundaries not supplied by character convergence.

## Vault Ideas Extracted

* [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md)
* [Pre-Write Intent Admission](/vault/pre-write-intent-admission.md)
