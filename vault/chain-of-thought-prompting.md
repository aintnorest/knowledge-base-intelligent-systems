---
type: Synthesis
title: Chain-of-Thought Prompting
description: Eliciting intermediate natural-language reasoning before an answer, with benefits that depend on the model, baseline behavior, task, prompt, and evaluation setting.
tags: [chain-of-thought, prompting, reasoning]
timestamp: 2026-07-30T09:05:42Z
---

# Chain-of-Thought Prompting

A prompting pattern that asks a language model to generate intermediate natural-language steps before its final answer. In the founding 2022 experiments, few-shot worked examples improved several arithmetic, commonsense, and symbolic tasks for sufficiently capable models, but effects varied across models and tasks.

## The Core Idea

Instead of demonstrating only `question -> answer`, demonstrate `question -> intermediate steps -> answer`. This gives the model an inference-time decomposition pattern without changing its parameters. The intermediate text can allocate more tokens to hard problems, expose errors for diagnosis, and provide structure that a tool or verifier can check.

The generated text is not guaranteed to be correct or to faithfully reveal the model's internal computation. Treat it as a useful intermediate representation, not as evidence by itself.

## Variants

| Variant | Mechanism | When to Use |
|---------|-----------|-------------|
| **Few-shot CoT** | Provide examples with question, intermediate steps, and answer | When worked decompositions can teach the target procedure |
| **Zero-shot CoT** | Add an instruction to reason step by step | A low-setup candidate that still needs task-specific evaluation |
| **Golden CoT** | Provide verified reasoning chains in the prompt | When trusted worked examples exist |
| **Multimodal CoT** | Extend the intermediate representation across text and images | Visual or cross-modal reasoning tasks |

## Zero-Shot CoT as a Pipeline

The founding Zero-shot-CoT paper used more than the familiar instruction. It first appended `Let's think step by step` to elicit a trace, then made a second model call with that trace and a task-specific answer cue. A parser selected the first matching number, option, or yes/no token. Prompt, decoder, stopping behavior, answer cue, and parser therefore all contribute to the measured method.

Historically, this separated **elicitation** from **in-context teaching**: 2022-era large models could produce useful decompositions without worked examples. It did not show that the generated text was faithful or universally helpful.

## Practical Use

Use chain of thought as a candidate intervention for tasks with meaningful intermediate structure. Compare it with the intended production baseline—not only a prompt that prohibits reasoning—and measure final-answer accuracy, reliability, token cost, latency, and item-level regressions. When steps contain arithmetic, retrieval, or other checkable operations, route those operations to deterministic tools rather than trusting the generated trace.

## Historical Evidence

Wei et al. (2022) reported the largest gains on difficult multi-step problems with low standard-prompt baselines. In that paper's model set, PaLM 540B improved from 17.9% to 56.9% on GSM8K and from 79.2% to 93.3% on MAWPS, while gains were smaller or negative on some easy subsets and on some model-task combinations. Equation-only, filler-token, and reasoning-after-answer ablations did not reproduce the GSM8K gain.

Kojima et al. (2022) then reported that Zero-shot-CoT raised `text-davinci-002` from 17.7% to 78.7% on MultiArith and from 10.4% to 40.7% on GSM8K. It did not improve every task, regressed CommonsenseQA in the main comparison, and was ineffective for many smaller models studied. Similar-sounding reasoning triggers also produced materially different scores.

These numbers describe PaLM, GPT-3, LaMDA, Codex, and UL2 under 2022-era benchmark conditions. They are historical evidence for the mechanism, not current performance expectations.

Wei et al. (2022, *Emergent Abilities*) reinterpreted this pattern as emergence of a technique benefit: chain of thought surpassed standard prompting only around 10^23 training FLOPs (~100B parameters) in their catalog, and was neutral or harmful below that threshold. The technique's value is therefore scale-gated, not only task-gated — see [Emergent Abilities](/vault/emergent-abilities.md).

## Length Generalization Is a Separate Test

Intermediate steps do not automatically teach a procedure that scales to longer instances. In controlled parity and variable-assignment tasks, ordinary fine-tuning and scratchpad fine-tuning could fit short sequences yet fail on longer dependency chains. A few short scratchpad examples sometimes did induce a pretrained model to apply the template much farther, but that depended on the base model already having compatible skill.

When a chain of thought is meant to carry a sequential algorithm, evaluate beyond the demonstration and training lengths. Separate changes in token count, operation count, dependency depth, positional distance, and output length; a strong score on one is not evidence for the others.

## Limitations and Current Validity

- A coherent trace can contain factual, semantic, symbol-mapping, or calculation errors and can occasionally reach the right answer by accident.
- Exposed reasoning is not necessarily a faithful account of internal computation.
- More intermediate tokens increase cost and latency, and an elaborate prompt can regress easy tasks.
- Contemporary models may already produce a short reasoning trace by default; in that case, an explicit generic CoT request can have little value. Dedicated reasoning models may also incur substantial additional latency for marginal or negative accuracy changes.
- Prompt effects depend on the model, task, examples, output format, and metric. The effective scale threshold reported in 2022 is not a universal cutoff.
- A two-stage answer extractor can hide ambiguity by selecting the first matching token from a trace containing multiple answers; evaluate the complete pipeline, not only the visible trigger phrase.
- Later surveys in this knowledge base retain chain of thought as a foundational technique, but whether it improves a contemporary model or deployment **requires contemporary verification**.

## Sources

- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models dossier](/dossiers/chain-of-thought-prompting-elicits-reasoning.md) - primary historical evidence for few-shot chain-of-thought prompting, its ablations, scaling behavior, and error analysis.
- [Large Language Models are Zero-Shot Reasoners dossier](/dossiers/large-language-models-are-zero-shot-reasoners.md) - primary historical evidence for zero-shot chain-of-thought, its two-stage pipeline, prompt sensitivity, scale interaction, and error analysis.
- [Prompt Engineering Survey dossier](/dossiers/prompt-engineering-survey.md) - later survey covering few-shot and zero-shot chain of thought and related techniques.
- [A Systematic Survey of Prompt Engineering in Large Language Models](/dossiers/systematic-survey-prompt-engineering-llms.md) - later taxonomy that places chain of thought among a broader family of reasoning methods.
- [Prompt Engineering is Complicated and Contingent dossier](/dossiers/prompt-engineering-complicated-contingent.md) - newer evidence that prompt effects and reliability depend on model, item, formatting, and scoring threshold; it does not directly retest chain of thought.
- [Prompting Science Report 2 dossier](/dossiers/decreasing-value-chain-of-thought-prompting.md) - contemporary GPQA evidence that generic explicit CoT can improve mean performance for some non-reasoning models while reducing strict reliability, and adds substantial latency with little value for the tested reasoning models.
- [Exploring Length Generalization in Large Language Models dossier](/dossiers/exploring-length-generalization-language-models.md) - controlled evidence that scratchpad fine-tuning can retain length-generalization failures while few-shot scratchpads can activate a length-robust pretrained template under task-specific conditions.
- [Emergent Abilities of Large Language Models dossier](/dossiers/emergent-abilities-large-language-models.md) - catalogs chain-of-thought's benefit over standard prompting as emergent, appearing only near 10^23 training FLOPs (~100B parameters) in 2022-era models.
