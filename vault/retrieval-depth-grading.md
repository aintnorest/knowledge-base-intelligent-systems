---
type: Synthesis
title: Retrieval-Depth Grading
description: Score what artifact a retrieval system actually obtained — nothing, URL/title, snippet, full content, or structured source-native fields — independently of the fluency of the synthesized answer.
tags: [evaluation, retrieval, agents, verification]
timestamp: 2026-07-28T22:49:26Z
---

# Retrieval-Depth Grading

A cited URL is weak evidence of retrieval capability: "found a video" spans everything from seeing a title to interpreting audiovisual content. Evaluations of search-capable systems should grade the retrieved artifact on an ordinal depth scale and score it separately from prose quality.

## The Scale

| Grade | Retrieved artifact |
|---|---|
| 0 | No relevant result or an access failure |
| 1 | URL or title only |
| 2 | Snippet, description, or limited metadata |
| 3 | Full text, thread, comment tree, transcript, or passages sufficient to verify requested claims |
| 4 | Structured, current, source-native fields (thread topology, revision state, live availability, authorized private records) |

## How to Use It

- Probe with known, freshly created artifacts (a thread posted hours ago, a video with and without captions, a same-day price change) and verify specific fields, not open-ended trivia.
- Record host, product mode, exact model, account tier, connector state, locale, and timestamp — otherwise a host or license advantage is misattributed to the model.
- Distinguish retrieval failure from synthesis failure, and repeat trials: automatic tool invocation is stochastic.
- A fluent summary built from grade-1/2 evidence is a hallucination risk wearing a citation.

## Related

- [Harness-Conditioned Retrieval Evaluation](/vault/harness-conditioned-retrieval-evaluation.md) — same separation of retrieval from end-to-end answer quality, applied to retriever–harness pairs.
- [Retrieval as Host Capability](/vault/retrieval-as-host-capability.md) — why the controls list is mandatory.

## Sources

- [Source Access Is a Systems Property](/dossiers/ai-assistant-source-access-and-retrieval-partnerships.md) — Appendix A reproducible retrieval probe
