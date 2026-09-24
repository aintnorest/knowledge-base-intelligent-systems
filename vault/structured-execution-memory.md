---
type: Synthesis
title: Structured Execution Memory
description: Maintaining live task state in separate status, knowledge, and procedural memory fields so long-horizon agents can preserve constraints and attempts.
tags: [agent-memory, context-engineering, tool-use, long-horizon, agents]
timestamp: 2026-07-12T21:18:44Z
---

# Structured Execution Memory

A memory-bank design for long-horizon agents that separates live execution state into distinct kinds of records instead of flattening the trajectory into a generic summary.

## The Structure

Three fields are especially useful:

- **Private status**: progress, unresolved risks, and open issues used by the memory agent but not shown directly to the action agent.
- **Knowledge memory**: stable facts such as requirements, verified user or tool facts, file paths, configuration details, environment properties, and policy constraints.
- **Procedural memory**: attempts and outcomes, including failed commands, successful fixes, ruled-out hypotheses, error patterns, and diagnostic observations.

## Why The Separation Helps

Stable facts and procedural evidence should not be treated the same way. A task requirement may need to constrain every future decision. A failed command is useful mainly when the agent is about to retry a similar path. A private status item may help the memory agent reason about risk without polluting the action agent's context.

Structured memory also makes update operations more explicit. Entries can have identifiers and metadata, making it possible to patch stale records or delete incorrect ones rather than rewriting the whole memory.

## Practical Use

Use structured execution memory when an agent works over many tool calls, partial observations, and debugging loops. It is most useful when the task has requirements that must persist, environment facts discovered during execution, and many possible retries or branches.

## Notes, Compaction, and Delegation Are Different Boundaries

For long coding tasks, a compacted conversation, external structured notes, and a subagent's isolated research window are different things. Anthropic describes to-do and NOTES.md-style records that are reloaded after resets, and specialized workers that explore tens of thousands of tokens and return a roughly 1,000–2,000-token synthesis. The lead agent should keep task contracts, unresolved constraints, evidence locators and verification state explicitly, rather than trusting a fluent summary to carry every detail. The post gives examples, not a controlled comparison.

## Limitations

The bank still needs a policy for what to write, when to update, and when to expose records. A structured store alone can become passive clutter if it is not paired with retrieval or intervention discipline.

## Sources

- [Remember When It Matters dossier](/dossiers/proactive-memory-agent.md) - describes a memory bank with private status, knowledge entries, and procedural entries managed through explicit update/delete calls.
- [Effective context engineering for AI agents dossier](/dossiers/effective-context-engineering-ai-agents.md) — compaction, persistent notes, and subagent contexts contrasted for long-horizon work.
