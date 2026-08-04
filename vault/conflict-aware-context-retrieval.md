---
type: Synthesis
title: Conflict-Aware Context Retrieval
description: Retrieval pattern where the system detects conflicting evidence, ranks likely truth, and surfaces unresolved conflicts instead of hiding them behind naive heuristics.
tags: [context-engineering, retrieval, coding-agents, agents]
timestamp: 2026-07-12T21:27:50Z
---

# Conflict-Aware Context Retrieval

A context-engineering pattern where retrieval is responsible not only for finding relevant evidence, but also for noticing when relevant sources disagree.

## The Pattern

The system retrieves candidate evidence from code, docs, tickets, reviews, conversations, incidents, and other organizational sources. It then:

1. Detects contradictions or incompatible recommendations.
2. Ranks evidence by task relevance, source quality, ownership, recency, and operational authority.
3. Applies task-specific judging rather than a fixed global heuristic.
4. Surfaces unresolved conflicts when confidence is too low.

The output should preserve uncertainty instead of flattening disagreement into a single unsupported answer.

## Why It Matters

Simple retrieval assumes that relevant evidence is additive. In real engineering organizations, relevant evidence often conflicts: docs lag behind code, current code preserves old constraints, newer plans may not be implemented, and private conversations can contradict public issue descriptions.

Naive shortcuts such as "prefer the newest source" or "prefer main branch code" fail because the right source depends on the task.

## Practical Use

Use conflict-aware retrieval when an agent needs organizational judgment, not just API syntax:

- Planning implementation work from ambiguous tickets.
- Explaining why a system behaves the way it does.
- Reviewing code against team norms.
- Triage and incident response.
- Migrating behavior where current code and future direction differ.

## Limitations

Conflict detection can be noisy, and surfacing every disagreement creates overload. The system needs thresholds for when to resolve, when to ask a human, and when to carry uncertainty into the next step.

## Sources

- [Mergeable by Default dossier](/dossiers/context-engineering-talk.md) - argues that recency bias and main-branch bias were insufficient, and that context engines should rank evidence and surface unresolved conflicts.
