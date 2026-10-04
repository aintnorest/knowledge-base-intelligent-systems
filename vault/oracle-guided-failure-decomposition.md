---
type: Synthesis
title: Oracle-Guided Failure Decomposition
description: Replace selected components of a failing integrated candidate with a known-good implementation to isolate faults and assign independent investigations.
tags: [agents, llm-code-testing, coding-agents, verification, decomposition, multi-agent]
timestamp: 2026-09-28T19:06:02Z
---

# Oracle-Guided Failure Decomposition

When one integration test fails across many components, replace subsets of the candidate implementation with a compatible known-good oracle. Repeated mixed runs reveal which candidate components or combinations are necessary for the failure. This changes a shared, coupled debugging task into smaller investigations that can be assigned independently.

## Operating Pattern

1. Establish a reproducible failing all-candidate run and a passing all-oracle run under the same integration test.
2. Define replaceable units with compatible interfaces and stable inputs; run mixed configurations, changing which units use the candidate while holding the rest on the oracle.
3. Partition failing candidate subsets to find a smaller failure-inducing set. Confirm isolated defects with a targeted reproducer before assigning separate workers.
4. If no single unit reproduces the failure, test combinations and use delta debugging to minimize an interacting set. Re-run the full candidate integration after fixes; localized passes do not establish global correctness.

## Why It Matters

More workers do not make one undifferentiated failure parallelizable. Mixed-oracle configurations increase the verifier's diagnostic resolution: they distinguish independent defects from interactions and reduce collisions over one shared symptom. This complements [Cross-Version Differential Oracles](/vault/cross-version-differential-oracles.md), which compares implementations and tests across versions; here the reference implementation is deliberately substituted within one integrated execution.

## Practical Use

Use this when a compiler, service pipeline, or other modular system has a trustworthy interchangeable reference and a costly shared integration failure. Automate mixed-run selection, record each configuration and outcome, and hand workers minimal failing units or combinations rather than the original monolithic failure. Preserve an integration gate after local fixes.

## Limitations

- The oracle must be sufficiently compatible at replacement boundaries; differences in interfaces, generated artifacts, environment, or state can create false localization.
- Failures that depend on multiple units, ordering, or nondeterminism defeat simple single-unit isolation; interaction search and repeated runs cost additional time.
- A passing mixed run does not prove the candidate subset correct under the all-candidate configuration, nor that the reference is correct against the task's actual requirements.

## Sources

- [Building a C compiler with a team of parallel Claudes dossier](/dossiers/parallel-claudes-c-compiler.md) — mixed GCC/candidate kernel builds localized faulty compilation units for parallel workers; interacting file pairs still needed delta debugging.
