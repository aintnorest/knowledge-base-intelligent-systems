---
type: Study Note
title: "Ambig-SWE: Interactive Agents to Overcome Underspecificity in Software Engineering"
description: "A repository-repair benchmark separates missing-information detection, question quality, and answer integration; forced interaction helps but does not establish reliable autonomous clarification."
resource: https://proceedings.iclr.cc/paper_files/paper/2026/hash/ed4deb2ba9d4640fb6a000c688c2972e-Abstract-Conference.html
source: /archive/ambig-swe-interactive-agents-underspecificity-software-engineering.pdf
tags: [requirements-engineering, coding-agents, human-in-the-loop, evaluation, benchmark, agents]
timestamp: 2026-10-05T23:18:33Z
---

# Ambig-SWE — Study Notes

**Authors**: Sanidhya Vijayvargiya, Xuhui Zhou, Akhila Yerukola, Maarten Sap, and Graham Neubig; Carnegie Mellon University.  
**Published**: ICLR 2026; associated arXiv:2502.13069v3.  
**Status**: Peer-reviewed ICLR 2026 conference paper. The archived file is the proceedings PDF, not an arXiv download; no publisher DOI is supplied. Numerical discrepancies between the prose and Figure 3 are retained below rather than reconciled speculatively.

## What It Is

An interactive repository-repair evaluation built from **500 SWE-bench Verified issues**. It decomposes handling missing requirements into three capacities: detect missing information, ask useful questions, and incorporate the answers into a successful patch. A model can excel at coding while failing the first capacity, or retrieve considerable information without adapting its implementation trajectory.

## Problem and Motivation

Underspecificity means information is absent that would prevent an expert from producing a successful solution. It differs from ambiguity between meanings already expressed. In repository work, missing facts can span intended behavior, environmental constraints, and interdependent decisions. Agents often proceed anyway, converting uncertainty into implicit assumptions.

The practical distinction is between an **external intent gap** and facts recoverable by repository exploration. Asking for file locations can reduce search, but is not the same as clarifying what behavior the user wants.

## Mechanism as an Idea

GPT-4o aggressively summarizes verified issues to remove crucial details. OpenHands agents then work in three conditions:

- **Full**: original issue plus developer-discussion hints, without interaction.
- **Hidden**: shortened issue without interaction.
- **Interaction**: shortened issue with compulsory clarification; a GPT-4o proxy holds the full issue, hints, and **the files requiring modification**, answering relevant questions or admitting missing information.

The proxy is an information-injection device, explicitly not a validated realistic-user model. Repair uses benchmark tests. Older models receive up to 30 action turns; Sonnet 4 and Qwen 3 Coder receive 100 and an updated harness/prompt. Sonnet 4's Hidden condition uses only **100/500 issues** for cost reasons. Qwen requires an additional mandatory question-only phase because ordinary interaction encouragement is ignored.

A separate detection experiment varies neutral, moderate, and strong encouragement and counts unnecessary versus missed interaction on full versus shortened issues. Detection is measured within the first three turns. Question quality uses embedding displacement and GPT-4o specificity/novelty judgments; neither directly measures whether acquired facts are necessary for the eventual patch.

## Results and Admissions

### Repair outcomes

The following percentages are read directly from **Figure 3 of the archived proceedings PDF**:

| Model | Hidden | Interaction | Full |
| --- | ---: | ---: | ---: |
| Llama 3.1 70B | 3.2 | 4.8 | 8.8 |
| Deepseek-v2 | 5.6 | 7.2 | 12.2 |
| Claude Haiku 3.5 | 15.4 | 26.8 | 33.8 |
| Claude Sonnet 3.5 | 24.2 | 39.6 | 49.4 |
| Qwen 3 Coder | 45.6 | 53.8 | 64.6 |
| Claude Sonnet 4 | 40.0 | 61.4 | 68.0 |

All Hidden–Interaction and Interaction–Full comparisons are reported significant at p < 0.05. These are conditional results under compulsory interaction, unequal cross-model action budgets, and the Sonnet 4 subset exception; they are not direct evidence of spontaneous calibrated asking. The headline **up to 74% improvement** is relative (Haiku 26.8 versus 15.4), not a 74-point gain.

**The prose contradicts the figure.** Section 5.2 gives Qwen/Sonnet 4 task performance as **46%/41.8%**, while Figure 3 gives Interaction **53.8%/61.4%** and Full **64.6%/68.0%**. No supplied explanation identifies the condition behind the prose pair. Claims that Sonnet 4 recovers 89% of Full performance are also only approximate: plotted 61.4/68.0 is about 90.3%. Report the plotted values with provenance, not an invented merged estimate.

### Detection and question use

Sonnet 4 reaches **89% detection accuracy** under strong encouragement, with **3% false-positive and 18% false-negative rates**. Sonnet 3.5's best condition is moderate encouragement: **84% accuracy, 24% FPR, 9% FNR**. Stronger encouragement worsens its accuracy to 76%. Qwen is **50% accurate with 100% FNR** under all three ordinary prompts. Thus coding capability and willingness to clarify are separable.

Qwen averages **6.02 questions** versus **4.03 for Sonnet 4**, with embedding distances 0.179 versus 0.171. That is roughly 49% more questions for Qwen, or 33% fewer for Sonnet; the prose's “50% fewer” is arithmetically incorrect. Questions can be bundled inside the prescribed three interaction turns. Sonnet 4 averages about **65 action steps Hidden and 75 Interaction**; Qwen roughly 65 in both. Better repair is not demonstrated acceleration.

Navigation requests occur on **18.58% of Qwen** and **12.24% of Sonnet 4** interactive issues. Qwen's resolution is 55.43% without versus 52.38% with navigation information; Sonnet 4's is 60.82% versus 67.24%. These are nonrandom, question-selected subsets, not causal estimates of providing a file path. Qualitative traces show redundant re-exploration and implementation questions the proxy cannot answer.

## Analyst Takeaways

1. **Evaluate detection, acquisition, and integration independently.** A forced-question benchmark can improve resolution while its model still never chooses to ask appropriately. [Clarification Need Decision](/vault/clarification-need-decision.md) should not conflate these outcomes.
2. **Explore before burdening the user with code facts.** Ask about intended observable behavior and unavailable context rather than implementation details already discoverable locally. This is a tradeoff, not a universal requirement to postpone every question.
3. **Keep a clarification boundary alive after exploration.** This study's first-three-turn detection window cannot settle later-emerging gaps. [Ask or Assume?](/dossiers/ask-or-assume-coding-agent-clarification.md) studies turn-wise intent monitoring on a related synthetic issue setting, with substantial query and inference costs.
4. **Information volume is not progress.** More extracted text and more questions can coexist with rigid execution. Measure answer incorporation, avoid repeated work, and separate user burden from tool-step counts.

## Questions and Limitations

Artificial summaries remove code snippets and error messages more aggressively than natural underspecified issues. The original issue is assumed sufficient, rather than reassessed per agent; some withheld facts can be reconstructed. Hints and target-file knowledge make the proxy more privileged than many issue reporters. Model-specific prompts, harness versions, action caps, and Sonnet's smaller Hidden population complicate comparisons. No real-user study measures patience, unavailable answers, misleading feedback, or developer acceptance. Embedding novelty weighs useful and irrelevant information similarly, and the same GPT-4o family creates summaries, answers questions, and judges answer quality. The prose/figure disagreement limits reliance on aggregate narratives.

## Vault Ideas Extracted

* [Clarification Need Decision](/vault/clarification-need-decision.md)
