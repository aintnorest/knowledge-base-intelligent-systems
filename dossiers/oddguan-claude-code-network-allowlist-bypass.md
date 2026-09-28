---
type: Study Note
title: "Second Time, Same Sandbox: Another Anthropic Claude Code Network Sandbox Bypass Enables Data Exfiltration"
description: Aonan Guan's demonstration that a SOCKS5 hostname containing a null byte passed JavaScript wildcard policy but resolved to a different blocked host through libc.
resource: https://oddguan.com/blog/second-time-same-sandbox-anthropic-claude-code-network-allowlist-bypass-data-exfiltration/
source: /archive/oddguan-claude-code-network-allowlist-bypass.html
tags: [agents, agent-security, sandboxing, access-control, coding-agents]
timestamp: 2026-09-28T18:39:48Z
---

# Second Time, Same Sandbox — Study Notes

**Researcher**: Aonan Guan  
**Published**: May 20, 2026  
**Evidence position**: Third-party security research; the author identifies a separate earlier sandbox-runtime disclosure and discusses vendor acknowledgment and disclosure gaps.

## Assumed Boundary

Claude Code's shell sandbox restricted direct network access and delegated outbound decisions to a host-side SOCKS5 proxy. With a wildcard destination allowlist, processes inside the sandbox were supposed to reach only approved domains. The attacker requires code execution *inside* that sandbox and a wildcard allowlist; prompt injection is a plausible way to induce execution, not a prerequisite reproduced by the minimal network proof.

## Exploited Seam

The SOCKS proxy read attacker-supplied hostname bytes as a JavaScript string and matched the wildcard against the string suffix. A hostname formed as `blocked-host\x00.allowed-domain` passed the suffix check. The same bytes crossed to libc name resolution, where the null terminated the C string and the host dialed was **blocked-host**, not the approved suffix. The operating-system sandbox still correctly forced traffic through the proxy; the trusted proxy's parser differential broke the actual egress decision. The researcher reports a blocked control request and a successful raw SOCKS5 null-byte request under the same policy.

The article also recaps a separate earlier failure: an empty allowlist was read as disabling the proxy rather than denying all egress. That case, CVE-2025-66479 in sandbox-runtime, was fixed in Claude Code **2.0.55 on November 26, 2025**, but the null-byte seam remained. The two issues share an incorrectly implemented policy boundary, not the same direct cause.

## Patch and Evidentiary Limits

The researcher identifies vulnerable Claude Code versions **2.0.24 through 2.1.89**, from sandbox release on October 20, 2025, and reports the hostname issue silently fixed in **2.1.90 on April 1, 2026**. The underlying sandbox-runtime fix is **0.0.43**, adding hostname validity checks before matching; 0.0.42 lacked them. As of the May 2026 account, the author found no Claude Code advisory or CVE for the null-byte issue and says the report was closed as duplicate of an internal report. The claimed roughly 130-version exposure is a version-history finding, not evidence that every deployment permitted the requisite sandboxed code and wildcard policy. The example establishes arbitrary blocked-host connectivity; actual theft of specific credentials is a possible downstream impact, not measured by the reported control test.

## Analyst Takeaways

Validate network identities once at the boundary in a representation both policy matcher and resolver will interpret identically. A correctly enforced local process sandbox can still outsource egress to a confused privileged proxy. Test allowlist edge semantics—empty sets as well as parser differentials—and propagate fixes into the actual application version users deploy.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Downstream Security Patch Propagation](/vault/downstream-security-patch-propagation.md)
* [Destination Allowlist as Capability Grant](/vault/destination-allowlist-as-capability-grant.md)
* [Policy Compilation Fidelity](/vault/policy-compilation-fidelity.md)

