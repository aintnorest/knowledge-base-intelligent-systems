---
type: Synthesis
title: Risk-Tiered Review and Approval
description: "Allocating AI review depth, human attention, and merge or release authority according to a change's impact and reversibility, with the tier and approver recorded and enforced at the actual change boundary."
tags: [code-review, human-in-the-loop, governance, coding-agents, agents]
timestamp: 2026-09-24T03:56:19Z
---

# Risk-Tiered Review and Approval

Scrutiny should follow consequences. Routine, reversible, low-blast-radius changes can get fast targeted feedback and automated gates. Security-sensitive, cross-service, data-migrating, regulated or unfamiliar changes get deeper AI review, qualified human review, and a named person with the power to stop release. Two dials need separate settings: **review effort** (how much compute and attention a change receives) and **approval authority** (who or what can let it merge or ship). A review button is not a governance system.

## Practical Pattern

1. **Classify** each change using auditable signals: touched security boundaries, data migrations, service contracts, privileged configuration, dependency reach, reversibility and incident history. Unknown or conflicting signals escalate; confidently wrong classifications get audited.
2. **Allocate control by tier.** Critical work gets human design approval before generation and a separate code/evidence approval before release. Intermediate work may be generated under bounded authority but keeps a human deployment gate. Low-impact, reversible work may use automated tests and deployment with monitoring and periodic sampling. The authoring agent never approves its own consequential output.
3. **Present decision-ready evidence at every gate**: the intended requirement, the actual changed artifact and impact paths, independently produced test and scan evidence, uncertainties, and the proposed action. Record the effective tier, reviewer model or effort level, the exact commit, the policy and classifier version, and the decision and its reason. Re-review after new commits.
4. **Evaluate** classification errors, escalation and false-approval rates, reviewer detection and time, bypasses, escaped defects, and post-release recovery on a real task mix before claiming better safety or productivity.

## Approval Across the Action Lifecycle

Apply the tier at the effect boundary, not just at final merge. A trusted runtime can deny, allow, or ask before a tool call; a plan-level consent decision does not preapprove consequential deviations, and live intervention remains useful after execution starts. Pre-action screening can stop an eligible action, whereas asynchronous monitoring that pauses a run afterward cannot undo the triggering effect. When no human can answer an escalation, reject it rather than treating unattended execution as consent. Record which exact action was approved, by whom, for how long, and whether the approval persists across a resumed session.

For collaborative work, preserve the initiating human's identity in change authorship and approval eligibility: a shared automation identity can make self-approval appear independent. Organizational pause, reassignment, budget override, and release decisions belong to an authority separate from the executing agent. Tool-level permission and code-review approval address different moments; neither substitutes for the other.

## Product Settings Are Not Policy

Review depth and approval authority are independent controls. A cheaper review mode can provide faster feedback, while deeper reasoning may be reserved for consequential changes; neither mode establishes an independent human sign-off. Some automated reviewers can conditionally satisfy a required-approval rule, even when their recommendations do not normally count. A team requiring human approval must enforce that boundary explicitly rather than infer it from a numeric approval count. Vendor effort and cost estimates are not head-to-head detection evidence.

## Allocate Attention, Not Just Intervention

More intervention is not automatically better oversight. A simulated planning-and-execution study found that user involvement repaired some tasks, induced errors in others, and raised workload without consistent trust-calibration gains. Task, initial correctness, and perceived-risk group were confounded, so the study does not validate risk alone as an attention-allocation rule. Evaluate successful repair, induced errors, false acceptance, false rejection, and reviewer burden rather than counting available controls or clicks. See [Review Scaffolds and Calibrated Reliance](/vault/review-scaffolds-and-calibrated-reliance.md) for evidence-oriented review surfaces and their calibration limits.

Size delegated execution chunks to what a reviewer can understand and correct before dependent decisions accumulate, not to the length of the overall plan or a universal step limit. Review can inspect plans, observable behavior, changed code, and test evidence; these surfaces answer different questions, and control need not mean reading every generated line. Qualitative observations of experienced developers document such bounded delegation and varied verification, but do not establish an optimal chunk size or causal productivity gain. [Expertise-Mediated Agent Steering](/vault/expertise-mediated-agent-steering.md) covers the expertise needed to supply context and interpret results.

Human-owned steps can also preserve learning, ownership, and strategic judgment even when the agent could perform them. A shared editable plan makes that division of labor explicit; see [Editable Plans as Boundary Objects](/vault/editable-plans-as-boundary-objects.md). Perceived steerability and usability are distinct from demonstrated correctness, and neither grants approval authority. Keep the enforceable effect boundary and accountable approver separate from evidence about how pleasant or usable review feels.

## Limitations

A risk score can hide a single disqualifying hazard, and risk classifiers miss hidden dependencies. Tests can encode the same wrong assumption as the patch, and a plausible plan can diverge from the implementation. Review fatigue and thin expertise turn sign-off into theater. Uniformly deep review wastes budget and adds noise, while a cheap default without escalation sends attention to the wrong place. The governance sources here are conceptual models, proposals and a small interview study, not causal evidence that any particular tiering improves outcomes.

## Sources

- [About GitHub Copilot code review dossier](/dossiers/github-copilot-code-review-concepts.md) — Lite/Balanced modes and estimated AI-credit ranges ($0.05–$1/$0.25–$5, excluding Actions minutes); organization default, per-review override and visible effective level; admin-enabled Copilot approvals can satisfy required-approval rules and new commits dismiss them.
- [Bringing Code Review to Claude Code dossier](/dossiers/claude-code-review.md) — parallel AI review sized to the PR; approval stays with a human.
- [Governed AI-Assisted Engineering: Graduated Human Oversight for Agentic Code Generation in Regulated Domains dossier](/dossiers/governed-ai-assisted-engineering.md) — three impact tiers with separate design and release gates; velocity figures are analytical.
- [Human oversight of agentic systems in practice: Examining the oversight work, challenges, and heuristics of developers using software agents dossier](/dossiers/human-oversight-agentic-systems-in-practice.md) — interviews show pre-configuration and co-planning oversight, and unsafe reliance on plans and green tests.
- [Designing meaningful human oversight in AI dossier](/dossiers/designing-meaningful-human-oversight-ai.md) — human evaluative agency requires reviewable evidence and real intervention rights.
- [Humans in Control: A Methodological Framework for Quality Assurance in Agentic Software Engineering dossier](/dossiers/humans-in-control-agentic-qa.md) — proposed human decisions at issue, approach, plan and diff gates; study still planned.
- [AI agents in software testing: a human-in-the-loop assurance model dossier](/dossiers/ai-agents-software-testing-human-assurance.md) — non-empirical approval matrix for release-affecting test artifacts.
- [Agent approvals & security — Codex dossier](/dossiers/openai-codex-approvals-security.md) — distinguishes pre-action automatic review from asynchronous safety monitoring that may pause after an effect.
- [Oh My Pi Tool Approval Model dossier](/dossiers/omp-tool-approval-model.md) — documents risk-tiered tool decisions, rule precedence, headless escalation behavior, and separate action confirmation.
- [Dive into Claude Code dossier](/dossiers/dive-into-claude-code.md) — illustrates runtime permission precedence and session-scoped approvals distinct from model restraint.
- [Why we built our background agent: Inspect dossier](/dossiers/ramp-inspect-background-agent.md) — identifies shared bot PR authorship as a potential self-approval loophole and retains the requesting person's identity.
- [Paperclip Specification — Board-Governed Agent Control Plane dossier](/dossiers/paperclip-control-plane-spec.md) — separates board-level override and budget authority from worker execution.
- [Magentic-UI — Human-Centered Web Agent Control dossier](/dossiers/magentic-ui-human-centered-control.md) — distinguishes plan consent, live takeover, and per-action approval for consequential effects.
- [Plan-Then-Execute: An Empirical Study of User Trust and Team Performance When Using LLM Agents As A Daily Assistant dossier](/dossiers/plan-then-execute-user-trust-llm-agents.md) — peer-reviewed simulation finds task-specific repairs and induced errors, increased workload, and no consistent trust-calibration gain; risk and initial correctness are confounded.
- [Professional Software Developers Don't Vibe, They Control: AI Agent Use for Coding in 2025 dossier](/dossiers/professional-developers-control-ai-agents.md) — qualitative preprint documents bounded execution and varied review surfaces; control is not invariably line-by-line reading or proven productivity improvement.
- [Cocoa: Co-Planning and Co-Execution with AI Agents dossier](/dossiers/cocoa-co-planning-co-execution-agents.md) — peer-reviewed small, bundled studies of editable ownership and replanning; retained human work supports learning and judgment as well as risk management.
