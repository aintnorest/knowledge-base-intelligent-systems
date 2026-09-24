---
type: Synthesis
title: Cross-Version Differential Oracles
description: "Using the previous implementation and its test suite as independent reference points, by crossing old and new code with old and new tests or running both versions on shared inputs, so that code and tests changed together cannot silently agree on a wrong behavior."
tags: [verification, code-quality, coding-agents, evaluation, agents]
timestamp: 2026-09-24T03:56:19Z
---

# Cross-Version Differential Oracles

When an agent changes both an implementation and its tests, a green run of new code against new tests proves only that the two agree, and they can share the same mistaken premise. The earlier version of the system is a readily available independent reference. Crossing versions, or running old and new systems side by side, exposes regressions, non-discriminating tests, and code and tests that have adapted to each other.

## The 2×2 Test Matrix

Let OC be the original code, RC the revised code, OT the tests written against the original, and RT the tests written against the revision.

- **OC–OT** sets the old baseline and identifies pre-existing failures.
- **RC–OT** checks that old behavior is preserved, or changes only under a reviewed requirement. Unexpected failures suggest regressions.
- **OC–RT** asks whether the new tests actually distinguish the old implementation. A repair test should fail on the known old defect; unaffected cases should normally pass.
- **RC–RT** checks the new artifact against the revised suite. This cell alone cannot establish correctness.

For every changed behavioral contract, state which checks *should* change on each version and why, then investigate the divergent rows rather than optimizing the RC–RT aggregate. NGQA reports mean pass rates of 73.8% (OC–OT), 68.2% (OC–RT), 82.1% (RC–OT) and 86.0% (RC–RT). Its authors caution that tests generated from the same code establish implementation consistency, not specification correctness.

## Differential Execution for Migrations

For language or platform migrations, run the source and converted systems on the same representative and adversarial inputs. Normalize only explicitly allowed differences, and investigate every mismatch before acceptance. Prioritize date boundaries, rounding, nulls, currencies, and customer-visible or regulatory outputs. Record source and target revisions, runtime versions, model and run configuration, test-data provenance, tolerance rules, mismatches, accepted intentional changes, the reviewer and the release decision. The evidence is a comparison between *two systems*, not the converting agent's claim of correctness.

## Limitations

Old tests may be weak or stale, and the original system may itself be wrong, stale or nondeterministic. An intended behavior change needs a documented new oracle. For a pure refactor, RT failing on OC is *not* desirable. Matching on tested inputs does not prove equivalence across the whole input domain. Treat the matrix as a diagnostic design, not four votes for correctness, and evaluate mutation sensitivity, security, performance and intent separately. The migration guidance comes from a position paper without empirical evaluation.

## Sources

- [NGQA: Next-Gen Software Quality Accelerator using AI Agents and LLM Reasoning dossier](/dossiers/ngqa-software-quality-accelerator.md) — four-fold original/revised code-by-test execution with explicit limits on interpreting pass rates.
- [The Ethics of AI-Assisted Code Migration in Regulated Financial Systems: Accountability, Transparency, and Human Oversight in LLM-Driven Software Conversion dossier](/dossiers/ethics-ai-assisted-code-migration.md) — parallel old/new execution over representative data with human examination of divergences; no quantified results.
- [AI-Driven Tools in Modern Software Quality Assurance: An Assessment of Benefits, Challenges, and Future Directions dossier](/dossiers/ai-driven-software-quality-assurance-pysmennyi.md) — agents altering deliberately mutated tests show why oracles must stay outside the generator's authority.
