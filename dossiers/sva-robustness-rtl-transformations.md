---
type: Study Note
title: Robustness of LLM-Generated SystemVerilog Assertions to Semantics-Preserving RTL Transformations
description: Paired metamorphic tests expose correct-to-wrong SVA generation despite unchanged intended RTL semantics, even when aggregate transformed accuracy improves.
resource: https://arxiv.org/abs/2609.05658v1
source: /archive/sva-robustness-rtl-transformations.pdf
tags: [verification, evaluation, reliability, generalization]
timestamp: 2026-09-24T03:45:00Z
---

# Robustness of LLM-Generated SystemVerilog Assertions to Semantics-Preserving RTL Transformations — Study Notes

**Author**: FNU Aditi  
**Venue**: arXiv:2609.05658v1 [cs.LG]  
**Date**: September 4, 2026

## What It Is

This is a controlled robustness study of LLM-generated hardware assertions, **not** an agentic system or a new generation model. If a SystemVerilog assertion correctly describes an RTL assignment behavior, should it remain correct when the same Boolean control flow is written with rearranged operands, different identifiers, or redundant parentheses? Aggregate accuracy on the transformed corpus cannot answer that paired question: some wrong outputs become correct while some originally correct outputs fail.

## Construction and Method

The author audits **20,000** VERT records, restricts to **10,400** conditional-control candidates, filters **1,243** records with duplicate property names or unexpected property counts, and samples **40** quality-filtered RTL programs comprising **295 assignment behaviors**. These form four 10-program strata crossing nested-if versus if/else and synchronous versus asynchronous. Case-style X/Z wildcard behavior is excluded.

The three intended semantics-preserving rewrites are operand reordering (**38 programs, 280 behaviors**), deterministic identifier renaming with inverse name mapping for scoring (**40, 295**), and redundant parenthesization (**40, 295**). Qwen2.5-Coder-7B-Instruct and DeepSeek-Coder-V2-Lite-Instruct are run as local 4-bit models with one prompt and greedy decoding. Their outputs must give one property per assignment, correct branch/path preconditions, and a matching consequent. A restricted Boolean parser scores antecedent equivalence by exhaustive truth table for up to 16 atoms; this is not full SVA model checking. Uncertainty uses **10,000** RTL-program-level clustered bootstrap resamples.

## Results

| Model and rewrite | Baseline → transformed accuracy | Correct→wrong / baseline correct | Wrong→correct | Invariance failure |
|---|---:|---:|---:|---:|
| Qwen; operand order | 70.0% → 67.1% | 19/196 | 11 | **9.7%** |
| Qwen; rename | 69.8% → 68.8% | 21/206 | 18 | **10.2%** |
| Qwen; parentheses | 69.8% → 58.6% | 45/206 | 12 | **21.8%** |
| DeepSeek; operand order | 53.2% → 58.2% | 24/149 | 38 | **16.1%** |
| DeepSeek; rename | 53.9% → 63.7% | 31/159 | 60 | **19.5%** |
| DeepSeek; parentheses | 53.9% → 49.8% | 43/159 | 31 | **27.0%** |

DeepSeek's renaming condition is the striking example: **60 gains exceed 31 losses**, lifting average accuracy by **9.8 percentage points** while **31/159** previously correct behaviors fail. Confidence intervals for that accuracy change include zero (**−2.5 to +21.6 points**); its invariance-failure interval is **8.8%–30.6%**. Qwen's parentheses accuracy loss is **−11.2 points**, with interval **−21.3 to −2.2**. Of **30** manually examined correct-to-wrong transitions (five per model/rewrite), **28** are described as semantic/path-condition faults and two as merged-consequent output-contract failures. Frequent mistakes omit enclosing or prior branch guards, invert polarity, or corrupt Boolean structure.

## Analyst Takeaways

1. **Measure paired loss, not only marginal accuracy.** Invariance failure conditions on original correctness, exposing defects canceled by unrelated gains in aggregate.
2. **Use equivalent-code perturbations in a verification workflow.** Preserve original and transformed RTL, compare generated assertions, and escalate flips to an engineer and an actual compiler/formal/simulation check where available.
3. **Do not mistake agreement for truth.** Both versions can produce the same wrong assertion; representation stability is a warning sensor, not a sufficient correctness certificate.

## Questions and Limitations

- Forty selected synthetic/augmented programs and 38–40 program clusters cannot establish a population rate for all RTL, temporal assertions, arithmetic logic, or production hardware. Models share one local 4-bit inference setting.
- The Boolean scorer excludes full four-state SystemVerilog semantics and many temporal/bit-vector constructs. Metamorphic transformations are intended to preserve relevant behavior, but exhaustive language-level equivalence is not reported.
- The 30-case manual check is a selected subset of losses, not a comprehensive scorer audit; an accompanying artifact is described as intended, not confirmed available by this source.

## Vault Ideas Extracted

* [Paraphrase–Adversarial Evaluator Validation](/vault/paraphrase-adversarial-evaluator-validation.md)
