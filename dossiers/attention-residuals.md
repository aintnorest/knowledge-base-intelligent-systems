---
type: Study Note
title: Attention Residuals
description: Personal study notes on Kimi Team's depth-wise attention residuals, which replace uniform PreNorm accumulation with learned softmax selection over prior layer outputs and a blockwise scalable approximation.
resource: https://arxiv.org/abs/2603.15031v1
source: /archive/attention-residuals.pdf
tags: [model-architecture, attention, inference-efficiency]
timestamp: 2026-07-23T20:03:07Z
---

# Attention Residuals - Study Notes

**Authors**: Kimi Team et al.  
**Venue**: Technical report; arXiv:2603.15031v1 [cs.CL]  
**Date**: March 16, 2026  
**Pages**: 21

## What It Is

Attention Residuals (AttnRes) replaces the standard residual sum with learned attention over representations produced at earlier depths. A normal PreNorm network keeps adding every layer output with unit weight. That gives a clean gradient path but lets hidden-state magnitude grow with depth and can dilute the relative influence of later normalized layers.

AttnRes treats depth like an attention axis. At a layer, a learned pseudo-query scores previous layer outputs after RMS normalization, softmax-normalizes the scores, and produces a content-dependent weighted aggregation. This permits a layer to retrieve a relevant early representation directly rather than relying only on the immediately preceding accumulated state.

## Full and Block Attention Residuals

Full AttnRes attends over every earlier output. It has reasonable arithmetic at ordinary layer counts, and those activations already exist in a simple training implementation, but large-scale activation recomputation and pipeline parallelism make transmitting all depth states impractical.

Block AttnRes partitions the network into blocks. A layer retains detailed partial information inside its current block and attends to one summary representation from each completed block. This changes the cross-stage representation requirement from all layers to approximately N blocks, where N is a fixed small number. The authors combine that scheme with cached pipeline communication and a two-phase inference calculation; they report less than 2% end-to-end inference-latency overhead in their setup.

The pseudo-query vectors are initialized to zero. That makes initial depth weights uniform, avoiding a volatile random attention preference before training has learned useful depth selection.

## Evidence From the Report

Across five matched MoE models from 194M to 528M activated parameters, Full and Block AttnRes had lower validation loss than the PreNorm baseline at every tested scale. At 5.6 PFLOP/s-days, the fitted Block AttnRes curve reaches loss 1.692 versus 1.714 for the baseline, which the authors describe as a 1.25x compute advantage. The full and block gap narrowed to 0.001 at the largest sweep point.

The main comparison uses a 48B-total/3B-active Kimi Linear model trained on 1.4T tokens. Block AttnRes improved or matched every listed downstream benchmark, including MMLU 73.5 to 74.6, GPQA-Diamond 36.9 to 44.4, Minerva Math 53.5 to 57.1, and HumanEval 59.1 to 62.2.

The authors also observe more bounded periodic output magnitudes at block boundaries and a more uniform gradient distribution across depth. In their ablations, static DenseFormer-style depth mixing did not improve the baseline; input-dependent softmax selection and RMS-normalized keys mattered.

## Analyst Takeaways

1. **Residuals are an information-routing choice.** A fixed additive path is simple but assumes every earlier transformation deserves the same lasting weight.
2. **Cross-depth retrieval can regulate both relevance and scale.** Softmax competition lets a layer select useful prior state rather than only accumulating it.
3. **Block representations are a practical approximation boundary.** They preserve access to distant depth while making pipeline communication and inference caches tractable.
4. **Scaling evidence matters for architectural changes.** Matching optimizer, model, data, and compute across several sizes makes a loss shift more credible than a single end-task comparison.

## Questions and Limitations

- The evidence comes from one developer’s Kimi Linear/MoE family. It does not demonstrate the same benefit for dense transformers, encoders, vision models, or architectures with different normalization schemes.
- Block summaries necessarily lose within-block detail. The paper shows a trade-off but does not identify a task-independent optimal block size.
- The most attractive large-model results are internal technical-report measurements, not yet independent replication.
- Learned depth attention can create persistent depth sinks or make inspection harder; the paper analyzes these patterns but does not establish safeguards for pathological routing.

## Vault Ideas Extracted

* [Depth-Wise Attention Residuals](/vault/depth-wise-attention-residuals.md)
