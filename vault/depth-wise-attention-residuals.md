---
type: Synthesis
title: Depth-Wise Attention Residuals
description: Replacing uniform residual accumulation with learned, input-dependent attention over earlier layer outputs, optionally compressed into blocks for scalable depth access.
tags: [attention, model-architecture, mixture-of-experts]
timestamp: 2026-07-23T20:03:07Z
---

# Depth-Wise Attention Residuals

Depth-wise attention residuals let a layer choose among earlier layer representations instead of inheriting one uniform accumulated sum. A learned query scores normalized previous outputs, softmax assigns relative weight, and the layer receives a content-dependent aggregation. This treats depth as an attention axis rather than a fixed recurrence.

## Why It Helps

Standard PreNorm residual addition preserves a direct gradient path, but every prior output continues to accumulate with unit weight. Hidden-state magnitude can grow with depth, and deeper normalized layers must produce increasingly large changes to matter. Depth attention introduces competition among sources: an early representation can remain directly retrievable without forcing all intervening outputs to retain equal influence.

## Scalable Form

Full depth attention reads every earlier layer output. Blockwise depth attention retains detailed state within the current block and one summary from each completed block. The block count becomes the main cross-stage memory and communication budget, interpolating between a standard residual path and full cross-depth access.

Initialize depth queries so the starting weights are uniform. Then validate the approximation by varying block size, measuring loss, output/gradient scale, pipeline communication, cache memory, and end-to-end inference overhead.

## Limitations

- Cross-depth attention can introduce persistent source sinks, implementation complexity, and another routing surface to inspect.
- Block summaries lose within-block detail; the optimal granularity is model- and workload-dependent.
- Improvements in one MoE/transformer family do not establish the same behavior for every residual architecture or normalization regime.

## Sources

- [Attention Residuals dossier](/dossiers/attention-residuals.md) — full and block AttnRes, scaling-law results, pipeline/inference implementation, and a 48B Kimi Linear comparison.
