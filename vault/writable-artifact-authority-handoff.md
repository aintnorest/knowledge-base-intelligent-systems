---
type: Synthesis
title: Writable-Artifact Authority Handoff
description: Agent-writable state becomes executable authority when a more privileged consumer later interprets it without preserving writer provenance or obtaining fresh authorization.
tags: [agent-security, access-control, sandboxing, provenance, agents]
timestamp: 2026-09-28T00:00:00Z
---

# Writable-Artifact Authority Handoff

A confined agent may be allowed to write a workspace or persistent state without being allowed to execute on the host. If a later, more privileged consumer loads that state as hooks, configuration, startup instructions, scheduled work, or executable files, the write becomes a deferred exercise of the consumer's authority. The critical transition is *interpretation under a different principal*, not whether the first write violated its sandbox.

## Operating Pattern and Failure

1. A lower-trust actor writes an artifact within its permitted filesystem scope.
2. The artifact survives until a host service, another agent, a scheduler, or a fresh session reads it.
3. That consumer treats its contents as commands or standing instructions under authority the writer did not have.
4. If the consumer neither checks provenance nor requires fresh approval, an allowed write has been laundered into a higher-privilege effect.

A repository can hold both task data and executable control surfaces. Protection of one agent's own configuration does not suffice when it can change another consumer's configuration. A bounded write into a neighboring project can likewise become a host-executed lifecycle hook on a later launch. See [Partial-Scope Tool Sandboxing](/vault/partial-scope-tool-sandboxing.md) for immediate harness-helper execution of untrusted repository state; this note concerns the *durable write-to-consume handoff*.

## Why It Matters

Filesystem permission at write time answers where the agent may place bytes, not what authority those bytes gain later. The effective boundary must include the consumer's parser and execution context, even when the two events occur in different sessions or projects.

## Practical Use

- Inventory agent-writable instructions, startup files, tool/server declarations, hooks, tasks, and scheduled jobs by **eventual consumer**, including other agents.
- Protect executable control artifacts from lower-trust writers, or require an explicit review of the exact artifact and effect before a privileged consumer adopts it.
- Preserve writer provenance across sessions and re-evaluate authority when configurations are loaded; sandbox the consumer or narrow its capabilities when it must process untrusted project state.
- Test a permitted write followed by a fresh consumer launch, not just immediate direct-write denials.

## Limitations

Not every writable file is executed: the consumer must actually load it, and user approval or consumer confinement may stop the transition. Source incidents demonstrate particular file and launch paths, not universal execution from every repository write. Preserving provenance alone is insufficient without a policy that uses it at adoption.

## Sources

- [Thinking Outside The Box — Exfiltrating OpenClaw Data from NVIDIA's Sandbox dossier](/dossiers/lasso-nemoclaw-authorized-egress-exfiltration.md) — alpha-era dependency execution planted scheduled work and persistent agent instructions that affected later activity under specific integration conditions.
- [The Week of Sandbox Escapes dossier](/dossiers/pillar-week-of-sandbox-escapes.md) — reports host consumption of writable virtual environments, Git metadata, project hooks, and tasks across several cases.
- [Cross-Agent Privilege Escalation: When Agents Free Each Other dossier](/dossiers/cross-agent-configuration-privilege-escalation.md) — demonstrates one agent writing another's integration configuration for execution at a later invocation.
- [Claude Code macOS Sandbox Escape via Literal Path and Glob Confusion dossier](/dossiers/codeant-claude-code-macos-glob-sandbox-escape.md) — widened write authority planted a sibling-project lifecycle hook executed upon later opening.
- [Claude Code worktree sandbox escape dossier](/dossiers/metnew-claude-code-worktree-sandbox-escape.md) — a worktree-induced startup-file write ran before confinement on the next shell launch.
- [Beltdown: Escaping the Claude Code sandbox dossier](/dossiers/accomplish-beltdown-claude-code-sandbox-escape.md) — nested writable Git metadata became executable authority when a host-side indexer consumed it.
