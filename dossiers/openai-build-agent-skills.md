---
type: Study Note
title: Build skills
description: OpenAI's ChatGPT and Codex skill-authoring guide, including discovery-budget truncation, explicit versus implicit invocation, local scopes, plugins, and opt-out policy.
resource: https://learn.chatgpt.com/docs/build-skills
source: /archive/openai-build-agent-skills.html
tags: [agent-skills, agents, coding-agents, agent-harness, context-engineering]
timestamp: 2026-09-24T03:44:42Z
---

# Build skills — Study Notes

**Publisher**: OpenAI, ChatGPT Learn  
**Format**: ChatGPT/Codex product guide; no publication date shown in the saved page

## What It Is

This is OpenAI's product-specific interpretation of the open Agent Skills standard. Unlike the `agent-skills-format-specification`, it focuses on discovery, user versus model selection, inventory truncation, and distribution. It overlaps with Anthropic's `anthropic-agent-skills-platform-overview` on progressive loading, but activation and distribution are runtime-specific.

## Discovery and Context Budget

Name and description appear first; the root instructions load only after selection. Codex also advertises the skill's location in its initial listing. As of the ingest date, that listing was capped at **2% of model context or 8,000 characters if context size was unknown**. Descriptions shortened first, and sufficiently large inventories could omit skills with a warning. This limits discovery, not an invoked body; put decisive intent and exclusions early so truncation does not erase the routing boundary.

Users can select a skill explicitly, while either product may select one implicitly from its description. The guide also describes turning demonstrated workflows into reusable guidance. Focused skills clarify expected inputs and outcomes; deterministic work or external tools may warrant a helper rather than more prose.

## Local Scope and Distribution

Codex discovers skills across working-directory ancestry, user and administrator scopes, and bundled system packages. Same-name entries can remain distinct in selectors rather than being merged; linked directories may also be discovered. Discovery changes may not immediately appear in every session, and a skill can be disabled without deleting its package.

Standalone skills and distributable plugins have different reach. A plugin can package several skills alongside connections and presentation material, but packaging does not change the behavioral contract of a selected skill. The host also offers a way to opt out of implicit invocation for sensitive skills; that extension is not part of the portable format.

## Analyst Takeaways

1. **Make the first sentence of the description do real routing work.** Inventory clipping can erase later scope clauses and change whether the coding agent finds a useful skill.
2. **Test both implicit matches and explicit invocations.** For risky or expensive procedures, disable implicit activation and retain a clear user-controlled entry point.
3. **Keep distribution separate from behavior.** Start with a small repo-scoped workflow; package a plugin only when multiple users or connectors actually need it.
4. **Specify scope and collision behavior in deployment review.** Parent project, user, and administrator inventories can alter the available set even when the current skill is unchanged.

## Questions and Limitations

- Product documentation supplies rules and examples, not measured task-quality outcomes or precision/recall of implicit selection.
- The **2%/8,000-character** discovery budget and plugin availability are specific to the captured OpenAI product state and need rechecking after upgrades.
- A clipped listing may omit a skill entirely; a well-written description cannot compensate for a host that never advertises it.
- An implicit-invocation opt-out is a routing control, not least-privilege sandboxing of invoked scripts or connected tools.

## Vault Ideas Extracted

* [Evaluated Skill Routing](/vault/evaluated-skill-routing.md)
* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
* [Progressive Skill Disclosure](/vault/progressive-skill-disclosure.md)
