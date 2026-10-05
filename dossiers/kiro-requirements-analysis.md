---
type: Study Note
title: "Requirements analysis: catching requirement bugs before they become code"
description: Kiro describes a neuro-symbolic requirements review that turns divergent formalizations, contradictions, and coverage gaps into intent questions, while admitting that implicit domain models remain a major bottleneck.
resource: https://kiro.dev/blog/deep-spec-analysis/
source: /archive/kiro-requirements-analysis.html
tags: [requirements-engineering, verification, human-in-the-loop, coding-agents, reliability, agents]
timestamp: 2026-10-05T21:49:23Z
---

# Requirements Analysis: Catching Requirement Bugs Before They Become Code — Study Notes

**Authors**: Oyendrila Dobe, Jatin Arora, Stefan Zetzsche, Nadia Labai, and Rémi Delmas; Kiro Applied Science.  
**Published**: May 12, 2026.  
**Status**: First-party vendor design account, not a peer-reviewed evaluation of Kiro. The archived article is eligible because it explains mechanisms and admitted limits beyond product operation; product behavior below is dated to the publication.

## What It Is

A design for reviewing requirements **before design and implementation**, using LLM-assisted refinement and formalization followed by symbolic analysis. Rather than presenting developers with formal proofs, it converts findings into concrete questions about intended behavior. Its enduring subject is the boundary between checking a specification's logical properties and establishing that it captures a person's intent.

## Problem and Motivation

The article distinguishes four specification defects: the wrong level of detail, ambiguity, inconsistency, and incompleteness. A broad aspiration is not an observable contract; an implementation recipe prematurely fixes a solution; plausible sentences can demand incompatible outcomes; and uncovered inputs invite silent implementation decisions.

Faster generation compounds the cost of those decisions by creating more code than a human can review. The article's cited **20–40% pass@1 drops** and **60–90% semantically wrong syntactically valid code** are claims from a separate prompt-mutation study, not measurements of this product. Its underspecification argument also cites [What Prompts Don't Say](/dossiers/prompt-underspecification-what-prompts-dont-say.md), which measures fragile defaults rather than Kiro's effectiveness.

## Mechanism as an Idea

### Refine before formalizing

An LLM works backward from the desired success state to prerequisites, failure paths, and observable consequences. The target requirement states **what must be observable**, leaving the implementation open. Refinement can expose missing authorization, cancellation, nonexistence, or domain-specific failure cases; these additions are proposed intent, not facts recovered from a proof.

The worked deletion example transforms five initial acceptance criteria into **five retained or amended criteria plus three added paths**. It replaces conflicting deletion descriptions with visibility and audit-access outcomes. This is a demonstration, not a measured defect-detection rate.

### Use translation disagreement as an ambiguity signal

The formal model contains symbols for entities, state, events, inputs and outputs; implications encoding criteria; and background constraints encoding domain knowledge. Multiple LLM translations are clustered by **logical equivalence**, so cosmetic differences do not count as ambiguity while behaviorally divergent translations do.

Low semantic entropy selects a representative of the dominant interpretation; high entropy prompts abstention and reformulation; intermediate entropy triggers a semantic difference between the dominant readings, translated into a scenario-based clarification question. This distinguishes uncertainty in meaning from disagreement in wording. It does not make dominant consensus correct.

### Analyze the model, then expose its consequences

An SMT-based reasoning engine checks incompatible jointly activated rules, missing scenario coverage, and examples of behavior accepted or rejected by the model. Small contradictory rule sets identify the source of conflict. The article's order-processing example shows both an obvious backorder contradiction and a canceled-order contradiction requiring case splits over inventory availability.

Findings become bounded natural-language alternatives: retain the interpretation or revise the requirement. An LLM judge filters accepted/rejected scenarios for surprising consequences relative to the user story, reducing question overload. The user normally supplies the authority to choose; the article also permits an LLM critic to choose, which substitutes a model's preference rather than discovering the user's intent.

## Experiences and Admissions

The source provides **no quantitative Kiro detection precision, recall, translation accuracy, solver coverage, user effort, or downstream defect reduction**. Its evaluation comments are qualitative: individual explicitly stated criteria appear easier to refine and formalize than implicit domain knowledge.

The authors call domain knowledge the requirements' “dark matter”: orders cannot be canceled before submission, properties cannot have multiple active owners, and payments cannot be refunded twice. Without a faithful model of such constraints, logically valid counterexamples can describe impossible real-world states and produce spurious warnings. As of **May 12, 2026**, the described system samples background assertions from an LLM repeatedly and retains a frequency-supported subset. This is a heuristic for inferred premises, not independent validation of the domain.

Refinement cannot guarantee removal of ambiguity, consistency, or completeness. Formal analysis establishes properties of the translated model; it cannot decide which of several plausible meanings matches the original intent. The cited external requirements-engineering study reports weaker evidence for formalization and generation than for classification and entity extraction; the article does not provide an equivalent quantitative internal comparison.

## Analyst Takeaways

1. **Separate model validity from intent validity.** [Machine-Readable Agent Specifications](/vault/machine-readable-agent-specifications.md) can carry enforceable rules, but inference must not silently grant authority to new prerequisites or domain assumptions.
2. **A distinguishing scenario is a better clarification surface than an abstract ambiguity label.** Show what behavior changes under the competing interpretations, then ask the accountable owner; this extends [Clarification Need Decision](/vault/clarification-need-decision.md).
3. **Formal checking moves uncertainty to the translation boundary.** A sound solver can prove a false model consistent. Sampling and equivalence grouping reveal some uncertainty but cannot detect a shared confident mistranslation.
4. **Requirement review complements, not replaces, independent acceptance checks.** [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md) keeps user-approved behavior separate from implementation success. A consistent specification can still encode the wrong product.

## Questions and Limitations

- Does the scenario-filtering judge hide rare but consequential defects? No recall or filtering ablation is supplied.
- Binary alternatives reduce interaction burden but can anchor the user or omit a third intended interpretation.
- The description treats completeness as coverage of the modeled input/state space; it cannot establish that all real-world variables, temporal dependencies, or exception cases were modeled.
- The worked deletion analysis sometimes labels “remove the record” as a hard-delete contradiction, whereas elsewhere the article correctly treats that phrase as ambiguous. Conflict depends on the chosen interpretation, not the sentence alone.
- The entropy gating has no published calibration or threshold-performance results. Low disagreement is not proof of correctness; high disagreement can reflect translation weakness rather than genuine source ambiguity.
- Letting a critic answer a question creates an authority tradeoff: fewer interruptions, but more undisclosed model-selected intent unless those choices are explicitly reviewed.

## Vault Ideas Extracted

* [Disagreement-Selected Clarification](/vault/disagreement-selected-clarification.md)
* [Machine-Readable Agent Specifications](/vault/machine-readable-agent-specifications.md)
