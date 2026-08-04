---
type: Synthesis
title: Bounded Model Security Adjudication
description: Using a learned model for a narrowly defined security judgment over structured, minimal artifacts, while deterministic controls constrain its inputs, output, and authority.
tags: [agent-security, prompt-injection, access-control, llm-as-judge, human-in-the-loop, agents]
timestamp: 2026-07-14T16:16:51Z
---

# Bounded Model Security Adjudication

Some agent-security decisions are semantic and context-dependent: whether a proposed recovery is relevant to the user's task, whether a policy exception is justified, or whether a structured instruction-state change is suspicious. Hand-written rules can enforce crisp invariants but cannot fully encode these judgments. A learned model can help only when the system deliberately confines it to a small decision over a controlled representation, rather than treating it as an all-purpose judge of attacker-controlled prose.

## The Pattern

1. Use deterministic policy checks first for non-negotiable constraints, types, provenance, allowlists, and authorization facts.
2. Convert the residual question into a typed artifact: for example, a proposed plan/policy diff, approved task state, tool schema, provenance summary, resource delta, and bounded evidence references.
3. Exclude raw external text and irrelevant tool output from the adjudicator's context. If details must be inspected, transform them through a restricted, separately validated extractor and record the transformation.
4. Ask one explicit question with a limited response domain, such as approve, deny, request clarification, or choose among predeclared mitigations. The model should not compose new tools, arbitrary policy, or execution instructions.
5. Validate the response deterministically, enforce the resulting scoped decision at the runtime boundary, and log the artifact, output, rationale, and effect.
6. Escalate unresolved subjective intent or high-impact exceptions to a human with the same bounded decision package.

## Why It Helps

Prompt-injection defenses fail when an authority-bearing model consumes arbitrary web pages, emails, or tool output. Removing raw attacker-controlled language and limiting the possible outcome reduces the ways an attacker can steer the judge. It also makes the learned component testable as a defined classifier or chooser rather than an opaque controller whose authority is the union of every tool it can call.

This is not a claim of formal safety. A structured artifact can still be maliciously shaped, incomplete, or misleading; the gain comes from reducing and exposing that interface so that deterministic checks, model robustness work, human review, and adversarial tests can target a concrete boundary.

## Practical Use

- State the decision contract before selecting a model: inputs, permitted evidence, response schema, failure behavior, and maximum authority granted by each outcome.
- Prefer a Boolean, enum, or fixed action template to free-form text. Treat a model-generated explanation as audit material, not executable authority.
- Include provenance and uncertainty in the artifact, but distinguish verified metadata from model-inferred claims.
- Evaluate with ordinary task variations and adaptive attacks that target field values, omitted fields, schemas, and the artifact-construction pipeline—not only raw prompt strings.
- Separate instruction recognition from instruction following when useful: trace a surfaced candidate instruction to its source, then decide under policy whether that source is allowed to contribute instructions.

## Limitations

- No context reduction guarantees safety. An attacker may exploit a trusted extractor, encode influence in allowed fields, or manipulate evidence selection before the adjudicator sees it.
- Constraining the output can lower utility when a task requires novel recovery. A system needs a safe escalation or redesign path rather than silently widening the model's authority.
- Model errors, drift, and distribution shift remain security-relevant. Calibrate the decision threshold and measure false approvals and false denials by action impact.
- The artifact builder, policy engine, runtime enforcer, and audit store become part of the trusted computing base. A missing enforcement point invalidates a carefully bounded model call.

## Sources

- [Architecting Secure AI Agents dossier](/dossiers/architecting-secure-ai-agents.md) — proposes restricting learned security decisions to structured plan/policy or instruction-state artifacts and using models to synthesize step-specific validators; these are design proposals, not verified guarantees.
