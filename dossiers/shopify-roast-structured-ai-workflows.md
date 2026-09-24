---
type: Study Note
title: "Introducing Roast: Structured AI workflows made easy"
description: Shopify's first-party account of Roast, a Ruby CLI for YAML-and-prompt workflows that interleave deterministic steps with AI and coding-agent work on tests, typing, monitoring, and code-history research.
resource: https://shopify.engineering/introducing-roast
source: /archive/shopify-roast-structured-ai-workflows.html
tags: [agents, orchestration, coding-agents, verification, agent-harness, enterprise]
timestamp: 2026-09-24T03:45:40Z
---

# Introducing Roast: Structured AI workflows made easy — Study Notes

**Publisher**: Shopify Engineering, Augmented Engineering Developer Experience team  
**Date**: June 18, 2025

## What It Is—and Is Not

**Roast** is an open-source Ruby CLI framework for structured AI workflows: define steps in YAML and prompts in Markdown, interleave normal code and LLM calls, and run a repeatable process over developer-productivity work. It arose from work on flaky tests, test coverage, and unit-test grading in a codebase with millions of lines. Shopify says free-roaming agents were unreliable and breaking work into discrete steps improved focus.

**Roast is not a per-PR code-review bot.** The name comes from its initial *test-roasting* use case—grading test files and identifying improvements. The article also discusses typing, periodic monitoring, intelligence aggregation, and explaining historical code decisions. None of that establishes automatic review on every pull request or a measured per-PR defect-detection service.

## Workflow Mechanics

A `workflow.yml` points to directory steps with `prompt.md` files. Prompt content may use ERB to incorporate workflow context. Other step forms include shell commands in `$()` with captured output; inline model prompts; inline prompts prefixed with `^` to invoke a built-in **CodingAgent** powered by Claude Code; custom Ruby `BaseStep` classes; and nested-array parallel steps. Iteration, conditions, and case branches control flow. Steps share their conversation transcript so later prompts can use earlier findings, which saves author wiring but may also propagate a mistaken intermediate conclusion.

Tools include numbered file reads, restricted file writing, diff/patch updates, regex search, glob search, controlled command execution, Bash, and CodingAgent. The agent handles adaptive parts—exploration, code changes, test generation, repair—inside a deterministic workflow shell. Raix supplies provider abstraction, retry behavior, response caching, structured output, authentication and usage controls. Every execution can be saved and **resumed from a chosen step**, avoiding an expensive full rerun while debugging a workflow.

The most actionable principle is voiced by a contributor: “I can handwave a step I don't quite know how to do yet with an AI approximation that mostly works. As I understand the problem space better, it's very easy to drop the AI step for a deterministic one that always works.” An uncertain step can initially be agentic and later become a dependable executable operation, rather than accumulating model calls indefinitely.

## Concrete Internal Use Cases

- **Test quality at scale**: Shopify says engineers analyzed **thousands of test files**, finding and fixing common antipatterns and increasing coverage. It offers no before/after test-quality or coverage series.
- **Boba typing workflow**: deterministic cleanup via `sed`, change test-file strictness, apply Sorbet autocorrect, then give residual typing errors to CodingAgent for iterative code changes and tests. One described file became fully typed while tests and type checks passed; this is an illustrative case, not an aggregate pass rate.
- **Periodic SRE monitoring**: scan internal Slack channels for early incident indicators and alert teams. The article does not quantify predictive accuracy.
- **Code-history research**: a “Chesterton's Fence” workflow inspects commits and related PRs to explain why surprising code exists before an engineer deletes it. This is contextual explanation, not a proof that every historical rationale is sound.
- **Competitive research**: aggregate external news and CRM/API signals into a report, outside the coding-review use case.

Shopify reports **a dozen engineers** had contributed features and workflows on GitHub by publication. Ruby implementation does not restrict workflows to Ruby projects; the CLI may act on other languages. Getting started requires Ruby **3.0+** and an OpenAI API key or an alternative provider through OpenRouter according to the article.

## What Is Claimed Versus Measured

**Reported scale/configuration**: thousands of analyzed test files, roughly a dozen GitHub contributors, supported workflow step types, and a concrete single-file Boba example. The number of files analyzed is not itself a quality outcome.

**Unmeasured assertions**: decomposed workflows are more reliable, coverage increased significantly, Boba saves work, and replay speeds iteration. The post has no controlled baseline, cost breakdown, false-positive rate for test grading or SRE alerts, or independently measured improvement. It is a vendor's engineering account and invitation to try its framework.

## Analyst Takeaways

1. **Implement a workflow where the step sequence is already known.** Leave exploratory repair to an agent, but make file setup, deterministic transformation, type checking, and result capture explicit executable stages.
2. **Promote stable agent work to deterministic code.** Once repeated behavior is understood and testable, replacing a prompt with a script reduces output variance and cost; keep a reviewer for ambiguous steps.
3. **Preserve replayable intermediate state.** Resuming from a step helps debug costly flows, but inputs and side effects must be versioned or a replay can silently run under changed conditions.
4. **Verify the claimed task, not just the transcript.** A test-quality report must be checked against behavior and coverage; a typing migration must pass Sorbet and tests; a historical explanation must cite commits.
5. **Do not relabel Roast as per-PR review.** It can host a code-quality workflow, but the source does not claim an installed PR-triggered reviewer or provide its accuracy.

## Questions and Limitations

- How are shell commands and shared transcripts scoped so a prompt or untrusted source cannot induce unsafe execution?
- What were coverage, maintenance cost, and failing-test outcomes before and after the test workflows?
- Do resumed sessions preserve exact prompt, model, tool, repository, and data versions?
- Does a workflow's growing shared transcript eventually crowd out relevant context?
- The article provides illustrative internal examples rather than a benchmark or controlled comparison against free-form agents.

## Vault Ideas Extracted

* [Bounded Hybrid Coding Workflow](/vault/bounded-hybrid-coding-workflow.md)
