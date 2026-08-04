---
type: Synthesis
title: Application-Centric Prompt Taxonomy
description: Classifying prompt engineering methods by the product or reasoning problem they address rather than by prompt surface form.
tags: [prompting, taxonomy, reasoning]
timestamp: 2026-07-13T02:29:00Z
---

# Application-Centric Prompt Taxonomy

An application-centric prompt taxonomy organizes prompting methods by the job they perform: adapting to new tasks, improving reasoning, reducing hallucinations, clarifying user intent, optimizing prompts, controlling tone, supporting code execution, or enabling metacognitive abstraction.

## Why It Matters

Prompt engineering techniques are easy to overgeneralize. A taxonomy based on application area forces the design question to start with the failure mode:

| Need | Prompting Family |
|------|------------------|
| New task without training data | Zero-shot, few-shot |
| Multi-step reasoning | CoT, self-consistency, ToT, GoT, BoT |
| Factual grounding | RAG, ReAct, CoVe, CoN, CoK |
| Task-specific examples | Active-Prompt |
| Automatic instruction search | APE, OPRO |
| Tool-using reasoning | ART, ReAct |
| Code or numerical execution | Scratchpad, PoT, SCoT, CoC |
| Ambiguous user request | Rephrase and Respond |
| Abstraction before answering | Step-Back prompting |

The same prompt surface form can serve different purposes, and the same product problem can require several prompt families in sequence.

## Structural Complement

Application categories answer *why* a method is needed. A second, orthogonal view groups techniques by how they operate: in-context learning, thought generation, decomposition, ensembling, self-criticism, and prompt optimization. Use both views: identify the failure mode first, then choose an operational mechanism that can address it.

## From Product Need to Comparable Evidence

When a product category is still too broad, translate it into a narrower task shape and a representative benchmark slice. A task-centered survey maps methods to mathematical, logical, commonsense, multi-hop, contextual and context-free QA, spatial, tabular, code, truthfulness, extraction, classification, translation, and agentic task-completion settings. This makes the taxonomy useful for building an evaluation matrix, not only naming methods.

Treat reported “best” methods as candidate baselines rather than transferable rankings. The comparison may change with the model, dataset version, examples, decoding settings, tool access, token budget, and metric. Record those conditions, then compare a simple baseline with the intervention that directly addresses the observed bottleneck: executable computation, decomposition, representation, context selection, verification, or labeling policy.

## Practical Use

Use the taxonomy as a routing layer before writing prompts:

1. Identify the dominant failure mode.
2. Pick the prompt family designed for that failure mode.
3. Choose evaluation metrics that match the family, such as accuracy, F1, exact match, pass@k, human preference, latency, or token count.
4. Test against representative examples rather than assuming the family transfers universally.

## Limitations

Application categories overlap. ReAct can be reasoning, retrieval, tool use, and hallucination reduction. Program-of-Thoughts can be reasoning and code execution. A taxonomy is a decision aid, not a rigid ontology.

## Sources

- [A Systematic Survey of Prompt Engineering in Large Language Models dossier](/dossiers/systematic-survey-prompt-engineering-llms.md) - organizes more than 40 prompt engineering techniques by application area and summarizes their models, datasets, and metrics.
- [The Prompt Report dossier](/dossiers/prompt-report.md) — groups 58 text-based techniques by operational mechanism and cautions that categories overlap in practice.
- [A Survey of Prompt Engineering Methods in Large Language Models for Different NLP Tasks dossier](/dossiers/survey-prompt-engineering-methods-nlp-tasks.md) — maps 39 techniques to 29 NLP tasks and shows why method rankings must remain conditional on the reported model, dataset, and evaluation setup.
