---
type: Study Note
title: "Rethinking the Role of Demonstrations: What Makes In-Context Learning Work?"
description: "Historical study notes on 2022 experiments showing that random-label demonstrations often preserved most few-shot gains on natural-language classification and multiple-choice benchmarks, while input distribution, label space, and pair formatting remained consequential."
resource: https://aclanthology.org/2022.emnlp-main.759/
source: /archive/rethinking-role-demonstrations-icl.pdf
tags: [in-context-learning, prompting, evaluation, generalization]
timestamp: 2026-09-14T17:12:42Z
---

# Rethinking the Role of Demonstrations: What Makes In-Context Learning Work? — Study Notes

**Authors**: Sewon Min, Xinxi Lyu, Ari Holtzman, Mikel Artetxe, Mike Lewis, Hannaneh Hajishirzi, and Luke Zettlemoyer  
**Venue**: EMNLP 2022, pages 11048–11064  
**DOI**: [10.18653/v1/2022.emnlp-main.759](https://doi.org/10.18653/v1/2022.emnlp-main.759)  
**Preprint**: arXiv:2202.12837v2, revised October 20, 2022  
**Code**: [Alrope123/rethinking-demonstrations](https://github.com/Alrope123/rethinking-demonstrations)

## What It Is

This paper asks what information few-shot demonstrations actually contribute when a frozen language model performs a task in context. Its counterintuitive finding is narrow but important: on the tested natural-language classification and multiple-choice benchmarks, replacing each demonstration's gold label with a label sampled independently from the task's label space usually preserved most of the gain over a no-demonstration baseline.

That is not evidence that demonstrations are useless or that labels never matter. The prompts still supplied in-distribution inputs, the task's output vocabulary or answer distribution, and a repeated input–label-pair format. Ablations show that each can drive performance. The better interpretation is that these 2022-era models often used demonstrations to **locate and format a task already represented during pretraining**, rather than learning a novel input–label rule from 16 examples.

## Experimental Coverage

The main evaluation contains 26 low-resource datasets, each with fewer than 10,000 training examples: 16 classification datasets and 10 multiple-choice datasets. They span sentiment analysis, paraphrase detection, natural-language inference, hate-speech detection, question answering, and sentence completion, with domains including finance, science, medicine, social media, and commonsense. The authors evaluate on development sets and report dataset-macro-averaged macro-F1 for classification and accuracy for multiple choice.

The model table contains six dense decoder-only language-model configurations from 774M to an assumed 175B parameters:

- GPT-2 Large (774M);
- MetaICL (774M), initialized from GPT-2 Large and meta-trained on supervised tasks with an in-context-learning objective;
- GPT-J (6B);
- fairseq dense LMs at 6.7B and 13B;
- base GPT-3 Davinci, treated as 175B.

Each checkpoint is used with **direct** scoring, which models the label given the input, and **channel** scoring, which models the input given a candidate label. The paper therefore calls the resulting 6 × 2 combinations “12 models,” but these are not 12 independently trained model families. All are dense decoder-only models, two fairseq sizes share a family, MetaICL derives from GPT-2 Large, and direct/channel are inference formulations rather than checkpoints.

The default prompt uses 16 uniformly sampled demonstrations. The first four model configurations are run across all 26 datasets with five demonstration seeds. Fairseq 13B and GPT-3 are restricted by cost to MRPC, RTE, TweetEval-hate, OpenBookQA, CommonsenseQA, and COPA with three seeds. The deeper ablations in Sections 4.2 and 5 use five classification and four multiple-choice datasets, so the most diagnostic mechanism claims have narrower task coverage than the headline result.

## Random-Label Experiments

### Gold labels versus random labels

For the central intervention, the input examples remain drawn from the task's training set, but each demonstration label is sampled uniformly from the task's allowable label set without regard to the paired input. Across nearly all reported model/method combinations, random labels reduce performance by 0–5 absolute points relative to gold demonstrations. Averaged at the task-family level, the loss is 2.6 points for classification and 1.7 for multiple choice.

This comparison matters only where demonstrations themselves help. The paper reports exceptions: direct GPT-2, direct GPT-J, and direct fairseq 6.7B are not significantly above random guessing on many classification datasets, while channel fairseq 13B has a no-demonstration result significantly above its gold-demonstration result. Weak or negative few-shot gains in those cells cannot support a strong claim about preserving useful in-context learning.

### Deliberately incorrect labels

Uniform random assignment can accidentally leave some pairs correct, so the authors separately vary the fraction of correct pairs from 100% to 0%, sampling every remaining label from the incorrect classes. Performance is often surprisingly insensitive. With zero correct pairs, the prompts retain 92% of the gold-demonstration improvement for MetaICL classification, 100% for MetaICL multiple choice, and 97% for GPT-J multiple choice. GPT-J classification is the important counterexample: always-incorrect labels cost nearly 10 points relative to gold, although they still outperform no demonstrations.

This distinction prevents the headline from collapsing into “labels do not matter.” They matter more for some dataset–model–inference combinations, and adversarially wrong correspondences can be more damaging than independent uniform noise.

### Number of examples and templates

Across 4, 8, 16, and 32 demonstrations, the gold-versus-random gap is generally 0.8–1.6 points; classification at four shots is the exception at 4.4 points, which the authors attribute to high variance. Performance changes little beyond eight examples under either labeling regime. This is consistent with the prompt exposing easily inferred distributional and formatting cues, but it does not prove that larger labeled samples would be unhelpful for tasks whose rule is absent from pretraining.

Replacing the minimal serialization with manually written, dataset-specific templates preserves the qualitative random-label result. Manual templates are not consistently better, so the effect is not an obvious artifact of one austere prompt syntax.

### Matching the empirical label distribution

The headline random labels are sampled uniformly. In classification experiments, sampling labels instead from the training set's empirical class distribution narrows the gold-versus-random gap further: from 1.9 to 1.3 points for channel MetaICL and from 5.0 to 3.5 for channel GPT-J. Demonstrations can therefore communicate label priors independently of correct pairings.

## What the Demonstrations Supply

The paper decomposes a demonstration prompt into four partially entangled properties: correct input–label mapping, input-text distribution, label space, and the repeated pairing format.

### Input distribution

The authors replace task inputs with length-matched sentences sampled from English CC-News while retaining random in-task labels and the pair structure. Moving the inputs out of distribution causes 3–16-point absolute drops for channel MetaICL and direct/channel GPT-J on both task families; direct MetaICL is the exception. Direct GPT-J on multiple choice becomes worse than no demonstrations. The prompt's unlabeled inputs are therefore substantive evidence about what kind of text and task is present, not inert padding.

### Label or answer space

The authors replace task labels with a same-sized set of random English words while retaining in-distribution inputs and paired formatting. Direct models lose 5–16 points compared with random labels sampled from the true label space. Channel models lose only 0–2 points and sometimes improve. This asymmetry matches the scoring rule: direct inference must generate or score the target label and benefits from seeing its vocabulary, whereas channel inference conditions on each candidate label while scoring the input.

“Label space” is broader than a fixed class-name list. Multiple-choice answers vary per question, but their answer texts still have a dataset-specific distribution. The study's result is consequently about exposure to plausible outputs, not merely enumerating `positive` and `negative`.

### Pair format

Removing the pair structure—concatenating only inputs or only labels—is close to or worse than no demonstrations. Keeping pair-shaped examples can preserve large gains even when one side is uninformative:

- direct MetaICL retains 95% of its classification improvement and 82% of its multiple-choice improvement when random external sentences are paired with the real label set;
- channel MetaICL and GPT-J retain 82% and 87% of classification gains, and 86% and 75% of multiple-choice gains, when in-distribution inputs are paired with random English words.

The likely role of format is to cue continuation behavior: repeated input/output-shaped blocks tell the model what textual operation to complete. But the appendix also shows why “format” is hard to isolate. Replacing all labels with the same word or repeating the test input in every pair performs badly, plausibly because constant fields themselves become separators and alter the sequence pattern.

### Meta-training magnifies the shortcut

MetaICL exhibits the weakest sensitivity to correct mappings and the strongest dependence on easy structural cues. The paper hypothesizes that explicit meta-training teaches the model to exploit simpler prompt properties—especially the output space it must generate and the repeated format—rather than infer harder pairwise correspondences. This is an observed behavioral pattern plus a plausible explanation, not a mechanistic demonstration of what the model internally computes.

## What “Learning” Means Here

Under a strict definition—recovering a novel input–label correspondence from the examples—the experiments suggest little learning in many tested cells. Under a broader definition—adapting to an input distribution, output space, and interaction format so predictions improve—the same results are evidence of in-context adaptation.

The paper's own “task location” interpretation is the useful one: pretraining supplies associations such as positive financial language ↔ `positive`; demonstrations make the relevant latent task and answer interface easier to recover. This also predicts the boundary condition. If pretraining did not encode the desired correspondence, randomly labeled examples should not teach it, and even correctly labeled few-shot examples may be insufficient.

Calling the method “zero-shot” needs care. Its near-few-shot alternative uses **unlabeled examples from the target training distribution** paired with random labels. It requires no gold labels, but it is not ordinary zero-shot inference with no task data; it is closer to transductive or unsupervised task adaptation through the context.

## Code Availability and Reproducibility

The authors released a Python implementation at [github.com/Alrope123/rethinking-demonstrations](https://github.com/Alrope123/rethinking-demonstrations). It contains scripts for constructing the gold/random, correctness-fraction, out-of-distribution, random-English-word, input-only, and label-only variants, plus commands for the main runs and ablations. It is built on the MetaICL codebase, documents five seeds, and includes GPT-3 support.

The release is useful but not a push-button reproduction of every reported cell. Its README explicitly supports GPT-2, MetaICL, GPT-J, and GPT-3 and asks readers to contact the authors about other models. The exact CC-News sample used for out-of-distribution prompts is not released. The environment pins Python 3.8, PyTorch 1.9, an old `datasets` version, and a specific Transformers commit; GPT-3 reproduction also depends on a retired 2022 API/model interface and paid access. The paper supplies enough intervention detail to reimplement the tests on current models, but that would be a new experiment rather than a literal reproduction.

## Limitations and Later-Regime Boundaries

- **The result is task-bounded.** All evaluations are closed-set classification or multiple choice with natural-language inputs. The paper does not test open-ended generation, structured extraction, tool calls, code generation, long-horizon interaction, or agent trajectories.
- **It does not establish arbitrary-noise robustness.** The v2 paper cites later evidence that negating classification labels can substantially reduce performance. It also notes follow-up chain-of-thought work where pairing questions with unrelated rationales hurts sharply, even though some counterfactual rationales such as wrong equations hurt less. Random class labels are one corruption regime, not a general license to use incorrect demonstrations.
- **Macro-averages hide consequential failures.** Dataset-level gaps vary; the largest reported random-versus-gold gap is nearly 14 points on `financial_phrasebank` with channel GPT-J. Several hate-speech datasets also have non-negligible gaps.
- **Synthetic or novel tasks may behave differently.** The paper cites synthetic evidence that models rely more on correct pairings when input spaces are artificial or the correspondence is unlikely to have appeared in pretraining. That is exactly where task location cannot substitute for learning the supplied rule.
- **The model regime is historical.** Evidence comes from 2022 base language models plus one GPT-2-derived meta-trained system. It does not cover instruction-tuned chat models, preference-trained assistants, modern reasoning models, sparse/MoE systems, or current long-context many-shot prompting. Post-training can change how models treat instructions, demonstrations, and contradictory labels, so the quantitative insensitivity must be re-measured per current model and interface.
- **Mechanism is inferred from behavioral ablations.** Input distribution, label space, and format cannot be manipulated with perfect independence; the appendix's constant-label and repeated-input failures expose those interactions. The experiments establish causal sensitivity to prompt interventions, not an internal mechanism or proof that mappings are ignored on every item.
- **Resource constraints narrow the strongest-model evidence.** GPT-3 and fairseq 13B cover only six datasets and three seeds, while the mechanism ablations use nine datasets and principally MetaICL/GPT-J. “Consistent over 12 models” should not be read as broad coverage of 12 modern architectures.
- **Potential pretraining exposure is part of the proposed explanation but unmeasured.** The study does not audit whether individual benchmark tasks, label semantics, or examples appeared in training corpora. Task recognition from pretraining and benchmark contamination are not disentangled.

## Analyst Takeaways

1. **Treat a demonstration as a bundle, not just supervised pairs.** Inputs identify the domain, outputs identify the answer distribution, and serialization identifies the interaction contract. An ablation that changes labels while preserving everything else does not remove the prompt's task information.
2. **Do not infer teaching from a few-shot gain.** Compare gold labels against shuffled, deliberately wrong, input-only, label-only, and out-of-distribution controls. A gain over an empty prompt can be task location or format induction rather than acquisition of the demonstrated mapping.
3. **Match controls to the scoring direction.** Direct and channel inference exploit different sides of the pair. The direct/channel divergence is not noise; it reveals whether the model needs to generate the label or condition on it.
4. **Use unlabeled in-domain examples when labels are expensive—but call the regime accurately.** Pair-shaped prompts built from target-distribution inputs can be a strong practical baseline. They are not data-free zero-shot prompting and can fail when the task semantics are absent from pretraining.
5. **Correct examples remain the safe default for novel semantics and high-stakes use.** The result lowers confidence that ordinary few-shot prompts teach new mappings; it does not show that wrong examples are harmless. Measure dataset-level regressions rather than trusting the macro-average.
6. **Re-run the controls on contemporary systems.** Modern post-training, chat templates, longer contexts, and reasoning traces all sit outside this evidence. The paper supplies an excellent diagnostic design, not a timeless numerical law.

## Vault Ideas Extracted

* [In-Context Learning](/vault/in-context-learning.md) — update with the demonstration-bundle decomposition, random-label controls, and the distinction between task location and learning a novel mapping.
* [Prompt Contingency](/vault/prompt-contingency.md) — update with the direct/channel asymmetry, dataset outliers, and the limits of transferring a 2022 random-label result to later post-training regimes.
