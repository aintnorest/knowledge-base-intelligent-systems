---
type: Study Note
title: How AI Agent Memory Works
description: Personal study notes on Mert Cobanov's interactive essay explaining agent memory as context construction, governed storage, hybrid retrieval, and production infrastructure.
resource: https://memory.cobanov.dev/
source: https://memory.cobanov.dev/
tags: [agent-memory, context-engineering, retrieval, agents, governance]
timestamp: 2026-07-13T02:43:17Z
---

# How AI Agent Memory Works - Study Notes

**Author**: Mert Cobanov  
**Venue**: Interactive web essay, memory.cobanov.dev  
**Accessed**: July 13, 2026

## What It Is

This is an interactive primer on the systems around a stateless language model that make an agent appear to remember. Its unifying definition is practical: agent memory is the policy and infrastructure that decide what information should enter the next prompt.

The essay uses small demonstrations to explain a complete stack: a bounded live transcript, selective long-term writes, embedding-based recall, different memory types, hybrid retrieval, lifecycle governance, multi-agent scoping, and production operations. It is a design guide rather than a benchmark paper or a claim about one framework.

## The Problem It Solves

Keeping the entire transcript in context gives exact recall only while it fits. Once a context window fills, FIFO truncation can discard the one early fact that changes the current answer. A larger window delays that failure but does not supply a query plan, temporal validity, access control, conflict handling, or deletion.

The essay therefore separates two jobs that are often conflated:

- **Working memory** is the mutable, in-prompt state for the active turn: recent conversation, tool calls, and scratch work.
- **Long-term memory** is a persistent store whose records are encoded, retrieved, updated, and governed deliberately.

The key risk is not only forgetting. A system that retains stale, contradictory, sensitive, or cross-user information can make a confident response less safe than no memory at all.

## How the Memory Loop Works

The core RAG-shaped loop is: receive a user message, decide whether retrieval is needed, encode the query, retrieve relevant records, pack them into the prompt, generate a response, then decide whether new information should be written back. The important engineering choices sit at each stage.

1. **Need detection** avoids a memory lookup when the request can be answered without continuity.
2. **Query preparation** may rewrite the query or use HyDE, which embeds a hypothetical answer-shaped document rather than the question itself.
3. **Hybrid retrieval** combines dense embedding search, sparse lexical search, and sometimes graph traversal. Reciprocal Rank Fusion combines differently ranked result lists without assuming their scores are calibrated alike.
4. **Reranking and filtering** apply relevance, permission scope, tenant identity, and temporal validity before any item enters the prompt.
5. **Context packing** selects a compact set of facts with provenance instead of dumping a store into the model context.
6. **Governed writing** extracts only durable information, then records its provenance, validity, scope, and lifecycle state.

This makes retrieval a pipeline rather than a nearest-neighbor lookup. A semantically correct candidate may still be expired, inaccessible, contradictory, or too weakly supported to influence an answer.

## Memory Types and Architectures

The essay uses four cognitive labels that map cleanly to system responsibilities:

- **Episodic memory** stores time-stamped interactions and is useful for questions about what happened or what was discussed.
- **Semantic memory** stores facts and relations, commonly through a document collection, vector index, or graph.
- **Procedural memory** holds learned skills, instructions, and tool-use rules.
- **Working memory** is the current prompt-bound scratch space.

It contrasts a simple rolling buffer, rolling summaries, vector stores, knowledge graphs, hierarchical/paged memory (MemGPT-style), and self-editing memory (Letta-style). The useful conclusion is compositional: a vector store helps semantic recall, a graph helps relationships, and a policy layer supplies write controls, temporal behavior, PII handling, auditing, and sharing rules. No storage architecture provides all of those by itself.

## Memory Governance Is a Lifecycle

The strongest operational idea is that memory is not append-only storage. It has a lifecycle: write, age, supersede, redact, forget, and audit. The essay's example of a user moving cities illustrates why simple append creates contradictory facts while simple overwrite removes history needed for temporal questions.

A governed record can retain the prior fact with a valid-until date and a superseded state, activate the future fact at its effective date, and reject or redact sensitive material before indexing. That approach preserves temporal reasoning without allowing an old city or raw payment instrument to masquerade as a current user preference.

Multi-agent memory extends the same principle to scope. Private agent memory should be the default; project, user, organization, and global stores should require an explicit write policy. Every read and write needs tenant and user filtering, content rules, and provenance so collaboration does not become cross-user leakage or poison propagation.

## Production Architecture

The essay recommends separating the request-path agent runtime from a memory service. Retrieval, filtering, packing, and generation remain latency-sensitive; slower work such as extraction, summarization, deduplication, re-embedding, decay, and index updates can run in the background.

It also describes storage tiers: hot facts in a KV cache or SQL row, warm episodes and preferences in vector and full-text indexes, and cold raw events in object storage or an append-only log. A minimal API consists of event ingestion, policy-enforced hybrid search, and deletion that propagates to derived indexes while preserving deletion lineage for audit.

The concrete performance lesson is to budget retrieval like a product dependency: run independent dense, sparse, and graph retrievers in parallel; skip retrieval when unnecessary; cache high-frequency facts; and track p95 latency. A vector database alone is not a production memory system.

## My Takeaways

1. **Memory quality depends on the whole lifecycle.** Embeddings answer only one retrieval question; they do not decide whether a fact should exist, remain current, be visible, or be removed.
2. **Hybrid retrieval is a control flow.** Need detection, query shaping, fusion, reranking, filters, and packing are all distinct defenses against irrelevant or unsafe context.
3. **Temporal and permission metadata are first-class.** A fact without scope, provenance, and validity is difficult to audit and easy to misuse.
4. **Write policy matters as much as read quality.** Guarded extraction, deduplication, supersession, and redaction reduce the chance that a durable store becomes a durable error source.
5. **Production memory is retrieval infrastructure.** Its latency, tenancy, migration, deletion, observability, and background maintenance deserve the same design attention as the model call.

## Limitations and Questions

- This is a pedagogical essay with illustrative interactions, not an empirical comparison of memory architectures. Its tool examples and latency figures are teaching defaults rather than deployment measurements.
- The architectural matrix necessarily compresses difficult tradeoffs. For example, a graph may express relations but still needs robust extraction, conflict resolution, and maintenance.
- Hybrid retrieval improves coverage but adds latency, ranking complexity, and more places for permission or provenance bugs. It needs an evaluation set that includes stale facts, adversarial writes, cross-tenant queries, and contradictory records.
- HyDE, reranking, and model-driven write decisions introduce extra model calls. Their incremental value should be measured against a task-specific quality and cost budget.
- The essay describes what a governed memory system should do, but a production design still needs exact retention rules, declassification paths, deletion semantics for derived summaries, and human escalation policies.

## Vault Ideas Extracted

* [Memory Lifecycle Governance](/vault/memory-lifecycle-governance.md)
* [Hybrid Memory Retrieval Pipeline](/vault/hybrid-memory-retrieval-pipeline.md)
