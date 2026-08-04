---
type: Synthesis
title: Dataset-Level Feature Discovery
description: Discovering one interpretable feature schema for a text corpus by optimizing the schema against downstream utility, coverage, and explicit resistance to target-label proxies.
tags: [prompt-optimization, evaluation, verification]
timestamp: 2026-07-13T18:05:15Z
---

# Dataset-Level Feature Discovery

Dataset-level feature discovery uses an LM to propose a *shared* typed feature schema for a labelled text corpus, realizes that schema across a representative split, and chooses schemas by their downstream utility and interpretability. It is different from asking an LM to classify each text or extract a predeclared set of fields: the thing being optimized is the reusable representation itself.

## Core Pattern

1. Declare the downstream decision, representative data split, schema constraints, and the evidence required for each extracted field.
2. Give a schema proposer a bounded sample of corpus texts and ask for named, typed, text-grounded feature definitions—not label names or conclusions.
3. Apply the candidate schema consistently to an annotation split; train or evaluate the intended downstream model on the resulting feature vectors.
4. Diagnose the whole schema with a task metric plus feature-level evidence such as coverage, importance, redundancy, stability, and a review of representative extracted values.
5. Independently score interpretability: names and descriptions should be readable, meaningful, traceable to source text, and not instructions to infer the target label.
6. Feed concrete failure evidence into the next proposal, search a budgeted set of schema/prompt candidates, and confirm the chosen schema on held-out data.

## Why It Matters

An apparently accurate extracted feature can be a disguised classifier: `sentiment_label`, `risk_score`, or an instruction to determine the answer may improve a downstream metric while eliminating the representation's analytic value. A corpus-level schema review makes that failure visible, because feature definitions, extracted values, coverage, and the downstream score can be examined together.

This also gives prompt optimization an appropriate unit of feedback. A single extraction can look plausible even when the schema is sparse, redundant, unstable, or unhelpful across the corpus. Dataset-level feedback reflects the intended reuse of the features.

## Practical Use

Use this for text-to-table analytics, triage, research coding, compliance review, and interpretable classifiers when a stable, inspectable representation matters. Keep the schema version, source sample, extraction prompt, raw text evidence, model and decoder settings, train/validation split, and all selection metrics with each run.

Require a human or policy review for features close to labels, protected attributes, decisions, or regulated outcomes. If an application merely needs the best immediate classification, a direct classifier can be simpler and more honest; do not represent its answer as an independently extracted feature.

## Limitations

- A metric plus an LM interpretability judge is not proof that a feature is faithful, causal, fair, or non-leaky. Use targeted adversarial tests and human review for consequential uses.
- Searching schema candidates is costly because each candidate must be extracted over many texts; extraction throughput often dominates the budget.
- A schema selected on one corpus, label definition, or downstream model can fail to transfer when vocabulary, policy, prevalence, or the decision objective changes.
- Restricting schema proposals to a small sample can miss rare but important phenomena; expanding the sample also expands search cost and variance.

## Sources

- [Automatic Prompt Optimization for Dataset-Level Feature Discovery dossier](/dossiers/automatic-prompt-optimization-dataset-level-feature-discovery.md) — proposes global feature definitions, extraction over an annotation split, F1/SHAP/MI/coverage feedback, an interpretability scorer that penalizes label leakage, reflection, and Bayesian search.
