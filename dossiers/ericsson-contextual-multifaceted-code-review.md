---
type: Study Note
title: Using Agentic AI for contextualized and multifaceted code review at Ericsson
description: Ericsson/BTH pilot of four skill-guided review agents with code-graph context, assessing 206 findings for correctness and importance across seven Python commits.
resource: https://arxiv.org/abs/2609.15877v1
source: /archive/ericsson-contextual-multifaceted-code-review.pdf
tags: [code-review, agents, multi-agent, coding-agents, enterprise, human-in-the-loop]
timestamp: 2026-09-24T03:43:02Z
---

# Using Agentic AI for contextualized and multifaceted code review at Ericsson — Study Notes

**Authors**: Muhammad Laiq, Ricardo Britto, Muhammad Usman, Nishrith Saini, and Deepika Badampudi  
**Affiliations**: Blekinge Institute of Technology and Ericsson AB, Sweden  
**Venue**: arXiv:2609.15877v1 [cs.SE], September 14, 2026  
**Format**: Industrial design-science prototype and static validation

## What It Is and Why It Matters

A context-rich, four-perspective reviewer for changes in Ericsson codebases. As AI coding agents accelerate implementation, human review becomes a throughput and cognition bottleneck. A single diff-only model misses repository dependencies, conventions, and dimensions beyond its prompt focus. The prototype runs specialist agents for readability, maintainability, reliability, and performance, grounded in code structure and antipattern catalogs. Its industrial case study provides human ratings of generated findings, though **not** a controlled comparison with simpler architectures or a longitudinal production trial.

## How It Works

A Kiro CLI orchestrator collects a target GitLab commit through a GitLab MCP server and invokes a Code Knowledge Graph MCP server for repository structure, file imports, symbol definitions, external library usage, dependency fan-in/fan-out, semantic/hybrid search, summaries, and Cypher queries. A context builder supplies each specialist with an appropriate subset of the diff, modified files, repository metadata, and graph relations instead of indiscriminately copying one huge context into all prompts. Skill documents and agent-specific instructions encode antipattern checklists.

Four specialists run in parallel and report **antipattern name, location, problem description, and fix suggestion**. The orchestrator aggregates them into a unified review. Readability examines naming, formatting and complexity; maintainability examines modularity and evolution; reliability examines exception/fault handling; performance examines I/O, queries, caching, synchronization, data structures and repeated work. The paper explicitly describes orchestration and context assembly as possible single points of failure: a specialist can reason correctly yet be misled by a wrong or incomplete context package.

## Evaluation and Exact Denominators

The design-science static validation covers **seven Python commits from four Ericsson projects** (two small and two large). The system emitted **206 findings**: **64 reliability (31.1%)**, **58 readability (28.2%)**, **50 maintainability (24.3%)**, and **34 performance (16.5%)**. Five senior developers who authored the commits rated findings in their own code: four rated one commit each, with **36, 36, 27, and 11 findings** respectively, while one rated **three commits totaling 96 findings**. Thus ratings are clustered and not 206 independent reviewers or samples from many languages.

Authors/developers judged **197/206 findings correct (~96%)** and **9/206 incorrect (~4%)**. “Accuracy” in the paper means the **correct fraction of generated findings**, akin to human-adjudicated precision; there is no gold-standard universe of missed defects and therefore no recall or conventional full-classification accuracy estimate. **Among 197 correct findings**, **65 high (33%)** were rated severe/must fix, **70 medium (36%)** important/should fix, and **62 minor (31%)** low impact. High+medium = **135/197 (~69%)**, not 69% of all emitted findings. Two quoted developer comments praise especially maintainability and performance findings and note overlap with, plus additions beyond, their own reviews; no subsequent fix rate is measured.

The authors attribute few incorrect findings to repository context and credit separate specialists for coverage. However, **there is no ablation** of the knowledge graph, skill catalogs, specialized agents, or model selection, so this is a plausible mechanism, not evidence that each component caused the ~96% figure. The fact that all four specialists emitted findings does not demonstrate their output was uniquely valuable versus one equally equipped model.

## Analyst Takeaways

1. **Scope reviewers by quality dimension while sharing trustworthy repository context.** A code-graph-assisted package can expose dependency and architecture impacts that isolated diffs miss, but qualify every finding with a concrete source location and checkable fix.
2. **Score two distinct properties.** Track whether a flagged issue is actually present (197/206 here) and whether it is worth fixing (135/197 of correct findings here); prioritize high-severity findings over sheer comment count.
3. **Do not confuse precision with coverage.** Missing defects are unmeasured. Seed known issues or use expert exhaustive review if the deployment decision requires a recall or escaped-defect claim.
4. **Treat agent and context boundaries as testable artifacts.** Record graph freshness, selected files/dependencies, skill versions, agent outputs and aggregation decisions; a context or orchestration omission can erase an otherwise capable review.
5. **Retain independent human judgment on consequential PRs.** Author ratings in one company's seven-commit sample are promising but insufficient to replace qualified reviewers or establish security assurance.

## Questions and Limitations

- One company, four projects, seven commits, Python only, a single Kiro CLI default model, and five raters evaluating their own commits limit transferability and can induce leniency or heightened scrutiny.
- Proprietary commits and reports cannot be independently reproduced. Non-deterministic outputs were not evaluated across repeated runs; model, skills, and graph configuration details do not substitute for outcome replication.
- No ablation, alternative single-reviewer baseline, cost/latency analysis, comparison to prior human comments across all defects, or actual adoption/fix follow-up supports a causal claim about the architecture.
- Reliability antipatterns emphasize exceptions, and the study omits security, test quality, technical debt, and other review criteria; ~96% correctness does not imply broad software assurance.

## Vault Ideas Extracted

* [Calibrated Code-Review Rules](/vault/calibrated-code-review-rules.md)
* [Verification-Centric Generated-Review Evaluation](/vault/verification-centric-generated-review-evaluation.md)
