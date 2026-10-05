---
type: Study Note
title: "An Experimental Comparison of Cognitive Forcing Functions for Execution Plans in AI-Assisted Writing: Effects On Trust, Overreliance, and Perceived Critical Thinking"
description: A 214-person writing experiment compares assumption analysis and counterfactual plan review, finding descriptive benefits for assumptions but internally contradictory adjusted accuracy results that limit the headline conclusion.
resource: https://arxiv.org/abs/2601.18033v1
source: /archive/cognitive-forcing-functions-execution-plans.pdf
tags: [human-in-the-loop, interaction-design, verification, evaluation, reliability, agents]
timestamp: 2026-10-05T21:48:59Z
---

# Cognitive Forcing Functions for Execution Plans in AI-Assisted Writing — Study Notes

**Authors**: Ahana Ghosh, Advait Sarkar, Siân Lindley, and Christian Poelitz; Max Planck Institute for Software Systems and Microsoft Research.  
**Published**: January 25, 2026; archived arXiv revision 1. Data collected July–August 2025.  
**Status**: Explicitly labeled preprint. No peer-reviewed venue or publisher DOI was established from the manuscript, [arXiv record](https://arxiv.org/abs/2601.18033), or exact-title publication searches as of October 5, 2026.

## What It Is

A controlled comparison of **four plan-review conditions with 214 participants**, complemented by **12 think-aloud interviews**. The reusable question is whether a brief intervention requiring users to reason about a plan helps them recognize defects in the resulting writing. The paper favors assumption analysis, but its raw results, adjusted-model prose, and adjusted-model figure contradict one another. The intervention is worth understanding; the strongest efficacy claim is not securely supported by this version.

## Problem and Motivation

A fluent execution plan can become another object of automation bias rather than a check on the agent. Reviewing the approach and reviewing the final artifact require different judgments. Cognitive forcing functions deliberately require some evaluative engagement before acceptance, but added friction is useful only if it changes error detection rather than merely making users feel thoughtful.

## Mechanism as an Idea

The study compares:

- **Assumptions**: identify implicit premises underlying a selected plan step, using supplied alternatives or one's own answer. Participants must examine at least one step but may examine more. This targets argument analysis: does the approach presuppose appropriate goals, evidence, and constraints?
- **WhatIf**: select the most critical step and describe the consequences if it changes or fails. This targets hypothesis testing and counterfactual simulation.
- **Both**: assumption review followed by counterfactual review, testing whether stacking interventions adds value.
- **None**: proceed without a reflective prompt.

These are reflection requirements, not correctness quizzes with an enforced right answer. Both interventions occur **after the plan and draft have already been presented**, between initial and final readiness judgments; this is not a test of approving a plan before autonomous execution.

All participants see the same fixed GPT-4o-generated plans and drafts. Five writing tasks span notice synthesis, product-review analysis, persuasive writing, meeting-minute restructuring, and news summarization. The warm-up has four plan steps; the other tasks have six. Two tasks are designated error-free; three contain deliberately induced incorrect, missing, or unnecessary plan work. Drafts are kept consistent with their plans, excluding execution-stage divergence. Supplied assumption options also direct attention differently from the open-ended WhatIf prompt, so the comparison does not isolate abstract cognitive skill alone.

## Results and Admissions

**Descriptive behavioral results** (averaged across tasks):

| Measure | None | Assumptions | WhatIf | Both |
| --- | --- | --- | --- | --- |
| Feedback accuracy | 49.7% | 59.1% | 46.8% | 53.9% |
| Overreliance on erroneous outputs | 70.6% | 63.0% | 80.7% | 70.6% |
| Underreliance on designated error-free outputs | 20.0% | 7.8% | 12.0% | 9.3% |
| Readiness-rating revision | 13.7% | 23.6% | 14.0% | 19.7% |

Feedback is manually coded against the prescribed defects; readiness revision counts either direction, not necessarily improvement. After Benjamini–Hochberg correction, **Assumptions versus WhatIf** differs in accuracy (**p = 0.04, V = 0.12**) and overreliance (**p = 0.008, V = 0.19**). No other accuracy or overreliance pairwise contrast is significant, including Assumptions versus the no-CFF baseline. Underreliance contrasts are not significant. Assumptions increases raw readiness revision relative to None and WhatIf, but condition contrasts cease to be significant after participant covariates and repeated measures are modeled.

**Load and subjective experience**: overall self-reported workload does not significantly differ across conditions (**H = 2.99, p = 0.39**). Assumptions has lower prompt-specific mental demand than Both (**corrected p = 0.01, r = 0.12**). Both is rated more helpful than either individual prompt; Assumptions versus WhatIf helpfulness is not significant. Self-reported critical-thinking differences are also not significant (**p = 0.61**). Interviews report six overall preferences for Assumptions and four for WhatIf; seven select Assumptions as best supporting critical thinking and five select WhatIf. These do not substantiate an unqualified claim that users prefer WhatIf.

**The adjusted accuracy analysis is internally inconsistent.** Section 5.2 and Appendix C.3 say Assumptions has the *lowest* adjusted accuracy and report **OR = 0.45 versus None, 95% CI [0.27, 0.75], p = 0.002**. Appendix prose gives adjusted rates of **33% Assumptions, 42% Both, 52% None, and 58% WhatIf**—the reverse of the raw ordering. Yet Figure 13a labels **67.2% Assumptions, 57.9% Both, 47.9% None, and 42.5% WhatIf**, approximately the complements of those prose values, while its odds-ratio figure retains the adverse Assumptions direction. The appendix defines the modeled outcome as correctness, but interprets lower accuracy as fewer incorrect judgments. It also calls **p = 0.06** significant in a pairwise sentence. These could reflect coding or labeling errors; this manuscript does not establish which representation is correct. Do not silently convert this into a robust adjusted benefit.

## Analyst Takeaways

1. **Plan transparency needs an evaluative task.** Asking which premise a step relies on is more concrete than asking a reviewer to trust a coherent sequence. This adds an empirical candidate to the evidence-oriented model in [Designing meaningful human oversight](/dossiers/designing-meaningful-human-oversight-ai.md), not proof that every assumption checklist works.
2. **Separate relative intervention ranking from baseline improvement.** The clean corrected behavioral comparison is Assumptions versus WhatIf. Neither the raw table nor the internally inconsistent adjustment establishes a general advantage over ordinary review.
3. **Measure detection and false rejection alongside effort and preference.** More readiness changes or perceived thoughtfulness are not necessarily better judgments. This extends [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md) to the human reviewer.
4. **Do not stack friction by default.** Both does not beat Assumptions descriptively and has higher prompt-specific demand. The hypothesis that stacked prompts diffuse attention is an interpretation, not an isolated causal finding.
5. **Review the executed artifact separately.** Deliberately consistent plans and drafts cannot test the plan-to-effect gap addressed by [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md).

## Questions and Limitations

- The fixed, writing-only stimuli and synthetic defects limit transfer to coding, data analysis, live tool use, and natural failures. Error category is confounded with task; no category-specific efficacy claim is justified.
- Descriptions alternately call allocation random and round-robin; final groups contain 60 None, 45 Assumptions, 50 WhatIf, and 59 Both participants after attrition. This leaves allocation and attrition effects less clear than the headline suggests.
- The appendix does not fully reproduce some lengthy artifacts, replacing reviews and facts with ellipses. Its prompts also contain mismatched step labels, and Task 5 specifies two erroneous steps despite the main description saying each flawed task has exactly one error.
- Prompt quality, reviewer expertise, incentives, repeated use, habituation, and the cost of generating trustworthy reflection alternatives are not established in field deployment.
- The reported adjusted accuracy contradiction must be resolved from data or author clarification before treating the headline as covariate-robust evidence. Absence of a significant workload difference is not proof of zero cost.

## Vault Ideas Extracted

* [Review Scaffolds and Calibrated Reliance](/vault/review-scaffolds-and-calibrated-reliance.md)
