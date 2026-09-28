---
type: Synthesis
title: Ledger-Centered Agent Control Plane
description: Durable work items anchor agent scheduling, supervision, and independent integration review across disposable execution sessions.
tags: [agents, orchestration, multi-agent, coding-agents, long-horizon, verification]
timestamp: 2026-09-28T21:00:00Z
---

# Ledger-Centered Agent Control Plane

A ledger-centered control plane treats a durable work item—not a terminal session, conversation, or branch—as the unit of assignment, scheduling, and review. A persistent worker identity can own the deliverable through multiple ephemeral sessions and workspaces, while a separate scheduler reconciles claims and a distinct integration authority decides whether the output can land.

## Operating Pattern

| Responsibility | Durable record or decision | Boundary |
| --- | --- | --- |
| Coordination | Work item, dependencies, scope, owner, and review handoff | Organizes deliverables independently of worker memory. |
| Execution | Claim, attempt, workspace, and event history | A failed session does not delete the task or authorize a second live owner. |
| Supervision | Health observation, bounded recovery, and escalation | Watchdogs detect exceptions; they do not approve every normal worker transition. |
| Integration | Submitted artifact, checks, review, and merge admission | Worker completion is not a merge decision. |

Partition cross-project coordination from project-local implementation ledgers, route stable identifiers to the canonical ledger for their scope, and let worktrees share that canonical record rather than fork conflicting copies. At the integration boundary, one possible strategy is to verify the tip of a stacked batch, admit a passing batch, and narrow a failing batch through prefix checks. This is an integration design, not proof that a particular deployment has implemented it or that tests catch every defect. [Agent Work Liveness Invariants](/vault/agent-work-liveness-invariants.md) specifies how to recognize a stranded item; [Machine-Readable Agent Specifications](/vault/machine-readable-agent-specifications.md) covers the versioned workflow rules that guide workers without replacing scheduler authority.

## Why It Matters

A human can supervise only so many live conversations before repeatedly reconstructing context. Durable tasks allow a fresh worker to recover the intended deliverable and evidence without requiring a human to steer every turn. Separate roles prevent a health monitor from becoming an implicit reviewer and prevent a worker's success report from bypassing integration gates.

## Practical Use

- Record one accountable assignee, current execution claim, dependency edges, artifact references, and human-review state for each work item.
- Keep runtime prompts and policy versioned beside the work, but make the scheduler authoritative for claims and external state reconciliation.
- Let health supervisors repair stalled ownership within defined bounds; escalate unresolved work to an explicit owner.
- Require an independent integration gate for artifacts; when batching, verify the combined state and isolate failures without treating worker-local checks as sufficient.

## Limitations

A canonical ledger becomes an availability and consistency dependency. Worktree separation does not prevent conflicting changes, and review gates only detect represented failures. Tracker persistence and stable identity do not guarantee exactly-once tool effects; interrupted runs need separate fencing and receipts ([Interruption Recovery Without Duplicate Effects](/vault/interruption-recovery-without-duplicate-effects.md)). First-party architecture descriptions may mix deployed behavior and planned phases.

## Sources

- [An open-source spec for Codex orchestration: Symphony dossier](/dossiers/openai-symphony-orchestration.md) — reports the interactive-session supervision bottleneck and describes ticket-driven scheduling, per-issue workspaces, and review handoffs.
- [Gas Town — Multi-Agent Workspace Coordination dossier](/dossiers/gastown-coordination-model.md) — separates persistent assignment, disposable workers, health-supervision roles, and an integration owner; batching deployment status is disputed across its sources.
- [Gas Town Architecture — Two-Level Work Ledger and Merge Admission dossier](/dossiers/gastown-two-level-architecture.md) — distinguishes cross-project and local ledgers, canonical worktree-visible records, persistent worker identities, and a planned batch-then-bisect integration design.
- [Paperclip Specification — Board-Governed Agent Control Plane dossier](/dossiers/paperclip-control-plane-spec.md) — specifies task assignment and atomic checkout with distinct human governance, heartbeat, and budget authority.
- [Coder Agents: Architecture dossier](/dossiers/coder-agents-architecture.md) — places persistent conversation and status state in a control plane distinct from replaceable workspaces and model inference.
- [Symphony Service Specification dossier](/dossiers/openai-symphony-service-specification.md) — assigns tracker reconciliation and claims to a single scheduler while keeping repository workflow policy and runtime sessions separate.
