---
type: Study Note
title: "SyncMind: Measuring Agent Out-of-Sync Recovery in Collaborative Software Engineering"
description: ICML 2025 research evaluates recovery from stale repository understanding, separating localization, repair, assistance seeking, and synthetic resource awareness.
resource: https://arxiv.org/abs/2502.06994v2
source: /archive/syncmind-agent-out-of-sync-recovery.pdf
tags: [coding-agents, multi-agent, reliability, evaluation, benchmark, agents]
timestamp: 2026-10-04T06:16:21Z
---

# SyncMind — Study Notes

**Authors**: Xuehang Guo, Xingyao Wang, Yangyi Chen, Sha Li, Chi Han, Manling Li, and Heng Ji; seven authors affiliated with UIUC, All Hands AI, and Northwestern University.  
**Venue**: Peer-reviewed **ICML 2025**, verified from the PDF's “Proceedings of the 42nd International Conference on Machine Learning,” PMLR 267, Vancouver. Archived arXiv revision 2 is dated June 9, 2025.

## What It Is

SyncMind formalizes recovery when an agent's belief about a project differs from its actual state. SyncBench creates stale-function scenarios from repository history: **24,332 raw instances**, filtered to **8,461**, then downsampled to **300 evaluation instances** across **21 Python repositories**. The published experiments are on the 300-instance subset, not the entire raw benchmark.

## Problem and Motivation

Static coding benchmarks assume that observations remain current. In collaborative engineering, another contributor can change dependencies or behavior while an agent is occupied. A correct action under an old model can then fail in the current repository. Recovery requires identifying the missed update, acquiring relevant evidence, and revising the working model—not just removing a visible exception.

## Mechanism as an Idea

The benchmark starts with a passing repository state and rolls a function back through history until tests fail. **Caller** tasks make a test function stale; **Callee** tasks make an imported dependency stale, adding localization and dependency-tracing difficulty. The final evaluation set contains **150 of each**.

Agents can explore and propose repairs independently, or additionally ask a simulated knowledgeable collaborator. The collaborator receives task context, update history, and the reference solution but is instructed to answer only what was asked. This is an information-access experiment with an oracle-informed answerer, not live peer development.

Recovery success requires both successful test execution and parsed test outputs matching the reference state. Separate metrics measure file/function localization, success conditioned on localization, assistance-seeking share of interaction turns, and fractions of available turns and synthetic budget consumed. A **30-turn** default, extended to **50** in resource experiments, constrains action sequences. Monetary budgets and action costs are hypothetical units, not actual API invoices or human labor prices.

## Results and Admissions

- Overall independent/collaborative success rates in Table C1 are **0.33%/1.33% Llama-3.1-8B**, **2.67%/3.33% Llama-3.1-70B**, **3.99%/5.32% GPT-4o mini**, **7.33%/7.67% DeepSeek-V2.5**, **4.00%/8.00% GPT-4o**, **16.33%/19.00% Llama-3.3-70B**, and **28.18%/33.70% Claude-3.5-Sonnet**.
- Assistance gains range from approximately **0.33 to 5.52 percentage points**. Assistance seeking occupies at most **4.86% of interaction turns**; this is not the percentage of tasks in which help is requested.
- Giving GPT-4o mini exhaustive oracle recovery instructions in a single-turn experiment reaches **86.33%**, versus **5.32%** in collaborative multi-turn recovery. This compares different information/protocol conditions, not a deployable guaranteed upper bound.
- Successful recoveries front-load **85.71–100.00%** of their assistance requests into the first half of the run, versus **55.76–97.93%** in failures. Early assistance is associated with success; the experiment does not randomize request timing.
- Larger synthetic budgets and cheaper assistance change behavior little. Those sensitivity experiments involve the two Llama-3.1 models, so the claim of universal resource insensitivity exceeds direct coverage.

A revealing failure trace changes expected test results and applies broad version-string substitutions after repeatedly failing to diagnose the real mismatch. Continued activity and a completion claim are not evidence of restored synchronization.

## Analyst Takeaways

1. **Track observation freshness, not only memory retention.** A perfectly remembered old state can still be wrong. This differs from [Behavioral State Decay](/vault/behavioral-state-decay.md), where available evidence stops influencing behavior.
2. **Separate localization from implementation.** A capable repairer can fail because it never identifies the changed dependency; resource allocation should expose which stage is blocked.
3. **Ask bounded, evidence-bearing questions early.** The useful request identifies a concrete uncertainty and incorporates observed failure, rather than seeking generic reassurance.
4. **Protect the reference outcome from repair incentives.** Matching independently established execution results is stronger than accepting a worker's report or its edited local assertions, though it is still bounded by test coverage.

## Questions and Limitations

Historical rollback simulates stale knowledge through an altered code artifact; it does not reproduce ongoing multi-writer state changes or measure an internal belief directly. Current tasks use visible pass-to-fail divergences; latent pass-to-pass mismatches are discussed but not included. The oracle-informed collaborator is more knowledgeable than a typical human or peer and can still answer imperfectly. Question quality is classified partly by whether the run succeeds, making its association with success outcome-conditioned rather than an independent quality validation.

The PDF contains numerical inconsistencies. Table 1's independent Llama-3.1-8B Caller/Callee rates are **1.33%/0.67%**, inconsistent with the equal-size subset's **0.33% overall** in C1. Time-extension prose says independent 8B performance falls **0.33 points** and 70B gains **3.67 independent/4.67 collaborative**; Table C5 instead shows **0.33→0.67%**, **2.67→7.33%**, and **3.33→7.00%**, respectively. Some collaborator-delta rows give **2.33** where underlying rates imply **0.66**. Preserve explicit table rates and do not infer exact denominators for nonstandard percentage increments.

## Vault Ideas Extracted

* [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md)
* [Structured Agent Communication Contracts](/vault/structured-agent-communication-contracts.md)
