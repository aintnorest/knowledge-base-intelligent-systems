---
type: Study Note
title: Evaluating skill output quality
description: Agent Skills' concrete with-skill versus no-skill evaluation loop using fresh runs, artifact assertions, timing, human review, and iterative revision.
resource: https://agentskills.io/skill-creation/evaluating-skills
source: /archive/evaluating-agent-skills-output-quality.html
tags: [agent-skills, evaluation, agents, verification, context-engineering]
timestamp: 2026-09-24T03:44:42Z
---

# Evaluating skill output quality — Study Notes

**Publisher**: Agent Skills (agentskills.io)  
**Format**: Skill-creation tutorial; no publication date shown in saved page

## What It Is

This is the evaluation playbook of the seven-document set. The `agent-skills-format-specification` says what a skill package must look like; this document asks whether that package improves real outputs relative to a baseline. It describes isolated runs, grading, aggregation, human review, and revision rather than claiming a measured cross-model gain.

## Define the Task and Preserve a Comparator

A case pairs a realistic user request with an intended observable outcome and any required inputs. Start with varied phrasing and edge conditions; run skill-enabled and baseline versions in separate fresh contexts so authoring or prior runs cannot contaminate the comparison. For edits to an existing skill, compare against the previous version as well. Preserve artifacts, grades, duration, and token use for both configurations so quality and cost can be compared.

The comparator must hold the task and input files fixed. A baseline can already satisfy most requests; if both variants pass the same assertions, the skill has not earned its ongoing context and maintenance cost. The illustrative CSV case asks for top three revenue months and a bar chart, and a separate case asks to clean missing email values.

## Grade the Deliverable, Then Inspect What the Grade Misses

After seeing first-run outputs, add specific effect assertions: a valid artifact, the correct number of represented items, legible axes, or a relevant title. Avoid an arbitrary required string or converting subjective “good” into a fake pass/fail check. Each grade should cite artifact-backed evidence. Code suits mechanical predicates; an evidence-bearing blind comparison can help assess properties scripts miss. Human review catches missing criteria, technically passing but poor work, and domain errors; feed specific complaints back into revision.

Compare mean pass rate, duration, and tokens by configuration as quality bought for resource cost. The source's numerical quality and cost figures are illustrative, not observed evaluation results. It cautions that variance estimates mean little with a few cases and a single run each. Inspect saturated assertions, unstable cases, outliers, and execution traces before adding guidance. Repeatedly reconstructed deterministic utilities may be worth bundling.

## Revision Loop

Give failed assertions, targeted human complaints, transcripts, and current instructions to the author; revise the general cause, not one example; rerun cases from fresh contexts and compare artifacts side by side. Remove over-constraining guidance. Automation can support this loop but cannot replace artifact inspection. `claude-code-skills-reference` adds product-specific routing tests; `anthropic-skill-authoring-best-practices` advocates evaluating before extensive writing.

## Analyst Takeaways

1. **Compare against a real baseline in clean sessions.** A skill-trigger log alone proves discovery, not usefulness; a polished demo alone cannot establish repeatability.
2. **Make assertions about effects, not wording or a prescribed trace.** For a coding skill, inspect changed behavior, executable checks, regressions, and the produced artifact before rewarding an attractive review narrative.
3. **Evaluate the trade-off, not only the pass rate.** Record tokens, time, false activations, and human-reported quality alongside correctness.
4. **Treat every failed or saturated assertion as a diagnostic.** Fix ambiguous tasks and insensitive graders before adding more instructions to `SKILL.md`.
5. **Keep human judgment attached to examples.** A small factory can use machine gates for repeatable checks and short human inspection for risks that the gates did not specify.

## Questions and Limitations

- This is a procedural guide, not a controlled study. Its benchmark figures are explicitly example data and cannot establish that Skills increase real pass rates by 50 points.
- Two or three cases can bootstrap an iteration but cannot bound long-tail failures or meaningful variance; larger task samples, repeats, and production monitoring are needed.
- LLM graders can be biased, assertions can be gamed, and the same authoring agent may overfit to visible cases; reserve untouched tasks and human adjudication where stakes justify it.
- Skill activation precision/recall and unsafe side effects are not fully specified by this output-oriented file; test routing and authority separately.

## Vault Ideas Extracted

* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md)
* [Evaluated Skill Routing](/vault/evaluated-skill-routing.md)
* [Skill Artifact Quality Gates](/vault/skill-artifact-quality-gates.md)
