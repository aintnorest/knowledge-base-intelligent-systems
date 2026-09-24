---
type: Study Note
title: "CausalVerify: An Execution-Grounded Benchmark for LLM Causal Inference Workflows"
description: Tests generated R causal-estimation workflows against realized-data reference estimates, revealing executable code that reports the wrong coefficient.
resource: https://arxiv.org/abs/2609.07944v1
source: /archive/causalverify-execution-grounded-causal-inference.pdf
tags: [benchmark, evaluation, verification, reliability]
timestamp: 2026-09-24T03:45:00Z
---

# CausalVerify: An Execution-Grounded Benchmark for LLM Causal Inference Workflows — Study Notes

**Authors**: Yonghong Zhang, Ricardo Correia, Isabel M. Parra, and Yong Xie  
**Venue**: arXiv:2609.07944v1 [cs.AI]  
**Date**: September 7, 2026

## What It Is

CausalVerify tests whether generated causal-analysis code computes a specified estimate, not merely whether a model can describe an econometric method or produce R that exits successfully. The transferable distinction is between **executable** and **correct according to an explicit numerical reference on the same data**. The benchmark does *not* test an agent that autonomously acts through iterative tools, nor does reference agreement establish the real-world validity of a causal identification assumption.

## Design and Checks

Experiment A reconstructs question, data description, and context for **259** published economics papers; seven models each identify method family and effect direction (**1,813** outputs). Its labels are a four-LLM consensus, not independently established causal truth, and only **187** papers are scoreable for method and **92** for direction. Some consensus-labeling models also appear in the evaluated model panel.

Experiment B supplies **100 fixed-seed synthetic realized datasets**: **30 DID, 24 event-study, 24 instrumental-variable, and 22 regression-discontinuity** scenarios. Seven models each write one R workflow, for **700** model-scenario records. The scorer distinguishes an output (L1), parseable code (L2a), successful execution (L2b), and an extracted treatment estimate within **50% relative error** of a canonical estimator on the *same realized data* (L2b+). Reference magnitude <10⁻⁹ is unscoreable; event-study window/scale conversions are frozen in the final ES-aware scoring variant. The reference is a declared benchmark estimator, not the generating population parameter or the only legitimate analysis.

## Results

| Model | Executed /100 | Reference-matched /100 | Executed but wrong |
|---|---:|---:|---:|
| Opus | 94 | **88** | 6 |
| GPT-5 | 76 | **72** | 4 |
| GPT-4o | 78 | **62** | 16 |
| Sonnet | 51 | **50** | 1 |
| o3 | 50 | **46** | 4 |
| Gemini | 32 | **32** | 0 |
| Kimi | 45 | **10** | 35 |

Across all **700**, **426** execute; **66/426 (15.5%)** executable workflows nonetheless miss the reference, while **360/700** pass the final reference check. Kimi contributes **35** of those 66 wrong-executed records. The stricter **25%** tolerance produces rates of **84%, 71%, 59%, 48%, 44%, 32%, and 9%**, versus **88%, 72%, 62%, 50%, 46%, 32%, and 10%** at 50%; model ordering remains stable over the tested cutoffs. L2b execution ranking versus L2b+ ranking correlates at **Kendall τ=0.81, Spearman ρ=0.929** across seven systems; direction-agreement ranking versus L2b+ has τ between **−0.20 and +0.10** across scorer variants. Correlation does not make executing code a proof of the reported number.

The result depends visibly on extraction/scoring rules: for Opus, regex → extraction judge → final ES-aware v2 gives **64% → 71% → 88%**; GPT-5 gives **29% → 59% → 72%**. A blinded 50-cell audit reports **88.6% agreement on L2b+ decisions**, but the source does not print the relevant scoreable-cell denominator, so this is not 88.6% of all 50. Retrospective calibration covers **646** responses and generally does not reliably separate correct from incorrect workflows by model self-confidence.

## Analyst Takeaways

1. **Test the number the code reports.** A completed run and a fluent explanation should not be accepted without extracting the claimed estimate and comparing it to an independently specified reference on identical inputs.
2. **Version the grader, not only the dataset.** Coefficient extraction, acceptable window/scale conversions, numerical tolerance, and unscoreable cases materially change pass rates. Retain code, stdout, extracted value, reference, and decision for review.
3. **Escalate domain interpretation.** A human analyst must judge identification assumptions and whether a defensible alternative specification was unfairly rejected by the fixed oracle.

## Questions and Limitations

- Synthetic single-shot R workflows cover only four estimator families. Real causal work includes data cleaning, assumption checks, sensitivity analysis, and collaborative iteration omitted here.
- The four-LLM text labels have limited human agreement: the 30-paper audit reports **60.0%** method and **47.6%** direction agreement, with missing scoreable labels. Experiment A is therefore a weak truth anchor.
- A 50% coefficient tolerance is generous, and agreement with the benchmark estimator does not prove a causal claim. No timed human workflow baseline is reported.
- The paper states code, data, cached outputs, and datasheet are released; the dossier's assessment rests on the supplied paper, not independent repository reproduction.

## Vault Ideas Extracted

* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md)
