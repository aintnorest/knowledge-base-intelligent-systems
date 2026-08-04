---
type: Synthesis
title: "Experience-Conditioned Harness Adaptation"
description: "Adapting a globally validated agent harness to a new case by retrieving bounded records of similar successes, failures, and distilled control patterns."
tags: [agent-harness, agent-memory, retrieval, evaluation, agents]
timestamp: 2026-07-22T00:32:30Z
---

# Experience-Conditioned Harness Adaptation

A global harness is easier to validate and deploy, but a single configuration is rarely optimal for every task. Experience-conditioned adaptation keeps a globally selected baseline while using a bounded, typed experience store to specialize context assembly, tool use, generation settings, workflow, memory, and output handling for the visible characteristics of one new case.

## Pattern

1. Define the editable harness dimensions and begin from an auditable global baseline.
2. During labeled search or production review, record each case's features, harness delta, outcome, cost, trace summary, and diagnosis of the primary failure surface.
3. Periodically distill recurring, evidence-backed patterns separately from raw per-case records.
4. Select the global harness by primary task quality, with cost only as a declared secondary criterion.
5. At test time, retrieve a bounded set of similar successes, similar failures, and relevant global patterns. Adapt once using only case-visible inputs and the frozen store; do not use an unavailable test label as hidden feedback.
6. Audit adaptation benefit, retrieval coverage, context cost, failure recurrence, transfer, and regressions against the unadapted global baseline.

## Practical Use

This pattern is appropriate when cases vary in tool needs, reasoning depth, output format, or domain but the deployment still needs a stable, reviewable harness. It avoids treating the full history as prompt material and makes the source of a case-specific change inspectable.

The experience bank is a security and reliability boundary. Scope its writes, label provenance, expire stale records, protect it from untrusted task text, and test whether retrieved failures prevent a mistake rather than teaching the model a brittle workaround.

## Limitations

- Similarity retrieval can select the wrong precedent, amplify a narrow workload bias, or make simple tasks unnecessarily expensive.
- Cached-context economics may not transfer to another serving stack.
- A frozen evaluation-time bank avoids label leakage but does not solve stale data or poisoned historical records.

## Sources

- [MemoHarness: Agent Harnesses That Learn from Experience dossier](/dossiers/memoharness-agent-harnesses-experience.md) — six control dimensions, dual-layer experience bank, correctness-first selection, and test-time adaptation without labels.
