---
type: Synthesis
title: Delegated OAuth Proxy Hazards
description: Separating downstream-client consent, untrusted authorization discovery, and credential custody when an agent-facing proxy acts through third-party accounts.
tags: [agents, access-control, agent-security, mcp, privacy]
timestamp: 2026-09-28T19:05:30Z
---

# Delegated OAuth Proxy Hazards

An authorization proxy acts between an agent-facing client and an upstream account provider. Its upstream credential does not prove consent to each downstream client, and its ability to conceal that credential does not make every proxied operation authorized. Discovery metadata adds a third boundary: it can steer privileged network requests and browser navigation before any tool action occurs.

## Boundary Map

| Boundary | Required distinction | Failure if collapsed |
| --- | --- | --- |
| Downstream consent | Bind the user, particular client, requested scope, and validated redirect before beginning the upstream flow; bind the callback to a single-use transaction. | A newly registered client borrows an existing upstream consent session and receives an authorization result the user never approved for it. |
| Discovery and fetch | Treat supplied URLs, redirects, resolved addresses, and browser-open targets as untrusted; constrain each network hop and egress destination at request time. | A metadata URL or rebinding hostname drives privileged requests to internal services despite an earlier string-level check. |
| Token custody and action | Bind the connected account to the authenticated session, retain plaintext credentials at the trusted execution boundary, and enforce tool policy on each outgoing operation. | Hiding a token from the model prevents direct extraction but leaves every already-permitted action and account usable by an injected request. |

## Why It Matters

A single proxy identity can represent many clients and users upstream. Reusing upstream approval as downstream authorization confuses whose consent was given; accepting arbitrary discovery links lets another principal choose where a privileged process connects. Keeping credentials outside model context reduces exposure but cannot substitute for account selection, scope limits, recipient validation, and a separate approval for consequential actions. [Approval bound to canonical effect](/vault/approval-bound-to-canonical-effect.md) addresses that last decision at the tool-call boundary.

## Practical Use

Establish client-specific consent before redirecting upstream and verify the callback against its original client, redirect, and one-use state. Validate fetched metadata and every redirect or address resolution with network-level restrictions as well as URL checks; do not launch a shell on a supplied authorization link. Select the account from authenticated session identity rather than model-generated arguments. Review logs, temporary payloads, staff access, and upstream revocation separately from encryption at rest.

## Limitations

- Authentication of a token's signature is not validation of its audience, nor proof that a session handle belongs to the caller.
- Per-operation scopes reduce reach but can add user friction; a permissive fallback to all advertised scopes defeats intended least privilege.
- An allowed call can leak readable data or misuse an authorized account without revealing the credential itself. Token custody and effect authorization remain separate controls.
- Protocol guidance supplies threat constructions rather than measured attack prevalence; a provider's custody description is a first-party architecture claim, not independent verification.

## Sources

- [MCP Security Best Practices dossier](/dossiers/mcp-security-best-practices.md) — details downstream-client consent confusion, callback binding, audience checks, and SSRF through discovery metadata, redirects, and DNS changes.
- [Two questions every security review asks us dossier](/dossiers/composio-security-review.md) — describes session-bound account selection and proxy-side token custody while acknowledging policy, logging, and upstream revocation limits.
