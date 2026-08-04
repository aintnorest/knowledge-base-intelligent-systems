---
type: Study Note
title: What You're Actually Writing When You Write a SKILL.md
description: Personal study notes on treating SKILL.md as a loader specification: progressive disclosure, runtime failure modes, portable environment guidance, and model-specific evaluation.
resource: https://internals.laxmena.com/p/what-youre-actually-writing-when
source: https://internals.laxmena.com/p/what-youre-actually-writing-when
tags: [agent-skills, context-engineering, token-efficiency, agents]
timestamp: 2026-07-13T16:07:29Z
---

# What You're Actually Writing When You Write a SKILL.md - Study Notes

**Author**: Lax Meiyappan  
**Publication**: INTERNALS.md #2  
**Date**: April 30, 2026

## What It Is

This practitioner essay argues that an agent skill is not principally a long prompt. It is a small program and, more specifically, a loader specification: its structure determines which instructions enter an agent's context, when they load, and at what cost.

The argument applies the progressive-disclosure model of the Agent Skills format. A skill's metadata is always available for routing; the `SKILL.md` body loads when the agent invokes the skill; and referenced material or executable helpers load only when the body directs the agent to them. The consequence is architectural: equivalent instructions can have very different context cost and reliability depending on which layer contains them.

## The Problem It Solves

It is easy to put a repository map, all workflows, examples, APIs, and every known exception into one `SKILL.md`. That makes authoring feel like prompt writing, but it makes every invocation pay for material that is not relevant to the immediate task. The article reports a restructuring from a roughly 1,200-line monolith to a 180-line procedural spine plus three references and a helper script; the reported context share fell from about 20% to 7% while preserving the task and output.

This cost compounds in long-running agent sessions. Early context consumption leaves less room for conversation, tool output, and task-specific evidence; it also makes compaction and context-related failures arrive sooner.

## Runtime Model

The article uses three layers:

1. **Metadata / frontmatter** — the small, always-loaded routing surface. Its description should identify when the skill is relevant, not attempt to teach the full workflow.
2. **`SKILL.md` body** — the invoked procedural payload. Keep the workflow and decisions here, while moving detail that is only conditionally useful out of the critical path.
3. **References and scripts** — deferred material. References are read only when needed; scripts are run for their output, so their implementation need not consume working context.

The kitchen metaphor is helpful: metadata is a concise wall menu, the body is the selected recipe, references are a consulted binder page, and scripts are appliances whose outputs matter more than their internals.

## Antipatterns and Repairs

### Promoting References into Skills

Putting frontmatter on reference files can make them visible at the top-level routing layer. The article reports that this can lead an agent to trigger a reference directly, stripped of the parent skill's workflow and context. Keep ordinary references as plain supporting documents; reserve skill frontmatter for actual top-level skills.

### One Monolithic Skill

An oversized body forces unrelated detail into the context whenever the skill triggers. Keep a short operational spine, then point to narrow references for module maps, contracts, framework details, or long examples. The objective is not minimal documentation; it is to defer documentation until it is relevant.

### Hardcoded Workspace Paths

Instructions such as "run the build in `modules/web`" encode a private repository layout. They can silently select the wrong place in a colleague's checkout or a different workspace. Replace path assumptions with discovery steps: inspect the workspace, find the build configuration or `package.json`, and identify the correct module before running a command.

### Missing Environment-Specific Gotchas

Models have generally reasonable priors, but a particular repository can violate them. The article's example is a Turborepo build that must run from the root even though working from the relevant package seems natural. Record short, explicit gotchas for these known exceptions, tied to an observable operation and corrective action.

### Treating a Model Upgrade as Transparent

A skill tuned for one model's interpretation and compliance behavior can degrade on another model—even a more capable one. The post's writing-skill example illustrates an instruction interpreted judiciously by one model and literally by another. Model changes should therefore be evaluated as behavior changes, rather than assumed upgrades.

## Evaluation Implication

The proposed discipline is paired evaluation: run representative prompts with and without the skill, then measure the improvement relative to the no-skill baseline. A small golden set can be rerun after skill edits or model changes. Combine automatable checks—such as output length or format adherence—with structured human review where the target is voice, usefulness, or correctness in context.

This changes the question from "did the skill work once?" to whether it reliably improves the desired outcome, at acceptable context, latency, and maintenance cost.

## My Takeaways

1. **Skill design is context-budget design.** Instruction placement is a runtime decision, not a documentation preference.
2. **Metadata deserves unusually careful writing.** It is the routing contract; a badly scoped description can prevent the right skill from activating or invite irrelevant activation.
3. **Portability requires discovery, not genericity alone.** Abstract instructions should tell the agent how to find local facts, while a compact gotchas section preserves the facts that must override its default assumptions.
4. **Deferred content has an interface.** A reference must be linked from a decision point in the skill body, and a script's input/output contract must be clear enough to use without reading its source.
5. **Model upgrades require regression tests.** More capability does not guarantee the same instruction interpretation or stylistic behavior.

## Questions and Limitations

- The reported 20%-to-7% reduction is a practitioner example, not a controlled result; token cost will depend on the harness, model, task, and actual reference-loading behavior.
- The three-level runtime model is a useful general abstraction, but individual agent environments may implement discovery, invocation, and frontmatter differently.
- Splitting material too aggressively can make a skill hard to navigate or cause agents to miss an important reference. The right criterion is decision relevance, not file count.
- Paired baseline evaluation can show benefit, but it needs task-representative cases and acceptance thresholds to avoid optimizing toward superficial output features.

## Vault Ideas Extracted

* [Progressive Skill Disclosure](/vault/progressive-skill-disclosure.md)
