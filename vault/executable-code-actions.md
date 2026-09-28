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

Executing a short program can also keep intermediate tool results outside the model context: discover only the needed tool interfaces, pass a large result between tools inside the runtime, and return a filtered observation. Branches and loops then avoid separate model round trips. This is a context and interaction-cost advantage, not permission to bypass the authorization checks on the underlying effects.

## Operating Contract

1. Expose a narrow runtime with explicit tool bindings and package allowlists.
2. Execute one action in an isolated workspace with CPU, memory, time, network, filesystem, and process limits.
3. Return compact structured results and actionable error signals; bound large output and make artifact retrieval explicit.
4. Preserve only intentional state across turns. Record tool calls, code, outputs, side effects, and provenance for audit and recovery.
5. Require validation or approval before any action with external, irreversible, privileged, or high-cost effects.

## When Not to Use It

A single narrowly typed API call is preferable when no composition is needed, the effect must be easy to authorize, or arbitrary expression evaluation would expand risk. Code as an action language changes how work is expressed; it does not grant permission to do more work.

Where generated code runs defines the trust boundary. Restricting the language or its imports can limit some mistakes but does not reliably bound resource consumption or the capabilities reachable through an allowed package. Isolating only snippets keeps parent-agent calls and credentials outside the snippet environment but leaves other local execution paths uncovered; isolating the whole agent covers more paths while potentially placing credentials inside the execution boundary. Choose placement against the threat model, then enforce limits and tool-effect policy independently.

## From Exploratory Code to Reusable Skill

An executable action becomes a reusable skill only after the exploratory path has been made generic, its inputs and preconditions specified, and its postcondition checked. VOYAGER stores verified Mineflayer JavaScript programs, retrieves relevant ones and composes them for harder objectives, though its LLM-based self-verification is occasionally wrong. SkillWeaver synthesizes parameterized Playwright functions from successful site exploration, keeps usage and error notes, runs tests, and filters selection by preconditions. It raised GPT-4o WebArena success from 22.6% to 29.8%. In a software factory, keep the exploratory trace for diagnosis and promote a narrow, sandboxed script only after repeatable outcome checks. Retest it whenever the environment or model changes.

## Limitations

- Package availability, interpreter differences, and hidden mutable state can make generated programs nonportable.
- Execution errors can teach useful repair but can also leak secrets, paths, schemas, or environmental details unless observations are filtered.
- A sandbox must enforce its policy independently of the model. Formatting constraints alone do not stop imports, exfiltration, resource exhaustion, or unsafe tool composition.

## Sources

- [Executable Code Actions Elicit Better LLM Agents dossier](/dossiers/executable-code-actions-llm-agents.md) — CodeAct’s Python action interface, API-Bank/M3 ToolEval comparisons, and selected multi-turn instruction data.
- [VOYAGER: An Open-Ended Embodied Agent with Large Language Models dossier](/dossiers/voyager-lifelong-learning-agent.md) — verified executable skill library composed through an automatic curriculum.
- [SkillWeaver: Web Agents can Self-Improve by Discovering and Honing Skills dossier](/dossiers/skillweaver-web-agent-skill-learning.md) — tested, parameterized Playwright APIs synthesized from exploration.
- [Secure code execution dossier](/dossiers/smolagents-secure-code-execution.md) — smolagents documents code-action composability, restricted interpretation, resource and package risks, and the snippet-versus-whole-agent isolation tradeoff.
- [Code execution with MCP: Building more efficient agents dossier](/dossiers/anthropic-code-execution-mcp.md) — illustrates on-demand tool definitions and local data forwarding while warning that code execution expands the security boundary.
