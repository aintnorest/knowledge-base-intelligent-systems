---
type: Study Note
title: "NGQA: Next-Gen Software Quality Accelerator using AI Agents and LLM Reasoning"
description: "ACM PROMISE 2026 pipeline combining SonarQube findings, RAG filtering, patching, repository mapping, local-agent test generation, and four-way testing across 70 repositories."
resource: https://doi.org/10.1145/3803846.3807468
source: /archive/ngqa-software-quality-accelerator.pdf
tags: [code-quality, agents, coding-agents, verification, evaluation, reliability]
timestamp: 2026-09-24T03:45:44Z
---

# NGQA: Next-Gen Software Quality Accelerator using AI Agents and LLM Reasoning — Study Notes

**Authors**: Seyed Moein Abtahi and Akramul Azim  
**Venue**: PROMISE '26, July 5, 2026, ACM, 10 pages  
**DOI**: 10.1145/3803846.3807468

## What It Is

NGQA is a six-stage software-QA pipeline: **(1)** SonarQube issue extraction, **(2)** RAG-assisted false-positive filtering, **(3)** LLM code revision, **(4)** structural dependency mapping, **(5)** dual test-suite generation, and **(6)** multi-metric validation. It combines n8n orchestration and cloud OpenAI inference with locally hosted coding models via Ollama; describing the local portion as privacy-preserving does **not** mean the entire hybrid pipeline sends no code to external services.

The test generator's “Local Chain of Thought” (LCoT) is a four-agent sequence rather than a new training algorithm: `deepseek-code-v2:16b` analyzes functionality, a second instance extracts functions/classes, `codellama:13b` designs test scenarios with project structure, and `qwen2.5-code:14b` writes unit tests. Each stage receives predecessor artifacts and retrieved references. The authors run it on original code (OT) and revised code (RT), then execute **original code with original tests (OC–OT), original code with revised tests (OC–RT), revised code with original tests (RC–OT), and revised code with revised tests (RC–RT)**.

## Dataset and Reported Results

The dataset is **70 GitHub repositories**, ten each in TypeScript, JavaScript, Python, Java, C++, C#, and C; the paper totals **1,510,600 lines**, **9,765 files**, and **4,168 SonarQube findings**. It labels **598** as false positives and proceeds with **3,570** findings. The RAG filtering agent reports **85.6% precision, 92.6% recall, 89.0% F1**. The revision step reports **2,980/3,570 (83.5%) resolved** findings, with vulnerability category **328/363 (90.4%)**, bug **651/778 (83.7%)**, and code smell **2,001/2,429 (82.4%)** under its classification.

The generated suites average **230 original** and **260 revised** tests per repository. Mean four-way pass rates are **73.8% OC–OT**, **68.2% OC–RT**, **82.1% RC–OT**, and **86.0% RC–RT**. Comparing 73.8 to 86.0 gives **12.2 percentage points** or **16.5% relative**; the same-old-tests comparison 73.8→82.1 is **8.3 points**, roughly **11.2% relative**. The paper reports CodeBLEU **61.2→78.8** (**28.8% relative**) and model-derived CodeScore **67.0→83.1** (**24.0% relative**). Its claimed **32.6× acceleration** compares **95.9 pipeline hours** with **3,126 modeled manual hours** from COCOMO-derived effort, not an observed randomized human team comparison.

## The Critical Oracle Boundary

The four-way matrix is more informative than one final pass rate. RC–OT tests behavior under a pre-revision suite, whereas RC–RT also rewards compatibility between a generated revision and tests generated from that same revision. The paper expressly concedes that pass ratios derived from the codebase measure **implementation consistency rather than external-specification correctness**. A bad patch can be accompanied by tests that codify the bad behavior. CodeBLEU measures structural/reference similarity, not semantic equivalence; CodeScore also depends on a model-based assessment rather than an external correctness oracle.

The early RAG filter drops SonarQube alerts before repair. If it incorrectly filters a true positive, downstream resolution statistics count only the reduced set and do not establish end-to-end recall of real faults. External retrieval can add irrelevant or untrusted suggestions; a finding needs a source-grounded adjudication, not merely the absence of contrary search hits. Privacy must be tested stage by stage because the pipeline combines local and hosted components.

## Analyst Takeaways

1. **Keep four-way test cross-checks.** Reuse pre-change tests on changed code and run new tests against old code; investigate changes in both directions rather than celebrate only RC–RT.
2. **Do not let generated code validate itself.** Preserve an independent requirement oracle, known-fault corpus, human-reviewed mutation checks, or external reference behavior before accepting an automated patch.
3. **Audit the filtering denominator.** Log every dropped static alert and sample true/false positives; a clean downstream queue can hide lost real defects.
4. **Compare cost and quality jointly.** Record hosted/local inference, retrieval, test runtime, reviewer minutes, and failure repair, rather than equating COCOMO estimates with realized acceleration.
5. **Use role separation for inspectable stages, not trust by role title.** Four local models can structure test creation but their shared assumptions and retrieved context remain correlated.

## Questions and Limitations

- The same system constructs patches and much of the test evidence, so independent correctness of the repaired software is unproven.
- Repository sampling and finding adjudication details do not establish generalization to high-criticality systems or rare security issues.
- No ablation isolates the contribution and operating cost of each RAG, dependency-map, or LCoT stage against a simpler matched-budget pipeline.
- CodeBLEU and CodeScore are quality proxies; even correctly resolved SonarQube findings can leave business-logic regressions.
- Modeled manual effort lacks observed human QA comparison; hybrid cloud/local privacy claims need an actual data-flow boundary description.

## Vault Ideas Extracted

* [Cross-Version Differential Oracles](/vault/cross-version-differential-oracles.md)
