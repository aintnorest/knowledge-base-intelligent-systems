---
type: Study Note
title: "More Code, Less Reuse: Investigating Code Quality and Reviewer Sentiment towards AI-generated Pull Requests"
description: "MSR 2026 study comparing semantic code redundancy in agent and human pull requests and the sentiment of their human reviewers."
resource: https://doi.org/10.1145/3793302.3793622
source: /archive/ai-pull-requests-semantic-redundancy.pdf
tags: [code-quality, coding-agents, agents, code-review, evaluation, human-in-the-loop]
timestamp: 2026-09-24T03:45:00Z
---

# More Code, Less Reuse: Investigating Code Quality and Reviewer Sentiment towards AI-generated Pull Requests — Study Notes

**Authors**: Haoming Huang, Pongchai Jaisri, Shota Shimizu, Lingfeng Chen, Sota Nakashima, and Gema Rodríguez-Pérez  
**Venue**: 23rd International Conference on Mining Software Repositories (MSR ’26), April 13–14, 2026; DOI: 10.1145/3793302.3793622  
**Source version**: arXiv:2601.21276v1, January 29, 2026; five-page ACM paper

## What It Is

A study of two different properties of real AI-authored pull requests: whether new functions repeat existing repository logic, and how people respond in review comments. Its central warning is that conventional size and complexity measurements—and reviewers' apparently congenial response—can miss semantic duplication. The field evidence is narrower than the slogan: redundancy is measured in one Python repository, whereas the other metrics and sentiment draw on a larger Python sample.

## Data and Method

- Draw from AIDev and restrict to Python repositories with more than 500 stars. **Dataset A** has 3,858 PRs for conventional code metrics and sentiment; **Dataset B** has 617 PRs from `crewAI` for expensive semantic redundancy analysis. The paper does not establish that the latter repository represents all agent-assisted software.
- Compare Radon-based additions, removals and cyclomatic complexity on before/after file pairs. To measure reuse, embed baseline functions and newly added functions using CodeSage-Large; exclude PyRef-detected moved/renamed methods; assign each PR its **maximum** new-to-existing cosine similarity, then compare the average maximum redundancy (AMR) between author groups. This is a similarity proxy for Type-4 semantic clones, not an independently verified count of duplicated behavior.
- Pool non-bot PR/review comments and classify seven emotions with Emotion English DistilRoBERTa-base, excluding text beyond the model's 512-token limit; average sentiment scores by PR. An emotion label does not establish what a reviewer noticed or why a PR was accepted.

## Findings

- Mean lines added are nearly alike: **23.01** per human PR and **23.78** per agent PR. Mean lines removed are **25.51** versus **16.60**; multiline-string removals are **26.26** versus **8.47**, respectively, with the latter reported at **p < 0.001**. The paper's complexity analysis assigns zero complexity score to **18,968/22,311** before/after pairs (**85.02%**); only **11** fall in the high-risk (10+) bucket.
- In the 617-PR `crewAI` case study, AMR is **0.2867** for agent PRs and **0.1532** for human PRs, approximately **1.87×** as high for agent work, with Mann–Whitney **p < 0.001**. This is an embedding similarity difference, not a demonstrated 1.87× increase in maintenance defects. The paper does not report calibration against a sizeable manually labeled clone set; it manually checks only ten sample results for its refactoring filter.
- Neutral is the dominant review emotion for both groups. Agent PR comments score relatively higher on neutral, joy and sadness; human PR comments higher on disgust, anger, fear and surprise. No effect sizes, confidence intervals, or significance tests for these emotion contrasts are given. The inference that reviewers *failed to notice* duplication is suggestive, not measured reviewer cognition.

## Analyst Takeaways

1. **Review repository-relative reuse, not just local correctness.** Before accepting a new helper, search for an existing implementation with the same behavior, even when names and syntax differ. A passing test and modest cyclomatic complexity do not answer the reuse question.
2. **Separate design defects from social response.** Positive/neutral comment sentiment is not an independent maintainability check; ask a reviewer explicitly to assess duplicate logic and compatibility with existing abstractions.
3. **Instrument the right outcome.** For a light AI software factory, sample agent PRs for semantic duplication and track later fixes to cloned paths; treat embedding similarity as triage, not automatic proof that two functions are equivalent.
4. **Do not generalize the direction of this one metric to all code quality.** The 617-PR case cannot overturn studies measuring different agents, languages, periods, issue types, and post-merge windows.

## Questions and Limitations

- One repository and one language anchor the main semantic comparison; repository selection, agent-task allocation, and PR size can confound the author-group difference.
- Taking the *maximum* similarity per PR may favor PRs adding more functions, since they offer more opportunities to match; size-adjusted or per-new-function analyses are not shown.
- Embedding similarity can confuse shared idioms or APIs with redundant implementations; the PyRef check does not provide a semantic-clone precision/recall estimate.
- Emotions predicted by a general-English classifier may misread technical criticism; comment coverage and reviewer awareness of author identity are not established. The proposed RLHF/sycophancy explanation is speculative, not a tested mechanism.
- The paper does not measure actual downstream bug rates, code changes to both clone sites, or maintenance time.

## Vault Ideas Extracted

* [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md)
* [Repository Drift Garbage Collection](/vault/repository-drift-garbage-collection.md)
* [Repository-Relative Code Quality](/vault/repository-relative-code-quality.md)
