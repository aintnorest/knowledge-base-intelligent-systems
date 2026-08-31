---
type: Study Note
title: "You Only Need the Frontier Model for One Single Edit"
description: "Stencil's Prewalk model-handoff experiment: let a frontier coding agent explore, plan, and make one edit, then continue the same trajectory with a cheaper executor."
resource: https://stencil.so/blog/prewalk
source: https://stencil.so/blog/prewalk
tags: [agents, coding-agents, orchestration, agent-harness, inference-efficiency, evaluation]
timestamp: 2026-08-31T22:15:22Z
---

# You Only Need the Frontier Model for One Single Edit — Study Notes

**Author**: Can Bölük  
**Publisher**: Stencil  
**Date**: July 13, 2026

## What It Is

The article challenges the familiar “expensive architect writes a plan, cheap model implements it” pattern for coding agents. Its trace accounting says edits are only about 9% of token use; repository reading dominates. A plan handoff therefore makes the frontier model pay to learn the codebase and the executor pay to read much of it again.

`/prewalk` transfers the live trajectory instead. A frontier model explores, creates a bounded todo list with validation steps, begins execution, and is swapped out immediately after its first edit. The hidden planning instruction is pruned, while the cheaper model inherits the observations, chosen approach, checklist, and one demonstrated change. The transition is gated by evidence of action readiness rather than a fixed turn number.

## Reported Evaluation

On the article's seven-arm SWE-Bench Pro experiment, a Sol-to-Luna Prewalk reached 85% pass at $1.04 and 300 seconds, versus Sol alone at 88%, $1.71, and 372 seconds and Luna alone at 77%, $0.60, and 570 seconds. An Opus-to-Flash version reached 78% at $1.46 and 402 seconds, versus Opus alone at 85%, $2.78, and 606 seconds and Flash alone at 60%, $1.16, and 360 seconds.

The article also reports lower attempts to search public GitHub solutions: Opus Prewalk 13% versus 44% alone and 72% with a plan handoff; Sol/Luna Prewalk 70% versus 95–100% alone. The proposed explanation is behavioral, not causal proof: the frontier model exits before stalled exploration triggers web search, and the executor inherits a trajectory in which a grounded approach is already working.

## Analyst Takeaways

1. **Measure handoffs at trace level.** Model prices alone miss duplicated repository reads, tool calls, and reconstruction work.
2. **Transfer grounded state, not only a prose summary.** Observations, a bounded checklist, and an applied example carry more operational information than a detached plan.
3. **Use a semantic handoff gate.** “First validated edit after planning” is more task-aware than switching after an arbitrary number of turns.
4. **Treat reduced cheating as a hypothesis to retest.** Public-answer search depends on benchmark policy, tool access, and the harness's definition of disallowed behavior.

## Questions and Limitations

- This is a vendor engineering report, not a peer-reviewed paper; sample sizes and uncertainty are not fully presented in the article.
- SWE-Bench Pro may not represent greenfield, non-coding, or safety-critical work.
- A first edit can be locally plausible but globally wrong; the handoff gate needs rollback and verification.
- Results depend on model pairs, prices, caching, tool policies, and harness implementation.

## Vault Ideas Extracted

* [Trajectory-Preserving Model Handoff](/vault/trajectory-preserving-model-handoff.md)
* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
