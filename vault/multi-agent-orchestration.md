---
type: Synthesis
title: Multi-Agent Orchestration
description: Decomposing a complex task into specialized agents that run in a coordinated pipeline, with explicit handoffs, configuration-aware evaluation, and parallel execution where dependencies allow.
tags: [multi-agent, orchestration, evaluation, agents]
timestamp: 2026-07-23T20:03:07Z
---

# Multi-Agent Orchestration

A design pattern where a complex task is broken into distinct sub-tasks, each handled by a specialized agent. The agents operate in a coordinated pipeline with parallel execution where dependencies allow.

## Core Principles

1. **Specialization over Generalization** — Each agent masters one domain (planning, visual generation, literature search, writing, refinement) rather than a single generalist attempting everything.
2. **Parallel Execution** — Independent sub-tasks run concurrently to minimize wall-clock time.
3. **Decoupled Verification** — High-throughput discovery (e.g., web search with many concurrent workers) is separated from rate-limited verification (e.g., API calls with strict quotas). For structured work, a final agent can also validate the full candidate set for grounding, cross-record consistency, duplicates, and canonical output.
4. **Score-Gated Iteration** — Refinement loops accept changes only if objective quality metrics improve, preventing degradation.

## When to Use

- The task has naturally separable sub-domains with minimal cross-cutting concerns.
- Different sub-tasks have different resource constraints (latency, concurrency, API limits).
- Quality can be evaluated by an objective scoring function.
- The output is a structured artifact (document, code, plan) that can be incrementally improved.

## When Not to Use

- The task requires tight feedback loops between sub-domains (e.g., real-time dialogue).
- Sub-tasks are so interdependent that parallel execution creates race conditions.
- Quality is purely subjective with no agreed-upon scoring rubric.

## Variants

| Variant | Description | Example |
|---------|-------------|---------|
| **Sequential Pipeline** | Agents run in strict order; each output feeds the next input | Traditional data engineering pipelines |
| **Parallel Fork-Join** | Independent agents run concurrently; results merged at join point | PaperOrchestra Steps 2 & 3 (plotting + literature review) |
| **Iterative Refinement** | A single agent loops with a critic until quality threshold met | Content Refinement Agent with AgentReview |
| **Hierarchical** | A meta-agent delegates to sub-agents and integrates their outputs | AutoGPT-style task decomposition |

## Sequential Typed Pipelines

When later decisions depend on earlier structured outputs, sequence can be more valuable than parallelism. Have each stage emit a small, validated type—such as candidates, linked pairs, labels, then a final record set—and provide both those intermediates and the original evidence to downstream stages. This exposes error boundaries and avoids forcing one generation to choose spans, relations, labels, and serialization simultaneously.

The trade-off is compounding omissions and added inference cost. If an early candidate stage is mandatory, its false negatives can block later recovery. Use deterministic checks at handoffs, permit a final verifier to reopen only clearly supported omissions where appropriate, and evaluate the latency/precision/recall trade-off against a direct baseline.

## Coordination Is an Optimization Boundary

Agent count, routing topology, message protocol, and aggregation rule determine whether a local behavior improvement reaches the final outcome. They should be versioned and evaluated with prompts as one deployed configuration. More agents are not automatically better: each added handoff can dilute a useful change, create inconsistent agent assumptions, or raise the cost of attributing failures.

Use structured handoff contracts when downstream decisions repeatedly depend on status, evidence, confidence, or the next action. These contracts make the information flow inspectable and give local prompt changes a stable interface, but they should be validated for semantic usefulness rather than treated as formatting alone.

## Learn Parallelism Against the Critical Path

For broad search or naturally separable work, let an orchestrator decide whether, when, and how to create specialists rather than hard-coding a large fan-out. Evaluate a parallel stage by its longest branch plus coordination work, not by total workers or total actions. This critical-path view rewards balanced decomposition and prevents a policy from receiving credit merely for spawning many irrelevant subagents.

When outcome rewards are sparse, holding executor policies fixed while learning the orchestrator can stabilize credit assignment. Return bounded findings, evidence references, confidence, and necessary artifacts from each subagent; keep raw local traces out of the coordinator’s context unless they are required to resolve a conflict. This makes parallelism an explicit context-sharding strategy as well as a latency strategy.

## Search the Workflow in Stages

When both role instructions and routing remain unsettled, first establish competent minimal building blocks, then search a bounded workflow grammar using measured block benefit as a sampling prior, and finally adapt the prompts to the chosen graph. This reduces waste on unpromising structures without mistaking local block scores for the final decision: every selected workflow still needs end-to-end holdout evaluation for quality, cost, and safety-relevant handoffs.

## Sources

- [PaperOrchestra dossier](/dossiers/paperorchestra.md) — 5 specialized agents in a fork-join pipeline; ~60–70 LLM calls; 39.6 min mean latency
- [MASTE: A Multi-Agent Pipeline for Zero-Shot Aspect Sentiment Triplet Extraction dossier](/dossiers/maste-zero-shot-aspect-sentiment-triplet-extraction.md) — sequential typed stages for aspect, opinion, sentiment, and triplet-set consistency; reported gains come with four calls per sentence and aspect-stage recall risk.
- [MAS-PromptBench dossier](/dossiers/mas-promptbench.md) — finds that prompt-optimization effects vary by task, topology, communication structure, and team size; its tested optimizers generally benefited more from structured protocols and smaller teams.
- [Multi-Agent Design: Optimizing Agents with Better Prompts and Topologies dossier](/dossiers/multi-agent-design-prompts-topologies.md) — searches prompt and topology variables in three stages, prioritizing topology blocks by measured validation influence before adapting prompts to the selected workflow.
- [Kimi K2.5: Visual Agentic Intelligence dossier](/dossiers/kimi-k2-5-visual-agentic-intelligence.md) — technical-report evidence for a frozen-subagent/trainable-orchestrator design, auxiliary parallelism/completion rewards, critical-step latency, and context sharding.
