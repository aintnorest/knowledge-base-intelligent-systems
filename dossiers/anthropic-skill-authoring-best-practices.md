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

Only metadata is indexed at startup, but the entire `SKILL.md` enters context on activation. Anthropic recommends a body **under 500 lines**, moving optional detail into references. It contrasts an approximately **50-token** concise PDF-extraction instruction with an approximately **150-token** explanation of elementary PDF concepts. These are illustrative writing examples, not measured gains. Ask whether each statement supplies information the model would otherwise lack. One `description` field must convey both capability and request-language triggers; the guide considers selection among potentially **100+** Skills. Use consistent terminology and specific names (often gerunds such as `processing-pdfs`) rather than `helper` or `utils`.

Choose high freedom for contextual work such as reviewing code, medium freedom for parameterized templates, and low freedom for fragile database migrations or exact deterministic operations. This is a risk-sensitive policy, not a command to script every step. A workflow can include explicit analyze → plan → validate → execute → verify phases, especially where a bad intermediate update would be costly. Human-readable checklists help complex research tasks; a validator and corrective loop fit machine-checkable documents and data. A script should solve anticipated errors and produce helpful messages, not simply fail and delegate diagnosis back to the agent.

## Organize Conditional Knowledge

The root should point directly to domain files, usage examples, and executable helpers with clear triggers: finance reference for revenue, sales reference for pipeline, redlining documentation for tracked changes. Do not chain references through several documents: the guide notes that agents sometimes preview intermediate references and never reach the final content. For a reference longer than **100 lines**, add a table of contents. Use forward-slash paths, label whether a `.py` file should be *run* or *read*, state dependencies, and avoid hardcoded availability assumptions. Only fetched reference text and script outputs—not all bundled file bytes—enter working context. The `anthropic-agent-skills-platform-overview` qualifies this against product-specific network and package limits.

## Evaluation and Revision

Before extensive authoring, run representative no-skill tasks, identify observed failures, create **three scenarios** that probe them, then add minimum guidance and compare with the baseline. Have an authoring agent turn successful work into a skill, then use a fresh executing agent for related tasks and feed specific observed errors back to the author. Test on every intended model: the guide distinguishes Haiku's need for sufficient scaffolding from Opus's susceptibility to over-explanation, with Sonnet as another target. Watch for unused files, unexpected file paths, and ignored instructions. Avoid stale date-sensitive claims; make examples concrete; use a default rather than an unbounded menu of tools.

For scripts, the guide suggests typed intermediate outputs and validation before mutating 50 PDF form fields, and an explicit verifier after writing. Its checklist includes descriptions, concise root, direct references, executable error handling, at least three evaluations, cross-model tests, and team feedback. These are vendor recommendations, not proof that a checklist itself raises quality.

## Analyst Takeaways

1. **Separate flexibility from safety.** Leave code-review diagnosis open-ended, but enforce machine-checkable invariants and high-risk mutation preconditions with scripts and tests.
2. **Use actual task failures to decide what enters a skill.** An instruction with no demonstrated incremental benefit imposes routing and context costs on every future run.
3. **Make references observable and shallow.** A crucial rule buried behind multiple navigation hops can be as ineffective as an omitted rule.
4. **Validate plans before consequential effects, then verify results.** For a human-in-the-loop factory, ask for human approval at genuinely irreversible boundaries rather than making every low-risk agent decision manual.
5. **Requalify on each intended model.** Skill instructions are interpreted by the model and the runtime, so format conformance cannot establish transfer.

## Questions and Limitations

- This is prescriptive vendor guidance without controlled experiments or reported confidence intervals; the token and line figures are examples/recommendations.
- Blindly treating “never defer” script examples as permission to silently substitute defaults could hide a failure; fail explicitly where correctness or data integrity is at stake.
- Multi-model testing is urged but no model-stratified sample size, acceptance threshold, or regression-selection method is given.
- The guide's dependency advice does not override API execution's no-network/no-runtime-install constraint; packages must be available in the deployment environment.

## Vault Ideas Extracted

* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
* [Progressive Skill Disclosure](/vault/progressive-skill-disclosure.md)
