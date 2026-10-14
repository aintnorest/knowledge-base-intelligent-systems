---
type: Synthesis
title: Skill-Preserving AI Assistance
description: Assisted artifact completion can bypass the reasoning that builds unaided competence, so learning must be evaluated separately from throughput and visible effort.
tags: [interaction-design, evaluation, verification]
timestamp: 2026-10-14T13:00:00Z
---

# Skill-Preserving AI Assistance

AI assistance can complete an artifact while bypassing the reasoning through which its author develops independent competence. A working result does not establish that the person can explain its behavior, diagnose a failure, or solve a related problem without assistance. **Assisted throughput and unaided understanding are different outcomes**, especially when the task introduces unfamiliar concepts that later supervision will require.

## Cognitive Engagement, Not Ritual Effort

The relevant distinction is who performs the understanding and diagnosis, not whether generated material appears in the artifact. Predicting behavior, explaining a design choice, and investigating an error can exercise a mental model. Manually retyping generated output or repeatedly requesting fixes can consume effort without demonstrating that understanding.

A randomized experiment with 52 developers learning an unfamiliar programming library found lower immediate unaided quiz performance with chat assistance (**d = 0.738, p = 0.010**). Average task time did not differ significantly (**p = 0.391**), although all 26 assisted participants completed the second task within the limit versus 22 of 26 controls. Completion and learning therefore gave different views of the same workflow; nonsignificant timing does not establish equivalent speed.

Recorded interaction patterns suggest that generation followed by comprehension questions, combined code-and-explanation requests, and conceptual inquiry can coexist with stronger understanding than delegation or repeated AI-led debugging. These small, self-selected patterns were **not randomized interventions**. They motivate designs to test, not proven learning-preservation recipes. Manual copying showed no notable quiz advantage, and neither typing time nor query count is an adequate learning measure.

## Practical Use

- **Specify the learning objective alongside the artifact objective.** Identify which concepts the person must later explain, inspect, or use independently. Reduce routine work without assuming that unfamiliar conceptual work is equally dispensable.
- **Keep reasoning observable.** Invite behavior predictions, explanations of choices, and learner-led diagnosis rather than treating copied text or interaction volume as engagement. Test whether these opportunities actually improve understanding; requiring them is not itself evidence of benefit.
- **Assess the person after removing assistance.** Pair completion and elapsed time with unaided explanation, code reading, debugging, or transfer to a new task. Use delayed assessments when durable retention matters; the supporting experiment measured only immediate knowledge.
- **Separate learning from reliance calibration.** Accepting correct advice and rejecting errors is a distinct outcome, covered by [Review Scaffolds and Calibrated Reliance](/vault/review-scaffolds-and-calibrated-reliance.md). Test both if the workflow is meant to develop future reviewers.

This acquisition-side concern complements [Expertise-Mediated Agent Steering](/vault/expertise-mediated-agent-steering.md): knowledge can enable effective delegation, while delegating the work that would build that knowledge may remove a learning opportunity.

## Limitations

The evidence concerns experienced programmers learning one unfamiliar library through two short exercises with a chat assistant, not autonomous agents, durable deskilling, or production oversight. Error exposure and interaction patterns were observed rather than independently manipulated, so the study does not identify a causal learning mediator or show that forced explanations, induced errors, or Socratic coaching improve learning. Flat compensation, speed instructions, incomplete control tasks, and a time cap further limit productivity interpretation.

The source's reported percentage quiz loss and qualitative denominators are internally inconsistent. The randomized standardized quiz difference is firmer evidence than reconstructed persona proportions. A long-run decline in the expertise available for supervision remains an untested concern, not an established consequence of assistance.

## Sources

- [How AI Impacts Skill Formation dossier](/dossiers/how-ai-impacts-skill-formation.md) — preregistered arXiv preprint studying 52 Python developers learning Trio with or without GPT-4o chat assistance; immediate unaided quiz deficit, nonsignificant average timing difference, higher task completion, and exploratory interaction patterns with unresolved qualitative counts.
