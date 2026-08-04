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

## Practical Use

This pattern fits long-context code, agent, and document workloads where many tokens are redundant but a minority of queries require direct access to a distant detail. A fixed schedule is often easier to deploy than mixing attention types within every layer or dynamically routing individual heads.

## Limitations

- Global layers still retain and read a cache, so the design does not make long-context cost constant.
- The right ratio depends on context length, model size, retrieval distribution, hardware, and the linear operator’s memory quality.
- Reported decoding speedups can be dominated by batch size, prefill/decode mix, cache-memory capacity, and optimized kernels rather than the architecture in isolation.

## Sources

- [Kimi Linear: An Expressive, Efficient Attention Architecture dossier](/dossiers/kimi-linear-attention-architecture.md) — Kimi Delta Attention with a 3:1 linear-to-global schedule, matched-scale evaluations, and vLLM/kernel implementation evidence.
