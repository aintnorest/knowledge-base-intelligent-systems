---
type: Study Note
title: Building effective agents
description: Anthropic's practitioner model of fixed workflows versus dynamic agents, with conditional composition patterns, environment feedback, and tool-interface error prevention.
resource: https://www.anthropic.com/engineering/building-effective-agents
source: /archive/anthropic-building-effective-agents.html
tags: [orchestration, agent-harness, tool-use, decomposition, agents]
timestamp: 2026-10-04T05:19:39Z
---

# Building effective agents — Study Notes

**Authors**: Erik S. and Barry Zhang (Anthropic)  
**Originally published**: December 2024  
**Evidence type**: First-party practitioner guidance informed by internal work and dozens of customer teams, not a controlled comparative study. The archived page explicitly warns that tooling has changed since publication and contains updated product/model examples.

## What It Is

A compact architectural vocabulary for agentic systems. **Workflows** use predefined code paths to orchestrate models and tools; **agents** dynamically decide their process and tool use. Both start from an augmented model with retrieval, tools, and memory. The recommendation is to add autonomy and multi-step machinery only when a simpler call demonstrably falls short.

## Problem and Motivation

Complex frameworks can conceal actual prompts and responses, making failures harder to diagnose while encouraging unnecessary architecture. Autonomy also trades latency and cost for potential task improvement and permits errors to compound over many steps. Choosing the right control structure is therefore part of reliability and efficiency, not a badge of sophistication.

## Mechanism as an Idea

The source distinguishes several composable patterns by where uncertainty resides:

- **Prompt chaining** uses a fixed decomposition and intermediate programmatic gates; it makes each call easier at the cost of serial latency.
- **Routing** classifies inputs into specialized paths, including cheaper models for easier cases; it depends on accurate classification.
- **Parallelization** either partitions independent considerations for speed or samples multiple judgments for aggregation. Sectioning and voting solve different problems.
- **Orchestrator-workers** lets a central model discover subtasks from the input and synthesize delegated work; unlike fixed sectioning, the decomposition is unknown in advance.
- **Evaluator-optimizer** loops on critique when clear criteria and demonstrable improvement make iteration worthwhile.
- **Autonomous agents** choose actions in a feedback loop for open-ended problems whose steps cannot be hardcoded. Environmental observations supply ground truth; human checkpoints and explicit stopping conditions retain control.

Tool definitions deserve the same design attention as task prompts. Losslessly equivalent representations for software are not equally easy for a model: line counting and code-string escaping add generation burden. Familiar formats, clear tool boundaries, examples and edge cases, trace-based testing, and mistake-resistant arguments reduce opportunities for error.

## Results and Admissions

The article offers patterns and experiences, not benchmark effect sizes. Anthropic reports spending **more time optimizing tools than the overall prompt** for its SWE-bench agent. Relative paths caused errors after working-directory changes; requiring absolute paths reportedly eliminated those mistakes in that implementation. “Flawlessly” is an anecdotal claim with no denominator or matched experiment supplied.

Coding tasks benefit from executable tests and repair feedback, but the authors retain human review for alignment with broader system requirements. Customer support is another promising domain because conversation and action combine with measurable resolutions and oversight. Neither example proves that tests or resolution-based billing fully establish real-world correctness.

## Analyst Takeaways

1. **Put known control flow in code; reserve model decisions for uncertainty.** Fixed, independent work need not consume planning turns just to rediscover its structure.
2. **Distinguish parallel decomposition from voting.** One reduces dependency-free latency; the other spends extra calls for corroboration and requires an aggregation policy.
3. **Make environment facts authoritative over plans.** Progress should be grounded in actual effects and observations, not confidence or a completed checklist.
4. **Prevent recurring tool mistakes structurally.** A path or representation redesign can be more durable than another admonition in the prompt.
5. **Demand evidence for added complexity.** Delegation, evaluation loops, and autonomy earn their cost only through measured gains on the target workload.

## Questions and Limitations

The account does not quantify how frequently patterns succeed, when routing errors outweigh savings, or how correlated voting failures affect confidence. Absolute paths solve one state-dependence problem, not all path, workspace, or access-control errors. Sandboxed testing and guardrails are recommended without a complete threat model. Product examples were updated after December 2024, so the archive is not a pristine snapshot of the original tooling landscape. The architectural distinction remains useful independently of those examples.

## Vault Ideas Extracted

* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
