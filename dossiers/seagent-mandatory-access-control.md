---
type: Study Note
title: "Taming Various Privilege Escalation in LLM-Based Agent Systems: A Mandatory Access Control Framework"
description: SEAgent mediates provenance-bearing action traces and reconstructs source labels from memory to resist prompt injection and malicious peers.
resource: https://arxiv.org/abs/2601.11893v1
source: /archive/seagent-mandatory-access-control.pdf
tags: [agents, agent-security, multi-agent, access-control, provenance, prompt-injection]
timestamp: 2026-09-28T18:40:14Z
---

# Taming Various Privilege Escalation in LLM-Based Agent Systems — Study Notes

**Authors**: Zimo Ji and collaborators  
**Preprint**: arXiv:2601.11893v1, January 2026

## The Security Model

SEAgent places mandatory access control outside the model and labels agents, tools, and retrieved material by integrity, privacy, and sensitivity. A provenance graph records how untrusted input flows through a mediator to an action. Policies judge that *path*, not just whether a tool name is permitted: a malicious peer can persuade an otherwise trusted agent to act as its deputy, and a poisoned retrieval result can bypass a protected spoke through a shared hub. Altering an argument within an otherwise approved plan is another distinct escalation.

Policy selection is specificity-first, with first-match overrides. Critically, **no matching rule defaults to allow**; durable or single-use exemptions also change what is enforced. Thus good labels and complete policy coverage are preconditions for the strongest measured results, not automatic consequences of installing the framework. Semantic labels require human verification and can be stale or wrong.

## Memory as a Provenance Boundary

SEMemory clears the model context and graph between rounds while retaining immutable, source-tagged entries. Retrieval reconstructs the relevant lineage graph so old observations do not re-enter as unlabeled authoritative text. This addresses the usual tradeoff between persistent usefulness and taint erasure: preserve evidence and origin, not the unbounded prior transcript. It still depends on retrieving the right memories and correctly carrying their labels.

## Experiments and Caveats

The paper reports 0% attack success with policy enforcement in its InjecAgent and AgentDojo evaluations; the AgentDojo naive baseline is 39.14% and the IsolateGPT attack success figure is 0.82%. On API-Bank's original multi-round tasks, correctness falls from 72.97% for the naive system to 68.29% for SEAgent, with higher token and time costs. This is an explicit utility/security tradeoff rather than free protection.

The AWS multi-agent task study does **not** enable policy enforcement or security labels because it uses simulated tools: reported travel completion rises from 71.97% to 74.24%, mortgage from 52.46% to 63.11%, and mortgage token use falls by more than 38%. Those results concern workflow utility, not proof of secure multi-agent enforcement. Malicious-peer evidence is a small 9-agent/5-agent case study, not a comprehensive peer-attack benchmark.

## Analyst Takeaways

1. A decision needs the upstream source–mediator–action lineage, especially when trusted agents relay untrusted requests.
2. Memory can preserve useful context without laundering authority only when source attribution survives retrieval and reconstruction.
3. Default-allow gaps and exceptional grants are part of the effective policy and must be tested as deliberately as explicit denials.
4. Separate security benchmarks from simulated-tool utility results when comparing architectures.

## Vault Ideas Extracted

* [Provenance-Conditioned Action Admission](/vault/provenance-conditioned-action-admission.md)
* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
