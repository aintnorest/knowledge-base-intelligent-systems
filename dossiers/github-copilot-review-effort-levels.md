---
type: Study Note
title: Copilot code review effort levels are generally available
description: GitHub's Lite and Balanced review-depth settings, including per-review selection, inherited organizational defaults, and visible run-level labeling.
resource: https://github.blog/changelog/2026-08-07-copilot-code-review-effort-levels-are-generally-available/
source: /archive/github-copilot-review-effort-levels.html
tags: [code-review, agents, coding-agents, routing, evaluation, enterprise]
timestamp: 2026-09-24T03:43:02Z
---

# Copilot code review effort levels are generally available — Study Notes

**Publisher**: GitHub Changelog  
**Published**: August 7, 2026  
**Format**: Product availability announcement

## What It Is

GitHub announces general availability of two Copilot code-review effort levels: **Lite** for straightforward changes and **Balanced** for larger, complex, or sensitive pull requests needing deeper analysis from a higher-reasoning model. These are now the names for the preview's **Low** and **Medium** settings, respectively; existing configurations carry forward. The announcement does not establish measured review-quality gains.

## How It Works

A requester chooses Lite or Balanced for a particular review without changing repository or organization defaults. Organization administrators set a default inherited by repositories that lack their own level. The chosen level appears in the PR timeline and overview comment, so it is possible to record the analysis depth of an actual run, not just infer it from policy. Availability covers Copilot Pro, Pro+, Max, Business, and Enterprise.

This is risk-aligned allocation of review compute: documentation updates and small fixes may merit focused feedback, whereas complex logic, security-sensitive changes, and cross-service PRs warrant greater scrutiny. It is not an authorization setting, a test gate, or an explicit guarantee that the deeper review detects a given defect.

## Analyst Takeaways

1. **Make effort a change-risk policy, not a popularity setting.** Route routine low-risk PRs to Lite; escalate high-blast-radius and security-sensitive changes to Balanced and preserve human review on critical work.
2. **Measure quality per tier before claiming savings.** The changelog contains no defect-detection, precision, recall, latency, or spend comparison. Compare actionable findings and downstream escapes across risk-matched changes and record actual review effort from the run's timeline/comment.
3. **Separate request override from inherited defaults.** An organization-wide default is convenient, but repositories and individual reviews can still differ; audit the effective per-run setting for assurance.

## Questions and Limitations

- GitHub provides no calibrated threshold for when Lite becomes inadequate or any controlled evidence that Balanced catches more important issues.
- The announcement does not quantify compute, billing, or latency; companion product documentation estimates distinct AI-credit ranges and notes additional Actions-minute charges.
- Review-depth labels support auditability but cannot by themselves prove that the relevant files or context were examined, or that a human accepted the findings.

## Vault Ideas Extracted

* [Cost-Aware Inference Control](/vault/cost-aware-inference-control.md)
* [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md)
