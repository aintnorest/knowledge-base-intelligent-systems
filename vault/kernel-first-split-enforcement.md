---
type: Synthesis
title: Kernel-First Split Enforcement
description: Enforcing invariant agent-execution policy in the earliest available kernel mechanism, while routing only irreducibly runtime-dependent operations through a narrow, fail-closed supervisor that can validate, virtualize, or tighten policy.
tags: [sandboxing, access-control, agent-security, agents]
timestamp: 2026-07-14T16:20:08Z
---

# Kernel-First Split Enforcement

Kernel-first split enforcement divides a sandbox policy by the earliest point that can decide it soundly. Stable permissions—such as readable and writable paths, unconditional syscall denials, process-tree scope, or simple endpoint constraints—become kernel-enforced rules. Only operations whose decision genuinely depends on runtime state reach a small supervisor, which may validate a stable copy, perform a virtualized operation on the process's behalf, or narrow the remaining policy.

The point is not merely performance. Every operation routed to a supervisor becomes part of a larger trusted boundary with races, pointer lifetime, process-creation, recovery, and availability obligations. Keeping the common static case in the kernel reduces both steady-state overhead and the number of interposition paths that must be correct.

## Operating Pattern

1. **Classify each policy decision by its required evidence.** Identify which rules are known before execution and which require syscall-time facts, external authorization, a task phase, or a reversible effect.
2. **Compile static invariants to the strongest available primitive.** Use OS-backed filesystem, network, IPC, process, and syscall restrictions where they express the intended rule. At startup, test the primitive and fail closed if the platform cannot provide the promised semantics.
3. **Intercept the smallest dynamic set.** Make each intercepted syscall or event justify its cost and trusted-code surface. Leave policy-independent operations on the direct path.
4. **Preserve operation semantics while checking dynamic data.** Do not validate a user-memory pointer then allow the kernel to reread it. Freeze or otherwise control aliases when inspection is unavoidable; alternatively validate a copied value and have the supervisor perform the operation itself. If the implementation cannot establish this boundary, deny rather than silently degrade it.
5. **Constrain the supervisor's authority and outcomes.** Give it a short set of terminal actions—allow, deny, audit, virtualize, commit, or abort—and retain an auditable record of event, evidence, policy version, and result.
6. **Use live updates to reduce authority.** A runtime hook can revoke network access after setup, deny a newly discovered destination, or close a workspace after review. Do not treat executable names, model intent, or a callback's heuristic classification as the primary containment boundary.

## Practical Use

Use this pattern for agent shells, code-execution tools, plugin runtimes, build runners, local data processors, and controlled automation that needs frequent short-lived execution. Pair it with per-stage privileges: an untrusted-content stage might have no external network, while a later delivery stage cannot read private source directories. If work is speculative, virtualize local effects into a COW workspace and make commit an explicit, reviewed transition.

Measure startup cost, direct-path overhead, mediated-path latency, policy-denial coverage, tool compatibility, and failures of the supervisor itself. Test races deliberately: multiple threads, child creation while an event is pending, replaced pointers or file descriptors, DNS changes, retry behavior, and crashes between virtualized action and effect recording.

## Limitations

- The available kernel primitives define what can be static. Platform/version differences may force a reduced feature set; rejecting unsupported policy is safer than pretending equivalent enforcement exists.
- A supervisor remains privileged relative to the sandbox and can introduce denial-of-service, correctness, and escape risks. It needs careful lifecycle management, bounded queues, robust cleanup, and independent security review.
- Kernel enforcement cannot decide application-level authorization on its own. It should complement user intent, data provenance, credential controls, and semantic policy at consequential sinks.
- Filesystem rollback is not general transactionality. Network requests, external API effects, and data already emitted through an allowed channel require their own output-gating or compensation design.

## Sources

- [Sandlock dossier](/dossiers/sandlock-unprivileged-linux-agent-sandbox.md) — compiles static filesystem, TCP/IPC, and syscall policy into Landlock and seccomp-bpf, while a seccomp-notification supervisor handles runtime endpoint checks, safe `execve` observation, COW effects, and per-stage pipelines.
