---
type: Study Note
title: "CooperBench: Why Coding Agents Cannot be Your Teammates Yet"
description: A controlled cooperative-coding benchmark separates textual collision avoidance from semantic integration and finds that communication alone does not recover solo performance.
resource: https://arxiv.org/abs/2601.13295v2
source: /archive/cooperbench-coding-agent-teammates.pdf
tags: [multi-agent, coding-agents, evaluation, benchmark, orchestration, agents]
timestamp: 2026-10-04T06:16:21Z
---

# CooperBench — Study Notes

**Authors**: Arpandeep Khatua, Hao Zhu, Peter Tran, Arya Prabhudesai, Frederic Sadrieh, Johann K. Lieberwirth, Xinkai Yu, Yicheng Fu, Michael J. Ryan, Jiaxin Pei, and Diyi Yang; 11 authors affiliated with Stanford University and SAP Labs US.  
**Status**: arXiv preprint, revision 2 dated January 26, 2026; the PDF names no peer-reviewed venue.

## What It Is

A benchmark of **652 feature-pair tasks**, **199 individual features**, and **12 libraries in four languages**. Two agents receive different logically compatible features but may need to modify overlapping or interdependent code. The comparison asks whether two isolated workers can preserve the competence of one agent implementing both features.

## Problem and Motivation

A strong individual coder need not be a reliable teammate. Independent workers cannot observe one another's intermediate edits, and messages about plans or completed work can create a false shared model. Avoiding overlapping lines does not guarantee agreement about interfaces, defaults, execution order, or dependency behavior.

## Mechanism as an Idea

Experts construct adjacent features around real repository changes, write tests without coding assistants, and validate a joint reference solution. **77.3%** of task pairs have conflicting individual reference patches despite having compatible joint solutions. Tests and solutions are hidden from agents.

Agents execute asynchronously in separate environments using an OpenHands-based harness and a natural-language message channel. Each gets a **100-action ceiling**; the authors report no observed gains from increasing it. Success requires merging the two patches and passing both features' tests. The evaluation attempts standard merging, union merging, and a narrow learned conflict resolver rather than automatically equating every formatting conflict with failed cooperation.

Successful traces occasionally exhibit mutually confirmed role division, concrete resource partitioning, and negotiation between fully specified alternatives. These are observations, not enforced ownership locks or proven coordination policies.

## Results and Admissions

- Rounded main-figure Solo/Coop success rates are **48%/28% for GPT-5**, **47%/26% for Claude Sonnet 4.5**, **36%/14% for MiniMax-M2**, **22%/13% for Qwen3-Coder**, and **6%/5% for Qwen3-Instruct**.
- Difficulty-stratified pooled area-under-curve retention is **0.59**, interpreted as losing **41%** of solo capability under cooperation. This is a different summary from the abstract's “on average 30% lower” and introduction's roughly 50% deficit for leading models.
- Communication lowers raw textual merge conflicts but produces **no statistically significant success improvement**. After all resolution stages, average success is **17.14% with communication versus 17.64% without**; communication consumes up to **20% of execution events**.
- First-turn plan messages correlate with conflicts of **29.4% versus 51.5%** without them. Conflict-free traces have more concrete line and file references. These are associations, not randomized tests of an admission policy.
- A small scaling experiment on **46 tasks from three task sets** reports success falling from **68.6% with two agents**, to **46.5% with three**, to **30.0% with four**.
- Failure symptoms are led by **work overlap, 33.2%**, and **divergent architecture, 29.7%**. Manual interpretation of **50 failed traces** attributes **42%** to expectation gaps, **32%** to commitments, and **26%** to communication. A separate 50-trace validation of automated symptom labels reports **48/50 agreement**, not broad proof of causal accuracy.

## Analyst Takeaways

1. **Textual peace is not semantic compatibility.** Shared defaults, behavioral contracts, and dependency order need explicit agreement and merged-artifact checks.
2. **Declared intent must become checkable state.** A specific plan is useful, but an unverified promise about another branch remains a claim. Artifact evidence and integration checks are stronger than confident status messages.
3. **Use solo performance as a coordination baseline.** Additional workers can destroy capability as well as consume time; agent count is not a success metric.
4. **Keep plan timing separate from enforcement.** Early planning is promising evidence for pre-write coordination, but this paper does not test leases, locks, or admission gates.

The contrast with [the parallel compiler experiment](/dossiers/parallel-claudes-c-compiler.md) is useful: successful large swarms there depended on task partitioning and verifier engineering, not evidence that free-form peer cooperation is intrinsically reliable.

## Questions and Limitations

The benchmark deliberately concentrates overlap, uses compact expert-created features, and tests five dated models in one scaffold. It is not a representative production conflict-rate estimate or a controlled comparison with human teams. Relative difficulty is derived from evaluated models' solo outcomes rather than an independent difficulty measure.

The archived PDF is internally inconsistent: the main text and repository table give **34 feature pools/base commits**, while Appendix A.2 says **52 task sets**. Section 2 names a **Qwen 3 Coder 1.5B** resolver, whereas Appendix B describes and releases **Qwen2.5-Coder-0.5B**. Table 5's individual Solo counts sum to **1,040**, but its pooled row says **1,039**. These should not be silently reconciled. The authors' “trust paradox” explanation and broad generalization beyond coding are hypotheses, not experimentally established causes.

## Vault Ideas Extracted

* [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md)
* [Pre-Write Intent Admission](/vault/pre-write-intent-admission.md)
* [Structured Agent Communication Contracts](/vault/structured-agent-communication-contracts.md)
