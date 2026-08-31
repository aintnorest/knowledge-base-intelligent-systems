---
type: Synthesis
title: Instruction Tuning
description: Supervised finetuning of a pretrained language model on many tasks phrased as natural-language instructions, which buys held-out task generalization and zero-shot usability cheaply — but only for the prompting paradigms the mixture covers.
tags: [fine-tuning, generalization, prompting, chain-of-thought]
timestamp: 2026-08-25T20:15:03Z
---

# Instruction Tuning

Instruction tuning (also "instruction finetuning") is supervised finetuning of a pretrained language model on a large collection of existing datasets, each reformatted as a natural-language instruction with a target response. It is not new task knowledge and it is not preference optimization: it is a format and behavior intervention that teaches the model to treat an instruction as something to *follow* rather than text to *continue*.

Its defining economics are lopsided. A finetuning run costing a fraction of a percent of pre-training compute can move aggregate held-out benchmark scores by high single digits and change zero-shot behavior qualitatively — which is why it became a standard stage of post-training rather than an optional technique.

## What It Buys

- **Generalization to held-out tasks.** A model finetuned on a broad task mixture performs better on tasks excluded from that mixture, across model families, sizes, and pre-training objectives.
- **Zero-shot usability.** Base models trained purely on next-token prediction exhibit characteristic failures: continuing the user's input instead of answering it, restating the question, and not knowing when to stop (an artifact of pre-training without end-of-sequence tokens). Instruction tuning removes these, which is what makes few-shot exemplars optional rather than required.
- **Responsiveness to bare trigger phrases.** A trigger like "let's think step by step" only reliably changes behavior in a model whose finetuning mixture taught it that instructions carry force — see [Chain-of-Thought Prompting](/vault/chain-of-thought-prompting.md).
- **Composability.** It stacks with other continued-pre-training methods (e.g. a further denoising-objective stage) rather than substituting for them.

## The Paradigm-Coverage Requirement

The most consequential and least intuitive property: **instruction tuning improves unseen tasks mainly within the prompting paradigms the finetuning mixture contains, and can actively damage the paradigms it omits.**

The founding demonstration is the chain-of-thought ablation. Finetuning on answer-only instruction data — no reasoning traces — degraded held-out chain-of-thought performance *below the no-finetuning baseline* at every model size tested. Adding nine reasoning datasets, under 3% of sampled mixture weight, repaired the loss and improved the non-reasoning evaluations too. The damage runs both ways: a reasoning-only mixture hurt direct-prompting scores. Joint coverage of both formats let one checkpoint serve both.

The practical form of this rule: enumerate the interaction formats you intend to deploy (answer-only, reasoning traces, few-shot exemplars, tool calls, multi-turn), confirm the mixture contains each, and measure the ones it does not. "Generalizes to unseen tasks" is a claim about tasks, not about formats.

Format coverage inside the mixture is a deliberate design choice, not an accident. The Flan recipe presents every task with and without instructions, with and without few-shot exemplars, and (for reasoning data) with and without chains — which is why the resulting models retain both zero-shot and few-shot competence instead of trading one for the other.

## Scaling Behavior

- **Model size**: benefits appear across three-plus orders of magnitude of parameters. Absolute gains often shrink with scale while relative error reduction grows; both framings come from the same numbers, so state which one you mean.
- **Task count**: returns diminish sharply. In the Flan mixture most of the gain arrived by ~282 tasks, with 1,836 adding little — consistent with the hypothesis that instruction tuning mostly teaches the model to *express* knowledge pre-training already installed. Treat published task counts as descriptions, not targets.
- **Mixture weights**: per-task example caps and sampling proportions determine what the model actually sees far more than raw dataset counts do. A dataset family holding a few percent of sampled weight can decide whether a capability survives.

## Practical Use and Limitations

- **Compute arbitrage**: a small instruction-tuned model can outperform a much larger base model on the same benchmark. Price adaptation against scale-up before assuming more parameters is the only path.
- **Not a substitute for task-specific finetuning**: on tasks where a dedicated finetuned model exists, the instruction-tuned generalist may still lose. Whether instruction-tuned checkpoints make better *initializations* for single-task finetuning is a separate, less-settled question.
- **Safety effects are real but partial**: instruction tuning reduces toxic generation rates and improves toxicity classification and coreference-bias scores, but tail toxicity and identity-group disparities persist and generally mirror the base model's. It shifts distributions; it does not remove the underlying bias.
- **Beware asymmetric measurement**: because instruction-tuned models stop generating and base models do not, naive comparisons (of generation length, toxicity, or exact-match scoring) can be scored differently for each side. Check the scoring protocol before believing a base-vs-tuned delta.
- **Formatting artifacts leak into scoring**: instruction-tuned models acquire surface habits (leading articles, preamble, hedging) that exact-match scorers penalize as errors. Adapt the scorer or you will measure the habit rather than the capability.
- **Evaluation only means "held out" if the mixture was deduplicated against it.** Multi-task mixtures absorb the training splits of common benchmarks; a generalization claim is worth exactly as much as its deduplication audit.

## Sources

- [Scaling Instruction-Finetuned Language Models dossier](/dossiers/scaling-instruction-finetuned-language-models.md) — the Flan-PaLM/Flan-T5 paper: joint scaling of task count, model size, and CoT data; the paradigm-coverage ablation; the 0.2%-of-pre-training cost profile; usability and Responsible AI evaluations.
- [Emergent Abilities of Large Language Models dossier](/dossiers/emergent-abilities-large-language-models.md) — 2022 catalog treating instruction-tuning benefit as itself scale-gated, harmful at 8B and below in the models it surveyed.
- [The Power of Scale for Parameter-Efficient Prompt Tuning dossier](/dossiers/power-of-scale-prompt-tuning.md) — the parameter-efficient contrast: adapting a frozen model with learned soft prompts instead of updating weights; see [Prompt Tuning](/vault/prompt-tuning.md).
