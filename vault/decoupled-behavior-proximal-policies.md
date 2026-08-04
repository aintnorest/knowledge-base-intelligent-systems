---
type: Synthesis
title: Decoupled Behavior and Proximal Policies
description: Separating the policy that generated a trajectory from the recent policy used to constrain update size, so off-policy correction and policy-change control can be tuned independently.
tags: [reinforcement-learning, generalization, reliability]
timestamp: 2026-07-23T20:03:07Z
---

# Decoupled Behavior and Proximal Policies

In policy optimization, the policy that produced an action and the policy used as a reference for a conservative update serve different purposes. The **behavior policy** belongs in the importance-sampling correction; the **proximal policy** defines how rapidly the current policy is allowed to move. Keep those roles distinct when data can be stale or batch/rollout cadence changes.

## Design

1. Record the behavior policy associated with each trajectory and use it for the action-probability correction.
2. Maintain a recent proximal policy solely for a KL or clipping constraint. An exponentially weighted moving average of current weights is one practical representation.
3. Tune the proximal policy’s age in environment samples, not just optimizer steps. If a batch-size change alters samples per step, update the EMA span and optimizer settings together.
4. Monitor importance-ratio stability, clipping fraction, advantage-normalization noise, and final task performance separately. A stable proximal constraint does not repair an invalid behavior-policy ratio.

## When It Helps

- Asynchronous or distributed collectors deliver trajectories after several learner updates.
- Hardware limits force a smaller optimization or rollout batch than the configuration used for tuning.
- An on-policy method needs to reuse recently collected data without making its update constraint track stale collection history.

## Limitations

- The separation does not make arbitrarily stale data on-policy; importance ratios can still become high variance or unreliable.
- Batch-size invariance is approximate and normally holds only below a problem-specific critical batch size.
- An EMA copy costs memory and forward computation, and its hyperparameters still need validation in the target environment.
- PPO clipping and KL objectives remain approximations to conservative policy improvement, not a general safety guarantee.

## Sources

- [Batch Size-invariance for Policy Optimization dossier](/dossiers/batch-size-invariance-policy-optimization.md) — decoupled PPO/PPG objectives, EWMA proximal policies, Procgen stale-data experiments, and small-batch scaling rules.
