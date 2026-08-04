---
type: Study Note
title: Codebase-Memory: Tree-Sitter-Based Knowledge Graphs for LLM Code Exploration via MCP
description: Personal study notes on a Tree-Sitter code graph exposed through MCP for structural code exploration, with incremental synchronization, hybrid graph-and-source retrieval, and an unusually extensive MCP-server release-verification proposal.
resource: https://arxiv.org/abs/2603.27277v1
source: /archive/codebase-memory-tree-sitter-knowledge-graphs.pdf
tags: [coding-agents, knowledge-graphs, retrieval, mcp, token-efficiency, agents]
timestamp: 2026-07-14T15:58:59Z
---

# Codebase-Memory — Study Notes

**Authors**: Martin Vogel, Falk Meyer-Eschenbach, Severin Kohler, Elias Grünewald, and Felix Balzer
**Venue**: arXiv:2603.27277v1 [cs.SE]
**Date**: March 28, 2026
**Pages**: 10
**Code/data claimed by paper**: https://github.com/DeusData/codebase-memory-mcp (evaluated release v0.5.5)

## What It Is

Codebase-Memory is an open-source proposal and implementation for giving an LLM coding agent a persistent structural representation of a repository instead of requiring it to rediscover that structure through repeated file reads and text search. It parses 66 languages with Tree-Sitter, materializes a property graph in SQLite, and exposes 14 typed MCP tools for indexing, search, graph traversal, impact analysis, source retrieval, and architecture summaries.

The system is deliberately positioned as a retrieval-layer complement to an agent, not as a replacement for source inspection. Its practical claim is that precomputed relationships make questions about callers, dependencies, hubs, and impact much cheaper to answer, while source-level questions still need a file-reading path.

## The Problem It Addresses

Code agents are often asked structural questions—what calls a function, which components depend on a module, what a change might affect—but their usual primitives are textual: list directories, grep names, read files, and repeat. That trajectory can use many calls and large context windows before the agent reconstructs a relationship that a compiler or static-analysis index could have stored directly.

Conventional code-property graphs and CodeQL provide rich analysis, but the authors characterize them as infrastructure- and query-language-heavy for an agent tool. The design target here is a lightweight, persistent, MCP-native interface: a single statically linked C binary, one SQLite file, no embedding model or external graph database, and incremental refresh as the working tree changes.

## How the System Works

1. **Parse and extract structure.** Tree-Sitter walks source files to collect projects, folders, files, modules, definitions, call sites, imports, references, types, decorators, and selected framework routes. The graph uses typed nodes and relationships such as `CALLS`, `IMPORTS`, `IMPLEMENTS`, `INHERITS`, `USES_TYPE`, `TESTS`, and `MEMBER_OF`.
2. **Resolve relationships in stages.** A function registry supports a six-step call-resolution cascade: import-map match, import-map suffix, same module, globally unique name, suffix match, and fuzzy fallback. The paper assigns decreasing confidence to these strategies. Separate type-resolution passes for Go, C, and C++ address receivers, pointers, namespaces, and related cases that string-level matching handles poorly.
3. **Build efficiently, then enrich.** A six-phase pipeline discovers structure, extracts definitions and relationships in parallel worker buffers, adds tests/routes/configuration/git co-change links, bulk flushes to SQLite, then calculates communities and file hashes. Louvain community detection groups call-graph regions for architecture summaries.
4. **Serve typed structural tools.** Fourteen MCP tools cover indexing, graph search and arbitrary Cypher-like traversal, call-path tracing, change impact, schema and architecture inspection, source snippets, full-text code search, trace ingestion, and architecture decisions. Tool results are structured JSON.
5. **Synchronize incrementally.** A file watcher compares an XXH3 content hash and reparses only changed files; it then recomputes affected community assignments. XXH3 is appropriate to this change-detection role because the authors optimize for throughput rather than adversarial collision resistance.

## Results That Matter

The head-to-head evaluation asks 12 standardized structural and source-retrieval questions across one real repository in each of 31 languages. The MCP-enabled agent and a conventional Explorer Agent both use Claude Opus 4.6; the first author grades answers against manually checked reference answers. The reported MCP result is 0.83 quality versus 0.92 for exploration, with about 1,000 versus 10,000 tokens and 2.3 versus 4.8 tool calls per question. That is competitive but not equivalent quality, and the grading setup is not an independent blinded evaluation.

The division of labor is the more durable result. The graph agent reportedly matches or exceeds the explorer on hub detection and caller ranking for 19 of 31 languages, where materialized edges answer relational questions directly. File exploration remains stronger for full source context (16 of 31) and exhaustive call-site grep (10 of 31). Macro-heavy C is the clearest stated weakness: the MCP result is 0.58 versus 1.00 because macros are absent from the Tree-Sitter representation.

Performance figures are also implementation-specific but useful for sizing: the authors report about six seconds to index 49,398 Django nodes and 196,022 edges, about three minutes for a 2.1-million-node Linux-kernel graph, roughly 1.2 seconds for incremental re-indexing, and sub-millisecond relationship traversal on an Apple M3 Pro. The key economic argument is amortization: a structural query pays an index-build cost once rather than repeatedly reconstructing topology from text.

## Tool Trust and Security Claim

The paper makes security a first-class part of the proposed MCP-server lifecycle. Its stated eight-layer CI audit suite includes allow-listing dangerous libc calls, binary-string checks, Linux network-egress monitoring, installer-path validation, smoke tests, local web-UI checks, adversarial JSON-RPC tests, and checksums for vendored dependencies. It also describes shell-argument validation, a SQLite authorizer that blocks `ATTACH`/`DETACH`, and repository-root containment checks for source reads.

For releases, the authors propose a draft–verify–publish pipeline using signatures and SLSA provenance, CodeQL, VirusTotal and platform antivirus scans, an OpenSSF Scorecard gate, release checksums, and an SBOM. These are defense-in-depth controls, not evidence that any given binary is benign. They also do not substitute for a narrow permission model, independent review, reproducible builds, or ongoing incident response.

## Analyst Takeaways

1. **Index relationships that recur in agent questions.** If the workload repeatedly asks about callers, imports, ownership, or change impact, a typed graph can turn serial discovery into one bounded query. Measure index freshness and build cost alongside task results.
2. **Route by question class, not by a retrieval ideology.** Graph traversal is a strong default for relational and multi-hop structural questions; source reads remain necessary for implementation details, macros, dynamic behavior, and exhaustive textual evidence. Give the agent an explicit fallback rather than pretending the graph is complete.
3. **Treat static-analysis confidence as evidence metadata.** Resolution tiers, language support, graph coverage, and staleness should be visible to callers. A crisp call path inferred through fuzzy matching should not carry the same operational weight as an import-resolved one.
4. **Tool convenience expands the trust boundary.** An MCP server may have filesystem, process, and network privileges on behalf of an autonomous agent. Release provenance, dependency integrity, adversarial tests, and egress constraints deserve product requirements, but must be paired with least privilege and independently verifiable behavior.

## Questions and Limitations

- Each language is represented by one repository, the comparison uses one backend model, and the first author grades the results. The 83% versus 92% score should be read as a useful exploratory benchmark, not a general quality guarantee.
- The graph captures static structure. Runtime behavior, reflection, dynamic dispatch, generated code, and macro semantics can be omitted or misrepresented; the paper explicitly identifies macro-heavy C as weak.
- The 100,000-row default ceiling on arbitrary graph queries can undercount large results. Index freshness also depends on file-watcher behavior and correct incremental invalidation.
- The system comparison does not provide a controlled common-implementation evaluation against embedding RAG, ctags/LSP, CodeQL, or other graph tools. Its adoption metrics are descriptive and not a performance measurement.
- Security controls are described by the authors, but the paper does not independently validate them, quantify residual compromise risk, or establish an ecosystem-wide baseline for MCP server permissions and distribution.

## Vault Ideas Extracted

* [Structural Code Retrieval](/vault/structural-code-retrieval.md)
* [Query-Class Retrieval Routing](/vault/query-class-retrieval-routing.md)
* [MCP Tool Supply-Chain Assurance](/vault/mcp-tool-supply-chain-assurance.md)
