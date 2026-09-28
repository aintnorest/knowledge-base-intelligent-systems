---
type: Synthesis
title: Partial-Scope Tool Sandboxing
description: A tool-confined agent can still cross the intended boundary through unconfined sibling tools, privileged harness helpers, bootstrap steps, approved retries, or delegated workers.
tags: [sandboxing, agent-security, agent-harness, access-control, agents]
timestamp: 2026-09-28T00:00:00Z
---

# Partial-Scope Tool Sandboxing

A sandbox around one agent tool confines only the processes that actually enter it. Other tools, the harness's own context-gathering subprocesses, startup operations, retries outside confinement, and delegated agents may have different authority. The security boundary is the complete path from untrusted input to effect, not the label “sandboxed agent.”

## Boundary Map

| Path | Question to resolve |
| --- | --- |
| Model-directed execution | Do all children inherit the same filesystem, network, and credential restrictions? |
| Sibling tools and subagents | Which actions run elsewhere, and which exceptions or elevation routes can they request? |
| Harness helpers | Can indexing, discovery, status checks, or other read-like operations interpret repository-controlled executable metadata outside confinement? |
| Bootstrap and retries | Does containment begin before reading writable startup state, and does a failed operation retry with broader authority? |

A seemingly passive repository query can launch a configured helper. If the harness executes that query as the host user while only model-directed shell calls are confined, the agent need not even request a dangerous command. Likewise, a write that affects the next shell's startup files can run before the next sandbox is installed. A startup trust decision controls loading of some project resources; it does not grant confinement to later tool effects.

## Why It Matters

A successful denial through one tool is evidence about that tool, not every equivalent effect path. Per-call hardening of privileged helpers can miss one invocation. Placement of the process, time of sandbox entry, and approval for unconfined retries must be described separately from tool availability. See [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md) for deployment-wide assessment and [Writable-Artifact Authority Handoff](/vault/writable-artifact-authority-handoff.md) for delayed interpretation of agent-written state.

## Practical Use

- Enumerate every process and tool reachable from an untrusted workspace, including implicit context collection and child/delegated execution; record where each gains its authority.
- If privileged helpers cannot inherit containment, centrally neutralize executable project configuration at every spawn and test read-like operations against hostile metadata.
- Exercise bootstrap, tool denial, retry, and subagent paths with an observable forbidden effect; check both whether the tool was blocked and whether the effect happened elsewhere.

## Limitations

Whole-process confinement closes many tool-coverage gaps but does not protect secrets or host capabilities deliberately exposed inside it. Centralized helper hardening depends on covering every executable interpretation path. An authorized escalation changes the boundary rather than proving it held.

## Sources

- [Beltdown: Escaping the Claude Code sandbox dossier](/dossiers/accomplish-beltdown-claude-code-sandbox-escape.md) — nested Git metadata and a missed unsandboxed indexing call executed a repository helper despite confined model-directed shell calls.
- [Claude Code worktree sandbox escape dossier](/dossiers/metnew-claude-code-worktree-sandbox-escape.md) — worktree confusion enabled a startup-file write whose later shell execution preceded confinement.
- [Run Pi safely dossier](/dossiers/pi-coding-agent-security.md) — distinguishes startup trust and built-in-tool isolation from whole-agent runtime confinement.
- [Configure the sandboxed Bash tool dossier](/dossiers/claude-code-bash-sandbox-model.md) — documents shell-process coverage, uncovered tools and hooks, subagent inheritance, and unconfined retries.
- [Sandbox — Codex dossier](/dossiers/openai-codex-sandbox-boundaries.md) — distinguishes inherited command restrictions from separately controlled browsers, plugins, and search.
- [Sandbox vs tool policy vs elevated dossier](/dossiers/openclaw-sandbox-tool-policy-elevated.md) — separates tool placement, named-tool availability, and gated host execution.
- [Beltdown2: Escaping the Cursor CLI sandbox dossier](/dossiers/accomplish-beltdown2-cursor-cli-sandbox-escape.md) — a read-only request triggered host-side Git indexing that honored executable metadata; centralized per-spawn hardening closed the observed path.
- [An Introduction to AI Coding Agent Security dossier](/dossiers/ncc-group-coding-agent-security-boundaries.md) — surveys incomplete coverage across startup phases, tool permissions, helpers, and downstream interpreters.
