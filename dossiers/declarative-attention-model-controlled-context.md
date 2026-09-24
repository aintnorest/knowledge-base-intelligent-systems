---
type: Study Note
title: Language Models Can Control Their Own Attention
description: Zero-shot Declarative Attention lets models declare global, focused, or local KV-cache access during decoding; controlled long-context evaluation separates attention savings from accuracy and prompt-format costs.
resource: https://arxiv.org/abs/2609.02737v1
source: /archive/declarative-attention-model-controlled-context.pdf
tags: [attention, inference-efficiency, long-context, model-architecture, context-engineering, evaluation]
timestamp: 2026-09-24T03:42:34Z
---

# Language Models Can Control Their Own Attention — Study Notes

**Authors**: Namgyu Ho, Huzama Ahmad, Woosung Koh, Se-Young Yun, Tal Schuster, and Cicero Nogueira dos Santos  
**Affiliations**: KAIST AI and Google DeepMind (Google coauthors advisory only)  
**Venue**: arXiv:2609.02737v1 [cs.CL]  
**Date**: September 2, 2026

## What It Is

Declarative Attention (DA) is an *inference-engine* protocol, not ordinary context retrieval or textual summarization. A model names which already-prefilled prompt segments it needs while generating an answer. The serving engine translates parseable tags into a per-step attention mask, omitting unneeded KV-cache blocks from global-attention reads. It aims to avoid the per-decode-step O(N) proxy scan common in some sparse-attention selectors by making the model declare its own scope.

Its distinction from context assembly matters: external retrieval decides which data enters the prompt; DA leaves data in the KV cache and varies which part is visible to the model during each subsequent decoding step. The study tests fixed long contexts with thinking mode disabled, not a live coding-agent trajectory.

## Protocol and Implementation

The prompt separates an always-attended scaffold (short system preamble, question, instructions, and generated response) from long input. A tokenizer-aware segmenter aims for approximately 2,048-token chunks, first splitting on paragraph boundaries, then progressively finer boundaries, and preserves the exact original text. Each segment appears as a numbered “magic chunk” in a simulated tool-use transcript; these are prefilled messages, not real retrieval calls.

- `<global>` keeps all chunks visible for navigation. It is the default between narrower spans.
- `<focus magic_chunks="K">` keeps named chunks visible for verbatim fact extraction; the model may name several.
- `<local>` masks all long-input chunks for reasoning using the question and facts already emitted into its own response.

A state machine parses opening and closing tags. vLLM hooks rewrite a request's KV block table at decode time. Masking is block-aligned (typically 16–32 tokens), rounding kept ranges outward to avoid deleting declared tokens; the existing FlashAttention kernel needs no change. Efficient sliding-window or recurrent layers are not masked. The model can return to global mode if it needs a missing fact, but an incorrect focus choice makes that evidence inaccessible during the span.

## Evaluation and Results

Fifteen sources cover single-span and multi-span questions from RULER, LongBench, LooGLE, and ZeroSCROLLS. Eleven retain original QA and four use generated questions; up to 128 examples per source fit each model's effective 244K-token limit (116K for the smallest Gemma). Six Gemma/Qwen models are studied; the headline comparison uses Gemma-4-31B and Qwen-3.6-27B on B200/vLLM. Vanilla has raw context with full attention; DA-no-mask uses the same chunked prompt and tags as DA but does not apply the mask. Accuracy comes from a rubric-conditioned local LLM judge; the authors compare its verdicts with a frontier judge on 2,993 responses (98.53% agreement, κ = 0.940).

| Headline model | Vanilla → DA accuracy | Vanilla → DA attended KV positions per response | Estimated decode wall time |
|---|---:|---:|---:|
| Gemma-4-31B | 87.01% → 85.74% (−1.27 pp) | 13.43M → 6.45M (−52.0%) | 269.1 → 192.3 ms (0.71×) |
| Qwen-3.6-27B | 85.31% → 82.56% (−2.75 pp) | 22.54M → 15.52M (−31.1%) | 306.2 → 237.3 ms (0.77×) |

The wall-time figures are **roofline projections**, not observed latency: one B200 at assumed 40% matmul utilization and 70% memory-bandwidth utilization, summing decode operations and excluding prefill. The maskless DA prompt preserves Gemma accuracy exactly and Qwen within 0.69 pp, but increases attended positions by 66.2% and 28.8% relative to vanilla because its protocol generates extra steps. Masking cuts the maskless count by 71.1% on Gemma and 46.5% on Qwen; it is the causal source of the claimed reduction and most of the accuracy loss.

Accuracy changes are not uniform: multi-span questions lose more than single-span (Gemma −2.28 versus −0.78 pp; Qwen −3.59 versus −2.34 pp). Strong models parse valid focus references around 99% of the time, but Gemma-4-E4B succeeds only 58% and retains just 29% of its vanilla accuracy. Six additional tested task sources fall outside the favorable regime: splitting tables or needing global counts loses evidence (average accuracy 84.2% → 58.8% on two sources), while output whose length scales with the document can inflate total attended tokens despite cheaper steps (17.8M → 21.2M on four sources). On the main suite, approximately 15–35% more decode steps erode the per-step gain; very long Qwen tasks can cost *more* attended tokens than vanilla.

## Analyst Takeaways

1. **Keep the two context budgets distinct.** Pruning retrieved evidence reduces prompt material and often distractors; DA reduces memory reads over material already present. Neither substitutes for verifying that the chosen evidence is correct.
2. **Use an ablation that retains the control syntax but disables the mask.** Without it, cheaper attention might be falsely attributed to prompt formatting or shorter answers; here the unmasked tagged prompt actually costs more.
3. **Evaluate total work and outcome, not sparse-step ratios.** Track decode length, attended positions, actual latency, final answer accuracy, and segmentation-sensitive errors on the deployed workload. Roofline savings are not realized throughput measurements.
4. **Do not transplant this as a prompt-only coding-agent trick.** It requires inference-engine control of KV block tables and reliable model tag behavior; vendor APIs normally expose neither. Applying only the tags without masking increased cost in the paper.
5. **Protect high-stakes cross-segment work.** A coding question that needs whole-file invariants, tables, or multi-file interactions resembles failure cases; source reads and executable verification remain the safer quality path.

## Questions and Limitations

- Results are zero-shot on off-the-shelf models, non-thinking mode, bounded fixed-context QA, and no real tool-calling agent runs; savings in dynamic coding sessions remain a hypothesis.
- Artificial segmentation and simulated tool turns could distort structured source or tables; natural tool-message boundaries have not been evaluated here.
- A strong local-versus-frontier judge agreement does not establish alignment to human judgments or executable correctness on repository QA.
- Longer generations and malformed tags sharply limit small-model use. The per-source regressions matter more than a mean on tasks with unacceptable error.
- KV allocation remains; masking reduces cache *reads* during decoding, not the initial prefill, retained KV storage, tool cost, or total deployment latency. Projected gains depend on hardware, batch saturation, architecture, and the assumed utilization ceilings.

## Vault Ideas Extracted

* [Content-Keyed Block Routing](/vault/content-keyed-block-routing.md)
* [Hybrid Linear–Global Attention](/vault/hybrid-linear-global-attention.md)
* [Rate–Distortion Memory Compaction](/vault/rate-distortion-memory-compaction.md)
