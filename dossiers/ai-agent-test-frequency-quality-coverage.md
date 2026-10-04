---
type: Study Note
title: "Testing with AI Agents: An Empirical Study of Test Generation Frequency, Quality, and Coverage"
description: Ten TypeScript projects show agents author longer, more assertion-rich but linear tests; a three-project executable subset shows small coverage gains without measuring oracle validity or fault detection.
resource: https://arxiv.org/abs/2603.13724v1
source: /archive/ai-agent-test-frequency-quality-coverage.pdf
tags: [llm-code-testing, coding-agents, verification, code-quality, evaluation, agents]
timestamp: 2026-10-04T00:00:00Z
---

# Testing with AI Agents: An Empirical Study of Test Generation Frequency, Quality, and Coverage — Study Notes

**Authors**: Suzuka Yoshimoto, Shun Fujita, Kosei Horikawa, Daniel Feitosa, Yutaro Kashiwa, Hajimu Iida  
**Venue**: MSR 2026, ACM, pp. 1014–1018; DOI [10.1145/3793302.3793620](https://doi.org/10.1145/3793302.3793620); archived author manuscript arXiv:2603.13724v1  
**Date**: March 14, 2026 arXiv submission; conference April 13–14, 2026; Crossref online publication July 31, 2026

## What It Is

A small, deliberately agent-active TypeScript/Vitest repository study: frequency across **10 projects**, structural comparison in **9**, and executable coverage analysis in **3**. Its contribution is real-world evidence that agents add tests and can extend executed-code coverage, not proof that their expected values are right or that their longer tests are better.

It **qualifies the developer’s hypothesis**: AI-written tests have different observed structure, but length differences are practically small and no experiment compares many unit tests with fewer workflow tests. The authors’ suspicion of Assertion Roulette does not validate a one-assertion-per-test requirement, nor contradict the guide’s allowance for several assertions protecting one behavior.

## Problem and Motivation

Benchmark-generated tests can differ from the tests retained in a real project. Agents have repository context and execution tools; whether they add tests in ordinary development, what those tests look like, and how much coverage they gain must be investigated separately from prompt-only generation results.

## Design and Mechanism

From **2,807 AIDev repositories**, the authors identify **650 TypeScript projects**, **400** with detectable frameworks, and **179 using Vitest**. They select the **10 projects with highest AI test-addition activity**, inspect added test-definition markers, and analyze commits over project-specific AIDev PR intervals. A test method is AI-authored only when all lines are agent-attributed; any human-attributed line puts it in the human group.

For current-release test methods, they measure effective LOC, assertion counts, and AST-based decision points, supplementing these with CodeBERT/t-SNE visualizations. Coverage is measured at a test-adding commit and its parent. Thus the coverage delta can also reflect simultaneous production changes and a changed measured-code denominator, not just newly added tests.

## Findings

- **2,232 test-adding commits** are identified. Table 1 sums to **366 AI-authored (16.4%, rounded)**. Shares vary from **7/366 (1.9%)** in azure-sdk-for-js and **129/894 (14.4%)** in cal.com to **26/26 (100%)** in total-typescript-monorepo, **20/24 (83.3%)** in capgo, and **54/76 (71.1%)** in alchemy. These are selected-project shares, not all open-source tests or the probability an agent writes a test.
- Structural comparison excludes total-typescript-monorepo because its AI tests were removed or modified by humans in the latest release. Across the remaining **9 projects**, median effective LOC is **12 AI versus 11 human**, **p<0.001**, Cliff’s **δ=−0.12**, called negligible by the paper. Maximum effective LOC is **87 AI versus 699 human**.
- Median assertion count is **2 AI versus 1 human (p<0.001)**. The paper interprets this as higher verification density but does not establish a measured semantic assertion-strength increase, normalized density advantage, or diagnosed Assertion Roulette prevalence.
- Cyclomatic-complexity medians are **1.00 for both**, means **1.09 AI versus 1.31 human**. Significant differences occur in only **2/9 projects**. The AI tests are largely linear, not necessarily broader in behavior coverage.
- Coverage execution succeeds for **531 commits across 3 projects**: **59 AI and 472 human** by summing Table 2. Seven projects are excluded from execution feasibility; this is a selected subset, not all 2,232 commits.

| Project | AI / human commit count | Mean statement change AI / human (points) | Mean branch change AI / human (points) |
|---|---:|---:|---:|
| liam | 18 / 143 | +0.072 / −0.090 | +0.074 / −0.142 |
| appkit | 28 / 221 | +0.030 / −0.001 | +0.183 / +0.008 |
| helper | 13 / 108 | 0.000 / 0.000 | +0.006 / +0.213 |

- In liam, **9/12 (75%) AI commits with nonzero statement-coverage change** improve it. This is not 75% of all 18 AI commits. In helper, human branch gains exceed AI gains; broad claims that agents uniformly outperform humans would be false.

## Analyst Takeaways

1. **Do not penalize multiple assertions by count alone.** The guide correctly organizes a test around one behavior, potentially several assertions. Ask whether failures identify the violated postcondition and whether every assertion has an independent oracle; median counts do not answer those questions.
2. **Keep production-risk boundaries distinct from test size.** An extra line or assertion does not establish an integration journey. There is no classified test-layer analysis here and no measured benefit from making tests longer for agent consumption.
3. **Treat coverage as risk location, not acceptance.** Small statement/branch gains establish execution gains in the evaluated subset. They do not establish correctness, independently justified expected values, or mutation sensitivity.
4. **Target sensitivity evidence at consequential checks.** The authors themselves call for mutation testing to determine whether high assertion counts translate into fault detection. This supports the guide’s separation of coverage and mutation; it is a proposed evaluation, not an observed result.
5. **Account for mixed authorship and retained artifacts.** Human edits move a test into the human category; release-snapshot comparisons miss removed agent tests. Agent-generated and human-maintained tests are not clean randomized treatments.

## Questions and Limitations

- Peer-reviewed venue confirmed by the arXiv journal reference, real DOI printed in its PDF, and matching Crossref title/authors/venue. INGEST chooses **doi:10.1145/3793302.3793620**; the archived revision remains arXiv v1.
- The sample deliberately selects high AI test activity, only TypeScript/Vitest, and only three executable projects for coverage. The **16.4%** and “comparable to or exceeding humans” statements should not be generalized to all repositories or languages.
- Test-definition markers include suite declarations and skipped/focused variants; added markers can reflect rearranged tests. Attribution uses metadata and blame, not observed model trajectories; backend model versions/prompts and exact structural method counts are not reported in the paper.
- Assertion Roulette and long-term maintenance harm are hypotheses: the conclusion explicitly asks for a systematic smell investigation. CodeBERT/t-SNE clusters are exploratory visualizations, not measured test effectiveness or independent evidence of semantic scope.
- Coverage changes compare whole commits, are tiny point differences, and have no reported uncertainty/significance test in Table 2. Negative human averages do not prove human tests reduce quality; new production lines can lower coverage percentages.
- The PDF’s Figure 2 contains inconsistent project labels in its visualization; the substantive claims should rest on explicit methods/tables, not visual origin clustering.

## Vault Ideas Extracted

* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md) — distinguish test presence, structural metrics, coverage execution, and fault-detection evidence.
* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md) — more assertions do not establish independent expectations.
* [Verifier Co-Evolution Under Optimization](/vault/verifier-co-evolution.md) — challenge coverage/assertion-count proxies with targeted faults instead of optimizing their counts.
