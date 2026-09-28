---
type: Study Note
title: "Prompt injection to RCE in AI agents"
description: Trail of Bits reports one-shot code execution in three unnamed agents through preapproved utilities whose arguments can write files or spawn programs.
resource: https://blog.trailofbits.com/2025/10/22/prompt-injection-to-rce-in-ai-agents/
source: /archive/trail-of-bits-argument-injection-rce.html
tags: [agents, agent-security, prompt-injection, access-control, tool-use, coding-agents]
timestamp: 2026-09-28T00:00:00Z
---

# Prompt injection to RCE in AI agents — Study Notes

**Author**: Will Vandevanter, Trail of Bits (independent security research)  
**Date**: October 22, 2025

## What It Is

Trail of Bits reports one-shot unauthorized code execution in three popular but unnamed agent platforms during coordinated disclosure. An agent has productive reasons to use fast native search, version-control, and test utilities; preapproving the executable while leaving its argument language open lets malicious instructions turn a supposedly safe tool into a writer or interpreter. The demonstrations use direct prompts, while the authors state that similar instructions can be embedded in comments, rules files, repositories, and logs.

## Boundary and Exploited Seams

The assumed boundary is human approval for dangerous commands, with certain read-oriented or testing commands allowed through automatically. Three observed mechanisms defeat its intended effect. A test runner's custom execution facility launched another program. A chain of version-control output and search preprocessing first created a payload and then executed it despite filters for familiar dangerous options. A typed search-tool facade passed a model-supplied pattern as a raw utility argument; a leading option was interpreted as an execution directive rather than a search string. These are argument semantics, not shell metacharacter expansion; disabling shell interpretation alone did not eliminate the issue.

## Fix and Failure Class

The recommended primary boundary is a constrained execution sandbox that limits the damage even if a tool argument is hostile. Where a facade is necessary, restrict each tool's exposed semantics and separate user-controlled positional values from option parsing; do not treat a command name or regular-expression filter as proof that every argument combination is harmless. Logging and escalation can aid oversight but cannot retroactively undo a command already run without approval.

The generalizable failure class is **privilege smuggling through an approved program's argument grammar**. Native utilities remain valuable for performance and reliability, creating a genuine security/usability tradeoff: broad flag access makes them useful and makes complete syntactic filtering hard. Authorization should cover intended effects and compositional tool chains, not just binaries.

## Limits and Takeaways

The affected vendors remain unnamed in this article, preventing product-level attribution and patch-status conclusions. Three crafted one-shot demonstrations establish possibility, not incidence in routine workflows or robust cross-model success. The claim that the same prompts work in indirect carriers is reported by the researchers; the published concrete examples primarily illustrate direct delivery. The authors credit Johann Rehberger's earlier related work rather than claiming the entire vulnerability family as new.

## Vault Ideas Extracted

* [Cross-Mechanism Execution-Security Evaluation](/vault/cross-mechanism-execution-security-evaluation.md)
* [Assume-Compromise Boundary Testing](/vault/assume-compromise-boundary-testing.md)
* [Tool Identity Versus Effect Authority](/vault/tool-identity-versus-effect-authority.md)

