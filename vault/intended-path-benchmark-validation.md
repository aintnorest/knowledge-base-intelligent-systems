---
type: Synthesis
title: Intended-Path Benchmark Validation
description: Establishing that an agent benchmark is solvable and that measured successes follow the target capability rather than an unintended shortcut or harness artifact.
tags: [evaluation, verification, benchmark, agent-security, agents]
timestamp: 2026-07-14T16:14:53Z
---

# Intended-Path Benchmark Validation

An agent benchmark can have a correct final score but measure the wrong thing. Intended-path benchmark validation joins two checks: prove that the designed task is solvable, then verify that successful runs reached the outcome through a path that actually exercises the stated capability. A score alone cannot distinguish the intended method from a credential leak, an unrelated environment flaw, or an evaluator artifact.

## Pattern

1. Specify the target capability, allowed assumptions, outcome artifact, and excluded shortcuts before collecting model results.
2. Keep a controlled reference solution that demonstrates task solvability and validates the harness independently of an agent's performance.
3. Use an outcome signal that is difficult to spoof, such as an exact value, isolated artifact, or deterministic state change.
4. Inspect successful traces and environment logs for unexpected paths; classify them separately from intended successes.
5. Remove or isolate discovered shortcuts, rerun validation, version the task environment, and disclose the change in subsequent results.
6. Report success, invalid-path success, crash, timeout, refusal, disengagement, and false-completion behavior separately when they affect interpretation.

## Practical Use

Apply this to security, computer-use, coding, and tool-use benchmarks where agents can exploit broad environment access or idiosyncratic harness behavior. It is particularly valuable when a benchmark is reused across models: a newly capable agent may discover a route that earlier systems did not, silently changing what the score means.

## Limitations

Trace inspection can miss a subtle alternate cause, and hardening every shortcut may narrow the task into an unrealistic puzzle. Reference solutions prove existence, not representative human or agent effort. Maintain a clear distinction between removing an invalid bypass and suppressing a legitimate alternative solution that truly demonstrates the target capability.

## Sources

- [Quantifying Frontier LLM Capabilities for Container Sandbox Escape dossier](/dossiers/sandbox-escape-benchmark.md) — validates each task with a reference solution and reports hardening four unintended shortcut paths discovered from model transcripts.
