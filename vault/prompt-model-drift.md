---
type: Synthesis
title: Prompt–Model Drift
description: The performance loss that appears when a prompt validated for one model is reused after model substitution, separating prompt compatibility from target-model capability.
tags: [prompting, prompt-optimization, evaluation, reliability]
timestamp: 2026-08-23T20:48:02Z
---

# Prompt–Model Drift

Prompt–model drift is the change in system behavior caused by replacing the language model while holding the task, application, and prompt fixed. A prompt that is effective for the source model can leave target-model capability unelicited because models differ in alignment, training data, tokenization, role and tool conventions, scale, and response style.

This is distinct from prompt sensitivity. Sensitivity varies wording or formatting for one model; prompt–model drift varies the model under one inherited prompt. The effect is directional: a prompt can transfer well from model A to B while B's prompt transfers poorly to A.

## Migration Gate

Treat a model change as a prompt-compatibility migration:

1. Freeze representative tasks, the surrounding harness, decoding settings, and the deployment metric.
2. Run the source model with its validated prompt to record the pre-migration baseline.
3. Run the target model with that prompt unchanged to measure direct transfer.
4. Establish a target-adapted candidate and, when affordable, a target-optimized reference to estimate how much capability the inherited prompt leaves unused.
5. Compare task quality, component behavior, latency, cost, safety, and output-contract compliance before promotion.
6. Version the adopted prompt with the exact target model and retain the inherited configuration for rollback.

For multi-agent systems, perform the gate at two levels. A **local** migration changes one role while peers stay fixed; a **global** migration changes all model-bearing roles. Local improvements can disrupt handoffs, and global adaptation can change the joint communication protocol, so neither component scores nor a single-agent benchmark replaces end-to-end validation.

## Practical Use

- Add prompt regressions to model-upgrade and provider-failover checklists.
- Report absolute score differences alongside ratios; a large relative improvement can describe a small absolute change on low-base-rate tasks.
- Preserve the model, prompt, tool schema, chat template, decoding settings, evaluation cases, and metric as one versioned experiment.
- Separate “the target model is weaker” from “the inherited prompt fails to elicit it” by testing an adapted or target-optimized prompt.

## Limitations

The target's true optimal prompt is unknown; any measured gap is relative to the best prompt found under a particular search budget and evaluator. Drift can also be confounded by API, tool, or decoding changes unless those surfaces are held fixed. An adaptation that closes average task loss can still create safety, formatting, or slice-specific regressions.

## Sources

- [PromptBridge dossier](/dossiers/promptbridge-cross-model-prompt-transfer.md) — formalizes model substitution as prompt drift and measures directional transfer gaps across model families, sizes, single-agent tasks, and multi-agent workflows.
- [Quantifying Language Models' Sensitivity to Spurious Features in Prompt Design dossier](/dossiers/quantifying-language-models-sensitivity-spurious-features-prompt-design.md) — shows that semantically equivalent prompt formats vary sharply across models, motivating model-specific portability tests.
