---
type: Synthesis
title: Active Prompt
description: Selecting the most informative few-shot examples by measuring model uncertainty across multiple samples, then annotating only those high-uncertainty examples.
tags: [prompting, in-context-learning, chain-of-thought]
timestamp: 2026-07-11T16:36:00Z
---

# Active Prompt

A method for improving few-shot prompting by strategically selecting the most uncertain questions for human annotation, rather than using random or manually chosen examples.

## The Problem

Standard few-shot prompting uses fixed, often arbitrary examples. The quality of these examples dramatically affects performance, but choosing them is expensive and ad hoc.

## How It Works

1. **Generate multiple predictions** — For each candidate question, query the model multiple times (e.g., k=5) with the same prompt.
2. **Calculate uncertainty** — Compute uncertainty metrics across the predictions:
   - **Disagreement** — Do the answers differ?
   - **Entropy** — How diverse are the answer distributions?
   - **Variance** — How much do the answers vary?
3. **Rank and select** — Rank questions by uncertainty and select the most uncertain ones.
4. **Human annotation** — Have humans provide chain-of-thought reasoning and answers for the selected questions.
5. **Use as exemplars** — The annotated examples form the few-shot prompt for inference.

## Key Insight

The most informative examples are not necessarily the hardest or the easiest — they are the ones where the model is most uncertain. By focusing human annotation effort on these boundary cases, Active Prompt maximizes the value of each annotated example.

## Benefits

- Reduces human engineering effort by automating example selection.
- Maximizes the use of human expertise by focusing on informative cases.
- Can be combined with self-consistency for further gains.

## Sources

- [Prompt Engineering Survey dossier](/dossiers/prompt-engineering-survey.md) — Diao et al. (2024)
