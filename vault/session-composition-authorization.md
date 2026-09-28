---
type: Synthesis
title: Session-Composition Authorization
description: Authorizing each delegated effect against shared, serialized session history and original intent so individually allowed steps cannot compose into a forbidden outcome.
tags: [agents, access-control, multi-agent, agent-security, orchestration]
timestamp: 2026-09-28T19:05:30Z
---

# Session-Composition Authorization

Session-composition authorization checks an action against the full authorized task and the ordered history of effects already admitted for that task. An allowed read and an allowed outbound message may be prohibited together even though either action passes a per-tool check. The authorization state follows delegation across workers instead of resetting when a fresh agent context starts.

## Operating Pattern

1. Bind an initiating principal and task intent to a session shared by its delegates; intersect resource and action permissions at each handoff rather than expanding them.
2. Record admitted effects in an authoritative, ordered trace, including the actor, sensitive data classes, destinations, and dependencies needed by policy.
3. At the effect boundary, evaluate the proposed action against both its own permission and sequence constraints over that trace. Reserve or serialize admission so concurrent workers cannot each act on the same stale history.
4. Deny a prohibited composition, or require a new authorized task with explicit continuity of relevant history and consent; merely opening a new session must not erase the restriction.

## Why It Matters

Agent roles can fragment intent: a planner knows the end goal while executors see only apparently benign subtasks. An untrusted observation can also induce a privileged read, have a worker recast its contents as a task request, and prompt a different worker to send them outward. Local identity and role checks alone do not identify that combined purpose. See [authorization–provenance graph alignment](/vault/authorization-provenance-graph-alignment.md) for the complementary check on each action's parameter origins.

## Practical Use

Write policies for concrete forbidden transitions, such as protected-data read followed by disclosure to an unauthorized recipient. Keep the source and destination visible at the gateway even if the acting model sees only its subtask. Test parallel actions, omitted sequence rules, and session splitting with requests injected at the enforcement point rather than relying on the model to refuse them.

## Limitations

- Missing sequence rules or coarse action categories leave apparently legal paths open; complete authorization depends on the quality of policy and recorded intent.
- Serializing distributed admission and propagating trace state through all workers imposes coordination costs and a shared trust boundary.
- A permitted action can still abuse its own arguments or be harmful without any earlier step; sequence policy does not replace parameter-level checks or content controls.
- More shared model memory is not necessarily safer: the enforcement trace can be shared without indiscriminately exposing private task content to every worker.

## Sources

- [Bounded Agents: Delegation Security for Multi-Agent AI Systems dossier](/dossiers/bounded-agents-delegation-security.md) — proposes gateway-enforced ordered action restrictions over serialized session history; a missing restriction materially changes measured attack outcomes.
- [Architecture Matters for Multi-Agent Security dossier](/dossiers/multi-agent-architecture-security.md) — shows role division can conceal end-to-end harmful intent from individual executors and that topology and memory effects vary by task.
- [OMNI-LEAK: Orchestrator Multi-Agent Network Induced Data Leakage dossier](/dossiers/omni-leak-orchestrator-data-leakage.md) — traces a lower-trust database observation through privileged reading, orchestrator handoff, and outbound disclosure.
