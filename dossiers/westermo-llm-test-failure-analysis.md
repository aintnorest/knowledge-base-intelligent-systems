---
type: Study Note
title: "Supporting Industrial Test-Failure Analysis with LLM-Based Systems: An Experience Report"
description: Westermo case study compares evidence-retrieving single and multi-agent test-failure analysis, finding scenario-dependent perceived quality and lower single-agent time and cost.
resource: https://arxiv.org/abs/2609.21843v1
source: /archive/westermo-llm-test-failure-analysis.pdf
tags: [agents, multi-agent, verification, human-in-the-loop, enterprise, evaluation]
timestamp: 2026-09-24T03:45:00Z
---

# Supporting Industrial Test-Failure Analysis with LLM-Based Systems: An Experience Report — Study Notes

**Authors**: Eric Jansson, Per Strandberg, Thomas Sörensen, Eduard Paul Enoiu, and Wasif Afzal  
**Venue**: arXiv:2609.21843v1 [cs.SE]  
**Date**: September 18, 2026

## What It Is

At Westermo Network Technologies, nightly test failures require engineers to connect controller/device logs, test metadata, and device mapping. This exploratory industrial study compares a GPT-5.4 **single agent** with an orchestrated **multi-agent** configuration for retrieving that evidence and drafting root-cause hypotheses. It asks what practitioners find useful, plus cost, duration, and repeatability—not whether either architecture diagnoses failures against an independent ground truth.

## Systems and Evaluation

Both configurations use restricted MCP tools for test results, mappings, and log retrieval. The multi-agent version delegates metadata, device mapping, log analysis, and final RCA to specialists; the single agent does all work in one context. Both produce Root Cause, Confidence, Evidence, Reasoning Steps, Next Steps, Assumptions, and Limitations. The numeric confidence is explicitly **uncalibrated**. Trimming logs to timestamp and message reportedly reduces log context by approximately **80%**, but the paper does not ablate this choice. Neither configuration can read product or test-framework source code.

Four real failures were selected: two used for development and **two for evaluation**. **Six practitioners** rated one report per scenario–architecture combination (**four fixed reports**, 24 responses per assessed dimension), then discussed them in an approximately **80-minute** focus group. Independently, the authors ran each scenario–architecture pairing **30 times**, totaling **120** reports, to measure duration, Azure-derived cost, and semantic consistency. Consistency is the size of the largest LLM-grouped cluster of similar Root Cause/Evidence conclusions divided by 30; it is repeatability, **not diagnostic correctness**.

## Findings

- In scenario 1, the single-agent report has higher median ratings on all **six** surveyed dimensions; in scenario 2 the multi-agent report has higher medians on all six. The usefulness-median difference (multi minus single) reverses from **−1.5 to +2.0**. There is no stable practitioner-perceived quality winner across these two cases.
- Single-agent report generation takes approximately **40 seconds**, versus approximately **130 seconds** for multi-agent. Per-run reported cost is approximately **0.75 SEK** versus **1.5–1.75 SEK**. Total tokens alone mislead because cached input dominates the single agent's usage while multi-agent uncached/output tokens cost more.
- The single agent's repeated reports have larger dominant semantic clusters in both scenarios; the paper does not provide exact cluster fractions in the extractable text. Stable output could still consistently be wrong.
- Practitioners valued evidence that locates the relevant logs and concise **Next Steps**. Some found speculative root-cause wording, repetitive reasoning, references to internal tool mechanics, inaccurate timestamps, or uncalibrated confidence confusing or potentially anchoring.

## Analyst Takeaways

1. **Start with a simple evidence-retrieving baseline.** Extra agents added measured expense and delay without consistent perceived-quality benefit on these two failures; require a matched benefit on harder held-out cases before adding coordination.
2. **Support rather than replace an engineer.** Show an inspectable log window and exact evidence, an uncertainty-qualified hypothesis, and practical next checks; let the owner validate before changing code or classifying the incident.
3. **Measure diagnostic accuracy and human work separately.** A practitioner rating, semantic agreement among repeated reports, and total time-to-root-cause are different outcomes. The paper measures only the first two and report-generation time.

## Questions and Limitations

- Six raters and one rated report per architecture per scenario cannot estimate architecture-level diagnostic accuracy. There is no verified-cause label, timed manual baseline, or measured impact on human investigation time.
- The 120 operational repetitions are not 120 independently human-assessed reports; report selection for the survey could influence its result.
- The multi-agent prompt was adapted from the single-agent design and may have inferior handoff quality; complexity effects cannot be generalized from two failures and one implementation per architecture.
- Log-only evidence may not reveal product-code or test-framework causes. Wrong but persuasive conclusions pose an anchoring risk; internal logs need appropriate privacy and access controls.

## Vault Ideas Extracted

* [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md)
* [Staged Evidence-Grounded Judgment](/vault/staged-evidence-grounded-judgment.md)
