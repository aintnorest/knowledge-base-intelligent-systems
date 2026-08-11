---
type: Synthesis
title: Policy-Adaptive Reward Bounds
description: Rescaling continuous task rewards against the policy's own recent score frontier instead of fixed theoretical extrema, so that differences between current candidates stay visible to the update.
tags: [reinforcement-learning, evaluation, verification]
timestamp: 2026-08-11T17:30:00Z
---

# Policy-Adaptive Reward Bounds

Reinforcement learning from verifiable outcomes is straightforward when rewards are binary. It becomes a scaling problem the moment tasks return continuous scores on incomparable metrics — accuracy on one task, log loss on another, RMSE on a third, each with its own direction and range.

The obvious fix is to map each score into [0, 1] using fixed bounds from task metadata: theoretical extrema, or best and worst leaderboard entries. This fails in a specific and quiet way. Those bounds are usually far wider than the region the current policy actually reaches, so every candidate the policy produces lands in a narrow sliver of the interval. Two meaningfully different programs receive nearly identical rewards, the within-group differences vanish, and the update learns almost nothing about which candidate was better.

**Derive the bounds from the policy instead.** Convert every metric so larger is better, then build a moving range over successful historical scores plus the current rollout group:

- upper bound = the best observed score;
- lower bound = the *k*-th best (e.g. the 16th), or the lowest available when fewer than *k* exist;
- extend the lower bound downward by a fraction of the gap (e.g. 25%), so moderately good programs are not clipped to zero when scores cluster tightly;
- clamp against static theoretical or leaderboard limits when metadata provides valid ones, with fallback to the static pair if the result is degenerate.

Scores below the resolved lower bound map to zero. Because the range is recomputed from recent policy output, it follows the score frontier upward as training improves and keeps preserving resolution where candidates actually sit.

## Concentrating the Signal on the Top

Adaptive bounds make differences visible; a second choice decides how much each candidate influences the update. When the objective is the quality of the *best* artifact found — best-of-N, pass@k, "did any run earn a medal" — a barely viable candidate should not receive the same positive push as the group's best. Replacing group-mean normalization with an entropy-controlled softmax over group rewards, with the concentration parameter chosen so the resulting distribution sits at a fixed divergence from uniform (e.g. KL ≈ log 2), amplifies the gap at the top of each group. In the source system this raised the mean processed advantage assigned to the group's best candidate from 1.58 to 6.39.

The two mechanisms are complementary and ordered: bounds restore resolution, then weighting decides where to spend it.

## Practical Use

Reach for this when rewards are continuous, heterogeneous across tasks, and the achievable range is unknown or much narrower than the nominal one. Keep both the static and adaptive reward views in metadata — the static view stays comparable across training runs and is the right thing to log, while the adaptive view drives the update.

Pair it with an explicit reward-hacking check. Any scheme that stretches resolution around the current frontier also amplifies the payoff of degenerate submissions that happen to score in that band; a pre-execution judge or validity gate belongs in the same reward path.

Guard the edge cases explicitly: groups of size one, groups where all rewards are equal, and tasks where the historical pool is still empty.

## Limitations

- A moving target makes rewards non-stationary. Absolute reward curves across training steps are no longer directly comparable, which complicates monitoring and early stopping.
- If early scores are clustered at a bad local optimum, the adaptive range sharpens distinctions inside a region that does not matter.
- Upper-tail weighting suppresses learning signal from the broad middle of a group, which can hurt when the goal is reliable average performance rather than best-of-N.
- The choice of *k*, the extension fraction, and the concentration target are unablated hyperparameters in most reports; they encode assumptions about group size and score distribution.

## Sources

- [Frontis-MA1: Training an AI4AI Model towards Recursive Self-Improvement in Machine Learning Engineering](/dossiers/frontis-ma1-ai4ai-recursive-self-improvement.md) — specifies the moving-range construction (best score, 16th-best lower reference, 25% downward extension, static clamp) and the entropic group advantage at KL ≈ log 2 with a leave-one-out denominator; also documents the reward hacking it had to gate against.
