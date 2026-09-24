---
type: Study Note
title: "Human oversight of agentic systems in practice: Examining the oversight work, challenges, and heuristics of developers using software agents"
description: "Interview study of 17 experienced developers identifies four forms of agent oversight and four expedient but fragile post-hoc review heuristics, including overreliance on plans and test results."
resource: https://doi.org/10.1145/3805689.3812402
source: /archive/human-oversight-agentic-systems-in-practice.pdf
tags: [agents, human-in-the-loop, coding-agents, governance, verification, reliability]
timestamp: 2026-09-24T03:48:01Z
---

# Human oversight of agentic systems in practice: Examining the oversight work, challenges, and heuristics of developers using software agents — Study Notes

**Authors**: Shipi Dhanorkar, Samir Passi, and Mihaela Vorvoreanu  
**Venue**: ACM FAccT ’26, Montreal, June 25–28, 2026  
**DOI**: 10.1145/3805689.3812402

## What It Is

A qualitative study of how developers actually oversee coding agents, rather than how idealized approval diagrams say they should. The researchers interviewed **17 experienced software-agent users**; **12 of 17 worked at the authors' large technology organization**, a recruiting concentration explicitly acknowledged by the paper. Its findings describe participants' reported practices and interpretations, not measured efficacy, failure prevalence, or the percentage of all developers using each heuristic.

## Oversight Begins Before the Run

1. **A priori control** means setting boundaries before delegation: project instructions, permissions, autonomy settings, library restrictions, and sandbox conditions. Some participants deliberately configure deny lists and context; others use default agent mode. Configuration itself can be opaque, including model choice and data handling.
2. **Co-planning** means negotiating scope and approach with the agent before execution: requirements, design, specific technical decisions, testable sub-tasks, sometimes a hand-authored seed implementation. Participants use smaller changes to contain side effects and lower review cost. Tacit security, performance, and maintainability requirements are hard to phrase, so even a clear-looking plan can omit the important constraint.
3. **Real-time monitoring** means observing traces and intervening during execution. Participants rarely do it systematically; some use long runtime or long conversations as rough alerts. Agent explanations may disagree with actual work, and an intervention can require restarting rather than reliably steering a diverged run.
4. **Post hoc review** means inspecting and correcting outputs. This was the most discussed form: code diffs, tests, manual functional checks, and sometimes model judges. Existing-code integration merits more scrutiny than a disposable prototype, but generated volume and distance from unfamiliar code make review costly. Each repair can force review of the whole changed surface again.

This classification adds anticipatory control and co-planning to the more familiar “watch and approve” conception of oversight. The paper does **not** say that a written instruction guarantees compliance or that a human presence alone establishes control.

## Four Shortcuts Used in Post-hoc Review

- **Plan as proxy for implementation.** Developers may review a jointly drafted plan and infer the agent executed it faithfully; the plan and changed code can diverge.
- **Passing tests as proxy for correctness.** Test output is easier to inspect than code, but test coverage, oracle correctness, and independence of tests from the author determine how much it proves. One interviewee explicitly argued for human responsibility for acceptance-test quality.
- **Eyeballing as anomaly detection.** Developers skim signatures, diffs, summaries, reasoning, and agent-drawn data-flow diagrams to triage. This may reveal glaring defects but cannot certify absence of subtle ones.
- **Trust under unfamiliarity.** A developer unable to judge a library/domain may defer to an apparently functioning implementation; even agreement between two agents can create unwarranted reassurance if they share failure modes.

These are *descriptive* heuristics for coping with information overload, not tested recommendations or guarantees. The cited “10% of the time” wrong-explanation remark is a participant's anecdote, not a study-wide error estimate.

## Analyst Takeaways

1. **Put meaningful human decisions at several points.** Define scope/constraints before delegation, approve consequential design trade-offs, then inspect outcome and affected code; do not make final sign-off the only oversight opportunity.
2. **Keep plan, trace, changed artifact, and independent tests distinguishable.** A good plan is useful for intent but not proof of faithful execution; a green suite is evidence only for the properties the suite actually checks.
3. **Lower the reviewer’s reconstruction cost.** Small changes, intent-to-diff mapping, direct paths to impacted code, edge-case tests, and reliable source-linked diagrams help a human challenge the result; model summaries are orientation aids, not the source of truth.
4. **Calibrate authority to expertise and stakes.** Where reviewers do not understand a dependency or domain, require an independent expert or a stronger reference oracle rather than converting uncertainty into automatic assent.
5. **Study review burden as an outcome.** Measure time, defect detection, rework, and actual intervention rates in user studies; the interview taxonomy alone cannot establish which interface or policy produces better software.

## Questions and Limitations

- The small, self-selected sample is organizationally concentrated; software-agent experience and institutional norms may not transfer to novice teams, less-resourced organizations, or regulated workflows.
- Interviews elicit recall and self-presentation. The paper does not continuously observe runs or compare reported review behavior with actual defects or production incidents.
- Four heuristic categories describe observed adaptations; their safety depends on task risk, test adequacy, reviewer expertise, and tooling. The study offers no measured comparison of their sensitivity/specificity.
- More trace data is not automatically more usable: reviewers already face a volume problem, and reasoning traces can misrepresent the causal route to code changes.

## Vault Ideas Extracted

* [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md)
* [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md)
