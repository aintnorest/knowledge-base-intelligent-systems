---
type: Study Note
title: "The Impact of AI-Powered Search on SEO: The Emergence of Answer Engine Optimization"
description: Personal study notes on a 244-respondent questionnaire study of how generative answer engines shift search visibility work from link ranking to Answer Engine Optimization, and on the paper's substantial methodological weaknesses.
resource: https://www.researchgate.net/publication/390498377_The_Impact_of_AI-Powered_Search_on_SEO_The_Emergence_of_Answer_Engine_Optimization
source: /archive/ai-powered-search-seo-answer-engine-optimization.pdf
tags: [generative-search, retrieval, enterprise, evaluation, governance]
timestamp: 2026-08-11T20:54:14Z
---

# The Impact of AI-Powered Search on SEO — Study Notes

**Authors**: Apoorav Sharma (Scholar) and Prabhjot Dhiman (Assistant Professor), Apex Institute of Management, Chandigarh University

**Date**: April 2025 (PDF creation date; no journal, volume, or DOI is printed anywhere in the document)

**Pages**: 12

**Type**: Practitioner-facing questionnaire study in digital marketing. Source key is a file checksum because the document carries no publisher identifier.

## What It Is

A short digital-marketing paper arguing that generative answer layers — Google's Search Generative Experience, ChatGPT, Copilot, Perplexity — are converting search engines from *directories of links* into *primary content providers*, and that the practitioner response is a distinct discipline the authors call **Answer Engine Optimization (AEO)**.

The empirical core is a single self-reported questionnaire of 244 respondents (users, marketers, business owners, content creators) covering four things: whether they perceive AI-driven change in search results, how often they get answers without clicking, which AEO tactics they have implemented, and what they believe is happening to their organic traffic.

The paper's thesis is deliberately non-apocalyptic: traditional SEO is not obsolete, but it now has to be *composed with* AEO to retain visibility.

## The Problem It Addresses

Classical SEO optimizes for a click: rank a URL highly, and the user visits the page. An answer engine breaks that contract. It reads the corpus, synthesizes a response in the result surface, and satisfies the query without transferring the user anywhere. Three consequences follow, and the paper is organized around them:

1. **Visibility decouples from traffic.** Content can be the basis of an answer and receive nothing measurable in return.
2. **Ranking factors move from lexical to semantic.** BERT/MUM-class understanding rewards entity coverage, topical authority, and intent match over keyword density and backlink volume.
3. **Measurement breaks.** Click-through rate and session-based attribution stop describing the thing you actually care about, and no replacement metric is standardized.

## What the Data Shows

Descriptive results from the 244-respondent sample:

| Question | Result |
|---|---|
| Noticed AI-driven changes in search results | 60.7% yes; 21.3% no; 18.0% unsure |
| Get a zero-click answer "very often" or "sometimes" | 77.5% (35.7% + 41.8%) |
| Most-trusted result type | Traditional organic listings 40.2%; both equally 32.4%; AI-generated answers 27.5% |
| Familiar with AEO as a concept | 45.9% yes; **54.1% no** |
| Self-reported effect on organic traffic | Decreased 42.2%; no change 25.4%; increased 19.7%; unsure 12.7% |
| Biggest reported challenge | Declining CTR 45.9%; measurement difficulty 27.9%; algorithm opacity 20.1% |
| Believe SEO is becoming obsolete | No 40.2%; partially 38.1%; yes 21.7% |

AEO tactic adoption (multi-select): conversational/long-form content 37.7%, structured data markup 32.0%, entity-based optimization 26.6%, voice-search optimization 16.8%, and **none at all 35.7%**.

The reported correlation matrix (Table 5) is the paper's most-quoted artifact and its weakest evidence. Directionally: zero-click frequency tracks declining CTR (0.62) and traffic decrease (0.58); AEO *implementation* tracks AEO *familiarity* (0.67) and runs negative against declining CTR (−0.33), traffic decrease (−0.29), and belief that SEO is obsolete (−0.38); trust in AI answers tracks traffic decrease (0.51). No sample sizes, significance tests, variable codings, or correlation method are given for any cell.

The AEO tactic set the paper recommends is conventional and worth recording as a checklist: structured data markup, entity-based content built around a knowledge-graph identity, comprehensive conversational and Q&A-shaped passages that match natural-language and voice queries, explicit E-A-T/topical-authority signals, and long-tail intent coverage.

## What I Take From It

1. **The interesting shift is economic, not technical.** Retrieval quality improving is old news; what is new is that the retrieval layer now *consumes* the content on the user's behalf. Any corpus whose business model assumed the click — publishers, docs sites, support content, marketplaces — is in the same position, and the same logic applies inside an enterprise when an internal assistant answers from a wiki nobody visits any more.

2. **Awareness is the real bottleneck, not tactics.** 54.1% had not heard of AEO and 35.7% had implemented nothing, while 42.2% reported traffic already declining. Even taking the numbers loosely, the gap between exposure and response is the finding with the longest shelf life here.

3. **"Which metric replaces the click?" is unsolved and the paper knows it.** Measurement difficulty was the second-ranked challenge, and the authors can only gesture at "snippet impressions and AI answer visibility." That is the same gap that shows up in this corpus as [retrieval-depth grading](/vault/retrieval-depth-grading.md) — a citation appearing in an answer says almost nothing about what was actually retrieved or what value flowed back.

4. **Algorithm opacity becomes a governance concern, not just an annoyance.** 20.1% named it directly. When a black-box synthesizer decides which sources are quotable, the selection function is unauditable by the parties whose livelihood depends on it, and there is no appeals surface.

5. **The correlation direction on AEO implementation is suggestive but uninterpretable.** Practitioners who implemented AEO report less traffic decline — which is equally consistent with AEO working, with better-resourced organizations doing both, and with familiarity biasing self-reported outcomes. Read it as a hypothesis, never as an effect size.

## What I Would Question

- **The methodology section describes a study that was not performed.** It promises 12-month longitudinal SEMrush/Ahrefs/Search Console tracking, controlled A/B tests of AEO versus traditional pages, regression models, 15 expert interviews, and five case studies. None of that appears in the results — the entire Results and Discussion section is descriptive frequencies from one questionnaire. This is the paper's central credibility problem.
- **Internal arithmetic does not close.** Table 1's age buckets sum to 234 respondents (95.9%) against a stated n of 244; ten respondents and one presumable 55+ bucket are missing. The Table 5 correlation matrix labels two different variables "Q10" (declining CTR and algorithm transparency).
- **All outcome variables are self-reported perception.** "My organic traffic decreased" is not measured traffic, and respondents who have heard of AEO are exactly the ones primed to attribute decline to AI search. There is no analytics-derived ground truth anywhere in the study.
- **The headline third-party statistics are vendor marketing.** The "~60% of informational queries satisfied without a click" figure is BrightEdge; the traffic-decline claims are SEMrush and HubSpot (cited once as "EMrush"). Useful as industry signal, not as evidence.
- **Sampling is unstated.** No recruitment channel, geography, response rate, or screening procedure appears, and 40.2% of the sample are daily AI-tool users — a heavily self-selected pool for questions about AI's effect on search.
- **AEO is asserted, never tested.** The stated second objective — "to evaluate the effectiveness of AEO techniques" — is answered only with adoption counts and a correlation. Nothing in the paper measures whether structured data or entity optimization actually raises inclusion in a generated answer.

Net read: cite this for *framing* the AEO shift, the awareness gap, and the practitioner-perceived challenge ranking. Do not cite any of its numbers as measurements of the world.

## Vault Ideas Extracted

* [Generative Engine Optimization](/vault/generative-engine-optimization.md) — the AEO concept; merged into the GEO umbrella page during post-merge consolidation
* [Zero-Click Search](/vault/zero-click-search.md)
