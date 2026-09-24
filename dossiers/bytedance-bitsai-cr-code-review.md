---
type: Study Note
title: "BitsAI-CR: Automated Code Review via LLM in Practice"
description: ByteDance's two-stage rule-driven code reviewer and deployment study, distinguishing judged precision from user response and reporting the limitations of line-change-based Outdated Rate.
resource: https://arxiv.org/abs/2501.15134v1
source: /archive/bytedance-bitsai-cr-code-review.pdf
tags: [code-review, evaluation, verification, enterprise, human-in-the-loop, reliability]
timestamp: 2026-09-24T03:43:02Z
---

# BitsAI-CR: Automated Code Review via LLM in Practice — Study Notes

**Authors**: Tao Sun, Jian Xu, Yuanpeng Li, Zhao Yan, Ge Zhang, Lintao Xie, Lu Geng, Zheng Wang, Yueyan Chen, Qin Lin, Wenbo Duan, and Kaixin Sui  
**Organization**: ByteDance  
**Venue**: arXiv:2501.15134v1 [cs.SE], January 25, 2025; the 2025 FSE publication is cited in subsequent literature  
**Study site**: ByteDance production merge-request workflow

## What It Is

BitsAI-CR generates code-review findings at specific changed lines and then checks each candidate with a second model before showing it. Its distinguishing contribution is an **operating loop**: taxonomy-based review rules, a precision filter, sampled human labeling, user feedback, and a behavioral proxy called **Outdated Rate** guide rule adjustment after deployment. The authors distinguish technical correctness from actionable value: a correct suggestion about a magic number can be ignored because the developer sees no reason to change it.

## Pipeline and Rule Flywheel

- A taxonomy of **219 review rules across five programming languages** spans security vulnerabilities, code defects, maintainability/readability, and performance. Internal style/static-analysis rules and historical human review comments supply examples. From **120,000** initial comments, refinement and human sampling yield approximately **18,000** samples for Go and front-end languages each and **5,000** for each other language.
- Context preparation splits a diff into hunks, expands to relevant function boundaries using tree-sitter under size caps, and annotates added, deleted, and unchanged lines. **RuleChecker**, a LoRA-tuned Doubao-Pro-32K-0828 model, proposes category, location, problem, and suggested modification. A rule-category blocker suppresses unwanted categories without retraining.
- **ReviewFilter**, another tuned model, judges whether a proposed comment survives; conclusion-first output lets deployment read a yes/no token quickly while training may include rationale. Embedding-based comment aggregation groups similar comments to avoid duplicative notifications. This controls alert volume as well as factual errors.
- Precision is manually monitored on a daily online sample (generally **≤10%** of comments) and compiled weekly. Sparse likes/dislikes add context. Rules with persistently low practical response despite high precision are considered for removal; the paper describes a dual-metric decision window around **25% ±5% Outdated Rate** and **65% ±5% precision** for **14 days**, not a universal correctness threshold.

**Outdated Rate** counts comments viewed by committers within a one-week window for which **any line** in the flagged range changes in subsequent commits, divided by all such viewed comments. It is an inexpensive *line-change proxy*, not verified acceptance of the suggestion or proof the identified defect was fixed. Unrelated edits can overcount; an author can fix elsewhere without touching the flagged line.

## Precision, Recall, and Adoption: Keep the Populations Distinct

An offline set of **1,397** production-derived cases includes **767** violations and **630** compliant cases, with automatic correctness judged using Doubao-Pro-32K-0828. The all-category **Table 2** reports taxonomy-guided RuleChecker precision **57.03%** and recall **45.50%**, versus precision **65.59%** and recall **39.77%** after ReviewFilter; the version **without taxonomy** is **16.83%/31.55%** before filter and **30.92%/22.29%** after. These are offline, judge-conditioned figures, not the deployed 75% estimate. The surrounding prose elsewhere says **54.50%→67.12%** for the filter, which **disagrees with Table 2**; the lessons section instead describes a Go-specific **30.92%→65.59%** while Table 2 labels those figures as without-taxonomy all-category and taxonomy-guided all-category after filtering. Do not merge these into one benchmark result.

On a separate **400-case** study of filter formats, direct-decision output achieved **63.27% precision, 77.50% recall, 1.7 s/sample**; reasoning-first achieved **65.80%, 81.80%, 31.0 s/sample**; conclusion-first achieved **77.09%, 69.00%, 1.7 s/sample**. A faster, more selective classifier traded recall for precision in that study.

In **18 weeks** of live monitoring, the authors report RuleChecker precision rising from **27.9% to 62.6%** and filtered precision from **35.6% to a peak 75.0%**; the abstract's **75.0% precision** is the online peak, not the offline Table 2 value. Go Outdated Rate peaked at **26.7%** by week 18, versus observed **35%–46%** for human comments; removal of underperforming rules began around week 14. This temporal trend is not a randomized estimate of the flywheel's causal effect.

ByteDance reports **>12,000 weekly active users** and **210,000 weekly page views**. In a **137-person** user survey, **102/137 (74.5%)** affirmed value/effectiveness; among dissatisfied or improvement-seeking participants, **15/137 (10.9%)** cited incorrect comments and **17/137 (12.4%)** correct but unnecessary comments, with smaller irrelevant and confusing groups. Twelve experienced-user interviews reported utility but frequent desire for faster response (**9/12**), customizable rules (**11/12**), and one-click fixes (**11/12**). Second-week retention was **61.64%** and eighth-week retention about **48%**, on the plotted deployment cohort.

## Analyst Takeaways

1. **Separate precision from actionability.** Sample human validity labels and track whether a suggestion triggered a relevant fix. Review a stratified set of line changes manually; Outdated Rate is a useful diagnostic, not “developer acceptance rate.”
2. **Use a low-noise detection/filter pipeline.** A dedicated candidate verifier plus duplicate aggregation can materially change false-positive burden; measure lost severe findings as recall falls, rather than celebrating precision in isolation.
3. **Govern review rules as product policy.** Version rule categories, retain source guidance, inspect disagreements, suppress stale/noisy classes, and apply per-language/per-team quality slices.
4. **Choose filter reasoning under a latency constraint.** The 400-case study favors conclusion-first precision at 1.7 seconds, with notably lower recall than reasoning-first; do not assume elaborate rationale is free or intrinsically better.
5. **Treat vendor deployment figures as directional.** Surveys, retention and sampled precision show adoption and perceived utility but not independently audited downstream defect reduction.

## Questions and Limitations

- Internal code and labels are not available for independent replication; model-as-judge error and overlap between tuned models and evaluator can bias offline precision.
- The paper's narrative numerical conflicts with its Table 2 on the same apparent filter comparison. Cite the table with its stated population and flag the discrepancy rather than silently reconcile it.
- Outdated Rate is one-week, view-conditioned and line-based; it is vulnerable to unrelated edits, changed scope, workflow confounding, and missing off-line fixes. Human Outdated Rate is not an apples-to-apples quality ceiling.
- The reported 18-week changes also coincide with taxonomy rollout, rule expansion, rule removal, model and deployment iteration, so the effect of any one mechanism is not identified experimentally.
- A reviewer generating “LGTM” after re-evaluation is not a substitute for independent human approval or executable checks on high-risk changes.

## Vault Ideas Extracted

* [Calibrated Code-Review Rules](/vault/calibrated-code-review-rules.md)
* [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md)
* [Verification-Centric Generated-Review Evaluation](/vault/verification-centric-generated-review-evaluation.md)
