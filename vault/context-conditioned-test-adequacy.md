---
type: Synthesis
title: Context-Conditioned Test Adequacy
description: Calibrating coverage and mutation evidence by generator information, comparison unit, metric denominator, and real-fault outcome before transferring human-era adequacy findings to LLM-written suites.
tags: [llm-code-testing, evaluation, verification, coding-agents, code-quality, agents]
timestamp: 2026-10-04T07:48:26Z
---

# Context-Conditioned Test Adequacy

Test adequacy is not a context-free property of a percentage. A proxy's meaning depends on what the generator knew, which artifacts or generators are compared, and which faults count as success. Human-era findings about coverage and mutation therefore need conditional replication for LLM-written suites, not automatic adoption or wholesale reversal.

## What Transfers—and What Does Not

**The measurement principles transfer.** Coverage shows execution, mutation shows sensitivity to injected changes, and neither establishes that an expected value is independently correct. Test volume is not protection. Distinguish regression preservation from discovering a defect already present in the input implementation.

**The earlier empirical relationships do not transfer unchanged.** A Java conceptual replication revisits the human-era findings that coverage is not strongly correlated with effectiveness after suite-size control, and that mutation can track real-fault detection. With LLM tests generated from fixed code, mean branch coverage and raw mutation each correlate strongly with real-bug detection **between generator settings**: Pearson r=0.861 and r=0.863 respectively. These comparisons contain only 13 settings, not independent labels for every test or candidate. Within-model relationships remain weak, and test count is not the dominant confounder observed in the earlier studies.

Coverage criteria also cease to be interchangeable in this experiment: statement–branch correlation can be strong while statement–modified-condition correlation is weak. Raw mutation is a more useful between-model proxy here than covered-mutant-normalized mutation; averaging method ratios differs from accumulating all mutants. Thus the older skepticism about using coverage to accept a particular suite remains useful, while its blanket extension to ranking LLM generators or choosing interchangeable coverage criteria does not hold in this setting. Mutation's relationship to real faults receives conditional support, not a universal score threshold.

The replication changes method-level sampling, naturally generated suite sizes, white-box prompting, and analysis units; it is not a matched contemporary human-versus-LLM trial. Differences cannot be attributed to AI authorship alone.

## The Generator's Information Changes the Question

- **Trusted fixed-code input:** generation can preserve correct behavior and the experiment can ask which generators produce suites that also reject historical faulty versions. Useful model-ranking correlations do not make every individual suite admissible.
- **Buggy implementation input:** the model can copy the fault into the expectation. Coverage correlations with discovery become weak in the replication. Mutation is not evaluated under this condition because its green-baseline requirement would discard bug-exposing tests; this absence is not proof that all fault injection is useless on a system containing bugs.
- **Issue, patch, or reproducer context:** generation can target a known failure effectively at fix time. One Python study detects 20/29 historical faults with context-informed generation versus 5/29 selected general-purpose human baselines. This is asymmetric information, not unconfounded AI superiority or the capability of the complete human repository suite. Its coverage summaries aggregate 52 heterogeneous tasks, not just the 29-bug detection population; nonsignificant coverage differences do not establish equivalence.

Patch information is legitimate regression context but an undisclosed advantage if the evaluation claims unknown-bug discovery. See [Cross-Version Differential Oracles](/vault/cross-version-differential-oracles.md) for unchanged fixed-pass/buggy-fail evidence, and [Concern-Directed Mutation Witnesses](/vault/concern-directed-mutation-witnesses.md) for local injected-fault checks.

## Practical Reporting Contract

Before comparing results, record:

- **Purpose and outcome:** characterization, regression guard, unknown-bug discovery, injected-fault detection, or eventual production outcome.
- **Information condition:** trusted specification, fixed or faulty body, surrounding interfaces, issue facts, patch/reproducer access, and any human-baseline asymmetry.
- **Comparison unit:** individual test, retained suite, focal method, distinct fault, candidate patch, or generator setting; pooled and within-generator results cannot substitute for between-generator results.
- **Metric definition:** tool, revision, scope, coverage criterion, all-mutant versus covered-mutant denominator, treatment of invalid/equivalent/timeout results, and mean-ratio versus accumulated-ratio aggregation.
- **Population and exclusions:** compilation and generation failures, size-conditioned eligibility, retained-suite versus all-input counts, and whether coverage and detection concern the same tasks.

Use calibrated proxies to rank generators or locate risks, and direct behavioral discrimination plus independent expectations to admit a consequential test. Correlation does not show that optimizing the proxy causes better tests.

## Limitations

The strongest metric evidence is method-level Java with known historical repairs; the Python comparison uses one model and unequal bug context. Reference fixes remain approximations of intent, contamination is not ruled out, and no universal result for other languages follows. Neither study tests fewer-longer workflows against many-small tests at matched information, cost, and fault populations. Human-era independent-oracle rules remain supported; an AI-specific optimal packaging or layer ratio remains unmeasured.

## Sources

- [Do Coverage and Mutation Scores of LLM-Generated Test Suites Correlate with Their Effectiveness? dossier](/dossiers/llm-test-metrics-replicability.md) — conceptual replication of Inozemtseva & Holmes and Papadakis et al.; separates within-model/between-model correlations, fixed/buggy input, score normalization, and aggregation.
- [LLM vs. Human Unit Tests: Fault Detection on Real Python Bugs dossier](/dossiers/llm-human-python-fault-detection.md) — 20/29 versus 5/29 detections compare bug-context-informed regression generation with selected general-purpose baselines; coverage uses a different population.
