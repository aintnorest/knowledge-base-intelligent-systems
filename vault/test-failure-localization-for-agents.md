---
type: Synthesis
title: Test-Failure Localization for Agents
description: Separate the boundary a test exercises from the diagnostic resolution it gives an agent and the edit scope allowed during repair; retain composition evidence after local diagnosis.
tags: [llm-code-testing, coding-agents, verification, decomposition, evaluation, agents]
timestamp: 2026-10-04T07:48:58Z
---

# Test-Failure Localization for Agents

**Test boundary, diagnostic resolution, and repair scope are different choices.** A broad workflow test can expose an interaction fault and still produce a small, actionable failing case. A small unit test can detect a computation error yet leave several statements indistinguishable or give a misleading repair hypothesis. Narrowing what the agent may edit is a further intervention, not an automatic benefit of precise feedback.

For an agent, useful failure information reduces search: the case and independently justified expected/actual difference establish what broke; implicated regions and a provisional causal explanation suggest where to investigate. Separate failures can support parallel diagnosis when they represent distinct defects. They need not be separate permanent unit-test files: a minimized reproducer, diagnostic trace, or controlled substitution can decompose a broad failure. [Oracle-Guided Failure Decomposition](/vault/oracle-guided-failure-decomposition.md) covers the substitution mechanism.

## Evidence and Its Limits

- Repository diagnosis with locations **and actionable explanations** improves several repair settings and lowers average search cost. Incorrect explanations can instead reduce resolution. File accuracy alone is therefore insufficient; confidence in a small region must not become authority to ignore other affected code.
- Test-specific debugging contributes to a successful repair workflow, and a first-hand multi-agent compiler project made a monolithic integration failure parallelizable by changing its diagnostic granularity. Neither establishes that increasing permanent unit-test count caused the gain.
- A controlled function-level experiment finds localized infilling worse than fresh solution generation in the tested model families. It also finds many failures invisible to public tests and only suggestive evidence that the chosen location beats an unrelated same-size edit. A surgical retry can anchor an agent to the original mistake rather than improve repair.
- Broad checks buy **composition evidence**: isolated feature passes can coexist with broken shared state and interactions. Broadness alone does not guarantee coverage, a correct oracle, or useful diagnosis; adding composition cases has mixed measured effects.

These results concern different tasks and interventions, not contradictory answers to a common test-layer experiment. None directly compares fewer-longer workflow tests against many small unit tests at matched behavior coverage, oracle quality, model, scaffold, and compute. No optimal layer ratio, assertion count, or test length for AI agents is established.

## Practical Use

Choose test boundaries by the fault they must expose, then design a separate diagnostic handoff:

- Preserve independently grounded behavior and meaningful case names; report the expected/actual difference and relevant evidence, not merely a failing path.
- For a coupled failure, seek a discriminating reproducer or trace before delegating diagnoses. Group duplicate symptoms rather than assigning an agent per assertion indiscriminately.
- Treat suspected regions and root causes as revisable hypotheses. Permit broader inspection and coordinated changes when the defect crosses boundaries; precise output is not proof of precise understanding.
- Retain real-boundary and composition checks after local repair. A passing local reproducer does not establish the all-component workflow.
- Measure repair resolution and preserved regressions alongside diagnosis cost. Where fresh generation is a valid alternative, include it as a comparator; do not extrapolate replacing a short solution to rewriting a repository.

**The supported AI-specific emphasis is actionable feedback and bounded search, not “more small tests.”** Small tests can localize computations; broad tests can expose composition; either needs an independent oracle and a failure-sensitive case. Diagnostic instrumentation can combine the two benefits without prescribing a test pyramid.

## Sources

- [Does Fault Localization Beat a Fresh Attempt? dossier](/dossiers/fault-localization-placebo-code-repair.md) — matched-attempt and random-span controls find a strong-signal infilling loss, limited visible-test localizability, and no direct test-layer comparison.
- [SHERLOC dossier](/dossiers/sherloc-structured-diagnostic-localization.md) — issue-and-repository diagnosis transfers conditionally; diagnostic-field ablations and negative transfer distinguish actionable findings from file retrieval.
- [Building a C compiler with a team of parallel Claudes dossier](/dossiers/parallel-claudes-c-compiler.md) — mixed-reference integration runs enable separate investigations, with interacting file pairs still requiring delta debugging; uncontrolled first-hand evidence.
- [TDFlow dossier](/dossiers/tdflow-test-driven-development.md) — per-failing-test debugging improves a supplied-test workflow, but its ablation does not isolate test size from compute and debugger affordances.
- [Structured Feedback Improves Repair in an LLM Agent Loop dossier](/dossiers/veriharness-structured-feedback.md) — admissible alternatives improve short-plan repair more than location/observation alone; positive evidence is not repository code repair.
- [SpecBench dossier](/dossiers/specbench-long-horizon-reward-hacking.md) — held-out feature compositions expose shared-state failures despite visible feature passes; increasing visible composition coverage has mixed effects.
