---
type: Study Note
title: "AI Agent Pull Requests on GitHub: Frequency, Structure, and Merge Conflict Rates"
description: A repository-stratified replay study finds common same-platform PR overlap and higher observed cross-platform textual conflicts, while distinguishing measured collision rates from hypothesized costs.
resource: https://arxiv.org/abs/2607.04697v2
source: /archive/agent-pull-requests-merge-conflict-rates.pdf
tags: [multi-agent, coding-agents, evaluation, code-quality, agents]
timestamp: 2026-10-04T06:16:21Z
---

# AI Agent Pull Requests on GitHub — Study Notes

**Authors**: George Xu, Arjun Subramanian, and Nithilan Karthik; equal contribution, affiliated respectively with Harvard Medical School/Massachusetts General Hospital, MIT CSAIL, and DevRev AI LLC.  
**Status**: arXiv preprint, revision 2 dated July 7, 2026; the archived PDF names no peer-reviewed venue.

## What It Is

A study of temporal overlap and pairwise textual merge conflicts among **33,596 agent-authored PRs in 2,807 repositories** from AIDev-pop. Unlike [AgenticFlict](/dossiers/agenticflict-agent-pr-merge-conflicts.md), which merges a proposal against its target branch, this study merges two co-active proposal heads against their common ancestor.

## Problem and Motivation

Branch-level tests can pass independently while concurrent contributions remain incompatible. Before designing heterogeneous agent teams, it is useful to know whether actual repository concurrency primarily involves different agent platforms or repeated contributions from the same one.

## Mechanism as an Idea

Each PR has an opening-to-resolution interval, capped at the dataset cutoff when unresolved. Exact interval overlap defines strict co-activity; padding each interval by one, three, or seven days tests sensitivity. “Intra-agent” means the same recorded **agent platform/profile**, not a proven shared model, session, instance, or collaborating team.

For collision measurement, the study samples one co-active pair per repository within each stratum: **625 intra-agent** and **122 cross-agent**, totaling **747 pairs**. It reconstructs the common ancestor and performs actual three-way merges without needing working-tree builds. Missing proposal references or inaccessible ancestors remain unavailable rather than being replaced. The replay records textual conflict type and file category, not build or semantic failures.

## Results and Admissions

- At exact overlap, **1,129/2,807 repositories (40.2%)** and **26,691/33,596 PRs (79.4%)** are co-active. With seven-day padding, these become **1,498 repositories (53.4%)** and **31,916 PRs (95.0%)**.
- Only **2,896/580,913 exact-overlap pairs (0.50%)** are cross-agent, occurring in **122 repositories**, approximately **4.3%** of the corpus. The top ten repositories account for **91.4% of raw pairs**, motivating repository-balanced replay rather than raw pair weighting.
- **716/747 pairs (95.8%)** are evaluable: **601 intra-agent** and **115 cross-agent**. The **31 unavailable** comprise **25 deleted PR references** and **6 inaccessible merge bases**.
- Intra-agent textual conflicts occur in **119/601 pairs (19.8%, 95% Wilson CI 16.8–23.2%)**; cross-agent conflicts occur in **48/115 (41.7%, CI 33.1–50.9%)**. The difference is observational and repository-stratified, not proof that platform diversity causes conflict.
- Across **167 conflicted pairs and 1,646 conflicted files**, **84.4%** of files are source code and **3.9%** manifests/lockfiles. Reported conflict-type shares are **57.6% content**, **26.8% modify/delete**, **15.1% add/add**, and **0.5% other**. Structural conflicts therefore comprise **41.9%**, roughly 42%.
- Descriptive co-activity varies by agent profile, language, and repository agent-PR volume. The authors explicitly perform no significance tests or confound adjustment for these associations.

CI compute waste, extra model spend, and maintainer fatigue are explicitly **hypothesized consequences**, not measured outcomes: the study does not inspect CI logs, token usage, or maintainer time.

## Analyst Takeaways

1. **Coordinate siblings even when all use one platform.** Same-provider work dominates this corpus; heterogeneous teams are not required for meaningful integration friction.
2. **Admission scope must include file lifecycle.** Edit ranges alone miss a peer deleting or independently creating a file. Existence and structural intent matter as well as line ownership.
3. **Use the correct statistical unit.** Repository-balanced replay prevents a few busy repositories from dominating, but its percentages are not the population-weighted probability for a randomly selected PR pair.
4. **Test merged behavior separately from mergeability.** Text, build, and semantics are different compatibility layers; a clean merge only clears the first.

## Questions and Limitations

The corpus covers open-source projects, five agent profiles, and **December 2024–July 2025**. Temporally overlapping PRs do not prove simultaneous active execution, agent-to-agent awareness, or deliberate team coordination. Recorded heads at replay time may not reproduce exact historical heads during overlap.

The paper's claim that build or semantic conflicts cannot occur until a “successful textual-conflict” occurs is logically misstated: its own examples describe deeper failures after a **clean textual merge**. Textual conflict counts are a partial indicator of integration risk, not a rigorous lower bound on operational cost. Its conclusion that reactive development “conclusively” fails is stronger than the measured observational evidence. The one-pair-per-repository sampling description does not fully specify how the **625** intra-agent repositories or their pairs were chosen; reproducibility depends on the released artifact.

## Vault Ideas Extracted

* [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md)
* [Pre-Write Intent Admission](/vault/pre-write-intent-admission.md)
