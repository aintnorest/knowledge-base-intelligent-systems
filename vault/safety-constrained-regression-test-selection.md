---
type: Synthesis
title: Safety-Constrained Regression Test Selection
description: "Running only the tests affected by a change to shorten agent CI loops, while treating affected-test recall, not time saved, as the invariant and keeping a full-suite acceptance gate."
tags: [verification, code-quality, coding-agents, reliability, agents]
timestamp: 2026-09-24T03:56:19Z
---

# Safety-Constrained Regression Test Selection

Selective regression testing runs only the tests predicted to be affected by a change. It is what makes fast agent feedback loops affordable on large suites. Its critical invariant is **affected-test recall**: a selector is safe on a change only if no truly affected test is skipped. Test-count reduction and wall-time savings are separate metrics, and neither implies safety. In dynamic languages, a conservative file-import graph can select almost everything, while an aggressive graph can silently miss callbacks and runtime imports.

## Practical Use

- Build an impact graph at the finest affordable granularity, such as code elements connected through names and imports. Reuse prior execution evidence only where unchanged upstream code keeps it valid.
- Measure initialization, instrumentation, selection and actual test execution time, not selection alone.
- Fall back conservatively for plugin loading, shared state, external callbacks, reflection, or stale runtime traces.
- Use selection for the inner loop (agent iteration and early CI rounds). Keep the full suite as the final acceptance gate for agent-authored or consequential changes until the local false-negative risk is known to be acceptable.
- Stop the agent from editing the tests the selector relies on. Agents that change tests also change the dependency picture.

Stripe's Minions pair a local lint pass taking seconds with CI that runs only the tests relevant to the changed files, drawn from a suite of millions of tests, under a cap of two CI rounds. This is the production form of the pattern (see [Bounded Hybrid Coding Workflow](/vault/bounded-hybrid-coding-workflow.md)).

## Evidence

Across 500 Python commits, NameRTS skipped 69.90% of test files and cut end-to-end time by 45.59%, selecting all affected tests on 99.6% of commits. Its two misses came from shared-state interference and an external callback. A baseline skipped 97.63% of Matplotlib tests but was safe on only 14% of evaluated commits. This is dataset-specific evidence of a savings-versus-recall frontier, not a universal guarantee.

## Limitations

Ground truth for "affected" tests is hard to establish, and a passing selected suite proves only what it ran. Runtime dependencies shift with test order, environment, data and library versions. Recheck the selector on representative history, and test full release artifacts separately.

## Sources

- [Names Are All You Need: Effective and Safe Regression Test Selection for Python dossier](/dossiers/namerts-python-regression-test-selection.md) — name/code-element reachability, 99.6% empirical safe rate, 45.59% time reduction, and analyzed false negatives.
- [Minions: Stripe’s one-shot, end-to-end coding agents dossier](/dossiers/stripe-minions-one-shot-coding-agents.md) — selective CI from a multi-million-test suite inside a bounded agent loop.
