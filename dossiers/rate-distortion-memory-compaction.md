---
type: Study Note
title: What to Keep, What to Forget: A Rate–Distortion View of Memory Compaction in LLMs and Agents
description: Personal study notes on Colaco and Lahjouji's survey that frames KV, prompt, architectural, and agent-memory compaction as a shared rate–distortion problem.
resource: https://arxiv.org/abs/2607.08032v1
source: /archive/rate-distortion-memory-compaction.pdf
tags: [compaction, agent-memory, long-context, survey]
timestamp: 2026-07-13T17:51:09Z
---

# What to Keep, What to Forget: A Rate–Distortion View of Memory Compaction in LLMs and Agents - Study Notes

**Authors**: Ashwin Gerard Colaco, Nada Lahjouji
**Venue**: arXiv:2607.08032v1 [cs.LG]
**Date**: July 9, 2026
**Pages**: 24
**License**: CC BY 4.0

## What It Is

This survey argues that KV-cache management, prompt/context compression, bounded-state architectures, and agent long-term memory are all versions of one decision: retain a smaller representation of prior context under a budget while preserving downstream task utility.

Its organizing lens is rate–distortion theory. A compactor maps full history `H` to a budgeted representation `Z`; a downstream model answers a query using `Z`. The goal is to minimize expected task loss subject to a memory-rate constraint. This puts a 2-bit KV cache, a compressed prompt, a recurrent state, and an agent summary on the same conceptual frontier even though their physical units differ.

The paper is primarily a survey and design proposal, not a large empirical study. It catalogs methods across the stack, derives a layer-agnostic lower bound, proposes COMPACT-Bench, and runs two small reference experiments on Qwen2.5-1.5B.

## The Core Argument

The useful quantity is not how much source text is retained but how much query-relevant information survives. In the paper's information-bottleneck form, the compact state should preserve information about the answer conditional on the query while spending a bounded amount of information about the original history.

This produces several practical claims:

- Compression quality is task-dependent. Redundant prose and low-entropy classification can tolerate aggressive compaction; exact retrieval, multi-hop questions, and long reasoning traces cannot.
- The same cheap salience proxies recur at every layer: attention or recency for KV caches, perplexity or learned token scores for prompts, and LLM-judged salience for agent memory. They are all imperfect estimators of downstream distortion.
- Two properties dominate failure modes: whether the keep/drop decision is conditioned on the eventual query, and whether discarded material can be recovered later.

The lower-bound treatment is clearest for query-agnostic operators. It supports the intuition that a compactor choosing before it knows the query must preserve enough information for a broad query distribution, whereas a query-aware retriever can spend its budget on the question at hand.

## A Seven-Axis Taxonomy

The survey classifies methods by seven shared axes:

1. **Granularity** — bits, dimensions, tokens, blocks, spans, vectors, facts, visual tokens, or messages.
2. **Lifecycle stage** — pretraining, prefill, decoding, serving, within a task, between tasks, or offline indexing.
3. **Lossiness and fidelity** — lossless, near-lossless, lossy, or multi-fidelity; reversible versus irreversible is a cross-cutting distinction.
4. **Query/task adaptivity** — query-agnostic, query-conditioned, or task-reward-aware, plus the salience signal used.
5. **Learnability** — heuristic, adapter, trained architecture, RL policy, or LLM controller.
6. **Mechanism** — eviction, retrieval, merging, quantization, low-rank factorization, summarization, latent encoding, recurrent writing, or graph construction.
7. **Storage substrate** — GPU KV, host or remote tier, parameters, text/vector store, graph, dense context vectors, or a hybrid.

This is more useful than a list of named methods because it predicts tradeoffs. For example, quantization usually retains recoverability while reducing fidelity; an abstractive summary may be readable and portable but destroys details that no later query can fetch.

## What the Survey Finds Across Layers

### KV Cache and Prompt Context

KV eviction schemes often select tokens using accumulated attention or recency before later decode queries are known. This can work at loose budgets but permanently loses a token needed by a later query. Query-time sparse retrieval, such as page selection over a retained cache, preserves capacity while reducing read bandwidth; it changes the question from “what can be thrown away?” to “what should be read now?”

Prompt methods make the same trade earlier. Extractive or abstractive compression creates inspectable text and can be model-portable, while learned gist or latent tokens reach higher ratios but are opaque and model-coupled. Query-aware prompt compaction improves the allocation of a fixed token budget, but a lossy rewritten prompt still cannot restore a missed fact.

### Bounded Architecture and Agent Memory

Fixed-size recurrent state puts the rate constraint into the architecture. Hybrid designs retain a small high-fidelity local-attention tier while using a cheaper lossy tail, an example of multi-fidelity memory.

At the agent layer, the active bottleneck is commonly the context window and retrieval path rather than total store capacity. The paper separates archival, retrieval-backed schemes from destructive trajectory folding and summary rewrite. Repeated lossy consolidation is especially risky: one summary omits material, the next cannot see it, and a wrong stored reflection can bias later retrieval or summaries.

## The Inference-to-Agent-Memory Bridge

The paper's most useful transfer is between serving and agent design. It aligns a sub-second KV cache, task-scale working context, and cross-task semantic memory as three tiers of one hierarchy. The same knobs recur:

- importance scoring versus LLM salience,
- sliding-window eviction versus forgetting curves,
- query-time sparse reads versus recall-time retrieval,
- kept-all archives versus lossy summaries, and
- bit-width or rank allocation versus note/detail allocation.

The resulting design advice is to use query-conditioned retrieval where possible, preserve an archival or high-fidelity tier when information may be needed later, and avoid treating an average-case salience score as proof that a detail is safe to delete.

## COMPACT-Bench and Reference Experiments

COMPACT-Bench would compare methods on one bytes-per-token-of-history budget axis and report full accuracy–budget frontiers. In addition to end-task accuracy, it proposes tests for loss attribution, ability to recover late-needed information, and calibration of a compactor's confidence. It also requires repeated-compaction evaluation, which existing long-context and memory benchmarks largely omit.

The reference experiments are illustrative rather than definitive:

- On natural-filler needle retrieval, six KV eviction methods on Qwen2.5-1.5B collapsed toward zero accuracy below roughly one quarter of the full-cache budget; real scorers modestly outperformed random eviction at tighter budgets.
- In a 12-fact agent-memory simulation, archival retrieval stayed near 0.95 recall across compaction frequencies, while repeated LLM-summary replacement recalled roughly 0.33–0.56 and weakened as compaction events increased.

The important result is the evaluation shape, not the small-model numbers: a single compression ratio or one-shot recall score can hide degradation caused by repeated irreversible operations.

## My Takeaways

1. **Memory compaction is an allocation problem, not just a summarization problem.** Budget should buy the information most likely to change a future answer, and the required budget depends on the task.
2. **Retrievability is a safety margin.** A cheap lossy representation can be valuable, but it should not automatically replace the evidence needed to recover from an incorrect keep/drop decision.
3. **Repeated operations need their own test.** A memory policy that looks acceptable after one summary can silently degrade a long-running agent after many cycles.
4. **A common budget currency is valuable but incomplete.** Bytes-per-token enables comparisons, yet implementations must also report latency, retrieval/store cost, and task-specific quality.

## What I Would Question

- The formal lower bound relies most directly on query-agnostic compaction and treats task-conditioned information content as given; estimating that quantity for practical agent tasks remains unresolved.
- The cross-layer mechanism transfers are persuasive design hypotheses, not proof that a KV-cache technique will transfer unchanged to semantic memory.
- The benchmark and experiments are proposals at reference scale, so their numerical results should not be read as a mature leaderboard.
- Many surveyed methods are recent preprints evaluated under heterogeneous settings. The taxonomy is stronger evidence than direct comparison of their reported compression ratios.

## Vault Ideas Extracted

* [Rate–Distortion Memory Compaction](/vault/rate-distortion-memory-compaction.md)
* [Reversible, Query-Conditioned Compaction](/vault/reversible-query-conditioned-compaction.md)
* [Repeated-Compaction Evaluation](/vault/repeated-compaction-evaluation.md)
