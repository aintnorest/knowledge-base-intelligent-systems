---
type: Study Note
title: Paperclip Specification — Board-Governed Agent Control Plane
description: A living specification for company-scoped agent organization, task-native delegation, heartbeat adapters, atomic checkout, budget controls, and human governance.
resource: https://github.com/paperclipai/paperclip/blob/master/doc/SPEC.md
source: /archive/paperclip-control-plane-spec.md
tags: [agents, orchestration, multi-agent, governance, human-in-the-loop, access-control]
timestamp: 2026-09-28T00:00:00Z
---

# Paperclip Specification — Board-Governed Agent Control Plane — Study Notes

## What It Is

Paperclip specifies a control plane, not an agent runtime or software-delivery system. A company contains initiatives, projects, work items, agents, reporting lines, and budgets. The human Board approves initial strategy and hiring, can pause or reassign work, and overrides budgets. The text is explicitly a living specification with draft sections and future governance ideas; its product principles should not be mistaken for evidence that every V1 checklist item is shipped.

## Coordination Model

The reporting hierarchy determines managerial escalation and delegation, **not** a general privacy boundary: agents can see company tasks and the organization. Work is communicated by assigned tasks and attached comments, rather than a separate chat bus. Cross-team requests retain creation provenance and can charge downstream token spend to the initiating work. The hierarchy traces tasks to initiatives, while an agent's concrete behavioral identity and loop remain its adapter's concern.

A heartbeat protocol governs *when* and *how* an agent is invoked and how much context to supply, from a thin wake to a fat state payload. It does not dictate how long the agent reasons or what its internal loop does. The minimal agent must be callable; richer adapters report status and cost. The Board may interrupt current execution and suppress future heartbeats. This decouples an operator's ownership and budget authority from heterogeneous runtimes.

Each task has one assignee and atomic checkout before agent-owned active work. This reduces competing ownership claims without requiring multi-writer reconciliation of task fields. A company budget can progress from visibility to alerts to a hard execution pause, with Board override. Pauses and approvals are control-plane gates, not evidence that an external tool call was safe. When execution crashes, the stated design preserves assignee identity, permits bounded continuity repair by that owner, and makes unresolved failures visible to the Board rather than silently reassigning.

## Boundaries and Tensions

Paperclip manages task-linked documents and attachments but not repositories, deployments, or a built-in knowledge base. A unified API serves agents and Board actors under different authority. The specification also describes full company visibility while discussing scoped agent keys; the exact relationship between broad reads and per-run mutation scope belongs to more detailed implementation contracts. Its early statement that recovery is manual coexists with later same-owner bounded auto-repair, so the durable principle is **no silent takeover**, not no automatic retry of any kind.

## Analyst Takeaways

1. Separate organizational accountability from execution mechanics: a stable task and named owner survive a replacement of the runtime adapter.
2. Make escalation, budgets, and approvals explicit board-facing control surfaces; do not delegate ultimate authority to a model's prompt.
3. Treat assignment, checkout, and cost attribution as different records: one prevents competing work, another traces who requested and funded it.

There is no controlled evaluation of throughput, safety, or operational reliability here. Draft decisions and future-facing features require implementation-specific confirmation.

## Vault Ideas Extracted

* [Structured Agent Communication Contracts](/vault/structured-agent-communication-contracts.md)
* [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md)
* [Ledger-Centered Agent Control Plane](/vault/ledger-centered-agent-control-plane.md)

