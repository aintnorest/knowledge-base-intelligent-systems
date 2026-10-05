---
type: Synthesis
title: Editable Plans as Boundary Objects
description: Shared, revisable plan artifacts coordinate human and agent work through actor-appropriate views of goals, ownership, dependencies, evidence, and progress.
tags: [interaction-design, human-in-the-loop, orchestration, decomposition, agents]
timestamp: 2026-10-05T21:56:59Z
---

# Editable Plans as Boundary Objects

A shared plan is a **coordination artifact**, not a one-time request to approve autonomous work. It retains a common identity while giving each participant a usable view: people need to understand goals, tradeoffs, evidence, and ownership; an executor needs actionable steps, dependencies, inputs, and current state. Identical prose for both actors is not necessarily an effective shared representation.

The plan remains editable after partial execution. Intermediate results can reveal a mistaken premise, a missing action, or a better division of labor. Planning guides execution, but execution also changes the plan.

## How It Works

- Represent goals, step ownership, dependencies, supporting evidence, and progress together. Distinguish proposed work from completed work and unresolved questions.
- Let people edit steps, reassign ownership, and curate intermediate artifacts rather than burying corrections in a conversation. Stop at human-owned work or use inspectable execution increments.
- After new evidence or an edit, reconsider the remaining plan. Preserve useful checkpoints while identifying dependent outputs that must be invalidated, repaired, or recomputed; completed work is not automatically still valid.
- Keep human-facing views and executable state in correspondence. A visual dependency map, an evidence comparison, and an execution record can expose different aspects of the same plan without silently describing different commitments.

Use this pattern when goals evolve through investigation or when collaborators contribute different expertise. Human ownership can preserve learning and judgment as well as manage risk. [Shared Alternatives Before Commitment](/vault/shared-alternatives-before-commitment.md) covers comparing candidate approaches; [Review Scaffolds and Calibrated Reliance](/vault/review-scaffolds-and-calibrated-reliance.md) covers whether the resulting review actually detects defects.

## Limitations and Failure Modes

A polished plan can induce overtrust. Even a correct plan can translate into wrong actions, and an executor restricted to existing steps may leave a newly discovered omission unrepairable. Divergence between the human view and execution state produces apparent control without actual steering. Replanning without dependency invalidation carries stale evidence into later decisions.

Shared-plan studies include small samples, short tasks, and bundled interface comparisons; perceived steerability does not establish better output quality. A larger simulated planning/intervention study found task-specific repairs and induced errors rather than a consistent calibration benefit. Richer views can add cognitive load, and generated visualizations can conceal important cases. Multiplayer editing also needs explicit conflict resolution and decision ownership.

**Representation is not authorization.** Editing or agreeing with a plan neither verifies its claims nor grants permission for every later effect. Keep consequential-action enforcement separate; see [Approval Bound to Canonical Effect](/vault/approval-bound-to-canonical-effect.md).

## Sources

- [Cocoa: Co-Planning and Co-Execution with AI Agents dossier](/dossiers/cocoa-co-planning-co-execution-agents.md) — peer-reviewed shared-plan and output-editing interface with human/agent ownership and replanning; small, bundled studies support perceived steerability, not scientific-output superiority.
- [Plan-Then-Execute: An Empirical Study of User Trust and Team Performance When Using LLM Agents As A Daily Assistant dossier](/dossiers/plan-then-execute-user-trust-llm-agents.md) — peer-reviewed simulation shows the plan-to-action gap, task-specific intervention effects, and the inability to add missing plan work after execution begins.
- [Planning with Agents: Divided Worlds, Boundary Objects, and Thicker Interfaces dossier](/dossiers/maggie-appleton-planning-with-agents.md) — practitioner proposal for actor-appropriate visual and interactive shared artifacts; no controlled evaluation establishes their efficacy or cost.
