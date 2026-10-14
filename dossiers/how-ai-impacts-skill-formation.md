---
type: Study Note
title: How AI Impacts Skill Formation
description: A 52-developer randomized experiment finds lower immediate unaided understanding of an unfamiliar Python library with AI assistance, no significant average speed gain, and exploratory evidence that cognitive engagement matters more than copying effort.
resource: https://arxiv.org/abs/2601.20245v2
source: /archive/how-ai-impacts-skill-formation.pdf
tags: [interaction-design, evaluation, verification]
timestamp: 2026-10-14T12:00:00Z
---

# How AI Impacts Skill Formation — Study Notes

**Authors**: Judy Hanwen Shen and Alex Tamkin; work conducted through the Anthropic Fellows Program.  
**Published**: First posted January 28, 2026; archived arXiv:2601.20245v2 carries a February 1 revision stamp and a February 3, 2026 manuscript date.  
**Status**: Empirical arXiv preprint; no accepted peer-reviewed venue is established in the archived manuscript or canonical metadata inspected here. Study protocol and grading rubric were preregistered at [OSF](https://osf.io/w49e7).

## What It Is

A randomized experiment asking whether completing unfamiliar programming work with AI develops the knowledge needed to understand and supervise that work afterward. **52 Python developers**, none previously familiar with Trio, completed two asynchronous-programming tasks with or without a chat assistant, then took the same **unaided, 14-question, 27-point quiz** on conceptual understanding, code reading, and debugging.

The AI group learned less on average: the reported standardized difference was **Cohen's d = 0.738, p = 0.010**. Average completion time was not significantly different (**p = 0.391**). This is evidence about immediate acquisition of new library knowledge under a particular workflow—not established long-term deskilling, a universal productivity penalty, or a causal comparison of different learning-oriented prompting strategies.

## Problem and Motivation

Automation can move people from execution to supervision without removing their need to detect errors. If novices acquire competence by doing the very work that AI now performs, successful delegation can bypass the practice needed for later oversight. Artifact completion and human competence therefore need separate measurements.

Here, “novice” means unfamiliar with the library, not necessarily inexperienced at programming. **29/52 participants had at least seven years of coding experience**, and only four had one to three years. The setting models learning a new tool at work rather than teaching programming from scratch.

## Experimental Design

- **Participants and allocation**: 58 crowdworkers were invited, 53 completed all stages, and one was excluded under preregistered criteria after missing four quiz questions because they did not realize the quiz had multiple parts. The retained sample contained **26 participants per condition**. Recruitment required more than one year of Python experience, at least weekly Python use, some prior AI-coding-assistant use, and no Trio experience. Recruitment balanced experience, Python use, prior asynchronous-programming exposure, and a five-question familiarity check.
- **Learning task**: After a Python-only warm-up without AI, participants had up to **35 minutes** for two standalone Trio tasks: coordinating a timer with concurrent work, and retrieving records while handling missing-record errors and collecting results. Instructions, starter code, concept descriptions, and examples made this a short self-guided learning exercise. Both conditions could use instructions and web search; the treatment added AI assistance and encouragement to use it. Everyone was asked to finish quickly.
- **AI condition**: A **GPT-4o chat-based coding assistant** could see current code and produce complete correct solutions when asked. Participants still transferred generated code into the editor. This was not an autonomous coding-agent trial.
- **Learning measure**: The post-task quiz covered seven library concepts through debugging, reading, and conceptual questions. Code-writing questions were deliberately excluded to reduce dependence on easily searchable syntax. The rubric was preregistered; the quiz followed five design iterations intended to improve item discrimination and prevent answers being inferred from other questions.
- **Session and incentives**: Sessions averaged **58.5 minutes**, with a maximum of 75 minutes and **USD 150 flat compensation**. Screen recordings, keystrokes, chat transcripts, and surveys supplied process evidence. The ethics review was internal to Anthropic.

### Why the Pilots Matter

Four pilots changed the design rather than constituting interchangeable replications. Pilots A and B (**n = 39 and 107**) had substantial forbidden AI use, approximately **35% and 25%**, on the first recruitment platform. Switching platforms and collecting screen recordings improved compliance. Pilot C (**n = 20**) exposed quiz questions that revealed answers to one another; the quiz was separated into pages and the learning task reduced from five exercises to two.

Pilot D (**n = 20**) found faster AI-assisted completion (**d = 1.11, p ≈ 0.03**) and worse quiz performance (**d = 1.7, p = 0.003**). Only **60%** of controls versus **90%** of AI participants completed both exercises within the time limit. Because controls were delayed by unrelated Python syntax, the main study added syntax hints. The main study's nonsignificant speed result must not be replaced with the pilot's positive result. Power planning assumed **d = 0.85**, half the pilot's learning effect; the observed main-study effect was smaller.

## Results and Admissions

### Immediate Learning and Completion Are Different Outcomes

The paper reports a **4.15-point mean quiz difference** favoring controls and describes it as a **17% score difference or two grade points**. Those figures do not reconcile on a 27-point scale: **4.15/27 is approximately 15.4 percentage points**, not 17. The standardized effect and reported significance are more defensible to quote than an unqualified “17% learning loss.” Adjusting for warm-up time retained a significant difference (**d = 0.725, p = 0.016**).

Controls scored higher descriptively in every experience band, but the smallest band contained only four people; this is not a powered test of treatment heterogeneity. The exploratory, non-preregistered subarea analysis found the largest gap in **debugging** and the smallest in **code reading**. Those are descriptive subgroup findings, not separately established causal effects for every skill.

All **26 AI participants completed the second task**, compared with **22/26 controls** within the 35-minute limit. Completion is therefore a relevant benefit even though average task-time differences were nonsignificant. The time cap and incomplete control tasks complicate interpreting elapsed time as a complete measure of productivity; the study does not establish equivalent speed or independently measured production-code quality.

### Six Interaction Patterns, Not Six Randomized Treatments

The authors classified recorded AI use after observing participants. Reported cluster averages are:

| Interaction pattern | Reported n | Completion time | Quiz score | Distinguishing behavior |
|---|---|---|---|---|
| AI Delegation | 4 | 19.5 minutes | 39% | Requests code and adopts it without understanding-focused follow-up. |
| Progressive AI Reliance | 4 | 22 minutes | 35% | Starts with questions, then delegates later implementation. |
| Iterative AI Debugging | 4 | 31 minutes | 24% | Repeatedly asks AI to fix or verify work instead of developing an explanation. |
| Generation-Then-Comprehension | 2 | 24 minutes | 86% | Generates code, then asks follow-up questions to understand it. |
| Hybrid Code-Explanation | 3 | 24 minutes | 68% | Requests generated code and accompanying explanation together. |
| Conceptual Inquiry | 7 | 22 minutes | 65% | Asks conceptual questions, implements and resolves errors independently. |

The substantive distinction is **who performs the reasoning**, not whether generated code ever appears. The two-person generation-then-comprehension cluster did well despite using code generation. Conversely, repeated AI interaction was not inherently educational. Small, self-selected, outcome-described clusters cannot establish that adopting a named pattern causes its reported quiz result or preserves learning relative to controls.

### Interaction Costs and Productive Friction

Some participants spent up to **11 minutes** interacting with AI and asked up to **15 queries**. “Interaction time” ran from beginning to type a query until receiving an answer, so it was not a pure measure of human thinking or typing. AI query labels included **79 explanation, 51 generation, nine debugging, four capability, and four appreciation** labels; 11 queries received two labels. Explanation queries came from **21/25** recorded AI users, and generation queries from **16/25**.

A higher debugging-query fraction correlated with slower completion (**r = 0.43, p = 0.033**) and lower quiz scores (**r = −0.41, p = 0.043**). Total query count did not significantly correlate with quiz scores (**r = −0.22, p = 0.293**). These exploratory correlations could reflect difficulty driving help-seeking, not assistance causing difficulty.

Controls encountered more errors: median **three, IQR 2–5**, versus **one, IQR 0–3**, with AI. Of 12 participants completing both tasks without errors, only two were controls. Library-specific failures could force participants to understand concurrency concepts that the quiz later tested. This supports an explanatory hypothesis about independent diagnosis, but neither error exposure nor cognitive engagement was randomized; the study did not causally identify a learning mediator.

Manually retyping AI output was slower than directly pasting it without a notable quiz advantage. Raw typing time is therefore not an adequate proxy for useful cognitive effort. The active-time plot also showed opposite between-condition and within-condition associations: controls coded more and scored higher overall, while more active coding time within either condition correlated with lower scores. The authors attribute the latter to experience, but that explanation is observational.

## Analyst Takeaways

1. **Measure the human after assistance is removed.** Working code and immediate fluency can conceal a weak mental model. Pair task outcomes with independent debugging, explanation, or transfer measures; this experiment provides an immediate quiz, not evidence of durable competence.
2. **Preserve understanding, not ritual effort.** Copying code by hand is not the same as predicting its behavior or diagnosing its errors. Explanation requests and conceptual questions are promising supports, but the observed personas are hypotheses for controlled interventions, not proven recipes.
3. **Expertise has a replenishment problem.** [Expertise-Mediated Agent Steering](/vault/expertise-mediated-agent-steering.md) describes why task knowledge supports requirements, acceptance, and recovery. This experiment raises the complementary risk that delegation can bypass opportunities to acquire that knowledge. [The larger agentic-coding transcript study](/dossiers/anthropic-agentic-coding-returns-to-expertise.md) associates apparent expertise with success; neither study alone demonstrates a long-run feedback loop.
4. **Separate learning from reliance calibration.** [Review Scaffolds and Calibrated Reliance](/vault/review-scaffolds-and-calibrated-reliance.md) evaluates whether users accept correct advice and reject errors. This study instead measures subsequent unaided knowledge. More explanation, more interaction, or lower wrong-advice uptake cannot substitute for testing both outcomes.
5. **Coaching needs transfer evidence.** [In-Flow Socratic Prompt Coaching](/vault/in-flow-socratic-prompt-coaching.md) deliberately leaves reasoning with the learner. The present findings motivate that design principle, but do not evaluate a Socratic tutor, forced reflection, or any commercial learning mode.

## Questions, Limitations, and Internal Inconsistencies

- **Short horizon and narrow setting**: Two exercises with one library and one chat assistant do not show months-long retention, skill decay, job performance, production oversight, or effects of autonomous coding agents. Calling chat assistance a lower bound for agentic cognitive offloading is the authors' extrapolation, not a tested result.
- **Motivation and population**: Experienced Python users learning an unfamiliar library are not representative of all junior workers. Flat compensation, a speed instruction, a short time limit, and no job-related need to retain the library may alter learning behavior. One participant explicitly said time pressure displaced mental-model building. Self-reported prior AI use did not independently measure prompting ability.
- **Mechanism and counterfactuals**: No human-tutor comparison, longitudinal follow-up, new-task transfer assessment, or randomized interaction-pattern intervention was included. Error counts and persona outcomes do not establish that inducing errors or forcing explanations improves learning.
- **Quiz arithmetic**: The stated 4.15/27 difference yields about 15.4 percentage points, not the reported 17%; the “two grade points” description has no explicit grading conversion.
- **Qualitative denominators**: Section 6 says 51 recordings were annotated, with one missing AI recording; Appendix B.1 also says 51/52 uploaded recordings but describes reviewing **25 AI + 25 controls = 50**. The six persona counts sum to **24**, not the 25 recorded AI participants. Section 6.1's copying categories sum to **26** (9 direct paste, 9 manual copy, 4 hybrid, 4 mostly independent), despite its neighboring analyses using 25 recorded AI users. These counts are not reconciled; do not silently reconstruct cluster proportions.
- **Question-type caption**: Figure 20 calls the third assessed skill “code writing,” whereas the methods, appendix, and displayed heading identify **debugging** and explicitly exclude code-writing questions.
- **Feedback and causal language**: Appendix B.3 attributes more treatment-group comments to having more time, without a measured causal comparison. Prose that errors “ensure” concept acquisition or AI interaction explains the entire speed result is stronger than the exploratory process evidence supports.

## Vault Ideas Extracted

- Created [Skill-Preserving AI Assistance](/vault/skill-preserving-ai-assistance.md): distinguish artifact completion from independently demonstrated competence, and cognitive engagement from manual copying; treat the interaction personas as exploratory design hypotheses.
- Updated [Expertise-Mediated Agent Steering](/vault/expertise-mediated-agent-steering.md): add the acquisition-side tension between delegating execution now and developing the knowledge needed to inspect and repair future work.

The proposed Socratic-coaching update was dropped because this experiment supplies only indirect motivation, not evidence evaluating that intervention.
