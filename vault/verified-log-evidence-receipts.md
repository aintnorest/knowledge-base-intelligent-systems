---
type: Synthesis
title: Verified Log Evidence Receipts
description: Reducing large diagnostic logs with a cheaper extractor while verifying source identity, literal evidence, and exit status before presenting a smaller receipt to the diagnosing agent.
tags: [agents, agent-harness, verification, token-efficiency, tool-use]
timestamp: 2026-09-26T06:41:12Z
---

# Verified Log Evidence Receipts

A large build or test log often contains a small amount of diagnostic evidence, but repeatedly carrying the whole log through an agent's context is expensive. A **verified evidence receipt** separates *extracting evidence* from *interpreting it*: a cheaper model proposes a compact, source-linked receipt; deterministic checks decide whether the receipt is safe to present; the main agent still diagnoses the failure and decides what to do.

## Pattern

1. Scope eligible outputs narrowly, e.g., build/test commands and a minimum size. Preserve the exact log with a stable handle and source hash before compression. File reads, search results, and sensitive outputs may need a different policy.
2. Ask an extractor to produce a receipt with a fixed schema: source identity, original exit status, and **exact quoted lines** relevant to next-step diagnosis, rather than an unsupported paraphrase or a proposed repair.
3. Verify the schema, hash, status, quote membership in the original source, and that the result actually saves space. If verification fails or credentials may be present, return the original output instead. Make exact source retrieval possible when the receipt is insufficient.
4. Account for the extra extraction call and any interaction with downstream observation packing. Compare complete-task API cost and task success, not just receipt size.

SoL-Pi's Evidence-Preserving Reducer follows this pattern for predefined build/test results **≥4 KiB**. It uses GPT-5.6 Luna (high) for extraction, deterministic checks for schema/hash/status/exact quotes/size, and an original-log fallback. Its ObservationPack mechanism runs afterward and recognizes the verified receipt instead of packing it again. In the EdgeBench add-one comparison, reducer alone lowers recorded total tokens versus Pi on both GPT-5.6 Sol and Opus 5, but the Opus 5 average score is **43.405 versus 44.756** for Pi; preserving quotes is not the same as preserving all useful diagnostic context.

## When Useful and Limits

Use where verbose diagnostics are routine and a bounded receipt can surface compile/test failure evidence; retain exact original bytes for a late question. Unlike generic [bounded tool observations](/vault/bounded-tool-observations.md), the receipt has an explicit *verifiable evidence contract* across an auxiliary model boundary. Unlike [reversible, query-conditioned compaction](/vault/reversible-query-conditioned-compaction.md), it specifies what can be checked **before** a model consumes the compressed version.

Literal verification cannot determine which lines *should* have been included or whether the main agent infers the right cause. Extractor latency/cost, false omissions, risky credential detection, and on-demand source retrieval all need end-to-end tests. The hash proves which archived output was inspected only when source storage and verifier boundaries are trustworthy.

## Sources

- [SoL-Pi dossier](/dossiers/sol-pi-efficient-agent-harness.md) — verified reducer contract, fallback, ordering relative to ObservationPack, and add-one score/cost comparisons on two backends.
