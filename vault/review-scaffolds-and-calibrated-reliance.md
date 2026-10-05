---
type: Synthesis
title: Review Scaffolds and Calibrated Reliance
description: Structured prompts and criterion-linked evidence navigation can redirect human review, but their value depends on error detection and calibrated acceptance rather than confidence or preference.
tags: [human-in-the-loop, interaction-design, verification, evaluation, reliability, agents]
timestamp: 2026-10-05T21:56:59Z
---

# Review Scaffolds and Calibrated Reliance

A review scaffold gives a person a concrete evaluative task or a navigable evidence structure instead of asking whether an agent's fluent plan or plausible trace looks trustworthy. It can redirect attention, but **more engagement, confidence, or control does not necessarily improve accuracy**. Calibrated reliance means accepting correct work and rejecting incorrect work, not maximizing trust.

## Named Variants

### Assumption-Directed Plan Review

Ask which implicit premises a selected step depends on: are its goals, evidence, and constraints appropriate? Supplied candidate assumptions or a reviewer-authored answer can make an otherwise vague review actionable. A related counterfactual prompt asks which step is critical and what happens if it changes or fails. These target different judgments; stacking them is not automatically better.

The supporting writing preprint tested reflection after both the plan and draft were visible, using fixed stimuli whose drafts followed their plans. It therefore does not establish the value of pre-execution approval or detect plan-to-action divergence. Assumption prompts performed better descriptively than counterfactual prompts, with a corrected relative contrast, but did not establish an accuracy advantage over unprompted review. **The adjusted accuracy prose, figures, and interpretations contradict one another**, so the headline benefit cannot be treated as covariate-robust evidence. Supplied assumptions also directed attention differently from open-ended counterfactual questions.

### Criterion-Linked Trace Review

Map **requirements → relevant trace evidence** rather than summarize how competent the process appears. Expose consequential assumptions, link to original observations and artifacts, and distinguish a requirement with supporting evidence from one that is **unknown** or **contradicted**. Missing evidence is not refutation; checking one fact does not establish search completeness or coverage of every requirement.

The supporting trace-review preprint used hand-created summaries and annotations, retaining the full trace. Completion status reflected what the trace claimed, not independent ground truth: an incorrect claim could still receive a completion marker. Small studies with wide confidence intervals did not establish an overall accuracy gain. Faster correct error rejection was a conditional result, not a demonstrated general time saving; confidence increased notably when reviewers falsely accepted wrong outputs. Automated generation of reliable annotations remains unvalidated.

### Plan Editing as Review

Allow reviewers to modify the approach, then inspect whether execution implements it. Editing can repair an omission but can also damage a correct plan; intervention studies show added workload without consistent trust-calibration gains. An adequate repair surface must permit the needed correction, not merely substitutions within existing steps. The coordination mechanism belongs in [Editable Plans as Boundary Objects](/vault/editable-plans-as-boundary-objects.md).

## Foundational Non-Agent Evidence

Advice access can be a review scaffold: require an **independent first answer**, hide advice until requested, or impose a wait before revealing it. These change exposure and commitment, not just explanation content; requesting or waiting does not itself prove independent reasoning.

In a peer-reviewed nutrition-decision experiment, pooled forcing interfaces reduced following the wrong recommended ingredient from **64% to 48%**, and increased correct ingredient identification on AI-error cases from **8% to 27%**; unaided participants reached **49%** on those cases. These are model-adjusted marginal means, not raw population rates. Full optimal decisions improved from **3% to 9%**, but full-answer overreliance fell from **30% to 26%** nonsignificantly. **No aggregate objective metric significantly improved over immediate explanation interfaces**: complete-decision accuracy was **35% with immediate advice versus 33% with forcing**. Reduced wrong-advice uptake is not the same as successful recovery or better total performance.

The cost was higher perceived complexity (**2.95 versus 2.64**, five-point scale), with descriptively lower trust (**3.72 versus 3.91**) and preference (**3.62 versus 3.78**); the latter two differences were nonsignificant. Benefits also varied descriptively with need for cognition: AI-error complete-decision accuracy rose **2%→11%** in the high group but **3%→6%** in the low group, with significance only in the former. Subgroup significance differences do not establish a formal treatment interaction, and the low-group result is rounded inconsistently elsewhere in the source. Pooling supports no preferred individual forcing design.

The earlier writing-task dossier builds on this cognitive-forcing tradition, but reflection over visible plans and drafts is not the same intervention as delaying advice. Its contradictory adjusted accuracy results remain unresolved. The foundational task was short, low-stakes, and used selected crowdworkers with simulated perception errors; it does **not** demonstrate transfer to live agent oversight.

Explanations must also be tested as **diagnostic evidence rather than persuasion**. A separate peer-reviewed classification and reasoning study found no significant accuracy gain from explanations over recommendations with confidence, while some conditions increased acceptance of both correct and incorrect advice. Task-dependent effects and aggregate nulls rule out a blanket claim of harm, but make confidence and perceived usefulness weak proxies for oversight. Evaluate collaboration against both solo partners, as developed in [Complementary Human–AI Performance](/vault/complementary-human-ai-performance.md).

## Practical Evaluation

Evaluate each scaffold against ordinary review on the actual task mix. Record error detection, successful repair, induced errors, false acceptance, false rejection, review time, and workload. Measure confidence **conditioned on whether the judgment is correct**, especially confidence in false acceptance. Preference, readiness changes, a tidy completion view, or perceived critical thinking cannot substitute for these outcomes.

Keep original evidence reachable, unresolved coverage visible, and plan review separate from checking the executed artifact. Reviewers can become overloaded or habituated, focus on easy checks, or inherit the same wrong premise as the agent. Fixed tasks, synthetic defects, small samples, and bundled interfaces limit transfer to live failures and high-stakes effects. These studies assess review usability and judgment, not an authorization boundary; see [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md).

## Sources

- [An Experimental Comparison of Cognitive Forcing Functions for Execution Plans in AI-Assisted Writing: Effects On Trust, Overreliance, and Perceived Critical Thinking dossier](/dossiers/cognitive-forcing-functions-execution-plans.md) — preprint comparing assumption and counterfactual reflection; contradictory adjusted accuracy analyses prevent a robust headline efficacy claim.
- [Overseeing Agents Without Constant Oversight: Challenges and Opportunities dossier](/dossiers/overseeing-agents-without-constant-oversight.md) — small preprint studies of requirement-linked trace navigation with hand-created annotations, wide intervals, and increased false-acceptance confidence.
- [Plan-Then-Execute: An Empirical Study of User Trust and Team Performance When Using LLM Agents As A Daily Assistant dossier](/dossiers/plan-then-execute-user-trust-llm-agents.md) — peer-reviewed simulated planning/execution interventions repaired some tasks, harmed others, raised workload, and did not consistently calibrate trust.
- [To Trust or to Think: Cognitive Forcing Functions Can Reduce Overreliance on AI in AI-assisted Decision-making dossier](/dossiers/to-trust-or-to-think-cognitive-forcing.md) — Buçinca and colleagues' peer-reviewed CSCW 2021 non-agent study of independent-first, on-demand, and delayed advice; pooled subdecision gains without aggregate superiority, higher complexity, nonsignificant lower trust/preference, and unequal descriptive benefits by need for cognition.
- [Does the Whole Exceed its Parts? The Effect of AI Explanations on Complementary Team Performance dossier](/dossiers/ai-explanations-complementary-team-performance.md) — Bansal and colleagues' peer-reviewed CHI 2021 non-agent evidence distinguishing explanation persuasion from diagnosis; no significant benefit over confidence displays, task-dependent wrong-advice acceptance, selected samples, and inconsistent LSAT retained-N claims.
