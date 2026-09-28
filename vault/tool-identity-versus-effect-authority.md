---
type: Synthesis
title: Tool Identity Versus Effect Authority
description: Approving a tool or executable name does not constrain the writes, execution, or data transfer reachable through its arguments and other permitted tools.
tags: [agent-security, access-control, tool-use, sandboxing, agents]
timestamp: 2026-09-28T19:05:31Z
---

# Tool Identity Versus Effect Authority

Tool identity answers *which interface may be called*; effect authority answers *what the call may actually do*. A name-based allowlist is not a read-only or non-execution boundary if an admitted tool's arguments can launch programs, write files, or emit network requests—or if another admitted tool can perform the same forbidden effect. The relevant unit of authorization is the reachable effect under the actual arguments and environment.

## Operating Pattern

| Admission surface | Hidden authority | Stronger boundary |
| --- | --- | --- |
| Approved search or test executable | Options that interpret input as flags, execute helpers, or write output | Structured arguments with positional values separated from options; execution confinement |
| Approved diagnostic utility | Queries whose names can carry secret data | Constrain protected reads and outbound destinations/data flow |
| Named editing tool denied, general shell admitted | Shell commands can edit the same files | Restrict filesystem writes at execution time, regardless of tool name |
| One command path denied | Another executable tool invokes an equivalent effect | Inventory and mediate all equivalent routes |

## Why It Matters

Native tools have expressive argument grammars, so an innocuous command name can conceal code execution without shell metacharacters. Likewise, a permission decision about one dispatcher cannot bind an independent shell, browser, or delegated worker. A denied tool name only removes that interface; it does not revoke ambient OS capabilities from other permitted tools. Even a correctly classified approval tier admits the ambient privileges of the process it launches.

## Practical Use

- Model each admitted tool's possible effects under adversarial arguments, including its subcommands, preprocessing, output paths, plugins, and child processes.
- Where a wrapper narrows an interface, pass user-supplied operands as data rather than flags. Prefer OS and network controls that confine effects independently of the invoked executable.
- Test forbidden effects through *every* allowed route, including compositions of a sensitive read and an outbound utility. For authorization at consequential sinks, see [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md); for destination scope, see [Destination Allowlist as Capability Grant](/vault/destination-allowlist-as-capability-grant.md).

## Limitations

Confinement bounds damage but cannot by itself establish that an otherwise permitted write serves the user's task. Narrow argument schemas may sacrifice useful native features; broad schemas demand continual auditing as utilities evolve. Effect-sensitive admission requires complete coverage of alternate tools and downstream processes.

## Sources

- [Prompt injection to RCE in AI agents dossier](/dossiers/trail-of-bits-argument-injection-rce.md) — three one-shot demonstrations in unnamed agents where allowed test, version-control, and search utilities performed execution or writes through arguments.
- [Sandbox vs tool policy vs elevated dossier](/dossiers/openclaw-sandbox-tool-policy-elevated.md) — distinguishes named-tool admission from execution placement and explicitly notes that a permitted shell can perform denied file-edit effects.
- [Claude Code: Data Exfiltration with DNS dossier](/dossiers/claude-code-dns-exfiltration-cve-2025-55284.md) — shows preapproved diagnostic utility plus sensitive read becoming an outbound exfiltration chain.
- [Oh My Pi Tool Approval Model dossier](/dossiers/omp-tool-approval-model.md) — documents argument-dependent approval tiers and the limitation of shell-specific patterns when another executable tool reaches the same effect.
