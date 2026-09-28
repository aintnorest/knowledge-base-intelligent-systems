---
type: Study Note
title: OpenShell Security Policy Architecture
description: NVIDIA's fail-closed policy composition, credential provenance, dynamic updates, proposal review, and bounded formal checks.
resource: https://github.com/NVIDIA/OpenShell/blob/main/architecture/security-policy.md
source: /archive/nvidia-openshell-security-policy.md
tags: [agents, access-control, agent-security, sandboxing, governance]
timestamp: 2026-09-28T20:00:00Z
---

# OpenShell Security Policy Architecture — Study Notes

**Publisher**: NVIDIA OpenShell  
**Source**: repository architecture document, captured September 2026

## What It Is

OpenShell separates a gateway that stores and composes policy from a sandbox-local supervisor that decides each egress request. This source specifies authorization semantics and policy-change governance, complementing the [runtime boundary](/dossiers/nvidia-openshell-sandbox-architecture.md) and [resource limits](/dossiers/nvidia-openshell-sandbox-limits.md). It is a stated design, not a measured security evaluation.

## Policy as a Validated Generation

Filesystem and process restrictions are fixed at startup; network policy may be reloaded. Authored policy passes one strict parser: duplicate or unknown fields are rejected before downstream projections, and an absent filesystem policy remains distinct from an explicit empty one. Composition includes provider-contributed rules and gateway overrides. Network authorization checks calling-binary identity, hard-blocked destinations and SSRF restrictions, endpoint rules, then optional request-level inspection. Deny and hardening rules outrank allow; no match denies. An L4 hostname constraint does *not* authenticate a virtual host selected inside a TLS or application stream.

The gateway preflights a complete effective candidate, including provider binding, before persistence when it can; the supervisor validates again before activation. Invalid startup configuration blocks workload launch rather than substituting a permissive fallback. Runtime validation failures normally publish a quarantine generation that denies new egress and invalidates relays; an explicit operator alternative retains the last valid generation, and no prior valid generation always fails closed. Existing raw streams are connection-scoped; generation changes close relays rather than silently continuing old grants. Static restrictions require a new sandbox after activation.

## Credential Provenance and Inspection

Credential-bearing provider scopes are re-derived from attached profiles and valid explicit bindings for *every* effective policy, rather than incrementally accumulated. Derivation marks a host and port even if an authored binding names a path: L4 and uninspected TLS cannot see that path, precisely where the warning matters. Credentialed L4-only or uninspected TLS routes are rejected unless an explicitly security-flagged override allows them. By default the proxy inserts actual values only after inspected requests pass destination and policy checks; WebSocket upgrades require a separate text rewrite mode, while opaque binary traffic cannot be presumed inspected.

This provenance protection has a notable authority gap: supervisor-local policy sources lacking gateway-derived stamps do not activate the raw-tunnel and binary-frame refusals. An explicit local override stays local permanently and produces a high-severity finding when combined with injected credentials; a locally provisioned policy file has a bounded pre-sync interval. The request-body placeholder backstop still operates where its resolver is present. Even fully credential-bound proxies cannot stop arbitrary *readable* data from being put into an authorized outbound request.

## Permission Growth and Formal Analysis

Denied L4 destinations can produce narrow draft access requests; richer L7 denials leave rule formulation to the agent, because automatically templating method/path/body intent would risk broadening authority. Both draft paths go to the gateway. Manual human approval is the default, not agent self-approval. Optional automatic approval requires an unchanged live candidate, no formal-prover delta, and no security notes; a stale candidate requires a new review. Security notes about private destinations remain advisory for explicit human judgment, whereas hard-blocked addresses remain forbidden at merge and runtime.

The standalone containment checker establishes modeled `Allowed(candidate) ⊆ Allowed(boundary)` and explicitly reports unsupported/inconclusive domains; it does not apply policy or pronounce all in-boundary changes safe. The proposal prover looks for link-local reach, L7 bypass on a credentialed host, new credentialed reach, and new HTTP methods on an existing credentialed route. Its credential scope is sandbox-wide, not precise to a particular binary or the privileges of a token. The document calls cross-agent composition and contextual review unfinished. Formal model output is evidence for approval, not a substitute for the user's intent; [third-party attack research](/dossiers/lasso-nemoclaw-authorized-egress-exfiltration.md) demonstrates policy-conformant exfiltration.

## Analyst Takeaways and Limits

1. Parse once, compose the entire authority graph, and admit one versioned generation: piecemeal valid edits can otherwise compose into an unsafe effective state.
2. A proof must state its modeled domains and unsupported cases; “no new finding” is narrower than “safe,” and approvals must be rebound to current live inputs.
3. Credential confidentiality depends on both endpoint bindings and the actual inspection surface. Opaque or locally overridden routes change the assurance claim.
4. These are implementation claims without an independent attack evaluation; do not infer protection against malicious behavior over a fully authorized tool or endpoint.

## Vault Ideas Extracted

* [Security-Aware Replanning](/vault/security-aware-replanning.md)
* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
* [Cross-Mechanism Execution-Security Evaluation](/vault/cross-mechanism-execution-security-evaluation.md)
* [Approval Bound to Canonical Effect](/vault/approval-bound-to-canonical-effect.md)

