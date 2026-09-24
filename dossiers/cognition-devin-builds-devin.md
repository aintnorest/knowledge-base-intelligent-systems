---
type: Study Note
title: How Cognition Uses Devin to Build Devin
description: Cognition's account of internal Devin development via scoped sessions, codebase Q&A, auto-review and autofix, incident-driven triage, recurring audits, playbooks, and external tools.
resource: https://cognition.com/blog/how-cognition-uses-devin-to-build-devin
source: /archive/cognition-devin-builds-devin.html
tags: [agents, coding-agents, code-quality, orchestration, human-in-the-loop, agent-skills]
timestamp: 2026-09-24T03:45:40Z
---

# How Cognition Uses Devin to Build Devin — Study Notes

**Author**: The Cognition Team  
**Publisher**: Cognition  
**Date**: February 27, 2026

## What It Is

Cognition describes how its own staff use Devin through web, Slack, Linear, CLI, and API surfaces to build Devin. It reports **659 Devin PRs merged in the previous week**, versus **154 in its best week in 2025**. These are first-party output counts from different weeks, not a controlled comparison of quality, human effort, or task difficulty. The article is part product walkthrough and part account of workflow automation; it should not be mistaken for an independent assessment of Devin.

The core idea is a factory in which work may begin as chat, ticket, incident, scheduled audit, or API event, but each task should have enough repository context and a review/verification path to become a usable PR. Non-engineers can start a request without local Git setup, while engineers still review and test material changes.

## Context, Task Entry, and Decomposition

Repositories are indexed for **Ask Devin** codebase Q&A. A person can explore code before starting a session; the question and findings shape the session prompt. Linear/Jira tagging similarly starts an analysis/search/plan flow before implementation. The team recommends breaking large tasks into smaller isolated sessions with clear success criteria, not giving an unconstrained long-running request a vague mandate.

Reusable **Playbooks** capture outcome, required steps, postconditions, corrections to model priors, forbidden actions, and operator inputs for repeated tasks such as data ingestion, migrations, and integrations. MCP connections supply access to logs, ticket systems, and data stores; the risk boundary depends on each tool's permissions, not merely on the wording of a Playbook.

## Reviewing and Repairing PRs

Cognition says it uses **Devin Review for every PR**. A link accompanies Devin-authored PRs in Slack. The review interface groups changes logically, detects copied or moved code, offers codebase-aware questions, and labels potential bugs by confidence and severity. Severe bugs demand attention; non-severe findings warrant review; annotations are informational. Auto-Review can trigger when PRs open, commits arrive, or reviewers are assigned.

The repair loop matters more than the review label: when Devin Review or a GitHub bot flags issues, Devin can update the PR, including CI and lint fixes, until checks pass. The article does not report review precision, recall, human agreement, or whether repeated repair introduces new defects. “Review every PR” does not mean a human independently validates every generated review finding.

## Recurring and Event-Triggered Workflows

- **Design-system drift**: a daily audit scans PRs merged in the last **24 hours**, flags hardcoded colors, spacing, and off-library components, creates Linear tickets, and optionally proposes fix PRs. Individuals can also tag Devin with a screenshot to request a correction.
- **Bug-label triage**: a `!triage-bug` playbook fires when a Linear ticket gets the Bug label; it reads the report, searches code and git history, checks Datadog via MCP, and posts suspected cause, affected files, and proposed fix. This is a starting analysis, not a verified root-cause guarantee.
- **End-to-end bug investigation**: Datadog and a **read-only database replica** help inspect logs and data; Devin traces code, writes a regression test and fix, then opens a PR for review. This example is a claimed workflow, not measured elapsed-time savings.
- **Session Insights**: after a run, the tool summarizes challenges, milestones, inefficiencies, next actions, and candidate improved prompts; those suggestions can seed a new session. Treat analysis of one run as a hypothesis until tested on subsequent tasks.
- **API triggers**: Sentry crash, bug report, failed deployment, or code-review request may initiate investigation or review without a person manually opening a chat.

Cognition also describes DeepWiki auto-indexed documentation and DANA, a separate data-analysis-oriented Devin with warehouse MCP access and SQL visible for checking. Those are adjacent context/analytics interfaces, not evidence that the coding PR loop works on their own.

## What Is Claimed Versus Measured

**Reported operations**: 659 merged Devin PRs in a week versus the prior best of 154, review use on every PR, and daily design audits over a 24-hour merge window. These are counts and configured practices; they contain no denominator of launched sessions or number of reverted changes.

**Qualitative claims**: triage avoids roughly an hour of engineer investigation in a representative example, non-engineers contribute more easily, and repeated playbooks improve consistency. The source does not provide controlled timing, escaped bug rates, triage accuracy, reviewer calibration, or cost per accepted contribution. Since Cognition sells Devin, account for self-reporting and marketing framing.

## Analyst Takeaways

1. **Use an event-to-evidence pipeline, not just an event-to-PR trigger.** Ticket or incident automation should preserve original report, searched paths, log evidence, regression test, and a reviewable PR.
2. **Turn repeated task shape into a bounded Playbook.** Include outcome, postconditions, forbidden actions, and required operator inputs; verify it on several cases before promoting it to a shared procedure.
3. **Separate critique from hard checks.** Auto-review can prioritize a diff, but CI, lint, regression tests, and human review remain different evidence layers.
4. **Run post-merge audits for recurring drift.** A daily design-system scan can catch patterns that PR review misses; proposed refactors still need human scrutiny and measurable outcomes.
5. **Discount PR-volume headlines.** Measure accepted tasks, review/repair effort, incidents, rollback, and saved human time against comparable task cohorts.

## Questions and Limitations

- How many sessions and PRs were opened to yield 659 merged PRs, and how many were reverted or extensively changed?
- What are Devin Review's false-positive, false-negative, and regression-after-autofix rates?
- Which incident and database permissions are granted per agent, and are sensitive tool results filtered before being copied into PRs or comments?
- Daily audits may amplify mistaken style preferences unless rules have owners, exemptions, and an adjudication path.
- The post describes several product features as internal practices; it does not present controlled causal results or publish the underlying prompts and evaluation datasets.

## Vault Ideas Extracted

* [Feedback-Grounded Context Adaptation](/vault/feedback-grounded-context-adaptation.md)
* [Repository Drift Garbage Collection](/vault/repository-drift-garbage-collection.md)
