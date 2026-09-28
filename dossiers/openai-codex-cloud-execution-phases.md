---
type: Study Note
title: "Cloud environment — Codex"
description: OpenAI's two-phase cloud execution model separates networked dependency preparation and temporary secrets from the default offline agent phase, with cache invalidation limits.
resource: https://learn.chatgpt.com/docs/environments/cloud-environment
source: /archive/openai-codex-cloud-execution-phases.html
tags: [agents, coding-agents, sandboxing, access-control, agent-harness]
timestamp: 2026-09-28T18:41:04Z
---

# Cloud environment — Codex — Study Notes

**Publisher**: OpenAI  
**Source type**: Product documentation, captured September 2026

## What It Exposes

A cloud task begins in a managed container with a checked-out repository. Environment preparation has internet access for dependency acquisition; subsequent agent execution runs terminal commands in a loop with internet access **off by default**, unless separately allowed. A resulting diff and answer form the user handoff. This phase distinction permits dependency setup without granting the coding agent the same network capability.

The important confidentiality difference is between ordinary environment variables, which persist throughout setup and agent execution, and designated secrets, which are available only during setup and removed before the agent starts. This reduces direct agent access to setup credentials but does not prove that a setup action cannot leave credentials in files, logs, installed artifacts, or a reusable container state. The source does not offer such a stronger guarantee.

## Caching and Trust Tradeoffs

Containers may be cached for **up to 12 hours**. A cached environment is prepared against the default branch; on resumption the requested branch is checked out and optional maintenance can refresh dependencies. Changes to preparation scripts, variables, or designated secrets invalidate the cache automatically, whereas repository changes that make cached dependencies incompatible can still require a manual reset. For Business and Enterprise environments the cache is shared by authorized workspace users, so cache invalidation is not confined to one developer's task.

The default image trades convenience and faster starts against dependence on an image/toolchain chosen by the provider; runtime version pinning and additional dependency preparation are available but are operational details, not durable guarantees. Outbound environment traffic passes through an HTTP/HTTPS proxy; the page does not specify a complete proxy policy or make claims about all non-command integrations.

## Analyst Takeaways

1. **Separate privileged preparation from autonomous execution.** A networked, credentialed bootstrap can produce an agent-ready workspace without passing those secrets directly into the agent phase.
2. **Treat cache validity as an input to correctness.** Branch checkout alone does not ensure cached dependencies match the new commit; a stale preparation layer can mislead an otherwise correct agent.
3. **Do not equate secret removal with end-to-end secrecy.** Residual files and setup side effects remain a separate threat-model question.

This is first-party, version-sensitive documentation; it reports the runtime contract, not measured isolation or cache-coherency outcomes.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Permission-Scoped Synthesis](/vault/permission-scoped-synthesis.md)
* [Runtime-Activated Application Sandboxing](/vault/runtime-activated-application-sandboxing.md)

