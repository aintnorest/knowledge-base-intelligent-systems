---
type: Study Note
title: Sandbox environments
description: Comparison of command-only and whole-agent isolation, with differing tool coverage, enforcement strength, and persistence risks in Claude Code environments.
resource: https://code.claude.com/docs/en/sandbox-environments
source: /archive/claude-code-isolation-environments.html
tags: [agents, coding-agents, sandboxing, agent-security, access-control]
timestamp: 2026-09-28T18:38:44Z
---

# Sandbox environments — Study Notes

**Publisher**: Claude Code documentation  
**Captured**: September 2026; standalone runtime is described as a beta research preview

## What It Is

A comparison of where an agent's execution boundary actually sits. The built-in shell sandbox encloses shell commands and descendants, **not** the full Claude Code process: file tools remain governed by permissions, and hooks and MCP servers may run unconstrained on the host. Wrapping the entire process in an OS sandbox, running it in a container, or running it in a VM adds coverage for these other surfaces. VMs offer a separate kernel; a committed dev-container convention alone does not force all developers to enter that container.

## Isolation Is Not Permission

Permission modes decide whether a tool action proceeds and whether someone is asked; execution isolation constrains what the action can reach once permitted. Unattended operation makes that distinction especially consequential. Even complete guest isolation leaves the writable mounted project vulnerable to agent changes and can leak any readable material over allowed egress. Neither local nor cloud sandboxing changes the model-provider transmission of prompts and files the assistant reads.

The standalone process runtime has a stronger *scope* than the command-only sandbox but inherits implementation qualifications: network is denied and writes are narrow by default, while reads are broad unless restricted. Sensitive configuration that the agent can write may install hooks or permissions that execute unconfined on a later launch. On macOS, certain protected writes are checked when they occur; on Linux, the documented nested-path deny set is computed at startup with a shallow scan and may miss repositories or protected names created during the run. A successful start without an explicit runtime policy is not proof that intended grants or denials were loaded.

Anthropic-hosted cloud sessions instead use a per-session VM and external network/GitHub proxies; self-hosted environments inherit the operator's isolation and credential controls rather than those of Anthropic's hosted VM. This comparison describes security *models*, not a ranking by installation convenience.

## Analyst Takeaways and Limits

Measure isolation coverage at the entire agent's executable surface and over time, including later launches from a tainted writable checkout. Permission bypasses do not disappear because one shell tool is sandboxed. VM separation changes kernel trust but does not make mounts, model-uploaded content, and outbound services harmless. These product-specific comparisons are captured as of September 2026; the source offers no comparative breach-rate study.

## Vault Ideas Extracted

* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md)
