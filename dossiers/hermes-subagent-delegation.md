---
type: Study Note
title: Hermes Agent — Subagent Delegation and Ownership Boundaries
description: A fresh-context delegation model with constrained inherited tools, completion receipts, session-scoped control, process handoff, and optional worktree isolation.
resource: https://hermes-agent.nousresearch.com/docs/user-guide/features/delegation
source: /archive/hermes-subagent-delegation.html
tags: [agents, multi-agent, orchestration, agent-harness, coding-agents, reliability]
timestamp: 2026-09-28T00:00:00Z
---

# Hermes Agent — Subagent Delegation and Ownership Boundaries — Study Notes

## Delegation Contract

Each child starts with a fresh conversation, its own terminal session, inherited project instructions, and no implicit parent transcript. The parent must provide the subtask's needed context explicitly; only the child's final summary ordinarily enters parent context. An optional output schema validates the response, with one correction turn on failure; if still invalid, the raw work is retained and visibly marked unvalidated rather than discarded. Children inherit the parent's available tools but cannot broaden them, and several parent-level actions—messaging users, writing shared memory, or scheduling work—are withheld. Delegation is flat by default; nested orchestrators require an explicit depth increase, since branching depth multiplies cost.

Top-level batches execute concurrently but normally return a single consolidated result. Independent per-task completions are opt-in because each result can wake the parent again, fragmenting an extended campaign. Grouping changes *delivery*, not dependencies or execution ordering. The default concurrency limit is ten children; one-shot runs have an additional smaller delegation limit to discourage expensive self-review fan-out. A stronger planner with cheaper workers is a proposed cost strategy, not an empirically controlled quality guarantee; the worker model choice is global for this delegation path.

## Durable Results Are Not Durable Execution

Completed background results persist before delivery and can be rerouted after restart, with competing consumers claiming a result before acknowledging it. Admission to a gateway queue is not proof that a model turn or user-visible reply completed; replay can be at least once. A child still running when its owner process disappears is instead `unknown`: Hermes cannot prove its external side effects or resume that execution. Session stop/close cancels its children and descendants, returning partial output, rather than silently declaring successful completion. Progress-based stall detection interrupts children with no activity (450 seconds between turns or 1,200 inside tools), then grants a 120-second unwind window before a terminal stalled result. This avoids a global wall-clock cap on productive long-running children, but a progress signal itself cannot certify useful work.

Child-owned background processes terminate when that child finishes, including processes started in earlier turns. A PID in a summary is not a handoff. The runtime supports an explicit ownership transfer to the parent under a registry lock; otherwise the child should wait and report the result. Notifications for internal child processes are suppressed in the parent by default while the substantive delegation result is retained. Parent steering is session-scoped and queued for the child's next iteration boundary: accepted steering that never landed is reported as missed rather than assumed obeyed.

## Workspace and Security Limits

Parallel workers share the working directory by default; optional per-child git worktrees protect the parent's checkout and isolate edits, with committed or dirty work retained for parent review. Empty clean worktrees are pruned only after inspection proves they contain no work. Crucially, non-git directories, remote terminal backends, or failed creation silently fall back to a **shared** workspace: the isolation option is not a fail-closed security boundary. A separate review subagent has full inherited privileges and inspects artifacts, so independent review is not equivalent to a lower-trust reviewer.

The source is living product documentation, not a benchmark of correctness or a proof of side-effect isolation. Its sharpest design lesson is to represent execution owner, delivery acknowledgement, and worktree/process handoff as distinct contracts; a successful delegation summary cannot substitute for any of them.

## Vault Ideas Extracted

* [Structured Agent Communication Contracts](/vault/structured-agent-communication-contracts.md)
* [Trajectory-Preserving Model Handoff](/vault/trajectory-preserving-model-handoff.md)
* [Bounded Tool Observations](/vault/bounded-tool-observations.md)
* [Attenuated Delegation Authority](/vault/attenuated-delegation-authority.md)
* [Subagent Context Inheritance Modes](/vault/subagent-context-inheritance-modes.md)
* [Agent Work Liveness Invariants](/vault/agent-work-liveness-invariants.md)
* [Interruption Recovery Without Duplicate Effects](/vault/interruption-recovery-without-duplicate-effects.md)
* [Activation-Vested Risk Budget](/vault/activation-vested-risk-budget.md)

