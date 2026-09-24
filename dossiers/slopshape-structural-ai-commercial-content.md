---
type: Study Note
title: "SlopShape: Identifying AI-Generated Commercial Web Content"
description: Domain-disjoint replication showing that an LLM-annotated structural signature distinguishes single-pass AI B2B blog posts from older human posts, including self-reworded versions, while not measuring prose quality.
resource: https://arxiv.org/abs/2609.15369v2
source: /archive/slopshape-structural-ai-commercial-content.pdf
tags: [evaluation, generative-search, llm-as-judge, provenance]
timestamp: 2026-09-24T03:42:34Z
---

# SlopShape: Identifying AI-Generated Commercial Web Content — Study Notes

**Author**: Jochen Madler  
**Affiliation**: Sitefire (author operates a commercial GEO product)  
**Venue**: arXiv:2609.15369v2 [cs.CL]  
**Date**: September 17, 2026

## What It Is—and Is Not

A replication and domain transfer of StoryScope's fiction-writing analysis to commercial B2B blog posts. It asks whether *structural choices*—argument sequence, evidence, voice, promises, and endings—identify single-pass AI content after superficial rewriting. This is an **authorship detector in a constructed comparison**, not an evaluator of whether a post is useful, true, original, or harmful to readers.

That boundary is important beside **Measuring AI “Slop” in Text** (Shaib et al., arXiv:2509.19163): that study defines “slop” as human-observed deficiencies in information utility, factuality, relevance, coherence, and tone, explicitly independent of who wrote it. SlopShape uses the popular term in its title and motivation, but its target label is human versus five AI sources, not Shaib's human slop judgments. A structurally AI-typical post can be high quality; an unusual human post can be low quality. Neither classifier substitutes for the other.

## Dataset and Measurement Pipeline

The paired corpus has 2,250 archived human company blog posts across 268 domains, captured before ChatGPT (2008–2022; 75.5% from 2020–2022). A reverse-engineered brief for each post prompts five models—GPT-5.4, Claude Sonnet 4.6, Gemini 3 Flash, DeepSeek V3.2, and Kimi K2.5—to produce 11,250 matched AI mirrors. One hundred brief groups are reserved for feature discovery; the remaining 2,150 groups become classification data, separated by **company domain** into 198/32/38 train/validation/test domains to reduce publisher leakage. Each source contributes six posts per group, so a trivial always-AI binary classifier gets 83.3% accuracy; the paper uses macro-F1.

The LLM-assisted instrument is built as follows:

1. Discover a commercial-specific template schema from human posts: purpose, audience, structure/flow, explanation, evidence, voices, actionability, commercial integration, timeliness, page format, and writing style.
2. Extract a template for each of 13,500 posts; compare the six templates for each of 100 held-out discovery groups and derive 457 candidates. Quality-screen and deduplicate to 266 features.
3. Score every post on each dimension via an LLM (148,500 scoring calls). Before looking at human/AI labels, exclude 52 degenerate, out-of-options, or unstable features, leaving **214**: 187 structural and 27 writing-style features.
4. Train XGBoost classifiers for human-versus-AI and six-way source attribution on encoded features. Cluster bootstrap by company for primary intervals. Keep word-level baselines and a separately trained 10-feature core as controls.

The feature scorer is itself a model, not a neutral measurement instrument. Five-run repeat scoring over 60 posts yields Krippendorff α = 0.891. Two company-affiliated human annotators label 20 features on 12 posts (240 feature/post items each): human–human Cohen κ = 0.928 and mean human–model κ = 0.946. This validates a small slice of feature *annotation*, not a human judgment that structural patterns mean bad writing.

## Results and the Actual Signature

- On the **domain-held-out** test set, structural features alone give **98.0 macro-F1** (company-cluster 95% CI 96.7–99.2); style-only gives 88.1, and combined features 98.1. Unedited text yields 100.0 for both a stylometric classifier and fine-tuned ModernBERT; the structural result is about robustness and interpretability, not beating word-level classification on untouched text. Structural and style classifiers share only 4 of their 19 and 101 errors, respectively.
- Rewriting *every* test AI post with its own generating model changes on average 73% of its 13-word sequences; the 187-feature classifier remains at **98.1 macro-F1** (versus 98.0 original). The same classifier calls 8/1,450 rewritten AI posts human versus 9/1,450 originals. Claim preservation is judged complete in 98.2% of rewritten pairs. This is a single self-rewording protocol, not a demonstrated defense against adaptive human editors.
- Six-way attribution identifies the human source or correct generating model for **79.3%** of test posts (macro-F1 79.2) versus a 16.7% balanced chance rate; the hardest model source is DeepSeek. The top ten structural features alone retain 93.5 binary macro-F1.
- AI posts tend to promise a payoff in the title, state a thesis and roadmap early, speak as a tidy editorial explainer, and close by restating the thesis. These are corpus-discriminating patterns, **not defects by themselves**. In the structural feature space, human posts have mean rarity percentile **0.838** versus **0.435** for AI posts (Cohen's d = 1.83); rarity measures geometric sparsity, not creativity or utility.

Length-matching 1,545 posts leaves structural macro-F1 at 98.1. Removing domains shared with feature discovery yields 98.2; excluding 13-gram human–mirror overlaps yields 97.9. These checks reduce particular confounds, but cannot eliminate the fundamental asymmetry: a human wrote with real firm context, while its AI mirror got a lossy reconstructed brief.

## Analyst Takeaways

1. **Do not use AI-origin detection as a code/content quality gate.** For publication, review concrete factual claims, originality of insight, reader usefulness, sources, and actionable evidence; this paper tests provenance on synthetic mirrors, whereas Shaib et al. test quality defects with people.
2. **Audit structural sameness separately from lexical polish.** A grammar-perfect, paraphrased draft can still reproduce the same title–roadmap–restate shape. Ask whether the opening, evidence, caveats, and conclusion reflect the actual subject and reader, rather than mechanically deleting telltale phrases.
3. **Do not game the detector's feature list.** Adding odd structure only to look human may harm clarity; use the taxonomy as a prompt for editorial review, not a recipe to evade attribution.
4. **Demand same-period, real-world validation before moderation.** Domain-held-out splits are stronger than random rows, but historical human posts versus first-shot 2026 AI mirrors do not establish false-positive rates for collaboratively edited contemporary web copy.
5. **Keep commercial incentives visible.** The author runs a GEO vendor; instrument and aggregate artifacts are public, while post-level labels, generated mirrors, and refits require a research agreement. Reproduction is possible from archived-source fetch scripts but not all scored examples are directly open.

## Questions and Limitations

- No human-AI coauthoring, professional editing, deliberate structural rewriting, or independent humanizer attacks; self-rewording preserves the same generation process.
- Publication era and provenance are fully confounded by design; chance-level prediction of historical period within the human class and feature-removal checks do not create a matched contemporary human control.
- The reverse-engineered brief may omit business context that changes structural choices. Feature discovery explicitly selects differences between the six sources, making broad outside-corpus portability uncertain.
- The dataset is US- and software-heavy, company-domain clustered, and only a fraction of the LLM-created instrument was human-audited; both annotators are company-affiliated.
- Statistical structural rarity is not human creativity, and this work supplies no direct evidence that common structure causes poorer search rank, citation behavior, or reader utility.

## Vault Ideas Extracted

* [LLM-as-Judge with Anti-Inflation](/vault/llm-as-judge-with-anti-inflation.md)
* [Quality Versus Correctness Prompt Evaluation](/vault/quality-versus-correctness-prompt-evaluation.md)
* [Structural Origin Signals Versus Content Quality](/vault/structural-origin-signals-versus-content-quality.md)
