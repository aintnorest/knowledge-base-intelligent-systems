---
type: Synthesis
title: Reversible, Query-Conditioned Compaction
description: Pairing a compact default representation with query-time recovery from retained source material so future questions need not be predicted perfectly in advance.
tags: [compaction, retrieval, agent-memory, long-context]
timestamp: 2026-07-13T17:51:09Z
---

# Reversible, Query-Conditioned Compaction

The strongest compaction pattern does not permanently decide everything that will matter before the question is known. Keep a compact working representation for routine use, retain a recoverable source tier, and use the actual query to fetch or restore details when needed.

## The Pattern

1. Store a low-cost summary, index, quantized cache, or other compact first tier.
2. Preserve raw history or a higher-fidelity tier with stable provenance and access controls.
3. At query time, use the query to select the small set of source blocks that need high-fidelity access.
4. Expand, retrieve, or decline to answer when the compact tier cannot support the required claim.

This shifts compaction from irreversible deletion toward selective reading. At the systems level it can mean sparse page reads over a retained KV cache; for agents it can mean an archival episode store behind a concise working summary.

## Why It Matters

Query-agnostic scoring must guess which details will matter across many possible future questions. A recoverable tier limits the cost of a bad guess. It also prevents repeated summaries from treating their own omissions as if those details never existed.

## Practical Use

Use multi-fidelity storage for long-running work: a small active context, an indexed evidence archive, and a retrieval budget for expansion. Record provenance and version boundaries so recovery does not resurrect stale, inaccessible, or superseded material. Test with late questions whose evidence was intentionally kept out of the compact tier.

## Limitations

Reversibility is not free. It needs storage, indexing, retrieval latency, policy enforcement, and a selector capable of finding the needed material. An archive also does not prevent a system from retrieving poisoned or obsolete content; governance and confidence handling remain necessary.

## Sources

- [What to Keep, What to Forget dossier](/dossiers/rate-distortion-memory-compaction.md) — contrasts irreversible eviction and summary replacement with query-time retrieval and archival designs across the inference-to-agent-memory hierarchy.
