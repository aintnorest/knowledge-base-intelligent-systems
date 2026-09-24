---
type: Synthesis
title: Bounded Tool Observations
description: Giving agents compact, unambiguous tool results by default while preserving explicit paths to retrieve detail, so observation cost does not grow with raw response size.
tags: [tool-use, token-efficiency, context-engineering, agents]
timestamp: 2026-07-13T16:13:34Z
---

# Bounded Tool Observations

A tool result should be sufficient for the next decision without being a dump of every available field or document. Bounded tool observations use a small default projection, explicit counts and empty states, truncation notices, and an intentional expansion mechanism such as field selection, a query filter, pagination, or `--full`.

## The Pattern

- Use a concise, stable representation that remains unambiguous to the model.
- Return the few fields that identify an item and its immediate decision state.
- Include total counts and derived status when they eliminate a follow-up query.
- Mark truncation with the original size and a precise way to retrieve the complete content.
- Distinguish a successful empty result from an error; report errors in a structured form.

## Practical Use

Start from actual agent traces. If an agent repeatedly scans long results for one field, asks whether a list is complete, or confuses silence with success, add the missing bound or signal. Make expansion opt-in so simple tasks remain cheap, but preserve enough identifiers and continuation hints for the agent to request detail safely.

A model-specific implementation example is OpenAI's Codex recommendation to cap tool output near 10,000 estimated tokens, preserve equal portions from the beginning and end, and mark the omitted middle explicitly. The exact budget is not universal; the durable properties are a declared bound, preserved boundary evidence, an unmistakable truncation marker, and a route to retrieve the missing region.

## Tool Sets and Evidence Cards

The tool set is itself context. Overlapping tools and ambiguous parameters waste decisions before any observation returns, and verbose results crowd out future context. Start with a minimal, clearly differentiated tool set and compact result projections, and keep explicit expansion paths. Anthropic gives this as practitioner rationale, not measured gains.

Telemetry shows the same pattern. EviRCA converts high-volume metrics, traces and log bursts into small, timestamped anomaly cards and lets the agent request components, downsampled KPIs, call graphs or log samples only when needed. On OpenRCA it reached 40.6–43.9% exact diagnosis using 15.0×–25.7× fewer tokens than a raw-telemetry agent. The bound must keep candidate provenance and an expansion path. If the true component is never surfaced (as in 89.6% of one network-failure subset), no downstream reasoning can recover it, so measure upstream candidate recall separately.

## Limitations

Overly aggressive defaults can conceal the one field that matters and force extra calls. Bounds should be chosen and evaluated by task class, with reliable expansion paths and tests for zero results, large records, pagination, and error recovery.

## Sources

- [AXI: Agent eXperience Interface dossier](/dossiers/axi-agent-experience-interface.md) — groups token-efficient notation, small default schemas, truncation, pre-computed aggregates, definitive empty states, and contextual filtering into an agent-interface framework.
- [Codex Prompting Guide dossier](/dossiers/openai-codex-prompting-guide.md) — supplies a concrete head-and-tail truncation policy for a coding-agent harness.
- [Effective context engineering for AI agents dossier](/dossiers/effective-context-engineering-ai-agents.md) — overlapping tools and verbose outputs as context failures.
- [EviRCA: Decoupling Evidence Extraction from Reasoning for Microservice Root-Cause Analysis dossier](/dossiers/evirca-microservice-root-cause-analysis.md) — precomputed evidence cards with opt-in inspection; measured recall ceiling.
