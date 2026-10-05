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

First-party guides make the migration surface concrete. Reasoning defaults, verbosity controls, assistant prefill, tool-triggering instructions, subagent behavior, and hidden assistant metadata can all change across revisions. Guidance about intermediate updates can reverse when a new model requires metadata preserved by the harness; a globally applied brevity instruction intended for one revision caused a reported 3% evaluation drop across multiple versions. Treat vendor recipes as versioned configuration, then verify them on the actual product build.

Application evaluation should include an optimized reference where feasible. In a five-model study, independent prompt optimization changed several task winners while one routing task barely reordered. Drift sensitivity is itself task-specific; one migration score cannot characterize a model pair.

## Monitor Omitted Requirements

Visible instruction compliance is not the whole migration contract. Requirements satisfied through inferred defaults can regress even when no explicit instruction changes. In a requirement-level study, within-family model-version comparisons produced losses greater than 20 percentage points in 5.9% of unspecified cases versus 3.0% of specified cases. Across prompt variants, unspecified accuracy had an 8.9-point standard deviation, over twice the specified variation. The version-regression percentages do not measure prompt-edit regressions or imply that every application's failure probability doubles.

Retain validators for the full intended requirement set across model and prompt changes, including constraints intentionally omitted from the current prompt. Inspect critical and conditional requirements separately from average satisfaction, and restore explicit instructions where defaults no longer hold. [Prompt Contingency](/vault/prompt-contingency.md) explains the tradeoff between instruction overload and selective inclusion. Curated tasks and imperfect validators limit the numerical findings' generality.

## Limitations

The target's true optimal prompt is unknown; any measured gap is relative to the best prompt found under a particular search budget and evaluator. Drift can also be confounded by API, tool, or decoding changes unless those surfaces are held fixed. An adaptation that closes average task loss can still create safety, formatting, or slice-specific regressions.

## Sources

- [PromptBridge dossier](/dossiers/promptbridge-cross-model-prompt-transfer.md) — formalizes model substitution as prompt drift and measures directional transfer gaps across model families, sizes, single-agent tasks, and multi-agent workflows.
- [Quantifying Language Models' Sensitivity to Spurious Features in Prompt Design dossier](/dossiers/quantifying-language-models-sensitivity-spurious-features-prompt-design.md) — shows that semantically equivalent prompt formats vary sharply across models, motivating model-specific portability tests.
- [Optimization before Evaluation dossier](/dossiers/optimization-before-evaluation.md) — shows task-specific leaderboard changes after per-model prompt optimization.
- [Prompting best practices dossier](/dossiers/claude-prompting-best-practices.md) — documents model-specific changes in prompt and agent behavior.
- [Codex Prompting Guide dossier](/dossiers/openai-codex-prompting-guide.md) — `gpt-5.3-codex` reverses older preamble guidance and depends on preserved assistant `phase` metadata.
- [GPT-5 prompting guide dossier](/dossiers/openai-gpt-5-prompting-guide.md) — treats inherited prompts as migration artifacts and separates reasoning from verbosity.
- [An update on recent Claude Code quality reports dossier](/dossiers/anthropic-claude-code-quality-postmortem.md) — production regression from a prompt whose model scope was too broad.
- [What Prompts Don't Say: Understanding and Managing Underspecification in LLM Prompts dossier](/dossiers/prompt-underspecification-what-prompts-dont-say.md) — measures greater default-behavior instability across prompts and model versions, motivating full-requirement migration checks.
