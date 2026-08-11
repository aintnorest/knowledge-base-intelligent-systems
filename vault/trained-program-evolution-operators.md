---
type: Synthesis
title: Trained Program-Evolution Operators
description: Defining a small vocabulary of atomic code transformations, training the model on individual verified transitions of each, and letting the search harness compose the same operators at inference time.
tags: [self-improvement, reinforcement-learning, agents, coding-agents, agent-harness]
timestamp: 2026-08-11T17:30:00Z
---

# Trained Program-Evolution Operators

Most agentic search systems treat the model as a frozen variation engine: the harness decides what move to make next, and the model produces whatever a prompt elicits. The alternative is to fix a small vocabulary of atomic transformations, make each one a separate supervision target, and require that the harness compose exactly those same transformations. The operator name becomes a shared interface between training and inference.

A representative vocabulary for code search is four operators: **draft** (create from scratch), **improve** (refine one parent), **debug** (repair one parent given its error), and **crossover** (merge two parents). The point is not these four specifically — it is that the set is small, closed, and identical on both sides of the interface.

## Why the Coupling Matters

- **Supervision becomes local.** Training on whole trajectories ties the policy to one controller and gives sparse, hard-to-attribute credit. A single parent → child transition with its execution score is a complete, verifiable training example.
- **Search stays swappable.** Because the model learns transformations rather than a global control policy, a different search procedure — greedy, MCTS, population-based — can compose the same learned operators without retraining.
- **Revision is trained, not assumed.** A model post-trained only on one-shot generation is being asked at inference time to do something it never practiced. Long-horizon search spends most of its calls on repair and recombination, so those are the calls worth training.
- **The improver itself becomes the artifact.** Verified transitions produced by search feed back as training data for the model that will drive the next search. This is the minimal form of "training the improver" — one closed loop, not an open-ended recursion.

## Practical Use

1. Enumerate the moves your harness actually makes. If there are more than a handful, or if they overlap, the vocabulary is not yet atomic.
2. Log every transition as (task, operator, context, produced artifact, execution outcome). This is both the search trace and the training corpus.
3. For supervised warm start, keep transitions whose outcome clears a threshold — and, for repair chains, trace back from a valid endpoint to the preceding non-repair step so the whole useful segment is retained rather than only its last edit.
4. For RL, sample the operator to practice, *then* sample the program state it acts on. Uniform state sampling wastes updates on exhausted regions; greedy sampling collapses onto the incumbent.
5. Keep operator-specific prompt templates stable between training and deployment. The interface only pays off if the inference-time call looks like the training example.
6. Report per-operator statistics — invocation share, success rate, share of total improvement. They tell you which operator is actually carrying the search.

## Limitations

- A fixed operator set bounds what the agent can initiate. Anything outside the vocabulary requires a harness change, which the trained model cannot request.
- Operator frequency in the corpus tends to be very uneven (drafts and repairs vastly outnumber recombinations), so the rarest and often most valuable operator gets the least supervision.
- Training the improver on its own search output risks compounding whatever bias the current harness has about which branches are worth expanding.
- Gains attributed to "trained operators" can hide gains from the harness that generated the data. Separating them requires holding one fixed while swapping the other.

## Sources

- [Frontis-MA1: Training an AI4AI Model towards Recursive Self-Improvement in Machine Learning Engineering](/dossiers/frontis-ma1-ai4ai-recursive-self-improvement.md) — trains Draft/Improve/Debug/Crossover as explicit SFT and RL targets and composes the same four in evolutionary search; post-training adds +21.22 points of MLE-Bench Lite Medal Average at 35B and +18.18 at 30B under an identical harness, and the gain reproduces on a held-out scientific benchmark with the framework fixed.
