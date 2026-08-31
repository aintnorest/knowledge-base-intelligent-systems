---
type: Synthesis
title: Prompted Preference-Model Debiasing
description: Steering a reward or judge model by prefixing the dialog it scores with an explicit request for the desired property — a zero-training baseline, and a way to measure the headroom an imperfect scorer leaves.
tags: [reinforcement-learning, prompting, reliability]
timestamp: 2026-08-25T19:20:00Z
---

# Prompted Preference-Model Debiasing

A preference model scores a *dialog*, so it is still conditioned on text — which means it can be prompted. Prepend a short exchange in which the user asks for the property you want (truthfulness, brevity, refusing to flatter) and the assistant acknowledges, then score the candidate responses inside that frame. The weights are untouched; only the context the scorer sees has changed.

## Why Bother

Retraining a reward model is expensive and needs new labels. This costs one prefix. It gives you three things:

- **A cheap mitigation.** In the source experiment, best-of-N against a preference model carrying such a truthfulness prefix produced consistently less sycophantic outputs than the same preference model unprompted, at every N tested.
- **A diagnostic.** If prompting moves the scorer, the bias was contextual rather than baked into its ranking function — useful evidence about where to intervene.
- **A headroom measurement.** Place three scorers on the same axis: the raw model, the prompted variant, and an *oracle* that always prefers the correct answer. The gap between raw and oracle is the cost of an imperfect reward signal; the gap the prompt closes tells you how much of that cost is reachable without training. In the source, best-of-N at N=4096 on the hardest items left ~75% bad responses under the raw preference model versus ~25% under the oracle, with the prompted variant in between.

## Practical Use

- Applies equally to LLM-as-judge rubrics, best-of-N rerankers, and RM-scored filtering — anywhere a model assigns scores you then optimize against.
- Always compare against an oracle or human ceiling on the same items. Without it, "the prompt helped" is unfalsifiable and the residual gap stays invisible.
- Keep the prefix out of the policy's own context. The point is to change what gets *rewarded*, not to instruct the generator; conflating them makes it impossible to attribute the improvement.
- Sweep the optimization pressure (N, or RL steps). A scorer's bias typically shows up as a *divergence* between variants that widens with pressure, not as a constant offset.

## Limitations

It reduces a bias rather than removing it — the prompted scorer still fell well short of the oracle. Prompt-conditioned scoring is also as brittle as any prompt: wording changes shift the effect, and a scorer steered toward one property can quietly trade away another. Hard cases benefit least, which is exactly where reward error is most costly. Treat it as a baseline and a measurement instrument, not as an alignment fix.

## Related

- [Verbosity Bias in Preference Evaluation](/vault/verbosity-bias-in-preference-evaluation.md) — the length-specific case of the same preference-model bias problem, with protocol-level and measurement-level mitigations.

## Sources

* [Towards Understanding Sycophancy in Language Models](/dossiers/understanding-sycophancy-language-models.md) — constructs a 'non-sycophantic' PM by prefixing the Claude 2 PM's dialog with a user request for truthful answers, and benchmarks it against the raw PM and an oracle PM under best-of-N.
