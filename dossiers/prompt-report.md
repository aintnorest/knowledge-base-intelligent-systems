---
type: Study Note
title: 'The Prompt Report: A Systematic Survey of Prompt Engineering Techniques'
description: Personal study notes on a PRISMA-grounded survey that defines prompt terminology, catalogs prompting methods, and examines practical evaluation, safety, and engineering.
resource: https://arxiv.org/abs/2406.06608v6
source: /archive/prompt-report.pdf
tags: [prompting, survey, evaluation, agents, multimodal]
timestamp: 2026-07-13T00:14:22Z
---

# The Prompt Report: A Systematic Survey of Prompt Engineering Techniques - Study Notes

**Authors**: Sander Schulhoff, Michael Ilie, Nishant Balepur, Konstantine Kahadze, Amanda Liu, Chenglei Si, Yinheng Li, Aayush Gupta, HyoJung Han, Sevien Schulhoff, and colleagues  
**Venue**: arXiv:2406.06608v6 [cs.CL]  
**Date**: February 27, 2025 (v6 PDF)  
**Pages**: 80

## What It Is

*The Prompt Report* is a broad survey of discrete, prefix-style prompting. Its distinctive contribution is treating the field as an engineering discipline with separate concerns for prompt construction, output extraction, evaluation, safety, and deployment—not merely a catalog of clever instructions.

The authors use a PRISMA-grounded, human-and-LLM-assisted review: 4,247 unique records were collected and 1,565 deemed relevant. The resulting taxonomy contains 58 text-based techniques in six operational families (in-context learning, thought generation, decomposition, ensembling, self-criticism, and related methods), plus multilingual, multimodal, agent, and evaluation extensions.

## The Core Model of Prompting

A **prompt** is any input used to guide a generative model; a **prompt template** is the function that fills variables to make an instance. The paper distinguishes three activities that are often conflated:

1. **Prompting** — sending a prompt to a model.
2. **Prompt engineering** — iteratively modifying a prompt or prompting technique to improve task performance.
3. **Answer engineering** — selecting the answer shape and allowable answer space, then reliably extracting the usable answer from raw model output.

That last distinction is valuable in practice. A model can reason usefully yet still fail a workflow because its output cannot be parsed. Treat output contracts and extractors as part of the system design and evaluate them with the prompt, rather than treating them as cleanup.

## Technique Taxonomy and Design Guidance

The paper's six text-prompting families provide a structural complement to application-based taxonomies:

- **In-context learning**: zero-/few-shot prompting, with exemplar quantity, order, label distribution, quality, format, similarity, and instruction wording as consequential design variables.
- **Thought generation**: CoT and variants such as zero-shot CoT, step-back, analogical prompting, and structured formats. These expose intermediate work but do not guarantee faithful internal reasoning.
- **Decomposition**: least-to-most, plan-and-solve, program-of-thoughts, recursion, and tree search divide a task or externalize a search process.
- **Ensembling**: self-consistency and related methods exchange extra calls for lower output variance and a consensus decision.
- **Self-criticism**: self-calibration, Self-Refine, Chain-of-Verification, and self-verification generate critique or evidence, then revise or select an answer.
- **Prompt engineering**: meta-prompting, APE, GrIPS, ProTeGi, and RL-based approaches search the prompt space rather than hand-editing indefinitely.

There is no universal recipe. Few-shot prompting is especially sensitive to which examples fit in the context window and how they are ordered or formatted; even a meaning-preserving change can alter results. The paper recommends starting with a simple baseline, then using representative data and a declared metric to justify every extra technique.

## Agents, Evaluation, and Safety

The survey defines an agent as a GenAI system that serves a user's goal through actions outside the model. Tools, retrieval, code execution, observations, and memory therefore make prompting an orchestration problem: the prompts specify not only an answer but tool routing, intermediate state, and how observations re-enter the next call.

For LLM-as-judge workflows, it separates four evaluator choices: prompting technique, output format, evaluation framework, and methodological details. Roles, few-shot examples, model-generated scoring guidelines, JSON/XML output, individual scoring, and carefully designed scales can help; batch and pairwise evaluations can also introduce degradation or order effects. An evaluator is a model-based measurement instrument, not a ground-truth oracle.

Its security discussion distinguishes **prompt injection** (untrusted input overrides developer instructions) from **jailbreaking** (a user elicits unintended behavior directly); both are forms of prompt hacking. Prompt-only defenses can mitigate attacks but are not fully secure. Detection, guardrails, and least-privilege system design should supplement prompts.

## Results and Case Study

- On a 2,800-question MMLU subset with `gpt-3.5-turbo`, the authors found that more elaborate techniques did not improve monotonically: zero-shot CoT was worse than zero-shot across tested variants, while few-shot CoT was best in their setup. Self-consistency helped only the zero-shot prompts. This is a useful reminder that technique choice is hyperparameter search, not a capability ladder.
- Their real-world case study iterated on classifying crisis-related "entrapment" language. Manual prompt development took 47 recorded steps and reached development-set F1 0.53 (precision 0.38, recall 0.86), with surprising sensitivity to example order and duplicated contextual text.
- A DSPy-based automated search produced test F1 0.548 (precision 0.385, recall 0.952) using 15 examples and one bootstrapped reasoning demonstration. It outperformed the hand-engineered variants in that study, but this is a narrow, high-stakes classification case—not evidence that a prompt system can replace clinical judgment.

## My Takeaways

1. **Prompt engineering includes the output interface.** Prompt, answer schema, extractor, metric, and failure handling form one executable system.
2. **Taxonomies should be used as diagnosis tools.** Classify a failure—missing information, search, variance, invalid format, or unsafe tool action—before choosing a technique family.
3. **Prompt sensitivity demands experimental discipline.** Keep a held-out set, report model and decoding settings, and avoid trusting a gain found by repeatedly probing the same examples.
4. **Automation can search brittle spaces better than intuition, but only when the objective is well specified.** A high F1 is not sufficient when false negatives, privacy, or downstream action have asymmetric costs.

## Limitations and Questions

- The review focuses on hard, prefix prompts and primarily English literature, excluding much of prompt tuning, cloze prompting, and non-English work.
- The authors organize methods into single primary categories even though methods such as ReAct and RAG naturally span reasoning, retrieval, tools, and evaluation.
- The MMLU comparison uses one older model, a subset of questions, prompt variants selected within that experiment, and automatic answer extraction; it cannot establish a stable ordering of techniques on current models.
- The case study makes the paper's central warning tangible: observed prompt gains can be accidental, data-specific, and misaligned with real-world risk.

## Vault Ideas Extracted

* [Answer Engineering](/vault/answer-engineering.md)
* [Application-Centric Prompt Taxonomy](/vault/application-centric-prompt-taxonomy.md)
