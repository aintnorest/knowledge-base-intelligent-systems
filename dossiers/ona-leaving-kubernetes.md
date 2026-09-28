---
type: Study Note
title: "We’re leaving Kubernetes"
description: Gitpod/Ona's six-year production account of why interactive, stateful, privileged development environments strain Kubernetes scheduling, storage, and isolation abstractions.
resource: https://ona.com/stories/we-are-leaving-kubernetes
source: /archive/ona-leaving-kubernetes.html
tags: [agents, coding-agents, sandboxing, reliability, enterprise]
timestamp: 2026-09-28T18:43:43Z
---

# We’re Leaving Kubernetes — Study Notes

**Authors**: Christian Weichel and Alejandro de Brito Fontes  
**Published**: October 31, 2024 (written under the Gitpod name, now Ona)

## What It Is

A first-hand account of operating remote development environments for six years, serving a reported 1.5 million users and regularly thousands of environments per day. The subject is developer workspaces rather than an agent deployment specifically, but its lessons transfer to cloud coding agents that need the same interactive, stateful, arbitrary-code execution environment. The conclusion is workload-specific: Kubernetes remains suitable for many controlled application workloads.

## Why the Workload Fights the Platform

A development environment combines persistent source and caches, bursty CPU demand within hundreds of milliseconds, unpredictable I/O, root-like development capabilities, and a human intolerant of lost edits. Dense packing produced noisy-neighbor CPU and I/O starvation; process priorities were complicated by process grouping, and CPU throttling reports demand only after latency has happened. Local SSDs delivered performance but tied state to a node and exposed it to disk failure. Persistent volume attachment added variable startup timing, reliability problems observed in 2022, disk-count ceilings, and zone constraints. Backup/restore traffic itself had to be I/O limited to protect neighbors.

Fast launch competed with density and image freshness. Pre-pulled images arrived too late on newly scaled nodes; baked images aged quickly; lazy pulling required image conversion and compatible registries; a distributed registry facade worked but added operational complexity. Homogeneous images reduced the problem more simply. Networking required strong workspace-to-workspace isolation, but service/DNS growth became unreliable at scale.

## Isolation Tradeoffs and Decision

Container root privileges conflicted with host protection. User namespaces offered root-like guest behavior but required intricate filesystem ID mapping, masked process views, device controls, nested network boundaries, and container-runtime compatibility work. Some techniques imposed performance or tool compatibility costs. MicroVM trials improved kernel and resource separation and offered attractive suspend/resume snapshots, but added overhead, image conversion, large movable memory state, and—in mid-2023 experiments—hypervisor-specific GPU, filesystem-sharing, or restore limitations. The authors did **not** choose microVMs as their primary infrastructure.

The resulting post-Kubernetes system retains declarative APIs and control loops while narrowing orchestration to development-environment semantics. The authors identify storage and recoverable state—not the choice of scheduler brand—as the joint constraint on startup reliability, data safety, and utilization.

## Analyst Takeaways and Limits

- Choose an orchestrator for the workload's latency, state locality, and authority boundaries; the application-pod defaults are not a free fit for an interactive workspace.
- Stronger guest isolation may shift cost to memory density, image compatibility, and resume scheduling. A microVM is not automatically the lowest-latency option.
- This is retrospective vendor experience, not a controlled comparison of the replacement system; platform versions and 2022–2023 infrastructure limitations are historically contingent.

## Vault Ideas Extracted
* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
