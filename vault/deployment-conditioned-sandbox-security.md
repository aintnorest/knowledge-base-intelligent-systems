---
type: Synthesis
title: Deployment-Conditioned Sandbox Security
description: Assessing a code-execution sandbox as the combination of its isolation engine, product defaults, wrapper behavior, guest image, and operating posture rather than as an engine-class label alone.
tags: [sandboxing, agent-security, agents, coding-agents]
timestamp: 2026-07-14T16:26:33Z
---

# Deployment-Conditioned Sandbox Security

The security of an AI code sandbox is the security of its deployed composition, not just its named engine. A microVM, userspace kernel, or container runtime sets important architectural boundaries, but the operator encounters a product with a guest image, device map, wrapper code, launch privileges, hardening configuration, version pins, and management plane. Those product decisions can widen or narrow the effective boundary without changing the engine label.

## Evaluation Pattern

1. State the workload, tenant model, host assets, network/egress rules, and failure consequences before comparing runtimes.
2. Inspect the engine's structural controls: host-kernel mediation, syscall and device surface, namespace model, and known compatibility limits.
3. Inspect the product's actual defaults: privileges, mounted devices, guest users and groups, kernel and image pins, exposed API/SDK controls, and wrapper source or configuration.
4. Verify the running deployment rather than trusting documentation: sample process seccomp and capabilities, inspect `/dev`, mounts, `/proc` and `/sys` leakage, cgroup limits, network paths, and the resolved runtime version.
5. Test whether defense-in-depth controls can be added without forking the product, and retest the workflow under those controls.
6. Keep architectural evidence, historical vulnerability evidence, patch state, fuzzing/assurance evidence, and observed configuration findings separate; decide only after weighting them for the stated threat model.

## Composition Instances

- **Outer fence, supervisor, and proxy.** A workload's process rules do not constrain a privileged supervisor or its relays. Check the external network fence, authenticated control channel, supervisor recovery behavior, proxy decisions, and credential custody together; an open path through any one of them can dominate the isolation result.
- **Engine defaults versus deployment hardening.** Separate controls applied automatically by the isolation engine from optional launch-time confinement, host network policy, and the wrapper's actual defaults. An architectural possibility is not evidence that the running deployment enabled it.
- **VM unit versus guest-kernel sharing.** Count what actually receives its own VM and guest kernel. Containers sharing one guest may be separated from the host by virtualization while still relying on guest namespaces and cgroups against each other. Treat host-provided mounts, devices, and management interfaces as part of that VM's exposure.
- **Isolates versus hardware VMs.** A language isolate can make cheap, disposable execution possible, but its shared process, runtime, and side-channel assumptions differ from a hardware-virtualized guest. Process confinement, patch speed, and mediated capabilities are separate defenses, not properties inherited from the isolate label.
- **Dynamic isolation tiering.** Moving selected workloads to stronger process or VM separation can trade density for reduced cross-tenant exposure; detection, transfer timing, and the protection of work before promotion remain part of the claim.

The composition also has *authority seams*: determine exactly which tools and startup phases are confined ([Partial-Scope Tool Sandboxing](/vault/partial-scope-tool-sandboxing.md)), what remains reachable after guest compromise ([Assume Guest Compromise, Then Bound Host Exposure](/vault/assume-guest-compromise-host-exposure.md)), and whether a reachable local daemon acts with host privileges ([Privileged Local Daemon Sandbox Bypass](/vault/privileged-local-daemon-sandbox-bypass.md)). Inspect credential custody and mediated egress ([Egress Broker Credential Injection](/vault/egress-broker-credential-injection.md)), what an allowed destination actually grants ([Destination Allowlist as Capability Grant](/vault/destination-allowlist-as-capability-grant.md)), and whether writable artifacts later become trusted executable instructions ([Writable Artifact Authority Handoff](/vault/writable-artifact-authority-handoff.md)). Finally, verify that the effective policy preserves the intended match semantics ([Policy Compilation Fidelity](/vault/policy-compilation-fidelity.md)). A permitted harmful effect is not evidence of an isolation escape.

## Practical Use

Use this when selecting or reviewing execution environments for coding agents, plug-ins, CI jobs, research evaluations, or untrusted tool calls. A strong runtime boundary does not redeem a product that exposes dangerous devices or remains frozen on known-vulnerable versions. Conversely, a container engine's patch currency does not make a privileged wrapper or shared-kernel exposure equivalent to a microVM.

Keep a machine-readable deployment profile with the runtime build, image digest, device and mount allowlists, effective user and capabilities, seccomp/AppArmor/SELinux/user-namespace posture, cgroup limits, egress rules, and upgrade channel. Treat changes to any of those fields as security-relevant configuration changes that require regression checks.

## Limitations

No fixed checklist proves containment. Architectural posture cannot measure undiscovered vulnerabilities, CVE history and public fuzzing are incomplete discovery signals, and a live probe can miss a configuration branch. Multi-tenant isolation, side channels, control-plane compromise, supply-chain integrity, and application-level authorization often need distinct evidence. The required controls and acceptable compatibility costs are workload-specific.

## Sources

- [AI Code Sandboxes: A Comparative Security Study — Engine-Level Properties dossier](/dossiers/ai-code-sandboxes-engine-level-security-study.md) — shows how Cloud Hypervisor, Firecracker, libkrun, gVisor, and runc product defaults diverge in device reachability, leakage, hardening stackability, and patch state despite engine-class structure.
- [ISOLATE GPT dossier](/dossiers/isolate-gpt-execution-isolation-agentic-systems.md) — proposes process-isolated agent integrations with a trusted mediator; the trusted runtime and deployment remain part of the security boundary.
- [Parallax: Why AI Agents That Think Must Never Act dossier](/dossiers/parallax-architecturally-safe-autonomous-execution.md) — separates planner and executor authority but explicitly leaves the engine, sandbox configuration, tool adapters, and deployment pipeline in the trusted computing base.
- [OpenShell Sandbox Architecture dossier](/dossiers/nvidia-openshell-sandbox-architecture.md) — illustrates the deployment contract spanning verified outer fence, child-process restrictions, protected supervisor, authenticated channel, and policy-mediated egress.
- [Firecracker Design dossier](/dossiers/firecracker-design.md) — distinguishes default VMM syscall filtering from recommended jailer confinement and separately owned guest egress policy.
- [Kata Containers Architecture dossier](/dossiers/kata-containers-architecture.md) — distinguishes host-to-pod VM isolation from the shared guest-kernel separation of containers in one pod.
- [Introduction to gVisor Security dossier](/dossiers/gvisor-security-architecture-intro.md) — describes userspace syscall interposition, additional host restrictions, and explicit non-protections rather than equating it with a hardware VM.
- [Sandboxing AI agents, 100x faster dossier](/dossiers/cloudflare-dynamic-workers-sandboxing.md) — motivates disposable language isolates while identifying their different hardening burden from VMs.
- [Mitigating Spectre and Other Security Threats: The Cloudflare Workers Security Model dossier](/dossiers/cloudflare-workers-security-model-spectre.md) — describes layered process containment and risk-based cordons, including conditional stronger isolation.
- [An Introduction to AI Coding Agent Security dossier](/dossiers/ncc-group-coding-agent-security-boundaries.md) — documents coverage differences among startup, tool, approval, and deferred configuration paths.
- [A sandbox without a network boundary is only half a sandbox dossier](/dossiers/vercel-sandbox-network-boundary.md) — describes host-enforced network paths and selective credential-backed request mediation beyond compute isolation.
