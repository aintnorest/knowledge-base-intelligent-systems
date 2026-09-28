---
type: Study Note
title: Multi-Agent gVisor Isolation (MAGI)
description: A first-party demonstration of separately sandboxing agent cores and supporting tools, with explicit separation of execution containment from action authorization.
resource: https://gvisor.dev/blog/2026/04/15/magi-multi-agent-gvisor-isolation/
source: /archive/gvisor-magi-multi-agent-isolation.html
tags: [agents, sandboxing, agent-security, multi-agent, access-control]
timestamp: 2026-09-28T18:39:50Z
---

# Multi-Agent gVisor Isolation (MAGI) — Study Notes

**Authors:** Etienne Perot and Jing Chen  
**Date:** April 15, 2026

## What It Is

A first-party, self-hosted demonstration of three different agents running in separate gVisor sandboxes, with local inference, a messaging server, browser automation, search infrastructure, and a code-execution daemon also isolated. Most of the post is operational setup; the lasting contribution is its decomposition of *what* to sandbox in a multi-component agent system. The screenshots and sample interactions show a working demonstration, not measured escape resistance or an independent security audit.

## Isolation Is a Graph, Not One Container

The agents exchange messages through a separate Matrix server while each has its own containerized core. Local model serving is also a distinct service. Browser, crawler, and code execution are not treated as harmless dependencies: the Hermes example places a nested Docker daemon in its own gVisor container and runs browser and crawling subsystems separately. In the example, broad capabilities granted to that nested daemon are *inside its gVisor boundary*, rather than host capabilities. A privileged component needed for one task need not be co-resident with the agent's persistent memory and communication processes.

The authors distinguish sandboxing tool calls, long-running subsystems, and the core daemon. A core agent that can alter its own installation effectively needs substantial authority **over its own sandbox**, but not over the host. This is a useful boundary distinction, not a claim that unlimited authority within the sandbox is harmless: agent data, reachable services, and mounted secrets can still be modified or exfiltrated.

## What It Does Not Protect

The post explicitly argues that a strong execution sandbox is insufficient for autonomous agents: actions also need authorization and credential handling. Its examples mention separate egress-time credential injection, restricted tool access that may widen when needed, and checkpoints/rollback as complementary approaches, rather than protections supplied by gVisor itself. The demonstration intentionally wires agents to a shared messaging and inference fabric, so compromise or misuse of an allowed communication channel is outside the host-kernel escape question. Isolation of every individual tool call in a fresh instance is described as ongoing work, not what this example achieves.

## Analyst Takeaways and Limits

1. **Separate principals and subsystems by blast radius.** A browser, crawler, model server, execution daemon, and agent core have different trust needs even when deployed on one host.
2. **Execution confinement does not decide intent.** The boundary can contain code yet still allow an agent to send a damaging message or use a granted credential.
3. **Treat a demonstration as compatibility evidence.** The post demonstrates working interactions, including browser and nested-container use, but supplies no comparative performance, controlled attack results, or proof that every component is configured with least privilege.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
