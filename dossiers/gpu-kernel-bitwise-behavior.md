---
type: Study Note
title: "Taming Bitwise Behavior in GPU Kernels with Tensor Core: Black-Box Reconstruction, Compiler Enforcement, and Static Verification"
description: Investigates floating-point reduction order in GPU kernels through cuBLAS arithmetic reconstruction, pinned compiler reductions, and conservative compiled-kernel equivalence signatures.
resource: https://arxiv.org/abs/2609.11356v1
source: /archive/gpu-kernel-bitwise-behavior.pdf
tags: [verification, reliability, inference-efficiency, model-serving]
timestamp: 2026-09-24T03:45:00Z
---

# Taming Bitwise Behavior in GPU Kernels with Tensor Core: Black-Box Reconstruction, Compiler Enforcement, and Static Verification — Study Notes

**Authors**: Ziteng Yang, Nicholas J. Riasanovsky, Warren Deng, and Vivek Sarkar  
**Venue**: arXiv:2609.11356v1 [cs.DC]  
**Date**: September 10, 2026

## What It Is

This is a GPU numerical reproducibility and compiler paper, **not an agentic-coding study**. Mathematically equivalent floating-point kernels can produce different bytes because tile layout, split-K grouping, accumulation precision, fusion, and rounding change the operation order. A serving system can thus lose batch invariance even with fixed weights and seeds. The work describes GEMM arithmetic in a `GEMMDesc`, reconstructs closed cuBLAS behavior through black-box probes, pins a reduction tree in Triton's compiler, and statically partitions compiled kernel candidates by likely bitwise behavior before autotuning.

## Mechanism and Evidence

The authors probe cuBLAS launch and cost-model choices with cancellation patterns along the contracted dimension, then build matching Triton families for specific hardware/library combinations. Their compiler's inner-tree mode enforces a balanced reduction order; a later layout pass moves eligible reductions into a warp without changing that tree. A PTX/AMDGCN checker tracks load addresses and arithmetic dependencies, canonicalizes commutative structures, and conservatively groups candidates. The checker does **not** establish final machine-code equivalence or arbitrary-input equivalence.

On GB300 with cuBLAS 13, **110,753/110,813** tested fp16 shapes match bitwise across ten draws each; the remaining **60** are classified as a cuBLAS split-K tail defect. Thus the paper's conditional “100%” match excludes those 60, not the entire campaign. An independent all-ones example with M=N=1 and K=8648 should return **8648**, but the reported vendor split-K algorithm returns **8640**, omitting eight terms. Matching vendor bytes would reproduce a defect; correctness against the full sum is a separate obligation.

The checked corpus contains **51,152** GB300 configurations from 47 kernels and **4,500** on AMD gfx942, with no observed checker-certified equivalences that disagreed on tested input draws. Precision is uneven: ordinary GEMM's **6,304** PTX configurations yield one checker and one measured class, whereas one grouped-K GEMM variant has **138 checker classes versus six measured classes (23× over-splitting)**. This makes conservative pruning useful but sometimes leaves significant autotuning search unexplored.

With pinned-tree layout optimization, **19/27** tuned kernel measurements across GB300 and H100 lie within **10%** of separately tuned free-order baselines. Against cuBLAS for larger GEMMs, the paper reports **56–93%** cuBLAS speed for bit-exact Triton across layer groups; a fused-epilogue arm reaches **95–168%** of a cuBLAS-plus-separate-epilogue baseline because it can remove launch overhead. These are group-level comparisons under distinct baselines, not one universal speed factor.

## Analyst Takeaways

1. **Specify what “same result” means.** Bitwise agreement with a library, exact full-sum reference, numerical tolerance, and cross-device reproducibility are distinct contracts; reviewers should know which has been tested.
2. **Preserve reproducibility artifacts.** Kernel shape, dtype, hardware, library/compiler versions, reduction descriptor, compiled code, and differential-test inputs matter when comparing generated or autotuned kernels.
3. **Use a static signature as a filter, not final proof.** Benchmark representative classes only after conservative structural grouping, then independently test bytes and adversarial tail/cancellation cases. This is relevant to numerical code quality, not a reason to add an agent-specific vault concept.

## Questions and Limitations

- Experimental byte equality over sampled shapes/draws cannot prove agreement over all inputs or across GPUs; cross-machine descriptor equivalence is explicitly unmeasured. Static analysis stops at PTX/AMDGCN, before final vendor machine-code assembly.
- Tests concentrate on the specified GEMM/reduction kernels and hardware generations. Appendix attention descriptors are theoretical rather than evaluated implementations; performance numbers depend strongly on baseline, launch accounting, and workload.
- Conservative checker classes can badly over-split; none of the results shows a measured improvement in complete model-training or serving quality.

## Vault Ideas Extracted

* No vault page was created or updated from this source; its ideas are recorded here only.
