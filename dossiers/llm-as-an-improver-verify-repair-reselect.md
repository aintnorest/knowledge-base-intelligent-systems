---
type: Study Note
title: "LLM-as-an-Improver: Turning Verification into Better Candidates"
description: Verify–Repair–Reselect turns criterion-level verifier feedback into alternative solutions instead of merely ranking a fixed pool, while documenting recovery and correct-to-incorrect regressions.
resource: https://arxiv.org/abs/2609.19515v1
source: /archive/llm-as-an-improver-verify-repair-reselect.pdf
tags: [verification, evaluation, test-time-scaling, coding-agents, agents]
timestamp: 2026-09-24T03:44:35Z
---

# LLM-as-an-Improver: Turning Verification into Better Candidates — Study Notes

**Authors**: Akiyoshi Tomihari and Yuma Ichikawa  
**Organizations**: Fujitsu Limited; University of Tokyo and RIKEN AIP (Ichikawa)  
**Venue**: arXiv:2609.19515v1 [cs.AI]; preprint  
**Date**: September 17, 2026

## What It Is

A verifier used only to rank a fixed candidate pool can never select a correct answer when every initial candidate is wrong. This paper proposes **Verify–Repair–Reselect (VRR)**: reuse criterion-level verification evidence to generate better options and then judge those options under the **same original criteria**. The idea applies to code and reasoning tasks. It does not mean blindly trusting a verifier's critique; the verifier can be mistaken, the repairer can overfit visible checks, and a second selection can regress from a correct initial winner.

## How It Works

1. Define hard requirements and problem-specific soft tie-breakers *before* evaluating candidates. Build an evidence graph linking each candidate's code or reasoning to source locations and public syntax/compile/test results.
2. Assess each hard criterion as satisfied, violated, or unknown with explicit grounding. The paper weights judgments by grounding and reported uncertainty, aggregates hard checks multiplicatively, adaptively spends verification calls on decision-relevant ambiguities, and checks leading candidates in both presentation orders. These scores are ranking heuristics, **not calibrated probabilities** of correctness.
3. Trigger improvement if the pool's top score is low or too many hard items are unknown. Retain the initial winner, then propose three complementary alternatives: repair that winner, repair the runner-up, and try a fresh approach grounded in the diagnostic record. Re-examine alleged defects rather than assuming all criticism is true.
4. Screen alternatives for complete artifacts, compilation/public-test pass in code tasks, and non-duplication; these gates establish eligibility, **not hidden correctness**. Reselect from the initial winner and up to three survivors against the unchanged criteria. If no alternatives survive, return the first winner.

The inference procedure never sees private-test answers or reference labels. It compares with fixed-pool LLM-as-a-Verifier (LAV) on the same frozen initial candidate pools, not on matched total verification/generation compute.

## Evidence

Across two models (Gemma 4 31B IT, Qwen3-32B) and eight benchmarks (three code, five reasoning), VRR beats LAV in **9 of 16** model–benchmark settings, ties **four**, and loses **three**. On LiveCodeBench, Gemma improves **87.58%→88.91%**, and Qwen **78.58%→79.53%**; Qwen GPQA Diamond improves **53.03%→57.07%**. HumanEval+ with Gemma instead falls **95.73%→95.12%**, Qwen MBPP falls **76.46%→76.19%**, and Qwen MATH-500 falls **89.20%→88.60%**. These are single reported evaluations without uncertainty intervals or repeated seeds.

LiveCodeBench uses **1,055** tasks and five initial code candidates per task. Where all five are incorrect, VRR recovers **18/117 (15.38%)** cases for Gemma and **7/215 (3.26%)** for Qwen, which selection alone cannot do. But coverage gain is not automatically net accuracy gain: Gemma's **18** recovered cases are offset by **18** failures among originally covered cases, and Qwen's **7** recoveries by **eight** covered-case errors. On Qwen, even an all-correct initial pool yields one genuine correct-to-incorrect regression. Initial-pool oracle rates are **88.91%** and **79.62%**, versus final VRR **88.91%** and **79.53%**; selecting among newly generated candidates must itself be reliable.

Recorded method-specific runtime is lower for VRR in all eight tabulated comparisons (e.g., Gemma LiveCodeBench **156.31s** LAV versus **108.91s** VRR), but the paper explicitly says batching/caching/parallelization differ, so this is **not** a controlled inference-efficiency or latency advantage.

## Analyst Takeaways

1. **Turn verifier feedback into an actionable repair experiment.** Preserve the initial candidate, identify a violated acceptance condition and its evidence, create a local fix *and* an alternative approach, then run the same independent checks again. A critique is a hypothesis to test, not a patch to approve automatically.
2. **Keep the expectation fixed across iterations.** Establish hard requirements before inspecting candidates; do not revise the criteria to favor the current implementation. A soft rubric or LLM score should not override a failing executable contract.
3. **Track regressions as well as recoveries.** In the light software factory, the metric is final accepted quality under an independent checker, including failure of previously passing cases—not merely the number of newly successful candidates or the best score under visible tests.
4. **Budget-match the counterfactual before adopting.** VRR uses extra generation and reranking; compare to spending the same time/tokens on independent samples, targeted tests, or human review. The study's runtime numbers cannot settle this question.
5. **Beware shared verifier/repairer blind spots.** Both evaluated setups use the same model for generation, verification, repair, and reselection; a mistaken criterion can reinforce the same defect. Held-out behavior and human-owned expectations remain necessary.

## Questions and Limitations

- Code tasks are short benchmark programs, not repository-scale modifications with integration, migration, and deployment constraints. Reasoning wins cannot be carried over as code-quality evidence.
- Screening with public tests can reward SpecBench-style visible-suite gaming; preserved initial winner can still lose in the second LLM-based selection. No formal guarantee of non-decreasing quality follows.
- No confidence intervals, repeated-seed outcome distribution, or matched total generation/verification budget against LAV are supplied. Non-significant-looking fractional differences should not be oversold.
- Aggregating dependent LLM judgments as log odds and multiplying criterion scores does not produce well-calibrated probabilities; repeated reviews can share biases even when criterion-level explanations look grounded.

## Vault Ideas Extracted

* [Score-Gated Refinement](/vault/score-gated-refinement.md)
* [Verifier Co-Evolution Under Optimization](/vault/verifier-co-evolution.md)
