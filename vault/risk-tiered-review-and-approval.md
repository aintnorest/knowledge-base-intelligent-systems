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

## Product Settings Are Not Policy

GitHub Copilot code review exposes a cheaper **Lite** level and a higher-reasoning **Balanced** level, set by organization default and overridable per review. GitHub estimates $0.05–$1 in AI credits per Lite review versus $0.25–$5 per Balanced review, excluding Actions minutes, and publishes no head-to-head detection data. Copilot's approval assessment normally does not count toward required approvals. **If administrators enable Copilot approvals, though, an approving Copilot review can satisfy a required-approval branch rule**, and new commits dismiss it. A team whose policy requires independent human approval must audit that setting rather than assume a numeric approval count means humans only. Anthropic's Code Review, by contrast, never approves PRs.

## Limitations

A risk score can hide a single disqualifying hazard, and risk classifiers miss hidden dependencies. Tests can encode the same wrong assumption as the patch, and a plausible plan can diverge from the implementation. Review fatigue and thin expertise turn sign-off into theater. Uniformly deep review wastes budget and adds noise, while a cheap default without escalation sends attention to the wrong place. The governance sources here are conceptual models, proposals and a small interview study, not causal evidence that any particular tiering improves outcomes.

## Sources

- [About GitHub Copilot code review dossier](/dossiers/github-copilot-code-review-concepts.md) — Lite/Balanced effort, estimated credit ranges, and conditional approvals that can satisfy required-approval rules.
- [Copilot code review effort levels are generally available dossier](/dossiers/github-copilot-review-effort-levels.md) — organization defaults, per-review overrides, and a visible effective tier; no quality comparison.
- [Bringing Code Review to Claude Code dossier](/dossiers/claude-code-review.md) — parallel AI review sized to the PR; approval stays with a human.
- [Governed AI-Assisted Engineering: Graduated Human Oversight for Agentic Code Generation in Regulated Domains dossier](/dossiers/governed-ai-assisted-engineering.md) — three impact tiers with separate design and release gates; velocity figures are analytical.
- [Human oversight of agentic systems in practice: Examining the oversight work, challenges, and heuristics of developers using software agents dossier](/dossiers/human-oversight-agentic-systems-in-practice.md) — interviews show pre-configuration and co-planning oversight, and unsafe reliance on plans and green tests.
- [Designing meaningful human oversight in AI dossier](/dossiers/designing-meaningful-human-oversight-ai.md) — human evaluative agency requires reviewable evidence and real intervention rights.
- [Humans in Control: A Methodological Framework for Quality Assurance in Agentic Software Engineering dossier](/dossiers/humans-in-control-agentic-qa.md) — proposed human decisions at issue, approach, plan and diff gates; study still planned.
- [AI agents in software testing: a human-in-the-loop assurance model dossier](/dossiers/ai-agents-software-testing-human-assurance.md) — non-empirical approval matrix for release-affecting test artifacts.
