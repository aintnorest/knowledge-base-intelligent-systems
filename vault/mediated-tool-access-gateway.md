---
type: Synthesis
title: Mediated Tool-Access Gateway
description: A shared agent-to-tool mediation point separates task-shaped discovery from invocation authority while centralizing credential custody and attributable audit.
tags: [access-control, agent-security, mcp, tool-use, enterprise, agents]
timestamp: 2026-10-05T21:56:50Z
---

# Mediated Tool-Access Gateway

A tool-access gateway places a trusted mediation point between agents and downstream capabilities. It curates what an agent can discover, authorizes the actual invocation independently of catalog visibility, holds upstream credentials, and records whose authority produced the effect. A common invocation protocol simplifies integration; it does not supply these organization-specific trust decisions.

## Operating Pattern

1. **Maintain a governed registry.** Record tool ownership, identity requirements, authentication models, policies, and curated capability surfaces. Present a task-relevant subset rather than exposing every operation on every server.
2. **Authenticate the effect path.** Resolve the caller to a user, service principal, or delegating agent with user context before evaluating model-generated arguments. Preserve the originating authority and intermediate actor lineage where delegation crosses agents.
3. **Authorize each invocation.** Evaluate the effective caller, operation, environment, and grant at execution time. Visibility is interface shaping, not permission; an exposed tool may still require approval or be denied. See [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md).
4. **Broker credentials and route the admitted call.** Keep personal grants distinct from team-service authority and attach the appropriate credential without returning reusable secret material to the agent. See [Egress Broker Credential Injection](/vault/egress-broker-credential-injection.md).
5. **Record decisions and outcomes.** Carry the same identity through policy, credential selection, routing, and audit. Logs should distinguish the initiating user, service principal, and acting or delegating agents rather than attributing everything to the final service account.

## Practical Use

Central mediation avoids implementing a different trust model for each agent–server pairing. Task-shaped catalogs can reduce irrelevant choices and accidental exposure, while the shared request path supports consistent revocation, rate limits, and attributable usage. Make the governed path usable enough to attract integrations, but independently restrict unmanaged routes: convenience and adoption are not proof of enforcement.

A gateway must check authorization against authenticated identity, not a user identifier or workflow handle chosen by the model. Upstream consent and a valid token also do not automatically authorize a different downstream client or audience. Preserve those boundaries when translating credentials or resuming a call after consent.

## Limitations and Failure Modes

- **Incomplete mediation:** direct upstream calls, unmanaged clients, local tool processes, or alternative network paths can evade policy and audit. A gateway's existence does not establish that every effect passes through it.
- **Privilege concentration and availability:** centralized credentials, policy, and routing form a high-value compromise target and operational dependency. Assess policy consistency, audit-persistence failures, revocation propagation, and behavior during outages separately.
- **Effect-blind authorization:** a permitted tool name does not establish safe recipients, resources, or payloads. Bind consequential approval to the reviewed invocation using [Approval Bound to Canonical Effect](/vault/approval-bound-to-canonical-effect.md).
- **History-blind authorization:** individually permitted reads and outbound writes may combine into an unauthorized disclosure or other harmful result. [Session-Composition Authorization](/vault/session-composition-authorization.md) addresses a different boundary from per-call checks.
- **Credential concealment is not intent assurance:** an injected or mistaken agent can still abuse operations already permitted to it. Identity lineage establishes attribution, not that the action reflects the user's wishes.
- **Unmeasured catalog quality:** smaller curated surfaces plausibly improve selection, but curation can omit necessary actions or misclassify risky capabilities. Adoption counts do not measure selection accuracy or adversarial robustness.

Distinguish implemented attribution from stronger cryptographic agent identity and short-lived task-scoped delegated credentials. Those are additional mechanisms, not properties implied by gateway architecture. Production accounts and vendor security descriptions provide architectural evidence, not independent proof of complete mediation or attack resistance.

## Sources

- [How DoorDash Built a Centralized Gateway for AI Agent-Tool Access dossier](/dossiers/doordash-agent-gateway-tool-access.md) — July 2026 first-party production account of curated discovery, independent call-time policy, credential custody, and user/service/agent attribution; cryptographic agent identity and credentials scoped to user, agent, task, and target tool are explicitly future work.
- [Paperclip MCP Access Governance — Discovery Versus Call Authorization dossier](/dossiers/paperclip-mcp-gateway-governance.md) — separates visible catalogs from execution policy, binds approvals to exact calls, and explicitly admits unmanaged bypass paths; a design account, not an attack evaluation.
- [Solving the Identity Crisis for AI Agents dossier](/dossiers/uber-agent-identity.md) — workload-attested per-hop token exchange preserves the initiating human and agent chain for downstream policy and audit; identity does not establish user intent.
- [Two questions every security review asks us dossier](/dossiers/composio-security-review.md) — vendor account of external credential custody, pre-argument user binding, and request-path policy; permitted operations remain usable after successful prompt injection.
- [MCP Security Best Practices dossier](/dossiers/mcp-security-best-practices.md) — draft threat guidance distinguishes client-specific consent, token audiences, caller-bound state ownership, and local execution boundaries; supplies no implementation audit or exploit-prevalence measurement.
