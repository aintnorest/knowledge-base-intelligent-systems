---
type: Study Note
title: "Plan-Then-Execute: An Empirical Study of User Trust and Team Performance When Using LLM Agents As A Daily Assistant"
description: A 248-person simulated daily-assistant study separates plan editing from execution intervention and finds task-specific repairs, added cognitive load, and no consistent improvement in calibrated trust.
resource: https://doi.org/10.1145/3706598.3713218
source: /archive/plan-then-execute-user-trust-llm-agents.pdf
tags: [human-in-the-loop, interaction-design, evaluation, reliability, orchestration, agents]
timestamp: 2026-10-05T21:49:07Z
---

# Plan-Then-Execute — Study Notes

**Authors**: Gaole He, Gianluca Demartini, and Ujwal Gadiraju.  
**Published**: CHI 2025, April 26–May 1, 2025; archived arXiv:2502.01390v1, February 3, 2025.  
**Status**: Peer-reviewed CHI 2025 conference paper; the archived manuscript includes the matching publisher DOI and ACM reference.

## What It Is

A 2 × 2 study of automatic versus user-involved planning and automatic versus user-involved execution. Its 248 retained Prolific participants each handled six simulated everyday tasks using a GPT-3.5-turbo agent. The experiment asks whether giving humans opportunities to repair plans and actions improves both outcomes and their ability to trust correct results and distrust incorrect ones.

The important result is conditional: people sometimes repair the agent successfully, sometimes damage a correct plan, and do not consistently calibrate trust simply because they can intervene.

## Problem and Motivation

A structured, plausible plan can look correct while omitting an action or encoding wrong parameters. Conversely, a correct plan can translate into an incorrect tool action. Transparency, subjective trust, behavioral reliance, and actual task success are distinct constructs; an interface that exposes more of the process can increase workload without improving discrimination.

## Mechanism as an Idea

The agent first produces a hierarchical textual plan. In user-involved planning, people can edit, add, delete, or split steps. During execution, each primary step is translated into **exactly one action**. Users in the intervention conditions can give feedback, override the proposed action and its parameters, or retry a step. They cannot return to revise the plan after execution starts.

This one-step/one-action mapping is a decisive implementation constraint. A primary step containing two transactions loses an action unless split beforehand. The authors call this a plan “grammar error,” but it is an incompatibility with this executor, not a general flaw in natural-language grammar or every planning architecture.

The six tasks cover currency exchange, credit-card payment, repair scheduling, alarms, flights, and travel itineraries. Ground-truth actions and outcomes come from predefined simulated APIs, not real transactions. Plan quality is author-rated on a five-level rubric; calibrated planning trust counts trusting a level-5 plan or distrusting anything below 5. Execution trust is calibrated against correct final results. Exact action-sequence matching is scored separately from outcome correctness, which tolerates harmless redundant actions.

## Results and Admissions

347 participants were recruited; 248 remained after filtering, including exclusion of four participants who produced more than three low-quality plans. Conditions contained 63, 64, 61, and 60 people. This outcome-related exclusion matters when interpreting the harm caused by plan editing.

**None of the four general hypotheses received strict support.** Plan intervention did not consistently improve calibrated planning trust or task performance; execution intervention did not consistently improve calibrated execution trust or performance across tasks.

- Average calibrated planning trust was about **0.50**. On the three initially imperfect, high-risk tasks, Table 3 condition scores range from **0.03 to 0.27**; participants often trusted flawed plans. On initially correct, low-risk tasks, scores were much higher. Since initial correctness and risk group coincide, this does not isolate risk as the cause.
- Planning edits improved the currency task with a merged-action error: outcome accuracy moved from **0.00** in both automatic-planning conditions to **0.10/0.13** with user planning in Table 4. But edits harmed the initially correct alarm task: **0.95/0.89** became **0.75/0.82**. Both are low-level task-specific comparisons, not a universal benefit or penalty.
- Execution intervention helped the itinerary-selection task. In the execution-focused analysis that excludes cases with degraded plans, Table 5 outcome accuracy is **0.06/0.04** with automatic execution and **0.23/0.23** with intervention. The user can reject a route conflicting with requirements; this is not evidence that all execution checkpoints help.
- High-quality plans did not ensure correct execution: **235 of 717** level-5-plan task instances failed. Among these failures, **48.9%** involved wrong parameters, **48.5%** invalid or missing action predictions, and **2.6%** wrong action names. Reported outcome accuracy by plan quality was **1.8%** for levels 1–2, **59%** for levels 3–4, and **66.7%** for level 5; these are observed associations, not a causal quality intervention.
- Planning involvement increased mental demand, temporal demand, and frustration; execution involvement increased performance-related workload and effort. Both stages' intervention lowered corresponding decision confidence. No significant condition effect on subjective trust was found.

Most participants used available intervention surfaces: 104 of 121 planning-condition participants edited at least one plan, and 114 of 124 execution-condition participants changed at least one action prediction. Availability and use still did not establish successful trust calibration.

Tables 4 and 5 have different user-planning averages because the latter excludes cases where planning worsened quality; do not mix these denominators. The abstract's phrase “easily mistrust ... plans that seem plausible” conflicts with the detailed account of users **trusting incorrect plans**. The conclusions and main results support miscalibrated trust, especially overtrust before errors are noticed, rather than that literal abstract wording.

## Analyst Takeaways

1. **Review the translation, not just the prose.** A sound plan can still become the wrong action or target. [Approval Bound to Canonical Effect](/vault/approval-bound-to-canonical-effect.md) provides the complementary authority model: approval must bind to the actual effect, not an appealing narrative.
2. **Intervention needs an adequate repair surface.** A missing step discovered at execution time cannot be fixed by a workflow that only permits substitutions within existing steps. [Cocoa](/dossiers/cocoa-co-planning-co-execution-agents.md) explicitly explores replanning after partial execution.
3. **Allocate human attention rather than maximize clicks.** The experiment supports testing task-specific oversight, not blanket editing of correct plans. [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md) separates review effort from authority; risk alone is not an empirically validated allocation rule here.
4. **Do not call subjective trust a safety outcome.** Measure error recognition, successful repair, induced errors, workload, and actual final outcomes separately. The control proposals in [Humans in Control](/dossiers/humans-in-control-agentic-qa.md) remain proposals rather than evidence that gates invariably help.

## Questions and Limitations

The fixed initial plans, constrained executor, older model, and simulation limit deployment transfer. Initial plan quality is confounded with task and perceived-risk group. Author-rated correctness and exclusion of poor planners affect the denominator. Execution-focused filtering selects a subset after planning outcomes, so its comparison is not the unqualified full-sample factorial effect. Multiple actions per goal, real financial stakes, unfamiliar tools, and dynamic replanning remain untested. A legible plan may encourage overtrust; additional detail can also conceal relevant defects through review fatigue.

## Vault Ideas Extracted

* [Editable Plans as Boundary Objects](/vault/editable-plans-as-boundary-objects.md)
* [Review Scaffolds and Calibrated Reliance](/vault/review-scaffolds-and-calibrated-reliance.md)
* [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md)
