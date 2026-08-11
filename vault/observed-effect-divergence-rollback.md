---
type: Synthesis
title: Observed-Effect Divergence Rollback
description: Treating a state-changing injection as a reversible intervention with a predicted effect, measuring the realized effect in the same space, and rolling back, suppressing, or quarantining when the two diverge.
tags: [agent-memory, verification, reliability, provenance, governance, agents]
timestamp: 2026-08-11T20:53:50Z
---

# Observed-Effect Divergence Rollback

A control pattern for systems that change their own operating state: when something is admitted into a model's working context or persistent state, record what effect was expected, measure what effect actually occurred, compare the two, and take a defined action when they disagree. The claim being enforced is not that the injection was *authorized* but that it *did what it was predicted to do*.

## The Loop

1. **Predict.** Before applying the change, record an expected effect in an explicit measurement space, together with the criticality of the decision and the uncertainty of the prediction.
2. **Apply, reversibly.** Choose an application path whose effect can be withdrawn — a removable context block, a revocable tool result, a discardable bias, a checkpointed state — rather than one that immediately escapes into irreversible output.
3. **Observe.** Measure the realized effect in the *same* space, using the same model version, probe protocol, projection, and decoding policy that produced the prediction. Cross-space comparison is meaningless.
4. **Score divergence.** A normalized magnitude such as `‖observed − predicted‖ / (‖predicted‖ + ε)` gives a scale-free signal; the acceptance threshold should tighten with criticality and with prediction uncertainty.
5. **Respond by application target.** Remove the context, revoke the tool result, discard the bias, restore the checkpoint, suppress the item from future selection, or quarantine it pending human review. Different injection paths need different withdrawal mechanics.
6. **Record lineage.** Log the prediction, the observation, the divergence, the response taken, and the versions involved. Every confirmed or rolled-back intervention is calibration data about estimator quality, staleness, interaction effects, and policy adequacy.

## Why It Is a Separate Control

Authorization asks whether an item *may* be used. Divergence rollback asks whether it *should still be in effect*, and catches a different failure class: authorized, permitted, in-date material whose actual effect is inaccurate, stale, adversarially shaped, or wrong for this context. No amount of access control detects a correctly-permitted stale summary that suppresses newer evidence.

It also converts silent trust into an observable. Most memory and context pipelines have no feedback signal at all once an item is injected — the failure surfaces later as a bad answer with no attribution. Divergence scoring attributes the failure to a specific item and a specific application.

## Practical Use

- Start with the highest-criticality injections rather than every retrieval: policy-sensitive recall, long-lived preference records, self-modified instructions, and anything written by a previous agent run.
- Prefer application targets you can actually withdraw. A system that only ever appends to an immutable transcript has no rollback story regardless of how good its detection is.
- Make quarantine a real state with an owner and a review path, not a synonym for deletion — quarantined items are the highest-information sample for recalibrating the predictor.
- Track rollback precision and post-rollback recovery quality, not just detection rate. A rollback that leaves the task unrecoverable is not a save.

## Limitations

- **Rollback is partial once effects escape the model boundary.** Generated text sent to a user, a tool call already executed, or a decision a person acted on cannot be withdrawn; suppression of future selection is the residual remedy.
- Detection is only as good as the effect predictor and the probe set. If the measurement cannot distinguish the intended direction from noise, divergence scores are theater.
- Thresholds are a tuning surface with real cost on both sides: too tight and legitimate novel behavior is quarantined, too loose and the loop adds latency without safety.
- Observation costs scale with probe count and output horizon, and may be unavailable entirely when the system can see only scored responses rather than distributions.
- The pattern presumes an expected effect exists. For open-ended exploratory work there may be no meaningful prediction to diverge from.

## Sources

- [Causal Influence Control for Persistent Memory dossier](/dossiers/causal-influence-control-persistent-memory.md) — specifies the predict/apply/observe/diverge/roll-back loop for persistent memory recall, the normalized divergence score, per-target rollback responses, and lineage as calibration data. Proposal only; the separating power of the divergence signal is untested.
