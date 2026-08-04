---
type: Synthesis
title: Authorization–Provenance Graph Alignment
description: Enforcing consequential agent actions by comparing a clean, intent-derived authorization graph with an execution-provenance graph, including source constraints for each high-impact parameter.
tags: [agent-security, access-control, provenance, prompt-injection, tool-use, agents]
timestamp: 2026-07-14T16:21:42Z
---

# Authorization–Provenance Graph Alignment

Authorization–provenance graph alignment treats agent security as a comparison between two independently produced structures: a least-privilege description of actions and argument origins authorized by trusted intent, and a record of the actions and information flows that actually occurred. A consequential call is admissible only when its tool and security-relevant parameters align with both structures.

## Operating Pattern

1. Before untrusted observations can influence the agent, build an authorization graph from the user request and tool catalog. State expected actions, permitted auxiliary tools, and a source policy for each consequential argument.
2. At runtime, collect a graph or trace that links each call and argument to raw source observations, user-provided literals, and transformations. Keep source identities and original evidence available for checking.
3. Compare the observed call sequence against the authorization graph. Deterministically reject calls outside the exhausted or explicit tool envelope; route plausible helper calls through a narrowly scoped review path.
4. For each high-impact argument, verify its allowed provenance. A flight ID, transfer recipient, URL, credential, or destination should be checked against the specified authoritative source, not merely against any observation containing the same string.
5. For observation-dependent branches, authorize a bounded replan: allow only a declared subset of tools, validate the generated subplan programmatically, and attach the new authority to its trigger and task.
6. Log the planned graph, trace, alignment result, source witnesses, exception path, and final action. Test ordinary workflows, cross-tool value pollution, unauthorized tool insertion, same-source compromise, and replan abuse separately.

## Why It Helps

Tool allowlists protect only control flow. They can miss an attack that supplies a malicious recipient or identifier to a tool the user did request. Conversely, a provenance graph of the live trajectory cannot itself decide what is authorized, particularly if its construction was exposed to the same poisoned text as the agent.

The comparison makes both errors observable: an extra `fetch` or `send` violates the action structure, while a value copied from a hotel result into a flight booking violates a parameter's source contract. It also gives deterministic checks a compact role—set membership and evidence matching—while reserving semantic judgment for genuine ambiguity.

## Practical Use

Begin with a few irreversible sinks and the parameters that determine their target or scope. Name the authoritative upstream tool for each value, retain a raw source witness when possible, and fail safely or seek confirmation when provenance is absent. Treat planning, trace collection, policy enforcement, and tool mediation as parts of the trusted computing base; a graph is only useful if every consequential call passes its monitor.

## Limitations

- An authorized source can itself be compromised. Source matching establishes origin, not truth, reputation, or business legitimacy.
- A user may intentionally delegate trust to a retrieved document. In that case source alignment alone cannot distinguish a compromised observation from a legitimate one; the application needs an explicit trust policy, content verification, or confirmation.
- Complete, accurate provenance through transformations, conditional control flow, errors, and agent-to-agent messages is difficult. Missing instrumentation can turn a policy into false assurance.
- Graph and semantic-check construction can add latency, token cost, and false blocks. The authorization schema must be narrow enough to enforce yet expressive enough for valid dynamic tasks.

## Sources

- [AUTHGRAPH dossier](/dossiers/authgraph-dual-graph-defense.md) — constructs a clean authorization graph and an injected reasoning graph, then aligns calls and per-parameter allowed source tools; reports layered ablations and runtime overhead on AgentDojo.
