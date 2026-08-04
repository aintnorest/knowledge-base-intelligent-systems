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

## Sources

- [Agentic Context Engineering dossier](/dossiers/agentic-context-engineering.md) - ACE works without labels on AppWorld because execution feedback is meaningful, but can degrade on finance tasks when reliable labels or execution signals are absent.
