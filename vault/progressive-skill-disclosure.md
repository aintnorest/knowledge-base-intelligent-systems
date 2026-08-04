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
2. **Root guidance** — the compact `SKILL.md` instructions needed for the common path and for choosing the next resource.
3. **Conditional resources** — scripts for deterministic work, references for exceptional or heavy documentation, assets for templates and schemas, configuration for setup, and nested folders for large domains.

## Practical Use

Keep the root focused on decisions, invariants, and high-frequency failure modes. Move long reference material, special-case procedures, and deterministic transformations behind explicit conditions such as an error class, document type, or domain branch. For large knowledge sets, use a hierarchy that reduces an impossible many-way choice into a few smaller choices, then provide navigation aids so extra levels do not become dead ends.

## Limitations

Indirection is not free. Excessive nesting can make required information hard to find, and a thin root can fail to tell the agent when to read the right accessory file. Test not only final task quality but also whether the agent reaches the required files and whether the staged structure improves on a simpler baseline.

## Sources

- [Designing, Refining, and Maintaining Agent Skills at Perplexity dossier](/dossiers/designing-refining-maintaining-agent-skills-perplexity.md) — describes an indexed, loaded, and runtime context-cost model plus directory structures for scripts, references, assets, configuration, and domain hierarchy.
