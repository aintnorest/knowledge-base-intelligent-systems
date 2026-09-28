---
type: Study Note
title: Oh My Pi Tool Approval Model
description: The three-tier approval resolver, precedence of tool and user policy, headless delegation, and the boundary between prompting and actual containment.
resource: https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md
source: /archive/omp-tool-approval-model.md
tags: [agents, agent-harness, access-control, human-in-the-loop, agent-security]
timestamp: 2026-09-28T18:39:25Z
---

# Oh My Pi Tool Approval Model — Study Notes

## What It Is

Oh My Pi classifies a tool call as read-only, state-writing without arbitrary execution, or broadly executable (including shells, browsers, and subagents). A tool can determine its tier from the call's arguments. Missing or malformed declarations take the broad-execution tier, while MCP tools declare the write tier. This is a prompt-and-allow admission model for tool calls, not an OS sandbox.

## Precedence and Escape Hatches

Three sources affect the decision: a tool-supplied policy for the actual arguments, a user's per-tool policy, and a mode's tier defaults. An explicit tool deny wins; user deny also wins. Tool-level allow or prompt normally precedes user policy. In interactive non-unrestricted modes a tool can request a safety override that prompts unless it explicitly allows; the unrestricted default auto-approves all tiers, ignores a bare critical override, but still honors explicit deny and prompt policies. Consequently the mere existence of a destructive-pattern warning is not evidence of a hard prohibition under the default mode.

Shell patterns can veto a recognized command or explicitly admit it at a lower tier, but coverage is intentionally narrower than shell semantics: opt-in compound analysis handles only literal flat chains for positively identified POSIX-like shells. Other constructs retain ordinary broad-execution resolution. An approved command keeps ambient process privileges, and another executable tool can run the same command without passing through shell-specific pattern rules. Permission policy must cover every route to the effect; text matching is neither execution containment nor a general authorization proof.

Interactive context changes the boundary. Provider-originated computer-use safety checks force a prompt even in unrestricted mode; without UI, they fail closed. A read-only declaration for arbitrary computer scripts is a trusted declaration, not static verification of script effects. Subagents run headless under auto-approval of ordinary tiers, with their parent's delegation call as the authorization boundary; a remaining explicit per-tool prompt rejects because no operator can answer. In ACP sessions, default-config client permissions may remain despite an unrestricted schema default; an explicitly chosen unrestricted mode can bypass that client gate. These are documented behavior as of the 2026-09-28 ingest and may change with the product.

## Analyst Takeaways and Limits

1. **Approval is layered admission, not containment.** Risk tiers and explicit vetoes govern the tool dispatcher; the approved process still holds its ambient filesystem, network, and subprocess capabilities.
2. **Inspect all equivalent execution paths.** A shell-specific deny does not constrain an independent code-execution tool.
3. **Headless delegation moves rather than removes authority.** Parent authorization and child explicit vetoes matter more than unavailable prompts.
4. **Tool approval does not imply authorization of a real-world action.** The source separately requires target-and-scope confirmation for consequential actions unless directly authorized by the user.

## Vault Ideas Extracted

* [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md)
* [Cross-Mechanism Execution-Security Evaluation](/vault/cross-mechanism-execution-security-evaluation.md)
* [CLI Agent Hook Event Surfaces](/vault/cli-agent-hook-event-surfaces.md)
* [Tool Identity Versus Effect Authority](/vault/tool-identity-versus-effect-authority.md)

