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

Persistent separate contexts offer another continuity strategy: retain planning-and-review and execution agents that exchange bounded briefs, results, and corrections instead of repeatedly transferring a full conversation. Each accumulates relevant local state and can preserve a stable model-specific prefix. Evaluate total task cost, including briefing, repeated exploration, cache misses, review, and repair; a cheaper worker can increase expensive supervisory work. Research that determines the plan needs evidence-level scrutiny even when the worker cannot write.

For retrieval delegation, make the return an evidence pointer—files and line ranges or document passages—rather than a free-form diagnosis. The parent reads the original evidence and retains interpretive responsibility, while intermediate searches stay local. Favor concise, relevant returns only when the parent can reopen omissions; recall-critical work needs broader coverage. Measure retrieval relevance, latency, context exposure, and downstream task success separately: inspectable references neither guarantee completeness nor establish an isolation or security boundary.

## Initial History Is Not Ongoing Decision Visibility

Context inheritance fixes what a worker knows at launch; it does not synchronize decisions made afterward. Two workers can receive identical requirements and evidence, then establish incompatible assumptions through their actions. When those actions constrain a shared artifact, communicate the consequential choice before dependent work continues, establish the contract before branching, or keep a single execution owner and delegate bounded questions. A final summary may describe the result without preserving the interpretation that produced it.

A continuous decision stream can also use a separate model to compress its action–observation history. The useful target is not a generic recap but the constraints, events, and commitments needed for subsequent decisions. This can extend continuity without adding another competing execution locus, yet selecting the indispensable information is domain-dependent and compression remains lossy. Keep an inspectable path back to original evidence when omissions would change the next action. See [Structured Execution Memory](/vault/structured-execution-memory.md).

Full-trace sharing is one response to missing context, not a universal inheritance policy. It can add irrelevant history, anchoring, and untrusted content, while still failing to expose a peer's future decisions. Independent review may require original requirements and artifacts without the implementer's rationale; coupled continuation may require the rationale and observed state changes. Controlled architecture comparisons support task-dependent coordination choices but do not directly compare fresh versus inherited contexts or certify verifier independence.

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
- [Introducing Fusion in Devin Desktop & CLI dossier](/dossiers/cognition-fusion-lead-sidekick.md) — first-party persistent lead/worker contexts with bounded exchanges and pair-specific delegation; reported task-cost savings include benchmark-dependent quality losses and do not isolate cache effects.
- [Introducing SWE-grep and SWE-grep-mini: RL for Multi-Turn, Fast Context Retrieval dossier](/dossiers/cognition-swe-grep-context-retrieval.md) — trained retrieval workers return file-and-line evidence; precision-weighted internal scores and a downstream coding comparison support bounded context exposure without proving universal gains.
- [Don't Build Multi-Agents dossier](/dossiers/cognition-dont-build-multi-agents.md) — June 2025 Cognition essay advocates full traces, identifies implicit decisions in actions, and describes a history-compression model; it offers no controlled comparison of context policies.
- [Towards a Science of Scaling Agent Systems dossier](/dossiers/science-scaling-agent-systems.md) — controlled evidence for architecture–task alignment under standardized budgets; its six-benchmark suite does not directly evaluate inheritance policies or dedicated review tasks.
