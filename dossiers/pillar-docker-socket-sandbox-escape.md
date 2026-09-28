---
type: Study Note
title: "One Docker socket to rule them all: escaping Codex, Cursor, and Gemini CLI's sandboxes"
description: Pillar's demonstration that access to Docker Desktop can delegate host writes beyond an otherwise deny-default coding-agent sandbox.
resource: https://www.pillar.security/blog/one-docker-socket-to-rule-them-all-escaping-codex-cursor-and-gemini-clis-sandboxes
source: /archive/pillar-docker-socket-sandbox-escape.html
tags: [agents, agent-security, sandboxing, coding-agents, access-control]
timestamp: 2026-09-28T18:39:48Z
---

# One Docker Socket to Rule Them All — Study Notes

**Researcher**: Dan Lisichkin, Pillar Research  
**Date**: July 20, 2026  
**Evidence position**: Third-party security research by Pillar, an AI-security vendor.

## Assumed Boundary

Codex CLI, Cursor, and Gemini CLI used deny-default macOS sandbox policies intended to confine agent writes to a workspace and temporary files. The reported scenario requires Docker Desktop installed and running, executable access to its CLI and Unix socket, and sufficient network/socket permission; this is **not** an unconditional escape from every default configuration. The sandbox confines direct filesystem writes by the agent process, not operations performed by a separate privileged daemon.

## Exploited Seam

Pillar demonstrates the same delegation path in three products. The agent imports a downloaded container filesystem as a local image, avoiding restrictions on pulling registry images; it asks Docker Desktop to run a privileged container with a workspace-approved bind mount. Inside Docker's VM, that container mounts Docker Desktop's VirtioFS host sharing and can write the user's home directory. The prohibited write happens in a different execution domain: the agent's own observed workspace writes stay within policy. A prompt injection in repository content is a plausible steering vector, though the published reproduction uses an explicit instruction.

This is a **confused authority boundary** rather than a kernel or Seatbelt breakout. Deny-default syscall policy cannot protect a host if an allowed control channel commands a more privileged daemon to perform forbidden effects. The source uses a benign shell-initialization change as proof of out-of-workspace host write.

## Fix and Dispositions

Cursor shipped a high-severity fix associated with GHSA-v4xv-rqh3-w9mc; the article does **not** give a patch version or shipment date beyond its July 20, 2026 publication. OpenAI agreed the Codex result was unintended but classified the report as informational, arguing that active profiles deny Unix-socket access unless explicitly allowed; no Codex fix is reported. Gemini CLI's team treated the Docker exposure as documented behavior; no fix is reported. Pillar's opening description of a single universal vulnerability should be read with these distinct permission preconditions and vendor responses in view.

## Analyst Takeaways and Limits

Treat local daemon APIs as effective capability grants: allowed access to a socket may imply host-wide writes even when all direct writes are confined. Restrict that capability independently, or put both the agent and the service it controls inside a stronger common boundary. The demonstration depends on Docker Desktop's particular host sharing, container privilege, and endpoint configuration; it does not establish that every Docker deployment or default coding-agent session is exposed.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Privileged Local Daemon Sandbox Bypass](/vault/privileged-local-daemon-sandbox-bypass.md)

