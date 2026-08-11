---
type: Study Note
title: "Memory Caching: RNNs with Growing Memory"
description: Personal study notes on Google's Memory Caching, which caches per-segment recurrent memory checkpoints so an RNN's effective memory grows with sequence length, interpolating between O(L) recurrence and O(L²) attention.
resource: https://arxiv.org/abs/2602.24281v1
source: /archive/memory-caching-rnns-growing-memory.pdf
tags: [model-architecture, attention, long-context, inference-efficiency]
timestamp: 2026-08-11T20:55:05Z
---

# Memory Caching: RNNs with Growing Memory - Study Notes

**Authors**: Ali Behrouz, Zeman Li, Yuan Deng, Peilin Zhong, Meisam Razaviyayn, Vahab Mirrokni (Google; correspondence alibehrouz@google.com)
**Venue**: Preprint; arXiv:2602.24281v1 [cs.LG]
**Date**: February 27, 2026
**Pages**: 22

## What It Is

Memory Caching (MC) is an architecture-agnostic modification to recurrent sequence models. Instead of carrying one fixed-size memory state across the whole sequence, the model splits the input into segments, keeps caching the memory state at the end of each segment, and computes each token's output by reading both the live "online" memory and the cached checkpoints of prior segments.

The write path is unchanged and stays O(L). The read path now touches N cached states, so per-token retrieval costs O(N) and the model lands at O(NL) overall. N is the design knob: N = 1 is an ordinary RNN, N = L caches every token and reproduces attention's direct access. MC is therefore a continuous interpolation between fixed-memory recurrence and growing-memory attention, not a new recurrence rule — it composes with whatever update rule f(·) the base model already uses.

## The Problem It Targets

Modern linear-attention and test-time-memorization RNNs (DeltaNet, RWKV-7, RetNet, Titans, Atlas, DLA) compress an unbounded history into a fixed-size state. That is cheap, but the state overflows, and the models reliably lose to Transformers on recall-intensive work: needle-in-a-haystack, MQAR, in-context retrieval over documents. The paper's framing, inherited from the authors' nested-learning / attentional-bias line of work, is that the memory is an associative-memory module being optimized during the forward pass. Cached memory states are then *checkpoints of that optimization*, retained so later tokens can still reach information the current state has forgotten.

## The Four Aggregation Variants

Given cached states M⁽¹⁾…M⁽ˢ⁻¹⁾ and online state M⁽ˢ⁾, an aggregation function combines their forward passes on the query.

1. **Residual Memory** — plain sum of all memory read-outs. For a strictly linear (matrix) memory this collapses algebraically back to a single fixed-size memory, since the cached matrices can be pre-summed. It still helps empirically, acting as a retention operator.
2. **Gated Residual Memory (GRM)** — input-dependent weights γ⁽ⁱ⁾ per cached segment, softmax-normalized. The key detail: γ is *not* a bare projection of the current token, because that would make it position-based filtering. It is the inner product of a connector projection uₜ = xₜW_u with MeanPooling(S⁽ⁱ⁾), so it scores how similar the token's context is to the segment's context. This breaks the linear collapse, so the sum genuinely cannot be precomputed.
3. **Memory Soup** — instead of averaging outputs, average the *parameters* of the cached memory modules into a per-token memory M*ₜ, weight-souping style, then query it once. Provably identical to GRM when memory is linear; genuinely different for deep (MLP) memories, where it builds a token-specific non-linear retrieval function.
4. **Sparse Selective Caching (SSC)** — an MoE-style router computes the same similarity score and takes Top-k cached segments plus the online memory. Segment mean-poolings are precomputable and the router is parallelizable, so only the selected memories need to be resident on-accelerator. The authors read SSC as a sparse unified memory: writes activate one block, reads activate a larger adaptive subset.

A separate design axis is **checkpoints vs. independent compressors**: does segment s start from segment s−1's final state (optimization view, continuous learning) or from an independent initialization (compression view, no cross-segment interference)? The paper reports both have advantages and does not settle it.

## The Unification Claims

Section 4.1 is the conceptually interesting part.

- Set segment size to 1 with a value-less vector-valued memory, and MC's gated read-out algebraically *becomes* a gated global softmax attention block. Attention is recovered as the degenerate, zero-compression corner of memory caching.
- Take the popular hybrid recipe — a compressor layer (recurrent memory read with q = 1) feeding a global attention block — and it is equivalent to MC with segment size 1 caching checkpoints. This gives a mechanistic reason why interleaved hybrids work: the attention block is enforcing memory caching, raising the recurrent module's effective capacity.
- Going beyond q = 1 gives something hybrids cannot do: an *ad-hoc* attention where the input sequence is constructed per query, {M⁽ⁱ⁾(qₜ)}, rather than being one fixed sequence of prior-layer outputs.
- With a deep memory module, MC produces architectures with no hybrid analogue: each cached "token" is a tensor whose representation varies with the query, and the memory's initial state is itself a network.

## Segmentation and Cost

Total cost is O(L + p·N·L) for a memory whose forward pass costs O(p). Equal segments of size C give O(pL²/C) — Transformer-shaped but with a smaller constant. Logarithmic segmentation (segment lengths from the binary expansion of L; 37 = 32 + 4 + 1) caps N at log₂L for O(pL log L). The paper argues logarithmic segmentation is the cheaper but worse choice: it forces one memory to compress a huge early segment (8K tokens of a 16K sequence), destroying resolution exactly where recall is hardest, while also producing degenerate one-token segments. Experiments bear this out.

They reimplement Guo et al.'s Log-Linear Attention as **Log-Linear++** — MC with GRM gating over logarithmic segments — so the comparison isolates segmentation from the gating improvements.

## Results

Setup: 760M/30B tokens and 1.3B/100B tokens on FineWeb, 4K training context and 256-token segments by default; 16K context for the long-context evaluations. Base models are SWLA, DLA, and Titans (LMM).

- **Language modeling / commonsense (Table 1).** Every MC variant beats its base model at both scales. At 1.3B, Titans 56.82 → 58.33 avg with GRM; DLA 53.72 → 55.96; SWLA 52.55 → 54.60. Titans+GRM also beats Transformer++ (53.19), Samba (54.46), and Miras/Memora (55.76). Wikitext ppl 15.60 → 15.37. Constant-size segments beat Log-Linear++ consistently.
- **Needle-in-a-haystack (Table 2).** The gains concentrate where the fixed state hurts. Hardest task, UUID needle at 16K: DLA 4.0 → 18.2 with GRM; Titans 21.2 → 32.2 (Transformer 40.8). Numerical needle at 16K: Titans 75.4 → 88.2 (Transformer 94.2).
- **In-context recall (Table 3).** Averages: Transformer 41.00, Titans(MAL) 40.46. Titans(LMM) 31.75 → 40.50 with GRM; DLA 30.51 → 38.03. Log-Linear++ only reaches 34.37. So MC closes most — not all — of the recall gap to attention, and beats the recurrent state of the art.
- **LongBench (Table 4)** and **MQAR (Figure 5)** show the same direction, with MC-Titans reported as best-per-dimension against Atlas.
- **Ablations (Table 5).** Retrieval accuracy is where the design choices bite: removing context-dependence of γ costs 40.5 → 33.0, removing gating entirely (i.e., falling back to plain residual memory) 40.5 → 32.4, using a linear rather than deep memory 40.5 → 34.5. Perplexity barely moves across all three.
- **Efficiency (Figure 4).** Training throughput sits between Transformers and RNNs, with the gap to Transformers widening as context grows. SSC adds minimal overhead over the base RNN.

A consistent ordering emerges: **GRM > Memory Soup > SSC on quality, reversed on cost.**

**MC as post-training.** Caching states at inference on an already-trained recurrent model and decoding with an unweighted moving average of past cached memories is claimed to significantly improve length extrapolation. This is one sentence with no table behind it, but it is the cheapest thing in the paper to try.

## Analyst Takeaways

1. **Memory capacity is a spectrum, and segment size is the dial.** The RNN-vs-Transformer framing is a false binary; O(NL) with tunable N lets you buy exactly the recall you need. The same reasoning applies well outside neural architecture — any compressed-history system can retain periodic checkpoints instead of one running state.
2. **How you index the cache matters more than that you have one.** Position-indexed gating underperformed content-indexed gating by 7.5 retrieval points. Cheap precomputed segment summaries used as routing keys were the load-bearing mechanism.
3. **Uniform resolution beats hierarchical decay for recall.** The logarithmic scheme is asymptotically cheaper and lost, because it starves the distant past of resolution — exactly where recall queries land. Worth remembering when designing tiered or exponentially decaying memory.
4. **Linear memories hide design differences.** Residual, GRM, and Memory Soup collapse into each other under a matrix-valued memory. Depth is what makes the variants distinguishable — so ablations run on linear memory will systematically understate a design.
5. **Hybrid attention/RNN stacks may be a special case, not a separate family.** If the global attention block is doing memory caching with segment size 1, the interesting question becomes what a better-chosen segment size and a query-conditioned read would buy.

## Questions and Limitations

- **Scale.** 760M and 1.3B parameters, 30B/100B tokens, 4K–16K contexts. Nothing here establishes the ordering at frontier scale or at 128K+ contexts, which is where the recall argument matters most commercially.
- **The efficiency claim is training throughput only.** Figure 4 measures training. There is no decoding-latency, per-token memory, or serving measurement, and no kernel release is mentioned — so the practical inference cost of loading N cached states (or Top-k of them) per token is unquantified.
- **Table 5 has a broken row.** The "Shared u and q" ablation reads 00.0 / 00.0 / 00.0 across all three metrics for both GRM and SSC — an unfilled placeholder, not a result. The alternative parameterization uₜ = qₜ is proposed in the text and then never actually evaluated.
- **Prose contradicts the tables.** Section 5.1 states "GRM and then SSC achieves better results among our provided methods," but every table has Memory Soup ahead of SSC. Minor, but it suggests the write-up outran the numbers.
- **The +0.8% figure is unsupported.** Section 5.1 claims MC gives "+0.8% performance gain over the Titans"; Table 1 shows roughly +1.5 average points at 1.3B. The reported number does not match its own table.
- **Checkpoints vs. independent compressors is left open.** Section 3.4 sets up a real design question and Section 5.6 is cited for the answer, but that section covers gating, context-dependence, and memory depth instead. The comparison is never actually reported.
- **Segment size is fixed, not learned or adapted.** Everything runs at a constant 256 tokens by default. Content-aware or task-adaptive segmentation is the obvious next step and is not attempted.
- **No independent replication.** All numbers are the authors' own, against baselines they largely also authored (Titans, Atlas, DLA, SWLA, Miras).

## Vault Ideas Extracted

* [Segmented Memory Checkpoint Caching](/vault/segmented-memory-checkpoint-caching.md)
* [Content-Keyed Block Routing](/vault/content-keyed-block-routing.md)
* [Hybrid Linear–Global Attention](/vault/hybrid-linear-global-attention.md) — updated with MC's reduction of hybrid stacks to segment-size-1 caching
* [Rate–Distortion Memory Compaction](/vault/rate-distortion-memory-compaction.md) — updated with segmentation-granularity evidence
