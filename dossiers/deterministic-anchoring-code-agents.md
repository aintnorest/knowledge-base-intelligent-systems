---
type: Study Note
title: "How Much Static Structure Do Code Agents Need? A Study of Deterministic Anchoring"
description: "Controlled Codex localization study of in-band call and inheritance tags, showing modest function-recall and stability gains with scale-sensitive token and hub costs."
resource: https://arxiv.org/abs/2606.26979v2
source: /archive/deterministic-anchoring-code-agents.pdf
tags: [agents, coding-agents, retrieval, verification, evaluation, reliability]
timestamp: 2026-09-24T03:44:20Z
---

# How Much Static Structure Do Code Agents Need? A Study of Deterministic Anchoring — Study Notes

**Authors**: Zhihao Lin, Mingyi Zhou, Yizhuo Yang, and Li Li  
**Affiliation**: Beihang University  
**Venue**: ISSTA 2026; arXiv:2606.26979v2 [cs.SE]  
**Date**: July 2, 2026

## What It Is

CodeAnchor injects static structural facts as **searchable comments beside code definitions**. A grep-first coding agent keeps its existing tools and control loop, but search results now reveal callers, callees, inheritance, imports, containment, and—under a denser variant—configuration and simple data-flow hints. The hypothesis is that deterministic local relationships stabilize otherwise stochastic repository navigation without forcing the model into a new graph-query API.

The pipeline parses a repository snapshot, computes relationships, normalizes path-plus-symbol identifiers, and renders source-language comments near definitions. The Python implementation combines PyCG call analysis with AST passes. Its task-agnostic graph takes 6.8 seconds on a 73k-LOC pytest snapshot through 133.4 seconds on a 367k-LOC Django snapshot. Dynamic dispatch and reflection can leave edges missing; the agent treats these as hints rather than an exhaustive map.

## Which Structure and Which Test?

Four views are compared while holding the Codex GPT-5.1-codex agent, prompt, and tools fixed: raw grep; **Anchor-Topo**, bidirectional calls/imports/inheritance/containment; **Anchor-Dense**, adding simple data/config/I/O/test links; and **Anchor-Inv**, keeping inverse dependencies such as `CALLED_BY` but dropping forward call links. The main task is **localization**, with patching and tests disabled. SWE-bench Lite contributes 274 instances and Verified 500; 50-task subsets are each run ten times for stability. File@k and Func@k require the predicted top-k entities to cover *every* ground-truth target, a stricter condition on multi-function faults.

The motivation is supported by a pilot in which a grep-first Codex baseline had **0.832 Func@5** on Lite against **0.595** for a graph-based LocAgent under matched model/limits. Better representation should augment a strong familiar search loop, not assume a graph tool already outperforms it.

## Results

| SWE-bench split | Raw Func@5 | Topology Func@5 | Raw / topology rounds | Topology input-token change |
|---|---:|---:|---:|---:|
| Lite | 0.8321 | **0.8540** | 35.3 / 33.7 | +9.9% |
| Verified | 0.6187 | **0.6308** | 42.4 / 40.9 | +9.0% |

Lite's +2.2 percentage-point Func@5 improvement has reported McNemar p=0.041; Verified's Func@10 is +1.4 points, p=0.023. File@1 actually declines by 1.5 points on Lite: structural links sometimes cause an initial helper-file detour before the agent finds the right function. The authors separately rerun repair on **80 Verified instances selected because top-five localizations differ**, holding the repairer fixed: topology resolves 48/80 versus baseline 38/80. That conditional +12.5-point difference is promising but cannot be generalized as a measured +12.5-point whole-benchmark repair gain; the authors project approximately +2 points overall.

Dense hints bring no Lite Func@5/10 improvement over Topo (both 0.8540/0.8577), while increasing rounds from 33.7 to 38.6 and average input tokens from 446k to 530k. On medium-scale Lite repositories, inverse-only tags are worse: Func@5 drops to 0.8242 and rounds rise to 55.0. On larger, hub-heavy Verified repositories, inverse-only achieves 0.6329 Func@5 against 0.6308 for Topo at roughly equal token cost, suggesting that forward links from common helpers can swamp retrieval.

In repeated 50-task Lite runs, Topo raises Func@5 from 0.740 ± 0.043 to 0.772 ± 0.022 and estimated single-run Pass@1 from 0.742 to 0.776. Verified's repeated Func@10 goes from 0.422 ± 0.040 to 0.468 ± 0.018; stability gains there are weaker on a per-task variance measure. Searchable tags consume context even as rounds shorten. The authors report link-following rates moving from roughly 0.15–0.18 to 0.21–0.24, but the reported structural-plus-lexical columns do not add up to the stated overall LFR, so that particular decomposition should be interpreted cautiously.

## Analyst Takeaways

1. **Try the narrowest structural hint first.** Source-adjacent caller and class relations can improve function localization in a grep-based harness without a new API; compare them against raw search on *your* repos and agent.
2. **Budget context and hub exposure.** Richer annotations are not a free improvement. Cap or invert high-degree edges and use dense configuration/data hints only on tasks that need implicit dependencies.
3. **Measure both consistency and outcome.** Pass@1, repeated-run variance, token use, and downstream repair matter more to a developer than a prettier navigation trace. The end-to-end repair experiment here covers a selected disagreement subset.
4. **Treat generated structure as potentially stale and incomplete.** Regenerate changed files, preserve plain-source fallback, and never turn a missing static edge into a proof that a dependency cannot exist.
5. **Consider in-band and out-of-band graph interfaces as alternatives.** Comments exploit existing grep habits; persistent typed indexes offer stronger queries and avoid modifying working-tree code. Select by measured retrieval and maintenance cost.

## Questions and Limitations

- Only one Codex-style agent and Python implementation are studied; other agent harnesses, languages, code changes, and long/deep dependency paths are untested.
- Full end-to-end repair is not measured over all tasks, and selecting the 80 localization-disagreement instances inflates the salience of the conditional repair delta.
- Search and navigation are intentionally coupled because tags appear in grep results; the experiment cannot isolate benefits after initial landing from altered search-result distribution.
- The 50-task repeated-run subsets and single-agent setup limit precision of reliability claims; stronger stability on Lite need not transfer to large hub-heavy repos.
- Static extraction favors high precision but misses dynamic dispatch. Comments injected into source must be regenerated or removed before release as appropriate to the repository's policy; their interaction with tooling and diffs needs local evaluation.

## Vault Ideas Extracted

* [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md)
* [Structural Code Retrieval](/vault/structural-code-retrieval.md)
