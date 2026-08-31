---
type: Synthesis
title: Human-Anchored Judge-Bias Measurement
description: Measuring an automated judge's bias as divergence from the human labels it replaces, sliced by the suspect attribute, instead of assuming a perturbation is quality-neutral.
tags: [llm-as-judge, evaluation, reinforcement-learning]
timestamp: 2026-08-25T18:05:00Z
---

# Human-Anchored Judge-Bias Measurement

A protocol for quantifying bias in an automated preference evaluator when the "correct" answer is unknowable. Instead of perturbing responses and assuming the perturbation should not change the verdict, take a dataset of human preference labels, run the judge on the same pairs, and measure agreement **conditioned on the attribute under suspicion**.

## The Assumption It Replaces

The standard probe for judge bias is an attack: take a response, change the suspect attribute while holding content fixed (duplicate list items to inflate length, reorder the candidates, restyle the text), and count how often the verdict flips. Flips are attributed to bias.

That works only when the perturbation is genuinely quality-neutral, and it becomes strained the moment the attribute is one a good evaluator *should* weigh — length, structure, specificity. It also measures behavior on synthetic inputs rather than on the distribution the judge will actually label.

Human anchoring drops the assumption. It relies on a different, weaker premise: whatever the judge is replacing defines the target. If a judge is standing in for human labelers in an RLAIF loop, the judge does not need to be objectively right — it needs to be *substitutable*. A shared human preference for longer answers is not the judge's problem to correct; a preference for longer answers that the humans did not share is.

## Protocol

1. **Pick the oracle deliberately.** Use the preference labels the judge is meant to replace. Record their provenance: annotator count per item, agreement statistics, and any known skew on the attribute.
2. **Characterize the oracle's own attribute preference.** Plot the human label against the attribute first. If humans lean the same way, that lean is the baseline, not the bias.
3. **Run the judge on the same pairs** under a protocol that neutralizes confounding biases — most importantly, judge both orderings and treat disagreement as a tie, so position bias does not leak into the length measurement.
4. **Slice agreement by the attribute.** Report judge–human agreement as a function of the signed attribute difference between the chosen and rejected response, with per-bin sample counts. Concentration of mass near zero difference is normal; annotate it rather than hiding it.
5. **Read the asymmetry, not the average.** The diagnostic pattern is high agreement on one side and collapsing agreement on the other. Collapse the curve into a signed scalar only as a supplement — see [Judge Bias as Accuracy Parity](/vault/judge-bias-as-accuracy-parity.md) — and always publish the curve with it.

## Practical Use

Use this when adopting an LLM judge in place of human labelers and you need to know *where* it fails rather than whether it is broadly acceptable. Aggregate agreement rates are the wrong instrument: a judge can score respectably overall while being wrong on nearly every item in the slice that matters.

The protocol generalizes past length to any attribute with a cheap observable proxy: candidate position, formatting and markdown density, presence of hedging, code-block count, self-declared confidence, or which model generated the response. The requirement is a computable attribute and a human-labeled pair set drawn from the deployment distribution.

## Limitations

- **The oracle is not ground truth.** Single-annotator preference sets are noisy; the measured "bias" absorbs any attribute-correlated annotator noise. Multi-annotator data with reported agreement bounds how much of the gap is real.
- **Conditioning is not control.** Slicing agreement by length shows a length-conditioned discrepancy; it does not prove length caused the judge's choice, since length correlates with coverage and specificity. Controlled or matched pair construction is needed for a causal claim.
- **Human replication is the right target only while the human is the reference.** If the deployment goal is correctness rather than substitutability, a judge that faithfully reproduces a biased annotator scores perfectly and is still wrong.
- **Coverage of the attribute range depends on the dataset.** If the human-labeled set has few large-gap pairs, the tails of the curve are unreliable exactly where the bias is usually strongest.

## Sources

- [Verbosity Bias in Preference Labeling by Large Language Models dossier](/dossiers/verbosity-bias-preference-labeling-llms.md) — introduces the human-anchored framing against the "repetitive list attack" style of probe, and applies it to HH-RLHF: GPT-4 and GPT-3.5 agree with humans when the human chose the longer answer and disagree sharply when the human chose the shorter one.
