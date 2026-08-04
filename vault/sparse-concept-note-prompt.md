---
type: Synthesis
title: Sparse Concept Note Prompt
description: A prompt pattern for extracting high-level, conceptual summaries from dense technical documents — simulating an early brainstorming phase with no math or hyperparameters.
tags: [prompting, context-engineering, evaluation]
timestamp: 2026-07-11T16:00:00Z
---

# Sparse Concept Note Prompt

A prompt pattern for reverse-engineering a high-level "Concept Note" from a finished technical document. The output simulates an early brainstorming phase where the intuition is clear but implementation details are not yet specified.

## When to Use

- You need to extract the core idea from a paper without getting lost in equations or experimental details.
- You want to test whether a system can reconstruct a paper from minimal inputs.
- You are building a benchmark that simulates early-stage research proposals.

## Prompt Structure

**Role**: Research Scientist in early brainstorming phase

**Task**: Write a high-level "Concept Note" based on provided paper content.

**Critical Data Ingestion Rules**:
- **Target Content**: Problem Definition, Motivation, High-level Method/Algorithm
- **Exclusion Zone**: STRICTLY IGNORE experiments, results, evaluations, comparisons, ablations

**Instructions**:
1. **Perspective**: First-Person Future Tense ("We propose to explore...", "We aim to investigate...")
2. **Enforce Sparsity**:
   - Conceptual over mathematical: Do NOT use LaTeX or formulas
   - Describe intuition/purpose of components (e.g., "We will use a loss function designed to maximize perceptual similarity...")
   - Strategic logic at "whiteboard" level; avoid hyperparameters
   - Simulate early design phase where intuition is clear but implementation details are not
3. **Structure**:
   - Problem Statement
   - Core Hypothesis
   - Proposed Methodology (conceptual, by function not specification)
   - Expected Contribution
4. **Formatting**: Self-contained; no citations, URLs, or figure/table references; fully anonymized

## Output Format

Return only the markdown memo in the specified structure.

## Sources

- [PaperOrchestra dossier](/dossiers/paperorchestra.md) — Sparse idea generation for PaperWritingBench
