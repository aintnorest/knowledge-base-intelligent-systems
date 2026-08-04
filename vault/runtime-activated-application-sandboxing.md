---
type: Synthesis
title: Runtime-Activated Application Sandboxing
description: Installing an irreversible least-privilege sandbox after trusted runtime initialization and before an application processes untrusted input.
tags: [sandboxing, access-control, verification]
timestamp: 2026-07-14T16:24:37Z
---

# Runtime-Activated Application Sandboxing

Runtime-activated application sandboxing narrows a process's authority at the last moment its trusted startup requirements are satisfied and before it consumes attacker-controlled data. The sandbox should be inherited by child processes and irreversible, so a later compromise cannot simply turn the old permissions back on.

## Operating Pattern

1. Map the startup boundary: network/bootstrap calls, dynamic loading, MPI or worker initialization, file descriptors, mounts, command-line parsing, and any other input path.
2. Complete only the trusted initialization that genuinely requires broad authority.
3. Install a workload-specific policy that allows the minimum filesystem paths, endpoints, syscalls, credentials, and resources required for the remaining computation.
4. Ensure every thread and process that must be confined has installed or inherited the policy according to the mechanism's semantics.
5. Parse user files and perform the untrusted workload only after the policy is active; give each job a separate writable directory where practical.
6. Test the real deployment matrix—runtime, kernel, libraries, parallel stack, and representative workload—for both allowed behavior and denied access.

## Practical Use

This pattern fits services that must initialize a complex runtime before they can safely handle untrusted plugins, documents, jobs, models, or scientific inputs. A public-facing shim can often be constrained more aggressively than a local scheduler or worker; separating those roles reduces the amount of code and authority exposed to the Internet.

Use complementary controls for gaps in the sandbox mechanism. A path policy may need a syscall or egress filter; CPU, memory, process, and file-descriptor exhaustion need resource quotas; kernel vulnerabilities require patching. Record the exact policy and its allowed resources as part of the deployment artifact rather than treating the sandbox as a one-time code call.

## Limitations

- Anything opened, mounted, parsed, or accepted before activation can bypass the intended boundary. The activation point is therefore a security-critical design decision.
- A permissive allow-list can create escape paths through writable library locations, interpreter-like binaries, broad network endpoints, or inherited capabilities.
- Not every dependency can run under every policy. Thread, process, dynamic-linker, MPI, and scheduler behavior must be tested on the actual operating system and version.
- This controls a compromised process's ordinary authority; it does not replace authentication, input validation, resource governance, patch management, or protection from kernel compromise.

## Sources

- [Locking Down Science Gateways with Landlock and Seccomp dossier](/dossiers/locking-down-science-gateways-landlock-seccomp.md) — applies Landlock/Seccomp after MPI startup and before input parsing in three scientific codes, with a constrained public gateway shim and explicit residual-risk analysis.
