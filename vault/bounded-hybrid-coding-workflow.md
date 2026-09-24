---
type: Synthesis
title: Bounded Hybrid Coding Workflow
description: "A coding-agent control pattern that makes known operations deterministic workflow steps, confines agent discretion to implementation and repair nodes, bounds CI retries, and escalates to humans when verification capacity or budget is exhausted."
tags: [agents, coding-agents, orchestration, verification, code-quality, human-in-the-loop]
timestamp: 2026-09-24T03:56:19Z
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
