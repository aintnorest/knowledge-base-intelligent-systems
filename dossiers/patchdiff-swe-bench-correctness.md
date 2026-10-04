---
type: Study Note
title: "Are ‘Solved Issues’ in SWE-bench Really Solved Correctly? An Empirical Study"
description: Differential patch testing and manual adjudication reveal regression escapes, underspecified behavior, and inflated SWE-bench Verified resolution rates.
resource: https://arxiv.org/abs/2503.15223v2
source: /archive/patchdiff-swe-bench-correctness.pdf
tags: [llm-code-testing, verification, evaluation, coding-agents, code-quality, agents]
timestamp: 2026-10-04T07:45:00Z
---

# Are “Solved Issues” in SWE-bench Really Solved Correctly? An Empirical Study — Study Notes

**Authors**: You Wang, Michael Pradel, Zhongxin Liu  
**Venue**: ICSE 2026; publisher DOI [10.1145/3744916.3764576](https://doi.org/10.1145/3744916.3764576). Archived manuscript: arXiv:2503.15223v2 [cs.SE]  
**Date**: September 9, 2025 revision; proceedings April 12–18, 2026

## What It Is

PatchDiff is a differential-testing technique and empirical audit of **877 plausible patches** from CodeStory (311), LearnByInteract (301), and OpenHands + CodeAct v2.1 (265), each evaluated on **500 Python SWE-bench Verified tasks**. “Plausible” means accepted by the benchmark, not independently proven correct. The audit first broadens developer-test execution, then generates tests distinguishing agent patches from human reference patches, and finally adjudicates a sample against issue intent.

## Problem and Motivation

The benchmark runs test files changed in the reference repair PR, not every repository test potentially affected by the candidate. A candidate can repair the issue while regressing another behavior. Even all existing developer tests can omit a decisive edge case. The SymPy example repairs unwanted rejection of real coordinates by disabling validation whenever evaluation is false; it thereby also accepts imaginary coordinates that should still be rejected.

## Design and Mechanism

Call traces identify public-facing functions invoked by developer tests that reach patch-modified functions. PatchDiff supplies the issue, both patches, compacted contextual code, and short call traces to **GPT-4o-mini-2024-07-18** and asks for tests with different outcomes on the two patched versions. It targets at most ten functions and repairs non-differentiating, failing tests against the reference version up to twice. This is an effective *discrepancy generator*, not an independent proof that reference outputs express the entire contract.

Generated tests are filtered by target-function reachability and repeated execution. Human assessment then reads the issue, code, developer tests, reference patch, and counterexample to distinguish actual violations from undefined inputs or valid alternatives. Confirmed counterexamples can become reusable benchmark regressions.

## Findings

- **Existing regression escapes (Table 1):** all-developer-test execution rejects **26/311 (8.4%)**, **23/301 (7.6%)**, and **19/265 (7.2%)** plausible patches. Resolution drops **62.2→57.0**, **60.2→55.6**, and **53.0→49.2 percentage points** respectively; the mean drop is **4.5 points**. Convention-only failures are excluded.
- **Behavioral divergence (Tables 2–3):** PatchDiff distinguishes **91/311 (29.3%)**, **97/301 (32.2%)**, and **72/265 (27.2%)**, totaling **260/877 (29.6%)**. Of these, **74, 81, and 60** respectively were not caught by all developer tests. Divergence is not a measured incorrectness rate.
- **Why implementations diverge (Table 7, 77 sampled suspicious patches):** **36/77 (46.8%)** implement an aligned semantic change differently; **21/77 (27.3%)** add supplementary semantic changes; **4/77 (5.2%)** omit a reference semantic change; **16/77 (20.8%)** have no aligned change. Supplementary changes are substantially more common than omissions.
- **Adjudicated correctness (Table 8):** **22/77 (28.6%)** are certainly incorrect, **4/77 (5.2%)** certainly correct, and **51/77 (66.2%)** uncertain because intent is underspecified. Incorrect cases comprise **11 regressions, 6 partial fixes, 3 irrelevant behavioral changes, and 2 erroneous modifications**. **11/22** incorrect cases survive all developer tests; **8/22 (36.4%)** involve faulty supplementary changes. Two correct cases reflect irrelevant reference changes and two invalid differentiating inputs.
- **Estimated inflation:** extrapolating the adjudicated incorrect fraction across suspicious patches, plus **23** all-developer-test failures outside that set, produces the paper's **11.0%** estimated incorrectness among plausible patches and **6.4-point** mean resolution inflation. This is a sample-based estimate, not exhaustive labels.
- **Oracle/tool sensitivity:** on **300 sampled patches**, GPT-4o-mini identifies **84/300 (28.0%)** suspicious patches, DeepSeek-V3 **117/300 (39.0%)**, and Qwen3-235B-A22B **143/300 (47.7%)**. Stronger discrepancy search finds more differences, not necessarily more proven bugs. In the Python-compatible **133-patch** comparison, PatchDiff produces differentiating tests for **56**, versus **0** for Pynguin and CoverUp; environment/tool failures constrain that comparison. LIBRO distinguishes **52/877 (5.9%)** across the full set.

## Analyst Takeaways

1. **Supports the current test-quality contract, not a special AI exemption.** Green status is bounded by selected cases and actual assertions. Name the preserved negative behavior and regression boundary, not only the happy-path issue reproduction.
2. **Use differential evidence to ask a sharper question.** A reference discrepancy should trigger intent adjudication; automatically rejecting every suspicious patch would reject valid alternatives and treat 51 uncertain cases as settled.
3. **Audit the selection and reporting machinery.** Running only PR-modified tests loses existing regression protection. Preserve a broader acceptance gate even when the agent's inner loop is selective.
4. **Inspect extra semantic scope.** Newly added fallbacks and safety checks can silently change behavior outside the requested repair. The 8/22 supplementary-change failures justify reviewing these branches explicitly.
5. **Qualifies the human-versus-AI hypothesis.** Human-authored benchmark tests can be insufficient for agent patches, and targeted machine-generated counterexamples improve assurance. But the paper does not compare fewer long workflow tests with many small tests, and gives no support for tautological assertions. Its successful mechanism is fault discrimination plus intent review.

## Questions and Limitations

- This is an ICSE proceedings work, not merely an unreviewed preprint, although the archived bytes are the September 2025 arXiv manuscript.
- The arXiv landing abstract says **6.2 points**, whereas the archived v2 abstract and RQ4 say **6.4**; use the archived result with this discrepancy disclosed.
- The manual sample contains only PatchDiff-discovered suspicious patches, with author consensus rather than independent maintainer adjudication. Undetected errors and sampling bias remain.
- “Flaky-test filtering” requires 20/20 passes on one version but only at least one failure in 20 on the other; it does not require deterministic failure on the rejected version. Repeated success on one side is not proof of determinism.
- Reference-output-based test repair establishes characterization/discrimination, not independently justified expectations. Neither gold-patch agreement nor all-suite success proves correctness outside sampled inputs.

## Vault Ideas Extracted

* [Cross-Version Differential Oracles](/vault/cross-version-differential-oracles.md)
* [Safety-Constrained Regression Test Selection](/vault/safety-constrained-regression-test-selection.md)
* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md)
* [Verifier Co-Evolution Under Optimization](/vault/verifier-co-evolution.md)
