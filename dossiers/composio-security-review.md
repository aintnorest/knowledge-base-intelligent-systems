---
type: Study Note
title: Two questions every security review asks us
description: Composio's first-party account of credential custody, project and user isolation, tool-call enforcement, and the limits of its prompt-injection controls.
resource: https://composio.dev/blog/two-questions-every-security-review-asks-us
source: /archive/composio-security-review.html
tags: [agents, agent-security, access-control, prompt-injection, enterprise, privacy]
timestamp: 2026-09-28T18:39:25Z
---

# Two questions every security review asks us — Study Notes

## What It Is

Composio answers whether its staff can read customer tokens and whether one customer can access another's data by tracing a tool call from a project-scoped application key through authentication, policy checks, a single-call execution container, and the third-party API. This is the vendor's account of its current architecture, explicitly distinguished from its separate remediation report following a May 2026 security incident; it is not an independent penetration-test report.

## Credential Custody and Tenant Binding

OAuth credentials are envelope-encrypted at rest with per-project keys wrapped by a key held in AWS KMS. A credential is decrypted for execution, attached to the outgoing request, and withheld from the model, application-facing API, and developer; a proxy-execution path lets applications reach additional endpoints without retrieving the raw token. This sacrifices direct token use in exchange for retaining execution policies and logs. The company also describes a customer-managed-key variant in which a proxy in the customer's cloud alone handles plaintext, while Composio retains a control plane but lacks the decryption key. That is a different custody boundary, not a guarantee that third-party applications never see the token.

An incoming request is associated with organization, project, and user before execution. Project ownership partitions accounts, tokens, and authentication configurations; a user identity fixed when a session is created selects the connected account, rather than a user ID chosen in model-generated tool arguments. Each call runs in its own ephemeral container. Composio recommends separate projects for downstream tenants; a multi-user project still depends on correct session-to-user binding and enforcement of the project filter.

## Prompt-Injection Ceiling and Residual Risk

The company's answer to prompt injection is not that the model will reliably ignore malicious documents. Organizational policy provides a ceiling and sessions can receive narrower tool access; checks execute in the request path. A successful injection can still use every tool and account already permitted to the session. The application must supply content-level filtering and redaction before responses reach the model, and build any human approval checkpoint itself: the platform supplies action controls but does not perform the approval decision for the application.

The declared limits matter. Full request and response payloads are logged by default for up to one year; turning off future payload logging preserves the audit record and does not remove past payloads. Staged temporary files have a separate 24-hour deletion lifecycle. Removing a connection stops calls via Composio but upstream token revocation is not automatic by default and depends on provider support. The account claims gated, logged privileged staff access rather than an absolute inability of all staff or runtime processes to see plaintext in every deployment.

## Analyst Takeaways and Limits

1. **Credential concealment and action authorization are complementary.** Keeping tokens out of model context blocks direct token extraction; limiting the session's real actions bounds what an injected instruction can still accomplish.
2. **Fix identity before model-controlled arguments.** Binding project and user at session admission prevents a model-selected target identifier from silently switching credentials.
3. **Audit the entire data lifecycle.** Credential custody, full-payload logs, temporary files, provider retention, and upstream revocation operate on different clocks and controls.
4. **Treat the article as a vendor security claim.** It cites attestation and external testing but does not publish isolation test cases, exploit rates, or evidence that every integration honors the asserted boundary. The separate incident remediation history deserves review when assessing present risk.

## Vault Ideas Extracted

* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
* [Control–Data Plane Separation for Agents](/vault/control-data-plane-separation-for-agents.md)
* [Provenance-Conditioned Action Admission](/vault/provenance-conditioned-action-admission.md)
* [Delegated OAuth Proxy Hazards](/vault/delegated-oauth-proxy-hazards.md)

