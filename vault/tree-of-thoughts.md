---
type: Synthesis
title: Tree of Thoughts
description: Structured reasoning that explores multiple reasoning paths, evaluates intermediate steps, and backtracks when necessary — treating reasoning as a tree search rather than a linear chain.
tags: [prompting, reasoning, test-time-scaling, decomposition]
timestamp: 2026-07-12T23:58:44Z
---

# Tree of Thoughts

A prompting framework that treats reasoning as a deliberate search process over a tree of possible thoughts, enabling exploration, evaluation, and backtracking.

## The Problem with Chain-of-Thought

CoT is linear: once the model commits to a reasoning step, it cannot backtrack. For complex problems where early mistakes compound, this is a significant limitation.

## How Tree of Thoughts Works

1. **Decompose the task** — Choose a semantic intermediate unit: an equation line, a plan, a subgoal, or a constrained action. It must be small enough to branch over and large enough to evaluate.
2. **Generate alternatives** — At each state, sample diverse next thoughts or ask for a sequential proposal list when the candidate space is constrained.
3. **Evaluate partial states** — Use a value prompt to score states independently, or a voting prompt to select the most promising among them. The judgment acts as a heuristic, not a proof.
4. **Search and revise** — Use BFS to retain a bounded frontier or DFS to pursue promising branches, prune failed states, and backtrack to alternatives.

## Key Capabilities

- **Lookahead** — The model can simulate future consequences of a thought before committing to it.
- **Backtracking** — The model can abandon a reasoning path that leads to contradictions or dead ends.
- **Self-evaluation** — The model assesses its own intermediate reasoning steps.

## Practical Use

Use ToT for bounded, constraint-heavy tasks where early decisions are costly and partial progress is inspectable: scheduling, puzzle-like planning, multi-step transformations, or structured generation with verifiable intermediate constraints. Set an explicit expansion budget, use deterministic checks alongside model evaluation when possible, and log rejected branches so evaluation failures are diagnosable.

## Limitations

- It costs materially more than a single chain: each branch needs generation and often repeated evaluation calls.
- Poor thought boundaries can make branches either incoherent (too large) or impossible to assess (too small).
- LLM self-evaluation can confidently prune a valid path, particularly under rare knowledge or weak constraints; it should not replace external verification where correctness matters.
- ToT is not automatically helpful on tasks that a strong model already solves with direct prompting or CoT.

## Variants

| Variant | Structure | Use Case |
|---------|-----------|----------|
| **Tree of Thoughts (ToT)** | Tree with branching paths | Mathematical reasoning, creative writing, planning |
| **Graph of Thoughts (GoT)** | Arbitrary graph with aggregation | Problems requiring combining multiple sub-solutions |

## Comparison

| Method | Structure | Backtracking | Aggregation |
|--------|-----------|--------------|-------------|
| CoT | Linear chain | No | No |
| ToT | Tree | Yes | No |
| GoT | Arbitrary graph | Yes | Yes |

## Sources

- [Prompt Engineering Survey dossier](/dossiers/prompt-engineering-survey.md) — Yao et al. (2023), Besta et al. (2023)
- [Tree of Thoughts: Deliberate Problem Solving with Large Language Models dossier](/dossiers/tree-of-thoughts-deliberate-problem-solving.md) — defines task-specific thought decomposition, LLM value/vote heuristics, BFS/DFS search, and backtracking.
