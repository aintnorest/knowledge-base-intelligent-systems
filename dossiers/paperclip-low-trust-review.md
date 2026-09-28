---
type: Study Note
title: Paperclip Low-Trust Presets — Containing Review Work
description: A first-party boundary model for agents processing hostile review inputs, combining intersected scope, sandboxed execution, secret restrictions, and mediated parent reports.
resource: https://github.com/paperclipai/paperclip/blob/master/doc/LOW-TRUST-PRESETS.md
source: /archive/paperclip-low-trust-review.md
tags: [agents, agent-security, access-control, prompt-injection, sandboxing, multi-agent]
timestamp: 2026-09-28T00:00:00Z
---

# Paperclip Low-Trust Presets — Containing Review Work — Study Notes

## What It Is

Paperclip distinguishes ordinary company-visible collaboration from an opt-in lower-trust review path for agents reading hostile pull requests, tickets, dependency changes, or generated review output. The point is containment of the *agent's ability to read, mutate, and report*, not privacy for human users or an invisible project. Its named presets remain available in the core product even where policy editing is unavailable.

## The Boundary

Agent, project, and issue/run trust policies intersect; the narrower effective boundary wins. A low-trust run must resolve to a concrete company-local project or issue scope, and invalid cross-company or unsupported scopes fail closed. It cannot directly change agent configuration, instruction bundles, or shared skills. The managed run additionally needs a sandboxed execution environment and isolated workspace, with only boundary-approved secret bindings; inline sensitive environment values and unapproved runtime-service mutations are denied. A manual local review workflow does not thereby acquire the managed isolation guarantee.

The most important cross-boundary case is reporting. Ordinary children may comment one hop up to their parent, but a low-trust reviewer's free-text comment could launder injected instructions from a diff into a higher-trust agent's task context. The low-trust default therefore disables that comment. The reviewer instead records its verdict on its own issue and completes the review even if findings are adverse; a blocker-resolution wake prompts the parent to read it. If the child blocks or cancels, the platform emits a deduplicated, system-attributed stop relay upward. This preserves the parent's awareness without promoting arbitrary delegate prose as a trusted parent-thread instruction.

## Takeaways and Limits

1. Treat report channels as information-flow edges, not just collaboration conveniences; a safe child sandbox is insufficient if its untrusted text is promoted into a privileged parent's prompt.
2. Derive effective authority as the intersection of relevant scopes and fail closed when the run cannot be bound to a concrete tenant-local target.
3. Separate human work visibility from agent execution containment; a review preset is not a general privacy feature.

This short document states enforcement requirements but supplies no penetration test, failure-rate measurement, or proof that every out-of-band network route is mediated. The distinction between a task API boundary and a full host security boundary remains material.

## Vault Ideas Extracted

* [Control-Data Plane Separation for Agents](/vault/control-data-plane-separation-for-agents.md)
* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
* [Attenuated Delegation Authority](/vault/attenuated-delegation-authority.md)
* [Staged Effect Admission](/vault/staged-effect-admission.md)

