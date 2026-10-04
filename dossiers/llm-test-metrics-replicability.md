---
type: Study Note
title: "Do Coverage and Mutation Scores of LLM-Generated Test Suites Correlate with Their Effectiveness? (Replicability Study)"
description: Conceptual replication showing that coverage and mutation predict real-bug detection across LLMs on fixed Java code, but not reliably within models or when generation starts from buggy code.
resource: https://arxiv.org/abs/2607.22880v1
source: /archive/llm-test-metrics-replicability.pdf
tags: [llm-code-testing, verification, evaluation, coding-agents, code-quality, agents]
timestamp: 2026-10-04T00:00:00Z
---

# Do Coverage and Mutation Scores of LLM-Generated Test Suites Correlate with Their Effectiveness? (Replicability Study) — Study Notes

**Authors**: Junda Zhao, Shurui Zhou, and Eldan Cohen  
**Venue**: Proceedings of the ACM on Software Engineering 3, ISSTA, Article ISSTA002; DOI [10.1145/3832093](https://doi.org/10.1145/3832093). Manuscript records acceptance June 25, 2026; Crossref records publication October 1, 2026.  
**Date**: arXiv v1 July 24, 2026; journal publication October 2026

## What It Is

A conceptual replication of two influential human-era test-adequacy studies, using implementation-conditioned LLM-generated Java tests. It asks whether coverage and mutation scores actually track detection of historical bugs, distinguishing generation from fixed code (regression protection) from generation from buggy code (finding an existing defect).

**The developer's hypothesis receives direct but qualified support**: several prior conclusions do not transfer unchanged to LLM-generated suites. This is not a license to replace independent oracles with metric thresholds. Strong signals arise chiefly when comparing models on code assumed correct; individual suites from the same model still show weak relationships.

## Prior Studies and Replication Design

- **Inozemtseva and Holmes, ICSE 2014**, “Coverage is not strongly correlated with test suite effectiveness,” DOI [10.1145/2568225.2568271](https://doi.org/10.1145/2568225.2568271): coverage versus mutation adequacy; suite-size confounding; similarity among coverage criteria.
- **Papadakis, Shin, Yoo, and Bae, ICSE 2018**, “Are mutation scores correlated with real fault detection? A large scale empirical study on the relationship between mutants and real faults,” DOI [10.1145/3180155.3180183](https://doi.org/10.1145/3180155.3180183): mutation versus real-fault detection, including human suites and EvoSuite-generated tests.
- Defects4J v3.0 contains **854 defects across 17 Java projects**. Filtering to non-private focal methods present in both revisions and associated with a developer-written failing test leaves **318 buggy focal methods**, not 318 necessarily distinct bug reports.
- **11 models / 13 settings**: Gemini 2.5 Pro and Flash, Claude 4 Sonnet, Grok-4 and Grok-3, GPT-4.1 and o4-mini, DeepSeek-V3 and R1, Qwen3-Coder-Plus and Qwen3-Plus; hybrid Flash/Sonnet are evaluated with and without reasoning. Generation on both revisions produces **8,268 suites / 101,123 test cases**.
- The focal-method body plus surrounding class/type context supplies the prompt. The study uses **1,000 draws of 100 focal methods**, retaining suites with compilable tests; fixed-size analyses randomly retain **3, 5, or 10 tests** per eligible suite. Unlike the original studies, sampling is method-level rather than project-wide.

## Mechanism as an Idea

CodeCover measures statement, branch, and modified condition coverage (MCC). PIT measures raw mutation score (**killed / all focal-method mutants**) and normalized score (**killed / covered mutants**). Real-bug detection requires at least one test that passes on the fixed revision and fails on the buggy revision. Coverage/mutation are aggregated either as a mean of per-method ratios or one accumulated ratio; those are different measurements.

The paper separates pooled, within-model, and between-model correlations. Between-model analysis has only **13 points**, one per setting. This distinction matters: a metric can rank generators reasonably while being a poor acceptance signal for one artifact from that generator.

## Findings

- **Size is not the dominant confounder observed in the prior studies.** Pooled Pearson correlations of test count with raw mutation are **0.031** (mean aggregation) and **0.029** (accumulated); normalized correlations are **0.098 / −0.112** (Table 3). Between-model raw correlations **0.185 / 0.259** are not significant (Table 4). Size versus real-bug detection remains weak, approaching but below **0.4** between models (§5.1).
- **Coverage versus mutation is mostly weak within a model.** Pooled mean branch/raw mutation Pearson **r=0.379**, Kendall **τ=0.270**; between-model mean branch/raw reaches **r=0.821, p=0.001; τ=0.641, p=0.002** (Tables 5–6). At fixed **k=10**, it remains **r=0.780, p=0.002; τ=0.692, p=0.001** (Table 7). This qualifies the earlier size-controlled skepticism rather than abolishing it.
- **Fixed-input coverage can rank models by real-bug detection.** Mean branch coverage has between-model **r=0.861, p=1.6×10⁻⁴; τ=0.761, p=3.1×10⁻⁴** (Table 10). Fixing size gives **r=0.679 / 0.855 / 0.858** at **k=3 / 5 / 10**, with respective p-values **0.011 / 2.0×10⁻⁴ / 1.7×10⁻⁴** (Table 11). Within-model coefficients are typically below **0.2** without size control.
- **Raw mutation is the stronger between-model real-fault proxy.** Mean raw score versus detection: **r=0.863, p=1.44×10⁻⁴; τ=0.761, p=3.11×10⁻⁴**. Accumulated raw: **r=0.622, p=0.023**. Mean normalized: **r=0.493, p=0.087**; accumulated normalized: **r=−0.077, p=0.803** (Table 13). At fixed **k=3 / 5 / 10**, mean raw correlations stay **0.702 / 0.695 / 0.833**, all significant (Table 14). Pooled mean raw/normalized correlations are only **0.475 / 0.511**, and within-model correlations remain weak (Table 12, §6).
- **Buggy-input coverage loses the useful signal.** Correlations are weak in every analysis view (§5.4); exact coefficients are omitted from the manuscript. Its StringUtils example flips an intended `assertTrue` to `assertFalse` when the prompt contains the faulty implementation: tests encode the bug as the expected behavior. Mutation is **not evaluated in this setting** because requiring a green baseline would discard the very tests exposing the existing fault (§3.3 footnote).
- **Coverage types are not interchangeable.** Unconstrained accumulated statement–branch **r=0.857**, but statement–MCC **r=0.319**. At **k=3**, accumulated statement–MCC **r=−0.003, p=0.735** (Table 8), unlike near-perfect coverage-type relationships reported in the 2014 study.

## Analyst Takeaways

1. **Retain the test-quality contract's prohibition on treating metrics as correctness.** The most predictive results compare thirteen generator settings, not individual accepted patches or independently justified expectations.
2. **Label the generation information condition.** Regression characterization from a trusted fixed version and discovery of an existing fault from untrusted code need different evaluations. For discovery, use direct real-fault discrimination and contract-derived assertions, not a green-suite filter.
3. **Report denominator and aggregation.** Raw and covered-mutant-normalized scores can tell opposite stories; averaging per-method ratios is not interchangeable with summing all mutants. Preserve tool, scope, sampling, and revision information.
4. **Do not reward test volume.** Weak size relationships support selecting discriminating cases rather than demanding more test functions. The study does not compare fewer long workflow tests against many small unit tests: its focal unit is a method, and fixed counts change sampling, not test length or integration boundary.
5. **Use complementary coverage criteria for risk discovery.** This evidence contradicts automatic transfer of the human-era claim that simple coverage always gives equivalent information; it does not establish a universal MCC requirement for Python, Rust, or TypeScript.

## Questions and Limitations

- Accepted ISSTA publication, not merely an unreviewed preprint. The archived artifact is arXiv v1, not an asserted byte-identical publisher copy.
- Conceptual rather than direct replication: sampling granularity, natural versus externally imposed suite sizes, white-box prompting, and between-model analysis all change. The paper does **not** run a contemporaneous matched human-versus-LLM experiment, so attribution to AI authorship alone is unjustified.
- One prompt workflow, Java/Defects4J, potential training contamination, and correlated hybrid model settings constrain transfer. Fixed-size eligibility can change the population of focal methods/suites under comparison. Strong correlations do not prove causal benefit from optimizing the metric.
- Mutation scores for buggy inputs are absent by design; do not turn “not applicable to this analysis” into a universal claim that fault injection cannot help on a system containing bugs.
- Data Availability names artifact DOI **10.5281/zenodo.21429528**, whereas reference [61] names **10.5281/zenodo.21437945**. This internal identifier discrepancy is left explicit; neither replaces the article DOI source key.

## Vault Ideas Extracted

* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md) — distinguish generator-ranking proxies from candidate-level fault evidence.
* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md) — buggy-code-conditioned assertions can certify faulty behavior.
* [Cross-Version Differential Oracles](/vault/cross-version-differential-oracles.md) — retain direct buggy/fixed discrimination separately from coverage.
* Proposed new synthesis: **Context-Conditioned Test Adequacy** — calibrate a metric by generation context, comparison unit, aggregation, and real-fault outcome before transferring human-era conclusions.
