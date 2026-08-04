---
type: Synthesis
title: Subscription-Billed Programmatic CLI Agent Access
description: Empirical evidence that Claude Code's and Codex CLI's non-interactive and SDK-class interfaces bill against the same OAuth/subscription login as their interactive TUIs — falsifying the common assumption that driving the interactive terminal is what preserves subscription billing — alongside the programmatic transport class this unlocks (Claude Agent SDK streaming, Codex's MCP/app-server protocol) and the fair-weather risk that comes with depending on it.
tags: [agent-harness, mcp, orchestration, agents]
timestamp: 2026-07-15T00:00:00Z
---

# Subscription-Billed Programmatic CLI Agent Access

Subscription/OAuth billing for Claude Code and Codex CLI does not require driving either CLI's interactive TUI. Both CLIs' non-interactive modes — `claude -p` (print mode) and `codex exec` — and the SDK-class interfaces built on top of them run on the same OAuth-only, subscription-backed login as the interactive session. A controller/consumer application can therefore get programmatic access on subscription billing **today** — but this is a fair-weather capability, not a dependable surface: it has already been shut off and restored once, and community expectation is that it will be shut off again. Anything intended to last should treat the interactive TUI as the only reliable subscription-billed surface, and treat everything documented in this note as an unreliable convenience — valuable to know exists, dangerous to depend on.

## The empirical test, and what it falsifies

Verified 2026-07-15 on a machine with no `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` set in the environment:

- `claude -p "..."` (Claude Code 2.1.210) — **works**, and bills the subscription (print/non-interactive mode, no API key present).
- `codex exec "..."` (codex-cli 0.144.1) — **works** inside a trusted directory, and bills the ChatGPT subscription (exec mode, no API key present).

This falsifies the widespread assumption that only the interactive TUI mode preserves subscription billing and that any non-interactive or "print"-style invocation necessarily falls back to API-key billing. That assumption is easy to reach by generalizing from a single negative case study: at least one real orchestration project marketed itself as billing-preserving while its actual Claude adapter was a non-tmux `--print`/stream-json subprocess wrapper billed via `ANTHROPIC_API_KEY`. That project's choice was its own configuration decision (it explicitly set an API key and used key-based billing) — not evidence of a platform constraint that non-interactive invocation forces API-key billing. The empirical spike above shows the same non-interactive invocation style running on subscription auth with no key present at all.

Unverified remainder, flagged honestly: whether the Agent-SDK-class interface specifically (as opposed to bare `claude -p`) inherits OAuth the same way is not independently confirmed here — it spawns the same underlying CLI, so it is very likely, but this is inference, not a direct test. Any ToS nuance specific to SDK-mediated subscription usage (as opposed to interactive or print-mode CLI usage) is also unverified.

## The programmatic transport class this enables

Once non-interactive invocation is confirmed billing-compatible, a second-order question opens: is there a genuine streaming, structured-event interface built on top of it, rather than just a one-shot print call? Yes, for both platforms, and there is a proven reference implementation:

- **Claude Agent SDK `query()` streaming.** A controller can call the SDK's `query()` interface and get genuine mid-turn structured message streaming (not just a final blob), with tool-permission decisions answered via a `canCallTool` callback — a real programmatic RPC-style permission gate, not a hook-based side channel bolted onto a terminal.
- **Codex's MCP / app-server protocol.** Codex exposes an MCP-style app-server protocol as its programmatic surface, distinct from and richer than `codex exec`'s one-shot invocation.
- **Reference implementation: `slopus/happy-cli`.** Its primary ("remote") mode is built on exactly this transport class — Claude Agent SDK `query()` streaming for Claude, Codex's MCP/app-server protocol for Codex — with no tmux, no `send-keys`, and no terminal screen-scraping anywhere in the primary path. Its own on-disk transcript-JSONL polling is demoted to an **offline fallback only**, and even that fallback is built defensively: full re-read of the file every ~3 seconds, UUID-based de-duplication of already-seen messages, and skip-on-malformed-trailing-line handling — the same "don't trust the on-disk transcript as a stable interface" posture documented by both vendors (see the `hook-driven-tmux-agent-transport` note's Sources).

This is a materially different transport class from a hook-driven tmux host: it gets real mid-turn structured events (partial assistant text, tool calls, tool results, permission requests) directly from an SDK/protocol surface designed for programmatic consumption, rather than reconstructing turn boundaries and tool events from a CLI's hook payloads fired against an interactive session.

## The honest risk: this is a fair-weather surface

Programmatic, non-interactive subscription access is not a documented, contractually stable product surface in the way the interactive CLI is the primary, vendor-supported product. It is column-adjacent functionality that happens to work today. The specific risk is not hypothetical: `claude -p` subscription-billed access has, at least once historically, been turned off and then later restored — i.e., the exact capability validated in the empirical spike above has a track record of being revoked and reinstated by the vendor, not just theoretically revocable.

This matters for design posture, not just as a footnote. A platform-risk-sensitive controller may deliberately *still* choose to host the interactive TUI (in tmux or an equivalent) as its integration surface, even knowing programmatic subscription access currently works — because the interactive CLI is the surface the vendor is commercially and contractually motivated to keep working for subscribers, while the print/exec/SDK path is a surface that has already been pulled once. The programmatic path buys richer events and simpler engineering, but a surface with a revocation history cannot be a load-bearing dependency in anything meant to last — it is defensible only for disposable or short-lived tooling that can afford to wake up broken. For durable systems, the interactive TUI is the choice.

## Tradeoff table: programmatic/SDK transport vs. hook-driven tmux transport

| Dimension | Programmatic/SDK transport (this note) | Hook-driven tmux transport (`hook-driven-tmux-agent-transport`) |
|---|---|---|
| Mid-turn assistant text | Yes — genuine streaming partial text (SDK/protocol native) | No — text only at turn-end (`Stop`/`SubagentStop`, `last_assistant_message`) |
| Tool calls/results | Yes, native to the protocol | Yes, via `PostToolUse` hook payload (`tool_name`, `tool_input`, `tool_response`) — equivalent fidelity, different mechanism |
| Permission/question answering | Yes — `canCallTool`-style programmatic callback (Claude SDK); Codex app-server protocol | Partial and asymmetric — Codex hook-based `PermissionRequest` can answer programmatically; Claude Code has no programmatic answer channel for `AskUserQuestion` and ignores hook-returned permission decisions under `--dangerously-skip-permissions` |
| Human attach / "watch the session" | No native terminal to attach to | Yes — `tmux attach` shows the normal rendered UI |
| Process supervision | Owned by the controller's own daemon (session resume via session IDs) | Native OS/tmux process supervision — pane teardown, crash, kill-session behave as expected |
| Platform stability posture | Fair-weather: non-interactive/programmatic subscription access has been revoked and restored at least once historically | Interactive TUI is the vendor's flagship subscriber surface — the one they are most motivated to keep working |
| Engineering complexity | Lower for structured data (no hook-payload plumbing, no pty concerns) | Higher (hook wiring, `send-keys` size limits, pipe-pane capture, cancellation semantics per CLI) |

## Limitations

- The empirical spike is a single-machine, single-day test (2026-07-15) of two specific CLI versions (Claude Code 2.1.210, codex-cli 0.144.1). It confirms the capability exists at this snapshot; it does not by itself establish how long it will remain available, matching the historical revoke/restore precedent noted above.
- Whether the Claude Agent SDK's `query()` interface inherits OAuth identically to bare `claude -p` is inferred (same underlying CLI spawned), not independently verified.
- Codex's app-server/MCP protocol depth was only partially verified in the source research (structure/imports confirmed, not a full protocol read) — treat its documented capability surface as provisional pending a deeper pass.
- No ToS-specific legal analysis of programmatic/SDK subscription usage was performed; this note covers only the technical/empirical question of whether it currently works.

## Sources

- Empirical spike, this environment, 2026-07-15: `claude -p` (Claude Code 2.1.210) and `codex exec` (codex-cli 0.144.1) both succeeded with no `ANTHROPIC_API_KEY`/`OPENAI_API_KEY` set, confirming subscription-backed billing for non-interactive invocation.
- [`slopus/happy-cli`](https://github.com/slopus/happy-cli) — reference implementation of the programmatic transport class: Claude Agent SDK `query()` streaming with `canCallTool` permission callbacks as its primary ("remote") mode; Codex support via the MCP/app-server protocol; transcript-JSONL polling demoted to an offline fallback (full re-read every ~3s, UUID dedup, malformed-trailing-line skip).
- [`sipyourdrink-ltd/bernstein`](https://github.com/sipyourdrink-ltd/bernstein) — negative case study distinguishing platform constraint from configuration choice: its non-tmux `--print`/stream-json Claude adapter is billed via `ANTHROPIC_API_KEY` because that project chose to set a key and use key-based billing, not because non-interactive invocation forces API-key billing.
- Historical precedent (secondary-sourced, not independently re-verified in this pass): `claude -p` subscription-billed access has been disabled and later restored at least once, establishing programmatic subscription access as a fair-weather rather than contractually guaranteed surface.
- See also the companion note [`cli-agent-hook-event-surfaces`](./cli-agent-hook-event-surfaces.md) for the hook-driven alternative's structured-event fidelity, and [`hook-driven-tmux-agent-transport`](./hook-driven-tmux-agent-transport.md) for the tmux-hosted transport this note is contrasted against.
