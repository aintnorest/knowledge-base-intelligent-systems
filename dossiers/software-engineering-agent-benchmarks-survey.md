---
type: Study Note
title: A Comprehensive Survey on Benchmarks and Solutions in Software Engineering of LLM-Empowered Agentic System
description: "A two-axis map of software-engineering solution paradigms and benchmark task families, with a pointed critique of pass-rate-only evaluation for production code."
resource: https://arxiv.org/abs/2510.09721v3
source: /archive/software-engineering-agent-benchmarks-survey.pdf
tags: [agents, coding-agents, survey, evaluation, verification]
timestamp: 2026-09-24T03:45:44Z
---

# A Comprehensive Survey on Benchmarks and Solutions in Software Engineering of LLM-Empowered Agentic System — Study Notes

**Authors**: Jiale Guo, Suizhi Huang, Mei Li, Dong Huang, Xingsheng Chen, Regina Zhang, Zhijiang Guo, Han Yu, Siu-Ming Yiu, Pietro Lio, and Kwok-Yan Lam  
**Venue**: arXiv:2510.09721v3 [cs.SE]  
**Revision**: October 23, 2025  
**Length**: 22 PDF pages

## What It Is

This is a survey connecting **solution mechanisms** to **what benchmark tasks actually test**. Its abstract describes more than 150 recent papers and 50+ benchmarks; the taxonomy section says **140 distinct papers**, with **94 solution** and **72 benchmark** assignments, allowing a paper to appear in both groups. These counts refer to different scopes and should not be added or treated as a comparative sample.

The authors search 2023–2025 work across conferences, journals, and some preprints. They distinguish code generation, translation, and repair formally by their inputs, constraints, and output obligations. Their broader SDLC application map includes requirement/design analysis; generation/transformation; bug repair/debugging; refactoring/improvement; and testing, security, and formal verification.

## The Two-Axis Taxonomy

| Solution paradigm | Internal families | Appropriate comparison question |
|---|---|---|
| Prompt based | Instructional, structured, interactive | Can clearer or more interactive elicitation solve the task without changing weights or tool access? |
| Fine-tune based | Supervised training and preference alignment, including RL-based and RL-free methods | Does a model update add value against an equally supported base configuration? |
| Agent based | Planning/decomposition, reasoning/refinement, memory, tool augmentation | Does interaction with repository and verifier improve the final software artifact for a bounded cost? |

The benchmark axis covers **code generation**, **code translation**, **program repair**, and an **other** group including code understanding, test generation, dependency installation, refactoring, and collaboration. Function tests such as HumanEval differ from repository tasks such as DevEval or SWE-bench; translation additionally requires behavioral equivalence across language/library boundaries; repair requires faithful reproduction and a patch that does not create regressions. The survey names SWT-bench for issue-aligned tests, TestEval for line/branch/path targeting, and TestGenEval with **over 60,000 test cases** from GitHub repositories. Such datasets measure different slices of test usefulness.

The paper also discusses security benchmarks: CVE-Bench collects **509 vulnerabilities across four programming languages**, while SEC-Bench reportedly sees at most **18%** success on proof-of-concept generation and **34%** on patching in the cited study. These are reported primary-study outcomes under specific task setups, not new measurements made by this survey.

## Where Evaluation Can Mislead

Passing a supplied suite measures the behavior that suite observes, not security, efficiency, maintainability, compatibility, or human review cost. The paper criticizes overuse of `pass@k` on synthetic function tasks. It argues for lifecycle-aware assessment of new security flaws, performance regressions, technical debt, and work required to review an agent's patch. It claims many algorithmically successful SWE-bench-like solutions would fail production standards, but gives no standalone controlled audit in this survey establishing a general prevalence figure; treat the warning as a hypothesis to test locally, not a quantified rate.

A benchmark must be matched to a solution's action space and deliverable: a terminal-enabled repair agent cannot be assessed fully by one-shot text similarity; a translated module needs observable equivalence in a target runtime; a test generator needs an independently defined target fault or behavior, not only compilation and code coverage. Repository size, tool/harness affordances, evaluation leakage, and reference-test quality are part of the measurement protocol.

## Analyst Takeaways

1. **Declare the row and column before comparing agents.** Name the task/benchmark family and solution mechanism; otherwise a score can compare incompatible scopes.
2. **Extend pass gates beyond existing tests.** For an AI software factory, pair reproductions and regression tests with independent security checks, performance/cost budgets, maintainability review, and evidence of user-intent satisfaction.
3. **Inspect generated tests as artifacts, not only as metric producers.** Coverage and quantity are not fault sensitivity; include defect seeding, mutation, or independent expected behavior when suitable.
4. **Prefer a real task environment to proxy similarity for repository work.** Record the actual delivered patch, tests, modified dependencies, side effects, and human-review time.
5. **Use surveys to build an evaluation menu, not to choose a vendor.** Most evidence is heterogeneous secondary reporting and lacks an equal-budget, cross-benchmark comparison.

## Questions and Limitations

- The abstract's 150+ reviewed studies and taxonomy's 140 distinct analyzed papers are not reconciled explicitly in the paper; category counts overlap.
- Some benchmark counts mix instance, test, and repository units. Comparing them as equal-size datasets obscures difficulty and coverage.
- The proposed future direction of dynamic digital-twin lifecycle benchmarks is conceptual; constructing faithful, contamination-resistant environments and independent oracles remains open.
- Model- and agent-level results are assembled from papers with different dates, costs, scaffolds, and evaluation protocols; no pooled effect or causal isolation follows.
- The paper's later challenge section repeats earlier material, and its production-readiness assertions are stronger than the primary evidence summarized there.

## Vault Ideas Extracted

* [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md)
