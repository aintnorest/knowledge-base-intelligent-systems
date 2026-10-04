---
type: Study Note
title: Real-Time Detection and Repair of LLM Agent Failures
description: A single-author telemetry-monitoring preprint whose strongest repair evidence comes from deterministic task checks, while organic-failure transfer and calibration remain weak.
resource: https://arxiv.org/abs/2608.02464v1
source: /archive/realtime-detection-repair-agent-failures.pdf
tags: [reliability, verification, orchestration, evaluation, agents]
timestamp: 2026-10-04T06:15:48Z
---

# Real-Time Detection and Repair of LLM Agent Failures — Study Notes

**Author**: Sunny Dubey (single author; ORCID given, no institutional affiliation stated).  
**Status**: arXiv v1, August 3, 2026; no peer-reviewed venue identified in the manuscript.

## What It Is

A layered watchdog-and-repair study spanning **2,823 committed episodes over 25 datasets**, three agent frameworks, Qwen2.5 7B/3B, Llama3.1 8B and Gemini 2.5 Flash. It distinguishes cheap behavioral anomaly detection, task-specific deterministic checks and expensive semantic escalation. The useful result is not a universal failure detector but a measured division of responsibility among these layers.

## Problem and Motivation

Agents can loop, propagate tool failures, drift, fabricate or ingest corrupted results before the final answer. Judging every step with another model adds substantial inference cost. Observable behavior is cheap to inspect, but an ordinary-looking trajectory can still contain wrong data, omit required work or make a plausible unsupported claim.

## Mechanism as an Idea

Fit an echo-state-network ensemble on healthy traces: a fixed random recurrent representation and learned linear predictor estimate the next step's telemetry. Prediction surprise accumulates separately per channel through CUSUM; take the strongest channel rather than averaging away a localized anomaly. Text uses deterministic character-feature hashing, alongside uncertainty and action metadata. Thresholds are calibrated from healthy episode maxima.

A memoryless Mahalanobis detector complements the temporal monitor when little post-onset execution remains. Supervised fusion can learn which regime dominates; it should not be confused with the label-free base monitor. Content-grounding features inspect tool-result relevance and malformed structure, but cannot validate a plausible wrong value without an outside reference.

Deterministic checks recompute reported totals from **results actually received**, confirm required calls occurred and validate result shapes. They need neither a learned healthy distribution nor a statistical threshold. A flagged run is restored to its fact-gathering checkpoint and continued with fresh model calls; corrective guidance can name the failed check without supplying the correct answer.

## Results and Admissions

- Monitor scoring is about **200 microseconds per step**; adapter median is **674 microseconds**, with **1,045-microsecond p95**. Median combined overhead is below one millisecond, not a guarantee for every step.
- Transferring a Qwen7B-calibrated monitor to Llama8B yields **AUROC 0.527** and **75% healthy false alarms**. Recalibration on the target raises AUROC to **0.885**. Calibration is deployment-specific, including tools, temperature and trace distribution.
- On external AFTraj-2K, **1,882 retained trajectories** give **AUROC 0.745**, but only **4.8% detection** at a 5% false-alarm budget. Only **53/771 failures** have at least nine post-onset steps. On ATBench, **604 retained trajectories** yield **AUROC 0.779** and **31.1% unsafe-run detection**.
- The hybrid's pooled AUROC is **0.826**, versus **0.802** ESN and **0.807** delta-Mahalanobis. It does not dominate the best detector per dataset: detection is at or below that parent on **all eight** compared datasets.
- Organic monitoring catches only **1/3 fabrications**, with within-organic **AUROC 0.31–0.42** and **36% healthy false alarms** even with a temperature-matched null. Completion checking catches **7/7 silent aborts**. A preregistered 55-episode fabrication study sees only **two hallucinations**, below its minimum of ten, and makes no detection claim.
- Deterministic totals catch **60%** of failures, **96% with coverage**, versus monitor **54%**, with **0/63** versus **11/63** false positives. Frozen checks on **120 disjoint-seed episodes** catch **54%**, **93% with coverage**, and **0/64** false positives. Cross-family checks catch **110/110** failures with **0/10** false positives; these are finite, task-specific samples.
- Naming the failing check without values recovers **45%** of 55 wrong episodes, versus **16%** for checkpoint resampling (**p = 0.0005**). Over 120 episodes it raises task success from **52% to 73%**, recovering 25 failures and breaking zero correct runs. Only this repair rung survives correction for five comparisons; generic and answer-specific hints remain suggestive.

A measured judge detects **0.548**, not the assumed **0.90**. Substitution into the escalation simulation reduces detection recovery from **82% to 43%**, while preserving call savings. Retry cannot fix a persistently broken tool: those failures escalate, and contract violations are not repaired automatically.

## Analyst Takeaways

1. **Use the cheapest check that matches the failure.** Required-work coverage and arithmetic grounding can outperform a learned detector on their narrow contracts without calibration or false-alarm thresholds.
2. **Ranking is not an operational alarm policy.** Useful AUROC can coexist with almost no detection at an acceptable false-alarm budget.
3. **Diagnose before retrying.** A failed-check name can redirect reasoning without handing over an answer; a broken upstream tool requires escalation rather than the same fetch again.
4. **Measure rescued outcomes, not alarms alone.** This supplies an intervention experiment missing from [Failure as a Process](/dossiers/failure-as-a-process-cli-agent-trajectories.md), though on different tasks and models, so their rates are not directly comparable.

## Questions and Limitations

Injected failures and constructed telemetry reveal detector mechanics, not organic deployment coverage. Tasks center on mock-tool and research loops; no coding-agent repair generalization is established. Plausible-value corruption needs an independent reference, and omission can be invisible until a completion check. Wall-clock features are machine-specific and excluded from the shipped configuration.

The abstract says **770** episodes use real tools, while Section 5 describes all 2,823 as live real-tool episodes; this accounting is unresolved. Content detection is **0.28→0.59** in the abstract but **0.27→0.58** in Table 2. The Figure 1 caption says CUSUM accumulates “multiplicatively,” whereas its equation is additive. Preserve these distinctions instead of treating headline wording as a precise specification. No audit of the released artifact or independent replication was performed for this note.

## Vault Ideas Extracted

* [Adaptive Runtime Agent Supervision](/vault/adaptive-runtime-agent-supervision.md)
