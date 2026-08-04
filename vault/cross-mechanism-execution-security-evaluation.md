---
type: Synthesis
title: Cross-Mechanism Execution-Security Evaluation
description: Evaluating agent-security controls as a composed system against shared, independently derived failure cases, including stale state, weak policies, and authorized-but-unrequested actions.
tags: [agent-security, evaluation, access-control, sandboxing, agents, coding-agents]
timestamp: 2026-07-14T16:29:37Z
---

# Cross-Mechanism Execution-Security Evaluation

An agent-security control should be evaluated as one layer in a system, not only against an attack suite tailored to its own mechanism. Isolation limits blast radius; authorization limits permitted effects; provenance limits suspect arguments; freshness checks limit stale decisions; and audit mechanisms expose deviations afterward. A credible evaluation asks whether those layers complement each other under a shared set of realistic failures, and whether the policy they enforce was correctly authored in the first place.

## Evaluation Pattern

1. State the boundary and the claim for each layer: filesystem/process isolation, tool authorization, provenance checks, state freshness, network egress, or post-action detection.
2. Use a disposable environment and exercise the real mediation path, including serialization, adapters, policy engine, and error handling.
3. Build a common test matrix from independently collected bypasses and misuse reports, direct boundary injections, stale files/pages/tool metadata, policy-authoring mistakes, and sequences of individually allowed but task-extraneous actions.
4. Run both individual layers and representative compositions. Hold the task, tools, attacker capability, policy version, and success criteria constant enough to identify complementarity, redundant coverage, and gaps.
5. Measure harmful-effect blocks, end-to-end task success, false blocks, approval/escalation rate, latency, recovery after benign change, and containment if a control fails. Break results down by failure class rather than reporting one aggregate security score.
6. Record policy author, diff, intended scope, deployment configuration, trace, and reset state. Re-run the suite after changes to tools, models, policies, sandboxes, or adapter code.

## Why It Matters

High scores against a defense author's own attacker corpus can say more about the fit between that corpus and the mechanism than about deployment security. A permission system can block a prohibited call but allow a harmless-looking action the user never requested. A sandbox can contain a compromised agent but not decide whether an allowed recipient is appropriate. A freshness check can prevent a stale DOM action while doing nothing about an overbroad standing grant. The omissions are different, so they should be measured together rather than collapsed into a generic "secure agent" claim.

Shared testing also makes policy quality visible. A complete reference monitor faithfully enforces an overly broad, inconsistent, or stale policy; treating that outcome as an enforcement success hides an important deployment failure.

## Practical Use

- Start with a few irreversible sinks—send, publish, delete, transfer, execute, or grant access—and a narrow set of security-relevant parameters.
- Include observed or independently produced failure cases before adding model-generated variants. Keep the raw cases and exact environment available for later regression tests.
- Separate controls that prevent an effect from controls that detect it afterward. Both may be valuable, but they need different recovery and safety expectations.
- Include explicit-scope and implicit-scope task variants. Compare whether the agent takes extra authorized actions when a task's boundaries must be inferred.
- Treat a policy review or bounded user escalation as part of the measured system; count its accuracy, friction, expiry behavior, and failure modes rather than assuming an approval resolves ambiguity.

## Limitations

- No finite corpus proves resilience to adaptive attackers, new tools, compromised trusted components, semantic ambiguity, or unknown side channels.
- A realistic shared suite is expensive: systems differ in APIs, action models, policy languages, and available containment, so cross-system normalization can conceal meaningful differences.
- Strict compositions can improve harmful-effect blocks by blocking useful work. Utility, false blocks, recovery time, and approval burden are necessary countermeasures to that misleading result.
- Policy authoring is only one source of error. Correctly scoped policy cannot repair an incomplete mediation point, an unsafe sandbox runtime, or a malicious user request.

## Sources

- [The Balkanization of Execution-Security Research for AI Coding Agents dossier](/dossiers/execution-security-research-ai-coding-agents.md) — synthesizes 39 papers into execution-security mechanisms and argues that isolation, authorization, TOCTOU, policy fragility, and scope creep are rarely evaluated across their shared failure patterns.
- [Assume-Compromise Boundary Testing](/vault/assume-compromise-boundary-testing.md) — supplies the complementary boundary-level test pattern for testing a control after assuming the planner is compromised.
