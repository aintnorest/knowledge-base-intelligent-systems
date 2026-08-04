---
type: Synthesis
title: ReAct Framework
description: Agent-control pattern that interleaves decision-relevant reasoning, bounded actions, and observations to ground tool use and maintain a revisable task state.
tags: [agents, tool-use, reasoning, prompting]
timestamp: 2026-07-13T00:05:37Z
---

# ReAct Framework

A control pattern that interleaves **reasoning**, **acting**, and **observations** so an LLM can maintain a revisable plan while gathering evidence or changing an external environment.

## The Problem

- **Reasoning-only** (CoT): The model can structure an answer but cannot check current facts or change the environment. It may confidently build on hallucinated premises.
- **Action-only**: The model can call tools but lacks explicit state for interpreting results, tracking completed subgoals, and deciding how to recover from a failed action.

## How ReAct Works

ReAct interleaves three types of steps in a single trajectory:

1. **Thought** — State only the decision-relevant interpretation: missing evidence, current subgoal, completed work, or a justified next action.
2. **Action** — Execute one bounded operation, such as a database query, calculator call, browser interaction, or environment command.
3. **Observation** — Record the tool result or state transition; use it as evidence for the next thought.

```
Thought 1: I need to check the places where I last used the key.
Action 1: Check the entryway.
Observation 1: Did not find the key.
Thought 2: The key is not in the entryway. Next step is to check the kitchen.
Action 2: Check the kitchen.
Observation 2: Found the key on the kitchen table.
```

For knowledge tasks, thoughts can be dense because each tool result needs interpretation and may require a query reformulation. For long action sequences, thoughts should be sparse: use them to decompose a goal, choose an exploration strategy, confirm a subgoal, or revise the plan. Narrating every step spends context without necessarily improving control.

## Operating Rules

1. Give the agent a narrow, typed action space and validate tool arguments before execution.
2. Require observations to be reflected in the next thought; do not let a plan silently outrun new evidence.
3. Add an explicit stopping, retry, or fallback rule. For example, switch to an internal self-consistency answer when retrieval cannot resolve a question, or switch to retrieval when internal candidates disagree.
4. Bound action count, cost, scope, and permissions. ReAct can otherwise loop or turn a weak search hypothesis into repeated side effects.
5. Treat thoughts as inspectable working state, not as proof of latent reasoning. Check the cited observation before relying on a consequential conclusion.

## Why It Matters

ReAct is useful when solving a task requires both plan maintenance and environment feedback. It is particularly effective for:
- Web navigation (reasoning + browser actions)
- Multi-hop question answering and fact verification (reasoning + retrieval)
- Data operations with clear read-only or reversible tool calls
- Constrained interactive workflows where an operator can inspect and correct the task state

## Limitations

Grounding is not a cure-all. ReAct can choose weak searches, misread an observation, repeat a trajectory, or over-trust stale and adversarial tool output. It also adds latency and context use. For external side effects, pair it with permission-scoped tools, action confirmation, budget limits, and a recovery policy rather than relying on the thought trace alone.

## Comparison with ART

| Framework | Focus | Tool Integration |
|-----------|-------|------------------|
| **ART** | Automatic CoT + tool use | Pre-defined tool sequences |
| **ReAct** | Reasoning + acting loop | Dynamic tool selection based on reasoning |

## Sources

- [Prompt Engineering Survey dossier](/dossiers/prompt-engineering-survey.md) — Yao et al. (2023)
- [ReAct: Synergizing Reasoning and Acting in Language Models dossier](/dossiers/react-synergizing-reasoning-and-acting.md) — primary ICLR 2023 source; establishes sparse versus dense reasoning, benchmark evidence, and retrieval/looping tradeoffs.
