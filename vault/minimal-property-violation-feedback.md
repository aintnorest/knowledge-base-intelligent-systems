---
type: Synthesis
title: Minimal Property-Violation Feedback
description: Separating assurance from repair presentation by communicating an independently justified violated property and a compact counterexample without discarding broader acceptance coverage.
tags: [llm-code-testing, verification, coding-agents, context-engineering, agents]
timestamp: 2026-10-04T07:48:05Z
---

# Minimal Property-Violation Feedback

The oracle that detects a defect and the evidence presented to a repair agent serve different purposes. Assurance needs a justified behavioral rule and tests capable of exposing its violation. Repair benefits from a compact explanation: the violated rule, a small failing input, the observed result, and why it contradicts the rule. A long workflow can discover a defect while a reduced counterexample explains it; minimal feedback is not a mandate for unit-test-only acceptance.

A property can express a domain law without echoing the implementation: reconstructing dictionary chunks must preserve the original keys and values, for example. Its independence depends on justified domain semantics, not on whether another agent wrote it. Sampling inputs searches for violations; it does not prove the property holds universally.

## The AI-Specific Evidence

A controlled feedback-content pilot presented the same observed failure as either an input/output mismatch or a property violation. One-shot correctness on hard coding problems was **32.0% with I/O feedback versus 36.2% with property feedback**. Separately, minimum-input-token selection outperformed maximum-token selection: three-model average gains over baseline on hard problems were **4.0 versus 2.2 percentage points**. These are distinct experiments, not one combined causal estimate.

“Minimal” here means the lowest input-token count among explored failures. It does not establish exhaustive search, global minimality, or even the smallest case under another complexity measure. The measured benefit concerns model repair presentation, not proof that shorter tests provide stronger assurance.

## Practical Use

1. Derive the property from an independently justified contract, domain law, or validated reference. Check input-domain assumptions and legitimate alternatives before interpreting a failure as a bug.
2. Validate the executable check itself. Passing public examples can filter some bad properties but cannot establish universal soundness. Ensure assertion failures propagate rather than being caught and silently discarded.
3. Search for a reproducible counterexample, then simplify it while preserving the same contractual violation. Report whether simplification used shrinking or selection from a sampled pool.
4. Give the repair agent the rule, concrete input, actual result, and the independently known expected relationship. Prefer the smallest useful explanation over an undifferentiated execution dump; preserve the raw evidence for diagnosis.
5. Retain the important minimized failure as an explicit regression alongside broader interaction-level acceptance. Do not depend on a seed or local failure store to rediscover it after generator changes.

## Limitations

Generated properties can misread intended behavior even when their mathematics looks persuasive. In an agentic property-testing study, **28/50** reviewed reports were valid and **16/50** reportable, conditional on sampling from the top **80%** by initial model score. These are report judgments, not the precision of all inferred properties. A maintainer rejected one calendar-related report as intended behavior, and its raw reproducer also swallowed assertion failures. Independently review both intent and executable sensitivity before authorizing repair.

Feedback cannot repair a failure the validator does not expose. Nor should it invent a replacement when the contract is ambiguous. For the broader location/actual/expected interface mechanism, see [Agent-Ergonomic Interface Design](/vault/agent-ergonomic-interface-design.md); information content and serialization are separate design choices.

## Sources

- [PGS: Effective LLM Code Refinement via Property-Oriented and Structurally Minimal Feedback dossier](/dossiers/property-generated-solver-minimal-feedback.md) — controlled property framing and sampled minimum-token selection improve repair, with fallible property filtering and task-dependent effects.
- [Agentic Property-Based Testing dossier](/dossiers/agentic-property-based-testing.md) — minimized multi-function failures find real bugs, while selected-report review, rejected intent, and swallowed assertions require independent adjudication.
