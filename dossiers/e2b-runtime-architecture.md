---
type: Study Note
title: E2B Infrastructure Architecture
description: E2B's per-sandbox Firecracker VM architecture, snapshot-based startup, control/data-plane split, and the boundaries around guest control and network access.
resource: https://github.com/e2b-dev/runtime/blob/main/docs/ARCHITECTURE.md
source: /archive/e2b-runtime-architecture.md
tags: [sandboxing, agents, agent-security, access-control, reliability]
timestamp: 2026-09-28T18:39:50Z
---

# E2B Infrastructure Architecture — Study Notes

## What It Is

An architecture account of a service that runs arbitrary, often agent-generated code in one Firecracker Linux microVM per sandbox. Its distinctive performance choice is to create a sandbox by restoring a pre-booted memory-and-disk template, lazily paging memory and giving each execution a copy-on-write root filesystem. This is an implementation description, not an independently validated isolation or latency study.

## Boundaries and Trust Zones

The API authenticates teams, decides placement, and owns durable template and pause metadata; a root-running orchestrator on each sandbox host starts and controls Firecracker processes, each with its own cgroup and network namespace. The in-guest agent handles user process and filesystem operations. Edge traffic routes directly through a client proxy and a node-local sandbox proxy rather than through the control API. The orchestrator, artifact store, Redis routing state, and guest-control channel are therefore trusted parts of the service *outside* the tenant VM boundary.

A VM receives a distinct network slot with a TAP interface, host-side NAT, and per-slot egress firewall. The orchestrator proxy applies per-sandbox traffic tokens to incoming traffic; the edge proxy also refuses in-guest control routes. The internal initialization route delivers a token and is exempt from that token's check, which makes route classification consequential: the document explicitly warns that an unmarked new control route could become internet-accessible. This protection does not make an exposed user process safe or prevent code already authorized inside the guest from consuming its permitted network and filesystem access.

## Fast Resume and Its Costs

Template snapshots contain VM state, memory, and rootfs; userfaultfd serves only touched memory pages while the immutable template disk gains a per-sandbox writable layer. Pause stores dirty memory and disk diffs; resume prefers the originating node to reuse its cached snapshot. Cold boot remains an explicit recovery choice when restored memory is unusable, with crash-recovery semantics for disk content: unflushed writes may disappear. Auto-resume follows the memory-restore path rather than choosing recovery for the user. Snapshot upload, local cache pins, and background sealing introduce availability and lifecycle dependencies behind apparently instantaneous creation.

The document distinguishes routing ownership from historical records: a live node publishes the record once the guest agent is ready, and stale teardown cannot delete a later execution's record. Publication failure leaves the VM running but undiscoverable through the normal edge route. The lesson is that VM isolation, control-plane consistency, and reachability are separate properties.

## Analyst Takeaways and Limits

- A hardware VM boundary protects the host from guest execution only insofar as the host-side orchestrator, VMM, storage and networking are correctly configured and defended; this document does not claim immunity to VMM escape or compromised host control services.
- Guest-control APIs need a separate ingress rule from user-facing guest services. Authentication of ordinary guest actions is not sufficient when initialization must run before the credential exists.
- Snapshot restoration trades boot time for trust in prebuilt artifacts and correctness of persisted memory/disk state. Neither startup latency distribution nor security efficacy is measured here.
- Domain-based egress filtering and per-sandbox tokens constrain particular paths; they are not general-purpose prevention of malicious actions performed through allowed destinations or credentials.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Downstream Security Patch Propagation](/vault/downstream-security-patch-propagation.md)
* [Egress Broker Credential Injection](/vault/egress-broker-credential-injection.md)

