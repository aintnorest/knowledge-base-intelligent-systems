---
type: Synthesis
title: Approval Bound to Canonical Effect
description: Binding a consequential action's approval to its actor, tool schema, and canonical arguments so changed calls and newly discovered capabilities cannot reuse stale consent.
tags: [agents, access-control, human-in-the-loop, agent-security, tool-use]
timestamp: 2026-09-28T19:05:30Z
---

# Approval Bound to Canonical Effect

An approval authorizes one reviewed effect, not a tool name or an open-ended session. The enforcement point binds the approving decision to the caller, the tool's current schema, and a canonical representation of the arguments shown to the reviewer. Any change that can alter the effect requires a fresh decision.

## Operating Pattern

1. **Separate discovery from permission.** A catalog entry being visible does not imply it may execute. Hold newly discovered consequential actions in quarantine until their effects and classification are reviewed.
2. **Capture the proposed call.** Record the actor, tool identity and schema version, canonical arguments, and the intended consequence in an action request; present the exact material to the approver.
3. **Recheck at execution.** On retry, compare the actual caller, schema, and canonical argument digest to the approved request, then apply current policy. Reject a mismatch or seek renewed approval; a previously approved call cannot authorize a changed payload.
4. **Constrain reusable trust.** If an approval becomes a standing rule, retain its actor and tool scope and schema/argument constraints. Review changes to the effective policy before they become live, and record the decision and outcome.

## Why It Matters

A tool catalog can expand or a schema can change after a reviewer has learned what a tool does. A prompt that merely asks whether a named tool is safe also fails when a retry changes recipients, resources, or data. Binding consent to the effect at the gateway keeps model-generated revisions from silently inheriting earlier human authority. This complements [capability-enforced agent execution](/vault/capability-enforced-agent-execution.md): the approval is a narrow authorization decision, not a substitute for per-call policy or provenance checks.

## Practical Use

Canonicalize before hashing and display the same effective values that the tool will consume, including defaults and resolved resource targets where possible. Mediate every execution path, compare against the live schema and policy generation, and distinguish ordinary catalog visibility from an executable grant. Make review legible enough that a person can judge the action, not merely its label.

## Limitations

- Canonical equality does not establish that a tool's implementation, external state, or downstream interpretation is unchanged. Schema matching is necessary for this binding, not proof of an identical real-world effect.
- Legitimate argument variants cause repeated review; overly broad reusable rules undo the benefit of exact binding.
- Risk classification based on a provider's annotations can be wrong, and direct unmanaged calls can evade the gateway entirely.
- Review of an access expansion is not assurance that an otherwise authorized action matches user intent; policy analysis has modeled and unsupported domains.

## Sources

- [Paperclip MCP Access Governance — Discovery Versus Call Authorization dossier](/dossiers/paperclip-mcp-gateway-governance.md) — describes quarantining newly discovered consequential tools and checking actor, schema, and canonical argument hashes on approval retry.
- [OpenShell Security Policy Architecture dossier](/dossiers/nvidia-openshell-security-policy.md) — describes live-candidate revalidation before effective authority changes and the limits of modeled policy analysis.
- [MCP Security Best Practices dossier](/dossiers/mcp-security-best-practices.md) — distinguishes authorization of a specific client and action from borrowed consent, identity, or a mere handle.
