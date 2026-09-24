---
type: Study Note
title: "AI agents in software testing: a human-in-the-loop assurance model"
description: "Conceptual risk/control matrix for agent-generated tests and release gates: bounded autonomy, named approvers, evidence obligations, and escalation, without validated thresholds or performance data."
resource: https://doi.org/10.46299/j.isjea.20260502.03
source: /archive/ai-agents-software-testing-human-assurance.pdf
tags: [agents, human-in-the-loop, governance, verification, coding-agents, reliability]
timestamp: 2026-09-24T03:48:01Z
---

# AI agents in software testing: a human-in-the-loop assurance model — Study Notes

**Author**: Serhiy Kopovskyi  
**Venue**: *International Science Journal of Engineering & Agriculture* 5(2), 21–27 (2026)  
**DOI**: 10.46299/j.isjea.20260502.03

## What It Is

A design-oriented **non-empirical** model for deciding what testing agents may do when their artifacts affect merges or releases. It argues that task-level test-generation ability does not settle who can approve a test, whose evidence justifies a release, or when an agent must stop. The two artifacts are a human-in-the-loop integration model and an activity-level risk/control matrix; neither is statistically validated or shown to improve escaped-defect rates.

## How the Control Model Works

The model separates an agent execution layer (bounded generation, ranking, triage), a human supervision layer (contextual judgment, ambiguity resolution, approval), and a governance layer (policy, roles, record). Autonomy is **assistive** (human decides), **supervised** (agent proposes, human approves), or **conditional autonomous** (agent acts within predefined policy with escalation). Its heuristic score is **S = C + I + U + L + V**, with artifact criticality, expected failure impact, output uncertainty, compliance sensitivity, and environmental volatility each rated on a three-point ordinal scale. It assigns low/medium/high control tiers; the sum is a *governance rubric*, not an estimated probability of failure.

Four proposed rules make the handoff explicit: high-risk artifacts cannot exceed supervised autonomy; **any artifact affecting a merge or release gate requires explicit human approval and linked evidence**; conditional autonomy requires validated policy, tool provenance, and rollback; low confidence, conflicting evidence, or failure to reproduce triggers escalation. The sample matrix maps candidate-test design to QA review, regression selection to test-lead confirmation for release branches, defect-severity recommendations to dual review, generated assertions to reproducible manual validation, and post-release failure clustering to periodic audit and novel-pattern escalation.

The proposed adoption sequence maps testing activities to approved autonomy modes and human owners, applies the rubric, codifies escalation at pre-merge/pre-release/post-release gates, and retains prompt/output traces, review rationale, reproducible execution evidence, and override records.

## Analyst Takeaways

1. **Separate test production from release authority.** Even when a bot ranks a regression suite or writes assertions, a named person must own consequential merge/release decisions under the paper's proposed policy.
2. **Use risk classes to choose evidence depth, not to create a false numerical precision.** Define what each factor means locally, test borderline cases, and periodically audit low-tier assignments for missed high-impact paths.
3. **Make escalation executable.** A rule for uncertainty, contradictory evidence, flaky output, or policy conflict should block the gate and route an evidence packet to someone who can decide—not just add a warning to a log.

## Questions and Limitations

- The paper offers literature synthesis and analytical scenario checks, not an industrial pilot, observed improvement, calibrated weights or thresholds, inter-rater study, or tested CI/CD enforcement code.
- Its five ordinal components can overlap or be inconsistently scored; a raw sum may hide a single disqualifying risk. The proposed hard rules matter more than a composite number.
- Human review of every release-affecting artifact could become a bottleneck; the paper does not measure alert volume, workload, reviewer sensitivity, or whether approvals prevent escaped defects.

## Vault Ideas Extracted

* [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md)
* [Weakest-Link Assurance Composition](/vault/weakest-link-assurance-composition.md)
