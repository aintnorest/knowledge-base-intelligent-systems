---
type: Synthesis
title: Reviewable Change Units
description: "Sizing agent-assisted changes as self-contained, semantically small units that carry their own evidence of behavior, rather than by arbitrary line counts, so that human review remains meaningful."
tags: [code-review, human-in-the-loop, coding-agents, verification, agents]
timestamp: 2026-09-24T03:56:19Z
---

# Reviewable Change Units

The right unit of change is one self-contained behavior or maintenance action that a reviewer can understand and a working codebase can safely accept. It includes related tests or other appropriate verification, plus enough context to evaluate consequences. Smallness is semantic and cognitive, not a fixed number of lines or files. With agents, the unit also has to carry its **evidence**: the author, human or agent, hands over a demonstrated change, not the job of discovering whether it runs.

## Sizing the Unit

Map dependencies before coding. Stack a later change on one already in review. Split by ownership where interfaces are stable, horizontally across real layer contracts, or vertically into thin complete features. Keep substantial refactors separate from behavior changes, and keep tests of new logic in the same change. A new API should normally ship with at least one use. Get reviewer agreement before writing an irreducibly large unit. Ask coding agents for one reviewable behavior, not a line quota.

Google's reviewer guidance calls ~100 lines usually reasonable and ~1,000 usually too large, but **explicitly sets no hard size limit**. Rules of thumb such as "≤300–400 LOC per PR" are team heuristics, not Google policy or measured optima.

## The Evidence-Bearing Handoff

An AI-assisted PR should state:

1. what changed and why, in terms of desired behavior;
2. the executed tests, manual walkthrough or observed output that demonstrate it in its intended environment;
3. residual risks those checks cannot cover, and how AI was involved;
4. one or two focused questions for the reviewer.

The author stays responsible even when an agent wrote the patch. AI critique can triage possible faults, but reproduce serious findings before acting on them, and keep human approval. Raise scrutiny for authentication, payments, secrets and architectural uncertainty even on a one-line change.

## Limitations

Over-splitting can leave unused interfaces, broken intermediate builds or compatibility scaffolding, and some migrations must be atomic. A one-line security edit can need more review than a large generated deletion. Passing tests can cover the wrong requirement, screenshots can hide backend defects, and a polished description can be theater. Requiring new tests for every patch creates low-value checks when an existing test or a direct smoke scenario is stronger proof. This is practitioner guidance, not a measured universal policy.

## Sources

- [Small CLs dossier](/dossiers/google-small-cls.md) — self-contained CLs, splitting strategies, separate refactors, and no hard size rule.
- [AI writes code faster. Your job is still to prove it works. dossier](/dossiers/ai-code-review-proof.md) — intent, proof, risk/AI-role disclosure and review focus as the PR contract.
- [My LLM coding workflow going into 2026 dossier](/dossiers/ai-coding-workflow-2026.md) — small commits with save-points and line-by-line human validation.
- [Bringing Code Review to Claude Code dossier](/dossiers/claude-code-review.md) — AI findings support human triage; approval stays human.
