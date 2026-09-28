---
type: Study Note
title: Fine-grained HTTP filtering for Claude Code
description: Ammar Bandukwala's first-hand account of application-aware coding-agent egress policy, TLS interception, and the explicit limitations of voluntary and namespace-based proxying.
resource: https://ammar.io/blog/httpjail
source: /archive/ammar-httpjail-claude-code.html
tags: [agents, coding-agents, sandboxing, agent-security, access-control]
timestamp: 2026-09-28T00:00:00Z
---

# Fine-grained HTTP filtering for Claude Code — Study Notes

**Author:** Ammar Bandukwala  
**Date:** September 12, 2025

## What It Is

Bandukwala built httpjail to regulate agent-origin HTTP(S) requests, motivated by destructive operations, data leaks, and authority exceeding user intent. IP allowlists are a poor fit for services on changing and shared infrastructure; a request-aware intermediary can decide based on hostname, HTTP method, and other application-layer properties. The author treats accidental model mistakes and prompt injection as relevant threat sources, while regarding filesystem isolation as a separate concern that containers can address.

## Mechanism and Boundary

A stronger Linux mode combines a network namespace with forced traffic redirection to an HTTP(S) interception proxy; non-HTTP(S) traffic is blocked except DNS, which remains allowed by default. The proxy terminates TLS using a locally trusted CA to inspect requests rather than merely check SNI. This permits expressive request rules and request logging but grants the proxy visibility into plaintext. A standalone proxy behind a separate network firewall can strengthen enforcement when the firewall actually forces traffic through it or drops bypasses.

The macOS mode instead relies on a cooperating program honoring conventional proxy settings. Bandukwala calls it less a jail than a suggestion: a subprocess that ignores the settings bypasses the restriction. Even Linux namespace enforcement may be circumvented if the workload can use an accessible Docker socket to launch a process *outside* that namespace. The author states from experience that models seldom intentionally escape user-imposed restrictions; this is anecdotal and does not cover an adversarial agent or malicious tool input. Neither TLS inspection nor application-aware rules alone close a DNS exfiltration channel left open by policy.

## Analyst Takeaways

A request policy is only as binding as the lower-level route that carries traffic through its decision point. Evaluate bypass through DNS, alternative protocols, child process behavior, and host control sockets before describing a proxy as a sandbox. Inspection depth costs certificate trust and plaintext visibility; voluntary proxying is useful for well-behaved tools, not a defensible containment claim against hostile code.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
