---
type: Study Note
title: "Why we built our background agent: Inspect"
description: Ramp's implementation account of prewarmed per-session VMs, cross-client session state, verification tools, and human attribution at PR creation for an internal coding agent.
resource: https://builders.ramp.com/post/why-we-built-our-background-agent
source: /archive/ramp-inspect-background-agent.md
tags: [agents, coding-agents, agent-harness, orchestration, verification, human-in-the-loop]
timestamp: 2026-09-28T18:43:43Z
---

# Why We Built Our Background Agent: Inspect — Study Notes

**Source**: Ramp Builders; undated captured post

## What It Is

Ramp documents its internal hosted coding agent and an implementation-oriented spec. The enduring contribution is the arrangement of session compute, durable state, clients, and verification—not the article's instructions for reproducing its vendor stack. Ramp says roughly 30% of merged frontend/backend PRs were authored by Inspect within a couple of months; the figure is internal adoption, not a controlled quality or productivity measure.

## Environment and Continuity

Each session gets a separate cloud VM containing the repository's working development stack. Repository images are rebuilt approximately every 30 minutes and snapshotted after clone and dependency preparation; launching from a recent snapshot shifts setup cost out of the user's prompt path. An agent may inspect files while its image catches up with the base branch, but writes wait for synchronization to prevent changes on stale state. End-of-session snapshots preserve work for follow-ups after the original VM exits. Prewarming on prompt composition reduces perceived startup delay, with the tradeoff that snapshots and warm pools may age relative to code.

A per-session durable database and streamed updates synchronize Slack, web, extension, and editor clients. Queued follow-ups preserve orderly turn boundaries, while interruption remains an explicit capability. Multiple people can participate in one session, so authorship must belong to each prompt/action rather than to the session as a whole. The sandbox pushes a branch; the service opens a PR with the actual user's GitHub identity. Ramp warns that a shared app identity for PR creation can permit a human to approve their own changes under a misleading author, undermining the review boundary.

## Validation and Operator Claims

Backend tools reach tests and operational telemetry; frontend sessions offer live previews and screenshots so the agent can demonstrate observable behavior. The article favors parallel sessions trying alternate approaches, and permits agents to spawn sessions; its assertion that frontier models will self-limit spawning is not a resource-control guarantee. Repository-specific environment completeness is a design advantage but also concentrates powerful integrations and demands credible credential and egress boundaries, which the article does not detail. Claims of near-instant starts, virtually free sessions, or unlimited concurrency are not supported by cost or latency distributions.

## Analyst Takeaways

- Precomputed environment state turns launch latency into a freshness/synchronization problem; guard writes until the fresh base is available.
- Multi-client continuity and human attribution are different contracts: keeping a session coherent does not automatically keep each change attributable.
- A development-equivalent agent environment improves verification, but a broad tool surface must be evaluated alongside its authority and exposure, not as an unconditional benefit.

## Vault Ideas Extracted

* [Reviewable Change Units](/vault/reviewable-change-units.md)
* [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md)
* [Runtime-Activated Application Sandboxing](/vault/runtime-activated-application-sandboxing.md)

