---
type: Synthesis
title: Latent-Space Expert Routing
description: Projecting routed mixture-of-experts computation into a smaller latent width to reduce expert weight loading and cross-device dispatch, then reinvesting the budget in expert diversity or lower active cost.
tags: [mixture-of-experts, model-serving, inference-efficiency, routing]
timestamp: 2026-07-23T20:03:07Z
---

# Latent-Space Expert Routing

Latent-space expert routing sends a token through a learned down-projection before it enters routed experts, performs the expert transformation in the smaller width, aggregates outputs, and projects back to the model width. It attacks the dimensions that dominate MoE serving: expert weights loaded per request and tokens moved in all-to-all dispatch.

## Trade-off Surface

Compression creates two useful ways to spend the saved width:

| Goal | Reinvestment | Expected effect |
|---|---|---|
| Lower active cost | Increase total expert count while retaining top-k | Preserves specialization diversity while reducing routed bandwidth and active parameter loading |
| Higher quality at similar serving cost | Increase both expert count and top-k in proportion to compression | Preserves routing/memory budget while expanding active nonlinear capacity and expert combinations |

The compression must remain above a task-dependent representation rank. Below that point, the projection discards information before expert specialization can recover it.

## Practical Use

Profile the actual bottleneck first. Interactive low-concurrency serving is commonly limited by expert weight bandwidth; high-throughput expert-parallel serving may be limited by all-to-all communication. Compare candidates at fixed quality, total parameters, active FLOPs, throughput, and latency rather than treating any one of those as the objective.

## Limitations

- A smaller expert matrix can underutilize accelerator kernels, especially at small batches.
- Projection and routing still add kernels, state, and load-balancing decisions.
- More experts or a larger top-k can change calibration, load balance, tail latency, and specialization quality even when mean benchmark accuracy improves.

## Sources

- [LatentMoE dossier](/dossiers/latentmoe.md) — hardware-aware motivation, latent expert computation, accuracy- and efficiency-oriented variants, and 16B/95B/hybrid experiments.
