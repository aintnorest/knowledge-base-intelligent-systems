---
type: Study Note
title: Testing principles
description: Kent C. Dodds's kody testing model favors coherent workflows, independent behavioral oracles, explicit isolated setup, and the lightest faithful boundary; AI-specific empirical support is partial rather than a validation of the entire style.
resource: https://github.com/kentcdodds/kody/blob/773e2fbd63e3f57fb78feee6084e43ee3ffc8b41/docs/contributing/testing-principles.md
source: https://github.com/kentcdodds/kody/blob/main/docs/contributing/testing-principles.md
tags: [llm-code-testing, verification, code-quality, coding-agents, agents, reliability]
timestamp: 2026-10-04T07:38:12Z
---

# Testing principles — Study Notes

**Authors**: Kent C. Dodds / kody repository contributors; no separate byline on the page  
**Venue**: Public repository practitioner guidance, not a peer-reviewed study  
**Date**: Retrieved October 4, 2026; complete document read at commit **773e2fbd63e3f57fb78feee6084e43ee3ffc8b41** (repository HEAD obtained before reading the pinned raw file)

## What It Is

A repository-specific testing philosophy whose reusable model is **small readable suites, explicit local setup, independent expectations, and meaningful workflows**. It is eligible for ingest because it states design principles, failure modes, and rationale, even though the source also contains operational material. This dossier deliberately omits runner configuration, commands, and internal paths.

**Audience: coding agents, not only people.** kody's [`AGENTS.md`](https://github.com/kentcdodds/kody/blob/main/AGENTS.md) routes agents to its contributor documentation map, which describes itself as documentation "for people and agents developing this repository", points to an agent-first harness-engineering loop and Cursor Cloud Agent notes, and lists this page under Testing. The rules are therefore the testing contract applied to tests that coding agents write in an agent-developed codebase. The developer reports that Kent presents this style as how testing should be done, and as more true with AI; this document does not state that claim, and no written source for it was located during this ingest.

Canonical source key: **`url:github.com/kentcdodds/kody/blob/main/docs/contributing/testing-principles.md`**. The moving canonical URL supplies identity; the [pinned revision](https://github.com/kentcdodds/kody/blob/773e2fbd63e3f57fb78feee6084e43ee3ffc8b41/docs/contributing/testing-principles.md) supplies the exact observation. This is web-only, with no archive placeholder.

The requested human-era comparison is a **practitioner baseline**, not a measured human optimum. The current kody document is itself modern repository guidance, not evidence of how humans historically performed relative to AI. Context links, not separately ingested sources: [Write fewer, longer tests](https://kentcdodds.com/blog/write-fewer-longer-tests), [Testing implementation details](https://kentcdodds.com/blog/testing-implementation-details), [AHA Testing](https://kentcdodds.com/blog/aha-testing), and [Write tests](https://kentcdodds.com/blog/write-tests).

## Problem and Motivation

Splitting a coherent journey into many one-assertion cases can duplicate setup and obscure state transitions. Shared mutable fixtures and hidden setup make the stimulus harder to see. Conversely, longer tests are not valuable merely because they are long: a suite can accumulate assertions about constants, copy, or its own helpers while protecting no independent behavior. Slow end-to-end checks impose maintenance cost when a faster faithful boundary would expose the same defect.

## Design Rules and Their Rationale

### Preserve the workflow, not an assertion quota

Prefer **fewer, longer tests when assertions belong to one workflow**. Treat the test as a manual tester's script: one setup followed by the actions and assertions needed to validate the journey, including meaningful intermediate states. Multiple related assertions are useful; do not fragment the flow merely to enforce one assertion per test. This is distinct from running every test through a browser: pure server behavior still belongs in fast narrow checks.

### Make setup explicit and isolated

Prefer flat test structure, inline per-test setup, and factories that return ready-to-run objects instead of global state. Avoid shared setup/teardown hooks that hide context and avoid shared mutable state across cases. Reusable helpers are allowed; the objection is hidden lifecycle and coupling, not all abstraction. If the next action depends on the same rendered object or response, it probably belongs in the same workflow test. Local fakes and fixtures should permit offline execution.

### Reject tautological assertions

The page defines a tautology as an assertion that cannot fail unless implementation and test change in lockstep: **there is no independent oracle**. Its forms are:

- **Identity predicates:** passing the same constant that an equality/membership predicate recognizes. Exercise meaningful normalization, negative, wrapping, or cause-chain branches instead.
- **Constant-to-self pins:** checking an exported constant against its current literal. If a value is contractual, check where a caller observes its consequence, such as a payload or retry delay.
- **Algorithm echo:** computing the expectation with the production helper or repeating its field-selection algorithm. Use a hand-derived value or independently validated schema/reference instead.
- **Self-equality:** comparing an object with itself. Type-only guarantees and incidental instructional-copy checks have similar low-discrimination risk.

The core is independent justification and plausible fault rejection. A literal constant assertion can genuinely detect an accidental edit when an external contract requires the literal; the page's stronger preference is to prove its **observable use**, not merely its declaration.

### Absence must protect a live possibility

Retain absence assertions when the live path could expose the forbidden result: an admin capability visible to an ordinary user, a secret that should be redacted, a loading element after readiness, or a forbidden table emitted by a generator. State-flip workflows demonstrate the contrast before and after the action. Reject a lone negative search for a retired string/name whose only remaining occurrence is the test: it principally guards against pasting old text back, not live behavior. The distinction is **reachable forbidden outcome**, not “negative assertions are bad.”

### Choose the lightest flavor that can falsify behavior

Use narrow server/function checks where they faithfully exercise the risk. Use a real runtime or persistence boundary when bindings, storage, framework semantics, transport, or session wiring are the point. Do not replace the very boundary whose fidelity the test is meant to prove. Keep transport smoke tests and full user journeys few; place edge cases at faster levels when those can expose them honestly. The page is a decision matrix by falsifiability, not a universal testing pyramid or trophy ratio.

### Keep unexpected diagnostics as failure signals

Unexpected **console.error/console.warn fail the test**. Broad suppression can hide a regression; expected contractual logs should be asserted by stable tags, error shapes, and deterministic counts, while incidental known noise can receive narrowly scoped allowances. Uncaught isolate crashes remain visible rather than being filtered away. This is a secondary observable-failure channel, not a semantic oracle for the whole feature.

### Admit tests by protection gained

Keep names behavior-specific, avoid tests of dependency mechanics or guarantees already supplied by static types, and reject incidental copy/configuration pins. Add regression cases when their workflow importance or recurrence risk justifies maintenance cost. These are judgment calls; the source supplies no measured thresholds or assurance that rare failures can safely be omitted.

## Findings and Evidence Status

The document contains **no controlled experiments, outcome denominators, model comparisons, or measured maintenance savings** for these design rules. Its examples illustrate discrimination and coupling; they do not estimate fault-detection or agent-repair effect sizes. Repository-specific admissions about runtime isolation and warning behavior are first-hand constraints, not general quantitative evidence.

## Analyst Takeaways: What the AI Evidence Does and Does Not Support

1. **Independent oracles have convergent AI evidence, not a measured verdict on every listed tautology.** [NGQA](/dossiers/ngqa-software-quality-accelerator.md) reports original/revised code-by-test mean pass rates of 73.8%, 68.2%, 82.1%, and 86.0%, while conceding these test ratios measure implementation consistency rather than specification correctness. [SWT-Bench](/dossiers/swt-bench-test-generation-bug-fixes.md) defines reproduction with unchanged fail-before/pass-after tests and reaches only 18.5% reproduction success for its explicit-test-checking agent. These support `guides/test-quality.md`'s independent expectation and sensitivity requirements; neither directly tests constant pins, identity predicates, or algorithm echoes as separate interventions.
2. **Coherent composition is empirically important; “fewer, longer” packaging remains unmeasured.** [SpecBench](/dossiers/specbench-long-horizon-reward-hacking.md) finds a SQL system at 100% public versus 35% hidden composition success, and exposing composition tests reduces its gap from 35 to nine points. This supports guarding interactions that isolated feature checks miss. It does not compare matched many-small versus few-long suites, and another task worsens with additional visible composition tests. Preserve workflow semantics; do not infer a universal length preference for AI.
3. **Avoid test-volume targets, but do not infer that fewer files cause better repair.** [Agent-generated test value](/dossiers/agent-generated-tests-software-engineering-value.md) forces GPT-5.2 to create tests on 322 extra tasks yet stays at 359/500 resolved with 19.8% more output tokens. That supports proportionality, not the superiority of longer individual tests. [Tests as generation input](/dossiers/test-driven-development-code-generation.md) instead finds GPT-4 private MBPP success rising 69.67%→82.45% after supplying small human examples in a staged pipeline. AI may use tests as prompt specifications as well as verification; file count and test length miss this distinction.
4. **Isolation has bounded evidence; banning hooks is practitioner judgment.** [NameRTS](/dossiers/namerts-python-regression-test-selection.md) selects all affected tests on 498/500 commits, with one miss attributed to cached shared-state interference and another to an external callback. This supports treating shared state as a threat to valid evidence, but the study is regression selection, not an AI authoring trial. No reviewed AI dossier here measures flat files or inline setup against correctly isolated hooks/factories. The factory contract permits incidental helpers and requires isolation rather than adopting the hook ban.
5. **Protect negative intent, without confusing it with vanished-copy absence.** [AI-driven QA](/dossiers/ai-driven-software-quality-assurance-pysmennyi.md) reports 48 browser-agent executions and describes GPT-4o correcting deliberately mutated negative flows into positive success. That supports immutable expected rejection and forbidden outcomes. It does not validate kody's specific absence-lint heuristic or measure retired-name assertion value; those remain practitioner design judgments.
6. **Choose boundaries by the defect; preserve informative failure signals.** [VeriHarness](/dossiers/veriharness-structured-feedback.md) improves TextWorld repair from 14/50→36/50 and 8/50→29/50 by supplying admissible alternatives, while all policies miss one hidden HumanEval failure (14/15 correct despite 15/15 visible passes). This indirectly supports a sensitive boundary and actionable diagnostics. It does not empirically validate a unit/integration/E2E ratio, the error/warn guard, or log allowlists. Those rules remain sound hypotheses to evaluate locally, not measured AI benefits.
7. **Overall verdict: qualifies the developer's hypothesis.** Existing AI evidence shows additional concerns—prompt-specification information, self-confirming oracles, preserved adversarial intent, and repair-feedback content—but does not show that human-oriented workflow readability or independent expectations should be reversed. Fewer-longer tests, no shared hooks, flat structure, rare-regression omission, exact absence heuristics, and console guards remain unmeasured for AI in the inspected KB evidence. No observed evidence justifies relaxing the no-tautology rule for agents.

## Questions and Limitations

- This is practitioner guidance for one repository, not a controlled comparison of human and AI testing. The exact contributing authors and original date are not established by a HEAD SHA; the pin identifies the read version, not authorship provenance.
- “Cannot fail” should not be read literally for every constant pin: accidental divergence can fail it. The important questions are whether the expectation is independently authoritative and whether the assertion rejects a consequential behavior defect.
- A hook can provide correct isolation and a long workflow can hide the first failure behind many steps. The document does not quantify readability, repair localization, context consumption, parallelism, or runtime tradeoffs for agents.
- Suppressing type-only runtime checks must not become suppressing validation of untrusted runtime values; the factory contract explicitly distinguishes those.
- Skipping unlikely-to-recur bugs is risk judgment, not an evidence-backed safety policy. Security, destructive, and rare concurrency failures can justify durable regressions regardless of recurrence probability.
- Cross-dossier evidence supports mechanisms at different scales and languages; it does not empirically validate the full kody rule set. No build or suite was run to test this repository's own claims.

## Vault Ideas Extracted

* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md) — distinguish independently justified live behavior from self-confirming values and protect negative intent.
* [Cross-Version Differential Oracles](/vault/cross-version-differential-oracles.md) — use unchanged cross-version checks to test discrimination rather than new-code/new-test agreement.
* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md) — evaluate generated tests by falsifiable behavior, not count or green status.
* [Safety-Constrained Regression Test Selection](/vault/safety-constrained-regression-test-selection.md) — retain fidelity and isolation when reducing verification cost; no universal test-layer quota.
