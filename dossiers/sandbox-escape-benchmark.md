---
type: Study Note
title: Quantifying Frontier LLM Capabilities for Container Sandbox Escape
description: Study notes on SANDBOXESCAPEBENCH, a nested-sandbox CTF evaluation of agents' ability to escape container and pod environments through intentionally introduced, known weaknesses.
resource: https://arxiv.org/abs/2603.02277v2
source: /archive/sandbox-escape-benchmark.pdf
tags: [sandboxing, agent-security, benchmark, agents]
timestamp: 2026-07-14T16:14:53Z
---

# Quantifying Frontier LLM Capabilities for Container Sandbox Escape — Study Notes

**Authors**: Rahul Marchand, Art O Cathain, Jerome Wynne, Philippos Maximos Giavridis, Stuart Jennings, Freddy Tuxworth, Tolga H. Dur, Sam Deverett, John Wilkinson, Jason Gwartz, and Harry Coppock
**Venue**: ICML 2026, PMLR 306
**Preprint**: arXiv:2603.02277v2 [cs.AI]
**Pages**: 33

## What It Is

SANDBOXESCAPEBENCH is an open Capture-the-Flag benchmark for measuring whether an LLM agent with shell access inside a container or Kubernetes pod can reach a file outside that container. It is deliberately a capability evaluation under a motivated-adversary threat model, not an estimate of ordinary production compromise rates.

Its central safety design is a sandbox within a sandbox. The agent acts in a container or pod that runs inside a VM; the target flag is in that VM, while the evaluation orchestrator remains outside it. A successful escape is therefore meaningful for the task without making the evaluator's host the experimental target.

## Problem and Threat Model

Agent deployments often grant code execution within an isolated environment by design. The relevant containment question is therefore not whether an agent can obtain initial access, but whether it can turn an already available shell, configuration mistake, or known runtime/kernel weakness into access beyond the intended boundary.

The benchmark gives the agent a minimal prompt, shell tools, and a single unambiguous goal: retrieve a host-side flag. It assumes a capable, motivated agent, no active monitoring, and no stealth requirement. Hardware side channels, hypervisor escape, social engineering, and discovery of new zero-days are out of scope. Those boundaries matter: a result on this benchmark shows the ability to exploit its fixed task set, not an end-to-end breach probability for a defended deployment.

## Benchmark Design

The 18 tasks are selected from documented weakness classes with a reproducible reference solution. They cover three layers:

1. **Orchestration (4 tasks):** Kubernetes control-plane, secret-exposure, and network-policy failures.
2. **Engine and runtime (8 tasks):** over-broad privileges, exposed control surfaces, writable host mounts, and selected runtime vulnerabilities.
3. **Host and kernel (6 tasks):** namespace and cgroup weaknesses plus known kernel-level flaws.

Tasks receive a 1–5 difficulty rating based on estimated completion time for a security professional familiar with container escapes. Two independent raters re-scored the tasks; the reported ordinal Krippendorff's alpha is 0.816. For task validity, the authors provide a solution variant that hands the reference path to the agent and confirms that the task and harness can produce the flag. For outcome validity, success is exact matching of the host-side flag, rather than a self-report or an intermediate exploit claim.

The authors also treat shortcut removal as continuing benchmark work. During development, models found unintended routes through VM credentials or unrelated weaknesses in the selected kernel. The team removed those alternate paths and inspected successful transcripts to check that a reported success followed the intended vulnerability class. This makes the public task a more controlled measure, while also showing how fragile a benchmark's intended causal interpretation can be.

## Evaluation and Results

The original evaluation uses a custom ReAct-style solver, five independent samples per model-task pairing, and a 2.5-million-token budget per sample. It reports high success on common, direct misconfigurations (difficulty 1–2) for leading models. At difficulty 3, GPT-5 and Claude Opus 4.5 each reach a reported 0.40 success rate (95% Wilson interval 0.26–0.56 in the text); the paper reports no original-evaluation successes on difficulty 4 or 5 tasks.

The aggregate result rises approximately log-linearly with inference-time token budget. The authors emphasize the operational implication: containment capability depends on the whole deployment configuration—model, allowed tokens, retries, and parallelism—not just a model label. Their later update runs newer models for up to 100 million tokens; Claude Mythos Preview achieves at least one success on every public task and a reported pass@5 of 100% on the harder set. The update also finds that very long attempts can crash either the inner container environment or the outer VM; crashes remain failures because the task's success criterion is still flag retrieval.

Hints that name the underlying weakness generally help early exploration, but not uniformly. They substantially accelerate both GPT-5 and Opus 4.5 below the paper's roughly 100,000-token threshold. At larger budgets, Opus continues to benefit while GPT-5 changes little, an observation the authors interpret cautiously as evidence that unguided exploration may sometimes build useful environment-specific context.

Transcript analysis adds a second lesson: capability scores can be confounded by agent behavior. The Claude family keeps attempting until its budget limit in the reported cohort, whereas several GPT and open-weight models more often disengage, refuse mid-trajectory, submit incorrect flags, or falsely claim success. The paper uses deterministic log checks and LLM-judge scanners to separate these behaviors from a simple zero score.

## Analyst Takeaways

1. **Evaluate dangerous capabilities inside a stronger boundary than the one being tested.** An outer containment layer turns a real escape objective into a safer, reproducible experiment.
2. **Treat task validity as an engineering problem, not a one-time benchmark property.** Reference solutions establish solvability, but transcript review and shortcut hardening are required to show what success actually measured.
3. **Budget and retry policy are part of the threat model.** A capability can be absent at one token limit and material at another; evaluation reports should expose attempt depth, breadth, termination, and resource use.
4. **Separate inability from disengagement and invalid success claims.** Agent evaluation needs outcome checks plus trace-quality diagnostics, otherwise refusal, early stopping, or hallucinated completion can be misread as a capability difference.
5. **Plain container isolation is not a complete containment strategy.** The paper's evidence supports defense in depth: minimize privileges and control surfaces, patch promptly, and place risky agent execution behind a stronger isolation boundary.

## Limits and Questions

- The benchmark contains 18 public tasks drawn from known, intentionally introduced weaknesses. It cannot cover the configuration diversity, detection, patch level, credential controls, and compensating defenses of production systems.
- The threat model intentionally gives shell access, network connectivity, and minimal monitoring. Results should not be generalized to agents without those conditions, or to real attackers with different incentives and constraints.
- Difficulty is expert-estimated, despite substantial inter-rater agreement. Task difficulty and model rankings may shift with tool availability, prompting, agent architecture, and provider behavior.
- The updated results include recently released models and much larger budgets, but the public benchmark may saturate. A saturated public suite is still useful for regression testing, not a sufficient frontier-capability ceiling.
- LLM-judge transcript analysis can reveal behavior patterns but is itself a model-mediated measurement. The paper's programmatic checks reduce that dependency; they do not eliminate interpretive uncertainty.

## Vault Ideas Extracted

* [Nested Sandbox Capability Evaluation](/vault/nested-sandbox-capability-evaluation.md)
* [Intended-Path Benchmark Validation](/vault/intended-path-benchmark-validation.md)
