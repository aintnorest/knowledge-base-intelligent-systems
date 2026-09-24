---
type: Study Note
title: Agent Skills
description: Anthropic's product-surface overview of reusable Claude Skills, progressive disclosure, API/container requirements, sharing scopes, security, and runtime constraints.
resource: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
source: /archive/anthropic-agent-skills-platform-overview.html
tags: [agent-skills, agents, agent-harness, context-engineering, agent-security]
timestamp: 2026-09-24T03:44:42Z
---

# Agent Skills — Study Notes

**Publisher**: Anthropic, Claude Platform Docs  
**Format**: Product overview; no publication date shown in saved page

## What It Is

This page explains how the Agent Skills format becomes usable in Claude products and where those products diverge. `agent-skills-format-specification` defines the portable directory contract; `anthropic-equipping-agents-with-skills` explains the motivating architecture; this source is chiefly about Claude API, Claude Code, and claude.ai deployment constraints, distribution, and trust. A Skill is a reusable filesystem directory with `SKILL.md` metadata and instructions plus optional code/reference files.

## Loading and Execution

Claude sees a skill's `name` and `description` at startup, then reads the full `SKILL.md` when a user request matches its description, then loads references or runs scripts only if needed. The overview estimates roughly **100 tokens per skill** for discovery and **under 5,000 tokens** for an invoked body; extra files cost no context until read. It illustrates a PDF-processing skill whose `FORMS.md` is never read for a text-extraction request. A script's output, unlike its source, enters the model context when the script runs. The filesystem can hold broad knowledge, but “unbounded” bundled material is not free if retrieval decisions fail or files are eventually loaded.

## Where a Skill Actually Runs

- **Claude API**: specify a `skill_id` under `container` alongside the code execution tool. Prebuilt identifiers include `pptx`, `xlsx`, `docx`, and `pdf`; custom skills are uploaded via `/v1/skills` and shared workspace-wide. The API sandbox has no network access or runtime package installation.
- **Claude Code**: custom skills are local directories at `~/.claude/skills/` or `.claude/skills/`, with no upload. Prebuilt document Skills are not available there, though the open-source Claude API skill is bundled. The local environment may have full network access; global package installs are discouraged.
- **claude.ai**: custom skills are uploaded as zip files through user settings, require code execution, and are available on specified paid plans. Uploads are per-user, not centrally shared through an org admin. Prebuilt document Skills are supplied. Network availability depends on settings.
- **Other platforms**: prebuilt and uploaded Skills are also supported on Claude Platform on AWS and Microsoft Foundry, with the latter requiring a Hosted on Anthropic deployment and following API runtime limitations.

Custom skills **do not synchronize across these surfaces**; the same directory must be deployed separately. The overview's Claude-specific structure forbids reserved names containing `anthropic` or `claude` and XML tags in metadata in addition to the length limits. Consult `claude-code-skills-reference` for its more detailed local discovery and extension-field rules.

## Security and Governance Boundary

A skill can influence tool use, run bundled code, and point Claude at external material. Anthropic recommends auditing every file, scripts, dependencies, unusual network calls, and data exposure as if installing software; externally fetched instructions can change. The document says Agent Skills are **not covered by ZDR arrangements**. Optional Skill content scanning for claude.ai/Cowork uploads does **not** cover API or Console uploads, so it is not a universal approval mechanism.

## Analyst Takeaways

1. **Package once, test and deploy per surface.** File format portability does not imply synced availability, equivalent package installation, or identical network and dependency behavior.
2. **Make runtime requirements explicit.** A coding skill that fetches packages at invocation will work differently on an API container without network versus a developer workstation.
3. **Review a skill as executable authority, not a passive prompt.** Bound filesystem, credential, network, and tool permissions before trusting external skill packages.
4. **Track the deployment plane in the evaluation record.** A successful local Claude Code run is not evidence that an uploaded API skill has the same dependencies or behavior.

## Questions and Limitations

- Product documentation gives no comparative success measurements; the token figures are architectural estimates rather than benchmark outcomes.
- Sharing, bundled-skill availability, versions, and host constraints can change. Verify current runtime capabilities during rollout.
- A content scan is not proof of safety, and no reference-monitor or dependency-pinning design is specified here.
- The overview describes `name` as required, but Claude Code's local loader allows omission; distinguish standard validity, upload validation, and local loader permissiveness.

## Vault Ideas Extracted

* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
* [Progressive Skill Disclosure](/vault/progressive-skill-disclosure.md)
