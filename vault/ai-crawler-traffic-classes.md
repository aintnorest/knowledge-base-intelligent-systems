---
type: Synthesis
title: AI Crawler Traffic Classes
description: Segmenting AI bot hits on your own properties into real-time retrieval, periodic indexing, and training collection — and using the retrieval-without-citation gap as a page-level diagnostic.
tags: [retrieval, evaluation, enterprise]
timestamp: 2026-08-11T20:53:27Z
---

# AI Crawler Traffic Classes

Automated traffic from AI platforms is usually logged as one undifferentiated "bot" bucket. It is at least three different things, arriving for different reasons, carrying different information about demand.

| Class | Trigger | What a visit means | Latency to effect |
|---|---|---|---|
| **Retrieval** | A live user query on the AI platform right now | Real user intent, this minute, for content the system judged relevant | Immediate — the fetch may be feeding an answer already being written |
| **Indexer** | Scheduled crawl to build or refresh a retrieval index | The platform considers the content eligible for future answers | Days to weeks |
| **Training** | Corpus collection for model training | Contributes to future model parameters | One or more model releases |

Classes are separated by user agent, source IP range, and request pattern — platforms increasingly publish distinct identifiers per purpose. The segmentation is only as good as that mapping, so it needs periodic re-verification.

## Why the Split Matters

**Retrieval traffic is the leading indicator.** It is first-party, unsampled, complete, and free — the opposite of response-side visibility metrics, which require repeatedly re-prompting a stochastic system. It tells you which of your pages AI systems reach for when a real person asks a real question.

**The retrieval-without-citation gap is the diagnostic.** A page with high retrieval-bot traffic and a low citation rate has proven demand and a conversion failure: the system is reading the page and declining to use it. That usually localizes to extraction — content behind scripts, buried answers, missing entity definitions, structure the parser cannot segment. Those pages are the highest-return optimization targets precisely because the demand question is already answered. The inverse case — citations without retrieval traffic — points at recalled or third-party-mediated visibility rather than live fetching of your content.

**The classes imply different policies.** Blocking training crawlers while admitting retrieval crawlers is a coherent position; blocking all bots to save CDN spend silently removes you from live answers.

## Practical Use

1. Segment bot hits by class in server or CDN logs and track retrieval volume per URL over time.
2. Join per-URL retrieval volume against per-URL citation counts from response-side tracking; rank by the gap.
3. Alert on retrieval-traffic collapse for pages that previously converted — it precedes visibility loss rather than trailing it.
4. Audit crawler-access rules per class rather than as a single allow/deny.

## Limitations

User agents are self-declared and spoofable, and IP verification is not available for every platform, so class attribution is best-effort. Not every platform separates its purposes cleanly, and a single crawler may serve more than one. Retrieval volume also measures fetch, not use: a page can be fetched and discarded within the same request, so the signal is upper-bound demand. Answers assembled from cache, from model recall, or from a third-party page that mentions you produce no first-party traffic at all — which is why this signal complements, and cannot replace, response-side measurement.

## Sources

- [Answer Engine Optimization: A Measurement Framework](/dossiers/answer-engine-optimization-measurement-framework.md) — proposes the retrieval/indexer/training taxonomy, names retrieval traffic the primary actionable signal, and defines the content-to-citation conversion problem.
