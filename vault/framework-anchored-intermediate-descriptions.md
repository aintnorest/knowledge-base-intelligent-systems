---
type: Synthesis
title: Framework-Anchored Intermediate Descriptions
description: When a prompt chain asks a model to describe something and then acts on that description, naming an established analytic framework for the description bounds its vocabulary to a space the model has seen analyzed — changing what the downstream step is steered by, at no extra cost.
tags: [prompting, decomposition, in-context-learning, reliability]
timestamp: 2026-08-25T00:00:00Z
---

# Framework-Anchored Intermediate Descriptions

Many prompt chains have the same shape: step one asks the model to *characterize* something — a writing style, a codebase's conventions, a user's intent, a document's tone, a dataset's structure — and later steps act on that characterization. The characterization is usually requested open-endedly: "describe the style", "list the conventions", "summarize what this user wants."

An open-ended request leaves the model to decide what dimensions of the thing are worth naming. It will pick salient ones, and salient is not the same as relevant. The fix is small and nearly free: name an established analytic framework the description must be expressed in. "Describe the style" becomes "describe the style in terms of dimensions of register variation according to Douglas Biber." Same call, same latency; a bounded output space instead of an unbounded one.

## Why It Works

**Pretraining exposure.** A framework that is taught, cited, and written about online is one the model has seen *applied*, not just defined. Naming it retrieves a mode of analysis with worked examples behind it, rather than asking the model to invent a schema on the spot. This is the practical selection criterion: prefer frameworks with a visible public literature over in-house schemas the model has never seen, and if you must use an in-house schema, supply the worked examples the public framework would have supplied for free.

**Bounded, task-aligned vocabulary.** A good framework carves the space along the axis you care about and, just as importantly, *excludes* the axes you don't. The downstream step is steered by whatever words came out of the intermediate step, so the intermediate vocabulary is the control surface. If the description can wander into dimensions that are entangled with content, meaning, or commitments, the rewrite will follow it there.

**Inspectability.** Descriptors drawn from a named framework can be checked against that framework, aggregated across runs, and compared between prompt variants. Free-form descriptions can only be eyeballed.

## Method

1. Identify the intermediate step whose output steers a later generation. If a chain has several, find the one that carries the decision.
2. Pick a framework that (a) has real public literature the model plausibly saw and (b) is aligned with the axis you want changed and silent on the axes you want held fixed.
3. Name it explicitly in the prompt — the framework's name and its author or canonical formulation, not just a paraphrase of its categories.
4. Log the intermediate outputs and analyze their *distribution*, not just samples. Frequency comparison between the anchored and unanchored variants is the cheapest evidence that the anchor did anything.
5. Evaluate on both the axis you meant to move and the axes you meant to hold fixed. The whole claim of an anchor is that it moves one without disturbing the other, so a single-axis score cannot show it.

## Worked Instance

Register-analysis prompting for style transfer replaces STYLL's open-ended "list adjectives that describe the writing style" with "analyze the authorship style in terms of dimensions of register variation according to Douglas Biber," then condenses to adjectives and rewrites. The descriptor distributions diverge sharply: the anchored variants produce *informal, conversational, colloquial, polished, technical, polite*; the open-ended variant produces *sarcastic, humorous, opinionated, irreverent, dismissive, self-deprecating*. The second list is affective and stance-bearing — rewriting a text to be "dismissive" changes what it asserts. Meaning-preservation scores follow: roughly 2.4× higher MIS on the Reddit authorship task, with comparable style-transfer strength.

## Limitations

- **The framework has to be one the model has actually absorbed.** A niche or proprietary schema gets you a bounded vocabulary the model handles badly, which is worse than free-form. Verify by checking whether the intermediate outputs use the framework's real distinctions or just its labels.
- **Anchoring is not grounding.** The model is imitating a style of analysis, not executing the framework. Nothing guarantees the output is an analysis a practitioner of that framework would endorse.
- **A framework aligned to the wrong axis bounds you into the wrong space.** If your task's target attribute lies outside the framework's dimensions, the anchor will confidently describe the wrong thing.
- **Attribution effect vs. specificity effect is usually unmeasured.** Naming a framework also makes the prompt more specific, and published comparisons rarely separate the two. A useful control is the same prompt with the framework's categories described but its name removed.
- **Bounding can cost sensitivity at the extremes.** A framework good at distinguishing endpoints may not resolve an intermediate target that sits between its familiar poles.

## Sources

- [Steering Large Language Models with Register Analysis for Arbitrary Style Transfer](/dossiers/register-analysis-arbitrary-style-transfer.md) — Biber's multidimensional register analysis named in the prompt as the frame for exemplar style description; large meaning-preservation gains over open-ended style adjectives, with descriptor-frequency analysis as the mechanism evidence.

## Related

- [[contrastive-exemplar-characterization]] — the other lever on the same intermediate step: whether the description is absolute or expressed as a delta from the input.
- [[grounded-structured-extraction]] — the harder version of bounding an intermediate: a typed schema with verbatim-evidence checks, rather than a named vocabulary.
- [[decomposed-prompting]] — the general case of splitting a task into steps; this page is about what the steering step should be allowed to say.
