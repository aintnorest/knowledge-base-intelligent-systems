---
type: Study Note
title: "Solving the Identity Crisis for AI Agents"
description: Uber's workload-attested, per-hop token exchange preserves the originating human and intermediate agent chain for downstream tool authorization and audit.
resource: https://www.uber.com/us/en/blog/solving-the-agent-identity-crisis/
source: /archive/uber-agent-identity.html
tags: [agents, agent-security, access-control, provenance, multi-agent, enterprise]
timestamp: 2026-09-28T18:43:43Z
---

# Solving the Identity Crisis for AI Agents — Study Notes

**Authors**: Matt Mathew, Prasad Borole, Meng Huang, Sergey Burykin, Gaurav Goel, and Bayard Walsh  
**Published**: May 21, 2026

## Problem

A service identity at the last hop cannot answer which person initiated a chain of agents, which agent performed a consequential action, or how the call was delegated. Uber observed this attribution gap when agents handed work to other agents before opening a PR or calling internal services. Losing the originating human weakens audit and downstream policies even when every individual workload is authenticated.

## Identity-Carrying Delegation

A registry binds agent identities to authorized workloads. A workload proves its identity with a SPIRE-issued credential; a central token service checks that this agent is registered on that workload before minting a short-lived JWT for a specific next-hop audience. Every hop exchanges its inbound token and workload identity for a new token that carries the attested actor chain. An agent-to-agent client makes this exchange automatic; the destination verifies signature and audience. A gateway checks tool-level policy and relays authorized calls to underlying services, where the full lineage can support human- and agent-aware authorization and forensic attribution.

Uber chose SDK-level propagation over an agent-to-agent proxy alone because the application layer knows the execution context being created at each delegation. This choice improves contextual fidelity at the price of migration and SDK adoption: legacy direct calls must move onto the standardized path. Identity propagation does not itself establish that the requested tool action reflects the user's intent; richer session or intent claims are described as potential future extensions, not current proof.

## Operator Evidence and Limits

Uber reports adoption by thousands of internal agents and token-exchange API p99 latency consistently below 40 ms at current load. The claim measures token exchange, not cumulative end-to-end workflow latency or authorization correctness. The described security controls reflect internal production architecture; upcoming dynamic access control and unified policy enforcement are a roadmap rather than deployed guarantees. A short-lived audience-restricted token narrows replay reach, but downstream policy quality and lossless lineage propagation remain essential.

## Analyst Takeaways

- Bind an agent's claimed identity to an independently attested workload before granting delegation credentials.
- Preserve the complete initiator-to-agent chain at every hop, not merely the identity of the service making the final API request.
- Make secure propagation the default application path; otherwise legacy or custom calls can silently break the audit chain.

## Vault Ideas Extracted

* [Authorization–Provenance Graph Alignment](/vault/authorization-provenance-graph-alignment.md)
* [Provenance-Conditioned Action Admission](/vault/provenance-conditioned-action-admission.md)
* [Egress Broker Credential Injection](/vault/egress-broker-credential-injection.md)
* [Attenuated Delegation Authority](/vault/attenuated-delegation-authority.md)

