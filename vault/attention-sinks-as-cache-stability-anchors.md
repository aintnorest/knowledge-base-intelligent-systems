---
type: Synthesis
title: Attention Sinks as Cache Stability Anchors
description: Preserving semantically uninformative attention anchors alongside a recent cache can stabilize streaming inference without retaining the evicted history.
tags: [attention, inference-efficiency, long-context, model-architecture]
timestamp: 2026-10-05T21:56:49Z
---

# Attention Sinks as Cache Stability Anchors

A token can be computationally important without carrying useful evidence. Normalized attention must distribute its mass somewhere; consistently visible early states can become sinks for attention that is not needed for contextual information. Evicting these states can redistribute attention onto recent content and destabilize a computation that was trained with the anchors present. This is a supported explanation, not a uniquely established origin of all attention sinks.

## Operating Pattern

Keep a small anchor prefix permanently, together with a rolling window of recent key/value states. The prefix supplies a stable normalization reference; the window supplies accessible content. Use cache-relative positional handling so retained states do not acquire unfamiliar attention distances merely because the stream has run longer. The anchor count is an empirical property of the model and workload, not a universal constant.

This separates three quantities:

- **Stream duration:** how much material has been processed over the lifetime of the run.
- **Cache size:** how many states remain available now.
- **Useful recall distance:** how far back the system can reliably use evidence for the current task.

Long operation under bounded memory does not imply long memory. Evicted evidence is unavailable to direct attention; preserving a tiny initial prefix cannot preserve an entire system prompt, task specification, or historical commitment. Those need an explicit retention or retrieval policy. Measure distance-conditioned recall alongside local prediction and throughput; see [Position-Robust Context Evaluation](/vault/position-robust-context-evaluation.md).

## Limitations

Stable perplexity establishes local prediction quality, not understanding of the full stream, persistent instruction following, or historical synthesis. Even evidence inside the cache may be used imperfectly, and larger caches need not improve accuracy monotonically. A dedicated learned sink can concentrate the anchor role, but the supporting pretraining experiment is small-scale and does not establish the same tradeoff for larger models.

High prefix attention also need not explain every copying failure. An observed tendency to copy an initial example is compatible with a sink-related hypothesis, but without a causal test it remains a hypothesis. Semantic relevance calibration addresses a different problem: distinguishing useful documents from positional preference among evidence that is still present; see [Context Ordering as Retrieval Control](/vault/context-ordering-as-retrieval-control.md).

## Sources

- [Efficient Streaming Language Models with Attention Sinks dossier](/dossiers/streaming-llm-attention-sinks.md) — ICLR 2024 evidence for initial-state retention, cache-relative positions, stable local prediction, zero recall outside the rolling cache, and dedicated-sink pretraining at 160M parameters.
- [RULER: What's the Real Context Size of Your Long-Context Language Models? dossier](/dossiers/ruler-real-context-size.md) — aggregation failures involving initial-example copying; its proposed attention-sink explanation is not causally established.
