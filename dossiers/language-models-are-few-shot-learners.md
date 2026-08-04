---
type: Study Note
title: Language Models are Few-Shot Learners
description: Historical study notes on the GPT-3 paper that established large-scale in-context learning as a practical language-model evaluation paradigm.
resource: https://arxiv.org/abs/2005.14165v4
source: /archive/language-models-are-few-shot-learners.pdf
tags: [in-context-learning, evaluation, generalization]
timestamp: 2026-07-12T22:20:26Z
---

# Language Models are Few-Shot Learners - Study Notes

**Authors**: Tom B. Brown et al.  
**Venue**: arXiv:2005.14165 [cs.CL]  
**Publication date**: May 28, 2020 (v1)  
**Version date**: July 22, 2020 (v4)  
**Pages**: 75

## What It Is

The paper introduces GPT-3, a 175-billion-parameter autoregressive transformer, and evaluates whether a pretrained language model can perform tasks from natural-language instructions and demonstrations without task-specific gradient updates. It compares zero-shot, one-shot, and few-shot inference across language modeling, question answering, translation, commonsense reasoning, reading comprehension, natural-language inference, arithmetic, word manipulation, and open-ended generation.

Its central framing is **in-context learning**: pretraining is the outer loop that builds broad pattern-recognition ability, while examples placed in the inference context create an inner loop of adaptation in the model's activations. The paper carefully leaves open whether this behavior constitutes learning a new task or recognizing a task already represented during pretraining.

## Why It Mattered in 2020

The work made three contributions that were unusually important when it appeared:

1. **It made inference-time task specification a primary evaluation regime.** The model received instructions and up to roughly 10-100 demonstrations in a 2,048-token context, but no fine-tuning.
2. **It linked model scale to better use of context.** Across eight dense models from 125 million to 175 billion parameters, many tasks improved smoothly with scale, and the gap between zero-, one-, and few-shot performance often widened for larger models.
3. **It treated internet-scale pretraining as an evaluation hazard.** The authors attempted benchmark decontamination, disclosed a filtering bug, constructed clean subsets using n-gram overlap, and marked or omitted results where overlap made interpretation unsafe.

The paper also broadened the discussion around large language models by measuring synthetic-news detection, probing gender, race, and religion associations, and discussing misuse and energy costs alongside capability results.

## Model and Evaluation Setup

- GPT-3 retained a GPT-2-style autoregressive architecture with alternating dense and locally banded sparse attention.
- Eight model sizes were trained, from 125M to 175B parameters, each on 300 billion tokens with a 2,048-token context window.
- The mixture combined filtered Common Crawl, WebText2, two books corpora, and English Wikipedia; 93% of training words were English.
- **Zero-shot** supplied only a natural-language instruction, **one-shot** added one demonstration, and **few-shot** supplied as many demonstrations as fit the context.
- Evaluation covered more than two dozen datasets plus synthetic tasks designed to probe rapid adaptation.

## Results in Their Historical Context

The empirical numbers below describe GPT-3 175B and 2020-era comparisons; they are not current model-selection guidance.

- Few-shot GPT-3 reached 86.4% accuracy on LAMBADA, 71.2% on closed-book TriviaQA, 85.0 F1 on CoQA, and 71.8 average on the SuperGLUE test set.
- It was strong on some task formats but weak on others. Few-shot performance was near chance on WiC, remained poor on ANLI, and lagged fine-tuned systems on several reading-comprehension and commonsense benchmarks.
- Demonstrations were not uniformly beneficial. They produced large gains on LAMBADA, WebQuestions, arithmetic, and symbol insertion, but little or inconsistent improvement on Winograd, PIQA, ARC, and some other tasks.
- On synthetic arithmetic, few-shot GPT-3 achieved 100% on two-digit addition and 98.9% on two-digit subtraction, but only about 9-10% on five-digit addition and subtraction.
- Human evaluators identified roughly 200-word and 500-word GPT-3-generated news articles at about 52% accuracy, close to chance under the paper's experiment.

The broad result was not that GPT-3 solved language understanding. It was that a sufficiently large next-token predictor could exhibit useful, task-dependent adaptation from text in its context without changing its parameters.

## Benchmark Contamination Study

The authors initially tried to remove benchmark overlaps from training data, but a bug left some overlaps in long documents. They therefore built a post-hoc analysis:

1. Normalize examples by case, whitespace, and punctuation.
2. Flag an example as potentially dirty when an 8- to 13-gram (or shorter synthetic-task n-gram) overlaps any training document.
3. Compare performance on the complete benchmark with a clean subset.
4. Inspect flagged cases manually because background passages, common phrases, and easy examples can create false positives.
5. Mark suspect results, as with PIQA and Winograd, or omit benchmarks that could not yield a credible clean subset.

This is a durable methodological contribution. The paper also demonstrates its limitations: overlap detection is not proof of memorization, clean subsets can shift the difficulty distribution, and contamination that exposes source passages may differ from contamination that exposes answers.

## Limitations Acknowledged by the Authors

- GPT-3 could repeat, contradict itself, lose coherence, and generate non sequiturs over long passages.
- Its autoregressive objective and lack of grounding may limit comparison-heavy tasks, physical understanding, and goal-directed behavior.
- The study could not determine whether apparent few-shot learning was de novo learning, task recognition, or some mixture.
- The 175B model was expensive to train and inconvenient to serve.
- Internet-trained models reproduced stereotypes and biased associations; the paper's fairness analysis was explicitly preliminary.
- Benchmark contamination and the decontamination bug weakened confidence in some results.

## Analyst Takeaways

1. **Examples are executable task specifications.** They communicate label semantics, output shape, and local conventions inside the same interface as the task itself.
2. **In-context adaptation is not a parameter update.** It is temporary behavior conditioned on the current sequence, so its benefits disappear when the context is removed.
3. **Scale changed the prompting regime, but not monotonically for every task.** The paper's aggregate trend coexists with sharp task-level exceptions.
4. **Evaluation hygiene is part of capability measurement.** Internet-scale pretraining makes source overlap, memorization, and distribution shifts inseparable from benchmark interpretation unless they are actively investigated.

## Current Validity

The concept of in-context learning remains useful and is supported inside this knowledge base by later prompt-engineering surveys that continue to classify zero-shot and few-shot prompting as methods for handling new tasks without task-specific training. The repository's 2025 prompt-contingency evidence also sharpens the original lesson: examples and prompt formats can help, hurt, or wash out depending on the model, task, item, metric, and scoring threshold.

The paper's GPT-3 architecture details, 2,048-token constraint, benchmark rankings, arithmetic behavior, translation asymmetry, synthetic-text detectability, inference economics, and bias measurements are model- and period-specific. Any claim about present-day systems on those dimensions **requires contemporary verification**.

The directional claim that larger models make better use of in-context examples is historically important, but this dossier does not treat it as a universal current law. Whether it holds for a modern model family, reasoning system, context length, or deployment task **requires contemporary verification**.

The contamination framework remains conceptually useful, while its particular n-gram thresholds and clean-subset procedure should not be assumed sufficient for current evaluations. Newer evidence in this knowledge base supports stronger knowledge-isolation and anti-leakage controls, but no existing note proves that prompt-based isolation eliminates memorization.

## Vault Ideas Extracted

* [In-Context Learning](/vault/in-context-learning.md)
* [Anti-Leakage Evaluation](/vault/anti-leakage-evaluation.md)
