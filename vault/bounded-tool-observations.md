---
type: Synthesis
title: Bounded Tool Observations
description: Giving agents compact, unambiguous tool results by default while preserving explicit paths to retrieve detail, so observation cost does not grow with raw response size.
tags: [tool-use, token-efficiency, context-engineering, agents]
timestamp: 2026-07-13T16:13:34Z
---

# Bounded Tool Observations

A tool result should be sufficient for the next decision without being a dump of every available field or document. Bounded tool observations use a small default projection, explicit counts and empty states, truncation notices, and an intentional expansion mechanism such as field selection, a query filter, pagination, or `--full`.

## The Pattern

- Use a concise, stable representation that remains unambiguous to the model.
- Return the few fields that identify an item and its immediate decision state.
- Include total counts and derived status when they eliminate a follow-up query.
- Mark truncation with the original size and a precise way to retrieve the complete content.
- Distinguish a successful empty result from an error; report errors in a structured form.

## Practical Use

Start from actual agent traces. If an agent repeatedly scans long results for one field, asks whether a list is complete, or confuses silence with success, add the missing bound or signal. Make expansion opt-in so simple tasks remain cheap, but preserve enough identifiers and continuation hints for the agent to request detail safely.

## Limitations

Overly aggressive defaults can conceal the one field that matters and force extra calls. Bounds should be chosen and evaluated by task class, with reliable expansion paths and tests for zero results, large records, pagination, and error recovery.

## Sources

- [AXI: Agent eXperience Interface dossier](/dossiers/axi-agent-experience-interface.md) — groups token-efficient notation, small default schemas, truncation, pre-computed aggregates, definitive empty states, and contextual filtering into an agent-interface framework.
