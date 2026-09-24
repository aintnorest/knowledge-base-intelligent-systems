---
type: Synthesis
title: Repository-Relative Code Quality
description: "Judging an agent-authored change against the repository before and after it (reuse, introduced and fixed findings, review cost, and post-merge survival) rather than by whether it compiles or passes its own tests."
tags: [code-quality, coding-agents, evaluation, agents, human-in-the-loop]
timestamp: 2026-09-24T03:56:19Z
---

# Repository-Relative Code Quality

A locally correct change can still duplicate an existing function, widen scope, add security or correctness warnings, or be hard to maintain. Judge an agent patch against the repository *before and after* the change and against the user's intent, not merely by whether it compiles or resembles a reference patch. The main evidence dimensions are:

- **reuse**: did the change use existing abstractions or create near-duplicates?
- **scope**: requirements met, and side effects outside them
- **static findings**: newly introduced *and* newly fixed warnings, by severity
- **review cost**: size, reviewability and human effort
- **survival**: later repair, revert or churn at a fixed horizon

These measure different things. Embedding similarity is a clone-triage signal, a static warning is not a vulnerability, and a revert is not a complete quality verdict.

## Practical Use

Before merge, search for existing equivalent behavior and check that a new abstraction belongs at its proposed layer. Compare the diff against targeted tests and independent scans, record changed-line provenance and problem size, and send high-consequence or large changes through accountable human review. After merge, inspect surviving warnings and relevant reverts at a fixed horizon, keeping the denominator, language, task mix and tool/model version. Track human correction effort and whether corrections improve later attempts. Do not treat comment sentiment, line count or a single tool score as quality.

## Evidence

- In 617 crewAI PRs, agent-authored functions had a mean maximum embedding similarity to existing functions of 0.2867, versus 0.1532 for humans. This is one repository and an unvalidated clone proxy, with no demonstrated rise in maintenance defects.
- Static scans of about 302,600 AI-attributed commits across 6,299 repositories distinguish introduced from fixed warnings. 105,364 of 464,900 trackable findings remain at HEAD, though some of the paper's denominators conflict.
- A 37,623-PR study of five agent products finds heterogeneous vendor-level signals and no agent group with higher size-normalized 90-day churn than human PRs. There is no universal "AI-quality penalty"; outcomes depend on the tool and task mix.
- SWE-chat's opt-in sessions separate committed-line efficiency (44.3%) from net-output survival (50.3%) and show frequent user correction.

## Limitations

Field comparisons are observational. Public-repository selection, attribution method, vendor and task mix, partial language coverage and changing models all block causal tool rankings. High embedding similarity is not proof of redundant behavior, and an LLM judge that treats one gold patch as optimal can mislabel valid alternatives. Post-merge churn may be legitimate feature work, and a silent rewrite escapes a revert proxy. Use these signals as review queues with human and executable adjudication, not as automatic rejection criteria.

## Sources

- [More Code, Less Reuse: Investigating Code Quality and Reviewer Sentiment towards AI-generated Pull Requests dossier](/dossiers/ai-pull-requests-semantic-redundancy.md) — higher agent similarity to existing functions in one repository, alongside favorable reviewer sentiment.
- [Debt Behind the AI Boom: A Large-Scale Empirical Study of AI-Generated Code in the Wild dossier](/dossiers/ai-generated-code-technical-debt-wild.md) — introduced, fixed and surviving static findings across ~302,600 AI-attributed commits.
- [Not All Agents Are Equal: Code Quality and Post-Merge Maintenance Across Five Autonomous Coding Agents in the Wild dossier](/dossiers/coding-agents-post-merge-maintenance.md) — 37,623 PRs across five agents; vendor-specific rather than universal post-merge differences.
- [SWE-chat: Coding Agent Interactions From Real Users in the Wild dossier](/dossiers/swe-chat-real-user-coding-agent-interactions.md) — committed-line efficiency, code survival and user-correction measures from real sessions.
- [Position: Humans are Missing from AI Coding Agent Research dossier](/dossiers/humans-missing-ai-coding-agent-research.md) — argues for human-centered measures of alignment, steerability and verification burden.
