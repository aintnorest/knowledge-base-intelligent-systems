---
type: Study Note
title: 'Context Engineering: From Prompts to Corporate Multi-Agent Architecture'
description: Personal study notes on a practitioner framework that treats agent context as engineered state and proposes a four-level corporate maturity model spanning prompts, context, intent, and machine-readable specifications.
resource: https://arxiv.org/abs/2603.09619v2
source: /archive/context-engineering-corporate-multi-agent-architecture.pdf
tags: [context-engineering, agents, multi-agent, enterprise, governance, agent-memory]
timestamp: 2026-07-13T18:03:01Z
---

# Context Engineering: From Prompts to Corporate Multi-Agent Architecture — Study Notes

**Author**: Vera V. Vishnyakova (HSE University)
**Venue**: arXiv:2603.09619v2
**Date**: March 2026
**Pages**: 25

## What It Is

This is a practitioner-oriented position paper about designing enterprise AI agents. Vishnyakova distinguishes prompt engineering—the formulation of an individual model request—from context engineering, which she defines as managing the information, memory, tool outputs, policies, and visibility boundaries available to an agent at a particular decision point.

The paper's central proposal is a cumulative four-level maturity model: prompt engineering supplies precise local instructions; context engineering assembles the agent's working state; intent engineering encodes organizational goals and trade-offs; and specification engineering makes policies, procedures, and quality standards machine-readable across a wider agent estate. The taxonomy is useful as a design discussion aid, but it is a conceptual synthesis, not a controlled evaluation of the proposed levels or their claimed causal effects.

## The Problem It Addresses

An autonomous agent accumulates tool outputs, prior actions, retrieved documents, policies, and delegated results over many calls. A better initial prompt alone does not decide what information should persist, what should be retrieved for the next step, who can see a subtask's data, or how to resolve conflicts among sources and business goals.

The paper argues that treating all accumulated information as prompt text produces several operational failures: irrelevant history crowds out the current task, intermediate errors propagate, multi-agent handoffs expose data too broadly, and ever-growing context raises latency and cost. It makes the important distinction that an LLM can propose a tool call, while the surrounding agent system supplies orchestration, tool execution, memory, and policy enforcement.

## Proposed Context Architecture

The author frames context as an agent's operating system: it manages what is retained, what is evicted, what each component may access, and how external state enters a model call. She organizes the operational work around four familiar context operations:

1. **Write** durable observations, decisions, and artifacts to external state.
2. **Select** the information relevant to the current role and step.
3. **Compress** history, logs, and artifacts while retaining recoverable references where detail may matter later.
4. **Isolate** agents and roles so a worker receives only the data and authority necessary for its verified subtask.

The paper proposes five working quality criteria for a production context: **relevance** (minimum decision-useful information), **sufficiency** (enough evidence to avoid guessing), **isolation** (role-bounded visibility), **economy** (token and reassembly cost controlled), and **provenance** (traceable origin and trust status). It pairs these with a four-part "context rot" vocabulary—poisoning, distraction, confusion, and clash—to describe ways an accumulated context can become misleading. These are the author's useful heuristics, not an accepted standard or validated metric suite.

## From Context to Organizational Control

The most distinctive part of the paper is its upward extension beyond context:

| Level | Design object | Intended scope |
|---|---|---|
| Prompt engineering | A task instruction or interaction | One model call or tightly bounded task |
| Context engineering | Information composition, timing, representation, and visibility | A stateful agent or workflow |
| Intent engineering | Goals, priorities, values, and trade-off rules | An agent or agent team acting for the organization |
| Specification engineering | Versioned, machine-readable policies, standards, and procedures | Multiple task classes and a larger agent estate |

The author uses the example of customer service: a system can have relevant customer data yet still optimize an easily measured proxy such as cost or resolution speed rather than loyalty, brand treatment, or regulatory obligations. Her proposed answer is to make priority order, escalation boundaries, and unacceptable trade-offs explicit and testable rather than leaving them implicit in an instruction or a human operator's intuition.

Specification engineering carries this further: policy PDFs and informal practices must be converted into structured, governed, revisable artifacts before many agents can apply them consistently. This resembles existing work on policy-as-code, requirements engineering, and governed retrieval; the paper does not establish a new implementation or evaluation method for it.

## Memory and Economics

The paper separates four memory roles: working memory in the active context window; episodic records of past interactions and decisions; semantic knowledge such as policies and reference material; and procedural capability embodied in a model or persistent task guidance. It emphasizes that storage location, data residency, access scope, retention, caching, and retrieval policy are architectural choices, not incidental implementation details.

Its practical economic claim is directionally sound: resending ever-growing state can make a long-running workflow slower and more expensive. The recommended controls are stable-prefix caching, selective loading, compression with references to source artifacts, and narrowly scoped delegation. The paper cites large cost-reduction figures from vendor material, so those figures should be treated as vendor-specific claims rather than general performance guarantees.

## My Takeaways

1. **Treat the runtime context as a compiled, policy-governed artifact.** Record why each retrieved item, summary, or memory was admitted; choose it for a specific step and role; and be able to inspect the resulting context after an incident.

2. **Context adequacy is a trade-off, not a length target.** "More context" can create distraction, cost, and leakage; "less context" can force unsupported inference. Evaluate relevance, sufficiency, access scope, provenance, quality, latency, and cost against a task-specific test set.

3. **Separate information failures from objective failures.** Better retrieval cannot repair a system that has no explicit instruction for resolving cost-versus-quality, safety-versus-speed, or customer-versus-operational trade-offs. Make those priorities executable, then test them with conflict cases.

4. **Do not mistake a policy document for an enforceable specification.** A policy becomes operational only when it has ownership, a machine-readable representation, scope, versioning, conflict rules, review, and a test or enforcement point.

## Questions and Limitations

- The paper synthesizes vendor posts, forecasts, news reports, and personal project experience. It supplies no comparative experiment showing that the proposed Pyramid improves reliability, governance, or business outcomes.
- Several enterprise statistics and case interpretations are secondary or speculative. In particular, the discussion of Klarna infers missing context and intent; it does not establish those causes from an internal system analysis.
- The boundaries between context engineering and established retrieval, memory, orchestration, access-control, and policy-as-code practices remain deliberately unresolved. The new labels can aid communication, but they should not hide existing technical requirements.
- The five criteria can conflict. A minimal context may be cheap but insufficient; strict isolation may block necessary coordination; provenance metadata may be traceable but stale or wrong. Each needs explicit measurement, conflict resolution, and human accountability.
- Turning organizational values into specifications is difficult: policies can be ambiguous, contested, jurisdiction-specific, or deliberately discretionary. Formalization may move disagreement into schema and exception design rather than eliminate it.

## Vault Ideas Extracted

* [Intent Engineering for Agents](/vault/intent-engineering-for-agents.md)
* [Machine-Readable Agent Specifications](/vault/machine-readable-agent-specifications.md)
* [Permission-Scoped Synthesis](/vault/permission-scoped-synthesis.md)
