---
type: Synthesis
title: Controller Observability and Control Gaps in Interactive Agent CLIs
description: When an external controller drives an interactive coding-agent CLI through its native lifecycle hooks, what it can observe (turn boundaries, tool calls and results, blocked states) and what it cannot reliably do (answer blocking prompts, gate permissions in unattended modes, confirm input delivery) are distinct surfaces that must be verified per product and version, never assumed from the existence of a hook system.
tags: [agent-harness, coding-agents, orchestration, human-in-the-loop, agents]
timestamp: 2026-07-15T00:00:00Z
---

# Controller Observability and Control Gaps in Interactive Agent CLIs

A hook system gives an external controller first-party structured events from an interactive agent CLI. The existence of hooks says nothing about *which* events are exposed or whether a hook's return value carries authority. Two CLIs with superficially similar hook systems can differ on every dimension that matters to an orchestrator: mid-turn text, blocked-state typing, whether a permission or question prompt can be resolved programmatically, and whether hook decisions are honored once permission checks are disabled.

## Surfaces to Verify Separately

| Surface | Question the controller must answer | Typical failure |
| --- | --- | --- |
| Turn boundaries | Is there a structured end-of-turn event with the final assistant text? | Only a coarse "turn complete" signal; no text |
| Mid-turn prose | Is streaming assistant text delivered incrementally, or only at turn end? | Present on one product, absent on a sibling with the same hook names |
| Tool activity | Do tool events carry the call *and* the result? | Consumers keep call and drop result; controllers rebuild it from transcripts |
| Blocked-state typing | Can the controller tell *why* a session is waiting (permission, question, idle, dialog)? | One undifferentiated "waiting" or nothing at all |
| Prompt resolution | Can a hook's return value answer a permission or question prompt? | Question is readable but not answerable; only a disable-the-tool workaround |
| Authority under unattended modes | Are hook-returned deny decisions honored when permission checks are disabled? | Hook gate becomes cosmetic and is silently ignored |
| Input delivery | Does the controller get confirmation that injected input was submitted? | Submission keystroke swallowed with no error |

## Design Consequences

- **Build mid-turn visibility from tool events, not prose.** Tool call/result streams are the most consistently available live signal; assistant text may only exist after the fact.
- **Treat a hook-based permission gate as unverified until tested in the exact mode it must protect.** A gate that works interactively can be a no-op in unattended operation. If the gate must hold, enforce it outside the agent process or keep permission checks enabled.
- **Prefer preventing an unanswerable blocked state to answering it.** If a blocking question tool has no programmatic answer channel, disable the tool for unattended workers so the model asks in ordinary prose instead.
- **Confirm input submission with an event, then retry.** Terminal-injected text can land in the composer without being submitted; a hook-confirmed retry loop is the reliable pattern, and it only confirms submission, not that a selection landed on the intended option.
- **Do not use rendered screen text as the primary state signal.** Capturing the terminal frame is a useful peek and a fallback for CLIs without hooks, but the best-documented production implementation runs a classifier over it *and* the hook layer, trusting neither alone.
- **Record a version with every claim.** Hook event names, payload fields, and timeout behavior are vendor surfaces without stability commitments; a same-day correction in the underlying research reversed a "no mid-turn text" claim after checking a specific binary.

## Limitations

- The evidence is a dated snapshot of two products; the *pattern* of asymmetric surfaces is durable, the specific asymmetries are not.
- Auto-timeout behavior of blocking prompts was contradicted across issue reports for different versions and was not independently re-tested.
- Findings about terminal-frame capture come from one production implementation, not a survey.

## Sources

- [CLI Agent Hook Event Surfaces — research record](/dossiers/cli-agent-hook-event-surfaces-research.md) — source-level verification (2026-07-15) that two coding-agent CLIs diverge on mid-turn text delivery, blocked-state typing, programmatic prompt resolution, and whether hook permission decisions survive unattended mode; includes the same-day correction and the verified/secondary/unverified split.
- [Hook-Driven tmux Agent Transport](/dossiers/hook-driven-tmux-agent-transport.md) — hosting the interactive session in a terminal multiplexer and taking turn-completion and tool events from native hooks rather than screen-scraping or on-disk transcripts; documents the swallowed-submission and large-input delivery failures.
- [Subscription-Billed Programmatic CLI Agent Access](/dossiers/subscription-billed-programmatic-cli-agent-access.md) — the SDK/protocol transport class that delivers genuine mid-turn structured events, contrasted with the hook-driven approach; billing access described as a fair-weather surface.
