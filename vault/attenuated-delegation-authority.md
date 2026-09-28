---
type: Synthesis
title: Attenuated Delegation Authority
description: Separating work delegation from effect authority through per-hop identity, narrower grants, and mediated low-trust reports.
tags: [agents, access-control, multi-agent, agent-security, provenance, orchestration]
timestamp: 2026-09-28T19:05:30Z
---

# Attenuated Delegation Authority

Delegating work does not automatically delegate the right to act. A child may investigate in an isolated context without access to the parent's protected tools; any capability to create external effects must be explicitly granted, narrower than the parent's authority, bound to the child and task, and checked independently of model instructions. The same boundary governs what the child's report can cause its parent to do.

## Authority Handoff

| Stage | Boundary |
| --- | --- |
| Propose work | Spawn a candidate without treating its existence as permission for protected effects. Limit its compute and observation separately. |
| Grant authority | Verify the receiving workload and actor chain; mint a short-lived, next-hop-audience-bound grant intersecting parent rights, task scope, and resource policy. |
| Activate effects | Check the actual action at an external enforcement point; if a shared risk allowance exists, charge it here rather than at spawn (see [Activation-Vested Risk Budget](/vault/activation-vested-risk-budget.md)). |
| Report upward | Keep lower-trust findings attributed to their source. Deliver structured completion or system-attributed stop signals without promoting free-form child prose to parent instructions. |

## Why It Matters

A final service credential identifies only the last caller; it cannot show which person and intermediate agents authorized the effect. A parent can also misuse an ambient credential through a compromised child despite harmless-sounding delegation. Attenuation limits inherited reach, while an actor chain makes policy and audit possible at each hop. [Session-composition authorization](/vault/session-composition-authorization.md) adds a separate check on the combined effects of otherwise authorized descendants, and [Activation-Vested Risk Budget](/vault/activation-vested-risk-budget.md) governs how many descendants may be granted authority at all.

## Practical Use

Preserve the complete initiating-human-to-tool chain when exchanging credentials and reject mismatched workload, recipient, audience, expiry, or delegation depth. Keep aggregate budget accounting in the enforcement runtime; a signed ceiling is not a spending ledger. Give reviewers of hostile material a constrained reporting channel: parent wake-up can carry a typed status and a pointer to attributed findings, not an unreviewed instruction. Require explicit, verified handoff for child-owned processes and other persistent resources.

## Limitations

- Workload attestation and short expiry constrain impersonation and replay, but a compromised authorized workload can still misuse rights it genuinely possesses.
- A policy intersection may leave a child with nearly all parent authority; parameter mapping, revocation propagation, and enforcement on every route remain necessary.
- Cryptographic completion attribution proves who claimed success, not whether the work or external effects occurred. Isolated contexts and controlled report delivery do not themselves prove host isolation.

## Sources

- [Spawn Freely, Act Sparingly: Progressive Risk Vesting for Recursive LLM-Agent Trees dossier](/dossiers/progressive-risk-vesting-agent-trees.md) — motivates treating candidate generation and authority activation as different security events; its accounting model is developed in the activation-vested-risk-budget note.
- [Solving the Identity Crisis for AI Agents dossier](/dossiers/uber-agent-identity.md) — describes workload-attested, audience-bound per-hop credentials carrying the originating human and intermediate actors.
- [Paperclip Low-Trust Presets — Containing Review Work dossier](/dossiers/paperclip-low-trust-review.md) — demonstrates intersected execution scope and a constrained report channel that avoids laundering low-trust comments into parent instructions.
- [Delegation Without Trust dossier](/dossiers/delegation-without-trust-authorization-broker.md) — specifies a trusted broker issuing attenuated, identity-bound grants and discloses limits of its reference evaluation.
- [AIP: Agent Identity Protocol for Verifiable Delegation Across MCP and A2A dossier](/dossiers/agent-identity-protocol-aip.md) — distinguishes signed narrowing and delegation attribution from aggregate budget metering or truthful completion.
- [Hermes Agent — Subagent Delegation and Ownership Boundaries dossier](/dossiers/hermes-subagent-delegation.md) — illustrates inherited but constrained tools, typed completion, and explicit ownership transfer rather than assuming a child summary transfers authority.
