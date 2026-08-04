---
type: Synthesis
title: Provenance-Conditioned Action Admission
description: Admitting or escalating consequential agent actions based on their structural trace and each argument's source, trust, derivation, and correspondence to the current user request.
tags: [agent-security, provenance, access-control, prompt-injection, tool-use, agents]
timestamp: 2026-07-14T16:14:45Z
---

# Provenance-Conditioned Action Admission

Provenance-conditioned action admission is a reference-monitor pattern for tool-using agents: before a consequential action runs, evaluate not only its tool name and argument strings but also the path by which each argument entered the current execution. The monitor admits routine, well-supported calls; blocks clearly unauthorized ones; and sends evidence-poor or novel cases to a deliberately bounded approval or semantic-review path.

## Operating Pattern

1. Classify tools as retrievals with an explicit trust boundary or consequential action sinks, and identify which action arguments can create material effects.
2. Record an append-only execution trace that links every action argument to its source calls, trust class, derivation, and where possible a value-level witness in the source. Unknown or unresolvable provenance must remain explicit.
3. Learn or specify a normality model over control flow, source-to-sink relationships, prompt anchoring, untrusted-hop depth, and derivation types. Keep its training population, feature coverage, thresholds, and version auditable.
4. Let a cheap structural layer terminally allow or block only high-confidence cases. For ambiguous identifier-like values, use deterministic checks that require both an authorized source and a current-task rationale; never treat string reuse as sufficient authority.
5. Escalate the residual to narrowly scoped review. Provide the original user request, pending effect, provenance evidence, and bounded untrusted excerpts; return a decision with a reason, or request user confirmation for policy-relevant ambiguity.
6. Log the decision, evidence, model/rule version, escalation path, and observed effect. Review new benign workflows and attacks before incorporating them into the normality model; retain rollback and contamination controls.

## Why It Helps

Indirect prompt injection can change the content of a retrieved document but cannot inherently make an externally supplied value originate in the user's request. Provenance makes that distinction available at the sink: a new transfer recipient copied from untrusted text, a payload synthesized after a suspicious retrieval, or a missing expected precondition can be treated differently from a value explicitly supplied by the user or a trusted system record.

The pattern also bounds LLM-based security checks. A semantic judge is useful for legitimate retrieval-driven work that looks unusual structurally, but it should analyze a small residual and a limited evidence package rather than become the universal enforcement authority.

## Practical Use

- Start with a small number of irreversible sinks—send, publish, delete, transfer, share, grant, or execute—and high-value identifiers such as recipients, accounts, file references, and credentials.
- Make source tracking independently observable. Validate claimed copies against the raw retrieval, preserve source IDs and offsets when feasible, and treat a model's self-reported provenance as evidence to check rather than ground truth.
- Evaluate by task-grouped holdouts and future-distribution tests, not random individual actions alone. Report utility, unauthorized-effect block rate, false blocks, escalation rate, latency, drift, and the coverage of action arguments with verified provenance.
- Couple learned normality with non-negotiable policies. Spending limits, recipient authorization, tenancy boundaries, and legal requirements should not disappear merely because a trace resembles historic benign traffic.

## Limitations

- A learned envelope describes observed behavior rather than authorizing behavior. Sparse, stale, contaminated, or unrepresentative traces can block legitimate work or normalize unsafe practice.
- Semantic mimicry remains difficult: attacker-controlled content can look like a legitimate invoice, ticket, review, or request, and a user prompt can genuinely leave authority ambiguous.
- Provenance can be incomplete or forged when the agent, tool adapter, or tracing system self-reports it. Robust deployment needs trusted instrumentation and complete mediation at every consequential sink.
- This pattern does not by itself prevent text-only deception, direct jailbreaks, compromised trusted services, or harmful multi-action strategies whose individual calls look authorized.

## Sources

- [Agent-Sentry dossier](/dossiers/agent-sentry-execution-provenance.md) — learns structural/provenance bounds from benign agent traces, uses an allowlist only for trusted groundable values, and routes a small residual to a bounded LLM judge.
