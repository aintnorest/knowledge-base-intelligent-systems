---
type: Study Note
title: NVIDIA NemoClaw Architecture
description: NemoClaw's agent-specific layer above OpenShell, versioned blueprint admission, sandbox topology, and external credential and inference boundaries.
resource: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/architecture
source: /archive/nvidia-nemoclaw-architecture.html
tags: [agents, agent-harness, sandboxing, agent-security, access-control]
timestamp: 2026-09-28T20:00:00Z
---

# NVIDIA NemoClaw Architecture — Study Notes

**Publisher**: NVIDIA  
**Source**: architecture reference captured September 2026

## What It Is

NemoClaw is an opinionated agent integration above the more general OpenShell runtime: a host orchestrator, an agent-specific in-sandbox layer, and a separately versioned blueprint that defines policy, image, and inference shape. OpenShell retains the gateway, credential custody, isolation, and enforcement. This is an architecture description, not independent evidence of deployed security. The underlying [OpenShell sandbox design](/dossiers/nvidia-openshell-sandbox-architecture.md) gives the lower-level boundaries.

## Host and Workload Trust Split

The contemporary default Docker-driver topology has a host OpenShell gateway and a Docker workload container, **not** the embedded k3s cluster shown by the older legacy path. The latter runs a Kubernetes controller and agent pods inside a cluster container; confusing these placements would misstate both the outer boundary and operational attack surface. A host CLI coordinates but is not the runtime decision point; gateway and proxy retain real provider credentials, while the workload receives placeholders and policy-mediated inference and service access. Host-side state contains registry and migration snapshots, not the provider store. The document describes common writable sandbox and temporary areas with system paths read-only; secrets or agent configuration material placed in readable workload files are still exposed to code executing there.

Before a stock sandbox launches, the host resolves an immutable managed image and verifies a coherent release/source/publication cohort across the three supported agent integrations. Missing, mutable, wrong-platform, or inconsistent catalog evidence fails closed; an explicit custom-image route is separate. The blueprint artifact is version- and digest-checked before planning and application, separating reviewed desired shape from host-side orchestration. Host-managed gateway lifecycle also rejects untrusted or version-incompatible service identities rather than silently adopting an arbitrary binary. These controls address artifact and manager substitution, not malicious behavior inside a legitimate image.

The OpenClaw plugin runs **inside** the agent gateway process, adding an inference provider and passing concise sandbox phase and policy summaries into turns. This feedback can help an agent distinguish policy denial from networking errors and avoid assuming a permitted capability is unavailable; it is guidance, not enforcement. The same architecture supports other runtime adapters rather than assuming their plugin surfaces are identical. Inference requests pass the OpenShell gateway, optionally through a host-side model router, before the upstream provider; real credentials are injected only outside the workload.

## Boundaries and Questions

The page has no comparative results, adversarial evaluation, or guarantee that every possible extension sends all network traffic through identical inspection. Its installed-release and platform claims are time-sensitive. Crucially, withholding *provider* keys from the sandbox does not sanitize arbitrary OpenClaw files already readable by the agent. [Lasso's third-party alpha research](/dossiers/lasso-nemoclaw-authorized-egress-exfiltration.md) reports such a file leaving via allowed GitHub or Discord operations; its tested legacy k3s topology should not be generalized without checking this later Docker-driver deployment.

## Analyst Takeaways

1. Distinguish the opinionated agent integration from the general isolation engine, and map the *actual* host/workload topology before claiming an isolation property.
2. Verified, version-compatible image and blueprint admission constrains deployment drift; it does not authorize the intent of later agent actions.
3. Credential custody and filesystem confidentiality are different questions: proxy-injected secrets may be protected while agent-readable configuration can still be exfiltrated over approved routes.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Downstream Security Patch Propagation](/vault/downstream-security-patch-propagation.md)
