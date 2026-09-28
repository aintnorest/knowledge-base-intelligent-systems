---
type: Synthesis
title: Privileged Local Daemon Sandbox Bypass
description: A confined process can delegate forbidden host effects to a reachable local service whose authority lies outside its process sandbox.
tags: [sandboxing, agent-security, access-control, tool-use, agents]
timestamp: 2026-09-28T00:00:00Z
---

# Privileged Local Daemon Sandbox Bypass

A process sandbox can correctly deny an agent's direct host-file write while still permitting a request to a local daemon that performs the write on its behalf. The daemon's control socket is an authority-bearing interface: its effects are bounded by the daemon's privileges and host shares, not by the caller's syscall policy. This is delegation across a privilege boundary, not necessarily an escape from the kernel sandbox itself.

## Boundary Map

| Boundary | Security question |
| --- | --- |
| Agent process | Which sockets, binaries, and control endpoints can it reach? |
| Daemon API | Which requests can create workloads, mount volumes, or mutate host resources? |
| Host exposure | Which host paths or services does the daemon make available to delegated work? |
| Authorization | Is access limited to the user-requested effect, or does one permitted endpoint grant broad capabilities? |

For example, a confined caller can use a container service to start a more privileged workload with a mount that reaches host files. The caller's direct writes may remain inside its workspace throughout; the service or its child performs the out-of-scope write. Similar reasoning applies to any local service that accepts instructions from a less privileged process and acts with greater authority.

## Why It Matters

A socket or bind mount is not merely ambient connectivity. Permitting it can import host-wide capabilities into an otherwise narrow sandbox. [Partial-Scope Tool Sandboxing](/vault/partial-scope-tool-sandboxing.md) asks whether all agent execution paths inherit confinement; this failure persists even when the *caller* is confined, because the effect occurs in a distinct service. [Writable-Artifact Authority Handoff](/vault/writable-artifact-authority-handoff.md) describes the related delayed case in which a privileged consumer later interprets written state.

## Practical Use

- Inventory reachable local control endpoints and evaluate the operations they authorize, not merely the file and network rules on the agent's own process.
- Deny unnecessary daemon sockets; where a service is essential, constrain its API, identity, mounts, and host shares to the task's delegated resources.
- Test a prohibited host effect both directly and through each allowed service path. Report the runtime's actual socket permissions and service configuration alongside any escape claim.

## Limitations

This failure requires a reachable, sufficiently privileged daemon and a path from its operations to the protected resource. Restrictive socket policy or narrowly scoped host shares can break the chain. A VM boundary likewise does not imply host-file isolation when its guest has been deliberately granted broad writable host shares; guest compromise and daemon delegation remain distinct mechanisms.

## Sources

- [One Docker socket to rule them all dossier](/dossiers/pillar-docker-socket-sandbox-escape.md) — demonstrates conditional delegation through a container-service socket, privileged workload, and host share; direct sandboxed writes remained constrained.
- [SharedRoot: Escaping the Claude Cowork sandbox dossier](/dossiers/accomplish-sharedroot-claude-cowork-escape.md) — contrasts the daemon route with a guest-root escalation whose host impact depended on a writable whole-host share.
- [Configure the sandboxed Bash tool dossier](/dossiers/claude-code-bash-sandbox-model.md) — identifies powerful Unix sockets as an admitted way to reintroduce host authority despite shell-process isolation.
