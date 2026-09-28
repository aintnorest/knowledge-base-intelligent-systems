---
type: Study Note
title: OpenShell Sandbox Architecture
description: NVIDIA's workload/supervisor trust split, layered filesystem and network mediation, authenticated recovery, and credential-bound egress.
resource: https://github.com/NVIDIA/OpenShell/blob/main/architecture/sandbox.md
source: /archive/nvidia-openshell-sandbox-architecture.md
tags: [agents, sandboxing, agent-security, access-control, tool-use]
timestamp: 2026-09-28T20:00:00Z
---

# OpenShell Sandbox Architecture — Study Notes

**Publisher**: NVIDIA OpenShell  
**Source**: repository architecture document, captured September 2026

## What It Is

OpenShell describes an agent workload boundary in which an unprivileged in-workload sandbox and its child processes communicate with a separate supervisor that owns policy, credentials, relays, and external network access. The compute driver supplies an outer network fence and a protected, mutually authenticated channel. This is a design contract, not a penetration test or proof that every deployment satisfies it. The companion [Security Policy](/dossiers/nvidia-openshell-security-policy.md) describes policy semantics; [Sandbox Limits](/dossiers/nvidia-openshell-sandbox-limits.md) describes resource ceilings.

## Boundary and Authority

The driver fixes a non-root workload identity before launch; agent children inherit zero capabilities, `no_new_privs`, Landlock, and a seccomp listener. The supervisor has a different identity and no workload-creation authority. Each sandbox generation has distinct channel credentials and binds its driver resource identity to the channel. Admission precedes execution: the driver attests its native outer-fence evidence, the sandbox demonstrates its runtime posture, and the supervisor accepts normalized guarantees rather than guessing from arbitrary native evidence. The design explicitly refuses to treat Kubernetes NetworkPolicy alone as a confidentiality boundary.

The layer that owns the outer fence must verify its native evidence. In the documented placements, Docker/Podman have no workload network route, VMs have no guest NIC, and Kubernetes uses a selecting deny-egress policy. Seccomp notification captures supported sockets, including inherited child traffic, and the supervisor makes destination and process-identity decisions; the fence blocks misses and unsupported paths. Landlock confines paths separately. The proxy also mediates inspected HTTP, GraphQL, MCP, and JSON-RPC operations, but server-to-client MCP messages and JSON-RPC responses are not parsed for policy enforcement. DNS sender binary identity is explicitly unavailable, so DNS decisions cannot legitimately use binary-scoped grants; TCP decisions can use connection-time identity.

## Lifetimes, Secrets, and Escape Hatches

The authenticated connection multiplexes DNS, exec, process control, and TCP traffic with flow-control reserves to prevent stalled data streams starving control. On a lost connection the boundary freezes its workload tree, cancels relays, and gives the *same* supervisor instance 30 seconds to reconnect and reconfirm; a new supervisor instance cannot simply inherit the old generation. Pending external opens fail closed rather than replaying decisions or byte streams. Policy generations similarly fence old raw relays rather than allowing stale authorization indefinitely.

Provider keys stay in gateway/supervisor custody: workload-visible placeholders resolve only after destination and request-policy admission, against the live provider's host/port/path binding. A provider refresh can revoke old handles; invalid static refresh does not preserve stale secret material. Trusted middleware executes after L7 admission and before credential injection; its transformations are rechecked against body policy. This protects the injected secret, not every sensitive file the agent can read: an agent can still intentionally send accessible data over an authorized egress path, as [Lasso's third-party experiment](/dossiers/lasso-nemoclaw-authorized-egress-exfiltration.md) illustrates.

A standalone proxy lacks caller-binary identity and workload isolation, so identical endpoint rules do not imply an identical boundary. Transparent TCP with an approved DNS name authenticates connection routing, not TLS SNI or HTTP virtual-host authority; an approved shared front door can select another tenant. An operator's hostname-based corporate-proxy mode delegates name resolution and effective egress authority to that proxy rather than preserving the supervisor's address pin. Older kernels without killable seccomp notification disable task-memory output writes and therefore break some server-side accept patterns; Landlock ABI v3 remains a launch prerequisite.

## Analyst Takeaways and Limits

- Isolation is a conjunction of a driver-owned outer fence, workload kernel controls, a separately protected supervisor, and admitted generation-bound evidence. A proxy or container alone cannot supply the same guarantee.
- Stale authority is a lifecycle problem: channel recovery, provider rotation, policy refresh, and existing streams each need explicit generation semantics and terminal behavior.
- A reachability check is not application authority. TCP-only permission, standalone proxy mode, unparsed response data, and authorized exfiltration are different residual risks.
- This architecture document states intended behavior and some admitted gaps; it does not report measured escape rates, resource overhead, or independently verified deployment conformance.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Downstream Security Patch Propagation](/vault/downstream-security-patch-propagation.md)
* [Egress Broker Credential Injection](/vault/egress-broker-credential-injection.md)
* [Interruption Recovery Without Duplicate Effects](/vault/interruption-recovery-without-duplicate-effects.md)

