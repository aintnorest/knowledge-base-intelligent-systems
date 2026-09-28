---
type: Study Note
title: "Beltdown: Escaping the Claude Code sandbox"
description: Accomplish's chained escape through a nested Git directory, an unhardened unsandboxed harness Git call, and skill-triggered index refresh.
resource: https://accomplish.ai/blog/beltdown-escaping-the-claude-code-sandbox/
source: /archive/accomplish-beltdown-claude-code-sandbox-escape.html
tags: [agents, agent-security, sandboxing, coding-agents, access-control]
timestamp: 2026-09-28T18:39:48Z
---

# Beltdown: Escaping the Claude Code Sandbox — Study Notes

**Researcher**: Oren Yomtov, Accomplish  
**Published**: September 11, 2026  
**Evidence position**: Third-party security research by Accomplish, a competing agent-isolation vendor; its VM design is contrasted with the target product.

## Boundary and Threat Model

Claude Code's macOS Seatbelt confinement wrapped agent Bash commands, and restrictive permission mode denied further approvals. The harness nevertheless ran its own Git indexing outside that sandbox. A malicious or compromised repository plus agent interaction could make repository-controlled Git configuration affect this unsandboxed internal work. The reported reproduction ran with the sandbox enabled and strict no-prompt mode; the author says indirect prompt injection can initiate the chain.

## Exploited Seam

Git can execute a repository-specified fsmonitor helper while examining working-tree state. Most internal Git calls had been neutralized, but a file-index refresh call was not. Root `.git` writes and renames were protected; a nested `.git` rename escaped that narrower path rule, letting an attacker stage poisoned Git metadata in a subfolder. The harness used the Bash tool's latest working directory instead of invariably the clean project root. Reading a file in that subfolder caused skill auto-loading and an index refresh; the unprotected Git invocation then honored the poisoned config and ran the helper as the host user outside Seatbelt, without a permission prompt.

The failure class is **partial tool confinement plus unsandboxed, repository-sensitive harness work**. Even hardening nearly every Git path is insufficient if a single internally triggered path retains executable configuration.

## Fix and Limits

Reported July 13, 2026; Anthropic first hardened calls in Claude Code **2.1.223** on August 6 but missed others. According to the researcher, the full fix arrived August 26 in **2.1.247**, neutralizing fsmonitor across every harness Git call. A broader whole-process isolation boundary is the competitor's alternative; the account does not supply a controlled comparison of products. The exploit requires the nested metadata placement and subsequent index refresh, not merely the presence of a malicious README in an untouched clone.

## Analyst Takeaways

Audit every privileged context-gathering call and enforce one shared Git-execution policy. Treat automatic indexing and skill discovery as consequential host actions, not passive reads. Permission prompts for model-driven shell commands do not mediate the harness's own side effects.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Partial-Scope Tool Sandboxing](/vault/partial-scope-tool-sandboxing.md)
* [Writable-Artifact Authority Handoff](/vault/writable-artifact-authority-handoff.md)

