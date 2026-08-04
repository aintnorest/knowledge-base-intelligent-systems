---
type: Synthesis
title: "Adversarial-ML Threat Lifecycle"
description: "Modeling adversarial-ML risk across inference inputs, training data and weights, observable outputs, and tool-connected effects, with threat-model-specific defenses and metrics."
tags: [adversarial-robustness, privacy, agent-security, evaluation]
timestamp: 2026-07-22T00:32:30Z
---

# Adversarial-ML Threat Lifecycle

Adversarial-ML security is a lifecycle problem. An attacker may manipulate an input at inference, poison training data or updates, extract a model or private training information from outputs, or exploit the model's connection to downstream tools. A defense is credible only in a stated threat model that identifies the asset, interface, attacker knowledge, budget, success condition, and operational cost.

## Threat Map

| Stage/interface | Representative risk | Needed evidence |
| --- | --- | --- |
| Input and retrieval | Evasion, jailbreak, indirect instruction injection | Attack success, false blocks, task utility, robustness to paraphrase and adaptation |
| Data and updates | Data/model poisoning, backdoors | Dataset provenance, update validation, trigger tests, clean-task regression |
| Model outputs | Extraction, inversion, membership inference | Query budget, leakage rate, privacy–utility trade-off |
| Tools and effects | Unauthorized calls, data disclosure, harmful external action | End-to-end authorization, argument provenance, containment, audit trace |

## Practical Use

Start by mapping the actual interfaces rather than selecting a fashionable benchmark. Pair preventive controls with detection and recovery: input screening, robust training, data provenance, scoped credentials, output validation, reference monitoring, sandboxing, and post-action audit have distinct jobs. Evaluate the real mediation path and report utility, latency, cost, and residual blast radius alongside attack blocks.

For LLM agents, ML-level prompt defenses do not replace execution controls. An input filter may reduce a jailbreak rate while leaving a tool able to send data through an overbroad credential. Tie the AML threat map to authorization, provenance, and containment at each irreversible effect.

## Limitations

- No aggregate robustness number transfers cleanly across attack classes, perturbation budgets, models, or deployments.
- Strong performance against static attacks can fail under adaptive attackers or a changed interface.
- A mitigation can shift risk: for example, hardening may harm clean utility or create privacy and availability costs.

## Sources

- [Adversarial Machine Learning review dossier](/dossiers/adversarial-machine-learning-review-critical-sectors.md) — attack/defense taxonomy, benchmarks, tools, and critical-domain applications including LLM-based NLP.
