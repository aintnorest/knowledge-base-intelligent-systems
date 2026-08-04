---
type: Synthesis
title: Emergent Abilities
description: Capabilities that appear only past a model-scale threshold on a given metric, with evidence that the apparent discontinuity often reflects metric choice as much as model behavior.
tags: [evaluation, prompting, in-context-learning, reasoning]
timestamp: 2026-07-30T09:05:42Z
---

# Emergent Abilities

An ability is emergent, in the sense fixed by Wei et al. (2022), if it is absent in smaller models but present in larger ones, so that extrapolating small-model performance does not predict it. On a scaling curve the signature is near-random performance up to a threshold of training compute or parameters, then a sharp rise above random — described as a phase transition. The 2022 catalog spans few-shot prompted tasks (MMLU, BIG-Bench arithmetic, TruthfulQA, Word in Context) and augmented strategies whose *benefit* emerges: chain-of-thought prompting, instruction finetuning, scratchpads, and verbalized calibration each helped only above a model-size threshold in that era's models.

## Measurement Caveats

The discontinuity is a property of the curve, and the curve depends on choices the analyst controls:

- **Metric**: exact match and accuracy give no partial credit, so smoothly improving per-token competence can plot as flat-then-jump. Wei et al. concede cross-entropy improves while downstream metrics sit at random; Schaeffer et al. (2023) later argued metric choice can manufacture the sharp threshold entirely.
- **X-axis**: training FLOPs, parameters, and general-corpus perplexity were roughly interchangeable for 2022-era dense Transformers; Chinchilla, sparse MoE, and retrieval-augmented models break the correspondence.
- **Threshold is historical**: data quality, architecture, and training objective moved "emergent" abilities downscale within months (PaLM 62B beating thresholds that held LaMDA 137B and GPT-3 175B at random; instruction-following induced in an 11B encoder-decoder).

## Practical Use and Limitations

Treat a reported emergence threshold as scoped to a model family, metric, and date. Before claiming a capability is absent at small scale, check a continuous surrogate metric; before rejecting a prompting or finetuning technique on a small model, note that its benefit may be scale-gated. The same unpredictability argument applies to risks, which is the concept's main forecasting implication: small-model evaluation cannot certify the absence of large-model behaviors. The concept does not provide a predictive theory — it names an observed pattern, and post-2022 work disputes how much of the pattern is in the model versus the ruler.

## Sources

- [Emergent Abilities of Large Language Models dossier](/dossiers/emergent-abilities-large-language-models.md) - primary source: the TMLR 2022 definition, the few-shot and augmented-prompting emergence catalog, and the paper's own cross-entropy and multi-metric analyses.
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models dossier](/dossiers/chain-of-thought-prompting-elicits-reasoning.md) - the CoT scaling curves the emergence paper reinterprets as an emergent technique benefit.
- [Language Models are Few-Shot Learners dossier](/dossiers/language-models-are-few-shot-learners.md) - the GPT-3 few-shot scaling results whose task-level discontinuities the emergence paper catalogs.
