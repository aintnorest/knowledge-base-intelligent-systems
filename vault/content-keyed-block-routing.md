---
type: Synthesis
title: Content-Keyed Block Routing
description: Routing a query to blocks of history by scoring it against cheap precomputed content keys, so relevance weighting and sparse selection cost almost nothing per token.
tags: [routing, attention, retrieval, inference-efficiency, model-architecture]
timestamp: 2026-08-11T20:55:05Z
---

# Content-Keyed Block Routing

When history is stored as blocks — cached states, chunks, shards, condensed notes — something must decide which blocks a given query reads. Content-keyed routing gives each block one cheap, static key derived from its own contents (a mean pooling, a centroid, a short abstract), scores the query against those keys, and uses the scores either as soft weights or as a Top-k selector.

The property that makes it cheap: the keys depend only on the block, so they are computed once and reused for every subsequent query. The per-query work is a set of inner products, fully parallelizable, and only the selected blocks need to be materialized.

## Position-Indexed vs. Content-Indexed

The tempting shortcut is to weight blocks by a projection of the query alone, which makes the weight a function of *where* the block sits rather than *what it contains*. This is a positional prior wearing a relevance costume: the same distant block gets the same treatment regardless of whether it holds the answer.

Scoring the query against a description of the block's content instead is the whole point, and it is empirically load-bearing — in the source below, dropping content-dependence cost 7.5 points of retrieval accuracy while leaving perplexity essentially unchanged. Recall-shaped metrics expose the difference; aggregate loss does not.

## Soft Weights or Top-k

Both fall out of the same score:

- **Soft weighting** normalizes the scores (softmax) and reads every block. Highest quality, cost linear in block count.
- **Top-k selection** reads only the k best-scoring blocks. Near-constant per-token cost, at some quality loss, and it keeps most blocks off the fast path entirely.

The consistent finding is that soft weighting wins on quality and sparse selection wins on cost, with the gap widening as the number of blocks grows.

## Practical Use

The pattern generalizes: MoE-style routing over sequence chunks, document-level embeddings consulted before passage-level reads, shard selection in a vector index, choosing which memory files an agent opens. Anywhere the expensive object can be given a cheap, stable, content-derived key, routing becomes nearly free.

## Limitations

- A single pooled key is a lossy description. A block containing one crucial rare detail among mostly irrelevant content will score poorly and be skipped.
- Mean pooling is the crudest possible key builder; richer keys cost more to build and store, and the trade-off is rarely measured.
- Top-k routing has no fallback: if the router misses, nothing downstream recovers the missed block. Soft weighting degrades more gracefully.
- Routing quality is usually invisible in aggregate loss. It must be measured on recall-intensive or retrieval-shaped tasks to be seen at all.

## Sources

- [Memory Caching: RNNs with Growing Memory dossier](/dossiers/memory-caching-rnns-growing-memory.md) — gating and Sparse Selective Caching score a token projection against segment mean-poolings; ablations isolate content-dependence (40.5 to 33.0 retrieval) and the quality/cost ordering of soft gating versus Top-k.
