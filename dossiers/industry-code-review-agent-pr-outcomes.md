---
type: Study Note
title: "From Industry Claims to Empirical Reality: An Empirical Study of Code Review Agents in Pull Requests"
description: "MSR 2026 observational study comparing merge outcomes for human-only and bot-only comments, with a keyword-based signal analysis of abandoned bot-only PRs."
resource: https://doi.org/10.1145/3793302.3793614
source: /archive/industry-code-review-agent-pr-outcomes.pdf
tags: [code-review, agents, coding-agents, evaluation, human-in-the-loop, reliability]
timestamp: 2026-09-24T03:45:40Z
---

# From Industry Claims to Empirical Reality: An Empirical Study of Code Review Agents in Pull Requests — Study Notes

**Authors**: Kowshik Chowdhury, Dipayan Banik, K M Ferdous, and Shazibul Islam Shamim  
**Venue**: 23rd International Conference on Mining Software Repositories (MSR 2026), April 13–14, 2026  
**DOI**: 10.1145/3793302.3793614  
**Pages**: 5

## What It Is

An observational check on promotional claims that code-review agents make human review mostly unnecessary. The authors mine AI-associated GitHub PR review data to compare merged, closed-unmerged, and still-open outcomes by whether comments came from code-review agents (CRAs), humans, or both. Their second analysis calls comments “signal” when they contain keywords associated with concrete critical or important issues. It is a useful counterweight to vendor self-reports, but neither merge rate nor keyword presence directly measures review correctness.

The industry context includes a Qodo developer survey of 609 respondents reporting 81% perceived quality improvement and 69% speed improvement; the paper notes 80% of PRs in that report received no human comments when a CRA was enabled. **No human comments does not mean human inspection was absent or unnecessary**, and those surveyed perceptions are not controlled outcome evidence.

## Dataset and Method

From 19,450 review-comment records in the AIDev dataset, the authors join review-state and PR metadata, aggregate 3,177 distinct PRs with comments, exclude automation accounts not performing code review, and analyze **3,109 PRs**. They classify reviewer composition as bot-only, human-only, or one of three mixed groups; outcome is merged, closed without merge, or open. They prioritize APPROVED over DISMISSED over CHANGES_REQUESTED over COMMENTED when PRs have multiple review states.

Only the COMMENTED state contains a bot-only group; this comparison therefore covers **2,456 COMMENTED PRs**, not all 3,109, and bots have not issued formal merge approval in this dataset. For the 98 closed-unmerged bot-only PRs, the authors use severity-themed keyword lists (runtime/security vs architecture/performance/maintainability) and open coding to classify comments; two researchers report Cohen's κ = 0.75. “Signal ratio” is keyword-classified signal comments divided by all comments on that PR, grouped into percentage bands.

## Results

| Reviewer composition | PRs | Merged | Closed unmerged | Open |
|---|---:|---:|---:|---:|
| Bot-only | 281 | 127 (45.20%) | 98 (34.88%) | 56 (19.93%) |
| Human-only | 1,176 | 804 (68.37%) | 254 (21.60%) | 118 (10.03%) |
| Mixed, more bots | 117 | 74 (63.25%) | 17 (14.53%) | 26 (22.22%) |
| Mixed, equal | 604 | 369 (61.09%) | 128 (21.19%) | 107 (17.72%) |
| Mixed, more humans | 278 | 189 (67.99%) | 41 (14.75%) | 48 (17.27%) |

The **23.17 percentage-point bot-only versus human-only merge gap** is an association (χ² = 83.0319, 8 df, p < 0.001 across reviewer categories and outcomes), not an estimate of humans' causal contribution. Different PRs, authors, repositories, change complexity, activity, and reviewer assignment may explain some or all of the difference. Open PRs are counted alongside completed outcomes without a common observation window.

Among the **98 already closed-unmerged bot-only PRs**, 59 (60.2%) have a 0–30% keyword signal ratio; 14 are 31–59%, seven 60–79%, and 18 are 80–100%. Twelve of 13 named CRAs have average signal ratios below 60%; the sole 100% bot appears on **one PR**. Copilot's reported mean is 19.79% and GitHub Advanced Security's 27.62% in this selected subgroup. Crucially, the paper **does not compare signal ratios between merged and abandoned bot-only PRs**. Its assertion that low signal substantially *contributes* to abandonment is not identified by its analysis; a closed-only sample cannot test that relationship.

## Analyst Takeaways

1. **Keep human accountability for merge decisions until real outcomes validate an alternative.** The observed bot-only cohort merges less often, but the data establish association and sampling limits, not a universal mandate or proof of causation.
2. **Measure whether maintainers act on accurate comments, not whether bots comment.** Sample a common population of merged and rejected PRs; label actionable, false-positive, and missed findings with repository context, then examine downstream defects.
3. **Reduce noisy volume.** Narrow review scopes to meaningful risk classes and suppress weak remarks; keyword counts alone are not a reliable quality gate, so adjudicate examples manually and track calibration.
4. **Treat no human *comment* as an invalid proxy for no human *review*.** Product claims about “handling” most PRs require observed decision responsibility, review depth, retained quality, and maintenance burden.
5. **Account for missing authority.** Bot-only accounts in this dataset occur only under COMMENTED; differences from formally approved human PRs cannot be attributed to model quality alone.

## Questions and Limitations

- Author selection, patch risk, repository, reviewer privileges, and lifecycle status are not matched; the chi-square test cannot rule out confounding.
- Keyword matching can miss useful prose and label an irrelevant security keyword as signal; manual review and κ = 0.75 do not establish a complete ground truth.
- Signal was measured only for failed bot-only PRs, making the proposed signal→merge mechanism untestable here.
- Merge may reflect maintainer attention, preference, backlog, or policy, not objectively better code; closed-unmerged does not necessarily mean a review caused abandonment.
- Public GitHub PRs from an AI-associated dataset do not establish impact on an internal software factory or regulated changes.

## Vault Ideas Extracted

* [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md)
* [Weakest-Link Assurance Composition](/vault/weakest-link-assurance-composition.md)
