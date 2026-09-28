---
type: Study Note
title: "Bounded Agents: Delegation Security for Multi-Agent AI Systems"
description: Session-scoped principal chains attenuate delegated permissions and restrict harmful action sequences outside compromised agent models.
resource: https://arxiv.org/abs/2608.15888v1
source: /archive/bounded-agents-delegation-security.pdf
tags: [agents, agent-security, multi-agent, access-control, orchestration]
timestamp: 2026-09-28T18:40:14Z
---

# Bounded Agents — Study Notes

**Author**: Xabier Muruaga  
**Preprint**: arXiv:2608.15888v1, August 2026

## The Delegation Contract

The Agentic Principal Chain represents a session's user intent and each subsequent delegation as signed authorization state. At every hop, allowed resources, actions, and data are intersected; prohibitions accumulate; budgets remain cumulative. Model-generated instructions may *request* work but cannot widen the effective chain. An external gateway checks sensitive actions against the chain and shared session history before execution. The threat model assumes agent reasoning or a peer can be compromised, while signature, gateway, and the policy state remain trusted.

This is stronger than merely limiting each call independently. A legal read followed by a legal outbound send can be illicit as a sequence, so the session-level policy blocks forbidden pairs and ordered `k`-tuples. Serialized admission prevents parallel agents from each observing a harmless history and jointly completing a prohibited sequence. Structural monotonicity only guarantees the next delegation does not grow beyond its parent; if descendants inherit *all* of the parent's permission, the practical blast radius may remain unchanged.

## Measured Behavior

In AgentDojo, the evaluation splices a ground-truth malicious tool call after an initial legitimate step, deliberately bypassing any assumption that the model itself rejects attacks. Across 609 attack pairs in four domains, measured exfiltration success was 0%; destruction fell from 38.6% to 4.0% and manipulation from 90.5% to 12.1%. Interactive utility declined by 8.6 percentage points across 949 task pairs. In 544 InjecAgent data-theft cases, success was 0% with complete restrictions, but omitting a single prohibited action pair raised attack success to 39.9%. The system still allowed 60.4% of direct-harm cases in the relevant evaluation: attenuation is not a complete content or intent guard.

The reported in-process idle p99 decision time is 0.24 ms and excludes production network and policy-distribution costs. The results support enforcement of *specified* permissions and sequences under the test setup, not a general proof of safe intentions.

## Boundaries and Limitations

A child can misuse an action that is legitimately authorized for its parent; parameter-level abuse and overly coarse action categories can also pass the gateway. Missing rules are material, as the one-rule ablation shows. Opening a fresh session for each step can evade session-local sequence restrictions unless user intent and history bind those sessions. Serializing shared admission and revocation across distributed workers is part of the security argument, not merely an implementation optimization.

## Analyst Takeaways

1. The principal chain binds delegation to user intent while keeping policy enforcement outside LLM control.
2. Monotonic permissions alone are insufficient for multi-step exfiltration or harmful combinations; admission must evaluate ordered shared history.
3. Evaluate missing-policy, same-permission misuse, parallel admission, and session-splitting cases alongside positive benchmark results.

## Vault Ideas Extracted

* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
* [Assume-Compromise Boundary Testing](/vault/assume-compromise-boundary-testing.md)
* [Session-Composition Authorization](/vault/session-composition-authorization.md)

