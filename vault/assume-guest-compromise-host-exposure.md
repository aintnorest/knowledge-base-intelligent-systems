---
type: Synthesis
title: "Assume Guest Compromise: Host Exposure Budget"
description: "Designing host shares, sockets, devices, management channels, and virtualization code as the surface reachable from a fully compromised guest."
tags: [sandboxing, access-control, agent-security, agents, reliability]
timestamp: 2026-09-28T19:05:17Z
---

# Assume Guest Compromise: Host Exposure Budget

Treat guest root and the guest kernel as attacker-controlled when defining a sandbox's host exposure budget. A virtual machine can isolate ordinary guest execution while deliberately projecting host files, services, devices, and network access into it. These grants and the host code processing guest-controlled input determine what a fully compromised guest can reach; an inner container or unprivileged guest account is not the outer trust boundary.

## Boundary Map

| Host-facing surface | Exposure to budget |
| --- | --- |
| Filesystem shares and backing files | Which exact host paths are visible or writable, including paths outside the intended workspace and files consumed by host processes. |
| Sockets and management channels | Whether a guest can invoke a host daemon, guest-control endpoint, or lifecycle operation with stronger authority. |
| Virtual devices and networking | Guest-controlled packets and device operations enter host backends; outbound traffic needs host-side policy independent of the VM boundary. |
| Hypervisor, VMM, and host kernel | The device model, emulation libraries, virtualization interfaces, parsers, and patch delivery remain attack surfaces even when no share is granted. |
| Co-resident workloads | A shared guest kernel makes guest compromise relevant to every workload inside that same VM; a per-workload VM changes that isolation unit. |

## Why It Matters

Guest privilege escalation can become a host-file compromise without a hypervisor escape if a writable whole-host share is already mounted. Conversely, reducing shares alone cannot eliminate bugs in the VMM, virtual devices, or host kernel. The useful question is not whether the workload is “in a VM,” but which host resources and trusted host implementations remain reachable after complete guest compromise. This complements [deployment-conditioned sandbox security](/vault/deployment-conditioned-sandbox-security.md), which assesses the deployed configuration, and [privileged local daemon bypass](/vault/privileged-local-daemon-sandbox-bypass.md), which examines a specific socket-mediated authority route.

## Practical Use

- Inventory every host-to-guest projection and guest-to-host request path; restrict mounts to explicitly delegated folders, minimize writeability, and avoid exposing privileged host daemon sockets.
- Keep container engines and disposable development services on the guest side when the guest must control them. Place authorization and egress filtering in host-owned components that a guest administrator cannot disable.
- Test with guest root and guest-kernel control as the starting condition: attempt reads and writes beyond delegated paths, management calls, forbidden egress, and effects on peer workloads. Track host-side virtualization dependencies and actual deployed patch versions.

## Limitations

- No inventory proves immunity to previously unknown virtualization or host-kernel vulnerabilities; narrower device surfaces and host-process confinement reduce exposure rather than eliminate it.
- A contained guest can still corrupt explicitly shared files, abuse allowed services, or perform an authorized but unwanted task action.
- A VM-per-workload design may increase host cost and preparation overhead; startup measurements do not capture image construction, density, or security efficacy.

## Sources

- [SharedRoot: Escaping the Claude Cowork sandbox dossier](/dossiers/accomplish-sharedroot-claude-cowork-escape.md) — guest-root escalation reached host files via a writable whole-host VirtioFS share, without a hypervisor escape.
- [VMs won't contain cyber-capable agents dossier](/dossiers/trail-of-bits-vm-escape-cyber-agent.md) — first-hand host-facing network emulation and virtualization flaw chains show residual escape and patch-delivery risk.
- [Firecracker Design dossier](/dossiers/firecracker-design.md) — distinguishes guest-facing virtual devices, host-owned networking, VMM confinement, and host-kernel attack surfaces.
- [Kata Containers Architecture dossier](/dossiers/kata-containers-architecture.md) — shows pod-shared guest kernels and host–guest filesystem and management bridges.
- [Introduction to gVisor Security dossier](/dossiers/gvisor-security-architecture-intro.md) — contrasts a userspace-kernel boundary with a VM and identifies initial file and network grants as remaining exposure.
- [Why MicroVMs: The Architecture Behind Docker Sandboxes dossier](/dossiers/docker-why-microvms-architecture.md) — argues for keeping an agent-controlled container daemon inside its guest rather than exposing the host daemon.
- [Under the hood with Apple's new Containerization framework dossier](/dossiers/anil-apple-containerization-under-the-hood.md) — illustrates per-container VM granularity and host-side filesystem/image preparation as trusted code.
- [$1 million hacker challenge for Vercel Sandbox dossier](/dossiers/vercel-sandbox-hacker-challenge-threat-model.md) — explicitly assumes guest-root/kernel control and treats forbidden egress and credential retrieval as boundary failures without requiring VM escape.
