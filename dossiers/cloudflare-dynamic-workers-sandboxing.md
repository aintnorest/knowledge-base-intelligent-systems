---
type: Study Note
title: Sandboxing AI agents, 100x faster
description: Cloudflare's case for disposable V8 isolates around generated code, capability-shaped RPC and mediated egress, with an explicit comparison to VM hardening.
resource: https://blog.cloudflare.com/dynamic-workers/
source: /archive/cloudflare-dynamic-workers-sandboxing.html
tags: [agents, sandboxing, agent-security, access-control, tool-use]
timestamp: 2026-09-28T00:00:00Z
---

# Sandboxing AI agents, 100x faster — Study Notes

**Publisher:** Cloudflare  
**Date:** March 24, 2026 (page modified July 22, 2026)

## What It Is

Dynamic Workers execute generated JavaScript in fresh V8 isolates instantiated by a parent Worker. Cloudflare argues that millisecond startup and a few megabytes per isolate make a disposable execution boundary per generated snippet practical; its comparison of roughly 100× faster startup and 10–100× less memory than typical containers is a vendor estimate, not a published controlled benchmark. The alternative—pooling long-lived containers—risks carrying task state across trust domains.

## Boundary and Authority

The host supplies a deliberately narrow environment: typed RPC objects give generated code specific operations without generic access to the underlying service; outbound HTTP can be blocked or routed through a host-controlled interceptor that inspects requests and adds credentials. The Cap’n Web bridge makes remote capability calls look like ordinary TypeScript calls. The agent can use the *effect* of an authorized service without possessing its credential. Cloudflare prefers a purpose-built typed interface to filtering an existing HTTP API: a proxy must understand methods, paths, headers, and their combined semantics to enforce equivalent least privilege. Generated code can return just filtered results instead of feeding every intermediate API response back to the model.

## Tradeoffs and Limits

The fast path favors JavaScript snippets; Python or WebAssembly are possible but slower to load for short runs, and a general container remains more flexible for native workloads. Most one-off isolates are colocated with the parent, sometimes on the same thread. This efficiency makes isolation hard to equate with hardware virtualization: **Cloudflare explicitly says isolate hardening is trickier than hardening hardware VMs**, V8 presents a more complicated attack surface, and V8 security bugs are more common than typical hypervisor bugs. Cloudflare cites rapid patch deployment, a second-layer sandbox, risk-based cordoning, hardware-assisted V8 protections, malicious-code scanning, and Spectre research as defense in depth; the post does not demonstrate an independent escape-rate comparison. Internet interception and credential injection do not by themselves make an overbroad allowed service safe.

## Analyst Takeaways

Disposable compute boundaries reduce state reuse, but the important policy lies in which capabilities cross that boundary and whether network access bypasses them. Security claims must include the underlying isolate, supervisory layers, patch response, and policy design—not just a startup-time comparison.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
