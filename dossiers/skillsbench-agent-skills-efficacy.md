---
type: Study Note
title: "SkillsBench: Benchmarking How Well Agent Skills Work Across Diverse Tasks"
description: Paired deterministic task evaluations across models and harnesses find large but uneven gains from curated skills, regressions on brittle pipelines, and losses from self-generated packs.
resource: https://arxiv.org/abs/2602.12670v4
source: /archive/skillsbench-agent-skills-efficacy.pdf
tags: [agent-skills, benchmark, evaluation, coding-agents, agent-harness, agents]
timestamp: 2026-09-24T03:44:03Z
---

# SkillsBench: Benchmarking How Well Agent Skills Work Across Diverse Tasks — Study Notes

**Authors**: Xiangyi Li, Yimin Liu, Wenbo Chen, Bingran You, Zonglin Di, Yifeng He, Shenghan Zheng, Kyoung Whan Choe, Jiankai Sun, and many collaborators  
**Venue**: arXiv:2602.12670v4 [cs.AI]  
**Date**: June 14, 2026  
**Pages**: 42

## What It Is

A paired benchmark for the *marginal value of supplied Agent Skills*, not another stand-alone agent leaderboard. Its current inventory is **87** containerized tasks in **eight** domains, each with a human-authored instruction, expert-curated skill package, withheld oracle and deterministic `pytest` verifier. The latest aggregate compares no-skill against curated-skill conditions across **18 model–harness configurations**, with three selected trials per task/condition/configuration. The PDF's first-page author block is unusually long, but its actual title is clearly “SkillsBench: Benchmarking How Well Agent Skills Work Across Diverse Tasks.”

## Method and Scope

The agent sees identical task input and environment except for the mounted curated `skills/` directory. BenchFlow runs a fresh pinned Docker container and logs trajectories; pass rate is task-macro averaged over the fixed three-trial denominator. Four terminal-agent harnesses appear: OpenHands, Gemini CLI, Claude Code and Codex CLI. The benchmark includes **16 software-engineering**, **14 natural-science**, **14 industrial/physical**, **14 office**, **9 finance/economics**, **8 mathematics/OR**, **7 cybersecurity**, and **5 media/content** tasks. Authors screen task proposals for oracle executability, skill-to-solution leakage and maintained separation between conditions; maintainers review submissions after automated gates.

A third arm has agents author skill packs using a skill-creator and then solve with *those* packs; it is run only on three dedicated-harness configurations, not all 18. Curated skills are a deliberately high-quality treatment, not a representative random sample of public marketplace skills. The paper's older cited versions and related papers report different inventory counts; use the **87-task, eight-domain v4** figures for this dossier.

## Headline Results

- The fleet mean increases from **33.9% no-skill** to **50.5% curated**: **+16.6 percentage points**, reported normalized gain **25.5%**. Configuration-level gains range **+4.1 to +25.7 points**. Of **9,396** selected public trials, **78 (0.8%)** have unscored runtime errors, counted as failures in the main aggregate.
- The gains vary by domain: natural science **+28.8 points**, media/content **+24.1**, cybersecurity **+18.9**, and software engineering **+11.6**. Do not transfer the fleet average to coding tasks; the software slice's gain is smaller and comprises 16 selected tasks.
- **13/87** tasks have negative curated-skill deltas. Exam-block-sequencing and suricata-custom-exfil each fall **7.4 points**. Trajectory audits identify a heavyweight recipe displacing a simpler solution, a skill suppressing a better default strategy, or a brittle solver/framework the agent cannot debug.
- Task groups with **one** skill gain **+18.0 points**; **two or three** gain **+19.0**; **four or more** gain **+10.1**. Documentation-size buckets show **+19.0** compact, **+21.5** standard, **+14.5** detailed, and **+0.7** comprehensive. These are observational comparisons across different task groups, not randomized length/dose effects.
- On the three self-generated conditions, scores fall *below no-skill* by **−8.1**, **−11.3**, and **−11.5 points** (Claude Code/Opus 4.7, Codex/GPT-5.5, Gemini CLI/Gemini 3.1 Pro). In a small audited subset, packs go undiscovered, creator work displaces solver work, or confidently wrong advice is followed; the cited 3D-unit error was affected by a later verifier patch.
- Harness choice changes the realized score for the same named model: Gemini 3.1 Pro with skills scores **60.8%** under Gemini CLI versus **52.8%** in OpenHands; Opus 4.7 **61.2%** in Claude Code versus **53.1%** in OpenHands. Tooling, discovery and trajectory management are part of the treatment.

## Analyst Takeaways

1. **Keep a paired no-skill baseline for every skill decision.** Use the same task, verifier, model, harness and environment; a useful-sounding skill can lower task success.
2. **Package narrow procedural leverage.** Specific parsing quirks, calibrated scripts, format constraints, algorithmic invariants and validation checks beat exhaustive documentation on these tasks; state when a heavyweight path is justified and give a simpler fallback.
3. **Audit actual discovery and consumption.** A generated pack not loaded by the solver offers no benefit. Distinguish writing a skill, routing to it, using it correctly and passing the verifier.
4. **Preserve code-quality guardrails.** This paper measures verifier pass/fail; a task-level gain does not automatically imply a readable, secure or maintainable patch. For a light software factory, pair skill trials with existing repository tests and human code review.
5. **Evaluate across the intended harness/model and budget.** Cost and token use move in both directions by configuration; the reported skills effect is conditional on how that specific runner loads and executes artifacts.

## Questions and Limitations

- Curated tasks may favor the supplied expert packages and reject low-signal submissions, so real-world unscreened skills and general developer workloads can have smaller or negative effects.
- Longer text provides more context as well as procedure; the paper lacks a fully length-matched irrelevant-text or retrieval-only control isolating the causal ingredient.
- Grouped skill-count/length results confound content with task difficulty, domain and authoring choices. They motivate local ablations rather than proving a universal three-skill or line-count cap.
- Self-generated skill deficits mix creation overhead, pack quality and discovery failure. The small trajectory audit is illustrative, not a population attribution.
- Docker isolation, deterministic verifiers and repeated trials reduce but cannot eliminate nondeterminism, contamination, grader errors or construct mismatch. The v4 revision should not be silently conflated with earlier 86-task/11-domain reports.

## Vault Ideas Extracted

* [Evaluated Skill Routing](/vault/evaluated-skill-routing.md)
* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
* [Progressive Skill Disclosure](/vault/progressive-skill-disclosure.md)
* [Skill Artifact Quality Gates](/vault/skill-artifact-quality-gates.md)
