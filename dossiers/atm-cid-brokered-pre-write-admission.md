---
type: Study Note
title: "ATM: CID-Brokered Pre-Write Admission for Multi-Agent Code Co-Synthesis"
description: Single-domain repository governance through adapter-declared atoms, progressive refinement, deterministic admission, neutral apply authority, and explicitly bounded evidence.
resource: https://arxiv.org/abs/2607.00041v1
source: /archive/atm-cid-brokered-pre-write-admission.pdf
tags: [multi-agent, coding-agents, access-control, governance, verification, agents]
timestamp: 2026-10-04T06:15:45Z
---

# ATM: CID-Brokered Pre-Write Admission — Study Notes

**Author**: Eagl Huang; single author, email supplied but no institutional affiliation stated.  
**Status**: June 29, 2026 arXiv preprint; no peer-reviewed venue stated. The manuscript identifies itself as v3.1 corresponding to framework release v0.9.0-alpha.1, while retaining pre-submission placeholder notices in Appendix C.

## What It Is

The AI-Atomic-Framework is a specification-to-evidence governance substrate for software agents inside **one authority domain**: a controlled filesystem, worktree, or service. Its content-identifier broker decides whether formed write intents may proceed, compose, serialize, or fail closed **before governed shared mutation**. It is not a universal orchestrator, distributed lock, Git replacement, or semantic correctness proof.

## Problem and Motivation

Character-level convergence preserves edits but not compatible intent. Whole-file exclusion is safe but coarse; a universal cross-language semantic representation is costly and incomplete. The paper proposes an intermediate, adapter-driven unit that makes write proposals comparable and auditable without requiring complete repository atomization.

## Mechanism as an Idea

Three authority planes bind the same task contract: authorized direction and scope, shared-mutation admission, and evidence-backed completion. Changes to goal or scope require a new task epoch. Passing validators alone is not closure; deliverables, evidence obligations, and governed writes must also be accounted for. These are design invariants, not mechanically proven end-to-end theorems.

A language or artifact adapter identifies **atoms**—small governable units such as functions, records, or bounded regions—and declares conflicts, shared surfaces, and read/write dependencies. The atom map links these units to ownership, validators, tests, and coverage gaps. **Virtual atoms** temporarily represent uncovered or excessively coarse regions; decomposition must preserve the union of original coverage rather than make inconvenient writes disappear from scope.

Candidate content identifiers support admission-time identity; post-validation capsule identifiers support evidence versioning and recovery. Identity alone is insufficient. The gate checks shared surfaces, declared read/write dependencies, regions/refinement, format-specific conflict keys and composition capability, apply-time base hashes, and conservative fallback locking.

Same-file disjoint proposals are routed through a **deterministic composer and one neutral steward**, not released as unrestricted concurrent direct writes. The broker decides; the steward applies, rechecks the base, records evidence, and triggers validators. A stale base blocks direct application while preserving intent and patch evidence for serialization, rebase/replay, review, or bounded refinement. Fail-closed means closing the unsafe apply channel, not deleting expensive generated work.

Private exploratory edits can remain outside this path. Strong claims cover only mutations explicitly governed through the broker/steward boundary. TypeScript and Python are reference language paths, with TypeScript more mature; other formats can supply their own conservative abstractions.

## Results and Admissions

### Evidence buckets are not one population

- The **12-scenario fixture design** has only **three archived core runner cases**; the other nine are a coverage blueprint, not validated runs.
- Self-hosting reports **95/100 atomization score**, **514/609 (84%) production-path ownership**, **55/55 public commands**, and complete evidence for **seven core atoms**. The roughly **1,372 framework commits** and **320 alignment commits across 15 agent channels** describe dogfooding intensity, not independent effectiveness evidence.
- One external adopter's **37 governed task-card attempts** over May 19–June 7 report **44 scope-lock interactions**, **two out-of-scope refusals**, **one contention burst covering ten cards requiring ledger replay**, **at least one runner idempotency break**, **three post-write validator catches**, and **zero unrecovered admission errors**. That denominator is the governed cohort, not all development activity.
- Three same-file cases form an existence-and-boundaries triangle: **POS2** composes bounded-disjoint cross-vendor changes and passes validators; **B-12** misses at admission and fails closed later at apply; **BLOCK** refuses overlap before write and proposes refinement. POS2 is one case, not a false-positive/negative estimate.
- A structured-artifact track matches **15/15 cases** across five format families, with five each parallel, serialized, and blocked outcomes. A separate dual-live public-source snapshot demonstration records one applied actor and one queued/conflicting actor; it does not govern the upstream project's workflow.

### Controlled admission and operational profiles

AdmissionBench freezes **20 unique scenarios and 42 mode-level comparisons**. The v0.2 profile reports **42/42 expected matches**, **route-label macro-F1 1.000**, **97.62% intent preservation**, **two false-safe policy rows**, and **four over-serialization rows**. Perfect route F1 does not mean no false-safe cases: those metrics use different reporting surfaces.

The **252 policy, 294 ablation, and 210 adversarial rows** are derived views of the same 20 scenarios, not additional independent samples. A separate **51-row timing projection** comprises **nine admission-forwarded, six apply-forwarded, three validator-forwarded, zero human-forwarded, and 33 not-forwarded** rows. Removing virtual atoms adds **eight false-safe rows and loses nine success rows**; removing conflict keys adds **four and loses five**. These are fixture ablations, not cross-system performance comparisons.

OperationalBench reports admission P95 **0.024 ms**, steward P95 **302.424 ms**, and total-scenario P95/P99 **310.159/1,088.094 ms** in the official profile. The denominators differ: **3,600 admission spans, 400 steward-routed rows, and 5,600 total scenarios**. An extended contention setting reaches **21,000 total rows** and preserves route structure. Lightweight validators and near-floor queue timing must not be generalized to real build costs or starvation freedom.

The role-separated audit freezes the contract and oracle before comparison; disagreements remain failures rather than changing expected answers. Its blind export **retains safety and validator-catch ground-truth labels**, so the source explicitly calls it a label-retained blind audit, not strict double-blind evaluation.

## Analyst Takeaways

1. **Govern the apply path, not merely task ownership.** A neutral writer keeps proposal attribution separate from actual mutation authority.
2. **Disjoint text is necessary but not sufficient.** Shared registries, generation surfaces, and declared read premises can couple edits in different regions or files.
3. **Refinement should preserve coverage and evidence.** Finer regions are useful only if they do not under-report the original effect.
4. **Reject unsafe application without discarding intent.** Preserved proposals enable review or ordered replay rather than unnecessary regeneration.
5. **Separate admission, apply, and validator catches.** Late enforcement is useful containment, but must not be reported as pre-write detection success.
6. **Keep metric universes explicit.** Perfect fixture route classification and residual false-safe policy rows can coexist; derived rows do not enlarge the independent sample.

## Questions and Limitations

Conservative adapter declarations, timely active-intent visibility, steward-only governed apply, and meaningful validators are assumptions. Hidden semantic reads or malicious under-declaration can produce optimistic admissions; selected adversarial containment cases do not establish soundness. Adapter signing, comprehensive sandboxing/audits, cross-language identity, and dynamic read reconstruction remain future work.

Autonomous virtual-atom refinement and bounded replanning are marked prototype; known-atom composition and conservative blocking have stronger evidence. Active-intent forwarding remains incomplete, with B-12 exposing apply-time fallback. Liveness and starvation are unproved. Cross-clone, cross-host, and cross-PR consensus are out of scope even though a local pre-push bridge is internally validated.

Much field/adopter evidence is summarized or available by request rather than publicly redistributed. Appendix C still says the arXiv identifier and supplementary DOI are pending placeholders despite the archived arXiv stamp; the placeholder DOI is not an issued citation. No broad comparative superiority, throughput advantage, or complete semantic guarantee follows from this evidence stack.

## Vault Ideas Extracted

* [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md)
* [Pre-Write Intent Admission](/vault/pre-write-intent-admission.md)
