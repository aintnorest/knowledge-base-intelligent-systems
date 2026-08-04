---
type: Study Note
title: "DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines"
description: Personal study notes on the original DSPy paper, which replaces hand-written prompt strings with declarative signatures, composable modules, and metric-driven compilation.
resource: https://arxiv.org/abs/2310.03714v1
source: /archive/dspy-compiling-declarative-language-model-calls.pdf
tags: [prompt-optimization, retrieval, chain-of-thought, agents]
timestamp: 2026-07-13T00:11:06Z
---

# DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines — Study Notes

**Authors**: Omar Khattab, Arnav Singhvi, Paridhi Maheshwari, Zhiyuan Zhang, Keshav Santhanam, Sri Vardhamanan, Saiful Haq, Ashutosh Sharma, Thomas T. Joshi, Hanna Moazam, Heather Miller, Matei Zaharia, Christopher Potts  
**Venue**: arXiv:2310.03714v1 [cs.CL]  
**Date**: October 2023  
**Pages**: 32

## What It Is

This is the original DSPy paper. It proposes a programming model for language-model systems that replaces task-specific prompt templates with three abstractions: **signatures**, **modules**, and **teleprompters**. A program declares the text transformations it needs, composes those transformations with ordinary control flow, and then compiles the program against examples and a metric.

The paper's central shift is from treating the prompt string as the primary artifact to treating the whole LM pipeline as the artifact. Prompts, few-shot demonstrations, model choices, and—where available—fine-tuned weights become parameters that a compiler can optimize.

## The Problem It Addresses

Multi-step LM systems traditionally embed instructions and examples in hard-coded strings. That makes a pipeline brittle when the model, task, data distribution, retriever, or component sequence changes. It also leaves prompt selection as manual trial and error, even when the system has labeled examples and an end-to-end metric.

DSPy argues that this is analogous to hand-tuning neural-network weights: program logic should express the intended computation, while an optimizer should choose the task- and model-specific parameters. The goal is not to eliminate evaluation or design judgment; it is to make those judgments explicit in signatures, program structure, and metrics rather than burying them in long templates.

## The Programming Model

### Signatures

A signature is a typed natural-language declaration of a text transformation, such as `question -> answer` or `context, question -> search_query`. Field names, optional instructions, and field descriptions specify what information enters and leaves a component without fixing the exact prompt wording.

Signatures also centralize formatting and parsing. This makes a change in the expected interface—such as generating a search query instead of an answer—a program change rather than a prompt rewrite scattered through the codebase.

### Modules and Programs

Modules implement a signature. `Predict` is the basic LM-call module; higher-level modules generalize common prompting patterns, including chain of thought, program of thought, multi-chain comparison, and ReAct. Modules expose parameters such as the LM, instructions, field prefixes, and demonstrations.

Programs are ordinary imperative computation graphs. They can contain loops, branches, retrieval calls, tools, and nested modules. The paper's small RAG example retrieves passages and passes them with a question to a chain-of-thought answer module; its multi-hop QA program alternates query generation and retrieval before producing an answer.

### Teleprompters and Compilation

A teleprompter takes a program, examples, and a metric, then returns an optimized version of the program. `BootstrapFewShot` runs a teacher program while recording every module trace. If the final prediction passes the metric, the recorded input-output pairs become candidate demonstrations for the corresponding modules—even when only the final answer was labeled.

The compiler can then search over candidate demonstrations or other parameters with random search or Optuna-style optimization. It can also use a stronger teacher to compile a cheaper student and, in the paper, can fine-tune module-specific models from bootstrapped traces. The same framework supports higher-order changes such as ensembling compiled programs.

## Evidence and Results

The paper evaluates 2023-era GPT-3.5 and Llama 2 13B Chat on GSM8K and HotPotQA. These are historical, system-specific results rather than current deployment expectations.

- On GSM8K, compiling the paper's short vanilla, chain-of-thought, and reflection programs with bootstrapped traces substantially outperformed their zero-shot or randomly sampled few-shot variants. The best reported test results were 81.6% for a compiled GPT-3.5 CoT ensemble and 46.9% for a compiled Llama 2 13B Chat reflection ensemble.
- On HotPotQA, a two-hop retrieval program compiled with bootstrapping outperformed a direct RAG baseline. Its reported test answer exact match was 39.6% with GPT-3.5 and 36.4% with Llama 2 13B Chat; ensembling improved the sampled test result for GPT-3.5 to 45.6%.
- The paper also compiled a T5-Large multi-hop system using a teacher ensemble. On its development split it reported 39.3% answer exact match and 46.0% passage accuracy, illustrating the intended expensive-teacher/cheap-student workflow.

The evidence supports the narrower claim that, under these tasks and metrics, end-to-end trace bootstrapping can produce useful per-module demonstrations. It does not establish that compilation will outperform careful prompts for every task or model.

## What I Take From It

1. **The interface is an optimization boundary.** A signature separates stable task intent from mutable prompt realization. This is useful whenever a system needs to switch models, add retrieval, or change a step's representation without rebuilding every template.
2. **A final metric can supervise intermediate components indirectly.** Recording only execution traces that satisfy an end-to-end constraint is a practical way to create weak labels for a multi-stage program. It is especially valuable when annotating every retrieval query, rationale, and tool call would be expensive.
3. **Compilation is not a substitute for program design.** The compiler searches inside a specified architecture and metric. A poor decomposition, weak retriever, permissive metric, or unsafe tool policy can be optimized efficiently into the wrong behavior.
4. **Evaluate the deployed graph, not an isolated prompt.** Model version, retriever, parser, demonstrations, decoding settings, evaluation split, and aggregation rule all affect the result. DSPy makes those dependencies more visible, but it does not remove them.

## Questions and Limitations

- A trace that reaches the correct final answer can contain wrong, unfaithful, or spurious intermediate behavior. A final-answer metric alone is not enough when retrieval grounding, safety, cost, or tool correctness matter; those constraints need to be part of the metric or validation process.
- Bootstrapped demonstrations can reinforce correlated teacher errors or exploit quirks of an evaluator. Holdout evaluation, adversarial cases, and trace inspection remain necessary.
- The paper's empirical comparisons use particular 2023 models, small task-specific datasets, a ColBERTv2 HotPotQA retriever, and benchmark metrics. They should not be read as a current framework or model leaderboard.
- Automatic prompt compilation can make a program less inspectable if its generated demonstrations, instructions, versions, and optimization history are not persisted. Reproducibility needs artifact tracking in addition to source code.
- Tool-using programs need explicit permission boundaries, budgets, schema checks, and recovery policies. DSPy's abstraction makes tools composable; it does not make their actions safe by default.

## Vault Ideas Extracted

* [Declarative LM Pipeline Compilation](/vault/declarative-lm-pipeline-compilation.md)
* [Metric-Gated Trace Bootstrapping](/vault/metric-gated-trace-bootstrapping.md)
* [Prompt Optimization](/vault/prompt-optimization.md)
