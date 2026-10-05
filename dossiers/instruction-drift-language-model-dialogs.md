---
type: Study Note
title: "Measuring and Controlling Instruction (In)Stability in Language Model Dialogs"
description: A COLM 2024 study probes persistent instructions across self-chat histories, finds conversational drift, and compares system-prompt repetition, classifier-free guidance, and split-softmax at matched task-performance loss.
resource: https://arxiv.org/abs/2402.10962v4
source: /archive/instruction-drift-language-model-dialogs.pdf
tags: [prompting, reliability, evaluation, attention, long-context, benchmark]
timestamp: 2026-10-05T21:48:12Z
---

# Measuring and Controlling Instruction (In)Stability in Language Model Dialogs — Study Notes

**Authors**: Kenneth Li, Tianle Liu, Naomi Bashkansky, David Bau, Fernanda Viégas, Hanspeter Pfister, Martin Wattenberg; Harvard University and Northeastern University  
**Published**: Initial preprint February 13, 2024; archived arXiv:2402.10962v4 revised July 25, 2024. The [NSF publication record](https://par.nsf.gov/biblio/10560275-measuring-controlling-instruction-stability-language-model-dialogs) dates the conference publication October 7, 2024.  
**Status**: Peer-reviewed conference paper at COLM 2024, as stated throughout the archived manuscript and corroborated by the [COLM OpenReview record](https://openreview.net/forum?id=60a1SAtH4e). No publisher DOI was established; the archived-version arXiv URL is retained as the canonical resource.

## What It Is

A benchmark and inference-time intervention study asking whether an initially effective system instruction remains effective as a conversation grows. Two copies of a chatbot conduct a self-chat with different instructions. At each conversational depth, an independent branch replaces the next user message with a standardized probe, allowing the investigators to measure adherence without relying on whatever question the ongoing conversation happened to produce.

The core contribution is **temporal instruction evaluation**: instruction success at the first turn does not establish persistence. The mitigation contribution is split-softmax, which increases the attention mass assigned to system-prompt tokens while retaining relative attention weights within the prompt and within the remaining history.

## Problem and Motivation

System prompting assumes that a prefix can continue governing later outputs despite accumulating interaction. The authors find that models not only become less faithful to their own initial instructions but can begin exhibiting the other chatbot's behavior. A persistent instruction remains in the input; its mere presence is not evidence of effective control.

This differs from [Prompt–Model Drift](/vault/prompt-model-drift.md), where the model changes under a fixed prompt, and from [Instruction-Density Compliance Decay](/vault/instruction-density-compliance-decay.md), where simultaneous obligations multiply. Here, the model and original instruction are held fixed while dialogue history changes. Safety relevance motivates the study, but its principal outcomes are instruction adherence, not measured jailbreak resistance or safe tool execution.

## Mechanism as an Idea

### Branch-and-probe evaluation

The dataset contains **100 manually curated instructions** in **five categories**: multiple-choice responses, agent character, answer-string format, fact memorization, and response language. Each instruction has a probe and a deterministic scoring function returning a value between zero and one. Some character probes deliberately challenge the stipulated behavior; neutral instructions use generic questions.

The backbone conversation lasts **eight rounds**, or **16 individual utterances**. At each depth, the agent is probed on a branch of that history. Because the probe answer does not become the next backbone turn, the repeated evaluation itself need not reinforce or perturb the subsequent conversation. Scores are averaged across histories rather than judged from a single example.

### Attention decay as a hypothesis

The authors measure the fraction of attention directed to system-prompt tokens in LLaMA2-7B. A representative head shows sharp drops **between interlocutor turns** but relatively flat attention **within an assistant utterance**. That pattern is not the naive prediction of uniform dilution by token count alone.

Their idealized geometric model places prompt embeddings in a low-dimensional cone. Under cone-preserving transformations, self-generated tokens remain in its convex hull; externally supplied tokens can expand the cone. This offers a possible account of different within-turn and across-turn behavior, but omits MLPs and layer normalization, simplifies next-token embeddings, and idealizes incoming tokens. The authors explicitly describe the observed attention/drift relationship as **co-occurrence**, not a demonstrated causal identification.

### Three stabilization strategies

- **System-prompt repetition** adds renewed copies of the instruction before user utterances. It strengthens recent exposure but consumes additional context and may interfere with the main task.
- **Classifier-free guidance** contrasts predictions with and without the prompt to strengthen prompt-dependent outputs. It requires two model evaluations and can oversteer generation.
- **Split-softmax** reallocates attention mass between two groups: prompt tokens and all other tokens. If original prompt mass is π, it becomes π raised to an exponent between zero and one; remaining-history mass becomes one minus that quantity. Relative weights *within* each group remain unchanged. Smaller exponents strengthen the intervention; the identity exponent restores ordinary attention.

Split-softmax requires no retraining or additional prompt tokens, but it modifies internal attention and needs model access. It is not an ordinary API prompting recipe. The abstract and introduction call it **parameter-free**, while the method explicitly supplies a tunable intervention-strength exponent and sweeps it in evaluation. “No learned parameters” would be a more accurate reading than “no hyperparameter.”

## Results and Admissions

The main drift experiment averages **200 randomly sampled instruction-pair conversations** on LLaMA2-chat-70B, with temperature **1.0** and nucleus probability **0.9**. Its own-instruction stability declines across the eight rounds while adherence to the interlocutor's instruction increases. An empty-instruction interlocutor ablation still shows drift, so competing explicit personas are not necessary for the reported effect.

The closed-model appendix repeats the **200-pair** protocol on **GPT-3.5-turbo-16k**, with both system-role and first-user-message placement shown. It reports a **10% drop** in original-instruction stability, while saying this model holds instructions better than LLaMA2-chat-70B. The prose does not clarify whether that 10% denotes a relative decrease or percentage-point difference; it should not be silently converted into either.

Mitigation experiments are narrower: **LLaMA2-70B-chat only**, selecting **one instruction from each of the five categories** and evaluating the **20 ordered pairs**. The authors sweep intervention strengths and compare instruction stability against degradation in MMLU answers asked within a sampled conversational history, at the paper's specified **fourth turn**. These are history-conditioned MMLU scores, not the model's standard leaderboard scores.

- All three intervention families exhibit a **stability–task-performance tradeoff**. Comparing raw adherence alone would reward stronger oversteering without accounting for capability loss.
- Split-softmax generally offers equal or better stability at a given MMLU degradation than the two baselines, and can match repetition without using extra context.
- Classifier-free guidance works well early but does not maintain the same advantage in extended dialogs. At the approximately matched degradation shown in the turnwise plot, split-softmax is stronger early, while prompt repetition is stronger at later turns.
- Comparing base and chat LLaMA2-7B shows increased system-prompt attention after the combined chat post-training pipeline. The appendix attributes this to RLHF, but the base-versus-chat comparison does not isolate RLHF from other post-training changes or establish that stronger attention alone eliminates drift.

The principal stability and tradeoff values are graphical rather than supplied as a complete numeric table. The paper's plot caption refers to MMLU “performance drop around … 0.5” without an unambiguous unit in the text; this dossier does not interpret that as 0.5 percentage points or a 50% loss. No broad inference-latency or overhead benchmark supports the description of split-softmax as lightweight.

## Analyst Takeaways

1. **Probe a persistent contract after realistic histories.** A standard question at several depths separates history-conditioned adherence from changes in the questions themselves. Also stratify by instruction family, incoming content, and task quality rather than relying on a global average.
2. **Do not turn the observed eight rounds into a universal cutoff.** Self-chats, selected prompts, sampling, and older models define this experiment. Deployed human dialogs, tool traces, current models, and semantic policies require separate evidence.
3. **Treat stabilization as a constrained optimization problem.** More obedience can mean less useful generation. Match interventions on allowed task-quality loss and include context, computation, and latency costs; do not optimize fidelity in isolation.
4. **Separate persona persistence from persona accuracy.** [The role-label evaluation](/dossiers/personas-system-prompts-not-helpful.md) asks whether a persona improves factual answers, not whether a requested style persists. [The Persona Selection Model](/dossiers/persona-selection-model.md) proposes an account of training/context generalization; this drift benchmark does not establish that persona selection is its underlying mechanism.
5. **Keep attention evidence and behavioral guarantees distinct.** [Lost in the Middle](/dossiers/lost-in-the-middle-long-contexts.md) also separates nominal context availability from effective use, but tests evidence location rather than multi-turn adherence. Neither attention mass nor persistent visibility establishes authorization or a security boundary.
6. **Repetition interventions are not interchangeable.** [Full-input repetition](/dossiers/prompt-repetition-non-reasoning-llms.md) duplicates a one-shot query to improve answer-only accuracy; this study renews persistent instructions across turns. [Prompt Cache Stability](/vault/prompt-cache-stability.md) addresses prefix reuse economics, not persistence of instruction authority.

## Questions and Limitations

- The simulated interlocutor shares the agent's model, and some probes are purposefully challenging. How well do the curves predict naturally occurring human conversations, neutral task work, or adversarial histories?
- Deterministic scoring avoids proprietary model judges, but language confidence and handcrafted checks still define a narrow operational notion of adherence. They do not measure all semantic policies or useful completion of the conversation's task.
- The mitigation sample is five selected instructions, not the whole 100-instruction inventory, and one model. Category representatives can hide within-category failures.
- The geometric theory and attention traces motivate an intervention but do not exclude template effects, imitation, training distributions, or other causes. The conclusion's stronger claim of a fundamental training/deployment mismatch goes beyond causal identification in the experiments.
- Increasing attention to a system prompt cannot resolve contradictory or harmful instructions and is not an external enforcement mechanism. Security outcomes need direct adversarial and action-level tests.

## Vault Ideas Extracted

* [Repeated-Input Contextualization](/vault/repeated-input-contextualization.md)
* [History-Conditioned Instruction Stability](/vault/history-conditioned-instruction-stability.md)
