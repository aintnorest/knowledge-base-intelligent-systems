---
type: Study Note
title: "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering"
description: NeurIPS 2024 evidence that search, editing, feedback, and history interfaces change software-repair performance without changing model weights.
resource: https://arxiv.org/abs/2405.15793v3
source: /archive/swe-agent-agent-computer-interfaces.pdf
tags: [agent-harness, coding-agents, tool-use, context-engineering, evaluation, agents]
timestamp: 2026-10-04T05:19:39Z
---

# SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering — Study Notes

**Authors**: John Yang, Carlos E. Jimenez, Alexander Wettig, Kilian Lieret, Shunyu Yao, Karthik Narasimhan, and Ofir Press  
**Venue**: NeurIPS 2024, peer-reviewed main-conference paper; archived arXiv revision 3, November 11, 2024.

## What It Is

SWE-agent treats the language model as a distinct kind of computer user. Its agent-computer interface (ACI) includes available actions, documentation, environment feedback, and construction of interaction history—not merely the tool-call grammar. The paper holds model weights fixed and improves this interface through trajectory inspection and configuration experiments.

## Problem and Motivation

Human-oriented shells make agents perform brittle editing, line arithmetic, repeated navigation, and extra calls to discover whether silent actions worked. Large search results and whole-file dumps consume context; too little information prevents localization. A model can therefore fail because it cannot express or observe an action, even when it has a plausible repair idea.

## Mechanism as an Idea

The interface couples a bounded, line-numbered file view to multi-line replacement and immediate updated-file feedback. Search returns compact summaries and requests narrowing when results exceed 50. The selected view contains 100 lines; older observations beyond the latest five collapse to omission notices while action and reasoning history remain.

Edits introducing selected Python lint errors are rejected with the diagnostic, proposed resulting code, and original code. These three views distinguish the failed proposal from actual state and reduce repeated errors. The guardrail also constrains legitimate edit ordering: removing a definition before its uses can be rejected even when a later edit would complete the change. Guardrails are therefore a workflow tradeoff, not free correctness.

## Results and Admissions

- GPT-4 Turbo resolves **286/2,294 tasks (12.47%)** on full SWE-bench and **54/300 (18.00%)** on Lite. Claude 3 Opus reaches **10.46%** on the full set.
- The matched Lite shell-only baseline with a demonstration is **11.00%**, versus **18.00%** for the ACI: **7.00 percentage points**, or roughly 64% relative improvement. The introduction's **10.7-point** claim corresponds to the **7.33% shell baseline without a demonstration**, not the demonstrated baseline.
- Lite ablations reduce success to **10.3%** without the editor, **15.0%** without linting, **12.0%** with result-by-result search, **14.3%** with a 30-line view, **12.7%** with the full file, and **15.0%** with full history. Summarized search reaches **18.0%**; even no special search reaches **15.7%**, beating exhaustive iterative browsing.
- HumanEvalFix scores are **87.7% Python, 89.7% JavaScript, and 87.9% Java**. The abstract's 87.7% is the Python result; the results prose reports 88.3%, consistent with the three-language average.
- **1,185/2,294 trajectories (51.7%)** contain at least one failed edit. Automatically labeled Lite failures attribute **23.4%** to failed edit recovery and **52.0%** to incorrect or overly specific implementations. Label agreement is **87% on just 15 hand-labeled cases**.

Six Lite runs average **17.94% pass@1** and yield **32.67% pass@6**; more attempts help, but require a selection strategy and more expense. Compared with retrieval-only generation, interactive repair is reported as 8–13× costlier on Lite. Successful case studies still duplicate existing utilities or make semantically broader changes than the human patch.

## Analyst Takeaways

1. **Evaluate the entire action-observation loop.** A tool that bundles a meaningful operation and returns current state can remove both mechanical errors and follow-up calls.
2. **Bound observations without forcing exhaustive navigation.** Summary-first search lets the agent choose where to inspect; a one-result-at-a-time interface can induce budget-consuming completionism.
3. **Make rejection state explicit.** Show what failed, what was proposed, and what remains authoritative; otherwise a rejected edit can become the model's imagined current file.
4. **Separate mechanical success from repair quality.** Better applicability and syntax do not prove semantic correctness, reuse, or maintainability.

## Questions and Limitations

The main experiments use 2024 models and primarily Python repositories with a $4 per-instance ceiling. The 37-task development sweep and manual interface design do not establish universal window sizes or history policies. Containers are described as mostly isolating effects, not defending against deliberate container escapes.

The appendix reports **113/286 resolved trajectories as 31.5%** containing failed edits; those counts imply about **39.5%**, an internal arithmetic inconsistency. Other appendix counts differ from main-table totals (including 35 versus 39 Claude Lite successes). Preserve the main-table results rather than silently reconciling them. Correlations between long trajectories and failure do not establish that stopping earlier would improve outcomes.

## Vault Ideas Extracted

* [Bounded Tool Observations](/vault/bounded-tool-observations.md)
* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
