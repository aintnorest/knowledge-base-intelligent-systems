---
type: Study Note
title: Locking Down Science Gateways with Landlock and Seccomp
description: Study notes on applying runtime-enabled Linux Landlock and Seccomp restrictions to MPI scientific codes and a Rust science-gateway frontend.
resource: https://arxiv.org/abs/2509.18548v2
source: /archive/locking-down-science-gateways-landlock-seccomp.pdf
tags: [sandboxing, access-control, reliability]
timestamp: 2026-07-14T16:24:37Z
---

# Locking Down Science Gateways with Landlock and Seccomp - Study Notes

**Authors**: Steven R. Brandt, Max Morris, Patrick Diehl, Christopher Bowen, Jacob Tucker, Lauren Bristol, and Golden G. Richard III

**Source**: arXiv:2509.18548v2 [cs.SE]

**Date**: May 28, 2026 (v2)

**Pages**: 10
**DOI**: 10.48550/arXiv.2509.18548

## What It Is

This paper makes the case for hardening science gateways at the scientific application itself, not only at the login, credential, and web-frontend perimeter. Its proposed pattern combines Linux Landlock, which self-restricts filesystem paths and TCP/Unix-socket access, with Seccomp filters for capabilities Landlock does not cover well—especially UDP and dangerous syscalls such as `mount`.

The crucial timing is after MPI initialization but before a code parses any user-controlled parameter or data file. That lets an MPI program establish the peer communication it needs during startup, then irrevocably reduce its own authority before the likely exploit surface is reached.

## Why It Matters

Science gateways commonly expose mature C, C++, and Fortran simulation codes to less-vetted users. Those codes often need complex or binary inputs that are impractical to fully validate outside the application. A memory-safety or parser vulnerability could therefore turn input handling into host compromise.

Authentication, authorization, credential delegation, containers, and system-level MAC policies still matter, but the authors argue that they do not alone constrain what a successfully compromised application process can read, write, mount, or contact. Landlock/Seccomp is positioned as a lightweight runtime layer that an unprivileged application can enable itself without waiting for cluster-wide SELinux or AppArmor profiles.

## The Confinement Model

Landlock rules are path-based, stackable, inherited by descendants, and irreversible: a process can further reduce its access but cannot relax a rule it has installed. On the Linux versions considered, it can allow-list filesystem read/write paths and TCP bind/connect ports, but it does not restrict UDP. Seccomp is therefore used to deny UDP socket creation as well as `mount`-related calls; the paper also recommends considering `io_uring` and `bpf` blocks where a science application does not need them.

The roles are complementary rather than interchangeable:

- **Landlock** expresses which paths and TCP endpoints remain usable after initialization, something Seccomp cannot safely decide from pointer-valued syscall arguments such as the path supplied to `open()`.
- **Seccomp** can block syscall families and plug Landlock's UDP gap, but it is not a path-aware file policy.
- **cgroups, ulimits, kernel patching, and careful policy design** remain necessary. The pair does not stop denial of service through process/file-descriptor exhaustion, kernel privilege-escalation bugs, or overly broad allow-lists.

An implementation detail matters for threaded applications: the authors state that Landlock locks one OS thread, so each relevant thread must invoke it; Seccomp locks a process and needs one installation per process.

## Case Studies and Results

The paper modifies three astrophysics codes with substantially different implementations:

1. **Einstein Toolkit** (C/C++/Fortran, OpenMP): inserting the lock after Cactus data-structure initialization allowed a TOV neutron-star test to complete while denying reads and writes outside permitted directories. The Landlock call was made in an OpenMP parallel region, followed by a single Seccomp call.
2. **Octo-Tiger** (C++/HPX): the implementation dispatches a locking task across every HPX locality and OS thread. For an MPI networking configuration, every rank installs the restrictions. A rotating-star workload took about 92 seconds both with and without Landlock, so the authors report no observable runtime overhead in that experiment.
3. **FUKA** (MPI spectral initial-data solver): the paper builds FukaGateway, a practical gateway around the binary-neutron-star solver. Its Rust HTTP-facing shim is Landlock/Seccomp-confined to port 80, a localhost worker port, a short read-only system-file list, and the required job paths. The localhost-only worker manages Slurm and the job database; the authors could not confine it within their time budget because Slurm required a large, unresolved permission set.

Basic MPI tests showed why placement and deployment compatibility must be tested rather than assumed. Locking before `MPI_Init` prevented execution. On Fedora 40, MPICH worked when Landlock was enabled after startup, while OpenMPI attempted blocked shared-memory use; OpenMPI worked on Ubuntu 24.04. The paper notes that disabling OpenMPI shared memory is another possible workaround.

## Security Findings and Boundaries

The authors tried ordinary access outside allowed directories, setuid `sudo` variants, and spawning a shell from `vi`; Landlock restrictions continued to apply to the resulting processes. They treat that as evidence for the expected process/descendant confinement, not as a proof of a complete security boundary.

Important residual risks are explicit:

- Open file descriptors and bind mounts established before the lock can undermine the intended path policy.
- Landlock alone permits UDP, including potential DNS-tunneling-style egress.
- Resource exhaustion needs cgroup or `RLIMIT_NPROC`/`RLIMIT_NOFILE` controls.
- Kernel vulnerabilities can defeat kernel-enforced controls, so prompt patching remains a prerequisite.
- An allowed writable directory overlapping with `LD_LIBRARY_PATH`, a shell-like allowed executable, or a pivotable allowed endpoint can turn an apparently restrictive policy into an escape route.

The gateway architecture also reduces blast radius: only the Rust shim faces the public network and handles incoming files; the worker accepts localhost requests and schedules the heavyweight job. The authors note that denial of service remains possible, especially through expensive but superficially valid solver inputs.

## My Takeaways

1. **The placement of a sandbox call is part of the threat model.** “Sandbox the program” is too coarse. The useful boundary is after unavoidable trusted initialization and before the first untrusted parse, with a review of inherited descriptors, arguments, mounts, and dynamically loaded code.

2. **Least privilege has to be executable and workload-specific.** The path, port, and syscall allow-list needs to be discovered from a real run of the intended MPI stack. A generic secure profile is likely either unusable or accidentally broad.

3. **A self-imposed Linux sandbox is a valuable inner layer, not a substitute for operations.** It contains a compromised process's ordinary authority, but it cannot replace patch management, resource quotas, secure defaults, or gateway authentication and scheduling controls.

4. **Separation can make the hard part smaller.** Confining the Internet-facing shim while leaving a complex Slurm worker on localhost is an honest, pragmatic boundary. It does not eliminate the worker's risk, but it reduces direct public reachability and makes the untrusted-input path easier to constrain.

## What I Would Question

- The security testing is exploratory rather than a systematic adversarial evaluation; it does not establish coverage for `io_uring`, BPF, kernel bugs, races, or policy errors.
- The zero-overhead claim is based on one Octo-Tiger workload. Larger filesystem-heavy workloads and different kernels, MPI implementations, and rule sets may behave differently.
- The inability to confine the Slurm worker is operationally important. The split architecture is sensible, but the worker retains a privileged integration point that deserves a separately demonstrated least-privilege design.
- The paper's configuration examples permit broad locations such as a home directory. Per-job directories and narrow read-only runtime dependencies are safer default targets.

## Vault Ideas Extracted

* [Runtime-Activated Application Sandboxing](/vault/runtime-activated-application-sandboxing.md)
