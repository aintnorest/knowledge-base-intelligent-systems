---
type: Study Note
title: Prompting best practices
description: Study notes on Anthropic's living Claude prompting guide, separating reusable prompt and harness mechanics from model-version behavior, API migrations, and unqualified vendor claims.
resource: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
source: /archive/claude-prompting-best-practices.md
tags: [prompting, agents, tool-use, context-engineering, long-context, reasoning]
timestamp: 2026-09-14T17:11:29Z
---

# Prompting best practices - Study Notes

**Publisher**: Anthropic  
**Canonical URL**: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices  
**Source type**: Living product documentation captured as Markdown  
**Capture scope**: Current Claude prompting guidance and migration notes; the local capture does not state its retrieval date

## What It Is

This is Anthropic's broad operational guide to prompting Claude. It combines relatively durable advice about instruction design, examples, context layout, output contracts, and tool-enabled workflows with rapidly changing claims about named models and API behavior. The distinction is essential: the first category supplies hypotheses worth testing across systems, while the second is configuration data that must be versioned with the exact model and rechecked against current documentation.

The archived capture names Claude Fable 5.1, Mythos 5.1, Fable 5, Mythos 5, Opus 5, Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 5, Sonnet 4.6, and Haiku 4.5. Its model-specific table delegates to separate pages for Fable/Mythos 5.1, Fable/Mythos 5, Sonnet 5, Opus 5, and Opus 4.8. The canonical endpoint was reachable when this dossier was written on September 14, 2026, but the page is explicitly a moving reference rather than a frozen specification.

## Durable Mechanics

### Make the contract legible

The strongest general advice is ordinary interface design: state the desired action, deliverable, constraints, and success criteria directly; explain the reason behind a non-obvious rule; and make ordered dependencies explicit. Positive instructions usually identify the target behavior more precisely than a collection of prohibitions. The guide's useful human test is whether a minimally briefed colleague could follow the prompt without guessing.

Examples can communicate formats, labels, tone, and edge cases that prose rules leave ambiguous. They should resemble the deployment task while varying enough not to teach accidental regularities. Anthropic recommends three to five examples, but that number is a vendor heuristic, not a demonstrated optimum in this capture. Example choice, order, token cost, and target-model behavior still require evaluation.

Descriptive XML tags are presented as delimiters for mixed prompt components such as instructions, context, variable input, documents, and examples. XML itself is not the durable insight. The reusable mechanism is typed, consistently nested boundaries that keep untrusted or variable data distinguishable from instructions and preserve document metadata.

A role can focus domain and tone, but it does not substitute for a task definition, evidence, or authorization. Similarly, matching the prompt's visible style to the requested response may help formatting, but a machine-consumed output should use an enforced schema or tool interface rather than relying on stylistic mimicry.

### Design long context as an evidence layout

For inputs above 20,000 tokens, the guide recommends placing long documents before the query, wrapping each document and its source metadata separately, and asking the model to extract relevant quotations before synthesis. Those are practical ways to preserve provenance and make evidence selection inspectable. The specific claim that putting the query last can improve quality by up to 30 percent is reported only as “tests”; the capture gives no tasks, models, sample size, metric, baseline, or uncertainty. Treat both the threshold and effect size as Anthropic-local measurements, not a universal law.

### Distinguish advice from action

Tool-enabled prompts should use verbs that match the intended mode. “Suggest changes” permits a prose answer; “make these edits” requests execution. Tool definitions must expose clear capabilities, and independent calls can be batched while dependent calls remain sequential. The surrounding application still owns authorization, validation, side effects, and failure recovery; prompt language about caution is not a security control.

Explicit prompt chaining remains useful when an application needs observable intermediate artifacts, branching, or gates. The guide's draft → review against criteria → refine pattern is valuable because it creates inspectable boundaries, not because self-critique guarantees correctness. External tests and domain checks remain stronger evidence than the model's own approval.

## Model and API Deltas That Must Stay Versioned

| Captured claim | Operational consequence |
|---|---|
| Claude 4.6 and later use adaptive thinking; `budget_tokens` is deprecated on Opus/Sonnet 4.6 and returns HTTP 400 on Claude 4.7 and later. | Bind thinking configuration to the exact API model; do not copy older request bodies forward. |
| Omitting `thinking` leaves it off on Opus 4.6–4.8 and Sonnet 4.6, enables it by default on Opus 5 and Sonnet 5, and cannot turn it off on the captured Fable/Mythos 5 and 5.1 families. | An absent field does not have stable semantics across generations. Record the resolved thinking mode, effort, and model together. |
| Prefilling the final assistant turn is unsupported from Claude 4.6 and Mythos Preview and returns HTTP 400. | Replace prefill-based formatting with direct instructions, structured outputs, tools, or post-processing; do not infer support from earlier models. |
| Opus 5 is described as more verbose, while Fable 5.1 provides fewer progress updates in agentic work. | Avoid one global verbosity prompt; qualify visible reporting separately for each route. |
| Opus 4.5/4.6 can overtrigger tools, overexplore, overengineer, or take irreversible actions; Opus 4.6 and Opus 5 can overuse subagents. | Remove inherited “always use tools” pressure and state scope, delegation, cleanup, and confirmation policy only where observed behavior warrants it. |
| Explicit self-check instructions are recommended generally but discouraged for Opus 5 because they may cause costly over-verification. | Verification prompts are model- and task-contingent; measure both errors and latency rather than retaining a ritual closing instruction. |
| Fable 5.1 thinking blocks must be returned unchanged with append-only history; mutating preceding messages, system text, or tools can invalidate later blocks. | Treat returned thinking blocks and conversation history as protocol state, not editable prose; consult current API rules before compaction or hydration. |

The guide also warns that wording as small as “think” can behave differently on Opus 4.5 without extended thinking. This is a good illustration of prompt–model drift: prompt text, model revision, thinking mode, effort, tool schema, and output contract form one deployable unit.

## Agentic Harness Guidance

For long-running work, the guide recommends making context lifecycle visible to the model, saving state outside the transcript, tracking structured statuses in structured data, keeping narrative progress separately, advancing incrementally, and furnishing tools that can verify results. It also suggests that a fresh context can sometimes rediscover state from files more effectively than a compacted transcript. That is a testable harness choice, not a blanket preference: compaction can preserve decisions cheaply, while rediscovery costs time and may miss implicit state.

The most useful delegation rule is structural. Parallelize independent work that benefits from separate context; keep simple, sequential, shared-state work local. The sample instruction for independent versus dependent tool calls expresses the same dependency rule at a smaller scale. Anthropic says explicit prompting can raise parallel-tool-call success to approximately 100 percent, but supplies no evaluation details, so the number should not be used for capacity planning.

The proposed reversibility rule—allow local, reversible work while asking before destructive, shared, or externally visible actions—is a sound interaction policy. It still needs enforcement in capability design, permissions, confirmation gates, idempotency, and audit logs. A model prompt cannot make a force push or production mutation safe once the tool grants unrestricted authority.

## Quantified and Vendor-Evaluated Claims

The capture contains a small number of numerical or evaluative claims, none with enough methodology to reproduce:

- three to five examples are recommended “for best results”;
- long-context advice is scoped to inputs of 20,000 or more tokens;
- placing the query after long documents reportedly improves quality by up to 30 percent in tests;
- a parallel-call instruction reportedly raises an already high success rate to approximately 100 percent;
- adaptive thinking is said to “reliably” outperform extended thinking in internal evaluations;
- a crop tool is said to produce consistent uplift on image evaluations.

The guide also asserts, without measurements here, that current models maintain long-horizon state well, hallucinate less in coding, create usable documents on the first try, orchestrate subagents natively, and improve vision and frontend work. These are first-party product claims. They are useful leads for local evaluation, not portable evidence or comparative conclusions.

## Analyst Takeaways

1. **Version the whole behavior bundle.** A prompt is inseparable from its exact model, thinking mode, effort, tool surface, message-history rules, schema, and evaluator. The migration section is strongest where it exposes this coupling.
2. **Keep durable structure, delete inherited pressure.** Explicit outcomes, typed context, representative examples, evidence provenance, dependency-aware parallelism, and external verification age better than repeated “must think,” “always use tools,” or blanket thoroughness directives.
3. **Turn vendor recipes into hypotheses.** Start from the guide's recommendations, then measure task quality, contract compliance, tool errors, latency, token use, and safety on the deployed route. Re-run the evaluation after model or API changes.
4. **Put safety in the harness.** Prompted caution can shape behavior, but permissions, validation, reversible operations, and human confirmation determine the actual risk boundary.
5. **Separate reasoning budget from visible prose.** The capture itself notes that Opus 5 effort does not reliably change answer length. Control response shape explicitly and qualify reasoning spend independently.

## Limitations and Questions

- This is unversioned, first-party documentation with no byline, publication date, changelog, or capture timestamp in the archived Markdown. “Current” and “latest” will drift.
- Most behavioral recommendations lack task definitions, benchmark data, sample sizes, model snapshots, decoding settings, baselines, or uncertainty. Even the numerical claims are not independently assessable from this page.
- General sections repeatedly admit model-specific exceptions. Applying the page as one universal system prompt would erase the distinctions it asks readers to preserve.
- API statements may become stale faster than prompt-design advice. The live canonical page and exact model guide should be checked before implementation.
- Manual chain-of-thought examples and requests are presented as fallbacks, but the capture does not address faithfulness, sensitive-reasoning exposure, or whether an externally verifiable decomposition would be safer and more useful.
- The document is Claude-specific and does not establish superiority over other models, prompting methods, or harness designs.

## Vault Ideas Extracted

- [Prompt–Model Drift](/vault/prompt-model-drift.md) — add the guide's concrete migration evidence: thinking defaults, final-assistant prefill support, verbosity, tool-triggering, self-checking, and subagent behavior all change by Claude generation.
- [Prompt Contingency](/vault/prompt-contingency.md) — add the guide's own instruction to treat named-model observations as model-scoped and re-run local evaluations before transfer, plus its conflicting self-check and formatting advice across models.
- [In-Context Learning](/vault/in-context-learning.md) — add Anthropic's recommendation for relevant, diverse, explicitly delimited examples and its unsubstantiated three-to-five-example heuristic with a vendor-evidence caveat.
- [Context Ordering as Retrieval Control](/vault/context-ordering-as-retrieval-control.md) — add the recommendation to put long documents before the query, retain per-document source metadata, and extract supporting quotes first; record the “up to 30 percent” claim as an unreproducible first-party result.
