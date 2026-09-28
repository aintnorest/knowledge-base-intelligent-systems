---
type: Study Note
title: "Delegation Without Trust: An Empirical Gap Analysis of Identity, Authorization, and Runtime Governance in Multi-Agent LLM Systems"
description: An untrusted-agent threat analysis and reference broker for attenuated, identity-bound capabilities at every delegated action.
resource: https://arxiv.org/abs/2609.00267v1
source: /archive/delegation-without-trust-authorization-broker.pdf
tags: [agents, agent-security, multi-agent, access-control]
timestamp: 2026-09-28T18:40:14Z
---

# Delegation Without Trust — Study Notes

**Authors**: Panduranga Sai Varma Dantuluri and Jyotirmoy Sundi  
**Preprint**: arXiv:2609.00267v1, September 2026

## The Gap

Agent orchestration frameworks carry work across models, peers, and tools but do not thereby establish a security principal for every hop. The paper considers a confused deputy using a broader parent's credentials, replay of a stolen bearer credential, prompt-injected escalation, and a fully compromised child. Its answer is a trusted broker that issues narrow, short-lived capabilities on delegation, binds them to an attested workload identity, and requires an external policy enforcement point to check each subsequent action. Child grants are the intersection of the parent's remaining authority, the task's scope, and the resource policy; revocation and audit follow the chain.

Unlike a prompt that says “only use this token for X,” the broker's decision is independent of model obedience. Binding a token to a workload raises the bar for bearer replay but does not help if the workload identity itself is impersonated or its runtime is compromised. The security property also depends on policy accurately mapping concrete tool parameters to allowed resources and actions.

## What Was Actually Evaluated

The authors executed a LangGraph example and inspected CrewAI and AutoGen code; they interpret the MCP specification as a protocol boundary, rather than running the same attacks in all four environments. Their reference broker is about 160 lines of Python, is **not released or integrated** into these frameworks, and should not be conflated with production-product claims elsewhere in the paper.

Eleven handcrafted attack scenarios were blocked in the reference setup. Among 200,000 attempts to forge tokens, zero were accepted. In 2,000 randomized *synthetic* delegation scenarios, mean reachable authority was 1.5 of 8,100 possible resources for attenuated delegation versus all 8,100 under unrestricted bearer delegation. Local authorization averaged 2.6 microseconds. Those are microbenchmarks and simulations, not end-to-end measurements with live LLMs, network paths, or real workload attestation.

## Limits and Design Implications

The broker must be independently trusted and consulted on every effectful action; a missed action path defeats the cut. Identity proof, revocation distribution, parameter-aware policies, and mapping of user intent to explicit grants remain hard integration work. The threat model presumes the broker and enforcement point are not compromised even when a model or child agent is. The paper usefully separates a framework's *coordination* semantics from enforceable delegation, but its empirical evidence establishes reference behavior rather than deployed framework safety.

## Analyst Takeaways

1. Assign identity and authority per delegated edge, not once to a shared orchestration session.
2. Bind grants to an attested actor and reduce them at each hop; short expiry and revocation bound but do not eliminate misuse.
3. Test the real enforcement cut and its parameter mapping before extrapolating from token-forgery microbenchmarks.

## Vault Ideas Extracted

* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
* [Authorization-Provenance Graph Alignment](/vault/authorization-provenance-graph-alignment.md)
* [Attenuated Delegation Authority](/vault/attenuated-delegation-authority.md)

