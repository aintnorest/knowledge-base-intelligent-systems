---
type: Study Note
title: Agentic Code Quality
description: Addy Osmani argues that coding-agent quality depends on enforceable, staged constraints and verification capacity rather than the volume of generated code or one final review gate.
resource: https://addyosmani.com/blog/agentic-code-quality/
source: /archive/agentic-code-quality.html
tags: [code-quality, coding-agents, verification, reliability, human-in-the-loop, agents]
timestamp: 2026-09-24T03:45:44Z
---

# Agentic Code Quality — Study Notes

**Author**: Addy Osmani  
**Publisher**: AddyOsmani.com (personal essay, not Google policy)  
**Published**: August 8, 2026

## What It Is

Osmani reframes software quality for agent-heavy development as the properties enforced by the surrounding harness, environment, and delivery system. Human code review still matters, but reading every generated line becomes implausible as output grows. The design problem becomes where to apply back-pressure: which proposals can progress, what evidence each stage needs, and when scarce human judgment is required. This is a practitioner's argument, not a measured comparison of quality systems.

## Constraints Before, During, and After Coding

- **Before work**: establish intent and scope so a technically correct edit cannot silently solve the wrong problem. Ambiguous requirements and missing information defeat otherwise competent agents.
- **During work**: give agents trustworthy compiler, test, type, lint, and runtime feedback early enough to revise a proposal. A brittle environment, nondeterministic build, missing permission, or weak test suite is a failure of the control system as well as the agent.
- **At the delivery boundary**: require checks before a proposal travels from an interpreter to a controller and production. Unit, property, and acceptance tests, mutation tests, complexity and readability measures, architecture rules, security scans, and deployment policy cover different kinds of failure.

The checks should be intentionally chosen, not accumulated indiscriminately. Passing unit tests says little about maintainability, security, performance, comprehensibility, or whether the change is worth making. Likewise, a subjective AI reviewer is not interchangeable with executable evidence. The essay asks teams to preserve a low-damage path for failure and to put the strongest constraints where their consequences are largest.

## Back-Pressure Is a Capacity Problem

When generation outruns the checks that authorize a change, proposals queue behind human-speed verification. Osmani names three responses: increase verification capacity, slow generation, or lower the quality bar. He also argues that some constraints may be relaxed if they neither improve quality nor preserve useful throughput. This is an explicit trade-off, not an assertion that relaxing safety gates is harmless.

His preferred design distributes feedback throughout the pipeline instead of discovering all problems at final CI. Human attention goes to taste, intent, architecture, and unusual cases rather than repeatedly resolving machine-checkable failures. His strongest operational claim is that the team operating the loop—not the model's output volume—still determines whether its output becomes useful software or 'slop.'

## Analyst Takeaways

1. **Make admission criteria concrete at each boundary.** For a small factory, distinguish an agent's proposed edit, a locally verified change, a reviewable PR, and a deployable artifact; don't allow a confident narrative to advance a change without the relevant evidence.
2. **Budget checks as well as generators.** If agents can open changes faster than CI and reviewers can assess them, more parallel generation adds review debt. Track queue depth and false-negative incidents, not just throughput.
3. **Test dimensions that can fail independently.** A passing functional suite is not an architecture, security, performance, or maintainability check. Give each check a defined responsibility and escalation owner.
4. **Keep human discretion where automation has weak observability.** Intent and cross-system consequences often require someone with organizational context; automated gates should prioritize, not manufacture certainty.
5. **Treat the environment as part of the quality system.** A flaky test, missing credential, or non-reproducible build makes feedback less trustworthy and can teach agents the wrong lesson.

## Questions and Limitations

- The essay supplies no measured generation throughput, CI capacity, defect rates, cost curves, or controlled experiment establishing that this configuration yields higher quality.
- 'Downstream humans should only be pulled in when automated guardrails break' is too strong for novel design or high-stakes changes whose requirements were never mechanically expressed. Preserve human approval for risk and intent, not just failed gates.
- Mutation testing, style measures, and security scans have different costs and miss different failures. The essay does not specify how to calibrate gate sensitivity or adjudicate conflicts between them.
- Lowering a quality bar when verification falls behind changes risk rather than creating verification capacity. Which bars are non-negotiable must be decided outside the agent loop.
- Osmani writes personally, despite his employment at Google; this is not a Google engineering standard or empirical study.

## Vault Ideas Extracted

* [Bounded Hybrid Coding Workflow](/vault/bounded-hybrid-coding-workflow.md)
* [Intent Engineering for Agents](/vault/intent-engineering-for-agents.md)
