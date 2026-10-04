---
type: Study Note
title: Do LLMs generate test oracles that capture the actual or the expected program behaviour?
description: A controlled Java oracle study finds implementation anchoring, useful intent signals in descriptive names, and modest mutation gains that do not establish specification correctness.
resource: https://arxiv.org/abs/2410.21136v1
source: /archive/llm-oracles-actual-expected-behaviour.pdf
tags: [llm-code-testing, verification, code-quality, coding-agents, evaluation, agents]
timestamp: 2026-10-04T08:00:00Z
---

# Do LLMs generate test oracles that capture the actual or the expected program behaviour? — Study Notes

**Authors**: Michael Konstantinou, Renzo Degiovanni, and Mike Papadakis  
**Venue**: arXiv:2410.21136v1 [cs.SE]; no peer-reviewed venue identified on the abstract page or manuscript  
**Date**: October 28, 2024

## What It Is

A controlled study of **GPT-3.5-turbo** judging and generating Java/JUnit assertion oracles. It compares responses to correct and mutated implementations, then investigates semantic naming and mutation sensitivity. Its central observation is that exposing buggy code makes the model less likely to recognize an independently correct assertion. The paper offers evidence of implementation anchoring, not a direct census of the fraction of generated assertions that encode a real bug.

## Problem and Motivation

Traditional automatic generators often record current outputs as expected values. Such characterization may support a later refactor but cannot establish that the current implementation meets its intended behavior. The authors ask whether pretrained language knowledge lets an LLM escape this clean-program assumption, rather than merely producing more readable circular tests.

## Study Design and Mechanism

- The automatically generated-test artifact starts with **25 Java repositories**, dropping Async-http-client because too few records contain all required contextual fields, leaving **24**. EvoSuite supplies prefixes; µBERT supplies faulty source variants. Gitbug-Java, originally **199 bugs in 55 repositories**, supplies developer-written tests for the naming experiment.
- Classification crosses correct/wrong code with correct/wrong assertions. Each prompt includes a test prefix and either (1) method body, (2) method body plus docstring, or (3) entire class plus method body and docstring. **All three expose implementation**: this is not a spec-only versus code-only experiment.
- Sampling is capped at **1,000 records per scenario**; the naming experiment uses **1,000 developer test prefixes**. Generation requests five candidate assertions per prefix; assertions are incorporated separately and executed. A passing assertion is called “correct,” a narrower definition than independently justified conformance.
- PiTest compares LLM and EvoSuite assertions on corresponding retained prefixes. Only prefixes with at least one passing LLM assertion enter this comparison. The mechanism worth reusing is controlled variation of implementation and intent-bearing context, not a universal rule to hide all code from every testing task.

## Findings

1. **Buggy code reduces recognition of a correct oracle.** Table I's average per-repository accuracy for correct-code/correct-assertion versus wrong-code/correct-assertion is **40.77%→31.94%**, **46.26%→36.80%**, and **45.39%→37.01%** across the three prompts: drops of approximately **8.83, 9.46, and 8.38 percentage points**. These numbers are classification accuracies, not percentages of generated oracles validating bugs. Wrong-code/wrong-assertion accuracy is **84.16%, 79.61%, and 83.80%**; high accuracy in that cell does not cancel poor recognition of valid expectations.
2. **Readable intent cues affect an AI consumer.** Original developer naming yields **44.0%, 53.0%, and 43.2%** classification hits. Replacing test names alone yields **37.8%, 47.1%, and 43.8%**; replacing both test and variable names yields **27.9%, 43.2%, and 40.5%**. The largest drop is **16.1 points**, and the third prompt's test-name-only condition actually improves **0.6 points**. The RQ2 conclusion box says “up to 6.20%,” apparently referring only to the test-name intervention, not the maximum combined change.
3. **Generation is more often executable-and-passing than classification is accurate.** Table III reports **101,345/102,236/101,575 assertions**, across **20,316/20,482/20,335 generated tests** for prompts 1/2/3. Average passing-assertion rates are **58.95%, 57.47%, and 60.01%**; at least one candidate passes for **93.76%, 91.31%, and 89.34%** of prefixes. This best-of-five statistic requires a selector and must not be read as a single-oracle accuracy rate or independent correctness guarantee.
4. **Mutation gains exist but are modest and conditional.** Table V average mutation scores are **19.92% versus 17.56%**, **18.01% versus 17.29%**, and **19.37% versus 17.11%** for LLM versus matched EvoSuite oracles. The discussion separately reports best-per-repository means **19.10% versus 17.32%**; its relationship to the table aggregation is unclear. The introduction's “up to 2.96%” gain is not the same quantity as the displayed table differences, so use the table values rather than merging them.

## Analyst Takeaways

1. **Supports, rather than overturns, independent-oracle discipline.** In the test-quality contract, an implementation's output is not the authority for a fix. This study shows why that human-oriented safeguard becomes especially consequential when an LLM consumes the implementation while assessing tests.
2. **Readability is functional context for an AI reviewer.** Keep behavior and condition visible in names and expected values. Naming helps convey already justified intent; it must not become an oracle of its own. A model can confidently misread or overrule a good assertion despite a useful name.
3. **Do not equate passing-candidate selection or mutation score with conformance.** Review expectations against requirements and preserve behavioral red/green evidence. Mutation testing can show discrimination among implementations while the original behavior remains wrong.
4. **Qualifies the developer's AI-versus-human hypothesis.** AI consumption makes intent-bearing naming measurably important, but the paper does not show that tautological assertions become useful, or that fewer long workflow tests outperform many small unit tests. It studies oracle completion on fixed prefixes, not test granularity, integration boundaries, or current autonomous agents.

## Questions and Limitations

- Preprint; one older model, Java only, synthetic faults for much of the controlled experiment. Results should not be transferred numerically to current TypeScript, Rust, or Python agents.
- Passing on original code is the generation-label criterion. That can count characterization as “correct”; it does not directly measure expected-versus-buggy behavior among generated oracles. The strongest anchoring evidence comes from the controlled classification contrast and inspected explanations.
- Sampling language alternates between a per-scenario cap and “1,000 prefixes for each project”; the generated totals are not exactly 24,000 prefixes. Report the actual Table III counts instead of inventing a uniform denominator.
- RQ2 and mutation-score summaries contain inconsistent or differently aggregated headline magnitudes. The dossier retains these distinctions.
- A second LLM-as-judge is suggested as mitigation, not experimentally validated. Agreement by two implementation-conditioned models is not independent evidence.

## Vault Ideas Extracted

* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md)
* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md)
* [Cross-Version Differential Oracles](/vault/cross-version-differential-oracles.md)
