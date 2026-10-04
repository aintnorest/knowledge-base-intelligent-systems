---
type: Study Note
title: Defeating Nondeterminism in LLM Inference
description: A first-party account explaining user-visible inference variability through batch-dependent reduction order and demonstrating batch-invariant kernels with explicit performance costs.
resource: https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/
source: /archive/thinking-machines-defeating-nondeterminism.html
tags: [model-serving, reliability, inference-efficiency, verification]
timestamp: 2026-10-04T06:15:48Z
---

# Defeating Nondeterminism in LLM Inference — Study Notes

**Author**: Horace He, in collaboration with others at Thinking Machines Lab; collaborator count is not specified.  
**Status**: First-party research-engineering blog, September 10, 2025; not a peer-reviewed paper. The archived page metadata records an October 2, 2026 modification.

## What It Is

An explanation and demonstration of why greedy decoding can vary across apparently identical requests, even when individual forward-pass kernels are run-to-run deterministic. The key distinction is **batch invariance**: a request's numerical result should not change with unrelated request load, batch position or how its sequence is partitioned.

## Problem and Motivation

Floating-point addition is non-associative, but concurrency alone is not a sufficient diagnosis. Many ordinary forward-pass reductions already use deterministic accumulation without unordered atomic additions. A deterministic kernel can nevertheless select a different reduction strategy for a different batch shape. Server load changes that shape, so the user's request has an uncontrolled numerical input.

## Mechanism as an Idea

Hold the arithmetic reduction order for each request fixed across serving decisions. Pointwise operations are assumed invariant in the demonstrated stack; RMS normalization, matrix multiplication and attention require explicit treatment.

For normalization, preserve the per-row reduction rather than changing it to exploit spare cores at small batch sizes. For matrix multiplication, preserve tile and tensor-core instruction choices and avoid batch-dependent split reductions. This sacrifices some shape-specific efficiency. Attention additionally must remain invariant to cached versus newly processed tokens and chunked prefill: lay out keys and values consistently before computing attention, then use **fixed split sizes**, not a fixed number of splits or load-dependent partition sizes. The goal is identical arithmetic grouping, not merely identical mathematical formulas.

This is a serving-level complement to [GPU kernel bitwise behavior](/dossiers/gpu-kernel-bitwise-behavior.md), which studies reconstruction and compiler enforcement of arithmetic order. Batch invariance is not universal hardware/software-version invariance.

## Results and Admissions

- For Qwen3-235B-A22B-Instruct-2507 in non-thinking mode, **1,000** temperature-zero completions of a Feynman prompt, each generating 1,000 tokens, yield **80 unique completions**; the most common appears **78** times.
- All outputs match for **102 tokens**, then first diverge at token **103**. **992** continue with “Queens, New York” and **8** with “New York City.” Batch-invariant kernels make all **1,000** completions identical in this experiment.
- One-GPU Qwen3-8B serving of **1,000 sequences**, with output lengths **90–110**, takes **26 seconds** by default, **55 seconds** with unoptimized deterministic serving, and **42 seconds** with improved attention. The separately illustrated matrix-multiplication kernel loses about **20%** performance versus cuBLAS; that is not the end-to-end slowdown.
- In a Bigmath reinforcement-learning demonstration initialized from Qwen 2.5-VL instruct 8B with a 4,096-token rollout limit, unmatched sampler/trainer numerics without importance weighting accompany reward collapse. Importance correction or bitwise-matched sampling/training avoids that collapse; the matched run reports **zero log-probability KL divergence**.

The author explicitly says performance optimization was limited. The fixed-size attention splitting changes were **not included in the code release at publication**, despite being discussed as part of the mechanism.

## Analyst Takeaways

1. **Define the reproducibility boundary.** Same prompt and sampling settings do not imply same effective arithmetic when batching, cache partitioning or kernels vary.
2. **For a controlled replay experiment, stabilize serving or measure its noise.** Otherwise a changed continuation cannot confidently be attributed to the changed policy.
3. **Optimize under an invariance constraint rather than hiding numerical differences with tolerances.** Reproducible arithmetic can cost utilization, especially on small shapes; measure that cost at both kernel and workload levels.
4. **Sampler/trainer equality is a policy property.** Small numerical differences can create off-policy training behavior even when model weights nominally match. The demonstration is not a general claim that all reinforcement learning requires bitwise equality.

## Questions and Limitations

The completion experiment uses one prompt and model configuration; it does not establish universal API determinism, cross-device equality or correctness of generated answers. Distributed reductions are outside the main treatment, and pointwise invariance has stated CPU exceptions. The general language about forward-pass determinism is qualified by the author's admission that not every matrix-multiplication implementation has it.

The article's animated floating-point illustration shows values and an “Exact: 1575” label that do not match the surrounding **1230 + 23.4 = 1253.4** example; the prose arithmetic supports the explanation, not the inconsistent illustration. Numerical repeatability is also not truth: consistently producing the same biography does not verify its facts.

## Vault Ideas Extracted

* [Counterfactual Agent Run Forking](/vault/counterfactual-agent-run-forking.md)
