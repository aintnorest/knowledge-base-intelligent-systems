---
type: Synthesis
title: Anti-Leakage System Prompt
description: A universal system prompt that forces an LLM to treat only provided session materials as truth, preventing pre-training data contamination in evaluation pipelines.
tags: [prompting, evaluation, verification]
timestamp: 2026-07-11T16:00:00Z
---

# Anti-Leakage System Prompt

A universal system prompt injected into ALL LLM pipelines in an evaluation setup to prevent pre-training data contamination. The prompt forces the model to treat only provided session materials as truth and forbids reliance on parametric memory.

## The Prompt

> **Strict Knowledge Isolation & Anonymity (Critical)**
>
> You MUST write this paper as if you have no prior knowledge of the topic, method, experiments, or results. Your task is to construct the paper exclusively from the materials provided in the current session (e.g., `idea.md`, `experimental_log.md`, figures, and other inputs). Treat these inputs as the only available source of truth.
>
> **Forbidden Behavior** — You MUST NOT:
> - Retrieve or rely on knowledge from your training data
> - Attempt to recall or reconstruct any existing or published paper
> - Use external facts, assumptions, or prior familiarity with the topic
> - Infer or hallucinate author identities, affiliations, institutions, or publications
> - Insert metadata such as author names, emails, affiliations, or phrases like "corresponding author"
>
> **Anonymity Requirement** — The paper must be fully anonymized for double-blind review. Do not include any information that could reveal the identity of the authors or their institutions.
>
> **Allowed Sources** — You may use only:
> - The materials explicitly provided in this session
> - Logical reasoning derived from those materials
>
> **Core Principle** — The final paper must be an independent reconstruction derived solely from the provided inputs. This constraint is strict and overrides all other instructions.

## Why It Must Be Universal

This prompt must be applied to ALL evaluated pipelines — not just the target system. If one baseline is unrestricted while another is constrained, the comparison is unfair. Uniform application ensures that relative performance differences reflect genuine synthesis capability, not differential access to memorized knowledge.

## Limitations

- LLMs may not perfectly adhere to negative constraints due to their stochastic nature.
- Applying this uniformly ensures a fair comparison but does not guarantee complete isolation.
- Future benchmarks may need unpublished research or autonomously generated raw materials for full isolation.

## Sources

- [PaperOrchestra dossier](/dossiers/paperorchestra.md) — Universal anti-leakage prompt applied to PaperOrchestra and all baselines
