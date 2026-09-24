---
type: Study Note
title: A Survey on Code Generation with LLM-based Agents
description: "A methods-first survey of single- and multi-agent code generation, repository workflows, deployment patterns, and the mismatch between test-pass scores and durable code quality."
resource: https://arxiv.org/abs/2508.00083v2
source: /archive/code-generation-agents-survey.pdf
tags: [agents, coding-agents, survey, evaluation, multi-agent, verification]
timestamp: 2026-09-24T03:45:44Z
---

# A Survey on Code Generation with LLM-based Agents — Study Notes

**Authors**: Yihong Dong, Xue Jiang, Jiaru Qian, Tian Wang, Kechi Zhang, Zhi Jin, and Ge Li  
**Venue**: arXiv:2508.00083v2 [cs.SE]  
**Revision**: September 30, 2025  
**Length**: 38 PDF pages

## What It Is

This survey describes code agents as more than snippet generators: they autonomously manage work from decomposition through coding and debugging, cover more of the software-development lifecycle, and make engineering constraints—reliability, process management, tools—central. Its useful contribution is a **methods taxonomy**, not a pooled effect estimate or head-to-head agent trial. The authors searched ACM, IEEE, Springer, Google Scholar, DBLP, and CNKI with English/Chinese terms, snowballed, screened **447 candidate papers**, and retained **100 core papers** spanning 2022–June 2025.

## Agent Mechanisms and Trade-offs

| System shape | Techniques in the review | Quality-control implication |
|---|---|---|
| Single agent | Planning/reasoning; tool integration and retrieval; reflection/self-improvement | Execution, compiler, and test feedback are stronger than ungrounded self-critique; search and retrieval need relevance and freshness checks. |
| Multi-agent | Pipeline division of labor, hierarchical planner/executor, negotiation/refinement cycles, evolving organization | A verifier role is not an independent oracle merely because it has a different name; check artifacts and error propagation at handoffs. |
| Shared state | Structural/long-term repository memory, short-term retrieved context, shared multi-agent blackboards | Code structure and source provenance matter; stale or conflicting memory can compound errors. |
| Deployed product | Copilot, collaborator, and autonomous-team forms | These are interaction/delegation categories, not demonstrated reliability tiers; human effort and cost must be measured. |

Examples include AgentCoder's programmer/test designer/test executor pipeline, MASAI's reproduction-localization-fix-ranking stages, and Agentless's comparatively simple localization-repair-validation process. The contrast argues against adding agents for their own sake: selection should depend on the task and an independently observed improvement. Agents can use compiler errors, tests, static analysis, and formal verifiers as different-strength feedback signals, but they also risk reinforcing weak or self-generated tests.

## Evaluation Taxonomy and QA Gaps

The survey separates **method/class-level** tasks, **programming-contest** problems, and **real software-development environments** that require repository exploration and tool use. HumanEval, MBPP, APPS, CodeContests, LiveCodeBench, SWE-bench, EvoCodeBench, and DevEval represent differing scopes. It cites **10,000 APPS problems**, **13,328 CodeContests problems**, and **1,055 LiveCodeBench problems from May 2023 to May 2025**; these sizes do not make contest scores interchangeable with repository repair.

Metrics span executable correctness (`pass@k`), agent process efficiency (steps, tool calls and validity), and nonfunctional quality (security, maintainability, complexity/coupling, updated tests). `pass@k` means at least one of k candidates passes specified tests; it assumes a selection/verification process exists and cannot by itself measure dependable first-try delivery. The survey's deployed-tool table explicitly notes autonomy costs, loops, and supervision requirements, but offers no controlled comparison establishing which product is best.

Its challenge map is operational: ambiguous human intent; incomplete or conflicting long repository context; hallucination and error cascades between agents; coordination overhead; rapidly changing dependencies and tool surfaces; tool access and security; costly repeated rounds; and absent accounting for human cognitive load/intervention. Future evaluation should keep effectiveness, efficiency, human interaction, security, interpretability, and experience distinct rather than optimize only tests passing.

## Analyst Takeaways

1. **Begin with a bounded agent and a real oracle.** A compile/test-and-revise loop can be more useful than an elaborate multi-agent simulation when the latter has no independent validation.
2. **Assign ownership at handoffs.** Requirements, reproduction cases, changed files, tests, and reviewer findings should be inspectable artifacts; an upstream hallucination otherwise becomes a downstream premise.
3. **Match the benchmark to the work.** Function-level pass@k is useful for code generation, but a light software factory should also grade actual repository changes, regressions, security, maintainability, time, and reviewer effort.
4. **Budget the whole workflow.** More agents and turns can improve search while making operations expensive, slow, and harder to supervise; compare against simpler workflows under matched budgets.
5. **Clarify intent before irreversible changes.** Missing constraints and hidden project conventions are not fixed reliably by longer self-reflection.

## Questions and Limitations

- The literature search cuts off June 2025; later product and model versions are not covered despite a September revision.
- The survey filters for technical novelty and top-tier venues, potentially underrepresenting negative results, operational failures, maintenance costs, and industrial practice.
- Its benchmark counts and cited improvements describe other authors' work, not a harmonized re-evaluation. Direct comparison needs matched harness, compute, and realistic datasets.
- Tool labels and product taxonomy can become stale; claims such as an architecture's universal cost/performance advantage are not supported by controlled evidence here.
- The survey identifies missing holistic quality measurement but does not provide an independently validated, ready-to-deploy quality rubric.

## Vault Ideas Extracted

* [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md)
