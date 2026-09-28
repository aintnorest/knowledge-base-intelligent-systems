---
type: Study Note
title: "AIP: Agent Identity Protocol for Verifiable Delegation Across MCP and A2A"
description: An identity and delegation proposal combining self-certifying or domain identities with attenuated signed capabilities and attribution-bound completion records.
resource: https://arxiv.org/abs/2603.24775v1
source: /archive/agent-identity-protocol-aip.pdf
tags: [agents, multi-agent, access-control, provenance, mcp, agent-security]
timestamp: 2026-09-28T18:39:26Z
---

# AIP: Agent Identity Protocol for Verifiable Delegation Across MCP and A2A — Study Notes

**Author**: Sunil Prakash  
**Preprint**: arXiv:2603.24775v1, March 2026

## What It Is

The Agent Identity Protocol (AIP) proposes that every consequential agent delegation carry both a verifiable actor identity and a bounded authorization chain, irrespective of whether the final invocation travels through MCP, A2A, or ordinary HTTP. It complements rather than replaces MCP's OAuth client-to-server authentication: OAuth may authenticate the last connection without attesting who authorized upstream delegation or what limits each intermediary imposed. This is an implemented protocol proposal with Python/Rust references, not an adopted cross-vendor standard.

## Identity, Authority, and Completion

A long-lived agent publishes a domain-based identity document with signing keys and delegation properties; an ephemeral worker instead can use its public key as its self-certifying identity. The initial authority grants tool rights, expiry, budget ceiling, and maximum delegation depth. Each agent can append a signed block narrowing—not widening—those constraints and naming the delegatee and delegation purpose. Public-key verification lets receiving services inspect the chain without holding the issuer's signing secret; constrained Datalog rules bind authorization to the requested operation.

Two modes trade simplicity for expressiveness: a single-hop signed JWT is compact, but **cannot be offline-attenuated into a chained JWT**; moving from it to multi-hop Biscuit requires reissuance. Chained completion blocks optionally attach an outcome hash and consumed resources. Crucially, an executor's signature proves *who made the completion claim*, not whether it is true. Independent countersigning or third-party attestation raises evidentiary strength. Similarly, a token's budget field is a **per-token authorization ceiling, not a ledger of actual aggregate spending**; the runtime must enforce running totals. The default policy family keeps evaluation bounded, while unrestricted rule expressiveness demands additional resource controls.

## Evidence and Threat Boundaries

Compact signature verification averages **0.049 ms in Rust** and **0.189 ms in Python** (1,000 local iterations). Five-hop chained verification is **0.745 ms Rust / 0.447 ms Python**, with serialized size under 2.5 KB (100 iterations per depth). Against a localhost unauthenticated MCP call at **0.301 ms**, compact AIP adds **0.222 ms**—small absolutely, a **73.9%** relative increase. Ten orchestrator-specialist runs with Gemini 2.5 Flash average **2.351 ms** AIP overhead against **2,749 ms** end-to-end, or **0.086%**. These are single-machine measurements, not production latency evidence.

The authors' six scripted attack classes each receive 100 attempts: AIP rejects **600/600**, ordinary signed JWT rejects four of the six classes, and the unauthenticated baseline rejects none. These scripted checks test scope widening, expiry, signature tampering, wrong keys, delegation-depth violations, and empty audit context; they do **not** measure adversarial success within authorized scope, collusion, or bearer-token replay before expiry. Real-time replay remains possible, verifiers must actually enforce policy, and short token lives replace reliable immediate revocation in v1; the optional revocation endpoint is not enforced by reference implementations. A compromised legitimate private key defeats document self-signing, and a malicious agent can lie in its signed completion record.

## Analyst Takeaways and Questions

1. **Carry attenuated authority through every handoff.** Authentication of a last-hop connection says little about the legitimacy of the chain that produced it.
2. **Separate auditability from truth and limits from metering.** Signatures attribute claims; they neither verify work nor debit shared budgets.
3. **Bound token expressiveness and verifier costs together.** Offline delegation avoids a central round trip but moves complexity into every verifier's rule engine and key resolution.
4. **Qualification remains narrow.** The results establish local conformance/performance for these implementations; compare against real OAuth deployment and test cross-organization A2A before drawing adoption or security-equivalence conclusions.

## Vault Ideas Extracted

* [Provenance-Conditioned Action Admission](/vault/provenance-conditioned-action-admission.md)
* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
* [Structured Agent Communication Contracts](/vault/structured-agent-communication-contracts.md)
* [Attenuated Delegation Authority](/vault/attenuated-delegation-authority.md)

