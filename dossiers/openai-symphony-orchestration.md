---
type: Study Note
title: "An open-source spec for Codex orchestration: Symphony"
description: OpenAI's first-hand account of replacing interactive session supervision with ticket-driven agents, per-issue workspaces, workflow policy, and review handoffs.
resource: https://openai.com/index/open-source-codex-orchestration-symphony/
source: /archive/openai-symphony-orchestration.html
tags: [agents, orchestration, coding-agents, long-horizon, agent-harness, human-in-the-loop]
timestamp: 2026-09-28T18:41:04Z
---

# An open-source spec for Codex orchestration: Symphony — Study Notes

**Authors**: Alex Kotliarskyi, Victor Zhu, and Zach Brock  
**Publisher**: OpenAI  
**Date**: April 27, 2026

## From Sessions to Deliverables

OpenAI reports that individual engineers could comfortably supervise about **three to five** simultaneous coding-agent sessions before context switching degraded the work. Symphony shifts the unit of supervision from a terminal session or PR to a tracker issue. A long-running orchestrator assigns eligible tickets to agents in per-issue workspaces, checks state, restarts stalled or failed work, and hands results to human review. One issue can encompass several PRs, an investigation without a PR, or a dependency-constrained tree of child tasks.

The authors describe using ticket dependencies to gate work—for example, delaying a React upgrade until a Vite migration completed. Agents may also file follow-up issues for newly noticed work, while humans evaluate and schedule those requests. A product manager or designer can submit a feature ticket and receive a review packet with a video of the feature running. Human attention moves toward specifying, evaluating, and accepting deliverables rather than repeatedly nudging sessions.

## Harness and Control Boundaries

The tracker supplies durable task state; a repository-owned workflow document supplies versioned behavioral policy; a programmable coding-agent app server supplies agent execution. The team initially used a polling Codex session in tmux, but found it insufficiently reliable and moved to a dedicated runner. The blog says a host-mediated tracker tool lets the agent request tracker operations without exposing the tracker access token to its subprocess. This protects the credential itself, not necessarily the authority of whatever broad tracker mutations the host tool permits.

The authors learned that rigidly confining agents to implementation-only transitions squandered their ability to handle review feedback, CI, rebases, and multiple PRs. They moved toward outcome-oriented tasks with broader tools, while adding end-to-end tests, browser-driven verification, skills, and clearer documentation when unattended agents missed the mark. Ambiguous and high-judgment problems still call for interactive collaboration.

## Reported Experience and Limits

Some OpenAI teams reportedly saw **500% more landed PRs over the first three weeks** after adoption. This is a first-party, selected-team before/after throughput observation; there is no controlled comparison, defect-rate series, denominator for participating teams, or causal isolation of orchestration from model and harness changes. More PRs are not proof of better user outcomes. The post says the open-source artifact is a specification and reference implementation, **not a maintained standalone product**; its internal workflow does not establish a universal security posture.

The team says it implemented the specification in Elixir, then used Codex implementations in TypeScript, Go, Rust, Java, and Python to uncover ambiguities. That is a practical cross-implementation consistency probe, not evidence that every port reaches production readiness.

## Analyst Takeaways

1. **Use durable work items as the unit of orchestration.** Tracker state survives sessions and lets workers resume or hand off without asking a human to remember which terminal owns which task.
2. **Separate workflow policy from scheduler mechanics.** The repo specifies task completion and evidence while the orchestrator handles claims, retries, and isolation.
3. **Broader autonomy raises the importance of reviewable outputs and explicit tool authority.** Delegating CI and tracker actions saves context switching but expands effects beyond source edits.

## Vault Ideas Extracted

* [Machine-Readable Agent Specifications](/vault/machine-readable-agent-specifications.md)
* [Bounded Hybrid Coding Workflow](/vault/bounded-hybrid-coding-workflow.md)
* [Reviewable Change Units](/vault/reviewable-change-units.md)
* [Ledger-Centered Agent Control Plane](/vault/ledger-centered-agent-control-plane.md)

