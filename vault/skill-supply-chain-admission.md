---
type: Synthesis
title: Skill Supply-Chain Admission
description: "Reviewing a third-party agent skill's instructions, scripts, dependencies, hooks, and connector configuration as one package before activation, while keeping every consequential effect under host-controlled authorization."
tags: [agent-skills, agent-security, access-control, provenance, agents]
timestamp: 2026-09-24T03:56:19Z
---

# Skill Supply-Chain Admission

An agent skill is a third-party package of instructions and possibly executable resources. Its advertised purpose, `SKILL.md` body, scripts, dependencies, hooks and connector configuration must be reviewed as one artifact, and each consequential effect stays subject to a host-controlled authorization boundary. Source reputation and a clean static scan are evidence, never a grant of authority. The skill file itself is untrusted control input (see [Control/Data-Plane Separation for Agents](/vault/control-data-plane-separation-for-agents.md)).

## Practical Use

1. **Pin and inventory.** Record the source repository, pinned revision and hashes of every installed file. Check ownership, updates and dependency resolution. Reject hidden downloads, credential literals and unexplained egress before activation.
2. **Compare declared and actual capability.** Check the user-facing description against the full instruction tree and its executable effects. Sandbox candidate scripts with synthetic data and no live credentials, and observe filesystem reads, hook installation, subprocesses and outbound destinations. Exercise delayed and conditional branches where feasible.
3. **Separate instruction trust from system authority.** An unreviewed skill may supply task data or draft a procedure. It must not change standing permissions, silence user approvals, enable new MCP servers, or authorize network and secret access. A bundled `.mcp.json` gets the full server-admission review (see [MCP Tool Supply-Chain Assurance](/vault/mcp-tool-supply-chain-assurance.md)).
4. **Mediate at the sink.** For every send, publish, delete, grant or execute action, check the tool and its security-relevant parameters against the current user request and an independently approved capability scope. Escalate unexpected destinations or effects, revoke compromised versions, and rotate exposed secrets.
5. **Track triage and confirmed abuse separately, and retest on updates.** A detector hit is not proof of malice, and a short clean sandbox run is not proof of safety.

## Evidence

One community scan flagged 8,126 of 31,132 skills (26.1%) for potentially dangerous patterns, with 86.7% precision and 82.5% recall on a 200-skill holdout. Only 23 of 87 intensively reviewed highest-risk cases showed clear malicious intent. A separate study behaviorally confirmed 157 malicious skills among 98,380. 115 of those 157 had undocumented "shadow features", commonly unlisted network endpoints, and one near-clone of a benign skill added a three-line hidden upload. The two studies measure different populations and endpoints, so their rates are not contradictory.

## Limitations

Dynamic analysis cannot exhaust rare triggers, real-user states or external infrastructure, and a 60-second sandbox can miss dormant behavior. Signatures attest to bytes, not intent. Semantic instruction attacks and executable payloads need different controls. Approval prompts cause user fatigue, so defaults should minimize available authority. Graduated trust tiers proposed in the survey literature are design sketches, not evaluated guarantees.

## Sources

- [Agent Skills in the Wild: An Empirical Study of Security Vulnerabilities at Scale dossier](/dossiers/agent-skills-security-vulnerabilities-wild.md) — scanner-based prevalence and severity, with flags rather than confirmed malware.
- [“Do Not Mention This to the User”: Detecting and Understanding Malicious Agent Skills in the Wild dossier](/dossiers/malicious-agent-skills-wild.md) — 157 behaviorally confirmed malicious skills, shadow features, and a bundled malicious MCP configuration.
- [Agent Skills for Large Language Models: Architecture, Acquisition, Security, and the Path Forward dossier](/dossiers/agent-skills-architecture-acquisition-security-survey.md) — proposed staged review, permission manifests, and revocable trust tiers.
