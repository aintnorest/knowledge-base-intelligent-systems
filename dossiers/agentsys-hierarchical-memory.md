---
type: Study Note
title: "AgentSys: Secure and Dynamic LLM Agents through Explicit Hierarchical Memory Management"
description: A prompt-injection defense that confines tool outputs to short-lived worker contexts, admits narrow structured results to a parent, and gates side-effecting recursive calls.
resource: https://arxiv.org/abs/2602.07398v1
source: /archive/agentsys-hierarchical-memory.pdf
tags: [agents, agent-memory, prompt-injection, agent-security, orchestration, context-engineering]
timestamp: 2026-09-28T18:39:26Z
---

# AgentSys: Secure and Dynamic LLM Agents through Explicit Hierarchical Memory Management — Study Notes

**Authors**: Ruoyao Wen, Hao Li, Chaowei Xiao, and Ning Zhang  
**Preprint**: arXiv:2602.07398v1, February 2026

## What It Is

AgentSys treats indiscriminate accumulation of raw tool output as both a security and a reasoning defect. A main agent specifies a narrow expected result *before* a tool returns; a fresh worker sees the untrusted result and extracts that result, without inheriting the main conversation or original query. Workers can recursively spawn workers for additional retrieval. Their local observations and reasoning do not enter the parent's persistent working context.

## The Boundary and Its Escape Hatches

The parent receives only a JSON-parsable worker return intended to match its previously declared nested-field/type schema. The authors describe this as schema-bounded communication, but the actual parent acceptance rule is **syntactic JSON parsing**, while schema matching guides the model's extraction: this distinction matters for security claims. String-valued fields can still carry adversarial instructions, and excessively broad schemas leave large channels open. An extraction failure returns a fixed error object.

Worker-initiated *command* tools receive an LLM validator check against the initial user query, compact call identifiers/arguments/intents, and the proposed action; the validator does not see raw tool responses. Read-like query tools are exempt, ambiguous tool classes default to commands, and the main agent's own top-level actions bypass this particular validator. A denial triggers sanitization of the offending raw output and a bounded worker restart. This preserves dynamic read-heavy work, but relies on correct tool classification, safe parent decisions, and a fallible LLM validator.

## Evidence and Trade-offs

On AgentDojo with GPT-4o-mini, full AgentSys reports **0.78% attacker success** versus **30.66%** undefended; benign utility is **64.36%** versus **63.54%**, attacked utility **52.87%** versus **48.27%**. On ASB it reports **4.25%** attacker success. Isolation alone, without validator and sanitizer, yields **2.19%** attacker success but reduces benign utility to **56.10%**. Without isolation but retaining the other mechanisms, attacker success rises to **8.62%**. Indiscriminate sanitization lowers attacker success to **0.18%** but benign utility to **50.85%**, illustrating the cost of removing useful data.

The full method uses **3.25 million tokens** on the AgentDojo comparison against **0.82 million** undefended; selective validation limits checks but not the cost of worker extraction. Under the paper's adaptive PAIR attack, success rises to **2.06%**. Across six foundation models security improves, but utility does not uniformly improve: GPT-5.1 benign utility falls from **84.75% to 74.87%**, and Qwen2.5-7B from **38.15% to 26.40%**. The paper's zero attacks on long trajectories is an observed bucket in these benchmarks, not a proof of isolation.

## Analyst Takeaways and Limits

1. **Memory lifetime is a security decision.** Early injected observations survive repeated agent decisions in a full-history loop; short-lived processors deny that persistence without forcing a fixed task graph.
2. **Return-value shape is not authorization.** Parsing JSON does not prove conformance to an intent schema or semantic safety of strings; an upstream schema and downstream action policy need separate enforcement.
3. **Threat boundaries differ by action origin.** Validation only covers worker-initiated commands, not the parent tools or model-judged meaning of returned values.
4. **Measure both utility and cost per model.** Strong injection resistance can accompany substantial utility loss on other models and roughly quadruple token use on the demonstrated base model.

The attacker can influence tool-returned observations, not the executor or world transition. Results from AgentDojo/ASB and their selected attacks do not establish safety against compromised tool implementations, novel data-flow attacks, or real-world high-impact parent actions.

## Vault Ideas Extracted

* [Privileged–Quarantined Agent Split](/vault/privileged-quarantined-agent-split.md)
* [Intent-Then-Isolate Execution](/vault/intent-then-isolate-execution.md)
* [Bounded Model Security Adjudication](/vault/bounded-model-security-adjudication.md)
* [Peer-Agent Message Trust](/vault/peer-agent-message-trust.md)
* [Subagent Context Inheritance Modes](/vault/subagent-context-inheritance-modes.md)

