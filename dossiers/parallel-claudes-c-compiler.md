---
type: Study Note
title: Building a C compiler with a team of parallel Claudes
description: Nicholas Carlini's first-hand autonomous compiler experiment, with isolated agent workspaces, oracle-driven fault localization, verifier engineering, and concrete capability limits.
resource: https://www.anthropic.com/engineering/building-c-compiler
source: /archive/parallel-claudes-c-compiler.html
tags: [agents, coding-agents, multi-agent, long-horizon, verification, code-quality]
timestamp: 2026-09-28T18:38:44Z
---

# Building a C compiler with a team of parallel Claudes — Study Notes

**Author**: Nicholas Carlini  
**Date**: February 5, 2026

## What It Is

A first-hand stress test of long-running autonomous development: 16 Claude Opus 4.6 agents, roughly 2,000 sessions over two weeks, about two billion input and 140 million output tokens, and just under $20,000 of API spend produced a roughly 100,000-line Rust C compiler. The experiment tests the boundary of capability rather than providing a deployable compiler or a controlled productivity comparison.

## Harness and Verification

Each agent worked in its own container and checkout, claimed work in a shared task registry, then integrated changes through a common git repository. Conflicts were frequent; there was no orchestrator agent or general messaging protocol. Fresh sessions needed durable progress notes and concise diagnostic output to regain orientation. Carlini invested heavily in verifiers: broad existing compiler suites, checks on real software, and later CI to catch regressions that accompanied feature additions. Short, searchable failure summaries and reproducible test subsets made feedback usable within agent attention and wall-time limits.

When building the Linux kernel became a single shared failing task, 16 workers kept colliding on the same defect. The harness used GCC as a known-good online oracle, compiling most kernel files with GCC and a varying subset with the new compiler. Success/failure under mixed builds localized candidate faulty files so agents could work on separate bugs; interactions among pairs of files still required delta debugging. Parallelism was enabled by **changing the verifier's diagnostic granularity**, not simply adding workers.

## Results and Limits

The compiler reportedly builds bootable Linux 6.9 on x86, ARM, and RISC-V and several substantial applications, with about 99% passage on most compiler suites including GCC's torture tests. It had no internet during development and depended only on the Rust standard library. Yet x86 boot still calls GCC for a 16-bit stage; assembler and linker work was unfinished, emitted code was less efficient than unoptimized GCC output, and the author judged its Rust quality below expert work. Feature changes frequently regressed earlier behavior, and successful test suites did not establish production suitability.

## Analyst Takeaways

1. **A verifier is part of the agent's task specification.** Agents optimize the feedback they can see; sparse or misleading tests can drive the wrong progress.
2. **Make a monolithic failure divisible.** Mixing a trusted implementation with the candidate under test turns one blocked integration goal into independent local investigations, but cross-component interactions remain.
3. **Isolate execution and integrate deliberately.** Per-agent workspaces reduce interference while shared task ownership and merging still impose coordination cost.
4. **Separate benchmark achievement from engineering acceptance.** Demonstrating a booting kernel does not certify compiler completeness, optimization quality, maintainability, or independent deployability.

The account gives unusually concrete expenditure and artifact evidence, but no matched human-team baseline, independent quality audit, or reliable generalization from a single project.

## Vault Ideas Extracted

* [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md)
* [Cross-Version Differential Oracles](/vault/cross-version-differential-oracles.md)
* [Verifier Co-Evolution Under Optimization](/vault/verifier-co-evolution.md)
* [Oracle-Guided Failure Decomposition](/vault/oracle-guided-failure-decomposition.md)

