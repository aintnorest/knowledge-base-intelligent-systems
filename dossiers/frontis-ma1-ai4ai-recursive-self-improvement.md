---
type: Study Note
title: "Frontis-MA1: Training an AI4AI Model towards Recursive Self-Improvement in Machine Learning Engineering"
description: Study notes on OpenMLE and Frontis-MA1, which post-train four atomic program-evolution operators on execution feedback and compose the same operators into experience-guided long-horizon search for machine learning engineering.
resource: https://arxiv.org/abs/2607.28568v1
source: /archive/frontis-ma1-ai4ai-recursive-self-improvement.pdf
tags: [self-improvement, reinforcement-learning, agents, coding-agents, agent-harness, test-time-scaling]
timestamp: 2026-08-11T17:30:00Z
---

# Frontis-MA1: Training an AI4AI Model towards Recursive Self-Improvement in Machine Learning Engineering - Study Notes

**Authors**: Junlin Yang, Che Jiang (project leads), Yu Fu, Tianwei Luo, Can Ren, Weizhi Wang, Kaikai Zhao, and 16 others; Kaiyan Zhang (corresponding)
**Affiliations**: Horizon Research, Frontis.AI; Tsinghua University; Zhejiang University; Shanghai Jiao Tong University; Georgia Institute of Technology
**Venue**: Technical report; arXiv:2607.28568v1 [cs.CL]
**Date**: July 30, 2026
**Pages**: 61

## What It Is

A technical report on **OpenMLE**, a three-layer open stack for machine learning engineering (MLE) agents, and on **Frontis-MA1-35B**, the model post-trained on it. The framing is AI4AI: use AI to build AI, with recursive self-improvement (RSI) as the limiting goal. MLE is chosen as the testbed because every step is executable and scored.

The organizing idea is a single **operator interface shared between training and inference**. Four atomic program transformations — `Draft`, `Improve`, `Debug`, `Crossover` — are the units the model is trained on *and* the units the search harness composes. Training data comes from verified evolutionary transitions; the trained model then becomes the variation engine of the evolutionary harness. The authors call the resulting coupling **meta-evolution**: not just an agent that evolves programs, but a trained improver.

The three layers:

- **OpenMLE-Gym** — 5,758 quality-gated executable tasks with sandboxed execution, structured feedback, and per-task evaluators.
- **OpenMLE-ERL** — execution-grounded SFT plus RL on the four operators.
- **OpenMLE-Evo** — long-horizon evolutionary search over a task-local program database, guided by structured experience.

## The Problem It Attacks

Prior MLE work splits into three strands that rarely meet: inference-time harnesses (AIDE, AIRA, AIRA2), executable task environments (MLE-Dojo, MLE-Smith, MLGym), and execution-feedback post-training (ML-Agent, MLE-RL, AceGRPO). The authors' Appendix Table 11 audits public release surfaces across 18 systems and finds that no prior work releases the full combination of data, sandbox, training code, RL method, evaluation, and weights. Their entry is the only row with all six ticks.

The technical gap they name is more specific than "openness": a policy trained on full trajectories is tied to one controller and gets sparse, controller-specific supervision. Training *local operators* instead lets any search procedure compose them, and lets the supervision come from individual verified transitions.

## OpenMLE-Gym

**Construction.** Three source paths trade quality against scale: 156 manually Curated Anchors, 3,362 tasks generated from Kaggle Datasets (extending MLE-Smith), and 2,240 from Kaggle Competitions. The competition funnel runs ~11,000 Meta Kaggle competitions → 3,972 eligible after leaderboard-length, licensing, and MLE-Bench-overlap screening (36%) → 2,839 executable packages (26%) → 2,240 after a semantic quality gate (20%).

**Package contract.** Every task normalizes to `raw/` (original assets), `data/public/` (agent-visible), `data/private/` (hidden answers), and `utils/{prepare.py, metric.py}`. Environment semantics are stated explicitly as state/action/transition/observation/reward. The sandbox returns six feedback modes — success, runtime error, missing code, missing submission, scoring failure, timeout — so the agent can distinguish invalid execution from weak performance.

**Quality gate.** An LLM filter judges each package on task validity, data sufficiency, raw-data usage, task complexity, and data quality. Only packages receiving the strict recommendation survive, and only after executability validation — the two checks are deliberately separated.

Licensing forces a partial release: full task data for 1,415 tasks, `prepare.py`/`metric.py` only for the remaining 4,343.

## OpenMLE-ERL

**SFT.** 26,259 examples: 17,245 full-response Draft solutions from a parallel sampling path, plus 9,014 trajectory-step examples from an evolutionary path. By operator: Draft 19,436, Debug 4,340, Improve 1,741, Crossover 742. Collection is **budget-adaptive** — it stops at an accepted-example quota *or* an execution budget, so easy tasks exit early and sparse-success tasks keep their attempts. A separate LLM annotator decides which steps of a repair trace are worth keeping, with hard filters that discard any step doing `pip install`, `sys.path` mutation, or external downloads. Full-parameter SFT on SLIME/Ray/Megatron-LM, 32,768-token cutoff, bf16, global batch 128, lr 3e-5, 3 epochs.

**RL.** SLIME/Ray/SGLang, GSPO with TTT-Discover-style reward post-processing, clip ε = 3.5e-4, TIS enabled. Operators are sampled at Draft 0.50 / Improve 0.17 / Debug 0.17 / Crossover 0.16. Rollout groups are 16 prompts × 16 samples. Three design choices carry the section:

1. **Adaptive reward bounds.** Fixed theoretical or leaderboard extrema are usually far wider than the region the current policy reaches, collapsing meaningfully different programs to near-identical rewards. Instead the bounds track the on-policy score frontier: upper bound = best observed score, lower bound = the 16th-best, extended downward by 25% of the gap, then clamped by static bounds when metadata supplies them. Scores below the lower bound map to zero.
2. **Entropic advantage.** Rather than GRPO-style group normalization, rewards are centered by the group max and passed through a softmax whose temperature β is chosen by binary search so that KL(q ‖ Uniform) ≈ log 2, with a leave-one-out denominator. This concentrates the learning signal on the group's best candidate — reported mean processed advantage for the best candidate rises from 1.58 to 6.39 (4.0×).
3. **Asynchronous rollouts.** Sandbox execution, not token generation, dominates latency, and runtimes vary by orders of magnitude. Completed generation-and-execution groups are consumed from a queue rather than waiting for the slowest job in a batch. Measured over 40 matched steps: 97.0 min → 50.8 min mean step time (1.91×), with per-task step counts staying within ±2 of the run median (CV 1.56% and 2.06%).

RL also has to pick *which program state* an operator practices on. Parent fitness sums normalized parent reward, normalized variance of the parent's children's rewards, and a visit-based cooling term — exploiting strong parents, targeting states where operator outcomes are still informative, and preventing one incumbent from monopolizing the budget.

**Reward hacking.** The authors observed models plateauing at low reward on hard tasks by shuffling the sample submission and submitting it. Mitigation: an o3-mini judge inspects code *before* sandbox execution; detected hacks bypass execution and receive −0.5.

## OpenMLE-Evo

An AIRA-Evo-style population loop, redesigned around how execution evidence is stored and spent.

- **Structured experience.** Each evaluated node gets a deterministic **experience card** (provenance, score, delta vs. parent, method family, rank, runtime, resources); cards aggregate into a task-global **experience board** (family-wise bests, underexplored directions, repeated failures, score trends, parent graph).
- **Three-factor parent selection.** Original AIRA-Evo samples parents by normalized fitness alone, concentrating expansion on the incumbent. OpenMLE-Evo scores candidates by a weighted sum of normalized validation score, normalized improvement over the strongest parent, and method-family novelty, then samples by softmax.
- **Operation-triggered memory synthesis.** AIRA-Evo eagerly summarizes every evaluated node with an LLM — spending budget on nodes never selected, and producing the summary before the decision context that should shape it exists. OpenMLE-Evo defers natural-language synthesis until an `Improve`, `Crossover`, or `Debug` call has chosen its nodes, then summarizes only those and caches the result.
- **Operator-conditioned context.** `Improve` gets the node's record plus a vertical trace of ancestors and a horizontal set of siblings ranked by the same score/gain/novelty utility. `Crossover` applies this to both parents and adds a method-family complementarity cue. `Debug` retrieves prior attempts with the same error signature. The prompt also states remaining search budget, remaining steps, and per-run execution limit.

**OpenMLE-Evo-Max** adds two things at once: cross-task priors distilled from public competition artifacts (MLE-Bench sources excluded), and asynchronous multi-GPU parallel search at unchanged total sandbox compute.

## Results

Evaluation is MLE-Bench Lite (22 tasks), three runs, **12 hours per task on a single RTX 4090 capped at 12 GB VRAM** — a notably smaller sandbox budget than most reported MLE-Bench runs. Metrics: Valid Rate (x/22), Medal Average, Human Rank (fraction of human leaderboard participants beaten).

| System | Framework | Valid | Medal Avg | Human Rank |
|---|---|---|---|---|
| Qwen3.6-35B-A3B (base) | OpenMLE-Evo | 19.67/22 | 39.39% | 0.5828 |
| Frontis-MA1-35B | OpenMLE-Evo | 21.67/22 | 60.61% | 0.7647 |
| Frontis-MA1-35B | OpenMLE-Evo-Max | 22.00/22 | **71.21%** | 0.8126 |
| Qwen3-30B-A3B-Thinking (base) | OpenMLE-Evo | 17.33/22 | 34.85% | 0.5573 |
| Frontis-MA1-30B | OpenMLE-Evo | 21.67/22 | 53.03% | 0.7055 |
| Frontis-MA1-30B | OpenMLE-Evo-Max | 22.00/22 | 66.67% | 0.8053 |
| GPT-5.6 Sol | Codex | 22.00/22 | 72.73% | 0.8891 |
| Kimi K3 | Claude Code | 22.00/22 | 72.73% | 0.8574 |
| GPT-5.5 | Codex | 21.00/22 | 68.18% | 0.7833 |

Post-training adds **+21.22 points** at 35B and **+18.18** at 30B under an identical harness. Search adds roughly another 10–14 points on top. Holding the model fixed, OpenMLE-Evo beats general coding-agent scaffolds across four frontier models (GLM-5.2: 59.09 → 62.12; MiniMax M3: 54.55 → 59.09; Kimi K2.6: 59.09 → 66.67; MiniMax M2.7: 45.50 → 50.00) and beats original AIRA-Evo on Frontis-MA1-35B (53.03 → 60.61). Medal-tier decomposition shows the gains shift solutions toward Gold rather than just crossing the Bronze threshold.

**Search efficiency**, same checkpoint, same seed, 66 matched task–runs vs. original AIRA-Evo: total tokens 129.3M → 75.3M (−41.7%), prompt tokens 83.5M → 41.5M (−50.3%), but evaluated nodes only 3,430 → 3,004 (−12.4%). Because the token saving is much larger than the node reduction, the saving comes from making each expansion cheaper, not from searching less. New-best validation updates rose 229 → 246, i.e. 1.77 → 3.27 per million tokens (+84.3%), and the fraction of `Improve` calls that set a new best rose 4.73% → 9.36%. Mean `Improve` prompt length fell 102.8K → 35.7K characters, with the 99th percentile falling 389.0K → 54.3K (−86.1%) — the compression is concentrated in the tail, which is what you would expect if long histories were previously being re-serialized into every request.

**Long-horizon behavior.** On `leaf-classification`, late `Improve` and `Crossover` operations account for 85.0% of total validation gain, ending at held-out Human Rank 0.9455 (Bronze) against a base model's 0.183 with no medal. On `mlsp-2013-birds` the same two operators account for 91.9%, ending at 0.8889 held-out (Silver). Two grounded case studies show the intended mechanisms: on `nomad2018`, a targeted `Crossover` of a physics-feature parent and a robust-parser parent beats seven successive `Debug` steps on one lineage (held-out RMSE 0.05410 vs 0.06096); on the right-whale task, three-factor selection raises a high-gain but sixth-ranked parent's selection probability from 10.47% to 17.09%, and its child reaches held-out AUC 0.99386 against score-only selection's 0.94852.

**Transfer.** Modality-stratified MLE-Bench results show gains in all five groups (+14 medals split +2/+4/+1/+4/+3 across image/text/tabular/audio/multimodal). On NatureBench Lite (10 tasks distilled from Nature-family papers, 4h budget, web search disabled), the two components separate cleanly: with the framework fixed, swapping the base model for Frontis-MA1-35B raises Match-SOTA 5/10 → 7/10; with the model fixed, swapping AIRA-Evo for the OpenMLE-Evo adapter raises it 2/10 → 5/10.

## Analyst Takeaways

1. **The operator interface is the actual contribution.** Making the trained unit identical to the composed unit is what lets verified search transitions serve as supervision without controller-specific credit assignment. This is transferable to any agent whose harness has a small, stable vocabulary of moves — the harness stops being a prompt wrapper and becomes a training target.
2. **Reward scale is a design decision, not a normalization detail.** Pinning rewards to leaderboard extrema would have made this training signal nearly flat. Deriving bounds from the policy's own recent score frontier is the difference between discriminative feedback and noise, and it is the kind of thing that silently ruins an RLVR run on continuous heterogeneous metrics.
3. **Memory should be built at the moment of use.** The AIRA-Evo comparison is the cleanest evidence in the paper: summarizing lazily and conditioning retrieval on the operator about to run cut prompt tails by ~86% while *increasing* useful discoveries per token. Eager summarization pays for nodes that are never selected and cannot know what the future decision needs.
4. **Non-greedy expansion preserves complements.** Both mechanism case studies turn on keeping a structurally different, lower-scoring branch actionable. Pure score-softmax selection is a local optimizer; the gain/novelty terms are cheap insurance against discarding the parent that would have made a good crossover.
5. **"Recursive" is still aspirational here.** MA1 is generation 1. The loop that trains the improver was run once — nothing in the paper closes it twice, and the evolutionary system itself is explicitly fixed. This is a well-instrumented single turn of a crank that is claimed to be recursive, and the authors say so directly.

## Questions and Limitations

- **Small denominators.** MLE-Bench Lite is 22 tasks; one task is ~4.5 points of Medal Average. NatureBench Lite is 10 tasks. Differences of 3–5 points between systems should not be read as ordering evidence.
- **Cross-system comparisons are not budget-matched.** The GPT-5.6/Kimi K3/GPT-5.5 rows come from an external runs registry with different hardware and wall-clock budgets; the paper states this explicitly and does not normalize to FLOPs. The headline "exceeds GPT-5.5 + Codex" compares two different model–harness systems, not two models.
- **Evo-Max bundles two changes.** Cross-task experience priors and asynchronous multi-GPU parallel search are introduced together and never ablated apart, so the 60.61 → 71.21 jump has no attribution.
- **Medal Average and Human Rank can disagree.** GLM-5.2 gains medal average moving from Claude Code to OpenMLE-Evo (59.09 → 62.12) while its Human Rank *falls* (0.7948 → 0.7069). Medal thresholds are step functions; a harness can cross more thresholds while producing worse solutions on average.
- **Contamination control is procedural, not verified.** MLE-Bench-overlapping competitions are excluded and training data is deduplicated against evaluation benchmarks, but there is no leakage audit. Kaggle-derived tasks and Kaggle-derived evaluation share a substrate.
- **The reward-hacking fix is unmeasured.** An o3-mini pre-execution judge is a sensible gate, but no false-negative or false-positive rate is reported, and reward hacking was found by case study rather than by a systematic detector. A judge inside the reward path is itself a surface for optimization pressure.
- **Transfer is real but modest.** On NatureBench Lite the full system reaches 3/10 Surpass-SOTA while Claude Opus 4.7 and GLM-5.2 with Claude Code reach 7/10 and 10/10 Match-SOTA. The controlled comparison supports "both components transfer"; it does not support "this system is competitive on scientific AutoResearch."
- **The improver improves solutions, not ideas.** The authors' own first limitation: the reward reveals whether a program works, not whether a research direction is worth pursuing. Every optimization pressure in the system points at final score.

## Vault Ideas Extracted

* [Trained Program-Evolution Operators](/vault/trained-program-evolution-operators.md)
* [Operator-Conditioned Search Memory](/vault/operator-conditioned-search-memory.md)
* [Quality–Progress–Novelty Parent Selection](/vault/quality-progress-novelty-parent-selection.md)
* [Policy-Adaptive Reward Bounds](/vault/policy-adaptive-reward-bounds.md)
