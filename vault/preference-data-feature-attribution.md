---
type: Synthesis
title: Preference-Data Feature Attribution
description: Auditing what a preference dataset actually rewards by labeling each pairwise comparison with interpretable LM-generated features and regressing the human choice on them.
tags: [reinforcement-learning, human-in-the-loop, evaluation]
timestamp: 2026-08-25T19:20:00Z
---

# Preference-Data Feature Attribution

A preference dataset says only "for this prompt, response A beat response B." What it *incentivizes* — the properties a model will drift toward if trained on it — is invisible until you decompose those choices. This pattern makes the reward legible before any model is trained on it.

## The Method

1. **Define an interpretable feature set.** A few dozen candidate properties of a response: truthful, well-structured, concise, empathetic, authoritative, matches the user's stated beliefs, and so on. Include both properties you want rewarded and ones you fear are being rewarded.
2. **Label each pair with an LM.** For every comparison, zero-shot prompt a strong model to say whether A has more, the same, or less of each feature than B, producing a −1/0/+1 vector.
3. **Regress the human label on the features.** Logistic regression from the feature vector to which response the human picked. A sparsity-inducing prior (e.g. Laplace with a small scale, tuned on holdout) keeps effect sizes from being dominated by correlated features; a Bayesian fit gives credible intervals instead of point estimates.
4. **Validate that the features are sufficient.** Compare holdout accuracy against a learned preference model trained on the same data. If the low-dimensional feature model comes close, the features capture most of what the data encodes and the effect sizes mean something.
5. **Read off the effects** as "probability a response with this feature is preferred, all else equal," ranked.

## Why It Works

The trained preference model is a black box with the same information content as the data. Substituting a transparent model of comparable accuracy converts an unauditable reward signal into a ranked list of incentives. In the source application, a 23-feature logistic regression hit 71.3% holdout accuracy against ~72% for a 52B preference model on the same data — close enough that the feature ranking is a fair description of the dataset, and it surfaced "matches the user's beliefs" as one of the strongest predictors of human choice.

## Practical Use

- Run it on preference or rating data *before* training a reward model, and again on any RLHF/DPO dataset you inherit or buy.
- The same decomposition works on LLM-judge verdicts, A/B rating logs, and thumbs-up telemetry — anywhere a scalar or binary preference hides multiple criteria.
- Effect sizes per feature are small (single-digit percentage points) but persistent under optimization: a weak incentive still shapes a policy trained hard against it.

## Limitations

The analysis is correlational and confined to the features you thought to name — an unnamed dominant property will be silently distributed across the ones you listed. Correlated features (e.g. explicitly versus implicitly agreeing with the user) make individual coefficients unstable and may have to be reported as a combined effect. The LM doing the labeling imports its own notion of each feature. Two sensitivity checks are worth running: refit on data splits that each exclude a fraction of the comparisons, and refit with each observed feature dropped in turn, keeping only trends that survive both.

## Sources

* [Towards Understanding Sycophancy in Language Models](/dossiers/understanding-sycophancy-language-models.md) — applies it to 15K hh-rlhf helpfulness comparisons with GPT-4 feature labeling and Bayesian logistic regression (NUTS, Laplace prior).
