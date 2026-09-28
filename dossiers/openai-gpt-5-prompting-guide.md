---
type: Study Note
title: GPT-5 prompting guide
description: Study notes on OpenAI's first-generation GPT-5 prompting guidance for reasoning effort, output verbosity, agent persistence, Responses API reasoning continuity, instruction hygiene, and model-specific coding harnesses.
resource: https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide
source: /archive/openai-gpt-5-prompting-guide.ipynb
tags: [prompting, agents, agent-harness, coding-agents, tool-use, reasoning]
timestamp: 2026-09-14T17:11:38Z
---

# GPT-5 prompting guide — Study Notes

**Publisher**: OpenAI Cookbook  
**Canonical URL**: https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide  
**Artifact**: Archived prose notebook without executable results

## What It Is

This is OpenAI's practical prompting and harness guide for the original GPT-5 generation. It treats behavior as the product of interacting controls rather than prompt prose alone: reasoning depth, visible answer length, instructions, tool affordances, turn boundaries, and whether prior reasoning survives across tool calls.

The useful core is not a list of magic phrases. It is an operating model: tune model effort to task difficulty, make completion and stopping conditions explicit, remove contradictory rules, describe the consequences and reversibility of tool actions, preserve reasoning state across tool turns, and requalify prompts when the model generation changes. The guide's appendices preserve concrete prompts and tool surfaces used for SWE-bench Verified, τ-Bench Retail, and Terminal-Bench, but they are examples tied to a particular model and harness rather than universal templates.

## The Two Independent Output Controls

The guide separates two levers that are easy to conflate:

- **Reasoning depth controls deliberation and agentic exploration.** Lower effort reduces exploration, tool use, latency, and cost; higher effort is favored for complex multi-step work and persistence. The guide also describes a latency-oriented mode with less internal deliberation.
- **Visible answer length is a separate control.** A brief final answer need not imply shallow reasoning, and local instructions can request more detail for a particular artifact.

This distinction enables asymmetric policies: an agent can reason deeply while reporting briefly, or keep ordinary prose concise while producing readable, explicit code. Separable tasks may perform best across multiple turns, making reasoning budget a workflow decision.

With little internal deliberation, the guide recommends more external scaffolding: prompted planning, persistence, disambiguated tool rules, and a brief final explanation. That is a trade, not free efficiency: responsibility moves into the prompt and interaction protocol.

## Calibrating Agentic Eagerness

GPT-5 is described as naturally thorough and proactive. For bounded work, the guide recommends explicit search depth, early-stop criteria, a fixed or approximate tool budget, and an escape hatch permitting action under uncertainty. For autonomous work, it recommends a persistence block that forbids premature hand-back and tells the model to research or infer a reasonable path rather than ask reflexive clarification questions.

The better principle is **risk-sensitive autonomy**, not maximum autonomy. Search can tolerate a high uncertainty threshold; payment or destructive file operations should require much stronger evidence or user confirmation. Tool preambles serve a separate human-factors purpose by making a long trajectory legible through an upfront plan, concise progress messages, and a final summary.

## Responses API Continuity and the τ-Bench Result

OpenAI recommends carrying prior reasoning state through successive tool turns. The proposed mechanism is straightforward: the model continues its existing plan rather than reconstructing it after each tool result, potentially conserving tokens and improving latency and performance. The guide says this continuity is also available to Zero Data Retention organizations.

The guide's only quantified end-to-end comparison is **τ-Bench Retail: 73.9% with Chat Completions versus 78.2% after switching to the Responses API with reasoning continuity**. That is **+4.3 percentage points**, or approximately **+5.8% relative to the 73.9 baseline**. The result is described as statistically significant.

This is meaningful operational evidence that request-state architecture can affect agent quality, not merely token accounting. It is not a clean ablation: changing API surfaces and preserving reasoning continuity happened together, and the guide supplies no sample count, variance, confidence interval, evaluator version, latency numbers, token counts, or exact model snapshot.

## Instruction Conflicts Are a Reasoning Tax

GPT-5's precise instruction following makes contradictory prompts especially costly: instead of casually choosing one rule, the model may spend reasoning tokens trying to reconcile incompatible requirements. The healthcare example exposes two conflict classes:

1. a universal sequencing rule (“look up the patient first”) conflicts with emergency action that must precede scheduling; and
2. a consent requirement conflicts with automatic booking before contact.

The guide repairs these by declaring an emergency exception to lookup and changing booking to happen after patient contact. The broader lesson is to maintain an explicit hierarchy and state exceptions beside the governing rule. Prompt libraries are living policy documents; changes from multiple stakeholders need conflict review and behavioral evaluation, not just copyediting.

The example's own repair is imperfect. “After informing” the patient is not equivalent to having “explicit patient consent recorded in the chart,” even though the text calls the change consistent with the consent rule. The fenced example also retains both removed and added lines as literal text and repeats an opening `<code_editing_rules>` tag where a closing tag appears intended. Those defects reinforce the guide's thesis: examples and markup require the same contradiction and syntax checks as prose rules.

## Cursor's Production Case

Cursor's alpha testing contributes the guide's strongest qualitative case material:

- Lowering the verbosity of ordinary updates reduced disruptive status messages and summaries, while separately asking for clear names and explanatory code where needed improved code readability after it had become too terse.
- Telling the model that edits are proposed and reversible through Undo/Reject made proactive implementation safer and reduced unnecessary “should I proceed?” questions. Environment semantics changed the appropriate autonomy policy.
- An inherited instruction demanding exhaustive context gathering caused GPT-5 to repeat searches on small tasks. Softening that pressure preserved autonomy while reducing needless tool use.
- Structured, scoped XML sections improved instruction adherence and made prompt categories referenceable; user-defined Cursor rules remained an important steering surface.

The case illustrates why prompt parameters and prompt text should be composed by channel and artifact type rather than forced into one global style. It also shows that reversibility is information the model can use when deciding whether to act.

## Coding Guidance and Harness Fit

For greenfield frontend work, the guide recommends an explicit self-reflection rubric. For existing repositories, it favors grounding generated changes in the project's design principles, stack, accessibility expectations, and UI conventions rather than applying generic preferences.

The appendix is more revealing than the framework list. It includes model-specific editing interfaces and benchmark policies. OpenAI favors familiar patch operations because learned tool interfaces affect model behavior; tool shape and developer instructions are therefore part of harness compatibility, not neutral plumbing.

These prompt blocks should not be copied wholesale. The benchmark instructions contain task-specific confirmation rules, one-tool-at-a-time constraints, hidden-test cautions, and even nested instructions about shell and version-control use. Their value is as evidence of the tested interface, not as general production policy.

## Model-Generation Drift

The Cursor example is direct evidence of generation drift: language that helped earlier models gather enough context became counterproductive once GPT-5 was already inclined to search and introspect. The guide likewise routes minimal-reasoning users toward GPT-4.1-style prompting while giving higher-effort GPT-5 different defaults. Prompt behavior is conditional on model generation and effort mode.

Treat every model upgrade as a harness migration. Re-run representative tasks with the inherited prompt, inspect tool-call count, latency, completion behavior, formatting, code readability, and safety gates, then remove compensatory instructions the new model no longer needs. Version the prompt together with model snapshot, API, reasoning policy, output policy, tools, and evaluation harness.

## Analyst Takeaways

1. **Tune three axes separately.** Reasoning depth, user-facing answer length, and agent autonomy interact but are not the same control.
2. **Make stopping rules observable.** Search budgets, early-stop criteria, persistence requirements, and consequence-specific confirmation gates are more testable than adjectives such as “thorough.”
3. **Carry state rather than reenacting it.** The τ-Bench result suggests that preserving reasoning continuity between tool calls can materially outperform forcing the model to rebuild its plan from transcript text.
4. **Give the model product semantics.** Reversibility, approval flow, and action consequence determine when proactivity is appropriate; tool names alone do not communicate that policy.
5. **Audit prompts like code.** Contradictions, malformed delimiters, duplicated diff lines, and stale model compensations consume reasoning or change behavior. Prompt review needs fixtures and model-specific regression runs.
6. **Prefer measured local overrides.** Cursor's low global verbosity plus high code-tool verbosity is a better pattern than seeking one setting for every message and artifact.

## Questions and Limitations

- This is first-party vendor guidance for its own model, not an independent evaluation. Most recommendations are experience reports without experimental protocols or comparative tables.
- The τ-Bench claim is the sole quantified improvement and omits the information needed to reproduce or independently assess statistical significance.
- Cursor's results are qualitative: no task set, baseline, sample size, effect size, latency, cost, or failure distribution is reported.
- Reasoning depth is described as affecting both deliberation and willingness to call tools, so its effects are confounded unless quality and trajectory metrics are measured together.
- Recommendations such as self-reflection rubrics, repeated Markdown reminders every three to five user messages, and XML sectioning are presented without ablations.
- The guide encourages proactive completion but only briefly addresses the boundary between reversible proposals and consequential actions. Applications must enforce authorization and confirmation outside the prompt.
- The notebook has no publication date, author metadata, executable cells, or outputs. It is a prose snapshot; current API documentation should govern implementation details.

## Vault Ideas Extracted

* Update [Reasoning-Budget Calibration](/vault/reasoning-budget-calibration.md) — GPT-5 separates reasoning effort from final-answer verbosity and shifts more planning/persistence scaffolding into the prompt at minimal effort.
* Update [Model-Aware Harness Design](/vault/model-aware-harness-design.md) — Cursor found an earlier-model thoroughness instruction induced repetitive search in GPT-5, while reversibility semantics and local code-verbosity overrides improved autonomy and readability.
* Update [Prompt–Model Drift](/vault/prompt-model-drift.md) — a concrete within-product generation change made inherited context-gathering language counterproductive, supporting requalification on model upgrades.
