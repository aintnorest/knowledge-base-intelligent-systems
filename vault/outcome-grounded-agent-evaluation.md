---
type: Synthesis
title: Outcome-Grounded Agent Evaluation
description: Evaluating agent changes with layered offline and online evidence, including delayed product outcomes that better reflect whether users kept the result.
tags: [evaluation, coding-agents, reliability, agents]
timestamp: 2026-07-13T16:02:28Z
---

# Outcome-Grounded Agent Evaluation

Agent quality should be evaluated with signals that approach the user's real outcome, not only with model-facing or system-efficiency proxies. A useful program combines fast offline evaluation with online experiments and delayed evidence of whether the agent's output survived real use.

## The Evaluation Stack

1. **Offline suites and benchmarks** make regressions and candidate comparisons fast and repeatable.
2. **Online A/B experiments** test candidate harnesses against real tasks, users, repositories, and failure modes.
3. **Operational metrics**—latency, token use, tool-call count, cache behavior, and error rate—explain cost and reliability but do not by themselves establish usefulness.
4. **Outcome proxies** observe whether the work was accepted or repaired: for example, the proportion of agent-authored code retained after a fixed interval, or a classifier's reading of the user's follow-up for satisfaction or a concrete failure report.

Each layer answers a different question. A change can improve a benchmark yet fail to improve product outcomes; it can reduce latency while making edits less durable; it can appear promising in an online experiment but be too expensive to deploy.

For tool-using agents, separate what the transcript says from what the environment contains. “I booked the flight” is trajectory evidence; a reservation row in the test database is outcome evidence. Grade direct state and artifacts first, then use the trace for safety, policy, efficiency, and diagnosis. A fixed tool-call sequence is usually too brittle when several valid paths reach the same state.

Production incidents add a rollout requirement. Anthropic reports that three independent Claude Code regressions affected different traffic slices and initially appeared as noisy aggregate degradation; specific user reports enabled diagnosis after existing evals and dogfooding missed them. Exact-public-build testing, soak periods, gradual rollouts, and per-slice observability belong between offline success and broad release.

## Practical Use

For every harness change, declare the primary outcome, guardrail metrics, comparison population, and observation window before rollout. Investigate divergence: a falling keep rate with stable benchmark scores points to a missing product-use behavior, while rising tool errors may explain both increased cost and declining quality.

Keep the evaluator independent from the acting agent where possible. Audit sampled outcome labels, especially LLM-generated labels, against human review or verifiable external states.

## Limitations

Delayed retention is still a proxy. Users may keep incorrect output, overwrite good output for unrelated reasons, or never return to the task. LLM-based satisfaction labels can encode classifier bias and need calibration. Online experiments can be noisy or ethically constrained, so they complement rather than supersede correctness tests and direct user research.

## Sources

- [Continually Improving Our Agent Harness dossier](/dossiers/continually-improving-agent-harness.md) — Cursor combines CursorBench and online A/B tests with code Keep Rate and an LLM reading of user follow-ups.
- [Demystifying evals for AI agents dossier](/dossiers/demystifying-agent-evals.md) — distinguishes outcomes from trajectories and capability from regression suites.
- [An update on recent Claude Code quality reports dossier](/dossiers/anthropic-claude-code-quality-postmortem.md) — motivates exact-build dogfooding, soak periods, gradual rollouts, and traffic-slice diagnosis.
