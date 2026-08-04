---
type: Synthesis
title: Benchmark Reverse Engineering
description: Constructing evaluation datasets for automated systems by extracting and anonymizing raw materials from published human-authored work.
tags: [benchmark, evaluation, verification]
timestamp: 2026-07-11T16:00:00Z
---

# Benchmark Reverse Engineering

Creating controlled evaluation datasets for automated synthesis systems by reverse-engineering the pre-writing materials that would have existed before a published work was written.

## The Problem

Evaluating automated writing requires ground-truth inputs (raw ideas, experimental logs) and outputs (finished manuscripts). But pre-writing materials are rarely preserved. Researchers do not publish their brainstorming notes or lab notebooks alongside their papers.

## The Pipeline

1. **Source Acquisition** — Collect published papers from target venues.
2. **Structured Extraction** — Parse PDFs into structured text and extract visual assets using specialized tools (e.g., MinerU for text, PDFFigures for visuals).
3. **Idea Synthesis** — Use an LLM to distill the core methodology into a concept note, stripping all experimental results and evaluations.
4. **Log Synthesis** — Extract raw numeric data, baselines, metrics, and qualitative observations into a standalone log, removing all references to figures or tables.
5. **Anonymization** — Strip authors, titles, citations, URLs, and explicit figure/table references.
6. **De-contextualization** — Convert visual insights to standalone factual observations (e.g., "loss converged after 200 epochs" instead of "as shown in Figure 3").

## Density Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| **Sparse** | High-level conceptual narrative; no equations or hyperparameters | Simulates early brainstorming |
| **Dense** | Retains formal definitions, loss functions, and mathematical notation | Simulates mature technical proposals |

## Why De-contextualization Matters

Without it, the evaluation becomes a memorization test. If the log says "as shown in Figure 3," the system can reconstruct the original reference from training data. De-contextualization forces the system to rebuild the narrative from raw facts alone.

## Quality Control

- Discard incomplete or misparsed samples.
- Use multimodal context injection (extracted table images + text) to ensure high-fidelity data extraction.
- Enforce strict self-containment: no external references, no citations, no URLs.

## Sources

- [PaperOrchestra dossier](/dossiers/paperorchestra.md) — PaperWritingBench: 200 papers from CVPR 2025 and ICLR 2025
