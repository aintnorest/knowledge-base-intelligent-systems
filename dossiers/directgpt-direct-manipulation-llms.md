---
type: Study Note
title: "DirectGPT: A Direct Manipulation Interface to Interact with Large Language Models"
description: Direct manipulation separates edit targets from linguistic actions, mechanically localizes replacements, and supports reusable operations and undo; a small controlled study finds faster editing without establishing general correctness.
resource: https://doi.org/10.1145/3613904.3642462
source: /archive/directgpt-direct-manipulation-llms.pdf
tags: [interaction-design, prompting, verification, evaluation]
timestamp: 2026-10-05T23:18:29Z
---

# DirectGPT — Study Notes

**Authors**: Damien Masson, Sylvain Malacria, Géry Casiez, and Daniel Vogel.  
**Published**: CHI 2024, May 11–16, 2024; archived arXiv:2310.03691v2 dated March 18, 2024.  
**Status**: Peer-reviewed CHI paper; the archived arXiv manuscript identifies the same-work ACM DOI. This is an editing interface over an LLM, not an autonomous agent evaluation.

## What It Is

A characterization and prototype of direct manipulation for LLM-generated text, code, and vector images. The artifact stays visible in its final form; physical selection specifies objects, language specifies actions, previous operations become reusable tools, and undo restores earlier artifact states. The lasting contribution is an interaction and enforcement model, not a particular chatbot wrapper.

## Problem and Motivation

Conversational editing forces people to describe both an operation and its referent in words. Repeated words, unnamed shapes, or ambiguous locations make references expensive and fragile. Asking for a local change can also regenerate unrelated material, leaving the person to inspect an entire output for collateral edits. Long conversational histories make experimentation and recovery less direct than manipulating an artifact.

## Mechanism as an Idea

- **Represent the artifact continuously.** Keep text, code, or a rendered vector image spatially stable rather than burying it among explanatory turns.
- **Separate action from target.** Selection localizes an operation; object references embedded in language identify relationships without verbose descriptions. These are different guarantees: selecting a replacement region can enforce locality, whereas referring to an object in a whole-artifact rewrite cannot.
- **Enforce local replacement outside the model.** For selected text, the model sees surrounding context but generates only the replacement. The interface splices that result into the selected region. Unselected text is preserved mechanically; semantic correctness inside the replacement remains uncertain.
- **Reify successful actions.** Separate variable objects from the action so an earlier operation can be reused on different targets. This reduces repeated articulation without making the operation deterministic.
- **Expose and reverse operations.** Highlight referenced objects while generation is pending, highlight modifications afterward, and maintain undo/redo at the granularity of the user's operation. Referenced objects are not necessarily the objects that will change: an exception clause can mention something specifically to preserve it.

The prototype uses textual identifiers to connect visible objects with the model's representation. This mapping is an additional interpretation boundary, especially for vector graphics. It deliberately does not implement every domain-specific manipulation such as resizing through custom gestures.

## Results / Admissions

A counterbalanced within-subject study recruited **12 institution-affiliated participants**, all with programming and ChatGPT experience. Each completed four editing tasks in each of three domains with both interfaces: **288 trials**. Both conditions used GPT-3.5-turbo; the baseline was a ChatGPT replica that rendered vector images but did not allow starting another conversation. Tasks were deliberately within the underlying model's capabilities, with a **three-minute trial limit**.

- Mean trial time was **56 seconds versus 117 seconds**, difference 61 seconds, 95% CI **49–71 seconds**. Excluding generation time, means were **47 versus 93 seconds**. Time-limit stops occurred in **8% versus 35%** of trials; reported times include those censored trials.
- Mean prompt count was **1.90 versus 3.67**, difference 1.77, 95% CI **1.37–2.46**.
- Mean prompt length was **5.83 versus 19.98 words**. The reported difference is **15.3 words**, but the displayed means imply **14.15**; the headline 72% shortening is approximately consistent with the means, not that difference.
- Participant-rated closeness to target was **4.84 versus 3.89 on a five-point scale**, difference 0.95, 95% CI **0.70–1.25**. The code-specific difference was only **0.10**, CI **−0.13–0.66**, p=.495. The introduction's “25% more successful” wording should not be read as an independently graded correctness rate; the quality measure is subjective closeness.
- System Usability Scale scores were **92 versus 53**, difference 39, CI **27.3–47.34**. All participants expressed a preference for DirectGPT.
- Direct mechanisms supported **84% of prompts**; **68%** were localized, **14%** included dropped object references, and **20%** reused a toolbar operation. These categories overlap.

No component ablation separates selection, mechanical locality, feedback, reuse, and undo. Learnability and exploratory behavior were proposed future evaluations, not measured benefits.

## Analyst Takeaways

1. **Intent representation can reduce uncertainty before better generation is needed.** Pointing removes referent-description work; mechanical splicing removes collateral text changes. These are distinct improvements and should be evaluated separately.
2. **An edit boundary is stronger than an instruction to respect one.** Locality can be enforced while the generated replacement is still wrong. Connect this distinction to [Review Scaffolds and Calibrated Reliance](/vault/review-scaffolds-and-calibrated-reliance.md): easier inspection is not verified correctness.
3. **Reusable operations emerge when nouns and verbs have separate representations.** An interaction can produce a stable action with new bindings rather than another history-dependent paragraph.
4. **Artifact control complements shared planning but is not the same mechanism.** [Editable Plans as Boundary Objects](/vault/editable-plans-as-boundary-objects.md) addresses coordination of intended work; this paper addresses bounded changes to already visible outputs. Neither surface grants authorization for external effects.

## Questions and Limitations

- The sample is small and technically experienced; nontechnical users and modern stronger-model baselines are untested.
- Predetermined editing targets favor local control. Open exploration or set-based targets may be easier to express linguistically than select individually.
- The baseline and bundled interface limit attribution to particular features.
- Pulsing references can falsely imply knowledge of the eventual effect. Final-form display can also omit explanations needed for consequential edits.
- Undo of a local document state is not rollback of external side effects. The study exercises no such effects.
- Faster, shorter interaction and subjective closeness do not establish error-detection accuracy, semantic preservation, or safe autonomous execution.

## Vault Ideas Extracted

* [Referent-Scoped Editing](/vault/referent-scoped-editing.md)
