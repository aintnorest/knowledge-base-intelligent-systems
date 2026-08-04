---
type: Synthesis
title: Nested Sandbox Capability Evaluation
description: Evaluating an agent's ability to cross an inner security boundary while enclosing the whole experiment in a stronger outer boundary that contains any successful crossing.
tags: [agent-security, sandboxing, evaluation, benchmark, agents]
timestamp: 2026-07-14T16:14:53Z
---

# Nested Sandbox Capability Evaluation

Some agent capabilities are unsafe to test directly against the system running the evaluation. Nested sandbox capability evaluation puts the boundary under test inside a stronger containment layer. The agent can attempt to cross the inner boundary and produce a verifiable result in the outer environment, but it does not obtain access to the evaluator's real host, credentials, or control plane.

## Pattern

1. Define the inner boundary and a concrete success condition beyond it.
2. Run that inner environment inside a separately administered outer boundary, such as a VM or isolated account, with no trusted-evaluator secrets inside it.
3. Place a minimal success artifact in the outer environment and validate it with a deterministic check.
4. Reset both layers between attempts; record the inner image, outer image, network policy, model, tool set, token budget, and termination reason.
5. Treat any outer-boundary failure, unintended egress, or uncertainty about containment as an incident to investigate, not as an ordinary task result.

## Practical Use

Use this design for capability evaluations that require agents to execute untrusted code, probe isolation, exercise destructive workflows, or interact with realistic security misconfigurations. It allows the experiment to retain an operationally meaningful goal while limiting the blast radius of a true success. The outer layer must be independently hardened; simply nesting two instances of the same weak runtime does not establish safe containment.

## Limitations

Nested environments add cost, setup variance, and opportunities for an accidental shortcut. Their configuration can itself become part of the benchmark's attack surface, so isolate evaluator credentials, minimize networking, use ephemeral resources, and inspect successful traces. A safe experimental architecture does not turn an intentionally vulnerable inner task into a model of a production deployment.

## Sources

- [Quantifying Frontier LLM Capabilities for Container Sandbox Escape dossier](/dossiers/sandbox-escape-benchmark.md) — SANDBOXESCAPEBENCH runs the tested container or pod inside a VM so a successful inner escape reaches a VM-resident flag while leaving the Inspect orchestrator outside that boundary.
