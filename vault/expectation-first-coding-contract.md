---
type: Synthesis
title: Expectation-First Coding Contract
description: "Recording trusted, agent-immutable expectations (acceptance criteria, reproducers, protected negative cases, and per-action predicted observations) before a coding agent acts, so that passing evidence cannot be redefined after the fact."
tags: [llm-code-testing, coding-agents, code-quality, human-in-the-loop, reliability, agents]
timestamp: 2026-10-04T07:48:20Z
---

# Expectation-First Coding Contract

An expectation-first contract writes down *what must be true* before the implementation agent starts optimizing. A human or an independently checked source defines the affected behavior, a failing reproduction case, the regression behavior to preserve, and the important cross-feature interactions. The agent may inspect, propose and run tests. It may not quietly redefine acceptance to fit its chosen patch. A test count or a green badge is not the contract; it is evidence only about the behavior those tests actually cover.

The same idea works at two granularities:

- **Task level**: acceptance criteria and oracles are fixed before the patch exists.
- **Action level**: an agent predicts the observation it expects immediately before each consequential action, so an unexpected result is hard to rationalize as a pass.

For a long-horizon feature, write a finite contract of user-observable behavior **before** splitting the work into implementation milestones. Fresh validators can then exercise the running system against the prior contract as black-box users, instead of deriving acceptance from the worker's own implementation. This reduces anchoring but does not make an incomplete contract complete.

Expectation-first means **expectation before interpretation**, not necessarily test before code. A fresh specification-grounded testing context can help even after implementation exists; a test-first label cannot rescue expectations inferred from the same faulty premise. [Implementation-Anchored Test Oracles](/vault/implementation-anchored-test-oracles.md) explains the measured context effects. An inferred specification is a proposal for its accountable owner, not new acceptance authority.

## Practical Use

1. From the issue and a human review, state observable acceptance criteria and non-negotiable invariants. Cover a normal path, a boundary or error path, and a cross-feature path where interacting components can fail even though each passes locally.
2. Record an initial failure on the buggy state. If the agent drafts a reproduction test, check its expected behavior independently. Where a trusted reference fix exists, verify red-before/green-after. Keep the expectations outside the implementation agent's edit authority.
3. Allow implementation and focused debugging against those expectations. Require preserved regression behavior, and look for shortcuts: hardcoded fixtures, edits to tests, or feature handlers that cannot share state.
4. Hold an independent acceptance gate after the patch. Run tests withheld from the implementation loop, inspect the actual product state and the architecture, and have a human review omissions and ambiguous intent. Keep three results separate: passing visible tests, passing unseen composition tests, and meeting the user's real requirement.
5. If a check fails because the *contract* was wrong, revise it with its accountable owner. The patch author never gets to redefine a failing oracle on its own.

## Action-Level Precommitment

One practitioner account describes writing the expected visible state or backend effect *immediately before* each consequential UI action. The agent then records the action, the actual observation and a separate passed/failed/untested verdict in a replayable timeline with screenshots or video. A condition that was never exercised stays marked **untested** rather than being absorbed into a pass. Validate important side effects directly in logs or application state, and spot-check the agent's self-judgments against known-broken and known-passing cases. The account reports no calibrated false-pass rate, so treat the technique as a safeguard, not a measured guarantee.

## Protected Negative Intent

A negative test states what must *not* succeed. Its deliberately invalid credential, missing item, malformed field or prohibited action is part of the oracle. An executing agent may recover from incidental failures such as timing, stale locators or obstructed controls. It must not change the protected inputs or the expected failure to reach a green end state. In one QA study, browser agents "corrected" deliberately mutated negative flows until they reached the positive state. Version the test intent outside the acting agent, give the executor navigation and retry authority only, and pair each negative case with a positive control.

## Why This Is Not "Write More Tests"

A repository-repair study reports 94.3% resolution with supplied human-authored tests versus 68.0% in its generated-test condition (the abstract says 69.8%). A separate paired intervention on 500 tasks induced tests on 322 additional tasks, but resolution stayed at 359/500 while output tokens rose 19.8%. These answer different questions: a trusted expectation supplied *before* repair, versus an agent producing extra test files on its own. Other studies show that complete visible feature tests can miss composed behavior and self-written formal specifications can omit task requirements. A useful contract is externally meaningful and open to challenge, not self-certified.

Tests also serve as **generation-time specification context**, not just post-generation evidence. In a staged Python synthesis pipeline, supplied human examples increased private correctness from 69.67% to 82.45% on 399 tasks for the main model. Examples clarify signatures, boundaries, formulas, and input/output conventions. Because failed tasks received another attempt, the design does not isolate the causal effect of test context from extra generation opportunities. Retain held-out checks: satisfying supplied examples does not establish general conformance.

For repair, [Cross-Version Differential Oracles](/vault/cross-version-differential-oracles.md) distinguishes reproduction from shared behavior and bug validation. A successful reproducing suite needs at least one fail-before/pass-after test and no post-repair failures, unchanged across versions. Applicability and changed-line coverage do not prove reproduction. One generated-test filter raised repair precision to 47.8% at only 20% recall, under criteria not identical to that stricter suite rule; report both rather than treating filtering as self-certification.

## Expectation Changes During Review

Test files commonly evolve after initial submission, but revision counts do not establish weak initial tests or unauthorized changes. Separate incidental maintenance from changes to what is accepted: replacing expected values or snapshots, dropping negative cases, widening tolerances, or skipping checks needs an authority-grounded explanation when it alters protection. Record the previous expectation, the new one, and its owner's rationale; a later green run does not authorize the change.

Artifact presence, assertion syntax, and merge outcomes cannot substitute for that review. A field study's median assertion count of two for AI tests versus one for human tests does not establish stronger or more independent oracles, or justify one assertion per test. Several assertions may protect one coherent behavior.

Practitioner guidance similarly recommends independent expectations, coherent workflows, and absence checks against **live forbidden outcomes**, rather than searches for retired text. Those are useful design judgments, not measured AI advantages: fewer-longer tests, flat structure, and bans on setup hooks remain unvalidated in the inspected AI evidence.

## Limitations

A human-written test can be wrong, incomplete or tied too closely to one implementation. A gold patch is not the only valid behavior, and red/green against one patch proves only narrow discrimination. Precommitted expectations can themselves be wrong, and screenshots can miss transient events. Keep the contract revisable by its owner, record which evidence covers each expectation, and do not block reasonable alternative implementations just because they take a different internal path.

## Sources

- [TDFlow: Agentic Workflows for Test Driven Development dossier](/dossiers/tdflow-test-driven-development.md) — supplied human tests versus the self-generated-test bottleneck.
- [Rethinking the Value of Agent-Generated Tests for LLM-Based Software Engineering Agents dossier](/dossiers/agent-generated-tests-software-engineering-value.md) — induced test-writing without corresponding resolution gains.
- [SpecBench: Measuring Reward Hacking in Long-Horizon Coding Agents dossier](/dossiers/specbench-long-horizon-reward-hacking.md) — held-out cross-feature failures despite passing visible tests.
- [SWE-Proof: Can Language Models Resolve Real-World Issues with Machine-Checked Proofs? dossier](/dossiers/swe-proof-machine-checked-repair.md) — formal-specification coverage as the limiting contract boundary.
- [Preventing Premature Commitment in Coding Agents with an Evidence-Conditioned Execution Layer dossier](/dossiers/ecloop-evidence-conditioned-execution.md) — evidence prerequisites before edits or submission.
- [Verifying Agentic Development at Scale dossier](/dossiers/cognition-verifying-agentic-development.md) — expectation-before-action annotations, labeled artifacts, and explicit untested status.
- [AI-Driven Tools in Modern Software Quality Assurance: An Assessment of Benefits, Challenges, and Future Directions dossier](/dossiers/ai-driven-software-quality-assurance-pysmennyi.md) — browser agents repaired deliberately mutated negative flows into positive passes.
- [How Missions Work dossier](/dossiers/factory-missions-architecture.md) — defines observable acceptance assertions before decomposition and uses fresh black-box validators at milestones.
- [The Future of Software Testing: AI-Powered Test Case Generation and Validation dossier](/dossiers/ai-test-generation-validation-baqar-khanda.md) — narrative case for human approval of behavior-changing self-healing.
- [SWT-Bench: Testing and Validating Real-World Bug-Fixes with Code Agents dossier](/dossiers/swt-bench-test-generation-bug-fixes.md) — two-sided reproduction, separate applicability and changed-line coverage metrics, and patch-filter precision gains with low recall.
- [Do LLMs generate test oracles that capture the actual or the expected program behaviour?](/dossiers/llm-oracles-actual-expected-behaviour.md) — implementation exposure biases oracle interpretation; descriptive names convey but do not authorize intent.
- [On the risk of coding before testing](/dossiers/coding-before-testing-error-propagation.md) — its “test-driven” condition is fresh task-only generation, supporting context separation rather than mandatory chronology.
- [Evaluating and Mitigating the Misguidance Effect of Buggy Code](/dossiers/buggy-code-test-misguidance.md) — replacement outperforms supplementation, but inferred specifications still preserve bugs.
- [All Smoke, No Alarm](/dossiers/agent-authored-test-oracle-signals.md) — test-file and syntactic assertion signals do not establish independent expectations.
- [Do Autonomous Agents Contribute Test Code?](/dossiers/test-inclusion-agentic-pull-requests.md) — lifecycle revisions show test evolution, not the authorization or correctness of changed expectations.
- [Testing with AI Agents](/dossiers/ai-agent-test-frequency-quality-coverage.md) — two-versus-one median assertions without measured oracle validity or fault detection.
- [Test-Driven Development for Code Generation](/dossiers/test-driven-development-code-generation.md) — TGen supplies human tests as prompt constraints, with private validation and extra-attempt confounding.
- [Testing principles](/dossiers/kody-testing-principles.md) — kody supplies practitioner rationale for independent expectations and live negative intent, not empirical validation of its entire style.
