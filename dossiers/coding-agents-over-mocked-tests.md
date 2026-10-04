---
type: Study Note
title: "Are Coding Agents Generating Over-Mocked Tests? An Empirical Study"
description: Mining 1.25 million commits finds agents introduce test doubles more often than non-agent contributors, with a modest within-repository difference and no direct measurement that the extra isolation harms tests.
resource: https://arxiv.org/abs/2602.00409v1
source: /archive/coding-agents-over-mocked-tests.pdf
tags: [llm-code-testing, coding-agents, verification, code-quality, evaluation, agents]
timestamp: 2026-10-04T00:00:00Z
---

# Are Coding Agents Generating Over-Mocked Tests? An Empirical Study — Study Notes

**Authors**: Andre Hora and Romain Robbes  
**Venue**: MSR 2026, ACM, pp. 335–346; DOI [10.1145/3793302.3793362](https://doi.org/10.1145/3793302.3793362); archived author manuscript arXiv:2602.00409v1  
**Date**: January 30, 2026 arXiv submission; conference April 13–14, 2026; Crossref records online publication July 31, 2026

## What It Is

A repository-mining study of test and test-double additions in **1,254,878 commits made in 2025 across 2,168 TypeScript, JavaScript, and Python repositories**. It distinguishes commits attributed to agents from the rest, and compares mocking within the same repositories as well as in aggregate. “Mock” is often an umbrella term for all five test-double families, not exclusively a strict interaction-verifying mock.

This **qualifies**, rather than establishes, the hypothesis that AI needs different testing patterns. Agents exhibit a different isolation tendency, but the study does not establish that extra mocks are unnecessary or that human-style integration tests outperform agent-authored unit tests. It supports making the existing dependency-fidelity rule explicit to agents.

## Problem and Motivation

Doubles make tests cheap, deterministic, and locally runnable. Excessive isolation can instead check assumptions the test itself supplied and miss real component interactions. Agents may find constructing a self-contained mocked test easier than configuring a faithful integration boundary. The paper measures how common that behavior is; the explanation and its harmfulness remain hypotheses.

## Design and Mechanism

The initial repository pool is filtered for substantial, active, non-fork projects, then for agent-related instruction files. Agent activity is identified through author/co-author metadata, initially Claude Code, Copilot, and Cursor, with other agent traces also considered. Non-agent means **not detected as agent**, not proven wholly human-authored.

Test commits add or modify recognized test paths. A mock commit introduces at least one new double-related identifier in added lines that is absent from deleted lines; identifiers include mock, fake, spy, stub, dummy, and selected Python patching forms. This detects **presence per commit**, not mocks per test, mocked LOC, or semantic appropriateness. Manual samples yield agent-attribution precision **500/500** and mock-detection precision **94/100**; recall is not established.

## Findings

- Agent commits total **48,563** in **1,219 repositories**. Of these, **11,035/48,563 (23%, rounded)** touch tests, compared with **158,326/1,206,315 (13%)** non-agent commits. **729/1,219 (60%)** repositories with agent activity contain agent test activity.
- Of agent **test commits**, **3,934/11,035 (36%)** introduce doubles, versus **40,966/158,326 (26%)** non-agent test commits (**χ²=505.5, p<0.001**). The abstract’s wording “36% of commits” omits the conditional denominator: this is not 36% of all agent commits.
- **496/729 (68%)** repositories with agent test activity contain agent mock activity. Agent mock commits are **3,934/44,900 (9%)** of all mock commits; in repositories created in 2025, **1,529/7,855 (19%)**. Agents contribute **11,035/169,361 (7%)** of all test commits overall, versus **4,526/26,654 (17%)** in 2025-created repositories.
- In **179 repositories** with at least 50 agent commits and at least 10 test commits, median per-repository double-addition ratios are **36% agent versus 28% non-agent**, paired Wilcoxon **p<0.001**, Cliff’s **δ=0.252 (small)**. In **282** lower-agent-activity repositories, **27% versus 24%**, **p=0.0029**, **δ=0.002 (negligible)**. Median ratios are not ratios of median counts.
- Agent test-commit double rates are Python **1,214/3,249 (37%)**, JS/TS **2,720/7,786 (35%)**; Cursor **103/278 (37%)**, Copilot **582/1,616 (36%)**, Claude **2,501/7,396 (34%)**. Small Cursor sample size matters.
- Figure 5 reports **repository prevalence across 496 repositories**, not shares of all double objects. Agent/non-agent prevalence by name category is dummy **19%/40%**, stub **14%/30%**, spy **33%/51%**, mock **95%/91%**, fake **32%/57%**. Categories overlap and names do not establish actual semantics. Non-agent commits also greatly outnumber agent commits, affecting opportunities to observe each type.

## Analyst Takeaways

1. **Inspect the replaced boundary, not merely mock density.** The factory’s guide should ask what real behavior remains under test and what consequential side effects or errors the double must preserve. No numerical maximum for mock usage follows from this study.
2. **Keep a real or verified-contract counterpart for consequential doubles.** A consumer test against simulated database/network behavior cannot establish provider fidelity. The observed agent tendency makes missing counterpart coverage a useful review priority.
3. **Prefer semantic fakes or integration when setup overwhelms behavior.** The lower agent fake prevalence motivates considering alternatives, but does not show that every fake is superior or that every object named Mock is a harmful interaction mock.
4. **Do not ban doubles.** Slow external services and nondeterministic dependencies still require control. The source supports explaining the rationale and permitted boundary, not requiring an all-real test suite.
5. **Preserve human principles while changing agent guardrails.** The evidence favors explicit anti-tautology and dependency-faithfulness checks; it does not overturn those principles for AI consumers or establish fewer/longer workflow tests as optimal.

## Questions and Limitations

- Peer-reviewed MSR work: arXiv says accepted, its PDF prints the real ACM DOI, and Crossref confirms title/authors/venue. INGEST’s publisher-identifier precedence selects **doi:10.1145/3793302.3793362**, not the arXiv or Zenodo dataset ID.
- “Over-mocked” is not an observed defect category: no execution, coverage, mutation, maintainability outcome, or manual avoidability study establishes whether extra doubles harm quality. The authors explicitly leave qualitative quality/avoidability analysis for future work.
- Identifier matching conflates family names and can miss unnamed doubles or reuse of existing identifiers. Co-authored commits do not isolate each contributor’s work. Agent-file repository selection misses other adoption patterns and cannot prove non-agent code is AI-free.
- Within-repository comparisons reduce project-level confounding but not task selection, PR size, or necessary external dependencies. Three languages and 2025 tools do not establish current backend-model behavior.

## Vault Ideas Extracted

* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md) — test-double presence is not evidence of verified integration.
* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md) — specify realistic boundary effects and independent oracles.
* Proposed new synthesis: **Dependency-Faithful Test Doubles**, separating fast consumer assumptions from independently checked provider behavior.
