---
type: Synthesis
title: Repository Drift Garbage Collection
description: "A recurring, reviewable maintenance loop in which background agents scan recent changes against owned golden principles, update quality grades, and open small remediation PRs so that agents stop amplifying bad local patterns."
tags: [code-quality, coding-agents, agents, verification, self-improvement]
timestamp: 2026-09-24T03:56:19Z
---

# Repository Drift Garbage Collection

Coding agents learn from the repository in front of them. A small bad pattern (an ad-hoc utility, a hardcoded color, an illegal dependency direction) becomes a template that later changes copy. Repository drift garbage collection is a recurring, reviewable maintenance loop. It finds violations of lasting code-quality or architecture principles, proposes narrow remediation PRs, and keeps a visible quality/debt inventory up to date. It complements pre-merge checks rather than replacing them.

## Practical Use

1. **Write a small set of owned golden principles** that can be checked as directly as possible: permitted dependency directions, parsing at boundaries, preferred shared utilities, design-system tokens, logging and naming rules.
2. **Mechanize what you can.** Enforce invariants in structural tests or custom lints whose error messages explain the fix, because agents read those messages. Keep judgment-heavy principles as scoped review rules (see [Calibrated Code-Review Rules](/vault/calibrated-code-review-rules.md)).
3. **Maintain quality grades** or a debt register by domain and layer, and record the evidence and grader behind each change so the grade does not become self-referential.
4. **Schedule a background agent** to scan recent merges and graded gaps, then open small, scoped refactoring PRs. CI and human review confirm the intended invariant and the absence of functional regressions.
5. **Measure the trend** in repeated violations, review time, reverted cleanup changes and escaped defects, not the number of cleanup PRs.

OpenAI reports that before this loop its team spent about 20% of the week (every Friday) cleaning up "AI slop". Golden principles, background Codex tasks, domain quality grades and targeted PRs replaced that manual pass. Cognition runs a daily scan of the previous 24 hours' merged changes for hardcoded colors, spacing and off-library components, producing tickets and optional fix PRs. Both are vendor-reported processes, not controlled estimates of defect reduction.

## Why It Matters

Field studies show the drift is real. Agent PRs in one repository reused existing code less than human PRs, and static-analysis debt introduced by AI-attributed commits often survives to the latest revision (see [Repository-Relative Code Quality](/vault/repository-relative-code-quality.md)). Pre-merge review catches individual instances. Only a recurring loop removes the accumulated template that keeps regenerating them.

## Limitations

A principle can be wrong or too broad, and an automated refactor can change behavior. Quality grades become circular if the agent grades its own work without independent checks. Keep exceptions, versioning, ownership, rollback and human validation. A recurring task is not a reason to auto-merge in a higher-risk repository.

## Sources

- [Harness engineering: leveraging Codex in an agent-first world dossier](/dossiers/openai-harness-engineering-agent-first.md) — golden principles, background deviation scans, quality grades, and small cleanup PRs replacing a manual Friday cleanup.
- [How Cognition Uses Devin to Build Devin dossier](/dossiers/cognition-devin-builds-devin.md) — daily design-system audit of recently merged PRs with issue creation and optional fix PRs.
- [More Code, Less Reuse: Investigating Code Quality and Reviewer Sentiment towards AI-generated Pull Requests dossier](/dossiers/ai-pull-requests-semantic-redundancy.md) — agent PRs show higher similarity to existing functions in one repository, evidence that duplication is a drift risk.
- [Debt Behind the AI Boom: A Large-Scale Empirical Study of AI-Generated Code in the Wild dossier](/dossiers/ai-generated-code-technical-debt-wild.md) — introduced static-analysis debt frequently persists to HEAD.
