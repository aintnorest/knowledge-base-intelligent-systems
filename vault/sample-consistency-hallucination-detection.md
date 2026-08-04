---
type: Synthesis
title: Sample-Consistency Hallucination Detection
description: A black-box uncertainty pattern that uses disagreement among repeated stochastic model outputs to route potentially unsupported claims for verification.
tags: [evaluation, reliability, prompting]
timestamp: 2026-07-30T17:00:00Z
---

# Sample-Consistency Hallucination Detection

When a model exposes only generated text, repeat a prompt stochastically and compare each claim in the primary response with the resulting samples. High disagreement is an uncertainty signal: route the claim to retrieval, a verifier, abstention, or human review rather than presenting it as settled.

## Practical Use

Use it as a ranking or routing layer when token logprobs are unavailable. Score claims rather than only entire documents, choose sample count against latency and cost, and calibrate thresholds on the deployment task. NLI or semantic comparison can be cheaper than asking an LLM to judge every claim-sample pair.

## Limitation

Repeated agreement is not independent evidence. It can amplify shared misconceptions, miss confident systematic errors, and flag uncommon but true facts. High-stakes and freshness-sensitive claims still need external evidence.

## Sources

* [SelfCheckGPT: Zero-Resource Black-Box Hallucination Detection](/dossiers/selfcheckgpt-zero-resource-black-box-hallucination-detection.md) — demonstrates sentence-level and passage-level scoring from repeated GPT-3 samples.
