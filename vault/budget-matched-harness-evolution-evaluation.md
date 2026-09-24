---
type: Synthesis
title: "Budget-Matched Harness-Evolution Evaluation"
description: "Evaluating reusable agent-harness changes against task-level discovery under matched feedback, inference budgets, and held-out transfer tests."
tags: [agent-harness, evaluation, test-time-scaling, generalization, agents]
timestamp: 2026-07-22T00:32:30Z
---

# Budget-Matched Harness-Evolution Evaluation

An automatic harness optimizer should be credited only for improvement that survives comparison with simpler ways of spending the same feedback and inference budget. A shared harness update is supposed to produce a reusable control artifact; parallel sampling and trajectory refinement spend computation only on the current task. Conflating those objectives makes an optimizer look better whenever it merely gets more attempts at the benchmark.

## Evaluation Pattern

1. Fix the base model, initial harness, task distribution, feedback channel, and total rollout/token budget.
2. State what each method can update: task trajectory, one case-specific harness, or a shared harness artifact.
3. Compare shared-harness search with task-level parallel sampling and sequential refinement under matched budgets and access to the same verifier or judge feedback.
4. Select a reusable harness only with search and validation tasks. Keep final measurement tasks disjoint from every optimization decision.
5. Report pass@1 or another single-run measure alongside any oracle-selected pass@k result. A high best-of-many score does not establish a stronger default harness.
6. Inspect the resulting artifact: categorize persistent edits as reusable policy, task-specific facts, environment-specific procedures, context bloat, or regressions. Re-test it under changed templates, tools, and held-out task families.

## Practical Use

Use this pattern whenever a system modifies prompts, memory, tools, middleware, workflow graphs, or policy files based on benchmark outcomes. It exposes whether the gain comes from a more capable artifact, a better verifier, more test-time search, or direct memorization of the evaluated cases.

The pattern does not say that task-level scaling is always the preferred product choice. A reusable harness can be valuable for operational reasons. It says that the claim of reusable improvement needs a different evidence bar from the claim that more inference finds better answers.

## Locate the Gain Within the Loop

Before crediting a harness change, ask which failures justify it. Ecdysis aggregates failures across distinct tasks, diagnoses recurrent model mistakes separately from shared harness defects, then compares frozen versions on disjoint cases. Across five models and three datasets, its collaborative variant reports 69.56% accuracy versus 58.67% for serial failure-by-failure evolution, using 482 versus 881 total LLM calls. Its audit found that recurrence alone raised model-specific accommodations from 60.00% to 75.61%, while collaborative diagnosis cut them to 45.45%. This does not show superiority over budget-matched task-level sampling.

Hold the detector, retry budget, model and evaluator fixed while ablating one component. LAST-CQ swaps synthesized schema hints for raw database errors inside the same bounded retry, and full-corpus execution GLEU barely moves (0.4718 → 0.4729). Its equal-call best-of-three baseline also changes temperature and uses a weak selector, so that comparison is confounded. Report the actual deployed alternative rather than crediting the whole scaffold.

## Limitations

- Exact budget matching can be difficult when methods have different call shapes, cache behavior, or access to an expensive verifier.
- A held-out suite can still share artifacts, schemas, or environmental quirks with the search set; split design must be documented.
- Strong transfer on one benchmark does not prove safety, robustness, or benefit in an open-world deployment.

## Sources

- [Rethinking the Evaluation of Harness Evolution for Agents dossier](/dossiers/rethinking-harness-evolution-evaluation.md) — controlled comparison of parallel sampling, sequential refinement, harness evolution, and harness scaling on Terminal-Bench 2.1.
- [Ecdysis: Efficient and Effective Training of Runtime Harnesses for LLM Agents dossier](/dossiers/self-evolving-agent-harness-ecdysis.md) — aggregated diagnosis versus serial evolution with an audit of the edits.
- [What Drives Recovery in Agentic Text-to-Cypher? LAST-CQ: An LLM Agent Self-Refinement Framework dossier](/dossiers/last-cq-what-drives-agentic-recovery.md) — retry routing versus hint wording, plus a confounded equal-budget baseline.
