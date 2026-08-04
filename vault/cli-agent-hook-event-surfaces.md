---
type: Synthesis
title: CLI Agent Hook Event Surfaces
description: A source-level map of what an external controller/consumer can and cannot observe or control through Claude Code's and Codex CLI's native hook systems as of 2026-07-15 — mid-turn text, blocked-state detection, question/answer channels, input injection, and the tmux capture-pane peek pattern that complements hooks — marking each claim as empirically verified, secondary-sourced, or unverified.
tags: [agent-harness, coding-agents, agents, orchestration, human-in-the-loop]
timestamp: 2026-07-15T00:00:00Z
---

# CLI Agent Hook Event Surfaces

Claude Code's and Codex CLI's native hook systems give an external controller real, first-party structured events — but the two CLIs diverge sharply on what those events can *see* and, more importantly, what a controller can *do* with them once a session is blocked waiting on the human. Claude Code's hooks stream mid-turn assistant prose (see the same-day correction below); Codex's do not. Both expose live tool-call/result data. Only Codex's hook output has a *documented* channel to programmatically resolve a permission prompt; Claude Code's question tool has a real-but-partially-documented answer mechanism (correction below), and it ignores hook-returned permission decisions once permission checks are disabled. A controller/consumer application designing against either CLI's hook surface has to treat these as per-CLI, version-sensitive facts, not a shared "hooks work the same everywhere" abstraction — verified at docs/schema/source level, 2026-07-15, Claude Code ~2.1.x, codex-rs current.

**Same-day correction (2026-07-15, after an external design review challenged the original claims; verified against the Claude Code 2.1.211 binary and current docs):**
1. **Mid-turn prose exists on Claude Code.** The `MessageDisplay` hook — originally flagged here as "unverified whether incremental" — is verified incremental: it fires per batch of newly-completed whole lines while an assistant message streams, payload `{turn_id, message_id, index (monotonic per message), final (exactly one true flush), delta}`, display-only (transcript and model view untouched). Consumers get ordered, explicitly-terminated prose well before `Stop`. The "no mid-turn prose" claim below survives only for Codex.
2. **AskUserQuestion has a partially-documented answer mechanism.** At the binary's generic hook-resolution layer, a `PreToolUse` allow decision carrying `updatedInput.answers` "satisfies user interaction" for the tool (literal log string present; the picker still renders when the hook omits `updatedInput`, so a non-answering hook is harmless). The Agent SDK's `canUseTool` docs document exactly this shape and state the tool reaches the callback *even under bypassPermissions*. What remains empirically unsettled is whether a settings.json shell-command hook (as opposed to the in-process SDK callback) gets identical treatment under `--dangerously-skip-permissions` — shared code path, unproven behavior.

## Mid-turn text: yes on Claude Code (corrected), no on Codex

- **Claude Code — CORRECTED (see correction block above):** `MessageDisplay` delivers incremental mid-turn prose in whole-line batches, verified against the 2.1.211 binary schema. `Stop`/`SubagentStop` `last_assistant_message` remains the turn-end authoritative text.
- **Codex** (schemas pulled directly from `codex-rs`): the same shape — `Stop.last_assistant_message` is the only structured text delivery point, plus the legacy `notify=` mechanism's `agent-turn-complete` event, which is also end-of-turn only, not incremental.

By contrast, **tool calls and tool results do stream live on both CLIs**, via `PostToolUse`, whose payload documents `tool_name`, `tool_input`, and `tool_response` (the actual result) as first-party fields on both platforms. A controller that wants any visibility into what the agent is doing mid-turn has to build that view out of the tool-call stream, not assistant prose — prose is only available after the fact.

## Blocked-state detection: asymmetric

- **Claude Code's `Notification` hook** carries a `notification_type` enum that distinguishes blocked states at the type level: `permission_prompt`, `idle_prompt`, `elicitation_dialog`, `agent_needs_input`, and others. This is a real, structured way to tell *why* a session is waiting, not just *that* it is waiting.
- **Codex's new hook system has no equivalent.** It has no `Notification` event and no `SessionEnd` event. The only signal in the same family is the legacy `notify=` mechanism, which fires a single `agent-turn-complete` event and nothing more granular — it cannot distinguish "waiting on a permission prompt" from "waiting on user input" from "session ended." A controller wanting Claude-Code-level blocked-state granularity on Codex has no native hook equivalent to reach for.

## Question/answer asymmetry: the sharpest divergence between the two CLIs

- **Claude Code's `AskUserQuestion` is readable but not answerable.** The question and its options are fully visible via `PreToolUse.tool_input.questions` — a working technique for observing what's being asked (see anthropics/claude-code issue #12605). But there is **no programmatic answer channel**: the CLI blocks on genuine terminal input, and a hook consumer can see the question without being able to resolve it. Whether the prompt ever auto-times-out is contradicted across the issue tracker — anthropics/claude-code#70294 states it never auto-continues, while anthropics/claude-code#73125 reports an undocumented ~60-second auto-continue behavior in version 2.1.198 — this is version-dependent and unresolved in the upstream tracker, not a settled fact; treat as needing empirical re-testing against whatever version a design targets.
  - **Precedent workaround:** `obra/claude-session-driver` sidesteps the whole problem by disabling the tool outright (`--disallowed-tools AskUserQuestion`), forcing the model to ask its questions in ordinary prose instead of invoking the blocking tool — an empirically validated way to keep an unattended worker from ever entering an unanswerable blocked state.
- **Claude Code ignores hook-returned permission decisions under `--dangerously-skip-permissions`.** `obra/claude-session-driver` verified this empirically in production and subsequently removed their own hook-based permission gate, calling it "cosmetic" once they confirmed it had no effect in that mode. The practical implication: do not design a hook-based permission gate for Claude Code that is meant to matter in unattended/yolo-mode operation — it will not be consulted.
- **Codex's `PermissionRequest` hook output CAN programmatically allow/deny.** Its `decision: allow | deny` output round-trips into the model-invoked `request_permissions` tool — verified directly in `codex-rs` source. This is a genuine capability Codex has that Claude Code does not: a real, load-bearing programmatic permission gate, not a cosmetic one.

Net effect: a controller that needs to *answer* blocking prompts programmatically (not just observe them) can do so for Codex's permission requests, but has no native channel for Claude Code's `AskUserQuestion` — the only reliable mitigation on the Claude side is disabling the tool before it can be invoked, not answering it after the fact.

## Reliable input injection

Even plain-text follow-up input sent into a live session is fragile enough to need a confirmed-delivery pattern, independent of the question/answer problem above:

- **Bracketed-paste `send-keys` with hook-confirmed submission and retry** is the validated pattern: `obra/claude-session-driver` sends text and `Enter` as bracketed paste, then retries sending `Enter` until a `UserPromptSubmit` hook event confirms the submission actually landed (their issue #20 documents the underlying failure mode). The core risk being defended against: a plain `Enter` keystroke can be silently swallowed by the pty/CLI, leaving text typed into the composer but never submitted, with no error surfaced — a real, independently-rediscovered failure mode, not a one-off bug in a single tool.
- This compounds the question/answer asymmetry above: for Claude Code's `AskUserQuestion`, even *if* a controller were willing to attempt a blind answer (e.g., sending arrow keys to pick an option), there is no confirmation signal at all for that kind of input — the hook-confirmed retry pattern only validates that a submission happened, not that an arrow-key selection landed on the intended option.

## The capture-pane live-peek pattern (tmux-hosted sessions)

For CLIs hosted inside tmux (see the companion `hook-driven-tmux-agent-transport` note), tmux is already a terminal emulator maintaining a rendered character grid — this can be read directly without any client-side terminal emulation:

- `tmux capture-pane -p -e` returns the currently rendered, styled frame as text; cursor position is available separately via `tmux display-message`. Combined, this gives a renderable frame with zero client-side VT100/ANSI emulation required — the emulation work has already been done by tmux itself.
- **Production gotchas, sourced from `Ark0N/Codeman`:**
  - Capturing multi-MB scrollback via `execSync` can hit Node's `maxBuffer` limit or surface as `ENOBUFS`; a production capture path has to raise the buffer limit or catch/handle this explicitly rather than assume small output.
  - Captured text must have its line endings normalized from `\n` to `\r\n` before being replayed into an `xterm.js`-based viewer, or the replay exhibits a "staircase" rendering bug (each line progressively indented further than the last).
- **The key negative finding: screen-text alone is not a reliable signal for agent-state detection.** Codeman does not trust captured screen text by itself to determine whether an agent is idle, busy, or blocked — it feeds the captured text to an LLM classifier *and* runs the native hook layer in parallel, and trusts neither source alone. This is a direct, source-verified counter-example to any design that treats regex/pattern-matching over `capture-pane` output as sufficient for state detection; it is a fallback/confirmation signal, not a primary one, in the best-documented real implementation surveyed.

## What is empirically verified vs. secondary-sourced vs. unverified

- **Empirically/schema verified** (source-level confirmation in this research pass): the no-mid-turn-text finding for both CLIs; `PostToolUse` field contents on both CLIs; Claude's `Notification` enum values; Codex's lack of `Notification`/`SessionEnd`; Codex's `PermissionRequest`→`request_permissions` round-trip (confirmed directly in `codex-rs` source); Claude Code ignoring hook permission decisions under `--dangerously-skip-permissions` (confirmed via `obra/claude-session-driver`'s own empirical testing, itself a primary account); the `capture-pane -p -e` / `display-message` mechanism and Codeman's ENOBUFS/`\r\n`-normalization/dual-classifier findings (sourced from Codeman's own production code/docs).
- **Secondary-sourced, contradictory across issues, not independently resolved here:** `AskUserQuestion` auto-timeout behavior (anthropics/claude-code#70294 vs #73125 disagree, and the disagreement itself spans CLI versions).
- **Unverified, explicitly flagged rather than assumed:** whether Claude Code's `MessageDisplay` hook event fires incrementally mid-turn or only once at turn-end.

## Limitations

- This is a snapshot of Claude Code ~2.1.x and current `codex-rs` as of 2026-07-15; hook event names, payload fields, and blocking/timeout behavior are all vendor surfaces under active change and are not committed to semver stability by either vendor (see the companion `hook-driven-tmux-agent-transport` note's Limitations for the same caveat applied to the tmux-hosting context).
- The `AskUserQuestion` auto-timeout contradiction (#70294 vs #73125) was not empirically re-tested in this pass; a design that depends on its behavior needs to verify against the specific target version rather than trust either issue as current fact.
- Codex's app-server/MCP protocol (the richer programmatic surface beyond the hook system covered here) was only partially verified in the underlying research — see the companion `subscription-billed-programmatic-cli-agent-access` note.
- The capture-pane pattern's gotchas are sourced from a single production implementation (Codeman); they are real and specific, but this is not a survey of every tmux-hosted agent viewer.

## Sources

- Claude Code hooks reference (`code.claude.com/docs/en/hooks`) — `PostToolUse` field documentation (`tool_name`, `tool_input`, `tool_response`), `Notification` hook `notification_type` enum values, `Stop`/`SubagentStop` `last_assistant_message`.
- Codex CLI hooks/schema, pulled directly from `codex-rs` source — confirms `Stop.last_assistant_message`, absence of `Notification`/`SessionEnd` events, and the `PermissionRequest`→`request_permissions` round-trip for `decision: allow|deny`.
- [`anthropics/claude-code#12605`](https://github.com/anthropics/claude-code/issues/12605) — working technique for reading `AskUserQuestion` via `PreToolUse.tool_input.questions`.
- [`anthropics/claude-code#70294`](https://github.com/anthropics/claude-code/issues/70294) — reports `AskUserQuestion` never auto-continues.
- [`anthropics/claude-code#73125`](https://github.com/anthropics/claude-code/issues/73125) — reports an undocumented ~60-second auto-continue in Claude Code 2.1.198, contradicting #70294.
- [`obra/claude-session-driver`](https://github.com/obra/claude-session-driver) — disables `AskUserQuestion` via `--disallowed-tools` for unattended workers; empirically verified and removed its own hook-based permission gate as "cosmetic" under `--dangerously-skip-permissions`; its issue #20 documents the swallowed-`Enter` failure mode motivating the bracketed-paste + hook-confirmed retry input pattern.
- [`Ark0N/Codeman`](https://github.com/Ark0N/Codeman) — production `capture-pane -p -e`/`display-message` usage; source of the `execSync` maxBuffer/`ENOBUFS` and `\n`→`\r\n` staircase-bug gotchas; runs an LLM classifier over captured screen text in parallel with the native hook layer rather than trusting either alone for agent-state detection.
- See also [`subscription-billed-programmatic-cli-agent-access`](./subscription-billed-programmatic-cli-agent-access.md) for the alternative, non-hook-based programmatic transport class, and [`hook-driven-tmux-agent-transport`](./hook-driven-tmux-agent-transport.md) for the tmux-hosting architecture these hook events feed into.
