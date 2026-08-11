---
type: Synthesis
title: Engine-Specific Citation Ecosystems
description: Different retrieval-backed assistants answer the same query from largely disjoint source pools, so engine identity dominates prompt wording, language, and user persona as a source of variation.
tags: [retrieval, evaluation, reliability]
timestamp: 2026-08-11T21:06:00Z
---

# Engine-Specific Citation Ecosystems

Two AI assistants given the identical question will usually agree on the *answer* and disagree on the *evidence*. Measured on cited-domain sets, pairwise Jaccard overlap between major assistants runs roughly 0.09–0.25, with 50–68% of each engine's domains appearing in that engine alone. Only a thin core of high-authority publishers is shared by everyone; the rest of each engine's corpus is effectively private to it.

The corollary, repeatedly observed, is a **variance ordering**: engine identity explains more of the variation in what gets cited than the user persona, the prompt paraphrase, or (usually) the prompt language.

## Where the Divergence Comes From

Each engine composes a different retrieval stack: its own index or search provider, its own licensing and crawl permissions, its own re-ranking and citation policy, its own tolerance for video and community platforms, and its own freshness behavior. None of this is a property of the underlying model, so identical weights behind two products can inhabit unrelated evidence ecologies. The divergence widens exactly where authority is fragmented — local services, long-tail categories — and narrows where a vertical has a handful of universally recognized review outlets.

## Consequences

- **"AI search" is not one system.** Any measurement of one assistant's sourcing behavior is a statement about that product configuration, not about generative search. Studies that generalize from a single engine overreach.
- **Answer stability hides evidence instability.** Recommendation lists can be far more stable than the citations supporting them: rewording a prompt frequently rotates the supporting articles while leaving the named options untouched. Grounding and attribution audits must therefore measure the evidence layer separately from the answer layer.
- **Coverage strategies must be per-engine.** A source portfolio tuned to one assistant's favored outlets can be invisible on another; the practical unit of work is a per-engine citation-network map, not a single "authority" score.
- **Users see different worlds.** Engine choice silently determines which businesses, publishers, and viewpoints a person is exposed to — an information-diversity effect that no individual answer reveals.

## How to Measure It

Issue one intent-matched battery to every engine, de-duplicate cited domains per engine, then report set sizes, pairwise Jaccard, exclusive share per engine, and the partition counts (domains seen by exactly one, two, three, or all systems). Repeat under perturbations — paraphrase, language, persona — and compare the within-engine spread against the between-engine gap; if the between-engine gap dominates, engine identity is the controlling variable.

## Limitations

- Domain-level overlap ignores which *page* and how the source was used; two engines citing the same publisher may still rely on different articles and reach different conclusions.
- Snapshot-bound: retrieval providers, licensing deals, and citation policies change, and engines are non-deterministic, so single-run overlap figures need repetition to be trusted.
- Overlap is sensitive to how many citations each engine emits; normalized measures (Jaccard, exclusive share) are comparable, raw intersection counts are not.

## Sources

- [Generative Engine Optimization: How to Dominate AI Search dossier](/dossiers/generative-engine-optimization-dominate-ai-search.md) — cross-model domain-diversity experiments (Jaccard 0.088–0.251, 50.3–67.6% exclusive domains) and the finding that engine identity outweighs persona, paraphrase, and often language.
