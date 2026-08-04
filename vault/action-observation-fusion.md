---
type: Synthesis
title: Action-Observation Fusion
description: Packaging a state-changing or navigational action with the targeted post-action evidence an agent needs for its next decision.
tags: [tool-use, agents, computer-use, context-engineering, token-efficiency]
timestamp: 2026-07-13T16:13:34Z
---

# Action-Observation Fusion

Action-observation fusion makes a command return both the completed operation and a bounded view of its postcondition. Instead of making an agent invoke navigation, wait, snapshot, and filtering separately, one operation can navigate and return a targeted snapshot, or submit a form and return the resulting state.

## Why It Helps

The agent does not need to spend a separate turn asking whether the action took effect, reconstruct state from a generic acknowledgement, or receive an unrelated full snapshot. The response becomes evidence for the next decision, reducing the opportunity for tool-name guesses, redundant waits, and context-heavy scans.

## Practical Use

Fuse operations that are routinely consecutive and have a clear success condition: create-and-return, navigate-and-inspect, mutate-and-read-back, or query-and-project. Provide a query or field projection so the observation is decision-relevant. Return structured postconditions and clear failures, and keep lower-level operations available when a workflow genuinely needs intermediate control.

## Limitations

Compound commands can obscure partial failure, impose unnecessary work on simple tasks, or make retries unsafe. Define idempotency and per-stage error reporting, cap default observation size, and do not combine steps whose independent inspection is a meaningful safety or approval boundary.

## Sources

- [AXI: Agent eXperience Interface dossier](/dossiers/axi-agent-experience-interface.md) — documents combined browser commands such as navigate-plus-snapshot and fill-submit-wait-snapshot, with trajectory-level comparisons.
