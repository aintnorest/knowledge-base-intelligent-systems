---
type: Synthesis
title: In-Context Learning
description: Temporarily adapting a language model's behavior by placing instructions and demonstrations in its input context without updating model weights.
tags: [in-context-learning, prompting, generalization]
timestamp: 2026-07-30T09:05:42Z
---

# In-Context Learning

In-context learning is the use of instructions, demonstrations, or both inside a model's current input sequence to specify a task without gradient updates. The model's parameters remain fixed; the adaptation exists only while the relevant context is available.

## Core Settings

| Setting | Inference-time task information |
|---------|---------------------------------|
| Zero-shot | A natural-language instruction, with no demonstrations |
| One-shot | An instruction plus one input-output example |
| Few-shot | An instruction plus multiple input-output examples |

Demonstrations can communicate more than the abstract task. They can establish output format, label meanings, tone, granularity, and edge-case conventions that are awkward to express as rules.

## Practical Use

Use in-context examples when a task lacks training data, when its desired output schema is easier to show than describe, or when behavior must change without maintaining a separately fine-tuned model. Evaluate examples on the target model and task: example selection, ordering, formatting, and available context can all affect results.

## Limits

- Context-conditioned behavior is temporary and consumes context-window capacity.
- More examples are not guaranteed to help; irrelevant, biased, or misleading examples can reduce performance.
- Apparent adaptation may combine task recognition, retrieval of pretrained patterns, and genuine inference-time generalization.
- Results depend on the model, task, prompt format, metric, and individual item.
- Demonstrations do not remove factuality, safety, bias, or benchmark-contamination risks.

The 2020 GPT-3 paper established the historical evidence that larger models in that model family often used demonstrations more effectively. The 2022 emergent-abilities survey sharpened this: on many benchmarks (MMLU, BIG-Bench arithmetic, TruthfulQA, Word in Context), few-shot performance sat near random across orders of magnitude of scale before jumping above random at a model-size threshold — see [Emergent Abilities](/vault/emergent-abilities.md). Generalizing that scaling relationship or its benchmark results to current systems requires contemporary verification.

## Sources

- [Language Models are Few-Shot Learners dossier](/dossiers/language-models-are-few-shot-learners.md) - foundational 2020 formulation and GPT-3 evaluation of zero-, one-, and few-shot inference without weight updates.
- [Prompt Engineering Survey dossier](/dossiers/prompt-engineering-survey.md) - later survey evidence that examples do not uniformly improve performance.
- [A Systematic Survey of Prompt Engineering in Large Language Models](/dossiers/systematic-survey-prompt-engineering-llms.md) - later taxonomy retaining zero-shot and few-shot prompting for new tasks without extensive training.
- [Prompt Engineering is Complicated and Contingent dossier](/dossiers/prompt-engineering-complicated-contingent.md) - 2025 evidence that prompt effects are model-, task-, metric-, and item-dependent.
- [Emergent Abilities of Large Language Models dossier](/dossiers/emergent-abilities-large-language-models.md) - 2022 catalog showing few-shot task performance is often near-random below a model-scale threshold, so demonstration use can appear absent until scale unlocks it.
