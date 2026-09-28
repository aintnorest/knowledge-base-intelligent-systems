---
type: Study Note
title: "How Missions Work"
description: Factory's role-separated long-horizon coding architecture derives behavioral validation before feature decomposition and uses fresh validators to challenge worker output at milestones.
resource: https://factory.com/news/missions-architecture
source: /archive/factory-missions-architecture.html
tags: [agents, coding-agents, multi-agent, orchestration, verification, long-horizon]
timestamp: 2026-09-28T18:43:43Z
---

# How Missions Work — Study Notes

**Author**: Theo Luan  
**Published**: April 10, 2026

## What It Is

Factory describes Missions as a long-horizon coding architecture that separates planning, implementation, and judgment. Its rationale is context directionality: a long append-only trajectory collects irrelevant evidence and an implementer can become anchored to its own choices when evaluating them. This is an argued design hypothesis, not a controlled comparison of independent versus self-reviewing agents.

## Mechanism

An orchestrator first writes a finite contract of user-observable behavioral assertions, then decomposes work into features and milestones tied to those assertions. Fresh-context workers implement bounded features and write tests before code; they do not have final authority to declare correctness. At each milestone fresh scrutiny validators inspect changes and trajectories, while user-testing validators exercise the running system as a black box against the prior contract. The orchestrator translates reported gaps into fix features and repeats milestone validation; blocked work is escalated rather than silently marked done.

Shared artifacts hold contract, features, research, and operational knowledge outside any single agent's window. This lets the orchestrator retain task-level state without absorbing every implementation observation, while workers and validators receive narrower context and may use different models suited to their roles. The price is substantial validation work, artifact upkeep, and dependence on the original behavioral contract's coverage.

## Reported Run and Limits

One Slack-clone example ran 16.5 hours, with 9.98 hours implementation and 6.14 hours validation (37.2%); the source reports 185 agent runs, 778.5 million total tokens including 744.9 million cache reads, 38.8k lines of code (52.5% tests), and 89.25% statement coverage. No milestone passed its first validation round; all six passed within four rounds. Validators surfaced 81 issues and the orchestrator produced 21 fix features out of 61 total features. This is evidence that the correction loop actually did work in one run, not independent proof of the Slack clone's production quality or general cost-effectiveness. Coverage does not prove behavioral completeness.

## Analyst Takeaways

- Define black-box success before feature decomposition to reduce implementation-contaminated acceptance criteria.
- Separate worker belief from completion authority; fresh validators can challenge assumptions accumulated during implementation.
- Budget validation as real engineering work: in the example it consumed over a third of wall time and a third of token volume, while still depending on imperfect validators.

## Vault Ideas Extracted

* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md)
* [Reviewable Change Units](/vault/reviewable-change-units.md)
* [Verifier Co-Evolution Under Optimization](/vault/verifier-co-evolution.md)
* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md)

