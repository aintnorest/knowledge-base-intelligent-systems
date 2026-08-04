---
type: Synthesis
title: Mediated Agent Execution Isolation
description: Treating each third-party agent integration as an isolated security principal and allowing cross-agent data or capability use only through a trusted mediator, validated contracts, and explicit authorization.
tags: [agent-security, sandboxing, access-control, multi-agent, agents]
timestamp: 2026-07-14T16:07:20Z
---

# Mediated Agent Execution Isolation

Mediated agent execution isolation treats each third-party tool or agent integration as its own security principal. The integration executes with separately scoped context, memory, model session, and operating-system authority; it cannot directly inspect or direct another integration. A trusted mediator handles any request that crosses those boundaries.

## Core Pattern

1. Assign each integration a separate execution environment with the least filesystem, network, credential, tool, and memory authority needed for its task.
2. Keep a trusted coordinator outside those environments. It resolves the user's request, selects an integration, and explicitly identifies the minimum data and supporting capability required.
3. Advertise capabilities through the coordinator rather than exposing every installed integration, its identity, or its context to peers.
4. Make a cross-boundary call a transaction: request a capability, receive a narrowly defined request/response contract, validate identifiers, types, limits, and authority, then route the message through the coordinator.
5. Require authorization for selected integrations, data sharing, egress, and consequential actions. Bind approvals to caller, recipient, capability, data scope, purpose, duration, and revocation path; do not turn irreversible actions into standing approvals.
6. Log the plan, contract, validation result, data categories, approval, effect, and recipient so unexpected flows can be inspected and stopped.

## Why It Matters

Putting app instructions, tool results, and user context into one model session creates implicit authority: hostile text from one integration can influence calls to another, and broad shared memory makes accidental disclosure easy. Isolation reduces blast radius. Mediation gives the system a deterministic place to reject a request, seek consent, or record a policy decision before data reaches another principal.

Schemas make some checks mechanical but do not make a valid string safe or prove that requested data is necessary. Natural-language content, semantic intent, and misleading but well-formed requests still need restrictive defaults, policy review, user-facing explanation, and protections inside every isolated integration.

## Practical Use

Use this for agent platforms that connect email, documents, calendars, browsers, code execution, customer records, payments, or independently administered services. Start with one-way minimal transfers and capability-specific contracts. Allow multi-agent synthesis only in a fresh, tightly scoped worker rather than by placing all source apps in one shared context.

Measure latency by planning, routing, and memory transfer; prompt rate and user decisions; denied-request recovery; cross-boundary data volume; and failures where legitimate work was blocked or unsafe work was approved. Warm sessions and routing shortcuts are useful only if they do not reintroduce shared authority or stale data visibility.

## Limitations

- The mediator, policy engine, and isolation runtime become high-value trusted components. Isolation cannot compensate for their compromise or an overprivileged platform account.
- Per-integration processes, models, state stores, and consent paths add latency, cost, observability work, and failure modes; collaboration-heavy tasks magnify those costs.
- Permission dialogs shift part of the security decision to users. Frequent, vague, or inaccurate prompts can produce fatigue and unsafe approvals.
- Schema validation checks conformance, not truth, necessity, or absence of prompt injection. Limit raw-text transfer and retain protection within the receiver as well as at the boundary.

## Sources

- [ISOLATE GPT dossier](/dossiers/isolate-gpt-execution-isolation-agentic-systems.md) — proposes process-isolated app spokes, deterministic operators, a hub-mediated inter-spoke protocol with typed messages and ephemeral identifiers, and permission-gated cross-spoke data flow; its protection and performance results are prototype-specific.
- [Parallax: Why AI Agents That Think Must Never Act dossier](/dossiers/parallax-architecturally-safe-autonomous-execution.md) — applies process separation inside one agent: an untrusted reasoner can propose actions but an engine mediates and executes them; its architecture and reported evaluation remain author-reported prototype evidence.
