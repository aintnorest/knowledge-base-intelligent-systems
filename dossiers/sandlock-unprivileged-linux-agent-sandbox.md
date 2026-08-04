---
type: Study Note
title: Sandlock: Confining AI Agent Code with Unprivileged Linux Primitives
description: Study notes on an unprivileged Linux sandbox for frequent agent commands that compiles static policy into Landlock and seccomp-bpf while reserving a narrow, TOCTOU-conscious supervisor for runtime-dependent decisions and reversible effects.
resource: https://arxiv.org/abs/2605.26298v1
source: /archive/sandlock-unprivileged-linux-agent-sandbox.pdf
tags: [agent-security, sandboxing, access-control, agents]
timestamp: 2026-07-14T16:20:08Z
---

# Sandlock: Confining AI Agent Code with Unprivileged Linux Primitives — Study Notes

**Authors**: Cong Wang and Yusheng Zheng
**Venue**: Agentic OS Workshop, March 2026
**Preprint**: arXiv:2605.26298v1 [cs.OS]
**DOI**: [10.48550/arXiv.2605.26298](https://doi.org/10.48550/arXiv.2605.26298)
**Pages**: 9
**Code**: [multikernel/sandlock](https://github.com/multikernel/sandlock)

## What It Is

Sandlock is a Rust process sandbox for short-lived, potentially untrusted commands run by an AI agent on a Linux developer workstation. Its core design separates policy by when a sound decision can be made. Input-independent filesystem, TCP-port, IPC, and syscall rules compile into kernel-enforced Landlock and seccomp-bpf policy. A small seccomp user-notification supervisor handles the exceptional operations whose decision depends on syscall-time information, such as a resolved network destination, an `execve` argument vector, an HTTP request, or a filesystem effect that should be captured rather than immediately applied.

This is a workstation-oriented middle ground, not a replacement for containers or microVMs. The authors target frequent commands where image management, privileged setup, and hundreds of milliseconds of startup cost are inconvenient, while a developer still needs a default-deny boundary around home-directory data, network destinations, and build-tool side effects. The trusted computing base includes the host kernel, Sandlock supervisor, and embedding agent runtime; kernel vulnerabilities, side channels, privileged local attackers, and deliberate exhaustion of global kernel resources are explicitly outside the model.

## Problem and Design Goals

Agent tasks routinely execute model-generated shell commands, package scripts, downloaded code, and third-party tool plugins. They also combine private local data, attacker-influenced web or tool content, and external communication—the combination that makes prompt-injection failures materially dangerous. A useful sandbox must support legitimate package, documentation, and model API access without silently permitting a compromised process to read SSH keys or exfiltrate to an arbitrary endpoint.

The paper derives five goals: no root/cgroups/pre-provisioned namespaces; sub-10-ms startup and near-native steady-state performance; an embedding host that can observe selected events and tighten policy at runtime; pipelines whose stages have different authority; and filesystem changes that can be previewed, committed, or discarded. The last two matter because a single process boundary cannot break a task's private-data/network/untrusted-content combination when every privilege is granted to one stage.

## Split Enforcement Model

Sandlock exposes a per-command or per-pipeline-stage policy over filesystem access, endpoints and optional HTTP rules, resource bounds, and selected runtime events.

1. **Static rules stay in the kernel.** Readable and writable path prefixes, denied paths, TCP-port scope, IPC scope, and unconditional syscall denials are expressed with Landlock (filesystem, TCP, and IPC) and seccomp-bpf. Sandlock requires Landlock ABI 6 or later—Linux 6.12+—and refuses to run below that capability rather than silently weakening the requested policy.
2. **Dynamic decisions take a controlled path.** Seccomp notifications intercept only operations such as process creation, memory-mapping accounting, network calls, COW filesystem operations, and selected `exec` calls. The parent supervisor returns allow, deny, or an on-behalf result after checking the relevant information. It uses `pidfd_getfd` to duplicate a child socket when it must perform a validated operation on the child's behalf.
3. **Runtime policy may tighten, not become the sole boundary.** `policy_fn` receives selected event data and can audit, deny, or reduce the remaining authority. An `execve` event can, for example, signal the transition from setup to untrusted test execution and revoke network access. The authors stress that matching `argv` is an observation signal, not a containment mechanism: a malicious program can rename or reimplement `curl`; the static privilege boundary and endpoint controls remain the protection.
4. **Fail closed when a safe interposition is unavailable.** The supervisor does not simply inspect a pointer argument and tell the kernel to continue, because a sibling thread could replace the argument before the kernel re-reads it. For `connect` and message payloads it validates a copied value and performs the action itself. For `execve` argument inspection it freezes possible address-space aliases before reading; if thread freezing or child-registration tracking is unavailable, it denies the syscall rather than relaxing the check.

## Network, Effects, and Composition

Endpoint policy names concrete TCP, UDP, or ICMP destinations, or TCP ports where host identity is irrelevant. Hostnames are resolved once at sandbox startup and pinned to concrete destinations, which avoids DNS-rebinding after policy evaluation; wildcard domains are deliberately unsupported. A port-only TCP policy uses Landlock's direct kernel path. Host-specific, HTTP-aware, UDP, and ICMP cases use the on-behalf supervisor path. HTTP method/host/path checks route traffic through a local proxy; HTTPS inspection is opt-in because the workload must trust a sandbox CA, otherwise TLS is constrained only by endpoint policy.

For reversible workspaces, Sandlock supplies two copy-on-write backends. The default seccomp COW redirects writes to an upper directory and merges directory reads in the supervisor, avoiding a mount namespace. A BranchFS backend puts the write path in a specialized COW filesystem and controls branch create/commit/abort through ioctls. Both expose `COMMIT`, `ABORT`, and `KEEP` effects. This rollback is limited to filesystem changes: network effects are not reversible, and the paper suggests future output-gating through the HTTP proxy.

The pipeline operator connects separately sandboxed stages with kernel pipes. A private-data stage can read a protected directory but have no network; a networked stage can receive only pipe output and be denied the protected directory. This turns a desired prompt-injection-resistant decomposition into OS-enforced capability separation. It does not make pipe contents safe, prove a decomposition is sound, or prevent a compromised upstream stage from shaping bytes consumed downstream.

## Evidence and Results

The evaluation is preliminary and runs on one Pop!_OS 24.04 workstation with Linux 6.18, an AMD Ryzen 5 5500U, 8 GB RAM, and NVMe storage. A ten-case effectiveness check reports the expected allow/deny outcome for in/out-of-scope reads and writes, allowlisted/non-allowlisted connections, per-stage private-data access, process caps, and a memory cap. These deterministic checks demonstrate the prototype's selected mechanisms, not a comprehensive security evaluation.

For `/bin/echo`, Sandlock adds about **5 ms** over bare metal (about 6 ms wall-clock), while Docker is reported roughly 44 times slower end to end in this setup. On Redis 7, the reported medians are 75.2k versus 75.5k requests/s for `SET` and 74.2k versus 73.9k for `GET` (Sandlock versus bare metal), with p99 latency 0.51 versus 0.49 ms. Docker reaches about 76% of bare-metal throughput and roughly triple the p99 tail latency in the figure's experiment. The on-behalf network path has a real per-message cost: a 256-byte round trip rises from 20 to 55 microseconds median and from 33 to 114 microseconds p99. The authors argue this is negligible beside 100-ms-to-seconds agent API calls, but it is material for high-rate local traffic.

The COW-fork runtime reports 1,000 forks in about 530 ms, or roughly 1,900 forks/s; disabling `policy_fn` increases the rate by about 30%. The authors also report unmodified `python3`, `make`, `node`, `pytest`, and Python native-extension imports after granting needed scratch paths. They did not perform a systematic compatibility study across the long tail of agent tooling.

## Analyst Takeaways

1. **Compile invariant authority into the earliest reliable enforcement point.** Filesystem scope, unconditional syscall denials, and simple endpoint constraints should be kernel rules rather than a user-space callback on every operation. This limits both overhead and the trusted dynamic surface.
2. **Use runtime hooks to narrow an existing boundary, not to infer security from command names.** A phase transition, resolved endpoint, or approved review decision can justify a narrower live policy. Treat `argv` and similar metadata as audit or policy-tightening inputs, never as proof that an executable is benign.
3. **Design interposition around kernel semantics.** A validation step is not a security check if a process can race it. Identify who owns the bytes, whether the kernel will reread them, aliases and child creation, and whether the operation must instead be replayed by a trusted component. Deny when that proof cannot be maintained.
4. **Give agent stages distinct OS authority.** Separating untrusted-content exposure from private-data access and network egress is more meaningful when filesystem and network privileges differ at the process boundary, not only in an LLM prompt or plan.
5. **Make speculative local work explicit.** COW commit/abort can make package installation, code generation, and test setup inspectable before host changes persist. Model the non-reversible channels separately; a discarded workspace does not retract a sent request or leaked secret.

## Questions and Limitations

- The security claim is bounded by Linux's unprivileged primitives and the trusted supervisor. Kernel vulnerabilities, shared-kernel resource attacks, side channels, and supervisor bugs remain relevant; a microVM is still the paper's recommended choice for adversarial multi-tenant workloads.
- Landlock ABI 6+ (Linux 6.12+) is a concrete deployment dependency. The evaluation kernel is newer (6.18), so performance and compatibility may differ on agent workstations that lack the necessary ABI or have different LSM/security configurations.
- Resource controls are cooperative approximations without cgroups. Memory accounting bounds requested virtual address space through selected syscalls, does not fully track every allocation path, and cannot offer the isolation strength of a cgroup limit against adversarial exhaustion.
- HTTP-level HTTPS controls require installing and trusting a sandbox CA. Without that opt-in, same-endpoint HTTPS requests cannot be distinguished by method, host, or path; endpoint allowlisting is necessary but may be too coarse for shared API hosts.
- The results are a small prototype evaluation, not a formal proof, adversarial penetration test, broad tool-compatibility study, or independent comparison. Docker is rootful in the performance comparison even though rootless Docker is the feature-table peer, so the measurements should not be read as a universal deployment ranking.
- Per-stage separation controls capability availability, not information-flow semantics. Pipe contents, trusted policy design, credential handling, and the choice of which stage may access which data still need application-level constraints and audit.

## Vault Ideas Extracted

* [Kernel-First Split Enforcement](/vault/kernel-first-split-enforcement.md)
