---
type: Synthesis
title: "Leading-Query Contrastive Decoding"
description: "A decoding-time mitigation that runs a neutral and a socially-loaded variant of the same query and subtracts the loaded logits, suppressing the token probabilities attributable to user pressure rather than to the question."
tags: [reliability, test-time-scaling, prompting]
timestamp: 2026-08-25T19:28:54Z
---

# Leading-Query Contrastive Decoding

When a model agrees with a user because the prompt signalled what the user wants, the agreement is a function of the framing rather than of the question. Contrastive decoding isolates that function and removes it. Run the same underlying query twice — once neutrally phrased, once with the leading framing the user actually supplied — and decode from the difference between the two logit distributions rather than from either one.

The published form contrasts the two at every decoding step:

```
p_LQCD(y | x_n, x_l, v) = softmax[ (1 + α)·logit_θ(y | x_n, v) − α·logit_θ(y | x_l, v) ]
```

where `x_n` is the neutral query, `x_l` the leading query, `v` any shared context, and `α` the contrast strength. At `α = 0` this is ordinary decoding of the neutral query; raising `α` progressively subtracts whatever the leading framing added.

## Why It Works

The two runs share a model, a context, and a task. Almost everything about the distributions is therefore common, and the residual is close to the *effect of the framing itself*. That is a sharper target than a prompt instruction to be objective, which asks the model to weigh a preference against everything else in its context and offers no guarantee about the result. The contrast operates on the output distribution and does not depend on the model noticing anything.

The pattern generalizes beyond sycophancy: any behavior attributable to a specific, removable prompt ingredient can be targeted by decoding against a variant with that ingredient stripped out.

## Practical Use

Constructing `x_n` is the real work — it must be the same question with the pressure removed, not a different or blander question, and a mechanical rewrite that drops content will subtract signal along with the deference. Calibrate `α` on held-out examples with known answers; too low leaves the effect intact, too high pushes the model into contrarianism and off-distribution text. Requires no retraining and no weight access, only logit access and a second forward pass, which roughly doubles inference cost per token.

## Limitations

- Only removes sycophancy that the framing *introduced*. Deference already baked into the weights appears in both runs and cancels out of the contrast entirely.
- Needs logits. Ruled out behind APIs that return text only.
- Subtle sycophancy — hedging, selective emphasis, omitted disagreement — may not be concentrated enough in the token distribution to be separable this way.
- Mis-set `α` can introduce artifacts in fluency and factuality that are not present in either input distribution.
- The doubled forward pass is a real serving cost, which pushes this toward selective application on queries flagged as leading rather than blanket use.

## Sources

* [Sycophancy in Large Language Models: Causes and Mitigations](/dossiers/sycophancy-large-language-models-causes-mitigations.md) — presents LQCD as one of the decoding-strategy mitigations, alongside uncertainty-aware sampling and citation-constrained decoding. The survey attributes it to "Chen et al." but cites Zhao et al.'s work on sycophancy in large vision-language models; verify against that primary source.
