---
type: Synthesis
title: Rule-Based Rewards
description: Using an explicit list of natural-language rules, scored by an LLM verifier, as an interpretable reward term alongside outcome and fidelity signals in reinforcement learning.
tags: [reinforcement-learning, llm-as-judge, evaluation, verification]
timestamp: 2026-08-11T20:53:33Z
---

# Rule-Based Rewards

A reward design in which the desired behavior is written down as a checklist of atomic natural-language rules, and a verifier model labels each rule *followed* or *violated* for a candidate output. The reward is the satisfied fraction. It sits between a hand-coded verifiable reward (precise but only available for checkable domains) and a learned preference model (broadly applicable but opaque).

## Shape of the Reward

The rule term is rarely used alone. A workable composition has three parts:

- **Outcome** — did the candidate actually move the metric you care about? Keeps the policy honest about ends.
- **Rule compliance** — the fraction of the checklist satisfied. Provides dense, interpretable shaping where outcome signal is sparse, noisy, or expensive.
- **Fidelity or safety** — did the candidate stay faithful to the source, the user's intent, or a constraint? Prevents the policy from satisfying the checklist by inventing content.

Normalize each component *within the sampled group* (z-score across the candidates for one prompt) before summing, so that terms on wildly different scales contribute comparably and no single component silently dominates.

## Verifier Design

- Give the verifier the rule array and the output, and require a per-rule label plus a short justification. The justification is a cheap audit trail and reduces label drift.
- Demand strict structured output keyed by rule index so scoring is parseable and per-rule statistics are available.
- Keep rules **atomic, actionable, and decidable**. A rule that fuses two ideas produces incoherent labels; a rule a human cannot adjudicate will not be adjudicated consistently by a model either. Pilot the rule set with human annotators on clarity, validity, and decidability before wiring it to training.

## Why Use It

The rule set is the same artifact you can put in a prompt, publish as a style guide, or ablate rule-by-rule. That makes the reward inspectable in a way a scalar preference model is not: when the policy misbehaves you can point at which rule is missing, wrong, or being gamed, and edit it. Ablation studies frequently find the rule term contributes more than the outcome term, because it is dense where the outcome is sparse.

Rules also pair naturally with distillation. Filter a teacher model's outputs by the target metric and a fidelity threshold, supervised-fine-tune a compact model on what survives to stabilize the cold start, then run group-relative RL with the rule reward. This is how a small model can retain most of a frontier model's task gain at a fraction of the serving cost.

## Limitations

- **The verifier is an LLM judge**, with its attendant leniency, position, and verbosity biases. A rule-compliance reward can be inflated by outputs that *announce* compliance. Spot-check verifier labels against human judgment on a held-out slice.
- **Checklist satisfaction is not quality.** Optimizing a fixed rule set converges toward a template. Retain an outcome term and an independent quality measure to detect the collapse.
- **Rules encode a snapshot** of the preference they were derived from; they go stale when the target system or domain shifts.
- **Verification cost scales with rules × candidates × steps**, which is real money in a group-sampling RL loop. Keep the rule set small.

## Sources

- [What Generative Search Engines Like and How to Optimize Web Content Cooperatively dossier](/dossiers/autogeo-generative-engine-optimization.md) — AutoGEO_Mini trains Qwen3-1.7B with GRPO over z-normalized outcome, rule-compliance, and semantic-fidelity rewards; ablation shows the rule reward is the largest single contributor.
