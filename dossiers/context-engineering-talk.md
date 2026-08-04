---
type: Study Note
title: Mergeable by Default
description: Personal study notes on Peter Werry's talk about building a context engine for coding agents, organizational memory, conflict handling, and token-efficient task execution.
resource: https://www.youtube.com/watch?v=5ID22ACI7IM
source: /archive/context-engineering-talk.md
tags: [context-engineering, coding-agents, retrieval, agents, access-control]
timestamp: 2026-07-12T21:27:50Z
---

# Mergeable by Default - Study Notes

**Speaker**: Peter Werry, Unblocked  
**Venue**: YouTube talk / transcript notes  
**Date**: May 3, 2026  
**Source**: "Mergeable by default: Building the context engine to save time and tokens"

## What It Is

This talk frames context engineering as the system layer that gives coding agents the organizational context they need, without flooding them with irrelevant material. The core claim is that model intelligence is improving quickly, but agents still fail when they lack the historical, social, and operational context that experienced engineers use implicitly.

The useful target is not just "more retrieval." It is a context engine that can combine code, docs, tickets, PRs, conversations, incidents, expert knowledge, and permissions into task-specific guidance.

## The Problem It Solves

The talk argues that code and documentation are only the visible part of engineering work. The hidden context includes:

- Original user intent.
- Prior rejected approaches.
- Past failures and incidents.
- Compatibility or operational reasons behind current code.
- Deleted history and decision sequences.
- Team norms and expert judgment.

Without that context, an agent may produce code that compiles but is wrong for the organization. The speaker's standard is code that feels like it was written by someone who has been on the team for years.

## Three Anti-Patterns

The talk pushes against three common shortcuts:

1. **Naive RAG over docs** - vector search over docs misses conflicts, stale material, social context, and information living outside formal documentation.
2. **MCP access as understanding** - tool access lets an agent search more places, but it does not teach the agent which source should dominate or why older implementations exist.
3. **Bigger context windows as a cure-all** - large windows help when the needed item is already known, but they do not solve truth selection, conflict handling, prioritization, or governance.

The recurring theme is that access is not the same thing as understanding.

## Key Concepts

### Satisfaction of Search

The talk borrows the radiology idea of satisfaction of search: once someone finds an apparent explanation, they may stop looking. For agents, this means a plausible code path or doc can prematurely end the search, even when the real answer lives in incidents, Slack threads, rejected PRs, or decision history.

This is a useful failure mode because it explains why "let the agent search more" can still fail. The search policy needs to know when an explanation is only locally plausible.

### Conflict-Aware Retrieval

The speaker treats conflicts as central rather than exceptional. Recency bias and "trust main branch" heuristics were both insufficient: new information can be wrong, and current code can reflect old constraints rather than the desired future direction.

A stronger context engine ranks evidence, reasons about likely truth, and surfaces unresolved conflicts when it cannot confidently deconflict them.

### Expert Modeling

The talk emphasizes modeling experts, not only documents. PRs, reviews, and contribution patterns can identify who works with whom, which teams own which areas, and whose judgment should influence retrieval or memory weighting for a task.

That expert graph becomes a retrieval primitive. Instead of treating all semantically related artifacts equally, the engine can bias toward material connected to the user's team, repositories, and likely domain experts.

### Permission-Scoped Synthesis

Permissions matter at both retrieval and synthesis time. The Slack example is concrete: private-channel information can influence answers only for users who have access, and unrestricted summarization across private and public sources can leak sensitive information.

The architectural implication is that the synthesis layer itself may need compartmentalization, not just the connectors.

## Architecture Implied by the Talk

The context engine is a layered system:

- Semantic retrieval for code, docs, tickets, and conversations.
- Procedural or graph-style relationship building across people, teams, repos, PRs, and decisions.
- Ingestion-time distillation of repeated review patterns, team practices, and useful memories.
- Runtime judging to re-rank evidence and handle conflicts for the current task.
- Human feedback loops that turn corrections into structured memory.

The important point is that context engineering is not a choice between RAG, graphs, memory, and judges. The talk argues for combining them at different stages.

## Results and Claims

The talk includes a directional performance example: a larger implementation task took about two and a half hours and 21 million tokens without the context engine, versus about 25 minutes and 10 million tokens with it.

The speaker cautions that some benchmark numbers were rough. The more durable claim is qualitative: better context reduces wrong loops. Token savings come not only from smaller prompts, but from fewer bad attempts, fewer corrections, and less output waste.

## My Takeaways

1. **Context quality is becoming the bottleneck.** Stronger models still need organization-specific judgment. The system has to reconstruct why the code is the way it is, not only retrieve matching files.

2. **Conflict handling should be explicit.** A context engine that silently resolves contradictions with recency or source-type heuristics will eventually give confident wrong guidance.

3. **Expert identity is useful metadata.** Ownership, reviewer history, and team relationships can shape retrieval more intelligently than text similarity alone.

4. **Governance belongs inside synthesis.** It is not enough to filter retrieved documents. Summaries, memories, and cross-source conclusions must preserve permission boundaries.

5. **Planning is the highest-leverage point.** The talk's best use cases are planning, review, ticket enrichment, triage, incident response, and support. These are exactly the moments where rationale matters more than raw generation.

## What I Would Question

- The source is a talk/transcript note rather than a formal paper, so the empirical claims should be treated as directional.
- Expert-weighted retrieval can encode organizational bias if stale ownership or loud reviewers dominate the graph.
- Permission-scoped synthesis is easy to state but hard to implement when memories are distilled from mixed-access evidence.
- The talk does not specify enough evaluation detail to separate retrieval gains from product/workflow effects.

## Vault Ideas Extracted

* [Conflict-Aware Context Retrieval](/vault/conflict-aware-context-retrieval.md)
* [Expert-Weighted Retrieval](/vault/expert-weighted-retrieval.md)
* [Permission-Scoped Synthesis](/vault/permission-scoped-synthesis.md)
