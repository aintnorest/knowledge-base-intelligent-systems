---
type: Study Note
title: Anthropic Sandbox Runtime
description: Standalone OS-process sandbox model with host-proxied egress, asymmetric file policies, dynamic policy limits, and platform-specific security exceptions.
resource: https://github.com/anthropic-experimental/sandbox-runtime/blob/main/README.md
source: /archive/anthropic-sandbox-runtime.md
tags: [agents, sandboxing, agent-security, access-control, mcp]
timestamp: 2026-09-28T18:38:44Z
---

# Anthropic Sandbox Runtime — Study Notes

**Publisher**: Anthropic experimental repository  
**Captured**: September 2026; beta research preview

## What It Is

A standalone sandbox for a process and its descendants, including possible agent, tool, or MCP-server processes, using OS-level filesystem/network controls and a host-side proxy. It is not itself a complete agent permission system: the boundary depends on which process it wraps, credential inheritance, allowed IPC, and proxy policy. The repository explicitly describes unstable APIs and configuration formats.

## Enforcement Model

The documented file policy allows reads broadly unless denied and denies writes unless allowed. Network egress is denied until destinations are allowed. On macOS Seatbelt constrains a process's network route to a controlled local proxy; on Linux bubblewrap removes normal network namespace access while host proxies receive traffic through mounted Unix sockets. The README additionally describes a Windows implementation with a separate low-authority local account, per-session filesystem grants, and account-keyed network filtering. This differs from the Claude Code built-in Bash documentation, which says its built-in boundary does not support native Windows: package capabilities do not establish that every embedding product uses them.

A live control channel can change proxy domain admission during execution, whereas filesystem rules are baked into the process sandbox when it starts. Invalid updates leave the last valid network policy in force. On Linux, glob-based read denials are resolved over files present at launch, so later files may not be covered; certain write-denial mountpoints also depend on startup state. This distinction makes a policy update or fresh path creation materially different from relaunching under a new filesystem policy.

## Residual Authority and Limits

Allowed network domains are capabilities, not an inspection of encrypted contents; broad host grants and domain fronting can expose egress routes. A trusted local Unix socket can carry host-level power, especially a container-engine control socket. Writable startup files or executable paths can trigger code under a different authority later. Weaker nested isolation for restricted Linux containers, macOS trust-service exceptions, and Apple Events each trade away containment; Apple Events can launch unconfined applications. Linux proxy routing also depends on client proxy compatibility, with unsupported clients unable to connect rather than automatically bypassing network isolation. A Linux seccomp layer blocks new Unix sockets but does not remove inherited or received socket descriptors.

The README presents the runtime's defaults as narrow network/write access, but broad read visibility and policy-specific carve-outs remain important. Its rich platform-specific account supports a threat model, not an independently verified claim that all host integrations resist malicious code.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [MCP Tool Supply-Chain Assurance](/vault/mcp-tool-supply-chain-assurance.md)
