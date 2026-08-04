---
type: Study Note
title: Emergent Abilities of Large Language Models
description: Historical study notes on the TMLR 2022 survey that defined emergent abilities as capabilities absent in smaller models but present in larger ones, cataloging phase-transition scaling curves across few-shot prompting and augmented prompting strategies.
resource: https://arxiv.org/abs/2206.07682v2
source: /archive/emergent-abilities-large-language-models.pdf
tags: [evaluation, prompting, in-context-learning, reasoning, survey]
timestamp: 2026-07-30T09:05:42Z
---

# Emergent Abilities of Large Language Models - Study Notes

**Authors**: Jason Wei, Yi Tay, Rishi Bommasani, Colin Raffel, Barret Zoph, Sebastian Borgeaud, Dani Yogatama, Maarten Bosma, Denny Zhou, Donald Metzler, Ed H. Chi, Tatsunori Hashimoto, Oriol Vinyals, Percy Liang, Jeff Dean, William Fedus
**Venue**: Transactions on Machine Learning Research (08/2022); arXiv:2206.07682 [cs.CL]
**Publication date**: June 15, 2022 (arXiv v1); published in TMLR August 2022
**Version date**: October 26, 2022 (v2)
**Pages**: 30

## What It Is

This is a survey and position paper, not a new method. It defines an **emergent ability** of a large language model as "an ability that is not present in smaller models but is present in larger models," and therefore cannot be predicted by extrapolating the performance of smaller-scale models. On a scaling curve (x-axis: training compute in FLOPs, or model parameters), an emergent ability shows near-random performance until a critical threshold of scale, after which performance jumps to substantially above random — a phase transition, in the paper's framing, adapted from Philip Anderson's 1972 "More Is Different."

The paper contributes no new models or experiments of its own beyond analysis; it assembles scaling curves from prior work (GPT-3, LaMDA, Gopher, Chinchilla, PaLM, Anthropic and EleutherAI models) and catalogs dozens of examples in two settings: few-shot prompted tasks and augmented prompting or finetuning strategies. Its stated goal is to characterize the phenomenon and pose why-emergence and whether-more-scaling as research questions, not to claim a specific required scale for any ability.

## Why It Mattered in 2022

By 2022, scaling laws had established that cross-entropy loss improves smoothly and predictably over many orders of magnitude of compute. This paper sharpened the counterpoint: downstream-task performance does not always improve smoothly. If whole task categories appear discontinuously, then extrapolating benchmark trends from small models systematically underestimates larger ones, and capability forecasting — including risk forecasting — cannot rely on interpolation.

The paper also reframed several prompting results already in this knowledge base. Chain-of-thought prompting, instruction finetuning, scratchpads, and self-consistency are presented not just as techniques but as techniques whose benefit itself emerges at scale: they are neutral or harmful below a threshold and only beat the no-technique baseline above it. That made "emergence" a property of technique–model interactions, not only of tasks.

## Structure and Evidence Base

- **Few-shot prompted tasks (§3)**: eight scaling curves spanning five model families. Emergent examples include BIG-Bench modified arithmetic (GPT-3 jumps at ~2·10^22 FLOPs / 13B parameters; LaMDA at ~10^23 FLOPs / 68B), IPA transliteration, word unscramble, Persian QA, TruthfulQA (Gopher 280B exceeds random by >20 points where GPT-3 never does), grounded conceptual mappings, MMLU (GPT-3/Gopher/Chinchilla stay at chance below ~10^22 FLOPs and surpass random only at 70B–280B scale), and Word in Context, where GPT-3 and Chinchilla fail even at their largest sizes and above-random performance only appears at PaLM 540B (~2.5·10^24 FLOPs).
- **Augmented prompting strategies (§4)**: a technique counts as emergent if it shows no improvement, or is harmful, relative to not using it until a large-enough scale. Examples: chain-of-thought prompting surpasses standard prompting only around 10^23 FLOPs (~100B parameters); instruction finetuning hurts models of 8B parameters or smaller and only helps at ~100B scale (with the caveat that Sanh et al. soon induced similar behavior in an 11B encoder-decoder); scratchpad training helps 8-digit addition only from ~40M parameters up; True/False self-evaluation calibration (P(True)) beats standard calibration only at ~52B.
- **Table 1** enumerates 27 emergent abilities with emergence thresholds spanning ~9·10^19 FLOPs (40M parameters) to ~2.5·10^24 FLOPs (540B parameters) — two orders of magnitude of variation, which undercuts any single "critical size."

The paper is careful about the x-axis: training FLOPs and parameter counts produce similar curve shapes only because dense Transformer families scaled compute roughly proportionally to parameters; Chinchilla (one-fourth of Gopher's parameters at similar compute) and sparse mixture-of-experts models break that correspondence. It also shows emergence against WikiText103 perplexity, noting the correlation with compute may not hold as architectures change. The paper's conclusion: emergence should be viewed as a function of many correlated variables, not one scalar.

## The Metric Question and the Paper's Own Analyses

The paper anticipates the objection that emergence is a measurement artifact, and its appendices give a mixed answer:

- **Cross-entropy analysis (Appendix A.1)**: for six emergent BIG-Bench tasks, cross-entropy loss on the target sequence improves smoothly even at scales where exact match, BLEU, or accuracy sit at random. Small models are getting better in a way discontinuous metrics mask. The authors are explicit that this does not explain why the downstream metrics are emergent or enable predicting the threshold.
- **Alternative metrics (Appendix A.2)**: for three emergent generative tasks, the emergent shape persists across all BIG-Bench metrics that award partial credit (ROUGE, BLEURT, sequence F1), so exact-match scoring is "at best an incomplete explanation."
- **Task-type analysis (Appendix A.3/B)**: the authors manually classified all 210 BIG-Bench tasks as emergent, smooth, flat, or unclassifiable. The keywords with the highest *percentage* of emergent tasks were analogical reasoning, word sense disambiguation, truthfulness, social reasoning, and emotional understanding — only two of the top five were reasoning-flavored, against the a-priori expectation.

## Beyond Scale, Risks, and Sociological Claims

Three §5 discussions extend the thesis. First, scale is not the singular unlock: PaLM 62B achieves above-random performance on 14 BIG-Bench tasks where LaMDA 137B and GPT-3 175B sit at random, plausibly due to data quality and architecture; instruction-following was later induced in an 11B encoder-decoder; and continued pre-training on a mixture-of-denoisers objective unlocked emergent performance on several tasks. Emergence thresholds are historical, not immutable. Second, **emergent risks**: bias, toxicity, memorization, and imitation of human falsehoods can also increase with scale (some non-monotonically, per the Inverse Scaling Prize), and future risks — deception, backdoors — may themselves be emergent and unpredictable. Third, the sociological shift: few-shot general-purpose models overtaking finetuned task-specific state of the art (GPT-3 on TriviaQA/PiQA, PaLM on arithmetic, Flamingo on VQA) is *not* emergence by the paper's definition — those curves are smooth — but marks the field's turn to general-purpose models.

## Limitations

- The evidence is a curated assembly of prior scaling curves, mostly from 2020–2022 proprietary models, not a controlled experiment; emergence classification for BIG-Bench tasks was manual and subjective ("near-random" has no operational definition), though done by two co-authors in agreement.
- The definition is binary and threshold-shaped by construction; it does not distinguish a true capability discontinuity from a smoothly improving underlying competence viewed through a discontinuous metric. The paper's own cross-entropy analysis concedes the underlying improvement is often smooth.
- Emergence thresholds depend on data quality, architecture, objective, and training procedure, so no reported threshold transfers across model families or eras.
- The paper offers no predictive theory: it cannot say which tasks will emerge, at what scale, or whether an emerged ability will keep improving or plateau.
- "Presence" of an ability is benchmark-relative; above-random on a benchmark is a weak bar for a real capability.

## Analyst Takeaways

1. **Benchmark curves can hide smooth progress.** When a metric gives no partial credit, a capability can be improving for orders of magnitude of compute while the score reads as flat-then-jump. Plot a continuous surrogate (cross-entropy, partial-credit metrics) before claiming a discontinuity.
2. **Technique value is scale-contingent, not just task-contingent.** CoT, instruction tuning, scratchpads, and calibration-by-verbalized-probability each flipped from useless or harmful to beneficial at a model-size threshold in 2022-era models. A technique rejected on a small model is not thereby rejected at scale — and vice versa.
3. **Thresholds are historical accidents.** Data quality, architecture, and training objective each moved "emergent" abilities downscale within months of the original observations. Never quote an emergence threshold without its model family and date.
4. **Unpredictability cuts both ways.** The same argument that says small-model extrapolation underestimates capabilities says it underestimates risks; capability evaluation programs need slack for abilities nobody tested for.
5. **"Emergent" is a claim about the measurement setup as much as the model.** State the x-axis (FLOPs, parameters, perplexity), the metric, and the random baseline whenever using the term.

## Current Validity

The durable contribution is the vocabulary and the warning: downstream-task discontinuities relative to smooth loss scaling were real features of 2020–2022 scaling curves, and "emergent ability" became the standard term for them. The specific claim that emergence reflects a genuine phase transition in the model, rather than metric choice, weakened substantially after publication: Schaeffer et al. (NeurIPS 2023, "Are Emergent Abilities of Large Language Models a Mirage?") showed that nonlinear or discontinuous metrics can manufacture sharp emergence curves from smoothly improving per-token error, and that switching to continuous metrics often makes the discontinuity disappear. This paper's own Appendix A is best read as anticipating half of that critique — it concedes smooth underlying improvement while arguing the downstream-metric discontinuity was still real for the tasks examined — but it does not resolve it.

Every reported threshold (13B for GPT-3 arithmetic, ~100B for CoT benefit, 540B for WiC) is model-family- and period-specific, and the paper itself documents PaLM 62B breaking LaMDA/GPT-3 thresholds through data and architecture. Whether any contemporary frontier model exhibits genuinely unpredictable capability jumps, and whether emergence remains a useful forecasting frame at current scales, **requires contemporary verification**; no source in this knowledge base settles that question.

## Vault Ideas Extracted

* [Emergent Abilities](/vault/emergent-abilities.md) — the core concept and its measurement caveats
* [Chain-of-Thought Prompting](/vault/chain-of-thought-prompting.md) — updated: CoT's benefit itself emerges at scale
* [In-Context Learning](/vault/in-context-learning.md) — updated: few-shot task performance is near-random below threshold on many tasks
* [Prompt Contingency](/vault/prompt-contingency.md) — updated: technique effects can flip sign across scale thresholds
