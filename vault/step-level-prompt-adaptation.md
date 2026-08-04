---
type: Synthesis
title: Step-Level Prompt Adaptation
description: Revising an agent's operating guidance at an observable action boundary so a grounded lesson can influence later steps within the same task.
tags: [self-improvement, agents, prompt-optimization, tool-use]
timestamp: 2026-07-13T18:06:35Z
---

# Step-Level Prompt Adaptation

Step-level prompt adaptation is an online control pattern for an agent that repeatedly acts in an environment. Rather than wait for a task to end, the system inspects an action-observation boundary—such as a tool error, a completed subtask, or a test result—and may add a narrowly scoped operational rule before the next action.

## The Pattern

1. Record the action, observation, current prompt version, and task state.
2. Admit an update only from a defined signal, such as an executable error, a test result, or a reviewed trace; distinguish failure correction from an alleged opportunity to improve.
3. Convert the signal into a small, testable instruction and check it for duplication and scope.
4. Apply the rule to a later action in the current task, with a versioned rollback path.
5. Evaluate both the immediate recovery and the task outcome; retain or promote the rule only with evidence appropriate to its scope.

## Practical Use

Use it for agents that have genuine repeated action boundaries and feedback that can identify a concrete procedural error: tool schemas, tests, parsers, browser blocks, or validated retrieval results. It is especially useful when a one-time failure would otherwise trigger multiple near-identical retries.

Keep the update concise and observable. “Use the valid argument list reported by this API error” is actionable; “be more careful” is neither a policy nor a diagnosis. Preserve the triggering trace and the previous prompt so operators can audit whether the update improved behavior or merely changed it.

## Limitations

- A step boundary is not proof that the diagnosis is correct. LLM reflections and outcome-only judges can create a fast loop for installing plausible but harmful rules.
- Frequent prompt mutation complicates reproducibility, cache behavior, evaluation, and security review. Version every update and restrict who or what can promote a rule beyond the current task.
- Some tasks have no reliable mid-task success signal, and some errors are environmental rather than procedural. In those cases, defer adaptation or use a human/verified gate.

## Sources

- [SCOPE: Prompt Evolution for Enhancing Agent Effectiveness dossier](/dossiers/scope-prompt-evolution-agent-effectiveness.md) — proposes guideline synthesis and prompt updates after errors or completed subtasks; reports that this permits mid-task correction in its evaluated agents.
