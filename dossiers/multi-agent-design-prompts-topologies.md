---
type: Study Note
title: 'Multi-Agent Design: Optimizing Agents with Better Prompts and Topologies'
description: Personal study notes on Mass, a staged multi-agent-system search method that optimizes agent prompts, prunes topology choices using measured influence, and then adapts the selected workflow jointly.
resource: https://arxiv.org/abs/2502.02533v2
source: /archive/multi-agent-design-prompts-topologies.pdf
tags: [multi-agent, prompt-optimization, orchestration, agents]
timestamp: 2026-07-13T18:12:41Z
---

# Multi-Agent Design — Study Notes

**Authors**: Han Zhou, Xingchen Wan, Ruoxi Sun, Hamid Palangi, Shariq Iqbal, Ivan Vulić, Anna Korhonen, and Sercan Ö. Arık
**Venue**: ICLR 2026
**Preprint**: arXiv:2502.02533v2 [cs.LG]
**Date**: January 31, 2026
**Pages**: 32

## What It Is

This paper proposes **Multi-Agent System Search (Mass)**, a method for jointly designing the prompts and topology of an LLM multi-agent system (MAS). Its central premise is that a workflow made from poorly instructed agents is an inefficient and unstable topology-search target, while an unrestricted search over every prompt and graph combination is impractical.

Mass therefore searches in three stages: first optimize prompts for an individual agent and for each minimal topology block; next sample workflow topologies from a pruned space that favors blocks with measured validation benefit; finally re-optimize prompts across the chosen full workflow. The method is compatible with different prompt optimizers; the main experiments use MIPRO to optimize instructions and demonstrations.

## The Problem It Addresses

Changing an agent prompt changes the messages seen by its peers, and adding agents changes both inference cost and the available coordination paths. A final task score supplies sparse feedback for these coupled choices. Hand-designed systems may therefore pay for redundant self-consistency, reflection, or debate steps while preserving weak base prompts.

The authors' analysis asks two pragmatic questions before applying a large search: do prompt improvements buy more than simply adding agents, and which topology blocks are actually helpful for this task? They find that prompt optimization can be more token-effective than scaling common unoptimized blocks, and that several available blocks can be neutral or harmful on a given task.

## How Mass Works

Mass defines an application-specific space from building blocks such as parallel aggregation, reflection, debate, summarization for long contexts, and optional tool use. It applies the following sequence:

1. **Block-level prompt warm-up.** Optimize the initial predictor, then optimize each block with the warmed predictor in its smallest viable form. Store each block's validation score.
2. **Influence-weighted topology search.** Compute each block's incremental influence as its optimized validation score relative to the optimized base agent. Convert those values to temperature-controlled softmax selection probabilities; stochastically retain likely useful dimensions, reject workflows over an agent budget, and evaluate sampled valid workflows. The paper uses a fixed construction order—summarize, reflect, debate, aggregate—to avoid treating harmless permutations as separate designs.
3. **Workflow-level prompt optimization.** Given the best sampled topology, optimize all prompts again so their roles and handoffs are fitted to that particular collaboration graph.

The main setup searches ten topology candidates, caps the workflow at ten agents, evaluates candidates three times on validation data, and reports three test runs. Those choices make the procedure concrete, but they are experimental settings rather than universal defaults.

## Results That Matter

On eight reasoning, long-context, and coding benchmarks, Mass reports an average of **78.79** with Gemini 1.5 Pro and **74.30** with Gemini 1.5 Flash. In the same table, the strongest listed manually structured baseline, multi-agent debate, averages 70.26 and 65.91 respectively. The score types differ by task (accuracy, F1, or pass@1), so these are benchmark-suite summaries, not one production-quality measure.

The stage ablation gives the more useful design evidence. With Gemini 1.5 Pro, the paper reports a 63.54 average for its base agent, 67.44 after single-agent automatic prompt optimization, 74.56 after block-level optimization, 77.55 after influence-pruned topology search, and 78.40 after the final workflow-level pass. In a task-level example, debate is the best warmed block for MATH, but a parallel aggregation topology later wins after the broader search.

The discovered patterns are task-specific: the reported multi-hop knowledge tasks often favor debate, MATH and DROP favor more parallel exploration, and coding tasks tend toward reflection plus an execution tool. The paper also reports improvements with Claude 3.5 Sonnet and Mistral-Nemo-12B, but that is evidence from its limited benchmark configurations, not proof that a learned workflow transfers to another model, tool policy, or business process.

## My Takeaways

1. **Optimize a minimally useful component before composing it.** Search cost is better spent on blocks that can independently help under the target metric than on scaling default roles that have never earned their place.
2. **Use empirical influence to shape the search space, not as a permanent architectural rule.** A validation-measured block benefit is a useful budget-allocation prior. Keep testing full workflows, because a block's contribution can change when combined with peers.
3. **Treat prompts and topology as alternating design variables.** Local prompt fitting makes the structural search less noisy; the final joint prompt pass recognizes that a good isolated role instruction may need different constraints once it participates in a real handoff.
4. **Keep the resulting workflow as a conditional artifact.** Version the data split, metric, prompt optimizer, topology grammar, model settings, agent cap, candidate budget, and final prompts. A score from this search is evidence for that configuration, not a reason to transplant the topology unchanged.

## Questions and Limitations

- The topology grammar is intentionally limited and its fixed block order rules out many routing patterns, asynchronous designs, conditional branches, and task-specific tools. The method finds the best option in that grammar, not the globally best MAS.
- Influence is measured from small, minimally instantiated blocks. It need not predict the value of a block that only becomes useful in a particular combination, and softmax pruning can discard a complementary component before it is tested.
- The experiments search only ten topologies and rely on validation performance for repeated prompt and architecture selection. Holdout evaluation reduces but does not remove configuration-specific overfitting or stochastic-model noise.
- The reported results focus on task metrics, tokens, and API-cost estimates. They do not establish grounding, tool safety, trace quality, reliability under production distributions, or the operational cost of maintaining the search and its chosen graph.
- The paper uses particular Gemini, Claude, and Mistral configurations and selected benchmarks. It does not show that the proposed selection temperature, building blocks, or cost trade-offs transfer to a different model family or deployment.

## Vault Ideas Extracted

* [Influence-Weighted Topology Search](/vault/influence-weighted-topology-search.md)
* [Configuration-Aware Multi-Agent Prompt Optimization](/vault/configuration-aware-multi-agent-prompt-optimization.md)
* [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md)
* [Prompt Optimization](/vault/prompt-optimization.md)
