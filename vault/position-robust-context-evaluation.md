---
type: Synthesis
title: Position-Robust Context Evaluation
description: Evaluation pattern that holds relevant evidence constant while varying its location and surrounding context to measure whether a model reliably uses long inputs.
tags: [long-context, evaluation, retrieval]
timestamp: 2026-07-14T15:53:29Z
---

# Position-Robust Context Evaluation

Position-robust context evaluation tests whether a system can use evidence wherever it appears in an input, rather than only near a privileged boundary. Keep the question, evidence, answer criterion, and approximate token budget fixed; place the same relevant item at the start, one or more middle positions, and the end among controlled distractors. Report the resulting performance curve and its best-to-worst spread.

## Why It Matters

A large declared context window establishes capacity, not dependable access. Aggregate long-context scores can conceal a model that handles the first and last passages well but fails when the same evidence lands in the middle. In retrieval-augmented systems, this turns rank order, chunk count, and prompt layout into hidden correctness variables.

## Procedure

1. Build answerable examples with an explicit evidence item and a fixed evaluation target.
2. Create matched contexts by adding distractors and moving only the evidence item's position.
3. Test several context lengths separately; a model may be robust at one budget and fail at another.
4. Include no-context and evidence-only controls to distinguish parametric answering, basic evidence use, and distractor interference.
5. Report accuracy or task quality at each position, the minimum score, the mean score, and the positional spread. Slice results by task type, model revision, prompt layout, and retrieval policy.
6. Repeat after meaningful changes to model, prompt, reranker, chunking scheme, or context assembly.

Position effects are task-specific. Chroma's semantic needle task showed no notable location effect across 11 positions even while low-similarity pairs decayed with length, whereas a repeated-word task favored early placement at long lengths. GSM-IC found severe distraction with its extra sentence fixed immediately before the question but never moved that sentence. Both results argue for a position sweep rather than assuming either a universal lost-in-the-middle curve or position invariance.

## Practical Use

Use this for RAG, long-document QA, coding agents reading repositories, memory systems, and any workflow that concatenates multiple candidate sources. Pair it with content-grounding checks: a position-robust answer that is not supported by the supplied evidence is not a reliable result.

When a weakness appears, compare focused retrieval, reranking, fewer or more coherent chunks, structured navigation, staged reading, and task-appropriate external verification. Do not assume that a fix for exact string lookup will repair multi-document interpretation.

## Usable Context Is a Surface

Measure usable context over evidence position, total length, task complexity, and query–evidence distance, rather than reducing it to one maximum length. Capability and length sweeps complement controlled position tests: a broad synthetic suite can expose distractor discrimination, complete-set retrieval, reference tracing, and aggregation without publishing a position-controlled breakdown.

Keep the outcomes distinct. Ranking recall asks whether an evidence selector includes the relevant item; complete-set recall asks whether every requested item is recovered; answering asks whether evidence is used correctly; local next-token prediction asks whether the stream remains predictable. Success on one does not certify the others. Recall alone also leaves precision, unsupported additions, and citation fidelity unresolved.

A threshold-defined effective length is specific to its benchmark, task weighting, chosen threshold, and tested lengths—not an intrinsic capacity boundary. Report the rule and component curves. Likewise, an improved middle score or mean can conceal endpoint regressions; test the whole position curve before declaring a reader intervention position-robust.

For bounded-cache streaming, sweep query–evidence distance separately from stream duration and cache size. Stable local prediction over a long run does not imply access to old evidence: performance can deteriorate within the retained window and fail completely after eviction. See [Attention Sinks as Cache Stability Anchors](/vault/attention-sinks-as-cache-stability-anchors.md).

## Limitations

- Synthetic or single-evidence tests do not fully model multi-hop synthesis, contradictory sources, or evidence spread across several items.
- Position effects can depend on model, prompt template, tokenizer, context length, decoding, and source format; one curve is not a universal capability score.
- An ordering policy that improves a benchmark can overfit to known relevance labels. Validate it with realistic retrieval errors and unseen queries.
- The test reveals a reliability property but does not identify the mechanism causing a failure or prescribe one universal repair.

## Sources

- [Lost in the Middle: How Language Models Use Long Contexts dossier](/dossiers/lost-in-the-middle-long-contexts.md) — controlled multi-document QA and UUID lookup experiments that vary target position, length, architecture, query placement, and retrieval depth.
- [Context Rot dossier](/dossiers/context-rot-long-context-performance.md) — contrasts position-insensitive semantic retrieval with position-sensitive repeated-word generation across growing contexts.
- [Large Language Models Can Be Easily Distracted by Irrelevant Context dossier](/dossiers/irrelevant-context-distraction.md) — a strong distractor result whose fixed near-question placement limits positional generalization.
- [RULER: What's the Real Context Size of Your Long-Context Language Models? dossier](/dossiers/ruler-real-context-size.md) — capability and length sweeps complement position-controlled testing; its effective-length threshold and recall-based aggregate are benchmark-specific.
- [Found in the Middle: Calibrating Positional Attention Bias Improves Long Context Utilization dossier](/dossiers/found-in-the-middle-positional-attention-bias.md) — distinguishes ranking from answering and measures endpoint regressions despite middle-position improvements.
- [Efficient Streaming Language Models with Attention Sinks dossier](/dossiers/streaming-llm-attention-sinks.md) — stable local prediction under bounded caches, with distance sweeps showing imperfect retained-evidence recall and zero retrieval after eviction.
