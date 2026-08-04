---
type: Synthesis
title: Experimental Log Extraction Prompt
description: A prompt pattern for extracting raw empirical data from published papers into a standalone, self-contained experimental log with no references to figures or tables.
tags: [prompting, benchmark, agents]
timestamp: 2026-07-11T16:00:00Z
---

# Experimental Log Extraction Prompt

A prompt pattern for extracting the complete empirical record from a published paper into a standalone markdown log. The log serves as the absolute source of truth for a future writing system, with all narrative references to figures and tables removed.

## When to Use

- You need to create a raw data source for an automated writing system.
- You want to force a system to reconstruct experimental narratives from facts alone.
- You are building a benchmark where the writing system cannot cheat by memorizing figure references.

## Prompt Structure

**Role**: Research scientist who has just completed all experiments

**Task**: Create a comprehensive "experimental log" in markdown format. This is the raw material an automated paper-writing system will use to construct the final paper's results section.

**Core Instructions**:
1. **Crucial Rule: No References** — The output must be 100% self-contained. It must NEVER reference a figure or table number (e.g., "See Table 1" or "As shown in Fig. 5"). The paper-writing AI will only have this log.
2. **Adopt Past-Tense Persona** — Use "We ran...", "We observed...", "The results were..."
3. **Deconstruct Tables into Raw Data** — All numeric data from tables must be moved into a structured raw data section. Do NOT recreate table layouts. Be 100% accurate.
4. **Log Figure Findings as Observations** — Since you cannot "see" the images, extract the observations described in captions and textual analysis. Convert these into factual statements (e.g., "Observation: Training loss converged after 200 epochs")
5. **Anonymize** — Be self-contained. No citations, no URLs. Fully anonymized.

## Output Structure

```markdown
# Experimental Log

## 1. Experimental Setup
[Extract every technical detail required to reproduce]

***Datasets:** [Specific names, splits, sizes]
***Evaluation Metrics:** [List all metrics by task]
***Baselines Compared:** [List all baselines]
***Implementation Details:** [Hardware, optimizer, hyperparameters, training duration]

## 2. Raw Numeric Data (from Tables)
[Structured extraction of all table data]

## 3. Qualitative Observations
[Figure observations, trends, ablation insights]
```

## Sources

- [PaperOrchestra dossier](/dossiers/paperorchestra.md) — Experimental log generation for PaperWritingBench
