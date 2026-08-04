---
type: Study Note
title: Scaling Instruction-Finetuned Language Models
description: Historical study notes on the Flan-PaLM/Flan-T5 paper, which scaled instruction finetuning to 1.8K tasks and 540B parameters and showed that a small chain-of-thought mixture is required to preserve reasoning ability.
resource: https://arxiv.org/abs/2210.11416v5
source: /archive/scaling-instruction-finetuned-language-models.pdf
tags: [fine-tuning, chain-of-thought, reasoning, evaluation, generalization]
timestamp: 2026-07-30T09:18:00Z
---

# Scaling Instruction-Finetuned Language Models - Study Notes

**Authors**: Hyung Won Chung, Le Hou, Shayne Longpre, Barret Zoph, Yi Tay, William Fedus, Yunxuan Li, Xuezhi Wang, Mostafa Dehghani, Siddhartha Brahma, Albert Webson, Shixiang Shane Gu, Zhuyun Dai, Mirac Suzgun, Xinyun Chen, Aakanksha Chowdhery, et al. (Google)  
**Venue**: arXiv:2210.11416 [cs.LG]  
**Publication date**: October 20, 2022 (arXiv v1)  
**Version date**: December 6, 2022 (v5)  
**Pages**: 54

## What It Is

This paper scales **instruction finetuning** — supervised finetuning of a pretrained language model on many datasets phrased as natural-language instructions — along three axes: the number of finetuning tasks (to 1,836), the model size (to 540B parameters), and the inclusion of chain-of-thought (CoT) annotations in the mixture. The resulting models are the Flan family: Flan-PaLM (8B/62B/540B), Flan-cont-PaLM, Flan-U-PaLM, and the publicly released Flan-T5 checkpoints (80M to 11B).

The paper's central historical claim is that this recipe is a general, compute-cheap capability intervention: Flan-PaLM 540B improved over PaLM 540B by +9.4% on a normalized average of held-out benchmarks while using only about 0.2% of PaLM's pre-training compute, and reached 75.2% on five-shot MMLU with CoT prompting plus self-consistency — a 2022 state of the art.

## Why It Mattered in 2022

Prior instruction-finetuning work had scaled either tasks or model size, not both: Wei et al. (2021) used a 137B model with 62 tasks; Sanh et al.'s T0 used an 11B model; Wang et al.'s Natural Instructions v2 reached 1.6K tasks but only at 3B. This paper combined the aggregated mixtures of all three lines, added dialog, program-synthesis, and CoT data, and applied one procedure across encoder-decoder and decoder-only families.

Two further contributions had durable influence:

1. It showed that instruction finetuning **without** CoT data substantially *degrades* chain-of-thought evaluation performance, and that adding just nine CoT datasets fixes this while improving everything else. This made "include reasoning traces in the mixture" a default practice in subsequent post-training.
2. It released Flan-T5 checkpoints publicly. Flan-T5 became one of the most widely used open base models of the following years, which made this paper's mixture design a de facto reference recipe.

## Finetuning Mixture and Procedure

- **Mixtures**: Muffin (80 tasks, including new dialog and program-synthesis data), T0-SF (193 tasks from T0 without Muffin overlap), Natural Instructions v2 (1,554 tasks, with 44 MMLU-related tasks removed to keep MMLU held out), and a CoT mixture of 9 datasets with human-written rationales (74,730 examples total; GSM8K, StrategyQA, e-SNLI, AQuA, CREAK, ECQA, QASC, QED, Sensemaking). Total: 473 datasets, 146 task categories, 1,836 tasks.
- **Formats**: tasks appear with and without instructions, with and without few-shot exemplars, and (for the nine CoT datasets) with and without reasoning chains, using roughly ten templates per task and randomized exemplar delimiters.
- **Training**: constant learning rate, Adafactor, example packing with cross-example attention masking, one checkpoint per model selected by periodic held-out evaluation. Finetuning cost ranges from 1.6% of pre-training compute (Flan-T5-Small) down to 0.2% (Flan-PaLM 540B ≈ 512 TPUv4 chips for 37 hours).
- **Models**: T5 (span corruption, encoder-decoder, 80M–11B), PaLM (causal LM, decoder-only, 8B–540B), cont-PaLM (62B, +500B tokens), and U-PaLM (540B, +20k steps of UL2 objective).

## Evaluation Protocol

Evaluation deliberately targets **held-out** benchmarks not in the finetuning mixture: MMLU (57 tasks, five-shot, direct and CoT), BBH (23 BIG-Bench tasks where PaLM was below the average human rater, three-shot, direct and CoT), TyDiQA (8 languages, one-shot, direct only), and MGSM (multilingual grade-school math in 10 languages, 8-shot CoT only). The headline aggregate is a "normalized average": a macro-average over six scores normalized against per-task lower bounds such as random guessing. Beyond benchmarks, the paper runs a 190-example human-preference study of open-ended generation and a Responsible AI appendix (RealToxicityPrompts, CivilComments classification, Winogender, translation misgendering).

## Results in Their Historical Context

These numbers describe 2022-era models, benchmarks, and comparison sets; they are historical evidence, not current model-selection guidance.

- **Scaling model size and task count both help.** Instruction finetuning improved the normalized average by 9.4–15.5% across PaLM 8B/62B/540B. Most of the task-count gain arrives by 282 tasks; going from 282 to 1,836 adds little. The authors suggest finetuning mostly teaches the model to *express* knowledge already acquired in pre-training (1.4B finetuning tokens vs. 780B pre-training tokens), so extra tasks show diminishing returns.
- **Flan-PaLM 540B vs. PaLM 540B**: MMLU 72.0 vs. 71.3 direct (CoT + self-consistency: 75.2 vs. 69.5); BBH-CoT 66.3 vs. 63.7; one-shot TyDiQA 67.8 vs. 52.9 (+14.9 absolute); MGSM CoT 57.0 vs. 45.9. With CoT + self-consistency it set 2022 SOTA on MMLU (75.2%), MGSM (including 69.6% on Bengali), and GSM8K (83.9% — though GSM8K training data is in the mixture).
- **Flan-T5** improved over LM-adapted T5 by double digits (e.g., T5-XXL normalized average −2.9 → 23.7). Flan-T5-XL (3B) scored 52.4% on MMLU, above GPT-3 175B's 43.9%; Flan-T5-XXL beat PaLM 62B on BBH-direct.
- **Not universally best**: code-davinci-002 remained ahead on BBH-algorithmic (symbolic manipulation), and ByT5 finetuned on TyDiQA's training set stayed ahead of Flan-PaLM's one-shot result.
- **Usability**: human raters preferred Flan-PaLM over PaLM on 79% of 190 open-ended prompts; adding a CoT trigger phrase raised the preference margin by about 10 points; few-shot inputs showed no regression. Base PaLM's characteristic failures were continuing the user's text, echoing the question, and not stopping.
- **Responsible AI**: Flan models produced toxic continuations less often at every scale on RealToxicityPrompts (540B: 0.44 → 0.18 probability on non-toxic prompts, 0.80 → 0.52 on toxic ones) and classified toxicity far better (Flan zero-shot beat base-model 10-shot on CivilComments AUC, though still below the 97.0 AUC of the purpose-built Perspective API). Winogender improved, especially zero-shot; translation misgendering showed no clear effect, and tail toxicity and identity-group disparities persisted.

## The CoT Ablations

The paper's most-cited analytical result is the CoT mixture ablation:

- Finetuning on **only non-CoT** instruction data substantially *degrades* held-out CoT benchmark performance relative to no finetuning — the authors interpret this as instruction finetuning improving unseen tasks mainly when they share the finetuning data's prompting paradigm.
- **Joint** CoT + non-CoT finetuning improves both evaluation classes, so a single checkpoint serves both settings; CoT-only finetuning is worse than the combination on CoT tasks.
- CoT finetuning **unlocks zero-shot reasoning**: "let's think step-by-step" helps Flan-PaLM on BBH but does not help base PaLM. The paper reconciles this with Kojima et al. (2022) by noting that paper's zero-shot CoT successes mostly used instruction-finetuned InstructGPT, with base-model success limited to math word problems.
- The benefit of CoT *prompting* remained scale-gated even after finetuning: on BBH, only Flan-PaLM 540B, Flan-cont-PaLM 62B, and Flan-U-PaLM 540B gained from CoT; and CoT did not beat direct prompting on MMLU, a mostly knowledge-recall benchmark.

## Limitations

- Headline evidence comes from 2022-era Google model families, several proprietary; the released artifacts are the Flan-T5 checkpoints, not Flan-PaLM.
- Task-count scaling saturated in this mixture; the paper cannot distinguish "additional tasks were not diverse" from "finetuning only surfaces pretrained knowledge," and both imply the 1,836-task figure is not a general recipe constant.
- GSM8K's training split is inside the finetuning mixture, so the 83.9% GSM8K result is not a held-out measurement.
- The human evaluation used 190 prompts, one rater per pair, and a log-probability reranking step with a repetition filter — a small, pipeline-dependent preference signal.
- Responsible AI evaluations cover a biased, English-only subset of identity terms, rely on Perspective API scores, and explicitly leave tail toxicity and translation-misgendering harms unresolved.
- The paper does not evaluate instruction-finetuned models as initializations for single-task finetuning, and does not study what in the mixture drives which gains beyond the CoT ablation.

## Analyst Takeaways

1. **Mixture coverage across prompting paradigms is a requirement, not a nicety.** A finetuning mixture drawn from only one interaction format (direct answer-only) can actively damage another format (CoT). Audit the mixture for the prompting regimes you intend to evaluate or deploy.
2. **Small reasoning-data fractions can have outsized effects.** Nine datasets — roughly 75K examples against 1.4B finetuning tokens — determined whether CoT ability survived finetuning. Data mixture composition can matter more than data volume at this scale.
3. **Post-training is a compute-efficiency lever.** A 0.2%-of-pretraining-compute finetune moved the flagship benchmark average by ~9 points, and smaller finetuned models overtook much larger base models (Flan-T5 11B over PaLM 62B on BBH-direct). Compare adaptation cost against scale-up cost before assuming bigger is the only path.
4. **Instruction finetuning is a usability intervention, not only an accuracy intervention.** The largest practical difference was zero-shot behavior: stopping correctly, answering instead of continuing, and responding to trigger phrases — the properties that made few-shot prompt engineering optional.
5. **Held-out discipline is what makes the scaling curves meaningful.** The authors removed MMLU-overlapping tasks from NIV2 and avoided the GPT-3 evaluation suite because its tasks were in the mixture. Claims of "generalization to unseen tasks" are only as strong as that deduplication.

## Current Validity

The durable contributions are the recipe-level findings: multi-task instruction finetuning generalizes to held-out tasks across architectures and sizes; task-count returns diminish; and a small CoT fraction is needed to keep CoT evaluation performance while improving everything else. The subsequent history of the field — instruction-tuned and then preference-tuned chat models as the default interface, and routine inclusion of reasoning traces in post-training mixtures — is consistent with these conclusions, though later work scaled and diversified mixtures far beyond this paper's.

The specific numbers — MMLU 75.2%, the 282-task knee, the per-benchmark margins, the scale gates for CoT benefit, and the responsible-AI magnitudes — are tied to 2022-era PaLM/T5 models, the 2022 versions of these benchmarks, and this particular mixture. Contemporary models are instruction-tuned by default and trained on far larger and more curated post-training mixtures, so none of these quantities transfer directly. Whether a given modern finetuning run preserves a capability absent from its mixture **requires contemporary verification** on that run; this paper supplies the mechanism to suspect, not a current guarantee.

## Vault Ideas Extracted

* [Instruction Tuning](/vault/instruction-tuning.md)
* [Chain-of-Thought Prompting](/vault/chain-of-thought-prompting.md)
* [Emergent Abilities](/vault/emergent-abilities.md)
