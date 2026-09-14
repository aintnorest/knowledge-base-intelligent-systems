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
**Artifact**: Six Markdown cells (one empty); no executable code cells or captured outputs

## What It Is

This is OpenAI's practical prompting and harness guide for the original GPT-5 generation. It treats behavior as the product of several interacting controls rather than prompt prose alone: `reasoning_effort`, `verbosity`, system and user instructions, tool definitions, turn boundaries, and whether prior reasoning is carried through the Responses API.

The useful core is not a list of magic phrases. It is an operating model: tune model effort to task difficulty, make completion and stopping conditions explicit, remove contradictory rules, describe the consequences and reversibility of tool actions, preserve reasoning state across tool turns, and requalify prompts when the model generation changes. The guide's appendices preserve concrete prompts and tool surfaces used for SWE-bench Verified, τ-Bench Retail, and Terminal-Bench, but they are examples tied to a particular model and harness rather than universal templates.

## The Two Independent Output Controls

The guide separates two levers that are easy to conflate:

- **`reasoning_effort` controls deliberation and agentic exploration.** The stated default is `medium`. Lower effort reduces exploration, tool use, latency, and cost; higher effort is recommended for complex multi-step work and persistence. GPT-5 also introduced `minimal` reasoning for latency-sensitive workloads.
- **`verbosity` controls the length of the final answer, not the amount of internal reasoning.** A global API setting can be overridden by natural-language instructions for a local context.

This distinction enables asymmetric policies: an agent can reason deeply while reporting briefly, or keep ordinary prose concise while producing readable, explicit code. The guide also says separable tasks often perform best when split across turns, which makes reasoning budget a workflow decision as well as a request parameter.

At `minimal` effort, OpenAI recommends adding more external scaffolding: prompted planning, explicit persistence, disambiguated tool rules, descriptive tool preambles, and a brief explanation in the final answer. That is a trade, not free efficiency: less internal budget shifts more responsibility into the prompt and interaction protocol.

## Calibrating Agentic Eagerness

GPT-5 is described as naturally thorough and proactive. For bounded work, the guide recommends explicit search depth, early-stop criteria, a fixed or approximate tool budget, and an escape hatch permitting action under uncertainty. For autonomous work, it recommends a persistence block that forbids premature hand-back and tells the model to research or infer a reasonable path rather than ask reflexive clarification questions.

The better principle is **risk-sensitive autonomy**, not maximum autonomy. Search can tolerate a high uncertainty threshold; payment or destructive file operations should require much stronger evidence or user confirmation. Tool preambles serve a separate human-factors purpose by making a long trajectory legible through an upfront plan, concise progress messages, and a final summary.

## Responses API Continuity and the τ-Bench Result

OpenAI strongly recommends the Responses API with `previous_response_id`, which carries prior reasoning items into later tool turns. The proposed mechanism is straightforward: the model can continue its existing plan rather than reconstructing it after each tool result, conserving chain-of-thought tokens and improving latency and task performance. The guide states that this continuity is available to Zero Data Retention organizations as well.

The guide's only quantified end-to-end comparison is **τ-Bench Retail: 73.9% with Chat Completions versus 78.2% after switching to the Responses API and passing `previous_response_id`**. That is **+4.3 percentage points**, or approximately **+5.8% relative to the 73.9 baseline**. The result is described as statistically significant.

This is meaningful operational evidence that request-state architecture can affect agent quality, not merely token accounting. It is not a clean ablation: “switching to the Responses API” and “including `previous_response_id`” are bundled, and the guide supplies no sample count, variance, confidence interval, evaluator version, latency numbers, token counts, or exact model snapshot.

## Instruction Conflicts Are a Reasoning Tax

GPT-5's precise instruction following makes contradictory prompts especially costly: instead of casually choosing one rule, the model may spend reasoning tokens trying to reconcile incompatible requirements. The healthcare example exposes two conflict classes:

1. a universal sequencing rule (“look up the patient first”) conflicts with emergency action that must precede scheduling; and
2. a consent requirement conflicts with automatic booking before contact.

The guide repairs these by declaring an emergency exception to lookup and changing booking to happen after patient contact. The broader lesson is to maintain an explicit hierarchy and state exceptions beside the governing rule. Prompt libraries are living policy documents; changes from multiple stakeholders need conflict review and behavioral evaluation, not just copyediting.

The example's own repair is imperfect. “After informing” the patient is not equivalent to having “explicit patient consent recorded in the chart,” even though the text calls the change consistent with the consent rule. The fenced example also retains both removed and added lines as literal text and repeats an opening `<code_editing_rules>` tag where a closing tag appears intended. Those defects reinforce the guide's thesis: examples and markup require the same contradiction and syntax checks as prose rules.

## Cursor's Production Case

Cursor's alpha testing contributes the guide's strongest qualitative case material:

- Setting global API verbosity to `low` reduced disruptive status messages and summaries, while a local prompt demanding clear names, comments where needed, and “high verbosity” in code tools improved readability of code that had become too terse and single-letter-heavy.
- Telling the model that edits are proposed and reversible through Undo/Reject made proactive implementation safer and reduced unnecessary “should I proceed?” questions. Environment semantics changed the appropriate autonomy policy.
- An older-model instruction headed `<maximize_context_understanding>` and demanding exhaustive context gathering caused GPT-5 to repeat searches on small tasks. Softening it to `<context_understanding>` preserved autonomy while reducing needless tool use.
- Structured, scoped XML sections improved instruction adherence and made prompt categories referenceable; user-defined Cursor rules remained an important steering surface.

The case illustrates why prompt parameters and prompt text should be composed by channel and artifact type rather than forced into one global style. It also shows that reversibility is information the model can use when deciding whether to act.

## Coding Guidance and Harness Fit

For greenfield frontend work, the guide recommends a contemporary TypeScript/React stack and an internal five-to-seven-category self-reflection rubric. For existing repositories, it recommends stating design principles, directory structure, stack defaults, accessibility, and UI conventions so generated changes blend into the codebase.

The appendix is more revealing than the framework list. It includes a particular patch tool format, two alternative tool sets, a full τ-Bench retail policy, and a long Terminal-Bench system prompt. OpenAI explicitly recommends an `apply_patch` implementation because it matches the model's training distribution. Tool grammar and developer instructions are therefore part of model compatibility, not neutral plumbing.

These prompt blocks should not be copied wholesale. The benchmark instructions contain task-specific confirmation rules, one-tool-at-a-time constraints, hidden-test cautions, and even nested instructions about shell and version-control use. Their value is as evidence of the tested interface, not as general production policy.

## Model-Generation Drift

The Cursor example is direct evidence of generation drift: language that helped earlier models gather enough context became counterproductive once GPT-5 was already inclined to search and introspect. The guide likewise routes minimal-reasoning users toward GPT-4.1-style prompting while giving higher-effort GPT-5 different defaults. Prompt behavior is conditional on model generation and effort mode.

Treat every model upgrade as a harness migration. Re-run representative tasks with the inherited prompt, inspect tool-call count, latency, completion behavior, formatting, code readability, and safety gates, then remove compensatory instructions the new model no longer needs. Version the prompt together with model snapshot, API, effort, verbosity, tools, and evaluation harness. “Newest flagship,” default parameter values, preferred frontend packages, and API behavior are all time-sensitive claims in this archived capture.

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
- `reasoning_effort` is described as controlling both how hard the model thinks and how willingly it calls tools, so parameter effects are confounded unless quality and trajectory metrics are measured together.
- Recommendations such as self-reflection rubrics, repeated Markdown reminders every three to five user messages, and XML sectioning are presented without ablations.
- The guide encourages proactive completion but only briefly addresses the boundary between reversible proposals and consequential actions. Applications must enforce authorization and confirmation outside the prompt.
- The notebook has no publication date, author metadata, executable cells, or outputs. Its six cells are a prose snapshot, and the live canonical page now resides under `developers.openai.com`; current API documentation should govern implementation details.

## Vault Ideas Extracted

* Update [Reasoning-Budget Calibration](/vault/reasoning-budget-calibration.md) — GPT-5 separates reasoning effort from final-answer verbosity and shifts more planning/persistence scaffolding into the prompt at minimal effort.
* Update [Model-Aware Harness Design](/vault/model-aware-harness-design.md) — Cursor found an earlier-model thoroughness instruction induced repetitive search in GPT-5, while reversibility semantics and local code-verbosity overrides improved autonomy and readability.
* Update [Prompt–Model Drift](/vault/prompt-model-drift.md) — a concrete within-product generation change made inherited context-gathering language counterproductive, supporting requalification on model upgrades.
