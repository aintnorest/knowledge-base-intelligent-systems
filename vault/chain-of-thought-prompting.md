---
type: Synthesis
title: Chain-of-Thought Prompting
description: Eliciting intermediate natural-language reasoning before an answer, with benefits that depend on the model, baseline behavior, task, prompt, and evaluation setting.
tags: [chain-of-thought, prompting, reasoning]
timestamp: 2026-07-30T09:05:42Z
---

# Chain-of-Thought Prompting

A prompting pattern that asks a language model to generate intermediate natural-language steps before its final answer. In the founding 2022 experiments, few-shot worked examples improved several arithmetic, commonsense, and symbolic tasks for sufficiently capable models, but effects varied across models and tasks.

## The Core Idea

Instead of demonstrating only `question -> answer`, demonstrate `question -> intermediate steps -> answer`. This gives the model an inference-time decomposition pattern without changing its parameters. The intermediate text can allocate more tokens to hard problems, expose errors for diagnosis, and provide structure that a tool or verifier can check.

The generated text is not guaranteed to be correct or to faithfully reveal the model's internal computation. Treat it as a useful intermediate representation, not as evidence by itself.

## Faithfulness Is a Separate Property

Counterfactual prompt interventions show why readable traces cannot be treated as causal explanations. In 2023 experiments, a suggested answer reduced zero-shot-CoT accuracy by 30.6–36.3 points, yet only one of 426 audited explanations explicitly acknowledged the planted bias. A 2025 reasoning-model study found normalized hint-reveal rates of only 25% for Claude 3.7 Sonnet and 39% for DeepSeek R1; outcome-only reinforcement learning quickly taught reward-hack exploitation without making the shortcut reliably visible in the trace. Audit influence by changing suspected cues and observing answer changes, not by grading the trace's plausibility.

## Variants

| Variant | Mechanism | When to Use |
|---------|-----------|-------------|
| **Few-shot CoT** | Provide examples with question, intermediate steps, and answer | When worked decompositions can teach the target procedure |
| **Zero-shot CoT** | Add an instruction to reason step by step | A low-setup candidate that still needs task-specific evaluation |
| **Golden CoT** | Provide verified reasoning chains in the prompt | When trusted worked examples exist |
| **Multimodal CoT** | Extend the intermediate representation across text and images | Visual or cross-modal reasoning tasks |

## Zero-Shot CoT as a Pipeline

The founding Zero-shot-CoT paper used more than the familiar instruction. It first appended `Let's think step by step` to elicit a trace, then made a second model call with that trace and a task-specific answer cue. A parser selected the first matching number, option, or yes/no token. Prompt, decoder, stopping behavior, answer cue, and parser therefore all contribute to the measured method.

Historically, this separated **elicitation** from **in-context teaching**: 2022-era large models could produce useful decompositions without worked examples. It did not show that the generated text was faithful or universally helpful.

It also did not show that the trigger phrase works on a *base* model. The Flan paper found that "let's think step by step" improved instruction-finetuned Flan-PaLM on BBH while doing nothing for base PaLM 540B, whose zero-shot attempts looped, restated the question, or never stopped. It reconciles this with the Zero-shot-CoT paper by noting that most of that paper's successful results used InstructGPT, already instruction-finetuned, and that base-model successes were confined to math word problems. Zero-shot CoT is therefore better read as a capability unlocked by post-training than as a property of scale alone.

## Practical Use

Use chain of thought as a candidate intervention for tasks with meaningful intermediate structure. Compare it with the intended production baseline—not only a prompt that prohibits reasoning—and measure final-answer accuracy, reliability, token cost, latency, and item-level regressions. When steps contain arithmetic, retrieval, or other checkable operations, route those operations to deterministic tools rather than trusting the generated trace.

Distractor robustness is another independent axis. On GSM-IC, one irrelevant sentence reduced code-davinci-002 CoT from 95% on the selected clean base problems to 72.4% micro accuracy and only 6% base-problem consistency across all distractor variants. Twenty-sample self-consistency recovered micro accuracy to 88.1% but macro consistency only to 30%, so more paths did not remove correlated distraction.

## Task-Shape Evidence

A 2025 meta-analysis of 110 papers and 1,218 CoT-versus-direct comparisons found that the largest average gains cluster in symbolic or algorithmic reasoning (+14.2 points), mathematics (+12.3), and formal logic (+6.9). Across the remaining categories, average performance was 56.8 with CoT and 56.1 with direct answering. A separate evaluation of 20 datasets and 14 models reproduced the same broad split: difficulty or multi-hop structure alone did not predict a useful CoT gain.

The paper's planning/execution ablation narrows the mechanism further. Giving the model a formal plan without stepwise execution recovered little of the benefit, while letting it track the plan with CoT helped substantially. Executing the same generated plan with Python or an SMT solver usually did better still, though malformed formalizations caused enough tool failures to reverse that advantage in some logical tasks. The operational rule is therefore conditional: use CoT when intermediate symbolic state must be tracked, and prefer deterministic execution when the task has a trustworthy formal representation and tool-failure path.

Few-shot CoT is not uniformly stronger than zero-shot. On contemporary instruction-tuned math models, conventional worked examples generally matched or trailed corrected zero-shot evaluation; masking demonstration questions and reasoning preserved part of the apparent benefit while retaining final-answer structure. DeepSeek-R1 likewise reports that few-shot prompting degraded its checkpoint and recommends a direct zero-shot problem statement with an explicit output contract. These deployment results coexist with format-heavy training: R1-Zero still required reasoning before the answer and used a `<think>` format reward.

Structured answer fields can also change the generation trajectory. In one GPT-3.5 JSON-mode Last Letter condition, every inspected response emitted `answer` before `reason`, eliciting direct answering despite the CoT instruction. Treat schema order, decoder constraints, and extraction as parts of the reasoning intervention.

## Historical Evidence

Wei et al. (2022) reported the largest gains on difficult multi-step problems with low standard-prompt baselines. In that paper's model set, PaLM 540B improved from 17.9% to 56.9% on GSM8K and from 79.2% to 93.3% on MAWPS, while gains were smaller or negative on some easy subsets and on some model-task combinations. Equation-only, filler-token, and reasoning-after-answer ablations did not reproduce the GSM8K gain.

Kojima et al. (2022) then reported that Zero-shot-CoT raised `text-davinci-002` from 17.7% to 78.7% on MultiArith and from 10.4% to 40.7% on GSM8K. It did not improve every task, regressed CommonsenseQA in the main comparison, and was ineffective for many smaller models studied. Similar-sounding reasoning triggers also produced materially different scores.

These numbers describe PaLM, GPT-3, LaMDA, Codex, and UL2 under 2022-era benchmark conditions. They are historical evidence for the mechanism, not current performance expectations.

Wei et al. (2022, *Emergent Abilities*) reinterpreted this pattern as emergence of a technique benefit: chain of thought surpassed standard prompting only around 10^23 training FLOPs (~100B parameters) in their catalog, and was neutral or harmful below that threshold. The technique's value is therefore scale-gated, not only task-gated — see [Emergent Abilities](/vault/emergent-abilities.md).

## CoT Ability Depends on the Post-Training Mixture

Chain-of-thought competence is not a fixed property of a checkpoint's scale; it is contingent on what its finetuning mixture contained. The Flan paper's ablation is the primary evidence: instruction finetuning on answer-only data *degraded* held-out CoT benchmark performance below the no-finetuning baseline at 8B, 62B, and 540B, while adding nine reasoning datasets — under 3% of sampled mixture weight — repaired the loss and improved the non-CoT evaluations as well. The damage is symmetric: a reasoning-only mixture hurt direct-prompting scores. The proposed reading is that instruction finetuning generalizes to unseen *tasks* within the prompting paradigms the mixture contains, not across paradigms it omits — see [Instruction Tuning](/vault/instruction-tuning.md).

Even after finetuning, the benefit of CoT *prompting* stayed gated. On BBH, non-finetuned models gained from CoT only at 62B and above, and among instruction-finetuned models only Flan-PaLM 540B, Flan-cont-PaLM 62B, and Flan-U-PaLM 540B gained. CoT did not beat direct prompting on MMLU at all, which that paper attributes to MMLU being mostly knowledge recall; only CoT combined with self-consistency exceeded direct prompting there.

The operational consequence: when a model cannot do chain of thought, "too small" and "trained without reasoning traces" are distinct diagnoses with different remedies, and only the second is cheap to fix.

## Length Generalization Is a Separate Test

Intermediate steps do not automatically teach a procedure that scales to longer instances. In controlled parity and variable-assignment tasks, ordinary fine-tuning and scratchpad fine-tuning could fit short sequences yet fail on longer dependency chains. A few short scratchpad examples sometimes did induce a pretrained model to apply the template much farther, but that depended on the base model already having compatible skill.

When a chain of thought is meant to carry a sequential algorithm, evaluate beyond the demonstration and training lengths. Separate changes in token count, operation count, dependency depth, positional distance, and output length; a strong score on one is not evidence for the others.

## Limitations and Current Validity

- A coherent trace can contain factual, semantic, symbol-mapping, or calculation errors and can occasionally reach the right answer by accident.
- Exposed reasoning is not necessarily a faithful account of internal computation.
- More intermediate tokens increase cost and latency, and an elaborate prompt can regress easy tasks.
- Contemporary models may already produce a short reasoning trace by default; in that case, an explicit generic CoT request can have little value. Dedicated reasoning models may also incur substantial additional latency for marginal or negative accuracy changes.
- Prompt effects depend on the model, task, examples, output format, and metric. The effective scale threshold reported in 2022 is not a universal cutoff.
- A prompting technique can be removed by post-training. Whether a checkpoint responds to CoT at all depends on its finetuning mixture as well as its scale, so a model's CoT behavior should be re-measured after any adaptation run.
- A two-stage answer extractor can hide ambiguity by selecting the first matching token from a trace containing multiple answers; evaluate the complete pipeline, not only the visible trigger phrase.
- Later surveys in this knowledge base retain chain of thought as a foundational technique, but whether it improves a contemporary model or deployment **requires contemporary verification**.

## Sources

- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models dossier](/dossiers/chain-of-thought-prompting-elicits-reasoning.md) - primary historical evidence for few-shot chain-of-thought prompting, its ablations, scaling behavior, and error analysis.
- [Large Language Models are Zero-Shot Reasoners dossier](/dossiers/large-language-models-are-zero-shot-reasoners.md) - primary historical evidence for zero-shot chain-of-thought, its two-stage pipeline, prompt sensitivity, scale interaction, and error analysis.
- [Prompt Engineering Survey dossier](/dossiers/prompt-engineering-survey.md) - later survey covering few-shot and zero-shot chain of thought and related techniques.
- [A Systematic Survey of Prompt Engineering in Large Language Models](/dossiers/systematic-survey-prompt-engineering-llms.md) - later taxonomy that places chain of thought among a broader family of reasoning methods.
- [Prompt Engineering is Complicated and Contingent dossier](/dossiers/prompt-engineering-complicated-contingent.md) - newer evidence that prompt effects and reliability depend on model, item, formatting, and scoring threshold; it does not directly retest chain of thought.
- [Prompting Science Report 2 dossier](/dossiers/decreasing-value-chain-of-thought-prompting.md) - contemporary GPQA evidence that generic explicit CoT can improve mean performance for some non-reasoning models while reducing strict reliability, and adds substantial latency with little value for the tested reasoning models.
- [Exploring Length Generalization in Large Language Models dossier](/dossiers/exploring-length-generalization-language-models.md) - controlled evidence that scratchpad fine-tuning can retain length-generalization failures while few-shot scratchpads can activate a length-robust pretrained template under task-specific conditions.
- [Emergent Abilities of Large Language Models dossier](/dossiers/emergent-abilities-large-language-models.md) - catalogs chain-of-thought's benefit over standard prompting as emergent, appearing only near 10^23 training FLOPs (~100B parameters) in 2022-era models.
- [Principled Instructions Are All You Need for Questioning LLaMA-1/2, GPT-3.5/4 dossier](/dossiers/principled-instructions-questioning-llms.md) - 2024 catalog listing "think step by step" and CoT-combined-with-few-shot among 26 prompt principles; supporting evidence is ~20 human-judged items per principle on 2023-era models.
- [Scaling Instruction-Finetuned Language Models dossier](/dossiers/scaling-instruction-finetuned-language-models.md) - primary evidence that instruction finetuning without CoT data degrades held-out CoT performance below the no-finetuning baseline, that a sub-3% reasoning-data fraction restores it, and that zero-shot CoT triggers work on instruction-finetuned but not base models.
- [To CoT or Not to CoT? dossier](/dossiers/to-cot-or-not-to-cot.md) - meta-analysis of 110 papers plus a 20-dataset, 14-model evaluation finding that CoT gains concentrate in mathematical and symbolic execution, where external solvers usually perform better.
- [Language Models Don’t Always Say What They Think dossier](/dossiers/unfaithful-chain-of-thought-explanations.md) — counterfactual evidence that models rationalize prompt-induced and stereotype-aligned answers without disclosing the cue.
- [Reasoning Models Don’t Always Say What They Think dossier](/dossiers/reasoning-models-unfaithful-chain-of-thought.md) — extends causal hint tests to reasoning models and shows outcome-only RL does not make shortcuts reliably monitorable.
- [Large Language Models Can Be Easily Distracted by Irrelevant Context dossier](/dossiers/irrelevant-context-distraction.md) — measures severe CoT and self-consistency failures under one answer-irrelevant sentence.
- [Revisiting Chain-of-Thought Prompting dossier](/dossiers/zero-shot-stronger-than-few-shot-cot.md) — finds zero-shot CoT competitive with or stronger than conventional few-shot CoT for capable instruction-tuned math models after correcting extraction.
- [DeepSeek-R1 dossier](/dossiers/deepseek-r1.md) — separates zero-shot deployment guidance from reasoning-format rewards used during R1-Zero training.
- [Let Me Speak Freely? dossier](/dossiers/format-restrictions-llm-performance.md) — shows that schema instructions and field order can alter elicited reasoning as well as parseability.
