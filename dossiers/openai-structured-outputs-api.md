---
type: Study Note
title: Introducing Structured Outputs in the API
description: OpenAI's 2024 schema-constrained decoding model, distinguishing structural adherence from semantic correctness and admitting refusal, interruption, and schema-compilation limits.
resource: https://openai.com/index/introducing-structured-outputs-in-the-api/
source: /archive/openai-structured-outputs-api.md
tags: [tool-use, reliability, verification, agent-harness, agents]
timestamp: 2026-10-04T05:19:39Z
---

# Introducing Structured Outputs in the API — Study Notes

**Author**: Michelle Pokrass; OpenAI  
**Published**: August 6, 2024  
**Evidence type**: First-party product announcement and implementation explanation; vendor-owned evaluation, not peer-reviewed. The canonical article was read alongside the archived reader capture, whose code examples are truncated.

## What It Is

A design for producing model outputs that conform to a developer-supplied JSON Schema, both for tool arguments and structured answers. Unlike a mode that only ensures valid JSON, the intended contract controls the allowed structure and values specified by the supported schema.

## Problem and Motivation

Prompting and repeated repair attempts leave downstream workflows exposed to missing fields, invalid types, and malformed serialization. Training improves schema-following but remains probabilistic. Deterministic constraints can remove the structural failure class rather than making a second model call diagnose each malformed result.

## Mechanism as an Idea

OpenAI describes a two-part approach: train the model to understand schemas, then constrain token generation. Each supported schema is compiled into a **context-free grammar** and preprocessed into an artifact. After each generated token, the inference engine derives the valid next-token set from the current prefix and masks invalid choices to zero probability.

Grammar artifacts are cached for reuse. A context-free grammar can represent recursive structures such as nested UI trees that a finite-state grammar cannot generally express. This is a claim about language expressiveness, not proof that every conceivable JSON Schema constraint is supported.

The application still needs separate states for a completed structured result, safety refusal, and interrupted generation. A constrained result can have structurally valid but false values; schema adherence does not establish mathematical correctness, source grounding, task completion, or permission to execute a proposed action.

## Results and Admissions

On OpenAI's complex-schema evaluation, the August 6 GPT-4o model achieves **93%** without the deterministic constraint and **100%** with it. The older June 2023 GPT-4 model is reported at **less than 40%**. The result measures schema following on an undisclosed vendor evaluation, not overall reliability or downstream agent success.

As stated in the August 2024 announcement:

- Only a subset of JSON Schema is supported.
- First use of a schema incurs compilation latency: typical schemas take **under ten seconds**, while complex ones can take **up to a minute**; subsequent requests reuse the artifact.
- Refusals and outputs interrupted by token limits or other stop conditions can depart from the requested result shape.
- Parallel function calls are not covered by the strict schema guarantee described here.
- Supplied schemas are not eligible for the announcement's zero-data-retention treatment.

These are dated product boundaries, not current configuration advice. Native typed-language integrations are described as converting schemas and parsing responses automatically; they do not add a semantic correctness guarantee.

## Analyst Takeaways

1. **Prevent structural errors at generation rather than repeatedly repairing them.** Constrained decoding can remove a serialization loop, while independent validators still check meaning and admissibility.
2. **Make terminal outcome states explicit.** Refusal and interruption are not malformed successes and should not enter ordinary downstream consumption.
3. **Treat schema compilation as reusable work.** Stable contracts amortize preprocessing; rapidly changing shapes may impose cold-start cost and complicate consumer compatibility.
4. **A schema is not a policy boundary.** A permitted enum or well-typed tool argument does not establish that the proposed action is authorized or justified by evidence.

## Questions and Limitations

The source provides no dataset size, confidence intervals, independent evaluation, or semantic-accuracy comparison for its 100% claim. Its safety section describes a refusal **string**, while the limitations list describes a refusal **boolean**; the example contains a string. This is an internal documentation inconsistency, not a basis for reproducing an API contract from memory. The archived capture truncates code samples, but the canonical page supplies their complete reader text. Availability, parallel-call compatibility, retention, and latency claims should remain explicitly anchored to the August 2024 announcement.

## Vault Ideas Extracted

* [Structured Agent Communication Contracts](/vault/structured-agent-communication-contracts.md)
