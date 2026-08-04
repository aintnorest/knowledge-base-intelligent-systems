---
type: Synthesis
title: Retrieval as Host Capability
description: Live source access belongs to the product system around a model — host, tool policy, search providers, licenses, adapters, and credentials — so retrieval must be analyzed and evaluated at the system level, not the model level.
tags: [retrieval, agent-harness, agents, evaluation]
timestamp: 2026-07-28T22:49:26Z
---

# Retrieval as Host Capability

A model invocation has no live source access by itself. What an AI system can look up is determined by a five-layer stack: model training knowledge, the assistant host and its tool policy, a general search index, source-specific APIs or feeds, and user-authorized private connectors. The same model receives entirely different evidence in different hosts; the same host can swap models without changing its information supply chain.

```text
effective lookup capability
    = model reasoning
    + tool policy
    + retrieval providers
    + source adapters
    + credentials and permissions
    + source accessibility
    + citation and synthesis behavior
```

## Consequences

- Source coverage is a gradient (structured vs. page-shaped, fresh vs. stale, full thread vs. snippet), not present/absent. Licensed or native paths deepen access; public-web fallback usually persists in degraded form.
- Crawler permission is an independent gate even without any content license: a URL must be discoverable, fetchable under robots/rate-limit/CDN policy, complete, and legally usable — a page can be public to a browser yet title-only to an assistant.
- Comparative claims ("model X searches platform Y better") are unfounded unless host, product mode, account tier, connector state, locale, and timestamp are controlled; otherwise a host or license advantage is misattributed to model weights.

## Related

- [Harness-Conditioned Retrieval Evaluation](/vault/harness-conditioned-retrieval-evaluation.md) — the same system-level lesson established empirically for retriever–harness composition.
- [Source-Adapter Decoupling](/vault/source-adapter-decoupling.md) — the design pattern that responds to this fragmentation.

## Sources

- [Source Access Is a Systems Property](/dossiers/ai-assistant-source-access-and-retrieval-partnerships.md) — five-layer pipeline, documented capability map, evidence-class grading
