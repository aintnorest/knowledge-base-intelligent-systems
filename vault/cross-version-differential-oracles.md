---
type: Synthesis
title: Cross-Version Differential Oracles
description: "Crossing code and test revisions or comparing candidate and reference repairs on shared inputs to expose behavioral differences, then adjudicating them against independently justified intent."
tags: [llm-code-testing, verification, code-quality, coding-agents, evaluation, agents]
timestamp: 2026-10-04T07:48:20Z
---

# Cross-Version Differential Oracles

When an agent changes both implementation and tests, a green run of new code against new tests proves only that the two agree; they can share the same mistaken premise. The earlier system supplies a separate comparison point, not necessarily an independent correctness authority. Crossing versions, or running candidate and reference repairs side by side, exposes regressions, non-discriminating tests, and code and tests that have adapted to each other.

## The 2×2 Test Matrix

Let OC be the original code, RC the revised code, OT the tests written against the original, and RT the tests written against the revision.

- **OC–OT** sets the old baseline and identifies pre-existing failures.
- **RC–OT** checks that old behavior is preserved, or changes only under a reviewed requirement. Unexpected failures suggest regressions.
- **OC–RT** asks whether the new tests actually distinguish the old implementation. A repair test should fail on the known old defect; unaffected cases should normally pass.
- **RC–RT** checks the new artifact against the revised suite. This cell alone cannot establish correctness.

For every changed behavioral contract, state which checks *should* change on each version and why, then investigate divergent rows rather than optimizing the RC–RT aggregate. One study reports mean pass rates of 73.8% (OC–OT), 68.2% (OC–RT), 82.1% (RC–OT), and 86.0% (RC–RT), while cautioning that tests generated from the same code establish implementation consistency, not specification correctness.

## Unchanged Tests Across Buggy and Fixed Code

Run each generated test unchanged on both revisions and retain its failure reason:

| Buggy code | Fixed code | Interpretation under the reference oracle |
|---|---|---|
| Fail | Pass | Potential reproduction: confirm the failure is the intended behavioral assertion, not incidental setup. |
| Pass | Pass | Shared behavior; may be valuable regression protection but does not expose this defect. |
| Pass | Fail | Potential bug validation: the expectation may encode faulty behavior or reject a legitimate alternative. |
| Fail | Fail | Diagnose invalid assumptions, execution problems, or behavior not settled by this repair. |

Do not call every buggy-code pass misguided. In one Java study, an average 93.77% of tests passing buggy code also passed fixed code; only the remaining reference-rejecting tests entered its misguidance category. A reference is still an approximation to behavioral authority.

Keep **individual tests, retained suites, focal methods, unique defects, and original inputs** as separate denominators. In a Python study, bug-validating retained suites numbered 171/287 original inputs for one generator. Another produced 62/91 such retained suites but no suite on 196/287 inputs; its retained-suite rate cannot describe all original inputs. Rejected candidates accumulated over repeated attempts are not final-suite counts. For a successful reproducing suite, require at least one behavioral fail-before/pass-after test and no post-fix failures; report generation and execution exclusions separately.

## Candidate Versus Reference Repair

Apply the candidate and a separately supplied reference patch to the same baseline, then search shared inputs for discrepancies, including preserved negative behavior and supplementary changes beyond the issue. Review the issue, valid input domain, expected result, and both patches before classifying a mismatch. **A discrepancy triggers review, not automatic rejection**: reference patches can contain irrelevant changes, and inputs or behavior may be unspecified.

One differential audit found discrepancies in 260/877 benchmark-accepted patches. Of 77 adjudicated suspicious cases, 22 were certainly incorrect, four certainly correct, and 51 uncertain because intent was underspecified. That is a discrepancy rate plus a sampled judgment, not 260 proven bugs. Complementary issue-targeted augmentation, manually reviewed against both patched systems, rejected 170/599 and 92/584 previously passing submissions on affected tasks in two overlapping benchmark subsets. These denominators concern already identified weak tasks, not all passing submissions. Retain adjudicated counterexamples as future regressions, while auditing test-result parsing separately from assertion semantics.

## Record the Generation Information

Generating from trusted **fixed code** can protect a known behavior; generating from **buggy code** to discover an existing fault requires expectations that do not inherit that fault. A replication measures detection by fixed-pass/buggy-fail execution and finds useful between-model coverage correlations with fixed-code input but weak coverage relationships with buggy input. Its concrete assertion reversal illustrates why broad execution alone cannot choose the right expectation. See [Implementation-Anchored Test Oracles](/vault/implementation-anchored-test-oracles.md) and [Context-Conditioned Test Adequacy](/vault/context-conditioned-test-adequacy.md).

A Python study detected 20/29 historical faults with generated tests informed by retrieved bug/patch context versus 5/29 with selected pre-existing general-purpose human tests. That is useful fix-time regression evidence, not an equal-information authorship comparison or unknown-bug discovery result. Report the information supplied to each generator, versions, selected human baseline, and outcome population; patch or reproducer knowledge is an undisclosed evaluation advantage if presented as prospective discovery.


## Differential Execution for Migrations

For language or platform migrations, run the source and converted systems on the same representative and adversarial inputs. Normalize only explicitly allowed differences, and investigate every mismatch before acceptance. Prioritize date boundaries, rounding, nulls, currencies, and customer-visible or regulatory outputs. Record source and target revisions, runtime versions, model and run configuration, test-data provenance, tolerance rules, mismatches, accepted intentional changes, the reviewer and the release decision. The evidence is a comparison between *two systems*, not the converting agent's claim of correctness.

## Limitations

Old tests may be weak or stale, and the original system may itself be wrong or nondeterministic. An intended behavior change needs a documented new oracle. For a pure refactor, RT failing on OC is *not* desirable. Matching on tested inputs does not prove equivalence across the whole domain; fixed-code agreement does not forbid legitimate alternatives or authorize unspecified behavior. Treat the matrix as diagnostic, not four votes for correctness, and evaluate mutation sensitivity, security, performance, and intent separately. The migration guidance comes from a position paper without empirical evaluation; known-reference bug studies do not supply a universal production oracle.

## Sources

- [NGQA: Next-Gen Software Quality Accelerator using AI Agents and LLM Reasoning dossier](/dossiers/ngqa-software-quality-accelerator.md) — four-fold original/revised code-by-test execution with explicit limits on interpreting pass rates.
- [The Ethics of AI-Assisted Code Migration in Regulated Financial Systems: Accountability, Transparency, and Human Oversight in LLM-Driven Software Conversion dossier](/dossiers/ethics-ai-assisted-code-migration.md) — parallel old/new execution over representative data with human examination of divergences; no quantified results.
- [AI-Driven Tools in Modern Software Quality Assurance: An Assessment of Benefits, Challenges, and Future Directions dossier](/dossiers/ai-driven-software-quality-assurance-pysmennyi.md) — agents altering deliberately mutated tests show why oracles must stay outside the generator's authority.
- [Design choices made by LLM-based test generators prevent them from finding bugs](/dossiers/llm-test-generators-validate-bugs.md) — four-way suite outcomes, rejected red candidates, and retained-suite versus original-input denominators.
- [Evaluating and Mitigating the Misguidance Effect of Buggy Code](/dossiers/buggy-code-test-misguidance.md) — distinguishes shared passes from bug validation and reports individual-test and focal-method outcomes separately.
- [SWT-Bench](/dossiers/swt-bench-test-generation-bug-fixes.md) — reproducing suites require unchanged fail-to-pass evidence without post-repair failures.
- [Are “Solved Issues” in SWE-bench Really Solved Correctly?](/dossiers/patchdiff-swe-bench-correctness.md) — PatchDiff discrepancies need adjudication; many sampled cases are underspecified and some alternatives are correct.
- [UTBoost: Rigorous Evaluation of Coding Agents on SWE-Bench](/dossiers/utboost-rigorous-swe-bench.md) — issue-grounded, manually reviewed augmentation reveals omitted cases; parser repairs are a separate intervention.
- [Test-metrics replicability study](/dossiers/llm-test-metrics-replicability.md) — fixed-versus-buggy generation context changes metric relationships; detection requires fixed-pass/buggy-fail.
- [LLM vs. Human Unit Tests: Fault Detection on Real Python Bugs](/dossiers/llm-human-python-fault-detection.md) — 20/29 versus 5/29 detections under unequal bug/patch information, not a matched discovery comparison.
