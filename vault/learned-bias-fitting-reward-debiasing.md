---
type: Synthesis
title: Learned Bias Fitting for Reward Debiasing
description: Deliberately preserving a reward model's spurious attribute bias, training a tiny probe to fit the attribute-to-reward curve, then training the reward model to decorrelate from that fitted curve.
tags: [reinforcement-learning, reliability, evaluation, generalization]
timestamp: 2026-08-25T19:28:34Z
---

# Learned Bias Fitting for Reward Debiasing

A reward model trained on human preference data absorbs whatever shortcuts the annotators left behind — response length, markdown formatting, list structure, hedging tone. The policy then finds the shortcut faster than it finds the intended behavior. Most corrections either suppress the symptom without describing it (KL regularization, data rebalancing, ensembling) or assume the bias has a convenient shape, usually linear, and subtract it.

**Bias fitting takes a third route: characterize the bias empirically with a learned probe, then remove exactly what the probe found.** Because the probe is a neural function of the attribute, no functional form has to be assumed in advance.

## The Pattern

1. **Warm up and keep the flaw.** Train the reward model normally and deliberately do *not* debias during this stage. A bias you have already suppressed cannot be measured, so the correction is postponed rather than applied early. This inverts the usual instinct.
2. **Fit the bias with a probe.** Train a small model that sees *only the suspect attribute* — not the prompt, not the response text — and predicts the reward model's score. Encoding a scalar attribute with a sinusoidal basis before a few residual MLP blocks is one cheap, well-behaved choice. The probe can be tiny: thousands of parameters against a multi-billion-parameter reward model.
3. **Decorrelate.** Train the reward model against a composite loss: its original preference objective, plus a penalty on its correlation with the probe's frozen prediction. The preference term protects discrimination; the correlation term removes the shortcut.
4. **Alternate.** Interleave probe updates and reward-model updates on a fixed cadence (e.g. swap every 8 steps). The reward model is a moving target — a curve fitted once goes stale as soon as debiasing begins. Fitting and mitigating in a single joint stage measurably underperforms staging them.

The probe is a *diagnostic artifact* as much as a training component. Plotting its fitted curve tells you the shape of the bias you are carrying. In the source work, the length–reward relation turned out to be steeply linear below ~100 tokens, flat afterward, and slightly *downward* for very long outputs — a shape no constant length penalty can express.

## Practical Use

Reach for this when you can name a scalar or low-dimensional attribute you believe is spuriously driving reward, and you do not trust a hand-specified functional form for its effect. It generalizes past length to any measurable surface feature: token count, markdown-element count, code-block presence, response latency.

Budget honestly. Because probe steps are far cheaper than reward-model steps and can *replace* rather than add to the step budget, this class of method can end up cheaper per epoch than the undebiased baseline. Verify that in your own setup rather than assuming it.

Expect the debiased model's raw preference accuracy to fall slightly, and interpret that with a [confound-partitioned split](/vault/confound-partitioned-accuracy.md) rather than at face value. Monitoring the preference loss during the decoupling stage is a useful sanity check: it should rise modestly, since removing a shortcut makes the objective genuinely harder, while downstream quality metrics hold or improve.

## Limitations

- **Zero is an assumption, not a finding.** Driving correlation to zero presumes true preference is independent of the attribute. For length that is doubtful — thorough answers are longer *and* better on many tasks, and users sometimes explicitly request detail. The method has no principled way to choose a non-zero target.
- **A probe that sees only one attribute removes everything correlated with it.** Topic, format, and register that co-vary with the attribute get decorrelated as collateral damage; legitimate attribute-linked quality is indistinguishable from the shortcut.
- **Correlation is not independence.** A linear-dependence statistic driven to zero still permits residual non-monotonic structure.
- **The attribute must be named in advance.** This is a targeted correction, not a discovery procedure for unknown biases.
- **The non-linear probe's margin over a plain linear fit can be small.** Ablate it; the staging, the alternation, and the decorrelation objective may be doing most of the work.

## Related

- [Verbosity Bias in Preference Evaluation](/vault/verbosity-bias-in-preference-evaluation.md) — the umbrella problem this technique corrects, including why a single global length penalty is unsound and how the residual bias should be measured.

## Sources

- [Bias Fitting to Mitigate Length Bias of Reward Model in RLHF dossier](/dossiers/fimi-rm-bias-fitting-length-bias.md) — FiMi-RM's warm-up / fit / debias staging with a 6.4K-parameter length-encoded ResNet probe, 8-step alternation, and evidence that the fitted length–reward curve is non-linear.
