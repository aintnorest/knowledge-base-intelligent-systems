---
type: Study Note
title: The Balkanization of Execution-Security Research for AI Coding Agents
description: Study notes on a 39-paper systematization of coding-agent execution security, its mechanism taxonomy, four cross-category root causes, and five evaluation and design gaps.
resource: https://arxiv.org/abs/2607.05743v1
source: /archive/execution-security-research-ai-coding-agents.pdf
tags: [agent-security, coding-agents, sandboxing, access-control, mcp, agents]
timestamp: 2026-07-14T16:29:37Z
---

# The Balkanization of Execution-Security Research for AI Coding Agents — Study Notes

**Author**: Mohammadreza Rashidi
**Venue**: arXiv:2607.05743v1 [cs.CR]
**Date**: July 7, 2026
**Pages**: 18
**DOI**: 10.48550/arXiv.2607.05743

## What It Is

This is a systematization of knowledge (SoK), not a new defense or attack. It organizes 39 papers from 2023–2026 about the execution layer of AI coding agents: the point where model decisions can reach files, processes, networks, credentials, and tools. Its useful distinction is between persuading a model to make a bad decision and allowing that decision to become an effect. Prompt injection matters upstream, but isolation, authorization, provenance, egress controls, and execution-time checks determine the resulting blast radius.

The author verified each included paper against its own abstract page and released a machine-readable corpus plus scripts that regenerate counts and check for duplicate references. The paper also reports directly checking four disclosed, patched CVEs in NVD listings: a `runc` container escape, a GitHub Copilot/Visual Studio command injection, and two Claude Code trust-flow flaws. These incident descriptions ground the survey's motivation, but its per-paper performance figures remain the original authors' reported results rather than independent replications.

## Taxonomy of the Field

The 39 papers are assigned one primary execution-security mechanism across 17 categories:

1. isolation architectures (5 papers),
2. escape and adversarial benchmarks (6),
3. access control and capability models (6),
4. policy-enforcement fragility (2),
5. time-of-check-to-time-of-use (TOCTOU) races (2),
6. MCP-specific threats and defenses (4),
7. systems-security framing (2),
8. harness-level capability evaluation (1),
9. identity and credential delegation (2),
10. execution provenance and auditability (1),
11. network egress control (1),
12. static analysis of agent-generated code (1),
13. scope-creep / overeager-action measurement (1),
14. skill and plugin packaging security (1),
15. prompt-injection foundations (2),
16. jailbreak/alignment-attack foundations (1), and
17. agent safety-awareness evaluation (1).

The division is useful as a map, but it is not a maturity ranking. Several categories have only one or two papers, and assigning one primary category to multi-purpose systems hides some overlap. The paper's central claim is that the literature is fragmented by mechanism: the work that builds controls and the work that measures their real failure modes often do not evaluate or cite each other.

## Four Cross-Category Failure Patterns

The author re-reads the mechanism taxonomy as four recurring root causes:

1. **No data/control separation.** Tool metadata, retrieved text, and instructions share a model context without a structural distinction between evidence and authority. This connects indirect prompt injection, MCP tool poisoning, some skill packaging risks, and credential-delegation problems.
2. **Checked once, trusted forever.** A permission, registered tool, file, page, or approval is treated as durable after one validation. TOCTOU, lingering capabilities, and perpetual plugin approvals are variants of stale trust.
3. **Permitted is not intended now.** A rule may authorize an action class while missing whether this invocation serves the current task. The paper uses scope creep—benign extra agent actions—as the clearest example.
4. **Author-built attacker models.** A control can look strong against attacks designed by its own authors while failing against independently observed, deployed-policy mistakes or bypasses.

This is an interpretive synthesis, not a demonstrated causal model. Still, it is a practical review checklist: identify the boundary between data and control, revalidate changing state, bind each effect to current intent rather than a standing permission alone, and use attacker corpora that the defense designers did not construct.

## Important Evidence and Results

- The survey describes ShellSieve's evaluation of 1,709 GitHub command denylists, with reported fragility ranging from 69.0% to 98.6% by bypass class. It pairs this with YoloFS's review of 290 public misuse reports across 13 agent frameworks. These findings motivate testing policies as teams actually write them, not just idealized policies.
- The TOCTOU literature treats a validated filesystem or browser state as potentially stale when the action executes. One cited benchmark reports a combination of prompt rewriting, state-integrity monitoring, and tool fusion reducing its executed-trajectory flaw rate from 12% to 8%; that is an individual-paper result, not a general rate.
- MCP security work spans malicious tool metadata, server-lifecycle threats, and client-side defenses. One cited study of 1,899 open-source servers reports 7.2% traditional vulnerabilities, 5.5% tool poisoning, and 66% code smells; these figures depend on that study's definitions and corpus.
- The scope-creep benchmark runs about 7,500 trials over 500 validated scenarios. In the cited Claude Code condition, removing an explicit authorized-scope sentence changes the reported overeager-action rate from 0.0% to 17.1%. A static capability can permit each action yet still fail to express that the action is unrequested.
- The paper groups proposed controls largely before or during action—sandboxing, pre-action authorization, credentials, TOCTOU mitigation, and egress filtering—while most measurement work is post-hoc. Execution provenance is the only post-action mechanism category, so it can support detection and audit but cannot undo an irreversible effect.

## Five Gaps Worth Acting On

1. **Compare isolation and authorization on shared attacks.** Sandboxes constrain where an action can reach; capability controls constrain which effects are allowed. Treating either as a substitute without joint evaluation is unwarranted.
2. **Re-test defenses against independently collected bypasses.** A new reference monitor should be exercised against real denylist and misuse patterns, not only a bespoke attack suite.
3. **Unify TOCTOU and MCP freshness problems.** A changed DOM, file, permission, or tool metadata record has the same broad shape: a decision consumed state whose validity may have expired.
4. **Measure policy-authoring error.** Enforcement correctness does not save a policy that is overly broad, inconsistent, or written under time pressure. The survey identifies this as a largely unmeasured layer.
5. **Constrain scope creep directly.** An effect can be individually authorized and still outside the task. Systems need task- and action-level intent evidence, bounded approvals, or escalation paths in addition to capability checks.

## Analyst Takeaways

1. **Build a defense stack with distinct jobs.** Isolation limits blast radius; a complete reference monitor and scoped credentials limit authority; provenance and intent checks constrain parameters; egress filtering limits disclosure; audit traces help detect and investigate what remains. Do not represent this as one control solving all four failure patterns.
2. **Make expiry and revalidation first-class.** Bind permissions and approvals to actor, task, resource, purpose, and time. Re-check after material environment changes and before delayed external effects.
3. **Evaluate against deployment-shaped failures.** Include direct boundary injection, stale-state races, independently created bypasses, policy authoring mistakes, and benign-but-unrequested action sequences. Report task utility, false blocks, escalation cost, and the coverage of mediated effects alongside attack blocks.
4. **Treat policy changes as sensitive operations.** A correct enforcement engine still depends on policy quality. Version policies, show concrete diffs and authority consequences, test least-privilege defaults, and retain a rollback path.

## Questions and Limitations

- The corpus search was iterative rather than exhaustive; fast-moving preprints and terminology differences may leave out relevant work.
- The 17 categories are a judgment call. Several systems span multiple mechanisms, and sparse categories may be emerging areas or evidence of incomplete coverage.
- Verifying paper metadata and CVE listings does not independently reproduce the cited experiments or exploits. Numerical results should be interpreted within each source's threat model and evaluation setup.
- The proposed five gaps are argued from missing cross-citations and shared benchmarks. Absence in this corpus is suggestive, not proof that no external work connects those areas.
- Scope-sensitive enforcement can create false blocks and approval fatigue. A system needs to make the scope, consequence, and expiration of any escalation legible rather than replacing one broad approval with many vague ones.

## Vault Ideas Extracted

* [Cross-Mechanism Execution-Security Evaluation](/vault/cross-mechanism-execution-security-evaluation.md)
