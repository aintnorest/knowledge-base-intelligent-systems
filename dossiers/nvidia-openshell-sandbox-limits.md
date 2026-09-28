---
type: Study Note
title: OpenShell Sandbox Limits
description: NVIDIA's supervisor resource-bound model, admission ownership, saturation behavior, and admitted aggregate-control gaps.
resource: https://github.com/NVIDIA/OpenShell/blob/main/architecture/sandbox-limits.md
source: /archive/nvidia-openshell-sandbox-limits.md
tags: [agents, sandboxing, agent-security, reliability, access-control]
timestamp: 2026-09-28T20:00:00Z
---

# OpenShell Sandbox Limits — Study Notes

**Publisher**: NVIDIA OpenShell  
**Source**: repository architecture document, captured September 2026

## What It Is

The OpenShell supervisor processes untrusted agent traffic across connections in one process. This document treats resource ceilings as part of the security boundary, not throughput guarantees. It complements the [isolation architecture](/dossiers/nvidia-openshell-sandbox-architecture.md) and [policy semantics](/dossiers/nvidia-openshell-security-policy.md); the current numbers are early-version implementation observations, not stable APIs.

## Resource Ownership and Compound Bounds

The component first allocating, queueing, or waiting owns the corresponding bound: network supervisor for message assembly, middleware runner for external stages, L7 parser for application inspection. Immutable platform ceilings constrain operator and inspection limits; opt-in fail-open processing must not override platform safety or protocol integrity. Capacity is acquired before buffering and retained through the complete operation so a later stage cannot multiply work beyond its original budget. A stream that can keep making tiny increments needs both idle and absolute deadlines, not just one resettable timer.

For example, middleware admits 32 concurrent buffered units of at most 4 MiB each, plus 64 waiters; this implies roughly 128 MiB of admitted payload before envelope/parser overhead, not a promise of cheap concurrency. Parsed WebSocket text similarly holds process-wide assembly capacity through decompression, policy, middleware, credential rewriting, and forwarding. Its assembly has a 30-second input-idle and two-minute absolute deadline; forwarding separately has a two-minute total deadline. A process-lifetime permit survives policy/registry reload, so replacing configuration cannot launder old resource consumption out of the budget. Ordinary allowed traffic streams rather than accumulating a connection-sized body; parsing and transformation change that memory model.

Terminal behavior is explicit: reject before reading a body when admissions saturate, close an oversized or malformed frame, backpressure where possible, or end a relay at deadline. This matters as much as the numeric ceiling: truncating a security-sensitive request could change policy meaning, whereas refusing it preserves integrity. Saturation telemetry should exclude bodies, credentials, query strings, and uncontrolled diagnostics.

## Admitted Gaps and Tradeoffs

Several application body bounds have defaults but no shared platform maximum; an operator override for token-cache lifetime can *replace* rather than narrow a response-derived cap. The supervisor documents neither an aggregate connection budget nor per-destination fairness. A policy-status FIFO is intentionally unbounded so a gateway outage cannot lose revision ordering or block enforcement; prolonged revision production while delivery fails can instead consume memory. Reconnect logs choose the opposite tradeoff, dropping excess records to protect supervisor health. Deadlines and saturation telemetry remain inconsistent across paths.

## Analyst Takeaways

- Security budgets need an owner, scope, admission moment, retention lifetime, and terminal action; a collection of per-parser constants is not a whole-system resource model.
- Shared quotas should survive hot reloads and cover the whole transformation chain, or old and new generations can each consume a nominally global budget.
- Availability and evidence retention compete. An unbounded reliable status queue may threaten the same process it protects from blocked work; report this explicitly rather than equating reliability with safety.
- No load-test measurements or adversarial saturation results are provided. The 2026 snapshot should not be projected onto later releases without checking deployment code.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Bounded Tool Observations](/vault/bounded-tool-observations.md)
* [Interruption Recovery Without Duplicate Effects](/vault/interruption-recovery-without-duplicate-effects.md)

