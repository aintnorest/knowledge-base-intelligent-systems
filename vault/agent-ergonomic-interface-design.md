---
type: Synthesis
title: Agent-Ergonomic Interface Design
description: Designing tool interfaces around the state an agent needs for its next decision, with bounded output, explicit recovery signals, and local guidance instead of protocol-dependent assumptions.
tags: [tool-use, mcp, context-engineering, token-efficiency, agents]
timestamp: 2026-07-13T16:13:34Z
---

# Agent-Ergonomic Interface Design

An agent interface is more than a transport or a collection of operations. It is a context-management surface: each command determines which schema, evidence, ambiguity, and next-step options enter the model's working state. Design the interface around the decision the agent must make next, rather than exposing only the underlying service API.

## Design Contract

1. Return a small, stable default schema and make extra fields explicit.
2. Bound large content, disclose the bound, and provide an intentional path to retrieve more.
3. State totals, derived status, and zero-result outcomes so an agent need not infer them through another call.
4. Make errors and partial failures structured; retain idempotent mutations, non-interactive execution, and meaningful exit status.
5. Offer concrete next-step command templates after a result, with concise per-command help as a fallback.

## Practical Use

Apply this contract whether the implementation is a CLI, native tool schema, HTTP API, or wrapper over another protocol. First inspect real trajectories for repeated discovery calls, full-result scans, and acknowledgement-then-status pairs. Add compact defaults, targeted projections, or derived fields where those patterns recur. Evaluate task success together with input tokens, output tokens, turns, latency, and recovery quality.

## Limitations

More guidance and derived state can become stale, overly prescriptive, or costly to maintain. Do not turn every possible workflow into a special command. Preserve a discoverable lower-level escape hatch, and validate the design on the target model and task distribution instead of treating a benchmark result as protocol-independent proof.

## Sources

- [AXI: Agent eXperience Interface dossier](/dossiers/axi-agent-experience-interface.md) — proposes ten interface principles covering output bounds, aggregates, structured errors, live home views, and contextual next-step guidance.
