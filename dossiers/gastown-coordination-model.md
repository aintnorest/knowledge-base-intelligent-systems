---
type: Study Note
title: Gas Town — Multi-Agent Workspace Coordination
description: A first-party overview of persistent work identity, role-separated supervision, and merge-queue boundaries for concurrent coding agents.
resource: https://github.com/gastownhall/gastown/blob/main/README.md
source: /archive/gastown-coordination-model.md
tags: [agents, multi-agent, orchestration, coding-agents, long-horizon, verification]
timestamp: 2026-09-28T00:00:00Z
---

# Gas Town — Multi-Agent Workspace Coordination — Study Notes

## What It Is

Gas Town coordinates coding agents across project repositories. A Mayor breaks requests into tracked work, bundles related issues into convoys, and assigns polecats: workers whose sessions are disposable but whose identity and work history persist. A crew workspace remains human-owned. This README mixes design claims with extensive operational instructions; the durable contribution is the division between task state, execution sessions, supervision, and code integration.

## Coordination and Recovery

The Beads ledger stores work independently of an agent's conversational memory. Assignments attach to hooks/worktrees, so an interrupted session can resume with a persisted task and versioned files rather than rely on remembering a prior conversation. Formulas instantiate tracked multistep work; lightweight runtime steps trade checkpoint detail for lower overhead, whereas materialized steps support recovery. The separate session-discovery facility finds predecessor session logs for decisions, but those logs complement rather than replace the work ledger.

The Mayor coordinates, per-rig Witnesses detect stalled/zombie workers and nudge or hand off, and a cross-rig Deacon supervises patrol and escalation. The README distinguishes a dead session from merely reduced progress, although it does not substantiate its claimed comfortable scale of 20–30 agents with a benchmark. Escalations can reach the human Overseer. The default scheduler dispatches directly; an optional capacity governor defers dispatch to avoid provider limits. This is a dispatch policy, not a correctness guarantee.

## Integration Boundary

Polecats submit branches to a per-rig Refinery instead of writing directly to main. The documented intended path batches pending merges, verifies the combined stack, and bisects a failing batch to isolate bad changes while retaining passing ones. This centralizes integration and reduces repeated full-stack checks, but a green batch still depends on the quality of its verification gates. The companion architecture document labels batch-then-bisect as a planned phase, not an already established implementation; this README describes it as operational. Treat deployment status as unresolved across these two captures.

## Takeaways and Limits

1. Persistent work identity and files can outlive sessions; a fresh agent need not inherit an entire transcript to own a recoverable task.
2. Separate coordination, worker-health supervision, and merge admission; a worker reporting completion is not evidence that its change passed integration.
3. Supervision should route stalled work to a responsible actor rather than let a failed session silently erase an assignment.

This source is vendor documentation, not a measured reliability study. Worktree persistence and predecessor-session discovery do not establish exact-once external effects, and the reported scale and merge behavior are not independently evaluated here.

## Vault Ideas Extracted

* [Structured Execution Memory](/vault/structured-execution-memory.md)
* [Reviewable Change Units](/vault/reviewable-change-units.md)
* [Agent Work Liveness Invariants](/vault/agent-work-liveness-invariants.md)
* [Ledger-Centered Agent Control Plane](/vault/ledger-centered-agent-control-plane.md)

