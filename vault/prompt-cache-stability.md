---
type: Synthesis
title: Prompt Cache Stability
description: Preserving reusable serialized prefixes while placing volatile state after them and measuring whether cache writes produce later reads.
tags: [inference-efficiency, context-engineering, agent-harness, agents]
timestamp: 2026-10-04T05:28:38Z
---

# Prompt Cache Stability

Prompt caching reuses inference state for an identical serialized prefix. Its effective unit is not a semantically similar instruction or an independently stable message: it is the unchanged sequence from the start through an established cache boundary. An early change can therefore invalidate a large suffix, while an appended change can preserve earlier reuse.

## Explanation

Keep slowly changing instructions and interface definitions before volatile task state. Preserve old history bytes when appending new evidence, and serialize structures deterministically. Where supported, append new policy or capability information rather than replacing the original prefix.

Stable content alone does not establish a hit. Reuse also requires a prior cache write at a compatible boundary, a lookup that can reach that entry, sufficient cacheable length, compatible inference configuration, and an available, unexpired entry. Automatic boundary management can still miss after a large history jump or repeatedly write a boundary containing per-request variation.

Session-specific evidence is not inherently uncacheable. A tool result unique to one task can recur unchanged in many subsequent prompts within that task. Distinguish within-session reuse from sharing across sessions before deciding which material is worth writing.

## Practical Use

Track cache reads, cache writes, uncached input, first-token latency, elapsed gaps, and verified task outcomes separately. Compare consecutive serialized requests to identify the earliest divergence when reads collapse. Account for generation, tool execution, delegation, and human pauses when measuring reuse intervals; where lifetime starts at request initiation, generation itself consumes the window.

A longer cache lifetime costs more per write but can avoid full rewrites of an expired prefix when gaps between requests exceed the short lifetime—for example, while an orchestrator waits on delegated work. Choose lifetime using the measured distribution of inter-request gaps and applicable write/read prices, not the default. Longer retention does not pay off when entries rarely receive another eligible read.

Price each policy over a complete episode, including cold starts and prewarming ([Cost-Aware Inference Control](/vault/cost-aware-inference-control.md)). History compaction can improve reasoning and reduce repeated exposure while destroying suffix reuse; evaluate the net effect rather than enforcing append-only history at any price.

## Limitations

Provider implementations vary in hierarchy, lookup reach, minimum size, isolation scope, and inference-configuration identity. A high hit rate does not mean the context is relevant, small, safe, or behaviorally effective. Caching reduces repeated computation and billing, not the model's logical exposure to old evidence. First-token latency is not total task latency, and a discount against an oversized baseline is not absolute efficiency.

## Sources

- [Prompt caching: prefix reuse, invalidation, and lifetime economics dossier](/dossiers/anthropic-prompt-caching-docs.md) — Anthropic's documented cumulative identity, prior-write lookup, request-start lifetimes refreshed on reads, and separately priced short- and long-lived writes.
- [Don’t Break the Cache: An Evaluation of Prompt Caching for Long-Horizon Agentic Tasks dossier](/dossiers/dont-break-the-cache-prompt-caching.md) — cross-provider cost and first-token latency results, with cache-boundary, cold-start, and reporting caveats; no report-quality evaluation.
- [Context Engineering for AI Agents: Lessons from Building Manus dossier](/dossiers/manus-context-engineering-lessons.md) — Manus's production rationale for stable prefixes and deterministic append-only history, without controlled savings measurements.
