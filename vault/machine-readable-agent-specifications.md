---
type: Synthesis
title: Machine-Readable Agent Specifications
description: Converting organizational policies, quality standards, procedures, and agreements into versioned, scoped, testable artifacts that can govern a fleet of agents consistently.
tags: [governance, enterprise, evaluation, agents]
timestamp: 2026-07-13T18:03:01Z
---

# Machine-Readable Agent Specifications

An enterprise cannot reliably govern many agents with informal norms, static policy PDFs, or a handful of prompt instructions. Machine-readable agent specifications turn applicable policies, procedures, quality standards, permissions, and exceptions into versioned artifacts with a defined owner, scope, enforcement point, and test suite.

## The Pattern

1. Select a policy or task class whose rule has a stable owner and a concrete operational consequence.
2. Translate it into structured requirements: applicability, definitions, allowed and forbidden actions, required evidence, exception path, and escalation owner.
3. Version the specification, record its authority and effective dates, and map it to the agents, tools, and workflows it governs.
4. Enforce it before consequential actions and test it against normal, conflicting, stale-data, and exception cases.
5. Review failures and rule changes with both domain and technical owners; preserve the prior version and a decision audit trail.

## Why It Matters

At small scale, a knowledgeable operator can reconcile an unclear procedure while reviewing an agent's output. At larger scale, inconsistent local prompts and undocumented exceptions drift into incompatible behavior. A specification is a shared control surface: it makes a rule inspectable, testable, and updateable across many workflows.

## Practical Use

- Start with high-impact, repeated decisions where a policy can actually be expressed and tested; do not attempt to formalize all tacit knowledge at once.
- Keep natural-language source material and provenance beside the structured rule so reviewers can challenge the interpretation.
- Separate global policy, task-specific procedure, and runtime context. A general standard should not be copied blindly into every prompt.
- Include a safe fallback for uncertainty: request missing evidence, route to a human, or prohibit the action.

## Repository Rules and Turn-Scoped Constraints

Separate normative guidance from enforcement strength. A nested `AGENTS.md` rule can tell a reviewer that an "experimental" wire name is still consumed externally and point to a safe, backward-compatible path. A structural lint can *enforce* dependency layers. A plan-compliance agent can spot apparent omissions but cannot prove the plan correct. Before deploying a review rule, test it on a violating diff, a valid exception and an unrelated change, and give it an owner, a scope and a version ([Calibrated Code-Review Rules](/vault/calibrated-code-review-rules.md)).

In multi-turn work, distinguish immutable repository policy from turn-scoped user requirements and explicit replacements, and version the active rule set at every turn. On MTAC-IFBench, the best strict turn-level compliance was 12.7%, even though mean item compliance reached 80.4%, and a 600-item audit found only 85.5% judge agreement. Make applicability and supersession machine-checkable, and calibrate the checks themselves.

When an agent issues a quality or compliance verdict, bind it to the standard's edition and clause, the product scope, an owner, observable evidence and an approval authority. ISO/IEC 25010 (product quality), ISO/IEC 5055 (structural weaknesses), ISO/IEC/IEEE 12207 (lifecycle) and CMMI/TMM (maturity) answer different questions. An LLM-generated "compliant" label is a candidate artifact, not proof.

## Limitations

- Some norms are contextual or contested and cannot be reduced safely to deterministic rules.
- Translation creates interpretation risk; a machine-readable rule can encode a mistaken reading of policy with great consistency.
- Specifications require lifecycle management—ownership, tests, deprecation, and change review—or they become another stale source of agent error.

## Sources

- [Context Engineering: From Prompts to Corporate Multi-Agent Architecture dossier](/dossiers/context-engineering-corporate-multi-agent-architecture.md) — proposes specification engineering as a corporate layer for policies, standards, and procedures; it does not provide an implementation or comparative evaluation.
- [Custom Code Review rules for Codex dossier](/dossiers/openai-custom-code-review-rules.md) — nested AGENTS.md invariants with safe alternatives and contrastive evaluation.
- [Harness engineering: leveraging Codex in an agent-first world dossier](/dossiers/openai-harness-engineering-agent-first.md) — dependency-layer and taste invariants enforced by custom lints and structural tests.
- [Conductor Update: Introducing Automated Reviews dossier](/dossiers/google-conductor-automated-reviews.md) — plan and guideline compliance review, announced without accuracy data.
- [MTAC-IFBench: Benchmarking Instruction-Following in Multi-Turn Agentic Coding dossier](/dossiers/mtac-ifbench-multi-turn-coding-instructions.md) — turn-level constraint compliance across 100 evolving projects.
- [A Blueprint for AI-Driven Software Quality: Integrating LLMs with Established Standards dossier](/dossiers/standards-aligned-ai-software-quality.md) — maps LLM QA tasks to ISO quality standards without demonstrated certification.
