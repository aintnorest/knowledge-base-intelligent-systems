---
type: Synthesis
title: Declarative LM Pipeline Compilation
description: Expressing an LLM application as composable typed transformations, then compiling its prompts, demonstrations, models, or fine-tuning choices against an explicit end-to-end metric.
tags: [prompt-optimization, orchestration, agents, tool-use]
timestamp: 2026-07-13T18:08:50Z
---

# Declarative LM Pipeline Compilation

Declarative LM pipeline compilation separates what an application must do from the prompt details used to make a particular model do it. The program defines typed transformations, module composition, tools, and control flow; a compiler then chooses or improves parameters such as instructions, few-shot demonstrations, model assignments, and optionally fine-tuned weights against a target metric.

## Core Structure

1. **Declare interfaces** — Give each LM step explicit input and output fields, such as `context, question -> search_query`.
2. **Compose modules** — Build the retrieval, reasoning, verification, or action graph with ordinary program control flow.
3. **Specify the objective** — Measure the deployed behavior with a metric that reflects the intended outcome and constraints.
4. **Generate and select candidates** — Collect candidate instructions, examples, or model configurations; evaluate them on a validation procedure.
5. **Persist the compiled artifact** — Version the program, data split, metric, model, generated demonstrations, decoding settings, and selected candidate so the result can be reproduced or rolled back.

## Practical Use

Use this pattern when a system has a stable task interface and enough representative examples or evaluators to compare alternatives. It is especially useful for multi-stage RAG, tool use, extraction, and reasoning programs, where manually coordinating templates across several model calls becomes fragile.

Start with a simple graph and a holdout metric. Add components only when they produce a measured improvement. Treat the compiler as a search procedure, not an oracle: compare compiled and human-authored baselines on accuracy, groundedness, latency, cost, and failure modes.

## Limitations

- Compilation cannot fix a bad program decomposition, unreliable tool, or weak objective.
- An end-to-end score can hide unsafe, ungrounded, or expensive intermediate behavior unless those properties are measured directly.
- Generated prompt artifacts require versioning and auditability; otherwise a concise program can conceal an irreproducible deployment configuration.
- Results are contingent on the available model, data, metric, search budget, and validation split.

## Sources

- [DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines dossier](/dossiers/dspy-compiling-declarative-language-model-calls.md) — introduces signatures, modules, teleprompters, and compiler-driven optimization of LM computation graphs.
- [AutoPDL: Automatic Prompt Optimization for LLM Agents dossier](/dossiers/autopdl-automatic-prompt-optimization-llm-agents.md) — expresses candidate Zero-Shot, CoT, ReWOO, and ReAct configurations as executable YAML PDL programs, then saves a successive-halving-selected program as editable source.
