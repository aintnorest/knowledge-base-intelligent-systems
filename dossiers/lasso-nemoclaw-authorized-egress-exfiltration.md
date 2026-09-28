---
type: Study Note
title: Thinking Outside The Box — Exfiltrating OpenClaw Data from NVIDIA's Sandbox
description: Lasso Security's third-party alpha-era attack research showing exfiltration and persistent configuration poisoning through authorized agent tools and egress.
resource: https://www.lasso.security/blog/sandboxed-ai-agents-attack-surface
source: /archive/lasso-nemoclaw-authorized-egress-exfiltration.html
tags: [agents, agent-security, sandboxing, access-control, prompt-injection, privacy]
timestamp: 2026-09-28T20:00:00Z
---

# Thinking Outside The Box — Exfiltrating OpenClaw Data from NVIDIA's Sandbox — Study Notes

**Author**: Noy Pearl  
**Publisher**: Lasso Security (third-party attack research)  
**Date**: April 23, 2026

## What It Is

Lasso reports two proof-of-concept attacks against an **early alpha** NemoClaw/OpenShell deployment. The claimed failure is not container escape or bypass of a denied network rule: untrusted dependency code used legitimate file access and permitted service/binary combinations to leak data and poison agent state. The research supplies a malicious package/repository and an example GitHub exfiltration pull request, but no controlled success rates or independently verified matrix of later versions.

## Attack Preconditions and Observed Paths

In one scenario, a user asks the agent to use an attacker-controlled GitHub project. A dependency-install lifecycle script reads a workload-accessible OpenClaw configuration file and uses permitted Git/GitHub tooling to place its contents in a pull request against the attacker's repository. A literal attacker-owned token was initially rejected by GitHub secret scanning and by the agent; representing it as an emoji-to-character mapping deferred reconstruction until runtime. The authors report a successful exfiltration and show a concrete PR artifact. The agent's later malicious-script warning arrived **after** the data left. Encoding did not break a kernel or proxy boundary; it bypassed earlier content inspection while the final action stayed on an approved egress path.

In the second scenario, an attacker-controlled package install persists a periodic script via the agent's scheduler. It probes permitted domain/binary pairs, uses a working channel to send recent shell history to an attacker-controlled Discord destination, and changes OpenClaw's persistent instruction file to influence subsequent sessions. Policy reconnaissance turns denial feedback into an exfiltration routing signal; poisoned durable agent configuration extends the impact beyond the first task. This scenario needed a working Discord integration, including a manually corrected binary allowance in the alpha setup.

## Scope of the Claim

The researchers state four manual alpha-specific setup conditions: an OpenAI endpoint allowance to make their model usable; a Discord/node rule to make that integration work; an npm/node binary-path repair subsequently merged upstream; and installation of a GitHub client that policy referenced but the image lacked. At least the Discord leak cannot be described as an unmodified default-policy exploit; the GitHub path likewise depended on a locally installed client and attacker's own credential. The tested description uses the older k3s topology; NVIDIA's later [NemoClaw architecture](/dossiers/nvidia-nemoclaw-architecture.md) identifies Docker-driver deployment as its default. These version and environment differences constrain transfer, without removing the general authorized-egress failure mode.

The authors reported to NVIDIA and quote a vendor response treating their scenarios as outside its vulnerability-disclosure scope. Their broader conclusion that semantic intent enforcement is needed is an interpretation, not a demonstrated necessity or proven complete defense. The [OpenShell policy design](/dossiers/nvidia-openshell-security-policy.md) claims endpoint and credential binding and limited L7 controls; none promises that a legitimate GitHub write cannot contain an accessible secret. Whether all cited credentials really reside in the specific readable file depends on each integration's version and custody model; the [runtime architecture](/dossiers/nvidia-openshell-sandbox-architecture.md) holds its managed provider secrets outside the workload.

## Analyst Takeaways

1. Separate boundary violation from harmful **authorized** action: binary/host allowlists can be correctly enforced and still admit arbitrary sensitive payloads over a task-relevant service.
2. Third-party packages and repository instructions are code and instruction supply-chain inputs. A late warning is not a pre-effect security gate.
3. Credential custody must be evaluated per secret. Keeping gateway keys off the workload does not protect workload-readable history, agent state, or independently stored tokens.
4. Evaluate persistence as well as one-shot exfiltration: writable agent instruction files and scheduled tasks can convert one untrusted dependency into later behavioral control.

## Vault Ideas Extracted

* [Provenance-Conditioned Action Admission](/vault/provenance-conditioned-action-admission.md)
* [Skill Supply-Chain Admission](/vault/skill-supply-chain-admission.md)
* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Writable-Artifact Authority Handoff](/vault/writable-artifact-authority-handoff.md)
* [Destination Allowlist as Capability Grant](/vault/destination-allowlist-as-capability-grant.md)
* [Memory Lifecycle Governance](/vault/memory-lifecycle-governance.md)

