---
type: Study Note
title: "AI Code Sandboxes: A Comparative Security Study — Engine-Level Properties"
description: Study notes on Andronchik and Lokhmakov's six-axis comparison of five AI code-sandbox products, covering host attack surface, information leakage, hardening stackability, public CVEs, patch propagation, and fuzzing posture.
resource: https://arxiv.org/abs/2606.08433v1
source: /archive/ai-code-sandboxes-engine-level-security-study.pdf
tags: [sandboxing, agent-security, agents, coding-agents]
timestamp: 2026-07-14T16:26:33Z
---

# AI Code Sandboxes: A Comparative Security Study — Engine-Level Properties - Study Notes

**Authors**: George Andronchik and Pavel Lokhmakov, PhD
**Venue**: arXiv:2606.08433v1 [cs.CR]
**Date**: June 7, 2026 (paper dated May 24, 2026)
**DOI**: [10.48550/arXiv.2606.08433](https://doi.org/10.48550/arXiv.2606.08433)
**Pages**: 61
**Companion repository**: https://github.com/orbitalab/RnD-ai-sandboxes-sec-study-part-1

## What It Is

This is the first part of a comparative security study of five products used to run AI-generated code: arrakis (Cloud Hypervisor), e2b (Firecracker), microsandbox (libkrun), gVisor (runsc), and daytona (runc). It is a synthesis of six companion measurements, combining live probes on a fixed Ubuntu bare-metal host with public-repository, advisory, release, and fuzzing-infrastructure research.

The paper keeps engine class separate from product behavior. MicroVMs, a userspace kernel, and OCI containers differ structurally, but a product's default image, wrapper code, exposed devices, and version-pin policy can materially alter the operator's actual risk. The stated threat model is a single-tenant operator running actively hostile guest code on infrastructure they trust; multi-tenant isolation, microarchitectural side channels, control-plane attacks, and exploitation of unpublished bugs are outside scope.

## Six Axes, Not One Score

The authors deliberately do not produce an overall ranking. They evaluate different questions that an operator may weight differently:

1. **Host attack surface**: runtime syscall posture, guest-visible devices, ioctl behavior, and reachability of 14 kernel-LPE or container-escape primitives.
2. **Information leakage**: 28 probes for host-identifying information exposed through `/proc`, `/sys`, devices, network state, and related views.
3. **Defense-in-depth stackability**: whether seccomp, AppArmor, SELinux, user namespaces, capability drops, `no_new_privs`, and PID limits are present by default or can be added without patching the product.
4. **Public CVE history**: recent engine-level vulnerability records, classified by impact rather than treated as a raw safety score.
5. **Patch cadence**: upstream disclosure behavior and, more importantly, the downstream product pin an operator actually receives.
6. **Upstream fuzzing posture**: continuous public fuzzing versus an in-tree-but-unexecuted harness versus no visible upstream fuzzer.

The comparison is therefore a qualification matrix, not a leaderboard. A small reachable surface does not prove low bug density; zero CVEs can mean nobody has looked; a current runtime can still have poor hardening defaults; and a strong engine can be undermined by a frozen product pin.

## Architectural Findings

The probe results separate the engine classes most clearly at the extremes. gVisor has the smallest primitive-reachability count in the five-product set (5 of 14), an always-on Sentry seccomp filter, and the smallest guest `/dev` view. e2b's Firecracker setup follows at 7 of 14 primitives, with a 55-syscall all-thread allowlist. The microVMs avoid routing normal guest syscalls directly through the host trace point, but their VMM and device configuration still matter.

Arrakis is the important within-class counterexample. Its worker threads have an enabled seccomp filter, yet the default guest exposes a live `/dev/kvm` interface. The authors' read-only guest probes obtained real KVM API responses, making nested virtualization a product-level reachability lead rather than an abstract device-node observation. They intentionally did not create a VM or demonstrate an exploit.

Daytona's runc-based default exposes the host kernel's signature most directly. It has no engine-side seccomp filter in the tested runtime configuration and shares the host kernel by architecture. gVisor and the microVM products virtualize more of the kernel-facing interface, but the paper emphasizes that surface measurements bound reachable paths rather than proving the absence of vulnerabilities in the paths left open.

## Leakage and Layering Results

On the 28-probe information-leak matrix, e2b and microsandbox showed zero host-identifying leaks; arrakis leaked the host CPU model through its default CPU passthrough; gVisor leaked host RAM total and a BIOS product name; and daytona leaked ten values, including CPU, kernel, RAM, interrupt, and disk identifiers. The paper treats these differently by mechanism: a configurable VMM option, an implementation gap in a synthetic kernel, and shared-kernel behavior are not equivalent claims of intrinsic isolation quality.

For defense in depth, the more comparable measure is the number of hardening controls that a product makes impossible to add without source changes, not a cross-class count of controls already enabled. e2b, arrakis, and microsandbox had zero such `not-exposed` cells; gVisor had one because runsc discards the OCI AppArmor field; daytona had five. In the tested daytona runner, a hardcoded `Privileged: true` blocks seccomp, AppArmor, user-namespace, and `no_new_privs` layering, while a separate omitted PID-limit field blocks a fifth control. This is a wrapper-source finding, not a statement that runc itself cannot compose with those controls.

## Historical and Operational Evidence

Recent CVE counts do not settle prospective safety. In the paper's 24-month window, runc had four Escape-class CVEs and recurring procfs/mount-race patterns; gVisor had three CVEs but no Escape-class entry; Firecracker had two fresh escape-class findings; Cloud Hypervisor had two entries including a reported virtio-block use-after-free; and libkrun had zero published CVEs. The authors exclude libkrun from the CVE ordering: no published CVEs is absence of discovery signal, not evidence of soundness.

That caveat becomes stronger when paired with fuzzing posture. The authors find continuous, publicly observable fuzzing for gVisor; Cloud Hypervisor has an 18-target `cargo-fuzz` workspace whose CI only compile-checks targets; runc has narrow OSS-Fuzz coverage; and Firecracker and libkrun have no documented upstream fuzzer under their definition. A harness that compiles is useful against bit rot, but it is not evidence of scheduled corpus execution or accumulated coverage. The study calls the `0 CVEs × no visible upstream fuzzer` libkrun intersection structurally unmeasured rather than safe or unsafe.

Patch delivery is the most directly operator-controlled result. Coordinated upstream disclosure made many engine-side patch-lag figures appear to be zero days, while product-side behavior ranged from rolling/current to frozen or opaque. In the reported snapshot, arrakis had held Cloud Hypervisor v44.0 for 471+ days and e2b's public self-hosted default had held a Firecracker pin for 399 days; gVisor's rolling product and daytona's documented Docker-CE deployment were current. The daytona conclusion is specifically for its documented Docker Compose path; an alternative Ubuntu `apt` runc path had different exposure. Product pin policy, not the engine's release responsiveness alone, determined the downstream result.

## Analyst Takeaways

1. **Choose an execution substrate and a product configuration separately.** Engine class sets major structural limits, but exposed devices, privileged wrappers, default hardening, guest images, and runtime pins are the deployable security posture.
2. **Keep the security questions disaggregated.** Evaluate escape resistance, host reconnaissance, hardening compatibility, patch propagation, and residual-bug evidence independently before making a workload- and threat-model-specific decision.
3. **Treat patch propagation as an owned control.** Track the exact engine artifact consumed in production, alert on known-vulnerable pins, and make a supported upgrade or override path part of the sandbox's security design.
4. **Read absence-of-signal honestly.** Neither a zero-CVE history nor an unavailable fuzzer dashboard measures residual vulnerability depth. Pair public-history evidence with disclosure model, independent review, active fuzzing, and local testing.
5. **Validate live deployment behavior.** Source inspection and architectural reasoning must be checked against the actual image, host, wrapper, privileges, device exposure, network policy, and process-level security state that the agent will use.

## Questions and Limitations

- This is a time-bounded, five-product study on one host and a stated single-tenant threat model. Its exact pins, CVE counts, and product defaults can change rapidly.
- The synthesis inherits every number from six companion works and does not independently correct their measurements. Several stackability entries describe a configuration path inferred from source, not an active test that the product remains functional under that layer.
- The primitive catalog measures reachability, not end-to-end exploitability. The paper performs no live exploits or CVE replays.
- CVE count is an imperfect and disclosure-dependent historical signal; upstream public fuzzing is a lower bound on vendor testing; coverage measures from different fuzzers are not comparable.
- No composite score follows from the axes. A sandbox suitable for one workload may be unacceptable for another because compatibility, egress, tenancy, secrecy, and recovery requirements change the relevant threat model.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Downstream Security Patch Propagation](/vault/downstream-security-patch-propagation.md)
