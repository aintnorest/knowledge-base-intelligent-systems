---
type: Study Note
title: Small CLs
description: Google's engineering-practices guide to one self-contained, working, test-backed change per review unit, with horizontal and vertical decomposition and reviewer judgment rather than a hard line-count rule.
resource: https://google.github.io/eng-practices/review/developer/small-cls.html
source: /archive/google-small-cls.html
tags: [code-review, human-in-the-loop, verification, reliability]
timestamp: 2026-09-24T03:45:44Z
---

# Small CLs — Study Notes

**Publisher**: Google Engineering Practices (`eng-practices`), developer code-review guide  
**Author/Date**: No individual byline or publication date on the captured page

## What It Is

This is an organizational code-review guide, not AI-specific advice and not Addy Osmani's personal view. Its criterion for a small change list (CL) is **one self-contained change** that the reviewer can understand and users and developers can safely live with after submission. It should include related test code and enough context to evaluate it; splitting a change into disconnected fragments merely to reduce a line count defeats the purpose.

## Why Review Units Matter

The guide says small CLs receive quicker and more thorough review, are easier to reason about, reject, merge, design well, and revert, and let an author keep working while a prior CL waits. A reviewer may reject a CL solely because it is too large. The author is familiar with the change; the reviewer often starts with little context, so size should be judged from the reviewer's perspective.

**There is no hard size limit.** The guide says 100 lines is *usually* reasonable and 1,000 *usually* too large, but explicitly leaves the decision to reviewer judgment and file spread: 200 lines in one file may be reasonable while the same work across 50 files may not. Counting a deleted file like one line illustrates why raw diff size is a weak measure of review burden.

## Decomposition Without Breaking the Product

- Stack a new self-contained change on an earlier CL already under review; do not idle until every dependency is approved.
- Split by file ownership/reviewer where artifacts can be reviewed separately—for example, a protocol definition before consumers, or code before its configuration or experiment. Inform the reviewers about the relationship.
- Split horizontally across layers by introducing a stable proto or API stub where it genuinely separates responsibilities; alternatively split vertically into complete small features (e.g., new calculator operators). Both axes can be combined into a sequence of standalone CLs.
- Keep substantial refactoring separate from behavior change so reviewers can assess the intended delta. Small local renames can stay with the change when they do not obscure it.
- Keep tests for changed logic in the same CL. Tests validating already-submitted code or building shared test infrastructure may come first in separate CLs; a behavior-preserving refactor also needs adequate existing or added coverage.
- Preserve a working build **after every submitted CL**, even if several depend on each other. A split that knowingly breaks the build until later pieces merge is not a safe split.

A CL must not be *too* small either: a new API should normally have at least one use in the same CL so its consequences can be evaluated. When an irreducibly large CL remains, talk to reviewers before writing it and expect more review and testing effort.

## Analyst Takeaways

1. **Use independently understandable change units for agent work.** One bounded behavior plus associated tests and evidence is easier to review than a pile of unrelated AI-generated edits.
2. **Size by cognitive burden and working state, not a line quota.** Google sets no hard ceiling; a strict numeric threshold can encourage harmful splits that conceal dependencies or ship unused abstractions.
3. **Plan the dependency chain before coding.** A stack of small, build-safe changes can keep throughput high while protecting the shared branch; distinguish changes that can review concurrently from those that must land in order.
4. **Do not divorce tests from behavior.** Reviewers need to see why the change works; only genuinely independent test work merits its own CL.
5. **Optimize rollback as well as merge.** Keeping config and behavior, or refactor and feature, separable can narrow the consequences of an undo.

## Questions and Limitations

- The guide does not present quantitative evidence, reviewer-time distributions, defect-rate comparisons, or an AI-specific evaluation. Its rationale is an engineering-practices recommendation.
- 'One self-contained change' still requires judgment when a migration, public API, or cross-layer invariant must change atomically. Forcing arbitrary horizontal splits can overproduce stubs or transient compatibility code.
- Its statement that tests are expected for all Google changes describes Google's practice; other teams should adopt a suitable proof policy rather than mimic an incidental numeric coverage rule.

## Vault Ideas Extracted

* [Reviewable Change Units](/vault/reviewable-change-units.md)
