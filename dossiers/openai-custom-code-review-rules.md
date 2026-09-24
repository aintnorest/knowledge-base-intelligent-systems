---
type: Study Note
title: Custom Code Review rules for Codex
description: OpenAI's scoped AGENTS.md review-rule design and internal positive/negative-case evaluation, reporting 98% recovery of required custom findings against 58.3% in its baseline control.
resource: https://developers.openai.com/blog/custom-code-review-rules-for-codex
source: /archive/openai-custom-code-review-rules.html
tags: [code-review, agents, coding-agents, evaluation, verification, human-in-the-loop]
timestamp: 2026-09-24T03:45:40Z
---

# Custom Code Review rules for Codex — Study Notes

**Publisher**: OpenAI Developers, Codex  
**Date**: July 20, 2026

## What It Is

OpenAI describes repository-specific instructions for **Codex Code Review** stored in `AGENTS.md`. The objective is to externalize important review knowledge—compatibility contracts, data boundaries, and prior incidents—known to a few experienced reviewers but invisible in a plausible-looking diff. The review agent can apply an applicable rule and cite it when raising a finding. This is an additional reviewer, not a replacement for executable checks, branch protection, or required human approval.

The motivation is increased code volume: OpenAI says its weekly PR volume **more than doubled since Q4**. That is a first-party throughput observation, not a measurement that more PRs are correct or that the review feature improved merge outcomes.

## Scoped Rules as a Review Interface

Global concerns live at the root; service-specific concerns live in nested `AGENTS.md` files. The review should load guidance applicable to changed files instead of asking every reviewer to consider every team's rules. Start with a small, consequential, non-obvious invariant repeatedly explained in review. State both what must be preserved and an allowed safe path. Keep formatting, syntax, and other mechanical checks in deterministic CI rather than converting them to speculative natural-language comments.

The article's concrete example is the `rawResponseItem/completed` app-server notification, consumed by Codex Cloud despite its experimental designation. Renaming its wire name to `rawResponseItem/done` can compile while breaking an integration. A concise breaking-change rule singles out `rawResponseItem/*`; a useful review finding cites the rule and suggests **“Keep the existing name or add a backward-compatible event.”** This example is an illustrative review case, not evidence of an actual production outage.

Rule durability matters: describe the contract rather than transient function names, scope it to the appropriate service, review changes to rules, and remove or narrow rules that repeatedly create noise. A rule that does not change the review is not worth the context it consumes.

## The Internal Evaluation

OpenAI reports an eval suite containing **known rule violations and safe counterexamples**. In its primary suite, rule-guided variants recovered **98% of required custom findings**, versus **58.3% for the baseline control**—a **39.7 percentage-point** reported gain on that specific finding-recovery metric. The article does not publish the suite size, precision, confidence intervals, model variants, exact rubric, or whether this delta holds on unseen customer repositories.

The authors also organized evaluation around four dimensions, not just violation recall:

1. **Coverage**: intended violations should surface even in busy diffs with competing instructions.
2. **Restraint**: clean changes and valid exceptions should not elicit unnecessary findings.
3. **Retention**: ordinary bugs outside the custom rules should still be caught.
4. **Actionability**: findings should identify relevant guidance, location, and priority.

The result given quantitatively is coverage on the primary suite. Restraint, retention, and actionability were tested but **no corresponding scores are disclosed**. OpenAI says broad instructions created noise and smaller scoped sets with explicit safe paths helped in internal repositories; that is qualitative experience, not a reported false-positive rate.

## Practical Adoption Pattern

OpenAI suggests trying **two or three** rules in the applicable file and testing a representative PR. A better local gate is a three-way probe: one change that violates the rule, one safe counterexample (such as retaining compatibility), and one unrelated change that should not be flagged. Inspect whether the violation generates a grounded, useful finding and whether the other two stay quiet. Keep hard enforcement in tests, linters, branch protections, and approvals.

## What Is Claimed Versus Measured

**Measured on a vendor's internal eval**: 98% versus 58.3% recovery of required custom findings, with the setup described only at a high level. This establishes a local improvement in a targeted measure, not overall code-review accuracy.

**Unmeasured claims**: repeated review work can be saved, authors receive faster feedback, and scoped rules reduce irrelevant noise without harming other bug detection. The article does not provide production review-time savings, reviewer agreement, false-positive counts, severe-defect recall, or impact on merged defects. Treat a cited rule as justification for a finding, not as proof that the finding is true.

## Analyst Takeaways

1. **Translate repeated reviewer knowledge into narrow invariants.** Compatibility names and data boundaries are good candidates; formatting is better enforced by code.
2. **Test both trigger and non-trigger.** Violation-only evaluation rewards over-reporting. Safe exceptions and unrelated diffs reveal whether a rule contaminates neighboring reviews.
3. **Keep the review result falsifiable.** Ask for the exact changed line, violated contract, likely consequence, safe remediation, and rule citation; humans can then verify the claim.
4. **Do not confuse custom-rule recall with reviewer quality.** The 98% figure excludes undisclosed false positives and any unreported regression in ordinary-bug detection.
5. **Make rule ownership and lifecycle explicit.** Nested scope, current contract language, and removal of noisy rules prevent an `AGENTS.md` collection from becoming an outdated policy dump.

## Questions and Limitations

- What were the number and difficulty of positive and negative cases in the primary suite, and were they held out from rule writing?
- How did ordinary-bug recall and false-positive rate change across guided and baseline variants?
- Can the reviewer reliably disambiguate nested rules, valid exceptions, and changes spanning several services?
- This is OpenAI evaluating OpenAI's review product; there is no independent replication or causal deployment study.
- Custom instructions can flag problems but cannot enforce runtime compatibility or protect data on their own.

## Vault Ideas Extracted

* [Calibrated Code-Review Rules](/vault/calibrated-code-review-rules.md)
* [Machine-Readable Agent Specifications](/vault/machine-readable-agent-specifications.md)
* [Verification-Centric Generated-Review Evaluation](/vault/verification-centric-generated-review-evaluation.md)
