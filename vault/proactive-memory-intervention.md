---
type: Synthesis
title: Proactive Memory Intervention
description: Agent-memory pattern where a separate memory policy decides whether remembered execution state should enter the next action context.
tags: [agent-memory, context-engineering, long-horizon, agents]
timestamp: 2026-07-12T21:18:44Z
---

# Proactive Memory Intervention

A memory architecture where remembered state is not passively retrieved on demand, but actively considered as an intervention before the next agent action.

## The Pattern

A memory agent runs beside an action agent. At a memory step, it:

1. Observes the task, recent trajectory, and current memory bank.
2. Updates structured memory.
3. Chooses either a concise memory-grounded reminder or a null intervention.
4. Injects the reminder into the next action-agent call only when it is likely to change the decision.

The action agent itself can remain unchanged.

## Why It Matters

Naive memory systems often optimize recall: store relevant records and retrieve likely matches. Long-horizon execution also needs timing. The useful question is whether a memory item should become active now, before the next command, tool call, or user response.

## Good Interventions

- Reactivate a hard requirement just before it is about to be violated.
- Surface an environment fact that explains the current observation.
- Warn against retrying a previously failed path.
- Carry forward a diagnosis that still constrains the fix.
- Point to an open subgoal that the agent is drifting away from.

## Bad Interventions

- Broad strategic advice not grounded in memory.
- Repeating information already salient in the current observation.
- Always injecting the entire memory bank.
- Speculative reminders stated as facts.

## Sources

- [Remember When It Matters dossier](/dossiers/proactive-memory-agent.md) - shows that selective memory intervention improves pass@1 and is more balanced than passive full-bank exposure, always-on reminders, generic advisor guidance, or Mem0-style retrieval.
