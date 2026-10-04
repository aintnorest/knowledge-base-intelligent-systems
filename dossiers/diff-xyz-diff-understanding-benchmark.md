---
type: Study Note
title: "Diff-XYZ: A Benchmark for Evaluating Diff Understanding"
description: A controlled code-diff benchmark separating application, reversal, and generation, with model- and task-dependent edit-format effects.
resource: https://arxiv.org/abs/2510.12487v2
source: /archive/diff-xyz-diff-understanding-benchmark.pdf
tags: [benchmark, evaluation, coding-agents, tool-use, agent-harness, agents]
timestamp: 2026-10-04T05:19:39Z
---

# Diff-XYZ: A Benchmark for Evaluating Diff Understanding — Study Notes

**Authors**: Evgeniy Glukhov, Michele Conti, Egor Bogomolov, Yaroslav Golubev, and Alexander Bezzubov (JetBrains Research)  
**Status**: arXiv revision 2, November 17, 2025; paper identifies the NeurIPS 2025 workshop *Deep Learning for Code in the Agentic Era*. This is workshop research, not a NeurIPS main-conference result.

## What It Is

Diff-XYZ isolates three unknowns in the relationship between old code, new code, and their diff: applying a supplied change, reconstructing the old version from the new version and change, and generating a change from the two versions. It studies representation handling rather than asking models to discover what repair is needed.

## Problem and Motivation

End-to-end repair scores conflate retrieval, reasoning, patch syntax, application, and semantic correctness. A patch may express the right intended change but fail to parse or locate its target. A lightweight probe can identify this mechanical bottleneck before expensive repository-level evaluation.

## Mechanism as an Idea

The dataset contains **1,000 single-file edits**, **200 each** in Python, JavaScript, Java, Kotlin, and Rust, drawn from CommitPackFT and spanning **891 repositories**. Filtering excludes binaries, generated/vendor code, and whitespace-only changes; files have 40–1,000 lines in at least one version. Sampling targets equal single-/multi-hunk shares and a 40/40/20 small/medium/large change distribution; repository contributions are capped at five.

Application and reversal compare reconstructed code with the target after removing whitespace-only lines. Generation is assessed through parseability, applicability, exact target reconstruction, line-set overlap, and addition/deletion F1. Numeric hunk headers are ignored when unnecessary; ambiguity requiring them occurs in less than 1% of the dataset. Consequently, this is not strict byte-for-byte fidelity or a standard patch-utility acceptance test.

The cross-format experiment compares ordinary unified diffs, unified diffs without numeric headers, verbose line-marker variants, and search-replace blocks. Each gets a format description and example. The proposed mechanism is reduction of global bookkeeping: independent replacements avoid predicting line counts and coordinating hunk structure. Numeric headers may nevertheless provide familiar ordering scaffolding, so simply removing them need not help.

## Results and Admissions

For unified-diff generation, explicit format instructions raise GPT-4.1 exact-match-after-application from **0.34 to 0.76**, parsing from **0.43 to 0.99**, and application from **0.36 to 0.79**. Yet the same format description lowers its application-task exact match from **0.92 to 0.81**: it sometimes emits a diff instead of the requested code. GPT-4o-mini's application exact match falls from **0.70 to 0.05** under that description. More instruction is not monotonically better.

In the separately prompted cross-format comparison, search-replace generation exact match is **0.95 versus 0.81 unified diff for GPT-4.1**, **0.94 versus 0.82 for Claude 4 Sonnet**, and **0.68 versus 0.23 for Qwen2.5-Coder-32B**. But GPT-4.1 nano reverses the direction: **0.07 search-replace versus 0.50 unified diff**. The verbose marker format generally hurts. Small open models remain weak despite representation changes; the 0.5B model scores zero generation exact match across formats.

These tables use different prompt conditions and should not be combined as a single format-only comparison. The discussion's mechanisms are hypotheses, not independently established causal explanations.

## Analyst Takeaways

1. **Probe mechanical editing separately from task reasoning.** Parsing, application, and exact reconstruction diagnose different failures than passing repair tests.
2. **Choose formats by model and operation.** Generation, application, and reversal can favor different representations; a default successful for a large model can harm a small one.
3. **Reduce bookkeeping, but preserve useful learned scaffolding.** Counts and headers impose work while also carrying familiar structure; ablate instead of assuming simplification wins.
4. **Test prompt interactions.** A format description can fix generation while confusing the requested output type in another task.

## Questions and Limitations

All experiments use non-reasoning models with greedy single-pass decoding. There are no tools, iterative recovery, repository retrieval, multi-file edits, or downstream tests. The authors explicitly leave quantitative links to production repair and review performance for future work. Whitespace stripping and unique-line metrics conceal some formatting, multiplicity, and ordering errors. AST patches and content-hash anchors are not evaluated, so the results cannot rank those interfaces.

## Vault Ideas Extracted

* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
