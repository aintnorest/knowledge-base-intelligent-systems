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

A source-specific retrieval chain can try a high-fidelity backend first and fall back according to the observed result, while the planning model remains independently replaceable. This distinguishes an empty source from a failed adapter and makes coverage measurable rather than assumed.

Adapter choice is also a decision the planner must make well: overlapping search tools can yield very different source quality, and vague descriptions invite the wrong route or repeated queries. Describe each adapter's coverage, authority, and failure signals in terms the agent can act on; inspect traces for wrong-tool selection and validate retrieved source quality, not just answer fluency. Better tool descriptions can improve recovery, but cannot make a low-quality source authoritative.

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

- [Source Access Is a Systems Property](/dossiers/ai-assistant-source-access-and-retrieval-partnerships.md) — `last30days-skill` case study at a pinned commit: yt-dlp then scraper for YouTube, native X search then authenticated clients, conditional Reddit routing, and Brave→Exa→Serper→keyless web fallback.
- [How we built our multi-agent research system dossier](/dossiers/anthropic-multi-agent-research.md) — reports wrong-tool selection and preference for low-quality search results, with first-party improvement after rewriting confusing tool descriptions.
