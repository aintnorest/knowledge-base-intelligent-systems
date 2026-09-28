---
type: Synthesis
title: Progressive Skill Disclosure
description: Structuring a Skill so that its low-cost routing signal, focused root guidance, and heavy conditional material load in successive stages of need.
tags: [agent-skills, context-engineering, token-efficiency, agents]
timestamp: 2026-07-13T16:07:36Z
---

# Progressive Skill Disclosure

Progressive Skill disclosure separates the information an agent needs to decide *whether* to invoke a capability from the information it needs to execute a particular branch. This preserves complex domain knowledge without placing all of it in every session or every Skill invocation.

## The Layers

1. **Index** — a terse name and activation signal available for routing.
2. **Root guidance** — compact instructions needed for the common path and for choosing the next resource.
3. **Conditional resources** — deterministic transformations, exceptional references and reusable assets, loaded only for the relevant branch.

## Practical Use

Keep the root focused on decisions, invariants, and high-frequency failure modes. Move long reference material, special-case procedures, and deterministic transformations behind explicit conditions such as an error class, document type, or domain branch. For large knowledge sets, use a hierarchy that reduces an impossible many-way choice into a few smaller choices, then provide navigation aids so extra levels do not become dead ends.

## Format Budgets and Host Behavior

The portable boundary separates a small discovery signal from focused root guidance and on-demand resources. Recommended document sizes are authoring heuristics, not guaranteed host budgets. A host may truncate descriptions or drop skills from a crowded discovery list; after compaction, it may restore only part of a recently used skill. Test selection and reference navigation in the actual host, especially when a required detail lies beyond a truncation boundary.

## Evidence on Focus and Sufficiency

SkillsBench reports mean lifts of +19.0 points for tasks with one skill and for tasks with two or three, versus +10.1 for four or more. Comprehensive skill documentation gains only +0.7, against +19.0 and +21.5 for compact and standard documentation. These are cross-task associations, not proof that shorter is always better. A 238-file smell study flags both undelegated detail and missing examples or validation, so keep branch decisions, verifier-facing constraints and critical gotchas in the root. A 138,133-file audit finds resource-organization flags in 36.9% of skills without showing downstream failure. Disclosure also need not blind the router: SkillRouter loses 37–44 points of top-1 accuracy when routers see only name and description, so an upstream router may index full bodies while the worker sees only metadata until selection.

## Limitations

Indirection is not free. Excessive nesting can make required information hard to find, and a thin root can fail to tell the agent when to read the right accessory file. Test not only final task quality but also whether the agent reaches the required files and whether the staged structure improves on a simpler baseline.

## Sources

- [Designing, Refining, and Maintaining Agent Skills at Perplexity dossier](/dossiers/designing-refining-maintaining-agent-skills-perplexity.md) — describes an indexed, loaded, and runtime context-cost model plus directory structures for scripts, references, assets, configuration, and domain hierarchy.
- [Specification dossier](/dossiers/agent-skills-format-specification.md) — `SKILL.md` YAML `name` (1–64 characters), `description` (1–1,024), optional `scripts/`, `references/`, `assets/`; recommends ~100 discovery tokens, under 5,000 body tokens and 500 lines.
- [Agent Skills dossier](/dossiers/anthropic-agent-skills-platform-overview.md) — Claude metadata/body/resource staging across runtimes.
- [Equipping agents for the real world with Agent Skills dossier](/dossiers/anthropic-equipping-agents-with-skills.md) — root, reference and script loads as separate context decisions.
- [Skill authoring best practices dossier](/dossiers/anthropic-skill-authoring-best-practices.md) — one-level references and navigation cues for long references.
- [Extend Claude with skills dossier](/dossiers/claude-code-skills-reference.md) — Claude Code listing budget of 1% of context, description truncation and post-compaction reattachment of the first 5,000 tokens per recent skill (25,000 shared).
- [Build skills dossier](/dossiers/openai-build-agent-skills.md) — Codex initial listing capped at 2% of context or 8,000 characters, with trimming.
- [SkillsBench: Benchmarking How Well Agent Skills Work Across Diverse Tasks dossier](/dossiers/skillsbench-agent-skills-efficacy.md) — focused versus comprehensive skill bundles and paired lifts.
- [From Anatomy to Smells: An Empirical Study of SKILL.md in Agent Skills dossier](/dossiers/skill-md-anatomy-and-smells.md) — under- and over-specification smells.
- [What Keeps Agent Skills from Being Reusable? Evidence from 138K SKILL.md Files dossier](/dossiers/agent-skills-reusability-defects.md) — resource-organization defect prevalence.
- [SkillRouter: Skill Routing for LLM Agents at Scale dossier](/dossiers/skillrouter-skill-routing.md) — body-aware upstream routing versus metadata-only selection.
