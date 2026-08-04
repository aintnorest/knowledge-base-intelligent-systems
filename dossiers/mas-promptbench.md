---
type: Study Note
title: 'MAS-PromptBench: When Does Prompt Optimization Improve Multi-Agent LLM Systems?'
description: Personal study notes on a controlled benchmark of system-prompt optimization across multi-agent task domains, coordination topologies, communication protocols, and team sizes.
resource: https://arxiv.org/abs/2606.23664v1
source: /archive/mas-promptbench.pdf
tags: [multi-agent, prompt-optimization, benchmark, orchestration, agents]
timestamp: 2026-07-13T17:56:21Z
---

# MAS-PromptBench — Study Notes

**Authors**: Juyang Bai and Laixi Shi
**Venue**: arXiv:2606.23664v1 [cs.LG]
**Date**: June 22, 2026
**Pages**: 33
**Project**: [website](https://juyangbai.github.io/MAS-PromptBench/) and [code](https://github.com/juyangbai/MAS-PromptBench)

## What It Is

MAS-PromptBench is a benchmark and empirical study of a narrow but practical question: with the models and workflow fixed, when does optimizing each agent's system prompt improve a multi-agent system (MAS)? It treats a MAS as an ordered set of agents, a coordination graph, and a communication protocol, then measures the score difference between the seed joint prompts and the optimized joint prompts under that fixed configuration.

The benchmark spans nine tasks in reasoning, coding, and tool calling; five topologies (single, independent, sequential, centralized, and decentralized); freeform through constrained structured communication; teams of 2, 4, 8, or 10 agents; and two adapted optimizers, MAS-GEPA and MAS-MIPRO. The useful contribution is not another claim that better prompts always help. It exposes prompt optimization as a configuration-dependent systems problem.

## The Problem It Addresses

Single-model prompt optimizers can revise one instruction against an outcome metric. In a MAS, each prompt affects other prompts through messages, routing, aggregation, and multi-turn behavior. Optimizing agents separately therefore searches a coupled space whose interactions grow rapidly with team size. A locally clearer instruction can be ignored, overwritten, amplified incorrectly, or become incompatible with the way another agent consumes its output.

The authors hold the surrounding system configuration fixed to estimate its available prompt-improvement headroom. This matters for practitioners who cannot casually change a production topology because of safety, compliance, or auditability constraints, but can revise instructions.

## Benchmark Design

The benchmark varies four primary axes:

| Axis | Values | What it tests |
|---|---|---|
| Task | GPQA-Diamond, HotpotQA, MATH; LiveCodeBench, APPS, SWE-Bench Verified; BFCL, ToolHop, API-Bank | Whether the task exposes verifiable local artifacts or mostly coupled reasoning |
| Workflow topology | Single, independent vote, sequential chain, centralized coordinator, decentralized exchange | How routing and aggregation preserve or erase local prompt changes |
| Communication protocol | Freeform, semi-structured slots, constrained JSON-style reports | Whether agent state and evidence have a shared, inspectable representation |
| Team size | 2, 4, 8, 10 | Whether more agents create useful specialization or unmanageable coordination overhead |

It instantiates systems with LangGraph, CrewAI, AutoGen, and the OpenAI Agents SDK. The task model is Qwen3.5-9B with thinking disabled for controlled comparisons; the reflection model is Qwen3.5-122B-A10B-FP8. Scores use each task's native metric, such as exact match, all-tests-pass, resolved rate, or AST-based function-call correctness.

MAS-GEPA maintains a prompt pool per agent and updates one agent at a time from its trace, surrounding context, final team outcome, and textual feedback. It uses 25 training and 25 validation examples per configuration, a medium budget, three-example minibatches, and rejects the optimized joint configuration unless it beats the seed on validation. MAS-MIPRO instead searches per-agent instructions and bootstrapped demonstrations using the same splits. Final evaluation excludes optimization examples.

## Results and What They Mean

Prompt optimization is neither uniformly beneficial nor uniformly futile. Across the paper's configurations, MAS-GEPA produced individual gains up to **24 percentage points** (sequential BFCL in the task/framework comparison) and drops down to **16 points** (independent MATH). This variance is the main result.

- **Task shape matters.** Averaged over the evaluated topologies, APPS rose 10.0 points and BFCL 6.4, while the reasoning domain averaged only a 1.3-point gain. The authors' explanation is plausible: code and function calls expose local behaviors that can be checked and preserved through handoffs, whereas reasoning has more implicit, correlated intermediate states.
- **Topology is part of the optimization problem.** In the controlled topology study, the single-agent baseline improved 4.2 points on average, while independent, sequential, centralized, and decentralized MAS averaged -0.5, +0.5, +1.6, and +2.3 respectively. The same optimizer can help one topology and hurt another: on API-Bank it added 9.0 points to sequential execution but lost 5.0 in the centralized version.
- **Shared message structure makes changes more transferable.** With MAS-GEPA, average gains across HotpotQA and LiveCodeBench rose from 1.6 points for freeform messages to 2.4 for semi-structured and 4.3 for structured reports. MAS-MIPRO showed the same ordering: 0.1, 4.8, and 6.3. Structured messages expose fields such as status, evidence, confidence, next action, and answer candidate instead of requiring a downstream agent to infer their location and meaning.
- **More agents raised optimization difficulty.** Across the team-size study, average gain declined from +2.4 at two agents to +0.6 at four, then -0.9 at eight and -2.1 at ten. The effect depends on topology—decentralized HotpotQA stayed nonnegative—but more handoffs generally diluted local improvements.

## My Takeaways

1. **Optimize the deployed configuration, not an abstract prompt.** A validated instruction is conditional on task metric, models, available tools, topology, protocol, aggregation rule, and team size. Treat a prompt change as a system change and hold out evaluation cases for that exact graph.

2. **Make handoff contracts explicit before spending heavily on prompt search.** A compact schema for evidence, confidence, status, and next action can make agent-local behavior easier to inspect, validate, and transfer. It is an optimization-enabling interface, not merely a formatting preference.

3. **Scale the coordination graph cautiously.** Extra agents multiply prompt dependencies as well as capability. Add specialization only when it has an identifiable responsibility and a contract whose useful output survives the next handoff.

4. **Use conservative selection and report losses.** The paper selects a joint prompt only when its validation score beats the seed, yet held-out results can still regress. Keep seed prompts, evaluate repeated trials where stochasticity matters, and record negative outcomes by configuration rather than averaging them away.

## Questions and Limitations

- The study evaluates two natural sequential/per-agent extensions of single-agent optimizers, not the full space of MAS-native optimization algorithms. Its broad claims about structure are supported by the two tested methods but need replication.
- The 25-example training and validation splits, one task model, disabled thinking mode, and particular framework implementations limit generalization to larger or production systems.
- The benchmark measures final task metrics. Correct final answers can still conceal ungrounded messages, unsafe tool behavior, or misleading intermediate reasoning; those properties need component-level checks.
- Some table comparisons use different frameworks for different topologies in the task study. The later controlled LangGraph studies better isolate topology, but neither setup proves that topology alone caused every difference.
- Structured communication can constrain useful task-specific nuance, add serialization overhead, and create false confidence in fields that are well formed but wrong. Its schema needs task-specific validation.

## Vault Ideas Extracted

* [Configuration-Aware Multi-Agent Prompt Optimization](/vault/configuration-aware-multi-agent-prompt-optimization.md)
* [Structured Agent Communication Contracts](/vault/structured-agent-communication-contracts.md)
* [Prompt Optimization](/vault/prompt-optimization.md)
* [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md)
