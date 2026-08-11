---
type: Synthesis
title: AI Search Visibility Measurement
description: Measuring an entity's standing in generative AI answers as four separable signals — presence, citation, sentiment, and crawler demand — instead of one undifferentiated "mentions" number.
tags: [evaluation, retrieval, provenance, enterprise]
timestamp: 2026-08-11T20:53:27Z
---

# AI Search Visibility Measurement

When a generative search interface answers a question, it returns one synthesized response rather than a ranked list. There is no position to occupy and no click to count, so rank-and-traffic measurement has nothing to attach to. Visibility in that setting is not a single quantity: it decomposes into four signals that fail independently and demand different fixes.

## The Four Signals

| Signal | Question | Typical instrument | Failure it exposes |
|---|---|---|---|
| **Presence** | Does the entity appear at all in the answer? | Share of voice: fraction of a tracked prompt set whose response mentions the entity | Not in the model's answer space for these queries |
| **Citation** | Is the entity explicitly attributed as a source? | Citation count normalized by prompt-set size, weighted by how many *distinct* prompts cite it | Mentioned but not treated as a source of record |
| **Sentiment / framing** | *How* is the entity described? | Polarity or rubric classification of each mention, sliced by topic and by user-intent persona | Present and cited, but represented inaccurately or unfavorably |
| **Crawler demand** | How often do AI systems fetch the entity's own pages? | First-party server/CDN logs segmented by bot class | Content is or is not being consulted at all |

The decomposition matters because the remedies diverge. Low presence is a coverage problem. Presence without citation is an extraction or authority problem. Citation with poor framing is a representation problem that more content will not fix. Crawler demand without citation localizes the failure to a specific page.

## Designing the Prompt Set

Every response-side metric is defined relative to a prompt set, which makes the prompt set the real instrument.

- Build topic clusters of roughly a dozen semantically distinct, realistic user questions each. Too few prompts miss visibility gaps; too many dilute the signal with queries nobody asks.
- Cover the intent range (awareness, comparison, price, troubleshooting) separately — framing often differs sharply by intent even when presence does not.
- Refresh clusters as query patterns move, and version them, because changing the prompt set silently rebases every historical number.
- Normalize against an explicitly defined competitor set when the question is competitive standing rather than absolute coverage.

## Measuring It Honestly

- **Repeat.** The instrument is a stochastic, personalized, continuously updated system. A single query is one sample. Report distributions across repeated trials, not point values.
- **Record the controls.** Model and version, product surface, account tier, mode, locale, and timestamp. Without them a host or tier difference is misattributed to a real change in standing.
- **Separate mention from attribution.** An explicit source link and an unlinked name-drop have different credibility and different causes; collapsing them hides the most actionable gap.
- **Pair response-side and demand-side data.** Response-side metrics are sampled and expensive; first-party crawler logs are complete and cheap. The joint view is far stronger than either alone.

## Limitations

Absent a standard prompt taxonomy per domain, share-of-voice figures are not comparable across organizations and are trivially gameable by prompt selection — treat any externally reported number as unaudited. Composite scores that multiply frequency by breadth are ranking heuristics, not normalized rates, and do not compare across prompt sets of different sizes. Polarity classifiers also miss the important cases: a mention can be factually accurate and strategically damaging, or superficially positive and materially incomplete; a rubric-based judge is a better fit than sentiment polarity, at the cost of its own calibration problems. Finally, none of these signals measure whether the model's description is *true* — accuracy of representation is a separate axis from visibility.

## Sources

- [Answer Engine Optimization: A Measurement Framework](/dossiers/answer-engine-optimization-measurement-framework.md) — proposes the presence/citation/sentiment/agent-traffic split, AI Share of Voice, and a breadth-weighted citation Influence Score.
