---
type: Study Note
title: "Revisiting Chain-of-Thought Prompting: Zero-shot Can Be Stronger than Few-shot"
description: A controlled re-evaluation showing that worked chain-of-thought examples mostly enforce answer format rather than improve contemporary instruction-tuned models' mathematical reasoning, while still helping weaker models.
resource: https://aclanthology.org/2025.findings-emnlp.729/
source: /archive/zero-shot-stronger-than-few-shot-cot.pdf
tags: [chain-of-thought, in-context-learning, prompting, reasoning, evaluation]
timestamp: 2026-09-14T17:13:18Z
---

# Revisiting Chain-of-Thought Prompting: Zero-shot Can Be Stronger than Few-shot - Study Notes

**Authors**: Xiang Cheng, Chengyan Pan, Minjun Zhao, Deyang Li, Fangchao Liu, Xinyu Zhang, Xiao Zhang, Yong Liu  
**Venue**: Findings of the Association for Computational Linguistics: EMNLP 2025, pages 13533–13554  
**Identifiers**: [doi:10.18653/v1/2025.findings-emnlp.729](https://doi.org/10.18653/v1/2025.findings-emnlp.729); [arXiv:2506.14641v3](https://arxiv.org/abs/2506.14641v3)  
**Revision read**: January 8, 2026  
**Pages**: 22

## What It Is

This paper asks a narrower and more useful question than whether chain of thought works at all: once an instruction-tuned model can already reason well under a zero-shot step-by-step instruction, do worked chain-of-thought demonstrations teach it anything further? Across contemporary open models, the answer is usually no. Conventional demonstrations mostly teach the response shape expected by a brittle evaluator; after answer extraction is repaired, zero-shot CoT generally matches or beats few-shot CoT.

The conclusion is capability-conditional rather than a universal rejection of demonstrations. Older or genuinely weak models still gain from worked solutions. Better traces from Qwen2.5-Max or DeepSeek-R1 can outperform old hand-written exemplars and occasionally edge past zero-shot, but the gains are inconsistent and carry substantial context overhead. The paper's strongest practical contribution is therefore methodological: separate **reasoning correctness** from **format compliance** before crediting few-shot examples with improved reasoning.

## Scope and Experimental Design

The main experiments use instruction-tuned checkpoints only. The model pool includes Qwen2.5 from 0.5B through 72B parameters, LLaMA 3 variants from 1B through 70B, Gemma 2 at 2B and 9B, and Ministral-8B. Older LLaMA2-7B and Qwen-7B provide weak-model controls. The enhanced-exemplar and noise studies narrow the targets to Qwen2.5-7B, 14B, and 72B; the attention study narrows further to Qwen2.5-7B.

The core task scope is mathematical reasoning over the complete test sets of GSM8K (1,319 grade-school word problems) and MATH (5,000 high-school competition problems). OpenCompass runs inference through vLLM with greedy decoding. Unless noted otherwise, every condition includes the same instruction: `Please reason step by step, and put your final answer within \boxed{}.` The authors fix seed 42 but report no means or standard deviations because greedy decoding is deterministic under their hardware setup.

Base checkpoints are not the main population. Early runs on 1B–14B base models produced repetition, unsolicited questions, and other unstable output, so the authors switched to instruction-tuned variants. An appendix retains Qwen2.5-72B-Base as a partial check: it depends on examples more than the Instruct model and remains vulnerable to extraction bias.

## The Evaluation Bug Changes the Baseline

OpenCompass and similar GSM8K evaluators commonly take the **last number** in a response. Zero-shot models in this study often obey the explicit `\boxed{}` instruction but continue with prose containing other numbers. In the paper's example, the correct final answer is `\boxed{6}`, yet the extractor returns `12` from later text. Few-shot examples make outputs conform to the evaluator's expected ending, so an apparent accuracy gain can be nothing more than easier parsing.

The corrected evaluator prioritizes the number inside `\boxed{}`. On Qwen2.5-72B-Instruct, GSM8K rises from 91.58% under raw zero-shot extraction to 95.83% after the fix, narrowly above 8-shot's 95.75%. MATH, which does not use the same corrected-baseline distinction in Table 1, is 81.64% zero-shot versus 81.30% 8-shot. The corresponding base model scores are 84.69% raw zero-shot, 90.27% corrected zero-shot, and 90.52% 8-shot on GSM8K, showing both the extraction artifact and the base model's greater dependence on examples.

Ablations explain what the examples contribute. Replacing demonstration questions with `xxx` hurts less than also replacing their answers; retaining only a cue such as `So the answer is ...` still helps. Replacing questions, reasoning, and final-answer phrase removes the advantage and returns performance to the zero-shot baseline. The useful residue is the complete answer structure, not necessarily the demonstrated solution method.

## Conventional Exemplars

The conventional condition draws worked problems from each benchmark's training set. The authors test fixed 2-, 4-, 6-, and 8-shot prompts and seven selection strategies: Complexity, TopK similarity, Fast-VoteK, Random, DPP, MMR, and EXPLORA.

Across GSM8K and MATH, eight retrieved examples are generally comparable to or worse than corrected zero-shot for the stronger models, regardless of selector. Varying the shot count does not rescue the pattern. Complexity-selected 4- or 6-shot prompts sometimes gain about 0.2 accuracy points on GSM8K, but the paper treats that as experimental fluctuation; on harder MATH, nearly every retrieval configuration underperforms zero-shot. This is negative evidence against spending retrieval sophistication on conventional CoT once the target model already has strong zero-shot mathematical reasoning.

The weak-model comparison is the important boundary condition. LLaMA3.2-1B, LLaMA2-7B, and Qwen-7B improve materially with examples, while stronger small models such as LLaMA3.2-3B and Qwen2.5-1.5B already favor zero-shot. Worked traces can supply intermediate patterns a weak checkpoint cannot reliably generate itself; they become redundant, or even distracting, after those patterns have been internalized in pretraining and post-training.

## Enhanced Exemplars

The authors test the obvious counterargument that benchmark demonstrations are simply too easy or crude for current models. They replace the original solutions with traces generated by:

1. **Qwen2.5-Max**, a stronger general model, using 2, 4, 6, or 8 examples; and
2. **DeepSeek-R1**, a dedicated reasoning model that produces much longer traces, using 1–4 examples to limit context length.

Targets are Qwen2.5-7B, 14B, and 72B on GSM8K and MATH. Enhanced traces generally beat the conventional 8-shot condition, so demonstration quality is not irrelevant. They still do not produce a reliable advantage over the cheaper zero-shot prompt. Qwen2.5-72B with six Qwen-Max MATH demonstrations is an explicit exception that exceeds zero-shot, making the paper's absolute phrasing that enhanced exemplars “fail” stronger than its own plotted evidence. The defensible claim is that enhancement yields no consistent gain across target sizes, tasks, and shot counts.

The noise study further weakens a semantic-teaching explanation. The authors corrupt traditional 8-shot, Qwen-Max 8-shot, and R1 4-shot examples by replacing half the tokens with `XXX`, fully shuffling words, or replacing all words with `XXX`. Accuracy often remains close to the clean-example condition, especially for Qwen2.5-72B. Because the surrounding demonstration template and answer-format scaffolding remain, this shows that much of the **solution content** is dispensable; it does not show that every structural property of the exemplar block is irrelevant.

## Attention and Format-Alignment Analysis

For one randomly selected GSM8K case, the authors visualize Qwen2.5-7B self-attention under clean and corrupted few-shot prompts. The main figure uses head 0 in the final, 27th layer; appendices add all heads for that layer and head-averaged maps across layers, plus a MATH example. Raw weights are transformed by adding $10^{-7}$, taking logs, clipping to $[-15, 0]$, and rescaling to $[0, 1]$ so outliers do not wash out the plot.

Generated tokens place visibly little attention on the earlier exemplar region and much more on the instruction and target question. R1's single long trace receives slightly more attention than its all-`XXX` counterpart, but the difference does not translate into meaningful accuracy. This is consistent with the behavioral ablations: capable Qwen models rely primarily on the task prompt and their parameters, not the worked solutions.

The attention evidence should remain supporting evidence, not a mechanism proof. It covers one target model and selected examples; head 0 is highlighted after several heads were judged uninformative; log-clipping changes visual contrast; and a low attention weight is not equivalent to low causal influence. The corruption experiments provide the stronger result because they intervene on exemplar content and measure task behavior.

## Relationship to DeepSeek-R1 Guidance

DeepSeek's own R1 report advises zero-shot use and warns that few-shot prompting can degrade R1. This paper is concordant with that guidance but studies a different question. DeepSeek-R1 is used here only to **generate demonstrations**; it is not a target model. The evaluated targets are ordinary instruction-tuned models, principally Qwen2.5, rather than reinforcement-trained reasoning models such as R1.

That distinction matters. The paper extends the “prefer zero-shot” heuristic beyond dedicated reasoning models to capable instruction-tuned checkpoints, and shows that importing an R1 trace does not reliably transfer R1-like self-reflection to them. It does **not** replicate DeepSeek's claim on R1 itself, compare DeepSeek-R1 zero-shot against DeepSeek-R1 few-shot, or establish that all reasoning-model guidance transfers to general instruction-tuned models.

## Additional Generalization Checks

Appendix experiments point in the same direction outside the main math setting, but with much thinner controls. On Qwen2.5-72B, few-shot versus zero-shot is 15.62% versus 31.84% on LSAT analytical reasoning, 41.55% versus 84.65% on logical reasoning, and 36.92% versus 84.24% on reading comprehension. On CommonsenseQA, 7-shot versus zero-shot is 25.14% versus 79.85% for 7B, 48.57% versus 84.60% for 32B, and 81.24% versus 84.93% for 72B. LogicQA reports 12.66% 3-shot versus 62.96% zero-shot at 72B, with failed or unavailable few-shot results for 7B and 32B. The authors observed repetition and illogical output, especially in smaller models.

These appendix results show that badly interacting demonstrations can be catastrophic; they do not establish the main format-versus-reasoning mechanism across those domains. There are no selection-method sweeps, format ablations, enhanced-trace comparisons, or attention interventions comparable to the GSM8K/MATH analysis.

## Analyst Takeaways

1. **Audit the extractor before auditing the model.** Prompt, answer cue, generated suffix, and parser form one evaluation system. If a boxed correct answer can be marked wrong because a later number appears, few-shot “reasoning gains” are not identified.
2. **Use format examples for format, not as presumed reasoning lessons.** A single minimal schema example or constrained output mechanism may capture the demonstrated benefit without eight full solutions and their context cost.
3. **Keep corrected zero-shot as the baseline for capable models.** Retrieval, long traces, and shot-count tuning must beat a parser-compatible zero-shot prompt, not an artificially depressed baseline.
4. **Route demonstrations by measured capability.** The useful boundary is whether the target can already solve the task zero-shot, not age or parameter count alone. Small/old checkpoints and edge deployments may still justify worked examples.
5. **Treat frontier-generated demonstrations as a transfer experiment.** Better examples can beat weaker examples without teaching the target the generator's strategy. Test clean, corrupted, and format-only controls before attributing gains to reasoning transfer.
6. **Use interventions before attention stories.** The noise and masking ablations directly test dependence on exemplar content. Attention heatmaps are descriptive and too narrow to establish why a prediction changed.

## Questions and Limitations

- The main claim is grounded in two math benchmarks and instruction-tuned open models. Dedicated reasoning models, hosted frontier targets, long-form work, tool use, agent planning, and most non-mathematical tasks are outside the controlled study.
- “Strong” is operationalized in Appendix B partly as a model whose zero-shot CoT beats its few-shot CoT. That reconciles old and new results but makes the headline category partly outcome-defined; an independent capability threshold would make the generalization less circular.
- Demonstration and zero-shot conditions are not token- or compute-matched. R1 traces are capped at four shots because they are long, while Qwen-Max and conventional traces reach eight. Context length itself can depress reasoning.
- Greedy decoding removes sampling variance within a fixed setup, but it does not justify dismissing 0.2-point gains as “inherent variance” without reruns over exemplar sets, seeds where applicable, prompt paraphrases, or confidence intervals over test items.
- Aggregate accuracy hides substantial item-level churn. The appendix finds similar totals but many non-overlapping errors between zero-shot and few-shot settings, so “no gain” does not mean the demonstrations have no behavioral effect.
- The semantic-corruption controls retain template and positional structure. They identify dispensable content, not a complete absence of in-context influence.
- The attention interpretation is correlational, visually normalized, and centered on Qwen2.5-7B. Attention mass alone is not a faithful causal attribution method.
- Base-model evidence is limited to Qwen2.5-72B because smaller base checkpoints were unstable. The conclusions should not be generalized to base models from the instruction-tuned sweep.
- Benchmark exposure during pretraining or post-training is not measured. Internalized CoT-like patterns are a plausible explanation, not demonstrated provenance.
- The paper's conclusion says corrected zero-shot consistently outperforms few-shot, while Section 5.3 explicitly reports an enhanced six-shot Qwen-Max exception. The broad trend survives, but “consistently” should be read as “in most tested configurations.”
- Appendix B says manual review found approximately 100 overly long erroneous GSM8K responses, while Table 4 reports only 0–2 truncated responses per listed model/condition. The relationship between those counts is not explained.

## Vault Ideas Extracted

* [Chain-of-Thought Prompting](/vault/chain-of-thought-prompting.md)
* [In-Context Learning](/vault/in-context-learning.md)
* [Answer Engineering](/vault/answer-engineering.md)
* [Prompt Contingency](/vault/prompt-contingency.md)
