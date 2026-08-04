---
type: Synthesis
title: Query-Class Retrieval Routing
description: Selecting graph traversal, text search, source reads, or semantic retrieval by the evidence a question requires, with an explicit fallback when the first retrieval mode is incomplete.
tags: [retrieval, routing, coding-agents, knowledge-graphs, context-engineering, agents]
timestamp: 2026-07-14T15:58:59Z
---

# Query-Class Retrieval Routing

Query-class retrieval routing chooses a retrieval path from the form of evidence needed, rather than sending every request to one preferred index. A caller path and a code-body explanation are both repository questions, but the former is naturally graph-shaped while the latter usually needs source text. The routing policy should make that distinction and preserve escalation paths.

## Routing Contract

1. Classify the request provisionally: exact identifier lookup, structural relationship, semantic discovery, implementation detail, exhaustive text search, or runtime evidence.
2. Use the lowest-cost retrieval that can supply the needed evidence: exact/sparse search for names, graph traversal for typed relations, semantic retrieval for concept similarity, and source or trace inspection for implementation and behavior.
3. Return coverage, confidence, and enough provenance for the agent to judge whether the first answer is sufficient.
4. Escalate deterministically when a result is empty, low-confidence, truncated, stale, or incompatible with the requested evidence type.
5. Learn from resolved tasks: track initial route, fallback route, task success, tool calls, tokens, latency, and the failure class that triggered escalation.

## Why It Helps

A graph can answer a dependency chain without loading many files, while raw source preserves local control flow and details a graph intentionally discards. Similarly, exact names favor sparse lookup and paraphrased concepts favor semantic retrieval. Matching the interface to the query reduces needless observations without forcing the agent to trust an incomplete abstraction.

## Practical Use

- Express route selection as a small policy with observable reasons, not a hidden model preference.
- Treat graph freshness, parser support, resolution confidence, and query-result limits as routing inputs.
- Require source confirmation for changes, security-sensitive claims, or decisions whose evidence must include implementation details.
- Test counterexamples: macros and generated code for graphs, synonym-heavy requests for sparse search, and cross-file relations for file-only navigation.

## Limitations

- Natural-language requests often mix classes; routing is a hypothesis, not an oracle.
- More retrievers and fallbacks add latency, operational complexity, and opportunities for inconsistent evidence.
- A low-cost route may look complete while silently omitting unsupported language features or stale state. Surface those boundaries instead of inferring success from a nonempty result.

## Sources

- [Codebase-Memory dossier](/dossiers/codebase-memory-tree-sitter-knowledge-graphs.md) — contrasts graph advantages for caller ranking and hubs with explorer advantages for source context and exhaustive grep.
- [File-Native Context Retrieval](/vault/file-native-context-retrieval.md) — establishes tool-mediated, task-relevant retrieval as a model- and interface-dependent choice.
- [Hybrid Memory Retrieval Pipeline](/vault/hybrid-memory-retrieval-pipeline.md) — describes sparse, dense, and graph retrieval as complementary stages with explicit filtering and provenance.
