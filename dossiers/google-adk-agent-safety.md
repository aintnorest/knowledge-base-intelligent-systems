---
type: Study Note
title: Safety and Security for AI Agents
description: Google ADK's layered agent-safety model contrasting service and delegated user identities with deterministic tool guards, screening hooks, sandboxing, and network perimeters.
resource: https://adk.dev/safety/
source: /archive/google-adk-agent-safety.html
tags: [agents, agent-security, access-control, tool-use, sandboxing, prompt-injection]
timestamp: 2026-09-28T18:39:25Z
---

# Safety and Security for AI Agents — Study Notes

## What It Is

Google ADK describes security as a composition of authorization identity, tool-bound deterministic guards, input/output screening, code isolation, evaluation and tracing, and network controls. Its threat sources include ambiguous instructions, hallucinations, adversarial user input, and indirect injection in tool results; the outcomes include unauthorized transactions, exfiltration, and harmful content. The page is design guidance with illustrative examples, not an evaluation of measured defense effectiveness.

## Whose Authority Does the Tool Carry?

A tool acting under an agent's service identity can be constrained by the external resource's access policy, but all users of the agent share that credential's ceiling. Where users have different permissions, this alone is insufficient and actions need attribution back to the controlling human. Alternatively, a tool can use the controlling user's delegated identity: that prevents the agent from accessing resources its user cannot, yet delegated OAuth scopes may be coarser than the task warrants. The right identity is therefore a per-tool boundary choice, not a property of the whole agent.

Tools can narrow the model's action space at the implementation boundary. ADK distinguishes model-authored arguments from developer-controlled tool context: a query tool can compare a requested table or user against trusted context rather than accept the model's assertion of authority. Tool-admission callbacks inspect actual calls, while runner-level plugins can apply shared policies across agents. A fast model judging input, tool output, and agent output offers additional screening, but a probabilistic safety verdict is not a replacement for the deterministic check that prevents an unauthorized operation.

## Execution and Presentation Boundaries

Generated code needs isolation from the local host. For a custom executor Google recommends a hermetic environment without network or API egress and cleanup across executions to prevent exfiltration between users. Identity policies and network perimeters limit coarse resource reach; tool-level policy is still needed to control particular actions inside that perimeter. Tracing and evaluation aid inspection rather than grant permission. The rendered UI is another execution surface: displaying model-generated HTML or script without escaping can turn an injected image or URL into browser-based exfiltration.

## Analyst Takeaways and Limits

1. **Bind real authority at the external system and tool, not the prompt.** Service identity, delegated user identity, and developer-provided policy context each enforce a different constraint.
2. **Treat screening as one layer.** Model-based injection and content filters can fail or misclassify; deterministic action constraints must remain in the execution path.
3. **Include code, network, and browser rendering in the threat model.** Containing a shell tool does not stop a browser interpreting unsafe agent output.
4. **Do not infer coverage from a framework menu.** The page presents recommended patterns and illustrative code, but no measured bypass rate, default-policy guarantee, or end-to-end security proof.

## Vault Ideas Extracted

* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
* [Control–Data Plane Separation for Agents](/vault/control-data-plane-separation-for-agents.md)
* [Bounded Model Security Adjudication](/vault/bounded-model-security-adjudication.md)
