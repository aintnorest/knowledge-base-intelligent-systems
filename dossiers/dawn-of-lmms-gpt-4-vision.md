---
type: Study Note
title: "The Dawn of LMMs: Preliminary Explorations with GPT-4V(ision)"
description: Study notes on a broad qualitative exploration of early GPT-4V multimodal input modes, prompting patterns, capabilities, applications, and limitations.
resource: https://arxiv.org/abs/2309.17421v2
source: /archive/dawn-of-lmms-gpt-4-vision.pdf
tags: [multimodal, prompting, evaluation, computer-use]
timestamp: 2026-07-30T17:30:00Z
---

# The Dawn of LMMs: Preliminary Explorations with GPT-4V(ision) - Study Notes

**Authors**: Zhengyuan Yang, Linjie Li, Kevin Lin, Jianfeng Wang, Chung-Ching Lin, Zicheng Liu, Lijuan Wang  
**Venue**: arXiv:2309.17421 [cs.CV]  
**Publication date**: September 30, 2023 (arXiv v1)  
**Version date**: October 11, 2023 (v2)  
**Pages**: 157

## What It Is

This report is a large qualitative exploration of an early GPT-4V release. Rather than a controlled benchmark paper, it assembles demonstrations of image-text interaction, visual referring, OCR/document reasoning, code generation from visual inputs, multi-image and video reasoning, prospective applications, and multimodal-agent patterns.

Its primary value is historical and design-oriented: it documented interaction patterns that later became familiar—interleaved image/text context, visual annotations as prompts, and vision-language agents—while explicitly acknowledging that its curated examples are not comprehensive measurements.

## Interaction and Prompting Findings

GPT-4V accepts text-only, single image-text, and flexibly interleaved multi-image/text inputs. The report finds that explicit output constraints, text instruction around images, in-context visual demonstrations, and marked-up images can change performance substantially. “Visual referring prompting” uses points, boxes, circles, or drawn marks to identify the relevant region; the model can often interpret those marks and sometimes produce grounded coordinate-like outputs.

The examples show a repeated engineering pattern: when a direct visual question fails (such as dense counting, chart reading, or a meter), add task decomposition, a good-performance instruction, or relevant visual examples. This improves some cases but not reliably; image understanding still makes conspicuous counting, OCR, association, and spatial errors.

## Scope of the Exploration

The report probes descriptions, localization, counting, scene text, tables, charts, documents, multilingual images, coding from handwriting/figures, temporal video frames, abstract visual reasoning, emotion-related interpretation, industrial inspection, medical imagery, insurance, image generation/editing, embodied tasks, and GUI navigation. It also sketches multimodal plugins, chains, self-reflection, self-consistency, and retrieval-augmented LMM agents.

These are opportunity demonstrations, not claims that the system is dependable in each domain. The authors say they use mostly qualitative, manually designed samples because public training information and conventional benchmarks may not establish clean train-test separation for GPT-4V.

## Limitations and Safety

The report contains minimal quantitative benchmarking, selectively curated cases, no disclosed model internals, and no systematic error rates. Results may depend on an early product version, hidden system configuration, inputs, and prompt wording. Medical, accessibility, safety inspection, financial/insurance, and GUI examples are especially unsuitable as deployment validation: a plausible multimodal explanation can still be wrong.

## Analyst Takeaways

1. **Multimodal prompting is interface design.** Marking the image, arranging interleaved context, and specifying an output schema can matter as much as the text question.
2. **Use visual examples to clarify task structure, not to assume reliability.** Few-shot improvements in a demonstration do not validate a task distribution.
3. **Make grounding machine-checkable where possible.** Require regions, citations, OCR snippets, tool outputs, or structured actions that downstream systems can validate.
4. **Evaluate the workflow, not a gallery.** Quantify success, abstention, latency, error severity, and robustness on held-out inputs before automating a consequential visual task.

## Current Validity

The named early GPT-4V product, its API behavior, and every qualitative result are time-bound. The durable contribution is a map of multimodal interaction hypotheses. Current vision models require current, task-specific evaluation and safety validation.
