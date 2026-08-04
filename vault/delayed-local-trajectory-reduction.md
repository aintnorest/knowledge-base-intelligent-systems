---
type: Synthesis
title: Delayed Local Trajectory Reduction
description: Reducing an agent's accumulated context by selectively rewriting one older, high-cost interaction step with bounded neighboring context, instead of compacting the whole trajectory.
tags: [compaction, token-efficiency, agent-memory, agents, coding-agents]
timestamp: 2026-07-14T15:00:00Z
---

# Delayed Local Trajectory Reduction

Long-running tool agents repeatedly pay for old observations because every retained step becomes input to later model calls. Delayed local trajectory reduction removes that repeated burden by assigning a separate reducer to one older, unusually long step at a time. The reducer replaces disposable detail with a task-relevant takeaway rather than rewriting the entire history.

## Operating Pattern

1. Append the latest action and observation normally.
2. Select a target step that is a fixed number of turns behind the current one; never compact the newest evidence.
3. Give a low-cost reducer a bounded window around that target so it can distinguish still-useful detail from completed exploration, duplication, or verbose output.
4. Skip targets below a minimum size, and apply a rewrite only when the saved tokens exceed a defined threshold.
5. Measure task success, recovery steps, accumulated input tokens, cache effects, reflector overhead, and latency against the unmodified agent.

## Practical Use

This is useful when traces contain large tool responses, repeated edit payloads, or exploratory work that continues to inflate every later prompt. Keep the reducer outside the task agent's normal instruction flow so the scheduling policy is explicit and the primary agent remains focused on the task. Use a cheaper model only after checking whether its omissions create more recovery work than they save.

The delay and local window are safeguards, not mere tuning knobs: the delay lets subsequent events reveal whether a step became obsolete, while avoiding modification of the live working state. Locality also caps reducer cost and restricts cache invalidation to the affected suffix.

## Limitations

This is a lossy context policy. A reducer can omit a detail that becomes relevant later, and a high compression ratio alone says nothing about end-task reliability. It may add latency and can be a poor fit for tasks requiring exact historical recall, irreversible external actions, or an archival evidence trail unless an expansion or retrieval path remains available. Thresholds, delay, window size, model choice, and tool conventions must be calibrated on representative traces.

## Sources

- [Reducing Cost of LLM Agents with Trajectory Reduction dossier](/dossiers/reducing-cost-of-llm-agents-trajectory-reduction.md) — AgentDiet evaluates delayed, sliding-window LLM reduction of coding-agent steps and reports cost and success trade-offs.
