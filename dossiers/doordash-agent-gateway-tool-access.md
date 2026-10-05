---
type: Study Note
title: How DoorDash Built a Centralized Gateway for AI Agent-Tool Access
description: DoorDash's production gateway centralizes identity, per-call policy, secret custody, task-scoped catalogs, and audit while keeping stronger cryptographic agent delegation an explicitly future investment.
resource: https://careersatdoordash.com/blog/how-doordash-built-a-centralized-gateway-for-ai-agent-tool-access/
source: /archive/doordash-agent-gateway-tool-access.html
tags: [access-control, mcp, agent-security, governance, enterprise, agents]
timestamp: 2026-10-05T21:48:37Z
---

# How DoorDash Built a Centralized Gateway for AI Agent-Tool Access — Study Notes

**Authors**: Siddarth Kodwani and Vasily Vlasov; DoorDash  
**Published**: July 30, 2026  
**Status**: First-party production engineering account, not a peer-reviewed security evaluation. Eligible for its architecture, authority boundaries, tradeoffs, and reported adoption—not its onboarding instructions.

## What It Is

A governed mediation layer between agents and internal or third-party tools. MCP standardizes discovery and invocation, but does not supply the organization's identity, authorization, credential custody, revocation, catalog curation, ownership, and audit model. DoorDash moves those responsibilities out of repeated agent–server integrations into a shared gateway.

The enduring idea is **task-shaped discovery plus independently enforced invocation**, with credentials retained by infrastructure rather than handed to the agent. Centralization buys consistent controls and distribution, while making the mediation path a privileged dependency.

## Problem and Motivation

One coding workflow can span source control, tickets, search, CI, observability, and documents. A downstream server can expose hundreds of capabilities even when a task needs five. Without shared governance, each pairing accumulates bespoke authorization, OAuth, secrets, catalogs, rate limits, and logs. Raw server catalogs also expose irrelevant or destructive operations and burden model selection.

The account's implicit threat model includes excessive tool visibility, unauthorized or misattributed actions, exposed reusable credentials, personal grants borrowed for team automation, and the blast radius of internet-facing access. It does not present an adversarial test campaign or a formal prompt-injection defense.

## Mechanism as an Idea

**Separate the registry from enforcement.** A registry holds agents, servers, ownership, policy, authentication models, discovered capabilities, and curated surfaces. A request-path proxy authenticates the caller, authorizes the action, limits request rates, injects credentials, routes to the server, and emits usage evidence. The article calls the gateway overall a control plane; within it, the proxy is explicitly the data plane and the registry supplies control-plane state. This naming is different from [planner/parser control–data separation](/vault/control-data-plane-separation-for-agents.md), which keeps untrusted text from modifying privileged action structure.

**Carry identity through the effect path.** A request resolves to a user, service, or agent acting with delegated user context. Authorization can depend on the agent, user, tool, environment, read versus write variant, and whether an action requires a personal grant or team principal. The same identity accompanies routing, credential use, and audit; policy is infrastructure, not an instruction the model is asked to obey.

**Keep credential custody outside the agent.** The gateway either propagates verified internal identity, injects a gateway-held token, uses an encrypted per-user OAuth grant, or brokers non-personal service credentials. The stated OAuth grant scope is **agent × user × server**. That separates a user's authority from a team automation's service principal rather than treating all reachable credentials as interchangeable.

**Curate a task surface, then reauthorize the call.** Bundles combine selected operations from several servers; filters select the approved subset for an agent, audience, user group, or environment. The gateway reconciles names and descriptions into a coherent catalog and applies policy both at discovery and invocation. Hiding tools is useful interface shaping but is not by itself the authorization boundary. This matches the distinction in [Paperclip's gateway model](/dossiers/paperclip-mcp-gateway-governance.md).

**Treat missing consent as a recoverable state.** A missing personal grant can pause a supported interactive client, obtain authorization, and resume the original call; less capable clients receive a structured authorization-required result. This is a protocol-level interaction design, not proof of exactly-once effects across interruption or retry.

**Keep trust domains distinct.** Internal and external-facing workflows use separate proxy planes with shared libraries and registry concepts. This limits internet-facing blast radius while allowing different authentication models. Shared policy state and implementation remain dependencies, so separate planes do not prove complete isolation.

## Operating Experience and Admissions

As reported in **July 2026**, the gateway has:

- **More than 200 registered MCP servers**, exposing thousands of tools curated into approved subsets.
- **More than 30 agents and services**, used by thousands of employees, with none of those agents/services handling raw credentials according to the authors.
- **Millions of tool calls each week**, described as authenticated, authorized, and recorded as structured usage events.

These are first-party scale and adoption claims, not independent measurements of security effectiveness, agent quality, or latency. The source provides no before/after attack-success rate, catalog-selection accuracy, outage rate, or cost savings.

The shared path permits tool-, caller-, and audience-specific rate limits, identity-linked usage and cost attribution, and shadow evaluation of a limit before enforcement. Downstream cost attribution depends on providers supplying cost metadata. The authors repeatedly stress that the governed path must be easier than direct integration: adoption and self-service are practical preconditions for coverage, not cryptographic prevention of bypass.

**Future work is not deployed assurance.** Stronger cryptographic agent identity and short-lived credentials scoped to **user, agent, task, and target tool** are explicitly the next major investment. Dynamic task-aware discovery, risky-description checks, secret/PII detection in errors, security report cards, and redacted analytic event streams are also described as investments, not completed controls. Existing request attribution must not be recast as the future two-cryptographic-principal delegation model.

## Analyst Takeaways

1. **An invocation standard does not settle authority.** A shared gateway can centralize identity, grants, policy, and audit without pretending MCP supplies the organization-specific trust model.
2. **Catalogs are both interfaces and exposure boundaries.** Small task-oriented surfaces can reduce irrelevant choices and opportunity for misuse, but the claimed quality gain is unquantified. Enforce authorization again on actual invocation.
3. **Credential hiding narrows theft, not authorized misuse.** A compromised agent may still abuse an allowed operation. [Delegation Without Trust](/dossiers/delegation-without-trust-authorization-broker.md) describes narrower identity-bound grants; its synthetic broker evidence and DoorDash's production adoption account answer different questions.
4. **Per-call authorization is not sequence authorization.** The article does not establish checks against harmful compositions of individually permitted reads and outbound writes. [Session-Composition Authorization](/vault/session-composition-authorization.md) addresses that separate gap.
5. **Server admission remains a supply-chain problem.** Gateway exposure does not prove downstream implementation safety, release provenance, or trustworthy descriptions; [MCP Tool Supply-Chain Assurance](/vault/mcp-tool-supply-chain-assurance.md) covers distinct artifact and runtime controls.

## Questions and Limitations

- Is direct access technically prevented, or only discouraged by convenience? “Default path” and adoption counts do not prove complete mediation of every effectful action.
- Central secrets and policy concentrate privilege and operational dependence. The post does not document high availability, compromise recovery, policy distribution consistency, or audit-persistence failure behavior.
- Revocation is centralized in the design, but the timing of revocation propagation, in-flight calls, grant refresh races, and downstream credential lifetime are not measured.
- The account does not specify argument-level authorization, approval bound to a canonical effect, changed-tool quarantine, session-history policy, or a prompt-injection boundary. Their absence from the post is not evidence that DoorDash lacks all such controls.
- Rich identity-linked logs support accountability but can contain sensitive requests or responses; the post names redacted event streams as future work without proving current redaction coverage.
- Smaller catalogs and separate proxy planes are design choices with plausible benefits, not quantitative proof of safety or model improvement. The reported production scale is valuable operating context, not a substitute for adversarial evaluation.

## Vault Ideas Extracted

* [Mediated Tool-Access Gateway](/vault/mediated-tool-access-gateway.md)
* [Egress Broker Credential Injection](/vault/egress-broker-credential-injection.md)
