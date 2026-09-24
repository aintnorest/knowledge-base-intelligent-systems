---
type: Study Note
title: "CodeCureAgent: Automatic Classification and Repair of Static Analysis Warnings"
description: "Agentic classification and multi-file repair of SonarQube warnings with independent build, analyzer, and test acceptance gates; plausible versus manually correct fixes separated."
resource: https://arxiv.org/abs/2509.11787v5
source: /archive/codecureagent-static-analysis-warning-repair.pdf
tags: [code-quality, agents, coding-agents, verification, reliability, human-in-the-loop]
timestamp: 2026-09-24T03:44:20Z
---

# CodeCureAgent: Automatic Classification and Repair of Static Analysis Warnings — Study Notes

**Authors**: Pascal Joos, Islem Bouzenia, and Michael Pradel  
**Affiliation**: CISPA Helmholtz Center for Information Security  
**Venue**: arXiv:2509.11787v5 [cs.SE]  
**Date**: April 13, 2026

## What It Is

CodeCureAgent processes one static-analysis warning at a time. A classification agent inspects rule documentation, code, definitions, and references to decide whether the warning is a true positive requiring repair or a false positive suitable for suppression. A separate repair agent edits code—including multiple files when necessary—then an independent change approver gates the patch on **build success, disappearance of the target warning without new warnings, and a passing test suite**. Rejected patches return focused error feedback for another attempt. This is not an unconditional auto-fix: the same green build can coexist with a still-present or newly introduced warning.

The source motivates that distinction with warnings where following a static rule blindly would break intended behavior. The classifier asks whether the rule applies, a violation is intentional, and a fix preserves functionality. A true positive can require changing callsites and tests; a false-positive classification instead produces SonarQube suppression, generally a line-level `//NOSONAR` annotation. The latter suppresses *all* warnings on that line and can hide a true warning if the classification is wrong; treat it as a human-review decision in a production quality gate.

## The Repair and Acceptance Loop

1. SonarQube emits rule key, path, line, message, rule type, and repository snapshot. Agents fetch the precise rule and just enough surrounding code before deciding.
2. The classifier issues a TP/FP verdict with rationale; the repairer has a different toolset for fixing or suppressing, and a plan it can revise after failures. A proposed patch is applied in a temporary candidate workspace.
3. The approver builds; if successful, it reruns static analysis and maps warning locations across edited lines to detect a surviving target or newly introduced warnings; only then are tests run. Any failed gate rejects the candidate and returns diagnostics for another bounded iteration.
4. Only a fully accepted patch is reported as *plausible*. That term means passing the chosen gates, not proven semantics; in one example the repairer changes an existing Windows-specific test after `\n` becomes portable `%n`, which deserves independent review of whether the changed expectation is legitimate.

The evaluation samples **1,000 warnings from 106 Java projects**, spanning **291 SonarQube rules**. The source pool contains 95,083 warnings in 132 buildable projects; one warning per rule is sampled first, then another 709 to reflect prevalence. GPT-4.1 mini powers the agent. These choices give unusually broad rule coverage but one language/analyzer and a selected buildable-project population.

## Results: Plausible Is Not Correct

- **968/1,000 (96.8%)** patches pass the build/analyzer/test gates: 665/696 (95.6%) of agent-classified true positives and 303/304 (99.7%) of agent-classified false positives.
- In a manually inspected, one-per-rule subset of **291**, 267 classifications are correct (91.8%); 251 complete fixes are correct (**86.3%** of inspected cases). Eight patches accepted by the automated gates are judged incorrect. The single human assessor is an author, with discussions of ambiguous cases among the authors.
- Plausibility declines with edit scope: 99.4% for single-line patches, 95.5% for multi-line, **75.0%** for multi-file; only 36/1,000 edits are multi-file.
- CORE and iSMELL achieve **67.6%** and **62.8%** plausible rates on this full set; the rule-limited Sorald baseline fixes only **4.3%** overall. Comparing broad coverage against a narrowly supported ruleset needs care.
- Ablating validation matters: full approval admits 968 plausible fixes; without tests it produces **9 false accepts** relative to the full gate; without analyzer and tests, **123**; without any approval, **249**. These are fixes accepted by an ablated process that fail full approval, not a direct count of all semantically wrong changes.
- Mean wall time is **4.4 minutes/warning** (median 2.8); mean billed LLM cost is **$0.029/warning** with 139k input-plus-output tokens, mostly cached. Build, analyzer, and tests consume 41.1% of elapsed time, so model price is not total cost.

## Analyst Takeaways

1. **Treat analyzer findings as hypotheses, not automatic edit commands.** Examine rule context and developer intent before making a code change; a false-negative classification can silently suppress a real bug.
2. **Put independent gates after each proposal, in cheap-to-expensive order.** Compile, re-run the analyzer with warning-diff mapping, then test. Keep the original findings, candidate patch, and diagnostic evidence for review and rollback.
3. **Use human approval for suppression and substantial edits.** The demonstrated 86.3% human-assessed correctness, 19 mistaken FP classifications among 291 inspected cases, and lower multi-file pass rate do not warrant auto-merging code-quality edits.
4. **Do not let a patched test substitute for a verified requirement.** A test may be wrong, but a code-writing agent can also rewrite it to make an incorrect patch green. Review test modifications against intended behavior separately.
5. **Optimize the quality frontier, not only cents per model call.** The average $0.029 API bill excludes minutes of project builds/tests and human review; measure correct accepted fixes, false suppressions, and regressions per warning class.

## Questions and Limitations

- Build, analyzer, and existing tests cannot establish semantic equivalence or detect every newly introduced bug. Manual correctness labels on 291 warnings make the gap visible but rely primarily on one author.
- The process favors a line-level suppression that can hide unrelated current and future warnings; accepting suppression should require a documented justification and owner in a deployment workflow.
- Dataset covers SonarQube/Java projects that already build and have passing tests; findings may not transfer to Python, other analyzers, flaky suites, or highly concurrent development.
- The evaluation is technical rather than a trial of developer acceptance. GPT-4.1-mini-specific pricing, cache discounts, and rule mix condition the apparent economics.
- The repairer cannot create, rename, or delete files. Many failures stem from malformed edits it cannot repair within its cycle budget, so edit representation remains a substantive failure mode.

## Vault Ideas Extracted

* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md)
* [Evidence-Gated Static Warning Repair](/vault/evidence-gated-static-warning-repair.md)
