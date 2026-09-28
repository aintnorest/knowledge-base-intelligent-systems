---
type: Study Note
title: "What we’ve learned building cloud agents"
description: Cursor's first-hand account of full development environments, durable orchestration, and separating agent loop, VM lifecycle, and retry-aware conversation streams.
resource: https://cursor.com/blog/cloud-agent-lessons
source: /archive/cursor-cloud-agent-lessons.html
tags: [agents, coding-agents, orchestration, reliability, agent-harness, long-horizon]
timestamp: 2026-09-28T18:43:43Z
---

# What We’ve Learned Building Cloud Agents — Study Notes

**Author**: Josh Ma  
**Published**: June 2, 2026

## What It Is

Cursor's retrospective on moving coding agents from a local development environment to dedicated cloud VMs. The hidden product is the operational layer: reproducing development dependencies and verification, hibernating and checkpointing machines, governing secrets and egress, and surviving failures while work continues unattended. Missing environment capabilities can silently reduce code quality without a crash, making model-only explanations misleading.

## Durable Work Outside the VM

An early work-stealing design let worker nodes run agent loops to completion but, the author says, achieved only about one nine of reliability in beta. Moving the loop to Temporal provided durable scheduling and recovery across provider failures, VM hibernation, and host replacement; Cursor reports crossing two nines after migration. At the publication date Temporal handled over 50 million actions daily across more than 7 million unique workflows, and over 40% of internal PRs reportedly came from cloud agents. These are self-reported fleet metrics with no denominator for user-visible quality or causal attribution to one architecture change.

The agent loop, execution machine, and conversation record have separate lifecycles. This permits readonly or prewarmed VMs, subagents on other machines, and sessions surviving machine replacement. The conversation store is append-only and streams updates to clients. On workflow retry, partially streamed output must be detectable and rewound before replacement output appears, or clients may display an abandoned execution as current. Cursor moved from very long workflows to shorter task-bounded workflows for easier upgrades and separated activities as asynchronous tools and failure assumptions evolved.

## Harness Responsibility and Limits

As models improved, Cursor moved some fixed post-task checks, commit/push behavior, multirepo logic, and CI-log retrieval out of the harness into tools the agent can choose. Other structure remains: computer use has a dedicated subagent/model route and shares a desktop environment with its parent. Cloud runs are prompted toward autonomy because an unattended approval wait can cost hours. The prospective ability to detect missing secrets or blocked network and self-heal is a future direction, not a demonstrated deployed safety mechanism.

## Analyst Takeaways

- Keep durable decision state independent from replaceable compute; a VM snapshot alone cannot preserve correct scheduling, retries, and user-visible stream semantics.
- Treat environment completeness as an outcome variable: a cloud agent unable to build or inspect behavior may fail subtly while appearing to run normally.
- Move decisions into model tools selectively while retaining deterministic authority boundaries and recovery logic outside the model.

## Vault Ideas Extracted

* [Control-Data Plane Separation for Agents](/vault/control-data-plane-separation-for-agents.md)
* [Structured Execution Memory](/vault/structured-execution-memory.md)
* [Interruption Recovery Without Duplicate Effects](/vault/interruption-recovery-without-duplicate-effects.md)

