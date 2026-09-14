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

Demonstrations also locate the task through their input distribution, label space, and pair structure. In 2022 closed-set experiments, uniformly randomizing demonstration labels cost only 2.6 accuracy points on classification and 1.7 on multiple choice on average, while out-of-distribution inputs, removal of the true label space, or broken pair formatting caused larger losses. This does not show that correct mappings are generally dispensable: the result is bounded to base and meta-trained models on classification-like tasks, and some model–dataset combinations were much more sensitive.

## Practical Use

Use in-context examples when a task lacks training data, when its desired output schema is easier to show than describe, or when behavior must change without maintaining a separately fine-tuned model. Evaluate examples on the target model and task: example selection, ordering, formatting, and available context can all affect results.

Treat ordering and output structure as experimental variables. Four SST-2 demonstrations produced a 54.3%–93.4% accuracy range across permutations for GPT-3 2.7B. A content-free probe such as `N/A` can expose a prompt-induced answer prior; contextual calibration improved mean and worst-case results across prompt sets, but requires label probabilities and assumptions about the content-free distribution. On contemporary instruction-tuned math models, worked traces can primarily teach parser-compatible answer formatting rather than reasoning, while still helping weaker checkpoints.

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
- [Calibrate Before Use dossier](/dossiers/calibrate-before-use.md) — measures example-order and format instability and corrects a prompt-induced answer prior with content-free probes.
- [Rethinking the Role of Demonstrations dossier](/dossiers/rethinking-role-demonstrations-icl.md) — separates demonstrations' input-distribution, label-space, format, and input–label-mapping functions.
- [Revisiting Chain-of-Thought Prompting dossier](/dossiers/zero-shot-stronger-than-few-shot-cot.md) — finds capability-dependent few-shot effects and shows that demonstrations can primarily specify the evaluator-facing answer format.
- [Prompting best practices dossier](/dossiers/claude-prompting-best-practices.md) — vendor guidance recommending relevant, diverse, delimited examples while supplying no evaluation methodology for the stated three-to-five-example rule.
