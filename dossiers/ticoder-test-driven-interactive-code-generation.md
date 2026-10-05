---
type: Study Note
title: "LLM-Based Test-Driven Interactive Code Generation: User Study and Empirical Evaluation"
description: TiCoder uses user-reviewed distinguishing tests to prune and rank code candidates; a small programmer study improves evaluation accuracy and cognitive load, while benchmark gains assume idealized oracle feedback.
resource: https://doi.org/10.1109/TSE.2024.3428972
source: /archive/ticoder-test-driven-interactive-code-generation.pdf
tags: [llm-code-testing, requirements-engineering, human-in-the-loop, verification, evaluation, agents]
timestamp: 2026-10-05T21:49:23Z
---

# LLM-Based Test-Driven Interactive Code Generation — Study Notes

**Authors**: Sarah Fakhoury, Aaditya Naik, Georgios Sakkas, Saikat Chakraborty, and Shuvendu K. Lahiri; Microsoft Research, University of Pennsylvania, and University of California San Diego.  
**Published**: First posted April 15, 2024; archived arXiv revision 2 dated October 2, 2024.  
**Status**: Peer-reviewed article in *IEEE Transactions on Software Engineering*, volume 50, issue 9 (2024), DOI [10.1109/TSE.2024.3428972](https://doi.org/10.1109/TSE.2024.3428972). This dossier reads the archived arXiv manuscript; the publisher title and DOI identify the same work.

## What It Is

**TiCoder** is test-driven interactive code generation: clarify natural-language intent through generated examples, then mechanically filter candidate implementations against user-approved behavior. Its contribution is not ordinary test-driven development or simply placing tests in a prompt. It gives the user a small behavior-level question instead of requiring them to inspect every plausible program or invent all distinguishing examples themselves.

## Problem and Motivation

An informal task may support multiple reasonable readings. A string-matching request can mean exactly two lowercase runs separated by an underscore, or any string containing such a sequence. Several programs pass obvious examples but differ on edge cases. A list of fluent code suggestions transfers disambiguation and bug detection to a developer who may not know which tests expose the differences.

The intent owner can often judge a concrete example more easily than an entire algorithm. Generated tests are therefore **proposals for a partial specification**, not automatically trusted oracles.

## Mechanism as an Idea

The workflow generates code candidates and test candidates independently from the task description, executes each test against the code population, and prioritizes tests that split the surviving candidates into approximately equal passing and failing groups. A balanced partition can eliminate substantial disagreement whichever way the user answers.

Two interaction modes trade user burden against information:

- **Pass/fail judgment** asks whether a proposed input/output assertion matches intent. Approval retains candidates that satisfy it; rejection removes candidates matching its incorrect output but does not identify the correct alternative.
- **Expected-output judgment** also lets the user specify the correct result, enforcing a stronger constraint but requiring more mental computation.

A user can mark a precondition-violating case undefined, in which case it does not justify pruning. Surviving code is ranked by passing generated tests, and approved or corrected tests accompany the selected implementation. Those approved tests can become regression artifacts, but their finite coverage remains only a partial specification.

This is execution-based selection from a sampled population. It cannot create a correct implementation that is absent from that population. Generated-test majority ranking remains weaker authority than the user's reviewed expectations.

## Results and Admissions

### Human evaluation study

The within-subject study uses **15 programmers**, three small Python evaluation tasks, fixed prompts and candidate sets, and a Latin-square treatment pairing. Every task starts with **five code suggestions: four sampled buggy programs and one trusted/adjusted reference**. Treatments surface exactly two tests and are constructed to prune only some incorrect candidates. Participants may execute code but cannot edit prompts or candidate implementations.

Mean correct evaluation is **0.40 baseline, 0.84 pass/fail, and 0.64 expected-output**. Only the pass/fail comparison with baseline is statistically significant (**p = 0.001**). Self-reported cognitive load is **45.46, 28.00, and 29.52**, respectively, with both treatment reductions significant (**p = 0.007 and 0.012**). Mean task times are **327.7, 284.15, and 253.88 seconds**; differences are **not significant**, so this is not demonstrated acceleration or proof of zero overhead.

Real users make mistakes. Incorrect feedback can prune the correct implementation; expected-output judgments particularly expose edge-case calculation errors. The authors emphasize that an option to skip uncertain tests is essential. The study measures selecting correct code from curated alternatives, not unconstrained coding productivity.

### Idealized benchmark evaluation

The benchmark uses **427 MBPP and 164 HumanEval tasks**, removing visible HumanEval examples from descriptions. For each model/task it caches **100 code candidates and 50 generated tests**. Reference implementations answer user queries perfectly; crashes in the reference are treated as undefined. Results therefore represent an idealized feedback upper bound, not measured real-user performance.

The metric **pass@1@m** is deterministic correctness of the highest-ranked surviving candidate after *m* questions, distinct from ordinary statistical pass@1 over a sampled completion. Selected Table IV results:

| Dataset / model | Baseline pass@1 | Pass/fail, 1 question | Expected output, 5 questions |
| --- | ---: | ---: | ---: |
| MBPP / text-davinci-003 | 49.16% | 68.04% | 83.75% |
| MBPP / CodeGen-6B | 14.85% | 28.62% | 66.56% |
| HumanEval / GPT-4-32k | 60.72% | 76.10% | 82.54% |
| HumanEval / CodeGen-6B | 11.41% | 15.32% | 48.12% |

These gains include population sampling, execution, reranking, and ideal answers; they are not a cost-matched comparison with one ordinary completion. Adding all supplied validation tests to a GPT-4-32k prompt reaches **80.88% MBPP** versus **81.56%** for one TiCoder pass/fail query, a **0.68-point** difference under different information and selection regimes.

**Headline bookkeeping is inconsistent.** The abstract says four models and **45.97 points** average absolute gain; the body says **45.73**, while Table IV contains **seven models**. The table also contradicts several claims: code-davinci-002's one-query MBPP score **68.42%** does not exceed GPT-4-turbo's **69.80%** baseline; text-davinci-003's five-query output gain is **34.59 points**, not the stated **38.55**; and pass/fail can trail output feedback by more than the claimed nine points. The table provides usable condition-specific evidence, but the aggregate headlines should not be propagated as reconciled facts.

## Analyst Takeaways

1. **Ask about discriminating behavior, not vague preference.** Population disagreement identifies concrete branch choices. This enriches [Clarification Need Decision](/vault/clarification-need-decision.md) with execution-grounded question selection.
2. **Human authority must attach to the expected behavior.** Generated tests alone can reproduce an incorrect assumption, as [Implementation-Anchored Test Oracles](/vault/implementation-anchored-test-oracles.md) explains. A user's mistaken approval can do the same; reviewability and uncertainty handling matter.
3. **Use execution to enforce, not merely suggest, an approved contract.** [Test-Driven Development for Code Generation](/dossiers/test-driven-development-code-generation.md) studies tests as generation context; TiCoder tests a different mechanism, selecting existing candidates by reviewed outcomes.
4. **Preserve independent acceptance beyond approved examples.** [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md) distinguishes visible tests from the full intended behavior. Passing the reviewed examples establishes neither completeness nor correctness across unseen compositions.

## Questions and Limitations

- Small functions and selected tasks do not establish applicability to stateful systems, complex fixtures, multiple files, or expensive execution.
- Noisy human answers can eliminate all correct candidates. Abstention prevents unjustified pruning but reduces information gain; recovery from mistaken feedback is not evaluated.
- The discriminative policy depends on diversity and useful tests. Shared errors across all candidates can remain invisible, while undefined cases waste a question.
- The initial candidate and test pools incur inference and execution costs; the study reports no end-to-end cost-adjusted production advantage.
- The benchmark treats the reference implementation as intent. Its bugs, omitted preconditions, or different reasonable interpretation are not evidence that a user's alternative is wrong.
- The human study's two-question scripted pruning does not directly validate the adaptive ranking policy at benchmark scale.

## Vault Ideas Extracted

* [Disagreement-Selected Clarification](/vault/disagreement-selected-clarification.md)
* [Clarification Need Decision](/vault/clarification-need-decision.md)
* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md)
