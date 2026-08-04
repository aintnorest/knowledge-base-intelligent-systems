---
type: Synthesis
title: Expert-Weighted Retrieval
description: Retrieval pattern that uses ownership, review history, team relationships, and contributor expertise as ranking signals for task-specific context.
tags: [retrieval, context-engineering, coding-agents, agents]
timestamp: 2026-07-12T21:27:50Z
---

# Expert-Weighted Retrieval

A retrieval pattern where people and teams are first-class context signals. Instead of ranking evidence only by semantic similarity, the system also asks which experts, reviewers, repositories, and teams are most relevant to the task.

## The Pattern

Build an organizational graph from artifacts such as pull requests, reviews, comments, ownership data, tickets, incidents, and team membership. Use that graph to bias retrieval toward:

- Repositories the requester or team commonly works in.
- Reviewers who repeatedly shape code in the relevant area.
- Contributors with recent or durable ownership.
- Decisions and comments from people who are authoritative for the subsystem.
- Prior work connected to similar tasks or failure modes.

The expert graph is not only for routing questions to humans. It can weight which memories and documents should enter an agent's context.

## Why It Matters

Text similarity treats two matching documents as roughly comparable. Engineering context often depends on social authority and lived ownership: a stale design doc, a recent comment from a maintainer, and current code may all be relevant but not equally trustworthy.

Expert-weighted retrieval helps an agent load the context an experienced teammate would naturally privilege.

## Practical Use

- Codebase onboarding and area-specific task planning.
- Pull-request review against local norms.
- Ticket enrichment for teams with many repositories.
- Incident response where historical owners know why behavior exists.
- Selecting which prior examples should become few-shot or memory context.

## Limitations

Expert graphs can become stale, encode popularity rather than correctness, and overfit to visible contributors. They need decay, correction, and conflict handling so old ownership does not dominate future direction.

## Sources

- [Mergeable by Default dossier](/dossiers/context-engineering-talk.md) - describes using PRs and reviews to build a social graph that identifies experts and weights retrieval toward relevant teams, repos, and contributors.
