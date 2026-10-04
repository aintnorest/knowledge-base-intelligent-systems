---
type: Study Note
title: "On the risk of coding before testing: An empirical study on LLM-based test generation workflow"
description: Across five models and Python benchmark tasks, preserving faulty implementation context reduces test fault detection versus fresh specification-only generation, despite similarly high coverage and often more tests.
resource: https://arxiv.org/abs/2607.05139v1
source: /archive/coding-before-testing-error-propagation.pdf
tags: [llm-code-testing, verification, coding-agents, evaluation, context-engineering, agents]
timestamp: 2026-10-04T08:00:00Z
---

# On the risk of coding before testing: An empirical study on LLM-based test generation workflow — Study Notes

**Authors**: Michael Konstantinou, Florian Tambon, and Mike Papadakis  
**Venue**: arXiv:2607.05139v1 [cs.SE]; no peer-reviewed venue identified on the abstract page or manuscript  
**Date**: July 6, 2026

## What It Is

A controlled comparison of implementation-aware and independent specification-based test generation, including a simulated same-conversation code-then-test workflow. The paper argues that implementation faults propagate into later test artifacts, creating mutually consistent code and tests. The measured outcome is fault detection—not a direct annotation of how many assertions reproduce a bug.

## Problem and Motivation

When a coding agent's prior output becomes the testing agent's context, it can act as an unearned authority. Generating tests later in the same conversation may reinforce earlier assumptions even when the user also supplies requirements. Reasoning or self-verification can elaborate the same wrong premise rather than supply independence.

## Study Design and Mechanism

- Models: **GPT-5-mini, GPT-4.1-mini, DeepSeek-V4-Flash, Claude Haiku 4.5, and Llama 3.3 Instruct (70B)**. Reasoning is enabled for GPT-5-mini and Claude Haiku 4.5, not the other three.
- Python tasks come from **HumanEval+ (164 problems), MBPP (974), and BigCodeBench (1,140 tasks, 139 libraries)**. These are original benchmark sizes, **not the retained faulty-implementation denominator**.
- Ten candidate implementations per task/model are sampled at temperature **0.8**. The study retains semantic wrong-output implementations, excludes runtime errors and exceptions, removes those failing more than **50%** of reference tests, and selects the hardest retained candidate per task (fewest reference failures). The manuscript does not provide a clear table of final per-model/per-benchmark retained counts.
- The base workflow uses iterative repair of **compilation errors only**, rather than rewriting behavioral failures to pass faulty code. Prompt configurations are task-description-only, task-plus-code, and code-only; additional strategies summarize code, use chain-of-thought, or use chain-of-verification.
- The simulated agentic condition retains conversation history including a controlled faulty code-generation response. The “Test-Driven Workflow” uses a **fresh interaction with only the task description**. This operational definition establishes contextual separation; it is not a full randomized trial of red/green/refactor TDD or code synthesized to satisfy prior tests.
- A fault is detected when a generated test fails faulty code and passes the reference. Fault triggering is weaker: tested outputs differ across implementations even if the oracle is wrong. These outcomes are reported separately.

## Findings

1. **Removing faulty code beats supplementing it with a specification.** Figure 2's rounded detection rates for task-only / task-plus-code / code-only are: Claude **24% / 15% / 14%**; DeepSeek **28% / 13% / 12%**; GPT-4.1-mini **33% / 15% / 14%**; GPT-5-mini **18% / 5% / 3%**; Llama **28% / 17% / 13%**. The text reports average decreases of **13.2** and **15.1 percentage points**, respectively, from task-only to the two implementation-exposed configurations. It writes “%,” but these are rate differences, not relative percentage reductions. Task-only differences are significant for all models; task-plus-code versus code-only is not significant (Table II).
2. **Reasoning prompts do not restore the independent baseline.** The manuscript reports average detection deficits relative to task-only of **15.5 points** for summarization and **13.4 points** for both chain-of-thought and chain-of-verification. For GPT-4.1-mini, Figure 3 shows approximately **33% task-only versus 13% summarization, 10% CoT, and 17% CoVe**. These are specific implementation-conditioned strategies, not evidence against all reasoning or all specification extraction.
3. **Same-session code-then-test is worse than fresh spec-only tests.** Figure 4 rounds agentic / independent rates to Claude **14% / 24%**, DeepSeek **14% / 28%**, GPT-4.1-mini **16% / 33%**, GPT-5-mini **4% / 18%**, and Llama **20% / 28%**. All five comparisons are statistically significant (Table IV; **p=0.0019, 0.0001, <0.0001, <0.0001, 0.0177**). The abstract summarizes approximately **14% versus 25%**. Finding 3 says **11.7% more faults on average**, but the five listed per-model differences **10.6, 13.8, 17.7, 13.6, 7.9** average **12.72 points**, not 11.7; aggregation is insufficiently explained.
4. **More tests and high coverage do not explain stronger detection.** For Claude, task-only produces **4,374 tests**, CoT **5,860**, and CoVe **7,789**, yet task-only detects more faults. Average line coverage is **97.26%, 97.90%, and 97.81%**, respectively. For GPT-4.1-mini it is **98.12% task-only versus 98.20% CoT** despite the large detection gap. The authors explicitly admit that they **do not directly evaluate oracle correctness**; coverage/triggering analyses suggest, rather than prove, oracle quality as the explanation.
5. **The spec-only advantage persists in a weakened-prompt experiment on MBPP.** Under-specified, lexically vague, and syntax/format-altered prompts outperform prompt-plus-code by reported averages **14.0, 11.6, and 10.6 points**. Some weakened descriptions outperform originals, inconsistently. This does not make missing requirements desirable or permit an agent to invent consequential behavior.

## Analyst Takeaways

1. **Supports “establish expected behavior first” and independent assertions.** Write down authority, stimulus, expected outcome, and a plausible defect before exposing a generated implementation as evidence. For an independent testing pass, supply the behavioral contract and necessary interface/context, not the patch author's reasoning as truth.
2. **Qualifies the contract's sequence neutrality.** The contract does not mandate test-first authorship; the evidence says **context independence**, not chronology alone, matters. Tests written after code in a fresh, specification-grounded context may remain credible. A “test-first” label does not rescue an oracle inferred from the same wrong premise.
3. **Fresh reviewers need a different evidential basis.** Another session reading the same buggy body can inherit anchoring. Separation should preserve required interface and state information while removing implementation-derived expected values.
4. **Supports the warning against test-count and coverage targets.** More AI-written tests can add cost without adding discrimination. The Claude example is evidence against “more is better,” not a controlled victory for fewer, longer tests; test length and workflow composition are not varied.
5. **Qualifies the developer's hypothesis rather than reversing human practice.** AI workflows expose a measurable artifact-dependence risk, but the effective intervention reinforces familiar specification independence and non-circular assertions. No result makes tautological tests credible.

## Questions and Limitations

- Preprint; Python function-level benchmark tasks rather than maintained repository features. Runtime-failing implementations and easy faults are excluded, limiting the population of bugs covered.
- Missing final retained fault denominators make exact prevalence and replication harder to assess. Benchmark sizes must not be substituted for them.
- “Agentic” is a simulated conversation plus test-execution/refinement workflow, with the first response fixed to a collected faulty implementation; this is not an unrestricted commercial agent deployment.
- Percent-versus-percentage-point wording and the **11.7 versus 12.72** average discrepancy warrant caution. The fault “detectability” score is defined as **1 minus failing-test fraction**, so larger scores actually indicate harder faults despite its name.
- Mann–Whitney comparisons, provider stochasticity, benchmark/reference correctness, and possible contamination limit causal and external claims. Oracle correctness itself is not directly measured.
- Code summarization here is not the same intervention as critically deriving a specification and removing the focal body from later prompts; compare that distinct mechanism in the misguidance study.

## Vault Ideas Extracted

* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md)
* [Cross-Version Differential Oracles](/vault/cross-version-differential-oracles.md)
* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md)
