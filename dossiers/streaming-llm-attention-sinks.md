---
type: Study Note
title: "Efficient Streaming Language Models with Attention Sinks"
description: "Study notes on retaining a small set of initial-token attention anchors alongside a rolling KV cache to stabilize bounded-memory streaming, without extending accessible context or recovering evicted historical evidence."
resource: https://arxiv.org/abs/2309.17453v4
source: /archive/streaming-llm-attention-sinks.pdf
tags: [attention, inference-efficiency, long-context, model-architecture, model-serving]
timestamp: 2026-10-05T21:48:36Z
---

# Efficient Streaming Language Models with Attention Sinks — Study Notes

**Authors**: Guangxuan Xiao, Yuandong Tian, Beidi Chen, Song Han, Mike Lewis  
**Published**: September 29, 2023; archived arXiv:2309.17453v4 dated April 7, 2024  
**Status**: Peer-reviewed conference paper at ICLR 2024. ICLR publication has no publisher DOI; the source key uses the arXiv base identifier.  
**Project**: https://github.com/mit-han-lab/streaming-llm

## What It Is

StreamingLLM is a bounded-cache inference design for processing a continuous stream far longer than the model's training window. It preserves a few initial tokens' key/value states, which serve as attention sinks, together with the most recent tokens. This restores stable local language modeling after naive rolling-cache eviction would otherwise destabilize it.

The essential distinction is **stream duration versus accessible history**. The paper demonstrates stable prediction over more than four million processed tokens, but does not make four million tokens available to a later question. Its own appendices show retrieval accuracy becoming zero once the needed information lies outside the cache. This is streaming continuity, not unlimited memory.

## Problem and Motivation

Dense decoding retains the key/value states of every prior token, increasing memory and latency as the stream grows. It can also fail when positional distances exceed those encountered in training. A natural alternative is to keep only a fixed-size recent window, but pretrained models can collapse as soon as initial tokens are evicted—even though those tokens appear semantically irrelevant.

Recomputing the recent window's states from scratch can preserve quality, but repeating that prefill for each new token is expensive. StreamingLLM asks which structural dependency must survive eviction so the recent window can remain useful without rebuilding it constantly.

## Mechanism as an Idea

### Attention needs somewhere to put unused mass

Softmax attention allocates a normalized distribution across available tokens. A head that does not need much contextual information cannot simply assign zero mass everywhere. The authors propose that models learn to offload redundant attention to consistently visible tokens. In autoregressive training, initial tokens are visible to nearly every later token and become convenient sinks.

This explanation distinguishes high attention from high semantic importance. Removing a sink changes the normalization denominator and redistributes a large amount of mass onto other tokens, moving the computation away from its trained regime. The paper supports this with attention visualizations, prefix-substitution experiments, and targeted pretraining. It does not establish that the normalization explanation is the only possible origin of sinks.

### Split stable anchors from useful recent content

The cache combines two roles:

- A small permanent prefix provides normalization anchors.
- A rolling recent segment supplies most of the task-relevant content and evicts older intermediate history.

Relative positional encoding uses positions within the retained cache rather than indefinitely growing positions from the original stream. This keeps attention distances within a familiar range. The treatment is demonstrated with rotary embeddings and linear positional biases; sink retention and cache-relative position handling are both parts of the design.

For pretrained models, four initial tokens are a useful empirical default, not a law: some tested families recover with one. For models trained from scratch, a dedicated learnable sink token at the beginning of every sample can concentrate the anchor role into one predictable state. A zero-key/zero-value alternative relaxes normalization, but in the reported experiment does not fully remove dependence on other initial tokens.

## Measured Results and Their Conditions

### Stable local language modeling

- On the first **65K-token PG19 test book**, Llama-2-13B with a 1,024-token recent-only cache has perplexity **5158.07**. Retaining four initial tokens and 1,020 recent tokens lowers it to **5.40**, compared with **5.43** for sliding-window recomputation in the paper's illustration.
- Replacing the initial four content tokens with line breaks still gives perplexity **5.60** with those anchors retained. This is evidence that their semantic content is not the main reason for recovery in that experiment.
- On **400K concatenated PG19 tokens**, Llama-2-7B with a 4,096-state budget improves from perplexity **3359.95** with no prefix anchors to **11.88** with one, **10.51** with two, **9.59** with four, and **9.54** with eight. Conversely, Falcon-7B, MPT-7B, and Pythia-12B largely recover with one retained initial token in their tabled settings. “Four required” would overstate the family-wide result.
- Across Llama-2, MPT, Falcon, and Pythia sizes, concatenated PG19 experiments show stable perplexity over **more than four million tokens**. These tests predominantly establish local next-token prediction stability, not long-range evidence recall or persistent dialogue understanding.

### Recent-information QA

Concatenating ARC question/answer pairs simulates a stream of independent questions. Llama-2-7B-Chat's StreamingLLM scores are **71.34% ARC-Easy** and **55.03% ARC-Challenge**, compared with **71.25%** and **53.16%** for one-shot evaluation. Recent-only window attention falls to **3.58%** and **1.39%**; dense attention runs out of memory. These results show stable repeated local QA, not dependence on information from earlier questions.

StreamEval is more explicitly a recent-memory test: new records arrive continually, a question is asked every ten lines, and the answer is normally twenty lines earlier. The main curves extend to roughly **120K input tokens**. Appendix C sweeps answer distance using Llama-2-7B-32K-Instruct, with 100 samples containing 100 queries each:

- With a total 2,048-state budget, accuracy is **85.80% at 460-token distance** and **75.30% at 1,840**, but **0% at 2,300**, outside the rolling cache.
- With a total 16,384-state budget, accuracy is **77.65% at 460** and **28.50% at 13,800**, then **0% at 18,400**.

Larger available caches are neither perfect memory nor automatically better: even the same short-distance query can score lower with a larger cache.

### Efficiency and training experiments

On a single NVIDIA A6000, Hugging Face implementations using Llama-2-7B and 13B show **up to 22.2× per-token speedup** versus repeatedly recomputing the sliding window, with similar memory footprints. The compared recomputation baseline is quadratic in its repeated attention work; this is not a claimed speedup over optimized full-cache serving or every modern streaming implementation.

At **160M parameters**, a model pretrained with one learnable sink retains streaming perplexity **18.01** with the sink plus recent tokens. The vanilla model needs several initial tokens to reach approximately **18.05**. Training convergence is similar, and seven zero-shot benchmark scores are similar or slightly higher with the sink, without reported statistical uncertainty. Training with two sink tokens does not yield consistent gains and creates dependence on retaining both.

### Admissions that constrain the headline

On LongBench with Llama-2-7B-Chat, a four-anchor/recent-tail cache loses evidence compared with balanced head-and-tail truncation. NarrativeQA scores **11.6 versus 18.7**, HotpotQA **21.6 versus 25.4**, and GovReport **23.9 versus 27.3**. Retaining equally large beginning and ending segments brings results close to the truncation baseline. Sink anchors preserve numerical stability; they do not preserve omitted document content or the full initial instruction.

The abstract's “infinite sequence length” is an architectural motivation for unbounded operation under a fixed cache. Finite experiments demonstrate four-million-token runs; neither infinite-duration correctness nor unbounded recall is measured.

## Analyst Takeaways

1. **Preserve computational role, not just apparent relevance.** An eviction policy that removes semantically empty tokens can destroy important normalization anchors. A token's influence is not equivalent to its informational value.
2. **Separate stability anchors from semantic memory.** Preserving four initial states is not preserving an initial system prompt, an entire task specification, or historical commitments. Those require explicit evidence-retention or external retrieval policies.
3. **Measure the recall horizon as well as stream length.** A long-running process can have short memory. Pair local perplexity and throughput with distance-controlled retrieval and application-specific historical dependencies.
4. **Do not conflate this with lost-in-the-middle remediation.** [Lost in the Middle](/dossiers/lost-in-the-middle-long-contexts.md) concerns using evidence that remains present. [Found in the Middle](/dossiers/found-in-the-middle-positional-attention-bias.md) calibrates document relevance; StreamingLLM preserves a structural sink while discarding most older content. They address different failure modes.
5. **The useful context budget is task-dependent.** [RULER](/dossiers/ruler-real-context-size.md) tests capabilities beyond local prediction, while [Context Rot](/dossiers/context-rot-long-context-performance.md) shows added input can increase ambiguity. [Position-Robust Context Evaluation](/vault/position-robust-context-evaluation.md) and [Context Ordering as Retrieval Control](/vault/context-ordering-as-retrieval-control.md) remain relevant when retained evidence must support answers.

## Questions and Limitations

- The method explicitly does not extend the context window, long-term memory, or ability to summarize an entire evicted history. The paper identifies long-document QA and summarization as unsuitable when they require absent evidence.
- Low perplexity on books and repeated independent QA do not certify persistent conversational consistency, instruction retention, personalized memory, or multi-step task success.
- The learnable-sink experiments use 160M models. Transfer of the same pretraining tradeoff to much larger models is proposed rather than demonstrated here.
- The broad assertion that sinks are universal across Transformers exceeds the provided examples. BERT evidence is a visualization of attention to a separator token; vision-transformer registers are discussed by analogy and have different information-holding roles.
- More recent context does not monotonically improve quality. Llama-2-7B's PG19 perplexity improves from **9.73** with 512 total states to **9.08** with 2,048, then worsens to **9.59** with 4,096.
- The authors report adoption by several serving projects as of the April 2024 revision. This is an author-reported impact statement, not a benchmark or a current claim about those products' behavior.
- Minor source inconsistency: the introduction names the small Pythia variant as 2.9B, while the experiment section says 2.8B. This does not affect the central mechanism but discourages overprecise reconstruction of that model roster.

## Vault Ideas Extracted

* [Attention Sinks as Cache Stability Anchors](/vault/attention-sinks-as-cache-stability-anchors.md)
* [Position-Robust Context Evaluation](/vault/position-robust-context-evaluation.md)
