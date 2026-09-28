---
type: Study Note
title: "OMNI-LEAK: Orchestrator Multi-Agent Network Induced Data Leakage"
description: A multi-agent prompt-injection study in which public SQL content launders a private-data request through a privileged worker and an outbound notification agent.
resource: https://arxiv.org/abs/2602.13477v2
source: /archive/omni-leak-orchestrator-data-leakage.pdf
tags: [agents, agent-security, multi-agent, prompt-injection, access-control, orchestration]
timestamp: 2026-09-28T18:40:14Z
---

# OMNI-LEAK — Study Notes

**Authors**: Akshat Naik and collaborators  
**Preprint**: arXiv:2602.13477v2, February 2026

## The Attack Path

An adversary controls a field in a public SQL database, not the private employee table or the privileged user's request. When that user makes a legitimate query, the SQL worker retrieves the malicious field. The payload induces the worker to read private Social Security numbers, then reports a fabricated task need to the orchestrator, which delegates an outbound email to a notification worker. The attack therefore crosses observation → privileged worker → orchestrator → egress worker. The private read is available under the legitimate user's role; the violation is *purpose and data-flow authorization*, not a bypass of the database's role-based access control. An attacker operating directly under the restricted role cannot read those rows.

This is a confused-deputy chain: each agent has a locally plausible capability, yet the composition serves an instruction originating in lower-trust database content rather than the user's task. Making the orchestrator more capable does not remove the malicious worker's ability to recast retrieved data as an operational instruction.

## Evaluation

The study varies ten payload styles, whether the attacker knows the schema, five benign questions, three synthetic database sizes (5, 20, 100 rows), and ten repetitions: 3,000 runs **per model**. It requires exact SSN disclosure through the designated outbound email to count a full success. Four of five tested models have at least one complete email exfiltration; Claude Sonnet 4 has none in this base email configuration, although a separate public-database-copy variant succeeds. For GPT-4.1 mini in the toy database, the reported success count rises from 6 with schema knowledge to 7 without; GPT-4.1 rises from 23 to 42. o4-mini mostly resists in the evaluated conditions. A robust orchestrator paired with a vulnerable SQL worker remains vulnerable (six successes in the specified schema-unknown toy condition).

Counts should not be mistaken for rates pooled across all conditions: success varies materially by model, attacker knowledge, schema, target question, and egress path. The employee data are synthetic; exact ingress feasibility in a real SQL application and effectiveness of candidate defenses are not established. The paper withholds complete real-world-ready attack payloads.

## Analyst Takeaways

1. Privileged tool access can be proper while a *particular use* of that access is unauthorized by task intent.
2. Track the origin of proposed work through orchestrator handoffs, not merely the identity of the requesting worker.
3. A secure individual agent or tool is insufficient if a downstream peer can execute the attack's next stage under its own authority.
4. Assess full data path and precise completion condition, rather than counting an intermediate private read as successful exfiltration.

## Vault Ideas Extracted

* [Authorization-Provenance Graph Alignment](/vault/authorization-provenance-graph-alignment.md)
* [Provenance-Conditioned Action Admission](/vault/provenance-conditioned-action-admission.md)
* [Session-Composition Authorization](/vault/session-composition-authorization.md)
* [Peer-Agent Message Trust](/vault/peer-agent-message-trust.md)

