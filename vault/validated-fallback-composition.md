---
type: Synthesis
title: Validated Fallback Composition
description: Treating model-generated phrasing as a replaceable component behind an output contract, with deterministic validation, traceable recovery, and a safe preapproved fallback.
tags: [agent-harness, verification, reliability, evaluation]
timestamp: 2026-07-13T17:54:59Z
---

# Validated Fallback Composition

Validated fallback composition confines an LLM to a replaceable language-composition boundary. The system gives the model a bounded, approved content package, validates its response against a reader-facing contract, and routes invalid or unavailable output to a deterministic fallback. It records whether the live model succeeded, why it did not, and what the reader ultimately received.

## Method

1. Assemble the content package outside the model: resolve scope, select approved evidence or claims, build required answer sections, and attach permitted citations and follow-ups.
2. Ask the model only to compose within a structured response contract.
3. Validate the returned object before delivery: schema and required sections, source-reference preservation, link resolution, prohibited-content checks, and other product-specific rules.
4. When validation or the provider call fails, use a preapproved deterministic composer, retry, or escalate to review according to the risk and utility policy.
5. Store an audit record that distinguishes model output, validation findings, recovery path, and final delivered result. Evaluate each stage separately so fallback does not disguise model regressions.

## Practical Use

This pattern works when free-form phrasing is helpful but the application has non-negotiable requirements: source links must survive, internal identifiers cannot appear, an answer needs a fixed structure, or regulated language must be excluded. A deterministic fallback is often preferable to a blanket refusal when it can provide a useful, bounded answer from the same approved package.

Test with valid scenarios, model substitutions, and deliberate malformed, leaking, missing-citation, and prohibited-language outputs. Track first-pass rate, recovery frequency, final delivery status, and false-block or false-refusal rates separately.

## Limitations

- A fallback only protects the conditions it actually checks and the content it can compose. It cannot compensate for false or stale approved inputs.
- Overly strict contracts can suppress useful explanation; overly loose contracts can let a formally valid but misleading answer through.
- Recovery can conceal a declining model unless first-pass failures are retained and alerted on.
- Deterministic templates can be brittle or low-utility for open-ended questions, so the fallback policy should be scoped by task risk and supported coverage.

## Sources

- [From Prompts to Contracts: Harness Engineering for Auditable Enterprise LLM Agents dossier](/dossiers/auditable-enterprise-llm-harness.md) — validates live composition against source, trace, hygiene, and language contracts, records recovery, and uses deterministic composition when live output is invalid or unavailable.
