---
type: Study Note
title: "What Prompts Don't Say: Understanding and Managing Underspecification in LLM Prompts"
description: Requirement-level experiments show that inferred defaults are fragile across prompt and model changes, while explicit instruction overload makes selective, requirements-aware optimization preferable to specifying everything.
resource: https://doi.org/10.18653/v1/2026.findings-acl.441
source: /archive/prompt-underspecification-what-prompts-dont-say.pdf
tags: [requirements-engineering, prompting, prompt-optimization, evaluation, reliability, agents]
timestamp: 2026-10-05T21:49:23Z
---

# What Prompts Don't Say — Study Notes

**Authors**: Chenyang Yang, Yike Shi, Qianou Ma, Michael Xieyang Liu, Christian Kästner, and Tongshuang Wu; Carnegie Mellon University.  
**Published**: First posted May 19, 2025; archived arXiv revision 3 dated April 24, 2026. Publisher version appeared July 2026.  
**Status**: Peer-reviewed publication in *Findings of the Association for Computational Linguistics: ACL 2026*, pages 9072–9101. This dossier reads the archived arXiv manuscript, not the publisher PDF; [publisher metadata](https://aclanthology.org/2026.findings-acl.441/) establishes the DOI for the same work.

## What It Is

A requirement-level study of **underspecification**: omission of essential constraints leaves multiple valid but incompatible behaviors available to an LLM. The target is an application developer whose prompt must work across many inputs and future model versions, rather than a one-off user who can accept one satisfactory response. The paper studies both default behavior and interventions that select or rewrite explicit requirements.

## Problem and Motivation

A prompt can look detailed while omitting consequential behavior: a trip advisor might follow tone and transaction restrictions yet omit visa or weather warnings. Inspecting a few outputs misses rare, conditional, or hard-to-recognize failures. Meanwhile both prompts and model checkpoints change, so yesterday's satisfactory default can disappear without any explicit requirement having changed.

The central distinction is between the **full requirement set used to evaluate the application** and the **subset put in the model's prompt**. These should not be treated as the same artifact. An omitted instruction may be an intentional optimization; an omitted acceptance check conceals drift.

## Mechanism as an Idea

The primary experiment curates **60 requirements across three tasks**: code explanation, travel advice, and product descriptions. Existing prompts, model-assisted brainstorming, and observed error analysis contribute requirements; human selection retains 20 per task. Each task uses 200 examples divided into 30 training, 70 validation, and 100 test examples. Cyclic prompt construction varies which requirements appear while balancing their frequency. Requirement-specific Python or LLM validators score outputs, including requirements absent from the prompt.

Two optimizers use the entire tracked requirement set as their objective:

- **Requirements-aware rewriting (COPRO-R)** supplies per-requirement evaluation rather than a generic score of compliance with the current prompt. Reorganization, merging, and selective omission can improve instruction following.
- **Requirement-subset search** treats each requirement's explicit inclusion as a binary decision and uses Bayesian optimization to search combinations. Requirements already satisfied by default need not consume instruction capacity, but remain in the evaluator.

The proposed wider lifecycle—discover requirements, validate the validators, monitor all requirements, and reselect explicit instructions after changes—is a research agenda, not an evaluated developer workflow.

## Results and Admissions

**Defaults often work, but not reliably.** A requirement is considered successfully guessed when unspecified satisfaction reaches at least approximately **98%**. Across the main setting, **41.1%** of unspecified requirement cases meet that threshold; at least one model–prompt combination guesses **65%** of requirements. Format requirements are easier (**70.7%**) than conditional ones (**22.9%**). Unspecified satisfaction is on average **22.6 percentage points** below specified satisfaction.

**Instability is requirement-level, not a universal task failure multiplier.** Unspecified accuracy has **8.9 percentage points** standard deviation across prompts, over twice the specified variation. Across within-family model-version comparisons, **5.9%** of unspecified cases lose more than 20 points versus **3.0%** of specified cases. The “2×” headline refers to these contrasts, not to doubling every application's failure probability.

**More explicit instructions can reduce compliance.** Individually specified requirements average **98.7%** satisfaction. With 19 requirements together, average specified satisfaction falls to **85.0% for GPT-4o** and **79.7% for Llama-3.3-70B-Instruct**. **37.5%** of requirements decline by more than five points from one to 19 instructions. Some requirements conflict, but instruction overload also appears without obvious conflict.

**Optimization benefit depends on the budget comparison.** On the three main tasks with Llama-3.3-70B-Instruct, requirements-aware methods gain an average **4.8 points**: approximately **5.8** for COPRO-R and **3.8** for subset search, with the latter reducing prompt tokens **41–45%**. Dynamic optimizers initially receive nine candidate prompts. Appendix C.4 gives generic COPRO **60 iterations** to match COPRO-R's roughly **$5 per run** budget on code explanation: it then trails by only **0.2 points**, while taking **2.8× longer**. Requirement-specific evaluation improves the allocation of search and feedback, not demonstrated unconditional superiority at equal money.

**Additional settings support the direction, not universal magnitude.** Two added tasks show specified versus unspecified satisfaction **83.6% versus 59.5%**, and a drop from **95.0% to 78.5%** with one versus 19 instructions. A website-generation case using 25 requirements raises judged requirement accuracy from **44.1% to 53.5%** with COPRO-R and **47.4%** with subset search; the latter reduces prompt tokens **71.9%**. This case judges generated repositories rather than independently establishing functional correctness.

Validators achieve **95.6% human agreement** on 1,095 sampled judgments; that is not perfect oracle authority. The main experiment is expensive—over 1.5 million LLM calls—and there is no user study or direct developer-workflow integration.

## Analyst Takeaways

1. **Retain a complete acceptance model without forcing every constraint into every prompt.** This adds a requirement-set axis to [Prompt Contingency](/vault/prompt-contingency.md): a shortened prompt can improve current compliance while increasing reliance on checkpoint-specific defaults.
2. **Default behavior is a versioned dependency.** Migration checks must include omitted requirements, especially conditional constraints, rather than only proving that the new model follows visible instructions.
3. **Clarification and prompt optimization solve different gaps.** [Clarification Need Decision](/vault/clarification-need-decision.md) concerns acquiring intent only the user can supply. Here many requirements are already known; the problem is communicating and monitoring them without overload.
4. **Good specifications need independent evaluation.** [Machine-Readable Agent Specifications](/vault/machine-readable-agent-specifications.md) and [good-spec guidance](/dossiers/good-spec-ai-agents.md) provide structure and authority, but a well-formed requirement document does not establish that a model obeys every item simultaneously.

## Questions and Limitations

- The requirements are plausible curated preferences, not a universal correct specification for each task. Equal average satisfaction can hide a critical safety regression behind several cosmetic gains.
- Synthetic prompts and small task sets constrain ecological validity. The agentic website case does not establish repository-scale software correctness or production improvement.
- Validator biases and requirement ambiguity remain; human agreement on sampled outputs does not guarantee unseen-case validity.
- Internal discrepancies should not be silently reconciled: the main text reports **7.9% versus 0.8%** conflict-controlled variation, while Appendix C.3 says **7.1% versus 0.8%**. Figure 16 calls its example COPRO-optimized although the surrounding discussion uses it to illustrate COPRO-R. These do not erase the directional findings but limit precise attribution.
- Deliberately omitted constraints require continuous checks. An optimization that removes an instruction today may need to restore it after a checkpoint or application-distribution change.

## Vault Ideas Extracted

* [Instruction-Density Compliance Decay](/vault/instruction-density-compliance-decay.md)
* [Clarification Need Decision](/vault/clarification-need-decision.md)
* [Prompt Contingency](/vault/prompt-contingency.md)
* [Prompt–Model Drift](/vault/prompt-model-drift.md)
