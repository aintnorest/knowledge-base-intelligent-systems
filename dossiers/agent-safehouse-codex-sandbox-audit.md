---
type: Study Note
title: "OpenAI Codex CLI — Sandbox Analysis Report"
description: Third-party Agent Safehouse source-code audit distinguishing the unsandboxed Codex harness from sandboxed tool subprocesses and identifying credentials and auxiliary integrations outside that boundary.
resource: https://agent-safehouse.dev/docs/agent-investigations/codex
source: /archive/agent-safehouse-codex-sandbox-audit.html
tags: [agents, agent-security, sandboxing, coding-agents, access-control, mcp]
timestamp: 2026-09-28T18:41:04Z
---

# OpenAI Codex CLI — Sandbox Analysis Report — Study Notes

**Publisher**: Agent Safehouse (**third-party**, not OpenAI)  
**Analysis date**: February 12, 2026  
**Source snapshot**: OpenAI Codex commit `26d9bddc52f88d9c88f5dd3740b65f675b7eac42`

## Scope and Main Finding

Agent Safehouse inspects Codex's open-source Rust implementation and its thin JavaScript launcher, mapping host filesystem, network, credentials, agent tools, and platform sandbox mechanisms. The consequential distinction is **the harness itself is not sandboxed by Codex's tool-call sandbox**: it runs with the user's authority, while commands spawned for the coding agent are wrapped in platform-specific restrictions. Sandboxing a command subprocess does not thereby confine the planner, authentication machinery, tool-server connections, or every extension it can invoke.

The report identifies three core sandbox postures: inspection without writes, workspace-scoped writes, and unrestricted execution. On macOS it observes a deny-by-default Seatbelt policy, parameterized writable roots, and protected repository control directories inside those roots; on Linux it traces bubblewrap, Landlock, and seccomp; on Windows it identifies restricted process tokens. When a network proxy mediates sandboxed commands, child traffic can be restricted to the proxy endpoint instead of direct external sockets. These are source-code observations at the audited commit, not independent runtime penetration-test results.

## Credential and Integration Boundaries

The audit traces login and MCP OAuth credentials through keyring or file-backed storage, local OAuth callback listeners, and the Codex client's model/authentication requests. MCP tool servers are separate child integrations with capabilities depending on their own configuration; a sandbox statement about the built-in shell cannot automatically be extended to arbitrary MCP effects. The analyst also notes pre-main anti-debug, core-dump suppression, and dynamic-library environment sanitization. These harden the main process but are not equivalent to restricting every permission it possesses.

Codex's session history, configuration, prompt/skill files, and state live outside a project checkout. The report's path and endpoint inventories are useful as audit scope, not stable operation instructions. Its explicit “none identified” under known vulnerabilities is **not** a claim that no sandbox bypass exists; the page does not present adversarial testing or a complete vulnerability search.

## Analyst Takeaways and Limits

1. **Specify the subject of isolation.** A tool-call sandbox protects the host from selected child actions only if every consequential action is routed through that enforced boundary.
2. **Map privileged side channels.** OAuth flows, host-side network requests, MCP tools, and stored credentials create distinct authorities that a shell sandbox alone does not police.
3. **Keep source audits version-bound.** This February commit predates OpenAI's later Windows sandbox engineering account and September-era security documentation; discrepancies may reflect software evolution, not necessarily auditor error.

The report is an interested third-party vendor's static source analysis, not an independent dynamic exploit assessment. Its exhaustive configuration and file inventories are deliberately not reproduced here.

## Vault Ideas Extracted

* [Cross-Mechanism Execution-Security Evaluation](/vault/cross-mechanism-execution-security-evaluation.md)
* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [MCP Tool Supply-Chain Assurance](/vault/mcp-tool-supply-chain-assurance.md)
