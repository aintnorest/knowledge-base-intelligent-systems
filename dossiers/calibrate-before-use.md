---
type: Study Note
title: "Calibrate Before Use: Improving Few-Shot Performance of Language Models"
description: Study notes on contextual calibration, a data-free correction for prompt-induced answer bias and instability in few-shot language-model classification and constrained generation.
resource: https://arxiv.org/abs/2102.09690v2
source: /archive/calibrate-before-use.pdf
tags: [in-context-learning, prompting, reliability, evaluation, context-engineering]
timestamp: 2026-09-14T17:11:33Z
---

# Calibrate Before Use: Improving Few-Shot Performance of Language Models - Study Notes

**Authors**: Tony Z. Zhao, Eric Wallace, Shi Feng, Dan Klein, Sameer Singh  
**Venue**: ICML 2021; arXiv:2102.09690 [cs.CL]  
**Publication date**: February 19, 2021 (arXiv v1)  
**Version date**: June 10, 2021 (v2)  
**Pages**: 15

## What It Is

This paper identifies a practical failure mode of early in-context learning: GPT-3's few-shot accuracy can swing dramatically when the prompt's format, demonstration set, or demonstration order changes. The authors trace much of that volatility to a prompt-conditioned shift in the model's answer distribution, then introduce **contextual calibration**, a data-free inference-time correction estimated by replacing the real test input with content-free probes such as `N/A`.

The method is not confidence calibration in the usual sense of making a stated 70% confidence correspond to 70% empirical accuracy. It is closer to zeroing a biased measuring instrument: estimate which answers the model prefers before seeing meaningful test content, then divide out that contextual prior before choosing an answer.

## The Instability the Paper Measures

A few-shot prompt has three independently consequential parts:

1. **Format**: the template, task description, separators, and label names.
2. **Training examples**: which demonstrations appear.
3. **Permutation**: the order of those demonstrations.

Holding the task fixed does not make these nuisance choices harmless. With four-shot SST-2 and GPT-3 2.7B, changing only demonstration order moved accuracy from 54.3% to 93.4%. Appendix A gives an especially sharp two-shot example: reversing one positive and one negative review changed accuracy from 88.5% to 51.3%. Variance remained with as many as 16 demonstrations and with the 175B model; adding a demonstration could even reduce mean accuracy. Across 15 manually designed SST-2 formats, some formats were better on average, but all still varied substantially across training sets.

The paper attributes this behavior to three answer biases:

- **Majority-label bias**: the model overpredicts labels that occur more often among the demonstrations. On four-shot LAMA, 50.2% of GPT-3 2.7B's predictions repeated one of the four demonstration answers even though the ground-truth repeat rate was 24.7%.
- **Recency bias**: labels nearer the end of the prompt exert more influence. In balanced four-shot SST-2 prompts, putting the same two labels last shifts predictions toward that class. The effect can overpower the majority: a `[Positive, Positive, Positive, Negative]` order produced nearly 90% Negative predictions.
- **Common-token bias**: answers frequent in pretraining are preferred over rarer but task-appropriate answers. On balanced 14-class DBPedia, GPT-3 predicted the label `book` eleven times as often as `artist`; label-name frequency and prediction rate had a reported correlation of $r=0.67$.

These effects often behave like a global displacement rather than a complete destruction of discrimination. For one SST-2 prompt with 67% accuracy at the default 0.5 threshold, moving the threshold to 0.68 would yield 94% on the validation set. That observation motivates correcting the output distribution rather than searching endlessly for a lucky prompt.

## Contextual Calibration

For a fixed prompt, the procedure is:

1. Insert a content-free test input, such as `N/A`, while preserving the prompt format, demonstrations, and order.
2. Record the model's probabilities for the allowed answers. The running two-label sentiment prompt assigns 61.8% to Positive even though `N/A` should contain no sentiment evidence.
3. Treat this vector $p_{cf}$ as the prompt's answer prior. For classification, renormalize the probabilities of the label-name tokens and apply diagonal vector scaling with $W = \operatorname{diag}(p_{cf})^{-1}$ and zero bias. This makes the content-free answer scores uniform.
4. Apply the same transformation to each real test input and choose the transformed argmax.

The correction is **contextual**: a different format, demonstration set, or permutation gets a different $p_{cf}$ and therefore needs its own calibration. It uses no labeled calibration set and does not update model weights.

The authors average three probes in their main experiments: `N/A`, `[MASK]`, and the empty string. Probe choice is consequential rather than magical. On one-shot SST-2, the uncalibrated baseline was 66.5%; individual probes produced 72.9-74.5% for the three main choices, while their ensemble reached 79.0%. Other strings, including ordinary words and gibberish, ranged from 69.1% to 79.4%. On zero-shot AGNews, the same alternatives ranged from 57.3% to 65.5%, and the three-probe ensemble reached 66.5% versus a 48.5% baseline. “Content-free” therefore means uninformative for the task by design, not semantically or tokenization-neutral to the model.

For generation tasks, the paper calibrates the model's full first-token distribution and then generates greedily. It limits correction to the first token because the evaluated extraction and retrieval outputs were empirically nearly deterministic afterward. An additive correction worked better than vector scaling for these high-dimensional generation distributions, while vector scaling worked better for classification.

## Evaluation and Quantitative Results

The study evaluates GPT-3 at 2.7B, 13B, and 175B parameters through the OpenAI API, plus GPT-2 XL at 1.5B. Tasks include six text-classification datasets (SST-2, TREC, CB, RTE, AGNews, and DBPedia), LAMA fact retrieval, and four slot-extraction settings from ATIS and MIT Movies. Classification uses label-token probabilities; fact retrieval and extraction use greedy generation and exact match.

The primary experiment holds format fixed, evaluates five random demonstration sets in arbitrary order, and compares the same sets before and after calibration at 0, 1, 4, and 8 shots. The paper stops at eight shots in this experiment because OpenAI API query costs were prohibitive. Its headline is an improvement of up to 30.0 absolute accuracy points, accompanied by higher worst-case accuracy and lower across-prompt variance in most settings. Representative table results include:

| Setting | Uncalibrated | Contextually calibrated | Change |
|---|---:|---:|---:|
| AGNews, GPT-3 175B, zero-shot | 43.9 | 73.9 | +30.0 |
| SST-2, GPT-3 2.7B, eight-shot | 54.0 | 82.0 | +28.0 |
| TREC, GPT-3 175B, one-shot | 57.7 | 75.7 | +18.0 |
| ATIS departure date, GPT-3 2.7B, one-shot | 42.3 | 65.6 | +23.3 |

Calibration also removed the zero-to-one-shot accuracy drop in three of the four affected classification cases. In some settings, calibrated GPT-3 2.7B beat the uncalibrated 175B model by as much as 19.3 points despite being more than 50 times smaller. GPT-2 usually showed the same direction: improved mean accuracy and reduced variance on most tasks.

The gains were not universal. Examples in Table 1 include CB with GPT-3 2.7B at one shot (33.8 to 33.0), RTE with GPT-3 175B at one shot (62.9 to 62.8), LAMA with GPT-3 175B at four shots (62.0 to 61.8), and ATIS departure date with GPT-3 13B at one shot (97.9 to 95.5). The method is a strong baseline, not a monotonic guarantee.

A separate format study varies 15 SST-2 prompt formats and paraphrased templates for three LAMA relations. Calibration improves average and worst-case accuracy for both and reduces SST-2 format variance. On AGNews, the data-free correction approaches an oracle diagonal calibration fitted with validation data, but that comparison covers one dataset rather than establishing general equivalence.

## Access and Implementation Requirements

The arithmetic is only a few lines and the additional compute is small, but the interface requirements are real:

- The system must expose probabilities or logits for every candidate label token. An API that returns only sampled text cannot implement the paper's classification method exactly.
- Each distinct prompt configuration needs at least one additional content-free inference; the paper uses three and averages them. The resulting prior can be cached only while format, demonstrations, order, label names, model, and decoding interface remain unchanged.
- The paper's label scoring assumes each class has an associated token whose probability can be read and renormalized. Multi-token labels require a sequence-scoring policy that this study does not evaluate.
- Its generation variant requires access to the broad first-token distribution, not merely a short top-token list, and it does not calibrate later tokens.

The authors had probability access through the 2021 OpenAI GPT-3 API and released replication code. These requirements make exact reuse dependent on the current provider and endpoint rather than on prompt access alone.

## Limitations

- The models are base GPT-2/GPT-3 systems from 2021, not instruction-tuned or preference-trained chat models. Their measured biases, thresholds, and gains are historical.
- Most evidence comes from short classification, fact retrieval, and span extraction with constrained answers. Open-ended generation, reasoning traces, dialogue, tool use, and modern structured outputs are outside scope.
- The method assumes an uninformative input ought to induce a uniform answer distribution. That is appropriate for the paper's balanced classification framing, but it can erase legitimate class priors in imbalanced deployment populations or under asymmetric costs.
- A probe may not be content-free to the model, and Table 3 shows material probe sensitivity. Averaging three hand-selected probes reduces dependence; it does not prove they estimate a true causal prior.
- Calibration removes a prompt-level output shift. It cannot recover distinctions the model never learned, repair semantic prompt errors, or eliminate the need to validate prompt choice.
- The primary training-set experiment uses only five randomly selected sets and arbitrary order rather than an exhaustive permutation study across all tasks. The oracle comparison is limited to AGNews.
- The paper uses probabilities rather than logits because of API constraints and corrects only a first generated token. Those engineering choices bound what its results establish.

## Analyst Takeaways

1. **Treat demonstration order as a model input, not presentation.** A benchmark or product that reports one arbitrary order hides a potentially dominant source of variance.
2. **Measure the prompt's prior before trusting its answer.** A deliberately uninformative query can reveal label preference introduced by examples, order, format, and pretraining frequency.
3. **Calibration and prompt search solve different problems.** Search finds a strong configuration; contextual calibration attempts to make any fixed configuration less biased and narrows best-to-worst differences. The paper explicitly says it mitigates rather than eliminates prompt engineering.
4. **More examples and more parameters do not automatically produce robustness.** The demonstrated variance persists at 16 shots and at 175B, and a single example can make accuracy worse through majority-label bias.
5. **API observability determines whether the technique is deployable.** Output probabilities are not incidental telemetry here; they are the control surface.

## Current Applicability

The durable idea is broader than the specific 2021 recipe: before interpreting a model's choice as evidence about the input, estimate how much of that choice is induced by the surrounding context alone. Modern evidence in this knowledge base continues to show that semantically equivalent prompt formats can produce large, model-specific accuracy spreads, so format and order remain evaluation variables rather than settled preprocessing details.

Exact contextual calibration should nevertheless be revalidated on every current model and interface. Instruction tuning, chat templates, hidden system prompts, tokenizer changes, constrained decoding, and preference optimization can alter both the answer prior and whether token probabilities are meaningful. If an endpoint exposes stable candidate log probabilities, the method remains cheap to test on a held-out deployment slice. If it does not, asking a chat model to verbalize confidence is a different technique and is not a drop-in substitute for this paper's output-distribution correction.

## Vault Ideas Extracted

- [In-Context Learning](/vault/in-context-learning.md) — add the evidence that demonstration identity and order can dominate accuracy, that more shots can hurt, and that contextual calibration reduces but does not remove this contingency.
- [Prompt Contingency](/vault/prompt-contingency.md) — add content-free probing as a diagnostic for prompt-induced answer priors, plus the 54.3%-to-93.4% SST-2 permutation spread and the later format-level calibration result.
