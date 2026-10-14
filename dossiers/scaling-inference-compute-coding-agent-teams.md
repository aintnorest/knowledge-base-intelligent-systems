---
type: Study Note
title: Scaling Inference-Time Compute with Teams of Coding Agents
description: A 200-task repository-reconstruction study finds that parallel discovery with a strong implementation lead is a better reward–cost tradeoff than indiscriminate coding-agent fan-out, with different bottlenecks on skeleton-based tasks.
resource: https://arxiv.org/abs/2610.17471v1
source: /archive/scaling-inference-compute-coding-agent-teams.pdf
tags: [multi-agent, test-time-scaling, coding-agents, orchestration, evaluation, agents]
timestamp: 2026-10-14T12:00:00Z
---

# Scaling Inference-Time Compute with Teams of Coding Agents — Study Notes

**Authors**: Keenan Samway, Daniel D’souza, Omar Darwiche Domingues, Marzieh Fadaee, Tan Yi-Chern, and Nouha Dziri; Cohere Labs and Cohere.  
**Published**: Archived arXiv:2610.17471v1, whose identifier stamp says October 12, 2026; the manuscript says “Released as a preprint on October 14, 2026.”  
**Status**: First-party empirical preprint. The archived manuscript identifies no accepted conference, journal, or peer-review status.

## What It Is

A controlled study of a minimal hierarchical coding-agent harness: one lead assigns bounded subtasks to workers, receives their findings, and produces the integrated solution. It treats **team design as inference-compute allocation**, varying delegation stage, model placement, scheduling, and worker count rather than assuming that a larger team is inherently better.

The central result is task-dependent. On black-box repository reconstruction, workers are most useful as **parallel investigators before implementation**. A strong lead can use cheap workers’ discoveries while retaining implementation and verification. When the benchmark already provides the decomposition and tests, implementation workers instead look more useful.

## Problem and Motivation

Longer solo trajectories eventually encounter latency and context limits; independent repeated attempts duplicate the whole task. A cooperating team can divide discovery and construction within one attempt, but incurs report processing, integration, duplicated work, and potentially incompatible decisions. More total activity is therefore not the same as more verified progress.

The authors formulate a reward–cost frontier over configurations comprising the delegation stage, lead model, worker model, and number of workers. They **do not match inference budgets** across configurations or solve the constrained optimization exactly. Instead, they search design dimensions sequentially and measure added reward per added dollar relative to a solo baseline. These are empirical operating points, not proven optimal teams or an isolated causal benefit of coordination under equal compute. Wall-clock latency is reported separately, not constrained in the optimization.

## Mechanism as an Idea

- **One decision and integration owner.** Workers see their assignment, not the complete user task or other workers’ histories. They share the workspace but have separate conversations. A completed worker can be resumed with its earlier context. Except in the messaging experiment, communication happens only at delegation and completion boundaries.
- **Stage-selective delegation.** All guided conditions follow planning/exploration, implementation, and verification. Workers participate in planning only (P), implementation only (I), verification only (V), or throughout all three (PIV); the lead completes the rest. Planning workers gather behavioral evidence without writing the implementation. Implementation requires explicit non-overlapping ownership and lead integration; verification workers investigate the integrated candidate.
- **Scheduling is not decomposition.** Blocking prevents the lead from progressing until workers return, but several workers launched together can still run concurrently. Asynchronous completion delivery lets the lead continue useful work, at the risk of acting on incomplete findings or finishing before workers return. Explicit collection barriers can preserve completeness without eliminating concurrent execution.
- **Capability placement changes the role economics.** A cheaper investigator supplies observations for a stronger owner to interpret. A cheaper implementer transfers consequential code decisions and integration burden to a weaker model. The two substitutions need separate evaluations.

## Evaluation Design

**ProgramBench has 200 tasks**: reconstruct a program from a black-box executable and its documentation, with held-out behavioral tests evaluating the result. The agent must discover interfaces, edge cases, and behavior rather than modify an existing repository. **Commit0-Lite has 16 Python-library tasks**, supplying repository structure, function stubs, and unit tests. These expose different information bottlenecks.

Main experiments use **GPT-5.6 Sol, Terra, and Luna**, all at medium reasoning effort. GPT configurations normally average **three independent runs over all 200 ProgramBench tasks**. Dynamic teams have a cap of **five unique workers**, but leads can resume existing workers. Fixed-size experiments use a Sol lead and **2, 4, 8, or 16 Luna workers**, with a single run per configuration. The largest team therefore has **17 agents including its lead**; the paper’s approximately five-agent homogeneous comparator is a dynamically sized planning team, not a fixed five-worker condition.

Additional full-benchmark Claude Opus 4.7 and Haiku 4.5 comparisons use one run; a balanced **30-task subset** adds Opus 4.8 and Gemini 3.7/3.8 Flash, with ten tasks per difficulty tier. Cost reflects the source’s model-specific token prices and caching treatment. Tables report per-task dollars; many figures show total benchmark dollars. Reward is a mean behavioral score on a 0–1 scale, not the percentage of completely reconstructed programs. A change of 0.01 is one reward point, distinct from a 1% relative improvement.

## Results and Admissions

### Strong Teams Improve Reward, Not Usually Latency

Selected Table 3/4 results for a Sol lead illustrate the operating points. Rewards use Table 3’s more precise means; dollars and minutes are Table 4’s rounded per-task means.

| Configuration | Schedule | Mean reward | Cost per task | Minutes per task |
| --- | --- | --- | --- | --- |
| Solo, minimal | — | 0.521 | $0.24 | 1.9 |
| Solo, PIV | — | 0.577 | $0.38 | 2.5 |
| Sol workers, minimal | Asynchronous | 0.559 | $0.91 | 2.6 |
| Sol workers, minimal | Blocking | 0.618 | $1.28 | 6.5 |
| Sol workers, P | Asynchronous | 0.636 | $1.24 | 5.1 |
| Sol workers, PIV | Asynchronous | 0.632 | $2.55 | 7.6 |
| Luna workers, P | Asynchronous | 0.605 | $0.50 | 3.3 |
| Luna workers, I | Asynchronous | 0.563 | $0.45 | 3.5 |

Homogeneous Sol teams cost roughly **3–7×** their matching solo baseline. Blocking teams take **3.5× longer with minimal guidance and 3.8× with PIV**; asynchronous teams take **1.4× and 3.1× longer**, respectively. Minimal asynchronous teams lose about **six reward points** relative to blocking teams. Inspected traces show leads acting on partial reports or ending early; PIV’s explicit report-collection instruction closes that gap. This is evidence for a completeness boundary, not a general latency benefit from adding workers.

### Planning Buys More Useful Information

Homogeneous planning teams approximately match PIV reward at **about half the inference cost**. Added-reward efficiency under blocking is **3.8 reward points per $100** for P, **2.4** for I, **1.7** for V, and **1.4** for PIV. Asynchronous values are **3.4, 1.7, 0.9, and 1.3**, respectively. These efficiencies use added benchmark cost above Solo PIV, not total cost or a budget-matched comparison.

Planning guidance produces about **674 successful delegations per 200-task run**, almost entirely before the first source edit. PIV produces about **1,625**, roughly 794 before editing and 830 later, without a corresponding reward gain. Planning thus gets approximately **2.4× the gain per delegation**. This is not a fixed worker-count ablation: planning spawns about **3.4–3.6 workers**, implementation about **2.2**, verification about **3.0**, and PIV about **4.5–5.0**.

### Cheap Investigators Are Not Cheap Implementers

With an asynchronous Sol lead, Luna planners recover **47.5% of the all-Sol planning team’s reward gain over Solo PIV**, for **13.9% of its additional cost**. The rounded tables corroborate the comparison: reward rises from 0.577 to 0.605 rather than 0.636, while per-task cost rises from $0.38 to $0.50 rather than $1.24. This preserves roughly half the incremental gain, **not 100% of strong-team quality**.

For a Sol lead, cheap implementation workers reduce reward below Solo PIV, and cheap verification workers give little gain. Under blocking, Luna-planner efficiency is **51.0 versus 3.8** for Sol planners, whereas cheap implementation has **−12.0** efficiency. Such ratios can grow sharply when additional cost is small. With workers held at Luna, better leads improve reward, but a Terra-led planning team still trails solo Sol by **10.3%**. Worker volume does not substitute for a capable integrator.

### Worker Count Helps Discovery Until Integration Becomes the Bottleneck

Sixteen Luna planners approach the homogeneous planning team within **1.4 reward points at 70% lower total inference cost**. Planning reward rises from two to sixteen workers by **2.2 points, 95% CI [1.0, 3.5]**. Implementation and verification improve up to four workers, then change by **−1.5 points [−3.4, 0.4]** and **−1.1 points [−2.6, 0.3]** from four to sixteen. The intervals do not establish a significant decline; they support a plateau rather than continued scaling.

The trace analysis gives a useful explanation beyond “agents conflict.” Implementers write the same file only **0.1%** of the time. Planning workers’ reference probes grow from **15 to 109** and reports from **17k to 75k characters**, while the lead still writes essentially all code. Implementation assignments instead shrink from **1.4k to 0.4k characters**, worker source-edit share grows from **54% to 85%**, and the lead performs only **five to six reference checks** after the last report regardless of team size. Verification assignments also dilute; per-worker reference probes fall from **8.1 to 4.7**. More work transfers to the weaker model without proportionate new evidence or integration checking.

Raising the dynamic worker cap from five to twenty mainly replaces resumptions with fresh workers. Reward changes by **−1.6 to +1.6 points**, with eight of ten comparisons’ intervals including zero; cost increases **5–17% in seven of ten settings**. Permission to spawn more is not a strategy for using more effectively.

### Communication and Benchmark Transfer Are Conditional

For PIV Sol teams, **84% of messages go from workers to the lead**, with only **0.7 worker-to-worker messages per task**. Additional collaboration encouragement raises that to 1.0. Messaging changes Sol reward by **+0.4 ± 1.2 points**, Terra by **−1.4 ± 1.5**, Terra-plus-Luna by **−3.5 ± 1.5**, and Luna by **−7.1 ± 2.3**. About **50–55%** of Luna workers’ messaging calls fail, versus **0–1%** for strong homogeneous workers. The result combines communication value with tool-use competence and redundant status traffic; it is not evidence that well-designed communication cannot help.

Model families also differ. Opus 4.7 rarely delegates under minimal prompting and shows essentially no gain; PIV adds **4.3–6.3 points** at **1.7–2.0×** cost. Haiku teams score at or below solo despite eager delegation. On the 30-task subset, Opus 4.8 asynchronous PIV gains **5.9 points at 2.3×** cost; similarly eager Gemini 3.7 gains nothing. Orchestration requires both willingness to delegate and ability to use the return.

On Commit0-Lite, **implementation is the best single-stage guidance in eight of ten settings**; planning is never clearly best. Existing stubs and tests already encode much of the discovery and decomposition. This comparison is directional: one run, only 16 tasks, wide intervals, and Sol already achieves perfect reward on **12/16 tasks**.

## Analyst Takeaways

1. **Locate the missing information before choosing a worker role.** Parallel discovery is valuable when behavior must be learned; existing architecture and tests can move the bottleneck toward construction. “Always delegate planning” would discard the paper’s own contrast.
2. **Separate evidence breadth from distributed implementation.** A strong owner with scoped read-only investigators can buy discoveries without distributing coupled code decisions. This supplies measured support for a boundary motivated qualitatively by [Don’t Build Multi-Agents](/dossiers/cognition-dont-build-multi-agents.md), without proving its universal single-agent prescription.
3. **No conflicting edits is not enough.** A team can have clean file ownership yet fail to scale because assignments dilute and the owner’s integration checks do not grow. Count newly useful observations and accepted integrated behavior, not only workers or messages.
4. **Compare complete episodes, not model prices.** Reward, added dollars, total dollars, latency, and final completeness answer different questions. Cheap worker placement must be qualified by role and lead capability.
5. **Keep the evidence regimes distinct.** [Towards a Science of Scaling Agent Systems](/dossiers/science-scaling-agent-systems.md) studies standardized budgets and multiple architectures; this paper spends unequal budgets inside one hierarchy. Both support task–coordination alignment, but their gains cannot be pooled as pure equal-compute benefits.

## Questions, Inconsistencies, and Limitations

- **No equal-budget solo scaling comparison.** Longer solo inference, independent sampling, stronger reasoning effort, and other ways to spend the same dollars are not directly compared here. Coordinate-wise search can miss interacting configurations and does not establish the global Pareto frontier.
- **Guidance is not enforced phase identity.** Edit-defined timing uses a limited shell-write detector. Under I guidance, **74.7%** of successful delegations precede the first detected edit; under V, **55%** occur before the final edit. A verifier can provoke later fixes, and a blocking implementation call can complete before the detector’s edit boundary. These labels identify instructions, not perfectly separated causal stages; file counts are lower bounds.
- **Main-text stage wording conflicts with the prompts.** Section 5 says the PIV lead “decides which stages to delegate,” whereas Appendix D explicitly requires workers during all three phases. The actual intervention should be read as all-stage guidance, with timing and compliance measured rather than assumed.
- **The broad cheap-implementation conclusion has a lead-tier exception.** Sol-plus-Luna implementation underperforms solo Sol, but Terra-plus-Luna I achieves **0.482 versus 0.471** Solo PIV in Table 3. The main Sol finding should not become a claim that cheap implementers always lower reward for every lead.
- **Worker count and guidance are coupled.** Dynamic stage conditions change team size, reuse, and token allocation as well as the nominal phase. Fixed-size scaling is only one run and only strong-lead/cheap-worker; its plateau cannot establish a universal four-worker ceiling.
- **Reported uncertainty is not interchangeable.** Task-level variation is substantial: mean absolute between-run reward differences are **0.057–0.113**, although benchmark-mean SD is at most **0.014** across the five GPT setups. Table 3’s reward intervals and paired-difference intervals in comparison figures answer different questions.
- **Date and counting labels need care.** The PDF’s arXiv stamp and release line differ by two days. Figure 8 calls its numeric labels “team size,” while its axis and experimental description count workers. This note distinguishes workers from total agents rather than silently treating the labels as identical.
- **Limited deployment and safety scope.** Reconstruction reward does not establish maintenance quality, real developer productivity, or safety. The study fixes a lead–worker hierarchy and mostly one benchmark; messaging cannot reach inactive agents, small-model failures include schema misuse, and public-library training exposure is a possible Commit0 saturation explanation. Safety and security are explicitly unevaluated.

## Vault Ideas Extracted

- [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md) — updated with bottleneck-specific delegation, evidence-versus-code scaling, explicit report-collection barriers, and the distinction between clean file ownership and adequate integration checking.
- [Cost-Aware Inference Control](/vault/cost-aware-inference-control.md) — updated with role-specific capability placement and added-reward/added-dollar accounting, keeping quality-gap recovery, total spend, and latency separate.
