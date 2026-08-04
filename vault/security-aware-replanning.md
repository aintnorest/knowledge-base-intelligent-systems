---
type: Synthesis
title: Security-Aware Replanning
description: Allowing an agent to revise its plan and least-privilege policy from runtime feedback while treating each revision as a bounded, attributable security-sensitive change.
tags: [agent-security, access-control, prompt-injection, orchestration, tool-use, agents]
timestamp: 2026-07-14T16:16:51Z
---

# Security-Aware Replanning

General-purpose agents need runtime adaptation: APIs change, tests reveal new failures, and only a prior observation can identify the next relevant file, tool, or parameter. A secure system should therefore not equate safety with a frozen initial plan. Instead, it should make every environment-influenced revision to the plan or least-privilege policy an explicit, reviewable change with a narrowly scoped authority effect.

## The Pattern

1. Start with a task-bound plan and an initial policy that names allowed tools, data classes, destinations, and parameter limits.
2. Preserve raw environment feedback as evidence, but do not automatically place it into a privileged planner or policy-authoring context.
3. Represent a proposed recovery as a typed diff: changed step, trigger, claimed rationale, affected resources, requested authority change, expiration or rollback condition, and links to bounded supporting evidence.
4. Reject changes that violate hard invariants through deterministic checks: workspace and identity boundaries, non-negotiable egress limits, disallowed tool classes, and invalid types or schemas.
5. Review remaining semantic questions through a narrowly scoped adjudication process, then grant only the minimum additional authority necessary for the revised step. Escalate genuinely ambiguous or high-impact cases to a human.
6. Apply, log, and later revoke or narrow temporary grants. Tie subsequent actions to the approved revision rather than allowing a general expansion of capability.

## Why It Helps

Fixed plan-execution isolation can protect control flow but may turn ordinary runtime change into a hard failure. Conversely, unrestricted feedback-driven planning lets attacker-controlled content request new actions or policy exceptions. An explicit change boundary preserves adaptation while creating places to check provenance, scope, necessity, and impact before the agent gains new authority.

The policy should change with a justified plan change, but the two changes need separate review. A new diagnosis may justify reading a particular log without authorizing broad filesystem access; a changed API endpoint may justify a new request format without authorizing a new domain or data category.

## Practical Use

- Begin with a small recovery vocabulary: retry with bounded parameters, read a named diagnostic, change a parser, request a new endpoint, or request user clarification. Add open-ended update forms only after the evaluator can explain their authority effects.
- Make a policy diff concrete: include old and proposed tool permissions, data scopes, destinations, values, and duration. “Continue debugging” is not an auditable authorization.
- Bind approvals to the task, actor, resource, purpose, and time window. Revalidation is needed after a material plan change or before a delayed external side effect.
- Test both benign recovery and adversarial adaptation: injected documentation, misleading error messages, parameter manipulation, repeated retries, and partial side effects that make rollback unsafe.
- Retain the original observation and each transformed artifact for audit, while keeping raw untrusted text out of privileged decision contexts unless a carefully scoped stage requires it.

## Limitations

- Structured change requests can themselves omit or distort context. Their security depends on complete mediation, trustworthy provenance, and a sufficiently expressive but enforceable policy language.
- A strict approval path can cause false blocks, latency, and user fatigue; a permissive path can merely formalize unsafe privilege escalation.
- Some tasks require broad exploration before the system can state the minimum next permission. The right response may be a redesigned tool contract or human clarification, not an ever-broader dynamic policy.
- This pattern limits unauthorized adaptation; it does not establish the truth of environment data, the correctness of a patch, or safety of individually authorized action sequences.

## Sources

- [Architecting Secure AI Agents dossier](/dossiers/architecting-secure-ai-agents.md) — argues that dynamic tasks need replanning and policy updates, while environment-influenced updates require explicit security design; it is a position paper rather than an implementation evaluation.
