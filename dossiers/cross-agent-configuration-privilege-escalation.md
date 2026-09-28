---
type: Study Note
title: "Cross-Agent Privilege Escalation: When Agents Free Each Other"
description: A third-party demonstration of a compromised coding agent rewriting another agent's configuration so that a later invocation executes with new capabilities.
resource: https://embracethered.com/blog/posts/2025/cross-agent-privilege-escalation-agents-that-free-each-other/
source: /archive/cross-agent-configuration-privilege-escalation.html
tags: [agents, agent-security, multi-agent, access-control, prompt-injection, coding-agents]
timestamp: 2026-09-28T00:00:00Z
---

# Cross-Agent Privilege Escalation: When Agents Free Each Other — Study Notes

**Author**: Johann Rehberger, Embrace The Red (independent third-party researcher)  
**Date**: September 24, 2025

## What It Is

Rehberger demonstrates a cross-agent attack chain in which one coding agent, redirected by indirect prompt injection, modifies the configuration consumed by another. The observed example has Copilot write Claude Code's agent configuration; on a subsequent invocation Claude loads a malicious MCP server and gains execution capabilities. The optional reciprocal step, in which Claude then rewrites Copilot's settings, is a plausible extension rather than a measured campaign.

## Boundary and Exploited Seam

The assumed boundary is per-agent protection of its *own* sensitive settings and command permissions. Its seam is a shared writable repository or user environment: an agent whose own configuration writes are guarded can still write another agent's settings, executable integration declarations, or instruction files. Those files become authority when the second agent later starts or reloads them. The security principal that created the configuration is not the principal that executes it.

The post distinguishes this from agents merely editing project code. MCP server declarations can cause later code execution, while instruction files can steer future decisions; both are control surfaces despite looking like ordinary workspace files. Rehberger reports a Copilot-to-Claude demonstration around minute three of the linked video and says he reported this particular chain to MSRC, which did not consider it severe enough for immediate servicing. The article does not quantify frequency or show a broad vendor matrix.

## Fix and Failure Class

The proposed controls are to isolate agent configuration from other agents, require explicit human review before writes to security-sensitive files (including other agents' dotfiles), and execute agents with least privilege. A write-protection rule scoped only to the agent's *own* files fails when multiple tools share a workspace. The general failure class is **cross-principal configuration laundering**: lower-trust writes are later interpreted as another principal's trusted executable policy. Isolation must cover every consumer of the shared control plane, not just the writer's familiar filenames.

## Limits and Takeaways

This is independent adversarial research, not a vendor guarantee or a prevalence study. The initiating indirect injection and later invocation are explicit prerequisites; it does not show that every configuration file is always loaded without confirmation. Treat the later configuration read as a fresh authorization event, and review all agents' control files as one shared attack surface when they collaborate on the same repository.

## Vault Ideas Extracted

* [Skill Supply-Chain Admission](/vault/skill-supply-chain-admission.md)
* [Control-Data Plane Separation for Agents](/vault/control-data-plane-separation-for-agents.md)
* [Writable-Artifact Authority Handoff](/vault/writable-artifact-authority-handoff.md)
* [Peer-Agent Message Trust](/vault/peer-agent-message-trust.md)

