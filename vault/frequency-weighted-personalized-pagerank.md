---
type: Synthesis
title: Frequency-Weighted Personalized PageRank
description: A graph-retrieval ranking policy that seeds personalized PageRank with concept weights combining query relevance and inverse corpus frequency, while preserving separate calibration for exact and approximate matches.
tags: [retrieval, knowledge-graphs, context-engineering]
timestamp: 2026-07-14T15:53:34Z
---

# Frequency-Weighted Personalized PageRank

Personalized PageRank can start from a query-specific distribution rather than treating every matched graph node equally. Weight a matched concept by its relevance to the query divided by how often it occurs in the corpus. Exact lexical matches can receive maximal relevance; approximate matches can use embedding similarity. Normalize groups separately when their score scales differ, then use the combined distribution as PPR's restart vector.

## Why It Helps

Query relevance favors concepts that plausibly express the user's intent. Inverse frequency suppresses generic concepts that would otherwise diffuse graph traversal into many passages. Separate normalization prevents a large or high-valued exact-match group from automatically overwhelming useful semantic fallbacks, or vice versa.

## Practical Use

Use this policy for graph retrieval where query concepts may match nodes both exactly and approximately. Instrument exact matches, fallback matches, concept frequencies, restart weights, and the passages ultimately selected. Tune or cap inverse-frequency effects on the actual corpus: a rare typo or extraction artifact should not become an authoritative seed merely because it is rare.

## Limitations

Frequency is a proxy for discriminativeness, not evidence quality. The policy depends on reliable concept extraction and can fail when the true answer hinges on a common entity, an alias that misses exact matching, or an embedding false positive. It should be compared with uniform, relevance-only, and frequency-only restart vectors on representative query slices.

## Sources

- [TERAG: Token-Efficient Graph-Based Retrieval-Augmented Generation dossier](/dossiers/terag-token-efficient-graph-rag.md) — uses relevance divided by concept frequency and separately normalizes exact and semantic match groups before PPR; its reported ablation favors this restart-vector design over inverse frequency alone.
