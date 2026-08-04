---
type: Synthesis
title: Dominator-Based Agent Validation
description: Validating non-deterministic agent executions against essential observable milestones learned from successful traces, rather than against one fixed action script.
tags: [evaluation, verification, computer-use, agents]
timestamp: 2026-07-13T02:42:42Z
---

# Dominator-Based Agent Validation

An evaluation pattern for agents whose successful executions can take different paths. Learn a graph from verified passing traces, then validate a new execution by checking that it reaches the milestones every successful path must traverse, in their required relative order. Permit incidental and alternative states between those milestones.

## Method

1. Record several independently verified successful traces with observable states and transitions.
2. Merge compatible traces into a behavior graph, keeping branches when states or transitions are meaningfully different.
3. Define state equivalence in layers: inexpensive exact or visual checks first, then semantic review only for ambiguous comparisons. Merge conservatively.
4. Compute dominators of the successful terminal state. A state is essential if every start-to-success path passes through it.
5. For each candidate run, require the essential states to occur in the learned topological order. Report coverage and the first missing or misordered essential state.

For example, if every successful run reaches `Search dialog → Search results`, a new run may include a loading screen, a different menu route, or extra UI steps and still pass. It fails if it never reaches the results or reaches required milestones in an invalid order.

## Practical Use

Use this for computer-use, UI automation, browser, IDE, or tool-using agents where a record-and-replay script generates flaky failures because environmental timing and valid routes vary. It creates an external, inspectable validation layer and can distinguish likely agent-execution failures from product regressions more usefully than the agent's self-reported completion.

The pattern works best when task success has observable checkpoints and a small number of passing traces can be verified with high confidence. Combine it with deterministic checks for saved data, permissions, side effects, safety constraints, and other outcomes not fully represented by visible states.

## Limitations

- It learns from accepted examples; insufficiently varied traces can mistake a contingent step for a required one or omit a legitimate path.
- State equivalence is a critical dependency. Visual similarity, LLM semantic judgments, and merge thresholds can each create false matches or needless graph fragmentation.
- Ordered milestone matching does not enforce time bounds, negative requirements, or latent semantic correctness. Add temporal and domain-specific assertions separately.
- Updating the graph from future successes needs a robust acceptance gate, or a regression may be incorporated into the definition of success.

## Sources

- [Validating Agentic Behavior When Correct Isn't Deterministic dossier](/dossiers/validating-agentic-behavior.md) — GitHub's Trust Layer design: PTA merging, layered state equivalence, dominator analysis, and topological subsequence validation.
