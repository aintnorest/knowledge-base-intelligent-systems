---
type: Study Note
title: "The Replay Gap: Static Evaluation of Model Switching in LLM Agents Scores the Wrong World"
description: Controlled live forks expose state-distribution changes hidden by logged model-switch evaluation, with same-model noise controls and sharply bounded outcome evidence.
resource: https://arxiv.org/abs/2608.08239v1
source: /archive/replay-gap-model-switching-evaluation.pdf
tags: [evaluation, routing, coding-agents, reliability, agents]
timestamp: 2026-10-04T06:15:48Z
---

# The Replay Gap — Study Notes

**Author**: Ashritha Gonuguntla, Carnegie Mellon University (single author).  
**Status**: Archived arXiv v1, August 8, 2026; the manuscript says accepted at the **Efficient Reasoning Workshop, COLM 2026**, not the COLM main conference.

## What It Is

A controlled pilot comparing logged-outcome replay with live counterfactual model switches in software-repair agents. The central issue is causal: changing an action changes the next environment observation. A router cannot generally substitute another model's logged answer while retaining the original run's future states.

## Problem and Motivation

Single-turn routing can look up candidate answers because the query is fixed. Inside an agent, later queries are consequences of earlier actions. Cheap log stitching silently treats a closed-loop system as an open loop. Even same-model replay may fail when the serving stack is not reproducible.

## Mechanism as an Idea

Run a base trajectory, fork at 30% and 70% of its eventual length, rebuild a fresh task container by executing the recorded action prefix, restore the same conversation prefix, and continue each branch live. Pair every cross-model switch with a same-model branch to estimate the sampling, serving and reconstruction noise floor.

The experiment uses mini-SWE-agent, SWE-bench Verified, a 50-step budget and 28k context, with FP8 Qwen3-4B-Instruct and AWQ Qwen3-14B with thinking disabled on one 24 GB GPU. Six 30-instance direction/tier sweeps produce approximately 900 rollouts. Metrics separate action-sequence divergence, first divergence, valid replay prefix, actual patches and official task resolution. Patch comparisons exclude or separately identify empty-patch pairs.

## Results and Admissions

- Switches change **61–94%** of post-fork actions, with paired normalized edit-distance excess over controls of **+0.254 to +0.663**. All four arms remain above zero under Bonferroni-adjusted confidence intervals.
- Early switches diverge on the first action in **73.9%** of upgrades and **76.7%** of downgrades, versus **35.2%** and **5.6%** of controls. Their replay-valid state fractions are **3.2%** and **8.0%**: the abstract's “only 3%” is one arm, not a universal figure.
- There are **five outcome flips across three instances**, all in switch branches, and **zero across 359 same-model controls**. This is sparse outcome evidence, not a demonstrated ranking of competent routers.
- The stitch evaluator misses all **three actual switching successes** and falsely predicts **two successes**: **0-for-5 success-relevant calls**, despite 97–100% raw agreement dominated by failures. These five calls are **not** the same five events as the outcome flips; two downgrade losses are called correctly by replay.
- Predicted versus actual patch similarity is **0.00–0.11** on pairs where either patch is nonempty. Same-model comparisons on that subset reach only **0.31** for the FP8 configuration and **0.53** for AWQ.
- FP8 same-model controls diverge in **90–96%** of forks; half of AWQ controls never diverge. These compare deployment configurations, not quantization methods causally isolated from model size.
- Reconstruction reports **99.99% return-code agreement over 11,702 actions**, with **707/708** branches matching every return code. Return-code fidelity is narrower than byte-for-byte environment equivalence.

Later forks diverge less in both directions. In one full-difficulty sweep, the larger model exhausts its budget without submitting in **24/30** base runs versus **17/30** for the smaller model. The proposed “thoroughness tax” is explicitly a hypothesis from a small, uncorrected comparison.

## Analyst Takeaways

1. **Counterfactuals require a new future.** Preserve a common prefix, then execute each candidate policy against its own evolving environment rather than pretending the old observations remain valid.
2. **Measure the control floor before attributing divergence.** Temperature zero does not certify reproducibility; see [Defeating Nondeterminism](/dossiers/thinking-machines-defeating-nondeterminism.md) and [GPU kernel bitwise behavior](/dossiers/gpu-kernel-bitwise-behavior.md).
3. **Separate routing quality from step appetite.** A more capable model can consume the remaining budget before producing an admissible result. Evaluate complete episodes, not per-call answer quality alone.
4. **Do not let majority-class agreement or empty artifacts inflate confidence.** Report outcome flips, success-relevant errors and nonempty-patch subsets explicitly.

## Questions and Limitations

One scaffold, benchmark family and model family, two quantized configurations, 30 instances per sweep and **0–3% base resolution** sharply limit routing-policy conclusions. Early escalation and late downgrading are hypotheses, not established deployment rules. Fork depths depend on hindsight base length. Importance-sampling alternatives face long horizons and poor support in unbounded textual action spaces; this paper proposes no validated cheaper estimator.

The manuscript reports **717 scored branch pairs**, whereas Table 1 arm counts sum to **717 branches**, and prefix fidelity covers **708 branches**. These denominators are not fully reconciled; preserve the reported arm counts rather than interpreting 717 as 717 matched control–switch pairs.

## Vault Ideas Extracted

* [Cost-Aware Inference Control](/vault/cost-aware-inference-control.md)
* [Counterfactual Agent Run Forking](/vault/counterfactual-agent-run-forking.md)
