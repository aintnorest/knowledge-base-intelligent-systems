---
type: Study Note
title: "Cocoa: Co-Planning and Co-Execution with AI Agents"
description: A notebook-inspired research interface makes plans, step ownership, and intermediate outputs jointly editable, improving perceived steerability while exposing the limits of fixed planning and blanket delegation.
resource: https://doi.org/10.1145/3772318.3791673
source: /archive/cocoa-co-planning-co-execution-agents.pdf
tags: [interaction-design, human-in-the-loop, orchestration, decomposition, evaluation, agents]
timestamp: 2026-10-05T21:49:07Z
---

# Cocoa: Co-Planning and Co-Execution with AI Agents — Study Notes

**Authors**: K. J. Kevin Feng, Kevin Pu, Matt Latzke, Tal August, Pao Siangliulue, Jonathan Bragg, Daniel S. Weld, Amy X. Zhang, and Joseph Chee Chang.  
**Published**: CHI 2026, April 13–17, 2026; archived arXiv:2412.10999v4, February 18, 2026.  
**Status**: Peer-reviewed CHI 2026 conference paper; the archived arXiv manuscript explicitly identifies the same title, authors, venue, and publisher DOI.

## What It Is

Cocoa embeds an agent in a research document and turns its plan into a shared operational artifact. Researchers edit steps, assign them to themselves or the agent, inspect and modify intermediate outputs, and revise the remaining plan after seeing results. The central contribution is **interleaved co-planning and co-execution**, not a stronger autonomous planner.

A formative study with nine Ph.D. researchers motivated the design; a within-subjects lab study with 16 researchers compared it with chat; seven participants subsequently used it for a week on real research projects.

## Problem and Motivation

Research plans depend on tacit expertise and evolve as literature changes the researcher's understanding. A rigid plan-then-execute workflow forces premature commitments. An agent-led workflow that only requests help when it detects trouble makes human involvement reactive. Chat leaves targeted corrections buried in a conversation and offers little explicit representation of who owns each step.

Researchers also want to retain some work even when it is automatable: reading and synthesizing can build judgment, ownership, and research taste. The desired division of labor is not identical to the agent's capability boundary.

## Mechanism as an Idea

- **Shared editable plan**: the document holds task descriptions, human/agent assignments, and progress. Multiple initial plans can be considered before choosing one. Editing a step can trigger replacement of dependent subsequent steps.
- **Notebook-like execution**: continuous execution advances until a human-owned step or completion; stepwise execution leaves room to inspect and repair each output before downstream work. Execution remains ordered because later steps can depend on earlier outputs.
- **Editable intermediate artifacts**: papers, authors, topics, entities, and text have manipulable representations. A researcher can add missing evidence or remove irrelevant material rather than merely ask the agent to reinterpret a prompt.
- **Two-way steering loop**: execution results inform replanning; edited plans and outputs constrain later execution. Completed plans also document the collaboration.

The studied implementation used GPT-4o and literature tools grounded in Semantic Scholar. It maintained condensed output/context representations and reused prior document plans as examples. Participants wanted more visibility into exactly which shared context influenced each step. These are properties of the studied 2024–2026 prototype, not current product guarantees.

## Results and Admissions

The lab baseline used the same underlying agent and literature tools in a chat interface beside the same document editor. Participants worked on comparable open tasks drawn from their own project documents, with counterbalanced conditions and roughly 25 minutes per task.

- **Perceived steerability** improved: median 4 for Cocoa versus 3 for chat, Wilcoxon p = 0.005, significant after the three-comparison Bonferroni correction.
- **Ease of use** had no detected difference: medians 4 versus 4.5, p = 1.000. This is not an equivalence test proving no usability cost.
- **General utility** had no detected difference: both medians 3.5, p = 0.7. The study does not establish better scientific output quality.
- **Interaction allocation** shifted: output inspection occupied 33.6% versus 54.1% of session time; co-execution occupied 15.2% versus 3.1% for the closest chat editing counterpart, both p < 0.001. Co-planning was 21.5% versus 17.4%, not significant. The authors acknowledge imperfect correspondence between these interaction categories.
- Across 86 completed steps, 28 were edited, 15 reassigned, 12 added, and four deleted; 14 replanning events occurred. The prose reports **32.6%** edited, while Table 2 prints **36.5%** for the same 28 steps. The count and denominator imply 32.6%; this discrepancy is not silently corrected.

In the lab, participants often assigned everything to the agent, citing curiosity and time pressure. During the seven-day field deployment, they retained more strategic thinking, deep reading, experimentation, and argument development for themselves. This is qualitative evidence of changing delegation strategy, not a quantified causal effect of familiarity. A participant's comparison of a day to summarize 20 papers versus around a minute in Cocoa is an anecdote, not measured productivity.

Participants valued preserving useful outputs as checkpoints while redirecting later steps. However, the prototype replaced outdated steps rather than supporting parallel branches, so preserving alternate paths remains a design proposal. Claimed cost savings and improved harm anticipation were not measured as controlled outcomes.

## Analyst Takeaways

1. **Plans should remain revisable after contact with evidence.** The repair restriction in [Plan-Then-Execute](/dossiers/plan-then-execute-user-trust-llm-agents.md) makes this especially concrete: a user can discover a missing action but lack the right editing surface to add it.
2. **Collaboration is richer than approval.** Step ownership and direct output curation let the human contribute work, not just authorize the agent's work. Compare [Magentic-UI](/dossiers/magentic-ui-human-centered-control.md), which separates plan consent, live takeover, and consequential-action approval.
3. **Steerability is not verified correctness.** Editable artifacts create intervention opportunities; they do not prove the user notices errors or that future actions conform to the plan. [Approval Bound to Canonical Effect](/vault/approval-bound-to-canonical-effect.md) addresses the distinct enforcement boundary.
4. **Retained human work can be intrinsically valuable.** Skill-building and ownership should influence delegation alongside speed, risk, and relative capability.

## Questions and Limitations

The small CS/CS-adjacent sample, short lab tasks, and seven self-selected field participants limit transfer. A chat comparison bundles several affordances; no ablation isolates step ownership, direct manipulation, or interleaving. The agent did not process visual material or execute code. Linear documents constrain branching. Longer tasks introduce stale outputs and dependency invalidation: which outputs remain valid after replanning, and how is their provenance preserved? More controls can increase cognitive load; expert users' desire for granular agency need not describe novices.

## Vault Ideas Extracted

* [Editable Plans as Boundary Objects](/vault/editable-plans-as-boundary-objects.md)
* [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md)
