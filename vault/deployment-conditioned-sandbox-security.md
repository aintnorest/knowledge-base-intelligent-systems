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

## Practical Use

Use this when selecting or reviewing execution environments for coding agents, plug-ins, CI jobs, research evaluations, or untrusted tool calls. A strong runtime boundary does not redeem a product that exposes dangerous devices or remains frozen on known-vulnerable versions. Conversely, a container engine's patch currency does not make a privileged wrapper or shared-kernel exposure equivalent to a microVM.

Keep a machine-readable deployment profile with the runtime build, image digest, device and mount allowlists, effective user and capabilities, seccomp/AppArmor/SELinux/user-namespace posture, cgroup limits, egress rules, and upgrade channel. Treat changes to any of those fields as security-relevant configuration changes that require regression checks.

## Limitations

No fixed checklist proves containment. Architectural posture cannot measure undiscovered vulnerabilities, CVE history and public fuzzing are incomplete discovery signals, and a live probe can miss a configuration branch. Multi-tenant isolation, side channels, control-plane compromise, supply-chain integrity, and application-level authorization often need distinct evidence. The required controls and acceptable compatibility costs are workload-specific.

## Sources

- [AI Code Sandboxes: A Comparative Security Study — Engine-Level Properties dossier](/dossiers/ai-code-sandboxes-engine-level-security-study.md) — shows how Cloud Hypervisor, Firecracker, libkrun, gVisor, and runc product defaults diverge in device reachability, leakage, hardening stackability, and patch state despite engine-class structure.
- [ISOLATE GPT dossier](/dossiers/isolate-gpt-execution-isolation-agentic-systems.md) — proposes process-isolated agent integrations with a trusted mediator; the trusted runtime and deployment remain part of the security boundary.
- [Parallax: Why AI Agents That Think Must Never Act dossier](/dossiers/parallax-architecturally-safe-autonomous-execution.md) — separates planner and executor authority but explicitly leaves the engine, sandbox configuration, tool adapters, and deployment pipeline in the trusted computing base.
