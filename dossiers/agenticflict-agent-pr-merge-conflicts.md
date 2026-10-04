---
type: Study Note
title: "AgenticFlict: A Large-Scale Dataset of Merge Conflicts in AI Coding Agent Pull Requests on GitHub"
description: An AIware 2026 dataset reconstructs textual integration friction in unmerged agent pull requests, with conflict severity metadata and important denominator inconsistencies.
resource: https://doi.org/10.1145/3805760.3814923
source: /archive/agenticflict-agent-pr-merge-conflicts.pdf
tags: [coding-agents, evaluation, code-quality, multi-agent, agents]
timestamp: 2026-10-04T06:16:21Z
---

# AgenticFlict — Study Notes

**Authors**: Daniel Ogenrwot and John Businge, University of Nevada Las Vegas.  
**Venue**: Peer-reviewed AIware 2026 proceedings paper; the PDF records acceptance on March 28, 2026 and the ACM DOI above. The archived copy is **arXiv:2604.03551v2, May 12, 2026**, not a separate source.

## What It Is

A released dataset and reproducible merge-simulation pipeline for textual conflicts between agent-authored pull requests and their target branches. It includes PR-level outcomes, affected files, conflict-region spans, compact content fingerprints, and file-level last-touch provenance. It is an integration-friction dataset, not a test of agents resolving conflicts or a measurement of semantic correctness.

## Problem and Motivation

Acceptance rates and review discussions do not expose the mechanical compatibility of proposed changes. A reproducible conflict label needs identifiable repository states and a reconstructed merge, rather than an uncertain platform mergeability field or a rejection comment.

## Mechanism as an Idea

Starting with **932,791 AIDev PRs** downloaded as of January 5, 2026, the authors retain **142,652 open or closed-unmerged PRs** across **59,412 repositories**. They retrieve target and proposal commit identities, prepare cached repositories, and simulate merges deterministically. Unavailable repositories or references are recorded as explicit failures rather than labeled clean.

Conflicted files yield region boundaries, hashes, and short previews; retaining compact representations rather than full blocks limits redistribution and storage. The latest commit touching a conflicted file on either side is recorded as a lightweight provenance approximation. That identifies a relevant file history, not necessarily the author or commit responsible for each conflicting line.

## Results and Admissions

- **107,026 PRs** are successfully simulated: **75.03%** of candidates. **35,626** are excluded due to reconstruction/access limitations.
- The paper reports **29,609 conflicting PRs**, **27.67%** of simulated PRs, and **336,380 conflict regions**.
- Per conflicting PR, reported means are **4.36 conflicting files**, **11.36 regions**, and **540.42 conflict lines**; median conflicting files is **2.00**. Heavy tails mean the average is not a typical small conflict.
- Table 2 gives conflict rates of **15.24% Copilot**, **19.75% Cursor**, **22.85% Devin**, **25.93% Claude Code**, and **31.85% OpenAI Codex**. These are observational rates in different deployment populations, not a matched model ranking.
- Churn-bin analysis reports about **9.9%** conflicts at median churn **2 lines**, nearly **30%** at **25 lines**, and roughly **32–33%** at medians **46–185 lines**, followed by a slight decrease for larger changes. This is not a uniformly monotonic law.

The source admits that textual markers miss logical inconsistencies and post-merge defects, that merged PRs can have encountered and resolved earlier conflicts, and that the AIDev population may overrepresent active adopters of AI tools. There is no same-repository human-authored control group.

## Analyst Takeaways

1. **Record reconstruction coverage with the result.** An inaccessible branch is an unknown outcome, not a non-conflicting contribution.
2. **Measure integration footprint as well as patch success.** Conflict-file count, region count, and line mass expose different burdens; none directly measures maintainer minutes.
3. **Use small changes as a risk-management hypothesis, not a causal guarantee.** Larger churn is associated with more conflicts, but task type, branch age, repository activity, and agent deployment may explain part of that relationship.
4. **Separate target-branch drift from peer-patch interference.** This paper measures a PR against its base branch; simultaneous peer integration is a different denominator and experiment.

## Questions and Limitations

The published tables contain unresolved accounting discrepancies. Table 1 lists **75,924 clean PRs**; adding **29,609 conflicts** yields **105,533**, not **107,026 simulated PRs**. Table 2 agent PR counts sum to **107,026** and its conflicting counts sum to **29,609**, but the prose gives different per-agent percentages (**15.43%, 20.06%, 23.04%, 26.86%, 32.31%**). Use the explicit table figures and preserve the mismatch, rather than treating the headline as a universally reconciled rate.

Commit identities are snapshots retrieved during collection; the study does not establish a lifetime conflict probability across all historical review states. A clean textual merge is not evidence of build or behavioral compatibility. The dataset's compact previews may require reconstructing repositories for full resolution training or independent inspection, and file-level last-touch attribution is not line-level causal provenance.

## Vault Ideas Extracted

* [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md)
