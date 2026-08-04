---
type: Study Note
title: "Adversarial Machine Learning: A Review of Methods, Tools, and Critical Industry Sectors"
description: "Study notes on a broad adversarial-ML survey covering evasion, privacy, and poisoning attacks; defenses and benchmarks; and applications in safety-critical sectors."
resource: https://doi.org/10.1007/s10462-025-11147-4
source: /archive/adversarial-machine-learning-review-critical-sectors.pdf
tags: [adversarial-robustness, privacy, prompt-injection, evaluation, survey]
timestamp: 2026-07-22T00:32:30Z
---

# Adversarial Machine Learning: A Review of Methods, Tools, and Critical Industry Sectors — Study Notes

**Authors**: Sotiris Pelekis, Thanos Koutroubas, Afroditi Blika, Anastasis Berdelis, Evangelos Karakolis, Christos Ntanos, Evangelos Spiliotis, and Dimitris Askounis
**Venue**: Artificial Intelligence Review 58, Article 226 (2025)
**Pages**: 87
**DOI**: 10.1007/s10462-025-11147-4

## What It Is

This is a broad survey of adversarial machine learning (AML) that organizes robustness and privacy threats across conventional ML systems and LLM-based NLP systems. It covers attacks, defenses, robustness benchmarks, open-source tools, and four safety-sensitive domains: autonomous driving, healthcare, electrical power and energy, and language-model applications.

Its useful framing is a lifecycle rather than a one-off attack taxonomy. A deployed model can be compromised through the input it receives, the data or weights used to produce it, its observable outputs, or its connection to external tools and APIs. Evaluation must therefore state the attacker's knowledge, access path, perturbation budget, protected asset, and operational cost; clean-task accuracy alone is not a security result.

## Attack Taxonomy

The survey groups attacks into three major families. **Evasion attacks** manipulate an input at inference time, in white-box or black-box settings, to cause an incorrect model action. **Privacy attacks** include model extraction, model inversion, and membership inference, each seeking information about a model or its training data. **Poisoning attacks** alter the training data, updates, or model parameters to degrade performance or implant backdoors.

For LLM systems, the paper maps the categories to prompt injection and jailbreaks, sensitive-data extraction through model or tool behavior, and instruction-tuning or federated-learning poisoning. It reports historical attack figures for methods such as GCG, AutoDAN, PAIR, and instruction-tuning backdoors, but these measurements are tied to the studied model versions, settings, and 2023–24 defenses. They should not be read as current success rates for modern production agents.

## Defenses and Measurement

Defenses span input preprocessing and detection, adversarial training, model hardening, privacy-preserving training and serving, robust aggregation, data validation, and reactive monitoring. The survey repeatedly identifies trade-offs: more robust models can lose clean accuracy; black-box defenses can impose query and latency overhead; a remediation can introduce another privacy or reinjection risk.

It reviews metrics such as attack success rate, empirical robustness, local-loss sensitivity, and CLEVER, alongside benchmarks such as AutoAttack, RobustBench, and certified-robustness comparisons. Those metrics are not interchangeable. For instance, an attack success rate is meaningful only with a defined attack class and capability, while a robustness score can hide the number of queries, false blocks, or degradation on legitimate inputs.

## Critical-Domain Lesson

The domain chapters show why a generic "robust model" claim is inadequate. A perturbation that is tolerable in image classification can be unacceptable in a medical workflow, energy system, or tool-using language agent. In the LLM section, the paper highlights that external-tool integration expands the effect surface: an indirect prompt can move from a text-generation failure to a data disclosure or unintended action.

For agent systems, this survey supplies the ML-level threat vocabulary but not a complete execution-security architecture. Input filtering and model alignment should be combined with explicit authorization, sandboxing, provenance, secret scoping, and end-to-end tests of the tool path.

## Analyst Takeaways

1. **Start from assets and interfaces.** Map inputs, training data, weight updates, outputs, retrieval, tools, credentials, and external effects before selecting an attack or defense suite.
2. **Pair each defense with its operating cost and bypass class.** Report task utility, false positives, latency, query budget, and what happens when the defense fails.
3. **Separate privacy from integrity.** A system can resist evasion while leaking training data, or preserve privacy while accepting a poisoned update.
4. **Use domain-shaped tests.** Safety claims need executable tests for the decisions and effects that matter in the deployment, not only standard perturbation metrics.

## Questions and Limitations

- The survey's scope is intentionally broad, so reported results from varied models, tasks, threat models, and years are not directly comparable.
- Its LLM chapter predates much of the current agent-tool and execution-security literature; it should be supplemented with deployment-specific work for autonomous agents.
- The cited mechanisms are a starting taxonomy, not evidence that a particular product is safe.
- Robustness methods can shift risk rather than remove it; clean accuracy, privacy, availability, and operational burden need joint measurement.

## Vault Ideas Extracted

* [Adversarial-ML Threat Lifecycle](/vault/adversarial-ml-threat-lifecycle.md)
