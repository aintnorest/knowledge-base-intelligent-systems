---
type: Synthesis
title: Structural Code Retrieval
description: Answering recurrent repository-structure questions from a persistent, typed code graph, while retaining source retrieval for details the graph cannot faithfully represent.
tags: [coding-agents, retrieval, knowledge-graphs, mcp, token-efficiency]
timestamp: 2026-07-14T15:58:59Z
---

# Structural Code Retrieval

Structural code retrieval represents a repository as typed entities and relationships—definitions, imports, call sites, types, tests, routes, and ownership—so an agent can answer relationship questions by traversing an index rather than reconstructing the topology from raw files on every task.

## The Pattern

1. Identify the structural questions that recur in the workload: callers, dependency chains, hub functions, ownership boundaries, or likely change impact.
2. Extract only relationships that can be maintained with a stated coverage and confidence model; record the language, resolver, and freshness state alongside the graph.
3. Materialize a persistent, queryable index and offer typed operations for common traversals before exposing a lower-level graph query escape hatch.
4. Refresh changed files incrementally, but retain a complete rebuild path and tests that detect stale or dangling edges.
5. Return compact, provenance-bearing results: the path, edge types, resolution confidence, source locations, and any truncation or coverage limits.
6. Route to source search or file reads when the answer depends on bodies, macros, generated code, runtime behavior, or exhaustive textual matching.

## Why It Helps

File search makes an agent rediscover a graph serially: find a symbol, read context, infer a relation, then repeat. A maintained index amortizes that reconstruction and can bound the number of tool calls and tokens for relational questions. It also makes an agent's structural assumptions inspectable as explicit paths rather than hidden in a prose summary.

## Practical Use

- Start with a narrow schema and the queries shown in real coding-agent traces; do not build a maximal program-analysis platform before proving a question class benefits.
- Make resolution strategy and confidence visible. Exact import or type resolution, unique-name matching, and fuzzy matching are materially different evidence.
- Evaluate end-to-end task quality, graph coverage, stale-index failures, build and refresh time, tokens, tool calls, and latency across the deployed languages and repositories.
- Preserve direct source retrieval. A graph can identify where to look even when it cannot answer the final question.

## Limitations

- Static graphs omit or approximate macros, reflection, dynamic dispatch, generated code, runtime configuration, and behavior across process boundaries.
- Index construction and invalidation can cost more than repeated exploration for one-off or rapidly changing repositories.
- A graph path is not automatically a correct impact analysis: it may be incomplete, stale, or based on a low-confidence edge.
- Typed tools can narrow an agent's exploration too aggressively; provide a bounded general query and source-level fallback.

## Sources

- [Codebase-Memory dossier](/dossiers/codebase-memory-tree-sitter-knowledge-graphs.md) — evaluates a Tree-Sitter/SQLite graph exposed through MCP; reports lower token and tool use for structural questions, alongside source-level and macro-related limitations.
