---
type: Synthesis
title: Answer Engineering
description: Designing answer shape, answer space, and extraction so an LLM response becomes a reliable downstream value.
tags: [prompting, verification, evaluation, reliability]
timestamp: 2026-07-13T00:14:22Z
---

# Answer Engineering

Answer engineering is the design of the boundary between a model's raw response and the value a downstream system uses. It combines three choices: the expected **answer shape**, the valid **answer space**, and an **extractor** that maps output to the required value.

## Why It Matters

A task can fail even when the model has useful information: the model may write an explanation before a label, use a synonym, emit malformed JSON, or refuse in a way the parser mistakes for an answer. Prompt wording alone cannot make that boundary reliable.

## Design the Contract

| Component | Question | Example |
|---|---|---|
| Answer shape | What physical form is expected? | A single token, JSON object, span, image, or code artifact |
| Answer space | Which values are valid? | `approved` / `rejected`, a JSON schema, or a bounded numeric range |
| Extractor | How is raw output converted? | Schema validation, a last-label rule, regular expression, or separate extraction model |

Prefer a constrained structured output and deterministic validation when the platform supports it. If a free-form response is necessary, define extraction rules in advance, log unparseable results, and measure extraction failures separately from task errors. A second LLM extractor can handle complicated output, but it adds cost and another source of variance.

The prompt can also constrain the answer's opening directly rather than describing it: ending the prompt with the first tokens of the target structure leaves the model continuing an already-committed form. This is a strong format control and a weak content control, and it changes what the extractor receives — see [Output Priming](/vault/output-priming.md).

## Practical Use

1. State the downstream type and every valid value before writing the prompt.
2. Ask the model for that shape, then test adversarial, verbose, refusal, and near-boundary outputs.
3. Version the extractor with the prompt and evaluate the composed system on held-out examples.
4. Route invalid or low-confidence results to retry, review, or a safe fallback rather than silently guessing.

## Limitations

An extractor does not establish that the model's content is correct; it only makes the decision observable and machine-usable. Over-constraining output can also remove helpful explanation or lower task performance. For high-stakes tasks, the answer contract must be paired with calibrated thresholds, domain review, and appropriate human oversight.

## Sources

- [The Prompt Report dossier](/dossiers/prompt-report.md) — distinguishes answer engineering from prompt engineering and defines answer shape, answer space, and answer extraction.
