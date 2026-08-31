---
type: Study Note
title: "Verbosity ≠ Veracity: Demystify Verbosity Compensation Behavior of Large Language Models"
description: Study notes on a paper that names and benchmarks verbosity compensation — padded responses produced under uncertainty despite a concise instruction — measures its accuracy cost, links it to model uncertainty, and mitigates it with a verbosity-triggered model cascade.
resource: https://arxiv.org/abs/2411.07858v2
source: /archive/verbosity-compensation-large-language-models.pdf
tags: [reliability, evaluation, benchmark, routing, long-context, inference-efficiency]
timestamp: 2026-08-25T16:40:00Z
---

# Verbosity ≠ Veracity — Study Notes

**Authors**: Yusen Zhang, Sarkar Snigdha Sarathi Das, Rui Zhang (Penn State University)
**Venue**: arXiv:2411.07858 [cs.CL], preprint
**Version read**: v2, December 7, 2024 (v1: November 12, 2024)
**Pages**: 22
**Code/data**: https://github.com/psunlpgroup/VerbosityLLM

## What It Is

The paper names a behavior it calls **verbosity compensation (VC)**: an LLM that has been explicitly told to answer concisely instead returns padded text — repeating the question, enumerating candidate answers, hedging into ambiguity, or adding decorative detail and formatting. The authors define it as producing a response *that could be compressed without information loss*, benchmark it across 14 models and 5 QA datasets, connect it to model uncertainty, and propose a cascade that uses verbosity itself as the escalation trigger.

The framing is the valuable part. Prior work on long responses treats length as a property to be shortened. This paper treats over-length output as a **symptom** — a behavioral analogue of human hesitation under uncertainty — and therefore as a free, reference-free signal about whether an answer should be trusted or re-asked.

## Setup

| Component | Reported setup |
|---|---|
| Task | "Concise QA": every prompt instructs the model to answer in a single phrase, ≤3 words, without repeating the question or explaining |
| Datasets | Qasper (500, short context), LongBench = HotpotQA + MuSiQue + 2WikiMultihopQA (449, medium), NarrativeQA (500, ~70k-word sources), NQ30 (410, lost-in-the-middle split), MMLU rewritten so options act as hints rather than choices (500) |
| Item filter | Only items whose gold answer is <4 words, so any longer response is prima facie verbose |
| Models | 14 across 6 families: mistral-7b, mixtral-8x7b, llama3-8b/70b, gemma-7b/2-9b/2-27b, claude-3-haiku, claude-3.5-sonnet, gemini-pro-1.0/flash-1.5/pro-1.5, gpt-3.5-turbo, gpt-4o — all at 2024 default parameters |
| Detector `V` | `\|r\| > 3` tokens. Nominally takes the gold answer, but in practice is pure length and therefore reference-free |
| Metrics | `recall(y,r) = \|r ∩ y\|/\|y\|`; performance difference Δ = mean concise recall − mean verbose recall; relative δ = Δ normalized by the model's absolute recall on the dataset |
| Uncertainty | Perplexity for open models, sum of graph-Laplacian eigenvalues over sampled outputs for closed models (LM-Polygraph) |

Two design choices deserve credit. Filtering to short gold answers makes "verbose" mechanically checkable rather than a judgment call. Scoring with **recall** deliberately handicaps the hypothesis: recall rewards longer responses, so a positive Δ has to overcome a metric that favors verbosity.

## Results

**1. VC is everywhere, and scale does not remove it.** Every model shows it on every dataset. The cross-model, cross-dataset mean frequency is 34.69%. Open-source models average 39.80% versus 28.96% for closed-source. Best model: llama3-70b at 13.62% average; worst: mistral-7b. The abstract's headline "GPT-4 exhibits a VC frequency of 50.40%" is gpt-4o's *worst dataset* (NarrativeQA), not its 29.39% average — a real number presented at its most alarming.

**2. Verbose answers are worse answers.** Averaged over models, concise-vs-verbose recall gaps are +20.34 on Qasper, +12.69 on MMLU, +9.37 on NarrativeQA, +9.32 on NQ30, +8.65 on LongBench; the largest single cell is llama3-70b on Qasper at +27.61 (55.79 → 28.19). A handful of negative cells exist (claude-3-haiku on LongBench, gemini-flash-1.5 on NarrativeQA), so the direction is strong but not universal.

**3. The gap shrinks with capability only on long-context tasks.** Correlating δ against Chatbot Arena ELO and against log context-window size gives clear negative correlations on Qasper/LongBench/NarrativeQA (window-size correlation −0.26/−0.53/−0.61) but nothing on MMLU or NQ30. Building a bigger model or a longer window does not by itself disentangle verbosity from veracity.

**4. The verbose tokens really are empty.** An appendix ablation truncates verbose responses to their first 4 tokens: recall falls only from 44.93% to 43.13%. If the answer is not in the first four tokens, the remaining tokens almost never supply it.

**5. Verbosity tracks uncertainty.** Uncertainty rises monotonically with response length for all four models measured, with a sharp jump right around the 3-token detector boundary. The qualitative mechanism is visible in first-token distributions: on a confident item the gold token holds ~0.92–0.98 of the mass; on a VC item the distribution is flat and the argmax is a safe filler token (`Average`, `+`, `"`) that cannot grammatically end a sentence, committing the model to keep generating.

**6. A verbosity-triggered cascade mitigates it.** CaSel runs the weak model first, and re-asks a stronger model whenever `V` fires. Mistral→GPT-4o cuts average VC from 74.19% (Mistral) and 29.39% (GPT-4o) to **16.16%**; Llama→Claude reaches 10.82%; Gemma→Gemini 11.61%. Crucially the cascade lands *below both* constituent models, which a pure "use the better model" policy cannot do. Turned into a probabilistic router (with tunable escalation rates for concise and verbose responses), it dominates both a random-mixture baseline and a **perplexity-based uncertainty router** on the F1-versus-cost curve, and the Gemma→Gemini route beats Gemini alone at lower cost. On NarrativeQA it also cuts useless tokens from 596/327 to 93 at 5.93 s/sample versus 14.86 s for GPT-4o alone.

**7. It generalizes past three-token answers.** In a CoT setting (each step capped at 10 words, `V` fires if any step overflows) gpt-3.5-turbo shows a 24.54-point recall gap on MMLU. On Natural Plan trip planning, llama-3-8b shows 51.49% VC frequency and an 11.56-point gap. Prompt-variation tests confirm the effect is not an artifact of one prompt — the simplest instruction ("Answer as concise as possible") produces the *largest* gaps.

## Analyst Takeaways

1. **Treat over-length output under a concise instruction as a confidence readout, not a style defect.** It is free, needs no logprobs or extra samples, and here outperformed perplexity-based routing on the cost/quality frontier. That makes it usable against closed APIs where nothing but the text is exposed.

2. **A cheap detector plus escalation beats "just use the strong model."** The cascade wins on all three axes simultaneously — lower VC than either model, better F1 per dollar, and lower latency than the strong model alone — because it spends the expensive call only where the cheap model signaled trouble.

3. **Instruction compliance is a measurable deployment metric.** These models were *told* to answer in three words and disobeyed a third of the time. If your pipeline parses a short field out of a model response, the over-length rate is both a parser-failure predictor and a quality proxy worth logging.

4. **Truncation is a defensible cheap fallback.** If the answer is not in the first few tokens it is usually not coming; a hard cap costs almost nothing in recall and removes the enumeration and hedging that confuse users.

5. **Do not read Δ as "verbosity causes errors."** The most defensible reading is that uncertainty causes both, and verbosity is the cheaper of the two to observe.

## Questions and Limitations

- **The detector is a length threshold.** In the main experiments "verbosity compensation" operationalizes to "response longer than 3 tokens," validated by inspecting only 30 samples per dataset. The rich five-type taxonomy (ambiguity / repeat / enumerate / detail / format) comes from human annotation of a separate slice and is never what `V` actually measures.
- **Concise and verbose splits are different items.** Δ compares the items a model happened to answer briefly against the ones it padded, so item difficulty is confounded with the behavior. The v2 appendix addresses this with a fixed-instance analysis pooling all 14 models, and the gaps shrink substantially — Qasper 20.34 → 16.22, LongBench 8.65 → 6.10, NarrativeQA 9.37 → 6.42. The effect survives; its headline magnitude does not.
- **The uncertainty link is correlational and thin.** Four models in the length-uncertainty figure, two different uncertainty estimators for open versus closed models, and no intervention that manipulates uncertainty and observes verbosity. The first-token analysis is a persuasive mechanism sketch, not evidence.
- **Recall rewards enumeration.** Listing several candidates should raise recall, so the metric is conservative for the main claim — but it also means the paper never scores whether a user could extract the right answer from a verbose response. Precision or exact-match numbers are absent.
- **The paper has internal reporting inconsistencies.** Table 9 gives mistral-7b a per-dataset row of 63.81/58.95/14.20/46.59/57.40 with an average of 74.19, which is impossible; its NarrativeQA entry of 14.20 also contradicts the 41.40 used in Tables 6 and 14. Table 4 labels the NQ30 row "NQ14," and the model appendix lists gemini-flash-1.5 twice where gemini-pro-1.5 is meant. None of these undermine the central claims, but they mean individual cells should not be quoted without checking against the released data.
- **Everything is 2024-vintage.** gpt-4o-2024-05-13, claude-3-5-sonnet-20240620, gemini-1.5, Llama 3. The frequencies are not properties of current models; reasoning-trained models that emit long deliberate traces by design would need a different detector entirely. The method transfers; the numbers do not.
- **The gold answers are ≤3 words.** This is deliberate and makes the measurement tractable, but it is a narrow slice of real usage. The CoT and trip-planning appendices extend it, and are the most interesting part of v2 for anyone applying this beyond short-answer QA.

## Vault Ideas Extracted

* [Verbosity Compensation](/vault/verbosity-compensation.md)
* [Verbosity as an Uncertainty Signal](/vault/verbosity-as-uncertainty-signal.md)
* [Verbosity-Triggered Model Cascade](/vault/verbosity-triggered-model-cascade.md)
