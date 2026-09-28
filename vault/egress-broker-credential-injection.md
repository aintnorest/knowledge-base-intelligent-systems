---
type: Synthesis
title: Egress Broker Credential Injection
description: A trusted outbound mediator keeps bearer credentials outside untrusted compute and injects them only after authorizing a destination and request.
tags: [agent-security, access-control, privacy, sandboxing, agents]
timestamp: 2026-09-28T19:05:17Z
---

# Egress Broker Credential Injection

An egress broker holds service credentials outside untrusted compute and attaches them only to admitted outbound requests. The workload receives the effect of an authenticated call without possessing transferable bearer material. This separates credential custody from permission to act: hiding the key does not decide whether an authenticated request is appropriate.

## Operating Pattern

1. Keep long-lived credentials, refresh authority, and any decryptable cache in a trusted broker or provider adapter, not in guest files, inherited environments, prompts, or tool responses.
2. Route the workload's relevant outbound paths through a host-controlled mediator; authenticate workload identity independently of request-supplied headers and deny unmediated paths.
3. Authorize destination and operation against the effective account, user, and task scope. Check request semantics where a host-only destination rule would grant excessive authority.
4. Attach the credential only to the approved upstream request, bind it to the intended endpoint, and prevent its return in responses or logs. Reject requests if dynamic authorization or credential refresh is unavailable rather than silently bypassing mediation.
5. Define revocation and lifetime for cached credentials and existing connections; recheck authorization when policy or the bound identity changes.

## Why It Matters

A contained process can still read an environment secret and send it out over permitted network access. Brokered injection reduces theft of reusable credentials even if untrusted code or an agent is compromised. But client-side filtering of an authenticated credential snapshot is **routing, not authorization**: if that client sees the unfiltered broker response or retains a bearer that can request it directly, the filtered view offers no security boundary. Authorization must be enforced by the broker or gateway against the caller and the requested effect. See [capability-enforced agent execution](/vault/capability-enforced-agent-execution.md) for action-boundary checks and [provider-boundary secret substitution](/vault/provider-boundary-secret-substitution.md) for a distinct model-text disclosure boundary.

## Practical Use

Use an external network fence plus a broker when generated code must call a service without receiving its credentials. Keep direct service paths closed, distinguish ordinary egress from credential-bearing routes, and test with a compromised workload: try retrieving the raw key, bypassing the broker, invoking an unauthorized operation through an allowed host, and continuing with stale authorization.

## Limitations

- An authorized but harmful call remains possible; operation scoping and user-intent checks are separate from non-possession of the secret.
- Intercepting encrypted requests for fine-grained checks or injection requires a trusted TLS intermediary, expanding its plaintext exposure and certificate-management obligations.
- A proxy limited to connections or hostnames may miss application-level routing, shared front doors, alternative protocols, or other outbound paths. Credential caches and brokers themselves remain high-value targets.

## Sources

- [Oh My Pi Credential Broker and Gateway Boundary dossier](/dossiers/omp-credential-broker-boundary.md) — distinguishes broker custody and gateway use from client-side account-pool filtering, which is not authorization.
- [Defense in Depth: How Replit Secures Every Layer of the Vibe Coding Stack dossier](/dossiers/replit-defense-in-depth-vibe-coding-stack.md) — describes credential-holding connector sidecars and an agent-tool proxy outside untrusted code.
- [Dynamic, identity-aware, and secure Sandbox auth dossier](/dossiers/cloudflare-sandbox-auth-outbound-workers.md) — describes per-sandbox mediated HTTPS calls, credential injection, and changing egress authority.
- [A sandbox without a network boundary is only half a sandbox dossier](/dossiers/vercel-sandbox-network-boundary.md) — separates host-level network controls from selective request inspection and brokered authentication.
- [How Auth Proxy secures network access for LangSmith agent sandboxes dossier](/dossiers/langchain-langsmith-sandbox-auth-proxy.md) — describes network interception, externally supplied short-lived headers, and failure-closed dynamic authentication.
- [E2B Infrastructure Architecture dossier](/dossiers/e2b-runtime-architecture.md) — locates sandbox traffic mediation and guest-control routes outside the guest, illustrating why route classification matters.
- [OpenShell Sandbox Architecture dossier](/dossiers/nvidia-openshell-sandbox-architecture.md) — binds secret resolution to admitted provider destination and request policy in a separate supervisor.
- [Cloud environments dossier](/dossiers/claude-code-cloud-environment-model.md) — contrasts proxy-held repository credentials and constrained operations with secrets explicitly passed into a guest.
- [Solving the Identity Crisis for AI Agents dossier](/dossiers/uber-agent-identity.md) — supplies workload-attested, audience-bound actor lineage for downstream authorization, without equating identity with user intent.
