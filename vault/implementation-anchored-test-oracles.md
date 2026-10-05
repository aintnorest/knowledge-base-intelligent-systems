---
type: Synthesis
title: Implementation-Anchored Test Oracles
description: "How implementation context and green-test selection cause AI-generated expectations to ratify faults, and how specification-grounded context separation reduces rather than eliminates that risk."
tags: [llm-code-testing, coding-agents, context-engineering, code-quality, evaluation, agents]
timestamp: 2026-10-04T07:48:20Z
---

# Implementation-Anchored Test Oracles

An oracle says what a test should observe. When a model sees the implementation while writing that expectation, the implementation can become an unearned behavioral authority: the model predicts what the code does, including its bugs, instead of what the contract requires. Code and tests then agree on the same error. This can happen without explicitly copying the production calculation into the test; a plausible literal assertion can still encode a faulty premise.

The familiar human-era tautology problem includes deliberately reusing production helpers or echoing an algorithm to calculate expected values. The AI-specific extension is **contextual anchoring**: supplied code and earlier conversational reasoning can shape an apparently independent expectation without deliberate copying. This distinction describes a mechanism, not a measured human-versus-AI prevalence comparison. It reinforces independent-oracle discipline rather than making circular assertions useful.

## How the Fault Becomes an Expectation

- **Implementation exposure:** a controlled Java study found recognition of a correct assertion fell from 40.77% to 31.94% when the implementation was mutated, under its method-body prompt. This is classification accuracy, not the prevalence of generated bug-validating assertions.
- **Same-context generation:** in a Python study, fresh task-only tests detected roughly 25% of retained faults versus roughly 14% for simulated same-conversation code-then-test generation. The comparison removes faulty implementation context; it is not a full test-first development trial. Oracle correctness was not directly annotated, and final retained-fault denominators were unclear.
- **Selection pressure:** requiring every candidate to pass current code removes potentially valuable red evidence. A Python generator retained bug-validating suites for 171/287 inputs; another did so for 62/91 retained suites while failing to produce a suite on 196/287 original inputs. These are suite-level outcomes, not assertion rates. Behavioral failures must be diagnosed against authority rather than silently rewritten to observed output.
- **Patch-conditioned expectations:** in a repository experiment on 172 instances, revealing a candidate patch raised reproduction success only from 8.1% to 10.5%, whether the patch was correct or incorrect; revealing the target test file reached 15.1%. Patch visibility is not automatically useful oracle information, and the result alone does not prove every patch-conditioned test is anchored.

A replication also documents an assertion switching from the intended true result to false when generated from faulty code. Coverage can remain high while the expected value changes to match the bug. Extra test production does not remove this dependence: a paired repository intervention induced tests on 322 additional tasks but left resolution at 359/500.

## Reduce Exposure Without Inventing Authority

**Prefer reviewed specifications in a fresh oracle-generation context.** Supply the contract, necessary interfaces, constructors, and state assumptions, not implementation-derived expected values or the patch author's explanation as truth. Fresh context removes conversational dependence; another model or session reading the same faulty body is not independent authority. Tests may be written after implementation if their expectations are established independently; see [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md).

**Replace the focal body rather than merely appending a specification.** In a real-bug Java study, per-configuration average misguided/effective test rates were 3.84%/2.98% with buggy bodies, 2.69%/4.50% with specification replacement, and 3.80%/3.17% when specifications accompanied the buggy body. Critical specification derivation followed by replacement reached 1.91%/4.98%, but tests failing both versions increased from 16.19% with basic replacement to 18.15%. Removing both body and specification reduced misguidance but also lost useful behavioral information. Keep necessary structural context while separating the oracle source.

**Keep intent visible to AI consumers.** Behavior-bearing test and variable names convey already justified expectations. In the naming study, replacing both reduced classification hits from 44.0% to 27.9% under one prompt, but effects varied and replacing test names alone slightly improved another condition. Names aid interpretation; they cannot authorize an assertion or guarantee a correct judgment.

**Label characterization explicitly.** Pinning reviewed existing outputs can be useful before a refactor. A pass-on-current-code filter fits that purpose, not a claim to discover existing defects. For conformance or repair, preserve independently justified failures and evaluate unchanged tests across versions using [Cross-Version Differential Oracles](/vault/cross-version-differential-oracles.md).

## Reconstructing Repaired Behavior Is Different Evidence

An explicit contract reconstructed from **already repaired code** can improve test generation without demonstrating independence from implementation. In one workshop experiment, existing tests were removed; agents were blinded to the issue, commit message, and patch diff, but could inspect the fixed implementation. Generated suites had to pass fixed code, then run unchanged on reverse-patched buggy code; detection required a behavioral failure rather than a build failure.

This is meaningful historical fault-sensitivity evidence: contract-guided generation raised detect@5 **53.4%→63.2%**. It is not evidence that the same process resists learning faulty behavior when first exposed to buggy code, or discovers unknown production bugs. The repaired implementation already contains information about the corrected behavior, even when the agent never sees the repair history. Do not collapse that setting into independent expectations inferred while exposed to a fault.

The intermediate contract makes expectations inspectable, not authorized; see [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md). Human review was not evaluated, all generated contract suggestions were accepted automatically, and defect-specific coverage was assessed by an issue-informed model judge. Narrow single-file historical fixes, one organization and generator family, removed tests, repeated attempts, and added inference limit transfer. A fixed-pass requirement in this design is paired with a separate buggy-version test; it is not equivalent to discarding every test that challenges current faulty code.

## Limits

An inferred specification remains a proposal. Manual inspection found original-bug preservation in 48/318 (15.09%) and 66/318 (20.75%) generated specifications for the two inspected models. Have the requirement owner resolve consequential inferred behavior; do not let a generated docstring acquire acceptance authority. Iterative feedback can improve detection while also adding misguided tests.

Passing faulty code alone does not establish anchoring: valid tests of unaffected behavior can pass both revisions. Nor does disagreement with a reference prove a defect when behavior is unspecified. The evidence spans different Java/Python tasks, models, and pipelines, not calibrated current-agent failure rates. It does not compare fewer long workflows with many small tests or establish an AI-specific test-layer ratio.

## Sources

- [Do LLMs generate test oracles that capture the actual or the expected program behaviour?](/dossiers/llm-oracles-actual-expected-behaviour.md) — controlled GPT-3.5 Java classification and naming effects; generation pass labels do not establish conformance.
- [Design choices made by LLM-based test generators prevent them from finding bugs](/dossiers/llm-test-generators-validate-bugs.md) — CoverAgent/CoverUp discard bug-revealing candidates and retain bug-validating suites, with different retained-output denominators.
- [On the risk of coding before testing](/dossiers/coding-before-testing-error-propagation.md) — fresh task-only contexts outperform implementation-conditioned and simulated same-session generation in fault detection.
- [Evaluating and Mitigating the Misguidance Effect of Buggy Code](/dossiers/buggy-code-test-misguidance.md) — specification replacement improves effective/misguided rates while inferred specifications still preserve bugs.
- [Test-metrics replicability study](/dossiers/llm-test-metrics-replicability.md) — buggy-input assertion reversal and context-dependent coverage/fault-detection relationships.
- [SWT-Bench](/dossiers/swt-bench-test-generation-bug-fixes.md) — candidate-patch exposure gives limited reproduction gains regardless of patch correctness; target-test context helps more.
- [Rethinking the Value of Agent-Generated Tests](/dossiers/agent-generated-tests-software-engineering-value.md) — induced GPT-5.2 test creation changes cost without net resolution gains; it does not test oracle-independence interventions.
- [Grounding AI Agents in Contracts: An Empirical Evaluation of Spec-Driven Test Generation dossier](/dossiers/grounding-ai-agents-contracts-spec-driven-test-generation.md) — SpecOps 2026 workshop study reconstructs contracts from human-fixed code while blinded to repair history, then measures unchanged fixed-pass/reverse-patched-fail suites; it does not evaluate unknown-bug discovery or resistance to faulty-code anchoring.
