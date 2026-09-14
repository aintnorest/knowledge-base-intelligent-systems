---
type: Study Note
title: "Context Rot: How Increasing Input Tokens Impacts LLM Performance"
description: "Controlled long-context experiments across 18 models showing that semantic ambiguity, distractors, haystack content and structure, and output length make usable context far smaller and less uniform than the advertised window."
resource: https://trychroma.com/research/context-rot
source: /archive/context-rot-long-context-performance.html
tags: [long-context, evaluation, context-engineering, retrieval, reliability, llm-as-judge]
timestamp: 2026-09-14T17:13:00Z
---

# Context Rot: How Increasing Input Tokens Impacts LLM Performance — Study Notes

**Authors**: Kelly Hong, Anton Troynikov, Jeff Huber  
**Institution**: Chroma  
**Date**: July 2025  
**Code**: https://github.com/chroma-core/context-rot  
**Released data**: cleaned LongMemEval examples and the authored needles/distractors are linked from the report's appendix

## What It Is

This Chroma technical report asks a better question than “does the prompt fit?”: does a model use the same information equally reliably as irrelevant input grows around it? Across 18 models and a reported 194,480 LLM calls, the answer is no. Even deliberately simple retrieval and copying tasks become less reliable with length, and the rate and shape of decline depend on semantic similarity, distractor identity, surrounding prose, document order, model family, and whether output length grows with the input.

“Context rot” is a useful operational label, not a proposed mechanism. The work shows that a declared context window is a capacity ceiling rather than a guarantee of uniform access. Its strongest contribution is experimental control: many long-context benchmarks make longer instances harder in additional ways, while these experiments generally hold the answer and task fixed and lengthen the irrelevant material.

## Models and Evaluation Setup

The model roster spans the July 2025 generation:

- **Anthropic**: Claude Opus 4, Sonnet 4, Sonnet 3.7, Sonnet 3.5, and Haiku 3.5
- **OpenAI**: o3, GPT-4.1, GPT-4.1 mini, GPT-4.1 nano, GPT-4o, GPT-4 Turbo, and GPT-3.5 Turbo
- **Google**: Gemini 2.5 Pro, Gemini 2.5 Flash, and Gemini 2.0 Flash
- **Alibaba**: Qwen3-235B-A22B, Qwen3-32B, and Qwen3-8B

Not every model appears in every experiment because context-window, output-limit, or thinking-budget constraints differ. Standard and thinking modes are treated separately where supported. The main NIAH extensions test each unique needle-type × haystack-topic × haystack-structure combination at **8 input lengths and 11 needle positions**, up to each model's available window. Temperature is 0 except where incompatible or discouraged; o3 is an explicit exception, and Qwen is extended from 32,768 to 131,072 tokens with YaRN. The report records 69 refusals among 194,480 calls (0.035%) in this evaluation discussion.

NIAH and LongMemEval answers are scored by GPT-4.1. The authors manually label about **500 NIAH outputs** and **600 LongMemEval outputs**, run GPT-4.1 on the same subset, inspect disagreements, and iterate the judge prompt until agreement exceeds 0.99. This is substantially better than deploying an uncalibrated judge, but it is prompt fitting on the inspected subset: the report does not describe a held-out human-labeled test, uncertainty interval, class balance, or per-model agreement slices.

## Controlled Experiments and Results

### 1. Needle–question similarity

The authors build two haystacks—Paul Graham essays and arXiv papers—and identify common topics by chunking each corpus into 1–3 sentences, embedding with `text-embedding-3-large`, reducing with UMAP, clustering with HDBSCAN, selecting representative chunks with maximal marginal relevance, and manually identifying the cluster themes. They then hand-write eight answer sentences (“needles”) per question, verify through retrieval plus manual review that the original haystack does not already answer the question, and avoid benchmark contamination by authoring the needles themselves.

Semantic ambiguity is measured as needle–question cosine similarity averaged across five embedding models. The PG pairs range from 0.445 to 0.775 and the arXiv pairs from 0.521 to 0.829, with less than 0.1 standard deviation across embedders. Holding each pair fixed while adding irrelevant text makes the inference unusually clean: low-similarity pairs work at short lengths but degrade much faster than high-similarity pairs as length rises. In the report's grouped arXiv/arXiv plot, the >500K-window models' longest-input accuracy is roughly 83% versus 38% for high- versus low-similarity pairs in the high-performing group, and about 52% versus 11% in the low-performing group. These are aggregate, plot-read values rather than tabulated model estimates.

A useful counterpoint to “lost in the middle” is that, across the 11 tested positions, this particular semantic NIAH task shows no notable positional variation. Position sensitivity is therefore task-dependent, not a universal U-shaped law.

### 2. Distractors versus irrelevant text

The report correctly separates **irrelevant content**, which is unrelated to the question, from **distractors**, which are topically close but wrong. For a deliberately easy, high-similarity needle, it compares no distractor, one randomly placed distractor (averaged over four authored alternatives), and all four randomly placed distractors.

One distractor already lowers accuracy; four lower it much further; and the penalty generally widens with context length. The specific wording matters too: in one arXiv-haystack/PG-needle condition, distractor 3 depresses performance most, while distractors 2 and 3 appear most often in hallucinated answers. In the grouped figure, four-distractor accuracy at the longest tested length falls to roughly 27–34% for the >500K medium/low/high groups, compared with about 76–95% without distractors. The curves are not monotone and no confidence intervals are shown, so the durable claim is interaction and non-uniformity, not a smooth decay constant.

Failure style differs by family. Claude 4 models more often abstain when ambiguity rises and show the lowest hallucination rate; GPT models more often answer confidently with a distractor. “Accuracy” therefore collapses two operationally different failures—unsupported answers and conservative misses—that applications may price differently.

### 3. Needle–haystack similarity

The authors also ask whether the nominally irrelevant carrier text is actually neutral. Across five embedders, PG needles are more similar to PG haystacks than arXiv needles are (0.529 versus 0.368), and arXiv needles are more similar to arXiv haystacks than PG needles are (0.654 versus 0.394). Models do substantially better when an arXiv needle stands out inside PG essays than when a PG needle blends into them. The same contrast is small in the arXiv haystack.

This result is important precisely because it does **not** support a simple law. Two topics cannot establish that greater needle–haystack similarity always hurts. They establish that the material used to fill a context window changes the task, even when researchers call it irrelevant.

### 4. Haystack structure

The structure ablation preserves topic and sentences but randomly shuffles sentence order, destroying local logical continuity. Counterintuitively, every one of the four haystack/needle combinations performs better when shuffled, averaged across all 18 models: arXiv/arXiv rises **78.1% → 86.6%**, arXiv/PG **79.7% → 86.0%**, PG/PG **82.2% → 86.0%**, and PG/arXiv **92.0% → 97.2%**.

The authors suggest coherent flow may make an inserted needle blend into the surrounding argument, whereas a disordered context makes it more salient. That is plausible but not mechanistic evidence about attention. Shuffling may also change discourse cues, local transitions, token adjacency, and the conspicuousness of synthetic insertions all at once.

### 5. Focused versus full conversational memory

For LongMemEval_s, the authors retain knowledge-update, temporal-reasoning, and multi-session questions, manually remove 38 ambiguous or unanswerable items, and evaluate **306 prompts**. Each full conversation averages about **113K tokens**; a manually adjusted focused form containing the labeled relevant portions averages about **300 tokens**.

Every model performs better on the focused input. Thinking improves both conditions where available but does not close the gap. Claude Opus 4 and Sonnet 4 show the largest gaps, driven substantially by abstention when the long transcript creates ambiguity. This is less a pure token-length curve than a realistic systems comparison: the full condition asks the same call to retrieve and reason, while the focused condition asks it only to reason. The result strongly favors retrieval and context selection, but it cannot assign the entire gap to token count independently of the added retrieval burden.

### 6. Repeated-word replication

The final experiment scales output with input. A model must exactly reproduce 25 to 10,000 repeated “words” with one near-match or different phrase inserted at a controlled index. Seven common/unique combinations produce **1,090 length–position variants per pair**. For sequences up to 100 words every unique position is tested; longer sequences use increments of `num_words // 100`. Temperature is 0, maximum output is twice the input-token count subject to each model's cap, and thinking is disabled or set to the minimum. o3 is excluded because its thinking and output length cannot be fixed; GPT-3.5 Turbo is excluded after content-filter termination on 60.29% of tasks. Attempted outputs are scored with normalized Levenshtein similarity, exact unique-word position, and input-minus-output word count.

All families degrade as sequences lengthen. Correct unique-word placement concentrates near the beginning at large sizes. Models begin under- or over-generating to token limits, refusing, narrating the detected discrepancy instead of following the instruction, or emitting words absent from the input. Notably, Claude Sonnet 3.5 beats newer Claude models through its 8,192-token output limit; Opus 4 degrades more slowly but refuses 2.89% of these tasks; GPT-4.1 refuses 2.55%; and Qwen3-8B does not attempt 4.21%. Gemini variants begin emitting unrelated text around 500–750 words in most word-pair conditions. This experiment mixes input-length, output-length, exposure-bias, output-cap, and safety-policy effects, but that mixture is exactly why it is a warning against treating an LLM as a deterministic copying primitive.

## Analyst Takeaways

1. **Advertised capacity is not usable capacity.** A model accepting one million tokens says nothing about reliability at token one million under semantic ambiguity or distractor load.
2. **The marginal context item can reduce quality.** More retrieved passages increase evidence recall but also create a reader-side discrimination problem. Optimize the selected budget, not maximum fill.
3. **Benchmark filler is an experimental variable.** Topic match, distractor wording, and discourse coherence all change accuracy. “Add irrelevant tokens” is not a sufficiently specified long-context protocol.
4. **Position effects must be measured per task.** Semantic NIAH showed no notable effect over 11 positions, while repeated-copy accuracy favored an early anomaly. One benchmark's positional curve should not be generalized to all context use.
5. **Separate abstention from hallucination.** Claude's conservative failures and GPT's confident distractor uptake can yield similar aggregate accuracy but demand different mitigations.
6. **Use focused retrieval before more reasoning.** Thinking helps, but the 300-token versus 113K-token LongMemEval gap remains. First reduce the retrieval burden; then spend reasoning tokens.

## Reproducibility, Conflicts, and Limitations

- **Strong reproducibility artifacts**: the report links a complete code repository and downloadable cleaned LongMemEval data plus the authored needles and distractors; it publishes clustering hyperparameters, embedders, tested lengths/positions, model roster, temperature policy, and judge-calibration procedure.
- **Missing statistical reporting**: the headline plots aggregate models into performance/window groups without uncertainty intervals or individual traces, and the report does not present repeated-run variance or significance tests. Temperature 0 does not make hosted APIs perfectly deterministic.
- **Judge validation may be optimistic**: >99% agreement is reached after iterating on the same manually inspected subsets. A held-out set and disagreement slices would better establish generalization, especially because abstentions and plausible distractor answers are not uniformly easy to score.
- **Small authored semantic set**: two corpora, two questions, eight needles per question, and four distractors per selected needle permit strong matched comparisons but weak population-level generalization. Manual cleaning and focused-context construction introduce judgment calls.
- **Controlled variables are not identical across all studies**: the NIAH design isolates added context well; LongMemEval jointly adds length and retrieval; repeated words jointly scale input and autoregressive output and encounter model-specific caps and safety behavior.
- **No causal mechanism**: the structure and similarity findings diagnose behavior. They do not establish an attention-level explanation, as the authors acknowledge.
- **Commercial conflict**: this is a non-peer-reviewed report from Chroma, a company selling retrieval/vector-database infrastructure, and its practical conclusion favors retrieval and context engineering; the page also includes a Chroma hiring call. The report does not provide a formal funding or competing-interests statement. The alignment is material and should be disclosed, though the released code/data and controlled ablations make the empirical claims inspectable rather than purely promotional.
- **Model-vintage limit**: these are July 2025-era models and mutable hosted APIs, with thinking modes and Qwen's YaRN extension handled asymmetrically. The report does not pin every commercial endpoint to an immutable weight snapshot. The experimental pattern remains valuable, but none of the numerical curves should be treated as a current-model leaderboard without rerunning the deployed model, prompt, tokenizer, and context assembly.
- **Real workloads remain harder and different**: the study mostly retrieves one authored needle or copies repetitive text. Multi-hop synthesis, contradictions, tool use, code navigation, and multiple dispersed evidence items could produce different—and plausibly worse—failure surfaces.

## Vault Ideas Extracted

* [Position-Robust Context Evaluation](/vault/position-robust-context-evaluation.md)
* [Context Ordering as Retrieval Control](/vault/context-ordering-as-retrieval-control.md)
* [Retrieval Augmentation for Hallucination Reduction](/vault/retrieval-augmentation.md)
* [Human-Anchored Judge-Bias Measurement](/vault/human-anchored-judge-bias-measurement.md)
