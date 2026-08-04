---
type: Study Note
title: Latent-GRPO: Group Relative Policy Optimization for Latent Reasoning
description: Personal study notes on Deng et al.'s latent-reasoning RL method, which constrains off-manifold rollouts, aligns noisy latent updates with advantage signs, and avoids harmful averaging of correct latent paths.
resource: https://arxiv.org/abs/2604.27998v1
source: /archive/latent-grpo.pdf
tags: [reinforcement-learning, reasoning, chain-of-thought]
timestamp: 2026-07-23T20:03:07Z
---

# Latent-GRPO: Group Relative Policy Optimization for Latent Reasoning - Study Notes

**Authors**: Jingcheng Deng, Zihao Wei, Liang Pang, Junhong Wu, Shicheng Xu, Zenghao Duan, and Huawei Shen  
**Venue**: Preprint; arXiv:2604.27998v1 [cs.LG]  
**Date**: April 30, 2026  
**Pages**: 17

## What It Is

Latent-GRPO adapts group-relative policy optimization to reasoning traces whose intermediate steps are continuous mixtures of top-k token embeddings rather than emitted natural-language tokens. The motivation is shorter reasoning: a latent sequence can compress intermediate work, but naïvely applying GRPO to it is unstable.

The paper identifies three distinct failures. First, RL does not reliably create a valid latent-reasoning manifold from an ordinary explicit model, and noisy exploration can leave the manifold in non-terminating trajectories. Second, two-sided Gumbel perturbations can cause a component in a positive-advantage trajectory to receive a probability-decreasing update. Third, fitting several correct continuous paths can average their first latent states into a representation that is not a valid continuation of any path.

## The Method

Latent-GRPO begins from a Latent-SFT model rather than learning latent reasoning by RL from scratch. It adds three guardrails:

1. **Invalid-sample advantage masking** excludes trajectories that reach the maximum response length from group reward normalization and assigns them zero advantage. This prevents obvious off-manifold rollouts from contaminating the update statistics of valid samples.
2. **One-sided noise sampling** transforms Gumbel perturbations so the margin is strictly positive. That makes the local update direction agree with the sign of a trajectory’s advantage instead of depending on whether a sampled perturbation happened to be negative.
3. **Optimal correct-path first-token selection** selects one correct trajectory’s first latent token for the shared-prefix update, ranked by its average surrogate log probability. Later tokens from other correct paths still receive learning signal. The goal is to avoid mode averaging at the earliest shared continuous decision.

## Experimental Results

The low-difficulty setting starts from LLaMA-3.2-1B-Instruct and evaluates GSM8K-Aug, GSM-Hard, SVAMP, and MultiArith. Latent-GRPO improves average Pass@1 from 50.46 for Latent-SFT to 58.32 while using 21.2 average reasoning tokens, versus 94.2 for explicit GRPO. It outperforms the paper’s Soft-GRPO baseline, which improved only 0.27 points over Latent-SFT.

The high-difficulty setting uses Qwen2.5-Math-7B on Math500, AIME24, AIME25, and GPQA. Latent-GRPO reaches 41.72 average Pass@1, versus 26.95 for Latent-SFT and 37.45 for explicit GRPO, with 1,649 average tokens versus GRPO’s 5,466. On Math500, it reports 80.40 Pass@1 against GRPO’s 75.15.

Under Gumbel sampling at inference, the model trades some deterministic Pass@1 for much better Pass@k exploration. For example, on AIME24 it reaches 46.7–50.0 at Pass@64 depending on noise strength, versus explicit GRPO’s 23.3.

## What the Ablations Show

Removing one-sided noise sampling caused sharp degradation and eventual collapse in both the low- and high-difficulty settings, together with poorly controlled response length. Removing first-token selection hurt less at first but reduced gains and destabilized difficult tasks earlier. The paper therefore frames aligned noise as the primary stability mechanism and first-token selection as protection against a continuous-space-specific multi-path failure.

## Analyst Takeaways

1. **Continuous reasoning needs state-validity controls.** An outcome reward cannot by itself tell whether a latent trajectory stayed in a usable region.
2. **Check the sign of a stochastic surrogate update.** A reparameterized density can be mathematically defined yet still make an advantage update locally counterproductive.
3. **Do not assume mixtures of good trajectories are good states.** In continuous decision spaces, averaging correct alternatives can destroy the structure needed for a next step.
4. **Evaluate efficiency and search separately.** Deterministic short latent traces optimize Pass@1 and length; noisy sampling may lower single-sample accuracy while materially improving Pass@k.

## Questions and Limitations

- The method requires an already capable Latent-SFT initialization. It does not solve how to build a valid latent reasoning space from general pretraining data.
- Masking non-terminating samples protects the group statistic but can also remove direct negative learning signal for a serious failure mode.
- Results cover math/science reasoning benchmarks and two modest base models. They do not establish performance for open-ended tool use, coding, safety-critical decisions, or much larger models.
- Latent traces are less readable and harder to audit than explicit reasoning. A compact hidden trajectory should not be treated as an explanation or a substitute for independently verifiable evidence.

## Vault Ideas Extracted

* [Manifold-Safe Latent Reinforcement Learning](/vault/manifold-safe-latent-rl.md)
