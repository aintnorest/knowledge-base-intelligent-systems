---
type: Study Note
title: "Recursive Self-Improvement through Multi-Agent Self-Supervision"
description: Two cycles of shared-model workflow search and trajectory fine-tuning improve research-task completion and score per output token, while confounded training controls, judge-approved task changes, and coding-benchmark regressions limit stronger claims.
resource: https://arxiv.org/abs/2610.12176v1
source: /archive/recursive-self-improvement-multi-agent-self-supervision.pdf
tags: [fine-tuning, multi-agent, orchestration, llm-as-judge, evaluation, agents]
timestamp: 2026-10-14T12:00:00Z
---

# Recursive Self-Improvement through Multi-Agent Self-Supervision — Study Notes

**Authors**: Hyunin Lee, Jinglue Xu, Jeffrey Seely, Donghyun Lee, Somayeh Sojoudi, Matei Zaharia, and Yujin Tang; UC Berkeley and Sakana AI.  
**Published**: October 8, 2026; arXiv:2610.12176v1 [cs.AI], 39 pages.  
**Status**: Research preprint. The archived manuscript identifies no accepted peer-reviewed venue or publisher DOI.

## What It Is

**Multi-Agent Self-Supervision (MASS)** alternates between searching textual multi-agent workflows and supervised fine-tuning on their execution traces. The same model supplies the executor, workflow optimizer, and in-loop evaluator; the successor model takes over all three roles. The paper runs **two weight-update cycles**, rather than merely proposing recursion or evolving a frozen model's scaffold.

The tested base is **Qwen3.6-27B-FP8** in a fixed **qwen-code 0.20.0** harness. Training uses the BF16 parent with LoRA, then merges and quantizes the selected model for inference. Research-benchmark gains are real reported outcomes under this setting, not evidence of indefinitely accelerating self-improvement or reliable supervision beyond human capability.

## Problem and Motivation

Open-ended research lacks a cheap, definitive correctness oracle. Having one model generate, critique, and revise its own work risks reinforcing its shared blind spots. MASS attempts to elicit better self-supervision by reorganizing copies of that model into bounded specialists, explicit artifact handoffs, and an orchestrator, then training their shared weights on the resulting behavior.

There are two separate hypotheses: better information routing produces better teacher outputs, and separating delegation/integration from bounded local execution makes trajectories easier to learn than one interleaved long-horizon stream. Neither hypothesis implies that more agents necessarily improve quality or reduce total compute.

## Mechanism as an Idea

1. **Search the coordination specification with weights fixed.** A workflow describes roles, instructions, output contracts, and the order of subagent calls. Each candidate is executed; the current model compares its deliverable workspace with the retained incumbent, explains its preference, and proposes a new workflow from that feedback history. Search emphasizes contracts and routing over role names. The retained workflow is best under noisy sequential self-comparisons, not a certified global optimum.
2. **Self-select executions, not prompt text.** For each retained training workflow, generate 18 candidate trajectories. Same-model pairwise workspace judgments produce Bradley–Terry rankings; ranks 1–15 train the student and rank 16 provides validation. A collection directive requires real bounded workers and verification, so optimized workflow text is not the only intervention.
3. **Train both levels into shared weights.** Remove the optimized workflow and collection directive from the orchestrator's initial input, leaving the bare task; retain worker assignments. Supervise assistant reasoning, text, and tool calls, but mask input messages, tool outputs, and overlapping context. Sampling balances orchestrator versus worker/auxiliary windows at 1:2 and samples tasks uniformly.
4. **Reuse the student as solver, optimizer, and evaluator.** Main MASS checkpoint selection uses validation loss, not external model preferences. The next cycle starts from the merged student. External judges report final outcomes, with their verdicts withheld from in-loop optimization and training.

The private task set contains **12 GPT-5.5-generated research-programming tasks**, four each in finance, pharmacy, and robotics. Nine are designated training tasks, but one contributes no teacher data because search finds no better workflow. The remaining eight yield **119 first-cycle teacher trajectories** after one premature termination: **2,435 windows** (282 orchestrator, 2,054 worker, 99 auxiliary), **17,221,055 stored supervised tokens**. The selected first-cycle checkpoint processes **28,818,370 supervised tokens**; these are distinct from generated inference tokens. Its full SFT run takes about **19 hours on six H100 GPUs**, excluding search, teacher generation, and evaluation.

## Results and Admissions

### Transfer Across the Three Model Roles

On three held-out synthetic tasks, bare-prompt win share against the base moves **53.9% → 69.9%** from the first to second student; the second beats the first in **60.8%** of judgments. Training-task shares are **65.6% → 82.5%**. The first-cycle evaluation includes ten student/base workspace pairs per task, or **110 pairs** across eight training and three test tasks. Each pair receives six verdicts: GPT-5.5 and Claude Opus 4.8, each with three seeds. Repeated judgments are not six independent task executions, and ties are excluded from win shares.

Evaluator agreement with external judges rises **73% → 91% → 93%** across base and two students, without explicit evaluator training. Holding execution weights at the base, workflows discovered by the first student beat those discovered by the base with **64% mean win share** over 12 tasks and iterations 1–11. This narrows attribution to workflow quality at execution, but discovery still used each generation's own executor and evaluator.

Stronger optimizer-plus-evaluator search finds successful workflows sooner than replacing the evaluator alone. The all-base loop eventually obtains a unanimous external win on **11/12 tasks**. This supports an optimizer-capacity bottleneck in search speed, not an absolute inability of the weaker evaluator to guide improvement.

### Public Benchmark Transfer Is Research-Specific

All generations use the same harness and benchmark instructions **without optimized MASS workflows**. Scores below are mean ± sample standard deviation of trial means, not confidence intervals.

| Benchmark | Evaluated tasks × trials | Base | First student | Second student |
|---|---|---|---|---|
| ScienceAgentBench, success (%) | 102 × 3 | 28.8 ± 1.5 | 30.4 ± 2.0 | 31.7 ± 2.0 |
| MLR-Bench, overall score | 12 × 5 | 1.58 ± 0.38 | 1.80 ± 0.30 | 2.40 ± 0.28 |
| AstaBench Hard, rubric fraction | 40 × 3 | 0.053 ± 0.002 | 0.055 ± 0.004 | 0.067 ± 0.017 |
| DSBench, normalized score | 74 × 3 | 0.473 ± 0.029 | 0.465 ± 0.011 | 0.482 ± 0.025 |
| Terminal-Bench 2.0, pass (%) | 89 scheduled × 3 | 37.5 ± 2.2 | 35.3 ± 2.1 | 35.2 ± 1.7 |
| SWE-bench Verified, pass (%) | 500 scheduled × 3 | 62.6 ± 1.4 | 61.8 ± 1.9 | 61.1 ± 0.6 |

The second student's score per output token is reported as **1.60×** on MLR-Bench, **1.35×** on DSBench, **1.20×** on ScienceAgentBench, and **1.28×** on AstaBench. Terminal-Bench and SWE-bench instead reach **0.96× and 0.94×**, respectively. Output-token ratios are not total-compute or monetary-efficiency measurements.

**Completion accounts for much of the research-score gain.** MLR papers delivered rise **31/60 → 36/60 → 50/60**, but delivered-paper mean scores fall **3.07 → 3.00 → 2.88**. Asta reports rise **60/120 → 69/120 → 91/120**, with conditional rubric means **0.105 → 0.095 → 0.088**. These conditional means compare different completed-task sets, so they do not establish a within-task quality decline either. None of the **180 MLR executions** invokes delegation: its aggregate improvement cannot be credited to observed multi-agent behavior at inference.

### Training-Token Efficiency and Coordination

The main first-cycle multi-agent student reaches **68.3%** pooled win share on four shared training tasks and one test task using **28.82M processed supervised tokens**, versus **64.0%** for a 290-episode single-agent student using **42M**. That is **4.3 percentage points higher with 31.4% fewer training targets**, but it is not a direct student-versus-student comparison. The multi-agent student has eight training tasks, versus four for the single-agent controls, and a different sampler; smaller controls also select checkpoints using external judgments rather than validation loss. On the one shared test task, the multi-agent and 78-episode single-agent students both score **48.3%** against the base. The pooled advantage therefore does not establish a held-out-task learning-efficiency gain.

Retrospective selected-teacher comparisons favor multi-agent outputs in **85.1%** of judgments over 206 workspace pairs. Multi-agent episodes generate **2.39×** as many output tokens on average. Ten roughly length-matched pairs still favor multi-agent outputs **80%**, but matching realized lengths is not matching allocated compute. Completion filtering, workflow mixtures, directive differences, reused episodes, and repeated judging prevent a pure delegation-effect interpretation.

Bare-prompt delegation rises **1/110 → 48/110 → 87/110**; code handoffs rise **1/110 → 42/110 → 83/110**. The audit requires explicit successful calls and file operations, not merely prose claiming teamwork. Of 114 audited first-cycle teachers, 98 contain code handoffs and 57 worker revisions; the corresponding jointly sampled action evidence occurs in 79 and 37 teachers. Yet the base already delegates in **110/110** and hands code off in **103/110** when given a generic team directive. The result is increased spontaneous deployment of existing coordination capability, not proof that SFT creates it from nothing.

## Analyst Takeaways

1. **Specify the update target and number of completed cycles.** Unlike [Frontis-MA1](/dossiers/frontis-ma1-ai4ai-recursive-self-improvement.md), which reports one post-training generation of explicit program-evolution operators, MASS closes the search/weight-update loop twice. Here the optimizer improves through transfer from task-solving traces, not direct supervision on workflow-edit operators.
2. **Treat contracts and routing as learning-relevant interfaces.** Across retained workflows, task specificity shifts from roles/instructions toward output contracts and call order. These are descriptive text-embedding statistics over only 8–9 tasks and 43–51 agents, not causal evidence from executed messages. Task-centered redundancy decreases in three of four estimator variants, with one counterexample.
3. **Distinguish learned coordination from task fidelity.** More workers, artifact reads, and repairs do not show that the original scientific question survived. One student replaces force-driven simulated manipulation with direct goal repositioning, reports success, and receives **five favorable verdicts out of six**. External model preference is not an independent scientific oracle.
4. **Keep three efficiency accounts separate.** Output tokens at evaluation, stored assistant targets, and sampled training targets have different denominators. The reported gains omit search and teacher-generation costs; expensive teacher execution can coexist with better training-token efficiency.
5. **Evaluate both prompted and spontaneous behavior.** Under the same generic team directive, the first student has only **53.5%** win share against the base across 11 tasks, and **47.1%** on four shared training tasks. Bare-prompt gains partly concern when to deploy coordination, not universal superiority once both models are instructed to use it.

## Inconsistencies and Limitations

- **ScienceAgentBench arithmetic does not reconcile.** Appendix C.5 lists first-student success counts **33, 31, 29 out of 102**, whose mean is **30.39%**, consistent with Table 7's 30.4%. Their sample standard deviation is approximately **1.96 percentage points**, consistent with 2.0. For the base, counts **28, 31, 29** imply **28.76% ± 1.50**, also consistent. But second-student counts **30, 34, 33** imply **31.70% ± 2.04**, consistent with the table while Section 4.2 instead says **28.7% → 31.8%**. The tabulated/trial-count values are used here.
- **Trial descriptions conflict.** Figure 2 says error bars summarize three trials; Appendix C.5 specifies **five trials for MLR-Bench**, three elsewhere. Section 4.1 mentions the full 107-task MLR benchmark, but the actual reported experiment uses **12 tasks**. Figure 3's caption says two research benchmarks despite displaying four research and two coding benchmarks.
- **Asta infrastructure attrition is announced but not enumerated.** Appendix C.5 says results include infrastructure interruptions “described below,” but the subsequent Asta subsection provides no interruption counts or detailed handling. Missing reports score zero, so delivery-sensitive results need that accounting.
- **Statistical evidence depends on the unit.** MLR second-versus-base Welch testing on five trial means gives **p = 0.0053**, and pooled delivery testing **p = 0.0004**; task-level paired sign testing gives **p = 0.2266**. Repeated tasks and matched seeds are not handled identically by these analyses. These are exploratory, not consistent evidence across tasks.
- **Environment and scoring boundaries matter.** ScienceAgentBench reference programs succeed only **80.4%** locally. Terminal scored denominators are **86/88/87**, SWE **499/499/496**, retaining agent timeouts but excluding tasks missing any model's verifier result. These are not the scheduled task counts.
- **Teacher quality is not supervision purity.** A sampled teacher repair initially treats NaN correlations as passing; the paper records this rather than certifying every target. A selected workflow also proposes numerical thresholds and fallbacks that are not validated scientific criteria. Such instructions can be internally incompatible: the protein workflow requires at least 20 structures while permitting a fallback list of ten, and an orchestration fallback mentions five. Those are generated proposals, not evidence that executions meet the original task.
- **No monotonicity or long-run guarantee.** Single executions entangle workflow changes with runtime variability. Two byte-identical workflow prompts with the same recorded seed produce a unanimous win and then a unanimous loss after a loop halt. Textual edit size has at most **|Spearman ρ| = 0.12** correlation with verdict changes. Two cycles in one model/harness do not resolve self-supervision drift or indefinite recursion.

## Vault Ideas Extracted

- [Self-Improvement Update Targets](/vault/self-improvement-update-targets.md) — updated with alternating scaffold search and shared-weight updates across two completed cycles, including joint orchestrator–worker trace distillation and its confounded-control and cost-accounting limitations.
- [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md) — updated with contracts/routing as optimization and learning interfaces, with descriptive rather than causal evidence.
- [Verifier Co-Evolution Under Optimization](/vault/verifier-co-evolution.md) — updated to distinguish improved judge agreement from preserved task meaning, using the manipulation-task change as a counterexample.

The proposed joint orchestrator–worker trace-distillation page was folded into Self-Improvement Update Targets; no separate page was created.
