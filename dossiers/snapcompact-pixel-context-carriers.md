---
type: Study Note
title: "Snapcompact: SoTA Compaction — Instant, Local, Free. Pick 3"
description: "Stencil experiment encoding long text context as dense pixel-font images, with behavioral benchmarks and white-box evidence about visual-to-text decoding."
resource: https://stencil.so/blog/snapcompact
source: https://stencil.so/blog/snapcompact
tags: [multimodal, compaction, context-engineering, token-efficiency, long-context, evaluation]
timestamp: 2026-08-31T22:15:22Z
---

# Snapcompact: SoTA Compaction — Instant, Local, Free. Pick 3 — Study Notes

**Author**: Can Bölük  
**Publisher**: Stencil  
**Date**: June 10, 2026

## What It Is

Snapcompact renders long textual agent context into dense pixel-font PNGs and sends the images to a vision-capable model. It exploits a billing asymmetry: a 1568×1568 image can hold roughly 40,000 characters at a 6×10 font while being billed as 3,279 image tokens. Unlike prose summarization, the carrier aims to preserve the original text rather than decide in advance which facts matter.

The article reports carrying 170K text tokens as 46K image tokens and roughly halving the total frontier-model bill at matched F1 in its tuned comparisons. Savings are not free: models spend additional output/reasoning tokens decoding dense images, and performance changes sharply by model, font, density, color scheme, provider resizing, and vision patch geometry.

## Experiments and Mechanism

On SQuAD v1.1 extractive QA, the authors compare raw text, handoff summaries, provider/server compaction, and bitmap variants. Dense images preserve substantially more arbitrary factual detail than most prose summaries in the reported runs. At about 35–40 pixels squared per character, transcription falls off sharply, though identifier recall can remain strong. The best density is therefore not simply the smallest readable font.

White-box experiments on Qwen2.5-VL-7B compare hidden states for matched text and image questions. Cross-carrier nearest-neighbor retrieval matches all 12 questions from layer 2 onward; centered representational geometry correlates strongly; and a logit-lens probe shows answer fragments becoming lexical only in later layers. Aligning glyph cells with vision patches and repeating colored lines raises the probed answer-piece probability from 0.39 to as high as 1.00, while moving the lock-on layer only slightly. The interpretation is that layout can make decoding less ambiguous but cannot remove the architecture's visual-to-language depth.

## Analyst Takeaways

1. **Treat representation as an optimization surface.** Tokenization and billing can make a lossless-looking alternate carrier cheaper than natural-language summarization.
2. **Count decode cost, not input tokens alone.** Image savings can be consumed by added reasoning, especially when output tokens are expensive.
3. **Tune against the real vision pipeline.** Font, patch alignment, silent resizing, and density cliffs make portability an empirical question.
4. **Use extractive recall tests before agent deployment.** SQuAD measures fact retrieval, not whether a coding agent can reliably continue a tool trajectory from bitmap context.

## Questions and Limitations

- The article is a vendor report and its benchmark is primarily extractive QA rather than end-to-end agent completion.
- OCR-like fidelity can fail silently on exact code, punctuation, tables, or low-contrast rendering.
- Accessibility, audit tooling, prompt-injection scanning, and data-loss prevention become harder when text is hidden in images.
- Provider token formulas and image preprocessing can change, eliminating the economic advantage.

## Vault Ideas Extracted

* [Cross-Modal Context Carrier](/vault/cross-modal-context-carrier.md)
* [Rate–Distortion Memory Compaction](/vault/rate-distortion-memory-compaction.md)
