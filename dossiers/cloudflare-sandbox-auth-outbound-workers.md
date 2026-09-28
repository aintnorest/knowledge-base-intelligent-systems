---
type: Study Note
title: Dynamic, identity-aware, and secure Sandbox auth
description: Cloudflare's same-host programmable egress broker for container and microVM sandboxes, including per-instance TLS interception, credential injection, and changing policies.
resource: https://blog.cloudflare.com/sandbox-auth/
source: /archive/cloudflare-sandbox-auth-outbound-workers.html
tags: [agents, sandboxing, access-control, agent-security, privacy]
timestamp: 2026-09-28T00:00:00Z
---

# Dynamic, identity-aware, and secure Sandbox auth — Study Notes

**Publisher:** Cloudflare

## What It Is

This article concerns Cloudflare **Container/Sandbox egress**, not the V8 Dynamic Worker execution boundary. A programmable outbound Worker on the same machine intercepts sandbox traffic, applies policy, observes requests, and optionally injects a credential unavailable to the workload. The trusted broker can discriminate by sandbox identity and reach platform resources via bindings rather than hand broad service credentials to generated code.

## Trust Boundary and Lifecycle

A secret mounted inside a sandbox is transferable even if its VM contains the process; workload identity can reduce token scope and lifetime but upstream APIs may not support it. A proxy retains the bearer credential outside the untrusted environment and authorizes specific calls on its behalf. Host/domain interception, method filtering, and per-instance authorization can be combined. Policy can change during a workload: allow a package source during trusted preparation, then remove that route before less-trusted execution. Such a transition is substantive security policy, not merely configuration convenience.

For HTTPS request inspection or injection, the proxy must terminate TLS. Cloudflare describes a unique ephemeral CA per sandbox, trusted by default inside its Sandbox instances, with CA private material held in a sidecar rather than shared with the workload or other sidecars. The local interception layer routes HTTP(S) to an outbound Worker; even connections already open can pick up a changed handler on subsequent HTTP requests. Certificate interception expands what the broker can see and therefore enlarges the trusted platform and its sensitive-data exposure. The article does not publish a formal bypass analysis or measurement of proxy overhead beyond calling it minimal.

## Limits and Takeaways

An injected token cannot be stolen from the sandbox's files, but sandboxed code can still make an abusive *authorized* request, leak data through an allowed endpoint, or exploit a policy that misinterprets HTTP semantics. TLS interception relies on the sandbox trusting the issued CA; ordinary containers can opt into that trust, so application-specific trust handling deserves scrutiny. Identity-aware egress decisions must derive identity from the trusted runtime, not attacker-supplied request claims. Keeping credentials out of compute is a narrower guarantee than keeping data and delegated authority safe.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
* [Egress Broker Credential Injection](/vault/egress-broker-credential-injection.md)
* [Runtime-Activated Application Sandboxing](/vault/runtime-activated-application-sandboxing.md)

