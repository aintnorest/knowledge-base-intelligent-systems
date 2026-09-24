---
type: Study Note
title: "From LLMs to LLM-based Agents for Software Engineering: A Survey of Current, Challenges and Future"
description: "Jin and colleagues' survey distinguishing direct LLM use from autonomous agent workflows across six software-engineering domains, with attention to mismatched benchmarks and testing evidence."
resource: https://arxiv.org/abs/2408.02479v2
source: /archive/llm-agents-software-engineering-survey.pdf
tags: [agents, coding-agents, survey, evaluation, verification]
timestamp: 2026-09-24T03:45:44Z
---

# From LLMs to LLM-based Agents for Software Engineering: A Survey of Current, Challenges and Future — Study Notes

**Authors**: Haolin Jin, Linghan Huang, Haipeng Cai, Jun Yan, Bo Li, and Huaming Chen  
**Venue**: arXiv:2408.02479v2 [cs.SE]  
**Revision**: April 13, 2025  
**Length**: 50 PDF pages

## What It Is

A literature survey that asks what changes when a software-engineering LLM becomes an agent: beyond emitting a text/code answer, the system can plan, choose tools, maintain interaction context, compare candidate solutions, and adapt from feedback. The authors treat LLM-as-reasoning-core, planning/decision making, autonomous tool selection where tools exist, and evaluation among candidates as the baseline criteria; multi-turn context and autonomous learning are more advanced criteria. This is a proposed classification, not a validated binary standard.

The review organizes work in six application domains: requirements engineering and documentation; code generation and development; autonomous learning and decision-making; design and evaluation; software-test generation; security and maintenance. It compares task forms, benchmarks, and metrics for direct model use and agent-mediated work rather than supposing a single model-level score represents an entire engineering workflow.

## Corpus and Classification

The authors report **139 directly relevant papers** collected from DBLP and arXiv, principally from the latter half of 2023 through December 2024. Inclusion requires an LLM/SE connection and sufficient experimental evidence; exclusions include fewer than seven pages, unrelated work, gray literature, duplicates, and non-English work. The six-domain task table counts **28** requirements/documentation, **35** code/development, **30** autonomous decision, **19** design/evaluation, **15** testing, and **43** security/maintenance entries. These are overlapping task counts, **not** 170 unique papers.

The survey contrasts static generation/classification with loops that retrieve code, execute tools, observe failures, coordinate specialized roles, and revise. In testing, the distinction is between generating test text or inputs and an agent that generates, executes, inspects the UI or runtime, diagnoses a mismatch, and revises. In security, the same distinction separates one-shot vulnerability labels or candidate patches from repair and penetration-testing workflows that act on actual systems. Merely invoking an LLM several times does not establish the purported autonomy or quality benefit.

## Testing and Evaluation Lessons

- Test-generation measures in the surveyed work include **bug-reproduction rate, line/branch coverage, validity, precision/recall, execution time, developer effort**, and whether generated security tests demonstrate exploits. Agentic studies may add completion after interactive tool use or qualitative user feedback. Neither coverage nor an agreeable explanation alone demonstrates that a test catches the intended defect.
- The paper recounts XUAT-Copilot, a WeChat Pay user-acceptance-testing agent studied on **450 test cases**: reported Pass@1 **88.55%**, compared with **22.65%** for a single-agent setup and **81.96%** without reflection; Complete@1 was **93.03%**. These are cited results from another study under its own environment and metric definitions, not an experiment performed by this survey.
- A cited vulnerability-detection contrast shows how dataset construction changes interpretation: a 7B model scored **68.26% F1 on BigVul versus 3.09% on PRIMEVUL**. Again this is secondary evidence, but a concrete warning against treating a convenient benchmark as deployment readiness.
- For repair, compilability, test passing, and plausible patches have different meanings. For security, precision/recall of labels, vulnerability exploitability, and actual patch safety cannot be collapsed into one pass score. Cross-system comparisons should disclose their model, prompt, tool/harness, test data, and resource budget.

## Analyst Takeaways

1. **Classify the operational loop, not the product label.** Ask whether an agent actually selects and uses tools, observes a state change, checks candidates, and can recover from failures.
2. **Keep the QA oracle independent of generated artifacts.** A generated test's ability to execute, cover code, and expose a known fault are separate gates; human review is still needed for missing intent and deceptive pass results.
3. **Attach quality metrics to lifecycle tasks.** Requirements ambiguity, executable tests, security defects, code maintenance, and user-accepted deliverables demand different references and failure analyses.
4. **Treat survey performance figures as pointers to primary studies.** Adopt the taxonomy now; reproduce or read cited experiments before budgeting a production multi-agent system around their reported gains.

## Questions and Limitations

- The 139-paper corpus ends in December 2024, and model/harness capabilities moved rapidly afterward; this is a map of then-known work, not a current leaderboard.
- The survey calls its corpus 139 papers in one place and describes 110 papers in its discussion; it does not reconcile those statements. Overlapping topic counts must not be read as independent sample sizes.
- DBLP/arXiv selection, manual screening, and broad domain labels can omit relevant operational work or classify borderline agent designs inconsistently. No inter-rater agreement establishes the proposed agent criteria.
- Many quantitative results are summaries of heterogeneous primary studies with differing environments, datasets, and metrics. The survey itself does not causally isolate tool use, multi-agent collaboration, or reflection.
- Qualitative evaluations and model-as-judge reports require independent calibration; performance and safety of real deployed workflows are less well observed than benchmark completions.

## Vault Ideas Extracted

* [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md)
