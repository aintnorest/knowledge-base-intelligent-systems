---
type: Study Note
title: "Claim Plane: Reliability Gains and the Limits of Selective Concurrency for Parallel Coding Agents"
description: Frozen-plan confirmatory evidence that static admission recovers serial reliability by nearly total serialization, while selective dynamic admission fails on region undercoverage.
resource: https://arxiv.org/abs/2608.00947v1
source: /archive/claim-plane-confirmatory-pre-write-admission.pdf
tags: [multi-agent, coding-agents, evaluation, reliability, access-control, agents]
timestamp: 2026-10-04T06:15:45Z
---

# Claim Plane: Reliability Gains and the Limits of Selective Concurrency — Study Notes

**Author**: Maxim Nikolaev, Vladivostok State University, Russia; single-author paper.  
**Status**: August 2026 arXiv preprint; no peer-reviewed venue is stated.

## What It Is

The pre-specified confirmatory follow-up to the [Claim Plane design paper](/dossiers/claim-plane-enforceable-change-intents.md). It tests whether deterministic admission of declared mutation scope improves combined coding outcomes and whether that protection retains useful concurrency.

## Problem and Motivation

Independent feature changes can pass locally and fail jointly. But a gate that serializes nearly everything may merely recover the always-serial baseline. Selective admission must both recognize risky overlap and allow agents to safely amend inaccurate scope declarations during implementation.

## Mechanism as an Idea

Static admission commits all calibrated scope before coding and serializes unresolved overlap. Dynamic admission commits only definite scope; predeclared contingent mutations require atomic promotion and re-admission, while uncovered writes are denied. The underlying broker, versioned authority, fencing, and immutable integration evidence are described in the companion design source.

The study freezes **60 feature-level plans** from DeepSeek V4 Pro once, then uses DeepSeek V4 Flash across **30 pairs × four arms × three coder seeds = 360 arm executions**. The pairs comprise 15 conflict and 15 clean labels from **seven tasks in three Python project families**: Jinja, Click, and dirty-equals. Gold features pass individual sanity checks. Gold-patch locations provide oracle-localized initial context.

Pair pass requires both individual features and combined benchmark checks to pass. Integration success is separate: merging successfully need not satisfy either feature. A **5,000-sample repository-task cluster bootstrap** preserves related pairs and all three seeds; only seven clusters support the intervals. Provider requests are physically sequential, so logical concurrency and modeled critical paths are not actual concurrent-provider throughput.

## Results and Admissions

| Arm | Pair pass (95% cluster CI) | Integration | Effective serialization |
| --- | --- | --- | --- |
| Parallel | 21/90, 23.3% [3.3, 49.5] | 59/90 (65.6%) | 0/90 |
| Static | 45/90, 50.0% [25.0, 78.7] | 87/90 (96.7%) | 87/90 (96.7%) |
| Dynamic | 20/90, 22.2% [7.1, 43.9] | 42/90 (46.7%) | 36/90 (40.0%) |
| Always serial | 45/90, 50.0% [25.0, 78.7] | 86/90 (95.6%) | 90/90 |

Static versus parallel yields **+26.7 percentage points pair pass**, paired cluster 95% CI **+9.6 to +60.0**. Static and always serial have identical pair-pass rates within every task cluster. On conflict-labeled executions, static passes **27/45 (60.0%)** versus parallel **3/45 (6.7%)**. On clean executions both pass **18/45 (40.0%)** and integrate **44/45 (97.8%)**: the gain is coordination protection, not improved coding ability.

Static serializes **45/45 conflict** and **42/45 clean** executions. Dynamic serializes **30/45 conflict (66.7%)** and **6/45 clean (13.3%)**, showing better selectivity but worse completed outcomes.

Dynamic fails closed on undeclared scope in **46/90 executions**, involving **20/30 unique pairs**. **45 of 46 blocks** target a file already in the frozen declaration. Of **45 coordinate-bearing failures**, 15 are within ten lines of a declared region and 30 farther away. File recall is therefore not region coverage. The runtime lacks a safe continuation/amendment path for these discoveries.

Mechanism reporting lists **90 promotion attempts**, **38 successful promotions**, **zero rejected promotions**, **317 wasted dynamic steps**, and **$0.3962 wasted coder cost**. The paper does not reconcile the remaining attempt accounting; undeclared blocks should not be relabeled as rejected promotions.

Mean logical critical paths are **134.2 s parallel, 188.0 s static, 172.3 s dynamic, and 181.4 s always serial**. Mean logical system costs are **$0.0277, $0.0923, $0.0846, and $0.0247**, respectively. One-time planning costs **$1.9971**; total coder cost is **$8.6509**, and total study cost **$10.6481**. Dynamic's lower coder spend reflects early termination, not an efficiency win. Appendix A gives shorter figures **$1.99 and $10.64**, apparently truncated rather than normally rounded.

## Analyst Takeaways

1. **Measure correct accepted deliveries, not admission selectivity alone.** Dynamic policy discriminates clean from conflict work yet fails operationally on uncovered edits.
2. **Serialization is a baseline, not a speedup.** Nearly serial execution can support a reliability claim while falsifying a useful-parallelism claim.
3. **Scope amendment belongs inside enforcement.** A denied supporting edit needs bounded re-admission, revised dependencies, serialization, or review—not silent permission widening and not necessarily terminal abandonment.
4. **Keep region precision distinct from file recall.** Knowing the right file was insufficient in 45 of 46 blocked cases.
5. **Respect dependence in the sample.** Three stochastic seeds do not turn 30 pairs into 90 independent semantic examples or a training corpus adequate for a dependency model.

## Questions and Limitations

The frozen design and published hashed artifacts strengthen reproducibility, but this remains one planner/coder combination, seven tasks, three Python families, and oracle-assisted localization. Wide cluster intervals remain important. Tests do not measure security, architecture, maintainability, or human repair effort. Physically sequential calls rule out a measured throughput claim.

The failures may arise from planner calibration, coordinate mapping, coder behavior, and the specific missing amendment path rather than contingent scope itself. Dynamic Scope v2 and learned dependency prediction are proposed next steps, not results of this paper. Broker interception still determines the strength of authority enforcement.

## Vault Ideas Extracted

* [Pre-Write Intent Admission](/vault/pre-write-intent-admission.md)
