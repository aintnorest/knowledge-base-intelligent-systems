---
type: Study Note
title: "From Prompts to Contracts: Harness Engineering for Auditable Enterprise LLM Agents"
description: Personal study notes on a contract-based harness that turns a prompt-dominant enterprise LLM prototype into a source-governed, traceable application with validated fallback composition.
resource: https://arxiv.org/abs/2607.08028v1
source: /archive/auditable-enterprise-llm-harness.pdf
tags: [agent-harness, enterprise, verification, provenance, agents]
timestamp: 2026-07-13T17:54:59Z
---

# From Prompts to Contracts: Harness Engineering for Auditable Enterprise LLM Agents — Study Notes

**Authors**: Joongho Ahn and Moonsoo Kim
**Venue**: arXiv:2607.08028v1
**Date**: July 2026
**Pages**: 32

## What It Is

This paper describes a reconstruction of an investment-briefing prototype into an auditable enterprise LLM application. Its central claim is architectural: prompts remain useful for reader-facing language, but requirements that must hold—approved-source boundaries, entity routing, claim eligibility, answer shape, trace capture, and output hygiene—should reside in versioned code and data contracts around the model.

The reference implementation is a TypeScript system over a bounded public-data slice: five Korean corporate groups, 25 listed companies, and 113 promoted source-backed claims. It is an engineering evaluation of whether defined contracts hold, not an evaluation of investment quality or the factual correctness of every claim admitted upstream.

## The Problem It Addresses

Prompt-dominant prototypes can demonstrate a useful interaction quickly, but critical product behavior tends to become implicit in a system prompt and broad retrieval context. That makes it difficult to establish which sources an answer was allowed to use, keep corporate affiliates separate, reproduce a response under the same assumptions, or show an auditor why a reader saw a particular statement.

Retrieval alone does not solve that problem. A retrieved passage can be stale, irrelevant, or cross an entity boundary, and a fluent response can attach a citation that does not support its claim. The paper therefore treats source authority and claim admission as application responsibilities rather than model behaviors.

## How the Harness Works

1. **Register sources.** A source manifest records corporate and company scope, category, public locator, status, runtime policy, provenance, and selection rule. Registration is a gate, not an unbounded document folder.
2. **Make evidence inspectable.** Extracted documents receive evidence records with file and text hashes plus page or line locations where available.
3. **Promote bounded claims.** A runtime-eligible claim is an atomic statement tied to a manifest and evidence record, scoped to one company and claim type, with a use policy and verification state. The model may phrase these claims but cannot independently admit arbitrary retrieved text as fact.
4. **Assemble under contracts.** Code resolves aliases and entity identifiers, selects a small company-scoped claim package, builds an answer plan, attaches source links and deterministic follow-ups, and records a trace of routing, source states, claim selection, planning, and validation.
5. **Separate composition from control.** A hosted model sits at a replaceable composition boundary. Its structured response is validated; unavailable or invalid output falls back to a deterministic, schema-checked composer rather than silently reaching the reader.

The maintained wiki pages in the system are useful concise context, but the paper deliberately does not make them authoritative. Manifests and source-backed claims remain the source of runtime truth because a compiled knowledge layer can omit facts.

## Results That Matter

The deterministic baseline passed all configured checks across 30 fixed scenarios: 109/109 required claim references resolved, 30/30 trace and visible-answer contracts passed, and both hygiene checks (no internal-trace leakage and preserved source links) passed in all 60 checks. Seven one-field fault injections—covering missing claims, bad routing, incomplete traces, missing answer signals, leaked internals, broken links, and latency—were each detected by the relevant validator.

The live composition-boundary check held the harness fixed while running Claude Sonnet 4, GPT-4.1 mini, and Gemini 2.5 Flash for 30 scenarios with three repeats each (270 runs). Code-owned checks for trace, internal-leak absence, source links, follow-up quality, and recommendation-language absence passed on all 270 runs. Model-composed portions varied: 234/270 live answers met the first-pass output contract, and 198/270 met every final required harness contract; invalid live outputs triggered deterministic recovery in 36 runs. The result supports separation of model-sensitive phrasing from model-independent reader protections in this specific evaluation, not a general model ranking.

In an ablation with a fixed Claude model and 120 paired runs per condition, the prompt-only path admitted 15 recommendation-language and 15 internal-trace-leak violations. The harness admitted neither and retained utility on all 120 scenarios through fallback. A deterministic external pass/redact/refuse filter also admitted no violations, but falsely refused four benign runs and blocked 28 of 30 adversarial runs, yielding reported utility of 88/120. This is evidence for the paper's particular gate-and-fallback design, not proof that all external guardrails must over-refuse.

## Analyst Takeaways

1. **Treat claim admission as a security and reliability boundary.** Provenance-bound, entity-scoped claims give retrieval and generation a constrained factual interface. A citation added after free-form generation is weaker because it does not determine what was eligible to be said.
2. **Keep policy-owning artifacts outside the model.** Source eligibility, routing, prohibited reader-facing content, trace fields, and link resolution should be deterministic and versioned when failure is unacceptable.
3. **Make the model replaceable at a narrow boundary.** Give the model a bounded package and validate its output. Record first-pass output separately from recovery and final delivered behavior so model variation is diagnosable rather than hidden.
4. **Test validators with deliberate failures.** An all-pass evaluation is uninformative unless invalid claims, routes, traces, links, and outputs are shown to fail under the expected owner.
5. **Do not mistake contract preservation for truth or usefulness.** The system can faithfully preserve an approved but incorrect claim, and the paper does not assess investment advice quality. Claim-quality review and domain evaluation remain separate work.

## Questions and Limitations

- The reference slice is bounded and uneven in depth across its five groups. Its fixed scenarios establish preservation of configured contracts, not broad enterprise transfer or production effectiveness.
- The paper does not independently validate the factual correctness of promoted claims. The source-to-claim gate makes provenance inspectable; it does not make an extraction or human judgment true.
- Hosted model results are a dated, non-bit-reproducible snapshot. Model identifiers and nondeterministic generation can change outputs after the reported run.
- Deterministic fallback protects defined answer contracts, but it needs a useful preapproved claim set and templates. It is not a substitute for coverage, freshness policy, or expert review.
- The paper evaluates public data before private documents, credentials, and operational logs. Permission propagation and operational governance need testing in a real deployment.

## Vault Ideas Extracted

* [Source-Backed Claim Admission](/vault/source-backed-claim-admission.md)
* [Validated Fallback Composition](/vault/validated-fallback-composition.md)
