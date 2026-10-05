---
type: Synthesis
title: History-Conditioned Instruction Stability
description: Branching a dialogue at several depths measures whether a persistent instruction still governs behavior, while matched capability loss makes stabilization interventions comparable.
tags: [prompting, reliability, evaluation, long-context, attention]
timestamp: 2026-10-05T21:56:49Z
---

# History-Conditioned Instruction Stability

An instruction that works at the beginning of a conversation may stop governing outputs as the history evolves, even while it remains present. History-conditioned instruction stability holds the model and original instruction fixed and measures adherence after different amounts and kinds of interaction. This differs from [Instruction-Density Compliance Decay](/vault/instruction-density-compliance-decay.md), where simultaneous obligations multiply, and [Prompt–Model Drift](/vault/prompt-model-drift.md), where the model changes under a fixed prompt.

## Branch at Depth, Then Probe

Build a backbone dialogue and branch its history at several depths. On each branch, replace the next user message with a standardized instruction-specific probe and score the response. Do not feed probe answers back into the backbone: evaluation should not itself reinforce the instruction or alter later history. Average across histories and report instruction-family strata, incoming-content conditions, and core task quality rather than only an overall adherence curve.

This isolates changing history from changing questions. It does not make simulated conversations representative of human dialogue, tool traces, or adversarial interaction. Attention to an instruction may decline alongside adherence, but co-occurrence is not proof that attention decay alone causes behavioral drift.

## Compare Control at Matched Capability Loss

A stronger intervention can produce more obedience by damaging useful generation. Compare stabilization policies at a matched, acceptable loss in task capability, then account for context consumption, computation, and latency:

- **Instruction repetition** renews recent exposure but consumes context and may interfere with the task. This is not the one-shot duplication mechanism in [Repeated-Input Contextualization](/vault/repeated-input-contextualization.md).
- **Prediction guidance** contrasts model outputs with and without the instruction, strengthening instruction-dependent predictions at the cost of additional model evaluation and possible oversteering.
- **Attention reweighting** increases total mass on instruction tokens while preserving relative weights within instruction and history groups. It avoids extra prompt tokens but requires internal model access.

The attention intervention has a tunable strength. Calling it parameter-free can mean no learned parameters, not absence of a hyperparameter or a tradeoff to calibrate. Compare full stability–capability curves and turnwise behavior; a method's advantage early in a dialogue need not persist later.

## Limitations and Authority

The supporting mitigation evidence covers a small selected instruction set and one model, with task degradation measured inside sampled conversation histories. It does not establish a universal conversational cutoff, general latency advantage, or stable adherence to all semantic policies. Simplified geometric explanations omit important model operations and do not exclude imitation or template effects.

Obedience is not authorization. Increasing instruction influence cannot resolve contradictory or harmful policies, certify resistance to adversarial content, or constrain an action's real-world effects. Action permissions require an external enforcement boundary and direct action-level evaluation, not a high adherence score.

## Sources

- [Measuring and Controlling Instruction (In)Stability in Language Model Dialogs dossier](/dossiers/instruction-drift-language-model-dialogs.md) — COLM 2024 branch-at-depth self-chat probes; compares repetition, classifier-free guidance, and split-softmax at matched history-conditioned task loss, with narrow mitigation coverage and no causal identification of drift from attention traces.
