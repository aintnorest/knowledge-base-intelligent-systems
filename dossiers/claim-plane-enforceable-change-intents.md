---
type: Study Note
title: "Claim Plane: Enforceable Change Intents and Dynamic Scope for Parallel Coding Agents"
description: A deterministic pre-write authority architecture separating committed from contingent scope, with atomic promotion, fencing, broker provenance, and a six-pair feasibility check.
resource: https://arxiv.org/abs/2607.21909v1
source: /archive/claim-plane-enforceable-change-intents.pdf
tags: [multi-agent, coding-agents, access-control, orchestration, reliability, agents]
timestamp: 2026-10-04T06:15:45Z
---

# Claim Plane: Enforceable Change Intents and Dynamic Scope — Study Notes

**Author**: Maxim Nikolaev, Vladivostok State University, Russia; single-author paper.  
**Status**: July 2026 arXiv preprint and prototype design paper; no peer-reviewed venue is stated.

## What It Is

A model-agnostic coordination layer between planning and repository mutation. It asks whether workers' declared rights and premises may coexist **before** accepting writes, rather than waiting for independently generated branches to conflict. It is not a task-decomposition system or a replacement for tests, review, or Git integration.

## Problem and Motivation

Isolated worktrees prevent direct byte clobbering but not incompatible contracts, stale assumptions, or late scope expansion. Narrow plans miss supporting edits; broad plans reserve too much and collapse concurrency. The architecture separates uncertain prediction of future work from deterministic authority to perform it.

## Mechanism as an Idea

A versioned change intent binds a worker to an exact base commit, typed resources, operations, dependencies, preservation obligations, and a liveness lease. **Committed scope** reserves current mutation authority. **Contingent scope** declares plausible support work, treated initially as a read premise rather than a write reservation.

Admission atomically compares the incoming intent with the active set. It checks overlap, destructive operations, shared contracts, base identity, and dependency cycles. Unknown overlapping writes fail closed. Same-file parallelism requires disjoint declared regions and later evidence that actual hunks stayed inside them. Dependencies can permit producer–consumer work, but changes invalidate affected premises and propagate staleness transitively through consumers.

The first attempted contingent mutation triggers **atomic promotion and re-admission**. Only the concrete needed path or region becomes committed, not an entire broad pattern. Failed promotion leaves the prior authority unchanged. Region authorization uses base-image coordinates; current edits map conservatively back to that image rather than silently widening permission to accommodate an inaccurate plan.

Enforcement requires a trusted mutation broker. Every effect revalidates intent version, base, repository, lease, and exact operation capability. A prepare record precedes the effect. One writer lease per physical worktree, an OS lock tied to Git's canonical repository identity, and monotonic fencing reject superseded writers even if they remain alive. A compare-and-swap Git-tree chain detects out-of-band changes.

Integration freezes an immutable worker tree, derives a patch and manifest from that same snapshot, verifies it without allowing mutation, and applies the **same persisted patch bytes** in producer-first order. This binds permission, observed effects, verification, and the integrated artifact rather than trusting a worker's report.

## Results and Admissions

The preliminary check uses **six development pairs**, three conflict-labeled and three clean, with one coder seed. DeepSeek V4 Pro plans and V4 Flash codes. Static and dynamic policies reuse the same calibrated plans. Gold-patch locations localize initial context, and provider calls are physically sequential: this is mechanism evidence, not measured concurrent speedup.

| Policy | Pair pass | Integration | Initial serialization |
| --- | --- | --- | --- |
| Unconstrained parallel | 2/6 (33.3%) | 3/6 (50.0%) | 0/6 |
| Static admission | 6/6 (100%) | 6/6 (100%) | 6/6 |
| Dynamic admission | 3/6 (50.0%) | 4/6 (66.7%) | 3/6 |
| Always serial | 4/6 (66.7%) | 6/6 (100%) | 6/6 |

Dynamic execution records **seven successful promotions**, no rejected promotions, and **two undeclared-mutation blocks**. Static success comes with complete serialization. The sample does not support comparative effectiveness or gate-accuracy claims. The proposed frozen-plan, 30-pair, three-seed study is future work in this source.

## Analyst Takeaways

1. **A plan is a proposal, not a permission grant.** Deterministic admission can remain authoritative even when a model predicts scope badly.
2. **Defer uncertainty without granting latent writes.** Contingent scope preserves options only if promotion rechecks the current active set before effect.
3. **Leases need fencing and a real boundary.** Registry ownership alone cannot stop a stale process or direct host writes.
4. **Verify what will actually land.** Immutable snapshots and identical checked/applied patch bytes close a verification-to-integration race.
5. **Report reliability and retained concurrency separately.** Serializing everything can recover safety without delivering useful parallelism; see [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md) for the complementary isolation stack.

## Questions and Limitations

- The safety proposition assumes complete broker interception, atomic registry transitions, locks/fencing, and final broker-tree verification. Bypass channels are expressly outside it.
- Typed extraction is Python-first. Strict non-bypassable isolation is Linux-first; macOS operation has weaker process-isolation assumptions.
- SQLite authority and OS locks are single-host. Multi-host operation needs network-authoritative leases and fencing, not merely shared declarations.
- Conservative planner calibration improves coverage while reducing precision. Dynamic promotion does not solve unknown dependencies or missing scope.
- A learned semantic-dependency sensor and selective frontier escalation are a research agenda, not evaluated components. The model would propose classifications; deterministic admission would still hold authority.

## Vault Ideas Extracted

* [Interruption Recovery Without Duplicate Effects](/vault/interruption-recovery-without-duplicate-effects.md)
* [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md)
* [Pre-Write Intent Admission](/vault/pre-write-intent-admission.md)
