---
type: Study Note
title: "Under the hood with Apple's new Containerization framework"
description: A first-hand macOS Tahoe beta investigation of per-container Linux VMs, Kata-derived guest kernel, Swift guest init and filesystem handling, and practical compatibility limits.
resource: https://anil.recoil.org/notes/apple-containerisation
source: /archive/anil-apple-containerization-under-the-hood.html
tags: [sandboxing, reliability, access-control]
timestamp: 2026-09-28T18:39:50Z
---

# Under the hood with Apple's new Containerization framework — Study Notes

**Author:** Anil Madhavapeddy  
**Date:** June 11, 2025  
**DOI:** 10.59350/70ynk-ves20

## What It Is

A first-hand investigation of Apple's then-new macOS Tahoe beta container framework and companion CLI. The framework runs Linux containers in individual virtual machines rather than sharing a single Linux VM across containers. The author distinguishes this general-purpose framework from its early CLI and from the more mature Docker Desktop workflow; observations are beta-era and should not be generalized to later releases.

## Isolation and Implementation

A Linux kernel derived from Kata Containers is obtained for the guest, and a small Swift-based guest init provides the management interface used to launch the container process. The virtual machine gives a per-container guest-kernel boundary from macOS and from other VM-hosted containers. This does **not** imply native macOS process containers, protection from macOS-side virtualization vulnerabilities, or safe access to any host resources intentionally shared with a guest. The host still constructs the guest filesystem and directs VM lifecycle.

The author encountered a Swift userspace ext4 implementation used in unpacking OCI images and constructing filesystems. That host-side image-handling path illustrates a common tradeoff: smaller or faster guest machinery can shift complexity into trusted host code, with filesystem edge cases becoming a reliability and potentially trust-boundary concern.

## First-Hand Results and Admitted Limits

A simple container started in under one second on the author's machine, while unpacking an OCaml development image of about 112,924 entries and 415.9 MB took over nine minutes in the reported run. This is one developer's observation rather than a representative benchmark; startup speed and image preparation speed are different outcomes. The post reports filesystem handling limitations in its beta investigation without establishing a universal failure rate.

The author explicitly notes that these are Linux containers, not macOS or iOS containers, and calls out missing GPU support for Linux-container ML workflows at that time. For his own devcontainers, a shared VM remains preferable for battery life. The per-container VM boundary therefore improves isolation granularity but can be a poor fit where host integration, accelerator support, or cumulative VM overhead dominates.

## Analyst Takeaways

1. **Count the unit of isolation.** A VM per container separates peers differently from many containers inside one VM, while increasing aggregate host overhead.
2. **Measure more than boot.** Image extraction and filesystem preparation can dwarf guest launch latency.
3. **Audit host-side translation paths.** Guest-kernel isolation leaves image parsers, filesystem constructors, VM control, and explicitly shared resources in the host trust domain.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Assume Guest Compromise: Host Exposure Budget](/vault/assume-guest-compromise-host-exposure.md)

