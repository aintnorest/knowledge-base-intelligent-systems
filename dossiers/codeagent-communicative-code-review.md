---
type: Study Note
title: "CodeAgent: Autonomous Communicative Agents for Code Review"
description: "EMNLP 2024 multi-agent review pipeline with QA-Checker, tested on commit-message alignment, vulnerability findings, formatting, and revision edit progress."
resource: https://aclanthology.org/2024.emnlp-main.632/
source: /archive/codeagent-communicative-code-review.pdf
tags: [code-review, agents, coding-agents, multi-agent, evaluation, verification]
timestamp: 2026-09-24T03:45:40Z
---

# CodeAgent: Autonomous Communicative Agents for Code Review — Study Notes

**Authors**: Xunzhu Tang, Kisub Kim, Yewei Song, Cedric Lothritz, Bei Li, Saad Ezzini, Haoye Tian, Jacques Klein, and Tegawendé F. Bissyandé  
**Venue**: EMNLP 2024, pp. 11279–11313  
**DOI**: 10.18653/v1/2024.emnlp-main.632  
**Date**: November 2024

## What It Is and Why

CodeAgent models review as a sequence of conversations rather than one diff-to-comment call. Its target tasks are code-change/commit-message consistency (CA), vulnerability introduction (VA), formatting consistency with the original file (FA), and code revision (CR). The paper proposes that role coordination and an additional QA-Checker will keep a simulated review team aligned with the user's original question; it evaluates those subtasks against code models and general-purpose LLM prompting baselines.

This is evidence for a *particular multi-role review harness*, not proof that an AI reviewer can approve arbitrary PRs. The tasks and outcome measures are substantially narrower than design review, architectural coherence, project-specific intent, or production safety.

## How the System Works

Six named roles (User, CEO, CTO, Coder, Reviewer, CPO) move through four phases. Basic Info Sync identifies input modality and language; Code Review asks Coder and Reviewer to assess the patch; Code Alignment revises or suggests code; Document summarizes findings for stakeholders. Conversations are task-specific instructor–assistant exchanges. QA-Checker watches each exchange: if an answer drifts from the original review question, it adds an instruction to refocus the next turn; iteration stops when the answer is judged appropriate or a dialogue-turn limit is reached. This is task-alignment feedback, not independent verification that a vulnerability report or patch is correct.

The study reuses Trans-Review, AutoTransform, and T5-Review datasets for revision and curates 3,545 code changes/commits, including 2,933 PRs from more than 180 projects across Python, Java, Go, C++, JavaScript, C, C#, PHP, and Ruby, for the other evaluations. Commit/format datasets contain merged and closed examples; the study reports recall and F1 on these classifications, manually confirmed findings for vulnerability analysis, and edit-distance-based Edit Progress for revisions.

## Measured Results

- **Vulnerability findings**: 483 CodeAgent findings, of which 449 were confirmed after more than 120 working hours of manual examination (at least a researcher and an engineer per sample): 92.96% confirmed *among flagged cases*, or 12.67% of all 3,545 items. GPT-4 reported 671 findings, 345 confirmed (51.42% of findings; 9.73% of all items). Removing QA-Checker yielded 564 findings, 413 confirmed (73.23% of findings; 11.65% of items). These figures are not defect recall: ground truth was seeded by verifying CodeAgent-found cases, and unflagged cases were not exhaustively adjudicated.
- **Commit-message consistency**: merged/closed CodeAgent recall 90.11%/87.15% and F1 93.89%/92.40%; averaged recall 88.63% and F1 93.16%, versus GPT-4's 83.01% recall and 89.61% F1.
- **Format alignment**: merged/closed recall 89.34%/89.57% and F1 94.01%/94.13%; average 89.46% recall and 94.07% F1, versus GPT-4's 73.50% and 83.62%. Table 4 calls the average recall improvement both 13.39 and 15.96 points in different locations; the table's difference from its strongest listed baseline is 15.96 points, so do not quote an unqualified improvement percentage.
- **Revision**: average Edit Progress is 31.6% across three existing datasets, against 29.8% for AutoTransform, the strongest reported mean baseline. CodeAgent scores 37.6% on T5-Review data, but 42.7% on Trans-Review data versus GraphCodeBERT's 50.6%. Edit Progress is distance toward a reference, not a passing-test rate or proof of functional equivalence.

## Analyst Takeaways

1. **Separate claim validity from review relevance.** QA-Checker improves reported within-study scores, but checking question–answer alignment is not checking code behavior. Put executable and human-adjudicated checks after the conversation stage.
2. **Report denominators and discovery rules.** 449/483 is precision-like confirmation for *found* issues, not vulnerability recall over all 3,545 commits; the paper's stronger language about coverage should not be adopted as-is.
3. **Compare against a budget-matched simpler reviewer.** Multi-agent dialogue, ablation, and mixed task metrics show promise, but without matched model calls and wall-clock/token costs the practical incremental benefit is uncertain.
4. **Use complementary specialists, not one universal score.** CA and FA classifications, VA findings, and CR edits assess different quality dimensions; a good formatting F1 does not authorize merge.
5. **Audit reference-distance metrics with tests.** A patch can approach the reference while remaining invalid; converse valid implementations may be distant.

## Questions and Limitations

- The vulnerability ground truth is built by manually verifying system discoveries, making missed defects outside the union of findings unknown; no sensitivity estimate is established.
- Different task datasets and models obscure direct transfer to contemporary agent-generated, repository-scale PRs.
- The positive class for CA/FA is consistency, and class balance differs by merged/closed subset; high aggregate F1 may mask low sensitivity to actual inconsistencies.
- No production maintainer acceptance, downstream defect counts, operational token/latency budget, or human review replacement experiment is provided.
- The paper's appendix gives numerous extra analyses, but none turn QA-Checker into an externally independent correctness oracle.

## Vault Ideas Extracted

* [Staged Evidence-Grounded Judgment](/vault/staged-evidence-grounded-judgment.md)
* [Verification-Centric Generated-Review Evaluation](/vault/verification-centric-generated-review-evaluation.md)
