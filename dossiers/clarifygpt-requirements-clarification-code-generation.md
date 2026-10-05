---
type: Study Note
title: "ClarifyGPT: A Framework for Enhancing LLM-Based Code Generation via Requirements Clarification"
description: "Execution disagreement among sampled programs gates targeted intent questions; benchmark gains include test-informed human or simulated answers and substantial sampling overhead."
resource: https://doi.org/10.1145/3660810
source: /archive/clarifygpt-requirements-clarification-code-generation.pdf
tags: [requirements-engineering, human-in-the-loop, llm-code-testing, verification, evaluation, agents]
timestamp: 2026-10-05T23:18:33Z
---

# ClarifyGPT — Study Notes

**Authors**: Fangwen Mu, Lin Shi, Song Wang, Zhuohao Yu, Binquan Zhang, ChenXue Wang, Shichao Liu, and Qing Wang.  
**Published**: July 2024; accepted April 16, 2024.  
**Status**: Peer-reviewed FSE 2024 article in *Proceedings of the ACM on Software Engineering*, volume 1, FSE, article 103, 23 pages, DOI 10.1145/3660810. The archived file is the publisher PDF. arXiv:2310.10996v1 is an earlier, materially different preprint, not the experimental version summarized here.

## What It Is

A requirements-clarification framework that treats **behavioral disagreement between generated programs as a signal to ask the intent owner a question**. It separates deciding whether clarification is needed from generating useful questions, then regenerates code from the clarified request. Unlike candidate-pruning approaches, the clarified requirement drives a new implementation rather than merely choosing from the initial population.

## Problem and Motivation

A short request can admit several reasonable behaviors, such as ascending versus descending sorting. Ordinary code generation silently chooses one. Asking indiscriminately also has costs: irrelevant questions interrupt users and can introduce misleading detail into an already adequate request. The proposed compromise is to ground interruptions in differences between executable interpretations.

## Mechanism as an Idea

The system generates semantic seed inputs and broadens them through type-aware mutation, samples **25 programs per problem**, and executes the population on the same inputs. Identical output behavior means no clarification; different output vectors trigger clustering, with one representative program from each behavioral group supplied to the question generator.

The question generator analyzes the functional differences and turns them into targeted requirements questions. Answers are attached to the original requirement and a final program is generated. The inputs used for disagreement detection need no trusted expected outputs: they reveal difference, not correctness. Ground-truth test examples enter separately through the human-feedback and simulated-user evaluation conditions.

This makes agreement a **heuristic ambiguity detector**, not a specification certificate. Shared mistaken interpretations can agree; implementation bugs or invalid mutated inputs can disagree even when the request is clear.

## Results and Admissions

### Human answers informed by benchmark tests

Ten experienced Python developers/researchers answered questions for **140 detector-flagged MBPP problems**, averaging **2.85 questions per flagged problem**. Each problem received answers from three participants; each participant handled 42 problems. Their questionnaires included the original requirement **and benchmark input/output tests**, so this is test-informed interpretation, not a study of users independently specifying their own tasks.

With GPT-4-turbo, mean Pass@1 rose from **70.96% to 80.80%** on MBPP-sanitized and **51.52% to 60.19%** on MBPP-ET: **9.84 and 8.67 percentage points**, respectively. These are the same task descriptions evaluated with ordinary versus extended tests, not independent task populations. Three runs/answer sets were averaged; the paper reports p = 3.2e-05 and 7.3e-05 versus the default baseline.

Manual annotations on **427 MBPP descriptions** identified 141 ambiguous and 286 unambiguous tasks. GPT-4 detection achieved **88.57% precision, 87.94% recall, and 88.25% F1**; GPT-3.5-turbo achieved 72.35%, 87.23%, and 79.10%. Question ratings averaged **1.85 relevance, 1.75 comprehensiveness, and 1.80 usefulness** on a 0–2 scale. These are subjective ratings, not measured cognitive-load or productivity improvements.

### Simulated answers and sampling cost

The simulator receives ground-truth test cases to infer intended behavior. Across HumanEval, HumanEval-ET, MBPP-sanitized, MBPP-ET, and filtered Java CoderEval, mean Pass@1 increased **62.43% → 69.60%** for GPT-4-turbo and **54.32% → 62.37%** for GPT-3.5-turbo. These are **7.17 and 8.05 points**; the reported 11.66% and 15.00% figures average dataset-specific relative improvements, not percentage-point gains.

Dataset sizes are 164 HumanEval problems, 427 MBPP problems, and **163/230 CoderEval Java tasks** retained after excluding non-built-in input types. The protocol says the first three tasks per benchmark supply demonstrations and are removed from testing, while the human study describes all 427 MBPP tasks. This denominator discrepancy should not be silently reconciled.

The reported GPT-3.5 API cost per 100 tasks is **$0.421 versus $0.017 default and $0.223 GPT-Engineer**. Those unusually small historical figures are source-reported, not a current price estimate. The extra population sampling is not cost-matched to a single completion. More demonstrations materially help: GPT-4's five-benchmark mean is 63.09% with none versus 69.60% with three; the claim of prompt robustness does not imply demonstration independence.

## Analyst Takeaways

1. **Use disagreement to expose a concrete decision, not to assign truth.** This extends [Disagreement-Selected Clarification](/vault/disagreement-selected-clarification.md): compare behavior rather than source-code wording, then let the intent owner resolve the consequential difference.
2. **Detection and question selection need separate evaluation.** A gate can reduce unnecessary interruptions while missing shared assumptions. [Clarification Need Decision](/vault/clarification-need-decision.md) adds answerability and interruption cost, neither of which is settled by output diversity alone.
3. **Regeneration and filtering are distinct interventions.** [TiCoder](/dossiers/ticoder-test-driven-interactive-code-generation.md) enforces approved examples against a candidate pool; ClarifyGPT refines the requirement and generates anew. The latter can escape a deficient pool, but can also ignore a correct answer.
4. **Keep feedback provenance visible.** Both human and simulated evaluation expose trusted test examples to the answer provider. Gains therefore combine elicitation with an additional channel of benchmark information; they do not establish equal-information superiority.

## Questions and Limitations

Complex objects, files, images, side effects without return values, and expensive execution weaken the behavioral-comparison mechanism; the authors explicitly limit complex inputs. Public benchmark contamination is unresolved. The paper reports a Cohen's kappa of 0.86 across ten annotators without explaining the multi-rater calculation. Similar aggregate human and simulated scores do not prove high-fidelity user simulation. There is no end-to-end developer-time study, noisy-answer recovery experiment, cost-matched ablation, or proof that generated inputs remain within semantic preconditions.

## Vault Ideas Extracted

* [Disagreement-Selected Clarification](/vault/disagreement-selected-clarification.md)
