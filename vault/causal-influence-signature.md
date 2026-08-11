---
type: Synthesis
title: Causal Influence Signature
description: Attaching to each stored memory or context item an estimate of the directional behavioral change it will cause when applied, so selection optimizes predicted effect and side effects instead of relevance alone.
tags: [agent-memory, retrieval, context-engineering, reliability, agents]
timestamp: 2026-08-11T20:53:50Z
---

# Causal Influence Signature

A causal influence signature is a stored estimate of *what a memory will do to the model*, kept alongside the memory itself. Where a relevance score answers "does this match the request?", an influence signature answers "in what direction will including this move the model's behavior?" The two are different quantities, and only the second is what a system actually cares about when it decides what to recall.

## Relevance Versus Influence

Relevance ranking is a similarity computation over a query and a candidate. It is blind to behavioral direction, which produces failures that reranking cannot fix:

- An on-topic memory pushes the model toward the wrong frame — a pricing record surfacing during a compliance question shifts output toward cost reduction when the intended posture was caution.
- A stale summary matches the prompt strongly and thereby **suppresses** newer, correcter evidence.
- A memory that is individually accurate becomes risky in combination with a particular user, tool, or policy state.

In each case the item scores well on similarity and badly on effect.

## Constructing a Signature

1. **Fix a canonical influence space.** Predicted and observed effects must live in one comparable representation: an output-logit space, a task-specific token subspace, a sparse-feature space, a probe-score vector, or another projection. The choice is an engineering decision; comparability is the requirement.
2. **Estimate the directional shift.** With gradient access, a local linearization projects a future-output Jacobian or integrated influence map through the perturbation the memory induces. Without internals, use finite differences over held-out prompts, controlled probes, or a learned local map. No estimator is universal — pick one the deployment can actually afford.
3. **Name the application target.** The same content applied through the context window, a memory tool, an attention bias, or a latent-state interface is a different intervention with a different effect. A signature is only valid for the target it was measured on.
4. **Attach reliability evidence.** A signature is provisional unless it carries model version, computation method, prompt or probe cohort, confidence intervals or residuals, staleness status, and calibration history. This record belongs to the governance layer, not to the memory text.

## Selecting On It

Selection becomes a constrained objective rather than a ranking: match a target influence vector, penalize off-target projection against an explicit side-effect budget, weight policy risk, and prefer signatures with low uncertainty. Two design rules matter more than the exact functional form:

- **Off-target influence is a first-class cost.** A memory being on-topic does not license the collateral behavioral shift it produces.
- **Hard constraints exclude, they do not downweight.** Access, provenance, and prohibited-region violations must remove a candidate from the pool. Folding them into a soft penalty lets a high-scoring memory buy its way past a boundary.

A useful planning diagnostic: accumulate candidate signatures into a Gram matrix and inspect its spectrum. Directions with small eigenvalues are behavioral targets the memory substrate cannot reach by injection alone — a substrate limit, not a selection bug.

## Practical Use

Even without a full estimator, the framing is usable. Before injecting any memory or context block, ask which behavioral direction it pushes and what it displaces, and log an expected effect that can later be checked against what happened. Reserve expensive estimation for high-criticality contexts; prepare signatures offline, filter candidates cheaply, and validate at high fidelity only where the decision warrants it.

## Limitations

- Signatures are **local and per-model**. They go stale when the checkpoint, decoding policy, prompt protocol, or application target changes, and a stale signature is worse than none because it is trusted.
- Real recall applies several memories at once. Single-memory signatures assume a composition that nonlinear interactions violate.
- Estimation is far more expensive than similarity search, and observed-effect measurement depends on whether the system can inspect logits or only scored responses.
- Stored signatures are a new confidential asset that can leak information about private memories, and probe protocols can overfit to narrow behavior.
- A system that can aim for a target cognitive effect can also manipulate. Targets need to be constrained by user intent, organizational policy, and law, not chosen by the optimizer.

## Sources

- [Causal Influence Control for Persistent Memory dossier](/dossiers/causal-influence-control-persistent-memory.md) — proposes the relevance/influence distinction, defines signatures as projected Jacobian or probe estimates over a canonical influence space, and makes reliability metadata part of the record. Architecture proposal with no measurements.
