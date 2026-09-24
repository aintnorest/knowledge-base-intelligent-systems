---
type: Study Note
title: My LLM coding workflow going into 2026
description: Addy Osmani's personal operating loop for AI-assisted coding, from an approved spec and small tasks through scoped context, executable feedback, review, and reversible commits.
resource: https://addyosmani.com/blog/ai-coding-workflow/
source: /archive/ai-coding-workflow-2026.html
tags: [coding-agents, human-in-the-loop, orchestration, context-engineering, verification, agents]
timestamp: 2026-09-24T03:45:44Z
---

# My LLM coding workflow going into 2026 — Study Notes

**Author**: Addy Osmani  
**Publisher**: AddyOsmani.com (personal practice, not Google policy)  
**Published**: January 4, 2026

## What It Is

A first-person account of running an AI coding assistant as a pair programmer rather than an accountable software engineer. The distinctive contribution is the *sequence* of work: human-reviewed specifications, a task plan, one small implementation slice at a time, relevant repository context, verification in the real environment, and a commit/checkpoint before the next slice. It collects community examples and tool references, not controlled evidence that each step independently improves outcomes.

## The Working Loop

1. **Specify and plan.** Osmani starts with a dialogue about requirements and edge cases, saves a spec containing architecture, data models, and testing strategy, then has a reasoning-capable model decompose it into bite-sized milestones. He edits and critiques the plan before permitting implementation.
2. **Implement in small increments.** Ask for Step 1 rather than the whole feature. Test and inspect that step before Step 2; preserve the useful context from completed work but avoid a monolithic generation that cannot be understood or corrected.
3. **Give task-relevant context.** Supply the actual code touched, project invariants, working examples, pertinent API documentation, and known pitfalls. He mentions tools that package repositories, but also explicitly selects only relevant portions to avoid wasting context on unrelated material.
4. **Select models by task and failure.** He tries a second model when one is stuck or uses another to review a first model's code. His preference for Gemini is disclosed as personal and influenced by his work on Gemini at Google; model swapping is not presented as a validated universal ranking.
5. **Exercise the output.** Run tests; manually use the feature; for a web UI inspect live DOM, console, network and performance signals with browser tooling. Review generated code and use an independent AI session for another perspective, without treating that review as human sign-off.
6. **Commit a comprehensible checkpoint.** Commit after a successful scoped change, keep diffs readable, use branch/worktree isolation for parallel experiments, and refuse to ship code the owner cannot explain. History doubles as recovery point and context for later debugging.

Rules files such as `CLAUDE.md`/`GEMINI.md`, project examples, and repeatable skills can communicate conventions across sessions. Feedback from compilers, linters and CI should feed the next coding step. The author repeatedly stresses that these tools are only as useful as the tests, standards, and human expertise supplied around them.

## Distinguishing Claims

The post cites a contemporaneous claim that about 90% of Claude Code's code was written by Claude Code; that is an illustrative external claim, not an outcome measurement of Osmani's workflow. He says monitoring 3–4 agents in separate tasks can be effective but mentally taxing, and ordinarily prefers one main coding agent plus perhaps a reviewer. Its strongest concrete practices are small checkpoints and execution evidence, not maximal parallelism.

## Analyst Takeaways

1. **Keep a human-owned phase transition.** Approve the problem and plan before generation; require a runnable demonstration before accepting each task. Both gates are cheaper than diagnosing a giant finished diff.
2. **Use a task's own evidence as context.** Show the agent the relevant implementation, failed test output, and API contract rather than dumping an entire repository into every turn.
3. **Make a checkpoint mean something.** A small commit after observed behavior creates a useful rollback boundary; arbitrary frequent commits without verified behavior create only finer-grained uncertainty.
4. **Treat another model's review as a hypothesis generator.** Confirm its concerns in executable behavior or code and keep the human accountable for merge.
5. **Scale parallelism to review bandwidth.** A pair of independent worktrees can increase throughput; more simultaneous threads are not free when one engineer must integrate and understand them.

## Questions and Limitations

- No before/after study, sample size, comparative model results, or error rates establish the recommended workflow's magnitude of benefit. Most examples are anecdotal and tool capabilities can age quickly.
- The prose alternates between 'provide extensive context' and 'select only relevant portions'; deciding what is relevant is itself a difficult retrieval task.
- Model-generated tests and passing CI cannot prove that missing requirements, bad architecture, or incorrect tests are absent. The human must preserve an independent oracle where possible.
- An explanation from the agent does not establish that the implementation is understood; the author-level standard is demonstrated understanding and verification.
- These are Osmani's personal practices, not Google policy.

## Vault Ideas Extracted

* [Intent Engineering for Agents](/vault/intent-engineering-for-agents.md)
* [Reviewable Change Units](/vault/reviewable-change-units.md)
* [Scoped Guideline Memory](/vault/scoped-guideline-memory.md)
