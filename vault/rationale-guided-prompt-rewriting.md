---
type: Synthesis
title: Rationale-Guided Prompt Rewriting
description: Using an evaluator's per-criterion natural-language justifications, not just its scalar scores, as the feedback signal that a rewrite model acts on.
tags: [prompt-optimization, llm-as-judge, evaluation, prompting]
timestamp: 2026-08-25T00:00:00Z
---

# Rationale-Guided Prompt Rewriting

A scalar score tells a rewriter that something is wrong. A criterion-grounded rationale tells it what and where. This pattern closes an evaluation loop by asking the judge to emit, for each rubric axis, both a score and a short natural-language justification, then handing the whole bundle to a rewrite model as the sole optimization signal — no gradients, no training data, no human annotation.

## Loop

1. Run the current prompt through the task model and collect the response.
2. Score the pair against a fixed multi-axis rubric, requiring a rationale per axis.
3. Give the rewrite model the current prompt, the score vector, and the rationales; ask for a revised prompt.
4. Re-generate and re-score. Carry the revision forward.
5. Stop on a round budget or when scores plateau.

## Why the Rationale Earns Its Cost

Scores and rationales are separable, so the contribution is directly measurable: run one arm with scores only and one with scores plus rationales. Every task tested this way favors the rationale arm, and the mechanism is visible in the rewrites — the model addresses missing task constraints, ambiguous phrasing, and absent reasoning instructions, i.e. the specific defects named in the justification.

Multi-axis rationales also resist a failure mode of scalar-reward optimization. A single reward invites over-fitting to whatever the scorer likes; per-axis justifications force the rewriter to satisfy several named criteria at once, and the edit trace stays human-auditable.

This is a single-prompt, rubric-anchored special case of the broader pattern in [Textual Feedback Backpropagation](/vault/textual-feedback-backpropagation.md), which propagates critiques through a graph of text-valued variables. Here the graph is one node and the critique structure comes from the rubric rather than from the topology.

## Practical Use

- Adopt it when an LLM judge is already in the loop: asking for justification alongside a score is close to free relative to the evaluation call you are making anyway.
- Keep both the score-only and score-plus-rationale arms during initial calibration. The gap is your evidence that the rationales are informative rather than decorative, and it is cheap to measure.
- Retain the full edit trace — prompt version, scores, rationales, resulting accuracy — so a regression can be attributed to a specific revision.
- Validate on held-out instances. Iterative rewriting against a fixed evaluation set will drift toward that set and toward the judge's stylistic preferences.

## Limitations

- The rewriter is optimizing the judge, not the task. Rising rubric scores and rising task accuracy have been observed to move together over several rounds, but that is correlation under a specific setup, not a guarantee.
- A frontier evaluator and rewriter paired with a smaller task model means some of the gain is distillation of the stronger model's judgment into the prompt string, not the rubric's contribution. Hold model roles constant when attributing improvement.
- Per-instance cost compounds: each round is a generation plus a multi-axis rationale-producing evaluation. Compare *total* optimization cost against trained or RL-based prompt optimizers before claiming an efficiency win.
- Rationales are plausible explanations, not causal accounts. A judge can name a defect that is not what actually broke the response.
- Reported wins against supervised or RL prompt optimizers are often cited from other papers under different task models. Treat uncontrolled cross-method tables as weak evidence.

## Sources

- [PEEM dossier](/dossiers/peem-prompt-engineering-evaluation-metrics.md) — compares score-only rewriting `Ps` against score-plus-rationale rewriting `Pc` over up to four rounds; `Pc` wins on AG News, SST-2, and GSM8K, but the baseline comparison is cited rather than re-run.
