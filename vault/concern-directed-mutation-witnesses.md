---
type: Synthesis
title: Concern-Directed Mutation Witnesses
description: Using a contract-relevant injected fault that survives existing tests to guide one independently reviewed check with demonstrated baseline-pass and mutant-fail sensitivity.
tags: [llm-code-testing, verification, coding-agents, code-quality, evaluation, agents]
timestamp: 2026-10-04T07:48:26Z
---

# Concern-Directed Mutation Witnesses

A concern-directed mutation witness is a plausible injected fault, tied to a requirement or past failure, that the existing suite misses but a new check detects. It makes a specific sensitivity gap concrete: the same test passes the trusted baseline and fails the mutated implementation for the intended behavioral reason. The witness is evidence about that fault, not proof that the baseline satisfies the whole contract.

## What LLMs Change

Mutation traditionally produces surviving faults for engineers to interpret and address; equivalent or irrelevant changes make that work costly. LLMs can synthesize faults from free-form concerns and then propose tests using the original, mutant, and existing suite. The economic change is moving review toward already executable, discriminating tests rather than asking engineers to assess every surviving mutant. It is not the invention of mutation testing or evidence that independent oracle review is obsolete.

One industrial deployment produced 571 mutant-killing tests; 277 added no line coverage. Rejecting them solely for no coverage gain would discard demonstrated new sensitivity on already executed code. But concern targeting is imperfect: only 63/175 relevance judgments were positive in the deployment's privacy review. Engineer acceptance, relevance to the concern, mutant kills, coverage gains, and production defects prevented are separate outcomes. The study does not measure longitudinal incident reduction or an equal-budget human-versus-LLM advantage.

## Admission Loop

- Choose a consequential concern from an authorized contract or past fault, not a desired global mutation score.
- Generate a plausible change in a disposable candidate. Require it to build and survive the current suite; diagnose uncovered code separately from covered-but-undetected behavior.
- Discard identical and comment-only changes cheaply before expensive reasoning or test generation. Further equivalence judgments remain fallible: a model's belief that a change is non-equivalent is not a semantic proof.
- Generate a check and require reproducible baseline-pass/mutant-fail execution with propagated assertions. Independently justify the expected behavior and inspect the failure reason; setup or compilation failures are not behavioral kills.
- Review contractual relevance, boundary fidelity, readability, and maintenance value. Retain the check and its fault rationale, not the injected defect. Do not invent a contrived assertion to kill an equivalent or out-of-contract change.

See [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md) for the broader evidence gate and [Context-Conditioned Test Adequacy](/vault/context-conditioned-test-adequacy.md) for score denominators and comparison limits.

## Limitations

Using current behavior as the baseline is **characterization** unless an independent authority establishes it as correct. This loop does not discover an existing defect merely by preserving the current implementation. A generated test and generated mutant can share an invented premise; two-sided execution demonstrates discrimination, not rightful intent. For existing-bug discovery, preserve specification-grounded failing candidates and use direct real-fault evidence rather than filtering everything to green.

Targeted witnesses are local evidence, not a mandate to maximize a whole-system score. Mutation operators, fault populations, equivalent-mutant treatment, timeouts, and normalization change the denominator. The industrial evidence concerns one model and proprietary Kotlin systems; no universal repeat count, preferred test length, or test-layer ratio follows.

## Sources

- [Mutation-Guided LLM-based Test Generation at Meta dossier](/dossiers/meta-ach-mutation-guided-tests.md) — ACH automates concern-specific faults and baseline-pass/mutant-fail checks; 277/571 tests add no line coverage, with separate relevance review.
- [Do Coverage and Mutation Scores of LLM-Generated Test Suites Correlate with Their Effectiveness? dossier](/dossiers/llm-test-metrics-replicability.md) — mutation proxies depend on generation context, denominator, aggregation, and comparison unit; buggy-input mutation ranking is not evaluated.
