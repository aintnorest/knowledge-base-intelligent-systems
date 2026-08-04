---
type: Synthesis
title: Intent-Then-Isolate Execution
description: Deciding an agent's authorized action structure from trusted intent before untrusted data is read, then isolating or removing that data so it cannot steer later consequential decisions.
tags: [agent-security, prompt-injection, orchestration, context-engineering, agents]
timestamp: 2026-07-14T16:11:55Z
---

# Intent-Then-Isolate Execution

Decide what the agent is allowed to do while its context contains only trusted intent, then execute that limited structure without allowing subsequently retrieved text to revise it. The structure can be a fixed action selection, an explicit plan, or a generated program. If a later stage must use untrusted content, isolate that stage or remove the original content before another model makes a consequential decision.

This treats control flow as an integrity boundary. A document can affect the result of an already-authorized lookup or transformation, but it cannot add a new tool call or alter the sequence chosen from trusted intent. Context minimization applies the same idea within a conversation: use a request to construct a narrow query, then omit the request while formatting the result so its instructions cannot survive into the later stage.

## Practical Use

1. Identify trusted intent, consequential actions, and the untrusted sources that will be read.
2. Before reading those sources, produce a minimal, typed action plan or executable program with explicit permissions and parameter bounds.
3. Execute through an orchestrator that rejects additions to the approved action structure.
4. For any post-processing, pass only the fields needed for that stage; remove the prompt or source text when it no longer serves a legitimate function.
5. Test whether untrusted values can still influence high-impact parameters such as recipients, destinations, query scope, message bodies, or generated code.

## Limitations

Fixing action choice does not make every allowed action safe. Untrusted content can still manipulate an email body, a selected destination, a database query parameter, or an isolated classifier's value. Some tasks genuinely need observations to determine the next action, making a fully precommitted plan infeasible or excessively restrictive. The appropriate boundary must therefore be defined per application and combined with validation, sandboxing, and authorization.

## Sources

- [Design Patterns for Securing LLM Agents against Prompt Injections dossier](/dossiers/design-patterns-securing-llm-agents-prompt-injections.md) — presents action-selector, plan-then-execute, code-then-execute, and context-minimization patterns and their remaining parameter-channel risks.
