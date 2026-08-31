---
type: Synthesis
title: Stop-Gradient Correlation Decoupling
description: Using one correlation statistic as a loss twice, with the stop-gradient on opposite operands, so the same term first fits a nuisance signal and then removes it from the model under correction.
tags: [reinforcement-learning, reliability, verification]
timestamp: 2026-08-25T19:28:34Z
---

# Stop-Gradient Correlation Decoupling

When you want a model's output to stop depending on some nuisance signal, a correlation coefficient between the two makes a serviceable loss term. The subtlety is that a correlation is symmetric — it does not say which side should move. **The stop-gradient does.** Placing it on one operand or the other turns a single expression into two opposite training objectives.

Write ρ for the Pearson correlation over a batch, `r` for the model's output, and `r̂` for a probe's prediction of the nuisance effect:

- **Fit**: minimize `−|ρ(sg(r), r̂)|`. Gradients reach only the probe, which is pushed to *maximize* correlation — to become an accurate model of the nuisance component in `r`.
- **Remove**: minimize `|ρ(r, sg(r̂))|`. Gradients reach only the model, which is pushed to *decorrelate* from a now-frozen nuisance prediction.

Alternate the two on a fixed step cadence and the probe keeps tracking the model as the model moves away from it. Pair the removal term with the model's original task loss so decorrelation does not simply destroy the signal.

## Why the Statistic Is Not the Assumption

A recurring confusion: using a *linear* correlation coefficient does not commit you to a linear relationship between the model output and the underlying attribute. The nuisance attribute is mapped to `r̂` by the probe, which can be arbitrarily non-linear. Pearson only aligns the two scalar series `r` and `r̂`. Where the assumption actually lives is in the probe's capacity and in the target value — see Limitations.

## Practical Notes

- **Correlation is a batch statistic.** Its estimate is noisy at small batch size. Aggregating the paired values across all data-parallel devices before computing ρ raises the effective B at negligible cost and is worth doing.
- **Use `|ρ|`, not ρ.** Signed correlation lets the model satisfy the objective by flipping direction rather than reducing dependence.
- **Watch the task loss during the removal phase.** It should rise modestly — the objective genuinely got harder once a shortcut was withdrawn. A flat task loss suggests the decorrelation term is not biting; a collapsing one suggests it is overwhelming the task.
- The same construction generalizes to any differentiable dependence statistic (distance correlation, HSIC) when linear correlation proves too weak; the stop-gradient logic is unchanged.

## Limitations

- **Decorrelation is not independence.** Zero Pearson correlation permits substantial non-monotonic dependence to survive.
- **Zero may be the wrong target.** The objective silently asserts that the correct dependence is none at all. When the nuisance attribute is partly legitimate, that over-corrects, and the framework offers no way to specify a non-zero setpoint.
- **Batch composition leaks into the objective.** Because ρ is computed within a batch, sampling that correlates the nuisance attribute with anything else changes what gets removed.
- **Two alternating objectives add a cadence hyperparameter** on top of the usual ones, and the alternation makes both losses non-stationary and harder to read as convergence signals.

## Sources

- [Bias Fitting to Mitigate Length Bias of Reward Model in RLHF dossier](/dossiers/fimi-rm-bias-fitting-length-bias.md) — FiMi-RM uses `−|ρ(r_sg, r̂)|` to fit a length probe and `|ρ(r, r̂_sg)| + L_BT` to debias the reward model, alternating every 8 steps and aggregating Pearson across 8 GPUs; the Bradley-Terry loss rises 0.530 → 0.566 during the removal stage while downstream scores improve.
