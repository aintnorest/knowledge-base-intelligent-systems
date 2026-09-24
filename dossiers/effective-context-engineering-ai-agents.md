---
type: Study Note
title: Effective context engineering for AI agents
description: Anthropic's practitioner framework for selecting high-signal prompts, tools, retrieved evidence, and long-horizon state at each agent turn, with concrete Claude Code examples and limited empirical substantiation.
resource: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
source: /archive/effective-context-engineering-ai-agents.html
tags: [agents, context-engineering, long-context, retrieval, compaction, agent-harness]
timestamp: 2026-09-24T03:42:34Z
---

# Effective context engineering for AI agents — Study Notes

**Authors**: Prithvi Rajasekaran, Ethan Dixon, Carly Ryan, and Jeremy Hadfield (Anthropic Applied AI team)  
**Publisher**: Anthropic, Engineering at Anthropic  
**Published**: September 29, 2025

## What It Is

A first-party operating guide for choosing *what the model sees on this turn*, not merely writing a good system prompt once. The candidate material includes instructions, tool definitions and results, examples, retrieved files, conversation history, and durable notes. An agent continuously generates more potentially relevant observations, so context assembly is a recurring decision rather than a one-time preamble. The stated objective is the smallest **sufficient** set of high-signal tokens for the desired behavior, not the shortest prompt in isolation.

Its familiar high-level advice—long inputs can distract, retrieval can reduce input, compaction can preserve continuity—already appears in this corpus. The distinctive material is the production-level decision boundary across prompt altitude, tool ambiguity, just-in-time navigation, compaction retention, and subagent isolation, plus explicit details of Anthropic's own Claude Code context policy. This is practitioner guidance, not a controlled comparative experiment.

## From Prompt Wording to Context State

- **Prompt altitude**: avoid both brittle if/else behavioral scripts and abstract instructions that presume unstated shared knowledge. Organize background, instructions, tool guidance, and output contract into legible sections; begin with a minimal *sufficient* prompt and add examples or instructions in response to observed failure modes. Minimal does not mean universally short.
- **Tool surface as context**: tool definitions consume context and shape which observations enter later. Prefer distinct, self-contained functions with unambiguous names and parameters; reduce overlapping choices that force the model to infer an arbitrary tool distinction. Return token-efficient information rather than maximal dumps.
- **Canonical examples**: choose a few diverse demonstrations that teach a decision boundary instead of accumulating every edge case as another prompt rule. The article offers no ablation proving the optimal number of examples.

The article explains context rot as diminishing usefulness of additional material, citing attention and training-length constraints. Its explanatory transformer discussion is a heuristic account, not an experimentally isolated diagnosis of which architecture feature causes particular agent failures. Existing controlled long-context and position-sensitivity work is stronger evidence for the phenomenon than this vendor explanation.

## Retrieval at the Moment of Need

Anthropic contrasts embedding-based pre-inference retrieval with *just-in-time* loading: keep paths, links, and stored queries in view, then use tools to fetch narrow material as a question demands. File names, directory location, timestamps, and file sizes become navigational metadata; progressive disclosure lets an agent inspect increasingly detailed subsets rather than carrying the entire corpus. The article's example is Claude Code writing targeted database queries and using shell tools to inspect large result sets without placing full objects into context.

The concrete hybrid is more useful than a blanket recommendation to make everything searchable: Claude Code places `CLAUDE.md` guidance directly into initial context and uses glob/grep-like navigation for contingent project facts. Up-front context saves exploration latency for stable requirements; on-demand reads help with volatile or voluminous evidence. Runtime exploration can also waste calls or miss the right file, and a stale index can be inferior to direct source inspection. These costs make the tool interface and model's navigation competence part of the architecture decision.

## Long-Horizon State: Three Different Boundaries

1. **Compaction** summarizes a nearly full conversation into a new window. Anthropic says Claude Code retains architectural choices, unresolved bugs, implementation details, and the five most recently accessed files while clearing redundant outputs. It recommends initially optimizing *recall* of details across real trajectories before pruning for precision; tool-result clearing is an especially light-touch first step. This is a vendor-described implementation, not evidence that five files or automatic summary are optimal for other tasks.
2. **Structured notes** persist milestones, dependencies, and progress outside the live window, then reload relevant notes after reset. The article describes to-do lists, `NOTES.md`, and a Pokémon agent maintaining precise objectives and tallies over thousands of steps; the anecdote illustrates a mechanism but supplies no controlled comparison.
3. **Subagents** isolate a deep search or specialized analysis in a fresh window and return a condensed result. Anthropic says a worker may explore tens of thousands of tokens and report roughly 1,000–2,000 tokens to a coordinator. This retains the leader's context budget but creates an information-transfer boundary: the summary must include the evidence and decisions the leader actually needs.

These interventions solve different problems. Compaction preserves one conversation; external notes preserve selectively recoverable state; subagents partition exploration. They may be combined, but the article does not compare them at matched quality, cost, and workload.

## Analyst Takeaways

1. **Make context admission an explicit turn-level policy.** For coding work, keep current task, constraints, and essential repository guidance available; expose search and bounded reads for contingent code and logs; record what was read and how to recover omitted detail.
2. **Audit tool choice and response size from trajectories.** Ambiguous tools and huge outputs create decision and attention costs. Tightening the tool contract may outperform another system-prompt admonition.
3. **Measure compaction by retained ability, not shrink ratio.** Carry forward unresolved bugs, rationale, exact file locations, and validation evidence; keep an inspectable source path if a summary omitted a later-critical detail. A lost constraint can degrade code quality even when the conversation still sounds coherent.
4. **Use fresh-context delegation for separable investigations, not as automatic parallelism.** Hand off the task contract, evidence locators, and acceptance criteria; verify the distilled result before allowing it to alter code.
5. **Treat vendor examples as design hypotheses.** Anthropic's hybrid `CLAUDE.md` plus navigation and its five-recent-files compaction rule deserve local end-to-end tests against a direct-context baseline, especially for smaller or different models.

## Questions and Limitations

- No task bank, sample counts, confidence intervals, cost curves, or matched before/after quality measurements establish that these particular choices improve deployed agents.
- A path-only reference may be insufficient if the model cannot search effectively; just-in-time exploration adds latency and failure modes. The right split depends on model, source volatility, tool contract, and task.
- Compaction can silently discard exact requirements, tests, and contradictions; the source gives a recall-first heuristic but no formal preservation or regression protocol.
- The claimed advantage of subagents is illustrated rather than quantified here. Summaries can erase minority evidence or uncertainty.
- The post's finite-attention framing should not be confused with the narrower physical cost of reading KV cache during inference; they demand different measurements and interventions.

## Vault Ideas Extracted

* [Bounded Tool Observations](/vault/bounded-tool-observations.md)
* [File-Native Context Retrieval](/vault/file-native-context-retrieval.md)
* [Reversible, Query-Conditioned Compaction](/vault/reversible-query-conditioned-compaction.md)
* [Structured Execution Memory](/vault/structured-execution-memory.md)
