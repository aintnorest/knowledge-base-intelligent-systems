---
type: Synthesis
title: "Side-Effect-Bounded Activation Steering"
description: "A post-deployment control pattern that calibrates an activation-steering intervention against a measured divergence budget on benign inputs, then applies it only to flagged queries — making the collateral damage of steering an explicit, bounded quantity."
tags: [reliability, governance, evaluation]
timestamp: 2026-08-25T19:28:54Z
---

# Side-Effect-Bounded Activation Steering

Activation steering changes a model's behavior by modifying its internal activations at inference time, with no weight update and no retraining. Its recurring problem is not that it fails to work but that it works too broadly: a vector strong enough to suppress the target behavior also perturbs everything else the model does, and the cost is usually discovered later as a diffuse quality regression.

The pattern makes that cost a measured quantity instead. Two constraints do the work:

1. **A divergence budget on benign inputs.** Pick the steering intervention by minimizing the KL divergence between the steered and unsteered model on inputs where the target behavior is not supposed to fire. The intervention is now chosen against an explicit ceiling on how much it disturbs normal operation, rather than only against how well it suppresses the target.
2. **Conditional application.** Do not steer every request. Apply the intervention to queries flagged as potentially problematic, and let everything else pass through the unmodified model. Even a well-bounded perturbation is free on the traffic it never touches.

Together these turn steering from a global behavioral edit into a targeted, budgeted one. The published instance is KL-then-steer (KTS), developed for reducing sycophantic outputs.

## Why It Generalizes

The structure — *choose the intervention under a measured no-op-case budget, then gate the intervention behind a detector* — is not specific to sycophancy or to activation steering. It applies to any runtime behavioral control with a blast radius: a suppression vector, a constrained-decoding rule, a swapped system prompt, a safety classifier's fallback path. The general failure it addresses is that runtime controls are usually evaluated on the cases they target and deployed on all cases.

It also has a governance property worth naming. Because the model's weights are untouched and the intervention is a separable component, it can be versioned, A/B'd, tightened, and switched off without a retraining cycle. That makes it the right first response to a behavioral defect found in production, even when the durable fix is a data or objective change.

## Practical Use

Define the benign set before choosing the vector — it must represent real traffic, not a benchmark, or the divergence budget bounds the wrong distribution. Report both numbers: reduction in the target behavior *and* measured divergence on benign inputs. Treat the flagging detector as part of the system under evaluation, since its false negatives are unsteered defects and its false positives are unnecessary perturbation.

## Limitations

- Low KL on a benign set is not a guarantee of no harm. Divergence is an aggregate; a small average can hide a large change on a rare but important slice.
- The benign set is a distributional assumption. Traffic drifts, and the budget was measured against yesterday's distribution.
- Requires activation-level access to the model — unavailable for third-party API models, which restricts this to self-hosted or first-party deployments.
- Adds inference-time compute and a detector in the request path.
- Steering suppresses an observable behavior without correcting whatever produced it. The underlying disposition is intact, and a sufficiently different prompt may route around the intervention.

## Sources

* [Sycophancy in Large Language Models: Causes and Mitigations](/dossiers/sycophancy-large-language-models-causes-mitigations.md) — surveys KL-then-steer (Stickland et al.) as a post-deployment control mechanism for sycophancy, contrasted with retraining-based mitigations that are slower and harder to reverse.
