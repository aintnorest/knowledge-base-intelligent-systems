---
type: Study Note
title: PaperOrchestra
description: Personal study notes on PaperOrchestra — a standalone multi-agent framework that writes LaTeX manuscripts from raw research materials.
resource: https://arxiv.org/abs/2604.05018v1
source: /archive/paperorchestra.pdf
tags: [multi-agent, tool-use, retrieval, agents]
timestamp: 2026-07-11T16:00:00Z
---

# PaperOrchestra — Study Notes

**Authors**: Yiwen Song, Yale Song, Tomas Pfister, Jinsung Yoon (Google)  
**Venue**: arXiv:2604.05018v1 [cs.AI]  
**Date**: April 6, 2026

## What It Is

A standalone multi-agent system that takes raw research materials (an idea summary, experimental logs, a LaTeX template, and conference guidelines) and produces a complete, submission-ready research paper — including the literature review, figures, and bibliography. The key word is **standalone**: unlike AI Scientist-v2 or CycleResearcher, it does not run experiments. It is a writing tool, not a research tool.

## The Problem It Solves

Most "autonomous research" systems are tightly coupled to their own experimental pipelines. Their writing modules only work because they generated the results themselves. If you have a great idea and some lab notes, you cannot hand them to AI Scientist-v2 and get a paper. PaperOrchestra is designed for exactly that: human provides the raw materials, system writes the paper.

The second problem is literature reviews. Existing systems do keyword search and dump citations. PaperOrchestra actually *reads* candidate papers via web search, verifies them through Semantic Scholar, and writes a targeted review that contrasts prior work against the specific gap the new paper fills.

## How It Works (5 Agents)

1. **Outline Agent** — Reads all your raw materials and produces a master plan: what figures you need, what papers to search for, and what each section should cover.
2. **Plotting Agent** — Generates both data plots and conceptual diagrams using PaperBanana (a VLM-based visual generator). A vision-language model critiques each figure and requests redraws until it looks right.
3. **Literature Review Agent** — Runs a two-phase pipeline: first it uses web search with 10 concurrent workers to find candidate papers, then it verifies each one through Semantic Scholar (title match, abstract check, temporal cutoff). Only verified papers enter the bibliography. It then writes the Introduction and Related Work.
4. **Section Writing Agent** — Writes the Abstract, Methodology, Experiments, and Conclusion into the LaTeX template, pulling exact numbers from the experimental log and inserting the generated figures.
5. **Content Refinement Agent** — Runs simulated peer review (AgentReview) on the draft, addresses weaknesses, and re-scores. If the score goes up, it keeps the revision. If it goes down, it reverts and stops. This prevents the common failure mode where iterative "improvement" actually degrades quality.

Steps 2 and 3 run in parallel. Total latency is about 40 minutes (~60–70 LLM calls).

## The Benchmark (PaperWritingBench)

They built the first standardized benchmark for this task by reverse-engineering 200 accepted papers from CVPR 2025 and ICLR 2025. They used an LLM to extract:
- A **sparse idea** (high-level concept, no math) or **dense idea** (full equations and formalisms)
- An **experimental log** (raw numbers, baselines, metrics, stripped of all figure/table references)

Everything is anonymized and de-contextualized so the system cannot cheat by memorizing the original paper. This is a genuinely hard benchmark.

## Results That Stood Out

- **Literature Review**: 50–68% absolute win margin over AI Scientist-v2 and Single Agent baselines. Human evaluators strongly preferred PaperOrchestra's reviews.
- **Acceptance Rates**: 84% (CVPR) and 81% (ICLR) under ScholarPeer simulation, essentially matching human ground truth (86% and 94%).
- **Citations**: Generates ~48 citations per paper, close to human GT (~59). Baselines generate 9–17 shallow citations.
- **Refinement**: The score-gated refinement loop never degrades quality (0% loss rate) and improves acceptance rates by +19%/+22%.
- **Visuals**: Autonomously generated figures win or tie 51–66% of the time against human-authored figures, despite having no access to the original data plots.

## My Takeaways

1. **Decoupling is underrated**. The fact that this is a standalone writing tool, not an end-to-end research agent, makes it far more useful in practice. Most researchers already have experiments; they need help writing.

2. **Verification beats retrieval**. The literature review agent does not just retrieve papers — it verifies them through Semantic Scholar, enforces temporal cutoffs, and mandates that 90% of gathered papers must actually be cited. This is what prevents citation hallucination.

3. **Score-gated refinement is a pattern worth stealing**. The idea of using a simulated reviewer as a monotonic quality gate is simple but powerful. I have seen too many "iterative improvement" loops that drift into worse output. The accept/revert/halt mechanism solves this cleanly.

4. **The anti-leakage prompt is a universal requirement**. They inject a strict "write as if you know nothing" prompt into ALL evaluated systems, including baselines. This ensures fair comparison and prevents memorization. I should use this pattern for any LLM benchmark I build.

5. **Dense vs. sparse idea ablation is interesting**. The system performs almost as well on sparse (high-level) ideas as on dense (equation-rich) ideas for literature review, which means the search agent is genuinely finding relevant work rather than relying on the user to name-drop key papers.

## What I Would Question

- The visual generation still relies on an external framework (PaperBanana). The paper admits they have limited control over figure hallucinations. This feels like the weakest link.
- 40 minutes per paper is reasonable for a benchmark, but would researchers wait that long for a draft? Probably yes if the quality is this high, but it is worth noting.
- The human evaluation gap vs. ground truth is still significant (especially in evidence presentation and scientific depth). The system is impressive but not yet at human level.

## Vault Ideas Extracted

* [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md)
* [Hybrid Discovery + Verification](/vault/hybrid-discovery-verification.md)
* [Score-Gated Refinement](/vault/score-gated-refinement.md)
* [Closed-Loop VLM Visual Generation](/vault/closed-loop-vlm-visual-generation.md)
* [Benchmark Reverse Engineering](/vault/benchmark-reverse-engineering.md)
* [Anti-Leakage Evaluation](/vault/anti-leakage-evaluation.md)
* [Sparse Concept Note Prompt](/vault/sparse-concept-note-prompt.md)
* [Dense Technical Proposal Prompt](/vault/dense-technical-proposal-prompt.md)
* [Experimental Log Extraction Prompt](/vault/experimental-log-extraction-prompt.md)
* [Anti-Leakage System Prompt](/vault/anti-leakage-system-prompt.md)
* [Citation F1 Metric](/vault/citation-f1-metric.md)
* [LLM-as-Judge with Anti-Inflation](/vault/llm-as-judge-with-anti-inflation.md)
