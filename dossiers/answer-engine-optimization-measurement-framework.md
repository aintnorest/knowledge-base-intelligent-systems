---
type: Study Note
title: "Answer Engine Optimization: A Measurement Framework for Brand Visibility in Generative AI Search"
description: Personal study notes on a practitioner-authored SSRN working paper proposing a four-signal AEO measurement framework — presence, citations, sentiment, and agent traffic — plus citation half-life and a three-class taxonomy of AI bot traffic.
resource: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6609678
source: /archive/answer-engine-optimization-measurement-framework.pdf
tags: [retrieval, evaluation, enterprise, provenance]
timestamp: 2026-08-11T20:53:27Z
---

# Answer Engine Optimization: A Measurement Framework — Study Notes

**Author**: Evan Drake (Soulcraft Agency)

**Date**: April 2026 · SSRN working paper (`ssrn:6609678`), 11 pages

**Type**: Conceptual/position paper. Proposes definitions and metrics; contains no original experiment, dataset, or empirical validation. Its quantitative claims are all citations to vendor and analyst reports.

## What It Is

The paper argues that generative AI interfaces have become a primary discovery surface, that the measurement apparatus of SEO (rankings, click traffic, domain authority) does not transfer to it, and that a replacement is needed. It names that replacement **Answer Engine Optimization (AEO)**: improving a brand's presence, citation rate, sentiment, and representation inside LLM-generated responses.

Its contribution is nomenclature and structure rather than evidence. It proposes a four-signal measurement framework, two formulas (AI Share of Voice and an Influence Score), the concept of **citation half-life**, a three-class taxonomy of AI bot traffic, a technical-prerequisites section, and a list of open research problems.

## The Problem It Frames

Traditional search returns a ranked list of documents; the pathway from content to visibility is a direct ranking relationship you can observe. A generative interface synthesizes one natural-language answer and cites selectively, so the question shifts from "do we rank on page one?" to "does the model cite us, recommend us, and describe us accurately?"

The paper's framing move is to define AEO operationally as **optimizing for inclusion and favorable representation in a RAG retrieval pipeline**. The levers that determine RAG source selection — semantic relevance, structural parsability, authority signals — become the levers of AEO. That reframing is the most useful idea in the paper, because it converts a marketing problem into an information-retrieval problem with known mechanics.

Context figures it cites (all secondary, mostly vendor/analyst, Q1 2026): 883M ChatGPT monthly users; AI Overviews in ~55% of US Google searches; Gartner projecting a 25% decline in traditional search volume by end of 2026; Forrester reporting 89% of B2B buyers using generative AI in self-directed research; HubSpot reporting **93% of AI search sessions end without a website click**. That last figure carries most of the paper's strategic argument.

## The Four-Signal Framework

| Signal | Question it answers | Proposed metric |
|---|---|---|
| **Presence** | Does the brand appear at all? | AI Share of Voice: `AI-SOV(B) = \|P_B\| / \|P_total\|` — fraction of tracked prompts whose response mentions brand B |
| **Citations** | Is the brand explicitly attributed as a source? | Influence Score: `(C(S) / P_total) × Q(S)` — citation count normalized by prompt-set size, multiplied by the number of unique prompts citing S |
| **Sentiment** | *How* is the brand described? | Three-state (positive/neutral/negative) classification aggregated across prompts, optionally sliced by topic and persona |
| **Agent traffic** | How often do AI systems consult the brand's own pages? | Volume of AI bot hits on owned properties, split by bot class |

Two design notes worth keeping:

- **Presence needs a designed prompt set.** The recommendation is topic clusters of 12–15 semantically distinct, realistic questions each, refreshed periodically. The stated trade-off is coverage against measurement noise: too few prompts miss visibility gaps, too many dilute signal with low-volume queries. AI-SOV can be normalized against a competitor set instead of the full prompt universe.
- **Influence Score is deliberately breadth-weighted.** Multiplying frequency by unique-prompt count penalizes a source that is cited many times for one narrow query and rewards one cited across the prompt space. Note that this makes the score quadratic-ish in citation breadth and not bounded to a comparable range across differently sized prompt sets — it is a ranking heuristic, not a normalized rate.

Sentiment is the signal the paper treats as most immature and most consequential: a brand can have high AI-SOV and still have an "identity representation problem" that more content production will not fix.

## Agent Traffic: Three Bot Classes

The paper's cleanest operational contribution is separating AI crawler traffic into three classes with different meanings:

- **Retrieval bots** — fire in real time against a live user query. Correlate directly with live user intent; the highest-value class.
- **Indexer bots** — crawl periodically to build indices for future retrieval. Indicate perceived relevance, not live demand.
- **Training bots** — collect content for model training. Affect future model behavior, no short-term citation effect.

The diagnostic that falls out of this is the useful part: a page with **high retrieval traffic but low citation rate has a content-to-citation conversion problem** — the model is reading the page and declining to cite it, typically because structure or formatting prevents clean extraction. Those pages are the highest-priority optimization targets because the demand is already proven.

## Citation Half-Life

The paper introduces `t½` as the expected time for a page's citation rate to decay to half its initial value with content held constant. It claims decay varies by platform (different index/model refresh cadences), by industry (fast-moving domains decay faster than legal/academic/regulated ones), and by source type (first-party brand pages decay faster than established third-party publications, which retain authority via persistent inbound link signals).

The strategic consequence: unlike a well-ranked SEO page that holds position for months, AI citations are structurally ephemeral. Decay is a property of the system, not an execution failure — so AEO must be a continuous operational discipline (weekly monitoring minimum, alerting on citation-rate drops and sentiment shifts) rather than a one-time audit. The prescribed response to decay is to **update and resubmit the existing high-authority page rather than publish a new one**, because new pages face a compound cold-start problem: no citation history, no inbound authority, no indexing head start.

Important caveat the author states plainly: half-life is grounded in practitioner observation, not controlled study. No decay curve, dataset, or estimate of `t½` appears anywhere in the paper.

## Technical Foundations

1. **Bot accessibility first.** Overly restrictive `robots.txt` and JavaScript-rendered content are the two common blockers. Audit robots.txt for AI bot identifiers before anything else; brands blocking crawlers for CDN cost or competitive reasons should price that against lost AI visibility.
2. **Structure for extraction.** Cited content tends to place direct answers early, define entities explicitly, carry Schema.org markup, and avoid JS-dependent rendering. The stated mechanism is architectural: retrieval systems favor what they can parse cleanly, and a JS-heavy page "presents as near-empty" to a bot that cannot execute scripts. Human-optimized and machine-optimized are not the same target and diverge on modern web stacks.
3. **Agent Experience Platforms (AXPs).** A vendor category that intercepts AI bot traffic at the CDN layer and serves clean, script-free HTML — with injected entity definitions and Schema.org augmentation — to crawlers while leaving the human experience untouched. This is a dual-path delivery pattern that avoids re-engineering the primary codebase. The paper asserts AXP deployment "should correlate" with retrieval-bot engagement and, with lag, citation rate; no data is offered.

## Strategic Implications

- **The ROI model breaks.** With 93% of AI sessions ending without a click, standard analytics understates AI-driven demand *by design* — buyers research in the AI interface, then arrive via non-referral pathways. The proposed replacement dashboard is AI-SOV, Citation Influence Score, Sentiment Ratio (positive citations ÷ total mentions), and retrieval bot traffic, with sessions/leads/revenue reframed as lagging indicators.
- **Paid AI placement is now a parallel channel.** OpenAI launched sponsored placements in ChatGPT in February 2026 (Free/Go tiers, labeled, ~5% of mobile users at time of writing). The argument for still doing organic AEO is that an organic citation carries implicit third-party endorsement a sponsored slot does not.
- **Citation source mix is industry-specific.** Community platforms (Reddit, forums) reportedly dominate consumer lifestyle categories; academic publications and trade press dominate enterprise technology. Being mentioned *inside* a frequently cited third-party source is a high-leverage indirect path that does not require your own pages to win direct citation.
- **The AI competitive set is not the SEO competitive set.** Models surface adjacent-category alternatives and smaller players that invested in structured content. AEO competitive analysis should start from AI-native discovery rather than importing an existing SEO competitor list.

## Open Problems the Author Names

Prompt set standardization (no shared benchmark prompt taxonomies per vertical, so cross-brand comparison is uninterpretable); citation attribution methodology (platforms format citations differently, and some responses show implicit source influence with no link); sentiment classification accuracy (mentions can be factually accurate yet strategically damaging — LLM-as-judge is floated as a better instrument than a sentiment classifier); longitudinal citation studies to actually validate half-life; and **agent-to-agent commerce**, where an AI shopping agent weighs brand information differently than a human buyer — explicitly acknowledged as outside the current framework.

## What I Take From It

1. **The signal split is the reusable asset.** Presence / citation / sentiment / crawler-demand are four genuinely different measurements with different failure modes, and conflating them is the most common practitioner error. You can adopt the decomposition without adopting either formula.
2. **Crawler-side telemetry is the underused half.** Everyone measures response-side visibility by re-prompting models; the demand-side signal (which of my pages are retrieval bots actually fetching?) is first-party, cheap, unsampled, and gives the retrieval-vs-citation gap diagnostic for free.
3. **Treat visibility as decaying, not accrued.** Even without a validated half-life number, designing the measurement cadence around decay rather than around campaign milestones is the right default for anything downstream of a periodically re-indexed retrieval system.
4. **Parsability is an infrastructure problem, not a copywriting one.** The JS-blank-page failure means a large fraction of "our content isn't being cited" is really "our content was never legible to the retriever." Fix access and extraction before touching content strategy.
5. **The measurement instrument is nondeterministic.** Nothing in the paper addresses this, but every metric here is computed by sampling a stochastic system that also personalizes and A/B-tests. Any serious implementation needs repeated trials and recorded controls (model version, tier, mode, locale, date) before a delta means anything.

## Questions and Limitations

- **No empirical content whatsoever.** No dataset, no measurements, no half-life estimates, no AXP correlation, no validation of either formula. The two equations are definitional. This is a framework proposal, and should be cited as vocabulary, not as evidence.
- **Commercial provenance.** Authored by an agency; several load-bearing statistics come from vendors selling AEO tooling (HubSpot, Scrunch, Conductor), and §5.3's AXP endorsement describes a product category the author's market sells into. The 93%-no-click figure in particular is doing enormous argumentative work on a single secondary citation.
- **Influence Score is under-specified.** Units, normalization, and comparability across prompt sets of different sizes are undefined; `C(S)/P_total × Q(S)` grows with both citation volume and prompt-set coverage in ways that make cross-brand comparison unsafe without further normalization.
- **AI-SOV inherits all the bias of its prompt set.** With no standard prompt taxonomy (which the paper itself lists as open problem #1), AI-SOV is trivially gameable by choosing favorable prompts, and vendor-reported AI-SOV numbers should be treated as unaudited.
- **Sampling and stability are ignored.** How many repetitions per prompt, at what temperature, under which account tier, and how to distinguish real movement from run-to-run variance are unaddressed — yet these decide whether any tracked metric is meaningful.
- **Citation half-life mixes causes.** Model updates, retrieval-algorithm changes, competing content entry, and content staleness are lumped into one decay constant; the paper acknowledges disentangling them as future work, which means `t½` is currently a metaphor rather than a measurable parameter.
- **Ethical edge unexamined.** Optimizing for how a model *describes* you is close to optimizing the model's factual representation of a commercial entity; the line between structural legibility and manipulating an answer engine is never drawn.

## Vault Ideas Extracted

* [AI Search Visibility Measurement](/vault/ai-search-visibility-measurement.md)
* [Citation Half-Life](/vault/citation-half-life.md)
* [AI Crawler Traffic Classes](/vault/ai-crawler-traffic-classes.md)
* [AI Crawler Content Parsability](/vault/ai-crawler-content-parsability.md)
