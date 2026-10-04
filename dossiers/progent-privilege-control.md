---
type: Study Note
title: "Progent: Securing AI Agents with Privilege Control"
description: Symbolic tool-call mediation and solver-checked policy narrowing separate probabilistic planning from deterministic authority, with approval and interface-coverage limits.
resource: https://arxiv.org/abs/2504.11703v3
source: /archive/progent-privilege-control.pdf
tags: [access-control, agent-security, prompt-injection, tool-use, verification, agents]
timestamp: 2026-10-04T06:15:48Z
---

# Progent: Securing AI Agents with Privilege Control — Study Notes

**Authors**: Tianneng Shi, Jingxuan He, Zhun Wang, Hongwei Li, Linyu Wu, Wenbo Guo and Dawn Song (seven authors; UC Berkeley, UC Santa Barbara and National University of Singapore).  
**Status**: Archived arXiv v3, May 14, 2026; manuscript is labeled “Preprint” and gives no accepted venue.

## What It Is

A privilege-control framework placing a deterministic policy check between an agent and consequential tool execution. A language model proposes task-specific permissions and updates; a symbolic runtime decides whether a concrete action is permitted, and an SMT solver decides whether an update adds any permission. The core guarantee is **monotonic confinement between approved expansions**, not universal resistance to malicious reasoning.

## Problem and Motivation

Instructions in retrieved content can redirect an agent to an unauthorized action while it still completes the user's legitimate task. Whole-tool filtering is too coarse: a messaging tool may be necessary, but only for a specific recipient. Conversely, fixed permissions can block benign tasks whose required destinations or operations become known only during execution.

## Mechanism as an Idea

Represent allowed behavior as symbolic conditions on tool identity and structured arguments. Explicit prohibitions outrank permissions and unmatched calls are denied. A denial can return explanatory feedback so the agent replans within its authority rather than silently executing the attempted effect.

Derive an initial policy from the trusted, benign user request. Before inspecting an untrusted tool result, decide whether that operation could warrant a policy update. If so, a model proposes the update using the result. A solver then asks whether **every newly allowed call was already allowed**. Subset-preserving updates can apply automatically; any new allowed call, including a mixed removal-and-addition update, requires the approver's decision. Thus removing several permissions does not conceal one added privilege.

Persistent stakeholder policies have explicit precedence. In the described composition, a higher-priority **explicit allow or forbid is final**, and only an unmatched result falls through to lower policies. This is not a simple intersection in which every later policy can narrow a higher-priority allow. Agent-wide mediation can cover a coordinated team, or separate policy boundaries can serve agents with different principals and rights.

## Results and Admissions

- AgentDojo attack success falls **39.9%→1.0%**. Benign utility is **79.4%→76.3%** without attacks and **54.0%→61.3%** under attack. “Maintaining utility” includes a **3.1-point benign decrease**.
- ASB attack success falls **70.3%→3.9%**, with no-attack utility **78.2%→78.2%** and under-attack utility **71.1%→69.7%**.
- Main experiments deliberately **auto-approve expansions**, modeling a risky approver. Their low attack rates reflect policy-model behavior and mediation, not an assurance that approved expansions are safe.
- On AgentDojo, fixed initial policy has **2.5% ASR**; automatic denial of expansions **0.7%**; automatic approval **1.0%**; manual review **0.0%**. Manual review assumes strong security awareness and rejection of attacker recipients or unrestricted sensitive tools.
- Only **6% of policy updates** are classified as expansions requiring approval in the reported experiment; this is not a universal human interruption rate.
- MCP-based integration gives ASR reductions **32.6%→1.2%** in LangChain, **40.4%→0.8%** in OpenAI Agents SDK, **42.0%→1.4%** in OpenHands and **18.7%→0.8%** in AutoGen. Benign utility falls in the first three and is unchanged in AutoGen; they are sandbox benchmark integrations, not production breach measurements.
- Adaptive attack arms report ASR **0.5%, 4.2% and 0.9%**, versus **1.0%** normal attacks, with all expansions approved. They cover three tested strategies rather than an exhaustive adaptive adversary.

Two AgentDojo preference-manipulation tasks are excluded as outside the threat model. One Slack evaluator is manually corrected because it counted attempted blocked calls as successful attacks. These modifications matter when comparing results with an unmodified benchmark.

## Analyst Takeaways

1. **Place enforcement before effects, not inside persuasive text.** The agent may reason incorrectly while a complete mediation boundary still prevents an out-of-scope action.
2. **Compare permission sets, not policy wording.** Solver-checked set inclusion catches subtle broadenings that look like ordinary refinements.
3. **Separate proposal, classification and approval.** A model can suggest necessary privileges; an independent mechanism detects expansion; an authorized approver decides whether to grant it.
4. **Coverage is part of the guarantee.** A proxy cannot protect built-in tools that bypass its mediated interfaces. Trace every path to protected effects before claiming confinement.
5. **Least privilege does not validate intent within the permitted set.** A malicious choice among authorized options can remain legal under the policy.

## Questions and Limitations

The threat model assumes a benign user and adversarial observations, not modified agent internals. Text-only misinformation, preference manipulation within permitted actions and multimodal interactions are outside scope. Initial model-generated policies can be too broad; narrowing preserves a broad initial mistake rather than correcting it automatically. Users can approve dangerous expansions, and adversarial narrowing can still impair utility.

The generic-policy prose says lower policies can further restrict the remaining action space, but its Algorithm 4 returns a higher-priority explicit allow unchanged. Its displayed generic-confinement inequality also needs care where the generic policy's default denial falls through to task-specific permission. The robust standalone claim is precedence of explicit high-priority decisions, not an unconditional intersection of all allow sets. No implementation audit was performed here.

## Vault Ideas Extracted

* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
