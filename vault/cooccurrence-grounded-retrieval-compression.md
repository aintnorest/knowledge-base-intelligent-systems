---
type: Synthesis
title: Co-occurrence-Grounded Retrieval Compression
description: Compressing a hybrid retrieval set by ranking compact facts and contextual passages together through their shared provenance, entities, and query relevance rather than concatenating every retrieved item.
tags: [retrieval, knowledge-graphs, token-efficiency, provenance]
timestamp: 2026-07-14T15:57:43Z
---

# Co-occurrence-Grounded Retrieval Compression

Hybrid retrieval often returns two incomplete views of the same evidence: passages provide context but consume tokens, while extracted facts or triples are compact but can be ambiguous. Co-occurrence-grounded retrieval compression builds a small graph over the *candidate evidence set* and selects items that are jointly supported by query relevance and structural association. The result should preserve enough context to interpret the facts while dropping verbose or isolated candidates.

## Pattern

1. Retrieve a bounded set of contextual passages and compact facts, keeping source provenance for every fact.
2. Create nodes for the query, candidates, and stable anchors such as entities or source documents.
3. Add weighted query-relevance edges and explicit structural edges: fact-to-source-passage, fact-to-entity, passage-to-entity, and entity-to-entity where those relationships are trustworthy.
4. Seed a graph ranker from the query and any high-confidence anchors; use a bounded algorithm such as Personalized PageRank to rank only the candidate facts and passages.
5. Pack the top-ranked heterogeneous evidence items under a token budget, then measure answer quality, evidence recall, irrelevant-context rate, and tokens per retrieval against passage-only, fact-only, and unfiltered hybrid baselines.

## Practical Use

Use this when semantic retrieval has recall but returns overly long passages, and an extracted fact store can provide concise clues with source links. Keep provenance in the packed context: a fact should make it easy to retrieve or display its supporting passage when the answer requires qualification, conflict resolution, or citation.

Graph construction must remain proportional to the retrieval budget. The graph can be built at query time from a few retrieved candidates; it need not be a global knowledge graph traversal. That makes the compression policy easier to inspect, tune, and fall back from.

## Limitations

- Co-occurrence is a relevance signal, not evidence of truth. A mistaken extracted fact can be tightly linked to its source passage.
- A source-linked fact is unavailable if either the fact extraction failed or its source passage missed the candidate set; do not discard semantically relevant unlinked passages without testing recall.
- PPR and similar graph rankers add hyperparameters and can over-prefer densely connected generic entities. Evaluate query slices with aliases, distributed evidence, rare facts, and adversarially similar passages.
- Context compression can hide caveats. For consequential answers, preserve an auditable path from every compact fact to the full underlying evidence.

## Sources

- [TeaRAG: A Token-Efficient Agentic Retrieval-Augmented Generation Framework dossier](/dossiers/tearag-token-efficient-agentic-rag.md) — builds a query-time Knowledge Association Graph over retrieved chunks, triplets, and entities; uses PPR to select five content nodes from hybrid candidates.
