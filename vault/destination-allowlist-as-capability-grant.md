---
type: Synthesis
title: Destination Allowlist as Capability Grant
description: Allowing an outbound host grants reachable operations and accounts, not merely a safe route; hostname checks alone cannot establish confidential data flow.
tags: [agent-security, access-control, sandboxing, privacy, agents]
timestamp: 2026-09-28T19:05:31Z
---

# Destination Allowlist as Capability Grant

A destination allowlist is a capability grant: code permitted to contact a service may use every operation and account reachable through that connection unless a narrower boundary intervenes. Even a perfectly enforced host rule cannot distinguish an authorized upload from exfiltration into an attacker's account on that host. It constrains routes, not the purpose, payload, recipient, or credentials of a request.

## Boundary Map

| Check | What it can establish | What it cannot establish alone |
| --- | --- | --- |
| Process egress and DNS mediation | Traffic takes the intended gate | Other tools and service channels are gated |
| Hostname, resolved address, and TLS identity agreement | The connection reaches an approved network identity | The request uses an authorized account or operation |
| Request-level inspection and scoped credentials | Method, path, recipient, and delegated identity meet policy | The payload is authorized to leave without provenance checks |
| Effect and data-flow authorization | Sensitive inputs may reach this particular recipient for this task | An unmodeled sink or alternate route is safe |

## Why It Matters

An attacker can publish through a permitted collaboration service or reuse its own account at a permitted API without circumventing the host rule. Conversely, a hostname rule can fail even as a *route* restriction when policy matching and name resolution parse different bytes, a DNS answer changes after checking, or encrypted routing identifies a different endpoint than the hostname inspected. Without inspection of TLS traffic, host policy cannot see request semantics; selective termination and credential brokering provide narrower controls but introduce a trusted intermediary. These are distinct failures: harmful authorized use versus incorrectly identified destinations.

## Practical Use

- Inventory every outbound channel, including subprocesses, DNS, browser, connectors, and tool servers. Determine which traffic actually passes through the gate before claiming an allowlist protects it.
- Identify each allowed destination's reachable write APIs, accounts, relay features, and data-bearing requests. Constrain operations and recipients where confidentiality depends on them; keep task credentials outside untrusted execution when possible.
- Canonicalize the network identity consistently across matcher, resolver, connection, and TLS handshake; pin or enforce the address at connection time where rebinding matters.
- Test both prohibited destinations and prohibited effects on allowed destinations, using sensitive-data fixtures and attacker-controlled accounts. See [Policy Compilation Fidelity](/vault/policy-compilation-fidelity.md) for policy representation errors and [Tool Identity Versus Effect Authority](/vault/tool-identity-versus-effect-authority.md) for equivalent egress through allowed utilities.

## Limitations

Request inspection requires visibility into protocol content and may require trusted TLS interception; a host rule alone cannot provide it. Even scoped credentials may permit a harmful but syntactically authorized action. Provenance-aware effect checks depend on identifying protected data and covering every egress path, while narrow restrictions can disrupt legitimate workflows.

## Sources

- [How we contain Claude across products dossier](/dossiers/anthropic-agent-containment.md) — records exfiltration to an attacker-owned account through an approved API host and a later session-token-aware interception boundary.
- [Thinking Outside The Box — Exfiltrating OpenClaw Data from NVIDIA's Sandbox dossier](/dossiers/lasso-nemoclaw-authorized-egress-exfiltration.md) — demonstrates alpha-era sensitive-data writes through permitted GitHub tooling and, under additional setup conditions, another approved integration.
- [Claude Code: Data Exfiltration with DNS dossier](/dossiers/claude-code-dns-exfiltration-cve-2025-55284.md) — shows a diagnostic DNS lookup serving as a data-bearing outbound channel.
- [Second Time, Same Sandbox dossier](/dossiers/oddguan-claude-code-network-allowlist-bypass.md) — demonstrates a hostname parser differential that connects to a blocked host despite matching an approved suffix.
- [Configure the sandboxed Bash tool dossier](/dossiers/claude-code-bash-sandbox-model.md) — documents host-only proxy decisions without encrypted-content inspection and acknowledges fronting and broad-host risks.
- [Agent approvals & security — Codex dossier](/dossiers/openai-codex-approvals-security.md) — distinguishes proxied command traffic from excluded outbound channels and notes residual DNS-rebinding risk.
- [A sandbox without a network boundary is only half a sandbox dossier](/dossiers/vercel-sandbox-network-boundary.md) — contrasts host/SNI filtering with selective request inspection and external credential injection.
