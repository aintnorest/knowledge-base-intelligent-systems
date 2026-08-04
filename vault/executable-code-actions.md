---
type: Synthesis
title: Executable Code Actions
description: Representing an agent's multi-tool action as sandboxed executable code so it can compose calls, retain local state, and use execution output for repair.
tags: [tool-use, agents, sandboxing, agent-harness]
timestamp: 2026-07-23T20:03:07Z
---

# Executable Code Actions

An executable-code action gives an agent a small program as its action surface instead of limiting it to one text command or one structured function call. The program can call approved tools, bind intermediate values, branch, loop, combine library APIs, and return a result. Its stdout, structured value, or error becomes the next observation.

## Why Use It

Code makes control flow and data flow explicit. A workflow that otherwise needs several model turns and custom orchestration can be expressed as one bounded computation: query data, inspect a condition, apply a transformation, call another tool, and render a result. Code-pretrained models may also already know package idioms better than a bespoke action grammar.

## Operating Contract

1. Expose a narrow runtime with explicit tool bindings and package allowlists.
2. Execute one action in an isolated workspace with CPU, memory, time, network, filesystem, and process limits.
3. Return compact structured results and actionable error signals; bound large output and make artifact retrieval explicit.
4. Preserve only intentional state across turns. Record tool calls, code, outputs, side effects, and provenance for audit and recovery.
5. Require validation or approval before any action with external, irreversible, privileged, or high-cost effects.

## When Not to Use It

A single narrowly typed API call is preferable when no composition is needed, the effect must be easy to authorize, or arbitrary expression evaluation would expand risk. Code as an action language changes how work is expressed; it does not grant permission to do more work.

## Limitations

- Package availability, interpreter differences, and hidden mutable state can make generated programs nonportable.
- Execution errors can teach useful repair but can also leak secrets, paths, schemas, or environmental details unless observations are filtered.
- A sandbox must enforce its policy independently of the model. Formatting constraints alone do not stop imports, exfiltration, resource exhaustion, or unsafe tool composition.

## Sources

- [Executable Code Actions Elicit Better LLM Agents dossier](/dossiers/executable-code-actions-llm-agents.md) — CodeAct’s Python action interface, API-Bank/M3 ToolEval comparisons, and selected multi-turn instruction data.
