---
type: Study Note
title: "GEO: Generative Engine Optimization"
description: The KDD '24 paper that formalizes generative engines, defines creator-side visibility metrics for cited sources, introduces GEO-bench, and measures nine black-box content-rewriting strategies.
resource: https://doi.org/10.1145/3637528.3671900
source: /archive/geo-generative-engine-optimization.pdf
tags: [generative-search, retrieval, evaluation, benchmark, llm-as-judge]
timestamp: 2026-08-11T20:52:52Z
---

# GEO: Generative Engine Optimization - Study Notes

**Authors**: Pranjal Aggarwal, Vishvak Murahari (equal contribution), Tanmay Rajpurohit, Ashwin Kalyan, Karthik Narasimhan, Ameet Deshpande
**Venue**: KDD '24 (30th ACM SIGKDD Conference on Knowledge Discovery and Data Mining), Barcelona, August 25–29, 2024
**DOI**: 10.1145/3637528.3671900
**Preprint**: arXiv:2311.09735 (v1 November 2023; v3 dated 28 June 2024, archived here as the camera-ready-equivalent duplicate)
**Code and data**: https://github.com/GEO-optim/GEO, https://generative-engines.com/GEO/
**Pages**: 12

## What It Is

This is the paper that named **Generative Engine Optimization (GEO)** and gave the field its first formal vocabulary. It does three things:

1. **Formalizes "generative engines"** — search products that retrieve documents and then use LLMs to synthesize a single cited response (BingChat, Google SGE, Perplexity.ai) — as a composable function `f_GE := (q_u, P_U) → r` over a set of generative models plus a search engine.
2. **Defines creator-side visibility metrics** for a *citation inside a generated answer*, since "average rank on a results page" no longer describes what a source gets.
3. **Measures nine black-box content-rewriting strategies** on a new 10K-query benchmark (**GEO-bench**) and on the live Perplexity.ai product, reporting visibility gains up to ~40%.

The framing is explicitly creator-centric and political: generative engines serve users and engine operators well but strip the third stakeholder — website and content creators — of both traffic and any lever over how their content is portrayed. GEO is proposed as that lever.

## The Problem It Sets Up

Traditional search returns a ranked list; a creator's visibility is essentially their rank, and 25 years of SEO exists to move it. A generative engine instead *dissolves* sources into one synthesized answer with inline citations, so a source can appear early or late, be quoted at length or in a clause, be the load-bearing evidence or decorative corroboration. Rank is no longer the right unit of account, and the ranking function is a proprietary black box that content creators cannot query, let alone differentiate.

The paper's wager is that even against a black box, *content-side* interventions are measurable and transferable, because the engine conditions on the text of the source rather than on link graphs or metadata.

## Formulation

A generative engine consists of a set of generative models `G = {G_1 … G_n}` (query reformulation `G_qr`, per-source summarization `G_sum`, response generation `G_resp`) and a search engine `SE`. The workflow: decompose the user query into simpler sub-queries, retrieve ranked sources, summarize each, then generate a cumulative response `r` with inline citations. The paper treats the single-turn case; Appendix A extends the formulation to conversational engines where the input is a history `H = (q_u^t, r^t)` and a separate model proposes follow-up queries.

Visibility of citation `c_i` in response `r` is written `Imp(c_i, r)`, which the creator maximizes. The engine, meanwhile, maximizes `Σ_i f(Imp(c_i, r), Rel(c_i, q, r))` — an objective the creator cannot see. Both `Imp` and `Rel` were undefined for generative engines before this paper, so it defines them.

## The Visibility Metrics

Metrics are designed to be creator-relevant, explainable, and comprehensible to non-experts.

| Metric | Definition | Intuition |
|---|---|---|
| **Word Count** | `Σ_{s ∈ S_ci} \|s\| / Σ_{s ∈ S_r} \|s\|` — normalized word count of sentences citing `c_i`, shared equally when a sentence cites several sources | More words attributed to a source means the user is more exposed to it |
| **Position-Adjusted Word Count** | Same, weighted by `e^{-pos(s)/\|S\|}` | Earlier sentences are more likely to be read; the exponential form is motivated by power-law click-through-rate curves in search |
| **Subjective Impression** | G-Eval-style LLM scoring over seven facets: relevance, influence, uniqueness, diversity, follow-up, subjective position, subjective count | Captures the non-mechanical share of user attention a citation earns |

Two calibration details matter. G-Eval scores are poorly calibrated, so the authors **normalize the subjective scores to the same mean and variance as Position-Adjusted Word Count** so the two metric families are comparable and baselines land on similar numbers. All impressions are also scaled so that citations within a response sum to 1 — visibility is explicitly **zero-sum within a response**, which is what makes the multi-source experiments in §5.2 meaningful.

Results are reported as relative improvement `(Imp_si(r') − Imp_si(r)) / Imp_si(r) × 100`, where `r'` is the response after applying a GEO method to one randomly chosen (but fixed per query) source.

## GEO-bench

10K queries — 8K train / 1K validation / 1K test — assembled from nine sources: MS MARCO, ORCAS-1, Natural Questions (real Bing/Google queries), AllSouls (Oxford essay questions), LIMA, Davinci-Debate, Perplexity.ai Discover trending queries, ELI5, and GPT-4-generated queries spanning domains, intents, difficulties, and scopes. Each query carries the cleaned text of the **top 5 Google results**. The mix preserves a realistic 80% informational / 10% transactional / 10% navigational split, spans 25 domains, and is tagged by GPT-4 along seven axes (difficulty, nature, genre, topic, sensitivity, user intent, answer type) — with the authors themselves warning the automated tags are noisy.

## The Nine GEO Methods

Each method is a function `f: W → W'` on web content, implemented by prompting GPT-3.5-turbo to rewrite the source:

Presentation-only (no new information): **Authoritative**, **Easy-to-Understand**, **Fluency Optimization**, **Unique Words**, **Technical Terms**.
Content-adding: **Cite Sources**, **Quotation Addition**, **Statistics Addition**.
SEO carryover: **Keyword Stuffing**.

The evaluated engine is a two-step setup mirroring Liu et al.'s verifiability work: fetch the top 5 Google sources, then have GPT-3.5-turbo generate a fully cited answer from them (5 samples at temperature 0.7, 5 random seeds).

## Results

Absolute impression scores on the GEO-bench test split (baseline ≈ 19.3–19.8 on both metric families after normalization):

| Method | Position-Adj. Word Count | Subjective Impression |
|---|---|---|
| No Optimization | 19.3 | 19.3 |
| Keyword Stuffing | 17.7 | 20.2 |
| Unique Words | 20.5 | 20.4 |
| Easy-to-Understand | 22.0 | 20.5 |
| Authoritative | 21.3 | 22.9 |
| Technical Terms | 22.7 | 21.4 |
| Fluency Optimization | 24.7 | 21.9 |
| Cite Sources | 24.6 | 21.9 |
| Statistics Addition | 25.2 | 23.7 |
| **Quotation Addition** | **27.2** | **24.7** |

Headline: the best methods improve on baseline by **41%** (Position-Adjusted Word Count) and **28%** (Subjective Impression). Four findings carry the paper:

- **Evidence beats persuasion.** Cite Sources, Quotation Addition, and Statistics Addition — all of which add verifiable third-party material — give 30–40% relative gains on the objective metric. Adding a source attribution to an existing claim boosted one example's visibility by 132.4%.
- **Keyword stuffing fails, and can backfire.** It scores *below* baseline on the objective metric (17.7 vs. 19.3) and 10% below baseline on Perplexity. The single most familiar SEO reflex does not transfer.
- **Presentation is itself a lever.** Fluency Optimization and Easy-to-Understand — pure stylistic rewrites adding no information — yield 15–30% gains. Generative engines reward *how* content is written, not only what it says.
- **Authoritative tone does little on the objective metric.** The instruction-following intuition ("write persuasively and the model will favor you") mostly fails; the paper reads this as engines being somewhat robust to tone manipulation, though Authoritative does move the subjective metric (22.9).

### Domain dependence

Effectiveness is domain-conditional, which is the paper's argument for targeted rather than blanket optimization: Authoritative wins on Debate/History/Science; Cite Sources on Statement/Facts/Law & Government; Statistics Addition on Law & Government/Debate/Opinion; Quotation Addition on People & Society/Explanation/History; Fluency Optimization on Business/Science/Health.

### When everyone optimizes

§5.2 optimizes *all* sources simultaneously and breaks results out by original SERP rank — the most interesting experiment in the paper. Because visibility is zero-sum within a response, the effect inverts by rank:

| Method | Rank-1 | Rank-3 | Rank-5 |
|---|---|---|---|
| Cite Sources | −30.3% | +20.4% | +115.1% |
| Quotation Addition | −22.9% | +3.5% | +99.7% |
| Statistics Addition | −20.6% | +8.1% | +97.9% |

Low-ranked sources gain enormously; the top-ranked source *loses*. The authors read this as democratizing: generative engines condition on content, not on backlinks and domain authority, so small creators who cannot win the link game can win the content game. The equally available reading — that GEO is a redistribution mechanism whose gains evaporate once adoption is universal — is not pursued.

### Combinations and the deployed engine

Pairing the top four methods helps: Fluency Optimization + Statistics Addition beats any single strategy by more than 5.5%, and Fluency Optimization is the best *partner* (31.4% average in combination) despite being 8% weaker than Quotation Addition alone. (Cost constraints limited this to 200 examples.)

On **Perplexity.ai** with source text supplied as file uploads (200 test samples): Quotation Addition +22% on Position-Adjusted Word Count, Statistics Addition +37% on Subjective Impression, and Keyword Stuffing 10% *worse* than baseline. The qualitative ordering survives the jump to a commercial engine, though the per-method numbers shift substantially — notably Cite Sources collapses on Perplexity's subjective metric (19.0 vs. 24.7 baseline) while gaining on the objective one.

## Analyst Takeaways

1. **The unit of visibility changed, so the metric had to.** The durable contribution is less the nine rewrite recipes than the recognition that a citation's worth inside a synthesized answer is a function of length, position, and perceived influence — and that creators need a metric they can compute and optimize without engine cooperation.
2. **Optimize for what a summarizer can lift.** The winning methods all supply *quotable, attributable, self-contained units* — a statistic, a quotation, a sourced claim. This is the same property that makes a passage easy to ground a citation on. It generalizes well beyond the specific 2023–24 engines tested.
3. **SEO intuitions do not transfer; some invert.** Keyword stuffing is negative-value here. Any GEO practice inherited wholesale from SEO should be treated as an untested hypothesis.
4. **Visibility is zero-sum within a response, so GEO is inherently competitive.** Reported gains are measured against unoptimized competitors. The all-sources-optimized experiment is the honest one, and it shows the gains redistribute rather than accumulate.
5. **Style is a ranking signal now.** Fluency and readability rewrites that add no information move visibility 15–30%. Presentation quality is not cosmetic when the consumer of your page is a summarizer.
6. **Black-box optimization against a black-box objective is measurable.** The methodological pattern — define your own proxy for the hidden objective, perturb inputs, measure with fixed seeds and a normalized judge — transfers to any setting where a proprietary system mediates access to an audience.

## Limitations and Open Questions

Stated by the authors:

- Methods may need to adapt as generative engines evolve, mirroring SEO's arms race; query distributions also drift, so GEO-bench needs refreshing.
- Because search ranking is itself black-box, the paper **did not evaluate how GEO edits affect classical search rankings** — it only argues that text-only changes leave domain, backlinks, and metadata untouched and so probably do not hurt.
- As context lengths grow and engines ingest more sources, the leverage of search rank should decline.
- GPT-4 tagging of GEO-bench queries is noisy.

Left open, and worth holding onto:

- **The evaluated engine is a simplification.** No query reformulation, no per-source summarization, top-5 sources only, GPT-3.5-turbo as generator and as judge. The paper formalizes a richer pipeline than the one it tests.
- **Self-judging.** GPT-3.5 generates the responses and GPT-3.5 scores the subjective impression metric. The normalization step addresses calibration but not the shared-model correlation.
- **The adversarial boundary is asserted, not enforced.** The paper distinguishes itself from Kumar and Lakkaraju's adversarial "strategic text sequences" by calling its own methods non-adversarial — but "add statistics" and "add quotations" are only non-adversarial if the added statistics and quotations are true. Nothing in the framework checks that. The Swiss-chocolate example cites "The International Chocolate Consumption Research Group," a body whose existence the paper never verifies. GEO as specified rewards *the appearance of evidence*, and the information-integrity consequence of an entire creator economy optimizing for that is the paper's largest unexamined externality.
- **No creator-cost or durability analysis.** Nothing on how long an optimization holds as engines update.

## Current Validity

The vocabulary (generative engine, GEO, impression metrics for citations) has been widely adopted, and the qualitative findings — evidence-shaped content wins, keyword stuffing does not transfer, presentation matters, low-ranked sources gain most — are the ones later work builds on and tests. The absolute numbers are tied to GPT-3.5-turbo, a 2023-era Google top-5 corpus, and Perplexity.ai as it existed in 2024; treat them as directional. Whether the specific method ranking still holds on current engines **requires contemporary verification**.

## Vault Ideas Extracted

* [Generative Engine Optimization](/vault/generative-engine-optimization.md)
* [Generative Engine Visibility Metrics](/vault/generative-engine-visibility-metrics.md)
* [Generative Engines](/vault/generative-engines.md)
