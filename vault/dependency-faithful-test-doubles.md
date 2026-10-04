---
type: Synthesis
title: Dependency-Faithful Test Doubles
description: Keeping replacements faithful to the dependency semantics a consumer test relies on, while separately checking consequential real boundaries instead of mistaking configured behavior for provider evidence.
tags: [llm-code-testing, verification, code-quality, coding-agents, agents]
timestamp: 2026-10-04T07:48:05Z
---

# Dependency-Faithful Test Doubles

A test double replaces a dependency with a controlled behavior. A passing consumer test establishes what the consumer does **if that replacement is accurate**; it does not verify the provider. Isolation becomes misleading when a replacement removes the very interaction being tested, supplies unrealistic errors or data, or makes assertions merely confirm its own configuration.

Keep the behavior under test real. Replace slow, nondeterministic, external, or costly operations below it, preserving the consequential semantics: emitted effects, error shapes, ordering, partial results, and values consumed downstream. An interface-compatible replacement can still be behaviorally unfaithful.

## The Agent-Specific Review Priority

Repository mining found double additions in **3,934/11,035 agent test commits (36%)**, versus **40,966/158,326 non-agent test commits (26%)**. These are rates among commits touching tests, not all commits, mocks per test, or proportions of mocked code. Within higher-agent-activity repositories, median rates were **36% versus 28%**, with a small effect size. Non-agent attribution means no agent was detected, not proven human-only authorship.

The difference makes replaced boundaries worth explicit review when agents author tests. It does **not** establish that the additional doubles are inappropriate, that realistic integration is always preferable, or that humans supplied a superior baseline. Identifier-based mock/fake categories describe names, not semantic fidelity; prevalence is not a rejection threshold.

## Practical Use

- Identify the observable behavior and the dependency assumptions the test needs. Do not replace the component or boundary whose correctness the test claims to establish.
- Make replacements reproduce relevant success and partial-failure behavior, not just a convenient return value. Check downstream state and effects rather than merely the configured response.
- Pair each consequential replaced boundary with a check against its real counterpart or an independently verified contract. If neither is available, report that provider fidelity remains untested.
- Assert calls, arguments, and order when those interactions are contractual. Interaction-only syntax is not automatically weak evidence; an arbitrary implementation call sequence is not automatically a contract.
- When double setup dominates the protected behavior, or behavior-preserving refactors repeatedly break the test, consider a semantic fake or real-boundary check instead of adding more configuration.

## Limitations

These practices preserve familiar testing principles rather than establishing a different optimal test architecture for AI. The mining study measures neither avoidability nor fault detection, maintenance cost, or integration outcomes. Oracle-signal mining likewise cannot decide whether a particular interaction assertion is justified. A fake also embeds assumptions and needs independent checking; renaming a mock does not fix the boundary.

## Sources

- [Are Coding Agents Generating Over-Mocked Tests? dossier](/dossiers/coding-agents-over-mocked-tests.md) — conditional commit rates and small within-repository differences support a review priority, not a finding of inappropriate isolation.
- [All Smoke, No Alarm dossier](/dossiers/agent-authored-test-oracle-signals.md) — syntactic interaction-only labels cannot replace review of contractual expectations and failure sensitivity.
- [Testing principles dossier](/dossiers/kody-testing-principles.md) — practitioner guidance favors the lightest faithful boundary and keeping the behavior being proved real; no controlled AI boundary comparison.
