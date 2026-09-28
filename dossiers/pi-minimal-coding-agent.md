---
type: Study Note
title: What I learned building an opinionated and minimal coding agent
description: Mario Zechner's firsthand account of a small, observable coding-agent harness, explicit context control, provider handoff compromises, and intentional omissions.
resource: https://mariozechner.at/posts/2025-11-30-pi-coding-agent/
source: /archive/pi-minimal-coding-agent.html
tags: [agents, coding-agents, agent-harness, context-engineering, tool-use, agent-security]
timestamp: 2026-09-28T18:39:32Z
---

# What I learned building an opinionated and minimal coding agent — Study Notes

**Author**: Mario Zechner  
**Published**: November 30, 2025 (the page also discusses a December 2 leaderboard snapshot)

## What It Is

Zechner explains why he built pi after finding increasingly complex coding-agent harnesses hard to inspect and control. His design objective is an observable, small agent loop, not maximal built-in workflow automation. The account draws on several weeks of personal use and seven production projects using its underlying provider abstraction; neither figure establishes a controlled quality comparison with competing harnesses.

## Control the Context, Not Just the Model

The default agent has a short prompt and four general tools for reading, editing, writing, and executing commands. Zechner argues that contemporary coding models already know the interaction pattern, so long native-harness prompts and large always-loaded tool menus can impose needless context costs. He reports the default prompt plus tool definitions below 1,000 tokens and cites examples of browser MCP servers consuming 13.7k or 18k tokens in descriptions. His preferred alternative is an on-demand, inspectable tool description and a general execution interface. The figures illustrate a context-budget tradeoff; they do not prove those alternative tools have equivalent security or performance.

Planning and to-do state live in user-visible, editable files rather than special session modes. The author also declines a dedicated subagent abstraction: delegating mid-session research can hide how context was found and omit critical source material. He prefers a separately observed context-gathering session that produces a reusable artifact before implementation. Independent review is a genuine exception, and spawning another agent process remains possible; he objects to default black-box delegation, not to independent agents categorically. His concern that parallel implementation damages coherence is practitioner judgment, not a measured general rule.

## Portability and Observability Boundaries

Provider differences leak into context handoff: reasoning traces, tool-call representations, and signed provider payloads are not semantically interchangeable. Pi translates conversation history on a best-effort basis rather than claiming lossless portability. Token and cache accounting are also best effort because providers report usage at different stages, sometimes only after completion; Zechner says this is insufficient for accurate billing to external users. The loop continues until the model returns no tool calls, without a built-in maximum-step limit; absence of a guard is a personal workflow choice, not a safety property.

Separating model-facing tool content from structured UI details avoids reparsing textual results for display, while streamed partial tool arguments improve observability before a call finishes. At the time of writing, tool-result streaming was still missing. Visible sessions, controllable prompts, and file-based work artifacts make behavior easier to diagnose, but observation is distinct from enforcement.

## Security Position and Limits

Pi's then-described default executes tools with the invoking user's privileges without per-action approvals or built-in sandbox. Zechner argues that an agent able to read private data, execute code, and reach the network poses a hard exfiltration problem and recommends external containment for users who cannot accept that trust assumption. His broad dismissal of other products' guardrails is opinion, not evidence that all authorization checks are useless. The separate [Pi security note](/dossiers/pi-coding-agent-security.md) states a more precise boundary: constrain the entire process and its extensions, not merely the prompt or working directory.

A Terminal-Bench 2.0 run with five trials per task is described, but the captured article supplies key rankings as figures rather than readable numeric results. It does not isolate the effects of minimal prompting, particular tools, or the model from the harness; no numerical comparative score is inferred here.

## Analyst Takeaways

1. Minimalism can improve inspectability and reduce always-on context overhead, but intentionally omitting controls transfers responsibility to the runtime environment and operator.
2. A subagent's input provenance and accessible transcript matter as much as whether it saves supervisor tokens.
3. Cross-model conversation handoff should be described as a translation with semantic and accounting losses, not a transparent continuity guarantee.
4. External, versioned work artifacts preserve decisions across sessions while permitting an operator to inspect and correct context gathering.

## Vault Ideas Extracted

* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
* [File-Native Context Retrieval](/vault/file-native-context-retrieval.md)
* [Agent-Ergonomic Interface Design](/vault/agent-ergonomic-interface-design.md)
* [Subagent Context Inheritance Modes](/vault/subagent-context-inheritance-modes.md)

