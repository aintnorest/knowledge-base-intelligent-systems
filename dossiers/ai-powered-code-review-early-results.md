---
type: Study Note
title: "AI-powered Code Review with LLMs: Early Results"
description: "Four-role GPT-4 code-review workflow whose preliminary qualitative demonstrations do not establish defect-detection accuracy or production impact."
resource: https://arxiv.org/abs/2404.18496v2
source: /archive/ai-powered-code-review-early-results.pdf
tags: [code-review, agents, coding-agents, multi-agent, verification, human-in-the-loop]
timestamp: 2026-09-24T03:45:40Z
---

# AI-powered Code Review with LLMs: Early Results — Study Notes

**Authors**: Zeeshan Rasheed, Malik Abdul Sami, Muhammad Waseem, Kai-Kristian Kemell, Xiaofeng Wang, Anh Nguyen, Kari Systä, and Pekka Abrahamsson  
**Venue**: arXiv:2404.18496v2 [cs.SE]  
**First posted**: April 29, 2024; version 2 posted December 10, 2025  
**Pages**: 9 in the archived PDF

## What It Is

An exploratory design for GPT-4-assisted code review that splits work among an initial Code Review Agent, a Bug Report/Detection Agent, a Code Smell Agent, and a Code Optimization Agent. The authors argue that static analysis and conventional review insufficiently explain context-dependent bugs, design smells, and improvements, and that specialized prompts can yield both actionable change suggestions and developer learning. This is an early-results report, not a controlled benchmark of those claims.

## How It Works

The first agent inspects submitted code for bugs, smells, and standards deviations and forwards findings. The bug agent examines patterns and potential runtime errors; the smell agent proposes maintainability refactors; the optimization agent recommends clarity/performance changes or a rewritten segment. A centralized coordinator passes prior assessments among agents and invokes GPT-4 by API at each discussion iteration. All four roles use prompt instructions, not separately trained specialized models, despite the broader training language in the arXiv metadata abstract.

## Evidence and Results

The preliminary-results section reports that the roles found structural issues, logical inconsistencies, and common antipatterns and suggested cleaner or faster code in initial cases. It gives no sample size, test corpus, independent ground truth, numerical precision/recall, regression test outcomes, latency/cost, developer study, or post-release defect rate. Statements that a refactoring preserved functionality and that the system improved quality are qualitative author assessments rather than measured comparisons. The paper explicitly assigns systematic comparisons with human methods, accuracy of generated documentation, and developer-education effects to future work.

The source contains conspicuous publication-template residue (a Woodstock’22 proceedings line and placeholder reference), so no named 2022 venue should be inferred from that text. The arXiv record labels the archived revision v2; its abstract makes stronger claims about post-release bugs and developer sentiment than the PDF's actual preliminary results establish.

## Analyst Takeaways

1. **Try specialized review prompts as a hypothesis, not an assurance gate.** Scope bug, maintainability, and optimization suggestions separately, but verify their findings against code execution, tests, and independent human judgment.
2. **Require before/after behavior for optimization claims.** A plausible rewritten implementation is not proof of equivalent behavior or better performance.
3. **Do not count roles as independent reviewers when all share GPT-4 and prior answers.** Information handoff can propagate the first agent's mistaken premise; a diversity or multi-agent benefit must be measured against a single-agent baseline with comparable budget.
4. **Treat the PDF, not an optimistic abstract, as the evidence boundary.** Its claims remain preliminary where no methods or denominators are provided.

## Questions and Limitations

- What exact repositories, languages, cases, reviewer prompts, and adjudication criteria produced the reported impressions?
- No measured false-positive burden, missed-defect rate, or comparison against deterministic tools and trained maintainers is supplied.
- No evidence establishes developer education, performance improvement, reduced technical debt, or fewer released bugs.
- The role descriptions overlap: Code Review detects bugs and smells before the subsequent specialist roles receive its findings, making incremental value uncertain.

## Vault Ideas Extracted

* [Staged Evidence-Grounded Judgment](/vault/staged-evidence-grounded-judgment.md)
