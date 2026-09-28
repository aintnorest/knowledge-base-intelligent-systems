---
type: Synthesis
title: Peer-Agent Message Trust
description: Preventing attacker-origin instructions from gaining authority when agents relay observations as peer status, task requests, or persistent memory.
tags: [agents, multi-agent, prompt-injection, agent-security, provenance]
timestamp: 2026-09-28T19:05:37Z
---

# Peer-Agent Message Trust

An agent's message is not a fresh user instruction merely because another agent produced it. A peer can relay adversarial content from a retrieved document, database field, or shared file as a seemingly helpful status update. The receiving planner may treat that report as more actionable than the same text encountered directly, then delegate the next step to a worker with different authority. The trust of the original content must survive every handoff.

## Propagation Pattern

1. **Ingress:** A worker reads attacker-influenced material while doing legitimate work.
2. **Promotion:** It repeats an operational claim as a task obstacle, suggested repair, or next action; a coordinator mistakes this description for authority to change the workflow.
3. **Relay:** Peer messages, shared history, or stored memories carry the instruction to agents that never saw its untrusted origin. A payload can even tell a model-based memory scorer to assign it higher importance; repeated retrieval then refreshes its recency and keeps it available for subsequent relays.
4. **Effect:** A later worker performs a consequential action under its own legitimate tools. Each agent's individual permission can be valid even though the overall data flow or purpose is not.

## Why It Matters

Local refusal does not suffice when a viewer can report a fake access problem and another agent treats its proposed remedy as work to execute. A peer message also cannot grant human consent or expand permissions. The boundary is both informational and operational: a teammate's origin must be recorded, and any newly proposed action must be checked against the user's task and the source of the proposal. Communication topology and memory visibility affect how far a message travels, but there is no universally safest arrangement; see [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md).

## Practical Use

- Carry source and trust labels with quoted observations and derived summaries. Distinguish peer report, user request, and trusted control-plane signal at the receiving boundary.
- Use narrow, validated [handoff contracts](/vault/structured-agent-communication-contracts.md) for status and evidence; do not interpret free-form peer text as permission, and do not mistake a parseable record for verified facts.
- Keep external text from assigning its own retrieval priority or policy status; compute memory importance from trusted task criteria and preserve origin through later retrieval.
- Check consequential actions against original intent and data provenance, not only the sender's identity. Protect shared executable configuration as a separate authority surface: even a peer's file write can become another agent's future instruction.

## Limitations

Origin tags and message marking can reduce confusion but are not cryptographic provenance or complete mediation. A typed return can still carry a false claim or an instruction in a broad string field. Independent context does not make a peer trustworthy, and restricting peer messages alone cannot prevent cross-agent control through writable files. Reported infection and control-flow successes come from simulated or laboratory workflows; they do not quantify production prevalence.

## Sources

- [Prompt Infection: LLM-to-LLM Prompt Injection within Multi-Agent Systems dossier](/dossiers/prompt-infection-multi-agent-systems.md) — simulated self-replicating peer messages and importance-score manipulation that sustains retrieval; origin labels alone provided limited protection.
- [Multi-Agent Systems Execute Arbitrary Malicious Code dossier](/dossiers/multi-agent-control-flow-hijacking.md) — laboratory access-error payloads that turned a viewer's status message into a code-execution plan despite local refusals.
- [OMNI-LEAK: Orchestrator Multi-Agent Network Induced Data Leakage dossier](/dossiers/omni-leak-orchestrator-data-leakage.md) — public database content laundered through a privileged worker and orchestrator into outbound disclosure.
- [Architecture Matters for Multi-Agent Security dossier](/dossiers/multi-agent-architecture-security.md) — controlled direct-user misuse study showing topology and memory alter safety-relevant information distribution; it does not test injections.
- [Orchestrate teams of Claude Code sessions dossier](/dossiers/claude-code-agent-teams-model.md) — documented separation between teammate-origin messages and human authorization.
- [AgentSys: Secure and Dynamic LLM Agents through Explicit Hierarchical Memory Management dossier](/dossiers/agentsys-hierarchical-memory.md) — short-lived untrusted-observation processors and bounded parent returns, with remaining schema and action-check limitations.
- [Cross-Agent Privilege Escalation: When Agents Free Each Other dossier](/dossiers/cross-agent-configuration-privilege-escalation.md) — demonstrated cross-agent configuration write that becomes another agent's executable authority on later load.
