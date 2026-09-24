---
type: Synthesis
title: Skill Artifact Quality Gates
description: "Treating a reusable agent skill as an artifact that must pass admission, routing, paired-execution, transfer, and adversarial-lesson gates, instead of assuming a well-formed SKILL.md is a helpful one."
tags: [agent-skills, evaluation, verification, coding-agents, agents]
timestamp: 2026-09-24T03:56:19Z
---

# Skill Artifact Quality Gates

A reusable agent skill is not good just because its SKILL.md parses or a linter finds no style problems. It must be selected on the right requests, teach a useful procedure, stay applicable in the target environment, support checks of its result, and avoid degrading a capable no-skill agent. Treat publication and revision as a series of observable gates, not a documentation-completeness exercise. This is the quality half of skill governance; for the security half, see [Skill Supply-Chain Admission](/vault/skill-supply-chain-admission.md).

## Gates

1. **Admission.** Check required metadata, readable resource paths, live dependencies, task-relevant trigger wording, and the absence of embedded secrets or obvious unsafe effects. A static smell is a review signal, not proof that a task will fail.
2. **Routing.** Test positive requests and semantically adjacent negative requests in the real model and harness, and record missed and forbidden loads (see [Evaluated Skill Routing](/vault/evaluated-skill-routing.md)).
3. **Paired execution.** Run matched no-skill, direct-memory (where applicable) and with-skill trials on representative tasks. Inspect actual file reads, tool use, output artifacts, runtime verification and code quality, not only the final message. Treat a regression against no-skill as a promotion blocker.
4. **Transfer and budget.** Move the skill to another repository or model version, vary the skill pool and nearby distractors, and watch for hardcoded paths, excessive context or brittle pipelines causing regressions.
5. **Adversarial lesson testing.** A lesson distilled from a successful trace suggests a rule but does not establish where it applies. Give each lesson a trigger, desired effect, constraints and known risks. Generate an executable counterexample that activates the trigger while stressing a constraint, and replay it before accepting an update. Challenge co-activating lessons together, because individually sound rules can conflict over ownership, ordering or resource limits.
6. **Maintenance.** Tie each instruction or gotcha to a failure it prevents. Revise or remove stale rules after model, tool, dependency and environment changes.

## Evidence

SkillsBench's 87 paired tasks show curated-skill gains alongside 13 tasks with negative deltas. A 238-skill study proposes 26 authoring smells but runs no causal outcome test. A 138,133-file static audit separates admission defects from lexical routing failures. Matched trajectory analysis identifies procedural anchoring as the main mechanism by which skills help, along with a measurable misapplication rate. In TRAIL's C-to-Rust ablation, removing composition checks cut project test pass from 69% to 66%, and removing individual challenges as well cut it to 63%.

## Limitations

A clean SKILL.md can still encode a wrong assumption or hide harmful script behavior. Popular-skill corpora overrepresent particular marketplaces, and benchmark gains from expert-curated packages can overstate ordinary workplace benefit. A challenger may share the solver's blind spots, and lesson combinations grow quickly. No single linter score or paired run establishes generalizable quality.

## Sources

- [From Anatomy to Smells: An Empirical Study of SKILL.md in Agent Skills dossier](/dossiers/skill-md-anatomy-and-smells.md) — 238 popular skills and 26 proposed smells, without a causal task-outcome experiment.
- [What Keeps Agent Skills from Being Reusable? Evidence from 138K SKILL.md Files dossier](/dossiers/agent-skills-reusability-defects.md) — 138,133 static skill files, lexical routing comparison, and repair limits.
- [SkillsBench: Benchmarking How Well Agent Skills Work Across Diverse Tasks dossier](/dossiers/skillsbench-agent-skills-efficacy.md) — 87 paired tasks with curated-skill gains and 13 negative-delta cases.
- [Demystifying Agent Skills: Why They Work—Until They Don’t dossier](/dossiers/demystifying-agent-skills-why-they-work.md) — procedural anchoring versus misapplication in matched trajectories.
- [Translator vs. Challenger: Adversarial Agentic Learning for C-to-Rust Translation dossier](/dossiers/trail-translator-challenger-c-to-rust.md) — counterexample-challenged lessons with composition checks and replay-gated updates.
- [Evaluating skill output quality dossier](/dossiers/evaluating-agent-skills-output-quality.md) — with-skill versus baseline evaluation workflow with graded evidence and cost tracking.
