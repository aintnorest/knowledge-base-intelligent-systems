---
type: Study Note
title: Introducing AI Performance in Bing Webmaster Tools (Public Preview)
description: Personal study notes on Microsoft's AI Performance dashboard, which reports how often a site is cited as a source in Copilot and Bing AI answers, and on what those citation metrics can and cannot establish.
resource: https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
source: https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
tags: [generative-search, retrieval, evaluation, provenance, governance]
timestamp: 2026-08-11T14:20:00Z
---

# Introducing AI Performance in Bing Webmaster Tools (Public Preview) - Study Notes

- **Authors**: Krishna Madhavan, Meenaz Merchant, Fabrice Canel, Saral Nigam (Product Managers, Microsoft AI)
- **Publisher**: Bing Blogs — Webmaster Blog
- **Date**: February 10, 2026
- **Format**: Vendor product announcement (public preview)
- **Product surface**: Bing Webmaster Tools → AI Performance (`aka.ms/BWTAIpref` resolves to the Bing Webmaster Tools entry point)
- **Post tags**: `AIsearch`, `GEO`

## What It Is

A first-party analytics report that tells a site owner how often their content was
**used as a cited source inside generative answers**, rather than how often it was
shown or clicked as a search result. Microsoft describes it as showing how publisher
content appears "across Microsoft Copilot, AI-generated summaries in Bing, and select
partner integrations," with "clear visibility into which URLs are referenced and how
citation activity changes over time."

The framing in the post is explicit and worth recording verbatim in spirit: this is
"an early step toward Generative Engine Optimization (GEO) tooling in Bing Webmaster
Tools." A search engine is conceding that the unit of publisher visibility is shifting
from the ranked link to the answer citation, and is standing up telemetry for the new
unit.

## The Problem It Addresses

Classic webmaster telemetry (crawl status, index coverage, impressions, clicks,
position) describes a world where the engine returns documents and the user chooses
one. In an answer-generating pipeline the engine retrieves passages, grounds a
generated answer on them, and attributes the answer to a handful of URLs. In that
pipeline:

- an impression of the *answer* is not an impression of your *page*;
- the query that fetched your content is issued by the model, not typed by the user;
- the user may never click, so downstream analytics see nothing at all.

Publishers were therefore blind to whether their content was participating in AI
answers, and the gap was being filled by third-party AI-visibility trackers that
infer citations by prompting the assistants themselves. AI Performance replaces that
inference with platform-side logs — the same structural advantage Search Console has
over rank trackers.

## What the Dashboard Measures

The post defines five surfaces of the report. The disclaimers attached to each are as
informative as the definitions.

| Metric | Definition (per Microsoft) | Explicit disclaimer |
|---|---|---|
| **Total Citations** | Total number of citations displayed as sources in AI-generated answers in the selected time frame | Does not indicate "placement or presentation within a specific answer" |
| **Average Cited Pages** | Average number of *unique* pages from the site displayed as sources per day over the range | Aggregated across supported AI surfaces; does "not indicate ranking, authority, or the role of any page within an individual answer" |
| **Grounding queries** | "The key phrases the AI used when retrieving content that was referenced in AI-generated answers" | "The data shown represents a sample of overall citation activity"; the metric will be refined as more data is processed |
| **Page-level citation activity** | Citation counts for specific URLs over the date range | Reflects citation frequency, "not page importance, ranking, or placement" |
| **Visibility trends over time** | Timeline of citation activity across supported AI experiences | Presented for trend-spotting rather than absolute accounting |

Three properties of this measurement model matter more than the individual numbers:

1. **The counted event is an attribution, not an exposure.** A citation is recorded
   when a URL is *displayed as a source*. Nothing is claimed about whether the
   sentence it grounded was load-bearing, whether the citation was visible without
   expanding a panel, or whether anyone read it.
2. **The reporting is aggregated across surfaces.** Copilot, Bing's AI summaries, and
   unnamed partner integrations are pooled. A publisher cannot decompose a movement
   into "Copilot changed" versus "the Bing summary layer changed," which limits
   causal diagnosis when a trend line moves.
3. **The retrieval query is exposed as a first-class object.** Grounding queries are
   the machine-issued retrieval phrases, not user searches. This is the genuinely new
   telemetry: it shows the *intent decomposition the model performed* on the way to an
   answer, which is a different artifact from a keyword report.

Microsoft also restates the crawl-preference position: "Bing respects all content
owner preferences expressed through robots.txt and other supported control
mechanisms." Citation eligibility is therefore downstream of the same access-control
surface publishers already operate, and opting out of retrieval is opting out of the
metric.

## How Site Owners Are Meant to Use It

The post proposes a narrow read-then-act loop. The stated uses of the insights are to:

- validate which pages are already being used as references in AI answers;
- identify content that appears frequently across AI answers;
- spot opportunities to improve "clarity, structure, or completeness" on pages that
  are **indexed but less frequently cited**.

That third item is the operative diagnostic: the report's real function is to split a
site's indexed corpus into cited and uncited halves, so that "crawled and indexed" is
no longer treated as the terminal success state.

The recommended content interventions are:

1. **Strengthen depth and expertise** — pages cited for specific grounding phrases
   tend to have clear subject focus; deepen adjacent coverage.
2. **Improve structure and clarity** — "clear headings, tables, and FAQ sections help
   surface key information and make content easier for AI systems to reference
   accurately."
3. **Support claims with evidence** — examples, data, and cited sources build trust
   when content is reused in a generated answer.
4. **Keep content fresh and accurate** — so systems reference the current version.
5. **Reduce ambiguity across formats** — align text, images, and video so they
   represent the same entities, products, and concepts consistently.

Two adjacent levers are pitched as part of the same workflow:

- **IndexNow** (`indexnow.org`) for change notification, on the argument that
  freshness gates *which version* of a page an AI system grounds on. Latency to
  re-crawl becomes latency to correct a wrong answer about you.
- **Bing Places for Business** for local entity facts (address, hours, contact), which
  are "eligible for inclusion in AI-generated responses" for location-based queries.

The post defers deeper tactics to Microsoft Advertising's October 2025 guidance,
[*Optimizing Your Content for Inclusion in AI Search Answers*](https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers).
That piece is the mechanistic companion and states the retrieval model plainly:
assistants **parse pages into smaller pieces** rather than reading them linearly, and
those pieces are "ranked and assembled into answers, often drawing from multiple
sources." Its concrete recommendations follow from that: H2/H3 headings as "chapter
titles that define clear content slices," Q&A pairs that an assistant "can often lift
word for word," comparison tables and numbered steps, JSON-LD schema markup, claims
anchored in measurable facts, and avoidance of walls of text, tabbed/accordion-hidden
answers, and critical facts trapped in PDFs or images. The unifying requirement is
that each excerpt remain **self-contained when snipped out of its page**.

## Third-Party Observations

The announcement omits several operational details that early practitioner analyses
supply. These are secondary sources and should be treated as reports, not vendor
commitments:

- Coverage is limited to Microsoft surfaces — Copilot (including Bing's AI overview
  rendering in Edge) plus unnamed partners. Google AI Overviews, ChatGPT, Perplexity,
  and Claude are out of scope, so this is one engine's view, not an AI-visibility
  total ([Momentic](https://momenticmarketing.com/blog/bing-wmt-ai-performance-report)).
- Historical lookback at launch reached back only to **November 1, 2025** — far
  shorter than the multi-month history publishers are used to in Search Console — and
  parts of the dataset are sampled and "may be refined retroactively as more data is
  processed," so small day-over-day movements are not yet interpretable (Momentic).
- **There are no clicks and no traffic in the report.** Citation counts cannot by
  themselves be converted into business value
  ([Search Engine Land](https://searchengineland.com/bing-webmaster-tools-ai-performance-report-468751),
  Momentic).
- Filtering and segmentation are thin compared with Search Console; comparative work
  currently means exporting to a spreadsheet (Momentic). Third-party guides also
  report a data-freshness lag on the order of a few days, which Microsoft does not
  document.
- The most repeated practitioner warning: **grounding queries are not what people
  type.** They are model-generated retrieval queries, so reading them as keyword
  demand data is a category error (Momentic).

## Analyst Takeaways

1. **This is the first-party half of AI-visibility measurement.** Platform logs beat
   black-box probing for coverage and stability, and lose to it on cross-engine
   breadth. Serious measurement will run both, and will not add the numbers together.
2. **Citation count is a proxy metric with a known ceiling.** It measures being
   *selected as evidence*, not being read, trusted, or acted on. Treated as a KPI it
   will be optimized in ways that decouple it from value; treated as a *diagnostic
   for retrievability* it is genuinely informative.
3. **The indexed-but-uncited set is the useful artifact.** It isolates a specific
   failure mode — the page is reachable and understood well enough to index, yet is
   never chosen as grounding — which points at chunk-level structure, claim clarity,
   or topical depth rather than at crawl plumbing.
4. **Grounding queries are a window into the retriever, not the user.** They reveal
   how the system reformulates and decomposes intent, which is closer to a RAG
   observability signal than to a keyword report, and should be evaluated as such.
5. **Freshness has been promoted from an SEO nicety to a correctness control.** If
   generated answers are grounded on whatever version was last fetched, stale content
   is not merely underranked — it is actively asserted on your behalf.
6. **Content guidance is converging on retrieval legibility.** Headings as slice
   boundaries, self-contained Q&A pairs, tables, explicit entities, and structured
   data are all instructions for a chunker and a re-ranker. This is the same
   discipline as writing documents an internal RAG system can use, aimed outward.
7. **Publisher-facing attribution telemetry is a governance signal too.** The post
   pairs the metric with a robots.txt-preferences statement, tying "we counted your
   citations" to "we honored your controls." Attribution reporting is becoming part of
   the negotiated relationship between AI systems and the open web.

## Limitations and Questions

- **No methodology is published.** There is no definition of deduplication (repeated
  citations within one answer? one session? one user?), no sampling rate, no
  confidence interval, and no list of the "select partner integrations" included.
  Two publishers cannot verify that they are being counted the same way.
- **Aggregation blocks attribution of change.** A drop could be a ranking change, a
  surface mix shift, a UI change in how sources are displayed, a partner joining or
  leaving, or a pipeline change in what counts as a citation. The report gives no way
  to distinguish these.
- **No denominator.** Without answers-where-your-topic-was-eligible, or any
  share-of-voice framing, total citations cannot separate "we got better" from "the
  category got busier."
- **Self-reported metric, self-interested guidance.** The engine both measures the
  outcome and prescribes the optimizations. The prescriptions (structure, evidence,
  freshness, entity consistency) are plausible and match general retrieval practice,
  but nothing in the post is a controlled result — no experiment shows that adding an
  FAQ section raises citation counts.
- **The value question stays open.** With no clicks, no impressions of the answer,
  and no downstream conversion linkage, a publisher who doubles citations cannot say
  what changed for their business. Whether that gap is closed is the main thing to
  watch as the preview matures.
- **Optimization pressure will arrive at the metric.** Any published visibility number
  becomes a target; expect grounding-query mining and answer-shaped content farms,
  and expect the definition of a countable citation to be revised in response.

## Vault Ideas Extracted

* [AI Search Visibility Measurement](/vault/ai-search-visibility-measurement.md)
* [Grounding Query Telemetry](/vault/grounding-query-telemetry.md)
* [Retrieval-Legible Content Structure](/vault/retrieval-legible-content-structure.md)
