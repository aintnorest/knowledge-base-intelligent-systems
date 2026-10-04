---
type: Study Note
title: "AgentRoom: Concurrent Multi-Agent Coding in a CRDT-Backed Shared Workspace"
description: Advisory atomic file claims and explicit signalling over a convergent shared workspace reduce abandonment, with bounded judge-based comparisons and imperfect claim adherence.
resource: https://arxiv.org/abs/2608.23740v1
source: /archive/agentroom-crdt-shared-workspace.pdf
tags: [multi-agent, coding-agents, orchestration, evaluation, reliability, agents]
timestamp: 2026-10-04T06:15:45Z
---

# AgentRoom: Concurrent Multi-Agent Coding in a CRDT-Backed Shared Workspace — Study Notes

**Authors**: Seonglae Cho (Holistic AI) and Donghyun Lee (University of California, Berkeley); two authors.  
**Status**: August 24, 2026 arXiv preprint. The archived PDF explicitly says **“Preprint”** and contains no ICML 2026 acceptance statement; an acceptance claim is not supported by this source.

## What It Is

A room-style state-management primitive for concurrent coding agents: a CRDT-backed shared filesystem, atomic file-claim state, append-only broadcasts, and peer status. Unlike implicit observation-driven coordination, it makes intent and ownership explicit without assigning fixed roles or requiring a central orchestration agent.

## Problem and Motivation

Parallel workers can duplicate or overwrite work; character-level merge can preserve both incompatible edits. A lone agent can also abandon a hard multi-file task with a stub and an early success-like exit. The paper asks whether explicit coordination suppresses this failure better than isolated parallel outputs or a shared convergent substrate alone.

## Mechanism as an Idea

Character-level edits converge through a shared CRDT, with a two-second merge interval and a bracket-balance sanity check. Convergence protects edit retention, not type compatibility or behavior. Two inconsistent function signatures can both survive and break the program.

File claims are atomically accepted or rejected in room state, avoiding the ambiguity of simultaneous prose claims. **Writes themselves are not kernel-enforced by those claims**: cooperation is prompted, and an agent can write without owning a file. The design intentionally admits cross-agent unblocking repairs, later surfaced in coordination logs, rather than enforcing an absolute write exclusion boundary.

Agents observe peer state, negotiate file ownership, adapt to conflicts, and broadcast interfaces and completion. These channels coordinate plans; CRDT convergence reconciles bytes. The bundle is co-designed, and component probes only partially separate substrate, prompt, and structured signalling.

## Results and Admissions

The main tasks are four backend applications sharing Express.js/TypeScript. Five coding models are attempted; the powered pooled comparison uses Sonnet 4.6, Haiku 4.5, and GPT-5.4. Gemini becomes usable after a protocol-framing fix but is underpowered; GPT-5.4-mini remains excluded for concurrent-interface failures.

Across **12 model–task strata**, pooled abandonment is **40/131 solo versus 5/94 room**. The stratified common odds ratio for solo versus room is **13.7**, 95% CI **[3.9, 48]**, **p < 10⁻⁵**, with homogeneity **p = 0.92**. T4 Haiku drops **12/35 to 1/17**; GPT-5.4 **9/17 to 2/21**; Sonnet **6/33 to 0/17**, individually underpowered at **p = 0.070**. “One-file abandonment” is operationalized through early exit or at most two source files, not a universal semantic failure definition.

For the T4 Sonnet budget-fair pool, the LLM-judge composite is:

| Condition | Mean | Runs |
| --- | --- | --- |
| Reimplemented sequential role pipeline | 0.333 | 6 |
| Isolated parallel outputs with later-file tie-break | 0.456 | 12 |
| Solo | 0.544 | 32 |
| Shared CRDT only | 0.575 | 11 |
| Shared CRDT plus collaboration prompt, no room tools | 0.588 | 7 |
| Full room, two agents | 0.669 | 14 |

Full room versus parallel-merge yields **+0.213**, Welch **p = 0.003**. The room-tool increment over the prompt-only bundle is **+0.081**, but its interval spans zero: the source claims ordering, not a precise percentage attribution. Parallel-merge uses file union with a later-timestamp winner, a weak baseline that can silently discard one agent's file.

Agent-count scaling on that task is **0.544 / 0.669 / 0.553 / 0.489** for one through four agents. Two-agent compute is **1,072 s versus 550 s solo**, despite similar wall time (**561 versus 550 s**). The solo-to-room quality comparison therefore does not hold total compute fixed; the room-versus-two-agent parallel baseline is more closely matched.

Claim adherence is incomplete. Among **65 observable runs with changed source**, mean unclaimed-write rate is **0.11** and **39/65** cover every changed file. Unclaimed writes correlate positively with judged quality (**r = 0.28**, bootstrap CI **[0.06, 0.46]**); this is observational and may reflect useful unblocking, not evidence that violations improve quality. Missing per-agent authorship prevents measuring edits to another agent's claimed file.

Cross-domain checks are descriptive: Python DevBench hidden tests pass **8/10 room versus 7/10 solo**. Rust judged means are **0.740 (n=4) versus 0.714 (n=5), p=0.68**; one lower-scoring room run (**0.580**) is excluded for duplicated inconsistent enums, a coordination artifact. A post-hoc ten-capability execution probe gives room **5.06/10 (n=17)** versus solo **3.67 (n=33)** and parallel-merge **1.00 (n=15)**. It corroborates endpoints, not every intermediate judge ordering.

## Analyst Takeaways

1. **Structured claims and write enforcement are different guarantees.** Atomic ownership state can reduce coordination ambiguity while leaving direct mutation advisory.
2. **Byte convergence does not reconcile intent.** Explicit interfaces and dependency messages remain useful even when every edit is retained.
3. **A boundary needs a sanctioned repair path.** Cooperative violations can unblock work, but an enforced variant would need explicit transfer or amended authority rather than an apology as permission.
4. **Compare both quality and compute.** Similar wall budgets can hide roughly doubled inference work; more agents did not monotonically improve outcomes.
5. **Keep independent behavior checks beside judge composites.** Self-authored tests and lexical/AST scores can reward plausible structure without executing required capabilities.

## Questions and Limitations

The primary quality measure is a Sonnet judge over truncated repository snapshots, cross-checked with regex and AST scorers and a small cross-vendor panel. Main-task tests are agent-authored, not held-out correctness oracles. The paper's “judge-free” abandonment language is qualified by a codebook described as classifying **sub-0.3 score events** using deterministic runtime/file metadata; deterministic labeling alone does not demonstrate fully scorer-independent inclusion. Claims of perfect inter-rater agreement are tautological for a deterministic classifier, not validation of its thresholds.

Pools and exclusions differ between tables. Seven of 13 sequential-pipeline runs are excluded as infrastructure failures. The Rust exclusion and the Python table's **856 s** room run under a stated **600 s** budget limit clean matched-budget interpretation. The source variously emphasizes three powered versus four CLI-stable models; these are different pools, not five fully evaluated systems.

Claim compliance, zero semantic conflicts, and cross-file compatibility are not enforcement theorems. The advisory examples include intentional same-file boundary violations, and the Rust excluded run is itself a semantic coordination failure. No controlled multichannel experiment attributes quality decline to broadcast saturation. Findings are small-task, hosted-model snapshots, not general production correctness or proof of an accepted conference venue.

## Vault Ideas Extracted

* [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md)
* [Pre-Write Intent Admission](/vault/pre-write-intent-admission.md)
