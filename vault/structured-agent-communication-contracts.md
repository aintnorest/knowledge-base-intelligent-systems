---
type: Synthesis
title: Structured Agent Communication Contracts
description: Using an explicit, validated message schema for inter-agent handoffs so state, evidence, confidence, and next actions remain interpretable and transferable through a workflow.
tags: [multi-agent, agents, verification, orchestration]
timestamp: 2026-07-13T17:56:21Z
---

# Structured Agent Communication Contracts

A structured agent communication contract defines the fields, allowed values, and validation rules for a handoff instead of leaving a downstream agent to infer the important facts from prose. Useful fields commonly include status, summary, evidence, confidence, unresolved questions, next action, and a candidate result.

## The Pattern

1. Identify the decisions the receiving agent must make and the evidence it needs for each one.
2. Define a small schema with required fields and controlled values where they reduce ambiguity.
3. Require the sender to separate facts and source references from inferences and confidence.
4. Validate parseability, required fields, types, and task-specific invariants before passing the message onward.
5. Preserve an escape hatch for task-specific detail, but bound it and make its purpose explicit.
6. Evaluate the protocol by downstream task success, error recovery, message cost, and evidence quality—not just by whether its JSON parses.

Record the sender's origin and the source of any quoted observation separately from status or next action. A peer's report must not become a user authorization, even when it is well-formed; a proposed remedy inferred from untrusted data requires independent task-intent and action checks. Durable task assignment and provenance can preserve ownership across sessions better than transient chat, but a task record is still not evidence that its contents are true. See [Peer-Agent Message Trust](/vault/peer-agent-message-trust.md).

## Why It Matters

Freeform messages force each receiving agent to rediscover what information is relevant and whether it is evidence, speculation, or a request. A shared contract makes handoffs easier to scan, enables deterministic checks, and gives prompt changes a more stable interface through which to propagate. In the MAS-PromptBench communication study, more constrained message formats were associated with larger prompt-optimization gains for both tested optimizers.

When available, enforce the supported message shape during generation rather than repairing each structural violation with another model turn. Compiling a schema into a grammar allows the decoder to mask invalid next tokens, while cached grammar artifacts amortize preprocessing across a stable contract. This prevents a class of serialization failures; it does not verify that evidence is true, that a reported action occurred, or that a proposed next action is authorized.

Keep refusal and interrupted generation outside the ordinary successful-message path. A completed schema-valid result, a refusal, an incomplete result and an execution failure are distinct outcomes requiring distinct receiver behavior. Apply independent semantic and provenance checks after structural acceptance; otherwise a perfectly formatted false report is easier to propagate, not safer.

For concurrent editing, distinguish spatial coordination from semantic commitments. A file or region boundary says where a worker acts; a behavioral contract says what interfaces, defaults, and ordering must mean. Specific early plans can reduce textual collisions without improving final success. Require acknowledgement of decision-bearing constraints, checkable artifact evidence for completion claims, and verification in the integrated result rather than treating confident status as shared state.

When observations may be stale, assistance requests should identify the concrete uncertainty, observed failure evidence, and information that would change the next action. Generic reassurance and repeated location questions consume budget without repairing the working model. Early targeted assistance is associated with better recovery in historical rollback experiments, but timing was not randomized and question-quality associations are partly outcome-conditioned.

## Practical Use

- Use explicit statuses and a next-action field to make stalled or partial work visible to a coordinator.
- Put citations, tool outputs, or other supporting facts in a distinct evidence field; do not let confidence substitute for evidence.
- Make schemas specific enough to support aggregation and validation, but avoid inventing fields that no receiving decision uses.
- For safety-sensitive work, reject unsupported claims or schema-valid outputs that violate independent policy or provenance checks.
- For fresh-context delegates, include sufficient task context and an explicit result contract; mark schema-invalid returns unvalidated instead of silently promoting raw text to trusted output.

## Limitations

- A well-formed report can still be false, incomplete, or strategically misleading; syntax validation is not semantic verification.
- Rigid schemas can discard nuance, impose serialization overhead, and encourage agents to fill fields performatively. Revisit fields that do not improve downstream decisions.
- Human-readable origin tags can help identify a peer but are not complete injection defenses; a self-replicating payload can cross otherwise legitimate handoffs.
- The best representation is task- and topology-dependent; a sequential evidence pipeline and a parallel voting ensemble need different contracts.

## Sources

- [MAS-PromptBench dossier](/dossiers/mas-promptbench.md) — compares freeform, semi-structured, and constrained JSON-style agent messages; its results associate more shared structure with larger optimization gains, subject to the benchmark's scope.
- [AXI dossier](/dossiers/axi-agent-experience-interface.md) — motivates bounded, explicit schemas and structured failures for agent-facing interfaces.
- [Prompt Infection: LLM-to-LLM Prompt Injection within Multi-Agent Systems dossier](/dossiers/prompt-infection-multi-agent-systems.md) — simulated peer-message infection; origin tagging alone reduced attack success only modestly, while tested combinations of marking and other defenses performed better.
- [Orchestrate teams of Claude Code sessions dossier](/dossiers/claude-code-agent-teams-model.md) — documents origin-tagged teammate messages that cannot confer human approval or bypass denied permissions.
- [Paperclip Specification — Board-Governed Agent Control Plane dossier](/dossiers/paperclip-control-plane-spec.md) — specifies task- and comment-based handoffs with assignment and initiating-work provenance rather than a separate chat bus.
- [Hermes Agent — Subagent Delegation and Ownership Boundaries dossier](/dossiers/hermes-subagent-delegation.md) — fresh delegates need explicit task context; invalid schema returns receive bounded correction and remain visibly unvalidated.
- [Introducing Structured Outputs in the API dossier](/dossiers/openai-structured-outputs-api.md) — first-party schema-to-grammar decoding explanation, vendor schema-following evaluation, and refusal/interruption exceptions; structural adherence is not semantic verification.
- [CooperBench: Why Coding Agents Cannot be Your Teammates Yet dossier](/dossiers/cooperbench-coding-agent-teammates.md) — communication reduces raw conflicts without significant final-success gains; spatial agreements differ from semantic compatibility and checkable commitments.
- [SyncMind: Measuring Agent Out-of-Sync Recovery in Collaborative Software Engineering dossier](/dossiers/syncmind-agent-out-of-sync-recovery.md) — oracle-informed assistance modestly improves stale-state recovery, with observational timing and partly outcome-conditioned request-quality associations.
