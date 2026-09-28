---
type: Study Note
title: Paperclip Execution Semantics — Ownership and Durable Liveness
description: A detailed control-plane contract separating issue structure, dependencies, assignment, active run ownership, durable waits, bounded recovery, and review handoffs.
resource: https://github.com/paperclipai/paperclip/blob/master/doc/execution-semantics.md
source: /archive/paperclip-execution-liveness.md
tags: [agents, orchestration, long-horizon, reliability, access-control, multi-agent]
timestamp: 2026-09-28T00:00:00Z
---

# Paperclip Execution Semantics — Ownership and Durable Liveness — Study Notes

**Source status:** Current implementation guide, dated August 18, 2026; contains later dated amendments.

## The Four Independent Axes

An issue's parent describes **structure**, a blocker edge describes **dependency**, its sole assignee describes **ownership**, and a run or durable wake describes **execution**. A parent is not blocked merely because it has children. An agent-owned issue in progress needs checkout and a live execution path; human-owned work is not heartbeat-managed. Checkout ownership and the currently executing run are distinct identifiers. Terminal run finalization compare-and-clears only its own locks, never a successor's reacquired lock; a conflict after stale-lock repair must not become an infinite checkout retry.

The central invariant is that an agent-owned nonterminal issue has a named next move: active run, deliverable wake, typed reviewer/interaction, one-shot monitor, healthy blocker chain, human owner, or typed recovery action. A prose comment, PID, detached watcher, or parent link is evidence, not a durable path. A blocked transition requires a routable blocker, responder, or owner/action; an unresolved cancelled blocker does not satisfy its dependent. This is a visibility guarantee, not a license to infer Done from comments.

## Continuation, Delegation, and Review

Asynchronous external waits need persisted next-check ownership and bounds; a one-shot monitor is consumed when it wakes the assignee and must be explicitly rearmed if waiting continues. Pre-dispatch known holds (including missing required bindings or unresolved worktree base refs) are surfaced as waiting conditions rather than sending a guaranteed-to-fail provider attempt. Workspace coherence is part of liveness: a queued wake aimed at the wrong company/project/repository or an unreachable in-sandbox control plane is not a healthy path.

A delegated child reports findings on its own issue; adverse findings still count as completed review work. The parent receives a blocker-resolution wake when the child finishes. Standard-trust children may comment on their *direct parent* only; low-trust reviewers default to no parent comment because that free-text route promotes untrusted content. A system-attributed, deduplicated stop relay informs the parent if such a child blocks or cancels. Lateral coordination uses a new, self-contained assigned issue rather than writing into a sibling's scope. Accepted-plan decomposition is optional: when used, the accepted revision and source issue fingerprint a durable claim so partial child creation can resume without spawning a second tree.

## Bounded Recovery and Authority

Startup and periodic reconciliation repair stranded assignments, not merely orphaned processes. If a `todo` dispatch or `in_progress` continuation disappears, one bounded same-owner recovery wake can restore continuity; exhaustion produces an explicit board-owned repair action without silently replacing the deliverable owner. A dependency chain is healthy only if its unresolved leaves have live or named waiting paths. Task watchdogs examine stopped subtree fingerprints, exclude their own recovery descendants, and can restore a path through a small fingerprint-guarded atomic mutation batch; ineffective restoration re-fires only within a bounded attempt lineage before escalation. Output silence of a *still-running* process is instead informational and does not justify cancellation by itself.

Provider continuity distinguishes recorded work from unknown side effects. Replacing a native session requires proof of predecessor stop, fenced ownership, retained history/workspace, and reconciled effects; unknown writes cannot be replayed speculatively. A completion-tool report does not terminate the provider turn, and stream closure is not proof of success. Manual continuation carries the new human actor's identity and independently rechecks authorization; approval of an interaction does not itself authorize subsequent tool effects. These are safety constraints on replay, not a promise that every stalled task self-heals.

## Analyst Takeaways and Limits

A workflow status should encode a verifiable next owner and wake mechanism, not merely a human-readable label. Separate lease ownership, run activity, dependency and review state, and external-effect receipts; repair each through the narrowest safe transition. The source is an evolving product contract, not an independently verified production reliability measurement. Its numerous provider-specific amendments show how much state must be persisted for a genuine liveness claim; runtime behavior may differ across implementations and dates.

## Vault Ideas Extracted

* [Structured Execution Memory](/vault/structured-execution-memory.md)
* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
* [Security-Aware Replanning](/vault/security-aware-replanning.md)
* [Agent Work Liveness Invariants](/vault/agent-work-liveness-invariants.md)
* [Interruption Recovery Without Duplicate Effects](/vault/interruption-recovery-without-duplicate-effects.md)

