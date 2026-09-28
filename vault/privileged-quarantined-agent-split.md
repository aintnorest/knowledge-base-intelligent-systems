---
type: Synthesis
title: Privileged–Quarantined Agent Split
description: Separating a tool-capable planner from an untrusted-data processor, then constraining or symbolically handling the processor's return values so untrusted text cannot become privileged instructions.
tags: [agent-security, prompt-injection, tool-use, orchestration, agents]
timestamp: 2026-07-14T16:11:55Z
---

# Privileged–Quarantined Agent Split

When an agent must both act on the world and inspect attacker-influenced text, assign those roles to different components. A privileged planner may select approved tools and actions, but it never receives untrusted content. A quarantined processor may read that content, but has no authority to invoke consequential tools.

The boundary is only useful if the return path is also controlled. A free-form answer from the quarantined processor can itself carry a prompt injection into the planner. Return a small validated type—such as a Boolean, category, score, or schema-constrained record—or return an opaque symbolic handle. The privileged model can pass handles to subsequent calls without dereferencing them; a deterministic orchestrator resolves the actual value only at the final allowed operation.

Recursive delegation can keep successive untrusted observations in short-lived worker contexts while a parent defines the expected extraction before seeing each result. This limits persistent contamination without forcing a fixed workflow. But a parseable structured response is not necessarily schema-conformant or safe: broad string fields can carry instructions, and a model-based gate over worker-proposed actions does not cover the parent's own tool calls. Independently validate the return domain and mediate effects; see [Subagent Context Inheritance Modes](/vault/subagent-context-inheritance-modes.md).

## Practical Use

- Use a quarantined processor to classify individual files, reviews, emails, résumés, or documentation fragments, while keeping the controller's tool set and planning context free of raw source text.
- Define the permitted result domain before implementation. A type is safe for this boundary only when arbitrary prose cannot be represented through it.
- For rich values that must be forwarded, keep them opaque to the privileged model and make the orchestrator enforce where they may be substituted.
- Pair the split with least-privilege tools, output validation, and authorization checks. The pattern constrains injection-driven control flow; it does not prove that allowed tools or values are harmless.

## Limitations

A constrained value can still be false or strategically biased. For example, a malicious résumé may cause its isolated processor to assign it a favorable score; the pattern prevents that résumé from issuing instructions about other candidates, but it does not establish ranking accuracy. Symbolic handles also require careful orchestrator design: any accidental dereference into privileged model context reopens the injection channel.

## Sources

- [Design Patterns for Securing LLM Agents against Prompt Injections dossier](/dossiers/design-patterns-securing-llm-agents-prompt-injections.md) — describes dual-LLM and map-reduce designs, including constrained map outputs and opaque variables resolved by a non-LLM orchestrator.
- [AgentSys: Secure and Dynamic LLM Agents through Explicit Hierarchical Memory Management dossier](/dossiers/agentsys-hierarchical-memory.md) — evaluates short-lived observation processors with structured parent returns and selective worker-action checks; documents schema, parent-action, utility, and token-cost limits.
