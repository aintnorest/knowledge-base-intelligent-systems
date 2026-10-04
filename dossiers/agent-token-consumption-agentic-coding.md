---
type: Study Note
title: How Do AI Agents Spend Your Money? Analyzing and Predicting Token Consumption in Agentic Coding Tasks
description: Eight-model coding trajectories expose repeated-context costs, stochastic expenditure and weak self-estimation, without proving that imposed token cuts improve repair success.
resource: https://arxiv.org/abs/2604.22750v2
source: /archive/agent-token-consumption-agentic-coding.pdf
tags: [inference-efficiency, token-efficiency, coding-agents, evaluation, agents]
timestamp: 2026-10-04T06:15:48Z
---

# How Do AI Agents Spend Your Money? — Study Notes

**Authors**: Longju Bai, Zhemin Huang, Xingyao Wang, Jiao Sun, Rada Mihalcea, Erik Brynjolfsson, Alex Pentland and Jiaxin Pei (eight authors; Michigan, Stanford, All Hands AI, Google DeepMind, Microsoft AI and MIT affiliations).  
**Status**: Archived arXiv v2, April 29, 2026; manuscript identifies no peer-reviewed venue.

## What It Is

An empirical analysis of OpenHands trajectories on **500 SWE-bench Verified tasks**, with **four independent executions per task** for eight frontier models. It measures where token consumption occurs, how models differ on shared outcomes, and whether an agent can estimate its own expenditure before solving the task. The harness carries full conversation history forward unchanged, an important boundary on generalization.

## Problem and Motivation

A user pays for failed exploration as well as successful work and often cannot know the bill in advance. Agent cost is not simply generated code length: every subsequent turn consumes accumulated prompts, observations and earlier responses again. Even discounted cache reads can dominate total dollars at sufficient volume.

## Mechanism as an Idea

Separate input, output, cache creation and cache reads, then relate consumption to repeated actions and outcomes. Within a task, rank its four executions by cost rather than treating task difficulty as the whole explanation. Compare model behavior on shared-success and shared-failure subsets to reduce outcome-composition confounding.

A Sonnet4.5 case study divides execution into planning, exploration, fixing, validation and closeout. A separate self-prediction experiment lets the same agent inspect the repository and tools but asks it to estimate phase-wise consumption rather than perform the repair. Three predictions per model/task test both accuracy and the estimator's own cost. This is an agentic scoping process, not a free prompt-only forecast.

## Results and Admissions

- Figure 1 reports average agentic consumption **4.17M tokens**, versus **1.19k** code reasoning and **3.39k** code chat; the main text describes **3,500×** and **1,200×** respectively. Its input/output ratio is **153.85**, versus **0.16** reasoning and **1.33** chat. These are different task corpora, not matched-task intervention effects.
- The abstract reports up to **30×** run-to-run token variation. Figure 2 describes average per-task max/min variation of roughly **2×** across four runs: an extreme and an average are different statistics. The most expensive task's mean is roughly **7M tokens** above the cheapest.
- Accuracy improves from the minimum-cost run to intermediate cost and then saturates; expensive runs show more repeated file views and modifications. Correlation does not establish that forcibly stopping an expensive run would rescue it.
- Kimi-K2 and Sonnet4.5 consume on average **over 1.5M more tokens than GPT-5** on the same tasks. Relative consumption differences persist on **230 shared-success** and **100 shared-failure** tasks. The model and fixed harness jointly shape this behavior.
- Human difficulty versus token use has **Kendall τb = 0.32**, with **95% CI [0.25, 0.38]**. **6.7%** of under-15-minute tasks exceed the mean token use of over-one-hour tasks; **11.1%** of over-one-hour tasks lie below the under-15-minute mean.
- For Sonnet4.5, exploration is **30.37%** of rounds and fixing **33.53%**; validation is **16.59%**. Cache reads dominate both volume and dollars in every phase, despite output's stated roughly **80×** per-token price advantage over cache reads. New tool observations generate discrete cost spikes atop steadily growing repeated-context cost.
- Self-estimation correlations top out at **0.39** for Sonnet4.5 output tokens; Kimi-K2 reaches **0.38** for input. Every model underestimates consumption. Sonnet3.7 and Sonnet4 spend **2.29×** and **2.09×** the repair cost on prediction, versus Sonnet4.5 **0.32×** and GPT5.2 **0.05×**.

Without the worked example, most models do not reliably follow the estimation instruction. The two compliant models, Sonnet4.5 and GPT5.2, still underestimate and show lower correlations. This does not establish that the example alone explains the bias.

## Analyst Takeaways

1. **Budget repeated exposure, not merely novel tokens.** Long observations become recurring liabilities; caching discounts their processing but does not remove their volume.
2. **Price a successful episode and its tail risk.** Per-token price or average task cost hides model-dependent exploration, failure tails and auxiliary estimation overhead.
3. **Treat self-estimates as noisy risk signals, not quotations.** Enforce observed runtime budgets separately; an estimator that costs more than execution defeats its economic purpose.
4. **A repeated action is a diagnostic trigger, not proof of waste.** Check for new evidence and verified progress before imposing cuts. Model switching also changes future states, so evaluate it live rather than by replaying cost logs.

## Questions and Limitations

One harness, one repair benchmark and unchanged history do not cover compaction, observation masking or different tool designs. Cross-model prices, tokenizers and cache accounting make raw tokens distinct from dollars. The phase analysis is one model; conclusions about failure detection and stopping remain hypotheses.

The paper calls repeated-history input growth “exponential,” but supplies no exponential growth model; cumulative repeated exposure need not be exponential. Appendix B states cached input at **$0.125** versus ordinary input **$1.250 per million**, a **0.1** ratio, while its formula applies **0.2** of the input rate. The worked estimation example's phase sums also do not match its stated input/output totals. These inconsistencies limit exact cost reproduction; they do not erase the observed variability or underestimation finding.

## Vault Ideas Extracted

* [Cost-Aware Inference Control](/vault/cost-aware-inference-control.md)
