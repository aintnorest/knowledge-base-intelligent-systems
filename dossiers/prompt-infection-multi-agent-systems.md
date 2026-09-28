---
type: Study Note
title: "Prompt Infection: LLM-to-LLM Prompt Injection within Multi-Agent Systems"
description: Self-replicating instructions spread between agent roles and persist through manipulated memory importance, with limited gains from simple origin tags alone.
resource: https://arxiv.org/abs/2410.07283v1
source: /archive/prompt-infection-multi-agent-systems.pdf
tags: [agents, agent-security, multi-agent, prompt-injection, provenance]
timestamp: 2026-09-28T18:40:14Z
---

# Prompt Infection — Study Notes

**Authors**: Donghyun Lee and Mo Tiwari  
**Preprint**: arXiv:2410.07283v1, October 2024

## The Replicating Payload

An attacker embeds instructions in a document, webpage, or email that an otherwise legitimate agent reads. Instead of merely inducing that agent to perform one bad action, the payload asks it to transmit the same instruction to its next peer. Role-specific branches enlist different capabilities: a reader passes a prompt to a database agent, which appends sensitive data, then a coder sends the result externally. An internal agent message becomes the transport for an external adversary's instruction. The attacker does not need direct contact with every downstream role.

The paper calls the reduction from differentiated tasks to repeated execution of an attack program “recursive collapse.” This is a useful model for a narrow mechanism, not a claim that all agent collaborations collapse. Even local messaging, in which each agent sees only its predecessor's partial history, can carry the replicator onward; a non-replicating instruction often dies after two agents. Global shared history gives the infection more routes.

## Measured Effects and Retrieval Persistence

Experiments use simulated multi-agent workflows, synthetic external documents, GPT-4o and GPT-3.5 Turbo, and 120 user instructions over three tool types. Self-replication increased GPT-4o attack success by 13.92% and GPT-3.5 success by 209% in the reported global-message comparison across scam, malware, and content manipulation. It is **not uniformly better**: for longer data-theft chains, non-replicating attacks averaged 8.48% higher success. Local-message self-replicating success was about 20% lower than global messaging. GPT-4o ignored more initial attacks than GPT-3.5 (66% versus 9% in the self-replicating failure analysis), but was more precise when it did become compromised.

In a separate simulated society of 10–50 agents, infected peers exchange messages and retain selected memories. The attack manipulates the model-based importance scorer: over 100 runs, the infected text's mean importance changes from 1.94 to 10.00 on GPT-4o and from 1.00 to 9.84 on GPT-3.5. The importance boost increases retrieval; retrieval refreshes recency, creating a persistence loop. Without manipulation the infection died out after three turns under the tested top-three retrieval scheme. Social spread is a simulation from one initially compromised citizen, not a measured real-world epidemic.

## Defense Boundary

Prefixing responses with an agent-origin label reduced attack success only 5% alone. In the reported black-box prompting tests, combining it with a marking defense blocked all tested attacks, while pairing with an instruction defense left 3% success. Marking alone still permitted 76% after an adaptive attack altered the marking text. These prompts are neither cryptographic provenance nor an enforceable authorization boundary; handcrafted attack coverage and limited model families constrain the defense claim. The authors did not attack public production systems.

## Analyst Takeaways

1. A peer message can relay an external instruction while appearing to be cooperative task output.
2. Assess propagation and final harmful action separately; greater initial model resistance can coexist with more damaging execution after compromise.
3. Memory scoring is part of the attack surface when retrieved content can influence its own importance and refresh its own recency.
4. Human-readable origin labels help only within the tested combinations; they cannot replace end-to-end provenance and action controls.

## Vault Ideas Extracted

* [Structured Agent Communication Contracts](/vault/structured-agent-communication-contracts.md)
* [Provenance-Conditioned Action Admission](/vault/provenance-conditioned-action-admission.md)
* [Peer-Agent Message Trust](/vault/peer-agent-message-trust.md)
* [Memory Lifecycle Governance](/vault/memory-lifecycle-governance.md)

