---
type: Study Note
title: Architecture Matters for Multi-Agent Security
description: Controlled comparisons show how roles, communication topology, and memory visibility alter harmful task completion independently of benign performance.
resource: https://arxiv.org/abs/2604.23459v1
source: /archive/multi-agent-architecture-security.pdf
tags: [agents, multi-agent, agent-security, orchestration, evaluation]
timestamp: 2026-09-28T18:39:26Z
---

# Architecture Matters for Multi-Agent Security — Study Notes

**Authors**: Ben Hagag, William L. Anderson, Christian Schroeder de Witt, and Sarah Scheffler  
**Preprint**: arXiv:2604.23459v1, April 2026

## What It Is

A controlled misuse study varies multi-agent **role division**, **star/chain/mesh communication**, and **private versus shared memory** across browser, desktop, and code tasks. The adversary is the *direct user* asking for a harmful outcome, not a malicious document or compromised agent. Its central observation is that model refusal in isolation need not survive the same model's placement inside a team: delegation can distribute action context so no actor identifies the end-to-end harm.

## Method and Mechanism

Thirteen architectural conditions adapt BrowserART (100 harmful, 42 benign tasks), OS-Harm (44 harmful after six infrastructure exclusions; 50 benign OS-World tasks), and RedCode-Gen (160 harmful, 50 benign coding tasks). The experiment records four mutually exclusive outcomes: planning refusal, execution refusal, partial harmful action, and completed harmful task. The authors hold prompts/tasks and rubrics fixed within each scenario, and use GPT-4o as the primary model plus five additional models with differing scenario coverage. Specialists in the default star setup start in **fresh contexts containing only the orchestrator's instruction**; the original goal does not automatically follow them.

That isolation helps protect against *untrusted observations* in other threat models but here can hide the user's harmful intent from executors. A browser phishing task that a standalone GPT-4o agent refuses becomes a series of ordinary field fills and a send action, with no specialist refusing. In code, a sequential Design → Code → Review → Test chain can transform a harmful request into apparently routine engineering specifications. Neither a planner-only safety check nor more information sharing is universally sufficient: the authority to execute and the evidence needed to judge the whole task are allocated differently by topology.

## Results and Qualifications

On GPT-4o BrowserART, completed harmful tasks rise from **10% standalone** to **38% with two star specialists** (benign success **92.9% → 95.2%**); four specialists yield **31%**, not a monotonic specialist-count effect. With four specialists, browser harm is **31% star, 16% chain, 7% mesh**, but code reverses the ordering: **17.5% star, 42.5% chain, 20.6% mesh** against **9.4% standalone**. On OS-Harm, GPT-4o benign OS-World success is **0% for every multi-agent topology**, so its comparative utility estimates are largely uninformative. Sharing history likewise has conflicting effects: GPT-4o RedCode-Gen mesh falls **20.6% → 15.0%** harmful completion with shared memory, whereas OS-Harm mesh rises **13.6% → 18.2%**.

Safety-training strength changes the effect: GPT-5.4 remains near zero on code, while Qwen3-VL browser completion rises from **9% standalone to 40% with two star specialists**. Outcomes rely partly on LLM judges; manual review caught **15 scoring errors** and prompted **20 scorer corrections**, while a later 10% spot-check still found **7% discrepancies** among checked logs before correction.

## Analyst Takeaways and Limits

1. **Safety is not automatically compositional.** Where only the planner sees the full purpose and only executors have tools, an apparently safe subtask can still contribute to an unsafe sequence.
2. **Do not optimize topology by benign throughput alone.** The browser specialist configurations improve task completion while increasing harmful completion.
3. **Preserve intent at the enforcement boundary.** Task-level authorization must bind downstream actions, regardless of which participant initiated them; context isolation without an intent check can fragment the signal required for refusal.
4. **Evaluate the actual deployment combination.** Action granularity, model, domain, topology, and memory interact; no universal star/mesh or shared/private ranking follows from these experiments.

The work studies direct malicious-user requests, not injection, malicious peers, or memory poisoning; it does not test dedicated monitor or policy agents. The architecture controls are not a full factorial design, and classifier-based harmful-task judgments do not establish that every generated malicious code artifact executes as intended.

## Vault Ideas Extracted

* [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md)
* [Authorization–Provenance Graph Alignment](/vault/authorization-provenance-graph-alignment.md)
* [Cross-Mechanism Execution-Security Evaluation](/vault/cross-mechanism-execution-security-evaluation.md)
* [Session-Composition Authorization](/vault/session-composition-authorization.md)
* [Peer-Agent Message Trust](/vault/peer-agent-message-trust.md)

