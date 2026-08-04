---
type: Synthesis
title: Evaluated Skill Routing
description: Treating an agent Skill's description and activation boundary as a tested classifier that must maximize useful loads while preventing off-target context injection.
tags: [agent-skills, routing, evaluation, agents, context-engineering]
timestamp: 2026-07-13T16:07:36Z
---

# Evaluated Skill Routing

An agent Skill's activation rule is part of its behavior, not explanatory metadata. Whether expressed as a short natural-language description, a classifier, or a rule, the routing boundary determines when specialized context enters the conversation—and when it distracts from the task.

## The Pattern

- Define the boundary in terms of user intent and language, rather than a summary of the Skill's internal workflow.
- Build positive cases from requests that require the specialized behavior.
- Include neighboring, plausible-but-wrong requests as negative or forbidden-load cases.
- Measure load precision, recall, and interference with existing Skills alongside end-to-end task quality.
- Treat a changed description or routing rule as a behavior change: evaluate it before release and regression-test related Skills.

## Practical Use

Start from real production queries and failures, then add concise examples of how users actually ask for the work. For a narrow Skill, err toward non-activation when an off-target load would add large context or steer the agent into the wrong tool path. Review the Skill inventory as a whole: each new trigger competes for attention and can shift the routing of adjacent capabilities.

## Limitations

Routing evaluation is only as representative as its queries. Natural-language triggers can change behavior across model families or model updates, and a correctly loaded Skill can still fail at the task. Combine routing tests with progressive-read checks and end-to-end evaluations.

## Sources

- [Designing, Refining, and Maintaining Agent Skills at Perplexity dossier](/dossiers/designing-refining-maintaining-agent-skills-perplexity.md) — presents Skill descriptions as routing triggers and recommends positive, negative, forbidden-load, and cross-model evaluations.
