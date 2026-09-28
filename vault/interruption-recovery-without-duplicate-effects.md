---
type: Synthesis
title: Interruption Recovery Without Duplicate Effects
description: Resume interrupted agent work only after fencing predecessor authority and reconciling externally visible effects, delivery, and owned processes.
tags: [agents, reliability, long-horizon, orchestration, access-control]
timestamp: 2026-09-28T21:00:00Z
---

# Interruption Recovery Without Duplicate Effects

Resuming an agent is not replaying its last model turn. A worker can crash after an external write but before recording success; its replacement must first establish that the predecessor no longer owns execution and determine which effects occurred. Unknown effects remain unknown until independently reconciled. Without an idempotent destination or durable receipts, recovery offers at-least-once execution, not exactly-once effects.

## Recovery Boundary

1. **Fence the predecessor.** Bind actions to a run or authority generation; prove the previous lease or process has stopped before granting a replacement. On authority loss, freeze or terminate pending activity instead of replaying old decisions, byte streams, or openings under a new generation.
2. **Preserve evidence.** Keep workspace, event history, pending action identities, and external-effect receipts. Compare recorded intent with destination state; treat an unreceipted write as uncertain, not as permission to repeat it.
3. **Reconcile delivery separately.** A persisted completed child result may be delivered later, but queue admission does not prove a user saw it; an in-flight child with a dead owner is not recoverable merely because completed results are durable.
4. **Transfer owned processes deliberately.** A child-owned background process either finishes before child teardown or is explicitly handed to a longer-lived owner. A reported process identifier is not a lifecycle transfer.
5. **Correct the user-visible stream.** If an attempt emitted provisional output before retry, retract or supersede that abandoned attempt before displaying replacement output; an append-only audit can retain both attempts.

See [Agent Work Liveness Invariants](/vault/agent-work-liveness-invariants.md) for deciding when a task needs recovery; [Structured Execution Memory](/vault/structured-execution-memory.md) covers the underlying history and task state.

## Why It Matters

A durable scheduler can restart a conversation or replace its machine without restoring the truth of external systems. An apparently successful completion, closed stream, or reused workspace does not prove which tool actions committed. Separating execution ownership, effect receipts, result delivery, and client projection prevents a restart from quietly doubling a payment, edit, or notification—or displaying a discarded answer as current.

## Practical Use

- Give consequential actions stable identities and retain destination acknowledgements where available; require inspection or human resolution for outcomes the destination cannot verify.
- Compare-and-clear only the predecessor's own execution claim so late cleanup cannot release a successor's claim.
- Keep shared capacity permits across an admitted operation's entire buffering and transformation chain, including configuration reload, so replacing a generation cannot reset the budget while old work remains outstanding.
- Distinguish a retryable action from an already committed effect and a completed result awaiting delivery.

## Limitations

Neither process fencing nor an append-only log makes an external service transactional. Some actions have no queryable receipt or safe idempotency key and must stop for review. Generation-scoped freeze requires a real enforcement boundary; an agent prompt cannot revoke already-running tools. Resource-budget continuity controls overload during interrupted work, not duplicate effects by itself.

## Sources

- [OpenShell Sandbox Architecture dossier](/dossiers/nvidia-openshell-sandbox-architecture.md) — documents generation-bound channels and policy, freezing on lost supervisor authority, and failing pending opens without replay.
- [OpenShell Sandbox Limits dossier](/dossiers/nvidia-openshell-sandbox-limits.md) — shows process-wide permits retained through buffering, middleware, forwarding, and configuration reload; this bounds recovery-era resource use, not action idempotency.
- [Paperclip Execution Semantics — Ownership and Durable Liveness dossier](/dossiers/paperclip-execution-liveness.md) — requires predecessor stop proof, fenced ownership, preserved history, and explicit treatment of unknown external effects.
- [Hermes Agent — Subagent Delegation and Ownership Boundaries dossier](/dossiers/hermes-subagent-delegation.md) — separates durable completed-result delivery from unrecoverable in-flight children and requires explicit background-process ownership handoff.
- [What we’ve learned building cloud agents dossier](/dossiers/cursor-cloud-agent-lessons.md) — separates durable execution from conversation streaming and retracts partial streamed output on retry.
- [Symphony Service Specification dossier](/dossiers/openai-symphony-service-specification.md) — notes that tracker-based redispatch after restart can repeat externally visible actions despite persistent workspaces.
