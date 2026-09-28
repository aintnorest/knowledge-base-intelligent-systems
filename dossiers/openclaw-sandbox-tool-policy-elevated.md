---
type: Study Note
title: Sandbox vs tool policy vs elevated
description: OpenClaw's first-party distinction between tool placement, tool availability, and the narrow host-execution escape hatch, including precedence and bypass limits.
resource: https://docs.openclaw.ai/gateway/sandbox-vs-tool-policy-vs-elevated
source: /archive/openclaw-sandbox-tool-policy-elevated.html
tags: [agents, agent-security, sandboxing, access-control, tool-use]
timestamp: 2026-09-28T18:39:32Z
---

# Sandbox vs tool policy vs elevated — Study Notes

**Publisher**: OpenClaw documentation  
**Version**: Captured September 28, 2026; current behavior and defaults require rechecking on upgrades

## What It Is

This document separates three often-conflated agent controls: the sandbox determines *where* tools execute, tool policy determines *which named tools* are available, and elevated execution is a gated route for a permitted execution tool to run outside an ordinary sandbox. Treating any one as an all-purpose permission system leads to incorrect security claims.

## Boundaries and Precedence

The documented default sandbox mode is off unless a creator's operator role requires confinement. Other modes confine non-main sessions or all sessions; a group or channel session is not the main session merely because a user thinks of it that way. A required creator-role sandbox takes precedence over agent preferences, cannot be bypassed via elevation or host override, and fails closed when provisioning fails.

Tool policy composes profile, provider, global/agent, and sandbox-specific gates. Denials win, and a nonempty allowlist excludes unspecified tools. The gate checks tool identities, *not effects performed inside a permitted tool*. Granting a general shell while denying named file-edit tools does not make that shell read-only. Conversely, permission to elevate execution does not restore a tool denied by policy or grant unrelated tools.

Elevation affects execution alone, may move it from sandbox to host under sender and enablement gates, and does not overcome required-role confinement. Its availability is not scoped to a particular skill. Running directly on the host already makes the ordinary sandbox distinction irrelevant for that action. In this model, security inspection must establish the effective policy for the actual session, not assume a global setting describes all agent actions.

## Porous Mounts and External Capabilities

Filesystem visibility depends on workspace and mount choices as well as sandbox placement. A bind mount can expose host paths; writable mounts widen effects, and mounting a container-control socket effectively grants host control despite process isolation. The source states that bind-source validation resolves existing parent symlinks before checking blocked paths and allowed roots, including nonexistent target leaves. This is a concrete defense against a path-alias bypass, not evidence that every mounted resource is safe.

The document also notes sandbox-specific gates for MCP tools: discovering a tool upstream need not make it available inside the sandbox. Audit entries record tool-policy removal or sandbox blocking, but logs observe policy decisions rather than preventing harmful side effects inside an allowed generic execution tool.

## Analyst Takeaways

1. Model placement, named-tool admission, and host escape as separate controls with distinct override rules.
2. A tool allowlist is not a capability sandbox when one allowed tool can perform the denied tool's effects.
3. A mandatory outer confinement rule is meaningful only if provisioning fails closed and host-bypass routes cannot override it.
4. Analyze mounts, credentials, and control sockets as part of effective confinement, not as incidental setup.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
* [Partial-Scope Tool Sandboxing](/vault/partial-scope-tool-sandboxing.md)
* [Tool Identity Versus Effect Authority](/vault/tool-identity-versus-effect-authority.md)

