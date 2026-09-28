---
type: Study Note
title: "Introducing nono: A Secure Sandbox for AI Agents"
description: The nono creator describes an agent-agnostic process wrapper that installs inherited filesystem and optional network confinement before agent execution.
resource: https://huggingface.co/blog/lukehinds/nono-agent-sandbox
source: /archive/nono-kernel-enforced-agent-sandbox.html
tags: [agents, sandboxing, agent-security, access-control, coding-agents]
timestamp: 2026-09-28T00:00:00Z
---

# Introducing nono: A Secure Sandbox for AI Agents — Study Notes

**Author**: Luke Hinds (nono creator; first-party product account on Hugging Face)  
**Date**: February 2, 2026

## What It Is

nono is a lightweight process wrapper that applies operating-system restrictions before launching a coding agent or other CLI tool. Hinds' motivation is that an agent otherwise inherits a developer's broad account permissions and can reach credentials or delete files. A kernel-enforced boundary does not require a model to agree that the action is unsafe. This post is a design and feature description, not an independent penetration test.

## Boundary, Defaults, and Escape Hatches

On Linux the proposed mechanism uses Landlock; on macOS it uses Seatbelt. Permissions for specific filesystem regions and, where supported, network access are applied before process execution and inherited by children. The post claims sensitive credential paths are denied by default; per-operation deletion and truncation restrictions complement broad path rules. Compared with a container or VM, the wrapper avoids an image/runtime layer but still shares the host kernel and whatever resources the selected policy grants.

The post distinguishes a preflight dangerous-command blocklist, which can be overridden, from kernel-enforced filesystem effects. User-granted paths and network permissions are *policy choices* that can broaden the boundary before launch; the claim of irreversibility applies only after restrictions have been installed. As described in February 2026, Linux network restrictions require a newer Landlock ABI than basic filesystem restrictions, macOS uses a distinct policy engine, and Windows is unsupported. The article calls this an agent-agnostic design rather than promising that the same policy semantics hold identically on each platform.

## Fix and Failure Class

The design addresses **model-mediated self-policing failure**: instead of relying on a command denylist or prompt refusal, constrain effects at the OS boundary and pass the restriction to subprocesses. It also makes policy scope visible to an operator before execution. However, a filesystem sandbox is not a VM boundary; authorizing broad workspace write access still permits harmful in-workspace changes, and allowing network access can reopen exfiltration paths. The post supplies no measured performance, adversarial bypass trial, or independent security audit; Hinds explicitly says auditing is ongoing.

## Analyst Takeaways

Separate flexible, overridable advisory command screening from inherited kernel restrictions. Assess a deployment by exact granted paths, actual network isolation, supported kernel/OS features, and the security of the underlying host; the product's absolute language about making unauthorized action impossible is conditional on correct and comprehensive policy coverage.

## Vault Ideas Extracted

* [Runtime-Activated Application Sandboxing](/vault/runtime-activated-application-sandboxing.md)
* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
