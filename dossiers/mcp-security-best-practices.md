---
type: Study Note
title: MCP Security Best Practices
description: MCP's draft threat model for OAuth proxy consent, token audience separation, discovery SSRF, state handles, local servers, and authorization escalation.
resource: https://modelcontextprotocol.io/docs/draft/tutorials/security/security_best_practices
source: /archive/mcp-security-best-practices.html
tags: [agents, mcp, agent-security, access-control, sandboxing, provenance]
timestamp: 2026-09-28T18:39:25Z
---

# MCP Security Best Practices — Study Notes

## What It Is

The MCP project's draft security guidance identifies failure modes at the boundaries between MCP clients, servers, OAuth authorities, local processes, and third-party APIs. It is a threat-model and normative guidance document, not an attack-frequency study. Its draft status and protocol-version qualifications matter: the current discussion treats MCP as stateless, while pointing readers to older-version guidance for server-assigned session IDs.

## Authorization Boundaries

A proxy that uses one static upstream OAuth client identity for many dynamically registered downstream MCP clients cannot treat the upstream consent cookie as consent to each downstream client. A user who previously approved the proxy may skip the upstream consent screen when an attacker registers a fresh client and supplies an attacker-controlled redirect. The proxy must instead record consent for the particular downstream client before the upstream flow, bind the resulting callback to a single-use state established *after* consent, and check the redirect against that client's registration. A consent screen should expose the client, requested scope, and destination rather than borrowing the upstream provider's approval as authority.

A server accepting a token meant for a different audience, especially if it forwards that token to another API, loses both audience separation and reliable client attribution. A stolen token can then traverse services and bypass the server's own validation, rate limits, or audit controls. Likewise, a shopping-cart or workflow handle passed as a tool argument is an identifier, not proof of authorization: ownership must be checked against the authenticated caller on every request.

Scope elevation is a separate tradeoff. Broad up-front grants increase compromise blast radius and blur the audit record; narrow initial grants with operation-specific challenges reduce both but add consent rounds. The draft notes a significant escape hatch: where the initial challenge names no scope, generic clients may request all advertised scopes and rely on the authorization server and user to narrow the grant. Claimed scopes still require server-side authorization checks.

## Discovery and Local Execution

A malicious server can supply OAuth discovery or authorization URLs targeting internal services, cloud metadata, localhost, or unsafe browser schemes. Redirects and DNS rebinding can defeat a one-time URL check. The guidance places validation at each network hop and recommends network-level egress restrictions rather than relying solely on URL parsing; authorization servers fetching client metadata face the same SSRF pattern. In a client, opening an untrusted authorization URL through a shell can turn metadata into host command execution.

Local MCP servers are executable programs that often inherit the client's ambient privileges. One-click server addition therefore crosses a code-execution boundary: meaningful consent requires showing the complete command before launch, while sandboxing and restricted access reduce the impact of a malicious package. A proxy that spawns stdio servers introduces a distinct escalation chain: client-side XSS can expose a proxy token and let an attacker request child-process launches. The document explicitly limits this chain to proxy architectures, not direct stdio use.

OAuth issuer mix-ups can send an honest provider's code to an attacker-controlled provider; PKCE by itself does not stop this if its verifier also reaches the attacker. Issuer binding depends on honest providers emitting issuer identity. A domain-backed client metadata document likewise proves domain control, not ownership of a localhost redirect listener; an attacker can present a legitimate client's identity while binding a local port.

## Analyst Takeaways and Limits

1. **Authenticate each boundary independently.** Upstream consent, a state handle, a domain identity, and a token with some valid signature each answer a different question; none substitutes for client-specific consent, caller-bound state, redirect ownership, and audience checks.
2. **Treat discovery as execution-adjacent input.** Metadata can cause privileged network requests, browser script execution, and, through a spawning proxy, local code execution.
3. **Pair progressive authorization with explicit fallback analysis.** An unscoped discovery challenge can inflate permissions despite an intended least-privilege design.
4. **Distinguish guidance from evidence.** This draft supplies concrete attack constructions and mitigations, but no measured exploit prevalence, implementation audit, or proof that its controls are universally deployed.

## Vault Ideas Extracted

* [Control–Data Plane Separation for Agents](/vault/control-data-plane-separation-for-agents.md)
* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
* [Skill Supply-Chain Admission](/vault/skill-supply-chain-admission.md)
* [Approval Bound to Canonical Effect](/vault/approval-bound-to-canonical-effect.md)
* [Delegated OAuth Proxy Hazards](/vault/delegated-oauth-proxy-hazards.md)

