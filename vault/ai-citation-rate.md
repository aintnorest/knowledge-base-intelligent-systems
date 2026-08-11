---
type: Synthesis
title: AI Citation Rate
description: The share of generated answers to a fixed prompt set that cite your source — the primary outcome metric when the goal is inclusion in a synthesized answer rather than a click, and only meaningful with a held-constant prompt set and control pages.
tags: [evaluation, retrieval, provenance]
timestamp: 2026-08-11T20:55:03Z
---

# AI Citation Rate

**AI citation rate** is the percentage of generated answers, over a defined prompt set and sampling window, that reference your domain:

```text
citation_rate = answers_citing_you / total_answers_sampled
```

It is the natural outcome metric when success means being quoted inside a synthesized answer rather than being clicked in a ranked list. The useful framing is that a citation is a passing test: for each question you believe you are the best answer to, either the system cites you or it does not.

## Measuring It Properly

The metric is trivially gameable by an unstable denominator, so the protocol matters more than the formula:

1. **Fix the prompt set.** 30–100 questions your content should be the best answer to, phrased as real users phrase them, held constant across runs. A shifting prompt set makes every comparison meaningless.
2. **Sample repeatedly and across systems.** Generated answers are stochastic and personalized; a single query proves nothing. Record per run: prompt, system and version, date, cited or not, which URL, whether the cited claim was represented accurately, and which competitors were cited.
3. **Report four numbers, not one:**
   - **citation rate** — share of prompts citing you;
   - **share of voice** — your citations against named competitors in the same runs;
   - **attribution accuracy** — share of citations that describe your content correctly;
   - **coverage** — share of prompts where any source you would consider authoritative was cited (near-zero coverage means the question, not your page, is the problem).
4. **Keep control pages.** Answer systems change models, retrieval, and citation policy without notice, so movement may be entirely exogenous. Always read the series against pages you did not change.
5. **Pair it with leading indicators.** Fetch success rate per crawler identity, share of pages whose answer text is present without JavaScript, structured-data validation pass rate, and completeness of identity metadata all move *before* citation rate does.

## Practical Use

Use citation rate as the objective function for content experiments: change one class of thing on a page cluster (structure, answer-first rewriting, structured data, entity naming), wait for re-crawl and re-index, re-run the fixed prompt set, and compare against unchanged controls. Correlate movement with branded-query volume and direct traffic, since a cited-but-unclicked answer commonly surfaces later as a branded search rather than a referral.

## Limitations

- **Slow feedback.** Re-crawl, re-index, and answer-cache turnover put the loop at weeks; conclusions drawn from a single post-change sample are noise.
- **Undercounted referrals.** Traffic attributed to assistant interfaces is a floor, not a measurement — the metric describes visibility, not value delivered.
- **Citation is not comprehension.** A source can be cited for a claim it did not make, which is why attribution accuracy must be tracked as a separate number rather than folded into the rate.
- **Sampling is expensive and non-reproducible.** Answers vary by account, locale, mode, and model version, so cross-organization comparisons of absolute citation rate are not meaningful; only your own series against your own controls is.
- **No published baseline exists** for what a good rate looks like in a given domain, so the metric is only interpretable as a trend.

## Related

- [Generative Engine Optimization](/vault/generative-engine-optimization.md) — the practice this metric closes the loop on.
- [Retrieval-Depth Grading](/vault/retrieval-depth-grading.md) — the complementary consumer-side measure: not whether a source was cited, but what depth of artifact was actually retrieved from it.

## Sources

- [Generative Engine Optimization in Practice](/dossiers/generative-engine-optimization-implementation-guide.md) — citation rate as the primary metric, the fixed-prompt-set protocol, four reported numbers, and control-page attribution
