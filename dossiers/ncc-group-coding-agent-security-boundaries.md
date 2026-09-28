---
type: Study Note
title: "An Introduction to AI Coding Agent Security"
description: NCC Group compares local coding agents' permission, sandbox, workspace-trust, tool, and configuration boundaries and classifies recurring exploit seams.
source: /archive/ncc-group-coding-agent-security-boundaries.pdf
tags: [agents, agent-security, coding-agents, sandboxing, access-control, prompt-injection]
timestamp: 2026-09-28T00:00:00Z
---

# An Introduction to AI Coding Agent Security — Study Notes

**Author**: Alex Plaskett, NCC Group (third-party security research)  
**Edition**: Version 2.0, 2026; product behavior surveyed as of May 2026  
**Length**: 50 pages

## What It Is

This whitepaper maps the security boundaries of locally operated Claude Code, Cursor, and Codex, contrasting GUI and CLI implementations and operating systems. Its principal contribution is not a list of settings but a classification of when agent-driven execution is expected behavior versus a violation of workspace trust, authorization, or sandbox containment. Cloud products, SDK integrations, MCP servers, and plugins are expressly outside scope; the emphasis is unauthorized code execution rather than measuring data exfiltration.

## Boundaries and Exploited Seams

A workspace trust dialog is meaningful only if nothing from the untrusted directory can execute before consent. The paper cites a patched Claude Code Windows case before 2.1.90 in which executable resolution could pick up a repository-planted program before trust confirmation. After trust, the relevant boundaries shift: tool permission checks govern approvals, while OS sandbox profiles constrain selected execution tools, often not *all* agent tools. The paper says Claude Code CLI's default at the time was no sandbox, while Cursor GUI on macOS enabled one by default; the difference is version-, surface-, and platform-specific.

The report groups trusted-workspace failures into sandbox escapes, permission-prompt bypasses, and sensitive-control-file overwrites. A symlink or writable agent configuration inside a sandbox can become an unsandboxed write or executable hook when another component follows it. Conversely, a nominally read-only command may accept arguments with write or execution side effects, violating approval expectations. The author emphasizes that hooks normally initialize only at startup and run outside the sandbox, so modifying hook configuration may create delayed persistence rather than immediate execution. All reviewed agents expose a sanctioned route to request execution outside a sandbox; this makes escalation UI and binding of approved action to actual effect part of the security model.

## Fix and Failure Class

The defensible control boundary is the *whole effect path*: authenticate the workspace before consuming executable project state; protect settings and hooks throughout runtime; enforce tool permissions on parsed actual effects, not command labels; constrain every relevant tool and child process; and ensure approval displays the action ultimately executed. Agent refusals are useful friction but not a hard control—the paper reports that plausible build-process framing made some harmful actions easier to elicit than obvious malicious instructions. Side-effect oracles can detect injection cases missed by a simple canary-in-response test.

The failure class is **partial boundary coverage across tools, startup phases, and downstream interpreters**. A sandboxed shell does not imply sandboxed file tools or unsandboxed helper workflows; a trust prompt does not repair execution that already occurred; an approval prompt cannot protect actions the harness wrongly marks harmless.

## Evidence and Limits

This is a synthesis of the author's observations and previously published vendor advisories, not a controlled head-to-head exploit-rate study. The PDF enumerates incidents but does not demonstrate each independently; some extracted tables are malformed in the source text and should not be read as precise frequency counts. NCC Group distinguishes user responsibility after consciously trusting an executable repository from vendor responsibility for enforceable outside-workspace and sandbox controls. No canonical publication URL or persistent identifier is present in the supplied PDF; its archived bytes are the primary reference.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Cross-Mechanism Execution-Security Evaluation](/vault/cross-mechanism-execution-security-evaluation.md)
* [Assume-Compromise Boundary Testing](/vault/assume-compromise-boundary-testing.md)
* [Partial-Scope Tool Sandboxing](/vault/partial-scope-tool-sandboxing.md)

