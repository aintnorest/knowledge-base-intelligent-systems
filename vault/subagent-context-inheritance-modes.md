---
type: Synthesis
title: Subagent Context Inheritance Modes
description: Choosing fresh or inherited conversation context for delegated work according to continuity, independent judgment, and the cost of moving evidence.
tags: [agents, multi-agent, context-engineering, orchestration, agent-harness]
timestamp: 2026-09-28T19:05:37Z
---

# Subagent Context Inheritance Modes

A delegated agent can begin with only a bounded task and relevant project instructions, or with a copy of the delegator's working conversation. This choice determines what the worker knows at the start, not what authority it has or how much of its subsequent trace the parent must read. In either mode, a bounded final result can return while the worker's intermediate transcript remains separate.

## Choose by Epistemic Role

| Mode | Useful when | Main risk |
| --- | --- | --- |
| Fresh context | Independent verification, competing research branches, or a self-contained task should not inherit the parent's diagnosis | Repeated discovery; omissions when delegation lacks essential evidence or acceptance criteria |
| Inherited context | A worker continues an investigated fix or extracts memory from the conversation that established it | Irrelevant or adversarial history, context cost, and anchoring of supposedly independent judgment |

Forking a conversation may omit the delegation call and append the worker's assignment as a new message; neither that detail nor cache reuse makes inherited context intrinsically faster. Supply a continuing worker with the useful diagnosis and evidence, but give an independent verifier a fresh question, original requirements, and direct access to the artifact under review rather than the implementer's rationale. See [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md): conversation separation is distinct from file, process, and permission isolation.

## Why It Matters

Delegation can shard context: independent workers investigate separate evidence branches and return compact findings with source references, leaving the coordinator room to synthesize. But a fresh context still shares whatever assumptions are embedded in its assigned task, and condensed results can lose a crucial source. A no-built-in-subagent design offers a legitimate alternative: keep research visible in a separately observed session and hand off an inspectable artifact, at the expense of manual coordination or repeated context. More agents are not a free quality gain; synchronization on the slowest branch and duplicated reads can erase parallelism benefits.

## Practical Use

- State the task boundary, source or artifact access, expected result shape, and acceptance criteria explicitly; never assume an isolated worker saw the parent's prior investigation.
- Return a bounded summary, evidence references, unresolved questions, and artifact paths; retain inspectable local traces for disputes without flooding the parent context.
- Choose read/write and tool permissions independently of conversation inheritance. A forked worker need not gain broad writes; a fresh reviewer is not automatically less privileged.
- Compare the actual effort saved by reused history or cached prefixes with the cost of irrelevant history, redundant exploration, and verification anchoring.

## Limitations

Fresh context alone cannot guarantee independent review when workers share a model, policy, repository, or delegator-selected evidence. Forking propagates any untrusted content already present in the parent. A final summary may omit evidence, and an output schema proves neither provenance nor correctness. Source accounts describe implementation choices and first-party tradeoffs, not a controlled comparison establishing one mode's universal latency or accuracy advantage.

## Sources

- [Organizing Context in a Multi-Agent Harness dossier](/dossiers/langchain-subagent-context-modes.md) — explicitly contrasts fresh delegation with conversation forking for verification versus continued work; offers no measured cost comparison.
- [AgentSys: Secure and Dynamic LLM Agents through Explicit Hierarchical Memory Management dossier](/dossiers/agentsys-hierarchical-memory.md) — fresh workers see untrusted observations without the parent's query or accumulated history, returning constrained extractions.
- [How we built our multi-agent research system dossier](/dossiers/anthropic-multi-agent-research.md) — independently contextualized search branches, compressed evidence handoffs, high token costs, and synchronization bottlenecks.
- [Hermes Agent — Subagent Delegation and Ownership Boundaries dossier](/dossiers/hermes-subagent-delegation.md) — fresh conversations require explicit task context and normally return only a final summary; inherited tools are a separate boundary.
- [Orchestrate teams of Claude Code sessions dossier](/dossiers/claude-code-agent-teams-model.md) — teammates have separate contexts and task instructions rather than automatically inheriting the lead transcript.
- [What I learned building an opinionated and minimal coding agent dossier](/dossiers/pi-minimal-coding-agent.md) — practitioner case for observable separate research sessions and editable artifacts in place of opaque native research delegation.
- [Dive into Claude Code: The Design Space of Today's and Future AI Agent Systems dossier](/dossiers/dive-into-claude-code.md) — source-level account of separate subagent contexts, concise returns, and inspectable sidechain transcripts.
