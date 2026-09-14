---
type: Study Note
title: "Optimization before Evaluation: Evaluation with Unoptimized Prompts Can be Misleading"
description: "An industry evaluation study showing that optimizing instructions separately for each model can reorder model leaderboards across public and proprietary tasks, while exposing the reproducibility and leakage risks of treating the discovered prompt as a model-independent constant."
resource: https://arxiv.org/abs/2604.27637v1
source: /archive/optimization-before-evaluation.pdf
tags: [prompt-optimization, evaluation, prompting, enterprise, reliability]
timestamp: 2026-09-14T17:11:30Z
---

# Optimization before Evaluation: Evaluation with Unoptimized Prompts Can be Misleading — Study Notes

**Authors**: Nicholas Sadjoli, Tim Siefken, Atin Ghosh, Yifan Mai, and Daniel Dahlmeier  
**Affiliations**: SAP; Stanford University  
**Preprint**: [arXiv:2604.27637v1](https://arxiv.org/abs/2604.27637v1) [cs.AI], 30 April 2026  
**Pages**: 20

## What It Is

This paper argues that a single static prompt across models answers a model-centric question—"which model best interoperates with this prompt?"—but not the application-centric question practitioners usually care about: "which model can deliver the best task performance after realistic configuration work?" Its proposed correction is simple and consequential: optimize a prompt separately for every candidate model before ranking the candidates.

The experiment compares five anonymized 2024 models on three public academic datasets and five proprietary enterprise datasets. It applies instruction-only TextGrad optimization to all eight tasks and instruction-plus-exemplar MIPRO optimization to the three public tasks. Post-optimization rankings correlate only weakly with rankings under the starting prompts. The strongest conclusion is therefore not that one optimizer always helps—it does not—but that a model leaderboard is conditional on its prompt and optimization budget.

The paper is practically important because it tests the concern on real enterprise tasks, not just academic multiple choice. Its evidence is also less reproducible than its framing suggests: every model is anonymized, the internal datasets are unavailable, only one optimization run is reported, one model supplies all optimizer feedback, and at least one dataset appears to reuse optimization examples in the reported test set.

## The Evaluation Target Changes

With a static template, each model is scored as:

\[
S_M = \frac{1}{n}\sum_i J\left(y_i, M(P_{static}(x_i))\right),
\]

and evaluation selects the model with the highest score. In the application-centric formulation, a prompt optimizer uses training and validation examples to find a model-specific prompt \(P_M^*\), after which the held-out score becomes:

\[
S_M^* = \frac{1}{n}\sum_i J\left(y_i, M(P_M^*(x_i))\right).
\]

This turns the object being selected from a bare model into a **model–prompt configuration**. That distinction matters because models have different response-format preferences, instruction-following behavior, and sensitivity to examples. A fair deployment evaluation should give each candidate a comparable opportunity to adapt its prompt, rather than implicitly favoring the model most compatible with one arbitrary template.

The paper optimizes two prompt components:

- **Instruction-only**: system/task instructions are rewritten while the task input remains fixed.
- **Instruction with exemplars**: the instruction and few-shot examples are jointly selected or rewritten.

This is not prompt portability research. Every prompt is optimized for one target model and one task; the paper explicitly leaves cross-model reuse untested.

## Experimental Method

### Models

The five evaluated systems are anonymized for confidentiality:

| Model | Disclosed characterization |
|---|---|
| A | Closed-source multimodal model, released in 2024; 128K context; October 2023 knowledge cutoff |
| B | Closed-source multimodal model, released in 2024; 1M+ context; May 2024 cutoff |
| C | Closed-source multimodal model, released in 2024; 200K context; April 2024 cutoff |
| D | Open-weight, text-only, instruction-tuned 8B model; 128K context |
| E | Open-weight, text-only, instruction-tuned 123B model; 128K context |

The aliases conceal provider, exact model/version, decoding configuration, and whether the optimizer or judge belongs to the same family as a tested model. Reproduction and vendor-specific interpretation are therefore impossible.

### Optimization procedures

**Instruction-only optimization** uses TextGrad with GPT-4o as the critic/optimizer. It runs eight epochs, each with three optimization steps over batches of five, so no more than 15 training examples are considered per epoch. After each step, a proposed instruction replaces the incumbent only when it improves the score on the first 100 validation examples. This procedure is run for all eight datasets.

**Instruction-with-exemplar optimization** uses the “light” MIPRO implementation in DSPy, again with GPT-4o supplying optimization feedback. It is run only for GSM8K, OpenBookQA, and MMLU, with caps of 200 training and 300 validation examples. The comparison baseline uses random few-shot examples chosen by HELM.

The optimization budget is fixed by method, but the paper does not report total calls, token cost, wall-clock time, seeds, decoding parameters, or repeated runs. The “best achievable” score is consequently the best score found by these two specific, stochastic, incompletely documented searches—not an intrinsic ceiling for the model.

### Public benchmarks

| Dataset | Task and reported split | Metric |
|---|---|---|
| GSM8K | Math word problems; 200/300/300 train/validation/test | Exact match after extracting the last integer in the output |
| OpenBookQA | Multiple-choice QA with the relevant fact supplied, omitting the usual retrieval step; 4,957/500/500 | Regex extraction of the letter after `Answer:` and exact-match accuracy |
| MMLU | Five subjects only: abstract algebra, econometrics, conceptual physics, machine learning, professional medicine; 25/91/833 | Same `Answer:` regex and exact-match accuracy |

These are altered or restricted benchmark slices rather than standard leaderboard configurations. The setup is still useful for within-paper comparisons, but the scores should not be compared directly with canonical GSM8K, OpenBookQA, or full-MMLU results.

### Proprietary enterprise benchmarks

| Dataset | Task and reported split | Metric |
|---|---|---|
| Digital Assistant Routing | Classify queries as `TRANSACTIONAL`, `IR`, or `ANALYTICS`; 735/157/158 | Exact-match accuracy |
| Copilot Help Docs | Context-grounded answers about product documentation; 150/100/61 from 311 examples | GPT-4o judge rating from 1–5, linearly normalized to 0–1 |
| Copilot Consultancy | Context-grounded product consulting; 200/100/74 from 374 examples | Same GPT-4o judge protocol |
| Text-to-SQL | Convert natural-language requests plus JSON data into structured query representations; 56 examples | Average precision over matching JSON entries |
| Enterprise Document Data Extraction (EDDE) | Extract delivery-note key/value pairs into JSON; 200/100/96 | Entry-level F1 |

The internal suite is the paper's most deployment-relevant contribution: it spans routing, retrieval-grounded QA, open-ended consulting, structured query generation, and document extraction. It also cannot be independently inspected. Task definitions, example distributions, ground truths, retrieval context, judge prompt, and human-alignment procedure for the proprietary datasets are not released.

A serious split problem is disclosed for Text-to-SQL: the paper says only 56 examples exist, all 56 are used as the test set, and optimization uses 47 training plus seven validation examples. Unless the wording is wrong, optimization and testing necessarily overlap. Its post-optimization scores cannot be treated as held-out generalization evidence.

## Results: Prompt Optimization Reorders Models

For instruction-only optimization, Kendall's \(\tau\) between the original and optimized rankings is:

| Dataset | Kendall's \(\tau\) |
|---|---:|
| GSM8K | 0.10541 |
| OpenBookQA | -0.10541 |
| MMLU | 0.40 |
| Text-to-SQL | 0.00 |
| Digital Assistant Routing | 0.94868 |
| Copilot Help Docs | 0.52704 |
| Copilot Consultancy | -0.40 |
| EDDE | 0.40 |
| **Mean** | **0.23446** |

For instruction-with-exemplar optimization, the three public-task values are GSM8K −0.10541, OpenBookQA 0.40, and MMLU 0.80, for a mean of 0.36486. With only five models, these coefficients are coarse and sensitive to ties, but the direction is unmistakable: most post-optimization leaderboards do not preserve the baseline ordering.

The paper's narrative highlights two winner changes. GSM8K moves from Model B under the instruction-only baseline (85.00%) to Model D after optimization (93.00%); with few-shot prompts it likewise moves from Model B's 88.67% baseline to Model D's 94.67%. For MMLU, the prose says the winner changes from Model C to Model B after instruction-only optimization. However, Table 3 prints MMLU's optimized values as an exact duplicate of its GSM8K row, which would make Model D—not B—the winner. The MMLU numerical table is therefore unreliable without corrected results.

The internal datasets show why application-level ranking can move even when raw capability does not. Selected instruction-only changes from Table 3 include:

- **Copilot Help Docs**: Model A rises from 77.05% to 82.38%, a 5.33-point gain; the paper describes the new task maximum as 6.9% higher in relative terms. Model B rises 12.25 points, from 66.85% to 79.10%.
- **Copilot Consultancy**: Model E rises from 60.47% to 71.28% and becomes the leader; Model C, the baseline leader at 68.24%, falls to 64.86%.
- **EDDE**: Model B jumps from 24.60% to 73.10%, while the winner remains Model D at 79.36% versus 76.86% before optimization.
- **Text-to-SQL**: Model E rises from 62.49% to 72.59% and becomes the leader; Model D falls from 62.66% to 59.75%.
- **Digital Assistant Routing**: rankings barely change (\(\tau=0.94868\)); most gains are under two points and two models are unchanged.

The model effects are task-specific rather than monotonic. Model B is highly sensitive on Copilot Help Docs, Copilot Consultancy, and EDDE, but barely changes on Text-to-SQL and routing. The paper interprets larger gains on GSM8K and open-ended copilot tasks as evidence that complex tasks benefit more, while tasks already near saturation benefit less.

## What the Qualitative Examples Actually Show

Several improvements come from aligning generation with the metric's parser or output contract:

- On GSM8K, Model D initially computed the correct answer but placed another number later in its response. Because scoring extracts the last integer, the response was marked wrong. The optimized instruction forces a prominently placed final answer and receives credit.
- On Text-to-SQL, Model E mixed prose with JSON and triggered a parsing error. The optimized prompt demands only the structured JSON payload.
- On EDDE, an optimized prompt prevents unintended `null` outputs.
- On Digital Assistant Routing, added distinctions between informational and transactional requests correct an ambiguous classification.

These are legitimate production gains: a correct value in an unparsable response is an application failure. But they also narrow the claim. Some measured improvement is **interface and evaluator alignment**, not newly acquired reasoning ability. The benchmark parser, judge, and output schema are part of the optimized system and must be versioned with the prompt.

The negative examples are equally informative. MIPRO makes an already strong OpenBookQA setup worse by adding elaborate reasoning and format instructions that conflict with the concise answer contract. On MMLU, an optimized instruction causes Model E to answer the few-shot examples as if they were live questions; the scorer then extracts the first example answer instead of the real one. A critic that writes a plausible prompt for itself can produce an ambiguous prompt for the target model.

## Deployment Implications

1. **Rank deployable configurations, not naked models.** Give each candidate model a model-specific prompt search under a declared, comparable optimization budget. A static shared prompt favors compatibility with that one wording.
2. **Separate capability, elicitation, and interface compliance.** Report the shared-prompt baseline, target-optimized result, and structured-output or parser-failure rate. The gap diagnoses what optimization repaired.
3. **Keep three-way data separation strict.** Prompt search is training. Candidate selection is validation. Only a disjoint holdout can estimate deployment performance; the Text-to-SQL setup demonstrates what goes wrong when these roles overlap.
4. **Version the whole configuration.** Store model snapshot, system and task instructions, exemplars, optimizer and critic, judge, parser, decoding parameters, dataset version, splits, search budget, and selected checkpoint together.
5. **Treat optimization regressions as expected.** Search should retain an incumbent only on validation and promotion should require a final holdout check, including task slices and output-contract failures. Near-saturated tasks may be harmed by unnecessary elaboration.
6. **Include cost and operational constraints in selection.** This paper optimizes task score only. A production comparison also needs inference cost, latency, prompt length, consistency, safety, and the one-time plus recurring expense of prompt optimization.
7. **Re-optimize after model or harness changes.** The observed sensitivities imply that prompts are model-bound deployment artifacts. A provider upgrade, judge change, parser change, or new retrieval format invalidates the old ranking.

## Analyst Takeaways

- **The static prompt is not neutral.** It is one configuration choice whose interaction with each model can be larger than the score gap between models. Calling that setup a fair application comparison hides the confound.
- **Optimization budget is part of evaluation policy.** “Optimize every model” is fair only if budgets, data access, and acceptance rules are comparable. Otherwise the leaderboard rewards whichever candidate received the better search.
- **Metric-facing prompt work can be valuable without proving deeper capability.** Fixing JSON-only output or final-answer placement improves the deployed system, but it should be labeled contract compliance rather than reasoning progress.
- **The best evidence is the repeated rank instability, not any one winner.** Model identities are hidden and MMLU's detailed values are internally inconsistent, so vendor conclusions are unsupported. The general selection-process conclusion is still well supported across heterogeneous tasks.
- **Internal benchmarks raise the stakes and lower auditability.** They demonstrate realistic use cases, but proprietary inputs and ground truths prevent checking contamination, slice balance, judge calibration, or whether gains transfer beyond one company's workloads.

## Questions and Limitations

- **No replicated optimization runs.** The authors explicitly report no standard deviations. A single stochastic search path cannot separate systematic model sensitivity from optimizer noise.
- **One critic, two optimization methods.** GPT-4o supplies all optimization feedback; TextGrad and light MIPRO do not represent the full optimizer design space. Prompts may inherit the critic's conventions rather than the target model's natural interface.
- **Judge–optimizer entanglement.** GPT-4o is both optimizer and judge for Copilot Help Docs and Copilot Consultancy. This can reward prompts and outputs aligned with the same model's preferences, especially because the judge prompt and calibration evidence are not published.
- **Anonymization blocks reproduction.** Exact target models, versions, provider settings, and decoding parameters are missing. “Model A–E” results cannot guide procurement directly.
- **Proprietary data blocks external validation.** The five enterprise datasets, ground truths, retrieval contexts, and judge materials are unavailable. No confidentiality-preserving release or independent audit is offered.
- **Text-to-SQL is apparently contaminated.** All 56 available examples are called test examples while 54 of them also serve as training or validation data. Its optimization gain is not evidence of generalization unless the paper's split description is corrected.
- **Public tasks are narrowed.** OpenBookQA supplies the relevant fact rather than testing retrieval, and MMLU covers only five subjects. Results do not transfer automatically to canonical benchmark leaderboards.
- **Small ranking sample.** Kendall's \(\tau\) is computed over five anonymized models, with ties and no uncertainty intervals. The mean across unrelated datasets has no confidence interval either.
- **Table 3 contains a likely copy error.** Its MMLU optimized and few-shot values exactly duplicate GSM8K and conflict with the prose's stated MMLU winner.
- **The universal-maximum claim conflicts with Table 3.** The paper says every optimizer produces a new maximum for every dataset, but OpenBookQA's instruction-only maximum falls from 97.40% to 97.20%, while its few-shot maximum remains 98.40% before and after optimization.
- **No modern reasoning models.** The authors acknowledge that the study covers chat-style 2024 systems and excludes models such as DeepSeek-R1.
- **No portability or weight adaptation.** The study is black-box and prompt-only; it does not compare prompt optimization with fine-tuning or test whether one model's optimized prompt transfers to another.
- **No deployment cost, safety, or latency analysis.** The experiments optimize task score and do not quantify prompt length, API spend, latency, run-to-run consistency, or safety regressions.

## Vault Ideas Extracted

- Update [Prompt Optimization](/vault/prompt-optimization.md) with per-model optimization as a prerequisite for application-centric model selection, plus the need to report search budgets and negative cases.
- Update [Prompt–Model Drift](/vault/prompt-model-drift.md) with direct evidence that independently optimized prompts can reorder five-model rankings across both public and enterprise tasks.
- Update [LLM Evaluation Methods](/vault/llm-evaluation-methods.md) with the distinction between a shared-prompt capability benchmark and a model–prompt configuration benchmark.
- Update [Joint Prompt–Response Evaluation](/vault/joint-prompt-response-evaluation.md) with parser-facing examples where response correctness and application score diverge because output formatting violates the evaluator contract.
