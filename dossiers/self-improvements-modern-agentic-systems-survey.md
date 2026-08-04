---
type: Study Note
title: "Self-Improvements in Modern Agentic Systems: A Survey"
description: "Study notes on a systems taxonomy that separates foundation-model updates from prompt, memory, tool, and full-scaffold self-improvement."
resource: https://arxiv.org/abs/2607.13104v1
source: /archive/self-improvements-modern-agentic-systems-survey.pdf
tags: [self-improvement, agents, agent-memory, tool-use, evaluation, survey]
timestamp: 2026-07-22T00:32:30Z
---

# Self-Improvements in Modern Agentic Systems: A Survey — Study Notes

**Authors**: Zhe Ren, Yimeng Chen, Dandan Guo, Guowei Rong, Tonghui Li, R. B. Xiong, Qingfeng Lan, Wenyi Wang, Li Nanbo, Yibo Yang, Mingchen Zhuge, and Jürgen Schmidhuber
**Venue**: arXiv:2607.13104v1 [cs.AI, cs.CL, cs.LG]
**Date**: July 14, 2026
**Pages**: 97
**DOI**: 10.48550/arXiv.2607.13104

## What It Is

This 97-page survey gives self-improving agents a systems-level definition. A modern foundation-model agent is represented as an underlying model with parameters \(\theta\) plus an operational scaffold \(\Sigma\). The scaffold includes prompts, memory policies, tool interfaces, and control logic. An agent improves itself when it derives experience or feedback, proposes an update to either \(\theta\) or \(\Sigma\), and commits that update so later behavior changes.

The central distinction is practical: **foundation-model improvement** changes weights and is slower, harder to reverse, and potentially more transferable; **scaffolding improvement** changes the surrounding operational system and is faster, more inspectable, and easier to roll back. The survey's taxonomy makes it less tempting to call every retry, reflection, or memory write "self-improvement" without stating what has actually changed.

## Taxonomy

Foundation-model improvement is organized by the signal used to update parameters: intrinsically generated demonstrations, intrinsic evaluative feedback, and exploratory experience from grounded or simulated environments. Scaffolding improvement is organized by the target: prompts, memory, tools, or the full scaffold.

Within prompt improvement, the survey distinguishes scalar-feedback optimization, qualitative-feedback refinement, population-based evolution, and textual-gradient methods. Its memory branch separates the memory object, its structure, and processing policies. Tool improvement includes dynamic routing, iterative refinement, and autonomous tool creation; full-scaffold improvement includes changing the coupled workflow that combines all of these components.

The taxonomy is a map, not a uniform capability ranking. A method can update one component rapidly while relying on a static model, or combine several update channels with different feedback, cost, and safety properties.

## Evaluation and Governance

The survey argues that a self-improvement claim should identify the updated component, available feedback, resource budget, held-out evaluation set, and regression checks. A static best score is insufficient: report learning curves, transfer beyond the update data, overhead, safety violations, and retention of previously solved tasks.

For scaffold changes, the suggested protocol is component isolation: swap the updated prompt, memory policy, tool wrapper, or controller while keeping the environment fixed. For model updates, retention and distribution-drift testing become especially important because a bad parametric update is difficult to attribute or reverse.

The discussion frames the critic as governed infrastructure. If the same agent can freely invent updates and decide they are valid, it has incentive to exploit the evaluator. The authors recommend separately governed critics, monotone or auditable critic changes, verifier-gated update admission, and renewed adversarial evaluation after substantial changes.

## Analyst Takeaways

1. **Record the update target in every experiment.** "The agent improved" is ambiguous until the record says whether weights, prompt policy, memory, tools, routing, or the entire scaffold changed.
2. **Use scaffold changes as an exploration layer.** They are comparatively reversible and inspectable. Promote repeated, validated improvements to slower parametric consolidation only after replay, transfer, and safety evidence.
3. **Treat persistent memory and tool logic as deployable code.** They can preserve an improvement, but can also preserve a poisoned observation, bad routing rule, or unsafe permission expansion.
4. **Measure the loop, not just the endpoint.** Fixed-budget trajectories, regressions, transfer, and update cost are essential evidence for a closed-loop system.

## Questions and Limitations

- This is a taxonomy and survey, not a single controlled benchmark or a causal comparison among all listed mechanisms.
- Taxonomic placement depends on the authors' interpretation of each paper; hybrid systems can fit more than one branch.
- The recommended governance mechanisms are design guidance, not proof that an implementation is safe under adaptive attack or open-world drift.
- The paper's large and fast-moving literature map will need maintenance as agent architectures and benchmarks change.

## Vault Ideas Extracted

* [Self-Improvement Update Targets](/vault/self-improvement-update-targets.md)
