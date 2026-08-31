---
type: Synthesis
title: Distributional Normativity Blindness
description: A model trained purely to predict observed language cannot distinguish definitional regularities from normatively acceptable contingent ones from normatively unacceptable ones, because all three appear to it as the same kind of distributional evidence.
tags: [governance, reliability, evaluation]
timestamp: 2026-08-25T19:29:18Z
---

# Distributional Normativity Blindness

A system whose entire training signal is "assign high probability to observed human text" has no channel through which the *status* of a regularity can reach it. Statistical patterns arrive stripped of the distinction between what a word means, what happens to be true of its referents right now, and what is true but normatively off-limits to reason from. To the objective function these are indistinguishable; each is simply co-occurrence.

The canonical illustration uses three statements that are all statistically true of *nurse*:

| Statement | Status | Normatively usable? |
|---|---|---|
| A nurse is a healthcare worker | Definitional / conventional meaning | Yes |
| A nurse likely wears blue clothing at work | Contingent fact about the world | Yes |
| A nurse likely wears a dress to a formal occasion | Contingent fact about the world | No, in most contexts |

*nurse* co-occurring with *hospital* more than *theater* is grounded in meaning. *nurse* co-occurring with *she/her* is grounded in a society that retains gendered role expectations. Pre-training that defines quality entirely by fit to observed distribution cannot tell those two observations apart, and neither can the representations it produces.

## Why It Matters

This reframes harmful bias from a data-quality defect into a design consequence. If it were only "biased data in, biased model out," better filtering would be the fix. The stronger claim is that the *mechanism responsible for the model's power* — learning latent structure from distribution, including nth-order co-occurrence relationships between things that never appear together — is the same mechanism that absorbs harmful structure, with nothing separating the two inside the representation.

Two consequences follow:

- **Mitigation is displacement, not removal.** Interventions act on behavior or on a region of representational space without addressing why the harmful structure is there. Pressure applied at one point tends to reappear elsewhere.
- **The interesting question is normative, not statistical.** Bias in the value-free sense is essential to any useful function. The contested term is *harmful*, which requires an explicit statement of which information is off-limits for which inferences — a statement no distributional objective supplies.

## Practical Use

- When a system must not reason from a category, put that constraint somewhere it can be stated and inspected — a policy layer, an explicit representation of conventional versus conveyed meaning, a rule over inputs — rather than hoping a training-time nudge instilled it.
- Distinguish, in design reviews, between the three statement types above for the attributes your system actually keys on. Attributes in the third row need a mechanism; they will not be handled by scale.
- Treat "meaning is distribution" as an assumption with alternatives, not as a fact. The moderate reading of the distributional hypothesis — distribution as *part* of what characterizes meaning — leaves room for representations that carry status alongside statistics.
- The same distinction is already productive for *detection*: measuring where conveyed meaning departs from standing meaning is how dehumanizing usage gets identified.

## Limitations

- The claim is argued, not proven. There is no demonstration that a large pre-trained model fails to encode the distinctions somewhere, only the argument that it has neither mechanism nor incentive to, and that behavioral probes cannot settle the question.
- It is scoped to a specific configuration: general-purpose models, unsystematic large-scale human corpora, no non-textual grounding, cross-entropy objective. Curated corpora, grounded multimodal training, or architectures with explicit conventional-meaning structure fall outside it.
- It identifies where the problem lives without specifying a fix. "Represent standing meaning separately from conveyed meaning" has no accompanying architecture, objective, or evaluation.
- Who fixes the normative categories, and how they are contested and revised, is a governance problem the technical framing does not solve.

## Sources

- [Large Language Models Are Biased Because They Are Large Language Models dossier](/dossiers/llms-are-biased-because-they-are-llms.md) — Resnik's *Computational Linguistics* position paper; the *nurse* example, the distributional-hypothesis critique, and the conventional/conveyed meaning proposal.
