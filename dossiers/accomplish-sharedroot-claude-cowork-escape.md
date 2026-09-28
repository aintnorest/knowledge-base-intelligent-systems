---
type: Study Note
title: "SharedRoot: Escaping the Claude Cowork sandbox"
description: Accomplish's guest-root escalation chain showing that a writable whole-host VM share makes a guest kernel flaw into host filesystem compromise.
resource: https://accomplish.ai/blog/sharedroot-escaping-claude-cowork-sandbox/
source: /archive/accomplish-sharedroot-claude-cowork-escape.html
tags: [agents, agent-security, sandboxing, access-control, coding-agents]
timestamp: 2026-09-28T18:39:48Z
---

# SharedRoot: Escaping the Claude Cowork Sandbox — Study Notes

**Researcher**: Oren Yomtov, Accomplish  
**Published**: July 23, 2026  
**Evidence position**: Third-party security research by Accomplish, a competing agent-isolation vendor.

## Assumed Boundary

In the tested local Cowork design, the agent runs as an unprivileged user inside a Linux VM with seccomp filtering. A root guest broker provides the folders a user deliberately shares. The intended boundary keeps the agent inside that VM and those folders, even when it processes attacker-controlled content. The critical broader host share was less visible: the **entire host filesystem** was also mounted read-write inside the guest, accessible to guest root.

## Exploited Seam

The unprivileged session could create a user namespace and gain capabilities there, use allowed netlink operations to load and reach an unnecessary traffic-control module, and exploit the then-public **CVE-2026-46331** page-cache poisoning flaw against a root-owned executable. A root broker later executed the poisoned cached image and crossed from session user to guest root. Guest root then accessed the writable whole-host share; a host-home file outside the connected folder was written in the authors' end-to-end demonstration.

This was **not** a hypervisor escape: VM guest privileges became host-file authority through a host-provided share. The kernel vulnerability supplies one privilege-escalation link, but the size and writeability of the host mount determine whether that escalation stays in the guest or reaches the user's files.

## Four Independent Containment Decisions

The authors identify separate ways to break the chain: deny unprivileged user namespaces, constrain the seccomp and network-protocol surface, prevent unneeded module autoload and root-helper execution of session-visible binaries, and scope host shares to the user-connected folders rather than mounting the whole machine writable. The last control contains even a successful guest-root escalation, whereas patching only this CVE leaves the same architecture exposed to another guest-root path. These are design recommendations, not changes the source establishes were shipped by Anthropic.

Anthropic closed the submitted chain as **informational**: the kernel bug fell within its program's recently published-bug window, and other controls were classed as defense-in-depth. The source reports no local product fix or version. It says Cowork used cloud execution by default by July 23, 2026 and that this *local* path did not appear to apply to the cloud mode; that is not proof of cloud isolation against other attacks.

## Analyst Takeaways and Limits

Treat guest root as part of the threat model when deciding what a VM can see on the host. A VM boundary does not constrain capabilities deliberately imported across it, and independent locks are stronger than betting everything on guest patch cadence. This single locally reproduced chain does not estimate real-world incidence, and the article's broader kernel-vulnerability-rate claims are secondary context rather than measurements of Cowork.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Privileged Local Daemon Sandbox Bypass](/vault/privileged-local-daemon-sandbox-bypass.md)
* [Assume Guest Compromise: Host Exposure Budget](/vault/assume-guest-compromise-host-exposure.md)

