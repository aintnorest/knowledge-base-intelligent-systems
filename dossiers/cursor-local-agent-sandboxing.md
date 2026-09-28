---
type: Study Note
title: "Implementing a secure sandbox for local agents"
description: Cursor's OS-specific terminal sandbox balances permission boundaries with approval fatigue and uses explicit denial feedback to prevent agents repeating blocked actions.
resource: https://cursor.com/blog/agent-sandboxing
source: /archive/cursor-local-agent-sandboxing.html
tags: [agents, coding-agents, sandboxing, agent-security, agent-harness, human-in-the-loop]
timestamp: 2026-09-28T18:43:43Z
---

# Implementing a Secure Sandbox for Local Agents — Study Notes

**Authors**: Ani Betts, Yash Gaitonde, and Alex Haugland  
**Published**: February 18, 2026

## Problem and Approach

Repeated manual command approval can become a weak safety boundary when reviewers stop inspecting prompts, especially while multiple agents work concurrently. Cursor instead lets the agent execute within a restricted local subprocess environment and asks for approval on crossing the boundary, frequently for network access. It reports sandboxed agents stopping 40% less often than unsandboxed ones; the article does not publish denominators or a security incident comparison.

## Platform-Specific Boundaries

The same user-facing sandbox is implemented differently by OS. On macOS Cursor chose Seatbelt process-tree policies after rejecting App Sandbox (signing arbitrary agent-run binaries would confer problematic trust), Linux containers (wrong binary environment), and VMs (startup/memory cost for local use). On Linux seccomp blocks selected syscalls and Landlock restricts files; an overlay lets ignored workspace files become inaccessible, with discovery/remounting of those files a performance bottleneck. Windows uses the Linux sandbox in WSL2 because equivalent general-purpose native primitives were not available to this design as of February 2026. These are process confinement choices, not claims that every host operating system has equivalent isolation strength.

Filesystem access is shaped by workspace and administrator policy, including ignored paths; sensitive editor and git metadata receive write protections. The effective boundary depends on generated policy and what is exposed before starting the sandbox, not merely the name of a kernel mechanism.

## Agent Awareness and Evidence

Initial harness changes explained permission modes to the agent, but internal evaluation revealed repeated retries of the same blocked command without an authority change. Tool errors that name the specific sandbox denial and indicate when escalation is needed produced better recovery and significantly improved offline evaluation performance, though no numerical benchmark result is given. Gradual rollout then reached a reported third of requests on supported platforms. The model must understand both what it can do and when a failure requires a human decision, or permission denials become futile loops.

## Analyst Takeaways

- Judge a sandbox together with its approval workflow: too many interruptions erode human scrutiny, while opaque denials waste agent work.
- Portability of an API does not imply parity of operating-system guarantees or startup costs.
- Escalation is a real boundary crossing; clear denial feedback helps the agent ask rather than retry blindly, but the post does not present adversarial escape testing.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Agent-Ergonomic Interface Design](/vault/agent-ergonomic-interface-design.md)
