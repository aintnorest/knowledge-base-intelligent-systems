---
type: Synthesis
title: Pre-Write Intent Admission
description: Admit declared mutation authority before shared effects, while distinguishing scope coverage, retained concurrency, and optimistic ordered repair.
tags: [multi-agent, access-control, coding-agents, orchestration, reliability, agents]
timestamp: 2026-10-04T06:24:50Z
---

# Pre-Write Intent Admission

Pre-write intent admission separates a proposed change from authority to mutate shared state. A trusted control plane compares its exact base, read premises, write surfaces, operation classes, and dependencies against active work before an effect. It admits established compatibility, constrains bounded overlap, routes deterministic composition or serialization, and denies ambiguity. Different files or disjoint text ranges do not prove independence when contracts, registries, generated artifacts, or read premises are shared.

## Declared Intent Is Not Actual Coverage

**Committed scope** reserves present mutation authority; **contingent scope** declares possible supporting work without reserving writes. A concrete contingent mutation promotes only the needed resource through atomic re-admission against current work. An edit outside either declaration needs an explicit amendment, replan, serialization, or review path—not silently widened permission. Region authorization must account for changes relative to the declared base rather than equating current line numbers with original coordinates.

Scope includes file creation and deletion as well as edit regions. Independently creating the same file, or deleting a file another worker modifies, is a structural collision that line partitioning misses. File recall is not region coverage: in one frozen-plan controlled study, dynamic admission blocked undeclared mutations in 46/90 executions, with 45 blocks in already-declared files. The missing safe amendment path turned containment into terminal failure.

## Advisory Claims Versus Enforced Authority

An atomic ownership record prevents contradictory recorded owners, not direct writes by a worker that ignores it. Eventually convergent ownership is weaker still: agreement after synchronization cannot retract effects performed while replicas disagree. Enforced admission requires complete interception of governed effects, an authoritative active registry, current-version capability checks, and fencing that rejects stale executors. A neutral apply owner can compose bounded proposals without granting unrestricted concurrent direct writes.

Text convergence preserves edits, not compatible intent. Inconsistent signatures, defaults, and dependency assumptions can survive perfectly converged bytes. Admission contains effects within represented authority; it does not establish global semantic correctness. Independent integrated-artifact verification remains necessary alongside [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md).

## Contrasting Family: Optimistic Ordered Notify-and-Repair

Preventive admission asks whether authority may coexist before effects. Optimistic ordered notify-and-repair instead preserves long computations when a peer changes a premise in a shared live system. A fixed serialization order at launch filters reads to rank-permitted state and directs notifications one way: lower-ranked writes notify affected higher-ranked readers, including previously completed workers. The model judges relevance and repairs only dependent work. Fixed precedence avoids the livelock possible when peers repeatedly invalidate one another; global completion requires effects and pending notifications to settle.

Speculative effects need declared footprints, recovery information captured before mutation, and meaningful inverses. Misordered composed effects may require unwind and replay; irreversible effects must wait for earlier-ranked work to commit or use another preventive boundary. Quiescent serial equivalence does not imply harmless transient consequences: restoring a field cannot necessarily undo a downstream observer, email, or payment. Correct semantic healing remains a model-dependent assumption; one controlled study attributed five failures in 100 trials to notification-relevance mistakes.

Use preventive admission when shared mutation can be mediated and scope, operation types, and dependencies can be represented conservatively. Use ordered repair when live targets cannot be cheaply cloned, whole-task retry wastes substantial inference, and effects can be safely compensated or delayed. The families can complement each other, but post-effect repair must not be counted as pre-write prevention. Neither works around hidden accesses or inaccurate declarations.

## Practical Use and Evidence Limits

- Bind intent and authority to an immutable base, repository identity, explicit version, and operation/resource capabilities. Use leases with fencing when workers can outlive ownership.
- Keep read dependencies and non-file shared surfaces visible. Preserve blocked proposals and evidence for bounded amendment, review, or ordered replay.
- Verify the exact immutable artifact that integration applies, not a mutable workspace or completion report.
- Measure correct accepted deliveries, uncovered mutations, unnecessary serialization, repair effort, and actual latency/cost separately from admission classification.

Conservative declarations can recover reliability by serializing nearly everything. In one controlled study, static admission serialized 96.7% of executions and matched always-serial pair success at 50%; provider calls were physically sequential, so this is not measured concurrent throughput. Selective classification alone is not useful parallelism if legitimate supporting edits cannot finish.

Early concrete plans correlate with fewer textual collisions in cooperative-coding experiments, yet communication alone does not significantly improve final success. Observational peer-patch studies support representing structural operations, not a particular lease, fencing, or locking policy. Hidden semantic reads, incorrect adapters, bypass channels, stale bases, and weak validators remain trust boundaries. Single-domain admission does not automatically provide consensus across clones or hosts.

## Sources

- [Claim Plane: Enforceable Change Intents and Dynamic Scope for Parallel Coding Agents dossier](/dossiers/claim-plane-enforceable-change-intents.md) — committed/contingent authority, atomic promotion, fencing, broker provenance, and immutable integration.
- [Claim Plane: Reliability Gains and the Limits of Selective Concurrency for Parallel Coding Agents dossier](/dossiers/claim-plane-confirmatory-pre-write-admission.md) — reliability recovered through near-total serialization; dynamic failure from region undercoverage and missing amendment.
- [ATM: CID-Brokered Pre-Write Admission for Multi-Agent Code Co-Synthesis dossier](/dossiers/atm-cid-brokered-pre-write-admission.md) — progressive bounded admission, shared-surface dependencies, neutral application, and preserved blocked intent within one domain.
- [AgentRoom: Concurrent Multi-Agent Coding in a CRDT-Backed Shared Workspace dossier](/dossiers/agentroom-crdt-shared-workspace.md) — atomic advisory claims, observed unclaimed writes, and semantic conflicts despite text convergence.
- [CodeCRDT: Observation-Driven Coordination for Multi-Agent LLM Code Generation dossier](/dossiers/codecrdt-observation-driven-coordination.md) — eventual ownership convergence does not establish immediate exclusion or semantic compatibility.
- [CooperBench: Why Coding Agents Cannot be Your Teammates Yet dossier](/dossiers/cooperbench-coding-agent-teammates.md) — early-plan associations and reduced raw collisions without significant communication-driven success gains; no admission-policy test.
- [AI Agent Pull Requests on GitHub: Frequency, Structure, and Merge Conflict Rates dossier](/dossiers/agent-pull-requests-merge-conflict-rates.md) — peer-patch replay finds modify/delete and add/add collisions beyond content overlap.
- [CoAgent: Concurrency Control for Multi-Agent Systems dossier](/dossiers/coagent-concurrency-control-multi-agent.md) — fixed-order views, one-way selective repair, declared inverses, and model-dependent notification healing.
