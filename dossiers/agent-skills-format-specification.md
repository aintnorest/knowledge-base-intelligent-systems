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

This page defines the common packaging and metadata contract for an Agent Skill. It is the normative format reference among this batch, unlike the evaluation procedure in `evaluating-agent-skills-output-quality`, Claude's runtime behavior in `claude-code-skills-reference`, or Codex's deployment choices in `openai-build-agent-skills`. A skill pairs discovery metadata with instructions and optional supporting material; the portability contract does not prescribe how every host selects or executes it.

## Directory and Frontmatter Contract

- The portable format requires a root instruction file with YAML frontmatter and Markdown guidance. Identification and description are required; the body may express steps, examples, and edge cases without a prescribed section structure.
- The identifier follows restricted naming and package-alignment rules. The spec's prose and examples differ on Unicode acceptance; that ambiguity warrants checking the current validator rather than inferring acceptance from either alone.
- The description states both capability and when to invoke it in recognizable task language. It is the selection interface, not a substitute for the detailed body.
- Optional metadata can convey licensing, environmental compatibility, and other client information. Tool preapproval is experimental and varies by host; it is not a portable security boundary. Supporting executables, references, and assets are conventions, not required package components.

## Progressive Disclosure and File Navigation

The spec describes three stages: brief discovery metadata available before selection; the root instructions loaded on invocation; and supporting files fetched only when needed. As of the ingest date it recommended keeping invoked instructions within a bounded context budget, but this is guidance rather than a guaranteed host limit. A helper can execute without its source entering working context, whereas read references contribute tokens. Make conditional detail directly reachable from the root rather than burying it behind several navigation hops.

The staging is a conceptual loader model, not a promise that every host uses identical routing, token accounting, or execution. `anthropic-agent-skills-platform-overview` explains Claude API/Code/claude.ai differences; `anthropic-skill-authoring-best-practices` supplies design advice.

## Analyst Takeaways

1. **Use the spec as a portability baseline, not the entire deployment contract.** Validate package metadata and directly reachable content; document host-specific extensions separately.
2. **Treat the description as an interface.** It determines whether expensive task guidance reaches an agent; test false activations and missed activations, not just schema validity.
3. **Place decision guidance in the root and conditional detail beside it.** The context savings materialize only if the target runtime actually delays loading ancillary files.
4. **Do not interpret tool preapproval as a universal security guarantee.** Grants are implementation-specific, and bundled execution remains a trust and permission decision.

## Questions and Limitations

- This is a format specification, not an experimental demonstration of better task quality or universal behavior across clients. There are no benchmark outcome numbers.
- The document recommends sizes but does not prescribe how clients resolve conflicts, rank skills, clip discovery listings, isolate execution, or enforce access controls.
- Claude Code accepts local metadata extensions and omitted identifiers that strict validators may reject; see `claude-code-skills-reference`.
- The page does not give version pinning or artifact provenance rules; organizations must separately review skill code, dependencies, and delegated authority.

## Vault Ideas Extracted

* [Evaluated Skill Routing](/vault/evaluated-skill-routing.md)
* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
* [Progressive Skill Disclosure](/vault/progressive-skill-disclosure.md)
