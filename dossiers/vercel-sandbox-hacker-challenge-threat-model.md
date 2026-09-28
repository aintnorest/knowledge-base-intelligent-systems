---
type: Study Note
title: $1 million hacker challenge for Vercel Sandbox
description: A public vendor threat model that treats both Firecracker escape and unauthorized network reachability as sandbox-boundary failures, while distinguishing the guest container from its security boundary.
resource: https://vercel.com/blog/one-million-dollar-hacker-challenge-for-vercel-sandbox
source: /archive/vercel-sandbox-hacker-challenge-threat-model.html
tags: [agents, sandboxing, agent-security, evaluation, access-control]
timestamp: 2026-09-28T00:00:00Z
---

# $1 million hacker challenge for Vercel Sandbox — Study Notes

**Publisher:** Vercel  
**Date:** August 18, 2026

## What It Is

Vercel publicly defines what would count as breaking its sandbox and offers a time-limited reward for demonstrated violations. It is an invitation to test a security boundary, **not a report of completed tests or verified security**. The two-week window ran August 18–September 1, 2026; the announced total pool was up to **$1 million**, with up to **$50,000 per report** for a vulnerability enabling another tenant's data to be read or changed. Payout figures describe incentives, not measured attack resistance.

## Threat Model and Boundary

Each workload runs in a Linux container inside its own Firecracker microVM on a bare-metal EC2 host. Vercel assumes an adversary can obtain root in the guest container and full access to the guest kernel. The microVM separates the host and other tenants; the container namespace is a developer-experience layer, **not** the security boundary. Host-side network controls govern outbound TCP and DNS, domain/address policy, and credential injection. A report qualifies conceptually if hostile code escapes the microVM to the host or another tenant, crashes another tenant, reaches a forbidden network destination, exfiltrates through a forbidden channel, or retrieves a brokered credential without any VM escape. Merely entering the guest OS from its inner container is outside this challenge's boundary.

Vercel requires a live proof of the violated boundary, not static analysis alone. A prior internal open-weight model run reportedly mapped the guest kernel, built a reproducer VM, and wrote a fuzzer, but **did not escape**. This is an anecdote about exploration, not a measured security result.

## Analyst Takeaways and Limits

Adversarial evaluation should state the exact outer boundary, assume the strongest realistic permissions *inside* it, and count network-policy bypasses as consequential even if VM isolation remains intact. A reward program can improve attack discovery, but its scope, duration, participation, private findings, and absent published final outcomes prevent interpreting no known escape as proof of safety. The post promises a later technical follow-up; it does not provide findings or fixes.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Nested Sandbox Capability Evaluation](/vault/nested-sandbox-capability-evaluation.md)
* [Assume Guest Compromise: Host Exposure Budget](/vault/assume-guest-compromise-host-exposure.md)

