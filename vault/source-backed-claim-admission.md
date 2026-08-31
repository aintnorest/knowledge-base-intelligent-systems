---
type: Synthesis
title: Source-Backed Claim Admission
description: Governing an LLM's factual runtime context by admitting only atomic claims with explicit source provenance, entity scope, verification state, and use policy.
tags: [provenance, retrieval, enterprise, governance]
timestamp: 2026-07-13T17:54:59Z
---

# Source-Backed Claim Admission

Source-backed claim admission is a governance pattern for LLM applications: raw documents may be registered and retrieved, but an answer may assert facts only from a separate set of atomic claims that carry explicit provenance, scope, and a runtime-use policy. It makes factual eligibility an application-controlled decision instead of a consequence of what a model happened to retrieve or phrase fluently.

## The Pattern

1. Register each source with its locator, owner or issuer, scope, status, provenance metadata, and allowed-use policy.
2. Preserve inspectable evidence from an eligible source, including immutable identifiers or hashes and a precise location when feasible.
3. Promote an atomic statement only after it is linked to that evidence and assigned an entity or audience scope, claim type, verification state, and runtime policy.
4. At answer time, select only claims that are eligible for the resolved entity and question. Pass the bounded claim package and reader-facing source links to the composer.
5. Keep generated summaries or wiki pages useful but non-authoritative unless they independently satisfy the same admission rules.
6. Trace which claims and sources were selected, then review or revoke claims as source freshness, permissions, or verification changes.

## Practical Use

Use this pattern where factual scope matters: regulated or financial briefings, policy assistants, enterprise search, customer-support knowledge, compliance workflows, and any system that combines data from multiple entities. It is especially valuable when a relevant source may still be ineligible for a particular affiliate, customer, audience, or time window.

The smallest viable implementation can use structured records with source IDs, evidence pointers, entity IDs, status, and a claim-review workflow. The important separation is between raw availability and permission to state a fact at runtime.

For standards-constrained authoring, admission must cover normative claims as well as factual ones. An AI assistant can retrieve terminology or propose controlled-language wording, but the applicable standard remains the authority and the human or organizational reviewer remains accountable for acceptance. Record the standard version and rule evidence behind a compliance decision rather than treating the model's “compliant” label as an admitted fact.

## Limitations

- Admission controls provenance and policy, not truth. An incorrectly extracted or incorrectly reviewed claim can still be eligible, so claim-quality evaluation and correction paths remain necessary.
- Building and refreshing a claim layer costs more than unrestricted retrieval and can reduce coverage for long-tail questions.
- Atomic claims can lose important qualifications. Preserve links to the original evidence and represent validity dates, uncertainty, and conflicting evidence explicitly.
- Provenance is not permission. Private or mixed-access sources also need access controls that propagate to claims, summaries, caches, and outputs.

## Sources

- [From Prompts to Contracts: Harness Engineering for Auditable Enterprise LLM Agents dossier](/dossiers/auditable-enterprise-llm-harness.md) — source manifests, evidence records, and company-scoped promoted claims form the runtime factual layer; maintained wiki context remains non-authoritative.
- [ASD-STE100 and AI dossier](/dossiers/asd-ste100-ai-assisted-technical-writing.md) — makes the controlled-language standard authoritative over AI-generated wording and assigns final compliance responsibility to human authors and organizations.
