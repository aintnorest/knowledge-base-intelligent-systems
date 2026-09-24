---
type: Synthesis
title: Normative-Source-Grounded AI Assistance
description: Govern AI-assisted work by making an authoritative standard the acceptance criterion and retaining human accountability for validation, disclosure, and data handling.
tags: [governance, human-in-the-loop, reliability, verification, enterprise]
timestamp: 2026-08-31T22:15:22Z
---

# Normative-Source-Grounded AI Assistance

When work is constrained by a formal standard, an AI system is a proposal generator rather than the source of truth. Every output must be accepted against the authoritative rules by an accountable person or validated process. The workflow should record where AI was used, protect confidential inputs, disclose relevant limitations, and benchmark the specific compliance task rather than relying on general fluency.

Human review is not meaningful unless reviewers have the standard, enough time and expertise, and a traceable validation procedure. Private deployment can protect data but does not establish correctness.

This is the normative counterpart of source-backed claim admission. One pattern controls which facts may enter an answer; this one controls which rules determine whether a proposed artifact may be accepted. In both cases, material available to the model is not automatically authoritative. Keep the governing standard versioned and inspectable, bind each validation decision to the applicable rules, and distinguish a tool's compliance suggestion from the accountable acceptance record.

## Recommendation Is Not Merge Authority

Code-review governance must keep a model's recommendation separate from the authority to approve a merge. By default, GitHub Copilot's review includes an approval assessment that does not satisfy required approvals. When repository, organization and enterprise administrators enable Copilot approvals, **its approving review can count toward a required-approval rule the same way a teammate's does**, and new commits dismiss it. A team whose policy requires independent human approval must audit that setting and enforce a separate human gate, rather than assuming a numeric branch-protection rule means humans only. Accepting an inline suggestion is likewise a user gesture, not evidence of compliance. Linking a normative guideline in a review comment does not make the comment useful either: Google suppressed AutoCommenter rules whose linked best-practice pages had gone stale.

## Practical Use and Limits

Use this for controlled language, regulated reports, policy-constrained communications, or any workflow where an external standard outranks model preference. Automate deterministic rules where possible and route ambiguous or safety-relevant findings to qualified reviewers. The pattern does not make review infallible: standards can conflict, model explanations can be misleading, and nominal human approval can become rubber-stamping without evidence and workload controls.

## Sources

* [ASD-STE100 and AI dossier](/dossiers/asd-ste100-ai-assisted-technical-writing.md) — STEMG position that AI may support controlled technical writing but cannot supersede STE requirements or human responsibility.
* [From Prompts to Contracts dossier](/dossiers/auditable-enterprise-llm-harness.md) — separates available documents and generated wiki context from the source-backed claims admitted into an auditable enterprise answer.
* [About GitHub Copilot code review dossier](/dossiers/github-copilot-code-review-concepts.md) — conditional required-approval authority for Copilot reviews and a human-validation warning.
* [Application card: GitHub Copilot inline suggestions dossier](/dossiers/github-copilot-inline-suggestions-responsible-use.md) — explicit acceptance gesture; the user remains responsible for validation and security.
* [AI-Assisted Assessment of Coding Practices in Modern Code Review dossier](/dossiers/google-autocommenter-coding-practices.md) — stale linked guidelines made comments non-actionable.
