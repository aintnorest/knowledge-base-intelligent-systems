---
type: Study Note
title: Scaling Instruction-Finetuned Language Models
description: Historical study notes on the Flan-PaLM/Flan-T5 paper, which scaled instruction finetuning along task count, model size, and chain-of-thought data, and found that a mixture missing a prompting paradigm actively degrades that paradigm's held-out performance.
resource: https://arxiv.org/abs/2210.11416v5
source: /archive/scaling-instruction-finetuned-language-models.pdf
tags: [fine-tuning, chain-of-thought, reasoning, generalization, evaluation]
timestamp: 2026-08-25T20:15:03Z
---

# Scaling Instruction-Finetuned Language Models - Study Notes

**Authors**: Hyung Won Chung, Le Hou, Shayne Longpre, Barret Zoph, Yi Tay, William Fedus, Yunxuan Li, Xuezhi Wang, Mostafa Dehghani, Siddhartha Brahma, Albert Webson, Shixiang Shane Gu, Zhuyun Dai, Mirac Suzgun, Xinyun Chen, Aakanksha Chowdhery, et al., Jason Wei (Google)
**Venue**: arXiv:2210.11416 [cs.LG]
**Publication date**: October 20, 2022 (arXiv v1)
**Version date**: December 6, 2022 (v5) — v5 added text-davinci-003 comparisons to Appendix D and corrected misreported PaLM-540B MMLU-CoT numbers; v4 added the Responsible AI appendix; v3 added the FAQ appendix
**Pages**: 54

## What It Is

This paper takes an existing technique — supervised finetuning of a pretrained language model on many datasets phrased as natural-language instructions — and scales it along three axes at once: the number of finetuning tasks (to 1,836), the model size (to 540B parameters), and the presence of chain-of-thought (CoT) annotations in the mixture. The finetuning procedure is called **Flan**, and the resulting models are Flan-PaLM (8B/62B/540B), Flan-cont-PaLM (62B), Flan-U-PaLM (540B), and the publicly released Flan-T5 checkpoints (80M–11B).

The headline claim is that this is a general, compute-cheap capability intervention: Flan-PaLM 540B improved the normalized average over held-out benchmarks by 9.4% over PaLM 540B while spending 0.2% of PaLM's pre-training compute, and reached 75.2% on five-shot MMLU with CoT prompting plus self-consistency, a 2022 state of the art. The paper closes by recommending instruction finetuning "for virtually all pretrained language models."

The more interesting result is narrower and sits in §4.2. Instruction finetuning on non-CoT data alone does not merely fail to help CoT evaluations — it **degrades them below the no-finetuning baseline**. Adding nine CoT datasets, roughly 1.8–3% of the sampled mixture, repairs the damage and improves everything else. Read that way, the paper is less about scale and more about mixture composition: a post-training run can silently remove a capability the base model had, and the deciding factor is whether the mixture covers the prompting paradigm you intend to use.

## Why It Mattered in 2022

Prior instruction-finetuning work had scaled one variable at a time: Wei et al. (2021, FLAN) used a 137B model with 62 tasks; Sanh et al.'s T0 used 11B; Wang et al.'s Natural Instructions v2 reached 1.6K tasks but only at 3B. This paper aggregated all three mixtures, added dialog, program-synthesis, and CoT data, and applied one procedure across encoder-decoder and decoder-only families with three different pre-training objectives.

Three consequences had durable influence:

1. **The CoT ablation** made "include reasoning traces in the post-training mixture" a default practice rather than an option.
2. **Zero-shot usability** was demonstrated as the practical payoff. Base PaLM's characteristic failures were continuing the user's text instead of answering it, echoing the question, and not knowing when to stop — an artifact of pre-training without end-of-sequence tokens. Instruction finetuning fixed these, which is what made prompt engineering with few-shot exemplars optional rather than mandatory.
3. **Flan-T5 was released publicly.** It became one of the most widely used open checkpoints of the following years, which turned this paper's mixture design into a de facto reference recipe.

## The Finetuning Mixture

- **Sources**: Muffin (80 tasks — 62 from FLAN plus 26 new, including dialog and program-synthesis data), T0-SF (193 tasks from T0 that do not overlap Muffin; "SF" = *sans Flan*), Natural Instructions v2 (1,554 tasks), and a reasoning mixture of 9 CoT datasets. Totals: **473 datasets, 146 task categories, 1,836 tasks**.
- **Held-out discipline**: 44 MMLU-related tasks were removed from NIV2 so MMLU stays a held-out benchmark, and the GPT-3 evaluation suite was avoided entirely because nearly all of its tasks have training splits inside the mixture. The generalization claims are only as strong as this deduplication, and the authors treat it that way.
- **CoT mixture**: 74,730 human-written-rationale examples across ESNLI (36,170), GSM8K (7,470), ECQA (7,110), CREAK (6,910), Sensemaking (6,070), QED (5,145), AQuA (2,715), StrategyQA (2,060), QASC (1,080). Roughly ten hand-written instruction templates per task.
- **Sampling weights matter more than task counts.** Per-task example caps (Muffin 30K, T0-SF 20K, CoT 100K, NIV2 5K) set mixture proportions of 52/15/3/30% ("Proportion A") for the §3 scaling and §4 ablation experiments, revised to 46.0/27.9/1.8/24.2% ("Proportion B") for the remaining models after T0-SF proved valuable. So the CoT slice that carries the paper's most-cited finding is under 3% of sampled data — and the headline models were trained on a slightly different recipe than the scaling curves that justify them.
- **Formats**: every task appears with and without instructions, with and without few-shot exemplars, and (for the nine CoT datasets) with and without reasoning chains, using randomized exemplar delimiters. Finetuning on both zero-shot and few-shot formats is what preserves both at inference.

## Procedure and Cost

Constant learning rate, Adafactor, example packing with cross-example attention masking, one checkpoint per model chosen by periodic held-out evaluation, JAX/T5X. Batch sizes 32–64, dropout 0.05–0.1, 14K–98K steps. Finetuning compute ranges from 1.6% of pre-training (Flan-T5-Small) to 0.2% (Flan-T5-XXL and Flan-PaLM 540B, the latter ≈512 TPU v4 chips for 37 hours). In token terms the asymmetry is starker: 1.4B finetuning tokens against 780B pre-training tokens.

Models span T5 (span corruption, encoder-decoder), PaLM (causal LM, decoder-only), cont-PaLM (PaLM 62B plus 500B more tokens), and U-PaLM (PaLM 540B plus 20K steps of the UL2 objective).

## Evaluation Protocol

Evaluation targets four held-out benchmarks: MMLU (57 tasks, five-shot, direct and CoT), BBH (23 BIG-Bench tasks where PaLM scored below an average human rater, three-shot, direct and CoT), TyDiQA (8 languages, one-shot, direct exact match only), and MGSM (multilingual grade-school math, 10 languages, 8-shot CoT only). The aggregate is a **normalized average**: a macro-average over six scores (MMLU-direct, MMLU-CoT, BBH-direct, BBH-CoT, TyDiQA, MGSM), each scaled against a task-specific lower bound such as random guessing — which is why small models can score negative. Beyond benchmarks the paper runs a 190-example human-preference study and a Responsible AI appendix.

One reporting subtlety worth carrying: all MMLU numbers are validation-set except Tables 1 and 4, which are test-set. Comparing across those tables produces small spurious deltas.

## Results in Their Historical Context

These numbers describe 2022-era models, benchmarks, and comparison sets. They are historical evidence, not current model-selection guidance.

- **Both scaling axes help, but unequally.** Instruction finetuning lifted the normalized average by 15.5% (8B), 10.4% (62B), and 9.4% (540B). The absolute gain shrinks with scale, but the relative error reduction grows (18.4% at 540B vs. 16.6% at 8B), and the paper is careful that the two framings disagree.
- **Task count saturates early.** At 540B: 9 tasks → 52.6, 89 → 57.0, 282 → 57.5, 1,836 → 58.5. Most of the gain arrives by 282 tasks. The authors offer two explanations they cannot separate — the extra tasks are insufficiently diverse, or finetuning mostly teaches the model to *express* knowledge already acquired in pre-training. The 1.4B-vs-780B token ratio makes the second plausible, and either way "1,836 tasks" is not a recipe constant.
- **Flan-PaLM 540B vs. PaLM 540B** (Table 4, test set): MMLU 72.2 vs. 69.3 direct, 75.2 vs. 69.5 with CoT + self-consistency; BBH-nlp 78.4 vs. 78.2 (CoT+SC); BBH-alg 66.5 vs. 62.2; one-shot TyDiQA 67.8 vs. 52.9 (+14.9 absolute); MGSM 72.0 vs. 57.9 (CoT+SC), including 69.6% on Bengali where PaLM's best CoT+SC language results were 63.6% French and 61.2% German. GSM8K reached 83.9% with CoT+SC — but GSM8K's training split is in the finetuning mixture, so that one is not a held-out measurement.
- **Context for 75.2% on MMLU**: competitive human forecasters polled in July 2022 had predicted 73.2% (Hypermind) and 82.7% (Metaculus) for June *2023*. The paper's own framing is that the result beat one forecast a year early; average human raters score 34.5% and human experts 89.8%.
- **Flan-T5 punches above its parameter count.** T5-XXL's normalized average moved −2.9 → 23.7. Flan-T5-XL (3B) scored 52.4% on MMLU-direct against GPT-3 175B's 43.9%; Flan-T5-XXL (11B) beat PaLM 62B on BBH-direct; Flan-PaLM 62B beat PaLM 540B on TyDiQA (58.7 vs. 52.9 EM).
- **Instruction finetuning composes with other adaptation.** Flan-U-PaLM (instruction finetuning on top of UL2 continued pre-training) was the strongest model in the paper at 59.1 normalized average (+8.9 over U-PaLM) — evidence that these are complementary compute-efficient levers rather than substitutes.
- **Not universally best.** Flan-PaLM did not reach the prior best on BBH-algorithmic (66.5 with CoT+SC vs. code-davinci-002's 73.9) or TyDiQA (67.8 vs. a task-finetuned ByT5's 81.9). Symbolic manipulation and single-task finetuning both remained better served by other approaches.

## The Chain-of-Thought Ablation

This is the paper's analytical core, and it is a claim about mixtures, not about scale:

- **Non-CoT-only finetuning degrades held-out CoT performance below the no-finetuning baseline** at all three PaLM sizes. The paper reconciles this with prior work that found instruction finetuning purely beneficial: that work only evaluated held-out *NLP* tasks in the same answer-only paradigm, on models generally too small for CoT to work at all.
- **The proposed reading**: "instruction finetuning improves unseen tasks when the unseen tasks are in the same prompting paradigm as the finetuning tasks." Generalization to held-out *tasks* is real; generalization across held-out *interaction formats* is not automatic.
- **Joint CoT + non-CoT finetuning improves both evaluation classes**, so a single checkpoint serves both. CoT-only finetuning is worse than the combination even on CoT benchmarks — and, visible in Table 3, the 9-task CoT-only mixture actively hurts several direct-prompting scores (8B BBH-direct 30.8 → 19.8; 62B MMLU-direct 55.1 → 48.5). The damage runs in both directions.
- **CoT finetuning unlocks zero-shot reasoning.** "Let's think step by step" improves Flan-PaLM on BBH but does nothing for base PaLM, whose zero-shot CoT attempts loop, restate the question, or never stop. The paper reconciles this with Kojima et al. (2022) by observing that most of that paper's successful zero-shot-CoT results used InstructGPT — already instruction-finetuned — and that base-model successes were confined to math word problems.
- **CoT prompting stays scale-gated even after finetuning.** On BBH, non-finetuned models benefit from CoT only at 62B and above; among instruction-finetuned models, only Flan-PaLM 540B, Flan-cont-PaLM 62B, and Flan-U-PaLM 540B gain. And CoT does not beat direct prompting on MMLU at all, which the paper attributes to MMLU being mostly knowledge recall — CoT+SC beats direct there, but plain CoT does not.

## Usability and Responsible AI

- **Human preference**: 190 open-ended prompts (five zero-shot categories of 20, three CoT-trigger variants of 20, plus 30 few-shot), five temperature-0.7 samples per model reranked by unnormalized log probability with a repetition filter, one rater per pair. Flan-PaLM was preferred 79% of the time overall; CoT-trigger inputs raised the margin by about 10 points; few-shot inputs showed no regression.
- **Toxic generation** (RealToxicityPrompts, Perspective API): Flan models produced toxic continuations less often at every scale — at 540B, 0.44 → 0.18 on non-toxic prompts and 0.80 → 0.52 on toxic ones. An important measurement caveat the paper states plainly: PaLM was scored on its first complete sentence while Flan models were scored on the entire continuation, because Flan models emit EOS. The comparison is not like-for-like.
- **Toxicity classification** (CivilComments, AUC-ROC): every Flan model's zero-shot AUC beat its base model's 10-shot AUC (540B: 71.4/82.1 → 86.5/87.1). Still below the purpose-built Perspective API at 97.0.
- **Winogender**: Flan-PaLM beat PaLM at every scale after the exact-match scorer was adapted to ignore leading articles — Flan-PaLM prefixed responses with articles in 78–86% of cases and Flan-T5-XXL in 96%, which would otherwise have been scored as errors. Gains were largest zero-shot; scale had no clean linear effect and Flan-T5-XXL outperformed all Flan-PaLM variants. Gotcha examples improved but still trailed stereotypical ones.
- **Translation misgendering** (26 languages, 1,954 passages): mixed, with no clear effect from instruction finetuning; at 540B, PaLM slightly outscored Flan-PaLM (97 vs. 95 overall). Every model performed worse where the correct English translation needs "she."
- **What did not improve**: tail toxicity remains high, and Flan models mirror PaLM's identity-group disparities (the upper quartile of toxicity for Judaism stays above other religious groups). The paper's own C.6 limitations section is unusually direct about English-only coverage, a biased subset of identity terms, and Perspective API noise.

## Limitations

- Headline evidence comes from 2022-era Google model families, most of them proprietary; only the Flan-T5 checkpoints were released, and their model card states they were never tested in real-world applications.
- Task-count scaling saturated within this mixture, and the paper cannot distinguish "the extra tasks were not diverse" from "finetuning only surfaces pretrained knowledge." Both readings undercut the 1,836 figure as a target.
- The scaling and ablation experiments used a different mixture weighting (Proportion A) than the final headline models (Proportion B), so §3/§4 curves and §5 tables are not strictly the same recipe.
- GSM8K's training split sits inside the mixture, so the 83.9% GSM8K SOTA is not a held-out result — the paper flags this itself.
- The human evaluation is 190 prompts with one rater per pair, mediated by a log-probability reranking and repetition-filtering pipeline. It is a small, pipeline-dependent preference signal.
- Toxicity comparisons are scored differently for PaLM and Flan models; Responsible AI evaluations are English-only and rely on automated classifiers with known bias.
- The paper does not evaluate instruction-finetuned models as initializations for single-task finetuning (Appendix A.1 explicitly defers this), and does not decompose which parts of the mixture drive which gains beyond the CoT split.

## Analyst Takeaways

1. **A finetuning mixture defines a capability envelope, not just a capability floor.** The load-bearing finding is that non-CoT-only finetuning made models *worse* at CoT than no finetuning at all. Post-training can subtract. Audit the mixture for every prompting regime you intend to evaluate or deploy, and measure the regimes you did not train on.
2. **Small data fractions can decide large behaviors.** Nine datasets at 1.8–3% of sampled mixture weight determined whether reasoning ability survived. Mixture *composition* dominated mixture *volume* here, which argues for treating post-training data ratios as a first-class tunable rather than an afterthought.
3. **Post-training is a compute-arbitrage lever.** A 0.2%-of-pre-training finetune moved the aggregate ~9 points, and small finetuned models overtook far larger base ones (Flan-T5 3B over GPT-3 175B on MMLU; Flan-PaLM 62B over PaLM 540B on TyDiQA). Price adaptation against scale-up before assuming more parameters is the path.
4. **Usability was the largest practical delta, and it is invisible to accuracy metrics.** Stopping correctly, answering rather than continuing, and responding to a bare trigger phrase are what made few-shot exemplars optional. Benchmarks measured a few points; the human study measured 79% preference.
5. **Held-out discipline is the load-bearing methodology.** Removing 44 MMLU-adjacent NIV2 tasks and discarding the GPT-3 eval suite is what licenses the word "unseen." Any generalization claim from a multi-task finetune is worth exactly as much as its deduplication audit.
6. **Report both absolute and relative gains across scale.** The paper's own A.3 shows the same data supports "instruction finetuning helps small models more" (absolute) and "helps large models more" (relative error reduction). State which one you mean.

## Current Validity

The durable contributions are recipe-level: multi-task instruction finetuning generalizes to held-out tasks across architectures, sizes, and pre-training objectives; task-count returns diminish quickly; instruction finetuning composes with other continued-pre-training methods; and a small CoT fraction is required to keep CoT ability while improving everything else. The subsequent history of the field — instruction-tuned and then preference-tuned chat models as the default interface, and routine inclusion of reasoning traces in post-training mixtures — is consistent with these conclusions.

The specific quantities are not. MMLU 75.2%, the 282-task knee, the per-benchmark margins, the scale gates on CoT benefit, and the responsible-AI magnitudes are tied to 2022-era PaLM and T5 checkpoints, the 2022 versions of these benchmarks, and this particular mixture. Contemporary models are instruction-tuned by default and trained on post-training mixtures orders of magnitude larger and more curated, and the paradigm-coverage question has shifted from "did you include CoT" to questions about tool-use traces, long-horizon trajectories, and preference data. Whether a given modern post-training run preserves a capability absent from its mixture **requires contemporary verification** on that run. This paper supplies a mechanism to suspect, not a current guarantee.

## Vault Ideas Extracted

* [Instruction Tuning](/vault/instruction-tuning.md) — the umbrella concept: mixture design, scaling behavior, cost profile, and the paradigm-coverage requirement
* [Chain-of-Thought Prompting](/vault/chain-of-thought-prompting.md) — updated: CoT ability depends on the post-training mixture, and zero-shot CoT is largely an instruction-tuning artifact
* [Emergent Abilities](/vault/emergent-abilities.md) — updated: primary evidence qualifying the claim that instruction-tuning benefit is emergent at ~100B
* [Prompt Contingency](/vault/prompt-contingency.md) — updated: which prompt formats work is contingent on the finetuning mixture, not only on scale
