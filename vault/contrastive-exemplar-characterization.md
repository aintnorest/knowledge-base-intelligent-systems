---
type: Synthesis
title: Contrastive Exemplar Characterization
description: When a pipeline summarizes an exemplar to steer a rewrite, it can describe the exemplar absolutely or as a delta from the input — and which one works depends on whether the target attribute is an absolute property or one defined relative to the source.
tags: [prompting, in-context-learning, decomposition]
timestamp: 2026-08-25T00:00:00Z
---

# Contrastive Exemplar Characterization

Show a model an exemplar and ask it to characterize the exemplar so a later step can steer toward it. There are two framings, and they are not interchangeable:

- **Absolute**: "Describe this exemplar." The description stands alone.
- **Contrastive**: "How does this exemplar differ from the input?" The description is a delta.

Absolute characterization is the default because it is simpler and reusable — the same description applies to any input. Contrastive characterization costs nothing extra (the input is already in the prompt) but produces a description that only holds for this pair.

## The Selection Rule

**Use contrastive characterization when the target attribute is defined relative to the source; use absolute when it is an absolute property.**

The failure mode absolute characterization creates is a *sign error*, not a magnitude error. If the exemplar is "more formal than the input" but still informal in absolute terms, an absolute reading returns descriptors like *casual* and *conversational* — and the rewrite then moves the text in exactly the wrong direction, confidently. The output is fluent, follows the descriptors it was given, and is worse than not rewriting at all.

The failure mode contrastive characterization creates is *overshoot and noise*. When the exemplar's property is absolute and unambiguous, the contrast step adds a comparison the task never needed, and a small genuine difference between input and exemplar can be amplified into a large described delta.

The diagnostic question is empirical, not conceptual: take your actual exemplars and ask whether a reader shown only an exemplar would describe it the same way as a reader shown the exemplar next to its input. Where those two descriptions diverge, you need the contrastive framing.

## Evidence

Formality transfer on GYAFC flips cleanly with direction, using the same model, chain and metrics:

| Direction | Absolute (RG) | Contrastive (RG-C) |
|---|---:|---:|
| Informal → formal (EM / FR) | 0.347 / 0.423 | **0.886 / 0.899** |
| Formal → informal (EM / FR) | **0.707 / 0.647** | 0.482 / 0.396 |

*Formality-classifier accuracy, Llama-3.2-3B-Instruct.*

The explanation is a property of the dataset, not the model: GYAFC's "formal" texts are formal only *relative to* their inputs, so absolute analysis of them yields "informal" and "casual" and steers backwards. GYAFC's "informal" texts are informal in absolute terms — slang, abbreviations — so absolute analysis is sufficient and the contrast only confounds.

A third case shows both framings can lose. On paragraph-level medical simplification, input and exemplar share a strong baseline register (original and simplified versions of the same technical abstract), so the target is an *interior* point in the attribute space rather than an endpoint. Absolute characterization calls the target "technical" and pushes the wrong way; contrastive characterization correctly identifies "more informal than the input" but overshoots. Interior targets are the residual hard case for both framings.

## Practical Use

- Look at the *provenance* of your exemplars. Exemplars drawn from a corpus split labeled by a relative comparison (this is the formal half of these pairs) are relative by construction, whatever their labels claim.
- Run both variants on a small sample and inspect the intermediate descriptions before scoring outputs. A sign error is obvious in the descriptors and expensive to diagnose from end metrics.
- Route rather than choose, when the collection is mixed: absolute exemplars and relative exemplars can be handled by different framings within one system, since the branch is per-pair.
- Where the target sits between the familiar poles, expect neither framing to land it. Anchor to the downstream objective instead of exemplar similarity, and measure against that.

## Limitations

- The evidence is one task family (formality transfer), one model family, and automatic metrics. The direction-flip is a clean controlled result; the general rule is an inference from it.
- Contrastive descriptions are pair-specific and cannot be cached or reused across inputs the way an absolute description can.
- The rule presumes you can tell whether an attribute is absolute or relative. For composite attributes — a "voice", a "house style" — some dimensions are absolute and some are relative, and a single framing serves both badly.
- Neither framing addresses magnitude. Both produce a direction; how far to move remains uncontrolled.

## Sources

- [Steering Large Language Models with Register Analysis for Arbitrary Style Transfer](/dossiers/register-analysis-arbitrary-style-transfer.md) — RG vs. RG-Contrastive across authorship imitation, both formality-transfer directions, and text simplification.

## Related

- [[framework-anchored-intermediate-descriptions]] — the other lever on the same step: what vocabulary the description is allowed to use.
- [[in-context-learning]] — why exemplars steer at all; this page is about summarizing one rather than imitating it directly.
