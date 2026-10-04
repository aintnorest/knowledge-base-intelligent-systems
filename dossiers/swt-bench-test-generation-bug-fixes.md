---
type: Study Note
title: "SWT-Bench: Testing and Validating Real-World Bug-Fixes with Code Agents"
description: Repository-level test generation evaluated through failing-before/passing-after reproduction and changed-line coverage, with improved patch-filter precision but low recall and incomplete correctness guarantees.
resource: https://arxiv.org/abs/2406.12952v3
source: /archive/swt-bench-test-generation-bug-fixes.pdf
tags: [verification, coding-agents, evaluation, benchmark, agents]
timestamp: 2026-10-04T06:15:44Z
---

# SWT-Bench — Study Notes

**Authors**: Niels Mündler, Mark Niklas Müller, Jingxuan He, and Martin Vechev; ETH Zurich, with Müller also affiliated with LogicStar.ai.  
**Venue**: NeurIPS 2024, peer-reviewed paper; archived arXiv revision 3 dated February 7, 2025.

## What It Is

A transformation of repository-level code-repair tasks into **issue-reproduction test generation**. An agent receives an issue and the original repository, then writes tests rather than a fix. The reference repair supplies a second version against which those tests can be assessed. The dataset retains **1,983 of 2,294 SWE-bench instances**, excluding **311** with unreliable reference-fix evaluation, and provides a **276-issue Lite** subset used for the main experiments.

## Problem and Motivation

A test that runs and passes may be valid yet irrelevant to the reported bug. Conversely, a failing test can reflect syntax, missing dependencies or an incorrect expectation rather than reproduction. Measuring generated tests by count or global coverage misses their value as discriminators of the issue's actual behavior.

## Mechanism as an Idea

A reproducing test fails on the original code and passes after the reference repair. A successful generated suite has **at least one fail-to-pass test and no test that fails after repair**. Pass-to-pass tests can preserve valid behavior but do not independently reproduce the issue. Failure-before alone is identifiable during generation, while the reference repair supplies an evaluation oracle unavailable to the generator.

The second metric measures coverage of executable lines changed by the reference patch, including removed lines in the original version and added lines in the repaired version. It counts extra execution induced by generated tests relative to the existing suite, not simply whether a line was already covered. Applicability of a test patch is measured separately from meaningful reproduction.

The authors adapt existing repair agents through changed task instructions. A function-oriented, fault-tolerant edit representation reduces patch-application errors compared with exact line-oriented diffs. The strongest variant also checks that its proposed tests actually fail before submission. This echoes [SWE-agent's interface findings](/dossiers/swe-agent-agent-computer-interfaces.md): representational friction can conceal capability.

## Results and Admissions

- With GPT-4, direct generation in conventional diff form produces **48.6% applicable patches and 3.6% successful suites**. The fault-tolerant representation reaches **89.5% applicability and 9.4% success**.
- LIBRO reaches **14.1%**, SWE-agent **15.9%**, and its explicit-test-checking variant **18.5%** reproduction success. The latter reaches **27.6% changed-line coverage overall** and **69.4% on successful instances**, versus **72.0%** for golden tests overall.
- An oracle selecting among five generated candidates reaches **20.3%**, not a deployable selection result. Four methods together cover **87 issues versus 51** for the strongest alone—**71% more**—but this is an ideal union, not a demonstrated automatic ensemble.
- Generated-test filtering raises SWE-agent fix precision to **47.8%**, more than double the unfiltered precision, at only **20% recall**. The section describes retaining fixes for which generated tests are fail-to-pass or pass-to-pass; the conclusion emphasizes a previously failing test becoming passing. Reproduction success elsewhere explicitly requires at least one fail-to-pass test, so these descriptions should not be silently treated as identical filter specifications.
- SWE-agent solves **44 test-generation and 50 repair instances**, with just **7 shared**. The reported independence-test p-value is **72.8%**; absence of significant association is not proof that the abilities are universally independent.
- In a **172-instance** experiment, revealing the target test file raises reproduction success from **8.1% to 15.1%**; revealing a candidate patch and its changed files raises it only to **10.5%**, whether that patch is correct or incorrect.

## Analyst Takeaways

1. **Require two-sided reproduction evidence.** Red-before/green-after rules out many irrelevant green tests and permanently broken tests; preserve the test across both executions.
2. **Separate test generation from implementation acceptance.** The study shows useful filtering, not reliable self-certification: even filtered precision remains below half.
3. **Measure discrimination, coverage and applicability separately.** A larger green suite need not expose the issue; broad execution need not assert the intended behavior.
4. **Retrieve the right testing context.** Existing test organization can matter more than showing the proposed implementation, which risks anchoring the test to the patch.

## Questions and Limitations

The benchmark is Python-only, uses popular public repositories and focuses on issues amenable to added tests rather than global edge-case discovery. Historical public issues create contamination risk; the before/after-cutoff check lacks statistical power. A reference patch is an imperfect oracle, and cross-version transition alone does not certify all valid alternative repairs. The source inconsistently names Mixtral as 7x22b in setup and 8x22B in tables; its appendix also discusses a common 20-iteration default where the main setup gives method-specific limits. Main test-generation rates must not be confused with the source's looser statement that agents can generate test patches for up to 87% of issues. The reusable contract is already represented in [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md).

## Vault Ideas Extracted

* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md)
