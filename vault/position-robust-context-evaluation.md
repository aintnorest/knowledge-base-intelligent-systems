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

## Practical Use

Use this for RAG, long-document QA, coding agents reading repositories, memory systems, and any workflow that concatenates multiple candidate sources. Pair it with content-grounding checks: a position-robust answer that is not supported by the supplied evidence is not a reliable result.

When a weakness appears, compare focused retrieval, reranking, fewer or more coherent chunks, structured navigation, staged reading, and task-appropriate external verification. Do not assume that a fix for exact string lookup will repair multi-document interpretation.

## Limitations

- Synthetic or single-evidence tests do not fully model multi-hop synthesis, contradictory sources, or evidence spread across several items.
- Position effects can depend on model, prompt template, tokenizer, context length, decoding, and source format; one curve is not a universal capability score.
- An ordering policy that improves a benchmark can overfit to known relevance labels. Validate it with realistic retrieval errors and unseen queries.
- The test reveals a reliability property but does not identify the mechanism causing a failure or prescribe one universal repair.

## Sources

- [Lost in the Middle: How Language Models Use Long Contexts dossier](/dossiers/lost-in-the-middle-long-contexts.md) — controlled multi-document QA and UUID lookup experiments that vary target position, length, architecture, query placement, and retrieval depth.
