---
type: Synthesis
title: Operator-Conditioned Search Memory
description: Storing search history as deterministic structured records, then synthesizing natural-language memory lazily and only for the nodes the pending operation actually selected.
tags: [agent-memory, context-engineering, agents, agent-harness, token-efficiency]
timestamp: 2026-08-11T17:30:00Z
---

# Operator-Conditioned Search Memory

A long-running search accumulates far more history than any single decision needs. The naive designs both fail: appending the full trace re-serializes an ever-growing history into every request, while eagerly summarizing each node with a language model pays for nodes that are never revisited and produces the summary *before* the decision context that should shape it exists.

The pattern splits memory into two phases with different costs and different triggers.

**Deterministic capture, always.** When a node is evaluated, write a structured record extracted mechanically from the search state and the execution result — provenance, score, delta versus parent, method family, rank, error signature, runtime, resource use. Aggregate these into a global board holding population-level statistics: best candidate per method family, underexplored directions, recurring failures, score trends, the parent graph. This is cheap, lossless in the fields that matter, and directly queryable.

**Language-model synthesis, on demand.** Defer prose summarization until an operation has selected the specific nodes it will act on. Then summarize only those nodes and their retrieved neighbors, cache the result, and shape the retrieval set by which operation is running:

- a *refinement* operation gets the selected node's record, a vertical trace of its ancestors, and a horizontal set of siblings ranked by the same utility used to pick parents — so it can contrast its trajectory against nearby alternatives;
- a *recombination* operation gets that construction for both parents plus an explicit complementarity cue;
- a *repair* operation retrieves prior attempts sharing the same error signature, falling back to recent attempts when no match exists.

Include the remaining budget, remaining steps, and per-call execution limit, so the operation proposes something feasible.

## Why It Helps

Retrieval relevance and cost improve together. The operation about to run is the best available predictor of which history is relevant, and it is known at retrieval time but not at write time. Deferring also means the summarizer is only invoked for the small fraction of nodes that are ever selected.

The measured effect in the source below: mean refinement prompt length fell from 102.8K to 35.7K characters and its 99th percentile from 389.0K to 54.3K — compression concentrated in the tail, which is the signature of stopping repeated full-history serialization. Total tokens fell 41.7% while evaluated nodes fell only 12.4%, and useful discoveries per million tokens nearly doubled.

## Practical Use

Applies to any agent loop with a persistent artifact store and repeated decisions over it — evolutionary program search, multi-attempt debugging, iterative document revision, experiment tracking. The test for whether you need it: if your prompt grows monotonically with session length, you are paying eager-history costs.

Keep the retrieval signals deterministic even when the summaries are generated. A cached LLM summary is a convenience layer; selection and ranking should remain reproducible from the structured records so a decision can be replayed and audited.

Record negative evidence explicitly. Marking a known-bad branch or a recurring error as *avoid* is often more valuable than another description of what worked, and it is exactly what an unstructured trace loses.

## Limitations

- Bounded retrieval can omit the one distant node that mattered; recall is traded for cost by construction.
- Cached summaries go stale if the underlying node is later re-scored or its lineage re-interpreted.
- The structured schema encodes an assumption about which metadata predicts relevance. Fields nobody thought to capture cannot be retrieved on.
- Lazy synthesis moves latency into the critical path of an operation rather than into background evaluation, which can hurt interactive settings.

## Sources

- [Frontis-MA1: Training an AI4AI Model towards Recursive Self-Improvement in Machine Learning Engineering](/dossiers/frontis-ma1-ai4ai-recursive-self-improvement.md) — replaces AIRA-Evo's eager per-node summarization with deterministic experience cards plus operation-triggered synthesis; matched-seed comparison over 66 task–runs reports −41.7% tokens, −86.1% refinement-prompt tail, and +84.3% new-best updates per million tokens.
