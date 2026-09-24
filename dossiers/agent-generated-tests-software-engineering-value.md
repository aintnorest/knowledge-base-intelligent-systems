---
type: Study Note
title: Rethinking the Value of Agent-Generated Tests for LLM-Based Software Engineering Agents
description: Trajectory analysis and paired prompt interventions finding that more self-authored test artifacts change coding-agent cost far more consistently than task resolution.
resource: https://arxiv.org/abs/2602.07900v2
source: /archive/agent-generated-tests-software-engineering-value.pdf
tags: [coding-agents, verification, evaluation, agents, reliability]
timestamp: 2026-09-24T03:44:35Z
---

# Rethinking the Value of Agent-Generated Tests for LLM-Based Software Engineering Agents — Study Notes

**Authors**: Zhi Chen, Zhensu Sun, Yuling Shi, Chao Peng, Xiaodong Gu, David Lo, and Lingxiao Jiang  
**Venue**: arXiv:2602.07900v2 [cs.SE]; manuscript styled as an ACM Conference'26 paper, with placeholder conference name and DOI  
**Date**: April 9, 2026

## What It Is

This paper asks whether tests that coding agents decide to write during repository repair improve final patches, or mainly consume work and tokens. It examines trajectories from six models on the **500-task SWE-bench Verified** benchmark in mini-SWE-agent, where creating test files is optional, and intervenes on the prompts of four models to induce or suppress the behavior. It distinguishes **writing a new test artifact** from using existing repository tests, running ad-hoc commands, or establishing an independently reviewed requirement contract.

The result is direct counter-evidence to the blanket advice “make the coding agent write more tests.” It is **not** evidence against a human-written, failing-before/passing-after specification of desired behavior or against selectively generated tests whose oracle and fault-detection value have been checked.

## Study Design

- The six base models were Claude Opus 4.5, Gemini 3 Pro, GPT-5.2, Kimi K2 Thinking, MiniMax M2, and DeepSeek v3.2 Reasoner. The scaffold has a Bash tool and advisory testing cue, but no forced TDD stage or testing-specific tool.
- Researchers identify newly written Python test-like files in tool trajectories, extract assertions and runtime-value print statements with Python AST rules, and compare when/whether these files are made and run. Process execution failure (nonzero exit) is **not** equated with a patch being incorrect.
- A paired 500-task prompt intervention asks GPT-5.2 and Gemini 3 Pro to write at least one new runnable test file; for Kimi and DeepSeek it removes the default cue and discourages new test files. Outcomes are official SWE-bench patch resolutions. Exact McNemar tests assess paired resolution changes; paired Wilcoxon tests and bootstrap intervals assess usage costs.

## Findings

- GPT-5.2 creates new tests on **3/500 (0.6%)** tasks and resolves **359/500 (71.8%)**; Claude Opus 4.5 creates them on **415/500 (83.0%)** and resolves **372/500 (74.4%)**. Across models, rates range from **0.6% to 98.6%**, but resolved and unresolved tasks within each model usually have similar test-writing rates. Correlation alone cannot determine whether tests help on specific hard cases.
- Written “tests” mostly inspect data rather than assert expected behavior: value-revealing prints comprise **75.2%–87.6%** of counted feedback signals across models. For resolved tasks with tests, Claude averages **25.00 prints** versus **5.16 assertions**; many generated artifacts function as debugging probes rather than durable regression contracts.
- Prompt encouragement changes GPT-5.2 from no test to having a test on **322/500 (64.4%)** tasks, but resolved tasks remain **359/500** in both conditions (paired McNemar **p = 1.000**). It increases average input tokens **9.0%**, output tokens **19.8%**, and API calls **5.5%**. Gemini changes test status on **185/500 (37.0%)** tasks but resolves **371** before and **366** after (p = **0.522**).
- Prompt discouragement removes new tests on **342/500 (68.4%)** Kimi tasks and **376/500 (75.2%)** DeepSeek tasks; successes move **317→304** (−2.6 points, p = **0.228**) and **300→291** (−1.8 points, p = **0.435**), respectively. Average input tokens fall **49.0%** for Kimi and **32.9%** for DeepSeek; paired cost differences are significant at **p < 0.001**.
- Eight overlapping issue IDs in an exploratory cross-model analysis involve explicit reproduction/edge conditions and precise expected semantics; this is a small hypothesis-generating slice, not a validated taxonomy of test-sensitive tasks.

## Analyst Takeaways

1. **Specify the behavior before the test-writing instruction.** For a light AI software factory, begin with a human-validated failing case, observable acceptance boundary, and preserved invariants; delegate implementation against that target. Do not measure TDD compliance by the number of files an agent creates.
2. **Distinguish probes from oracles.** `print(value)` can locate a bug, but cannot fail when an expectation is violated; convert a useful probe into an assertion only once an external source or human reviewer establishes the expected behavior.
3. **Make testing proportional to information gained.** Ask for one discriminating reproducer or relevant existing suite rather than blanket “write tests”; measure resolution, regressions, and tokens together. On this study's GPT-5.2 setup, forced test creation had no net accuracy gain and material output-token cost.
4. **Keep the counterfactual honest.** TDFlow's large gains with *provided human-authored tests* (arXiv:2510.23761) address test-resolution under a trusted oracle; this study addresses *model-native, on-the-fly tests* under a light scaffold. Both can be true. It also does not show that the 13 and 9 lost Kimi/DeepSeek successes are irrelevant for a high-assurance workflow.

## Questions and Limitations

- The prompt change alters more than test count: it changes wording, attention, and perhaps planning. It identifies a practical intervention effect, not the pure causal contribution of test writing alone.
- Detection based on Bash writes to Python test-like paths misses inline assertions, generated scripts with other names, and checks against existing tests. AST categories cannot establish that an assertion's expected value is correct or catches a real bug.
- One run per task/model, provider nondeterminism, and confidence intervals focused on costs limit claims about small outcome changes. “Not statistically significant” is not proof that tests never help.
- The setting is Python SWE-bench Verified, with limited model/scaffold coverage. The paper acknowledges benchmark contamination and weak-grader concerns but does not measure those effects.
- The printed ACM DOI `10.1145/nnnnnnn.nnnnnnn` and Conference'26 are **placeholders**, not a publisher registration for this file. `10.5281/zenodo.19251470` denotes associated released artifacts, not the manuscript's publication DOI; the source key remains its arXiv ID.

## Vault Ideas Extracted

* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md)
