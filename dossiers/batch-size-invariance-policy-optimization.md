---
type: Study Note
title: Batch Size-invariance for Policy Optimization
description: Personal study notes on Hilton, Cobbe, and Schulman's NeurIPS 2022 analysis of PPO's behavior and proximal-policy roles, EWMA proximal policies, and small-batch scaling rules.
resource: https://arxiv.org/abs/2110.00641v3
source: /archive/batch-size-invariance-policy-optimization.pdf
tags: [reinforcement-learning, evaluation, generalization]
timestamp: 2026-07-23T20:03:07Z
---

# Batch Size-invariance for Policy Optimization - Study Notes

**Authors**: Jacob Hilton, Karl Cobbe, and John Schulman  
**Venue**: NeurIPS 2022; arXiv:2110.00641v3 [cs.LG]  
**Date**: September 24, 2022  
**Pages**: 32

## What It Is

This paper revisits why PPO-style policy optimization is sensitive to batch size. Its central distinction is between the policy that collected a trajectory and the recent policy used to limit the size of an update. PPO normally represents both with one “old” policy, but those roles have different mathematical requirements.

The behavior policy must remain in the importance-sampling ratio so an update is correctly corrected for off-policy data. The proximal policy only supplies the KL or clipping reference that limits how quickly the current policy changes. It can therefore be a different recent policy. The authors use an exponentially weighted moving average (EWMA) of policy weights as that proximal policy and call the resulting variants PPO-EWMA and PPG-EWMA.

## The Two Policy Roles

The paper separates two jobs that ordinary PPO couples:

1. **Behavior policy** — the policy that generated the sampled actions. It is required for importance weighting and cannot be substituted without bias.
2. **Proximal policy** — a recent comparison policy that makes a KL penalty or clipped objective constrain update size. It does not need to have generated the data; it only needs an appropriate effective age.

This reframes PPO’s regularization as controlling update speed rather than necessarily staying close to the data-collection policy. It also explains an asynchronous-training failure mode: using the latest policy for an importance ratio on stale data introduces bias, while using the old behavior policy as the proximal reference can make the constraint unnecessarily conservative.

## How PPO-EWMA Scales

PPO has both an optimization batch size (samples per gradient step) and an iteration batch size (samples collected before alternating into optimization). To preserve behavior when both are changed by a factor, the paper holds the proximal policy’s age fixed in environment-step units rather than gradient-step units.

For Adam in the small-batch regime, reducing batch size by a factor of c calls for reducing its step size by the square root of c, alongside reparameterizing the EWMA so its center-of-mass age grows by c in gradient steps. This keeps its physical age approximately constant after each step processes fewer environment samples. The authors also scale the advantage-normalization window and PPG phase settings where relevant.

The approach is only expected to work below a critical batch size, where optimizer noise dominates discretization differences. It is a portability rule for an already tuned regime, not a claim that all batch sizes behave identically.

## Evidence From Procgen

The experiments use all 16 hard Procgen environments.

- With deliberately stale data, the decoupled objective retained performance with little loss until roughly eight iterations of staleness, or more than 500,000 environment steps. Both coupled alternatives degraded even under much smaller delays.
- Starting from 256 parallel environments and reducing by factors of four down to one, PPG-EWMA achieved a final mean-normalized-return difference of 0.052 between the largest and smallest batches. Excluding the unexplained Heist outlier, the difference was 0.019.
- Removing the Adam step-size adjustment was the most damaging ablation and made the smallest batches unstable. Advantage-window adjustment mattered especially in environments with noisy advantage estimates; EWMA-age adjustment mattered modestly but consistently.
- In held-out Procgen environments, the EWMA variants slightly but consistently beat ordinary PPO and PPG. The extra forward passes raised measured wall-clock time by about 19% for PPO and 3% for PPG in the authors’ implementation, including environment stepping.

## Analyst Takeaways

1. **Correct for collection history and constrain update history separately.** Reusing one reference policy is convenient but can conflate unbiased estimation with trust-region control.
2. **Tune in sample units, not only optimizer steps.** An EMA span, learning rate, normalization window, and rollout cadence change their effective meaning when the amount of data per step changes.
3. **Batch portability has preconditions.** It is most plausible when the new batch remains below the system’s critical batch size and the objective’s clipping, advantage, and phase mechanics are rescaled together.
4. **Stale trajectories are not automatically unusable.** They need a correct behavior-policy correction; the proximal regularizer can remain local to the current training dynamics.

## Questions and Limitations

- The empirical evidence is limited to Procgen, PPO/PPG variants, and the paper’s convolutional-network training setup. It does not establish the same scaling law for every RL algorithm, environment, or distributed system.
- The authors could not explain the Heist outlier, so the reported invariance is approximate rather than guaranteed.
- An EWMA proximal network consumes additional model memory and compute. Its benefit may not justify the cost where data are fresh or ordinary PPO already meets the system’s throughput target.
- Preserving final return across batch sizes does not prove identical learning trajectories, safety behavior, or robustness to hyperparameter changes outside the studied small-batch regime.

## Vault Ideas Extracted

* [Decoupled Behavior and Proximal Policies](/vault/decoupled-behavior-proximal-policies.md)
