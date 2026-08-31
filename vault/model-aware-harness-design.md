---
type: Synthesis
title: Model-Aware Harness Design
description: Keeping agent-harness abstractions portable while adapting prompts, tool interfaces, and handoff instructions to each model's learned interaction patterns.
tags: [agent-harness, coding-agents, tool-use, context-engineering, agents]
timestamp: 2026-07-13T16:02:28Z
---

# Model-Aware Harness Design

A portable agent harness should share stable system abstractions while allowing model-specific interaction design. Models can differ in how literally they follow instructions, which tool formats they have seen during training, how they recover from errors, and how they respond to long context. Treating every model as interchangeable can add reasoning overhead and tool mistakes.

## The Pattern

- Keep common task, policy, observability, and orchestration contracts.
- Give each model the prompt wording and tool representation it handles reliably.
- Start a new model from the closest existing harness, then use evaluations and hands-on testing to locate model-specific failure modes.
- Version the adaptation: a new model revision may require a different configuration even within one provider.
- When transferring a conversation between models, explicitly identify the handoff and constrain the target to its own available tools.

## Migration as a Measured Transformation

For a large prompt library, do not treat each model swap as an unrelated rewrite. Maintain a small, representative calibration suite; establish effective prompts for both the source and target model; and inspect whether the paired differences reveal a reusable source→target transformation. Apply that mapping to candidate prompts, then validate the adapted configuration against both frozen direct transfer and target-specific optimization.

This turns model replacement into a compatibility migration with three measurable states: inherited behavior, adapted behavior, and the target's reachable ceiling. The approach complements model-specific harness design without removing the need for end-to-end tests: a mapped prompt can improve an individual agent while changing message shape, tool discipline, or coordination elsewhere in the workflow. See [Prompt–Model Drift](/vault/prompt-model-drift.md) and [Cross-Model Prompt Mapping](/vault/cross-model-prompt-mapping.md).

## Why It Helps

Tool schemas and output formats are part of an agent's effective training distribution. Matching a familiar format can reduce inference-time translation work, while explicit handoff instructions prevent a replacement model from copying obsolete tool calls found in conversation history.

## Operational Concerns

Model switching is also an infrastructure event. Provider- and model-specific prompt caches may miss, and summarizing the history to reduce that cost can omit task-critical information. For difficult work, a fresh-context subagent with a tightly framed task can be preferable to transferring an entire mixed-model history.

Two transfer results refine that choice. First, evolved skills can cross model sizes and families, but a workaround learned by a small model can constrain a stronger one or consume its interaction budget; discovery quality and execution ability are separate properties. Second, a live coding trajectory can be a better handoff artifact than a detached plan: the receiving model inherits repository observations, a bounded checklist, and one grounded edit instead of paying to reconstruct the planner's context. Neither result supports blind transfer—evaluate the source–target pair and the handoff boundary end to end.

## Limitations

Per-model tuning creates configuration and testing overhead, and vendor-specific behavior can change with new releases. Avoid opaque one-off tweaks: retain a common contract, record the observed failure each customization addresses, and evaluate it against quality, latency, and cost guardrails.

## Sources

- [Continually Improving Our Agent Harness dossier](/dossiers/continually-improving-agent-harness.md) — Cursor reports model-specific edit formats, prompts, and mid-chat handoff instructions in a shared harness architecture.
- [PromptBridge dossier](/dossiers/promptbridge-cross-model-prompt-transfer.md) — measures prompt degradation under model substitution and learns reusable source→target prompt transformations from calibrated task pairs.
- [WikiSkill dossier](/dossiers/wikiskill-persistent-knowledge-skill-evolution.md) — finds both positive cross-family skill transfer and negative transfer from source-model-specific workarounds.
- [Prewalk dossier](/dossiers/prewalk-trajectory-preserving-model-handoff.md) — switches models after grounded exploration and one edit, preserving the live trajectory rather than sending only a plan.
