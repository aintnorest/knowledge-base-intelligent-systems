---
type: Study Note
title: "Minions: Stripe’s one-shot, end-to-end coding agents—Part 2"
description: Stripe's implementation account of minion blueprints that interleave deterministic and agent nodes, scoped rules, curated MCP access, local lint feedback, selective CI, and a two-run escalation boundary.
resource: https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2
source: /archive/stripe-minions-blueprints-and-ci.html
tags: [agents, coding-agents, orchestration, code-quality, verification, agent-harness]
timestamp: 2026-09-24T03:45:40Z
---

# Minions: Stripe’s one-shot, end-to-end coding agents—Part 2 — Study Notes

**Author**: Alistair Gray  
**Publisher**: Stripe Dot Dev Blog  
**Date**: February 19, 2026

## What It Is

Part 2 explains the machinery behind Stripe's unattended coding agents, particularly **blueprints**: code-defined state machines in which deterministic nodes alternate with bounded agent loops. At publication, Stripe reports **over 1,300 merged fully minion-produced, human-reviewed PRs per week**, up from over 1,000 in Part 1. The count measures merged output, not the fraction of attempted jobs that succeed or downstream defect rates.

## Environment Before Intelligence

Minions run in isolated, standardized AWS EC2 **devboxes**, already used by human engineers as remote development machines. Stripe maintains a pre-warmed pool with cloned large repositories, Bazel and type-check caches, code-generation services, and recent master checkouts; its target is readiness within **10 seconds**. A separate box per task prevents agents from interfering with one another. Unlike a laptop with personal credentials, the QA devbox is isolated from production services, real user data, and arbitrary network egress. Stripe says a separate internal security-control framework restricts destructive MCP actions; it does not publish its threat model or enforcement details.

The harness originated as a late-2024 fork of Block's **goose**, adapted for Stripe infrastructure and an unsupervised run rather than a companion agent awaiting human commands. Within the quarantined devbox, the coding agent can act without confirmation prompts. The resulting branch, by contrast, still requires human scrutiny.

## Blueprints: Deterministic and Agentic Steps

Stripe distinguishes a fixed-edge workflow from an agent's flexible tool loop and blends them. A blueprint node either executes ordinary code or invokes a scoped agent loop. **“Implement task”** and **“Fix CI failures”** are agent nodes allowed to explore; **“Run configured linters”** and **“Push changes”** are deterministic nodes, not LLM calls. The orchestration therefore guarantees required actions by construction while limiting agent discretion to places where judgment is needed.

This division has two practical benefits claimed by Stripe: fewer tokens spent rediscovering predictable steps and fewer opportunities for the model to omit them. At agent-node boundaries, the harness can reduce or restructure conversation context, change prompts, and restrict tool access. Teams may define specialized blueprints, such as migrations too complex for a deterministic codemod. “Blueprint” is an implementation primitive, not an empirical proof that every configured step achieves its intended outcome.

## Scoped Context and Controlled Tools

Stripe avoids large unconditional instruction files. It attaches rules for subdirectories or file patterns as the agent traverses files; minions read Cursor-style rules and an earlier internal format, while Cursor rules are synchronized for Claude Code. The point is one shared source of task-local conventions rather than three diverging rule corpora.

Dynamic information comes through a central MCP service, **Toolshed**, which contains **nearly 500 tools** in this later account, up from Part 1's “more than 400.” A minion gets a deliberately small default subset, with thematically grouped additions configurable per user. Internal docs, tickets, build status, and code search can be fetched; likely links may be hydrated before the loop starts. “Nearly 500 available” must not be confused with “500 exposed to each minion.”

## Lint Tiers, Selective CI, and Escalation

Stripe's feedback loop deliberately spends the cheapest verification first:

1. Pre-push hooks fix common lint issues; a background daemon precomputes applicable lint heuristics and caches results, reportedly yielding fixes **well under one second** on a push. Part 1 describes the selected local lint executable as taking **under five seconds**; these refer to related but differently scoped local checks.
2. A deterministic blueprint node runs relevant linters and loops locally before pushing, so trivial formatting or lint errors do not consume a remote CI round.
3. Pushing triggers **relevant** tests selected from an estate of **over three million**, not a claim that all three million run on every push. Stripe applies available test autofixes automatically.
4. Failures with no autofix become agent feedback for one local repair and a second push. **There are at most two CI runs** in the standard blueprint: the original run and one repair run.
5. After that second push and CI result, the branch returns to the **human operator for manual scrutiny**. An unresolved CI failure is escalated, not silently called a pass and not recycled through unlimited agent retries.

This policy is an explicit cost–latency–quality trade-off, not a proof that two rounds are universally optimal. The human reviews the branch and decides whether additional work, correction, or review is appropriate.

## What Is Claimed Versus Measured

**First-party counts and configured limits**: over 1,300 merged agent-authored PRs weekly; 10-second devbox readiness target; nearly 500 Toolshed tools in inventory; over three million tests in the estate; one or two CI rounds. The reported local-cache latency is qualitative (“well under a second”). These describe capacity and design more directly than quality.

**Claims without comparative measurement**: containing LLMs in smaller boxes improves reliability, deterministic nodes save tokens and CI cost, pre-warmed boxes improve agent performance, and two CI rounds strike a good balance. The post gives no ablation, selection precision, no-human-edit merge fraction among *all attempts*, incident rate, escaped failures, or distribution of review time. It is a first-party production account, not an independent benchmark.

## Analyst Takeaways

1. **Make required checks graph edges, not reminders.** Put lint, push, selected tests, and escalation into an executable workflow; let the agent own open-ended implementation and diagnosis.
2. **Separate local retries from remote budget.** Fast lint and autofix loops can repeat before CI; cap full CI rounds, preserve the failing evidence, and hand unresolved work to a human.
3. **Context is an access-controlled dependency.** Attach rules at relevant path scopes and curate MCP subsets. A large central tool catalog is useful only if each agent sees a safe, pertinent slice.
4. **Reuse developer infrastructure where it is already safe.** Pre-warmed isolated environments and selective CI serve both human and agent throughput; isolation should be verified rather than inferred from a tool prompt.
5. **Record denominators.** Weekly merged PRs say little without started, aborted, rewritten, failed-CI, and post-merge-fix counts.

## Questions and Limitations

- Does the rule system avoid conflicting instructions and stale synced copies, and how is applicability tested?
- Which test-selection failures escape CI, and how often does the second CI run find unresolved defects?
- What authority do configurable MCP tool groups grant, and how is destructive-action prevention implemented?
- The source does not isolate the benefits of blueprints from better base models, mature infrastructure, review practices, or changes in task mix.
- The two-round cap applies to the standard minion blueprint; it is not a prescribed cap for every software team or every change risk.

## Vault Ideas Extracted

* [Bounded Hybrid Coding Workflow](/vault/bounded-hybrid-coding-workflow.md)
* [Clarification Need Decision](/vault/clarification-need-decision.md)
