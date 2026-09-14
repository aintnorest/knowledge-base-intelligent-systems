---
type: Study Note
title: "Let Me Speak Freely? A Study on the Impact of Format Restrictions on Performance of Large Language Models"
description: "Study notes on an EMNLP Industry evaluation of natural-language, schema-prompted, JSON-mode, and two-stage structured generation, including its task-dependent results and the methodological dispute over prompts, decoding, and answer extraction."
resource: https://aclanthology.org/2024.emnlp-industry.91/
source: /archive/format-restrictions-llm-performance.pdf
tags: [prompting, reasoning, evaluation, reliability]
timestamp: 2026-09-14T17:12:00Z
---

# Let Me Speak Freely? A Study on the Impact of Format Restrictions on Performance of Large Language Models — Study Notes

**Authors**: Zhi Rui Tam, Cheng-Kuang Wu, Yi-Lin Tsai, Chieh-Yen Lin, Hung-yi Lee, Yun-Nung Chen  
**Venue**: EMNLP 2024 Industry Track, pages 1218–1236  
**DOI**: [10.18653/v1/2024.emnlp-industry.91](https://doi.org/10.18653/v1/2024.emnlp-industry.91)  
**Revision**: arXiv:2408.02442v3, October 14, 2024  
**Code and results**: https://github.com/appier-research/structure-gen

## What It Is

This paper asks whether making an LLM produce a machine-readable response changes the correctness of the content inside that response. It compares unrestricted natural-language answers with three increasingly decoupled ways to obtain structured output, primarily on reasoning and classification benchmarks. Its headline finding is conditional rather than universal: tighter restrictions often coincide with lower scores on the tested reasoning tasks, while structured output is competitive or beneficial on several classification tasks.

The practical question is important because an application needs both a correct answer and a dependable interface. The paper's strongest contribution is showing that schema, field order, decoder behavior, prompt wording, answer extraction, task, and model can interact. Its causal claim—that restriction itself degrades reasoning—is disputed by a later reproduction and rebuttal. The evidence should therefore be used as a warning to evaluate the complete answer pipeline, not as a settled rule against structured output.

## Structured-Generation Conditions

The study defines four main conditions, ordered from most to least restrictive:

1. **Constrained decoding / JSON-mode** limits the allowed token space so that output is valid JSON. For hosted APIs the authors infer that the mechanism resembles grammar- or automata-based constrained decoding; implementation details are not available to them.
2. **Format-restricting instructions (FRI)** ask the model to follow a supplied JSON, XML, or YAML schema but do not enforce validity at decoding time.
3. **NL-to-Format** first obtains a natural-language answer, then makes a second model call to convert that response into the target schema. This separates content generation from serialization.
4. **Natural language (NL)** requests reasoning and a final answer in text and serves as the least constrained baseline.

Most structured schemas contain only two fields, one for reasoning and one for the final answer. Field names and wording vary, such as `reason`, `reasoning`, or `step_by_step_reasoning`. Direct-answer prompts use only an answer field. This simplicity helps isolate the tested interaction, but it does not represent deeply nested production schemas, unions, optional fields, or long tool arguments.

## Tasks, Models, and Evaluation Setup

The main evaluation uses three reasoning-oriented tasks:

- **GSM8K** for grade-school mathematical reasoning;
- **Last Letter Concatenation** for symbolic string manipulation;
- **Shuffled Objects** for tracking state through a sequence of swaps.

Four classification tasks broaden the comparison: **DDXPlus** medical diagnosis, **MultiFin** financial topic classification, **Sports Understanding** plausibility classification, and **Natural Instructions Task 280** stereotype-category classification. Accuracy is used for classification and Shuffled Objects; exact match is used for GSM8K and Last Letter after extracting the final answer.

The five primary models are GPT-3.5-Turbo-0125, Claude-3-Haiku-20240307, Gemini-1.5-Flash, Llama-3-8B-Instruct, and Gemma-2-9B-Instruct. Open models are served through Hugging Face Text Generation Inference for JSON-mode support. Appendix experiments add Mistral-7B-v0.3 and GPT-4o-mini-2024; a separate experiment tests GPT-4o-mini-2024-07-18 with OpenAI's newer JSON Schema structured-output API.

Prompt sensitivity is not ignored. The authors combine three task-description variants with three answer-format/schema variants, producing nine prompt combinations for each evaluated setting. Reasoning prompts include a zero-shot “think step-by-step” instruction. Scores are reported with variation across these prompt combinations rather than relying on a single template. However, changing from NL to a structured condition also changes the response instruction and sometimes its examples, so this is not a fully controlled same-prompt decoder ablation.

## Reported Performance Effects

### Reasoning tasks

In the paper's main comparison, the typical ordering is JSON-mode below schema-only FRI, then NL-to-Format, then unrestricted NL. The authors interpret this as a restriction gradient: forcing validity during generation interferes more than asking for a schema, while serializing an already generated natural-language answer usually preserves its correctness.

The averages are substantially heterogeneous rather than uniformly negative. In the zero-shot format comparison, Gemini-1.5-Flash scores 89.3 on GSM8K in text and 89.2 in JSON, while its Last Letter score rises from 65.4 in text to 77.0 in JSON. By contrast, GPT-3.5-Turbo falls on GSM8K from 76.6 in text to 49.3 in JSON and on Last Letter from 56.7 to 25.2. Gemma-2-9B is comparatively stable on GSM8K (86.5 text, 84.2 JSON) but much less so on Last Letter (56.8 text, 39.0 JSON). Model, task, and format interact strongly enough that “JSON hurts reasoning” is too coarse a deployment rule.

A revealing failure occurs in GPT-3.5-Turbo JSON-mode on Last Letter: every inspected response places the `answer` key before the `reason` key. The model therefore answers before producing the requested chain of thought, which the authors associate with the severe score drop. This shows that field order can alter the generation trajectory, but it does not by itself establish whether the cause is constrained decoding, an underspecified schema, the API's treatment of object order, or the prompt.

NL-to-Format closely tracks NL for most models because both begin with the same free-form answer. It can still introduce conversion errors, as observed for Llama-3-8B-Instruct. The method trades another model call, latency, and a new failure surface for a cleaner separation between solving and serialization.

### Classification tasks

Classification does not follow the reasoning-task headline. JSON-mode is often competitive and sometimes substantially better, especially on DDXPlus. In the zero-shot format table, Gemini's DDXPlus accuracy rises from 41.6 in text to 60.3 in JSON; GPT-3.5 rises from 44.1 to 55.5; and Gemma-2-9B rises from 22.9 to 53.0. The paper hypothesizes that a restricted answer space suppresses distracting or invalid alternatives. Other model–task pairs are flat or regress, so the evidence supports task dependence rather than a general structured-output benefit.

### Does stricter always mean worse?

No. The broad trend is clearest for selected reasoning configurations, not a monotonic law. On GSM8K, adding an explicit schema causes large drops for some model/format pairs—for Claude Haiku, loose JSON scores 87.0 while schema-constrained JSON scores 23.4—but Gemini changes only from 89.7 to 89.2. GPT-3.5's schema-constrained YAML score (73.9) exceeds its loose YAML score (71.6), even though its constrained JSON and XML scores fall sharply. Looser format-only instructions generally improve mean performance and reduce prompt variance, but exceptions are material.

The newer GPT-4o-mini JSON Schema experiment also complicates a simple strictness story. NL is highest on GSM8K (94.57 versus 91.71 for JSON Schema) and narrowly highest on Shuffled Objects (82.85 versus 81.77), while JSON Schema is highest on Last Letter (86.07 versus 83.11 for NL). JSON Schema beats the older JSON-mode condition on all three of those tasks. “Strictness” is therefore inseparable here from the quality and implementation of the constrained decoder.

## Answer Extraction and Parsing

The evaluation deliberately separates malformed structure from answer correctness. Rather than score free-form output with one brittle regular expression, the authors use Claude-3-Haiku to extract final answers. They first compare GPT-4-Turbo extraction with human parsing on 300 sampled responses—100 each from Last Letter, Shuffled Objects, and GSM8K—and report 97.7% agreement overall (97%, 96%, and 100% by task). Against GPT-4-Turbo as the reference on 1,200 natural-language samples, Claude Haiku has the highest reported agreement among lower-cost candidates, with Cohen's kappa of 0.86.

Extractor choice changes measured accuracy dramatically. On GSM8K, the paper reports regex versus LLM-extracted scores of 43.7 versus 75.5 for GPT-3.5, 25.8 versus 69.3 for Gemini Flash, 67.4 versus 85.8 for Claude Haiku, and 10.4 versus 52.4 for Mistral-7B. These are not capability gains; they show that a narrow textual cue can discard semantically recoverable answers.

The paper also measures syntax/parse failures separately. Gemini Flash and GPT-3.5 have near-zero structural parsing failures across many formats even where task accuracy changes, which argues against malformed output as the sole explanation. Llama and Claude have high failure rates in particular task/format pairs. A second reformatting call repairs many invalid JSON/YAML/XML outputs, but it adds cost and can only repair representation errors, not wrong answers.

Calling the extractor a “perfect text parser” overstates the validation: 97.7% is strong but not perfect, the manual sample covers only three short-answer tasks, and Claude is selected by agreement with GPT-4 rather than by direct human labels on the full evaluation. The extractor is part of the measured system and should be versioned and reported as such.

## The Later Rebuttal and the Unresolved Controversy

A 2026 .txt/Outlines article, [Say What You Mean: A Response to 'Let Me Speak Freely'](/dossiers/say-what-you-mean-structured-output.md), directly challenges the paper's causal interpretation. It identifies several plausible confounds:

- **The structured and unstructured runs do not hold the prompt constant.** Their instructions, response templates, and examples differ, so a score difference can reflect prompting rather than token-level constraints.
- **Some recorded JSON-mode prompts appear underspecified.** One Last Letter prompt says “You must use the tool” without naming a tool, JSON, or a schema. The rebuttal also argues that Llama-3-Instruct should be run through its native chat template.
- **A one-shot demonstration uses two names while evaluated items use four.** The rebuttal replaces it with a four-name example, changing a second variable while improving the baseline.
- **JSON-mode is treated as a synonym for structured generation.** The rebuttal instead defines structured generation as enforcing the same language accepted by the response parser, including regex/grammar constraints that need not be JSON.
- **The LLM extractor benefits malformed natural-language answers.** On one recorded Last Letter slice, the rebuttal reports 35% for a strict regex, 57% for the paper's AI parser, and 61% for a hand-expanded regex, disputing the word “perfect” and showing that extraction policy can move the baseline.

Using Llama-3-8B-Instruct and revised, matched prompts, the rebuttal reports small structured-output gains on the three highlighted reasoning tasks: 0.77 to 0.78 on GSM8K, 0.73 to 0.77 on Last Letter, and 0.41 to 0.44 on Shuffled Objects. Its same-prompt JSON comparison reports 0.68 for natural-language-shaped constrained output, 0.73 for unconstrained JSON, and 0.77 for constrained JSON.

Those results are a substantive challenge, not a final resolution. The rebuttal changes prompt quality, demonstration shape, chat templating, and constraint implementation; focuses mainly on one model and three tasks; and is written by a structured-generation vendor using its own Outlines stack. Conversely, the paper's multi-model and multi-format breadth does not remove its apples-to-oranges prompt comparisons or ambiguity about hosted JSON-mode implementations. The fair conclusion is that the original benchmark demonstrates severe pipeline sensitivity, while the narrower claim that format restriction itself causes the losses remains contested.

## Analyst Takeaways

1. **Evaluate the solver–serializer–extractor composition.** A model can reason correctly and serialize badly, serialize perfectly and reason badly, or be scored badly by the extractor. Report content errors, schema failures, and extraction failures separately.
2. **Do not use “structured output” as one treatment.** Schema instructions, JSON validity mode, CFG-constrained decoding, regex decoding, tool calling, and post-hoc conversion impose different token spaces and prompt contracts.
3. **Hold semantic instructions and demonstrations fixed when testing a decoder.** If a format condition requires prompt changes, run crossed ablations so prompt, schema, key order, and decoder effects can be estimated separately.
4. **Treat field order as generation control.** Putting `answer` before `reasoning` may elicit direct answering even when the task prompt asks for chain of thought. Order fields according to the computation you want, then test rather than assume.
5. **Use the lightest constraint that meets the interface requirement—but benchmark it.** Two-pass NL-to-Format is a useful diagnostic and sometimes a mitigation, not a free default; it doubles calls and can corrupt correct content during conversion.
6. **Scope claims to model and task.** The paper itself contains reasoning regressions, classification gains, and near-neutral cases. Aggregate slogans erase the actionable result: output contracts are model-, task-, prompt-, and implementation-contingent.

## Questions and Limitations

- The primary models are mostly economical 2024-era systems; larger contemporary models, reasoning models, and current structured-output APIs may behave differently.
- The study uses simple one- or two-field outputs. It does not establish how restriction depth, nesting, enums, optional fields, or long schemas affect performance.
- Hosted JSON-mode implementations are opaque, and the paper assumes similarity to published constrained-decoding methods. Results cannot identify a decoder-level mechanism without implementation control.
- Nine prompt combinations expose sensitivity but do not isolate it: structured and natural-language conditions still contain different surface instructions and examples.
- The answer extractor is highly accurate on a small human-checked sample, not perfect. Its cost, version drift, and disagreements are additional evaluation variables.
- Exact match and short-label accuracy cover only narrow outputs. Long-form generation, code, tool arguments, multilingual tasks, and safety-critical decisions are outside scope.
- The paper alternates between describing six and seven datasets. Its core task list contains seven, while some appendix cost and parser summaries cover six and omit Shuffled Objects; denominators must be checked table by table.
- The “stricter means worse” relationship contains multiple counterexamples and should be reported as a tendency in selected reasoning settings, not a universal monotonic effect.
- Neither the paper nor the rebuttal cleanly isolates every variable across the full model × task × format matrix. The dispute remains an empirical design problem rather than a settled verdict.

## Vault Ideas Extracted

* [Answer Engineering](/vault/answer-engineering.md)
* [Prompt Contingency](/vault/prompt-contingency.md)
* [Chain-of-Thought Prompting](/vault/chain-of-thought-prompting.md)
