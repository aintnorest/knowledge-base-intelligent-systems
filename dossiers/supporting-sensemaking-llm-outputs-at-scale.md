---
type: Study Note
title: "Supporting Sensemaking of Large Language Model Outputs at Scale"
description: Full-text grids and lexical-position clustering expose consistency, variation, and outliers across many LLM responses; controlled and open-ended studies show task-dependent sensemaking benefits without proving factual accuracy or comprehensive auditing.
resource: https://doi.org/10.1145/3613904.3642139
source: /archive/supporting-sensemaking-llm-outputs-at-scale.pdf
tags: [interaction-design, evaluation, prompting, verification]
timestamp: 2026-10-05T23:18:29Z
---

# Supporting Sensemaking of Large Language Model Outputs at Scale — Study Notes

**Authors**: Katy Ilonka Gero, Chelse Swoopes, Ziwei Gu, Jonathan K. Kummerfeld, and Elena L. Glassman.  
**Published**: CHI 2024, May 11–16, 2024.  
**Status**: Peer-reviewed CHI paper. The archive contains the ACM-formatted published version obtained from the author's site; arXiv:2401.13726v1 is an earlier related manuscript, not the archived version. This is non-agentic HCI evidence about inspecting generated text.

## What It Is

A study of how to make tens to hundreds of LLM outputs inspectable while preserving the text itself. Five interface variants combine a grid layout, exact-match highlighting, distinctive-word highlighting, and a new sentence-grouping method called Positional Diction Clustering (PDC), rendered either in whole-response grids or interleaved sentence groups.

The target is **mesoscale sensemaking**: larger than reading one or two answers, smaller than formal annotation of thousands. Goals can include choosing or recombining drafts, exploring ideas, comparing prompts or models, and identifying unusual responses before a precise evaluation criterion exists.

## Problem and Motivation

Variation is easy to generate but difficult to inspect in a wall of similar text. Linear views impose scrolling and working-memory costs. Aggregate metrics or abstract plots can conceal differences that matter to a particular person. Eight formative interviews found ad hoc inspection practices, often spreadsheets, and a perceived mismatch between automatic benchmarks and local tasks. Those interviews do not establish that automatic evaluation is universally ineffective.

## Mechanism as an Idea

- **Keep raw text available.** Precompute relationships and render them in the text rather than replacing responses with scores or summaries. Do not require users to know the relevant search phrase before starting.
- **Arrange controlled variation spatially.** A grid uses model, prompt variation, or repeated samples as axes, reducing the burden of remembering distant responses. The prototype exposes only two axes at once.
- **Distinguish exact repetition from relative distinctiveness.** Exact-match highlighting finds shared substrings; distinctive-word highlighting uses within-collection TF-IDF. A distinctive word is not necessarily an important argument or creative phrase.
- **Group analogous sentence positions and diction.** PDC applies single-link clustering using literal lexical overlap and normalized sentence location. Merges must retain substantial cross-response diversity rather than merely group sentences from one answer; singletons remain visible. This is a lexical-position proxy for analogy, not semantic-equivalence verification.
- **Offer two readings of the groups.** Grid PDC retains whole responses and highlights analogous sentences. Interleaved PDC juxtaposes grouped sentences, deemphasizes repeated words, and identifies originating conditions. The latter makes local variation easier to compare but can remove crucial document context.

Variation Theory and Analogical Learning Theory motivate these designs. The study does not independently measure whether the interface produces more accurate transferable mental models.

## Results / Admissions

The controlled within-subject study involved **24 graduate students** (15 PhD, nine master's), with counterbalanced interface conditions and fixed scenario order. The baseline displayed collapsible groups of responses in a linear list. The exploratory condition bundled the five available views rather than testing each independently.

**Email rewriting: nine responses per scenario.** Participants selected a draft within three minutes, then edited or remixed it within two minutes. All rated their final email above **5/7** for willingness to send. There was **no significant interface difference in time or self-rated final success**, and no clear overall preference for ease or overwhelm. Some appreciated visual comparison; others preferred collapsible subsets. Near-ceiling performance limits what can be inferred from the null result. The introduction's approximate ten-response description refers to the actual nine-response task.

**Model comparison: 50 responses per scenario**, 25 each from GPT-3.5 and GPT-4, with up to ten minutes to list differences. An analysis including task order and participant identity found more listed differences with the exploratory condition (**p<.01**); self-rated success also favored it (**p<.05**), while cognitive-load questions did not differ. The paper supplies no numerical count effect or confidence interval in its results prose, so no magnitude is inferred here. This outcome counts listed differences, not independently validated model-characterization accuracy.

Participants spent **9.7 versus 8.8 minutes** in the exploratory and baseline conditions (**p<.05**). Time and number of differences were positively correlated (**p<.05**): greater engagement is a plausible explanation, not proof of more efficient inspection or an isolated causal mediation result. Grid PDC was most used and preferred; exact matches and interleaved PDC were also useful, while distinctive words were least preferred in this task.

**Eight open-ended case studies**, including one two-person case, explored writing, journalism, business ideas, law, history, and identity-focused auditing. Maximum collections ranged from **20 to 100 responses**, approximately **50–500 words per response**, during one- to two-hour facilitated sessions. One journalist discovered **one failure among 50 outputs** from a prompt intended for an application: a concrete observation, not a measured 2% population failure rate or detection-recall estimate. Several initially hesitant participants found new uses for inspecting larger collections after facilitator suggestions; that guidance limits claims of spontaneous adoption.

## Analyst Takeaways

1. **Expose a distribution before selecting its representative.** Adjacent full-text alternatives make recurrent patterns and unusual outputs inspectable. This extends [Shared Alternatives Before Commitment](/vault/shared-alternatives-before-commitment.md) from shared human designs to sampled model responses, without establishing independent diversity or improved final quality.
2. **Visual relationships can offload comparison, but their meaning needs boundaries.** A highlighted match means lexical-position resemblance, not factual truth, completeness, or semantic agreement. Unhighlighted text may be an outlier or simply an algorithmic miss.
3. **Use overview and focused subsets as complementary modes.** Seeing many responses can reveal what to inspect next; context-sensitive work may then require fewer complete responses. A universal maximal-grid policy is not supported.
4. **Do not equate greater engagement with calibrated review.** [Review Scaffolds and Calibrated Reliance](/vault/review-scaffolds-and-calibrated-reliance.md) requires correct acceptance and rejection measures; this paper instead measures sensemaking output and perceived utility.

## Questions and Limitations

- Task and response count change together between email rewriting and model comparison; the study cannot isolate a causal scale threshold.
- Lexical overlap can miss paraphrases, and single-link groups can become too broad. Very diverse poems yielded no useful highlighting; near-uniform outputs or many clusters could overwhelm color discrimination.
- Sentence parsing poorly fits fragments, very short responses, or structured output. TF-IDF can emphasize incidental words in small collections.
- Interleaving loses context, which was consequential for trademark interpretation; original-response access was a requested extension.
- More listed differences need not mean more accurate or decision-relevant differences. No comprehensive hallucination, bias, or rare-failure detection benchmark was provided.
- The controlled sample is young and university-based; facilitated cases are qualitative and shallow within each domain. Thousands of responses were proposed future work, not evaluated scale.
- The main text describes mean-based group ordering while Appendix B.2.2 specifies median-based ordering; the source does not reconcile this implementation detail.

## Vault Ideas Extracted

* [Shared Alternatives Before Commitment](/vault/shared-alternatives-before-commitment.md)
