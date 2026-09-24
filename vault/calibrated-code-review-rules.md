---
type: Synthesis
title: Calibrated Code-Review Rules
description: "Operating AI code review as a set of scoped, versioned rules that are evaluated contrastively before deployment, calibrated on correctness and actionability after deployment, and reported with explicit context coverage."
tags: [code-review, coding-agents, evaluation, verification, agents]
timestamp: 2026-09-24T03:56:19Z
---

# Calibrated Code-Review Rules

An automated reviewer earns its place through specific findings that are true and worth acting on, not through comment volume. Treat each repository review rule or guideline as a small, versioned product with an owner. Test it contrastively before it ships, calibrate it on real outcomes after it ships, and retire it when it stops paying for the attention it consumes. Generic "review everything" prompts hide which rule produced value and which produced noise.

## Before Deployment: Contrastive Rule Evaluation

A rule states a consequential local invariant, such as a wire-format compatibility contract, a privacy boundary or a data-layer dependency, that deterministic lint cannot conveniently enforce. Put repository-wide guidance at the root and service-specific guidance beside the relevant code. State the protected contract, the consequence of breaking it, and a safe alternative.

Evaluate every rule against three kinds of change: a **violating diff**, a **safe counterexample** that looks similar but is allowed, and an **unrelated diff**. Report required-finding recall, false-positive restraint, retention of ordinary bug-finding, and location/rule/actionability quality separately. OpenAI reports that rule-guided Codex review recovered 98% of required custom findings versus 58.3% without rules, *on its internal primary eval*. It published no negative-case or ordinary-bug scores, so the figure is targeted recall, not overall reviewer accuracy.

## After Deployment: Utility Calibration

1. Attach each finding to a precise changed location, the rule or antipattern, evidence, and a feasible remedy. Suppress unchanged-line noise unless the change introduces the concern.
2. Sample posted findings for independent human correctness and importance ratings, and keep the denominator. Voluntary thumbs-up/down feedback comes from a self-selected subset, not the population.
3. Measure later behavior, such as whether the flagged line changed, and audit a sample by hand. A subsequent edit is only a proxy: unrelated edits look like acceptance, and real fixes can happen elsewhere.
4. Segment by rule and language. Suppress stale or consistently low-value rules promptly, revise their examples before re-enabling them, and track escaped important findings, not only precision.

Industrial deployments show why the axes must stay separate. Google AutoCommenter's useful ratio covers only comments that received feedback; its ~40% fix rate is inferred from changed lines; and its A/B rollout found no significant change in review duration. ByteDance BitsAI-CR reports 75.0% online peak precision, and a 26.7% Go "Outdated Rate" that measures later edits to flagged lines, not confirmed fixes. Ericsson's pilot had 197/206 findings judged correct, but only 135 of those 197 were rated medium or high importance, and recall was never measured.

## Context Coverage Receipts

A reviewer that saw only the diff cannot vouch for consequences in callers, contracts or configuration. Give each review dimension a bounded, inspectable context package: changed lines, enclosing code, dependent callers, relevant tests and documents. Record what was *not* retrieved: excluded file classes, unavailable runners or tools, stale graph edges. Never present a context-limited pass as repository-wide assurance. GitHub Copilot's agentic context gathering depends on runner capabilities and excludes some file types. The Ericsson system routed code-graph context to four specialist reviewers, but no ablation isolated what the graph or the specialization contributed.

## Limitations

High precision can be bought by dropping severe but hard-to-detect issues. Human labels disagree, and line-edit proxies are not causal measures of defect correction. A cited rule is not proof that the diff violates it, and rules can encode outdated invariants. Estimate coverage by comparing against competent human reviewers and seeded or audited known defects. Keep tests, lint, required approvals and branch protection as hard checks around any AI reviewer.

## Sources

- [Custom Code Review rules for Codex dossier](/dossiers/openai-custom-code-review-rules.md) — scoped AGENTS.md review rules evaluated on violations and safe counterexamples; 98% versus 58.3% internal recall.
- [AI-Assisted Assessment of Coding Practices in Modern Code Review dossier](/dossiers/google-autocommenter-coding-practices.md) — per-rule thresholds, sparse-feedback bias, stale-guideline suppression, and a null review-time A/B result.
- [BitsAI-CR: Automated Code Review via LLM in Practice dossier](/dossiers/bytedance-bitsai-cr-code-review.md) — rule-scoped review with a second precision filter, 75.0% online precision, and an outdated-rate proxy.
- [Using Agentic AI for contextualized and multifaceted code review at Ericsson dossier](/dossiers/ericsson-contextual-multifaceted-code-review.md) — four context-fed specialist reviewers; correctness versus importance without recall.
- [About GitHub Copilot code review dossier](/dossiers/github-copilot-code-review-concepts.md) — context gathering depends on runner capabilities; some file classes are excluded.
- [AI in software engineering at Google: Progress and the path ahead dossier](/dossiers/google-ai-software-engineering-progress.md) — review-comment resolution usage as an opportunity-to-impact metric, not fix correctness.
