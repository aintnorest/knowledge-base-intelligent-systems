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

Copilot code review comments on pull-request changes, identifies possible bugs, security problems and style issues, and proposes fixes. It is available on GitHub.com, the CLI, Mobile, several IDEs, and Azure DevOps in public preview. The product mixes tuned models, prompts, repository context, and optional agentic tooling rather than exposing arbitrary model switching. This is a feature description, not a measured accuracy or defect-prevention study.

## How the Review Operates

- By default a reviewer must assign Copilot; individuals, repository owners, and organization owners can enable automatic PR reviews within their respective scopes. Automatic review fires when an open PR is created or a draft first becomes open; options can include draft reviews and re-review after each push. Without review-on-push, a changed PR is **not automatically re-reviewed** after its first review.
- Agentic review can gather full-project context and delegate suggested fixes to Copilot cloud agent, the latter in public preview. It uses GitHub Actions runners. Reviews still run if Actions is unavailable or a workflow fails, but lose those extra capabilities; disabled hosted runners require self-hosted runners to retain them. This means the nominally same review feature can operate with different contextual reach.
- Repository instructions, `AGENTS.md`, and relevant agent skills are read from the **head branch**, allowing instruction changes in a PR to affect that PR's review. Review-focused skill names, referenced MCP context, and issue or incident IDs in PR descriptions can improve relevant retrieval. GitHub and Playwright MCP servers are on by default; repository MCP configuration is shared with the Copilot cloud agent.
- Dependency-management files (examples include `package.json` and `Gemfile.lock`), logs, and SVG files are excluded from review. A clean Copilot review thus cannot be construed as analysis of the entire changed artifact.

## Effort, Billing, and Review Authority

**Lite**, the default, prioritizes fast targeted feedback; **Balanced** routes to a higher-reasoning model for longer analysis of complex logic, security-sensitive or cross-service changes. An owner can set organization defaults and repository administrators can override them; a requester can choose per review. The overview records the level actually used. GitHub estimates per-review AI-credit consumption of **$0.05–$1 for Lite** and **$0.25–$5 for Balanced**, excluding GitHub Actions minutes; PR size and instructions change usage, and model changes may alter estimates. Billing also depends on the requester/author, bot status, and budgets, which can block reviews.

**Copilot approvals are in public preview.** Every review includes an approval assessment in its overview comment; by default its review **does not count** toward required PR approvals. If Copilot approvals are enabled in repository, organization, and enterprise settings, Copilot can submit an approving review that **satisfies the repository's required-approval rule like a teammate's approval**. New commits dismiss this approval, after which a review can be requested again. This is an authorization boundary, not merely a presentation preference: a team relying on mandatory independent human approval must audit and disable that setting or impose a separate human gate.

## Analyst Takeaways

1. **Do not mistake an AI approval for human signoff.** Inspect enterprise, organization, and repository settings as well as branch protection/rulesets; an admin-enabled Copilot approving review may fulfill the required count. Require a separate human review where human accountability is the policy.
2. **Route depth by risk and log actual effort.** Use Lite on routine changes and Balanced on security-sensitive, high-coupling, or complex changes; measure defect detection, false positives, latency, and credits on representative PRs before codifying a default.
3. **Check review coverage, not only review completion.** Excluded files, missing Actions capabilities, budget exhaustion, and review-on-push settings change what was inspected and when.
4. **Treat PR context as both useful and untrusted.** Head-branch instructions, skill files and MCP servers can improve domain relevance, but must not quietly override repository authority or leak third-party context into review output.
5. **Keep humans in the loop.** GitHub explicitly warns the product misses problems and makes mistakes, recommending careful validation of feedback and supplementary human review. A fast review is not proof the resulting code is correct.

## Questions and Limitations

- Documentation gives no calibrated precision, recall, severity-specific detection rate, or controlled comparison of Lite versus Balanced; the quoted costs are estimates, not measured guarantees.
- The page does not specify how approval assessments are calibrated or what evidence supports counting an automated review as a merge gate. Public-preview behavior and policy options can change.
- Because agentic context gathering degrades when runners are unavailable, an audit should capture run mode, runner state, exclusions, model behavior and the PR commit reviewed, rather than rely on the presence of a review comment.

## Vault Ideas Extracted

* [Calibrated Code-Review Rules](/vault/calibrated-code-review-rules.md)
* [Cost-Aware Inference Control](/vault/cost-aware-inference-control.md)
* [Normative-Source-Grounded AI Assistance](/vault/normative-source-grounded-ai-assistance.md)
* [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md)
