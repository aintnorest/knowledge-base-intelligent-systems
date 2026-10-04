---
type: Study Note
title: Does Fault Localization Beat a Fresh Attempt? A Placebo-Controlled Study of Test-Guided Code Repair
description: A matched-retry and random-span-controlled study finds that test-localized infilling loses to fresh solutions in modest-size code models, with strong limits on available failure signals.
resource: https://arxiv.org/abs/2609.00854v1
source: /archive/fault-localization-placebo-code-repair.pdf
tags: [llm-code-testing, coding-agents, verification, evaluation, agents, code-quality]
timestamp: 2026-10-04T07:48:58Z
---

# Does Fault Localization Beat a Fresh Attempt? A Placebo-Controlled Study of Test-Guided Code Repair — Study Notes

**Author**: Anik Jha (independent researcher)  
**Venue**: arXiv:2609.00854v1 [cs.SE, cs.AI, cs.LG]; preprint, no accepted venue or publisher DOI identified on the abstract page  
**Date**: September 1, 2026

## What It Is

A controlled experiment asking whether test-derived fault locations improve repair beyond simply sampling again or editing any equally small region. It studies failing Python function/class solutions, not repository-scale agent trajectories. Its durable contribution is the **counterfactual design** and its negative result: a surgical-looking retry is not necessarily a more effective retry.

## Problem

Successful localized repair can conflate useful location information, a small edit, and another stochastic generation opportunity. A deployable localizer also needs a visible failing test: hidden-only failures cannot guide it. Neither successful edits nor green visible tests settle these questions.

## Mechanism and Study Design

For each failed greedy candidate, compare fresh whole-solution generation without the candidate or failure information; infilling at the most suspicious contiguous span; and same-length infilling at a disjoint random executable-code span. Spectrum-based localization ranks lines by how often failing versus passing tests execute them. It includes the full maximum-score tie rather than choosing an arbitrary tied line, rejecting excessively diffuse spans or those without a matched placebo.

The original experiment uses Qwen2.5-Coder-32B-Instruct-AWQ, Qwen3.6-27B, and Gemma-4-26B-A4B-it across HumanEval+, MBPP+, and a function-call LiveCodeBench subset: **488 failing candidates**, with **16 stochastic attempts per arm**. A separately declared Mistral-Small-3.2-24B replication covers HumanEval+ and MBPP+. Public-test localization is the deployable condition; localization using augmented scoring tests is explicitly an **unavailable strong-signal upper bound**, not a deployable method. The analysis conditions all arms on the same localizable subset. Primary inference is per-model, task-clustered per-attempt success with Holm correction; pooled unlock comparisons are sensitivity summaries, not the confirmatory analysis. The plan was pre-specified internally, not externally preregistered.

## Findings

- **Signal availability dominates:** public tests localize **44/488 failures (9.0%)**; **212** fail hidden tests while passing every public test. Strong tests raise localizability to **177 (36.3%)**. Straight-line statements still co-execute, producing diffuse tied spectra; more cases do not automatically yield fine-grained locations (§4.1).
- **Fresh attempts beat localized infilling under strong signal:** Table 4's matched comparison has **176 paired candidates**, localized-only versus fresh-only unlock discordance **3:40**, exact **p = 3.0×10⁻⁹**, and per-attempt success **4.4% versus 10.1%**. Both designated per-model analyses resolve the loss in the two Qwen checkpoints, not Gemma. Mistral replicates it on **62 candidates**, **0.6% versus 11.9%**, a **−11.3-point** difference with **95% CI [−16.6, −6.8]** (§4.2).
- **Location value is suggestive, not established:** strong-signal localized versus random-span success is **4.3% versus 1.1%**, pooled discordance **11:1**, Holm-adjusted **p = .019**. No individual original model passes the primary corrected comparison; best Holm **p = .087**. Neither public-signal comparison survives correction (§4.2, Table 4).
- **Cheap attempts can still be inefficient repair:** mean generated tokens are **21.7** for span edits versus **371.1** for fresh solutions. **16** localized attempts unlock **6.8%**, below **10.1%** for one fresh attempt. This reprices by pooled mean output length, ignores prompt/prefill and wall-clock costs, and is not a directly token-capped trial (§4.3).
- **Anchoring and limited search:** localized infilling returns the removed span verbatim in **48.9%** of attempts, with **0.23 distinct programs per attempt** versus fresh generation's **0.83**. Widening the median edit from **1 to 5 lines** reduces repetition but does not reverse the loss; adaptivity adds at most **+0.6 points** beyond static widening (§4.4).

## Analyst Takeaways

1. **For `guides/test-quality.md`, distinguish detection, diagnosis, and repair.** Independent expected behavior and defect-sensitive cases make a failure observable; a line ranking supplies a hypothesis, not a correct patch. A test that misses the defect supplies no repair feedback regardless of presentation.
2. **Evaluate repair information against honest alternatives.** Compare targeted retries with a fresh attempt and a size-matched unrelated edit before attributing improvement to localization. Include actual compute and failure-preservation costs; whole-solution replacement is much less plausible for a large existing repository.
3. **Do not equate many small tests with a proven agent advantage.** This study varies repair location and edit width, not unit versus workflow test suites. Co-executed statements can have identical spectra even under stronger tests. It supplies counter-evidence to assuming precise-looking feedback always improves model repair, not evidence against small regression tests.
4. **Keep composition gates.** A local patch still needs the independent behavioral and interaction checks relevant to the change. [SHERLOC](/dossiers/sherloc-structured-diagnostic-localization.md) studies a different mechanism: repository diagnosis plus actionable context without executing tests, rather than constrained infilling.

## Questions and Limitations

- Conclusions apply to the **24–32B** models tested and conditional function/class-level failures, not frontier repository agents, multi-hunk repair, or an optimal test-layer ratio. The smaller-model probe is invalid for location attribution because splices frequently do not parse.
- Every statistically resolving original comparison depends on strong tests unavailable to the deployed loop. Rejected diffuse spectra and hidden-only failures are not represented in the paired repair result.
- Exact-output scoring differs from some EvalPlus tolerances/order handling, so absolute rates are not interchangeable with published benchmark scores. Model training cutoffs were not verified; the LiveCodeBench subset is not claimed contamination-free.
- Harness defects involving timeout, span selection, output extraction, and infilling termination changed preliminary results before correction. One strong-signal candidate lacks a fresh-generation arm, explaining the different denominators. Output-token repricing is not full compute equivalence.
- The paper's Table 3 reports **4.34%** across all localized attempts; Table 4 rounds the matched fresh-comparison subset to **4.4%**. Preserve the population distinction rather than treating these as identical denominators.

## Vault Ideas Extracted

* [Test-Failure Localization for Agents](/vault/test-failure-localization-for-agents.md) — separate test boundary size, diagnostic information, and edit scope.
