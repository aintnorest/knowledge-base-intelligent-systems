---
type: Study Note
title: "Do Autonomous Agents Contribute Test Code? A Study of Tests in Agentic Pull Requests"
description: AIDev lifecycle analysis finds growing test inclusion in agent PRs, larger changes and longer turnaround, but mostly similar merge rates and no direct evidence of test effectiveness.
resource: https://arxiv.org/abs/2601.03556v1
source: /archive/test-inclusion-agentic-pull-requests.pdf
tags: [llm-code-testing, coding-agents, verification, evaluation, code-quality, agents]
timestamp: 2026-10-04T00:00:00Z
---

# Do Autonomous Agents Contribute Test Code? A Study of Tests in Agentic Pull Requests — Study Notes

**Authors**: Sabrina Haque, Sarvesh Ingale, Christoph Csallner  
**Venue**: Published as **An Empirical Study of Tests in Agentic Pull Requests**, MSR 2026, ACM, pp. 929–933; DOI [10.1145/3793302.3793604](https://doi.org/10.1145/3793302.3793604). Archived source: arXiv:2601.03556v1, earlier title/manuscript.  
**Date**: January 7, 2026 arXiv submission; conference April 13–14, 2026; Crossref online publication July 31, 2026

## What It Is

A descriptive study of test-file touches and PR evolution in **33,596 AIDev-pop PRs** from popular repositories. Five attributed tools are Claude Code, OpenAI Codex, Copilot, Cursor, and Devin. The source is language-agnostic repository mining, not a trial of prompting strategies, a measure of semantic assertions, or a comparison of unit versus workflow testing.

The published work is the **renamed version of the same study**, not another eligible source: the [author-hosted MSR manuscript](https://c.csallner.org/papers/Haque26Empirical.pdf) has the same authors, abstract, dataset, research questions, and numerical tables, and prints the confirmed ACM DOI. The archived arXiv file still has placeholder conference and DOI boilerplate; those placeholders are not its publication status. INGEST’s publisher-DOI precedence selects **doi:10.1145/3793302.3793604**.

## Problem and Motivation

Autonomous PR authors increasingly supply tests alongside production changes, but the visible presence of tests can be mistaken for correctness or successful collaboration. The study asks how often test files are touched, whether they appear before review, how often they are revised, and how their presence relates to size, elapsed closure time, and merging.

## Design and Mechanism

A “test PR” adds or modifies at least one heuristic test path; pure deletion and renaming do not qualify. Merge commits and common non-code artifacts are excluded. Initial submission includes commits before PR creation for most agents; for Copilot it instead ends at the first review-request/ready-for-review event, because its PR-opening commits are typically empty.

The researchers retrieve missing commit timestamps to reconstruct these stages. Lifecycle outcomes use only **31,284/33,596 closed PRs (93%)**; merge rate is merged divided by closed, not all opened PRs. Follow-up commits may be agent- or human-authored: the study cannot confidently distinguish them.

## Findings

- Overall test inclusion rises from **31% in January to 52% in July 2025**, with monthly intermediate rates **36%, 26%, 30%, 32%, 38%**. This is an aggregate trend, not a steady increase or causal evidence of model improvement; the agent mixture changes over time.
- Table 3 reports initial-only/late-only/both-stage first touches as Claude **65%/14%/19%**, Codex **96%/2%/2%**, Copilot **70%/11%/18%**, Cursor **64%/15%/19%**, Devin **58%/24%/15%**. Some timestamps are missing; rounded rows are not normalized to exactly 100% and exact agent denominators are not provided there.
- Initial test files are revised later in **34% Claude, 4% Codex, 45% Copilot, 39% Cursor, 59% Devin** PRs, with repeated revision rates **16%, 1%, 24%, 16%, 32%**, respectively. Changes indicate evolution, not a proven initial defect or weakened oracle.
- All-closed PR outcomes (Table 4) are below. Test touches accompany larger changes for every agent, but elapsed time and merge effects differ.

| Agent | Median churn non-test / test (LOC) | Median turnaround non-test / test (hours) | Merge non-test / test |
|---|---:|---:|---:|
| Claude Code | 183 / 1,736 | 1.03 / 4.15 | 70.6% / 72.1% |
| Codex | 39 / 133 | 0.03 / 0.01 | 86.2% / 85.2% |
| Copilot | 49 / 323 | 5.51 / 24.09 | 53.8% / 56.8% |
| Cursor | 139 / 852 | 0.56 / 7.04 | 75.6% / 71.6% |
| Devin | 78 / 335 | 3.43 / 38.72 | 60.6% / 44.1% |

- Median test-to-production churn ratios are Claude **0.42**, Codex **0.61**, Copilot **0.87**, Cursor **0.42**, Devin **0.56**. Prose calls Codex highest, but Table 4 makes **Copilot highest**.
- The **4,325 one-to-one issue–PR pairs**, representing **88% of issue–PR links**, contain **1,955 test PRs**. Among merged issue-linked PRs, issue-closure rates are **93%–100%** with tests and **98%–100%** without. Issue closure is an acceptance signal, not an independent fault-detection measure.

## Analyst Takeaways

1. **Do not use inclusion or merge as a test-quality gate.** This study supports the guide’s separation of visible artifact counts from oracle correctness and sensitivity. Similar merge rates cannot establish equivalently good tests.
2. **Audit meaningful test changes throughout review.** A test file added initially can later change expectations. Preserve authority over those expectations, while recognizing that the observed revision rates do not themselves prove unauthorized acceptance changes.
3. **Report elapsed closure time as elapsed time.** It is not measured human review effort or testing cost. Bigger patches, workload, and review queues can explain longer PR lifetimes.
4. **Qualify the developer’s hypothesis.** Agents vary in test adoption and lifecycle, so an agent workflow needs evidence checks beyond “include tests.” The paper neither contradicts no-tautology guidance nor tests whether humans’ preferred granularity works differently for AI.
5. **Do not equate “initial” with test-first.** Lifecycle timestamps do not reveal red-before/green-after sensitivity, implementation ordering, or whether existing checks already protect the changed behavior.

## Questions and Limitations

- File heuristics do not distinguish unit, integration, or system tests, and do not measure coverage, assertions, execution, or effectiveness. No backend models or prompts are controlled.
- Attribution identifies the PR creator, not every later test author. Missing timestamps and distinct Copilot cutoffs complicate cross-agent comparisons.
- Statements that test revisions imply insufficient initial tests or that longer turnaround implies more human intervention are interpretations, not directly observed reasons.
- The introduction calls 33.5k PRs **7% of about 933k**, an arithmetic inconsistency: those numbers imply about **3.6%**, not 7%. Table 3 prose also gives **33–49%** intermediate-agent revisions while its table gives **34%, 45%, 39%**; use table values.
- The author-hosted published manuscript adds a disclosed Csallner financial-interest conflict involving Microsoft and The Trade Desk, absent from the archived preprint. The note’s measured findings come from the archived version; publication identity is corroborated, not byte identity claimed.

## Vault Ideas Extracted

* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md) — presence, merge, and issue closure are different evidence from test adequacy.
* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md) — review expectation changes across the PR lifecycle without assuming all revisions are bad.
* [Cross-Version Differential Oracles](/vault/cross-version-differential-oracles.md) — motivates checking code and tests changed together; this study does not execute that method.
