---
type: Synthesis
title: Repeated-Compaction Evaluation
description: Evaluating memory policies over many consolidation cycles, including recovery of discarded evidence, rather than judging one post-compression snapshot.
tags: [compaction, evaluation, agent-memory, long-horizon, retrieval, agents]
timestamp: 2026-07-13T17:51:09Z
---

# Repeated-Compaction Evaluation

One-shot compression tests miss a distinctive long-horizon failure: a lossy output becomes the input to the next lossy operation. A fact omitted from one agent summary cannot influence the next summary, and an incorrect reflection can be reinforced by subsequent retrieval and consolidation.

## What to Measure

- Sweep the number of compaction events while holding an explicit memory budget.
- Ask end-task questions about facts distributed across the full history, including details omitted from the active representation.
- Measure whether the system can recover a late-needed fact from an archive or high-fidelity tier.
- Compare retention-confidence estimates with actual post-compaction accuracy.
- Report quality together with latency, memory, retrieval cost, and total consolidation cost.

Plotting error or fact recall against compaction count distinguishes a system that merely starts compact from one that remains reliable as memory is reused. A retrieval-backed design should be tested for a flatter degradation curve than destructive summary replacement, not assumed to have one.

## Practical Use

Build long-horizon fixtures with known facts, dependencies, and updates. Periodically compact working state, then test immediate recall, delayed recall, and recovery after a deliberately late query. Include both redundant material and high-information exact details so a favorable average does not conceal a catastrophic tail case.

## Limitations

Synthetic fact recall cannot cover all agent failures, and test designs can make retrieval artificially easy through lexical cues. Use latent or paraphrased associations, realistic tool traces, and task completion measures alongside controlled probes.

## Sources

- [What to Keep, What to Forget dossier](/dossiers/rate-distortion-memory-compaction.md) — proposes repeated-compaction measurement in COMPACT-Bench and reports a reference comparison of archival retrieval with repeated summary replacement.
