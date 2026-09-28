---
type: Study Note
title: Cloud environments
description: Claude Code's hosted VM security model, including separate repository and internet proxies, allowlist exceptions, credential placement, and cached setup-state boundaries.
resource: https://code.claude.com/docs/en/cloud-environments
source: /archive/claude-code-cloud-environment-model.html
tags: [agents, coding-agents, sandboxing, access-control, agent-security]
timestamp: 2026-09-28T18:38:44Z
---

# Cloud environments — Study Notes

**Publisher**: Claude Code documentation  
**Captured**: September 2026; hosted defaults subject to change

## What It Is

A description of Anthropic-hosted Claude Code execution in a fresh per-session Ubuntu VM, with independently mediated internet, repository, connector, and model-service paths. Self-hosted sessions are a distinct security arrangement: the operator supplies runner isolation, egress, and credentials. The page's many operational options do not imply a single universal sandbox boundary.

## Network and Credential Model

The hosted default admits a selected set of external destinations through the session network proxy, rather than unrestricted egress. An environment's most restrictive network level still permits *separate* paths: GitHub via a dedicated proxy, enabled MCP connectors via Anthropic servers, the model API, and certain credential-associated destinations. Thus a “no outbound network” session is not an agent with no external capability. The GitHub proxy holds the real user token outside the VM and substitutes it for a scoped guest credential; it constrains pushes to the current branch, API operations to attached repositories, and GraphQL to a pinned set of workflows. These limitations protect credentials and operations but can prevent valid development workflows.

Credential handling is not uniform. Some API secrets can reside outside the VM for proxy-side attachment, whereas an ordinary environment variable supplied by an operator is readable by people using that environment and can enter the VM. A directly supplied GitHub token also crosses the guest boundary, unlike proxy-managed authentication. Hosted outbound internet uses a security proxy; a self-hosted runner instead uses its own network boundary. External connector traffic bypasses the VM's ordinary internet allowlist, so connector access must be evaluated separately.

## State and Failure Boundaries

Sessions start from a fresh repository clone, not from the operator's local machine state. A setup-stage filesystem snapshot can seed future sessions; it preserves installed tools and files, **not** running services. Committed repository hooks and local agent context may enter a single-repository session, while multi-repository starting context changes which repository-local settings load. Organizational server-managed policy can arrive separately from the clone, unlike workstation-local policy. In the documented hosted implementation, setup executes with high privilege *before* the agent launches; this is a distinct trusted provisioning stage, not evidence that arbitrary agent commands run with that authority.

## Analyst Takeaways and Limits

A VM prevents direct access to the user's machine but offers multiple mediated external capabilities; enumerate each rather than treating a network access label as comprehensive. Keep guest secrets distinct from proxy-held credentials, and check how trusted setup artifacts become reusable session state. This is a dated product description, not an independent test of hypervisor or proxy effectiveness; its hosted security claims do not transfer automatically to self-hosted runners.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Mediated Agent Execution Isolation](/vault/mediated-agent-execution-isolation.md)
* [Egress Broker Credential Injection](/vault/egress-broker-credential-injection.md)

