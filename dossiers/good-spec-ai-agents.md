---
type: Study Note
title: How to write a good spec for AI agents
description: Addy Osmani's guide to an outcome-first, living coding-agent specification with bounded task context, explicit action boundaries, staged planning, and checkable acceptance criteria.
resource: https://addyosmani.com/blog/good-spec/
source: /archive/good-spec-ai-agents.html
tags: [coding-agents, prompting, decomposition, human-in-the-loop, verification, agents]
timestamp: 2026-09-24T03:45:44Z
---

# How to write a good spec for AI agents — Study Notes

**Author**: Addy Osmani  
**Publisher**: AddyOsmani.com (personal guide, not Google policy)  
**Published**: January 13, 2026

## What It Is

This long-form guide addresses a narrower problem than Osmani's general coding workflow: how to make a specification detailed enough to anchor an agent yet compact and modular enough to be usable. It proposes five practices: begin with the outcome, organize the operational contract, decompose the context, encode permissions and verification, and revise the spec when implementation reveals missing information. The post explicitly notes it was formatted using Gemini; it is a practitioner synthesis with cited examples rather than a controlled spec-quality experiment.

## From Product Intent to Executable Work

Start with a brief stating the user, problem and success conditions. Let an agent propose more detail, but *review the draft before treating it as authoritative*. Osmani recommends a read-only planning mode for exploring existing code and asking questions before edits. The four-stage flow he borrows from GitHub Spec Kit is **specify → plan → tasks → implement**: user experience and desired behavior first; technical design and constraints second; reviewable tasks and dependencies third; code only after the earlier artifacts are judged adequate. The spec must be versioned and updated when a data model changes or scope is cut, rather than leaving old instructions to compete with new ones.

The guide suggests a practical six-area checklist, attributed to an analysis of over 2,500 agent configuration files: executable commands, testing instructions, project structure, code style with a real example, Git workflow, and forbidden/approval boundaries. These are *agent operating instructions*, not substitutes for user-visible functional requirements; a PRD-like 'what and why' and an SRS-like 'how and constraints' serve different purposes.

## Modular Context and Authority

A large document should be an indexed reference, not the prompt for every task. Divide backend, frontend and other contracts by responsibility; keep a short navigable outline and load the current task's section alongside non-negotiable global invariants. A backend worker needs the data contract, and a frontend worker needs the agreed API; neither should assume a specialized context is the entire system. Parallel workers require explicit interface and ownership boundaries.

Osmani proposes three action tiers: **always** (safe default duties, such as run relevant checks), **ask first** (e.g., schema or dependency changes with material impact), and **never** (e.g., commit secrets). These must correspond to actual permissions and approval mechanisms when consequences matter; a prompt alone is not enforcement. His self-check suggestions include comparing work against an acceptance list, conformance suites derived from required input/output behavior, automated tests, and a separate model judge for subjective style or architecture. The agent's checklist is only a self-report until independently checked.

## Scale Detail to Risk

A trivial, isolated styling tweak does not need a huge PRD; an OAuth flow with refresh, failure handling and security constraints does. Spec detail should follow ambiguity and consequence. For a long spec, the guide recommends a short section-level map and targeted retrieval instead of pasting 50 pages. Run checks after milestones and revise the spec itself if a discovered failure came from unclear requirements, not only from bad implementation.

## Analyst Takeaways

1. **Write the observable outcome before commands.** For a light software factory, user behavior and acceptance boundaries prevent a perfectly compliant agent from implementing the wrong thing.
2. **Separate the stable global rules from task-local context.** Load the small relevant slice and explicit cross-slice API, not every source file and every preference on every turn.
3. **Use planning approval as a substantive gate.** Ask what assumptions, omitted edge cases and integration dependencies the plan commits the team to before launching builders.
4. **Bind 'ask first' to authority.** If the runner can still alter secrets, CI or production despite a prose boundary, the boundary is decorative.
5. **Make examples and tests independent of the agent's own optimism.** A sample input/output or conformance test can expose a plausible wrong implementation; self-reported completion cannot.

## Questions and Limitations

- The cited 'six core areas' and 'most effective' three-tier pattern are reported secondhand. The guide does not reproduce the dataset, selection method, task outcomes, or causal comparison behind the 2,500-file analysis.
- 'Let the AI draft details' can smuggle invented requirements into a purported source of truth; human or domain-owner approval is necessary.
- A living specification needs explicit version and conflict handling. Updating prose after an implementation deviates can ratify a bug instead of correcting it.
- LLM-judge advice lacks a calibration protocol and can reward plausible style over correctness. The post also conflates some capabilities of skills, subagents and retrieval tools; assess deployed interfaces separately.
- Overlong and underspecified prompts can both fail. The essay provides no measured optimum document size or comparative error rates.

## Vault Ideas Extracted

* [Clarification Need Decision](/vault/clarification-need-decision.md)
* [Intent Engineering for Agents](/vault/intent-engineering-for-agents.md)
