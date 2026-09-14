---
type: Study Note
title: "To CoT or Not to CoT? Chain-of-Thought Helps Mainly on Math and Symbolic Reasoning"
description: Study notes on a meta-analysis and 14-model evaluation finding that prompt-based chain of thought primarily helps tasks with mathematical or symbolic execution, where external solvers usually perform better.
resource: https://arxiv.org/abs/2409.12183v3
source: /archive/to-cot-or-not-to-cot.pdf
tags: [chain-of-thought, prompting, reasoning, evaluation]
timestamp: 2026-09-14T17:02:11Z
---

# To CoT or Not to CoT? Chain-of-Thought Helps Mainly on Math and Symbolic Reasoning - Study Notes

**Authors**: Zayne Sprague, Fangcong Yin, Juan Diego Rodriguez, Dongwei Jiang, Manya Wadhwa, Prasann Singhal, Xinyu Zhao, Xi Ye, Kyle Mahowald, Greg Durrett  
**Venue**: ICLR 2025  
**Revision**: arXiv:2409.12183v3, May 7, 2025  
**Pages**: 45

## What It Is

This paper asks where prompt-based chain of thought actually improves task performance. It combines a quantitative review of published CoT comparisons with a new evaluation across 20 datasets and 14 instruction-tuned language models. Its central result is narrower than the common “reasoning tasks benefit from CoT” rule: large, consistent gains are concentrated in mathematical, logical, and algorithmic tasks that require intermediate symbolic execution.

For commonsense, knowledge, reading-comprehension, and other non-symbolic tasks, CoT usually delivers little average improvement and can regress individual model–dataset pairs. Where formal computation is available, asking a model to emit and execute a reasoning trace is usually inferior to asking it for a formal plan and executing that plan with a deterministic solver.

## Literature Meta-Analysis

The authors screened 4,642 papers from ICLR 2024, EACL 2024, and NAACL 2024. A term-based filter produced 516 candidates; manual review retained 110 papers containing 1,218 same-model, same-dataset comparisons between prompt-based CoT and direct answering, covering 264 datasets.

The largest mean gains were in:

- symbolic and algorithmic reasoning: +14.2 points;
- mathematics: +12.3 points;
- logical reasoning: +6.9 points.

Across those three categories, mean performance was 56.9 with CoT versus 45.5 with direct answering. Across all other categories, it was 56.8 versus 56.1. The paper does not count that 0.7-point difference as a practical win because CoT consumes additional inference compute.

The review excludes multimodal models, CoT-fine-tuned models, multi-call methods such as self-consistency and Tree of Thoughts, and tool-augmented systems. For papers with multiple prompts, it compares the best reported CoT prompt with the best direct-answer prompt. That makes the review useful for locating the effect but not a compute-matched causal meta-analysis.

## New Cross-Model Evaluation

The experiments span 14 open and hosted models, including Llama 2 and 3.1, Mistral 7B, Gemma 2, Phi-3, Qwen 2, GPT-4o and GPT-4o-mini, Claude 3 Haiku and Claude 3.5 Sonnet, and Gemini 1.5 Flash and Pro. The 20 datasets cover commonsense, knowledge, mathematical, symbolic, and “soft reasoning” tasks. Runs use greedy decoding, model- and dataset-aware answer extraction, and zero-shot or few-shot direct-answer and CoT prompts.

The category-level results repeat the literature pattern. Averaged across models, mathematical accuracy rises from 22.6 to 50.2 and symbolic accuracy from 45.2 to 56.1. Commonsense rises only from 74.8 to 75.7, knowledge from 73.3 to 77.5, and soft reasoning from 58.3 to 60.3. The aggregate knowledge gain is itself concentrated in mathematical questions inside mixed benchmarks.

On MMLU and MMLU-Pro, the authors use whether the question or generated CoT contains `=` as a deliberately simple proxy for mathematical work. Depending on the model, questions in this bin account for as much as 94% of the MMLU gain and 97.9% of the MMLU-Pro gain, despite constituting about 8–11% and 35–44% of the respective evaluated items. The proxy is diagnostic, not a deployable pre-generation router: it can inspect the generated response and equates one surface token with a broader task property.

Four common zero-shot CoT phrasings produced little average variation on Llama 3.1 8B. Adding few-shot examples changed some magnitudes but largely did not change which task families benefited. This supports a task-shape explanation more than a special-trigger explanation within the tested conditions.

## Planning, Execution, and Tools

The paper separates symbolic problem solving into two stages:

1. **Planning** — translate the natural-language problem into an executable Python program or formal logical specification.
2. **Execution** — carry out that plan to produce an answer.

A plan followed by direct model answering usually does not recover the CoT gain. A plan followed by model-generated stepwise execution performs substantially better, indicating that CoT primarily helps the model track intermediate computation rather than merely discover a plan.

External execution is stronger in most tested settings. On GSM8K-Hard, for example, Plan + Tool accuracy is 44.2–70.4 across four reported models, compared with 20.3–52.2 for few-shot CoT. The advantage is not universal: malformed generated programs or logical specifications create substantial execution failures, especially for smaller models, and tool-augmented FOLIO results can trail ordinary CoT. Tool quality, formalization quality, parsing, and fallback policy are therefore part of the comparison.

## Analyst Takeaways

1. **Route by required operation, not by the word “reasoning.”** Prompted CoT is a strong candidate when success requires sequential arithmetic, formal logic, state tracking, or algorithmic execution. A task being difficult, multi-hop, or knowledge-intensive is not enough.
2. **Use deterministic execution when a natural formalism exists.** CoT behaves like a general but unreliable executor. Let the model construct a checkable plan and let Python, an SMT solver, or another domain tool execute it when the formalization is trustworthy.
3. **Keep direct answering as the production baseline.** Non-symbolic tasks often retain accuracy with fewer generated tokens. Compare end-to-end correctness, parse failures, latency, and cost rather than assuming visible work is valuable.
4. **Evaluate the whole answer pipeline.** The study modifies prompts and extractors by model and dataset to keep unparseable rates low. Prompt, decoder, answer cue, parser, and tool interface jointly determine the observed result.
5. **Treat selective CoT as a routing problem.** The paper establishes a task-family signal, not a finished classifier. A production router needs a pre-generation feature, calibrated thresholds, held-out evaluation, and a safe route for ambiguous cases.

## Questions and Limitations

- The evaluated systems predate dedicated contemporary reasoning models; results establish a broad 2024-era pattern, not a permanent model-family rule.
- Most tasks use multiple-choice or short answers. The paper does not establish the value of CoT for long-form generation, agent trajectories, or long-horizon planning.
- Dataset contamination is unknown. GSM8K-Hard and newer datasets reduce but do not eliminate that risk.
- The meta-analysis samples three 2024 venues and uses terminology-based retrieval, so it is representative rather than exhaustive and may inherit publication bias.
- The `=` analysis is post hoc and can inspect the generated CoT. It is evidence about where gains concentrate, not a ready-to-deploy selection rule.
- Tool-based execution depends on the model producing valid formal code. High unparseable rates in some logical settings can erase the solver’s theoretical advantage.
- CoT and direct prompts are not compute matched. Spending the same budget on direct-answer sampling or verification could change the deployment comparison.

## Vault Ideas Extracted

* [Chain-of-Thought Prompting](/vault/chain-of-thought-prompting.md)
* [Prompt Contingency](/vault/prompt-contingency.md)
