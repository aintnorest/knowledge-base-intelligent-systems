---
type: Study Note
title: "Coder Agents: Architecture"
description: Control-plane agent loop and persistent chat state are separated from existing workspace compute and model inference, preserving user-bound workspace authority and isolating provider keys.
resource: https://coder.com/docs/ai-coder/agents/architecture
source: /archive/coder-agents-architecture.html
tags: [agents, coding-agents, orchestration, agent-security, access-control, enterprise]
timestamp: 2026-09-28T18:43:43Z
---

# Coder Agents Architecture — Study Notes

**Source**: Coder product architecture documentation; captured September 2026

## What It Is

Coder runs the model-facing agent loop and chat database in its control plane, executes file and shell actions inside existing developer workspaces, and sends inference requests to a separate model provider. A workspace needs no agent process, provider API key, or new inbound port. The architecture reuses the developer's existing connection tunnel but changes the protocol at the endpoint: the agent uses the workspace daemon's HTTP API where an IDE might use SSH.

## State, Authority, and Execution

Prompts, statuses, tool results, queued follow-ups, parent/child relationships, and compacted summaries are persisted centrally. Model context may discard older messages after summarization without deleting their audit record. A workspace connection is established only on the first relevant action and reused; chats that never touch code need no workspace. The daemon initiates the outbound control-plane connection, so an inbound listener is unnecessary. Inference credentials remain in the control plane, and the model provider never connects to the workspace directly. The workspace may have egress limited to control plane and git provider, although this is an available deployment posture rather than proof that every workspace uses it.

The agent inherits the prompt author's workspace and template permissions and existing git authentication. Root chats may provision workspaces and coordinate child chats; child agents cannot spawn further children or use those platform orchestration capabilities. In plan mode, workspace writes are restricted to the plan artifact, though exploratory shell execution remains possible—a meaningful distinction from a read-only plan boundary. Administrators govern model and tool choices centrally, while workspace-origin extensions and administrator-approved external tools expand the effective tool surface.

## Tradeoffs and Questions

- Keeping conversation state outside the workspace allows machine rebuild or replacement without erasing chat history; it also makes the control plane a sensitive store of prompts, tool outputs, and user activity.
- Existing user permissions establish an upper bound on reach, not whether a particular agent action reflects user intent. Workspace code and external tools remain untrusted surfaces.
- The documentation asserts minimal control-plane overhead but offers no workload measurements, availability figures, or independent validation of permission enforcement.

## Vault Ideas Extracted

* [Control-Data Plane Separation for Agents](/vault/control-data-plane-separation-for-agents.md)
* [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md)
* [Ledger-Centered Agent Control Plane](/vault/ledger-centered-agent-control-plane.md)

