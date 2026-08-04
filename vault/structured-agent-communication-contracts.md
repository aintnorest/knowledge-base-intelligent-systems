---
type: Synthesis
title: Structured Agent Communication Contracts
description: Using an explicit, validated message schema for inter-agent handoffs so state, evidence, confidence, and next actions remain interpretable and transferable through a workflow.
tags: [multi-agent, agents, verification, orchestration]
timestamp: 2026-07-13T17:56:21Z
---

# Structured Agent Communication Contracts

A structured agent communication contract defines the fields, allowed values, and validation rules for a handoff instead of leaving a downstream agent to infer the important facts from prose. Useful fields commonly include status, summary, evidence, confidence, unresolved questions, next action, and a candidate result.

## The Pattern

1. Identify the decisions the receiving agent must make and the evidence it needs for each one.
2. Define a small schema with required fields and controlled values where they reduce ambiguity.
3. Require the sender to separate facts and source references from inferences and confidence.
4. Validate parseability, required fields, types, and task-specific invariants before passing the message onward.
5. Preserve an escape hatch for task-specific detail, but bound it and make its purpose explicit.
6. Evaluate the protocol by downstream task success, error recovery, message cost, and evidence quality—not just by whether its JSON parses.

## Why It Matters

Freeform messages force each receiving agent to rediscover what information is relevant and whether it is evidence, speculation, or a request. A shared contract makes handoffs easier to scan, enables deterministic checks, and gives prompt changes a more stable interface through which to propagate. In the MAS-PromptBench communication study, more constrained message formats were associated with larger prompt-optimization gains for both tested optimizers.

## Practical Use

- Use explicit statuses and a next-action field to make stalled or partial work visible to a coordinator.
- Put citations, tool outputs, or other supporting facts in a distinct evidence field; do not let confidence substitute for evidence.
- Make schemas specific enough to support aggregation and validation, but avoid inventing fields that no receiving decision uses.
- For safety-sensitive work, reject unsupported claims or schema-valid outputs that violate independent policy or provenance checks.

## Limitations

- A well-formed report can still be false, incomplete, or strategically misleading; syntax validation is not semantic verification.
- Rigid schemas can discard nuance, impose serialization overhead, and encourage agents to fill fields performatively. Revisit fields that do not improve downstream decisions.
- The best representation is task- and topology-dependent; a sequential evidence pipeline and a parallel voting ensemble need different contracts.

## Sources

- [MAS-PromptBench dossier](/dossiers/mas-promptbench.md) — compares freeform, semi-structured, and constrained JSON-style agent messages; its results associate more shared structure with larger optimization gains, subject to the benchmark's scope.
- [AXI dossier](/dossiers/axi-agent-experience-interface.md) — motivates bounded, explicit schemas and structured failures for agent-facing interfaces.
