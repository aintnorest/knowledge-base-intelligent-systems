---
type: Study Note
title: "Agent Skills for Large Language Models: Architecture, Acquisition, Security, and the Path Forward"
description: Survey of skill packaging, acquisition and composition, agent-tool interoperability, and a proposed graduated trust lifecycle for third-party skills.
resource: https://doi.org/10.48550/arXiv.2602.12430
source: /archive/agent-skills-architecture-acquisition-security-survey.pdf
tags: [agent-skills, survey, agent-security, access-control, context-engineering, agents]
timestamp: 2026-09-24T03:44:03Z
---

# Agent Skills for Large Language Models: Architecture, Acquisition, Security, and the Path Forward — Study Notes

**Authors**: Renjun Xu and Yang Yan  
**Venue**: AgentSkills ’26 workshop manuscript; arXiv:2602.12430v4 [cs.MA]  
**Date**: June 2, 2026  
**Pages**: 9  
**Printed DOI**: 10.48550/arXiv.2602.12430 (arXiv DOI in its ACM-style reference block; ACM ISBN remains a placeholder)

## What It Is

A compact *survey and conceptual proposal*, not a new controlled evaluation. It separates skill packages—procedural instructions and optional scripts/references/assets—from MCP servers, which provide tool and resource connectivity. The paper surveys human-authored and automatically acquired skills, discusses computer-use and coding-agent deployments, summarizes security studies, and proposes tiered permissions tied to provenance, verification and ongoing monitoring.

## Architectural Model

Progressive disclosure stages the skill's name/description for discovery, root `SKILL.md` for invoked guidance, and scripts/references/assets for conditional use. The paper illustrates approximate costs of **~30 tokens** per metadata entry and **200–2,000** for a loaded body, but those are schematic estimates, not benchmarked limits. A skill tells the agent *how and when* to use tools; MCP exposes *which external tools/resources* are available. No skill file grants OS-level privilege merely because it is loaded: the actual harness must mediate tools and permissions, a distinction that makes the proposed governance tractable.

Acquisition modalities range from human authoring through RL-backed reusable procedures, autonomous exploration, structured execution graphs and composition. The reported **SAGE 72.0% Task Goal Completion / 60.7% Scenario Goal Completion**, **SEAgent 11.3% → 34.5% OSWorld success**, and **CUA-Skill 57.5% WindowsAgentArena** are *summaries of other papers on different benchmarks*, not apples-to-apples results from this survey or evidence that all produce portable `SKILL.md` artifacts.

## Security and Trust Proposal

The survey cites a distinct scanner-based study finding **26.1%** of community skills flagged for risky patterns and a behaviorally verified study finding **157** malicious skills in a larger registry snapshot. These have different denominators and operational definitions. It proposes four verification gates: static/dependency scanning, semantic intent checking, sandboxed behavioral execution, and comparison of observed effects with a declared capability manifest. Four illustrative tiers then range from unvetted/instructions-only with isolation, to community-reviewed/read-only, organization-vetted/scoped tools, and vendor-certified/broader access. Monitoring may demote or revoke a skill when its behavior changes.

The paper explicitly calls this a **governance proposal**, not a tested system. Its diagram maps trust to progressive-disclosure levels, but the tier examples contain a tension: tier T3 says “no network” while one example gate mentions network-requiring skills, and T4's “full access” is broader than a production least-privilege policy should normally allow. Treat the tiers as a design sketch, not a drop-in authorization matrix.

## Analyst Takeaways

1. **Preserve the skill–tool distinction.** Procedural content must not decide its own tool authority; the host mediates filesystem, execution, egress and approval scopes independently of the prose it loads.
2. **Treat provenance as one input, not proof.** Signed, vetted or vendor-produced skills can change or call compromised dependencies; validate the installed version, declared effects and runtime behavior.
3. **Use staged, revocable admission for third-party skills.** Review descriptions and root guidance before selection; inspect scripts and dependencies before running; start with read-only or no-tool capability and promote only on task-specific need and independent evidence.
4. **Demand direct evidence before adopting survey figures.** The paper combines external studies from different tasks, models and registries. Its compelling architecture is a hypothesis for local evaluation, not a measured safety gain.

## Questions and Limitations

- Nine pages compress rapidly changing standards, mechanisms and heterogeneous empirical results; some historical counts are older than the newer papers in this ingest batch.
- The claimed metadata/context token costs and skill-vs.-MCP table describe an illustrative implementation, not every harness's routing and permission semantics.
- No implementation, false-positive cost, throughput analysis, adversarial red-team evaluation or proof of the trust-tier proposal is supplied. “Vendor-certified” must not become blanket network or code-execution authority.
- Cross-platform portability, compositional conflicts, verification of generated procedures, and evaluation of actual reuse remain open problems rather than solved by a standardized file layout.

## Vault Ideas Extracted

* [MCP Tool Supply-Chain Assurance](/vault/mcp-tool-supply-chain-assurance.md)
* [Skill Supply-Chain Admission](/vault/skill-supply-chain-admission.md)
