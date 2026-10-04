---
type: Study Note
title: "Introducing SWE-grep and SWE-grep-mini: RL for Multi-Turn, Fast Context Retrieval"
description: First-party evidence for a trained read-only retrieval subagent with bounded parallel search, file-and-line evidence handoffs, precision-weighted rewards, and reduced downstream coding latency.
resource: https://cognition.com/blog/swe-grep
source: /archive/cognition-swe-grep-context-retrieval.html
tags: [retrieval, agents, coding-agents, reinforcement-learning, context-engineering, inference-efficiency]
timestamp: 2026-10-04T05:23:58Z
---

# SWE-grep and SWE-grep-mini — Study Notes

**Authors**: Ben Pan, Carlo Baronio, Albert Tam, Pietro Marsella, Mokshit Jain, Daniel Chiu, Swyx, and Silas Alberti  
**Publisher/date**: Cognition, October 16, 2025  
**Evidence type**: First-party training and internal-evaluation report, not peer-reviewed research.

## What It Is

SWE-grep and its distilled smaller variant specialize in agentic code retrieval. A main coding agent delegates search and receives files and line ranges rather than a free-form account of what a cheaper agent thinks the code means. Retrieval becomes a separately trained and measurable capability while the main agent retains interpretation and implementation.

## Problem and Motivation

The authors report that their agent trajectories spent **more than 60% of their first turn retrieving context**. Embedding search is fast after indexing but can miss multi-hop relationships. General agentic search is flexible but creates many serial round trips and exposes the main agent to irrelevant intermediate output. The target is low latency without sacrificing the relevance of code evidence.

## Mechanism as an Idea

The system co-designs a specialized model, a restricted fast search/read tool surface, and a bounded search horizon. It permits up to **eight parallel calls per turn** and **four turns maximum**, described more precisely as **three exploration turns and one answer turn**. An ablation increases parallel searches from four to eight while reducing search turns from six to four at retained performance.

A ground-truth set of relevant files and ranges provides a deterministic retrieval reward. The report calls it weighted F1 but specifies **F-beta with beta 0.5**, favoring precision over recall: irrelevant evidence can pollute the main agent, whereas omitted context may be recoverable with additional searches. This is a deliberate recovery assumption, not a universal preference for precision.

Multi-turn reinforcement learning trains the larger retriever; distillation and further reinforcement learning produce the smaller one. The training method uses sequence-level importance sampling to address training/inference mismatch, plus variance reduction. Reported stabilizers include excluding overlong or extreme-ratio trajectories, assigning zero reward to malformed calls or answers rather than adding a format reward, and scaling advantages by mean tool calls per turn. The last intervention addresses small models saturating the parallel-call budget with duplicated, ineffective searches.

## Results and Admissions

On the internal Cognition CodeSearch Eval, the results image reports:

- **SWE-grep**: file F0.5 **0.66**, line F0.5 **0.44**, latency **2.79 s**;
- **SWE-grep-mini**: file F0.5 **0.58**, line F0.5 **0.38**, latency **1.82 s**;
- non-thinking Sonnet 4.5: **0.59**, **0.37**, **35.90 s**;
- Haiku 4.5: **0.56**, **0.35**, **16.12 s**.

These are precision-weighted retrieval scores, not proportions of coding tasks solved. The internal dataset consists of repositories, user queries, and labeled relevant ranges drawn from difficult bug reports and tests; its size and full contents are not disclosed.

The prose says SWE-grep-mini is served at **over 2,800 tokens/s** and SWE-grep at **over 650 tokens/s**. The results table reverses the apparent assignment, listing **2,858** for SWE-grep and **682** for mini. The source is internally inconsistent on which variant has which output rate; the figures are not silently corrected here.

For a randomly selected difficult SWE-bench Verified subset with Sonnet 4.5 as main model, the downstream image reports **63.90% versus 63.37%** passage with versus without Fast Context, mean wall time **6 min 6 s versus 7 min 47 s**, mean lines viewed **558 versus 745**, and mean search-file steps **12.9 versus 15.9**. This supports lower overall latency at similar observed success, but no subset size or uncertainty is supplied.

The interactive comparison hosts stripped-down Fast Context and stock Claude Code in separate containers. The authors explicitly call it a demo, not an extremely rigorous benchmark, and recommend comparison in the user's actual environment. Their five-second flow window is a product target; a claimed 10%-per-second growth in flow interruption is a rough estimate, not a demonstrated cognitive measurement.

## Analyst Takeaways

1. **A cheap scout should return inspectable evidence.** File-and-range references let the main model interpret original code instead of inheriting an unverifiable weak-model conclusion.
2. **Parallel capacity is not parallel competence.** A model can support many calls yet duplicate searches or spend them poorly. Train and evaluate relevant coverage per serial round, not call count alone.
3. **Optimize the entire retrieval path.** Fast decoding cannot compensate for slow tools or needless serial barriers; tool execution, network latency, and search policy all contribute.
4. **Match precision targets to recoverability.** Favor concise, relevant evidence when the parent can reopen omissions; recall-critical tasks need a different loss and handoff policy.
5. **Measure downstream effects separately.** Retrieval F0.5, latency, context exposure, and final task success answer different questions. A retrieval score gain is not automatically an implementation gain.

## Questions and Limitations

- Proprietary data, unspecified subset sizes, and limited uncertainty reporting prevent independent reproduction or strong generalization claims.
- A restricted tool set supports portability and reduces execution exposure, but the article's safety language does not establish a formal security boundary or prompt-injection defense.
- Learned search is sensitive to repository structure, available tools, latency assumptions, and the completeness of labeled relevant ranges.
- The claimed advantage bundles training, inference hardware, tools, and harness integration. The report does not isolate how much each contributes to cost or latency.

## Vault Ideas Extracted

* [Subagent Context Inheritance Modes](/vault/subagent-context-inheritance-modes.md)
