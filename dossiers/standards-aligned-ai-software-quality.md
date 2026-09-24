---
type: Study Note
title: "A Blueprint for AI-Driven Software Quality: Integrating LLMs with Established Standards"
description: "Patil's standards-oriented SQA survey maps LLM interventions to lifecycle, product, structural, and process-quality frameworks, while exposing evidence and governance gaps."
resource: https://arxiv.org/abs/2505.13766v5
source: /archive/standards-aligned-ai-software-quality.pdf
tags: [code-quality, survey, verification, governance, evaluation, human-in-the-loop]
timestamp: 2026-09-24T03:45:44Z
---

# A Blueprint for AI-Driven Software Quality: Integrating LLMs with Established Standards — Study Notes

**Author**: Avinash Patil  
**Venue**: arXiv:2505.13766v5 [cs.SE]  
**Revision**: April 28, 2026  
**Length**: 16 PDF pages

## What It Is

A standards-to-practice map for AI-assisted software quality assurance (SQA), not an automated certification mechanism. It positions LLMs as candidate assistants for requirement checks, code review, tests, documentation, defect analysis, and compliance triage; applicable standards define what the team must measure and who retains accountability. The paper surveys academic and practitioner material and proposes an adoption decision matrix and governance workflow. It does not implement or quantitatively validate a new tool.

## Map the Quality Question to Its Authority

| Framework in the paper | What it governs | Appropriate LLM-assisted evidence |
|---|---|---|
| ISO/IEC/IEEE 12207 | Software lifecycle activities, roles, deliverables, verification and validation | Trace requirements, decisions, reviews, tests, and changes to lifecycle artifacts. |
| ISO/IEC 25010 | Product-quality characteristics such as functional suitability, reliability, security, maintainability, performance, and compatibility | Classify proposed checks by quality attribute rather than call all test passing “quality.” |
| ISO/IEC 5055 | Structural/code-level quality weaknesses | Use static rules plus contextual investigation, but validate findings and fixes independently. |
| ISO 9001 / ISO/IEC 90003 | Quality-management process and software-specific guidance | Log decisions, overrides, corrective action, and process ownership. |
| CMMI / TMM | Organizational and testing-process maturity | Assess monitoring, control, feedback and capability development; automation alone is not maturity. |

The decision matrix proposes low relative risk for requirement ambiguity detection, test generation, maintainability suggestions, and documentation; medium for code reliability, security, performance, compliance, process analytics, and continuous improvement. These are the author's planning categories, **not** ISO-prescribed risk levels or a finding that generated tests are inherently low risk. Test expectations and release authority should instead be risk-scoped by product and consequence.

## Proposed Adoption Blueprint

The paper advises selecting a bounded quality objective and applicable standard; choosing an LLM use case; integrating with existing artifacts such as issue trackers, repositories, and CI; adding traces and human approval for critical actions; setting outcome metrics (defect yield, coverage improvement, review effort, false positives/negatives, compliance adherence); then piloting against a baseline before wider use. Privacy and code leakage, model bias, opaque reasoning, infrastructure cost, regulatory constraints, and auditability are identified as adoption hazards.

The survey says it analyzes **over 223 papers** from 2023–2025, then reports **31** papers in 2023, **91** in 2024, and **127** in 2025; those annual counts sum to **249**, not 223. The paper does not reconcile the denominator, and it supplies no reproducible study-by-study effect size for standards alignment. These counts characterize its stated review, not verified evidence that a particular intervention improves product quality.

## Analyst Takeaways

1. **Name the standard and version at the decision boundary.** An AI-produced “compliant” label is a review suggestion; acceptance requires the authoritative clause, applicable scope, evidence, and a responsible human.
2. **Choose an observable quality attribute per intervention.** Static warnings, defect-sensitive tests, nonfunctional performance, and process adherence require different measurements.
3. **Keep generative recommendations separate from release gates.** Reviewers should see the original requirement/standard, changed artifact, independent validation, override, and final sign-off.
4. **Pilot one quality objective with a baseline.** Judge defect detection, false positives, reviewer effort, escaped failures, and cost, not the number of AI-generated tests or comments.
5. **Audit the review itself before using prevalence claims.** The paper's denominator inconsistency and breadth mean it is more reliable as a taxonomy of questions than as a quantitative synthesis.

## Questions and Limitations

- The survey gives inclusion criteria but not a fully reproducible search/screening ledger or reconciled count; secondary prevalence numbers should not be quoted as precise.
- Its selected ISO/IEC 25010 description follows a cited 2011 model; teams must verify which edition and actual normative text applies rather than infer compliance from this preprint.
- The framework maps LLM capabilities to standards but does not show that those outputs satisfy an auditor or improve incident rates in controlled deployment.
- “Low risk” test generation may become high consequence when flawed generated assertions are admitted automatically to a release gate.
- Several speculative recommendations (continual learning, federated training, multimodal QA) are future directions, not demonstrated operating practices.

## Vault Ideas Extracted

* [Machine-Readable Agent Specifications](/vault/machine-readable-agent-specifications.md)
