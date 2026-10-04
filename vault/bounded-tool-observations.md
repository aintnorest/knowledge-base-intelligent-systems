---
type: Synthesis
title: Bounded Tool Observations
description: Giving agents compact, unambiguous tool results by default while preserving explicit paths to retrieve detail, so observation cost does not grow with raw response size.
tags: [tool-use, token-efficiency, context-engineering, agents]
timestamp: 2026-07-13T16:13:34Z
---

# Bounded Tool Observations

A tool result should be sufficient for the next decision without dumping every available field or document. Bounded observations use a small default projection, explicit counts and empty states, truncation notices, and an intentional expansion path through field selection, filters or pagination.

## The Pattern

- Use a concise, stable representation that remains unambiguous to the model.
- Return the few fields that identify an item and its immediate decision state.
- Include total counts and derived status when they eliminate a follow-up query.
- Mark truncation with the original size and a precise way to retrieve the complete content.
- Distinguish a successful empty result from an error; report errors in a structured form.

## Practical Use

Start from actual agent traces. If an agent repeatedly scans long results for one field, asks whether a list is complete, or confuses silence with success, add the missing bound or signal. Make expansion opt-in so simple tasks remain cheap, but preserve enough identifiers and continuation hints for the agent to request detail safely.

Bounds should support selective inspection, not force result-by-result completion. A compact search summary lets the agent choose a candidate; presenting one match per turn can induce exhaustive browsing even when the target is already identifiable. In one matched coding-agent experiment, summarized search reached 18.0% task success, versus 12.0% for iterative search and 15.7% without specialized search. A 100-line view also outperformed both a 30-line view and a whole-file view. These results establish a workload-specific tradeoff, not universal limits.

A mutation result should distinguish authoritative state from a proposed state. On rejection, return the reason, enough of the failed proposal to diagnose it, and the original content that remains current. On acceptance, return the changed region directly when it supports the next decision. This can prevent reasoning against a rejected edit or an extra call merely to discover what happened; silence alone is not evidence of success.

For long tool output, retaining bounded evidence from both the beginning and end while explicitly marking an omitted middle can preserve useful context without hiding truncation. The durable properties are a declared bound, boundary evidence, an unmistakable omission marker and a route to retrieve the missing region; any particular budget must be tested against actual tasks.

Observation bounds can also apply over time. Keep recent tool evidence intact, replace older bulky observations with explicit omission markers, and preserve the actions and decisions that explain the trajectory. This differs from deleting entire turns or paraphrasing the whole history. An inexpensive age-based masking policy is a useful baseline before paying a model to summarize old interactions; preserve a retrieval path when late-needed details matter.

Evaluate retention windows in units of useful evidence, not nominal turns alone. Retry messages and scaffold conventions can make identical window lengths retain very different state. Compare verified success, recovery calls, total episode cost and stopping behavior: summaries can reduce prompt size yet prolong exploration, while masking alone does not bound retained reasoning indefinitely. Neither strategy guarantees unchanged task performance.

## Tool Sets and Evidence Cards

The tool set is itself context. Overlapping tools and ambiguous parameters waste decisions before any observation returns, and verbose results crowd out future context. Start with a minimal, clearly differentiated tool set and compact result projections, and keep explicit expansion paths. Anthropic gives this as practitioner rationale, not measured gains.

Telemetry shows the same pattern. EviRCA converts high-volume metrics, traces and log bursts into small, timestamped anomaly cards and lets the agent request components, downsampled KPIs, call graphs or log samples only when needed. On OpenRCA it reached 40.6–43.9% exact diagnosis using 15.0×–25.7× fewer tokens than a raw-telemetry agent. The bound must keep candidate provenance and an expansion path. If the true component is never surfaced (as in 89.6% of one network-failure subset), no downstream reasoning can recover it, so measure upstream candidate recall separately.

## Limitations

Overly aggressive defaults can conceal the one field that matters and force extra calls. Bounds should be chosen and evaluated by task class, with reliable expansion paths and tests for zero results, large records, pagination, and error recovery.

## Sources

- [AXI: Agent eXperience Interface dossier](/dossiers/axi-agent-experience-interface.md) — groups token-efficient notation, small default schemas, truncation, pre-computed aggregates, definitive empty states and contextual filtering; its expansion example uses `--full`.
- [Codex Prompting Guide dossier](/dossiers/openai-codex-prompting-guide.md) — recommends a 10,000-estimated-token cap with equal head-and-tail retention and explicit middle omission.
- [Effective context engineering for AI agents dossier](/dossiers/effective-context-engineering-ai-agents.md) — overlapping tools and verbose outputs as context failures.
- [EviRCA: Decoupling Evidence Extraction from Reasoning for Microservice Root-Cause Analysis dossier](/dossiers/evirca-microservice-root-cause-analysis.md) — precomputed evidence cards with opt-in inspection; measured recall ceiling.
- [SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering dossier](/dossiers/swe-agent-agent-computer-interfaces.md) — matched search and file-window ablations, immediate edit feedback, and rejected-proposal versus original-state diagnostics.
- [The Complexity Trap: Simple Observation Masking Is as Efficient as LLM Summarization for Agent Context Management dossier](/dossiers/complexity-trap-observation-masking.md) — observation-only masking competes with summaries on software repair; documents summary overhead, trajectory elongation, scaffold-specific windows and configuration-specific performance losses.
