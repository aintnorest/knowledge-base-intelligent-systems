---
type: Study Note
title: Agentic coding and persistent returns to expertise
description: Anthropic's transcript analysis associates task-specific expertise with longer delegated action chains and better session outcomes across occupations, while distinguishing inferred success from real-world software value.
resource: https://www.anthropic.com/research/claude-code-expertise
source: /archive/anthropic-agentic-coding-returns-to-expertise.html
tags: [coding-agents, human-in-the-loop, evaluation, verification, agents]
timestamp: 2026-10-05T21:48:37Z
---

# Agentic coding and persistent returns to expertise — Study Notes

**Authors**: Zoe Hitzig, Maxim Massenkoff, Eva Lyubich, Shaoyi Zhang, Ryan Heller, and Peter McCrory; Anthropic  
**Published**: June 16, 2026  
**Status**: First-party observational research post, not an independently peer-reviewed experiment. The archived page's exact title differs from the task's descriptive label “How Claude Code is used in practice.”

## What It Is

A privacy-preserving analysis of approximately **400,000 interactive Claude Code sessions from 235,000 people**, covering **October 2025–April 2026**. Model classifiers describe tasks, decision attribution, apparent task-specific expertise, inferred occupation, and session outcomes. The report examines how human judgment and automated implementation divide the work, not simply how long the agent runs unattended.

Its central association is that greater domain understanding accompanies more productive steering: experts elicit more actions per instruction and reach stronger transcript-based success signals more often. Most of the outcome gradient occurs between novice and intermediate, rather than intermediate and expert.

## Problem and Motivation

Coding agents may lower implementation barriers without eliminating the need to define the problem, identify edge cases, and judge completion. Occupational identity and expertise at the current task are different: an accountant can understand reconciliation rules while lacking Python experience; an experienced engineer can be new to a particular language.

Benchmark capability, automatic action approval, decision authority, agent activity, and actual delivered value are also different constructs. Measuring one as a substitute for the others obscures which human skills still matter.

## Mechanism as an Idea

The analysis separates **planning decisions**—what to do, approach, and completion criteria—from **execution decisions**—files, code, language, and commands. A classifier identifies meaningful decisions and assigns each to the user or Claude. On average, users make about **70% of planning decisions and 20% of execution decisions**. This is transcript attribution, not an enforcement guarantee about ownership.

Apparent expertise is rated on five levels using specificity of directions, requested checks, and who corrects whom. Task expertise is therefore inferred from the same interaction that supplies outcome evidence; it is not a pre-session independently measured qualification.

Success has two principal levels:

- **Judged success**: a classifier decides whether the session accomplished its goal, partially accomplished it, failed, or lacked a clear goal.
- **Verified success**: judged success plus at least one hard transcript-visible success signal, such as passing tests or corresponding version-control activity. Companion classifiers grade positive and negative evidence; explicit user affirmation also contributes to evidence classification.

Most classifiers use **Claude Sonnet 4.6**. Telemetry cross-checks and comparisons with a reference model offer validation evidence, but do not turn classifier agreement into independent ground truth. Researchers report observing aggregates rather than reading individual transcripts.

## Results and Admissions

**Activity and division of labor:** A typical session has about **four turns**; each prompt triggers roughly **10 actions** on average, with a long tail. About **2% of sessions average over 100 actions per prompt**. Novice-rated sessions elicit about **five actions and 600 output words per prompt**, compared with **12 actions and 3,200 words** for expert-rated sessions. Controlled regressions retain associations of **+9% actions and +13% output per expertise level**, with user-clustered standard errors and **p < 0.001** for the upward trends. More actions or words are not themselves evidence of better code.

**Outcomes:** Excluding the **7.7%** of sessions judged to have no clear goal, adjusted novice verified success is about **15%**, versus **28–33%** for intermediate through expert. At least partial success is **77%** versus **91–92%**. Comparisons adjust for work mode, task-value band, month, task subject, and software-related versus other occupations; adjustment reduces some confounding but cannot establish causality.

**Recovery from trouble:** In sessions with strong failure evidence, verified success rises from about **4% for novices to 15% for experts**; at least partial success is **60% versus 80–81%** for intermediate through expert. “Abandoned” means judged failure with zero code lines written: **19%** for novices versus **5–7%** for the other levels. This operational definition is imperfect for non-code work and is not an observation of users permanently abandoning a project. Experts hit trouble less often; their troubled tasks have roughly twice the estimated value of novice troubled tasks, making this a selected comparison.

**Occupation:** Occupation can be inferred for about **70%** of sessions. In code-changing sessions, software-related occupations reach verified success **34%** of the time versus **29%** for others; at least partial success is **89% versus 88%**. Every one of the ten largest inferred occupation groups falls within seven percentage points of software/math users. The headline's “nearly the same rate” refers to this limited observed range, not exact equivalence or every occupation in the economy. Managers' higher verified success may partly reflect a greater tendency to explicitly confirm outcomes.

**Changing work mix:** Direct writing/fixing/testing/orchestration comprises about **56%** of sessions, operations **17%**, planning/exploration **14%**, and analysis/prose **13%**. From October to April, fixing's share declines **33%→19%**, while operations rises **14%→21%**. A lower debugging share does not demonstrate fewer defects per delivered artifact: users, models, and task composition changed together.

**Estimated economic value:** Main text reports **27%** growth in average session value, based on fuzzy matching to freelance job postings, while the key findings say “about 25%” for the typical task. These are approximate estimates with differing wording, not realized earnings, saved labor, or verified economic value. The authors explicitly advise relative rather than literal-dollar interpretation.

## Analyst Takeaways

1. **Task knowledge and implementation skill are separable.** Domain rules, precise requirements, and recognition of incorrect results can let a non-programmer direct implementation. This does not establish that coding knowledge no longer matters for security or maintenance.
2. **Delegate execution without silently surrendering acceptance criteria.** The observed human-planning/agent-execution division complements the bounded supervision in [the professional developer study](/dossiers/professional-developers-control-ai-agents.md), but the later population and larger action chains are not a controlled longitudinal comparison of that study's developers.
3. **Treat session success as a layered proxy.** Passing tests, commits, and user confirmation are useful evidence, yet a commit need not be deployed, tests can miss requirements, and satisfied users can overlook defects. The [human-centered research agenda](/dossiers/humans-missing-ai-coding-agent-research.md) adds verifiability and intervention quality beyond autonomous resolution.
4. **Do not read output length as productivity.** More activity per prompt may reflect effective delegation, harder work, or unnecessary work; actual value requires inspecting the resulting artifact and subsequent use.

## Questions and Limitations

- This is an observational sample of one vendor's interactive surfaces. Third-party IDE integrations, SDK usage, and non-interactive/headless work are excluded despite being substantial activity.
- Expertise and success are inferred from the same transcript and overlapping signals, including precise checking and correction. Shared classifier bias or reverse causation can contribute to their association.
- Occupation is uncertain in roughly 30% of sessions and inferred only from contextual signals; unclassified users may differ systematically.
- Privacy-preserving aggregation limits direct human validation. The linked appendix is separate from the archived HTML; its complete prompts and validation tables are not reproduced here.
- There is no observation of whether code survives review, reaches production, remains maintainable, or generates economic benefits. Strong reference-model agreement is not proof of correctness.
- Calendar trends conflate model changes, user learning, adoption, and different tasks. The report proposes tracking whether expertise returns decline, not a demonstrated forecast of labor-market substitution.

## Vault Ideas Extracted

* [Expertise-Mediated Agent Steering](/vault/expertise-mediated-agent-steering.md)
