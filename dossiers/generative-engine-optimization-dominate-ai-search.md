---
type: Study Note
title: "Generative Engine Optimization: How to Dominate AI Search"
description: Study notes on a large-scale August 2025 audit of ChatGPT, Claude, Gemini, and Perplexity citations against Google web results, finding a systematic earned-media bias, engine-specific source ecosystems, and a big-brand default under unbranded prompts.
resource: https://arxiv.org/abs/2509.08919v1
source: /archive/generative-engine-optimization-dominate-ai-search.pdf
tags: [retrieval, evaluation, provenance, enterprise]
timestamp: 2026-08-11T20:58:00Z
---

# Generative Engine Optimization: How to Dominate AI Search — Study Notes

**Authors**: Mahe Chen, Xiaoxuan Wang (equal contribution), Kaiwen Chen, Nick Koudas — University of Toronto
**Preprint**: arXiv:2509.08919v1 [cs.IR], 10 September 2025 (~27 pages, ACM conference template)
**Data collection window**: August 2025
**Acknowledgment**: the authors thank ktau.ai, a commercial Generative Engine Optimization vendor

## What It Is

An external, black-box audit of how generative search assistants source the evidence behind their answers, paired with a prescriptive strategy agenda the authors call **Generative Engine Optimization (GEO)**. The paper does three things:

1. Builds a taxonomy of what people actually ask AI assistants, mined from Reddit rather than from query logs.
2. Runs controlled query batteries against ChatGPT, Claude, Gemini, and Perplexity (all web-enabled, via API) and against Google's Programmable Search API, then classifies every cited domain as **Brand** (official manufacturer/retailer), **Earned** (independent review sites, publishers, government portals), or **Social** (Reddit, YouTube, Quora, forums).
3. Translates the measured differences into practitioner guidance and, in the final sections, into a pitch for GEO as a continuous managed service.

The empirical core is the Brand/Earned/Social distribution plus set-overlap statistics across regions, verticals, languages, paraphrases, personas, and engines.

## The Problem It Addresses

Visibility used to mean ranking in a list of ten blue links. In a synthesized, citation-backed answer only a handful of options survive, and the answer is constructed from whichever sources the engine chose to consult. The authors' framing question is whether a site heavily optimized under traditional SEO is still visible for the same intent inside an AI assistant — and, if not, which levers actually move AI visibility.

They cite context for the urgency (Pew: ~34% of U.S. adults have used ChatGPT; link clicks falling from 15% to 8% when a Google AI summary is present, with ~26% of such sessions ending click-free; StatCounter's chatbot panel putting ChatGPT near 81% share in July 2025) while explicitly labeling their landscape description as speculative given no access to authoritative cross-platform trend data.

## Method

**Engines and settings** (this matters, because behavior is version- and interface-specific):

| System | Configuration |
|---|---|
| Perplexity | `sonar-pro`, `search_mode: web`, medium search context |
| Claude | `claude-3.5-sonnet-latest` with the `web_search_20250305` tool |
| Gemini | `gemini-2.5-flash` with Google Search grounding |
| GPT | `gpt-4o-search-preview` |
| Google | Programmable Search (Custom Search) API, top-10 organic web results |

**Pipeline.** Prompts are standardized to ranking style ("Top 10 … brands", "Rank the best smartphones 1 to 10") so outputs are comparable and scorable. Variants (translations, paraphrases, region constraints) are generated with GPT-4o without browsing. Answers and all citation links are collected; URLs are reduced to registrable domains locally; brand/product lists are extracted from answer text by GPT-4o; each domain is labeled Brand/Earned/Social by `gpt-4o-search-preview` combined with a fixed rule list of known social platforms.

**Metrics.** Symmetric Coverage@k for fixed-length comparisons; Jaccard index on cited-domain (and, in §5, extracted-brand) sets for variable-length ones, averaged per vertical; share distributions for source-type mix; and for freshness, date coverage, mean/median article age, a recency score computed as the mean of `1/(1 + age_days)`, and that score scaled by coverage.

## What They Found

### 1. Users ask assistants to decide, not just to retrieve

The Reddit-derived taxonomy (five AI subreddits, top 1,000 "hot" + 1,000 "new" posts and full comment threads, August 2025) yields twelve recurrent query types — coding help, prompt improvement, creative writing, shopping, content creation, self-improvement, business strategy, coaching, career, self-study, image generation. A deeper pass over eight subreddits produces fourteen shopping themes. The authors' reading: decision support dominates (what to buy, when, how to compare, with justifications), requests increasingly delegate *actions* rather than lookups, some users already trust assistants with high-value decisions such as car purchases, and coverage spans the whole funnel through post-purchase and resale.

### 2. AI search is overwhelmingly earned-media weighted; Google is not

The clearest and most repeated finding. Against Google's more balanced mix, the web-enabled GPT engine concentrates on third-party editorial sources and nearly eliminates community content:

| Vertical / region | Google (B / E / S) | AI search (B / E / S) |
|---|---|---|
| Consumer electronics, Canada | 22.8 / 54.1 / 23.1 | 22.1 / 77.6 / 0.3 |
| Consumer electronics, USA | 32.9 / n/r / 15.4 | n/r / 92.1 / ~0 |
| Automotive, Canada | 36.6 / 40.6 / 22.8 | 30.9 / 69.1 / 0 |
| Automotive, USA | 39.5 / 45.1 / 15.4 | 18.1 / 81.9 / 0 |
| Software, Canada | 53.8 / 31.8 / 14.4 | 25.8 / 74.2 / 0 |
| Software, USA | 43.7 / 45.4 / 10.9 | 26.7 / 72.7 / ~0 |

(Percentages as stated in the text; `n/r` marks a share the prose leaves to the figures. "AI search" in this section is the web-enabled GPT engine only.)

The pattern generalizes across the §5 experiments: AI engines follow **earned ≫ brand ≫ social**, Google generally **brand ≫ earned ≫ social**. In the brand-query experiment, ChatGPT reaches 93.5% earned for well-known brands and 95.1% for niche brands (0% social in both), Claude 87.3%/86.3%, Perplexity 67.4%/73.4% (with a distinctive 23.8%/17.5% social share, mostly YouTube), Gemini 63.4%/66.4% with the highest brand share. In the banking-persona study the pooled mix is 64.6% earned, 34.1% brand, 1.2% social, anchored by Bankrate and NerdWallet.

Where Google and AI overlap at all is low: 15–32% Coverage@5 for smartphones and laptops, 33% at top-5 and above 50% at top-10 for electric cars, and far worse locally — Home Cleaning 20.6%, Roofing 17.1%, Tax Preparation 15.4%, Dentists 11.9%, Auto Repair 2.5%, IT Support 0.1%.

### 3. Engine identity explains more variation than query phrasing, language, or persona

Pairwise Jaccard overlap between engines' domain sets is small, and each engine contributes a large body of exclusive sources:

| Vertical | Distinct domains (Claude / GPT / Perplexity) | Jaccard C–G / C–P / G–P | Unique share |
|---|---|---|---|
| Automotive | 350 / 212 / 347 | 0.147 / 0.251 / 0.096 | 50.3% / 60.8% / 56.5% |
| Consumer electronics | 242 / 179 / 268 | 0.150 / 0.200 / 0.088 | 55.8% / 67.6% / 67.2% |

Only a thin core of high-authority publishers (Car and Driver, Edmunds, Consumer Reports; TechRadar, Tom's Guide, RTINGS) appears everywhere. Local services fragment further: for Auto Repair, Gemini and Perplexity surface 98 and 117 distinct domains against Claude's 51 and GPT's 53, with 35–63% exclusivity and only aggregators such as homestars.com and opencare.com shared by all four. The banking study states the generalization directly: *who the engine is matters more than which persona is queried*.

### 4. Language shifts the evidence base far more than paraphrasing does

Across five target languages (ZH, JA, DE, FR, ES) versus English, cross-language domain reuse is engine-dependent. Google's baseline is already low (mostly 0–0.1, peak ≈0.11). Claude is markedly more stable, reusing the same authority domains across languages; Gemini is modestly above Google (EN–DE peak ≈0.32); Perplexity is comparable; **GPT is near zero**, effectively swapping into a different site ecosystem per language. Cited-site language follows the same split: GPT and Perplexity localize heavily, Claude stays English-dominant, Gemini is mixed.

Paraphrasing (seven templates: justification required, sources required, quotes required, confidence scores, explicit ranking, imperative list, keywords only) perturbs far less. AI engines hold base-variant domain overlap around 0.3–0.7; Google is near 0.1 for most rewordings but jumps to 0.5–0.73 for pure format changes. Crucially, **brand overlap is consistently higher than domain overlap**: rewording rotates which articles get cited without overturning the recommended shortlist, whereas translation changes both.

### 5. Unbranded prompts default to market leaders

Fifty unbranded cola/soda prompts produce 56.3% major-brand mentions for ChatGPT (274/487) versus 12.3% niche, and 67.9% major for Perplexity (339/499) versus 5.8% niche — pooled, 62.2% major, 9.0% niche, 28.8% other. Coca-Cola and Pepsi head both distributions. The evidence profiles differ sharply (ChatGPT leans on Wikipedia at ~19.7% of citations; Perplexity has a ~60.6% long tail with YouTube as its single largest domain at ~8.9%) yet both converge on the same incumbents, which the authors read as source prominence and model priors pulling in the same direction. Cross-engine answer agreement is 76–81% for well-known brands and 71–76% for niche ones.

### 6. Freshness is a real weak spot, and it is vertical-dependent

In consumer electronics, Claude's dated links have 92.5% coverage, mean age ~117 days (median 62), recency score 0.0617 (0.0571 coverage-adjusted). In automotive, coverage drops to ~61% with mean age ~331 days (median 148) and score 0.0441 (0.0269 adjusted); GPT behaves similarly. Perplexity returns somewhat newer but more commercially linked and less consistently dated material.

## The GEO Agenda They Derive

1. **Dominate earned media.** Shift budget from owned content and social engagement to PR, expert collaborations, and backlinks from the specific publications each engine already cites.
2. **Engineer for scannability and justification.** Comparison tables, pros/cons lists, explicit value-proposition statements ("longest battery life"), because the engine must extract a *reason* to place you on a short list, not just a keyword match.
3. **Treat the site as an API.** Rigorous Schema.org markup for prices, specs, availability, warranty, and reviews, so assistants acting on the user's behalf can transact against your data.
4. **Localize authority, not just content.** Translation is insufficient for GPT- and Perplexity-like engines that source almost entirely from target-language ecosystems; Claude-like engines reward top-tier English earned media that transfers across languages.
5. **Cover the whole lifecycle.** A gap in post-purchase or troubleshooting content hands the recommendation to a competitor at that touchpoint.
6. **Niche brands must over-invest in verifiable authority**, using specialty publications plus the channels Perplexity favors (YouTube, community content) to build signal the more conservative engines will eventually pick up.

Section 6 escalates this into a five-pillar "GEO operating system": engine-specific competitive intelligence that maps the citation network per vertical, a justification-asset content framework, a managed earned-media pipeline, continuous rank monitoring with a defense playbook, and an integrated metrics dashboard.

## What I Take From It

1. **Citation-share auditing is a legitimate measurement primitive.** Pooling de-duplicated cited domains per engine × condition and reporting a typed distribution (brand/earned/social) plus set overlaps is cheap, black-box, and repeatable. It generalizes well beyond marketing: the same instrument answers "which evidence ecology does this assistant actually inhabit?" for any retrieval-backed system.
2. **Engine choice is a corpus choice.** With pairwise Jaccard around 0.09–0.25 and half to two-thirds of domains exclusive per engine, evaluating "AI search" as one thing is a category error, and any retrieval evaluation that reports a single system's behavior should not be read as a property of AI assistants generally.
3. **Separate the answer layer from the evidence layer when measuring stability.** Brands stay put while supporting citations rotate. A system can look stable at the recommendation level and be highly volatile in provenance — which matters if you are auditing attribution or grounding rather than the final answer.
4. **Prompt genre is a confound worth controlling.** Everything here rides on ranking-style prompts, which are exactly the queries that pull listicles and review round-ups into the context window. The paper itself notes that ranking-style prompts elicit editorial evidence regardless of language; that is a strong hint the headline earned-media bias is partly an artifact of the query genre, not solely an engine preference.
5. **"Structure your data for machine consumption" is now a distribution strategy, not only an engineering nicety.** The pitch that a site should behave like an API for assistants is the outward-facing sibling of agent-ergonomic interface design.

## Questions and Limitations

- **The Google-vs-AI comparison in §4 is one engine.** "AI search" there is `gpt-4o-search-preview`; only §5 involves the four-engine panel. Sweeping statements about "AI search" from §4 outrun the design, even though §5 broadly corroborates the direction.
- **The two sides are not the same object.** Google's top-10 organic API results exclude AI Overviews, local packs, shopping units, and knowledge panels; an assistant's citation list is a synthesis substrate, not a ranked recommendation. Low overlap between them is partly definitional.
- **The classifier is the studied system.** Brand/Earned/Social labels and brand extraction are produced by GPT-4o with no reported inter-rater agreement, human validation, or error rate — while GPT is also one of the audited engines. The authors concede the taxonomy is a constructed, partly subjective model and that absolute percentages should be read as illustrative of relative trends.
- **No statistical treatment.** No confidence intervals, significance tests, or variance across repeated runs, despite non-determinism in every engine studied. Several results are described only qualitatively from heatmap figures.
- **Freshness metric is hard to interpret.** `mean(1/(1 + age))` is dominated by a few very recent items, and date-extraction coverage varies by vertical and engine, so the coverage-adjusted score confounds sourcing behavior with the crawler's ability to find a date.
- **Product versus API.** Results describe search-tool-enabled API endpoints (`claude-3.5-sonnet-latest` + web search tool, `sonar-pro`, `gemini-2.5-flash` grounding) whose retrieval stacks are not the consumer products of the same names. Attributing "Claude does X" to what a user sees in the app is unsupported.
- **The taxonomy measures Reddit discourse, not queries.** Sampling prompt-engineering and ChatGPT subreddits captures what enthusiasts post about asking AI, which is not a query log and is heavily skewed toward power users and toward shopping by the authors' own retention rule.
- **Commercial framing.** The acknowledgment credits a GEO vendor as "the leader in Generative Engine Optimization," and §6's five-pillar managed-service argument is advocacy rather than evidence. The measurements can be used independently of that framing; the "arms race" conclusion should not be mistaken for a result.
- **Snapshot decay.** August 2025 data, explicitly flagged by the authors as a moment-in-time observation of systems that change their sourcing and citation behavior continuously. Nothing here should be treated as durable without re-running the battery.
- **No causal test of the advice.** The paper measures what engines cite; it never manipulates a site's schema, comparison tables, or earned coverage and re-measures visibility. The GEO agenda is inference from correlational audit data — contrast with Aggarwal et al. (arXiv:2311.09735), whose GEO methods were tested interventionally and reported up to 40% visibility gains.

## Vault Ideas Extracted

* [Generative Engine Optimization](/vault/generative-engine-optimization.md)
* [Earned-Media Citation Bias](/vault/earned-media-citation-bias.md)
* [Engine-Specific Citation Ecosystems](/vault/engine-specific-citation-ecosystems.md)
* [Big-Brand Bias](/vault/big-brand-bias.md)
