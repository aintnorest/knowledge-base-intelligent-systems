---
type: Study Note
title: Firecracker Design
description: Firecracker's one-VM-per-process trust zones, narrow virtual devices, default syscall filtering, optional jailer confinement, and host-owned network policy.
resource: https://github.com/firecracker-microvm/firecracker/blob/main/docs/design.md
source: /archive/firecracker-design.md
tags: [sandboxing, access-control, reliability]
timestamp: 2026-09-28T18:39:50Z
---

# Firecracker Design — Study Notes

## What It Is

Firecracker is a Linux-hosted virtual machine manager designed to run mutually untrusted Linux microVMs efficiently. The design document describes one microVM per Firecracker process, with a small device model and separate API, VMM, and vCPU threads. Its minimal-kernel, single-core, 128 MiB reference configuration is reported to support five VM mutations per host core per second; this is a specified workload, not a guarantee for application startup or arbitrary configurations.

## Trust Zones and Mechanism

Firecracker treats vCPU threads as malicious from the moment guest code starts. The intended path outwards is guest kernel and virtual devices → VMM process → KVM/host kernel → host resources. Guest network traffic crosses an emulated interface into a host TAP device; block devices are backed by host files. A small VirtIO-oriented device model reduces exposed emulation, but the VMM, KVM, host device backends, and their configuration remain trusted attack surfaces.

The first boundary is KVM plus Firecracker virtualization. Default per-thread seccomp filters narrow the VMM's host syscalls before guest execution. The separate jailer is recommended for production: it prepares privileged resources, then drops privileges and confines the Firecracker process with a restricted filesystem, namespaces, and cgroups. Thus default seccomp and recommended jailer confinement are not identical guarantees; launching the VMM without the jailer gives up that additional process-level defense. A privileged host component can still grant the jailed process more files or descriptors.

## What This Boundary Does Not Do

Firecracker explicitly **does not filter guest network traffic**: outbound packets are untrusted and must be filtered at the host. Host integration also owns networking, storage backing files, and the host-facing VMM API. I/O rate limits can reduce contention on built-in virtual devices, but are not traffic authorization; third-party device backends must handle their own rate limiting. CPU and memory oversubscription are customer-controlled and can undermine predictable host performance. The design does not demonstrate protection against hypervisor/KVM vulnerabilities, malicious host administration, host-exposed files, or secrets deliberately placed in guest metadata.

## Analyst Takeaways

1. **Describe zones, not merely an engine name.** The virtual hardware boundary, VMM confinement, host API, and network policy each protect different paths.
2. **Distinguish automatic from recommended defense.** Default syscall filtering is not evidence that every deployment uses the production jailer.
3. **Keep network policy outside the VMM claim.** An isolated guest may still make harmful authorized network requests if the host does not restrict egress.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Assume Guest Compromise: Host Exposure Budget](/vault/assume-guest-compromise-host-exposure.md)

