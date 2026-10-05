---
type: Study Note
title: "Planning with Agents: Divided Worlds, Boundary Objects, and Thicker Interfaces"
description: Maggie Appleton argues that collaborative agent planning needs human-legible, interactive boundary objects and reality-tested alternatives rather than immutable Markdown plans and exhausting text-only decisions.
resource: https://maggieappleton.com/planning-agents
source: /archive/maggie-appleton-planning-with-agents.html
tags: [interaction-design, human-in-the-loop, coding-agents, orchestration, decomposition, agents]
timestamp: 2026-10-05T21:49:07Z
---

# Planning with Agents — Study Notes

**Author**: Maggie Appleton, designer, engineer, and researcher at GitHub Next.  
**Published**: September 14, 2026; page last tended September 15, 2026.  
**Status**: Practitioner design essay and talk, originally presented at an internal Microsoft conference; not a peer-reviewed empirical study. The archived HTML supplies the canonical URL.

## What It Is

A critique of how people currently plan software work with agents, grounded in situated-action theory and boundary objects. Appleton proposes “thicker” interfaces: translation layers that turn agent-readable material into visual, interactive, shared objects people can use to reason and decide. GitHub Next's Chopin is described as a basic multiplayer planning proof of concept, not a validated solution.

## Problem and Motivation

Current planning often means serial questionnaires followed by a long Markdown document and a yes/no approval. Appleton describes question fatigue, accepting recommended defaults, inability to deepen an uncertain decision, and plans treated as irrevocable commitments. Coworkers cannot readily inspect, debate, or contribute to one another's private planning sessions.

Drawing on Lucy Suchman's *Plans and Situated Actions*, she argues that plans orient action rather than predict the entire journey. Coding agents subsequently encounter runtime and codebase realities the human did not inspect while deciding. The planner and traveler are different actors, so important situated judgments may occur after the human leaves.

## Mechanism as an Idea

**Boundary objects** support collaboration across partially legible worlds without requiring identical understanding. An artifact can retain shared identity while exposing different representations appropriate to each participant. Showing humans and agents the same dense Markdown is not inherently fair or effective: each has a different cost of interpretation.

A **thick interface** performs more translation work for human benefit:

- Visual representations expose the structure relevant to a decision: state transitions, dependencies, chronology, comparison, and blast radius.
- Direct manipulation lets people explore consequences rather than choose among verbal descriptions of unseen outcomes.
- Shared, multiplayer artifacts let coworkers point, question, debate, and record decisions together.
- Prototyping candidate approaches before commitment brings runtime evidence into planning. Scoped parallel experiments can reveal behavior changes and unsupported cases that static observation misses.

Illustrations include live shadow and animation controls, an interactive state-machine exploration for a video player, and a comparative retry-architecture report. The aim is not to make an agent fully understand embodied human life or to reveal all model internals; it is to build effective collaboration surfaces between the two.

## Experiences and Admissions

The essay contains **no controlled outcome, workload, latency, or cost evaluation**. Appleton's examples and planning frustrations are practitioner observations and designed demonstrations.

The retry comparison illustrates why small change counts can mislead: option A covers **60 call sites**, with **eight** needing judgment; option B covers 60 but **16** silently change behavior; option C changes **14** mechanically while leaving **46** unsupported. These are demonstration figures, not an independently audited benchmark. The report's recovery and amplification metrics are mentioned without sufficient numeric values or methodology to reproduce a performance conclusion.

A claimed reading/generation mismatch—roughly **240 human words/minute** versus **4,500 agent words/minute**, about **19×**—motivates interface design; the page provides no study establishing this ratio for its users and agents. Likewise, the call for an agent to do “1000x more work” is a rhetorical design priority, not a measured efficiency target.

The author explicitly admits that agents do not yet produce good visual explanations without extensive human hand-holding: she essentially designed the examples herself. Fast parallel look-ahead is proposed to reduce waiting, not demonstrated. Treating agent labor as functionally free is GitHub Next's exploratory assumption, not today's measured cost model. Descriptions of CLI planning and Chopin are dated to September 2026.

## Analyst Takeaways

1. **Plan representation is part of the decision process.** A visual comparison can make unsupported cases legible that a prose menu conceals. It must still expose evidence and uncertainty rather than merely persuade.
2. **Reality-tested alternatives can improve the question asked of humans.** Instead of “which architecture sounds right?”, ask which observed tradeoff is acceptable. [Prototyping Dynamics](/dossiers/prototyping-dynamics-sharing-multiple-designs.md) provides controlled human-design evidence for sharing alternatives; it does not validate agent-generated prototypes or their cost.
3. **Shared artifacts need to survive replanning.** [Cocoa](/dossiers/cocoa-co-planning-co-execution-agents.md) supplies a tested instance of an editable plan with intermediate output curation; its participants also wanted checkpoints and branching. Appleton extends this direction toward multiplayer software planning.
4. **Legibility and authorization are different.** An attractive visualization does not verify factual claims or constrain future effects. Compare [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md) and [Approval Bound to Canonical Effect](/vault/approval-bound-to-canonical-effect.md).

## Questions and Limitations

Which visual form helps which task, and when is plain text more precise? How can an interface maintain correspondence between its human-facing explanation, underlying evidence, and executable plan? Generated dashboards could omit the very failure cases the user must see. Parallel prototypes introduce compute, integration, and comparison costs, and may share the same wrong assumptions. Multiplayer editing raises conflict resolution and decision-authority questions. Broader sensing of gaze, speech, and social context is an illustrative dream with substantial privacy and interpretation challenges, not a prerequisite for the proposed boundary-object approach.

## Vault Ideas Extracted

* [Editable Plans as Boundary Objects](/vault/editable-plans-as-boundary-objects.md)
* [Shared Alternatives Before Commitment](/vault/shared-alternatives-before-commitment.md)
