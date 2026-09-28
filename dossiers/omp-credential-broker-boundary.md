---
type: Study Note
title: Oh My Pi Credential Broker and Gateway Boundary
description: Centralized refresh-token custody, broker-backed gateway execution, redacted but credential-bearing snapshots, and the distinction between routing and authorization.
resource: https://github.com/can1357/oh-my-pi/blob/main/docs/auth-broker-gateway.md
source: /archive/omp-credential-broker-boundary.md
tags: [agents, agent-harness, agent-security, access-control, privacy, reliability]
timestamp: 2026-09-28T18:39:25Z
---

# Oh My Pi Credential Broker and Gateway Boundary — Study Notes

## What It Is

Oh My Pi documents an optional, operator-deployed broker that owns the canonical credential database and refreshes OAuth credentials, plus a forward gateway that resolves broker-backed credentials and submits provider requests. The intended deployment removes provider credentials from ordinary gateway clients' model requests; the broker and gateway remain trusted processes. Transport encryption among these services is explicitly the operator's responsibility.

## Custody and Request Path

The broker is the sole writer of OAuth refresh tokens. Clients receive a snapshot whose refresh fields are replaced with sentinels; on expiry they ask the broker to refresh the credential rather than refreshing it locally. Credential updates wait for broker persistence and then update the client snapshot. The gateway dispatches through provider-specific logic instead of a raw passthrough, retaining request shaping and refresh behavior at one choke point. Gateway clients do not see access tokens in gateway responses, but direct broker clients receive snapshots containing access credentials; hiding refresh tokens does not make every broker bearer safe to hand to an untrusted client.

A local encrypted snapshot cache can permit startup during transient broker unavailability, subject to a freshness window and revalidation on reachable startup. Authentication failures are not concealed by the cache, and expired OAuth tokens still need broker refresh. Thus resilience is conditional: cached discovery can work while a broker is briefly down, but an expired credential or a missing/stale cache may prevent effective execution. Definitive refresh failures disable credentials; transient failures preserve them for retry.

## The Limits of Client-Side Views

An optional per-client account pool filters visible OAuth identities, snapshots, and attributed usage reports and fails closed on malformed policy data. The source explicitly calls this **routing, not authorization**: the trusted client still has the broker bearer, sees raw responses before filtering, and can invoke broker endpoints directly. API-key credentials are not hidden by this pool. Similarly, encrypted caches on a shared host are not per-pool stores; each trusted process applies its own view after reading the broker snapshot. Untrusted clients need server-side authorization, not this local filter.

The broker is opt-in. A reachable broker and gateway must be protected as real authority boundaries: bearer-protected APIs include credential writes and refresh requests, and the operator owns secure transport and exposure of their health endpoints. The design describes remote custody, not proof that a compromised gateway, broker host, or trusted bearer cannot access credentials.

## Analyst Takeaways and Limits

1. **Separate custody from presentation.** Withholding refresh tokens from snapshots is valuable, but a bearer that can obtain access credentials is still security-sensitive.
2. **Distinguish client-side routing from server-side admission.** Filtering after an authenticated snapshot cannot prevent a hostile bearer holder from requesting unfiltered state.
3. **State the outage boundary concretely.** Cached snapshots can sustain startup but cannot replace refresh authority or make stale credentials valid.
4. **Review topology, not just encryption.** Broker, gateway, transport, cached copies, and every bearer holder jointly determine the credential threat model.

## Vault Ideas Extracted

* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
* [Retrieval as Host Capability](/vault/retrieval-as-host-capability.md)
* [Control–Data Plane Separation for Agents](/vault/control-data-plane-separation-for-agents.md)
* [Egress Broker Credential Injection](/vault/egress-broker-credential-injection.md)

