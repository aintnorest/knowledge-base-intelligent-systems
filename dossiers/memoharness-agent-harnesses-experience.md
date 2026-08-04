---
type: Study Note
title: "MemoHarness: Agent Harnesses That Learn from Experience"
description: "Study notes on a case-adaptive agent harness that searches six control dimensions, records dual-layer experience, and retrieves it without test-time labels."
resource: https://arxiv.org/abs/2607.14159v1
source: /archive/memoharness-agent-harnesses-experience.pdf
tags: [agent-harness, self-improvement, agent-memory, retrieval, agents]
timestamp: 2026-07-22T00:32:30Z
---

# MemoHarness: Agent Harnesses That Learn from Experience — Study Notes

**Authors**: Yue Huang, Wenjie Wang, Han Bao, Yuchen Ma, Xiaonan Luo, Yi Nian, Haomin Zhuang, Zheyuan Liu, Yue Zhao, and Xiangliang Zhang
**Venue**: arXiv:2607.14159v1 [cs.AI, cs.CL]
**Date**: July 14, 2026
**Pages**: 20
**DOI**: 10.48550/arXiv.2607.14159

## What It Is

MemoHarness treats an agent harness as a structured control layer rather than one global prompt. It searches for a global harness on labeled cases, stores execution-derived experience, then specializes the selected harness for each unlabeled test case using retrieved prior experience. The stated goal is to make adaptation reusable without consuming test-time labels, verifier feedback, or a fresh multi-round search.

The proposal is notable because it explicitly separates a globally selected artifact from case-local adaptation. That separation responds to a real design tension: one static harness is easy to deploy but mismatched to heterogeneous tasks; fully re-optimizing each task can be expensive and can leak evaluation feedback.

## Six Control Dimensions and Experience Bank

The harness is decomposed along the flow of inference into: context assembly, tool/retrieval interaction, generation control, orchestration topology, memory management, and output processing. Examples include adding demonstrations, selecting retrieval depth, changing token budgets, moving from one call to plan–execute–refine, summarizing stale state, and validating output schemas.

During search, every case creates an entry containing its features, current harness, configuration delta, trajectory, reward, token cost, and a diagnosis that identifies primary and secondary failure dimensions. A second layer periodically distills recurring failure clusters into global patterns with supporting evidence and a proposed repair direction. Controllers retrieve bounded slices of both layers instead of loading the full history.

Selection is lexicographic: maximize the primary correctness reward first, then prefer lower token cost among tied candidates. At test time, the experience bank is frozen. The system retrieves similar successes, similar failures, and relevant global patterns, then emits one case-specific harness using only test-visible inputs before executing it.

## Evaluation and Reported Results

The authors test shell agency (Terminal-Bench), single-shot code generation (LiveCodeBench), and multi-step financial reasoning (FinanceAgent). On their Terminal-Bench protocol, the reported selected harness improves from 0.722 to 0.806; the other two source benchmarks move from 0.900 to 0.967 and from 0.600 to 0.767. The primary Terminal-Bench evaluation uses an 18-task held-out split.

Transfer is positive but selective. A Terminal-Bench-trained harness reportedly improves several external suites, while saturated suites show no movement and LawBench is mixed. The cross-model study reports a mean gain of 0.098 over six additional models, from +0.038 on GPT-4.1 to +0.233 on GLM-5. The study also reports a $6.89 cost on its 18-task Terminal-Bench evaluation, lower than two compared commercial harnesses under its accounting, but that result depends on 13.32M of 14.18M input tokens being cacheable.

## Analyst Takeaways

1. **Store diagnoses with outcomes, not only transcripts.** A memory that records which control surface failed gives later updates a smaller, more actionable search space.
2. **Retrieve both successful and failed precedents.** Similar failures can prevent repeating a bad adaptation; similar successes can provide a conservative starting configuration.
3. **Freeze evaluation-time learning when labels are unavailable.** Retrieval-conditioned specialization can be evaluated separately from a feedback-driven search loop, which reduces ambiguity about where performance came from.
4. **Make cache assumptions first-class.** A context-heavy adaptive harness may be economically attractive only if the intended serving stack achieves the same reuse rate.

## Questions and Limitations

- The main held-out Terminal-Bench result covers 18 tasks and reports point estimates without confidence intervals or significance tests.
- The baselines are closest released system configurations, not perfectly controlled swaps of a single harness component.
- The paper does not independently ablate every contribution of per-case entries, global patterns, and case-specific adaptation.
- Retrieved experience can become stale, overfit a narrow workload, or become a poisoning channel; the paper's frozen-bank protocol does not by itself solve those deployment risks.

## Vault Ideas Extracted

* [Experience-Conditioned Harness Adaptation](/vault/experience-conditioned-harness-adaptation.md)
