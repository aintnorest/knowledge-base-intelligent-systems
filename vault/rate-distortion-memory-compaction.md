---
type: Synthesis
title: Rate–Distortion Memory Compaction
description: Treating memory compression at every LLM and agent layer as a budgeted trade between retained context information and downstream task error.
tags: [compaction, agent-memory, long-context, token-efficiency]
timestamp: 2026-07-13T17:51:09Z
---

# Rate–Distortion Memory Compaction

Memory compaction is a task-utility trade, not a generic request to make context shorter. Whether the object is a KV cache, prompt, recurrent state, or agent note store, the system maps full history to a smaller representation under a resource budget and accepts some risk of downstream error.

## The Decision

For a history, query, and target answer, spend the available memory budget on information that predicts the answer conditional on that query. Compression is therefore easier for redundant prose or low-entropy classification than for exact recall, multi-hop retrieval, or long reasoning whose answer depends on many distinct details.

This lens makes common heuristics comparable. Attention mass, recency, perplexity, learned token scores, and LLM salience are all proxies for the same unknown quantity: the task error caused by retaining less information. A good proxy is useful, but none proves that an unobserved future query will not need a discarded detail.

## How the Budget Is Distributed Also Matters

Two schemes can spend the same total budget and behave very differently, because the choice is not only *how much* to retain but *where the resolution goes*. A hierarchical or exponentially decaying schedule — fine detail for recent history, one coarse summary for the distant past — is asymptotically cheaper than uniform granularity and is often adopted for that reason. It also puts the worst distortion exactly where recall-intensive queries tend to land.

Empirically this can invert the expected ordering: uniform-granularity segmentation beat a logarithmic schedule at matched budget on needle-in-a-haystack and in-context recall, because the logarithmic scheme forced a single compressed state to absorb half the sequence. Treat the distribution of fidelity across history as a first-class parameter, and validate it on recall-shaped tasks rather than on aggregate loss, which is insensitive to it.

## Practical Use

- Define the budget and quality target together; do not optimize compression ratio alone.
- Check how fidelity is distributed over history, not just the total retained.
- Measure a quality-versus-budget frontier on representative tasks rather than selecting one favorable operating point.
- Allocate high-fidelity capacity to evidence-heavy or exact-recall work and cheaper representations to redundant or low-risk material.
- Compare alternatives in a shared unit where possible, while also reporting latency, storage, and inference cost.

## Limitations

The amount of history information a real task requires is usually unknown before evaluation. A single shared byte or token metric also hides differences in portability, retrieval delay, implementation complexity, and failure severity. This is a decision framework, not a guarantee that a chosen salience score is correct.

## Sources

- [What to Keep, What to Forget dossier](/dossiers/rate-distortion-memory-compaction.md) — formalizes compaction as a rate–distortion and information-bottleneck problem across KV, prompts, bounded state, and agent memory.
- [Memory Caching: RNNs with Growing Memory dossier](/dossiers/memory-caching-rnns-growing-memory.md) — segment size as an explicit compression/recall dial for recurrent state, with uniform segmentation outperforming a cheaper logarithmic schedule on recall while perplexity stays flat.
