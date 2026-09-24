---
type: Synthesis
title: Feedback-Grounded Context Adaptation
description: Improving LLM context only when reflections are grounded in reliable signals such as labels, execution results, tests, or environment feedback.
tags: [self-improvement, context-engineering, agent-memory, agents]
timestamp: 2026-07-12T19:02:08Z
---

# Feedback-Grounded Context Adaptation

A principle for self-improving LLM systems: context updates should be based on trustworthy feedback, not merely on plausible self-critique.

## The Core Idea

Context adaptation creates a control loop. The model acts, receives feedback, reflects, and updates its future context. The loop only improves the system when the feedback signal is informative enough to distinguish useful lessons from spurious ones.

## Strong Feedback Signals

- Unit tests or executable checks
- API/environment success and failure states
- Ground-truth labels on training or validation examples
- Deterministic scoring functions
- Human review with explicit acceptance criteria

## Weak Feedback Signals

- Ungrounded model self-evaluation
- Vague preference feedback
- Noisy labels
- Reflections from a model that does not understand the domain
- Outcomes where success cannot be observed directly

## Practical Rule

Treat the Reflector as part of the evaluation system. If the Reflector cannot reliably diagnose why an attempt succeeded or failed, the Curator may add bad lessons and poison the playbook.

## Promoting Discoveries Into Deterministic Skills

When a testing agent solves a repeated setup step by exploration, extract the stable sequence into a deterministic repository skill, propose it as a PR, and validate it on later sessions. Cognition reports replacing fragile computer-use login loops with a script that returns an authenticated session, and it lets Devin propose newly discovered setup skills as one-click PRs. Playbooks for repeated tasks specify the outcome, postconditions, forbidden actions and required inputs. Session insights can nominate changes, but a self-diagnosis from one run should not be promoted without tests or reviewer evidence. Cognition reports no measured generalization rate.

A verifier gate guarantees less than it appears to. Compare incumbent and candidate under the *same current* task and protocol, and accept only a lower measured risk. Bilevel Coordinated Reflection proves conditional convergence of *verifier* risk; claims about true utility also require a calibrated verifier. In its toy domain, independently measured harmful updates still passed the grounded gate 6.2% of the time. Re-run the incumbent when repository or policy state changes. An incomplete CI suite is evidence, not an oracle.

## Sources

- [Agentic Context Engineering dossier](/dossiers/agentic-context-engineering.md) - ACE works without labels on AppWorld because execution feedback is meaningful, but can degrade on finance tasks when reliable labels or execution signals are absent.
- [Verifying Agentic Development at Scale dossier](/dossiers/cognition-verifying-agentic-development.md) — deterministic login skill and one-click PRs for discovered setup skills.
- [How Cognition Uses Devin to Build Devin dossier](/dossiers/cognition-devin-builds-devin.md) — Playbooks with postconditions and forbidden actions; Session Insights.
- [Bilevel Coordinated Reflection: A Game-Theoretic Approach to Multi-Agent LLM Systems dossier](/dossiers/bilevel-coordinated-reflection.md) — verifier-risk gate guarantees versus true utility; harmful-update residual.
