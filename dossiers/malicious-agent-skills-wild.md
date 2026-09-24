---
type: Study Note
title: "“Do Not Mention This to the User”: Detecting and Understanding Malicious Agent Skills in the Wild"
description: Behaviorally verified malicious community skills reveal distinct credential-theft and instruction-hijack campaigns, including hidden features and platform-native abuse.
resource: https://arxiv.org/abs/2602.06547v4
source: /archive/malicious-agent-skills-wild.pdf
tags: [agent-skills, agent-security, prompt-injection, provenance, access-control, agents]
timestamp: 2026-09-24T03:44:03Z
---

# “Do Not Mention This to the User”: Detecting and Understanding Malicious Agent Skills in the Wild — Study Notes

**Authors**: Yi Liu, Zhihao Chen, Yanjun Zhang, Gelei Deng, Yuekang Li, Jianting Ning, and Leo Yu Zhang  
**Venue**: arXiv:2602.06547v4 [cs.CR]  
**Date**: June 10, 2026  
**Pages**: 20

## What It Is

Unlike broad scanners that count dangerous syntax, this study asks which third-party skills deliberately do harm. It crawls **98,380** skills from skills.rest and skillsmp.com, narrows **4,287** suspicious candidates with 14 static patterns, runs candidates in controlled sandboxes, and retains **157** malicious skills only after independent behavioral review. These 157 contain **632** labeled vulnerability instances across **13** techniques and six attack phases. Their prevalence (**0.16%** of the snapshot) is a high-precision *observed* lower bound, not evidence that the remaining 99.84% are safe.

## How Verification Works

The operational label requires observable unauthorized credential collection, exfiltration, remote execution, privilege abuse, agent manipulation, or concealed functionality **and** evidence of intentional abuse rather than incidental bugs. Researchers compare public promises to implementation, inspect network and process effects, and require both reviewers to score a case at least “probable”; initial inter-rater agreement was **94.5%**, Cohen's κ **0.89**. Dynamic runs used ephemeral Docker sandboxes, synthetic honeypot secrets, monitored but non-forwarded egress, and a **60-second** cap. **605** dynamically suspicious cases did not meet the maliciousness bar, often because legitimate security tools behaved similarly or a payload was dormant.

The reported **99.6% precision** refers to the behavioral-verification pipeline's evaluated classification, not a promise of perfect detection or a measured recall over every public skill. The static-only baseline was at most **1.1% precision** under this rare-event base rate. Intent labeling and sandbox behavior provide different evidence from a mere pattern match; delayed or environment-dependent triggers can still evade both.

## Attack Findings

- Each confirmed skill has **4.03** labeled vulnerabilities on average across a median **three** kill-chain phases. Credential harvesting plus outbound transfer occurs in **58/157 (36.9%)**, reported OR **2.24**, Fisher's p **0.020**. The combination is more diagnostic than either dual-use behavior alone.
- Two attack archetypes are negatively associated. **Data Thieves** often pair remote script execution (SC2) with credential harvesting (E2); **Agent Hijackers** place adversarial instructions in skill documentation and target the agent's decisions. SC2 and instruction override (P1) overlap in only **8/157 (5.1%)**; a scanner for shell payloads alone will miss text-only hijacking.
- One publisher's brand-impersonation factory contributes **85/157 (54.1%)** confirmed skills and **370/632 (58.5%)** labeled vulnerabilities. The E2+SC2 fingerprint occurs in **83/85 (97.6%)** of its skills versus **5/72 (6.9%)** outside it; the paper reports OR **556.1**. Aggregate technique frequency is consequently campaign-skewed, not a random distribution of independent actors.
- **115/157 (73.2%)** contain “shadow features”: behavior not inferable from public documentation. Undocumented network endpoints appear in **47.2%** and code obfuscation in just **9.5%** of confirmed cases. At the highest sophistication tier, **100%** use shadow features, versus **0%** at the lowest tier; the tiering and feature definition should be inspected before interpreting this gradient causally.
- Platform-native abuse includes model API redirection to an attacker proxy, a near-verbatim legitimate skill with three extra malicious lines, a shipped `.mcp.json` with attacker credentials, tool hooks that capture pre/post operations, and dormant trigger conditions. A skill's effective authority includes hook and tool configurations, not just its root Markdown.
- Following disclosure, registry maintainers removed or de-indexed **157/157** reported skills. This demonstrates response to submitted evidence, not absence of prior user exposure or durable ecosystem prevention.

## Analyst Takeaways

1. **Compare declared capability to actual effects.** Review every referenced script, hook, configuration and egress path against the advertised workflow; undocumented destinations and side effects are more important than suspicious keywords in isolation.
2. **Cover two independent attack channels.** Scan code/dependencies for theft and remote execution, and test instruction-following behavior for secrecy, forged authority, bypass of approval, and unauthorized changes to code review decisions.
3. **Make consequential actions independent of skill text.** A Markdown instruction saying not to ask the user cannot revoke approval gates; network and credential access must be enforced at a lower-trust boundary.
4. **Budget for campaign concentration and temporal drift.** Dedupe publisher templates, examine coordinated near-clones, recheck updates, and retain a disable/revoke path even for previously reviewed skills.

## Questions and Limitations

- Public-registry crawl was January 2026; it excludes private, unindexed and platform-curated distributions. The later **12.6×** registry growth mentioned by the paper makes its base rate and fingerprints time-sensitive.
- A **60-second** sandbox and synthetic credentials can miss sleeper behavior, contextual triggers, and attacks requiring realistic user data. Reported precision does not establish recall over unreviewed skills.
- One actor dominates measured cases, making a single aggregate profile misleading for other publishers. The full malicious payloads and URLs are access-controlled or withheld for ethical reasons, which also limits independent replication.
- Some examples are schematic/redacted. A successful registry takedown is not evidence that existing installs, cached copies, or downstream credentials were remediated.

## Vault Ideas Extracted

* [Control-Data Plane Separation for Agents](/vault/control-data-plane-separation-for-agents.md)
* [Cross-Mechanism Execution-Security Evaluation](/vault/cross-mechanism-execution-security-evaluation.md)
* [MCP Tool Supply-Chain Assurance](/vault/mcp-tool-supply-chain-assurance.md)
* [Provenance-Conditioned Action Admission](/vault/provenance-conditioned-action-admission.md)
* [Skill Supply-Chain Admission](/vault/skill-supply-chain-admission.md)
