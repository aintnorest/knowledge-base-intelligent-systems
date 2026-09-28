---
type: Study Note
title: Ralph Wiggum as a "software engineer"
description: Geoffrey Huntley's account of a reset-each-iteration coding loop, with persistent specifications, delegated context-heavy work, fast verification backpressure, and explicit greenfield limits.
resource: https://ghuntley.com/ralph/
source: /archive/ralph-wiggum-loop.html
tags: [agents, coding-agents, agent-harness, long-horizon, orchestration, verification]
timestamp: 2026-09-28T18:39:32Z
---

# Ralph Wiggum as a "software engineer" — Study Notes

**Author**: Geoffrey Huntley  
**Published**: July 14, 2025; captured page reports modification February 19, 2026

## What It Is

Huntley describes Ralph as a deliberately simple repeated coding-agent invocation: each iteration starts with a fresh context, reads durable project specifications and a current plan, and selects work to do. His firsthand example is CURSED, a new compiler and programming language under development when he wrote the account. This is an operator's field report and argument, not a controlled demonstration that the approach yields production-grade software.

## Why Reset the Loop?

The author regards growing conversational context as a quality liability. Rather than carrying the entire previous trajectory, each pass reintroduces specifications and the current prioritized plan from disk. That repeated reading spends tokens but makes the starting state predictable. The agent should work on one priority per loop when it starts drifting; later example prompts relax this to several priorities, so “one” is a corrective discipline rather than an invariant of every run.

The persistent artifacts divide responsibilities: specifications say what should exist, a frequently revised plan says what remains, and compact repository guidance records discoveries about the project's workflow. The operator watches and periodically discards or regenerates the plan when it becomes stale or unhelpful. Losing the private reasoning of a previous iteration makes recording why a test exists especially important: future agents must encounter the intent in a durable artifact, not infer it from a passing assertion.

## Delegation and Backpressure

Huntley calls the top-level agent a scheduler: delegate expensive investigations and summaries to subagents so the main context is not filled with raw search and build output. Parallelism is not unrestricted across shared resources; he explicitly limits simultaneous Rust build/test workers to one to avoid contention while allowing much wider independent investigation. He warns that search can falsely suggest functionality is absent, yielding duplicate implementations, and asks agents to check before adding code.

Generation needs rapid feedback from targeted tests, builds, type checks, static analysis, and inspection of actual artifacts such as compiler intermediate representation. The speed of this rejection-and-repair loop matters alongside strictness of the verifier: slow compilation can reduce iteration rate even when it provides valuable type feedback. An early contradictory lexer specification consumed roughly a month of his project before he noticed it; repeated agent work does not repair a faulty source of truth without operator intervention.

## What the Account Does and Does Not Establish

Huntley admits waking to uncompilable code, placeholder implementations, duplicated work, and a repository containing garbage and temporary artifacts; he describes human judgment, prompt revisions, and sometimes rollback as necessary. He says the approach is suited to greenfield bootstrapping and explicitly would not use it in an existing codebase. Claims that it can replace outsourcing or reach most of a greenfield product are personal judgments without defect-rate, maintenance, or comparative productivity measurements in this source. The unfinished CURSED project is not evidence of a completed production compiler.

## Analyst Takeaways

1. A fresh context can be useful when durable, inspectable artifacts preserve task intent and test rationale; reset alone discards essential history.
2. Delegate noisy exploration to separate contexts, but serialize shared expensive verification to prevent parallelism from overwhelming the feedback loop.
3. Tests and source specifications are fallible feedback surfaces: an agent can repeatedly satisfy the wrong spec or chase compiling placeholders until the operator corrects the premise.
4. Treat the greenfield scope and active senior oversight as part of the claimed method, not as incidental caveats.

## Vault Ideas Extracted

* [File-Native Context Retrieval](/vault/file-native-context-retrieval.md)
* [Machine-Readable Agent Specifications](/vault/machine-readable-agent-specifications.md)
* [Verifier Co-Evolution Under Optimization](/vault/verifier-co-evolution.md)
