---
type: Study Note
title: "When Should Users Check? Modeling Confirmation Frequency in Multi-Step Agentic AI Tasks"
description: A decision-theoretic checkpoint scheduler trades confirmation effort against diagnosis and re-execution, reducing completion time in a 48-person simulated-agent study under strong assumptions about human verification and recoverable errors.
resource: https://doi.org/10.1145/3772318.3790655
source: /archive/confirmation-frequency-agentic-tasks.pdf
tags: [human-in-the-loop, orchestration, reliability, evaluation, long-horizon, agents]
timestamp: 2026-10-05T21:48:59Z
---

# When Should Users Check? — Study Notes

**Authors**: Jieyu Zhou, Aryan Roy, Sneh Gupta, Daniel Weitekamp, and Christopher J. MacLellan; Georgia Institute of Technology.  
**Published**: CHI proceedings April 13, 2026; archived manuscript is arXiv:2510.05307v4, September 15, 2026.  
**Status**: Peer-reviewed CHI 2026 proceedings article. [Publisher DOI metadata](https://doi.org/10.1145/3772318.3790655) matches the title and all authors; the archived revision carries the same DOI and CHI reference. This note describes revision 4, not an assumed byte-identical April proceedings version.

## What It Is

A model of **when** to request human verification during a sequential agent task, rather than another control interface defining **how** users intervene. A formative study with **eight participants** identifies a Confirmation–Diagnosis–Correction–Redo (**CDCR**) pattern. A dynamic program schedules checkpoints to minimize expected completion cost, and a **48-person within-subjects simulated-agent study** compares those checkpoints with confirmation only at the end.

## Problem and Motivation

End-only review makes early mistakes expensive: the user must reconstruct the history and the agent must redo dependent work. Reviewing every step avoids long error tails but spends attention on frequent interruptions. Reactive takeover is not equivalent to proactively telling a user when to check; it can still require constant vigilance.

The formative work reviewed nine agentic systems and used five tasks across three interface patterns. All **40 trials** reached confirmation, **35/40** reached diagnosis, and **33/40** included correction. Seven of eight participants disliked end-only confirmation. Some missed existing errors, experienced users skipped directly to critical states, and users sometimes repaired small document defects themselves rather than requesting redo. These exceptions delimit the model rather than disappearing into its assumptions.

## Mechanism as an Idea

Each action has a conditional success probability. After the last verified state, the scheduler tracks whether all intervening actions remain correct. Within the model, a mistake makes subsequent states incorrect until a human diagnoses and repairs it; the agent does not spontaneously recover. A verified endpoint is treated as certifying the whole preceding interval.

At a checkpoint the user confirms the current state. If wrong, the user scans forward from the last certified point to find the first error, supplies a correction, and the agent redoes affected actions. The cost combines confirmation, diagnosis, and re-execution time, including waiting for the agent. Correction time is omitted from checkpoint optimization on the assumption that all errors must be corrected irrespective of checkpoint placement.

A backward dynamic program evaluates candidate next checkpoints and stores the cheapest continuation. Its inputs may vary by step: tool-dependent error rates, review difficulty, and execution cost can change spacing. A changed plan can be treated as a residual task and rescheduled. Online reliability updates and personalized timing are proposed extensions; the user experiment uses population-level, per-domain inputs rather than learned individual adaptation.

This mechanism optimizes **time under its model**, not permission, severity, irreversible harm, or human detection fidelity. Safety-mandated pre-action gates remain separate from efficiency-driven checkpoints.

## Results and Admissions

The controlled environment fixes agent timing and failures, isolating confirmation schedule rather than comparing live deployed agents. Each participant completes two confirmation formats in three domains plus one no-error trial, with counterbalancing of task, format order, and error location. Main-study task settings are:

| Domain | Steps | Per-step correctness input | Per-step redo time |
| --- | --- | --- | --- |
| Shopping cart | 8 | 87.5% | 20 seconds |
| Image editing | 12 | 91% | 10 seconds |
| Overcooked | 16 | 93% | 10 seconds |

Review and diagnosis times come from a ten-person pilot, with recalibration every five to ten main participants. Most participants are frequent LLM users (**41/48**), recruited from a university community.

**Measured completion-time comparison**:

- End-only mean **264.70 seconds**, 95% CI **[253.43, 275.98]**; intermediate mean **228.86 seconds**, CI **[219.73, 237.99]**.
- Overall saving **35.84 seconds / 13.54%**, **t(143) = 5.52, p < 0.001**.
- Domain reductions: **17.44% shopping**, **7.46% image editing**, **15.64% Overcooked**.
- Early-error tasks improve by approximately **29%**; mid-task errors by about **2%**; late-error tasks take **4.5% longer**. Thus a checkpoint schedule can add cost when it does not avert much rework.
- The source reports diagnosis time down **17%**, redo down **22%**, and mean time per confirmation down **38%**, despite more total confirmation effort.
- **39/48 participants (81%)** prefer intermediate confirmation; seven prefer end-only and two have no preference. Perceived burden and flow benefits are questionnaire results, not objective detection guarantees.

**Simulation, not additional user evidence**: the appendix compares probability-based checkpoint policies over **5,000 random runs per schedule** in each domain and reports the optimized placement at or slightly below the best random-policy mean. A separate 16-step sensitivity example moves from near-every-step checking at reliability at or below 0.70 to end-only at 0.99. These thresholds are conditional on the example's costs and do not define a general agent autonomy policy.

Financial and environmental benefits are inferred from fewer repeated operations, not directly measured monetary or emissions outcomes. The study does not establish superiority over a tuned periodic or risk-tiered policy in real human-agent use.

## Analyst Takeaways

1. **Review frequency is a recovery-cost decision.** A slow, cascading task can justify earlier review even when each individual action is fairly reliable. This adds proactive human timing to [Adaptive Runtime Agent Supervision](/vault/adaptive-runtime-agent-supervision.md).
2. **Tune the review surface and schedule together.** Shorter intervals reduce history reconstruction, but any time gain depends on a reviewer actually detecting the problem. Navigable checkpoints are not correctness oracles.
3. **Keep mandatory effect gates outside the time optimizer.** A cheap irreversible mistake cannot be priced solely as redo time. Pair scheduling with [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md), whose authority boundary is different from an efficiency checkpoint.
4. **Recalibrate with deployment evidence.** Benchmark accuracy and perceived simplicity can both understate local failure rates. Heterogeneous and online scheduling are supported model shapes, not validated personalization results here.
5. **Scope the agent-interface observation historically.** The reviewed systems and references reflect a July 2025-era snapshot; the claim that deployed agents generally confirm only at the end is not a present-day inventory or universal product guarantee.

## Questions and Limitations

- Human confirmation is modeled as accurate certification, despite formative examples of missed errors. The scheduler does not estimate false acceptance or the chance that a plausible endpoint conceals an earlier consequential violation.
- Linear first-error diagnosis, forward error propagation, and mandatory correction fit repeated dependent actions better than branching tasks, expert shortcut review, independent subtasks, or partial manual repair.
- The controlled failures and fixed latency remove real model variance, failed recovery, evolving goals, and interruption costs incurred while users do unrelated work. Most experimental comparisons contain an error; expected benefits depend on actual error prevalence and position.
- The main image-editing study says **12 steps**, whereas Appendix C calls its illustrative **16-step** image-editing setting the same base as the main simulation. Treat that sensitivity analysis as a separate example. The main gender counts (18 female, 30 male) also differ from the appendix's 36%/64% summary; the overall confirmation-time CI is printed [28.29, 32.95] around a 32.08-second mean, warranting caution about secondary summaries.
- Error severity, privacy, money, uncertainty in estimated parameters, task-specific preference, and high-stakes mandatory checkpoints are discussed as extensions rather than evaluated safeguards.

## Vault Ideas Extracted

* [Adaptive Runtime Agent Supervision](/vault/adaptive-runtime-agent-supervision.md)
