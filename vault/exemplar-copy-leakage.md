---
type: Synthesis
title: Exemplar Copy Leakage
description: When the thing an output is scored against is also sitting in the prompt, a model can score well by copying it — so any similarity-to-reference metric in an exemplar-conditioned pipeline needs a companion overlap-against-exemplar measurement to stay interpretable.
tags: [evaluation, prompting, in-context-learning, verification]
timestamp: 2026-08-25T00:00:00Z
---

# Exemplar Copy Leakage

A pipeline shows the model an exemplar and asks it to produce something *like* the exemplar. It then scores the output by similarity to that exemplar. The shortest path to a perfect score is to emit the exemplar.

Models rarely copy wholesale — the instruction says "rewrite", and the output looks like a rewrite. What happens instead is partial: distinctive phrases, named entities, and closing lines migrate from the exemplar into the output. Similarity-to-exemplar rises. The style metric reports success. Nothing in the metric distinguishes a genuine stylistic transformation from content lifted off the reference.

This is a measurement failure before it is a generation failure. The metric and the prompt share an artifact, so the metric cannot see the shortcut.

## The Check

Report a second number alongside the similarity score: **lexical overlap between the output and the exemplar**, lower is better. ROUGE-1/2/L against the exemplar as reference is sufficient and cheap. ROUGE-2 is the more sensitive of the three, because copied material shows up as shared bigrams long before it shows up as shared unigrams.

Read it as a validity gate, not as a quality score. A system whose overlap is several times its peers' has not earned its similarity score, and its similarity number should not be compared to theirs at all.

Two supporting signals corroborate a copying diagnosis cheaply:

- **A fluency metric that tracks the exemplar's own fluency.** Where exemplars are concatenated or otherwise incoherent, a copying system inherits that incoherence. A grammatical-acceptability score that drops toward the exemplar's while rising for non-copying systems is strong secondary evidence.
- **Read the outputs.** Copied material is usually obvious to a human in a handful of samples, and identifies *which* parts travel.

## Evidence

Across three style-transfer tasks, the simplest baseline — a one-line "rewrite this into the style of the target" — repeatedly landed on the Pareto frontier and beat elaborate methods on style-transfer strength. Its overlap-against-exemplar told the other story: ROUGE-1 of 0.343 on Reddit authorship imitation against 0.107–0.145 for the methods it "beat", and 0.864 ROUGE-1 / 0.832 ROUGE-2 on paragraph-level simplification — that is, mostly reproducing the target. Its grammatical-acceptability score also collapsed to 0.537 where the non-copying systems scored ~0.95, mirroring the near-zero acceptability of the concatenated exemplars themselves.

Without the overlap column, that baseline reads as state of the art.

## Practical Use

The pattern generalizes past style transfer to anything where the scoring reference is visible to the generator:

- **Retrieval-augmented generation** scored on similarity to retrieved passages — extraction and synthesis become indistinguishable.
- **Few-shot generation** scored against outputs drawn from the same distribution as the demonstrations.
- **Judge prompts** given a reference answer and asked to rate a candidate, where the candidate can echo the reference.
- **Templated or persona-conditioned writing** where a style guide's own examples appear in the finished artifact.

Design rules that follow:

- Never report a similarity-to-X metric without an overlap-with-what-was-in-the-prompt metric, whenever X was in the prompt.
- Keep naive endpoints in the results table. `Copy` (echo the input) and `Target` (echo the exemplar) bound both axes and make a copying system visible by where it sits relative to them.
- Prefer an intermediate-representation pipeline where copying matters: methods that condense the exemplar into descriptors and then rewrite from the *input* structurally cannot copy exemplar content, because the exemplar is no longer in the final call's context.
- Treat overlap as a report axis, not an optimization target. Optimizing it directly rewards paraphrase-for-its-own-sake, and a legitimately correct output may share vocabulary with the exemplar.

## Limitations

- Lexical overlap catches literal copying only. A model that paraphrases exemplar content passes the check while still importing meaning that did not come from the input.
- There is no universal threshold. Overlap is only interpretable against the other systems in the same table and against the `Copy`/`Target` endpoints on the same data.
- Honest overlap exists. Shared domain vocabulary, entity names, and short common phrases raise the number without any copying, and short outputs are noisier.
- The check tells you a score is untrustworthy; it does not tell you what the system's real style-transfer strength is.

## Sources

- [Steering Large Language Models with Register Analysis for Arbitrary Style Transfer](/dossiers/register-analysis-arbitrary-style-transfer.md) — target-overlap ROUGE reported alongside style and meaning metrics across three tasks; demotes a naive baseline that otherwise appears to lead on style transfer.

## Related

- [[dual-surface-example-contamination]] — the same artifact-in-two-roles problem inside a prompt pipeline, where a checker's own examples define what "copied" means.
- [[intended-path-benchmark-validation]] — the general form: a metric that a system can satisfy by a route the designer did not intend.
- [[anti-leakage-evaluation]] — leakage from the other direction, where the evaluation material itself has reached the model.
