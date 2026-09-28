---
type: Study Note
title: About GitHub Copilot code review
description: GitHub's feature and policy contract for agentic pull-request reviews, review effort, repository context, costs, and conditional AI approvals.
resource: https://docs.github.com/en/copilot/concepts/agents/code-review
source: /archive/github-copilot-code-review-concepts.html
tags: [code-review, agents, coding-agents, human-in-the-loop, governance, enterprise]
timestamp: 2026-09-24T03:43:02Z
---

# About GitHub Copilot code review — Study Notes

**Publisher**: GitHub Docs  
**Format**: Product documentation; saved page does not specify a publication date  
**Public URL**: https://docs.github.com/en/copilot/concepts/agents/code-review

## What It Is

Copilot code review comments on pull-request changes, identifies possible bugs, security problems and style issues, and proposes fixes. The product combines tuned models, prompts, repository context, and conditional agentic tooling. This is a feature description, not a measured accuracy or defect-prevention study.

## How the Review Operates

- A review may run when a PR first opens without running again after subsequent commits. Review presence alone does not establish coverage of the latest revision.
- Agentic review can gather full-project context and delegate suggested fixes to Copilot cloud agent, the latter in public preview. It depends on GitHub Actions runners. Reviews still run if Actions is unavailable or a workflow fails, but lose those extra capabilities; without hosted runners, self-hosted runners are needed to retain them. Thus the same review feature can operate with different contextual reach.
- Repository instructions and relevant agent skills are read from the **head branch**, allowing instruction changes in a PR to affect that PR's review. PR descriptions and connected external context may also shape retrieval; head-branch content is useful evidence, not independent policy authority.
- Dependency-management files (including package manifests and lockfiles), logs, and SVG files are excluded from review. A clean Copilot review thus cannot be construed as analysis of the entire changed artifact.

## Effort, Billing, and Review Authority

Review effort can trade speed for deeper analysis, but the documentation provides no controlled evidence that greater effort improves defect detection for a given change. Actual review depth and resource use vary with PR size and available context.

**Copilot approvals are in public preview.** Every review includes an approval assessment in its overview comment; by default its review **does not count** toward required PR approvals. If automated approvals are authorized by the governing policy, Copilot can submit an approving review that **satisfies the repository's required-approval rule like a teammate's approval**. New commits dismiss this approval. This is an authorization boundary, not merely a presentation preference: mandatory independent human approval requires a separate human gate.

## Analyst Takeaways

1. **Do not mistake an AI approval for human signoff.** An authorized Copilot approving review may fulfill the required count; preserve an independent human gate where human accountability is the policy.
2. **Route depth by risk and record actual effort.** Compare defect detection, false positives, latency, and resource use on representative PRs before choosing how much review effort complex or security-sensitive changes warrant.
3. **Check review coverage, not only review completion.** Excluded files, missing Actions capabilities, budget exhaustion, and review-on-push settings change what was inspected and when.
4. **Treat PR context as both useful and untrusted.** Head-branch instructions and connected context can improve domain relevance, but must not quietly override repository authority or leak third-party context into review output.
5. **Keep humans in the loop.** GitHub explicitly warns the product misses problems and makes mistakes, recommending careful validation of feedback and supplementary human review. A fast review is not proof the resulting code is correct.

## Questions and Limitations

- Documentation gives no calibrated precision, recall, severity-specific detection rate, or controlled comparison between review-effort levels; resource-use estimates are not measured guarantees.
- The page does not specify how approval assessments are calibrated or what evidence supports counting an automated review as a merge gate. Public-preview behavior and policy options can change.
- Because agentic context gathering degrades when runners are unavailable, an audit should capture run mode, runner state, exclusions, model behavior and the PR commit reviewed, rather than rely on the presence of a review comment.

## Vault Ideas Extracted

* [Calibrated Code-Review Rules](/vault/calibrated-code-review-rules.md)
* [Cost-Aware Inference Control](/vault/cost-aware-inference-control.md)
* [Normative-Source-Grounded AI Assistance](/vault/normative-source-grounded-ai-assistance.md)
* [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md)
