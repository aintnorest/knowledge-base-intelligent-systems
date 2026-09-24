---
type: Study Note
title: "Minions: Stripe’s one-shot, end-to-end coding agents"
description: Stripe's first-party account of unattended coding agents that turn Slack requests into CI-tested, human-reviewed pull requests through isolated devboxes, deterministic gates, selective testing, and bounded iteration.
resource: https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents
source: /archive/stripe-minions-one-shot-coding-agents.html
tags: [agents, coding-agents, code-quality, orchestration, verification, human-in-the-loop]
timestamp: 2026-09-24T03:45:40Z
---

# Minions: Stripe’s one-shot, end-to-end coding agents — Study Notes

**Author**: Alistair Gray  
**Publisher**: Stripe Dot Dev Blog  
**Date**: February 9, 2026

## What It Is

Stripe describes **minions**, unattended coding agents intended to turn a developer request into a branch, CI run, and pull request ready for human review without interaction during execution. The source reports **over 1,000 completely minion-produced PRs merged each week**: these contain no human-written code but are human-reviewed. That distinction matters: autonomous code production is not autonomous acceptance or deployment.

The stated motivation is developer attention. Engineers may launch several minions from Slack in parallel, including during on-call work; CLI and web entry points also exist. Slack invocation includes the whole thread and linked context. Documentation, feature flags, internal tickets, and flaky-test tickets provide other entry points. The operator can inspect a run's decisions in a web UI, provide follow-up instructions to update a branch, or edit a completed branch personally. The fully unattended, no-human-code PR is an aspiration for a class of runs, not a requirement that every attempt succeeds untouched.

## Why a Stripe-Specific Factory

The article contrasts greenfield prototype generation with work in **hundreds of millions of lines** across large repos, largely Ruby with Sorbet, proprietary libraries, financial-institution and compliance dependencies, and more than **$1 trillion per year** in live payment volume. These figures frame engineering constraints rather than measure the agents' correctness. Stripe argues that existing investments in source control, environments, code generation, and CI make its custom integration practical.

A minion receives a pre-warmed, isolated developer environment called a **devbox**, with code and services preloaded and an approximately **10-second** startup target. Stripe says these boxes are isolated from production resources and the internet. Isolation supports many concurrent tasks and removes interactive approval prompts in the constrained environment; it does not imply that a resulting pull request can bypass review.

## The Execution and Feedback Loop

1. A request enters from Slack or another developer surface; links and relevant MCP calls hydrate the initial context before the agent begins.
2. The core loop runs on a Stripe fork of Block's **goose**. A custom orchestration flow interleaves agentic steps with deterministic git operations, linting, and testing so required steps are not left to an LLM's memory.
3. Directory-scoped rule files give local coding conventions without loading the full repository's rules into every context. A central MCP server, **Toolshed**, hosts **more than 400 tools** across internal systems and SaaS services; each agent receives a curated subset. This is the Part 1 count; Part 2 later says nearly 500.
4. On git push, a local executable selects relevant lints heuristically and runs them in **under five seconds**. This is the first feedback tier; cheap known failures should be fixed before remote CI.
5. CI selects relevant tests from a corpus of **over three million tests** rather than running the entire corpus for each change. Automated test-failure fixes are applied when available; failures without autofixes go back to the minion.
6. CI has a strict budget: **often one, at most two CI runs**. After an initial failed push, the agent gets a fix-and-push second chance; it does not loop indefinitely. Part 2 clarifies that after the second push and CI run, the branch returns to the human operator for manual scrutiny.
7. The minion prepares a PR in Stripe's template. A human checks the code and requests another engineer's review before merge, or sends the minion further instructions.

The combination is neither an unconstrained agent loop nor a purely fixed workflow. Deterministic steps perform known actions; an agent explores and repairs unknowns; locally available lint feedback is preferred over an expensive global CI loop.

## What Is Claimed Versus Measured

**Reported operational observations**: over 1,000 merged no-human-code minion PRs each week, roughly 10-second devbox startup, sub-five-second selected lint feedback, a three-million-plus-test estate, and a two-run CI ceiling. These are first-party counts and system parameters, not independently audited comparative outcomes.

**Unmeasured assertions**: unattended runs conserve developer attention, parallelization improves productivity, and the bounded CI policy balances speed and completeness. No denominator of attempts, per-task pass rate, defect escape rate, review time, CI selection recall, cost per accepted PR, or controlled comparison with human coding is provided. A merged PR count does not by itself establish quality or net time savings.

## Analyst Takeaways

1. **Keep human review at the acceptance boundary.** One-shot means no mid-run interaction; Stripe's shipped PRs still receive human review. A light factory can copy that separation without pretending unattended generation warrants unattended merge.
2. **Put mandatory gates in executable orchestration.** A prompt saying “remember to lint” is weaker than a deterministic node that cannot be skipped; pair flexible implementation with fixed git, lint, test, and handoff steps.
3. **Spend verification budget in tiers.** Cheap targeted lint and autofixes precede selective CI; bound expensive iterations and return unresolved failures to a human instead of concealing or retrying forever.
4. **Make isolation and permissions infrastructure-level.** A clean development environment is useful for parallel work, but network and production-resource restrictions need enforcement outside the model; curated MCP tool sets reduce exposed surface.
5. **Measure adoption and quality separately.** PR volume is an operational signal; compare escaped regressions, human review effort, total latency, and compute against a meaningful baseline before treating it as a productivity result.

## Questions and Limitations

- How often do minions produce review-ready changes on the first or second push, and how many attempts are discarded or heavily rewritten?
- How are relevant tests selected from the three-million-plus corpus, and what is the missed-test risk?
- Does the isolation/permission model cover every MCP action, including access to sensitive development data?
- The account is an engineering narrative, not a controlled study. It does not quantify the incremental effect of devboxes, rules, blueprints, linting, or model choice.
- The specifics depend on Stripe's mature internal developer platform; a smaller team should borrow the control-flow pattern rather than replicate hundreds of tools or millions of tests.

## Vault Ideas Extracted

* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md)
* [Bounded Hybrid Coding Workflow](/vault/bounded-hybrid-coding-workflow.md)
* [Safety-Constrained Regression Test Selection](/vault/safety-constrained-regression-test-selection.md)
