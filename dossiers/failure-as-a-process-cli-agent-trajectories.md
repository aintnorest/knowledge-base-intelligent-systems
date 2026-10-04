---
type: Study Note
title: "Failure as a Process: An Anatomy of CLI Coding Agent Trajectories"
description: A process-oriented study separating decisive errors, empirical failure lock-in and observability, with information misuse, failed recovery waste and limited online detection.
resource: https://arxiv.org/abs/2607.09510v1
source: /archive/failure-as-a-process-cli-agent-trajectories.pdf
tags: [reliability, evaluation, coding-agents, agent-harness, agents]
timestamp: 2026-10-04T05:19:16Z
---

# Failure as a Process — Study Notes

**Authors**: Xiangxin Zhao, Han Li, Shuaiting Li, Tianyi Zhao, Earl T. Barr, Federica Sarro, and He Ye  
**Status**: arXiv preprint, July 10, 2026; the archived source names no peer-reviewed publication venue.

## What It Is

An empirical study of CLI coding-agent trajectories that treats failure as a developing process rather than a final test result. From 3,843 collected executions, the authors retain **1,794 valid trajectories** over 89 Terminal-Bench tasks, seven models and three scaffolds: MiniSWE, OpenHands and Terminus2. The retained set contains **1,184 failed** and **610 successful** runs, spanning more than 63,000 execution steps.

## Problem and Motivation

A wrong assumption can guide many locally plausible actions before a final check exposes the mistake. End-task scoring tells us which runs failed, but not when the decisive error occurred, whether there was an opportunity to recover, or why additional execution stopped producing value. The paper asks how errors begin, become persistent, surface, and either recover or turn into wasted repair.

## Mechanism as an Idea

The annotation scheme separates three retrospective timestamps:

- **Decisive error**: the problematic step that determines the eventual failure, not necessarily the first error.
- **Failure lock-in**: the point after which no correct recovery is observed in that trajectory.
- **First observable failure**: the first external signal exposing the error, when one exists.

The per-run difference between decisive error and lock-in is the **fix window**; observable failure minus lock-in is the **observability lag**, which need not be positive. Crucially, “unrecoverable” means **empirically unrecovered in the recorded run**, not mathematically impossible to repair. These timestamps are hindsight diagnoses, not directly available runtime states.

A model generates annotation drafts with evidence, but two independent humans inspect every failed trajectory and finalize labels. Reported agreement ranges from **κ = 0.78 to 0.94** across key labels; threats-to-validity reporting specifies **κ = 0.83** for root causes and weighted **κ ≥ 0.94** for timepoints.

The root-cause taxonomy classifies information misuse separately from missing competence and environment blockers. For online detection, a separate prefix monitor sees only partial trajectories and predicts whether lock-in has already occurred. Giving it the task requirements tests whether recognition depends on a violated specification rather than suspicious behavior alone.

## Results and Admissions

### Failure begins before it looks like failure

Across failed runs, the decisive error occurs at **median step 7** (mean **11.92**), lock-in at **median step 12** (figure mean **18.6**), and the first visible signal at **median step 16** among the **72%** that surface. Failed runs themselves have median **27** steps and mean **42**. **28%** never show an observable failure signal.

The **median per-trajectory fix window is one step**; **60.9%** have at least one recovery step, **43.9%** have three or more, and **239** remain recoverable for over ten steps. The difference between population medians, 12 minus 7, is not the median paired window. The paper describes observable onset as roughly ten steps after the decisive error; its median timestamps differ by nine, and it does not supply that statement as an exact paired-lag estimate.

On **2,659 prefixes from 600 trajectories** (300 failed, 300 successful), the prefix monitor reaches **82% precision**, but its best recall is only **28.8%**, up from **18.2%** when task requirements are absent. Median lead time relative to lock-in is **zero**; only **3.7%–8.7%** of failures are flagged before lock-in. Exposing the specification helps, but the experiment does not demonstrate a reliable preventive controller.

### Information misuse outweighs missing competence

Decisive root causes are **57.9% epistemic**, **32.8% competence-related**, and **9.4% environment-related** (rounding gives 100.1%). False premises alone account for **30.7%**, specification neglect **14.9%**, and knowledge gaps **24.0%**. Epistemic errors are the largest category in every model–scaffold system, ranging from **44% to 80%**.

One example mistakes an unavailable privilege-elevation utility for lack of filesystem authority, then constructs the requested artifact elsewhere despite being able to inspect actual privileges. Another assumes an attempted directory change succeeded because no output appeared, then builds in the wrong location. The decisive failure is the belief adopted from the observation, not merely the unsuccessful command.

### Failed recovery consumes substantial execution

Only **18%** of failed trajectories stop quickly after empirical lock-in; **82%** continue. Repairing the wrong problem accounts for **24%** of failed trajectories but **39%** of post-lock-in wasted steps, with a **21-step median tail**. Repeating the same approach accounts for **15%** of trajectories and **29%** of wasted steps. These are step-count shares, not token or dollar savings demonstrated by an intervention.

Errors also occur in **71% of successful runs**. Successful recoveries take median **5 steps**, versus **12** for failed recoveries. Before recovery becomes impossible, **92%** of successful trajectories respond to at least one error signal, versus **37%** of failed trajectories, despite similar signal availability (**74% versus 72%**).

Fabricated success appears in **26%** of failed trajectories, although it is the dominant post-lock-in behavior in only **15%**. **84%** of fabrication starts at or after lock-in. The paper interprets it as a frequent response to failure rather than the initiating cause; independent checks must therefore distinguish completion claims from evidence.

Final pass rates range from **19% to 45%** across the 21 model–scaffold systems. Both components affect outcomes, but these comparisons are observational rather than causal.

## Analyst Takeaways

1. **Validate high-leverage assumptions early.** Workspace identity, actual authority, required artifacts and interpretation of tool status can determine the rest of a trajectory before obvious symptoms appear.
2. **A monitor needs the contract, not just the trace.** Many errors become recognizable only relative to the requirement they violate. Even then, the measured low recall rules out treating a critic as a dependable safety net.
3. **Recovery quality is a change in diagnosis, not continued activity.** Long repair loops aimed at the wrong cause are expensive. A controller should demand new evidence or a revised hypothesis rather than merely another attempt.
4. **An error-free trace is the wrong target.** Successful agents often recover from errors; evaluate signal uptake and recovery effectiveness as well as final success.
5. **Do not turn hindsight lock-in into an unconditional runtime stop rule.** Repetition and duration are useful triggers for reassessment, but the retrospective study does not prove that a currently struggling run cannot recover.

## Questions and Limitations

- Dataset accounting is internally inconsistent: the paper says it retains tasks with all 21 runs, giving **89 × 21 = 1,869**, then excludes **75 unavailable trajectories** to reach 1,794. The retained matrix is therefore not complete as described. It also excludes 1,197 abnormal or incomplete executions from the original 5,040 planned runs, potentially suppressing harness and timeout failures.
- The study starts from a **240-task Terminal-Bench pool**, not necessarily the 89-task Terminal-Bench 2.0 release described in the benchmark dossier. Its final 89-task subset should not be assumed identical.
- Lock-in labels rely on full-trace semantic interpretation and observed non-recovery. They cannot establish counterfactual impossibility or exact causation.
- The prefix monitor is evaluated against hindsight labels, not through a randomized intervention that measures rescued tasks, net cost, latency or harmful false stops.
- Models, scaffolds and benchmark tasks are a dated snapshot. Shorter successful recovery does not justify imposing a universal five-step repair cap; task difficulty and trace selection can confound duration.

## Vault Ideas Extracted

* [Adaptive Runtime Agent Supervision](/vault/adaptive-runtime-agent-supervision.md)
* [Tool-Availability Abstention](/vault/tool-availability-abstention.md)
