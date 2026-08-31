---
type: Study Note
title: Principled Instructions Are All You Need for Questioning LLaMA-1/2, GPT-3.5/4
description: Personal study notes on a 26-principle catalog of surface-level prompt directives, its five-category grouping, and the paired human-evaluated ATLAS experiments reporting boosting and correctness gains that grow with model scale.
resource: https://arxiv.org/abs/2312.16171v2
source: /archive/principled-instructions-questioning-llms.pdf
tags: [prompting, evaluation, in-context-learning, reliability]
timestamp: 2026-08-25T00:00:00Z
---

# Principled Instructions Are All You Need for Questioning LLaMA-1/2, GPT-3.5/4 - Study Notes

**Authors**: Sondos Mahmoud Bsharat, Aidar Myrzakhan, Zhiqiang Shen (joint first authors, equal contribution) — VILA Lab, Mohamed bin Zayed University of AI
**Venue**: arXiv:2312.16171v2 [cs.CL]
**Date**: January 18, 2024
**Pages**: ~18 (11 pages of body, remainder figures and qualitative examples)
**Project page**: https://github.com/VILA-Lab/ATLAS

## What It Is

A catalog paper. It proposes 26 hand-written prompt principles — surface-level directives a user can bolt onto an ordinary question — and evaluates them by pairing each principled prompt against its unprincipled twin on a purpose-built benchmark called **ATLAS**, judged by humans.

This is not a method paper and not a survey. It is an attempt to turn prompt-engineering folklore into something with a benchmark attached. That framing is the right way to read it: the principles are the artifact, the numbers are secondary and weakly specified, and the paper's genuine value is as a well-organized checklist of levers plus one clean evaluation idea.

The title's "All You Need" is a joke, not a claim the paper defends.

## The Problem It Addresses

Fine-tuning is out of reach for most users, so prompt formulation is the only adaptation surface they have. But prompt advice circulates as anecdote. The authors want a compact, enumerable set of instructions that a non-expert can apply directly, with at least some empirical evidence that each one does something.

Their motivating observation is that larger models have "a considerable capacity for simulation" — the more precisely a task, audience, or role is specified, the more the response converges on what the asker wanted. They read this as evidence that models adapt stored information to the prompt rather than merely retrieving it.

## The 26 Principles

The principles are presented in random order in Table 1, then grouped into five categories in Table 2. The grouping is the more useful view:

**1. Prompt Structure and Clarity** — integrate the intended audience ("the audience is an expert in the field"); use affirmative directives (`do`, not `don't`); use leading words like "think step by step"; use **output primers**, ending the prompt with the start of the anticipated response; use explicit section tags (`###Instruction###`, `###Example###`, `###Question###`) with line breaks separating instructions, examples, questions, context, and input data.

**2. Specificity and Information** — few-shot / example-driven prompting; the simplification family ("Explain in simple terms", "Explain to me like I'm 11 years old", "explaining something to a 5-year-old"); the debiasing clause ("Ensure that your answer is unbiased and avoids relying on stereotypes"); style-imitation instructions; continuation-from-a-seed instructions; explicit statement of requirements as keywords, regulations, hints, or instructions.

**3. User Interaction and Engagement** — let the model interview you ("From now on, I would like you to ask me questions to..."); the teach-and-test pattern ("Teach me [topic] and include a test at the end, and let me know if my answers are correct after I respond, without providing the answers beforehand"); detailed-writing and style-preserving-revision templates.

**4. Content and Language Style** — drop politeness markers ("please", "thank you", "I would like to") if you want concise answers; assign a role; use delimiters; repeat a key word or phrase; **add "I'm going to tip $xxx for a better solution!"**; **incorporate "You will be penalized"**; incorporate "Your task is" and "You MUST"; ask for a "natural, human-like manner" answer.

**5. Complex Tasks and Coding Prompts** — break complex tasks into a sequence of simpler prompts in an interactive conversation; for multi-file code generation, ask for a runnable script that creates or edits the files rather than prose containing many code blocks; combine chain-of-thought with few-shot prompts.

Section 3.3 also states seven higher-level design philosophies behind the list — conciseness and clarity, contextual relevance, task alignment, example demonstrations, avoiding bias, incremental prompting, and (speculatively) programming-like logic in prompts. These read as the intended derivation of the 26, though the mapping is never made explicit.

## Evaluation Design

This is the part I would actually reuse. All evaluation runs on **ATLAS**, a manually crafted benchmark with a standard subset spanning domains and a challenging subset for reasoning. For each principle, 20 human-selected questions are answered **with and without** the principle applied, one response per question, and human evaluators compare the pair.

Two metrics, deliberately measured on different task types:

- **Boosting** — the percentage increase in *response quality* when the principle is applied, measured on simpler questions where quality improvement is what varies.
- **Correctness** — the *accuracy* of the output, measured on complex reasoning questions, reported both absolutely and relative to the unprincipled baseline.

The separation is the insight: a prompt tweak can make an answer read better without making it more right, and the paper builds that distinction into the protocol instead of collapsing everything into one preference score. Five principles (14, 15, 21, 22, 23) are excluded from the correctness track because they are inapplicable to reasoning items — an honest admission that a chunk of the catalog only affects style and interaction, not accuracy.

Models: instruction-finetuned LLaMA-1-{7B, 13B}, LLaMA-2-{7B, 13B}, off-the-shelf LLaMA-2-70B-chat, GPT-3.5 (ChatGPT), GPT-4 — bucketed into small (7B), medium (13B), and large (70B and GPT-3.5/4) scales.

## Results

- **Headline**: on GPT-4, the principled prompts improved quality by an average of **57.7%** and accuracy by **36.4%** over standard prompts.
- **Boosting**: all principles improved all three scale buckets. Principles 2 (audience), 5 (simplification), 15 (teach-and-test), 16 (role), 25 (explicit requirements), and 26 (style imitation) benefited large models most. Principle 14 (model-asks-questions) improved every question it was applied to. Average improvement across individual LLMs sits around a stable 50%.
- **Correctness**: absolute accuracy averages 20–40%; small and medium models land roughly 10–40%, large models exceed 40%. Relative improvement exceeds 10% on average and surpasses 20% for larger models.
- **Scale trend**: the gain from principled prompting grows monotonically from LLaMA-2-13B through LLaMA-2-70B-chat, GPT-3.5, to GPT-4. Moving from LLaMA-2-7B to GPT-4 the performance gain exceeds 20%.

The scale trend is the most interesting empirical claim, and it is a specific instance of a familiar pattern: the *benefit* of a prompting technique is itself scale-gated, so a principle validated on a large model says little about a small one and vice versa.

## My Takeaways

1. **Use it as a checklist, not as evidence.** The 26 principles are a genuinely good enumeration of the levers available at the prompt surface — audience, role, format tags, delimiters, affirmative phrasing, output primers, incentives, explicit requirements, decomposition. As a menu to run down when a prompt underperforms, it earns its keep. As a source of effect sizes, it does not.

2. **Quality and correctness are separate measurements.** The boosting/correctness split, and the exclusion of five principles from the correctness track, encode a distinction most prompt evaluations blur. Any prompt intervention should be asked which of the two it is supposed to move, and then measured on the track that matches.

3. **Paired with/without prompt comparison is the right unit.** Holding the question fixed and varying only the principle isolates the intervention cleanly. The weakness is not the design but the sample size and the judging.

4. **The incentive principles are the most-cited and least-supported.** "I'm going to tip $xxx" and "You will be penalized" spread far beyond this paper on the strength of a memorable example figure. Their evidence here is 20 human-judged items per principle. Treat them as hypotheses to test on your own task, not as established levers — and note the second-order cost: a prompt containing a false promise of payment is a small dishonesty baked into a production system.

5. **Structural principles are the ones most likely to transfer.** Explicit section delimiters, output primers, affirmative directives, and stated requirements are mechanical, cheap, and act on parsing and format rather than on model "motivation." I would test those first.

## What I Would Question

- **The evaluation is thin where it matters most.** Twenty questions per principle, a single response per question, no reported decoding settings, no inter-rater agreement, no stated blinding of the human evaluators, no confidence intervals. Evaluators comparing a principled and an unprincipled response can often tell which is which from the output's shape, which is a direct route to preference inflation.
- **"57.7% improvement" is not a well-defined quantity.** It is a percentage increase in a human quality rating whose scale is never specified in the paper body. The correctness numbers are more interpretable but are absolute accuracies in the 20–40% band, meaning most answers are still wrong.
- **ATLAS is authored by the same team that authored the principles.** Benchmark items were "human-selected" for each principle, so the questions are chosen where the principle plausibly applies. That is a reasonable design for demonstrating a mechanism and a poor one for estimating deployment effect.
- **Principles interact and overlap.** Principle 12 ("think step by step") and 19 (CoT plus few-shot) are the same family; 7 and 19 overlap; 9, 10, and 25 are all requirement-emphasis variants. They are evaluated in isolation, so the catalog gives no guidance on composition, and stacking them plausibly produces a bloated prompt that violates the paper's own conciseness philosophy.
- **The politeness principle is stated as fact and is genuinely contested.** Later work on politeness and command phrasing found large item-level swings with aggregate effects that mostly wash out. This paper's framing — drop politeness for concise answers — is an untested generalization from a small sample.
- **Model coverage is 2023-era.** LLaMA-1/2 and GPT-3.5/4 as they existed in late 2023. Contemporary instruction-tuned models already do much of what several principles request (structure, step-by-step reasoning, audience calibration) by default, which plausibly shrinks or reverses several of these gains. This needs contemporary re-verification before any of it drives a production decision.

## Vault Ideas Extracted

* [Prompt Incentive Framing](/vault/prompt-incentive-framing.md)
* [Output Priming](/vault/output-priming.md)
* [Quality Versus Correctness Prompt Evaluation](/vault/quality-versus-correctness-prompt-evaluation.md)
