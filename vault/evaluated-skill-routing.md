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

## Routing Evidence Beyond Trigger Tests

Discovery must be tested against the real inventory and host budget. A valid skill can drop out of Codex's initial list when its discovery budget overflows. Claude Code abbreviates descriptions and caps description plus `when_to_use` at 1,536 characters. Front-load the positive trigger and the most important exclusion, and rerun positive, near-neighbor negative and false-trigger probes after adding or renaming skills. Manual-only invocation is a separate setting (`disable-model-invocation: true` in Claude Code; `policy.allow_implicit_invocation: false` in Codex's `agents/openai.yaml`), and neither restricts which tools a manually invoked skill may run.

Evaluate three transitions separately: **description → load**, **load → appropriate use**, and **use → task outcome**.

- In a BM25 stress test over 20,000 skills, routing-clean files reach 88.5% Hit@1 versus 82.6% for defective ones. That measures lexical discoverability only.
- With skill pools of 5–100, precision of ground-truth skill use during execution drops from 29.6% to 3.3%, while task success barely moves (36.4% → 39.3%).
- SkillRouter finds a 37.3–44.0-point Hit@1 drop when routers see only name and description in an ~80K-skill registry.
- Skill or Skip shows that a correctly retrieved skill can still be unnecessary. Branching from the same state with and without the skill improved ALFWorld success from 75.8% to 86.7%, and BFCL from 18.5% to 24.2%.

## Limitations

Routing evaluation is only as representative as its queries. Natural-language triggers can change behavior across model families or model updates, and a correctly loaded Skill can still fail at the task. Combine routing tests with progressive-read checks and end-to-end evaluations.

## Sources

- [Designing, Refining, and Maintaining Agent Skills at Perplexity dossier](/dossiers/designing-refining-maintaining-agent-skills-perplexity.md) — presents Skill descriptions as routing triggers and recommends positive, negative, forbidden-load, and cross-model evaluations.
- [Specification dossier](/dossiers/agent-skills-format-specification.md) — description semantics; schema validity does not measure selection.
- [Evaluating skill output quality dossier](/dossiers/evaluating-agent-skills-output-quality.md) — fresh with-skill versus baseline runs graded on outputs.
- [Extend Claude with skills dossier](/dossiers/claude-code-skills-reference.md) — listing budget, description clipping, and manual-only invocation.
- [Build skills dossier](/dossiers/openai-build-agent-skills.md) — discovery-list truncation and implicit-invocation policy.
- [What Keeps Agent Skills from Being Reusable? Evidence from 138K SKILL.md Files dossier](/dossiers/agent-skills-reusability-defects.md) — BM25 routing-clean versus defective Hit@1.
- [Demystifying Agent Skills: Why They Work—Until They Don’t dossier](/dossiers/demystifying-agent-skills-why-they-work.md) — pool-size experiment separating ranking, selection, use and success.
- [SkillsBench: Benchmarking How Well Agent Skills Work Across Diverse Tasks dossier](/dossiers/skillsbench-agent-skills-efficacy.md) — reading a skill is not sufficient for verifier success.
- [SkillRouter: Skill Routing for LLM Agents at Scale dossier](/dossiers/skillrouter-skill-routing.md) — body-visibility routing gap at scale.
- [Skill or Skip? Learning Selective Skill Invocation in Agentic Tasks via Dual-Granularity Preference Learning dossier](/dossiers/skill-or-skip-agent-skills.md) — learned invoke/skip decisions from shared-prefix comparisons.
- [SkillWeaver: Web Agents can Self-Improve by Discovering and Honing Skills dossier](/dossiers/skillweaver-web-agent-skill-learning.md) — wrong-API selection and argument errors as separate failure modes.
