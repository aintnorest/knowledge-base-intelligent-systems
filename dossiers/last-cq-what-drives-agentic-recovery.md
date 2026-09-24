---
type: Study Note
title: "What Drives Recovery in Agentic Text-to-Cypher? LAST-CQ: An LLM Agent Self-Refinement Framework"
description: "Execution-grounded ablations show that detecting and routing query failures matters more than expensive synthesized feedback, while several common result metrics reward wrong answers."
resource: https://arxiv.org/abs/2609.12746v1
source: /archive/last-cq-what-drives-agentic-recovery.pdf
tags: [agents, verification, self-improvement, orchestration, evaluation, llm-as-judge]
timestamp: 2026-09-24T03:44:20Z
---

# What Drives Recovery in Agentic Text-to-Cypher? LAST-CQ: An LLM Agent Self-Refinement Framework — Study Notes

**Authors**: Ioannis Prokopiou, Athanasios Aidinis, Panagiotis-Christos Kyrmpatsos, and Pantelis Vikatos  
**Affiliations**: Athens University of Economics and Business and Orfium  
**Venue**: arXiv:2609.12746v1 [cs.AI]  
**Date**: September 11, 2026

## What It Is

An ablation of the common “generate → inspect error → explain → retry” agent loop using Text-to-Cypher against live Neo4j databases. LAST-CQ has five named roles, but the crucial question is not how many agents it has: **which feedback and routing operations actually earn their cost?** The authors run 2,471 executable questions spanning 16 domains with six frozen model backbones and compare single-pass generation, a schema-only pipeline, execution-grounded retry, raw-error retry, and matched-call-budget parallel sampling.

The parser deterministically normalizes schemas; generation makes the first model call. Validation first uses Neo4j `EXPLAIN` and `LIMIT 1`, with zero extra model calls if the query passes and returns data. A failed path may spend model calls on parsing, schema-grounded diagnostic synthesis, and correction; a query returning empty data gets a fixed set of relaxation hints and another bounded correction. A successful first try still costs exactly one LLM call. The reported budgets are two validation cycles and one relaxation pass, not unconstrained self-reflection.

## The Three Causal Comparisons

1. **With versus without correction.** Mean execution Google-BLEU moves from 0.4587 single-pass to 0.4729 with LAST-CQ+DB, a **3.1% relative gain**. A separate *rescore of the same full run* that assigns zero to corrected queries gives 0.4211; the **12.3%** gap to full is an upper-bound counterfactual, not an independently deployed no-refinement agent. Of 1,917 model–question pairs entering correction across six backbones, 1,799 recover (93.8% pooled, **91.7% unweighted per-model mean**). Recovery means the query yields a non-empty result, not guaranteed semantic correctness.
2. **Grounded synthesized hints versus raw errors.** Keep the detector, validation, routing, history, and retry budget fixed; change only the content of the correction hint. On the 1,917 corrected pairs, the source's BLEU-threshold “exact match” proxy is **20.9%** with schema-generated hints versus **19.9%** with raw error strings. Full-corpus GLEU is 0.4729 versus 0.4718. On 214 retained paired payloads from two backbones, set-F1 is **0.200** for synthesized hints versus **0.219** for raw errors; equivalence to zero is supported only within a ±0.075 F1 margin, not ±0.05. The extra diagnostic LLM call buys little on this dataset, but a small advantage remains possible.
3. **Sequential retry versus parallel candidates.** At roughly matched call budgets on two backbones, best-of-three at T=0.7 using the first non-empty candidate scores GLEU **0.3728 versus 0.4180** for GPT-4o-mini single-pass, and **0.4671 versus 0.5270** for GPT-4o. Selection is weak and temperature differs from T=0, so this does not rule out better verified sampling; it shows that more candidates without good selection are not a substitute for a failure detector.

This distinction is directly useful in a coding factory: capture compiler/test failure *and* a bounded route back into repair before spending on increasingly ornate critic explanations. But a Neo4j error and a code patch have different semantics, so do not transfer numeric effect sizes into software repair.

## The Evaluation Trap

The benchmark's execution Google-BLEU scores serialized result tokens and sometimes treats **a non-empty answer against an empty reference as perfect (1.0)**. Fully **230/1,917 (12.0%)** corrected queries have empty reference results. Removing them reverses the hint comparison: GLEU **0.350 synthesized versus 0.365 raw-error** on the remaining 1,687. On corrected retained pairs, Google-BLEU exceeds set-F1 in 65.9% of cases and *under*-scores truly set-identical results if row order differs. An evaluator can be simultaneously optimistic about wrong rows and pessimistic about equivalent orderings.

The GPT-4o-mini judge calls 88.2% of 13,563 LAST-CQ+DB outputs at least partially semantically valid, but was **not run on baseline outputs**. In 122 corrected cases independently labeled by one author blind to judge labels, the judge calls 74.6% at least partial versus the human's 65.6%, a nine-point optimism. This calibrates a concern, not a corpus-level corrected estimate.

## Analyst Takeaways

1. **Instrument loop components before buying another critic.** Distinguish detector recall, retry routing, candidate correction, and diagnostic wording with counterfactuals that hold the rest fixed.
2. **Return direct execution failures as first-class feedback.** A compile error, failing test, or database error may be sufficient for a capable corrector; add synthesized interpretation only when a measured failure slice needs it.
3. **Short-circuit successful cases.** Conditional validation kept zero extra model calls on first-pass successes; avoid an always-on evaluator tax when an independent cheap gate already passes.
4. **Specify what “success” means.** A non-empty result may be wrong, a green build may be semantically wrong, and a matched string may be right for the wrong reason. Use outcome-oriented invariants and review ambiguous cases.
5. **Compare retries with meaningful selection under matched budgets.** The tested best-of-three selector was weak and confounded with temperature, so the lesson is not that parallelism is universally bad.

## Questions and Limitations

- One Neo4j benchmark and engine, a non-empty-output recovery criterion, and incomplete full-corpus result payloads limit generalization and strong semantic claims.
- Raw-error comparison conditions on the system's own correction decisions; the two Gemini 1.5 models were retired and replaced with Gemini 2.5 Flash in *both arms* of that ablation, so its absolute figures differ from the headline table.
- The human judge calibration has one annotator, two backbones, and only retained corrected queries. No baseline human/judge arm establishes relative semantic correctness.
- The source never tests a no-feedback retry, per-hint ablation, or broader budgets; the exact contributions of fixed relaxation hints, detector, and generic retry remain partly entangled.
- The empty-reference scoring convention can reward inventing output. Before adopting an execution-grounded loop, evaluate empty-result correctness and authorization separately from mere query executability.

## Vault Ideas Extracted

* [Adaptive Runtime Agent Supervision](/vault/adaptive-runtime-agent-supervision.md)
* [Budget-Matched Harness-Evolution Evaluation](/vault/budget-matched-harness-evolution-evaluation.md)
* [LLM Evaluation Methods](/vault/llm-evaluation-methods.md)
