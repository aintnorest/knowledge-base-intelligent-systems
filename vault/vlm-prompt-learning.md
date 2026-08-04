---
type: Synthesis
title: VLM Prompt Learning
description: Learning soft prompt vectors for vision-language models instead of handcrafting text prompts, enabling adaptive and task-specific visual-textual alignment.
tags: [prompting, multimodal, fine-tuning]
timestamp: 2026-07-11T16:36:00Z
---

# VLM Prompt Learning

A family of techniques for adapting pre-trained vision-language models (VLMs) like CLIP to downstream tasks by learning continuous prompt vectors rather than handcrafting text prompts.

## The Problem

Handcrafted prompts for VLMs (e.g., "a photo of a [class]") are static, require expert knowledge, and often perform poorly on unseen classes or complex tasks. VLM Prompt Learning automates this by optimizing soft prompts in the model's embedding space.

## Methods

### CoOp (Context Optimization)

- Introduces **learnable context vectors** that are fine-tuned to minimize classification loss.
- Avoids extensive manual prompt engineering.
- The prompt template becomes: `[learnable context vectors] + [class name]`.
- **Limitation**: Static prompts perform poorly on unseen classes.

### CoCoOp (Conditional Context Optimization)

- Extends CoOp by making prompts **input-conditional**.
- Uses a lightweight neural network to generate prompt vectors for each image.
- Pre-trained model parameters remain frozen.
- **Advantage**: Adapts to new and unseen data without fine-tuning the base model.

### MaPLe (Multimodal Prompt Learning)

- Jointly optimizes prompts for **both vision and language branches** simultaneously.
- Embeds prompts at multiple stages within the transformer architecture.
- Introduces **coupling** between vision and language prompts so they inform each other.
- Uses a hierarchical learning mechanism to process information at multiple levels of abstraction.
- **Advantage**: Better captures dependencies between vision and language inputs; excellent generalization.

## Comparison

| Method | Prompt Type | Vision Prompts | Language Prompts | Input-Conditional | Generalization |
|--------|-------------|----------------|------------------|-------------------|----------------|
| CoOp | Static soft vectors | No | Yes | No | Limited |
| CoCoOp | Dynamic soft vectors | No | Yes | Yes | Improved |
| MaPLe | Hierarchical soft vectors | Yes | Yes | Yes | Excellent |

## Sources

- [Prompt Engineering Survey dossier](/dossiers/prompt-engineering-survey.md) — Zhou et al. (2022), Zhou et al. (2022), Khattak et al. (2023)
