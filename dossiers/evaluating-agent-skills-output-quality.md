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

This is the evaluation playbook of the seven-document set. The `agent-skills-format-specification` says what a skill package must look like; this document asks whether that package improves real outputs relative to a baseline. It supplies a concrete `evals/evals.json` schema, isolated workspace layout, grading examples, aggregation, human review, and a revision loop rather than claiming a measured cross-model gain.

## Define the Task and Preserve a Comparator

A case combines a realistic user `prompt`, a human-readable `expected_output`, and optional input `files`; the page suggests starting with **2–3** cases of varied phrasing, specificity, and edge conditions. In a workspace adjacent to the skill, each `iteration-N/eval-<case>/` records `with_skill/` and `without_skill/` outputs, `timing.json`, and `grading.json`. For an edit to an existing skill, snapshot the old version and compare `old_skill/` rather than a no-skill agent. Run each case from fresh context to avoid learned details from skill authoring or another run contaminating the comparison. Record total tokens and duration in milliseconds; the page notes Claude Code subagent completion notifications contain those values but do not persist them automatically.

The comparator must hold the task and input files fixed. A baseline can already satisfy most requests; if both variants pass the same assertions, the skill has not earned its ongoing context and maintenance cost. The illustrative CSV case asks for top three revenue months and a bar chart, and a separate case asks to clean missing email values.

## Grade the Deliverable, Then Inspect What the Grade Misses

After seeing first-run outputs, add specific assertions to `evals/evals.json`: a valid output file, exactly three charted months, labeled axes, or a title/caption mentioning revenue. Avoid assertions that demand one arbitrary string; do not convert subjective “good” into a fake pass/fail check. `grading.json` stores each assertion's PASS/FAIL with quoted or file-backed evidence. Code is preferable for mechanical predicates; an LLM judge can handle properties a script cannot see, but should show evidence and can compare two outputs blindly for holistic quality. Human review catches missing criteria, technically passing but poor work, and domain errors; specific feedback goes into `feedback.json`.

Aggregate mean pass rate, duration, and tokens per configuration in `benchmark.json`, reporting deltas as quality bought for resource cost. The sample JSON's **0.83 versus 0.33** pass rates, **45 versus 32 seconds**, and **3,800 versus 2,100 tokens** are an **illustrative example**, not observed evaluation results. The page cautions that standard deviation means little with just two or three cases and one run each. Inspect all-pass and all-fail assertions, unstable cases, outlier runs, and execution transcripts before adding guidance. If every run rebuilds the same utility, bundle it as a script.

## Revision Loop

Give failed assertions, targeted human complaints, transcripts, and current `SKILL.md` to the authoring agent; revise the general cause, not one example; rerun all cases in a new iteration; review side-by-side. Remove instructions if the skill is over-constraining the model. The `skill-creator` tool can automate this loop, but the page emphasizes actually reading the delivered artifacts. `claude-code-skills-reference` adds product-specific description-trigger tests and warns its plugin-eval and skill-creator formats are not interchangeable. `anthropic-skill-authoring-best-practices` recommends evaluations before writing extensive instructions.

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
