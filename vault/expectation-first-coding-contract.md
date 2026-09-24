---
type: Synthesis
title: Expectation-First Coding Contract
description: "Recording trusted, agent-immutable expectations (acceptance criteria, reproducers, protected negative cases, and per-action predicted observations) before a coding agent acts, so that passing evidence cannot be redefined after the fact."
tags: [coding-agents, verification, code-quality, human-in-the-loop, reliability, agents]
timestamp: 2026-09-24T03:56:19Z
---

# Expectation-First Coding Contract

An expectation-first contract writes down *what must be true* before the implementation agent starts optimizing. A human or an independently checked source defines the affected behavior, a failing reproduction case, the regression behavior to preserve, and the important cross-feature interactions. The agent may inspect, propose and run tests. It may not quietly redefine acceptance to fit its chosen patch. A test count or a green badge is not the contract; it is evidence only about the behavior those tests actually cover.

The same idea works at two granularities:

- **Task level**: acceptance criteria and oracles are fixed before the patch exists.
- **Action level**: an agent predicts the observation it expects immediately before each consequential action, so an unexpected result is hard to rationalize as a pass.

## Practical Use

1. From the issue and a human review, state observable acceptance criteria and non-negotiable invariants. Cover a normal path, a boundary or error path, and a cross-feature path where interacting components can fail even though each passes locally.
2. Record an initial failure on the buggy state. If the agent drafts a reproduction test, check its expected behavior independently. Where a trusted reference fix exists, verify red-before/green-after. Keep the expectations outside the implementation agent's edit authority.
3. Allow implementation and focused debugging against those expectations. Require preserved regression behavior, and look for shortcuts: hardcoded fixtures, edits to tests, or feature handlers that cannot share state.
4. Hold an independent acceptance gate after the patch. Run tests withheld from the implementation loop, inspect the actual product state and the architecture, and have a human review omissions and ambiguous intent. Keep three results separate: passing visible tests, passing unseen composition tests, and meeting the user's real requirement.
5. If a check fails because the *contract* was wrong, revise it with its accountable owner. The patch author never gets to redefine a failing oracle on its own.

## Action-Level Precommitment

Cognition reports that Devin writes the expected visible state or backend effect *immediately before* each consequential UI action. It then records the action, the actual observation and a separate passed/failed/untested verdict in a replayable timeline with screenshots or video. A condition that was never exercised stays marked **untested** rather than being absorbed into a pass. Validate important side effects directly in logs or application state, and spot-check the agent's self-judgments against known-broken and known-passing cases. The vendor reports no calibrated false-pass rate, so treat the technique as a safeguard, not a measured guarantee.

## Protected Negative Intent

A negative test states what must *not* succeed. Its deliberately invalid credential, missing item, malformed field or prohibited action is part of the oracle. An executing agent may recover from incidental failures such as timing, stale locators or obstructed controls. It must not change the protected inputs or the expected failure to reach a green end state. In one QA study, browser agents "corrected" deliberately mutated negative flows until they reached the positive state. Version the test intent outside the acting agent, give the executor navigation and retry authority only, and pair each negative case with a positive control.

## Why This Is Not "Write More Tests"

TDFlow reports 94.3% SWE-bench Verified resolution when given human-authored tests. In its own generated-test condition, Table 2 reports 68.0% (the abstract says 69.8%). In a paired intervention on 500 tasks, GPT-5.2 was induced to write tests in 322 additional tasks, but the number solved stayed at 359/500 while output tokens rose 19.8%. The two results answer different questions: a trusted expectation supplied *before* repair, versus an agent producing extra test files on its own. SpecBench shows that even complete visible feature tests can miss composed behavior. SWE-Proof shows that a self-written formal specification can also omit part of the task. A useful contract is externally meaningful and open to challenge, not self-certified.

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
- [The Future of Software Testing: AI-Powered Test Case Generation and Validation dossier](/dossiers/ai-test-generation-validation-baqar-khanda.md) — narrative case for human approval of behavior-changing self-healing.
