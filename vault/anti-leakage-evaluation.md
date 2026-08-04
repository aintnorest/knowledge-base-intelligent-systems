---
type: Synthesis
title: Anti-Leakage Evaluation
description: Preventing pre-training data contamination in automated writing benchmarks through strict knowledge isolation prompts and de-contextualized inputs.
tags: [evaluation, prompting, verification]
timestamp: 2026-07-12T22:20:26Z
---

# Anti-Leakage Evaluation

The risk that LLMs evaluated on automated writing benchmarks will reconstruct memorized training data rather than genuinely synthesize from provided inputs. Mitigation requires both input design and prompt engineering.

## The Risk

Foundation models are trained on vast corpora including arXiv papers. If a benchmark uses well-known papers as inputs, the model may "write" the paper from memory rather than from the provided raw materials. This makes the evaluation a memorization test, not a synthesis test.

## Two-Layer Defense

### Layer 1: Input De-contextualization

- Strip all citations, URLs, and explicit figure/table references from raw materials.
- Remove author names, affiliations, and institutional metadata.
- Convert visual insights to standalone factual observations.
- Create sparse and dense variants to test robustness to input granularity.

### Layer 2: Universal Anti-Leakage Prompt

A strict system prompt injected into ALL evaluated pipelines (not just the target system):

> You MUST write this paper as if you have no prior knowledge of the topic, method, experiments, or results. Your task is to construct the paper exclusively from the materials provided in the current session. Treat these inputs as the only available source of truth.

**Forbidden behaviors explicitly listed**:
- Retrieve or rely on knowledge from training data
- Attempt to recall or reconstruct any existing or published paper
- Use external facts, assumptions, or prior familiarity
- Infer or hallucinate author identities, affiliations, or institutions
- Insert metadata such as author names, emails, or "corresponding author"

## Historical Benchmark-Overlap Checks

Before prompt-based knowledge isolation, the GPT-3 study used a corpus-level approach: flag benchmark examples whose normalized n-grams overlapped pretraining documents, construct a clean subset, compare clean and full-set performance, and manually inspect suspicious collisions. The analysis also exposed why overlap is not equivalent to memorization: a match may contain only background text, common phrasing, or a statistically easier example rather than the answer.

This older method remains useful as one layer of evaluation hygiene, especially when training-corpus access exists. Its specific thresholds are historical, and a clean-subset comparison can itself be confounded by distribution shift. Current evaluations should treat corpus overlap analysis, input de-contextualization, and uniform knowledge-isolation instructions as complementary controls rather than interchangeable guarantees.

## Why Universal Application Matters

The anti-leakage prompt must be applied to ALL baselines, not just the target system. If one baseline is unrestricted while another is constrained, the comparison is unfair. Uniform application ensures that relative performance differences reflect genuine synthesis capability, not differential access to memorized knowledge.

## Limitations

- LLMs may not perfectly adhere to negative constraints due to stochastic nature.
- The prompt reduces but does not eliminate the risk of subtle memorization.
- Future benchmarks may need to use unpublished research or autonomously generated raw materials for full isolation.
- N-gram overlap can produce false positives and miss paraphrased or transformed contamination.
- Removing flagged examples can create a clean subset with a different difficulty distribution.

## Sources

- [PaperOrchestra dossier](/dossiers/paperorchestra.md) — Universal anti-leakage prompt applied to all pipelines
- [Language Models are Few-Shot Learners dossier](/dossiers/language-models-are-few-shot-learners.md) - historical corpus-overlap analysis, clean-subset comparisons, manual review, and disclosure of unresolved contamination.
