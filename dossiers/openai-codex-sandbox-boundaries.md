---
type: Study Note
title: "Sandbox — Codex"
description: OpenAI's local Codex boundary model separates OS-enforced limits on command execution from approval decisions about crossing those limits.
resource: https://learn.chatgpt.com/docs/sandboxing
source: /archive/openai-codex-sandbox-boundaries.html
tags: [agents, sandboxing, coding-agents, access-control, human-in-the-loop]
timestamp: 2026-09-28T18:41:04Z
---

# Sandbox — Codex — Study Notes

**Publisher**: OpenAI  
**Source type**: Product documentation, captured September 2026

## What It Is

OpenAI describes a local coding-agent execution boundary shared conceptually by the ChatGPT desktop app, Codex CLI, and IDE extension. Agent-spawned commands—including tools such as Git, package managers, and test runners—inherit restrictions on filesystem writes and network access. This is a claim about the spawned execution environment, not a guarantee that every connected tool or service is governed by that same sandbox.

## Two Independent Controls

The sandbox determines which actions are technically possible without escalation; approval policy determines when and to whom an escalation is presented. Within the granted workspace, routine edits and commands continue without per-command confirmation. The point is to replace approval fatigue with an enforced, predeclared low-risk envelope, while preserving a separate decision at its boundary. A user-approved escalation is not a stronger sandbox; it authorizes stepping outside it.

As documented at capture, the common local posture permits workspace writes and routine commands but denies command network access by default; read-only operation narrows mutations; full access removes filesystem and network sandbox restrictions. Additional writable roots broaden rather than abolish the workspace boundary. Command-specific allow/prompt/forbid rules offer narrower exceptions than globally broadening access. Automatic approval review, where available, changes the reviewer of eligible boundary crossings, not the technical sandbox itself.

## Surfaces and Caveats

Enforcement is platform-specific: macOS uses Seatbelt, Linux and WSL2 use a Linux sandbox, and native Windows uses a separate Windows implementation. ChatGPT Work instead runs code in a managed isolated environment with workspace policy and tool-specific network controls. Web search, plugins, and the remote browser have separate controls, so a shell network restriction must not be advertised as a universal outbound-data policy.

The page's platform prerequisites and selector instructions change with releases; the enduring model is the distinction between restricted child execution and review at a requested boundary. This is vendor documentation, not an independently measured escape-resistance study.

## Analyst Takeaways

1. **Scope the claim to the process and tool surface actually confined.** Inherited restrictions on spawned commands do not imply equivalent controls for browsers or connectors.
2. **Keep authorization distinct from isolation.** A reviewer can decide exceptions, but review is not enforcement against an already authorized child.
3. **Choose the smallest useful envelope.** Broad workspace access buys autonomy; separate projects and narrowly scoped exceptions preserve meaningful isolation between tasks.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Cross-Mechanism Execution-Security Evaluation](/vault/cross-mechanism-execution-security-evaluation.md)
* [Partial-Scope Tool Sandboxing](/vault/partial-scope-tool-sandboxing.md)

