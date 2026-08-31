---
type: Synthesis
title: Judge Bias as Accuracy Parity
description: A signed group-fairness metric that scores an automated judge's bias toward an attribute as the difference in its error rate between the two groups the attribute defines.
tags: [llm-as-judge, evaluation, reliability]
timestamp: 2026-08-25T18:05:00Z
---

# Judge Bias as Accuracy Parity

A way to turn "this judge seems to favor X" into a single signed number, by borrowing group-fairness machinery: treat the suspect attribute as a **sensitive attribute**, split the evaluated pairs into the two groups it defines, and report the gap in the judge's error rate between them.

## Construction

For a pairwise judge over candidates `y₀` and `y₁`:

- `Y ∈ {0,1}` — the reference (human) preferred index
- `Y′ ∈ {0,1}` — the judge's choice
- `S ∈ {0,1}` — the sensitive attribute, indicating which candidate carries more of it (which is longer, which is first, which has more code blocks)

`S = Y` is the group where the reference agreed with the attribute; `S = 1−Y` is the group where it went against.

**Equal opportunity** would require the judge to behave identically across `S` for a fixed reference label:

```
P(Y′ = 0 | S = 0, Y = 0) = P(Y′ = 0 | S = 1, Y = 0)
```

This only covers one reference label, so generalize to **accuracy parity**:

```
P(Y′ = Y | S = Y) = P(Y′ = Y | S = 1−Y)
```

The usual deviance `|P(Y′=Y | S=Y) − P(Y′=Y | S=1−Y)|` discards the direction. Keep it by scoring the difference in *inaccuracy* instead:

```
bias = P(Y′ ≠ Y | S = 1−Y) − P(Y′ ≠ Y | S = Y)
```

Positive means the judge errs more when the reference went *against* the attribute — it is biased toward the attribute. Negative means the opposite. Zero means accuracy parity. The scale is a difference of rates, so a value of 0.33 means 33 percentage points more error in the against-the-attribute group.

## Why Accuracy Parity Rather Than Demographic Parity

Demographic parity would demand the judge pick the attribute-carrying candidate at a fixed rate regardless of content. That is coherent for attributes that *should* be irrelevant to the outcome — gender, race — and incoherent for attributes an evaluator legitimately weighs, like response length or thoroughness. Accuracy parity permits the judge to track the attribute exactly as far as the reference labels do, and penalizes only the excess.

Keeping the sign matters because the same attribute flips direction across tasks: a judge can favor verbosity on open-ended generation while favoring brevity on summarization faithfulness.

## Practical Use

Use it to compare judges, judge prompts, or judge protocols on a fixed labeled pair set — the number is only meaningful relative to a common evaluation set and a common reference labeler. It composes naturally with the sliced-agreement protocol in [Human-Anchored Judge-Bias Measurement](/vault/human-anchored-judge-bias-measurement.md), which supplies the labeled pairs and the curve this scalar summarizes. Reported before and after a mitigation, it gives a directly interpretable effect size.

## Limitations

- **Binary grouping loses magnitude.** The metric knows *which* candidate is longer, not by how much. A judge that is accurate on large gaps and inaccurate on small ones — a concave alignment curve, symmetric about zero — scores near zero while being plainly biased. Always publish the agreement-versus-attribute-difference curve alongside the number.
- **It inherits the reference's flaws.** Noisy or single-annotator labels inflate both error rates; attribute-correlated annotator noise transfers directly into the score.
- **It is a discrepancy measure, not a causal one.** The number quantifies conditional error asymmetry; attributing it to the attribute requires controlled or matched pairs.
- **Not comparable across datasets.** Different attribute distributions, task mixes, and reference labelers produce incomparable values.
- **Sensitive to group imbalance.** When most pairs sit near attribute parity, the against-the-attribute group can be small, and its error rate correspondingly unstable. Report per-group counts.

## Sources

- [Verbosity Bias in Preference Labeling by Large Language Models dossier](/dossiers/verbosity-bias-preference-labeling-llms.md) — derives the metric from equal opportunity and accuracy parity with length as the sensitive attribute, and reports 0.328 for GPT-4 versus 0.428 for GPT-3.5 on HH-RLHF pairs.
