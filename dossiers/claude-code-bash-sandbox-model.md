---
type: Study Note
title: Configure the sandboxed Bash tool
description: Dated Claude Code security model for OS-enforced shell-process isolation, permission layering, credential exposure, unsandboxed retries, and admitted network bypass risks.
resource: https://code.claude.com/docs/en/sandboxing
source: /archive/claude-code-bash-sandbox-model.html
tags: [agents, coding-agents, sandboxing, access-control, agent-security]
timestamp: 2026-09-28T18:38:44Z
---

# Configure the sandboxed Bash tool — Study Notes

**Publisher**: Claude Code documentation  
**Captured**: September 2026; product behavior may change

## What It Is

A security-model description embedded in an operational guide. The substantive claim is narrower than whole-agent isolation: macOS Seatbelt or Linux/WSL2 bubblewrap mediates shell-like commands and their child processes at execution time; separate permission rules decide whether a tool runs at all. Built-in file tools, computer use on the desktop, and separate MCP/hook processes are not covered by this command boundary. Subagent shell calls inherit the parent's sandbox.

## Defaults, Authority, and Escape Paths

The documented command default permits reads across most of the host, **including common credential files**, unless explicitly protected; writes are concentrated in the workspace and temporary area. Shared git metadata for a linked worktree can be writable, while sensitive configuration and execution-bearing paths receive special write protection. Network access goes through an external proxy with no domains preapproved in the shell policy; allowed hosts can be persisted across sessions. Child processes inherit the parent environment by default, potentially including secrets. As a result, no-network and no-write claims do not imply that shell code never sees credentials.

When a command fails under isolation, the agent can request an unsandboxed retry through the normal permission flow; in automatic approval mode a classifier may judge the command instead of a person. The retry path can be disabled, but intentional exceptions and excluded commands still change the practical boundary. File-tool permissions act before a tool call, while the OS sandbox applies during the shell process regardless of its command name. These are complementary, not interchangeable, controls.

## Admitted Limitations

The built-in proxy makes host-level decisions without inspecting encrypted outbound content. A broad allowed host may exfiltrate data, and the documentation acknowledges potential domain-fronting bypasses; even its experimental TLS termination does not itself implement content filtering. Powerful Unix sockets can reintroduce host authority, broad writable paths can implant later-executed code, and weaker nested Linux isolation and macOS Apple Events exceptions substantially reduce containment; the latter can launch other applications outside the sandbox. Native Windows and WSL1 are not supported by this documented built-in Bash boundary. The page explicitly warns that sandboxing is not a complete isolation boundary.

## Analyst Takeaways

Treat a sandbox claim as a tuple of **covered processes, readable secrets, writable paths, mediated egress, and exception authority**. The same OS primitives can yield very different security when the default is host-wide reads or an approval mechanism admits unconfined retries. To evaluate unattended execution, check all code-capable tools and the credentials inherited by each, rather than extrapolating a Bash subprocess guarantee to the entire agent.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [MCP Tool Supply-Chain Assurance](/vault/mcp-tool-supply-chain-assurance.md)
* [Partial-Scope Tool Sandboxing](/vault/partial-scope-tool-sandboxing.md)
* [Privileged Local Daemon Sandbox Bypass](/vault/privileged-local-daemon-sandbox-bypass.md)
* [Destination Allowlist as Capability Grant](/vault/destination-allowlist-as-capability-grant.md)
* [Provider-Boundary Secret Substitution](/vault/provider-boundary-secret-substitution.md)

