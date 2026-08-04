---
type: Study Note
title: Large Language Models are Zero-Shot Reasoners
description: Historical study notes on Zero-shot-CoT, a two-stage prompting method that elicited stepwise reasoning from 2022-era large language models without worked examples.
resource: https://arxiv.org/abs/2205.11916v4
source: /archive/large-language-models-are-zero-shot-reasoners.pdf
tags: [chain-of-thought, prompting, reasoning]
timestamp: 2026-07-12T22:29:57Z
---

# Large Language Models are Zero-Shot Reasoners - Study Notes

**Authors**: Takeshi Kojima, Shixiang Shane Gu, Machel Reid, Yutaka Matsuo, Yusuke Iwasawa  
**Venue**: NeurIPS 2022; arXiv:2205.11916 [cs.CL]  
**Publication date**: May 24, 2022 (arXiv v1); published at NeurIPS 2022  
**Version date**: January 29, 2023 (v4)  
**Pages**: 42

## What It Is

This paper introduces **Zero-shot Chain-of-Thought (Zero-shot-CoT)**: append an instruction such as `Let's think step by step` to a question so that a language model generates an intermediate reasoning trace before producing its final answer. Unlike the few-shot chain-of-thought method published earlier in 2022, it does not require task-specific worked examples.

The full method is a two-stage pipeline rather than a single suffix. The first model call generates reasoning. A second call receives the question and generated trace plus an answer-format instruction such as `Therefore, the answer (arabic numerals) is`, after which a task-specific parser extracts the first matching number, option, or yes/no token.

## Why It Mattered in 2022

Few-shot chain-of-thought had shown that worked rationales could unlock multi-step reasoning in very large models, but that result left open whether the examples taught the task or merely elicited a capability the model already had. This paper's important move was to remove demonstrations and show that one short, task-agnostic instruction could produce large gains across several reasoning task families.

That made intermediate reasoning a broadly accessible inference-time control rather than a recipe dependent on hand-written exemplars. It also established a deliberately minimal zero-shot baseline and encouraged researchers to probe latent model behavior before investing in fine-tuning data or task-specific prompt construction.

The historical novelty is narrower than the title's broad claim. The work demonstrated a useful elicitation effect in particular large language models and benchmarks; it did not prove general reasoning ability, faithful explanations, or a universal prompt.

## Method

### Stage 1: Reasoning Extraction

The input is formatted as `Q: [question]. A: Let's think step by step.` The model then greedily generates an intermediate text. The trigger is fixed across arithmetic, commonsense, symbolic, date, and object-tracking tasks.

### Stage 2: Answer Extraction

The question, trigger, and generated reasoning are concatenated with a format-specific cue. Numeric tasks request Arabic numerals; multiple-choice tasks request a letter from the available range; binary tasks request yes or no. The parser selects the first output span matching the expected format.

This distinction is operationally important. The paper's reported method includes both the reasoning trigger and a second model invocation with answer cleansing. Simply appending the famous phrase is not a complete reproduction of the experiment.

## Experimental Scope

- **Models**: original GPT-3 from 0.3B to 175B parameters; InstructGPT `text-ada/babbage/curie/davinci-001` and `text-davinci-002`; PaLM 8B, 62B, and 540B; plus GPT-2 1.5B, GPT-Neo 2.7B, GPT-J 6B, T0 11B, and OPT 13B in the scale study.
- **Arithmetic**: SingleEq, AddSub, MultiArith, GSM8K, AQUA-RAT, and SVAMP.
- **Commonsense**: CommonsenseQA and StrategyQA.
- **Symbolic and logical**: synthetic Last Letter and Coin Flip tasks, BIG-bench Date Understanding, and Tracking Shuffled Objects.
- **Decoding**: greedy decoding in the main experiments. PaLM self-consistency with 40 sampled paths appears in an additional experiment.
- **Timing**: the OpenAI API experiments were mainly run from April through May 2022, with some template tests in August 2022.

## Results in Historical Context

These figures describe the paper's models, prompts, parsers, datasets, and 2022 evaluation conditions. They are not current performance estimates.

- With `text-davinci-002`, Zero-shot-CoT raised MultiArith accuracy from 17.7% to 78.7% and GSM8K from 10.4% to 40.7%. Eight-example few-shot CoT remained higher at 93.0% and 48.7%, respectively.
- With PaLM 540B, it raised MultiArith from 25.5% to 66.1% and GSM8K from 12.5% to 43.0%. Combining it with 40-path self-consistency reached 89.0% and 70.1%.
- Large gains also appeared on Last Letter, Coin Flip, Date Understanding, and Tracking Shuffled Objects with `text-davinci-002`.
- It did not consistently help tasks that needed little multi-step decomposition: SingleEq and AddSub changed only modestly. CommonsenseQA decreased from 68.8% to 64.6%, while StrategyQA improved strongly under the authors' format-specific extraction setup.
- The effect appeared mainly in the largest model variants studied. It did not help GPT-2, GPT-Neo, GPT-J, T0, OPT 13B, or the smaller original and instruction-tuned GPT-3 variants on MultiArith.

The scale result is useful evidence of an interaction between prompting and model capability, not evidence for a permanent parameter threshold. Model family, instruction tuning, data, task, decoding, and answer extraction were all entangled with parameter count.

## What the Prompt Study Showed

On MultiArith with `text-davinci-002`, several instructions encouraging decomposition improved over the 17.7% direct baseline: `Let's think step by step` reached 78.7%, `First,` 77.3%, and `Let's think about this logically` 74.5%. However, seemingly similar instructions varied substantially, while misleading or irrelevant phrases stayed near or below the baseline.

The durable lesson is not that one exact incantation always works. It is that natural-language instructions can select different output procedures, and that semantically related prompts can still produce materially different results. The prompt must therefore be treated as an experimental intervention.

The cross-task few-shot comparison reinforces that conclusion. Reasoning examples from an unrelated domain helped less, especially when their answer format differed from the target. Zero-shot-CoT avoided demonstration construction, but the second-stage answer prompt and parser were still task-specific.

## Error Analysis

The appendices show why a generated trace is not automatically reliable:

- On sampled correct CommonsenseQA predictions, 22% had an incorrect or non-unique reasoning trace despite the parser selecting the correct first option.
- Among sampled incorrect CommonsenseQA outputs, commonsense mistakes dominated; the prose could remain flexible and locally plausible while choosing the wrong answer.
- On sampled MultiArith errors, Zero-shot-CoT often added an unnecessary operation after reaching a correct intermediate result, misunderstood the question, or failed to begin useful reasoning.
- The answer parser could hide ambiguity by taking the first number or option from an output containing multiple candidates.
- PaLM sometimes answered correctly without CoT and incorrectly with it; on GSM8K this occurred for 4.8% of the evaluated examples.

These observations support using the trace as a debuggable intermediate artifact, not as proof of correctness or a faithful description of internal computation.

## Limitations

- The headline results depend on 2022-era proprietary models, fixed benchmarks, greedy decoding, prompt wording, task-specific answer cues, and brittle first-match parsing.
- The experiments ran each deterministic condition once and did not report uncertainty across prompt paraphrases, API revisions, or broader item sampling.
- Training-data details for GPT-3, InstructGPT, and PaLM were incomplete, limiting contamination analysis and causal interpretation.
- The paper inferred broad cognitive capability from cross-task prompting, but benchmark accuracy and plausible text do not by themselves establish general reasoning.
- Generated steps can be wrong, unnecessarily long, biased, or accidentally aligned with a correct parsed answer. The two-call pipeline also adds latency and token cost.
- The method regressed some tasks and many individual items, so aggregate gains do not justify applying it universally.

## Analyst Takeaways

1. **Elicitation and learning are different hypotheses.** Removing demonstrations showed that some stepwise behavior could be elicited from model parameters without teaching a procedure in context.
2. **The complete interface matters.** Reasoning trigger, second-stage answer cue, decoder, stopping behavior, and parser jointly define the method and its measured score.
3. **Prompt effects are conditional.** Benefits varied sharply by model size, model family, task, wording, answer format, and item.
4. **Reasoning text needs verification.** A readable trace is valuable for inspection and tool routing, but it can rationalize, drift after a correct step, or be rescued by a permissive parser.
5. **Use a direct-answer control.** The paper's strongest design habit is the paired comparison: evaluate the reasoning intervention against the same model answering directly, including item-level regressions, cost, and latency.

## Current Validity

The durable concept is that a short instruction can elicit an intermediate problem-solving representation without worked examples, and that this representation can change final-answer performance. The paper also remains useful for its two-stage pipeline, direct-answer control, prompt-paraphrase study, scale interaction, and explicit examples where plausible reasoning fails.

Later surveys already in this knowledge base retain Zero-shot-CoT as a foundational chain-of-thought variant. The 2025 *Prompt Engineering is Complicated and Contingent* dossier also supplies newer, indirect evidence that prompt effects vary with model, item, formatting, and scoring threshold. That work does not directly retest Zero-shot-CoT, so it supports caution rather than a conclusion about the method's present effectiveness.

The reported performance of `text-davinci-002`, GPT-3, PaLM, GPT-2, GPT-Neo, GPT-J, T0, and OPT; the model-scale threshold; prompt ranking; benchmark state of the art; parser behavior; API advice; and cost/latency profile are model- and period-specific. Whether the exact phrase, exposed reasoning, or two-call answer extraction improves any contemporary model **requires contemporary verification**.

No source currently in this knowledge base establishes that Zero-shot-CoT is necessary, faithful, safe to expose, or preferable to direct answers, concise reasoning, tool use, or modern reasoning-model interfaces in a current deployment. That synthesis needs a recent evidence update. Current evaluation should measure answer quality, reliability, item-level regressions, token use, latency, privacy, and safety on the target model and task.

## Vault Ideas Extracted

* [Chain-of-Thought Prompting](/vault/chain-of-thought-prompting.md)

