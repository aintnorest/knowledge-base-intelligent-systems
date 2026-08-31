---
type: Study Note
title: Bias Fitting to Mitigate Length Bias of Reward Model in RLHF
description: Personal study notes on Zhao et al.'s FiMi-RM, which trains a tiny auxiliary model to fit the non-linear length–reward relation of a deliberately biased reward model and then decorrelates the reward model from it.
resource: https://arxiv.org/abs/2505.12843v2
source: /archive/fimi-rm-bias-fitting-length-bias.pdf
tags: [reinforcement-learning, evaluation, reliability, generalization]
timestamp: 2026-08-25T19:28:34Z
---

# Bias Fitting to Mitigate Length Bias of Reward Model in RLHF - Study Notes

**Authors**: Kangwen Zhao, Jianfeng Cai, Jinhua Zhu, Ruopei Sun, Dongyun Xue, Wengang Zhou, Li Li, and Houqiang Li (University of Science and Technology of China)  
**Venue**: Preprint; arXiv:2505.12843v2 [cs.LG]  
**Date**: June 24, 2026  
**Pages**: 18 (9 main + appendices A–I)

## What It Is

RLHF reward models reliably learn a shortcut: longer answers score higher, whatever their quality. The policy then discovers the shortcut and becomes verbose. FiMi-RM ("Bias Fitting to Mitigate") attacks this by *measuring* the bias before removing it. A 6.4K-parameter side model is trained to predict the reward model's score from response length alone; the reward model is then trained to be uncorrelated with that prediction while keeping its Bradley-Terry preference loss.

The framing argument is against the prior art's two failure modes. Methods like RRM (causal data augmentation) or KL regularization mitigate reward hacking without ever characterizing what the bias looks like. Methods like ODIN (a two-head architecture disentangled via Pearson correlation), the constant length penalty, and Huang et al.'s post-hoc local linear regression all assume the length–reward relation is linear. The paper's empirical answer is that it is not: strongly linear below ~100 tokens, then flattening, and in places bending slightly downward for long outputs.

## The Three Stages

1. **Warm-up.** Train an ordinary Bradley-Terry reward model and *deliberately keep* its length bias. This is the inversion relative to prior work — you cannot fit a bias you have already suppressed, so debiasing is postponed rather than applied during initial training.

2. **Length bias fitting.** `model_f(len(y))` takes the scalar token length, projects it into a 32-dimensional feature via sinusoidal *length encoding* (positional encoding with length substituted for position), runs it through two pre-norm ResNet blocks (LayerNorm → MLP → ReLU + residual), and emits a scalar r̂ through a linear head. The loss is `L_fit = −|ρ(r_sg, r̂)|` — maximize the absolute Pearson correlation between the fitted prediction and the reward model's actual score, with a stop-gradient on `r` so only the fitting model moves. Because Pearson is a batch statistic and gets more accurate with larger B, they aggregate length–reward pairs across all 8 devices.

3. **Length debiasing.** Train the reward model on `L_debiased = |ρ(r, r̂_sg)| + L_BT`. The stop-gradient has moved to the *other* side: now the reward model is pushed to decorrelate from the frozen fitted curve while the Bradley-Terry term preserves preference discrimination. The two models alternate every `a = 8` steps via an indicator function, so the fitted curve keeps tracking the reward model as the reward model moves away from it.

The design detail worth keeping is that Pearson is used only as a *correlation-alignment* objective between two scalars. The non-linearity lives entirely in `model_f`'s architecture, not in the loss — which is how the method escapes the linearity assumption while still using the same correlation statistic ODIN uses.

## Results

Setup: Anthropic HH `Dahoas/rm-static` split 30k SFT / 30k RM / 8k downstream (5k test), Qwen2.5-7B and Gemma2-9B, 8×A100, evaluated on length-controlled AlpacaEval against SFT-model references with GPT-4 as judge.

- **BoN (N=8), Qwen2.5-7B**: LC-WR 72.59 vs. 71.38 (ODIN), 69.22 (length penalty), 68.25 (vanilla). Gemma2-9B: 66.68 vs. 63.46 / 62.69 / 62.91, with average characters dropping from 756 to 534.
- **DPO** (preference labels reassigned by each reward model): Qwen LC-WR 62.17 vs. 58.91 (ODIN) and 58.56 (vanilla), with L_char falling from 1089 to 757.
- **Downstream, not just length**: MT-Bench average 4.82 vs. 4.53 (ODIN) on Qwen; IFEval prompt-level accuracy 19.0 vs. 18.6. Generalization checks in the appendix cover SimPO (LC-WR 55.03 vs. 53.68), GRPO (67.42 vs. 58.80, L_char 1285 → 999), and the more diverse RLHFlow dataset (66.59 vs. 62.00).
- **Preference accuracy**: overall 69.75 vs. 70.14 vanilla on Qwen — a slight drop. The interesting number is the split: C-longer (chosen response is longer) falls 80.72 → 73.60 while R-longer (rejected is longer) rises 56.88 → 65.70. Gemma is starker: 80.86/47.63 → 69.07/66.38.
- **Cost**: the fitting model is 6.4K parameters, its update takes ~0.60 s/step against ~2.50 s for a reward-model step. Because fitting steps replace rather than add to the 938-step budget, an epoch runs ~32 min versus ~43 min for the vanilla baseline — the method is *cheaper*, not more expensive.

## The Accuracy Argument

The paper spends real effort defending its accuracy drop, and the argument is the most transferable part of the work. C-longer is 58% of the test set. A model that ranks purely by length scores 100% on C-longer and 0% on R-longer, and thereby posts a strong-looking overall accuracy with zero semantic understanding. So overall preference accuracy on a length-imbalanced test set is partly a measure of length bias. Falling on the majority subset while rising on the minority subset is the signature of a discarded shortcut, and the appendix backs it with a Bradley-Terry loss that rises from 0.530 to 0.566 during Stage 3 — the objective genuinely got harder — alongside downstream benchmark gains.

## Ablations

- Multi-stage beats joint training (LC-WR 72.59 vs. 71.51): let the fitting model characterize the bias before the reward model attacks it.
- Removing alternating updates in Stage 3 costs ~1.4 LC-WR, confirming the fitted curve must chase the moving reward model.
- Architecture sweep for `model_f`: ResNet 72.59 > linear 71.67 > MLP 71.35 > 1D-CNN 71.15 > polynomial regression 67.11. Note that linear fitting is only ~0.9 behind and produces the *shortest* outputs (501 chars) — the non-linearity buys measurable but not dramatic headroom, and polynomial regression is actively worse than linear.

## Analyst Takeaways

1. **Measure the bias before removing it.** Deliberately preserving a known flaw so a diagnostic model can characterize it inverts the usual instinct and is what makes a non-parametric correction possible.
2. **A stop-gradient decides which way a correlation term points.** The same `|ρ|` expression fits a bias when the gradient flows into the probe and removes it when the gradient flows into the model under correction. Cheap and reusable well beyond length.
3. **Overall accuracy on a confounded test set partly measures the confound.** Split the evaluation by whether the shortcut agrees or disagrees with the label before reading anything into an aggregate number.
4. **Shorter is not the objective.** ODIN produced shorter Qwen BoN outputs (115 tokens vs. 125) and still lost on LC-WR. Length reduction is a symptom of debiasing, not the goal.
5. **Debiasing need not cost compute.** A probe three orders of magnitude smaller than the reward model, trained on interleaved rather than additional steps, made the pipeline faster overall.

## Questions and Limitations

- The authors' own stated limitation: it is genuinely unknown whether true human preference is *independent* of length. For summarization or open-ended QA, thorough answers are longer and better, and users sometimes explicitly ask for detail. Driving Pearson correlation to zero assumes the correct target is zero, which is an assertion rather than a finding.
- The fitting model sees only length. Any confounder correlated with length — topic, format, markdown structure — is decorrelated along with it, and the method offers no way to distinguish legitimate length-linked quality from the shortcut.
- Pearson is a linear-dependence statistic. Zero correlation with the fitted curve does not mean statistical independence from length; residual non-monotonic dependence can survive.
- Evidence rests on one primary preference dataset (Anthropic HH static) at 7B/9B scale with GPT-4 as the judge for the headline metric. Length-controlled AlpacaEval mitigates but does not eliminate the judge's own length preference, so a length-debiasing result is being scored by a partly length-biased evaluator.
- No PPO experiments — the authors cite cost and hyperparameter sensitivity, using BoN, DPO, SimPO, and GRPO instead.
- The non-linear architecture's advantage over a plain linear fit is ~0.9 LC-WR on a single configuration, which is thinner evidence than the paper's framing ("length bias is non-linear, therefore linear methods are insufficient") implies.

## Vault Ideas Extracted

* [Learned Bias Fitting for Reward Debiasing](/vault/learned-bias-fitting-reward-debiasing.md)
* [Stop-Gradient Correlation Decoupling](/vault/stop-gradient-correlation-decoupling.md)
* [Confound-Partitioned Accuracy](/vault/confound-partitioned-accuracy.md)
