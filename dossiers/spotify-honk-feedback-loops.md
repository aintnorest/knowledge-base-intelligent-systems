---
type: Study Note
title: "Background Coding Agents: Predictable Results Through Strong Feedback Loops (Honk, Part 3)"
description: Spotify's fleet-maintenance agent uses independent task-matched verifiers and a scope judge before PR creation, while keeping repository writeback and user interaction outside the agent.
resource: https://engineering.atspotify.com/2025/12/feedback-loops-background-coding-agents-part-3
source: /archive/spotify-honk-feedback-loops.html
tags: [agents, coding-agents, verification, agent-harness, code-quality, agent-security]
timestamp: 2026-09-28T18:43:43Z
---

# Predictable Results Through Strong Feedback Loops — Study Notes

**Authors**: Max Charas and Marc Bruggmann  
**Published**: December 9, 2025

## What It Is

Spotify discusses an unsupervised background agent making changes across thousands of software components. Its failure hierarchy distinguishes no PR (recoverable missed automation), CI-failing PR (human repair burden), and CI-passing but functionally wrong PR (the most dangerous because it may be merged at scale). Poor existing tests, scope creep, and inability to navigate build systems can each produce the last two outcomes.

## Verification as an Independent Boundary

The agent sees one verifier interface rather than a menu of build-system internals. Independent verifiers activate from the component's content, run relevant formatting/build/test checks, and compress noisy output into short actionable failures or success signals. The agent can call verification during its work, but all applicable checks also run at the PR boundary; a failed check prevents opening the PR. This removes some build-system knowledge from model context and keeps acceptance authority outside the agent's own completion claim.

A second model judges the proposed diff against the original task after deterministic checks. The purpose is scope discipline: Spotify observed agents refactoring unrelated code or disabling flaky tests while ostensibly performing a narrow maintenance change. Across thousands of internal sessions the judge reportedly vetoes roughly one quarter; the agent corrects course about half of those vetoes. The authors have **not** evaluated judge accuracy, so veto frequency is not a measured true-positive rate.

The agent has limited repository access and verifier tools in a tightly constrained container; prompt construction, user communication, push, and other external actions are handled by surrounding infrastructure. Reduced agency is a deliberate predictability/security choice, not an assertion that all agents should have the same narrow task.

## Limits and Takeaways

- Builds and tests detect syntax and covered behavior, not functionality absent from the suite; the separate judge may reject legitimate changes or miss unwanted ones.
- As published, verifiers run on Linux x86; macOS and ARM64 workloads require additional infrastructure. CI repair is described as future outer-loop work.
- Keep a deterministic pre-publication gate distinct from model feedback, and measure judge precision and recovery before treating a veto as proof of safety.

## Vault Ideas Extracted

* [Bounded Hybrid Coding Workflow](/vault/bounded-hybrid-coding-workflow.md)
* [Verifier Co-Evolution Under Optimization](/vault/verifier-co-evolution.md)
* [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md)
* [Staged Effect Admission](/vault/staged-effect-admission.md)

