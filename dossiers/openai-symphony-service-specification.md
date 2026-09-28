---
type: Study Note
title: "Symphony Service Specification"
description: Draft v1 contract for a tracker-driven coding-agent runner: single-owner claims, per-issue workspaces, reconciliation, retries, provider adapters, and explicitly implementation-defined security posture.
resource: https://github.com/openai/symphony/blob/main/SPEC.md
source: /archive/openai-symphony-service-specification.md
tags: [agents, orchestration, coding-agents, long-horizon, agent-harness, reliability]
timestamp: 2026-09-28T18:41:04Z
---

# Symphony Service Specification — Study Notes

**Publisher**: OpenAI  
**Status**: Draft v1, source captured September 2026

## What the Contract Defines

Symphony is a long-running scheduler and tracker reader that starts coding-agent sessions in dedicated per-issue workspaces. It explicitly does not prescribe a general workflow engine, a particular UI, a universal sandbox, or built-in ticket-write business logic. Repository-owned workflow policy supplies prompts and handoff rules; a tracker adapter normalizes issue state; a single authoritative orchestrator owns dispatch, claims, retries, and reconciliation; and an agent runner manages workspace and app-server session lifecycles. Tracker mutations normally pass through provider-native agent tools executed host-side, so the child need not receive raw tracker credentials. A successful run may end at a human-review state rather than ticket closure.

## Claims, Continuations, and Recovery

A claim spans both running work and a scheduled retry, preventing duplicate dispatch while a worker is between sessions. Each poll reconciles active runs **before** new dispatch: terminal or non-active tickets stop, and terminal workspaces are removed. A normal agent turn can continue on its current thread when the issue remains active; after a worker exits normally, a short continuation check still reevaluates ticket state. Abnormal exits use capped exponential backoff. Candidate eligibility also depends on adapter-derived dispatchability, required labels, state, and global/per-state concurrency. This puts provider-specific blocker and assignment semantics in the adapter, not in a universal scheduler heuristic.

Scheduler state is deliberately in memory: after a process restart, live sessions and retry timers are **not** recovered. Fresh tracker polling plus preserved workspaces resume useful work, but an external side effect may have occurred just before a crash. Re-dispatch is not exactly-once execution. Tracker refresh failures leave existing workers running until the next attempt, while a failed configuration preflight skips new dispatch but continues reconciliation.

## Workspace, Policy, and Authority

A stable ticket identifier maps to a sanitized, collision-resistant workspace key; agent working directory must equal its issue workspace and remain beneath the workspace root. These path checks help prevent accidental cross-issue execution, but the spec says they are **not a substitute for OS sandboxing and approvals**. Workspaces persist across attempts and are cleaned on observed terminal state. Trusted lifecycle hooks can run shell code; their provenance and privileges are thus part of the deployment threat model.

Workflow changes are detected and re-applied to future decisions without restarting running agents; invalid reloads preserve the last known good policy and emit a visible error. The specification deliberately leaves approval, sandbox, and operator-confirmation defaults implementation-defined. It requires each implementation to document these choices and never let an approval or user-input request block indefinitely.

The tracker contract is a small read kernel plus optional provider-native tools rather than generic write CRUD. The adapter owns its scope and credential handling; tool specifications and effective settings are bound to one session snapshot so a live reload cannot advertise one provider and execute another. Host-held credentials should be stripped from child environments; literal credentials placed in the readable workflow file defeat that separation. Protocol framing and field names defer to the actual installed coding-agent app-server version.

## Analyst Takeaways and Limits

1. **Distinguish issue completion from session success.** Turn completion is only a checkpoint; tracker state governs whether work has reached the agreed handoff.
2. **Make re-dispatch explicitly at-least-once.** In-memory retries plus persistent workspaces need idempotent or reconcilable external effects, especially around crashes and tracker writes.
3. **Keep provider semantics and secrets at the integration boundary.** A portable scheduler need not flatten different tracker permissions into misleading generic mutations.
4. **Demand a deployment-specific security claim.** Workspace path validation, a trusted workflow file, and host-mediated tools are not by themselves a containment proof.

This is a normative draft, not an operational evaluation. Optional remote SSH workers bring host-local workspace drift and cross-host duplicate-execution risks; optional dashboards are observability/control surfaces, not prerequisites for correct scheduling. The spec leaves durable retry/session persistence as future work and supplies no measured success or incident rates.

## Vault Ideas Extracted

* [Machine-Readable Agent Specifications](/vault/machine-readable-agent-specifications.md)
* [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md)
* [Mediated Agent Execution Isolation](/vault/mediated-agent-execution-isolation.md)
* [Agent Work Liveness Invariants](/vault/agent-work-liveness-invariants.md)
* [Interruption Recovery Without Duplicate Effects](/vault/interruption-recovery-without-duplicate-effects.md)
* [Ledger-Centered Agent Control Plane](/vault/ledger-centered-agent-control-plane.md)

