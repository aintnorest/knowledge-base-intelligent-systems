---
type: Synthesis
title: Confound-Partitioned Accuracy
description: Splitting an evaluation set by whether a suspected shortcut agrees or disagrees with the gold label, so aggregate accuracy stops rewarding the shortcut and a debiasing trade-off becomes readable.
tags: [evaluation, reinforcement-learning, generalization, reliability]
timestamp: 2026-08-25T19:28:34Z
---

# Confound-Partitioned Accuracy

If a test set contains a surface feature that correlates with the gold label, aggregate accuracy on that set is partly a measurement of how strongly the model exploits the feature. The number cannot distinguish understanding from shortcut, and a model that gets *better* by abandoning the shortcut will appear to get worse.

**Partition the evaluation set by whether the confound agrees with the label, and report both cells separately along with the majority share.**

For a pairwise preference set with a suspected length bias, that means:
- **agree** — the preferred item is also the longer one;
- **disagree** — the rejected item is longer.

## Reading the Result

Establish the degenerate baseline first. A model that ranks *purely* by the confound scores 100% on the agree cell and 0% on the disagree cell. If the agree cell is 58% of the data, that useless model posts 58% overall — a floor that has nothing to do with the capability being measured.

Against that reference, a **fall on the agree cell paired with a rise on the disagree cell is the signature of a discarded shortcut**, even when the aggregate ticks downward. Convergence of the two cells is the goal; a widening gap means the confound is being learned harder. Read the aggregate last, and never alone.

The pattern is worth reporting even for models nobody is debiasing, because the split reveals how much of a headline number the confound was carrying.

## Corroborating Evidence

Cell-split accuracy is suggestive, not conclusive — a model could lose the shortcut and lose real capability at the same time. Two cheap corroborations:

- **Watch the training loss during correction.** A modest rise is expected and healthy: withdrawing a shortcut makes the objective genuinely harder. A large rise means capability is going with it.
- **Require downstream gains.** Held-out task benchmarks that do not share the confound are the actual arbiter. Static preference accuracy is a proxy; if it dips while downstream quality improves, the proxy was the thing that was broken.

## Limitations

- **The confound must be named and measurable.** This diagnoses a specific suspicion; it discovers nothing.
- **Confounds travel together.** Length co-varies with detail, format, and topic, so a length split partly measures those too, and a clean attribution is not available from the split alone.
- **Cells can be small.** The minority cell often carries most of the diagnostic weight and the widest error bars; report its size.
- **Balanced cells do not imply a good model.** Two low-accuracy cells can be perfectly balanced. The split constrains an interpretation; it does not substitute for the aggregate.
- **The evaluator may share the confound.** Judging a length-debiasing result with an LLM judge that itself prefers longer answers weakens the evidence; length-controlled evaluation mitigates but does not remove this.

## Sources

- [Bias Fitting to Mitigate Length Bias of Reward Model in RLHF dossier](/dossiers/fimi-rm-bias-fitting-length-bias.md) — FiMi-RM's C-longer / R-longer split of the Anthropic HH test set (58% C-longer), where debiasing moved Gemma2-9B from 80.86/47.63 to 69.07/66.38 with only a 0.9-point overall change, corroborated by a Bradley-Terry loss rise of 0.530 → 0.566 and MT-Bench/IFEval gains.
