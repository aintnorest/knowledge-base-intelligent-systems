---
type: Study Note
title: "We improved 15 LLMs at coding in one afternoon. Only the harness changed."
description: Can Bölük's first-party edit-interface experiment using content-hash line anchors to reduce copying and detect stale edits, with narrow benchmark and inconsistent reported counts.
resource: https://stencil.so/blog/the-harness-problem
source: /archive/hashline-harness-problem.html
tags: [agent-harness, coding-agents, tool-use, reliability, evaluation, agents]
timestamp: 2026-10-04T05:19:39Z
---

# The Harness Problem — Study Notes

**Author**: Can Bölük, author of the OMP harness's hashline edit tool  
**Published**: February 12, 2026  
**Evidence type**: First-party engineering experiment and argument for open, model-agnostic harnesses; not peer-reviewed.

## What It Is

An experiment changing the edit interface while retaining coding models: short content hashes accompany observed line numbers, and edits reference those identifiers instead of reproducing old source text. The source's central claim is that apparent coding weakness can actually be failure to express a change through the harness.

## Problem and Motivation

Exact search-replace requires reproducing whitespace and identifying a unique match. Patch grammars add structural constraints that models may not have learned. Both can spend an episode on retries rather than repair. The author reports patch failure rates of **50.7% for Grok 4** and **46.2% for GLM-4.7** in this benchmark. Claims about providers biasing decoding for proprietary patch formats are explicitly speculative, not established implementation facts.

## Mechanism as an Idea

Reads and searches expose each line with a short, **2–3-character content hash** beside its position. The agent names the observed anchors and supplies replacement text; it need not regenerate the old block. The tool checks that referenced content still matches and rejects stale edits before mutation. This separates *locating observed text* from *writing new text*.

The article itself says hashes “optimistically” will not match after a change. Short hashes are not collision-free, and matching an anchor does not prove semantic understanding, full surrounding-context inspection, or authorization. The portable idea is optimistic state checking coupled to a low-copy edit interface, not the particular short-hash length.

## Results and Admissions

Fixtures select React source files, introduce mechanically reversible mutations, and provide natural-language descriptions often naming the file and function. The benchmark uses **three runs × 180 tasks**, fresh sessions and temporary workspaces. Success compares the final file with the original before and after formatting; it is not an execution-based behavioral oracle. Sixteen models are compared across patch, replacement, and hashline interfaces.

The revised chart reports hashline beating patch for **14/16 models**, an average gain of **15 points**, and a second hashline revision improving **12/16** further; the largest revision gain is **GPT-5.1 Codex Mini, 60.0% to 77.5%**. Output-token changes are not uniformly favorable: the chart shows **−61% for Grok 4 Fast**, but **+26% for GPT-5.2 Codex** and **+20% for DeepSeek V3.2**. DeepSeek's chart delta against patch is **−5 points**.

The prose reports **Grok Code Fast 1 rising from 6.7% to 68.3%**, approximately tenfold. That is a **61.6-point** change, whereas the chart reports **+64.6**; the article does not reconcile this discrepancy. The title says 15 improved models while the revised caption says 14/16 beat patch. It also says “four tools” but lists only read, edit, and write. These are source inconsistencies, not corrected measurements. The author estimates approximately **$300** spent benchmarking and no training compute.

## Analyst Takeaways

1. **Do not confuse repair reasoning with edit serialization.** A model/interface pairing can suppress useful capability through mechanical failure.
2. **Bind mutations to observed state.** Content-sensitive anchors can reject stale operations while avoiding repeated old-code payloads; the strength of that check depends on collision and scope choices.
3. **Evaluate success and recovery cost together.** Higher task scores do not guarantee lower output usage for every model.
4. **Keep benchmark and production claims separate.** A named-location reversible mutation task provides interface evidence, not proof of repository-scale correctness or safe concurrent editing.

## Questions and Limitations

The author designed both the tool and benchmark. The article links code and per-run reports but gives no uncertainty intervals, independent replication, or behavioral tests in the account itself. Exact original-file matching may reject an alternative correct fix. Its broad statement that most practical failures happen in the harness is stronger than the experiment establishes. Provider access disputes are first-person reports, not controlled evidence about policy motives. The archived article includes later chart revisions whose timing is not identified; do not treat every displayed result as an unchanged February measurement.

## Vault Ideas Extracted

* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
