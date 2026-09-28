---
type: Study Note
title: Gas Town Architecture — Two-Level Work Ledger and Merge Admission
description: Gas Town's division of cross-project and project-local state, durable agent identities, shared transactional issue storage, worktree isolation, and planned batch verification.
resource: https://github.com/gastownhall/gastown/blob/main/docs/design/architecture.md
source: /archive/gastown-two-level-architecture.md
tags: [agents, multi-agent, orchestration, coding-agents, reliability, verification]
timestamp: 2026-09-28T00:00:00Z
---

# Gas Town Architecture — Two-Level Work Ledger and Merge Admission — Study Notes

## What It Is

Gas Town's architecture separates a town-wide coordination ledger from each rig's implementation ledger. Town records include cross-project convoys, strategic decisions, mail, and global agent identity; rig records include implementation issues, merge requests, and worker identity. Issue prefixes route lookups to their canonical ledger. This gives a global coordinator cross-project visibility without turning a project's issue store into a shared global work queue.

## State and Execution Boundaries

One Dolt SQL server hosts distinct town and rig databases; agents write directly to main with transactional commit discipline for immediate visibility. Worktrees redirect to the canonical rig ledger rather than creating divergent local issue databases. The single server is therefore an availability dependency: there is no embedded fallback, though the daemon monitors and restarts it. The source distinguishes this transactional work ledger from git branches holding code changes.

Polecats retain identity across ephemeral sessions and use lightweight worktrees from a canonical clone; the refinery has another worktree. Human crew use independent clones. Role definitions are centrally stored, while operator directives can refine behavior at town and rig scopes, and rig-level formula overlays replace town-level overlays rather than merging them. Those precedence rules matter because an agent's execution instructions must be inspectable independently from its current conversational state.

Workers complete their own lifecycle: submit a merge request, update task state, and release their worktree; a Witness detects failures but does not gate normal completion. Integration is owned by the Refinery. Its documented batch-then-bisect design rebases pending changes as a stack, tests its tip, admits a passing batch and narrows failures by testing prefixes. The architecture explicitly marks parallel gates and batching as **in progress/blocked** phases; the companion README describes batching as current, so the implemented status is ambiguous at capture time. Planned lifecycle cleanup beyond live/closed ledger records is similarly labeled forthcoming, not deployed.

## Analyst Takeaways

1. Partition coordination and execution state by scope while preserving a routable global identity; each worker still reads one canonical project ledger.
2. Keep observer and executor responsibilities distinct: the watchdog repairs exceptional state, while workers submit completion without waiting for a supervisor to bless every transition.
3. A merge queue is a separate authority boundary from task completion. Batch verification can amortize checks and isolate regressions, but cannot prove correctness outside the chosen gates.

The document is architecture description rather than an empirical throughput or correctness comparison. Shared-server contention, conflicting worktree changes, and recovery of non-idempotent external actions are not evaluated.

## Vault Ideas Extracted

* [Structured Execution Memory](/vault/structured-execution-memory.md)
* [Reviewable Change Units](/vault/reviewable-change-units.md)
* [Ledger-Centered Agent Control Plane](/vault/ledger-centered-agent-control-plane.md)

