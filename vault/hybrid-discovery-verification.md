---
type: Synthesis
title: Hybrid Discovery + Verification
description: A two-phase pipeline for finding and validating external references: high-throughput LLM search followed by rigorous API verification with deduplication.
tags: [retrieval, verification, tool-use, agents]
timestamp: 2026-07-11T16:00:00Z
---

# Hybrid Discovery + Verification

A two-phase architecture for gathering and validating external references (papers, citations, sources) that balances throughput with factual accuracy.

## The Problem

Most LLM-based systems either:
- Rely on parametric memory, leading to hallucinated citations
- Use simple keyword search without verification, producing shallow or incorrect references
- Generate generic surveys rather than targeted comparisons

## Phase 1: High-Throughput Discovery

- Use an LLM with web search grounding to rapidly identify candidate papers.
- Run with high concurrency (e.g., 10 workers) to pool a large candidate set.
- Accept false positives at this stage; precision is handled in Phase 2.

## Phase 2: Rigorous Verification

Verify each candidate against a scholarly API (e.g., Semantic Scholar) with multiple gates:

1. **Fuzzy title match** — Levenshtein distance ratio > 70%
2. **Year alignment** — Point bonus for exact year match
3. **Retrievable abstract** — Must possess an abstract
4. **Temporal cutoff** — Must strictly predate the research cutoff date

After verification, deduplicate by canonical IDs and compile a citation registry.

## Why Verification Matters

Baseline systems that skip verification achieve "competitive" F1 scores by citing only 9–14 obvious papers. This inflates metrics but produces shallow reviews. Verified systems generate ~48–59 citations, demonstrating genuine exploration of the literature landscape.

## Integration Rule

The writing agent must be constrained to cite **only** from the verified pool, with a mandate that at least 90% of gathered literature must be actively integrated into the text.

## Sources

- [PaperOrchestra dossier](/dossiers/paperorchestra.md) — Literature Review Agent with 10 concurrent workers + Semantic Scholar verification
