---
type: Study Note
title: "EviRCA: Decoupling Evidence Extraction from Reasoning for Microservice Root-Cause Analysis"
description: Deterministic telemetry extraction plus bounded read-only model reasoning improves OpenRCA exact diagnostic rates while sharply reducing tokens versus raw-telemetry coding agents.
resource: https://arxiv.org/abs/2609.19825v1
source: /archive/evirca-microservice-root-cause-analysis.pdf
tags: [agents, tool-use, verification, enterprise, reliability, evaluation]
timestamp: 2026-09-24T03:45:00Z
---

# EviRCA: Decoupling Evidence Extraction from Reasoning for Microservice Root-Cause Analysis — Study Notes

**Authors**: Yuhao Wang, Zhen Qin, Xingliang Wang, Guochang Li, Weize Li, and Shuiguang Deng  
**Venue**: arXiv:2609.19825v1 [cs.SE]  
**Date**: September 17, 2026

## What It Is

An LLM agent that writes code to sift raw metrics, traces, and logs for microservice incidents must discover evidence and reason about it in one expensive, unstable loop. EviRCA separates those jobs: deterministic detectors first produce compact, inspectable anomaly cards, then an LLM explores the cards with read-only, structured tools to identify a fault's time, component, and reason. The system is not wholly configuration-free: a per-system adapter supplies schema, timestamp units, topology, modality availability, resource/reason mapping, and optional guidance.

## Pipeline and Scoring

A daily per-component/KPI baseline identifies sustained anomalies in dead, saturated, low-baseline, and normal series; traces contribute failed/slow calls and logs contribute bursts where present. Each card records a component/resource pair, onset, supporting metrics, and candidate reasons. A topology rollup can infer a faulty node or service from co-affected pods. A sub-threshold safety net provides weak leads if no card crosses detection. The LLM lists leads, inspects component details, downsampled series, golden signals, call graphs, and occasional sampled raw log lines, then selects a closed-set answer. It cannot freely execute code; saying it *never* sees raw telemetry would overstate the log-sample tool.

OpenRCA contributes **335** cases over three enterprise systems: **136 Bank, 51 Telecom, 148 Market**, each with a 30-minute telemetry window. Telecom has traces and metrics but **no logs**. A Correct answer must get every *queried* field right, predict the right number of causes, and place a requested time within **±60 seconds**. Partial credits individual correct queried fields; it is not the percentage of wholly solved cases. Baselines are a raw-telemetry Python-writing **RCA-Agent** and an **Oracle Sampling** one-call method with engineer-selected KPIs—not an oracle with ground-truth answers.

## Results

| Method and backend | Bank Correct | Telecom Correct | Market Correct | Weighted overall Correct |
|---|---:|---:|---:|---:|
| Oracle Sampling; Qwen3.7-plus | 9.6% | 29.4% | 15.5% | **15.2%** |
| RCA-Agent; DeepSeek-V4-Pro | 17.6% | 11.8% | 9.5% | **13.1%** |
| EviRCA; DeepSeek-V4-Pro | **52.2%** | **62.7%** | **29.7%** | **43.9%** |
| EviRCA; Qwen3.7-plus | **47.8%** | **56.9%** | **28.4%** | **40.6%** |

The weighted overall uses case counts, not a simple mean of system percentages. With DeepSeek on Bank/Telecom/Market, EviRCA uses **101.8K / 48.3K / 66.4K tokens per case** versus RCA-Agent's **1.53M / 1.24M / 1.54M**: reported ratios **15.0× / 25.7× / 23.3×**. Per-case time is **182.3 / 31.7 / 40.8 seconds** versus **577 / 622 / 685**, ratios **3.2× / 19.6× / 16.8×**. Bank requires expensive per-case trace reconstruction, shrinking its latency advantage.

Leave-one-out ablations show strong *local* dependencies. On Telecom, removing trace evidence lowers Correct by **45.1 percentage points**, and removing co-location rollup by **37.3**; removing optional guidance costs **11.8**. On Market, removal of the safety net costs **3.4 points**. Residual failure analysis reports that among single-fault failures, **22.5%** lack the true component in extracted evidence, while **35%** choose incorrectly among surfaced candidates; these categories are not a complete all-case distribution. The true component is absent from evidence in **89.6% of Market network-reason failures**, so the extraction stage has a material coverage ceiling in that slice.

## Analyst Takeaways

1. **Put reliable transformations before open-ended reasoning.** Precompute evidence cards with onset, topology, and source pointers; let the agent inspect bounded details and propose a cause rather than write arbitrary telemetry-mining scripts.
2. **Measure extraction recall and final diagnosis separately.** A model cannot rescue an omitted true cause; conversely, when it is surfaced, wrong candidate selection demands a different remedy.
3. **Keep the handoff auditable.** For human-in-the-loop incident work, retain timestamps, card-level supporting KPIs/traces, modality gaps, and the final hypothesis; require engineer verification before mitigation. This deployment pattern was not evaluated in the paper.

## Questions and Limitations

- The three benchmark systems provide topology, reason categories, and fault-count labels; production incidents often do not. Only two model backends and the stated baseline implementations are compared, without reported confidence intervals or repeated-run variance.
- Although the detector engine is shared, adapters encode significant system-specific knowledge and units. Telecom's worked-example prose mentions three modalities despite its data table stating no logs; rely on the latter for coverage.
- Closed-set Correct does not measure whether an explanation helps on-call engineers or whether an automated remedy is safe. Market network failures show that compact evidence is only as good as extraction coverage.

## Vault Ideas Extracted

* [Bounded Tool Observations](/vault/bounded-tool-observations.md)
* [Staged Evidence-Grounded Judgment](/vault/staged-evidence-grounded-judgment.md)
