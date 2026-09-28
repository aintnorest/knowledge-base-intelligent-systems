---
type: Study Note
title: Organizing Context in a Multi-Agent Harness
description: LangChain's design distinction between inherited and isolated subagent histories, selected by work continuity versus independent verification.
resource: https://www.langchain.com/blog/organizing-context-in-a-multi-agent-harness
source: /archive/langchain-subagent-context-modes.html
tags: [agents, multi-agent, context-engineering, orchestration, agent-harness]
timestamp: 2026-09-28T18:39:32Z
---

# Organizing Context in a Multi-Agent Harness — Study Notes

**Authors**: Thushanth Bengre and Chester Curme  
**Published**: September 8, 2026

## What It Is

LangChain describes two context-propagation modes for supervisor-delegated agents in Deep Agents. A subagent's intermediate work remains outside the supervisor's context in either mode; the choice concerns what the *subagent* inherits when starting work. The article offers design reasoning and examples, not measured latency, cost, accuracy, or independence results.

## Isolated Versus Forked Context

An isolated agent receives a fresh conversation containing the supervisor's delegated task, not the full prior transcript. This is the documented default and helps separate several parallel investigations, keep their prompts focused, and avoid passing the supervisor's assumptions to an independent reviewer. It can also make a worker repeat file reads or rediscover a diagnosis the supervisor already established.

A forked agent inherits the supervisor's current conversation, with the originating delegation call removed and the delegated task presented as a new message with role clarification. Its own work then returns to the supervisor as a single final result. This is suited to continuing an already-investigated fix or extracting durable memory from the conversation. The source argues that prompt-cache reuse can make this cheaper and faster than redoing investigation, but supplying a large irrelevant history can also increase costs or distract the worker; no comparison data is presented.

## Match Context to Epistemic Role

A worker implementing a diagnosis benefits from inherited observations; a verifier assessing the resulting change should not inherit the diagnosing agent's reasoning if independent assessment is the goal. Self-contained researchers likewise need a bounded question rather than every previous conversation turn. A memory extractor, by contrast, needs access to the interaction it will summarize, while independent file permissions can restrict what its output may change. These are two orthogonal choices: what the agent sees and what it is allowed to do.

Isolation is not a claim that a reviewer lacks all shared biases: it may still share a model, prompt policy, repository state, and evidence selected by its delegator. Conversely, forking a history does not remove the need to authenticate the inherited material or control the fork's tool authority.

## Analyst Takeaways

1. Choose context inheritance by the subagent's relationship to prior reasoning: continuation favors a fork; independent judgment favors a fresh context.
2. Separating parent observation cost from child context inheritance reveals the actual tradeoff: the supervisor sees only the result even when the child sees the full parent history.
3. Prompt-cache savings are a plausible mechanism, not an observed universal speedup; compare them against redundant reads, irrelevant history, and verification anchoring.
4. Tool permissions remain a separate axis from conversation visibility.

## Vault Ideas Extracted

* [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md)
* [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md)
* [Subagent Context Inheritance Modes](/vault/subagent-context-inheritance-modes.md)

