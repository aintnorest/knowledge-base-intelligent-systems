---
type: Study Note
title: Paperclip MCP Access Governance — Discovery Versus Call Authorization
description: A gateway model separating visible tools, per-call policy, human approval bound to exact arguments, changed-tool quarantine, and auditable runtime decisions.
resource: https://github.com/paperclipai/paperclip/blob/master/doc/MCP-ACCESS-GOVERNANCE.md
source: /archive/paperclip-mcp-gateway-governance.md
tags: [agents, mcp, access-control, agent-security, governance, tool-use]
timestamp: 2026-09-28T00:00:00Z
---

# Paperclip MCP Access Governance — Discovery Versus Call Authorization — Study Notes

## What It Is

Paperclip's MCP gateway mediates agent calls to upstream tool servers. A logical application has connections; discovered tools enter a catalog; profiles bound at company, project, agent, routine, or issue scope determine which tools are visible. Orthogonal call-time policies decide whether the *particular invocation* is allowed, blocked, rate limited, or sent for human approval. Visibility is not execution permission. The same product separately exposes its own MCP endpoint; that endpoint uses ordinary Paperclip authentication and **does not** inherit gateway policy.

## Mechanism and Threat Model

The gateway first rejects quarantined or disabled catalog entries, then tests the effective profile, then policy with deny taking priority over allow. Newly discovered write/destructive tools are quarantined until reviewed, mitigating an upstream provider that silently expands its action surface. Risk classification derives partly from MCP annotations and schemas, however, so misclassification remains a relevant failure mode.

A consequential call can pause on a human action request recording the actor, run, tool, canonical argument hash, and the exact arguments shown to the reviewer. Approval is not generic permission: the agent retries the same call and the gateway checks that its arguments still match. A promoted trust rule retains the reviewed actor/tool scope, exact argument hash, and tool-schema hash; changed arguments or schema revert to approval rather than grandfathering new behavior. This is an explicit answer to approval drift, at the cost of repeated review for legitimate variants. Every call decision and eventual outcome has an append-only audit record, including matched policy and redaction decisions; failed audit persistence is treated as a control-plane incident.

A local process-based MCP connection is a separate host-execution threat. Only approved code-shipped templates may spawn on a designated trusted host; remote HTTP is the preferred isolation boundary. Even careful gateway policy is **not host-wide enforcement**: unmanaged clients or direct upstream calls outside the managed agent workspace bypass its approvals and audit. Multi-region supervision and flexible predicate-based trust rules are absent in the documented v1 model.

## Analyst Takeaways

1. Distinguish discoverability from invocation authority, and place call-time checks on the route actually used for consequential effects.
2. Bind approvals to the reviewed actor, tool version, and exact request—not merely a reassuring tool name.
3. Catalog drift, local tool-process execution, direct-bypass paths, and durable audit failures are distinct threat surfaces requiring different controls.

This is an operator document with design and admitted limitations, not evidence from an attack campaign; it does not establish that every tool side effect or external network path is mediated.

## Vault Ideas Extracted

* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
* [Provenance-Conditioned Action Admission](/vault/provenance-conditioned-action-admission.md)
* [Skill Supply-Chain Admission](/vault/skill-supply-chain-admission.md)
* [Approval Bound to Canonical Effect](/vault/approval-bound-to-canonical-effect.md)

