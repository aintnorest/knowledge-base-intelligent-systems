---
type: Study Note
title: "Harness Engineering: Anatomy, Architecture, and Evolution of Coding Agents"
description: Source-level and longitudinal comparison of eleven agent harnesses, identifying seven runtime subsystems, recurring patterns, and the move from CLI tool to platform.
resource: https://arxiv.org/abs/2609.00006v1
source: /archive/coding-agent-harness-source-study.pdf
tags: [agents, coding-agents, agent-harness, context-engineering, orchestration, survey]
timestamp: 2026-09-28T18:39:26Z
---

# Harness Engineering: Anatomy, Architecture, and Evolution of Coding Agents — Study Notes

**Authors**: Paul Barbaste, Tristan Darrigol, Germain Vu, and Tom Wiltberger  
**Preprint**: arXiv:2609.00006v1, July 2026

## What It Is

A source-code comparative anatomy of **eleven** shipped agent runtimes—Claude Code, Codex, Gemini CLI, Mistral Vibe, OpenHands, Aider, Mini-SWE-Agent, Hermes, Pi, OpenCode, and OpenClaw—with a separate meta-harness contrast (Omnigent). A harness is the loop and surrounding infrastructure that turns a model into an acting agent, as distinct from an evaluation harness or library framework. The paper **does not execute a common benchmark or rank effectiveness**. Eight systems are re-pinned across April and July 2026, supporting a short longitudinal comparison; Claude Code relies on a circulated March source snapshot rather than a reproducible official source release.

## Seven Decisions Every Runtime Makes

The shared anatomy comprises **loop/stopping behavior, model integration, tools/actions, memory/context, safety/permissions, orchestration, and extensibility**. Even deliberate absence occupies a design slot: Mini-SWE-Agent's one-tool loop minimizes infrastructure; Aider has no orchestrator. The large harnesses instead allocate most code to operational properties not rewarded by task-completion benchmarks: safe execution, state recovery, extension ecosystems, user-facing interfaces, and cost control. Similar task scores from differently sized products are self-reported under incompatible models/configurations, not evidence that the extra infrastructure is worthless.

The eleven systems exhibit hand-rolled runtime loops rather than importing general-purpose agentic frameworks, and none uses vector-embedding retrieval over the **source tree**; file paths, lexical search, tree-sitter, and repo-local instruction files are their workhorses. This absence is carefully scoped: some systems use embedding extensions over conversation history. Nine of eleven have skills and eight MCP; those adoption counts include the non-coding OpenClaw contrast. Deferred loading prevents extensions from consuming the initial context, but registries, third-party plugins, and agent-authored skills add admission and provenance problems. Most parent–child subagents communicate internally in process even where interop protocols are exposed to editors or rival harnesses.

## Memory, Safety, and Platform Boundaries

Seven systems use threshold-triggered LLM context compaction; differentiation moves to **who may write persistent memory**. Codex uses a sandboxed agent to consolidate extracted memories, Gemini CLI funnels extracted skill proposals into a human-reviewed inbox, and Hermes keeps small file-native snapshots alongside lexical conversation search. The paper calls out the costs of compaction and memory: summaries omit details, writable memory can contaminate later sessions, and session-fork or rewind semantics do not necessarily restore filesystem state (Pi is an example).

Safety is not one toggle: native OS sandboxes, tool permissions, prompt guards, per-action approvals, and extension hooks enforce different boundaries. Large systems can omit OS isolation while investing instead in permission granularity or untrusted-content delimiting, refuting a simple size-implies-sandbox rule. A structural shift is visible in the three-month diff: named hook vocabulary, plugin formats, importers, and context conventions diffuse across competitors; harnesses become SDKs and servers, while library framework vendors ship full harnesses. External orchestrators increasingly host vendor harnesses as backends rather than rebuilding each model's editing loop.

## Analyst Takeaways and Limits

1. **Judge harness design against operational risk as well as task success.** Minimal loops demonstrate a low capability floor, not production readiness for untrusted execution or long-lived state.
2. **Treat context and memory as governed write paths.** The difference between autonomous consolidation and a human-reviewed patch inbox is authority over persistent behavior, not just retrieval quality.
3. **Place standards at their actual boundary.** ACP/A2A can expose a runtime to outside clients without mediating its internal parent–child delegation; MCP connects tools, not automatically their trust model.
4. **Separate durable structure from release inventory.** The seven-subsystem model and source-retrieval mechanisms may travel; exact tool counts, prompts, default models, and safety behavior are July-specific.

The study reads source without running systems head to head, does not verify benchmarks, and cannot observe deployed flag combinations or closed-source differences. Its absence claims depend on manifest and import searches; dynamic plugins and private forks may escape them. The purported scaffold–capability frontier is an explicitly untested hypothesis, not a measured curve.

## Vault Ideas Extracted

* [Agent-Ergonomic Interface Design](/vault/agent-ergonomic-interface-design.md)
* [File-Native Context Retrieval](/vault/file-native-context-retrieval.md)
* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
