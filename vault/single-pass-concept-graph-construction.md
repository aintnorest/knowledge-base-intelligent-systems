---
type: Synthesis
title: Single-Pass Concept Graph Construction
description: Building a retrieval graph by using an LLM only for compact concept extraction, then performing deduplication, passage linkage, and graph topology construction with deterministic non-LLM operations.
tags: [retrieval, knowledge-graphs, token-efficiency]
timestamp: 2026-07-14T15:53:34Z
---

# Single-Pass Concept Graph Construction

For retrieval workloads, a graph does not need an LLM at every indexing stage. Extract a small, explicit concept inventory from each passage once, then use deterministic code to normalize permitted duplicates, connect concepts to their evidence, and add a bounded relationship such as co-occurrence. This makes the LLM the semantic front end rather than the graph-construction engine.

## Pattern

1. Define the smallest semantic units the retrieval task needs, such as named entities and document-level concepts.
2. Prompt for compact direct output with examples and an explicit output budget.
3. Apply a documented merge policy; preserve provenance from each retained concept to its source passage.
4. Create simple graph edges with deterministic rules, for example concept-to-passage and within-passage co-occurrence.
5. Reserve LLM calls for query understanding and final answer generation, and evaluate indexing token cost separately from retrieval quality.

## Practical Use

This pattern is useful when a corpus must be indexed or refreshed under a strict token, latency, or monetary budget. It produces inspectable graph semantics and makes re-linking, graph storage, and traversal cheap to repeat. A richer schema can be introduced only when a measured retrieval failure requires it.

## Limitations

The approach inherits extraction errors and can miss relations that do not appear as local co-occurrence. Strict deduplication can fragment aliases, while aggressive semantic merging can incorrectly join distinct entities. It should therefore be evaluated against a simpler chunk retriever and a richer graph baseline using evidence recall as well as end-answer metrics.

## Sources

- [TERAG: Token-Efficient Graph-Based Retrieval-Augmented Generation dossier](/dossiers/terag-token-efficient-graph-rag.md) — extracts named entities and document-level concepts once, then creates provenance and co-occurrence edges without additional LLM graph-construction calls.
