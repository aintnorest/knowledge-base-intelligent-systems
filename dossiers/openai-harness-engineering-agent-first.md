---
type: Study Note
title: "Harness engineering: leveraging Codex in an agent-first world"
description: OpenAI's account of a Codex-authored internal product, with repository-native context, executable architecture rules, worktree-level observability, agent review, quality grades, and recurring drift cleanup.
resource: https://openai.com/index/harness-engineering/
source: /archive/openai-harness-engineering-agent-first.html
tags: [agents, coding-agents, code-quality, agent-harness, context-engineering, self-improvement]
timestamp: 2026-09-24T03:45:40Z
---

# Harness engineering: leveraging Codex in an agent-first world — Study Notes

**Author**: Ryan Lopopolo  
**Publisher**: OpenAI  
**Date**: February 11, 2026

## What It Is

OpenAI recounts a five-month experiment building an internally used, externally alpha-tested product with **zero lines of manually written code**: humans specify intent, steer priorities, review outcomes, and improve the system, while Codex writes code, tests, CI, documentation, tools, and dashboards. The authors estimate the work took **about one-tenth** the time manual implementation would have required. This is a first-party counterfactual estimate, not a randomized time study.

From a late-August 2025 empty repository, the team reports **on the order of a million lines**, **roughly 1,500 merged PRs**, initially **three engineers** driving Codex, an average **3.5 PRs per engineer per day**, and later **seven engineers** with rising throughput. The product reportedly has **hundreds of internal users** including daily power users. PR and line counts establish scale, not user value or code health.

## Humans Engineer the Environment

The constraint “no manually-written code” forced the team to ask what capabilities the agent lacked rather than patch its failures by hand. Human engineers decompose goals, formulate acceptance criteria, prioritize work, validate outcomes, and ask Codex to build the missing tool, documentation, or guardrail. Codex reviews its own changes locally, requests targeted local and cloud agent reviews, handles human or agent feedback, and iterates until reviewers are satisfied. Human PR review is possible but not required in this team's reported merge practice—unlike Stripe's explicitly human-reviewed minions.

For UI verification, each git worktree can boot its own app instance; the harness exposes Chrome DevTools Protocol, DOM snapshots, screenshots, navigation, and testing skills. Each worktree also gets an ephemeral local observability stack with logs, metrics, and traces: agents can query **LogQL** and **PromQL**. The article gives illustrative targets such as startup under **800 ms** and no span over **two seconds** in four journeys; those are example prompts, not measured system-wide achievements. Single runs reportedly last **upwards of six hours**.

## Repository Knowledge as a Versioned Control Surface

A giant `AGENTS.md` proved costly, ambiguous, stale, and hard to verify. The replacement is a roughly **100-line** `AGENTS.md` acting as a table of contents to versioned `docs/` material: architecture, core beliefs, product specifications, reference files, design documents, executable plans, decision histories, and technical debt. The principle is “give Codex a map, not a 1,000-page instruction manual.” Agents retrieve the relevant detail rather than receiving every rule upfront.

Dedicated linters and CI validate document structure, links, and freshness. A recurring **doc-gardening agent** checks documentation against actual code behavior and proposes correction PRs. Repository-local information is an important visibility boundary: a decision left only in chat or a person's head is effectively unavailable to an autonomous agent. The team favors inspectable, stable dependencies and occasionally implements a small utility rather than accepting opaque library behavior.

## Enforcing Architecture and Taste

Instead of prescriptive implementation instructions, OpenAI enforces invariants at boundaries. Domains follow a validated dependency layering, **Types → Config → Repo → Service → Runtime → UI**, with cross-cutting concerns entering through **Providers**. Custom linters and structural tests restrict dependency edges and enforce structured logging, schema/type naming, file-size limits, and platform reliability rules. Diagnostic lint messages include repair instructions useful to the agent. Data shapes must be parsed at boundaries, but the team does not mandate a specific validation library.

This is not simply documentation-as-policy: the code and CI express enforceable constraints. A reviewer comment or incident can become an updated repository rule or executable check. Within these boundaries, agents retain freedom and need not match a human's stylistic preferences. The team also reports minimal blocking merge gates, short-lived PRs, and fixing some flaky tests in follow-up runs—a risk choice inseparable from their throughput and rollback context.

## Golden Principles and Background Drift Cleanup

Agents reproduce patterns present in a repository, including bad ones. The team formerly spent **every Friday (20% of the week)** manually removing “AI slop.” They now store **golden principles** as opinionated mechanical rules; examples include preferring shared utility packages over one-off helpers and avoiding “YOLO-style” data probing by validating external boundaries or using typed SDKs. A regularly scheduled set of background Codex tasks scans for deviations, **updates quality grades** for product domains and architectural layers, and opens small targeted refactoring PRs. OpenAI says most can be reviewed in **under a minute** and automerged. These grades are a debt-management signal, not published independent quality scores.

The article likens this to garbage collection: detect drift before repetition makes it the dominant local pattern, encode human taste once, and correct it continuously. The cadence and PR shape are concrete; the avoided defect count or quantitative improvement from this loop is not supplied.

## What Is Claimed Versus Measured

**Reported operational figures**: five months, approximately one million lines, roughly 1,500 PRs, three then seven engineers, 3.5 PRs/engineer/day, hundreds of internal users, 100-line index, six-hour runs, previous Friday cleanup, and sub-minute review of many cleanup PRs. These are internal observations without public denominator or independent audit.

**Counterfactual or unquantified claims**: 10× development speed against writing by hand, improved architectural coherence through lints, cheaper corrections than blocking, and sustained code health through golden principles. No controlled manual-code comparison, escaped-defect rate, customer outcome series, long-term maintenance measure, or isolation of a specific harness feature is presented. The author explicitly says multi-year architectural coherence remains unknown.

## Analyst Takeaways

1. **Encode architecture as executable, agent-readable invariants.** A short top-level map plus retrievable, versioned documents and structural checks gives more leverage than a giant instruction prompt; lint errors should explain repairs.
2. **Make behavior observable to the coding agent.** Per-worktree browser and telemetry access lets a run exercise actual UI and service behavior rather than infer correctness from tests or prose alone.
3. **Treat drift as a recurrent maintenance stream.** Golden principles, domain quality grades, and small background cleanup PRs turn repeated reviewer taste into visible, reviewable corrections—not proof of automatic correctness.
4. **Keep acceptance risk explicit.** This team's minimal merge gates and optional human review are local operational choices, not a recommendation to skip approvals in a light factory with different blast radius.
5. **Demand quality measures alongside throughput.** Lines and PRs are supply-side metrics; pair them with user outcomes, escaped defects, rollback rates, review effort, and maintenance cost before claiming net productivity.

## Questions and Limitations

- How are domain quality grades calibrated, updated, and checked against independent regressions?
- What prevents a background cleanup agent from changing a correct but unfamiliar local convention or silently creating new drift?
- How often do six-hour runs finish with passing direct behavioral verification, and how often do human interventions occur?
- Follow-up fixes to test flakes may be reasonable here, but the article does not quantify merge risk or provide a general safety argument.
- The greenfield, internally launched setting with a custom harness and ample agent access may not transfer to a mature regulated monorepo; even the author cautions that autonomy depends on this repository's specific structure.

## Vault Ideas Extracted

* [File-Native Context Retrieval](/vault/file-native-context-retrieval.md)
* [Machine-Readable Agent Specifications](/vault/machine-readable-agent-specifications.md)
* [Repository Drift Garbage Collection](/vault/repository-drift-garbage-collection.md)
