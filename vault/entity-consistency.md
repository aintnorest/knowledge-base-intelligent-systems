---
type: Synthesis
title: Entity Consistency
description: Naming the same person, product, organization, or concept identically — and pointing every mention at one canonical identifier — so a machine reader merges them into a single well-attested node instead of several weak ones.
tags: [generative-search, knowledge-graphs, retrieval, provenance]
timestamp: 2026-08-11T20:55:03Z
---

# Entity Consistency

Entities are the primary keys of a corpus. When the same product, person, organization, API, or concept is named differently across documents — or named identically but linked to different identifiers — a machine reader has no reliable way to tell that the mentions are the same thing. It stores several partial nodes instead of one strong one, and every signal attached to that thing is divided among them.

Entity consistency is the discipline of maintaining **referential integrity across a published corpus**: one canonical name and one canonical identifier per entity, used everywhere, on-site and off.

## The Practice

1. **Maintain an explicit entity list.** For each entity, record one canonical name, an approved short form, disallowed variants, and one canonical URL that serves as its identifier. Without a written list, drift is invisible.
2. **Use the canonical name on first mention in every document**, then the short form. Never let a rename propagate partially — a half-renamed product is two weakly attested entities rather than one strong one.
3. **Give each important entity one canonical page** that defines it, and link every mention to that page. The URL becomes the entity's de-facto identifier; anchor text is entity-labelling as much as navigation, which is why "click here" and "read more" waste a labelling opportunity.
4. **Declare identity in structured data and keep the fields byte-identical everywhere** — the same organization identifier, the same author identifier, the same canonical URL for the same thing across every page that mentions it.
5. **Extend the identifiers off-domain.** Point profiles, repositories, package registries, specifications, and documentation at the same canonical identifiers so external mentions merge into the same node instead of fragmenting.
6. **Define your terminology where you use it.** Novel or overloaded terms need a one-sentence definition adjacent to first use; a machine reader cannot infer private vocabulary, and an overloaded term silently merges your entity with someone else's.

## Why It Is Under-Rated

Entity fragmentation is a silent tax. It produces no error, appears in no conventional analytics view, and degrades nothing visibly — it just divides the attestation behind every other signal the corpus generates, so structure, authority, and freshness work all pay off less than they should. The remedy is cheap, mechanical, and almost entirely unglamorous, which is why it is usually skipped.

## Limitations

- Consistency is a means, not an end: identical naming across pages that say nothing substantive merges several weak nodes into one weak node.
- Renames are genuinely hard. A clean transition needs the old name retained as a documented alias with redirects from old identifiers, not simple erasure, or existing attestation is lost.
- Over-linking every mention of every entity produces link noise that degrades human reading; link the first substantive mention per document, not all of them.
- Merge behavior inside any given machine reader is opaque and unverifiable from outside; the practice is defensible on mechanism, but its effect on attribution accuracy is not directly measurable by the publisher.

## Related

- [Generative Engine Optimization](/vault/generative-engine-optimization.md) — the publishing practice this discipline supports.

## Sources

- [Generative Engine Optimization in Practice](/dossiers/generative-engine-optimization-implementation-guide.md) — entities as primary keys, canonical naming and identifiers, structured-data identity fields, off-domain cross-referencing
