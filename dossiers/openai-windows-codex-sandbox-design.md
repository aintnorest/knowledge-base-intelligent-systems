---
type: Study Note
title: "Building a safe, effective sandbox to enable Codex on Windows"
description: OpenAI's engineering account of composing restricted tokens, synthetic identities, ACLs, and principal-scoped firewall rules after rejecting advisory network suppression.
resource: https://openai.com/index/building-codex-windows-sandbox/
source: /archive/openai-windows-codex-sandbox-design.html
tags: [agents, sandboxing, coding-agents, agent-security, access-control]
timestamp: 2026-09-28T18:41:04Z
---

# Building a safe, effective sandbox to enable Codex on Windows — Study Notes

**Author**: David Wiesen  
**Publisher**: OpenAI  
**Date**: May 13, 2026

## Problem and Rejected Boundaries

Without an effective local Windows sandbox, Codex users had to approve nearly every command or run the agent with unrestricted access. The intended middle ground is broad reading and workspace-local writing for descendant commands, with outbound network access withheld. Open-ended shells, Git, interpreters, and build tools made AppContainer's up-front app-capability model too restrictive; Windows Sandbox offered stronger disposable isolation but separated the agent from the actual checkout and was unavailable on Windows Home. Relabeling a workspace as low integrity would alter its host-wide trust status: *any* low-integrity process, not just the agent, could write to it.

## From Unelevated Prototype to Enforced Network Isolation

The first prototype used a synthetic sandbox identity and a write-restricted process token. Windows admits a write only if both the ordinary principal and a restricted identity pass access checks, so ACL grants on writable roots and denies within protected subpaths constrained writes. However, this mutated host filesystem ACLs, incurred setup cost, and made policy changes expensive. Network suppression through proxy environment variables and shadowed executables caught cooperative tools but remained advisory: a program could ignore them and open its own sockets.

Windows firewall could not target the *restricted SID list* of a process token, and program-path rules would not follow an arbitrary tree of shells and tools. The redesign therefore created dedicated offline and online sandbox user principals. Outbound firewall rules attach to the offline principal; child processes still receive write-restricted tokens and workspace ACL limits. Setup now requires elevation to establish users, encrypted credentials, firewall rules, and access grants. The ordinary agent harness remains unelevated, while a separate runner launched as the sandbox user creates the final restricted token and child. This split also resolves an observed Windows privilege obstacle: the ordinary user's process could construct the sandbox-user restricted token but could not reliably launch the requested child with it.

The sandbox-user switch creates another compatibility cost: a distinct user lacks the developer's ordinary read access, especially within the home directory. OpenAI compensates with best-effort read ACL grants on common directories, applied asynchronously because walking those ACLs can be slow. The article presents this as a design compromise, not evidence of identical read compatibility on every installation.

## Analyst Takeaways and Limits

1. **Attach network policy to the identity shared by the entire process tree.** Environment variables and executable wrappers are cooperative signals, not isolation from adversarial binaries.
2. **Preserve host trust labels when defining agent-local writable roots.** A write allowance that weakens permissions for unrelated principals is the wrong boundary.
3. **Separate privileged installation from day-to-day execution.** Administrative setup can provision an enforced firewall without granting the long-running planner administrator rights.
4. **Security and developer compatibility interact.** Switching principals strengthens egress enforcement but requires read-access repair and exposes new setup, credential, and ACL lifecycle burdens.

This is a first-party engineering narrative without attack-success measurements, performance distribution, or independent assessment. Its “current” implementation refers to the May 2026 publication, not a promise about later versions.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Kernel-First Split Enforcement](/vault/kernel-first-split-enforcement.md)
