---
type: Study Note
title: Specification
description: The interoperable Agent Skills directory and SKILL.md contract, including required metadata, optional fields, progressive disclosure, and validation rules.
resource: https://agentskills.io/specification
source: /archive/agent-skills-format-specification.html
tags: [agent-skills, agents, context-engineering, tool-use]
timestamp: 2026-09-24T03:44:42Z
---

# Specification — Study Notes

**Publisher**: Agent Skills (agentskills.io)  
**Format**: Open-format reference specification; no publication date shown in the saved page  
**Scope**: Portable skill package, not a particular vendor's runtime

## What It Is

This page defines the common filesystem and metadata contract for an Agent Skill. It is the normative format reference among this batch, unlike the test procedure in `evaluating-agent-skills-output-quality`, Claude's product-specific behavior in `claude-code-skills-reference`, or Codex's deployment choices in `openai-build-agent-skills`. A skill is a directory containing a required `SKILL.md`; its YAML frontmatter describes discovery and its Markdown body gives execution instructions. Other directories and files are permitted, not prerequisites.

## Directory and Frontmatter Contract

- The root `SKILL.md` must have YAML frontmatter followed by Markdown. `name` and `description` are required. The body has no prescribed section format; steps, examples, and edge cases are recommended.
- `name` is 1–64 characters, lowercase letters/digits/hyphens; no initial or terminal hyphen, no consecutive hyphens, and it must match the containing directory. The spec's prose says “unicode lowercase alphanumeric” but immediately exemplifies ASCII `a-z` and `0-9`; validate with the reference tool rather than inferring Unicode acceptance from that wording.
- `description` is 1–1,024 characters. It should state both capability and when to invoke it, including recognizable task keywords. This is the decision surface for selection, not a substitute for the body.
- Optional `license` names or locates license terms; `compatibility` describes product, package, network, or environment requirements and is limited to 1–500 characters when present; `metadata` maps arbitrary string keys to string values.
- Optional `allowed-tools` is a space-separated list of pre-approved tools and is **experimental**: support varies across agents. It is not a portable security boundary. A skill can include `scripts/` for executable helpers, `references/` for documentation, and `assets/` for templates/data; these are conventions, not exhaustive allowable directories.

## Progressive Disclosure and File Navigation

The spec describes three stages: approximately 100 tokens of name and description per skill at startup; the invoked `SKILL.md` body, recommended below 5,000 tokens and under 500 lines; and supporting files loaded only as needed. A script can run without the agent putting its source into working context, whereas a reference file contributes tokens when read. Keep paths relative to the skill root, make needed files directly discoverable from `SKILL.md`, and avoid deeper-than-one-level reference chains. `skills-ref validate ./my-skill` checks frontmatter and naming conventions.

These numbers and staging are authoring recommendations and a conceptual loader model, not a promise that every host uses identical routing, token accounting, or execution. `anthropic-agent-skills-platform-overview` explains Claude API/Code/claude.ai differences; `anthropic-skill-authoring-best-practices` supplies much richer examples and design advice.

## Analyst Takeaways

1. **Use the spec as a portability baseline, not the entire deployment contract.** Require a matching directory/name, valid YAML, scoped description, and directly reachable files; document extensions separately.
2. **Treat the description as an interface.** It determines whether expensive task guidance reaches an agent; test false activations and missed activations, not just schema validity.
3. **Place decision guidance in the root and conditional detail beside it.** The context savings materialize only if the target runtime actually delays loading ancillary files.
4. **Do not interpret `allowed-tools` as a universal approval guarantee.** Tool grants are implementation-specific, and executing bundled scripts is a trust and permission decision.

## Questions and Limitations

- This is a format specification, not an experimental demonstration of better task quality or universal behavior across clients. There are no benchmark outcome numbers.
- The document recommends sizes but does not prescribe how clients resolve conflicts, rank skills, clip discovery listings, isolate execution, or enforce access controls.
- Claude Code deliberately accepts extension fields and, for local skills, can omit `name`; see `claude-code-skills-reference`. Such a package is not necessarily portable to a strict spec validator.
- The page does not give version pinning or artifact provenance rules; organizations must separately review skill code, dependencies, and delegated authority.

## Vault Ideas Extracted

* [Evaluated Skill Routing](/vault/evaluated-skill-routing.md)
* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
* [Progressive Skill Disclosure](/vault/progressive-skill-disclosure.md)
