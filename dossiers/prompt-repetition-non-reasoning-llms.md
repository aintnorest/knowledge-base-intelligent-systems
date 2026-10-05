---
type: Study Note
title: "Prompt Repetition Improves Non-Reasoning LLMs"
description: A Google Research preprint finds that duplicating the full input improves answer-only benchmark accuracy across seven models, while separating prefill repetition from generated reasoning and qualifying its latency claims.
resource: https://arxiv.org/abs/2512.14982v1
source: /archive/prompt-repetition-non-reasoning-llms.pdf
tags: [prompting, context-engineering, evaluation, attention, inference-efficiency]
timestamp: 2026-10-05T21:48:12Z
---

# Prompt Repetition Improves Non-Reasoning LLMs — Study Notes

**Authors**: Yaniv Leviathan, Matan Kalman, Yossi Matias; Google Research  
**Published**: December 17, 2025; archived arXiv:2512.14982v1  
**Status**: Research preprint; the archived manuscript explicitly says “Preprint.” No peer-reviewed publisher version was established. API experiments were run in February and March 2025, not at the manuscript's December publication date.

## What It Is

A deliberately simple intervention: supply the entire query twice before generating an answer. The repeated material includes the task context, question, answer choices, and output instructions—not just a reminder to think or a repeated question. The paper evaluates whether this improves accuracy when models are asked not to reason, while preserving answer length and format.

The reusable idea is to spend additional **input-side contextualization** rather than additional generated deliberation. It does not make repetition free, turn a causal transformer into a bidirectional one, or establish a general improvement for long-running conversations.

## Problem and Motivation

Causal prompt processing makes order consequential: early answer options are represented without seeing the later question, whereas question-first options can already be contextualized by it. Repeating the input gives the later copy access to the complete earlier copy. The authors also observe that reasoning-trained models often restate parts of a request during generation; input duplication may obtain some benefit without serially generating that restatement.

That observation motivates the method but is not a mechanistic proof that reasoning's benefit is reducible to repetition. The experiment's “non-reasoning” condition is a prompting condition asking the evaluated models not to reason, not an inspection establishing the absence of internal computation.

## Mechanism as an Idea

The second occurrence of an early query token can attend to later information from the first occurrence. This creates an alternative route for full-query contextualization while retaining causal attention within each copy. The paper's statement that each prompt token can attend to every other prompt token is best read as access across corresponding occurrences: the original early tokens still cannot attend forward.

The work compares plain duplication, a verbose restatement variant, and three copies. A length-matched padding control adds irrelevant periods instead of information. Its lack of improvement argues against prompt length alone explaining the gains; it does not uniquely identify the attention pathway responsible.

Prefill can process input tokens in parallel, unlike serial answer generation. Repetition therefore need not add generated tokens. It nevertheless enlarges the input, consumes context capacity, and may increase prefill work and latency. Keeping only the second copy in the KV cache is a proposed future direction, **not** an evaluated implementation in this paper.

## Results and Admissions

The study tests **seven models** through official provider APIs: Gemini 2.0 Flash and Flash-Lite, GPT-4o and GPT-4o-mini, Claude 3 Haiku and Claude 3.7 Sonnet, and DeepSeek V3. Its seven benchmark families are ARC Challenge, OpenBookQA, GSM8K, MMLU-Pro, MATH, and two custom tasks. Testing both question-first and options-first ordering for the three multiple-choice families produces **70 model–configuration comparisons**.

- With reasoning discouraged, repetition records **47 statistically significant wins, zero significant losses, and 23 remaining comparisons** under the authors' paired McNemar criterion of **p < 0.1**. This is not a claim that all 70 comparisons show significant improvement; the manuscript's broad statement that accuracy improves across all models and benchmarks should be interpreted alongside that significance accounting.
- Gains are generally smaller for question-first multiple-choice inputs and larger for options-first inputs, consistent with the order/contextualization motivation.
- On **NameIndex**, which asks for the **25th item in a 50-name list**, Gemini 2.0 Flash-Lite rises from **21.33% to 97.33%**. The other custom task, **MiddleMatch**, uses **40 elements drawn from 10 possible values** and asks for the item between two specified neighbors. Both custom tasks were expressly designed to demonstrate repetition's usefulness; they are not representative workload samples.
- Three copies often improve these custom lookup tasks beyond two; the verbose and three-copy variants behave similarly to plain repetition on most other tested tasks. Length-matched irrelevant padding does not improve performance.
- With step-by-step thinking encouraged, the smaller evaluation records **5 significant wins, 1 significant loss, and 22 neutral comparisons**. The strongest evidence is consequently for the answer-only regime, not for reasoning models universally.
- Generated-output lengths and measured API latency generally remain similar. **Claude Haiku and Sonnet show increased latency on very long requests**, including custom-task inputs or the three-copy variant. The abstract's unconditional “without increasing … latency” is qualified by these exceptions and the conclusion's warning that very long prompts may not fit at all.

Latency is end-to-end API timing, with requests interleaved round-robin per provider. The authors explicitly caution about network delays and transient load, and note unusually high DeepSeek latency. These measurements do not establish unchanged FLOPs, memory use, input-token billing, or production throughput. Main accuracy and latency plots carry much of the detail; the text does not supply a complete numerical table or enough sampling detail to treat the headline win count as a deployment forecast.

## Analyst Takeaways

1. **Separate redundant evidence from pointless padding.** Repetition can change what information is available during contextualization; merely increasing the token count did not reproduce its benefit. This is a targeted hypothesis about information order, not a license to inflate every prompt.
2. **Compare against order repair and query-aware context.** [Lost in the Middle](/dossiers/lost-in-the-middle-long-contexts.md) found that query repetition nearly solved exact key–value lookup but barely helped semantic multi-document QA. This paper repeats the whole query and tests newer model APIs; neither source establishes that lookup gains transfer to synthesis or policy following.
3. **Measure both regimes.** A technique that helps short answer generation may add little when the model already generates a restatement or reasoning trace. Preserve task, model revision, ordering, and generation policy in the comparison; [Prompt–Model Drift](/vault/prompt-model-drift.md) explains why inherited recipes need requalification after model substitution.
4. **Do not equate unchanged elapsed time with unchanged cost.** [Prompt Cache Stability](/vault/prompt-cache-stability.md) concerns serialized prefix reuse, not better logical use of repeated content. Caching may change computation economics, but it neither proves that the duplicate helps nor removes its context exposure.
5. **Distinguish single-request repetition from temporal reinforcement.** [Instruction drift in dialogs](/dossiers/instruction-drift-language-model-dialogs.md) studies repeating persistent system instructions across turns, trading stability against task ability and context consumption. It tests a different intervention and outcome from duplicating a complete one-shot question.

## Questions and Limitations

- Does the benefit survive representative production inputs, conflicting evidence, untrusted text, structured outputs, and nearly full windows? Multi-turn and multimodal use are future work here.
- What repetition granularity retains the gain without duplicating irrelevant or unsafe content? Partial repetition, prompt reordering, and attention analysis are proposed rather than established.
- The **p < 0.1** threshold is permissive, and the paper does not describe a multiple-comparison correction. The custom tasks and incomplete text-level sample accounting limit generalization of the win tally.
- API snapshots date to early 2025. The results do not certify current versions, hidden reasoning modes, or per-provider billing policies.
- Does additional prefill produce favorable cost-adjusted accuracy when batching, cache reuse, long-input memory, and throughput are included? The paper measures latency and generated length, not those complete serving costs.

## Vault Ideas Extracted

* [Repeated-Input Contextualization](/vault/repeated-input-contextualization.md)
