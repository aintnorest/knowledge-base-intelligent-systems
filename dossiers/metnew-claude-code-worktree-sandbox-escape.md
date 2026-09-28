---
type: Study Note
title: "Claude Code: unsandboxed code execution from prompt injection via .git worktree confusion"
description: Metnew's worktree-name and symlink chain from malicious repository instructions to shell startup execution before macOS confinement.
resource: https://github.com/Metnew/write-ups/blob/main/claude-code-worktree-sandbox-escape/README.md
source: /archive/metnew-claude-code-worktree-sandbox-escape.md
tags: [agents, agent-security, sandboxing, coding-agents, prompt-injection, access-control]
timestamp: 2026-09-28T18:39:48Z
---

# Claude Code Worktree Sandbox Escape — Study Notes

**Researcher**: Metnew  
**Affected version**: Claude Code 2.1.139 on macOS Tahoe  
**Evidence position**: Third-party security research; the source labels its introductory exploit explanation human-written and the longer walkthrough model-generated.

## Boundary and Attack Preconditions

The starting scenario is a cloned attacker-controlled repository whose agent instructions steer Claude Code's built-in worktree actions. Even with sandboxing and the more restrictive Bash approval behavior enabled, worktree-management tools and Git metadata transitions had effects not adequately bounded by the shell tool's Seatbelt profile. The malicious repository root was deliberately laid out so its files also formed a valid Git metadata directory; that unusual shape is necessary to exploit a worktree called `.git`.

## Exploited Seam

Allowing `.git` as a worktree name made worktree content collide with Git's conventional metadata lookup. Attacker-controlled fsmonitor configuration then ran during ordinary worktree/Git actions. A staged symlink and forged worktree metadata caused a subsequent worktree operation to point at the user's home directory and obtain a write there, including to the shell's startup file. A later shell launch loaded that file **before** Seatbelt policy activation and executed the attacker-controlled content unsandboxed.

There are two separate trust transitions: project data became Git control metadata, then a write to shell initialization became host execution prior to sandbox entry. The visible prompt injection sequenced legitimate-looking worktree operations; it did not need an initial approval for a direct host-home shell write. Treat the source's Linux portability suggestions as hypotheses: the demonstrated outcome is macOS-specific.

## Fix, Evidence, and Limits

Anthropic deployed the fix June 4, 2026 and released it in **Claude Code 2.1.163**: `.git` is no longer an allowed worktree name. Advisory GHSA-7835-87q9-rgvv / CVE-2026-55607 was published June 25, 2026. The author reports a high-severity CVSS 7.7 finding, submitted May 11, and a working proof on 2.1.139. The source's longer model-generated reconstruction is useful for causal detail but should not be treated as independent validation of every claimed alternate route. Rejecting the collision name closes this particular chain; it is not a blanket proof that every worktree symlink or shell-initialization boundary is safe.

## Analyst Takeaways

Security-relevant path names must be interpreted in the namespace of their eventual consumer, not only as valid strings when created. Validate worktree destinations after symlink resolution, and ensure shell startup and all tool bootstrap steps inherit containment before consulting writable user files.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Partial-Scope Tool Sandboxing](/vault/partial-scope-tool-sandboxing.md)
* [Writable-Artifact Authority Handoff](/vault/writable-artifact-authority-handoff.md)

