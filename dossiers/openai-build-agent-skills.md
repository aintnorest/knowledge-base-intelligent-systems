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

This is OpenAI's product-specific interpretation of the open Agent Skills standard. Unlike the `agent-skills-format-specification`, it focuses on where ChatGPT and Codex discover a skill, how a user invokes it, how inventory truncation changes selection, and how a local workflow becomes a distributable plugin. It overlaps with Anthropic's `anthropic-agent-skills-platform-overview` on progressive loading, but its paths, activation syntax, metadata, and distribution mechanism are not interchangeable.

## Discovery and Context Budget

A directory contains `SKILL.md` with `name` and `description`; scripts, references, assets, and `agents/openai.yaml` are optional. Name and description appear first, then the full root file loads when the skill is selected. Codex also advertises the skill path in its initial list. That list is capped at **2% of model context or 8,000 characters if context size is unknown**. Descriptions are shortened first; sufficiently large inventories may omit skills with a warning. The cap is for *discovery listing*, not the body of a selected skill. Front-load intent and exclusions so abbreviated descriptions retain the relevant boundary.

Users can explicitly choose a skill in ChatGPT with `@`, or use `/skills` and `$skill` in Codex CLI/IDE; either product can implicitly select it based on the description. The guide proposes `Record & Replay` from a demonstrated workflow, or a `$skill-creator`/`@skill-creator` for prompted creation; instruction-only is the creator's default. A focused skill should have explicit inputs/outputs and use scripts when deterministic work or external tools warrant them.

## Local Scope and Distribution

Codex scans `.agents/skills` from current working directory up to repo root and also reads `$HOME/.agents/skills`, `/etc/codex/skills`, and bundled system skills. Both same-name skills can appear in selectors rather than being merged. Symlinked directories are followed. Codex detects skill changes automatically, though restarting may be needed if one fails to appear. `~/.codex/config.toml` can disable a skill by path without deleting it.

Standalone skills are available in ChatGPT desktop, Codex CLI, and the IDE extension. For broader installability, OpenAI recommends plugins: they can bundle one or more skills, MCP connections/configuration, and presentation assets; the universal plugin directory serves additional ChatGPT Chat/Work and Codex surfaces. `agents/openai.yaml` can set UI labels/icons, dependencies, and `policy.allow_implicit_invocation: false`, so a sensitive skill stays explicitly invoked. This is an OpenAI extension, not a requirement of the format specification. The guide points to `$skill-installer` for curated local installs.

## Analyst Takeaways

1. **Make the first sentence of the description do real routing work.** Inventory clipping can erase later scope clauses and change whether the coding agent finds a useful skill.
2. **Test both implicit matches and explicit invocations.** For risky or expensive procedures, disable implicit activation and retain a clear user-controlled entry point.
3. **Keep distribution separate from behavior.** Start with a small repo-scoped workflow; package a plugin only when multiple users or connectors actually need it.
4. **Specify scope and collision behavior in deployment review.** Parent repo, user, and admin skill inventories can change the available set even when the current folder's `SKILL.md` is unchanged.

## Questions and Limitations

- Product documentation supplies rules and examples, not measured task-quality outcomes or precision/recall of implicit selection.
- The **2%/8,000-character** discovery budget and plugin availability are specific to the captured OpenAI product state and need rechecking after upgrades.
- A clipped listing may omit a skill entirely; a well-written description cannot compensate for a host that never advertises it.
- `allow_implicit_invocation: false` is a routing control, not least-privilege sandboxing of the invoked scripts or connected MCP tools.

## Vault Ideas Extracted

* [Evaluated Skill Routing](/vault/evaluated-skill-routing.md)
* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
* [Progressive Skill Disclosure](/vault/progressive-skill-disclosure.md)
