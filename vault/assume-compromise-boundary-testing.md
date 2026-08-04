---
type: Synthesis
title: Assume-Compromise Boundary Testing
description: Testing an agent security control by treating the planning model as already compromised and injecting adversarial action requests directly at the enforcement boundary.
tags: [agent-security, verification, prompt-injection, tool-use, evaluation, agents]
timestamp: 2026-07-14T17:10:00Z
---

# Assume-Compromise Boundary Testing

If a security architecture claims to protect a system after a planner has been compromised, test that claim without asking the planner to cooperate. Assume-compromise boundary testing injects crafted action requests directly into the validator, reference monitor, or executor-facing API. The resulting measurement isolates whether the enforcement layer blocks a harmful effect when the model's refusals, system prompt, and normal tool-calling behavior are no longer available as accidental defenses.

## Test Pattern

1. Identify the complete mediation point: the API, queue, RPC handler, runtime, or adapter through which every consequential effect must pass.
2. Define structured harmful requests across the actual tool surface, including destructive writes, privilege changes, data egress, encoded or indirect payloads, multi-step data flows, malformed inputs, and attempts to modify or exhaust the validator.
3. Inject those requests at the boundary while preserving the deployed policy, classifier/model versions, adapters, sandbox, and error handling.
4. Test representative legitimate actions through the same path. Report attack blocks, attack successes, false blocks, unresolved/escalated cases, latency, and failures by action type and validation tier.
5. Re-run after a policy, tool, model, deployment, or sandbox change. Treat a bypass as evidence that a particular boundary/configuration is incomplete, then add a focused regression test before changing the control.

## Practical Use

Use this for tool-using agents whose safety story includes authorization, sandbox routing, egress control, provenance checks, or a dedicated evaluator. Normal LLM-mode red teaming remains useful: it tests whether hostile text persuades the real agent and whether the end-to-end product remains usable. It cannot by itself establish that a downstream enforcement layer works, because a well-aligned model may refuse every test before that layer runs.

Keep the harness constrained to a disposable environment or a non-effecting executor. The goal is to exercise the real policy and adapter logic, not to make a harmful payload reach production resources. Capture the exact configuration and raw decision trace so results can be reproduced and so an apparent block can be distinguished from a crash, parser shortcut, timeout, or skipped mediation point.

## Limitations

- Bypassing the planner does not test whether real prompt injection reaches the boundary, whether plans are correct, or whether users understand approvals. Pair it with end-to-end and usability evaluation.
- A curated attack suite cannot prove coverage for unseen tools, semantic attacks, implicit flows, races, compromised dependencies, or a compromised trusted computing base.
- A policy can achieve a high block rate by denying ordinary work. Legitimate-action suites, friction metrics, and deployment-specific failure analysis are essential.
- Direct injection is only meaningful if it reaches the same runtime path as production. Test fixtures that bypass serialization, normalization, authorization, or adapters can create either false confidence or irrelevant failures.

## Sources

- [Parallax: Why AI Agents That Think Must Never Act dossier](/dossiers/parallax-architecturally-safe-autonomous-execution.md) — proposes injecting tool calls directly into its validator to evaluate a fully compromised agent; its reported prototype results and attack corpus require independent replication.
