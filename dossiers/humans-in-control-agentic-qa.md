---
type: Study Note
title: "Humans in Control: A Methodological Framework for Quality Assurance in Agentic Software Engineering"
description: "Vision paper proposes human decisions at issue selection, refactoring strategy, plan, per-step changes, and final review, but reports an unfinished VS Code tool and a future user study rather than measured quality gains."
resource: https://repositorio.usp.br/directbitstream/958effe4-5d49-47e9-b0f9-ae01440740b0/3325197.pdf
source: /archive/humans-in-control-agentic-qa.pdf
tags: [agents, human-in-the-loop, coding-agents, code-quality, verification, governance]
timestamp: 2026-09-24T03:48:01Z
---

# Humans in Control: A Methodological Framework for Quality Assurance in Agentic Software Engineering — Study Notes

**Authors**: Matheus Silveira, Paulo Meirelles, Igor Steinmacher, and Fabio Kon  
**Venue**: SE4AS 2026, September 8, São Paulo, Brazil (CBSoft-associated workshop)  
**Source**: University of São Paulo repository; no own DOI printed in this PDF (DOIs in its references belong to other papers).

## What It Is

A four-page vision/methodology paper targeting **refactoring of static-analysis findings**, not general feature development or a demonstrated autonomous quality system. Its motivation is that large volumes of apparently functional agent-authored code can hide growing complexity, code smells, and loss of developer understanding. The proposal moves the human from passive end-stage reviewer to active chooser of the problem, approach, plan, and accepted edits.

## Proposed Workflow

1. **Planning:** an Analyzer turns code metrics and smell findings into an issue list; a human selects what to fix. An Explorer proposes alternative refactorings and architectural impacts; the human chooses a strategy. A Planner turns the choice into inspectable steps; the human can revise or approve the plan.
2. **Refactoring:** a Scheduler routes one approved step at a time to a Refactor Agent. Existing tests run through a separate tool. A Reviewer Agent compares changes with the plan and routes feedback; the developer inspects intermediate outputs, asks for changes, and reviews a final IDE diff with contextual comments.
3. **Implementation intent:** a VS Code extension provides one conversational front end and decouples agents from static-analysis/testing tools and locally hosted/cloud models. The initial implementation targets Python and uses language-specific analysis/test adapters.

This is a useful *decision-rights sketch*, not proof that an AI reviewer catches defects, that a passing suite preserves semantics, or that extra approvals lower cognitive burden. The paper states an initial extension is available publicly but describes evaluation as prospective.

## Evidence Status and Planned Evaluation

The authors propose a **future** controlled user study comparing a raw agentic workflow with their stepwise workflow across students, novices (under two years' industrial experience), and experienced developers (at least two years). Planned measures include Radon cyclomatic complexity and maintainability metrics, RefactorBench tasks/coverage, developer usability/workload/confidence on five-point scales, and acceptance/edit logs. **No sample size, completed comparison, numerical quality gain, or measured human workload result is reported.**

## Analyst Takeaways

1. **Borrow the gates, not the unproven outcome claim.** Select meaningful smells, compare options against architectural constraints, approve a bounded plan, and accept changes in inspectable steps.
2. **Test quality as well as behavior.** Existing tests guard some regressions; assess maintainability and whether a change solves the original issue without spreading complexity.
3. **Avoid AI checking itself in a closed circle.** The Reviewer Agent's plan comparison can aid orientation, but independently inspect diff, relevant behavior, and test adequacy before accepting the patch.

## Questions and Limitations

- The planned study has not happened in the paper. Whether repeated human interruptions beat a single well-designed review on actual code quality and workload is unknown.
- Static-analysis issue detection is incomplete and noisy; superficial improvement in complexity metrics can mask worse architecture or behavior.
- Human expertise, review fatigue, repeated rework, weak existing tests, and model-dependent Reviewer Agent judgments are unresolved boundary conditions.

## Vault Ideas Extracted

* [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md)
