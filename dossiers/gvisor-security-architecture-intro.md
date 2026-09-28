---
type: Study Note
title: Introduction to gVisor Security
description: gVisor's userspace application-kernel boundary, defense-in-depth host confinement, platform choices, and explicit non-protections.
resource: https://gvisor.dev/docs/architecture_guide/intro/
source: /archive/gvisor-security-architecture-intro.html
tags: [sandboxing, access-control, reliability]
timestamp: 2026-09-28T18:39:50Z
---

# Introduction to gVisor Security — Study Notes

## What It Is

gVisor is a userspace *application kernel*, not a hardware VM and not merely a syscall allowlist. The source frames it for security researchers: untrusted Linux workloads see a kernel-like interface implemented by the Go Sentry, while the actual host kernel sees a more restricted user process. Linux security primitives are additional constraints around the Sentry, not its primary isolation mechanism.

## The Boundary

The Sentry intercepts workload syscalls and page faults and implements Linux behavior itself. Its own host syscalls are driven by necessary host services and initially authorized access, **not** a one-for-one forwarding of workload syscalls. That cuts down the direct host-kernel surface exposed to attacker-chosen syscall arguments. A restricted host environment further constrains Sentry with syscall filtering, namespaces, filesystem isolation, and resource controls; after networking-related privileged setup, it drops privileges before running untrusted code. The default Systrap platform uses seccomp-based interception; platform choice changes the concrete interception path.

This model depends on correctness of the Sentry and the host kernel, along with the runtime's initial file and network grants. The authors characterize escape as requiring a Sentry and host-kernel weakness, but that is a defense-in-depth argument, not a proof that all Sentry compromises require the same chain. The source warns that a convenient direct test mode can expose the host filesystem by default; OCI container use instead derives mapped paths from its runtime configuration. Testing the wrong integration mode therefore gives a misleading picture of deployment isolation.

## Explicit Non-Protections

The source excludes compromise *before* the sandbox starts—for example, a container manager tricked into launching an unsandboxed workload. CPU side channels such as Spectre are not blocked by syscall/page-fault interception and require host or hardware mitigation. gVisor does not prevent exploitation of application code **inside** the sandbox, although it seeks to contain the resulting attacker. Permitted filesystem paths and network services remain accessible, and a sandbox alone does not adjudicate whether an authorized action was intended.

## Analyst Takeaways

1. **System-call interposition is a different security boundary from VM isolation.** It can reduce reachable host-kernel behavior without providing a separate guest kernel or eliminating host dependency.
2. **Trace grants and setup authority.** Mounts, network setup, and the component that chooses the runtime are outside the claim that intercepted syscalls are contained.
3. **Name the attack class excluded.** Side channels and compromised application logic remain relevant even when an escape boundary holds.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Assume Guest Compromise: Host Exposure Budget](/vault/assume-guest-compromise-host-exposure.md)

