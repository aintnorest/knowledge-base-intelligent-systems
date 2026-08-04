---
type: Synthesis
title: Permission-Scoped Synthesis
description: Context-engineering principle that access controls must constrain not only retrieval, but also summaries, memories, and cross-source conclusions.
tags: [context-engineering, access-control, governance, privacy, agents]
timestamp: 2026-07-12T21:27:50Z
---

# Permission-Scoped Synthesis

A governance principle for context engines: permission boundaries must apply to generated summaries and memories, not just to raw source retrieval.

## The Core Idea

If a system can retrieve from private channels, repositories, tickets, or documents, it must ensure that derived context does not leak restricted information. A summary can reveal private facts even when it does not quote the underlying source.

The synthesis layer therefore needs to know which evidence each conclusion depends on and who is allowed to see that conclusion.

## What Needs Scoping

- Retrieved snippets and documents.
- Cross-source summaries.
- Distilled memories created at ingestion time.
- Runtime judgments that combine public and private evidence.
- Cached answers or reusable context blocks.
- Explanations and citations shown to users or agents.

## Practical Rule

Treat derived context as carrying the strictest relevant permissions of its supporting evidence unless there is an explicit declassification process. If mixed-access evidence is needed, compartmentalize the synthesis or produce separate views for different audiences.

## Limitations

Strict scoping can reduce reuse and increase storage complexity. Loose scoping can leak sensitive information through paraphrase, omission patterns, or apparently generic advice. The hard part is tracking provenance through summarization and memory distillation.

## Sources

- [Mergeable by Default dossier](/dossiers/context-engineering-talk.md) - uses private-channel context as an example and argues that synthesis itself may need compartmentalization across permission boundaries.
- [Context Engineering: From Prompts to Corporate Multi-Agent Architecture dossier](/dossiers/context-engineering-corporate-multi-agent-architecture.md) — frames isolation as a context-quality criterion and argues for role-bounded visibility and progressively narrowed delegation; this is a conceptual proposal.
