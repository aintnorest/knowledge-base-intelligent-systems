---
type: Synthesis
title: Source-Adapter Decoupling
description: A research-agent design pattern that acquires each important platform through a dedicated adapter with preserved provenance, keeping the reasoning model a replaceable planner and synthesizer rather than the presumed retrieval system.
tags: [retrieval, agent-harness, tool-use, provenance, agents]
timestamp: 2026-07-28T22:49:26Z
---

# Source-Adapter Decoupling

When source access is fragmented across hosts, licenses, and crawler policies, a research agent should not depend on one autonomous generic web search. Instead: route each important platform through a dedicated source adapter, and keep the synthesizing model independently replaceable.

## The Pattern

1. Query important platforms through source-specific adapters (platform API, native tool, scraper chain, or fallback sequence), chosen for retrieval fidelity.
2. Record which backend served each item; distinguish "no results" from retrieval failure.
3. Preserve source metadata — timestamps, URLs, authorship, engagement state — through to synthesis.
4. Hand the model bounded evidence; select the planner/reranker/synthesizer model independently of source backends.
5. Evaluate retrieval recall separately from answer quality.

The `last30days` skill is a working example: per-source chains (yt-dlp before scraper fallback for YouTube; native X search before authenticated clients; outcome-dependent conditional routing for Reddit; Brave→Exa→Serper→keyless for general web) with planning models swappable across vendors.

## Why It Matters

- Portability: replacing the reasoning model does not rebuild source integrations; replacing a search provider does not disturb synthesis.
- Coverage becomes an engineered, observable property instead of an emergent property of one host's undisclosed index.
- Provenance preservation makes gaps visible — an answer can report which sources were actually reached.

## Limitations

Adapters inherit each source's permission regime (API terms, robots policy, login gates) and add maintenance surface; conditional routing logic itself needs evaluation. The pattern compensates for unequal host access — it cannot manufacture access that policy denies.

## Related

- [Retrieval as Host Capability](/vault/retrieval-as-host-capability.md) — the analysis this pattern responds to.
- [Retrieval Interface Tax](/vault/retrieval-interface-tax.md) — every added adapter/interface has a usage cost the agent must pay.

## Sources

- [Source Access Is a Systems Property](/dossiers/ai-assistant-source-access-and-retrieval-partnerships.md) — `last30days-skill` case study at a pinned commit
