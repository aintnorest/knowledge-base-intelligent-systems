---
type: Synthesis
title: Tool-Availability Abstention
description: An agent-control rule that requires explicit recognition of missing or insufficient tools and forbids fabricated calls, outputs, or claims of completed external actions.
tags: [tool-use, reliability, evaluation, agents]
timestamp: 2026-07-22T06:16:14Z
---

# Tool-Availability Abstention

Tool-availability abstention is an agent's ability to stop at a real capability boundary. Before it calls a tool or claims an external result, the agent must determine whether the currently exposed tools can perform the requested operation. If no adequate tool is available, it should state that boundary or request the missing capability—not invent a tool, tool result, or direct answer that purports to rely on unavailable external state.

## Operating Pattern

1. Represent the runtime tool inventory explicitly: names, schemas, permissions, side-effect class, and current availability.
2. Compare the task's required operation with that inventory. A user mentioning a function name does not add that function to the runtime.
3. Permit a call only when its name is registered, its arguments pass validation, and its declared capability is relevant to the requested operation.
4. When the capability is absent or insufficient, return a structured unavailable state: what cannot be verified or executed, what tool or information is missing, and any safe alternative.
5. Distinguish absence from refusal. When a sufficient, authorized tool *is* available, the policy must allow competent use rather than defaulting to evasive non-action.
6. Test the boundary directly: no-tool requests, irrelevant/distractor tools, malformed schemas, stale or failed tools, and requests whose answer cannot be grounded without an external call.

## Why It Matters

An agent can be good at ordinary tool selection yet still produce a convincing fabricated call when a tool is absent. Those failures are particularly misleading because the response can resemble a genuine trace: a plausible API name, JSON arguments, and invented result may all be fluent but non-executed.

Availability should therefore be enforced by the runtime and reflected in evaluation, not left to an instruction such as “do not hallucinate tools.” The required behavior is conditional: abstain when the tool is missing or irrelevant; use the tool correctly when it is present and appropriate.

## Practical Use

Put a deterministic call validator between model output and execution. It should reject unregistered names and schema-invalid arguments before they reach a tool runner, then give the model a bounded observation describing the missing capability. Keep the executor's actual result separate from model-authored text so a completion cannot be mistaken for a completed action.

Measure false action, unsupported direct answer, correct abstention, and unjustified refusal separately. A single tool-call success score conceals the distinction between “used an available tool well” and “recognized that no adequate tool exists.”

## Limitations

- Matching a natural-language request to a sufficient tool can itself be ambiguous; a static name and schema check does not prove semantic adequacy.
- A correct abstention may still be unhelpful. The agent should provide a clear next step, such as requesting a tool, credential, location, or user confirmation.
- Tool availability is only one action constraint. Authorization, provenance, freshness, rate limits, and side-effect safety require separate controls.
- A benchmark that labels every direct answer as unsupported can be too strict for tasks whose answer is safely available from provided context or stable model knowledge; scope that test to requests requiring external evidence or action.

## Sources

- [The Reasoning Trap dossier](/dossiers/reasoning-trap-tool-hallucination.md) — introduces no-tool and distractor-tool tests and reports increased hallucination rates in its reasoning-enhanced model comparisons.
