---
type: Synthesis
title: Dense Technical Proposal Prompt
description: A prompt pattern for extracting comprehensive, equation-rich technical proposals from published papers — simulating a mature research plan before experiments are run.
tags: [prompting, benchmark, agents]
timestamp: 2026-07-11T16:00:00Z
---

# Dense Technical Proposal Prompt

A prompt pattern for reverse-engineering a comprehensive "Technical Proposal" from a finished paper. The output simulates a mature research plan with full mathematical notation, as if the experiments have not yet happened.

## When to Use

- You need to extract the full technical depth of a paper including equations, architectures, and hyperparameters.
- You want to test whether a system can reconstruct a paper from detailed technical inputs.
- You are building a benchmark that simulates mature research proposals.

## Prompt Structure

**Role**: Lead Research Scientist planning a new project

**Task**: Reverse-engineer a comprehensive, highly detailed "Technical Proposal" from published paper content.

**Critical Data Ingestion Rules**:
- **Target Content**: Problem Definition, Motivation, Method/Algorithm, Architecture, Mathematical Formulation
- **Exclusion Zone**: STRICTLY IGNORE experiments, results, evaluations, ablations, conclusions; do not mention specific accuracy numbers or SOTA claims

**Instructions**:
1. **Perspective & Tone**: First-Person Future Tense ("We will define...", "We formulate the loss as..."); act as if experiments have not yet happened
2. **Preserve Technical Density**:
   - Equations are vital: preserve all mathematical formulations, loss functions, and algorithms using LaTeX
   - Define variables: never output an equation without defining variables (e.g., "We define the loss $L$ as the difference between target $x$ and prediction $y$")
   - Do not simplify: include specific mechanisms and hyperparameters as described
3. **Structure**:
   - Problem Statement
   - Core Hypothesis
   - Proposed Methodology (rigorous walkthrough with notation, module specs, data flow)
   - Expected Contribution
4. **Formatting**: Self-contained; no citations, URLs, or figure/table references; fully anonymized

## Output Format

Return only the markdown memo in the specified structure.

## Sources

- [PaperOrchestra dossier](/dossiers/paperorchestra.md) — Dense idea generation for PaperWritingBench
