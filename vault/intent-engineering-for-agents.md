---
type: Synthesis
title: Intent Engineering for Agents
description: Encoding organizational priorities, trade-off rules, and escalation boundaries as testable decision policy so an agent does not optimize a convenient proxy for its actual mandate.
tags: [governance, agents, evaluation, enterprise]
timestamp: 2026-07-13T18:03:01Z
---

# Intent Engineering for Agents

An agent can have accurate, relevant context and still take the wrong action when its objective is underspecified. Intent engineering makes the organization's priorities, prohibited trade-offs, and escalation boundaries explicit enough to guide and evaluate decisions—not merely to decorate a system prompt.

## The Pattern

1. Identify the outcome the agent is meant to protect, including stakeholders and non-negotiable constraints.
2. Enumerate common conflicts: for example, resolution speed versus correctness, cost versus customer retention, or automation versus human review.
3. Express priority order, decision authority, evidence thresholds, and required escalation in a versioned policy that the runtime can apply.
4. Attach each task, tool permission, and evaluation metric to that policy; do not optimize a proxy metric without checking its effect on protected outcomes.
5. Test conflict and edge cases, review harmful or surprising decisions, and revise the policy with accountable domain owners.

## Why It Matters

Operational metrics are often easier to measure than the mandate they approximate. A service agent can reduce handle time by refusing nuance; a procurement agent can minimize price while increasing supplier risk; a coding agent can maximize tests passed while violating architectural policy. More retrieval cannot resolve these conflicts if the system never states what must win.

## Practical Use

- Pair quantitative objectives with hard constraints and concrete counterexamples, rather than relying on a weighted score alone.
- Give agents only the authority their task needs, and define when ambiguous cases must stop for human review.
- Maintain traceable links from a decision to the policy version, evidence, priority rule, and evaluator that authorized it.
- Evaluate policy behavior with adversarial trade-off cases and slice results by the stakeholders or obligations the system is meant to protect.

## Outcome-First Coding Specifications

A coding-agent specification is the shared account of what should change for users, why, which invariants must survive, and how a human will decide the result is acceptable. It starts with outcome and boundaries, not commands or an AI-drafted design assumed to be authoritative. State observable behavior with representative inputs and outcomes, failure cases, architecture constraints and explicit non-goals. Add commands, code examples, test locations and permission tiers where they matter: **Always** (routine actions), **Ask first** (schema or production-configuration changes), **Never** (secret exposure). Review the model-drafted spec against domain knowledge, and fix cross-slice contracts before parallel coding. Each implementation agent gets only its slice.

Enforce the tiers with permissions and approval gates, not prose alone. If generation outpaces verification, slow generation or add check capacity rather than silently relaxing a non-negotiable bar. Do not rewrite the spec to fit a faulty implementation, which ratifies the error. A giant spec crowds out task-relevant code, and a vague one lets agents invent requirements. See [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md) for turning the spec's acceptance criteria into protected oracles.

## Limitations

- Formalizing intent cannot remove genuine organizational disagreement; it makes the disagreement visible and requires an owner to resolve it.
- A written policy can still be ambiguous, stale, unenforceable at runtime, or gamed through its measurable proxy.
- This is a governance and evaluation practice, not a guarantee of alignment. It needs access control, provenance, monitoring, and accountable human review.

## Sources

- [Context Engineering: From Prompts to Corporate Multi-Agent Architecture dossier](/dossiers/context-engineering-corporate-multi-agent-architecture.md) — proposes intent engineering as a layer above context design for encoding goals, value hierarchies, and trade-offs; its framing is conceptual rather than experimentally validated.
- [How to write a good spec for AI agents dossier](/dossiers/good-spec-ai-agents.md) — goal-first specs, modular tasks, and Always / Ask first / Never tiers.
- [My LLM coding workflow going into 2026 dossier](/dossiers/ai-coding-workflow-2026.md) — human-reviewed spec and plan before each coding increment.
- [Agentic Code Quality dossier](/dossiers/agentic-code-quality.md) — explicit quality-gate capacity and policy trade-offs.
