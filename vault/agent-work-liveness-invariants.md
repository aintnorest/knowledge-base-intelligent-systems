---
type: Synthesis
title: Agent Work Liveness Invariants
description: A nonterminal agent task remains live only when durable state identifies its owner and an executable, waiting, or bounded recovery path.
tags: [agents, orchestration, long-horizon, reliability, multi-agent]
timestamp: 2026-09-28T21:00:00Z
---

# Agent Work Liveness Invariants

Agent work is live when every nonterminal work item has a persisted responsible actor and a deliverable next move. A status label, conversational promise, process identifier, or successful model turn is not enough: the control plane must be able to find who will act, what event will wake them, or where a failed path escalates.

## State and Edges

| Record | Question answered | Failure if conflated |
| --- | --- | --- |
| Parent edge | Which deliverable organizes this subtask? | Child existence is mistaken for a reason to block the parent. |
| Blocker edge | Which unfinished work prevents this action? | A cancelled or stranded blocker is counted as resolved. |
| Assignment and execution claim | Who owns delivery, and which run currently holds execution? | A dead session either erases accountability or competes with a successor. |
| Durable wake or recovery action | What event and owner restart progress? | A detached watcher or prose note masquerades as a continuation path. |

A healthy dependency chain has a live or explicitly waiting path at each unresolved leaf. Completion of a child wakes its parent only if a real dependency or declared wait connects them. A turn ending is a checkpoint: reconcile the external work item before deciding to continue, schedule a retry, release the claim, or close terminal work. See [Ledger-Centered Agent Control Plane](/vault/ledger-centered-agent-control-plane.md) for the scheduling boundary and [Interruption Recovery Without Duplicate Effects](/vault/interruption-recovery-without-duplicate-effects.md) for safe replacement of a failed run.

## Why It Matters

Session-centric supervision loses work when a process disappears, while a task marked active without a routable next action can remain indefinitely stuck. Durable ownership makes repair visible without treating worker assertions as acceptance or promoting a stale completion event to authoritative task state.

## Practical Use

- Reconcile active claims with fresh tracker state before dispatching new work; retain claims across scheduled retries so a gap between sessions does not trigger duplicate dispatch.
- Persist the wake trigger, owner, and bound for asynchronous waits. Consume a one-shot wake on delivery and explicitly rearm it if waiting continues.
- On a stranded assignment, attempt bounded same-owner recovery; if that cannot restore a deliverable path, record an explicit human-owned escalation rather than silently changing owner.
- Validate blocker leaves and workspace reachability, not just the parent issue's status or a worker heartbeat.

## Limitations

A liveness record establishes a visible route to progress, not successful delivery or safe replay. Tracker polling can fail; workspaces can persist while external writes remain unknown. Recovery requires separate ownership fencing and effect reconciliation, and human-owned waits have different heartbeat expectations from automated work.

## Sources

- [Symphony Service Specification dossier](/dossiers/openai-symphony-service-specification.md) — specifies tracker reconciliation, claim-spanning retries, turn continuation, and restart without restored sessions or timers.
- [Paperclip Execution Semantics — Ownership and Durable Liveness dossier](/dossiers/paperclip-execution-liveness.md) — defines durable next-move paths, distinct parent and blocker edges, leaf health, and bounded same-owner repair.
- [Gas Town — Multi-Agent Workspace Coordination dossier](/dossiers/gastown-coordination-model.md) — illustrates a persistent assignment ledger and health supervision across disposable worker sessions.
- [Hermes Agent — Subagent Delegation and Ownership Boundaries dossier](/dossiers/hermes-subagent-delegation.md) — distinguishes completed-result delivery from still-running child ownership and acknowledges unknown work after an owner crash.
