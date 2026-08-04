---
type: Study Note
title: ISOLATE GPT: An Execution Isolation Architecture for LLM-Based Agentic Systems
description: Study notes on a hub-and-spoke, process-isolated architecture for third-party LLM apps that mediates cross-app data flow through structured messages, user consent, and a trusted hub.
resource: https://arxiv.org/abs/2403.04960v2
source: /archive/isolate-gpt-execution-isolation-agentic-systems.pdf
tags: [agent-security, sandboxing, access-control, prompt-injection, multi-agent, agents]
timestamp: 2026-07-14T16:07:20Z
---

# ISOLATE GPT: An Execution Isolation Architecture for LLM-Based Agentic Systems — Study Notes

**Authors**: Yuhao Wu, Franziska Roesner, Tadayoshi Kohno, Ning Zhang, and Umar Iqbal

**Venue**: NDSS Symposium 2025

**DOI**: [10.14722/ndss.2025.241131](https://doi.org/10.14722/ndss.2025.241131)

**Preprint**: arXiv:2403.04960v2 [cs.CR]
**Pages**: 20

## What It Is

ISOLATE GPT is a prototype architecture for LLM systems that run third-party apps. Its systems-security premise is that mutually untrusted apps should not share one LLM context and execution environment. Each app instead executes in an isolated **spoke** with its own LLM and memory; a trusted **hub** routes user requests, selected data, and any cross-app collaboration.

The contribution is containment, not a general cure for prompt injection. If an email app consumes a malicious email and is compromised, the paper does not claim to make that app safe. It aims to stop the compromise from reading another app's data, changing another app's behavior, or contaminating the system-wide LLM context.

## Motivation and Threat Model

In a shared-memory execution model, app descriptions, tool APIs, conversations, and returned content enter the same LLM context. A malicious app can try to redirect the LLM's use of another app, while untrusted content handled by one app can become an indirect instruction to the full system. The authors also emphasize non-adversarial failures: vague terms such as "personal data" can cause health details collected for a medical app to be passed to a travel app, and conflicting app instructions can distort unrelated responses.

The threat model trusts the host system and LLM infrastructure but treats third-party apps and content processed by them as untrusted. It includes cross-app/system data theft, app or LLM behavior manipulation, and safety failures caused by ambiguous natural-language instructions. Attacks contained wholly inside a single app are out of scope.

## Hub, Spokes, and Mediated Collaboration

1. A deterministic, non-LLM **hub operator** receives the request, invokes a hub planner to identify a primary app and possible supporting apps, and asks hub memory for needed data. It creates or activates a spoke only after user permission.
2. A spoke has its own deterministic operator, dedicated planning/action LLM, per-app memory, and the app's APIs. Its LLM sees the query, scoped hub-provided data, its own history, and advertised *functionalities* rather than every installed app's instructions and data.
3. The **inter-spoke communication (ISC) protocol** forbids direct spoke-to-spoke and LLM-to-LLM messaging. A caller asks the hub for a functionality; the hub identifies a provider and returns a prescribed request/response schema with an ephemeral spoke identifier. Operators validate format before routing both directions through the hub.
4. The hub advertises capabilities without revealing which apps are installed, reducing app-fingerprinting exposure. It compares a requested collaboration with its independently generated plan and includes that assessment in the permission dialog.
5. Users approve app selection, cross-spoke data exchange, and data egress. Permissions may be one-time, session-scoped, or permanent, but irreversible actions such as email sending cannot receive permanent permission in the proposed model.

The implementation uses processes, `seccomp`, `setrlimit`, and network restrictions to an app's root domain. It uses LangChain and LlamaIndex, with GPT-4 for evaluation. These choices demonstrate feasibility, not a complete reference monitor or proof that every path is isolated.

## Evidence From the Evaluation

The authors extend an injection-oriented benchmark to **1,598** attacks, adding 544 cases that target data in system memory. In the shared `VANILLA GPT` baseline, the reported average attack success rate is **20.2%**. In ISOLATE GPT, a permission dialog appeared for **7.6%** of attacks and every displayed dialog carried a warning. This is conditional on a user refusing suspicious flows: the design moves risky cross-boundary actions to an approval point; it does not establish that users will consistently make correct choices.

Four case studies illustrate the boundary. A malicious ride-sharing app alters another app's fare in the shared baseline but not when each runs in a separate spoke. A malicious email can prompt the baseline to retrieve an SSN-related drive file, exfiltrate it, and delete evidence; in the isolated design, the request reaches a warning-bearing cross-spoke permission prompt. The other cases show blocked accidental reuse of medical details by a travel app and prevent a fiction-writing app's instruction from affecting a symptom-diagnosis response.

On LangChain benchmarks, both systems score 1.00 on single-app and multiple-app correctness. For multi-app collaboration, both report 0.76 intermediate-step correctness and 0.95 final-output correctness; for an app-free email-extraction benchmark, their string scores are 0.70 (ISOLATE GPT) and 0.71 (baseline). These curated results support functional comparability in those scenarios, not a general claim that isolation has no product impact.

Isolation adds latency and cost. For **75.73%** of tested queries, the reported overhead is under 30%; the 90th and 95th percentile overheads are 1.24× and 1.80×. In a 10% benchmark sample, ISOLATE GPT cost 1.85× more. Hub/spoke planning and memory extraction dominate the extra work, especially as more apps collaborate. Proposed mitigations include warm spokes, parallel work, app-selection heuristics, and exposing only likely-needed capabilities.

## My Takeaways

1. **Treat an agent app as a security principal, not merely a tool description.** Separate execution and context by default. A malicious instruction can still harm its own spoke, but it should not silently acquire every installed integration's authority.
2. **Make cross-boundary cooperation a typed, mediated transaction.** A schema, deterministic operator, and hub-controlled route provide enforcement points that a shared natural-language context lacks. Validate shape and authority before delivering data, and retain the mediation record.
3. **Format validation is not semantic safety.** Typed dates and identifiers can be checked automatically, but raw strings may carry adversarial instructions. The paper's fallback is consent plus a hub-generated warning; production systems also need least privilege, policy enforcement, audit, and careful handling of false positives and alert fatigue.
4. **Measure the security/usability trade-off end to end.** Isolation overhead rises with planning, memory transfer, and collaboration. Optimize those costs without collapsing the boundary that makes authorization inspectable.

## Questions and Limitations

- The hub, operators, permission UI, and host/LLM are trusted computing-base components. A bug, injection path, or overbroad authority there could weaken containment.
- Pre-reviewed functionality schemas and syntactic validation do not prove that a schema-valid message is benign, necessary, or minimally scoped. The authors leave comprehensive automated permission policy and UX design for future work.
- The benchmark's warnings are not a user study. A 100% warning rate among dialogs helps only if warnings are comprehensible and users do not train themselves to approve them.
- The results use a prototype with GPT-4, benchmark prompts, tailored case studies, and automatically granted permissions for performance tests. They do not establish coverage against arbitrary tools, side channels, malicious installation, or within-app compromise.
- Per-app processes, models, state stores, and consent paths create operational cost and lifecycle complexity. Proposed shortcuts require independent security review because they can introduce new information-flow paths.

## Vault Ideas Extracted

* [Mediated Agent Execution Isolation](/vault/mediated-agent-execution-isolation.md)
