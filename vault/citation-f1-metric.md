---
type: Synthesis
title: Citation F1 Metric
description: A partitioned citation coverage metric that separates must-cite references from good-to-cite references to prevent shallow-review inflation.
tags: [evaluation, agents, multi-agent]
timestamp: 2026-07-11T16:00:00Z
---

# Citation F1 Metric

A quantitative assessment of citation coverage against ground-truth references, partitioned into two priority levels to prevent systems from gaming the metric by citing only obvious papers.

## The Problem

Standard F1 on citation lists is easy to inflate: a system can cite only 9–14 obvious foundational papers, achieve high precision, and ignore the broader literature. The metric looks good but the review is shallow.

## The Partition

| Level | Description | Examples |
|-------|-------------|----------|
| **P0 (Must-Cite)** | Core citations strictly necessary for contextualizing the work | Direct experimental baselines, datasets used, metrics relied upon, foundational methods built upon |
| **P1 (Good-to-Cite)** | Supplemental citations providing valuable background | Orthogonal work, supplementary information, broad history |

## Computation

1. Extract reference lists from both ground-truth and generated papers.
2. Resolve to unique entity IDs using a scholarly API (e.g., Semantic Scholar).
3. Partition ground-truth references into P0 and P1 sets.
4. Compute Precision, Recall, and F1 independently for P0, P1, and the combined set.

## Why Partitioning Matters

Baseline systems achieve competitive Overall F1 via extremely low citation counts (9–14 avg), focusing only on obvious P0 papers. This inflates F1 but leaves P1 Recall near zero. A good system generates ~48–59 citations with strong P1 Recall, demonstrating genuine exploration of the academic landscape.

## Example Results

| Pipeline | Avg Citations | P0 Recall | P1 Recall | Overall F1 |
|----------|---------------|-----------|-----------|------------|
| Single Agent | 11.46 | 28.03% | 2.77% | 63.04% |
| AI Scientist-v2 | 17.15 | 36.12% | 3.26% | 37.46% |
| PaperOrchestra | 29.65 | 63.58% | 15.85% | 65.17% |

## Sources

- [PaperOrchestra dossier](/dossiers/paperorchestra.md) — Citation F1 evaluation with P0/P1 partitioning
