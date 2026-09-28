---
type: Study Note
title: Orchestrate teams of Claude Code sessions
description: Experimental agent-team topology with independent contexts, shared task claiming, direct messaging, inherited permissions, and documented coordination failures.
resource: https://code.claude.com/docs/en/agent-teams
source: /archive/claude-code-agent-teams-model.html
tags: [agents, multi-agent, orchestration, coding-agents, agent-security]
timestamp: 2026-09-28T18:38:44Z
---

# Orchestrate teams of Claude Code sessions — Study Notes

**Publisher**: Claude Code documentation  
**Captured**: September 2026; experimental feature with version-dependent behavior

## What It Is

A lead session coordinates separate agent sessions with individual contexts, a shared task list when the relevant tools exist, and direct peer messages. Unlike a caller-subagent that principally returns a result, team members can challenge one another, self-claim independent work, and receive direct human instructions. They load project context but not the lead's conversation history. This topology suits independent research, review, or non-overlapping implementation; sequential work and shared-file editing pay coordination overhead without comparable parallel benefit.

## Coordination and Authority

Claims on shared tasks use file locking, and tasks may depend on completion of predecessors. Teammates can also communicate without a shared task list. Messages identify their origin as another agent session rather than a user: they cannot grant human approval or relay denied actions to another teammate for a bypass; in automatic approval mode inter-agent messages undergo classifier review before delivery. Teammates generally inherit the lead's permission mode, including the most permissive mode; human permission prompts appear in the lead's session. The documentation states that a teammate's planning approval can be granted by the lead session without separate human review, a notable exception to any assumption that planning implies human oversight.

The lead has fixed authority and only it can spawn team members. Team members receive their own project context and a task-specific spawn instruction; the lead's prior reasoning is not magically shared. Every added context costs tokens, while coordination, merge conflicts, and diminishing returns limit useful team size. Ordinary named delegation may unexpectedly form a team when the experimental team mechanism is enabled; noninteractive sessions do not spawn these teammates in the documented behavior.

## Admitted Limitations

The documentation reports that resumed sessions do not restore in-process teammates, task status can lag behind actual work and block dependent tasks, shutdown waits for an outstanding request, and teams cannot be nested or transferred to a new lead. A single session hosts only one team. These restrictions make durable task state, actual agent liveness, and permission authority distinct from a polished team diagram. The source gives no measured outcome improvement for agent teams as a product; it describes operating semantics and warnings, several explicitly dependent on Claude Code version.

## Analyst Takeaways

Separate **work ownership**, **communication trust**, **execution permission**, and **lifecycle state** when evaluating a multi-agent system. A shared task registry does not prove tasks are finished, a teammate's report does not acquire user authority, and an independent context needs a self-contained delegation contract. Agent teams add value when disagreement and genuine parallel work overcome the cost of multiple sessions.

## Vault Ideas Extracted

* [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md)
* [Structured Agent Communication Contracts](/vault/structured-agent-communication-contracts.md)
* [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md)
* [Peer-Agent Message Trust](/vault/peer-agent-message-trust.md)
* [Subagent Context Inheritance Modes](/vault/subagent-context-inheritance-modes.md)
* [Activation-Vested Risk Budget](/vault/activation-vested-risk-budget.md)

