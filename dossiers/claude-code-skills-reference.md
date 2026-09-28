---
type: Study Note
title: Extend Claude with skills
description: Claude Code's skill runtime reference covering loading scopes, frontmatter extensions, invocation and tool permissions, dynamic context, subagents, compaction, and evaluation.
resource: https://code.claude.com/docs/en/skills
source: /archive/claude-code-skills-reference.html
tags: [agent-skills, agents, coding-agents, agent-harness, tool-use, evaluation]
timestamp: 2026-09-24T03:44:42Z
---

# Extend Claude with skills — Study Notes

**Publisher**: Anthropic, Claude Code Docs  
**Format**: Extensive product-runtime reference; no publication date shown in the saved page

## What It Is

The Claude Code runtime reference, not the portable Agent Skills spec. It describes discovery scope, invocation authority, dynamic context, subagents, persistence, and testing. `agent-skills-format-specification` is the interoperable baseline; `anthropic-agent-skills-platform-overview` contrasts product surfaces; `anthropic-skill-authoring-best-practices` covers model-facing prose. This source matters where a skill can execute commands or temporarily grant tools.

## Discovery and Scoping

Skills enter discovery through personal, project, managed, or plugin scopes. Nested project skills may become available only after the agent touches their subtree; access to a directory alone does not imply its skills are discovered. Synced copies can overwrite local changes. Same-name collisions have scope-dependent precedence, while separately namespaced variants remain addressable; availability is thus a property of the loader and working location, not only the package.

The local loader permits missing names and uses the containing directory for identification, unlike stricter portable or upload validation. It also accepts runtime-specific metadata extensions that uploaded packages may reject. Legacy command files remain supported, but richer skill behavior uses the skill package.

## Invocation and Context Lifecycle

Skills can be selected by the user or automatically from their descriptions. Side-effectful skills can exclude automatic selection, and background guidance can be excluded from user-facing invocation. As of the ingest date, descriptions had a fixed per-entry character cap and shared listing budget proportional to model context; rarely invoked entries lost visibility first. Overrides could suppress a description or disable a skill. Malformed metadata could leave manual access possible while defeating automatic routing.

An invoked body enters the conversation as one message and persists across later turns, unlike a permission grant. Re-invoking unchanged rendered content does not duplicate it, but changed arguments or dynamic output append a fresh body. After compaction Claude Code reattaches at most **5,000 tokens per skill**, across a **25,000-token** shared budget, most-recent first; older or long content may disappear. Model behavior may still drift even if text remains. This is product behavior, not a portable format requirement.

## Execution, Authority, and Isolation

- Tool declarations grant listed tools without another prompt **only for the invocation turn**; they do not restrict unlisted tools, and project skills can grant broad actions. Restrictions require independent policy. Review repository-provided skills before running them.
- Dynamic shell content executes before the model receives the skill message and injects live output. Failed or denied execution can abort invocation; managed policy can suppress execution for supported sources. Treat injected output as untrusted data and audit the authority of the command.
- Invocation-time arguments and directory references can alter rendered content. Resolve files relative to the skill package rather than assuming the current shell directory, and treat expanded content according to its source.
- A forked skill starts a subagent with the skill as its task, **not a copy of conversation history**. Background edits may sit outside the parent session's rewind checkpoints. Use forks for standalone tasks with explicit inputs, not passive guidelines.

## Evaluate and Operate

The reference distinguishes discovery success from task success. Compare realistic prompts in fresh sessions with and without the skill. Its evaluation approaches include isolated runs, artifact assertions, resource costs, blind comparisons, and routing checks, but their formats are not interchangeable. Bundled procedural workflows illustrate reuse, not evidence of quality improvement.

## Analyst Takeaways

1. **Scope side effects at both selection and permission layers.** User-controlled invocation and narrow independent policy are stronger than a broad temporary grant.
2. **Test the actual loader and model after install.** Collision, nested-directory timing, listing truncation, and compaction can make a valid skill ineffective or differently effective.
3. **Treat shell injection as execution, not templating.** Audit the command, expanded inputs, dependency content, and authority before accepting a project or plugin skill.
4. **Use isolated forks only for fully specified work.** They do not inherit earlier conversation, and background changes can complicate undo and oversight.
5. **Separate universal authoring advice from runtime-specific extensions.** Locally valid metadata may fail strict cross-platform validation.

## Questions and Limitations

- This is a moving, version-gated product reference; many behaviors specify Claude Code release thresholds and may change. No controlled evidence establishes quality gains from any switch.
- Skill text can persist longer than its one-turn permissions, and the auto-compacted copy can be shorter. Instruction persistence is not a security control.
- Broad self-grants, dynamic shell execution, mutable synced content, and same-name shadowing require installation review; the page documents mechanics, not a comprehensive hardening protocol.
- The document is extremely long and includes changing bundled-command inventories and a full visualizer script; those examples should not be mistaken for stable format requirements.

## Vault Ideas Extracted

* [Evaluated Skill Routing](/vault/evaluated-skill-routing.md)
* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
* [Progressive Skill Disclosure](/vault/progressive-skill-disclosure.md)
