---
type: Synthesis
title: Generative Engine Visibility Metrics
description: Measuring what a cited source actually gets from an LLM-synthesized answer — attributed text volume, position weighting, and judged influence — instead of its rank on a results page.
tags: [evaluation, retrieval, llm-as-judge]
timestamp: 2026-08-11T20:52:52Z
---

# Generative Engine Visibility Metrics

When a system answers a query by synthesizing several retrieved sources into one response with inline citations, "what did this source get?" stops being answerable by rank. These metrics quantify a citation's share of a generated answer so a content owner — or an evaluator — can measure and optimize it without any cooperation from the engine.

## Why Rank Fails

On a results page, sources are listed in order with verbatim snippets, and position is a good proxy for attention. In a synthesized answer, citations are interleaved inside a single block of prose. One source may support six sentences of the core argument; another may be a parenthetical corroboration in the final line. Both are "cited." A single ordinal cannot distinguish them.

## The Metric Family

| Metric | Definition | What it captures |
|---|---|---|
| **Word count share** | Words in sentences citing the source, over total words in the response; shared equally when a sentence cites several sources | How much of the answer the source is responsible for |
| **Position-adjusted word count** | The same, with each sentence weighted by an exponentially decaying function of its position | Earlier text is more likely to be read; the exponential shape mirrors power-law click-through curves in search |
| **Subjective impression** | An LLM judge scores facets such as relevance to the query, influence on the answer, uniqueness of the material, diversity, prominence of position, perceived volume, and likelihood of a click | The share of user attention a citation earns, which mechanical counting misses |

Three design constraints keep the family usable: metrics must be relevant to content owners, explainable, and comprehensible to non-specialists.

## Normalization Is Load-Bearing

Two normalizations do real work and are easy to omit by accident:

- **Within-response normalization.** Scale impressions so all citations in a response sum to 1. This makes visibility explicitly **zero-sum** and is what allows meaningful comparison across responses of different lengths — and what makes multi-source experiments interpretable at all.
- **Cross-metric normalization.** LLM-judge scores are poorly calibrated in absolute terms. Rescaling the judged metric to the same mean and variance as an objective metric puts baselines on comparable footing so the two families can be read side by side.

Report changes as relative improvement over an unoptimized baseline for the same source and query, and average over several sampled responses — generated answers are stochastic.

## Practical Use

Beyond content optimization, these metrics answer evaluation questions about the engine itself: whether attributed volume tracks source relevance, whether early positions are systematically monopolized, whether the answer draws on a diverse source set or leans on one document.

## Limitations

- Attributed word count measures exposure, not correctness or usefulness of the citation.
- The subjective metric inherits the judge's biases, and when the judge shares a model family with the answer generator the two are correlated in ways normalization does not fix.
- Sentence-level attribution assumes inline citations are complete and accurate; engines that cite loosely, cite at paragraph granularity, or omit citations degrade every metric in the family.
- Nothing here captures whether the reader clicked through — visibility inside the answer is a proxy for downstream traffic, not a measurement of it.

## Sources

- [GEO: Generative Engine Optimization](/dossiers/geo-generative-engine-optimization.md) — defines word count, position-adjusted word count, and a seven-facet subjective impression metric, with both normalization steps
