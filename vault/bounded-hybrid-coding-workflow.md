---
type: Synthesis
title: Bounded Hybrid Coding Workflow
description: "A coding-agent control pattern that makes known operations deterministic workflow steps, confines agent discretion to implementation and repair nodes, bounds CI retries, and escalates to humans when verification capacity or budget is exhausted."
tags: [agents, coding-agents, orchestration, verification, code-quality, human-in-the-loop]
timestamp: 2026-10-14T13:00:00Z
---

# Bounded Hybrid Coding Workflow

A coding-agent workflow is safer and cheaper when known operations are ordinary code and only open-ended problem-solving is left to the model. Define the run as a state machine: deterministic nodes handle setup, context loading, formatting, linting, pushing, test selection and handoff, and agent nodes handle implementation, diagnosis and repair. An instruction such as "always run the linter" is not the same thing as a transition the agent cannot skip.

## How It Works

1. **Provision** an isolated task environment with only the repository rules and tools the task needs.
2. **Implement** in an agent node, against an explicit task contract (see [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md)).
3. **Shift feedback left.** Cheap deterministic checks run first and locally: formatting, targeted lint and autofixes on the changed files. Only then push and run tests selected for the change (see [Safety-Constrained Regression Test Selection](/vault/safety-constrained-regression-test-selection.md)).
4. **Repair in a bounded loop.** Real failures return to a scoped repair agent under an explicit CI budget. Stripe allows an initial CI run plus one repair run. When the budget is spent, keep the failing branch and hand it to a human. An unresolved failure is never reported as a pass.
5. **Hand off for acceptance.** Keeping merge approval separate from unattended code production preserves the light-factory boundary. Track started, abandoned, reviewed, merged, reverted and post-merge-fixed attempts, plus cost and latency.
6. **Promote understood steps.** When an agent step becomes predictable, replace it with deterministic code. Shopify Roast treats this as the normal lifecycle of a workflow step.

At the publication boundary, choose deterministic verifiers from the changed component and run every applicable check even if the agent skipped an optional local run. Block publication on failures; check the diff separately against the original request for unwanted scope expansion. A model-based scope veto remains an uncalibrated signal until labeled false positives and misses are measured, so it must not replace deterministic acceptance or human authority. The publisher, not the coding agent, should own push and external writeback (see [Staged Effect Admission](/vault/staged-effect-admission.md)).

## Ground Intermediate Artifacts at Phase Boundaries

Shift feedback left of implementation too. Before generating requirements, a plan, or a task checklist, collect repository evidence relevant to that phase: existing interfaces, dependencies, paths, conventions, and constraints. After generation, check the artifact's references, feasibility, consistency, and task ordering before dependent work proceeds. An invented premise can otherwise propagate through a coherent chain of documents and only fail when code is written.

Scheduling discovery and validation makes them explicit workflow responsibilities; it does not make their judgments deterministic. Read-only discovery and prompted semantic validation remain fallible, while executable checks establish only the behavior they cover. Keep repository feasibility distinct from owner-approved intent and final feature acceptance.

The supporting experiment reports a model-judged quality increase from 3.51 to 3.66 with both grounding operations, at 24.0 versus 37.2 minutes on completed full-workflow latency pairs. Discovery-only and validation-only scores were 3.53 and 3.57, but missing ablation denominators and uncertainty preclude a strong interaction claim. The small human-preference subset favored the unaugmented workflow among non-ties. Use these operations where their checking value justifies the latency; do not infer fewer deployed defects, and account for unfinished attempts rather than treating completed-run timing as total cost.

## Verification Capacity Is the Real Throughput Limit

A factory has two throughput limits: how fast workers propose changes, and how fast tests, security checks, reviewers and integrators can authorize them. If proposals outrun checking capacity, unverified work piles up even while generation improves. Make the back-pressure visible. Track proposed, locally verified, review-ready and deployable as separate states, each with defined checks and an owner. Monitor unreviewed queue depth, check latency, false failures and escaped defects together. When verification saturates, add useful check capacity, reduce concurrent proposals, or change a negotiable bar with accountable approval. Never quietly lower a non-negotiable one.

## Limitations

A deterministic node guarantees that a step runs, not that its check is complete or correct. Test selection can miss regressions, replay can reuse stale context, and a fixed CI cap may be wrong for high-risk changes. Isolation, permissions and human review remain separate controls, and more gates can add flaky failures and review churn. The Stripe, Shopify and Osmani sources are first-party engineering or practitioner descriptions, not controlled evidence that any particular workflow graph or retry budget is optimal.

## Sources

- [Minions: Stripe’s one-shot, end-to-end coding agents dossier](/dossiers/stripe-minions-one-shot-coding-agents.md) — local lint, selective CI from a multi-million-test suite, one or two remote CI rounds, then human-reviewed PRs.
- [Minions: Stripe’s one-shot, end-to-end coding agents—Part 2 dossier](/dossiers/stripe-minions-blueprints-and-ci.md) — blueprint state machine mixing fixed lint/push nodes with agent implement/fix-CI nodes; a second failed CI run escalates to a human.
- [Introducing Roast: Structured AI workflows made easy dossier](/dossiers/shopify-roast-structured-ai-workflows.md) — declarative workflows mixing AI, shell, Ruby and coding-agent steps; understood AI steps become deterministic code.
- [Agentic Code Quality dossier](/dossiers/agentic-code-quality.md) — verification queues and the choice among scaling checks, throttling generation, or relaxing a bar.
- [The Code Agent Orchestra - what makes multi-agent coding work dossier](/dossiers/code-agent-orchestra.md) — integration and verification remain the bottleneck despite parallel coding agents.
- [Predictable Results Through Strong Feedback Loops dossier](/dossiers/spotify-honk-feedback-loops.md) — task-matched verifiers gate PR creation and a separate, not-yet-evaluated judge checks diff scope.
- [Spec Kit Agents: Context-Grounded Agentic Workflows dossier](/dossiers/spec-kit-agents-context-grounded-agentic-workflows.md) — pre-phase repository discovery and post-phase artifact validation; modest judge gains, 55% higher completed full-workflow latency, contrary human non-tie preferences, and incomplete-test grounding limitations.
