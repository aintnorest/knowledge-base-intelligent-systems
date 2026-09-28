---
type: Study Note
title: "The OpenHands Software Agent SDK: A Composable and Extensible Foundation for Production Agents"
description: First-hand V0-to-V1 redesign replacing coupled sandbox-centric processes with an event-sourced conversation, immutable components, portable workspaces, and separated execution risk assessment.
resource: https://arxiv.org/abs/2511.03690v2
source: /archive/openhands-software-agent-sdk.pdf
tags: [agents, coding-agents, agent-harness, reliability, sandboxing, agent-memory]
timestamp: 2026-09-28T18:39:26Z
---

# The OpenHands Software Agent SDK: A Composable and Extensible Foundation for Production Agents — Study Notes

**Authors**: Xingyao Wang, Simon Rosenberg, Juan Michelini, Calvin Smith, Hoang Tran, Engel Nyst, Rohit Malhotra, Xuhui Zhou, Valerie Chen, Robert Brennan, and Graham Neubig  
**Venue**: MLSys 2026  
**Preprint**: arXiv:2511.03690v2, April 2026

## What It Is

The OpenHands team reports a production-driven redesign from V0's monolithic, mandatory-sandbox agent architecture to V1's reusable SDK, separate tool/workspace/server packages, and optional remote isolation. The interesting evidence is not the package inventory but *why* the split was needed: two independently failing processes could corrupt conversations, application-specific execution paths duplicated logic, and more than 140 configuration fields across 15 classes produced hard-to-reason-about precedence and drift.

## State and Execution Model

Agent, model, and tool specifications are immutable, serializable objects. A single conversation state owns live metadata plus an append-only action/observation event log; event types distinguish what the model sees from internal bookkeeping. On recovery the runtime loads state and replays events, detecting incomplete execution. Condensation is itself an event, leaving the original history intact while constructing a smaller model-facing context. Typed tool proposals are validated before execution and converted into structured observations; a registry resolves serializable tool specifications to environment-specific executors on the receiving side of a process boundary.

The default local workspace gives the agent direct host file and process access: **local-by-default is not a security boundary**. Remote workspace variants carry the same action interface into an isolated container via an agent server, trading simplicity for process separation and deployment complexity. A separate risk analyzer assigns action risk; a confirmation policy decides whether to wait for user approval, so assessment can be replaced without changing tool executors. LLM risk assessment is fallible and is not equivalent to OS confinement. Subagents are independent conversations reached through a normal delegation tool; the paper acknowledges that robust general multi-agent coordination is not yet designed.

## Production Evidence and Boundaries

In a **15-day parallel production rollout**, system-attributable errors fall from **78.0 to 30.0 per thousand conversations**, a reported **61% reduction**. V0's inter-pod authentication and readiness errors vanish under co-located execution, but a V1 condensation/extended-thinking defect contributes nearly **29.7 SDK errors per thousand**. This shows a change in failure mode, not that V1 is error-free or that a randomized comparison isolates one design decision. On **433 SWE-bench conversation traces (39,870 events)**, event persistence has **0.20 ms median** and **0.31 ms p95** per event; crash-recovery p95 is **14.9 ms**, but at the longest observed trace (358 events) it is **32.1 ms**—the paper's blanket 'under 20 ms' wording does not hold for its maximum row.

With Sonnet 4, old and new agent achieve the same **68.0%** SWE-bench Verified score. With Sonnet 4.5, V1 reports **72.8% versus 64.6%** and credits new extended-thinking integration; this is not a pure architecture ablation. Broad benchmark results across 14 models and five task families are system capability evidence, not measured security assurance.

## Analyst Takeaways and Limits

1. **State location determines recovery complexity.** Immutable components and one logged, replayable conversation avoid parallel mutable configuration paths, but require deliberate treatment of events that should not re-enter the model.
2. **Keep runtime portability and security posture distinct.** An identical workspace API can target an unconfined local process or an isolated server; the caller must know which boundary actually holds.
3. **Observe which failures disappear and which replace them.** Removing an inter-pod hop cut rollout failures, while context/model interface bugs remained.
4. **Risk classification cannot guarantee safety.** Per-action human confirmation and independent sandboxing cover different cases; shared tenant credentials/MCP services still require a comprehensive security audit.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Memory Lifecycle Governance](/vault/memory-lifecycle-governance.md)
* [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md)
* [Structured Execution Memory](/vault/structured-execution-memory.md)

