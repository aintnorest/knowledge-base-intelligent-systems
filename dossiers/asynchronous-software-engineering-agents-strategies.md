---
type: Study Note
title: "Effective Strategies for Asynchronous Software Engineering Agents"
description: CAID combines dependency-ready delegation, isolated branches, artifact-backed completion, and explicit integration, improving benchmark scores at greater cost and runtime.
resource: https://arxiv.org/abs/2603.21489v2
source: /archive/asynchronous-software-engineering-agents-strategies.pdf
tags: [orchestration, multi-agent, coding-agents, verification, long-horizon, agents]
timestamp: 2026-10-04T06:16:21Z
---

# Effective Strategies for Asynchronous Software Engineering Agents — Study Notes

**Authors**: Jiayi Geng and Graham Neubig, Carnegie Mellon University Language Technologies Institute.  
**Status**: arXiv preprint, revision 2 dated July 8, 2026; the PDF names no peer-reviewed venue. Research supported by Fujitsu grants.

## What It Is

Centralized Asynchronous Isolated Delegation (**CAID**) is a manager-and-engineers architecture for long-horizon work on a shared code artifact. It treats dependency planning, isolated development, committed outputs, merge handling, and executable feedback as coordination mechanisms rather than relying on free-form peer dialogue.

## Problem and Motivation

Concurrent workers can overwrite intermediate changes, implement against unavailable dependencies, or finish locally plausible components that never form a working whole. A bigger team therefore needs an integration model as well as a decomposition prompt.

## Mechanism as an Idea

A central manager builds a dependency graph, groups strongly coupled or circularly dependent files, and delegates only ready units. A dependency counts as complete when successfully integrated into the authoritative branch, not merely when assigned or reported finished. The manager prioritizes upstream components and work that enables useful tests.

Engineers operate asynchronously in separate versioned workspaces derived from integrated state. Shared files may be reserved for central ownership, although restrictions are communicated through instructions rather than demonstrated capability enforcement. Engineers self-verify and submit commits; the manager merges them, updates dependency state, and reassigns ready work. A conflicting contributor incorporates current integrated state, resolves locally, and resubmits. Structured assignments encode boundaries and dependencies; compressed manager history retains completed work and unresolved errors.

The main protocol relies on engineer self-verification and does **not** require detailed manager review of every commit. The appendices also allow manager inspection and salvage of partial work when an engineer fails to submit a commit. Thus the architecture does not prove that every integrated artifact has an independently enforced verification receipt, despite stronger test-gating language elsewhere.

## Results and Admissions

Experiments use OpenHands SDK **v1.11.0**, three models, **16 Commit0-Lite libraries**, and **20 PaperBench papers**. PaperBench uses **Code-Dev**, judged by GPT-5-mini, not the full experimental-reproduction pipeline. Scores are average test-pass percentages or rubric scores, not percentages of completely successful projects.

| Model | Commit0 single → CAID | PaperBench single → CAID |
| --- | --- | --- |
| Claude Sonnet 4.5 | **53.1 → 59.1** | **57.2 → 63.3** |
| GLM 4.7 | **42.9 → 46.5** | **38.0 → 45.4** |
| MiniMax 2.5 | **42.3 → 57.0** | **10.5 → 36.1** |

The abstract's **14.7-point Commit0** and **25.6-point PaperBench** gains are MiniMax-specific maxima, not improvements shared by every model. One-sided paired tests find Commit0 gains significant for Claude (**p=0.006**) and MiniMax (**p=0.007**), but not GLM (**p=0.095**); all three PaperBench comparisons reach **p<0.05**.

- With Claude, shared-workspace “soft isolation” reaches **56.1% Commit0** and **55.5% PaperBench**, compared with isolated CAID's **59.1%** and **63.3%**. The PaperBench shared-workspace score is below the single agent's **57.2%**.
- CAID costs and takes longer than the single-agent baseline. Claude Commit0 averages **692.6→1,583.2 seconds** and **$1.9→$8.1**; PaperBench averages **1,803.5→2,080.4 seconds** and **$3.3→$6.5**.
- Increasing workers does not monotonically help: four engineers work best in the reported Commit0 sweep, while expanding beyond two gives little PaperBench benefit. A simpy case reaches **0.0%, 92.1%, and 44.3%** with two, four, and eight engineers; the eight-worker trace fragments ownership of a shared module.
- An eight-repository development-stage comparison reports **60.2% at 3,689.1 seconds** with per-round manager review, **55.1% at 2,243.9 seconds** with self-verification, and **54.0% at 1,908.6 seconds** when prompts prioritize efficiency. This is suggestive evidence of a review/latency tradeoff, not cross-model independent review evidence.

## Analyst Takeaways

1. **Integrated state is the scheduling boundary.** Dependencies should unlock on accepted artifacts, not plausible messages.
2. **Isolation contains interference; it does not eliminate incompatibility.** Explicit merge responsibility and post-integration checks remain necessary, consistent with [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md).
3. **Ownership granularity constrains useful parallelism.** Splitting functions inside a heavily shared module can increase local activity while reducing stable global progress.
4. **Separate stronger assurance from faster execution.** Self-verification can improve throughput, but it is not independent, cross-model, or tamper-resistant verification.
5. **Evaluate quality, time, and spend together.** The measured benefit is higher quality at additional expense, not demonstrated wall-clock acceleration.

The dependency-order lesson also appears in [the Grit field report](/dossiers/gitbutler-grit-agent-git-port.md), though that account is uncontrolled operational experience rather than a benchmark comparison.

## Questions and Limitations

CAID changes total computation and role prompts as well as coordination. The single agent has a 100-iteration ceiling, while manager and worker budgets permit substantially more total actions; a 200-iteration single-agent comparison is not a fully equal-compute control. The architecture's components are bundled, and manager delegation quality remains a bottleneck.

The “single-agent plus CAID” comparison is described as approximating fallback, but the appendix tables often retain the better score while adding both runtimes/costs; they do not clearly establish a controlled continuation from the failed single-agent artifact. MiniMax PaperBench Table 9 is internally inconsistent: the listed CAID scores are mostly near zero despite an average of **36.1**; the listed single-agent rows also do not support their stated average of **10.5**. Main-table headline gains therefore cannot be fully reconciled with the archived per-paper table. Claims of guaranteed stable integration or a universal default paradigm are stronger than this evidence supports.

## Vault Ideas Extracted

* [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md)
* [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md)
