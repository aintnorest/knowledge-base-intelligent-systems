---
type: Study Note
title: "Demystifying Agent Skills: Why They Work—Until They Don’t"
description: Matched agent trajectories isolate skill representation, outcome labeling, cross-harness transfer, invocation failures, and retrieval-pool effects.
resource: https://arxiv.org/abs/2608.14036v1
source: /archive/demystifying-agent-skills-why-they-work.pdf
tags: [agent-skills, evaluation, agent-memory, generalization, coding-agents, agents]
timestamp: 2026-09-24T03:44:03Z
---

# Demystifying Agent Skills: Why They Work—Until They Don’t — Study Notes

**Authors**: Zhiyuan Jiang, Fangrui Huang, Hanwen Xing, Xander Wu, Yipeng Gao, Rui Cao, Mengdi Wang, Shilong Liu, and Yijiang Li  
**Venue**: arXiv:2608.14036v1 [cs.AI]  
**Date**: August 14, 2026  
**Pages**: 28

## What It Is

A controlled, trajectory-level study asking *why* procedural skill packages sometimes help more than direct workflow memory. The authors form skills and workflow memories from the same pools of successful and failed prior executions, run matched tasks in Docker on Terminal-Bench 2.0, SkillsBench, and Terminal-Bench-Pro with Codex and Gemini CLI configurations, and inspect agent trajectories. The normalized corpus is **8,135 trials**; **238** unique valid open-coded labels (from 240 sampled records) underpin a three-class, **12-mode** mechanism taxonomy. It is about causal *comparison of representations in a specific experimental setup*, not a guarantee that skill files always outperform no skill.

## Study Design

The same trace pool is turned into a raw/no-prior baseline, a cleaned workflow memory, or a reusable `SKILL.md`. The mixtures range from five successes/zero failures to zero successes/five failures. A separate ablation hides source-trajectory outcome labels while constructing skills, testing whether the generator knows which experience was productive. A cross-framework arm builds the procedure in one agent setup and executes it in another.

Skill-library evaluation uses three **independent** arms with the same task and candidate-pool design: embedding ranking without execution, explicit model selection without execution, and full-pool execution with actual skill-read/use parsing. Outputs of the first two arms are **not passed** into the third. Each pool contains a task's annotated ground-truth skill plus random, semantically similar or dissimilar distractors; sizes range **5–100**. Consequently, “retrieval precision” and “task success” measure different things, not successive stages of one deployed pipeline.

## Key Results and Mechanisms

- Across **528** matched taxonomy triples, oracle-status success is **312/528 (59.1%) raw**, **295/528 (55.9%) workflow memory**, and **327/528 (61.9%) skill**. The stronger paired comparison is skill over workflow memory: **+6.06 percentage points**, bootstrap 95% CI **[+0.76, +11.36]**. The smaller raw-to-skill difference should not be exaggerated.
- The mechanism label `procedural_anchor` accounts for **65.7%** of skill-case classifications, while `knowledge_injection` accounts for **4.5%**. These are *coded attribution proportions*, not randomized estimates of the causal share of success. Skills stabilize environment setup, action order, output constraints, and intermediate checks rather than primarily inserting unknown facts.
- Execution/verification-failure modes (SC2) fall from **37.3% raw** and **33.3% workflow memory** to **23.5% skills**. Environment/infrastructure failure falls **5.3% → 0.2%** raw-to-skill; output schema mismatch **7.4% → 3.2%**. In contrast, algorithmic logic error remains **8.3% raw / 7.4% skill**, and static verification without real runtime checks **12.5% raw / 11.7% skill**.
- Skills create an applicability cost: `skill_guidance_misapplied_or_ignored` appears in **10.0%** of skill cases versus **0.8% raw** and **0.4% workflow memory**. Conversely, workflow-memory timeout exhaustion appears in **10.6%** versus **4.4%** with skills and **1.7%** raw. Compression reduces trace residue but requires judgment about when *not* to apply a procedure.
- When the skill generator sees failed trajectories without outcome labels, it can encode failed behaviors as advice. Gemini on Terminal-Bench-2 at the **3-success/2-failure** mixture scores **0.7462** with labels versus **0.4000** without. This difference is smaller when all source traces succeed.
- In full-pool execution, averaged actual-use precision drops from **29.6%** at five candidates to **3.3%** at 100, while averaged task success changes only **36.4% → 39.3%**. Similar distractors damage offline top-1 embedding identification more than random/dissimilar ones: **70.5% → 53.4%** across 5–100 candidates, versus **97.7% → 84.1%** random. Exact annotated skill invocation is neither necessary nor sufficient for measured completion.

## Analyst Takeaways

1. **Distill procedures, not transcripts.** Capture the successful setup, branch conditions, checks and known pitfalls; keep failed attempts labeled so they do not become instructions by accident.
2. **Prioritize repeated operational mistakes.** A short verified skill for environment, format, lifecycle or test-path failures has a stronger mechanism story than a generic “think harder” skill.
3. **Test no-skill, direct-memory and skill conditions together.** A skill may beat direct memory while barely beating raw execution; report quality, token/runtime costs, and misapplication, not an isolated success story.
4. **Measure load, actual use and outcome separately.** Retrieval precision collapses in crowded libraries while completion remains stable, so a routing metric alone will overstate or understate product value.
5. **State applicability and exit conditions.** A procedural anchor becomes a brittle wrong turn when the current repository, environment or verifier differs from the source trajectory.

## Questions and Limitations

- The benchmark set emphasizes terminal-based, tool-using work and a small number of model–harness pairings; results may not transfer to GUI or open-ended collaboration.
- The behavioral taxonomy codes only a stratified ~**3%** of normalized records, and model-assisted labeling with a human check can undercount rare modes.
- Skill content, length, normalization and generator choices jointly shape the representation effect. The paired design is informative but not a pure experiment on one atomic feature of SKILL.md.
- Exact ground-truth matching can undervalue related but useful skills, while task-verifier success can miss process harms. Cross-harness transfer and actual-use parsing depend on the instrumentation of these agent CLIs.

## Vault Ideas Extracted

* [Evaluated Skill Routing](/vault/evaluated-skill-routing.md)
* [Evolving Context Playbooks](/vault/evolving-context-playbooks.md)
* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
* [Skill Artifact Quality Gates](/vault/skill-artifact-quality-gates.md)
