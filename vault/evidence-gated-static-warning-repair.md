---
type: Synthesis
title: Evidence-Gated Static Warning Repair
description: "An agent loop that classifies each static-analysis warning before editing, admits only patches that build, remove the target warning without new ones, and pass tests, and keeps suppressions and test edits under human review."
tags: [code-quality, coding-agents, verification, human-in-the-loop, agents]
timestamp: 2026-09-24T03:56:19Z
---

# Evidence-Gated Static Warning Repair

A static-analysis warning is an allegation, not an order to rewrite code. A trustworthy repair loop first inspects the rule, the code, its callsites and the developer's intent, and classifies the warning as a likely true positive to fix or a false positive needing a narrowly justified suppression. It then provisionally admits only a patch that **builds**, **removes the target warning without adding new ones**, and **passes tests**. A separate reviewer decides whether intended behavior and test expectations are still sound. This is a concrete way for a factory to pay down static-analysis debt without letting an agent trade one warning for another.

## Practical Use

- Process one warning at a time against a fixed repository snapshot.
- Keep the original analyzer finding, the classifier's evidence and rationale, the candidate diff, before/after warning locations mapped across line shifts, build output and test results.
- Reject with diagnostics and bound the retries.
- Require owner approval for broad suppressions (e.g. line-wide `NOSONAR`). Check any edit to tests against the original requirement rather than letting the same agent rewrite an oracle until the patch passes.
- Track correct-fix rate, false suppressions, new warnings, developer acceptance and elapsed CI time separately from model cost.

## Evidence

On 1,000 SonarQube warnings from 106 Java projects, CodeCureAgent produced 968 automatically plausible patches under all gates. Its ablations show why every gate matters: dropping the tests admitted 9 more false patches, dropping analyzer re-checks plus tests admitted 123, and dropping the approval step admitted 249. Plausible is still not correct. Author inspection judged 251 of 291 complete fixes correct (86.3%), and multi-file plausibility was only 75.0%, so widen review as change scope grows.

## Limitations

An analyzer can be wrong or incomplete, a passing suite cannot prove equivalence, and a suppression can hide future defects. Classifier mistakes sit upstream of every edit gate, turning a real issue into a suppressed one. Analyzer matching and build workflows need local adaptation.

## Sources

- [CodeCureAgent: Automatic Classification and Repair of Static Analysis Warnings dossier](/dossiers/codecureagent-static-analysis-warning-repair.md) — warning classification, repair/suppression branches, independent gates, and ablation-quantified false admissions.
