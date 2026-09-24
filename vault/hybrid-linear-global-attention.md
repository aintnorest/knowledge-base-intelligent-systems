---
type: Synthesis
title: Hybrid Linear–Global Attention
description: Interleaving compact recurrent linear-attention layers with periodic global-attention layers to trade most KV-cache growth for a retained path to exact long-range retrieval.
tags: [attention, long-context, model-architecture, inference-efficiency]
timestamp: 2026-07-23T20:03:07Z
---

# Hybrid Linear–Global Attention

Hybrid linear–global attention assigns most layers to a fixed-size recurrent or linear-attention state and reserves periodic full-attention layers for direct retrieval over token history. It avoids treating linear compression and global lookup as mutually exclusive: compression carries the common state cheaply, while global layers correct the exact-copying and fine-grained retrieval failures of pure linear attention.

## Design Choices

1. Choose a regular inter-layer ratio so cache layout, batching, and distributed execution remain predictable.
2. Use a linear state update with selective retention or forgetting; a naive accumulator usually loses too much retrieval precision.
3. Retain a global-attention path at a frequency measured against the workload’s need for token-level lookup.
4. Evaluate prefill, decode, cache memory, long-context retrieval, short-context quality, and post-training behavior as separate dimensions.
5. Benchmark the actual kernel and serving stack. An asymptotic reduction becomes useful only when cache, scheduler, and batch shape expose it.

## Why the Recipe Works

A later analysis reduces the hybrid stack to a more general mechanism: a compressor layer whose state is read out and fed to a global attention block is equivalent to caching that recurrent state once per token and letting each query read every cached snapshot. On that reading, the global layer is not a separate retrieval system bolted onto the recurrence — it is enforcing snapshot retention, which is what raises the recurrent module's effective memory capacity.

The reduction also exposes what the fixed hybrid gives up. In a hybrid, every query attends over the same predetermined sequence of prior-layer outputs. If the snapshots are instead *queried* rather than read as fixed vectors, each query assembles its own effective input sequence, and the snapshot interval becomes a free parameter rather than being pinned at one token. See [Segmented Memory Checkpoint Caching](/vault/segmented-memory-checkpoint-caching.md).

## Practical Use

This pattern fits long-context code, agent, and document workloads where many tokens are redundant but a minority of queries require direct access to a distant detail. A fixed schedule is often easier to deploy than mixing attention types within every layer or dynamically routing individual heads.

## Model-Declared Reads Over the Remaining Global Layers

Even when sliding-window or recurrent layers carry most computation, the remaining global layers can dominate long-context KV reads. Declarative Attention leaves the efficient layers untouched and has the model emit global, focused or local scopes, which a serving-engine state machine enforces by masking whole KV blocks in the global layers only. On fixed-context QA it cut total attended positions by 52.0% on Gemma-4-31B and 31.1% on Qwen-3.6-27B, at accuracy losses of 1.27 and 2.75 points. The predicted wall-clock gains (0.71× and 0.77× decode time) come from a roofline model, not measured serving, and segmentation-sensitive tasks can regress sharply.

## Limitations

- Global layers still retain and read a cache, so the design does not make long-context cost constant.
- The right ratio depends on context length, model size, retrieval distribution, hardware, and the linear operator’s memory quality.
- Reported decoding speedups can be dominated by batch size, prefill/decode mix, cache-memory capacity, and optimized kernels rather than the architecture in isolation.

## Sources

- [Kimi Linear: An Expressive, Efficient Attention Architecture dossier](/dossiers/kimi-linear-attention-architecture.md) — Kimi Delta Attention with a 3:1 linear-to-global schedule, matched-scale evaluations, and vLLM/kernel implementation evidence.
- [Memory Caching: RNNs with Growing Memory dossier](/dossiers/memory-caching-rnns-growing-memory.md) — derives the compressor-plus-global-attention hybrid as memory caching with a one-token snapshot interval, and shows tunable intervals with query-conditioned reads beating the fixed form on recall.
- [Language Models Can Control Their Own Attention dossier](/dossiers/declarative-attention-model-controlled-context.md) — decode-time KV block masking over global layers with measured accuracy cost.
