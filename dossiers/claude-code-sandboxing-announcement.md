---
type: Study Note
title: "Beyond permission prompts: making Claude Code more secure and autonomous"
description: Anthropic's 2025 account of coupling OS-enforced command filesystem boundaries with proxied network egress to reduce agent approval fatigue.
resource: https://www.anthropic.com/engineering/claude-code-sandboxing
source: /archive/claude-code-sandboxing-announcement.html
tags: [agents, coding-agents, sandboxing, agent-security, access-control]
timestamp: 2026-09-28T18:38:44Z
---

# Beyond permission prompts: making Claude Code more secure and autonomous — Study Notes

**Publisher**: Anthropic  
**Date**: October 20, 2025

## What It Is

A first-party description of replacing repeated command approvals with a bounded zone in which a coding agent may run without interruption. Anthropic reports an 84% reduction in permission prompts in internal usage. This is an operational figure, not a measured reduction in security incidents or proof that the sandbox is complete.

## Boundary and Rationale

For the then-new sandboxed shell tool, macOS Seatbelt and Linux bubblewrap constrain the launched command and its descendants. Filesystem controls permit workspace modification but deny modifications elsewhere; network requests leave through a host-side proxy reached over a restricted channel, with destinations controlled separately. Both controls matter: broad read access plus permitted outbound traffic enables exfiltration, while writing host configuration or executables can undermine a nominal network boundary. Attempts beyond the designated boundary return to a human permission decision rather than silently changing the boundary.

The article distinguishes this local *tool* sandbox from Claude Code's web sessions. A cloud session runs in its own isolated environment, and a git proxy holds the real GitHub credential outside it. The guest uses a scoped credential; the proxy checks repository and branch constraints before substituting the real token. Separating execution from credential authority enables useful repository operations without handing the agent the credential itself.

## Analyst Takeaways and Limits

This design exchanges frequent behavioral approvals for a narrower capability boundary, but safety depends on the exact tool scope and the permissions that remain outside it. A compromised agent can still modify allowed workspace files and communicate with permitted destinations. The article's broad statement that a successful injection is “fully isolated” should be read against its described boundary, not as a universal containment guarantee; later product documentation makes explicit that other built-in tools, hooks, and MCP servers have different execution boundaries. The standalone runtime was a beta research preview at publication, and the 2025 product behavior may have changed.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md)
