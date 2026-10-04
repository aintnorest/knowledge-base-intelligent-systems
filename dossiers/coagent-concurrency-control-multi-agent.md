---
type: Study Note
title: "CoAgent: Concurrency Control for Multi-Agent Systems"
description: Optimistic shared-state concurrency with fixed agent order, filtered reads, one-way notifications, selective model repair, and registered compensating effects.
resource: https://arxiv.org/abs/2606.15376v1
source: /archive/coagent-concurrency-control-multi-agent.pdf
tags: [multi-agent, orchestration, reliability, tool-use, verification, agents]
timestamp: 2026-10-04T06:15:45Z
---

# CoAgent: Concurrency Control for Multi-Agent Systems — Study Notes

**Authors**: Hongtao Lyu, Dingyan Zhang, Mingyu Wu, Xingda Wei, and Haibo Chen; five authors, all Shanghai Jiao Tong University.  
**Status**: June 13, 2026 arXiv preprint. Supplied source metadata describes submission to ATC 2026; the archived manuscript provides no acceptance evidence, so this is not treated as a peer-reviewed publication.

## What It Is

Tool-call middleware for concurrent agents acting on one shared live system. Its Monotonic Trajectory Pre-Order protocol (MTPO) replaces long-held locks and whole-task aborts with **notification-guided selective repair**, while mechanically undoing misordered effects when necessary.

## Problem and Motivation

An agent's accumulated observations become premises for minutes of inference. Broad reads amplify lock contention and optimistic-validation aborts. Many live targets cannot be meaningfully cloned or buffered: deployed services and third-party actions change the world immediately.

In the motivating Kubernetes case, one agent repairs bad deployment images while another creates a canary from an image it read earlier. Each reports success, yet the canary remains faulty. Either serial order would leave the canary repaired. Individually plausible behavior does not imply a serializable joint result.

## Mechanism as an Idea

MTPO fixes an agent serialization order **at launch**, distinct from physical tool-call order. Each tool declares read/write objects and the type of write. Per-object trajectories retain ordered effects, not merely last values, because read–modify–write operations must compose with prior state.

Reads receive the state permitted by the reader's rank, filtering out higher-ranked writes. Depending on the target, this uses historical materializations, recorded read results, or temporary undo of later effects for live access. When a lower-ranked write changes a higher-ranked reader's premise, the runtime delivers a **one-way notification** before its next inference. The model determines whether the change matters and repairs only affected work; a completed agent may reopen for such repair.

Writes land speculatively. Misordered effects are corrected through registered inverses; an overriding blind write can make replay unnecessary, while composed effects require unwind/reordering. Irreversible actions are held until lower-ranked agents commit. Tools capture needed recovery state before applying the effect, rather than trying to invent an inverse after information is destroyed.

Unconditional two-way notification is insufficient: mutually reactive agents can repeatedly invalidate one another and livelock. Fixed precedence orients repair dependencies in one direction. At global quiescence, with no pending notifications, the target is intended to match the pre-decided serial execution.

Workers are constrained to footprint-bound tools. A privileged **read-only ToolSmith** explores unfamiliar targets and synthesizes or audits new tools, including declared objects and inverses, when a worker lacks an operation. Tool discovery is separated from mutation authority, although correctness still relies on accurate declarations and tool behavior.

## Results and Admissions

The concurrency evaluation constructs **ten contended task pairs**: five WorkBench office-automation tasks and five AIOpsLab operations tasks, each paired with a hand-created competing task and hand-written invariants. Each protocol runs **ten trials per cell** using DeepSeek V4 Flash. Supply-side throttling/reconnection/queueing trials are discarded and rerun; aborted retries are capped at five.

Figure 5 reports invariant satisfaction of **98% serial, 13% naive, 96% two-phase-locking with compensation, 93% optimistic control with compensation, and 93% MTPO**. MTPO reaches **1.43× serial speed** and **1.15× token cost**; locking reaches **1.04×** at **1.45× cost**, and optimistic control **0.93×** at **1.83× cost**. Locking deadlocks average **0.81/trial**; optimistic aborts **0.95/trial**.

The five-point MTPO gap to serial is attributed to **five of 100 trials** where the notified model misjudges relevance. “Passes all ten workloads” therefore means coverage across cells, not 100% trial correctness. The canary case runs **32.8 s MTPO versus 50.2 s serial**, repairing in **6.4 s** after notification instead of roughly 29 s for optimistic redo.

A separate cold-start tool-growth experiment uses DeepSeek V4 Pro over **71 AIOpsLab tasks**, excluding eight of 79 instances requiring unsupported fault-injection infrastructure. ToolSmith grows **25 tools: 11 snapshot reads, two live reads, and 12 undoable writes**. The constrained worker passes **63/71 versus 45/71** for a same-model bash baseline, taking **4,910 versus 6,118 s (0.80×)** and **$0.64 versus $0.75 (0.86×)**. Reported component costs **$0.43 worker + $0.22 ToolSmith** sum to $0.65; rounding may explain the one-cent discrepancy. This comparison also changes interface guidance and accumulated prior knowledge, not just concurrency control.

## Analyst Takeaways

1. **Repair information can be cheaper than restarting inference.** A localized changed premise lets a model retain unaffected progress.
2. **Advisory control does not mean unstructured broadcast.** Fixed precedence, filtered reads, footprint mediation, and quiescence rules supply the mechanical structure around model judgment.
3. **Compensation must be designed before effect.** Capturing prior state and withholding irreversible actions is stronger than a later promise to undo.
4. **A theorem conditional on correct healing is not model-independent safety.** The observed five relevance mistakes are inside the practical trust boundary, not erased by formal ordering.
5. **Pre-write prevention and notify-and-repair target different boundaries.** Declared-scope admission can block known risky authority; this approach preserves progress when live effects and stale premises require repair.

## Questions and Limitations

The serializability argument assumes individually successful tasks with premise-satisfying serial starts, all shared access through accurately declared tools, timely notification consumption, and correct semantic self-healing. Hidden footprints, wrong inverses, ignored notifications, or erroneous healing invalidate those assumptions. State equivalence at quiescence is not proof that every transient external consequence was harmless.

The ten pairs are deliberately constructed for contention, with two agents and selected invariants. They do not establish repository-scale coding quality or performance on uncontended production workloads. Removing provider jitter improves internal comparisons while limiting realistic wall-clock interpretation. The tool-growth experiment is one ordered stream with a shared growing catalog, not independent cold starts or a controlled isolation of the repair protocol.

## Vault Ideas Extracted

* [Interruption Recovery Without Duplicate Effects](/vault/interruption-recovery-without-duplicate-effects.md)
* [Pre-Write Intent Admission](/vault/pre-write-intent-admission.md)
