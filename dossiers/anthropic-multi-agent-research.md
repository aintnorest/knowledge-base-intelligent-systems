---
type: Study Note
title: How we built our multi-agent research system
description: Anthropic's first-hand account of breadth-first parallel research, delegated context compression, effort budgets, evaluation, and production coordination bottlenecks.
resource: https://www.anthropic.com/engineering/multi-agent-research-system
source: /archive/anthropic-multi-agent-research.html
tags: [agents, multi-agent, orchestration, retrieval, evaluation, context-engineering]
timestamp: 2026-09-28T18:38:44Z
---

# How we built our multi-agent research system — Study Notes

**Publisher**: Anthropic  
**Date**: June 13, 2025

## What It Is

A production account of a lead research agent that decomposes open-ended questions into parallel searches, receives compressed findings from independently contextualized subagents, decides whether to investigate further, and hands the assembled report to a citation agent. This is iterative search, not a fixed one-shot retrieval pipeline. Distinct contexts provide breadth and reduce path dependence, but spend more tokens and create coordination failure modes.

## Design and Observed Tradeoffs

Anthropic reports 90.2% higher performance for an Opus 4 lead with Sonnet 4 subagents than a single Opus 4 agent on its internal research evaluation. Token usage alone explained 80% of BrowseComp performance variance in the team's analysis; token usage, tool calls, and model choice together explained 95%. These correlations do not isolate an intrinsic multi-agent advantage. Research agents reportedly consume about four times chat tokens and multi-agent systems about fifteen times chat tokens. Breadth-first, high-value queries fit; heavily coupled coding tasks and queries requiring shared context generally fit less well.

Early leads launched excessive subagents or repeated searches; vague delegation duplicated work and missed other dimensions. The team's remedy was to specify distinct objectives, tools/sources, result shape, and boundaries, and budget effort by query difficulty. Initial subagents explore broadly before narrowing. Parallel subagents and parallel calls within each subagent reportedly cut elapsed time by up to 90% on complex queries. Rewriting confusing tool descriptions after repeated agent trials reportedly cut later task completion time by 40%; these are first-party observations without controlled attribution.

## Evaluation and Production Lessons

A roughly 20-query initial evaluation suite gave early regression feedback. Anthropic judged factual and citation accuracy, completeness, source quality, and tool efficiency; human testers still uncovered a preference for SEO content farms over authoritative PDFs and blogs. Different valid research trajectories make fixed action-sequence checks inappropriate: assess answers, sources, and consequential end states instead. A dedicated citation pass localizes evidence, but the article supplies no independent citation error rate.

Long-running work needs resumable state and durable checkpoints rather than restart from scratch. Plans survive context truncation through external memory; artifacts can bypass the lead and return only references to prevent loss in repeated summaries. Full traces exposed wrong tools and searches without inspecting users' conversation contents; gradual coexistence of old and new versions protected in-flight sessions. The current lead waits synchronously for batches of subagents, simplifying consistency but letting one laggard stall synthesis and preventing live steering. Asynchronous handoffs could improve throughput while complicating error propagation and state coordination.

## Analyst Takeaways

- **Parallelism earns its cost when evidence branches are independent.** A subagent is an independent search context and a compression stage, not free extra intelligence.
- **Delegation quality is a control surface.** Explicit scope and a bounded result contract prevent duplicate browsing and costly unproductive searches.
- **Evaluate the resulting claim and provenance, not a preferred route.** Human source-quality review catches biases rubric scores miss.
- **Observe interaction structure as well as final output.** Long-lived, nondeterministic execution requires state continuity and version-aware rollout.

The benchmark gains, token ratios, and time savings are internally reported and specific to the 2025 Research implementation; the article does not establish cost-adjusted superiority for every query or robust coordination on dependent work.

## Vault Ideas Extracted

* [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md)
* [Source-Adapter Decoupling](/vault/source-adapter-decoupling.md)
* [File-Native Context Retrieval](/vault/file-native-context-retrieval.md)
* [Subagent Context Inheritance Modes](/vault/subagent-context-inheritance-modes.md)

