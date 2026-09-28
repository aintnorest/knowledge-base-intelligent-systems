---
type: Study Note
title: "Beltdown2: Escaping the Cursor CLI sandbox"
description: Accomplish's evidence that Cursor's host-side Git indexing honored executable repository config beyond its shell-only sandbox, and its centralized fix.
resource: https://accomplish.ai/blog/beltdown2-escaping-the-cursor-cli-sandbox/
source: /archive/accomplish-beltdown2-cursor-cli-sandbox-escape.html
tags: [agents, agent-security, sandboxing, coding-agents, access-control]
timestamp: 2026-09-28T18:39:48Z
---

# Beltdown2: Escaping the Cursor CLI Sandbox — Study Notes

**Researcher**: Or Hiltch, Accomplish  
**Published**: September 12, 2026  
**Evidence position**: Third-party security research by Accomplish, a competing agent-isolation vendor.

## Assumed Boundary

Cursor CLI's macOS Seatbelt policy confined model-driven shell commands to workspace writes and restricted network access. The harness's own background Git calls, used for file suggestions and status, ran outside that policy. In the demonstrated case, an attacker-provided workspace archive already contained armed Git metadata; an ordinary cloned repository does not carry its original `.git/config`. The model received a read-only request and ran no shell command.

## Exploited Seam and Evidence

Repository-controlled Git fsmonitor configuration can turn an apparently read-only working-tree query into executable code. Cursor's internal Git subprocesses honored that config without universal neutralization; its shared hardened Git helper was bypassed by direct subprocess calls. In the pinned July 23, 2026 build, the researcher observed an internal file-index Git call parent the fsmonitor payload directly from Cursor, outside the sandbox. The payload wrote a marker in the user's home directory; the same write through the sandboxed shell was blocked, and removing the hook suppressed the result. That differential isolates the host-side indexing seam rather than a failure to activate Seatbelt.

The vulnerable conjunction is per-tool isolation, a privileged harness helper reading attacker-controlled executable metadata, and inconsistent per-call hardening. No model decision to request dangerous execution is needed: context collection itself fires it.

## Fix, Scope, and Limitations

Anysphere reportedly shipped centralized Git hardening in Cursor CLI **2026.08.04-aaa8809**, and the researcher verified that the hook no longer fired in three clean runs. The change sets higher-precedence Git process configuration for **every** spawn, neutralizing fsmonitor, hooks, attributes, and unsafe bare-repository behavior instead of relying on each individual call site. The article verifies archive delivery, not the nested-Git trick needed to reach clean cloned repositories in the related Claude Code case. Its assertions about other products' designs are contextual, not new tests here.

## Analyst Takeaways

The relevant unit of sandbox review is the entire process tree and all internally launched tools. If privileged helpers must stay outside the sandbox, centralize and test security-critical argument/environment policy across *every* spawn, including read-like queries. A workspace trust decision cannot safely promote its executable metadata to host authority by accident.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Partial-Scope Tool Sandboxing](/vault/partial-scope-tool-sandboxing.md)

