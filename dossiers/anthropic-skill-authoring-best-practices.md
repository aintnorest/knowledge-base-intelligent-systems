---
type: Study Note
title: Skill authoring best practices
description: Anthropic's detailed authoring guide for concise SKILL.md instructions, graduated procedural freedom, one-level references, deterministic scripts, feedback loops, and cross-model checks.
resource: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
source: /archive/anthropic-skill-authoring-best-practices.html
tags: [agent-skills, agents, context-engineering, evaluation, verification, tool-use]
timestamp: 2026-09-24T03:44:42Z
---

# Skill authoring best practices — Study Notes

**Publisher**: Anthropic, Claude Platform Docs  
**Format**: Skill authoring guidance; no publication date shown in the saved page

## What It Is

The detailed writing manual of this set. The `agent-skills-format-specification` defines valid fields and directories; this guide advises what content earns its context cost and how to organize and test it. Its practical distinction is *degrees of freedom*: keep judgment flexible when many solutions are valid, but specify exact steps and scripts when the operation is brittle or high-stakes. `evaluating-agent-skills-output-quality` supplies a more detailed comparison/grading protocol.

## Write the Smallest Useful Instruction

Only metadata is indexed at startup, but the entire root instruction enters context on activation. Keep it concise and move conditional detail to references; the guide's contrasting short and long PDF examples illustrate context cost, not measured gains. Ask whether each statement supplies information the model would otherwise lack. The description must communicate both capability and request-language triggers because it is the routing interface amid competing skills.

Choose high freedom for contextual work such as reviewing code, medium freedom for parameterized templates, and low freedom for fragile database migrations or exact deterministic operations. This is a risk-sensitive policy, not a command to script every step. A workflow can include explicit analyze → plan → validate → execute → verify phases, especially where a bad intermediate update would be costly. Human-readable checklists help complex research tasks; a validator and corrective loop fit machine-checkable documents and data. A script should solve anticipated errors and produce helpful messages, not simply fail and delegate diagnosis back to the agent.

## Organize Conditional Knowledge

The root should point directly to conditional domain knowledge and executable helpers, with clear reasons to follow each reference. Do not chain references through several documents: agents may preview intermediate references and never reach the needed content. Distinguish executable helpers from material to read, state dependencies, and avoid assuming availability across environments. Only fetched reference text and script outputs—not all bundled file bytes—enter working context. The `anthropic-agent-skills-platform-overview` qualifies this against product-specific network and package limits.

## Evaluation and Revision

Before extensive authoring, run representative no-skill tasks, identify observed failures, then evaluate varied prompts and edge conditions against that baseline. Have an authoring agent distill successful work into a skill, then use a fresh executing agent on related tasks and return specific errors to the author. Test each intended model: the guide observes that smaller models may need more scaffolding while stronger ones can be harmed by over-explanation. Watch for irrelevant file reads and ignored instructions. Avoid stale claims and unbounded tool choices.

For consequential document mutations, the guide recommends validated intermediate outputs and a separate verification pass. Its broader recommendations cover routing, concise guidance, shallow references, error-handling helpers, comparative evaluations, cross-model checks, and team feedback; these are prescriptions, not proof of quality gains.

## Analyst Takeaways

1. **Separate flexibility from safety.** Leave code-review diagnosis open-ended, but enforce machine-checkable invariants and high-risk mutation preconditions with scripts and tests.
2. **Use actual task failures to decide what enters a skill.** An instruction with no demonstrated incremental benefit imposes routing and context costs on every future run.
3. **Make references observable and shallow.** A crucial rule buried behind multiple navigation hops can be as ineffective as an omitted rule.
4. **Validate plans before consequential effects, then verify results.** For a human-in-the-loop factory, ask for human approval at genuinely irreversible boundaries rather than making every low-risk agent decision manual.
5. **Requalify on each intended model.** Skill instructions are interpreted by the model and the runtime, so format conformance cannot establish transfer.

## Questions and Limitations

- This is prescriptive vendor guidance without controlled experiments or reported confidence intervals; its brevity recommendations are not measured performance thresholds.
- Blindly treating “never defer” script examples as permission to silently substitute defaults could hide a failure; fail explicitly where correctness or data integrity is at stake.
- Multi-model testing is urged but no model-stratified sample size, acceptance threshold, or regression-selection method is given.
- The guide's dependency advice does not override API execution's no-network/no-runtime-install constraint; packages must be available in the deployment environment.

## Vault Ideas Extracted

* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
* [Progressive Skill Disclosure](/vault/progressive-skill-disclosure.md)
