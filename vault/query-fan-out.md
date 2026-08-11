---
type: Synthesis
title: Query Fan-Out
description: Expanding one user question into a set of concurrent generated sub-queries before retrieval, and the coverage, cost, and attribution consequences of doing so.
tags: [generative-search, retrieval, decomposition, evaluation]
timestamp: 2026-08-11T20:55:21Z
---

# Query Fan-Out

**Query fan-out** is the retrieval pattern in which a system expands a single user question into a *set of concurrent, model-generated related queries*, runs them in parallel against a corpus, and pools the results into one evidence set for synthesis. It sits between the user's words and the retriever, and it is a decomposition step, not a reformulation step: the original query is not replaced, it is supplemented.

A canonical illustration: "how to fix a lawn that's full of weeds" fans out to "best herbicides for lawns", "remove weeds without chemicals", and "how to prevent weeds in lawn" — three sub-questions that a good answer must cover but that the literal query does not name.

## Why It Helps

- **Vocabulary coverage.** A single query only reaches documents that match its phrasing. Generated variants reach documents that use different terminology for the same need.
- **Aspect coverage.** Many questions have implicit sub-questions (alternatives, prevention, cost, constraints). Fan-out surfaces evidence for aspects the user did not think to ask about, which is what makes a synthesized answer feel complete rather than merely correct.
- **Recall over one shot.** Parallel narrow queries beat one broad query at retrieving a diverse evidence set, because each sub-query gets its own ranked slate rather than competing for slots in a single one.
- **Latency amortization.** The sub-queries are concurrent, so coverage improves without serializing multiple retrieval rounds — the key difference from iterative agentic search, which pays a round trip per refinement.

## Where It Costs

- **Cost scales with breadth.** Every sub-query is a full retrieval, and the pooled candidate set inflates the context and reranking budget for the synthesis step.
- **Drift.** Generated sub-queries can wander from the user's actual intent, importing plausible but off-target evidence that the synthesizer then dutifully incorporates.
- **Redundancy and popularity bias.** Overlapping sub-queries retrieve overlapping documents; without dedup and diversity-aware pooling, a source that ranks moderately for many variants can crowd out one that ranks first for the real question.
- **Aggregation is unspecified.** Fan-out only defines the expansion; how the pooled results are deduplicated, reranked, and budgeted is where most of the quality actually lives.

## The Attribution Consequence

Fan-out breaks the one-question-one-query assumption that most measurement rests on. From outside the system you observe a user question and a set of cited sources, but the queries that actually retrieved those sources were generated internally and are usually not exposed. Two things follow:

- **Per-keyword attribution degrades.** A publisher cannot tell which phrasing surfaced their page, so keyword-level ranking data becomes a poor proxy for visibility in generated answers. Aggregate first-party reporting is the only reliable instrument.
- **Optimizing per fan-out variant is a trap.** The natural but wrong response is to author a page for every predicted sub-query. This multiplies thin, near-duplicate pages, and search platforms treat that pattern as scaled content abuse — while retrievers that match on meaning rather than exact strings get little benefit from it anyway. Cover the aspects within a coherent document instead of sharding them across documents.

## Practical Use

1. Generate sub-queries that decompose *aspects* of the question, not synonyms of it — synonym expansion is the retriever's job.
2. Cap the fan-out width and budget it explicitly; unbounded expansion is the usual cause of runaway retrieval cost.
3. Deduplicate across sub-query result sets and rerank the pool as a whole, with an explicit diversity term.
4. Keep the original query's results privileged; fan-out results supplement them and should not outrank direct hits.
5. Log the generated sub-queries. Without them, retrieval failures and synthesis failures are indistinguishable after the fact.

## Limitations

Fan-out cannot rescue a corpus that lacks the evidence, and it can make an ungrounded answer *more* convincing by supplying a larger volume of tangentially relevant material. It also assumes the sub-query generator understands the domain well enough to decompose it — in specialized fields, generated variants may encode a naive framing of the question and systematically miss the literature that matters.

## Sources

- [Optimizing Your Website for Generative AI Features on Google Search](/dossiers/google-search-generative-ai-optimization-guide.md) — names query fan-out as one of two disclosed mechanisms behind AI Overviews and AI Mode, with the lawn-weeds example, and argues against authoring separate pages per fan-out query.
