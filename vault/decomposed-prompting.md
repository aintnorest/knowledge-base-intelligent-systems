---
type: Synthesis
title: Decomposed Prompting
description: A modular approach to complex tasks where a decomposer LLM breaks problems into sub-queries handled by specialized sub-task handlers, coordinated by a controller.
tags: [decomposition, prompting, orchestration]
timestamp: 2026-07-11T16:36:00Z
---

# Decomposed Prompting

A modular prompting architecture for solving complex tasks by breaking them into simpler sub-tasks, each handled by a specialized handler, coordinated by a high-level controller.

## Architecture Components

1. **Decomposer LLM** — Generates a structured prompting program (a sequence of sub-queries) for a complex task.
2. **Prompting Program** — A sequence of steps, each directing a sub-query to a specific sub-task handler.
3. **Sub-task Handlers** — Specialized modules or functions that handle specific types of sub-tasks (e.g., text splitting, information extraction, string concatenation, arithmetic). These can be additional LLM prompts, symbolic functions, or learned models.
4. **Controller** — Manages execution flow: task scheduling, data transfer between handlers, and status tracking.

## Advantages

- **Modularity** — Each handler can be independently optimized, debugged, and upgraded.
- **Error correction** — Error-correcting handlers can be incorporated to improve overall reliability.
- **Diverse decomposition** — Supports hierarchical and recursive decompositions, not just linear sequences.
- **Reusability** — Sub-task handlers can be shared across different tasks.

## Comparison with Least-to-Most

| Aspect | Least-to-Most | DECOMP |
|--------|---------------|--------|
| Decomposition | Linear: easy → hard sub-questions | Non-linear and recursive |
| Handlers | Generic model | Specialized, replaceable handlers |
| Error correction | Limited | Built-in error-correcting mechanisms |
| Flexibility | Fixed progression | Dynamic, adaptable to task structure |

## Sources

- [Prompt Engineering Survey dossier](/dossiers/prompt-engineering-survey.md) — Khot et al. (2022)
