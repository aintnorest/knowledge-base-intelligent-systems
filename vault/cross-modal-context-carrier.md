---
type: Synthesis
title: Cross-Modal Context Carrier
description: Preserve detailed context by encoding it in another modality whose model representation or billing is cheaper, while measuring decode cost and fidelity end to end.
tags: [multimodal, context-engineering, compaction, token-efficiency, evaluation]
timestamp: 2026-08-31T22:15:22Z
---

# Cross-Modal Context Carrier

A context carrier changes representation without intentionally summarizing content. Dense text rendered as an image is one example: the vision pipeline may ingest the same characters with fewer billed input tokens than the text tokenizer. This can preserve arbitrary details that a prose summary would discard.

The correct objective is end-to-end task quality and total cost, not compression ratio. Alternate carriers can add decoding tokens, hit modality-specific density cliffs, silently lose punctuation, or fail after provider preprocessing changes. Tune and validate against the actual model, patch geometry, prices, and target task; retain a plain-text fallback for accessibility, audit, and exact-match work.

## Boundary with Compaction

A carrier can be cheaper without choosing which facts to omit, but it is not automatically lossless. Rate–distortion analysis still applies because visual decoding and preprocessing introduce task-dependent errors. This also parallels code minification: a representation can preserve executable semantics in theory while destroying the identifiers, punctuation, or correspondence an agent needs to act on the original. Evaluate retrieval fidelity, exact transcription, downstream action quality, and total carry-plus-decode cost separately.

## Sources

* [Snapcompact dossier](/dossiers/snapcompact-pixel-context-carriers.md) — benchmarks pixel-font PNG context against text and prose compaction and probes visual-to-language representation on Qwen2.5-VL.
* [What to Keep, What to Forget dossier](/dossiers/rate-distortion-memory-compaction.md) — provides the task-utility and quality–budget framework that also governs representation-induced distortion.
* [Reducing Token Usage of State-in-Context Agents using Minification dossier](/dossiers/minified-state-in-context-agents.md) — shows that a cheaper source representation can reduce tokens while worsening end-task code repair and patch validity.
