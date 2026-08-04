---
type: Synthesis
title: Configuration-Aware Multi-Agent Prompt Optimization
description: Treating the joint prompts of a multi-agent system as configuration-dependent parameters that must be optimized and validated against the deployed task, graph, protocol, aggregation, and team size.
tags: [multi-agent, prompt-optimization, agents, evaluation]
timestamp: 2026-07-13T18:01:03Z
---

# Configuration-Aware Multi-Agent Prompt Optimization

In a multi-agent system, a prompt is not an isolated text artifact. Its effect depends on the task and metric, agent graph, message protocol, aggregation rule, model, tools, and team size. Optimize and validate the *joint prompt configuration* under that fixed system rather than transferring a prompt win from a single agent or another topology.

## The Pattern

1. Version the full execution configuration: prompts, agent roles, topology, message schema, tools, model and decoding settings, aggregation rule, and metric.
2. Establish a seed-system baseline on held-out cases before search.
3. Revise one prompt-bearing component or a deliberately defined joint set, while retaining the surrounding configuration and traces needed to attribute the change.
4. Use team-level outcomes and relevant local evidence to select candidates; require a validation improvement over the seed before deployment.
5. Re-evaluate the selected configuration on cases excluded from search, and retain the seed as a rollback option.
6. Slice results by task type, topology, protocol, and team size. A positive global average can conceal a serious regression in a deployment-relevant slice.

For non-terminal agents, add a downstream check between local role adherence and the final task metric. A candidate can make an agent appear more compliant while leaving its immediate consumer worse off. Preserve those local-success/global-failure traces as diagnostic cases, and refresh candidate scores when changing peer prompts shifts the messages the candidate will receive.

When the topology itself remains open, do not search prompts and structure as if they were independent. A practical staged approach is to first fit prompts for a base agent and small candidate blocks, use those measured results to focus the structural search, then refit prompts for the selected full workflow. The resulting topology is still configuration-specific and needs a final held-out comparison.

## Why It Matters

Agent prompts interact through messages and aggregation. An instruction that makes one worker more verbose, cautious, or specialized can improve a sequential handoff yet interfere with majority voting or overload a coordinator. More agents create more of these dependencies. Final-score optimization without configuration awareness can therefore find local improvements that do not survive the full workflow.

## Practical Use

- Start with a small, stable agent graph and an executable, task-aligned metric; introduce prompt search only after the system's interfaces are observable.
- Use trace review and component checks alongside the final metric when grounding, tool safety, latency, or cost matter.
- Select prompts conservatively and run repeated evaluations when sampling or external tools make outcomes variable.
- Treat any topology, protocol, team-size, model, or aggregation change as a new optimization context; do not assume the prior winner transfers.

## Limitations

- A final task metric can reward unsafe or unfaithful intermediate behavior, so it is not enough for high-stakes systems.
- Small validation sets and repeated search can still overfit configuration-specific noise.
- Optimizing one agent at a time makes the search tractable but may miss beneficial joint changes; jointly optimizing everything becomes expensive quickly.

## Sources

- [MAS-PromptBench dossier](/dossiers/mas-promptbench.md) — evaluates MAS-GEPA and MAS-MIPRO across task, topology, protocol, and team-size configurations; reports both gains up to 24 points and regressions down to 16 points.
- [DSPy dossier](/dossiers/dspy-compiling-declarative-language-model-calls.md) — frames multi-stage LM programs, their traces, and end-to-end metrics as an optimization unit, while cautioning that the metric must encode relevant constraints.
- [MASPO: Joint Prompt Optimization for LLM-based Multi-Agent Systems dossier](/dossiers/maspo-joint-prompt-optimization.md) — adds direct-successor lookahead to local and final evaluation, mines local-global misalignment cases, and refreshes beam scores after peer prompts change.
- [Multi-Agent Design: Optimizing Agents with Better Prompts and Topologies dossier](/dossiers/multi-agent-design-prompts-topologies.md) — stages block-level prompt optimization, influence-weighted topology search, and workflow-level prompt adaptation in Mass.
