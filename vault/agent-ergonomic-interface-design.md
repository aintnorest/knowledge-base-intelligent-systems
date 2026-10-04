---
type: Synthesis
title: Agent-Ergonomic Interface Design
description: Designing tool interfaces around the state an agent needs for its next decision, with bounded output, explicit recovery signals, and local guidance instead of protocol-dependent assumptions.
tags: [tool-use, mcp, context-engineering, token-efficiency, agents]
timestamp: 2026-10-04T07:48:05Z
---

# Agent-Ergonomic Interface Design

An agent interface is more than a transport or a collection of operations. It is a context-management surface: each command determines which schema, evidence, ambiguity, and next-step options enter the model's working state. Design the interface around the decision the agent must make next, rather than exposing only the underlying service API.

## Design Contract

1. Return a small, stable default schema and make extra fields explicit.
2. Bound large content, disclose the bound, and provide an intentional path to retrieve more.
3. State totals, derived status, and zero-result outcomes so an agent need not infer them through another call.
4. Make errors and partial failures structured; retain idempotent mutations, non-interactive execution, and meaningful exit status.
5. Offer concrete next-step command templates after a result, with concise per-command help as a fallback.

For policy denials, identify the boundary that rejected the attempt and whether authorized escalation is available. A generic failure invites the agent to retry the same blocked action; actionable denial feedback lets it change course or request approval without treating a tool-result message as permission to override policy.

## Repair-Oriented Failure Feedback

When a validator rejects a candidate, return the failed case or location, the observed value, and an independently known expected result or admissible alternatives. Preserve the underlying evidence. This makes the next decision actionable rather than merely labeling the previous attempt wrong. Report only what the validator knows: an open-ended code failure may have no finite list of correct repairs, and ambiguous intent is not permission to invent one.

In a paired short-action-plan experiment with a four-call cap, location/observation/alternative feedback raised terminal success by **44 and 42 percentage points** over raw diagnostics for the two evaluated models. Location and observation alone produced much smaller gains. Equivalent repair information in prose performed nearly as well as keyed records: the keyed-versus-prose differences were **two and zero points**, with no detected success advantage. The evidence favors informative content, not a universal requirement that JSON improves reasoning; stable fields can still help routing and trace analysis.

This is a repair interface mechanism, not stronger verification. A validator that misses a defect supplies no repair opportunity. The measured setting was generated short plans in a small environment with known admissible actions, not repository-scale repair; neither the effect magnitude nor the availability of replacement alternatives transfers automatically.

## Practical Use

Apply this contract whether the implementation is a CLI, native tool schema, HTTP API, or wrapper over another protocol. First inspect real trajectories for repeated discovery calls, full-result scans, and acknowledgement-then-status pairs. Add compact defaults, targeted projections, or derived fields where those patterns recur. Evaluate task success together with input tokens, output tokens, turns, latency, and recovery quality.

## Limitations

More guidance and derived state can become stale, overly prescriptive, or costly to maintain. Do not turn every possible workflow into a special command. Preserve a discoverable lower-level escape hatch, and validate the design on the target model and task distribution instead of treating a benchmark result as protocol-independent proof.

## Sources

- [AXI: Agent eXperience Interface dossier](/dossiers/axi-agent-experience-interface.md) — proposes ten interface principles covering output bounds, aggregates, structured errors, live home views, and contextual next-step guidance.
- [Implementing a Secure Sandbox for Local Agents dossier](/dossiers/cursor-local-agent-sandboxing.md) — Cursor observed repeated blocked-command retries and reports better offline recovery after sandbox-specific denial and escalation feedback.
- [Structured Feedback Improves Repair in an LLM Agent Loop dossier](/dossiers/veriharness-structured-feedback.md) — VeriHarness's paired TextWorld results isolate useful repair alternatives from representation, while the small HumanEval check exposes undetected failures.
