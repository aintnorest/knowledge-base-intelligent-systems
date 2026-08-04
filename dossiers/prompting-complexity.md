---
type: Study Note
title: Prompting Complexity: Shortest Prompts for Texts and Behaviors in LLMs
description: Personal study notes on a theoretical framework that treats prompts as model-relative compressed descriptions of target texts and acceptable behaviors.
resource: https://arxiv.org/abs/2607.06145v1
source: /archive/prompting-complexity.pdf
tags: [prompting, prompt-optimization, evaluation]
timestamp: 2026-07-13T17:51:25Z
---

# Prompting Complexity: Shortest Prompts for Texts and Behaviors in LLMs - Study Notes

**Author**: Adrian Cosma
**Venue**: arXiv:2607.06145v1 [cs.CL]
**Date**: July 7, 2026
**Pages**: 23
**DOI**: 10.48550/arXiv.2607.06145

## What It Is

This is a theoretical paper that asks a sharp inverse-prompting question: for a fixed instruction-tuned language-model interface, what is the shortest plausible human-readable prompt that makes deterministic decoding emit a target text? It calls that token length *prompting complexity*.

The paper treats a prompt as a program and the deployed model as its interpreter. Information omitted from the prompt is supplied by the particular model's weights, training distribution, tokenizer, chat template, fixed system context, and decoding rule. A short prompt that produces a long completion is therefore a kind of compression, but only relative to that particular interface.

The contribution is a vocabulary and set of formal definitions, not an empirical estimator or a benchmark result. It also extends the core idea to approximate output matching, cause-based text comparison, and behavior classes judged acceptable by an evaluator.

## The Central Definition

For a fixed model interface \(f\), let \(P_K\) be the set of plausible texts within a finite context bound. For a target text \(t\), prompting complexity \(\Psi_f(t)\) is the length of the shortest plausible prompt \(p\) such that greedy (temperature-zero) decoding produces exactly \(t\). If no such plausible prompt exists, its complexity is infinity.

This is deliberately not ordinary Kolmogorov complexity:

- The “machine” is a particular LM, not a universal computer.
- Candidate programs are plausible natural-language texts rather than arbitrary bit or token strings.
- Model, tokenizer, template, and decoding rule are part of the definition.
- The quantity is computable in principle only because the paper assumes a finite context and a halting bounded generator; exhaustive enumeration remains infeasible.

The paper defines plausibility with a model-dependent nucleus constraint: each token in a candidate text must occur within a high-probability nucleus set under a fixed temperature and threshold. That excludes deliberately nonsensical token artifacts from the prompt search space, aiming to keep the notion aligned with ordinary prompt engineering.

## What Follows From Model Dependence

The most important theoretical result is a failure of the usual invariance intuition. There is no model-independent additive constant relating two models' prompting complexity for all texts. A text can be cheap for one model because it is memorized, strongly represented, or retrievable from a short cue, yet require a long prompt—or have no plausible generating prompt—for another model.

That makes the measure an accessibility property, not an intrinsic measure of a text's difficulty or informational content. A difficult legal argument can have low prompting complexity if a model already contains and reliably elicits its structure; a trivial-looking response can be hard to reproduce exactly because of decoding or instruction-following quirks.

The paper also gives a counting argument: for a deterministic model, highly prompt-compressible long texts must be rare because each short prompt can produce only one output. It defines a model-relative prompting probability that sums length-weighted prompt preimages and relates that quantity to ordinary model probability in a weak coding theorem.

## Relaxed Outputs, Causes, and Behaviors

Exact string reproduction is usually the wrong practical target, so the paper develops three extensions:

1. **Soft prompting complexity** minimizes prompt length subject to an output-distance threshold. It frames prompt optimization as finding a short prompt that produces an output good enough under a chosen metric, rather than an exact copy. The distance can be edit distance, semantic distance, or another explicitly chosen criterion.
2. **Prompting distance** compares two outputs through the distance between their shortest approximate generating prompts. The point is to distinguish similarity of effects from similarity of causes: nearly identical outputs can need very different instructions, while visibly different outputs can arise from a small prompt edit.
3. **Behavioral prompting complexity** replaces one target string with an accepted set of outputs. A prompt succeeds when its deterministic output belongs to a behavior class—for example, passes tests, follows a policy, receives a favorable grade, or refuses a request. The paper models a judge prompt as defining that accepted set.

For behavioral complexity, enlarging the accepted set cannot make the shortest successful prompt longer. The paper also separates the cost of stating a specification from the additional prompt needed to satisfy it, but emphasizes that the shortest successful prompt need not literally include the specification.

## Why It Matters for Prompt Engineering

The framework reframes prompt optimization as an inverse search problem. Existing optimizers can be understood as practical, gradient-free attempts to find upper bounds on relaxed prompting complexity: they find a short acceptable prompt, but do not prove it is shortest. This makes the evaluation target more explicit: choose the model interface, define acceptable output distance or behavior, then account for prompt length alongside quality.

It also offers a more precise language for several neighboring problems:

- **Synthetic data** may be long on the surface yet have a short description relative to its generator, prompts, and sampling process. That does not make it useless; it can still reweight capabilities or transfer structure to another model.
- **In-context learning** changes conditional prompting complexity: demonstrations or domain context already in the context may reduce the additional prompt needed for a target.
- **Prompt inversion** seeks plausible prompt preimages of an observed output, not hidden-state inversion or model stealing.
- **Safety and jailbreak resistance** can be phrased as making harmful outputs hard or impossible to reach from short plausible prompts. The relevant adversary searches for a preimage rather than samples randomly from the model.

## Analyst Takeaways

1. **Treat a prompt claim as interface-specific.** A shortest or effective prompt is inseparable from the exact model version, tokenizer, template, system prompt, decoding parameters, and output criterion. “This prompt is compact” has little meaning without those conditions.
2. **Optimize for the accepted region, not necessarily a reference string.** For production tasks, a behavior specification or task metric is usually more honest than exact-output imitation. The metric and threshold become part of the prompt-design problem.
3. **Short-prompt search and low prompt cost are different claims.** Finding a compact prompt may require expensive search, long reasoning traces, many evaluations, or high output cost. A deployment objective should charge those costs if they matter.
4. **Safety requires realistic prompt domains.** Excluding obvious glitch strings can be useful for a human-facing notion of prompting, but ordinary-looking roleplay or contextual attacks may remain plausible. A plausibility filter alone is not a jailbreak defense.

## Limitations and Open Questions

- The definitions rely on a finite, fixed, deterministic interface and a model-dependent plausibility set. Real APIs can change models, hidden templates, sampling behavior, or tool availability; the paper explicitly excludes external tool calling.
- Exact enumeration is computationally infeasible at realistic context sizes. Empirical studies can only produce found-prompt upper bounds, restricted-search lower bounds, or probabilistic estimates.
- The paper does not empirically validate a practical estimator, a prompting-distance application, or a safety intervention. Its research agenda asks how to estimate the quantities, compare them with instruction following, and assess sensitivity to an LM judge's specification.
- A judge-defined behavior class inherits judge error and ambiguity. A measured behavioral complexity can reflect weaknesses in the rubric or judge as much as properties of the generator.
- Token count is not total serving cost. The paper notes that reasoning tokens, output length, latency, and wall-clock time would need a resource-sensitive extension.

## Vault Ideas Extracted

* [Prompting Complexity](/vault/prompting-complexity.md)
* [Behavioral Prompting Complexity](/vault/behavioral-prompting-complexity.md)
* [Prompting Distance](/vault/prompting-distance.md)
