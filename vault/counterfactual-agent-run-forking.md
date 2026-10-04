---
type: Synthesis
title: Counterfactual Agent Run Forking
description: Compare changed agent policies by restoring a common execution prefix and generating independent live futures, with reconstruction and same-model noise controls.
tags: [evaluation, agents, routing, reliability, verification]
timestamp: 2026-10-04T06:24:25Z
---

# Counterfactual Agent Run Forking

A changed agent action changes the world the next action observes. To evaluate a different model, routing decision, or intervention at a recorded point, restore a common workspace and conversation prefix, then execute each candidate continuation against its own evolving environment. Reusing the original run's logged post-fork observations measures a world the new policy may never reach.

## Replay Is Not Re-execution

Replaying recorded response bytes is deterministic playback and requires no model inference. Re-running a model on the recorded prompt generates a new response: identical weights and temperature-zero decoding do not guarantee identical bytes. Serving decisions can change floating-point reduction order through batch shape, cache partitioning, and kernel selection. Batch-invariant arithmetic can stabilize a particular serving stack, at a performance cost, but does not establish equality across hardware or software versions.

Neither byte playback nor a fresh response alone supplies a counterfactual environment. A live fork must reconstruct the pre-fork state and let new actions produce new observations. Executing the recorded action prefix can rebuild that state, but matching return codes is weaker evidence than matching the relevant files, processes, and external state. Isolate branches so one continuation cannot change another's inputs.

## Controlled Comparison

Pair every changed-model branch with a same-model control branch from the same prefix. For a non-model intervention, also retain an unchanged-policy branch. These controls estimate reconstruction, sampling, and serving noise before attributing divergence to the intervention. Record the model and serving configuration, context, remaining budget, and reconstruction fidelity.

Measure action divergence separately from verified task outcomes, nonempty artifacts, latency, and complete-episode cost. High agreement dominated by failures can hide every success-relevant evaluation error; changed actions alone do not establish a better policy. A stronger model can also exhaust the remaining budget before submitting an admissible result.

This protocol evaluates a [Trajectory-Preserving Model Handoff](/vault/trajectory-preserving-model-handoff.md); the handoff transfers live execution state, while the fork comparison tests what changing the continuation actually causes.

## Limitations

Live branches cost more than stitching logs and require reconstructible state. Irreversible external effects may prevent safe branching. Hindsight fork depths can bias an experiment toward points unavailable to an online policy. Evidence from a small, low-resolution pilot establishes replay invalidity more readily than it establishes a winning routing rule; numerical reproducibility is not task correctness.

## Sources

- [The Replay Gap: Static Evaluation of Model Switching in LLM Agents Scores the Wrong World dossier](/dossiers/replay-gap-model-switching-evaluation.md) — live model-switch forks and same-model controls expose post-fork state divergence and success-relevant errors hidden by logged-outcome stitching, with sparse outcome evidence.
- [Defeating Nondeterminism in LLM Inference dossier](/dossiers/thinking-machines-defeating-nondeterminism.md) — batch-dependent arithmetic explains variability under greedy decoding; batch-invariant kernels demonstrate bounded reproducibility with serving-performance costs.
