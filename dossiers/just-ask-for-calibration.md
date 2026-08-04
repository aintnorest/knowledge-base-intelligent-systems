---
type: Study Note
title: "Just Ask for Calibration: Strategies for Eliciting Calibrated Confidence Scores from LMs Fine-Tuned with Human Feedback"
description: Study notes on eliciting usable confidence scores from RLHF language models by asking for probabilities or likelihood expressions instead of relying on their conditional token probabilities.
resource: https://arxiv.org/abs/2305.14975v2
source: /archive/just-ask-for-calibration.pdf
tags: [evaluation, reliability, prompting, reinforcement-learning]
timestamp: 2026-07-30T17:10:00Z
---

# Just Ask for Calibration - Study Notes

**Authors**: Katherine Tian, Eric Mitchell, Allan Zhou, Archit Sharma, Rafael Rafailov, Huaxiu Yao, Chelsea Finn, Christopher D. Manning  
**Venue**: arXiv:2305.14975 [cs.CL]  
**Publication date**: May 24, 2023 (arXiv v1)  
**Version date**: October 24, 2023 (v2)  
**Pages**: 15

## What It Is

This paper evaluates how to extract confidence from language models fine-tuned with human feedback. Its main finding is counterintuitive but operationally useful: for GPT-3.5, GPT-4, Claude 1/2, and Llama-2-70B-Chat, a model's **verbalized confidence** is often better calibrated than the conditional probability of its answer token.

Calibration means that predictions assigned a probability around *p* are correct about *p* of the time. It enables selective answering, deferral, and review; it is distinct from answer accuracy or the model's apparent fluency.

## Methods Compared

The authors test three ways to obtain confidence for short-form TriviaQA, SciQ, and TruthfulQA questions:

- Conditional probability of the chosen answer label, and a prompted “is this answer true?” probability.
- Multiple sampled answers, using frequency as a confidence estimate.
- One- or two-stage direct verbalization: numerical probability or a selection from likelihood phrases such as “unlikely” and “highly likely.” They also ask for top-*k* answers and probabilities, and test a chain-of-thought preamble.

They report expected calibration error (ECE), temperature-scaled ECE and Brier score, plus selective-accuracy/coverage AUC. The calibrated versions fit temperature or phrase-to-probability mappings on held-out folds; this is necessary to distinguish a good ranking from a usable probability scale.

## Results

Across the three datasets, direct verbalization usually reduces ECE relative to token probabilities—often by more than 50%—and verbalized likelihood expressions can be similarly useful. Asking for several answer candidates improves calibration further, consistent with the “consider the opposite” interpretation: it makes alternatives explicit before the model assesses its selected answer.

RLHF changes the picture. The paper finds that chat-tuned Llama-2-70B's conditional probabilities are generally less calibrated than its pre-RLHF counterpart, while verbalized confidence provides an improvement on several metrics. The authors interpret this as a mismatch between next-token likelihood after preference optimization and the confidence a dialogue model can express when asked directly.

Chain-of-thought variants did not consistently improve calibration. Claude's results also vary by version and method, so the conclusion is not that every verbalized number is calibrated; rather, it is a promptable measurement interface worth evaluating against its own probability outputs.

## Limitations

- The study evaluates short factual QA rather than long-form generation, tool use, or multi-step agent decisions.
- Calibration depends on model, dataset, answer-scoring model, prompt template, and whether temperature/phrase mapping is fitted on held-out data.
- A well-calibrated confidence score can still accompany an unacceptably inaccurate model; it supports routing, not truth verification.
- Model names, RLHF procedures, API behavior, and the reported calibration values are from 2023 and must not be treated as properties of current systems.

## Analyst Takeaways

1. **Ask for confidence; do not assume logprobs are the best interface.** Preference-trained chat models can expose a more useful uncertainty signal in natural language than in their answer-token probability.
2. **Calibrate the confidence pipeline end to end.** Measure ECE, Brier score, and selective risk on representative holdout data; optimize neither only accuracy nor only a confidence ranking.
3. **Elicit alternatives before deciding when coverage matters.** Top-*k* candidate prompts can improve confidence estimation, but they cost tokens and need a policy for allocating probability mass.
4. **Use confidence to decide what happens next.** Low confidence should route to retrieval, tools, verification, or a human—not become an unsupported caveat appended to an answer.

## Current Validity

The durable lesson is an interface-design hypothesis: post-trained models may report uncertainty more usefully when asked in the form they were trained to use. The numerical results, prompt templates, and specific model comparisons are historical. Re-measure calibration after any model, system-prompt, scoring, domain, or policy change.
