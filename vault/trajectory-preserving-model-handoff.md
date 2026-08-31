---
type: Synthesis
title: Trajectory-Preserving Model Handoff
description: Switch from a costly model to a cheaper executor only after grounded exploration and an initial action, while preserving the live context and validation checklist.
tags: [agents, orchestration, agent-harness, coding-agents, inference-efficiency]
timestamp: 2026-08-31T22:15:22Z
---

# Trajectory-Preserving Model Handoff

A prose plan compresses away the observations and failed hypotheses that created it, so a second model often re-reads the environment. A trajectory-preserving handoff instead lets the first model explore, record a bounded checklist, and make one grounded change before switching models inside the same context. The executor inherits both working state and an in-context example of the intended implementation.

Use a semantic switch condition, such as the first edit after a plan and reproduction step, not a fixed turn. Preserve validation items and retain rollback because an initial edit is evidence of confidence, not proof of correctness. Compare full trace cost, duration, duplicated reads, completion quality, and policy violations across model pairs.

## When to Use It

This handoff fits tasks where exploration is expensive, the executor can continue with the same tools, and the trajectory remains within its usable context. It is less attractive when models have incompatible tool vocabularies, policies, or context formats; in those cases takeover instructions or a fresh scoped subagent may be safer. The atomic distinction is between transferring *execution state* and transferring *an account of execution state*.

## Sources

* [Prewalk dossier](/dossiers/prewalk-trajectory-preserving-model-handoff.md) — reports SWE-Bench Pro model-pair experiments that switch after the frontier model's first edit.
* [Continually Improving Our Agent Harness dossier](/dossiers/continually-improving-agent-harness.md) — documents model-specific takeover instructions, tool incompatibility, cache misses, and the alternative of a fresh-context subagent.
