---
type: Study Note
title: The Week of Sandbox Escapes
description: Pillar's cross-product account of coding-agent escapes through host trust in workspace artifacts, command interpretation, local daemons, and incomplete OS policies.
resource: https://www.pillar.security/blog/the-week-of-sandbox-escapes
source: /archive/pillar-week-of-sandbox-escapes.html
tags: [agents, agent-security, sandboxing, coding-agents, access-control]
timestamp: 2026-09-28T18:39:48Z
---

# The Week of Sandbox Escapes — Study Notes

**Researchers**: Eilon Cohen, Dan Lisichkin, Ariel Fogel (Pillar Research)  
**Date**: July 20, 2026  
**Evidence position**: Third-party security research by Pillar, an AI-security vendor; the article also promotes Pillar's endpoint offering.

## What It Is

A synthesis of seven Pillar findings across Antigravity, Codex, Cursor, and Gemini CLI. The common threat model is an agent acting on attacker-influenced repository material on a developer endpoint. An apparent boundary confines the agent's own process to workspace actions, but host services, IDE extensions, Git, lifecycle hooks, and local daemons consume agent-written inputs outside that boundary.

## Boundary and Failure Classes

Pillar separates **direct execution**, **workspace writes**, and **host trust**. The first two may obey policy while the third crosses it. Four recurring seams emerge:

1. **Deny-by-default versus denylist OS policy.** Pillar reports that Antigravity's allow-default macOS Seatbelt policy left OS capabilities available that could enable execution outside its intended confinement. Google reportedly categorized that report as a valid but difficult-to-exploit vulnerability and downgraded it; the synthesis does not document a shipped fix or fixed version.
2. **Executable workspace state.** Cursor's Python extension executed a workspace-modified virtualenv interpreter during host-side discovery (reported fixed, GHSA-p9g2-cr55-cw9c). Cursor's Git integration followed metadata indirection and invoked fsmonitor outside the sandbox (reported patched in Cursor 3.0.0; CVE pending at publication). Cursor's project hooks likewise converted writable workspace configuration into host execution (reported patched in 3.0.0, CVE-2026-48124). Antigravity's host task runner could later execute agent-created VS Code tasks; Google reportedly downgraded this finding and no fix is specified here.
3. **Names mistaken for effects.** Codex reportedly auto-allowed a Git invocation whose nominally read-only command could cause writes or helper execution through arguments and Git configuration. Pillar says this was patched in Codex 0.95.0; an allowlist keyed only to the command name misses the actual effects.
4. **Privileged daemon reachability.** A Docker Desktop socket offered an execution and host-filesystem path outside the sandboxed process. Pillar reports Cursor fixed its exposure (GHSA-v4xv-rqh3-w9mc); Codex classified the environment-dependent case as informational because socket access requires explicit permission, while Gemini CLI considered it documented behavior. Neither of the latter responses is a reported patch.

The durable design question is not simply whether an agent process is confined: which artifacts can it write, who later loads them, which helper privileges apply, and which daemons it can reach? A workspace file becomes a deferred action if an unsandboxed consumer trusts it.

## Evidence and Limits

This is a vendor-research series overview, not a comparative exploit-rate study. Its status table records patch versions for some findings but no independent reproduction matrix for all seven in this article; the individual technical posts carry stronger per-chain evidence. Reported vendor dispositions are not interchangeable with proof that a risk is absent or fixed. The endpoint instrumentation proposed by Pillar is also a commercial claim, not an outcome demonstrated by these seven cases.

## Analyst Takeaways

- Confine host-side consumers of agent-created artifacts, not only the shell tool. Preserve artifact provenance and mediate the transition from writable project state to executable host action.
- Evaluate allowlists over the complete invocation and its possible side effects; a familiar executable name is not a safety property.
- Include reachable local privileged services in the isolation boundary and date each product-specific claim: disclosure and remediation differed even for the same Docker chain.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Provenance-Conditioned Action Admission](/vault/provenance-conditioned-action-admission.md)
* [Writable-Artifact Authority Handoff](/vault/writable-artifact-authority-handoff.md)

