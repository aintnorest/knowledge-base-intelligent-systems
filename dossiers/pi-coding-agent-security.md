---
type: Study Note
title: Run Pi safely
description: Pi's stated security model distinguishes startup resource trust from runtime authority and whole-process confinement from built-in-tool-only isolation.
resource: https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/security.md
source: /archive/pi-coding-agent-security.md
tags: [agents, coding-agents, agent-security, sandboxing, access-control, prompt-injection]
timestamp: 2026-09-28T18:39:32Z
---

# Run Pi safely — Study Notes

**Publisher**: Pi project, repository security documentation  
**Version**: Captured September 28, 2026; behavior may change with the implementation

## What It Is

This first-party security account specifies where Pi's trust decisions apply and where they do not. Generated code and commands are treated as untrusted; absent an external restriction, the agent, installed extensions, package installers, and subprocesses can use the invoking account's file, process, credential, and network permissions. Pi does not require approval for every tool call.

## Startup Trust Is Not Runtime Authorization

Project trust gates loading many project-supplied settings and executable resources, particularly extensions and packages. Declining trust does not block ordinary project context files from entering the model's prompt, and instructions in those files may still redirect behavior. There is also a stated startup exception: Pi consults the project-selected session directory before resolving trust, and a later refusal cannot undo that lookup. Thus even startup gating has a pre-decision dependency, while no project-trust decision constrains what subsequently enabled tools may read or modify.

The working folder is a discovery and default-location convenience, not a filesystem security boundary. Watching transcripts, reviewing changes, or using project trust helps visibility and recovery but does not stop an already authorized tool from causing harm.

## Locate the Actual Confinement Boundary

A dedicated OS identity limits access to what that account can reach, but still shares an operating system and potentially network with other accounts. Running the *whole agent* inside a container, VM, or sandbox can protect unexposed host resources; exposed mounts, credentials, and reachable network services remain inside its effective authority. Isolating only built-in tools is weaker: the agent process and extensions still run outside that sandbox with host access. A tool wrapper cannot safely stand in for full-process containment when another execution path bypasses it.

The document advises limiting accessible resources and credentials and keeping recovery copies; these are risk-reduction measures, not proofs of immunity to prompt injection. Its disclosure policy explicitly treats expected locally privileged behavior and user-installed extension behavior as outside its claimed vulnerability boundary unless an actual privilege boundary is crossed.

## Analyst Takeaways

1. Name the protected principal and every execution path before calling an agent “sandboxed.” Child processes and extensions inherit authority unless separately confined.
2. Distinguish gating the loading of project code from authorizing runtime tool effects; startup trust does not immunize subsequent reads of untrusted context.
3. Exposed secrets and network services define practical blast radius even when filesystem/process isolation works as intended.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Mediated Agent Execution Isolation](/vault/mediated-agent-execution-isolation.md)
* [Partial-Scope Tool Sandboxing](/vault/partial-scope-tool-sandboxing.md)

