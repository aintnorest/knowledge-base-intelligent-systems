---
type: Study Note
title: Designing, Refining, and Maintaining Agent Skills at Perplexity
description: Personal study notes on Perplexity's practice for designing agent Skills as progressively loaded context, evaluating their routing, and maintaining them through failure-driven gotchas.
resource: https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity
source: https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity
tags: [agent-skills, context-engineering, evaluation, agents]
timestamp: 2026-07-13T16:07:36Z
---

# Designing, Refining, and Maintaining Agent Skills at Perplexity - Study Notes

**Publisher**: Perplexity Research  
**Date**: May 1, 2026  
**Format**: Engineering guide describing Perplexity's internal practices for Agent Skills

## What It Is

Perplexity frames an Agent Skill not as ordinary software or a one-file prompt, but as a modular package of context and execution aids for an agent. A Skill may contain a root `SKILL.md`, deterministic scripts, conditionally read references, reusable assets, and first-run configuration. The aim is to provide knowledge or judgment that changes agent behavior reliably where the model's default behavior is insufficient.

The central design claim is that Skills must be optimized for routing, context cost, and known failure modes—not written like human documentation. A useful Skill can include complex domain content, but it must reveal that content progressively so that the default session does not pay for it.

## The Four Properties of a Skill

1. **Directory** — The Skill is a hub-and-spoke folder. The root file gives focused guidance; scripts, references, assets, and nested topic folders carry deterministic logic or heavy conditional material. Perplexity reports that giving a model all 1,945 sections of the U.S. Internal Revenue Code at once performed worse than no Skill, while curated multilevel organization made the tax capability viable.
2. **Format** — The root file has a lowercase, hyphenated name matching its directory and a description. The description is a routing instruction for the model, not documentation for an engineer. Dependencies and runtime metadata can be held in frontmatter or auxiliary configuration.
3. **Invocable** — The runtime loads a Skill when needed, copies its directory into an isolated environment, recursively loads declared dependencies, and exposes the relevant instructions and files. Implementations can differ in whether they reveal the full file tree.
4. **Progressive** — Perplexity distinguishes a small always-on Skill index, the loaded `SKILL.md` body, and runtime reads of accessory material. Its reported budgets are roughly 100 tokens per indexed Skill, ideally no more than 5,000 tokens for a loaded root body, and an unbounded but on-demand runtime tier.

## Deciding Whether a Skill Is Worth Its Tax

The recommended test starts with a baseline agent and representative “hero” queries. A Skill is justified when special context is needed to prevent a recurrent error, enforce consistency, capture durable but untrained knowledge, encode organization-specific workflows, or convey a domain expert's judgment.

The guide argues against Skills that merely restate system-prompt guidance, document commonplace command sequences, or describe fast-changing remote tools. Those create drift or consume context without changing behavior. The useful sentence-level test is: would the agent make a meaningful mistake without this instruction? If not, the instruction is a cost without a corresponding benefit.

## How Perplexity Builds Skills

1. **Write evaluations first.** Seed cases from production requests, known failures, and neighboring domains that must *not* activate the Skill. Routing tests need both positive and negative examples; forbidden loads can be more informative than ordinary successes.
2. **Treat the description as the hard part.** It should describe the user's expressed intent—often beginning with “Load when...” —rather than summarize the workflow. Perplexity targets 50 words or fewer, uses real user phrasing, and tests descriptions for unintended effects on neighboring Skills.
3. **Write only high-signal guidance.** Omit obvious procedures a capable model already knows. Prefer concise intent and exception handling over brittle command-by-command rails. Explicit gotchas and negative examples are especially valuable because they capture what the agent actually gets wrong.
4. **Move branching material out of the root.** Put logic the model would otherwise reconstruct in `scripts/`; put large, conditional documentation in `references/`; put fill-in templates and schemas in `assets/`; use configuration for one-time setup. Hierarchy reduces a large, ambiguous selection problem into smaller routing decisions, but it also requires navigation aids and careful curation.
5. **Iterate before shipping.** The guide recommends many small, evaluated revisions on a branch, then shipping one coherent change set with its evaluation evidence.

## Maintenance: the Gotchas Flywheel

The proposed maintenance model is append-mostly. Each observed failure becomes a precise addition to a gotchas section. Off-target loads lead to a tightened description and new negative routing cases; missed loads lead to keywords and positive cases; system-prompt changes trigger a contention and duplication review.

Changing the description after release is a significant routing change, not a casual text edit, and should be supported by evaluations. Perplexity describes suites for loading precision/recall/forbidden cases, progressive file-read behavior, end-to-end task completion scored with a rubric, and model-family variation. This matters because a new Skill can degrade another without modifying it: shared routing and shared context create action at a distance.

## My Takeaways

1. **A Skill description is a classifier boundary.** It should be evaluated like an interface that determines whether specialized context enters the run. A polished summary of the Skill's contents is often a poor trigger.
2. **Progressive disclosure is an information-architecture problem.** A large Skill is not automatically harmful, but loading all of it at once can be. The root should make the next retrieval or file-read decision easy.
3. **Failures are the highest-value source material.** A compact, evidence-backed gotcha can add more value than expanding generic best practices. Maintenance should retain the case that motivated each rule.
4. **Skill inventory is a portfolio, not a collection of independent files.** Every indexed description occupies always-on context and can compete with the routing of related Skills, so addition and modification need regression tests.

## Questions and Limitations

- The article is an engineering-practice guide, not a controlled study. Its quoted token budgets and tax-law example are operational observations from Perplexity's Computer system, not universal thresholds.
- The recommended “Load when...” formulation assumes a runtime that exposes descriptions for model-driven selection. Other systems may use classifiers, rules, embeddings, or tool schemas and need different routing tests.
- Evals can establish that a Skill loads and its files are read, but they can still miss long-tail interactions, context-window effects, and production distribution shifts.
- An append-mostly gotcha list can become noisy or contradictory. It needs periodic consolidation and removal of rules that no longer correspond to observed failure modes.

## Vault Ideas Extracted

* [Evaluated Skill Routing](/vault/evaluated-skill-routing.md)
* [Progressive Skill Disclosure](/vault/progressive-skill-disclosure.md)
