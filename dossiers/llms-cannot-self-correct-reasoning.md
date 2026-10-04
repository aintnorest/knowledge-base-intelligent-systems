---
type: Study Note
title: Large Language Models Cannot Self-Correct Reasoning Yet
description: ICLR 2024 experiments separate intrinsic revision from oracle-guided correction, matched-budget sampling, and improved instructions, showing that unsupported critique can turn correct answers into errors.
resource: https://arxiv.org/abs/2310.01798v2
source: /archive/llms-cannot-self-correct-reasoning.pdf
tags: [reasoning, verification, evaluation, multi-agent, agents]
timestamp: 2026-10-04T06:15:44Z
---

# Large Language Models Cannot Self-Correct Reasoning Yet — Study Notes

**Authors**: Jie Huang, Xinyun Chen, Swaroop Mishra, Huaixiu Steven Zheng, Adams Wei Yu, Xinying Song, and Denny Zhou; seven authors affiliated with Google DeepMind, with Huang also at the University of Illinois Urbana-Champaign. Huang and Chen contributed equally.  
**Venue**: ICLR 2024, peer-reviewed conference paper; archived arXiv revision 2 dated March 14, 2024.

## What It Is

A critical evaluation of **intrinsic self-correction**: a model critiques and revises its own reasoning without new external feedback. The paper distinguishes that setting from revision informed by correctness labels, tool execution, humans or separate trained critics. Its title is a dated empirical claim about the tested methods and models, not an impossibility theorem about all future self-correction.

## Problem and Motivation

Reported refinement gains can combine several effects: more samples, privileged correctness information, additional task instructions and genuine error recognition. If these are not separated, a loop appears able to detect its own mistakes when an external oracle actually decides which outputs to preserve.

## Mechanism as an Idea

An initial answer is followed by critique and regeneration, for up to two rounds. Oracle-guided runs retain a correct answer by consulting ground truth; intrinsic runs must decide whether to revise without that information. Counting correct-to-incorrect and incorrect-to-correct transitions exposes the central bottleneck: deciding when the original answer should be protected.

The study uses GSM8K's **1,319 questions**, CommonSenseQA's **1,221-question development set**, and a **100-question closed-book HotpotQA** sample. GPT-3.5 uses the full evaluation sets; other models use 200-question math/commonsense subsets and 100 HotpotQA questions where evaluated. A second experiment compares same-model multi-agent debate with majority voting under matched response counts. A third supplies the full task constraints upfront instead of withholding them until critique.

## Results and Admissions

- GPT-3.5 GSM8K improves from **75.9% to 84.3%** with oracle-guided correction, but falls to **75.1% after one intrinsic round and 74.7% after two**. CommonSenseQA falls from **75.8% to 38.1% and 41.8%**, respectively.
- GPT-4 GSM8K falls from **95.5% to 91.5% and 89.0%** intrinsically; its oracle result is **97.5%**. HotpotQA goes from **49.0% to 43.0%** after two intrinsic rounds, versus **59.0%** with oracle guidance.
- GPT-4-Turbo GSM8K goes from **91.5% to 90.0%** after two rounds; Llama-2-70b-chat goes from **62.0% to 36.5%**. Alternative critique formulations remain below their initial baselines in the reported comparisons.
- After two GPT-3.5 math rounds, **74.7% of answers remain unchanged**; **8.8%** move from correct to incorrect and **7.6%** from incorrect to correct. Oracle retention prevents exactly the harmful transitions that an intrinsic verifier fails to distinguish.
- On full GSM8K with GPT-3.5's earlier model version, standard prompting reaches **76.7%**. Debate reaches **83.2% with six responses** and **83.0% with nine**; self-consistency reaches **85.3% and 88.2%** at those counts. Three-response voting reaches **82.5%**. Debate helps versus one answer but loses against the relevant matched-response baseline.
- In constrained generation, replicating an earlier method gives **53.0% concept coverage initially and 61.1% after refinement**. Explicitly stating all constraints upfront reaches **81.8%**, then drops to **75.1%** with refinement. The earlier paper's quoted **44.0% / 67.0%** results are separate from this replication.

## Analyst Takeaways

1. **A critic needs a source of corrective information.** Another pass over the same unsupported belief can amplify error rather than detect it. Execution, counterexamples or independently grounded judgments change the information available.
2. **Preserve correct work with a trustworthy gate.** A critique request is not evidence that something is wrong; the acceptance mechanism is as important as the revision mechanism. See [Score-Gated Refinement](/vault/score-gated-refinement.md).
3. **Compare review with spending the same effort on alternatives.** Same-model debate must beat independent sampling and voting before its conversational structure earns credit.
4. **State acceptance requirements at the start.** A delayed instruction is a specification change, not evidence of emergent self-correction.

## Questions and Limitations

The models and methods are 2023–2024 snapshots, some evaluations use small subsets, and matched response counts do not match token cost exactly because debate inputs grow. Same-model debate does not establish whether genuinely diverse reviewers help. The main prose says all accuracies drop, but GPT-4's first-round HotpotQA remains **49.0%**, unchanged from baseline; the broader conclusion is no observed intrinsic improvement, not a strict drop in every cell. The authors explicitly leave room for effective style, preference and safety revision, and recommend external feedback rather than abandoning correction. Their discussion calls execution a perfect verifier when tests fully specify behavior; that is a conditional assumption, not a guarantee for incomplete or mutable real-world suites.

## Vault Ideas Extracted

* [Score-Gated Refinement](/vault/score-gated-refinement.md)
