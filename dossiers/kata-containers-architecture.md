---
type: Study Note
title: Kata Containers Architecture
description: Kata's layered host/guest/container trust model, pod-shared VM boundary, guest agent, and OCI-compatible runtime integration.
resource: https://github.com/kata-containers/kata-containers/blob/main/docs/design/architecture/README.md
source: /archive/kata-containers-architecture.md
tags: [sandboxing, access-control, reliability]
timestamp: 2026-09-28T18:39:50Z
---

# Kata Containers Architecture — Study Notes

## What It Is

Kata supplies OCI-compatible containers inside lightweight VMs. Its second line of defense is hardware virtualization around a guest kernel, while ordinary namespaces and cgroups still isolate a workload *within* that guest. This source is an architecture overview rather than a measured security comparison or prescriptive hardening guide.

## Three Environments, Two Different Boundaries

The host runs the container manager, runtime shim, hypervisor, and host-side filesystem-sharing service. The guest VM runs its own kernel and a long-lived supervisory agent. The workload runs in a guest-created container environment using namespaces and cgroups. One shim and one guest agent can manage multiple containers in a pod's VM; consequently the VM is a boundary between host and pod, **not necessarily between two containers in the same pod**. Those sibling containers rely on guest-kernel container isolation.

The runtime passes lifecycle and I/O through a host–guest channel to the agent, which creates and supervises workload processes. Host resources are deliberately projected inward: the guest image can be memory-mapped with DAX, and container root filesystems are supplied through virtio-fs. These bridges preserve usability and reduce copying, but the source does not present them as independent security proofs. The hypervisor process itself has a distinct cgroup and network namespace; an OCI SELinux label mentioned here applies to the hypervisor process, **not** to the workload inside the VM.

## Limits and Escape Hatches

An administrator can enter the guest root environment, and guest agent API access can be governed by policy; these are privileged management surfaces, not guarantees that all invocations are restricted. The selected hypervisor, host-managed shared files, pod layout, and agent protocol affect the actual exposed boundary. The guest kernel remains shared among containers within one pod. The source offers no quantified escape-resistance, side-channel analysis, or guarantee that host-visible volumes and network paths cannot carry sensitive material. OCI compatibility describes interface behavior, not equivalence to a bare container's threat model.

## Analyst Takeaways

1. **Locate the VM at the pod boundary.** Multiple processes can share a guest without sharing the host kernel; compromise of a guest boundary affects those peers.
2. **Account for controlled host–guest bridges.** Filesystem projection, lifecycle RPC, and host-side hypervisor resources are part of the deployed attack surface.
3. **Do not confuse guest and host labels.** Enforcement on the VMM process is different from workload confinement inside the guest.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Assume Guest Compromise: Host Exposure Budget](/vault/assume-guest-compromise-host-exposure.md)

