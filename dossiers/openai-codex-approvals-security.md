---
type: Study Note
title: "Agent approvals & security — Codex"
description: OpenAI's account of local command, network, connector, approval-review, and asynchronous monitoring boundaries, including exclusions and admitted DNS-rebinding limits.
resource: https://learn.chatgpt.com/docs/agent-approvals-security
source: /archive/openai-codex-approvals-security.html
tags: [agents, agent-security, access-control, sandboxing, human-in-the-loop, coding-agents]
timestamp: 2026-09-28T18:41:04Z
---

# Agent approvals & security — Codex — Study Notes

**Publisher**: OpenAI  
**Source type**: Product security documentation, captured September 2026

## Security Model

Codex separates a technically enforced local command sandbox from an approval policy governing exceptions. The documented ordinary local posture gives the agent workspace writes, read access broader than writes, and no command network access unless deliberately enabled. Writable roots still protect repository control directories—including Git metadata and local agent configuration—from child-process writes. Platform enforcement varies: Seatbelt on macOS, bubblewrap and seccomp on Linux/WSL2, and a native Windows implementation. Cloud tasks use managed containers rather than this local boundary.

An app or MCP call may be subject to approval even though it is not a shell command. The source says advertised destructive tool annotations trigger approval unless a read annotation takes priority. Because that judgment depends on tool annotations, advertised metadata and actual side effects must not be conflated.

## Network Boundaries and Failure Modes

Command network access and destination filtering are separate switches. If network access is granted but its command proxy is not active, outbound traffic is direct and domain rules do not constrain it. With the proxy active, its allowlist-first rules can constrain subprocess traffic and exclude local/private destinations by default; a deny takes precedence over an allow. A hostname resolving to a non-public address is blocked even if its name matches an allow rule. OpenAI calls DNS/IP checking **best effort**, not complete rebinding resistance: full resistance requires transport-layer address pinning or lower-layer egress control.

The command proxy does **not** mediate web search, connector/app calls, MCP server connections, browser/computer-use activity, cloud tasks, or the Codex client's own model/authentication traffic. These have separate service policies. A restricted shell is therefore not an overall data-exfiltration policy. Even an outer devcontainer ceases to protect credentials deliberately mounted into it if its inner agent runs with broad access.

## Review and Monitoring

Interactive approval can route eligible requests to a separate automatic reviewer. OpenAI describes risk screening for exfiltration, credential probing, persistent security weakening, and destructive actions; reviewer construction, parsing, and policy failures fail closed, and timeouts do not execute the proposed action. It only inspects actions that already require approval—ordinary in-sandbox actions do not pass through it. Separate asynchronous safety monitoring can pause an unsafe task *after* the triggering activity. A prior approval therefore does not imply monitoring approval, and a later pause cannot undo a completed action.

At the captured version, the older selectable “untrusted” approval policy is retired; a project-derived trust rule retains a stricter command-approval behavior. The page also distinguishes cached search results from live browsing as an exposure tradeoff, while warning that cached results remain untrusted content. Exported monitoring is opt-in and tool arguments or results can themselves be sensitive.

## Analyst Takeaways and Limits

1. **Audit every outbound channel separately.** Network denial at the shell or command proxy does not cover browser, MCP, model-service, or cloud traffic.
2. **Distinguish pre-action admission from post-action detection.** Automatic review can block a request before execution; asynchronous monitoring cannot retroactively enforce a boundary.
3. **Treat proxy enablement and access permission as independently necessary.** An allowlist alone is not evidence that traffic follows it.
4. **Document residual risks at the boundary actually used.** DNS rebinding, misannotated tools, credential-bearing containers, and broad full-access modes require separate controls.

This is first-party documentation of asserted behavior, not an independent penetration test. Defaults and release-specific policies can change; the documented 2026-era scope should be checked against the deployed client.

## Vault Ideas Extracted

* [Cross-Mechanism Execution-Security Evaluation](/vault/cross-mechanism-execution-security-evaluation.md)
* [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md)
* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Destination Allowlist as Capability Grant](/vault/destination-allowlist-as-capability-grant.md)

