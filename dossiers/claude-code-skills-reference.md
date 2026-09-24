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

The Claude Code implementation manual, not the portable Agent Skills spec. It documents placement, discovery, command naming, invocation permissions, injected shell commands, subagents, skill-content persistence, and testing. `agent-skills-format-specification` is the interoperable format baseline; `anthropic-agent-skills-platform-overview` contrasts product surfaces; `anthropic-skill-authoring-best-practices` gives model-facing prose advice. This source matters especially for coding workflows where a skill can run commands or confer temporary tool grants.

## Discovery and Scoping

A personal skill goes under `~/.claude/skills/`, a shared repo skill under `.claude/skills/`, a nested skill under a subdirectory's `.claude/skills/`, and managed or plugin skills have separate scopes. Nested skills below the starting directory enter availability only after Claude touches that subtree; parent skills up to the repo root load at launch. Additional directories must be explicitly added through `--add-dir` or `/add-dir`; merely granting file access through `permissions.additionalDirectories` does not load configuration. `claude.ai`-synced skills behave differently again, and local edits to synced copies can be overwritten. Same-name precedence is enterprise > personal > project, with nested variants and plugin namespaces separately addressable; a name collision is a behavioral change, not just a filename clash.

`name` is optional for a *local Claude Code* skill and the directory decides its `/command` name; `description` is recommended. This is more permissive than the open specification and uploaded package validation, which require `name` and `description`. Claude Code accepts extension fields such as `when_to_use`, `disable-model-invocation`, `user-invocable`, `paths`, `context: fork`, `agent`, `model`, `effort`, `hooks`, and `disallowed-tools`; uploads/API packaging reject non-standard keys. Legacy `.claude/commands/*.md` still work, but new capabilities belong in a skill folder.

## Invocation and Context Lifecycle

Default skills can be user-invoked with `/name` or selected automatically from descriptions. `disable-model-invocation: true` is appropriate for a side-effectful `/deploy` or `/commit`; its description is withheld from automatic selection. `user-invocable: false` does the converse for passive background knowledge. Descriptions are limited to a combined **1,536-character** listing entry before the global listing budget cuts them further. The guide says the skill-listing budget is **1% of model context**; least-invoked descriptions lose visibility first. `skillOverrides` can leave a name visible without description, make it user-only, or disable it. A badly formed YAML file can still load as body text with empty metadata, leaving manual invocation possible while automatic selection silently fails.

An invoked body enters the conversation as one message and persists across later turns, unlike a permission grant. Re-invoking unchanged rendered content does not duplicate it, but changed arguments or dynamic output append a fresh body. After compaction Claude Code reattaches at most **5,000 tokens per skill**, across a **25,000-token** shared budget, most-recent first; older or long content may disappear. Model behavior may still drift even if text remains. This is product behavior, not a portable format requirement.

## Execution, Authority, and Isolation

- `allowed-tools` grants tools without another prompt **only for the turn of invocation**; it does not restrict unlisted tools, is not gated by workspace trust, and project skills can self-grant broad actions. For restrictions use `disallowed-tools` and independent permission policy. Review repository-provided skills before running them.
- `!`-backtick commands or fenced `!` code blocks execute before Claude receives a skill message, injecting live output. A failure or denied permission can abort invocation; managed `disableSkillShellExecution` replaces those injections with a placeholder for supported sources. These commands are not executed from synced skills in ordinary local sessions.
- `$ARGUMENTS`, numbered or named arguments, and `${CLAUDE_SKILL_DIR}`/`${CLAUDE_PROJECT_DIR}` expand at invocation. Bound paths to the skill directory instead of trusting the current shell directory; dynamic outputs are data that still require source-aware handling.
- `context: fork` starts a subagent with the skill as its task, **not a copy of the conversation history**. It can run in background and may have narrower tools; independent edits may sit outside the parent session's rewind checkpoints. Only use it for standalone tasks with explicit inputs, not passive guidelines.

## Evaluate and Operate

The reference distinguishes discovery success from task success. Compare realistic prompts in fresh sessions with the skill enabled and disabled. A plugin can use `claude plugin eval`; the `skill-creator` plugin has its own `evals/evals.json`, isolated runs, assertion evidence, token/time statistics, blind version comparisons, and description-trigger tuning. Their formats are not interchangeable. For repeated launch workflows, bundled `/run`, `/verify`, and `/run-skill-generator` skills record or use project-specific recipes; they are examples of deploying procedural knowledge, not quality data.

## Analyst Takeaways

1. **Scope side effects at both selection and permission layers.** A manually invoked deployment skill and narrow external permission policy are stronger than a broad `allowed-tools` declaration.
2. **Test the actual loader and model after install.** Collision, nested-directory timing, listing truncation, and compaction can make a valid `SKILL.md` ineffective or differently effective.
3. **Treat shell injection as execution, not templating.** Audit the command, expansion variables, dependency content, and authority before accepting a project or plugin skill.
4. **Use isolated forks only for fully specified work.** They do not inherit a human's earlier conversation and background changes can complicate undo and oversight.
5. **Separate universal authoring advice from Claude-specific switches.** Do not ship `context: fork` or `disable-model-invocation` in a package expected to pass strict cross-platform upload validation.

## Questions and Limitations

- This is a moving, version-gated product reference; many behaviors specify Claude Code release thresholds and may change. No controlled evidence establishes quality gains from any switch.
- Skill text can persist longer than its one-turn permissions, and the auto-compacted copy can be shorter. Instruction persistence is not a security control.
- Broad self-grants, dynamic shell execution, mutable synced content, and same-name shadowing require installation review; the page documents mechanics, not a comprehensive hardening protocol.
- The document is extremely long and includes changing bundled-command inventories and a full visualizer script; those examples should not be mistaken for stable format requirements.

## Vault Ideas Extracted

* [Evaluated Skill Routing](/vault/evaluated-skill-routing.md)
* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
* [Progressive Skill Disclosure](/vault/progressive-skill-disclosure.md)
