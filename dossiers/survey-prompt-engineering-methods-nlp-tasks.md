---
type: Study Note
title: 'A Survey of Prompt Engineering Methods in Large Language Models for Different NLP Tasks'
description: Personal study notes on a task-centered survey that maps 39 prompting methods to 29 NLP task categories, datasets, model families, and reported best methods.
resource: https://arxiv.org/abs/2407.12994v2
source: /archive/survey-prompt-engineering-methods-nlp-tasks.pdf
tags: [prompting, survey, reasoning, evaluation]
timestamp: 2026-07-13T02:29:00Z
---

# A Survey of Prompt Engineering Methods in Large Language Models for Different NLP Tasks - Study Notes

**Authors**: Shubham Vatsal and Harsh Dubey  
**Venue**: arXiv:2407.12994v2 [cs.CL]  
**Date**: July 24, 2024 (v2 PDF)  
**Pages**: 39

## What It Is

This is a task-centered literature survey of 44 papers. It catalogs 39 prompting methods across 29 NLP-task categories, then tabulates the datasets, model families, methods tried, and a *potential* best-performing method for each dataset. Its organizing move is deliberately narrower than an application-level prompt taxonomy: a dataset is assigned to the single task it most strongly represents, even when it could reasonably belong to several categories.

The paper is most useful as a discovery map. It connects familiar methods—CoT, self-consistency, least-to-most, ReAct, program-aided reasoning, and tree search—to concrete task shapes such as numerical reasoning, table understanding, contextual QA, code generation, truthfulness, NER, and translation.

## How the Survey Organizes Prompting

The authors begin with zero-shot and few-shot prompting as the basic experimental settings, then describe 39 methods. Several recurring intervention types emerge:

- **Reasoning structure**: CoT, Plan-and-Solve, least-to-most, logical thoughts, and metacognitive prompting externalize or check intermediate steps.
- **Sampling and selection**: self-consistency, complex CoT, contrastive CoT, and ensemble refinement generate alternatives and choose or refine an answer.
- **Example construction**: Auto-CoT clusters questions and generates demonstrations; Active-Prompt requests human labels for high-uncertainty examples; synthetic prompting generates and selects its own demonstrations.
- **Tools and symbolic representations**: Program-of-Thoughts, PAL, Binder, Dater, Chain-of-Table, and Chain-of-Code shift appropriate work into programs, tables, SQL, or interpreters.
- **Grounding and verification**: Verify-and-Edit searches for supporting facts for uncertain rationales; Chain-of-Verification creates checks for a draft answer; ReAct interleaves reasoning, actions, and observations.
- **Context control**: Thread-of-Thought summarizes sections of a long, chaotic context; implicit RAG asks the model to extract relevant sections from supplied context; System 2 Attention regenerates context without distracting material.

These are not mutually exclusive families. The strongest practical reading is to classify the task and failure mode first, then choose a method whose extra work matches it: search for branching problems, an interpreter for computation, verification for factual claims, or context selection for long documents.

## Important Task-to-Method Patterns

The survey's tables show that the reported leader changes substantially by dataset and model rather than following a single prompt-complexity ladder.

- **Mathematical and tabular computation**: Program-of-Thoughts and PAL commonly lead where executable calculation is the bottleneck; self-consistency, complex CoT, Active-Prompt, and synthetic prompting lead on some text math datasets. The durable principle is to separate language interpretation from deterministic computation when possible.
- **Multi-hop and procedural tasks**: Decomposed prompting leads on several compositional multi-hop datasets; ReAct leads on ALFWorld and WebShop. These methods manage subproblems and state rather than simply requesting a longer rationale.
- **Spatial, code, and table tasks**: Chain-of-Symbol leads in the listed spatial datasets, Structured CoT leads on HumanEval/MBPP/MBCPP, and Chain-of-Table leads on the listed table QA and fact-verification datasets. Representation choice can be as important as additional reasoning tokens.
- **Factuality and open-domain QA**: Chain-of-Knowledge, Chain-of-Verification, Verify-and-Edit, ReAct, and System 2 Attention appear where grounding, distraction, or hallucination is central. They are different interventions: retrieval/editing, generated checks, tool observations, and context filtering should not be treated as substitutes.
- **Information extraction and classification**: Metacognitive prompting is reported as best for several tasks in one study (NLI, relation extraction, multilabel classification, word-sense disambiguation), while clinical NER benefits from adding annotation guidelines and error-analysis instructions. Prompting may need to encode the task's labeling policy, not just request an answer.

## Results to Treat Carefully

The paper reports headline improvements from the underlying works—for example, self-consistency averaging gains over CoT on several reasoning task groups, Tree-of-Thoughts improving Game of 24 success, and structured representations improving specific spatial, code, or table settings. These are literature summaries, not a uniform benchmark rerun.

The tables label one technique per dataset as “SoTA,” but this is explicitly a *potential* designation based on the best result among reviewed experiments. Different methods were often tested with different models, dataset versions, prompt budgets, and metrics. Therefore the tables are a shortlist of hypotheses to test, not a portable ranking or a basis for claiming current state of the art.

## My Takeaways

1. **Prompt choice should be task-shaped.** “Use CoT” is too coarse; distinguish calculation, compositional decomposition, constrained representation, factual verification, and annotation-policy adherence.
2. **Match the representation to the bottleneck.** A program, table transformation, symbol sequence, or tool trajectory can remove a failure mode that more natural-language reasoning merely repeats.
3. **A survey table is an experimental-design aid, not evidence of transfer.** Preserve the original model, split, metric, decoding settings, and tool availability before treating a cited winner as a baseline.
4. **Task categories are useful but porous.** Contextual QA, truthfulness, table reasoning, and agents overlap in real systems; select the evaluation slice that reflects the actual workflow rather than forcing it into one label.

## Limitations and Questions

- The survey covers 44 papers, mostly recent at publication, rather than a systematic exhaustive review; its 39 methods and 29 tasks are a useful snapshot, not a complete taxonomy.
- Assigning every dataset to one task improves readability but suppresses genuine overlap—for example, table QA can involve retrieval, factuality, and numerical reasoning simultaneously.
- “Potential SoTA” comparisons confound method with model family, prompt formulation, evaluation metric, data variant, and publication-time baseline. The cited models are also largely pre-2024 systems, so the rankings should not be presumed to hold for current models.
- Reported gains come from primary papers under their own experimental conditions. Reproduction, cost, latency, robustness to prompt variants, and safety implications are not normalized across the tables.

## Vault Ideas Extracted

* [Application-Centric Prompt Taxonomy](/vault/application-centric-prompt-taxonomy.md)
