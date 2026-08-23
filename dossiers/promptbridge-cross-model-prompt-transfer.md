---
type: Study Note
title: "PromptBridge: Cross-Model Prompt Transfer for Large Language Models"
description: "Study notes on model-dependent prompt drift, metric-guided calibration, and a training-free source-to-target prompt mapping learned from paired alignment tasks."
resource: https://arxiv.org/abs/2512.01420v1
source: /archive/promptbridge-cross-model-prompt-transfer.pdf
tags: [prompt-optimization, prompting, agents, multi-agent, evaluation]
timestamp: 2026-08-23T20:48:02Z
---

# PromptBridge: Cross-Model Prompt Transfer for Large Language Models — Study Notes

**Authors**: Yaxuan Wang, Quan Liu, Zhenting Wang, Zichao Li, Wei Wei, Yang Liu, and Yujia Bao<br>
**Affiliations**: University of California, Santa Cruz; Center for Advanced AI, Accenture<br>
**Preprint**: arXiv:2512.01420v1 [cs.CL]<br>
**Date**: December 1, 2025<br>
**Pages**: 54

## What It Is

PromptBridge is a training-free framework for migrating prompt libraries between language models. Its premise is that a prompt optimized for one model is not a portable specification: changing the model can reduce performance even when the task, surrounding application, and prompt text remain fixed. The paper calls the resulting substitution effect **model drifting**.

Instead of independently re-optimizing every prompt for every target model, PromptBridge calibrates a source–target model pair on a reusable set of alignment tasks. It obtains optimized prompts for both models on those tasks, asks a capable language model to summarize the recurring transformation between the paired prompts, and applies that summary to source prompts for unseen tasks. The transferred artifact is therefore an explicit model-pair mapping rather than a bag of task examples.

The paper evaluates this design across seven language models and eight coding, coding-agent, and planning benchmarks. The central evidence is useful, but the framework remains an experimental prototype: calibration is compute-heavy, a strong third-party model performs the mapping and adaptation in the main setup, the released paper optimizes instructions rather than demonstrations, and several headline “relative gain” calculations use a nonstandard denominator.

## The Problem: Prompt–Model Drift

For a task (T), let a source model's optimized prompt be applied unchanged to a target model. The paper measures the transfer gap against the target model's own optimized prompt. This separates two effects that ordinary model replacement conflates:

1. the target model's underlying capability; and
2. how well the inherited prompt elicits that capability.

The gap can be large and asymmetric. On HumanEval, the GPT-5-optimized prompt scored 68.70% when moved to Llama-3.1-70B-Instruct, while that target model's own optimized prompt reached 79.47%. Moving the Llama-optimized prompt in the opposite direction reduced GPT-5 only from 99.39% to 96.95%. The appendix reports the same diagonal-versus-off-diagonal pattern within model families and across model sizes, so shared lineage is not evidence of prompt portability.

This is more specific than ordinary prompt sensitivity. Prompt sensitivity asks how wording or formatting changes affect one fixed model. Prompt–model drift asks how holding the prompt fixed while replacing the model changes the system, and how the prompt itself should be transformed for the new interpreter.

## How PromptBridge Works

### 1. Calibrate paired prompts

For each alignment task, the framework optimizes one prompt for the source model and another for the target model. The reported setup uses 54 coding alignment tasks: 30 sampled subtasks from a synthetic code-generation dataset and 24 CodeContests training tasks.

The calibration algorithm, Model-Adaptive Reflective Prompt Evolution (MAP-RPE), is a population-based search:

1. Run the current prompt on calibration instances and score task performance plus a behavioral metric.
2. Give failures, prior prompts, and quantitative feedback to a reflection model, which proposes rewritten prompts.
3. Retain candidates in three evolutionary “islands” to preserve search diversity, periodically migrate strong candidates, and select by a weighted performance/behavior score.
4. Repeat until the budget is exhausted and keep the best model-specific prompt.

For code tasks, the behavior score combines syntax validity, required entry-point presence, absence of risky operations, and absence of undesirable patterns. The reported experiments weight task performance at 0.8, use 20 calibration questions, allow 20 global iterations and 10 local evolution steps, and maintain an archive of up to 1,000 candidates. “Training-free” therefore means no weight updates, not low-compute or evaluation-free.

### 2. Distill a source→target transformation

A Mapping Extractor receives the optimized source/target prompt pairs plus task descriptions and summarizes their common structural, stylistic, and semantic differences. In the main experiments this extractor is GPT-5.

This explicit summary is the transferable object. The paper's ablation finds that one-shot or five-shot in-context examples are less consistent: they encourage imitation of task-specific surface patterns, whereas an extracted transformation attempts to preserve the recurring model-level delta.

### 3. Adapt an unseen prompt

At test time, an Adapter Model receives three inputs: the unseen task's source-model prompt, the learned transformation summary, and the source/target model identities. It writes a target-compatible prompt without evaluation examples or another optimization loop for that unseen task. GPT-5 also serves as the primary adapter in the experiments.

## Experimental Evidence

### Single-model coding tasks

With GPT-4o as source, PromptBridge improved on direct prompt transfer across all five reported coding benchmarks for target o3:

| Benchmark | Direct transfer | PromptBridge | Difference |
|---|---:|---:|---:|
| HumanEval | 92.27 | 97.15 | +4.88 points |
| MBPP | 77.92 | 80.44 | +2.52 points |
| APPS | 32.67 | 36.44 | +3.77 points |
| xCodeEval | 66.04 | 74.84 | +8.80 points |
| CodeContests | 48.61 | 56.36 | +7.75 points |

It also beat direct transfer on all five tasks for o4-mini and Llama-3.1-70B-Instruct. Broader results were less absolute: on the five-task average for Llama-3.1-8B-Instruct, PromptBridge improved over direct transfer but scored slightly below the GPT-5 Optimizer baseline; individual datasets also contain cases where another method wins.

MAP-RPE's calibration results support the need for model-specific search but not universal superiority. It had the highest five-task average on o3, while GEPA had the highest average on o4-mini. MIPROv2 was especially unstable across datasets in the reported setup.

### Coding agents and multi-agent systems

On SWE-bench Verified, transferring an o4-mini prompt directly to o3 resolved 33.4% of tasks; PromptBridge reached 46.0%, a 12.6-point improvement. For Llama-3.1-70B-Instruct the corresponding change was 7.6% to 8.8%.

Terminal-Bench experiments also favored PromptBridge over direct transfer in the reported source/target configurations. In the MapCoder multi-agent system, however, the result depends on which agents move. PromptBridge improved the global four-agent switch and performed best when only the debugging agent changed, but was not consistently best for isolated coding- or planning-agent replacement. This supports a practical distinction between **local drift** in one role and **global drift** in the joint prompt configuration.

### Planning outside the calibration domain

The TravelPlanner experiments provide limited evidence of cross-domain transfer from coding calibration. In sole-planning mode, PromptBridge improved the final pass rate from 3.33% to 7.22% for o3 and from 1.67% to 3.33% for Llama-3.1-70B-Instruct relative to frozen direct transfer. The two-agent setting shows more mixed component metrics even when final pass rate improves, reinforcing that an adapted prompt must be checked against the full workflow rather than a single headline number.

## Analyst Takeaways

1. **Version prompts with their model interface.** A prompt is partly a compatibility layer for a particular model, chat template, tool grammar, and alignment regime. A model upgrade should trigger prompt regression tests, not just a model benchmark.
2. **Measure the elicitation gap during migration.** Compare the inherited prompt, an adapted candidate, and a target-optimized ceiling on the same representative cases. Otherwise model capability and prompt compatibility remain confounded.
3. **Amortize migration work at the model-pair level.** When many tasks share a prompt library, a stable calibration suite can expose recurring source→target edits and reduce repeated per-task search.
4. **Migrate multi-agent systems as configurations.** Test both local role swaps and the global workflow. Individually adapted prompts can alter message length, formatting, or division of labor in ways that only end-to-end evaluation reveals.
5. **Keep the mapping inspectable.** PromptBridge's natural-language transformation is easier to review and version than an opaque soft-prompt projector, but it is still a generated hypothesis. Store the paired anchors, extractor model and prompt, mapping, adapter model, and validation results.

## Questions and Limitations

- **Optimization cost is substantial.** The method avoids parameter training but still requires source- and target-model prompt evolution across many alignment tasks, repeated executions, a large candidate archive, and calls to a reflection model.
- **The strongest setup depends on GPT-5.** Ablations show weaker extractor/adapter combinations can reduce accuracy sharply. This complicates the claim that migration is lightweight when a separate frontier model is required.
- **The “small calibration set” is underspecified operationally.** The paper uses 54 alignment tasks and a deep per-task search. Cost, latency, and total calls are not reported in a form that supports deployment budgeting.
- **Only instructions are transferred.** Few-shot examples, tool schemas, system messages, decoding settings, and non-text configuration remain outside the optimization target.
- **Generalization evidence is domain-skewed.** Most calibration and evaluation is coding-centered; TravelPlanner is promising but small in absolute pass rate and mixed across component metrics.
- **The optimum is optimizer-relative.** MAP-RPE supplies the paper's “optimal” prompts, so the measured drift gap depends on how successfully that search approximates each model's true best prompt.
- **Headline relative-gain labels are inconsistent with the stated formula.** For SWE-bench o3, 33.4% to 46.0% is a 37.7% increase relative to the direct-transfer baseline, or 27.39% of the final score. The paper reports 27.39% while stating that direct transfer is the denominator. The underlying 12.6-point improvement is unambiguous and is the safer quantity to cite.
- **Code availability is promised rather than established in the PDF.** Reproduction also needs the exact calibration prompts, seeds, model snapshots, API settings, and evaluation harnesses.

## Vault Ideas Extracted

* [Prompt–Model Drift](/vault/prompt-model-drift.md)
* [Cross-Model Prompt Mapping](/vault/cross-model-prompt-mapping.md)
* Updated [Prompt Optimization](/vault/prompt-optimization.md)
* Updated [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
