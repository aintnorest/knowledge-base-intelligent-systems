---
type: Study Note
title: "Dive into Claude Code: The Design Space of Today's and Future AI Agent Systems"
description: A source-level account of Claude Code's loop, permission boundary, layered context reduction, extensions, delegation, and append-oriented sessions, contrasted with two other agent runtimes.
resource: https://arxiv.org/abs/2604.14228v2
source: /archive/dive-into-claude-code.pdf
tags: [agents, coding-agents, agent-harness, access-control, context-engineering, orchestration]
timestamp: 2026-09-28T18:39:26Z
---

# Dive into Claude Code: The Design Space of Today's and Future AI Agent Systems — Study Notes

**Authors**: Jiacheng Liu, Xiaohan Zhao, Xinyi Shang, and Zhiqiang Shen  
**Preprint**: arXiv:2604.14228v2, July 2026  
**Analyzed source**: Claude Code v2.1.88; contrasted with OpenClaw and Hermes Agent

## What It Is

A source-level reconstruction of a production coding-agent runtime, organized around values the authors infer—human authority, safety/privacy, reliable execution, capability amplification, and contextual adaptability—and thirteen associated design principles. The operational core is a repeated model-response/tool-action loop; the bulk of the engineering sits around it: resource management, permission gates, extension loading, delegated work, and durable session history. A publicly available source snapshot and documentation inform the analysis; it is neither an Anthropic design specification nor a measured evaluation of security or code quality.

## Decisions and Boundaries

The model proposes structured actions, but a separate harness checks permissions and executes them. Multiple entry surfaces share the main loop, limiting behavioral drift between interactive and programmatic use. Tool pre-filtering, deny/ask/allow rule precedence, lifecycle hooks, optional automatic risk classification, and optional shell sandboxing protect different stages. Unrecognized actions normally prompt a human rather than silently gaining permission; sandboxing is an additional, not universal, execution boundary. A model manipulated by content cannot *directly rewrite* those harness checks, but it may still exploit omissions in tool coverage, a granted permission, or unsandboxed actions.

A graduated context pipeline handles distinct pressures: individual oversize results, stale history, cache-related pressure, very long trajectories, and semantic auto-compaction. Repository-local instruction files and deferred tools make only relevant context visible. These choices preserve useful recent state and reduce token growth at the cost of omission and stale cached context. Four extension families have different authority and context costs: external tools, bundled plugins, selectively loaded skills, and event hooks. Extensions are not interchangeable; a hook can interpose on execution while a skill mainly changes model-facing guidance.

Subagents run separate conversation contexts and usually return a concise final result, while their full sidechain transcripts remain inspectable without filling parent context. A worktree can also isolate file edits, distinct from contextual isolation or OS sandboxing. Mostly append-only session transcripts support resume/fork, but **session-scoped permissions do not persist automatically** across resumption. The paper contrasts this per-action CLI posture with OpenClaw's persistent gateway/perimeter authority and Hermes's multi-surface approvals: design depends on what process lives long enough to own policy and credentials.

## Analyst Takeaways and Limits

1. **Keep reasoning and enforcement on different paths.** Model judgment decides which action to attempt; trusted runtime mechanisms decide whether and where it may run.
2. **Isolation has several independent axes.** A forked prompt, separate transcript, git worktree, and OS sandbox solve different problems and do not substitute for each other.
3. **Context management is a fidelity trade-off.** Compressing five types of pressure through a graduated pipeline is more discriminating than global truncation, but still requires reintroducing live state after compaction.
4. **Make trust state deliberately non-replayable.** Persisting actions for audit while requiring fresh permissions on resume prevents accidental resurrection of earlier grants.

The analyzed snapshot is v2.1.88 and feature flags/build targets alter active paths; exact tool counts or permission modes are not general current-product guarantees. The paper's architectural motivations are interpretive, informed by public statements rather than interviews with every designer. It provides no controlled demonstration that these mechanisms improve outcomes, and its six future directions—including silent failures, long-horizon governance, and programmer skill retention—remain open questions.

## Vault Ideas Extracted

* [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md)
* [Bounded Tool Observations](/vault/bounded-tool-observations.md)
* [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md)
* [Subagent Context Inheritance Modes](/vault/subagent-context-inheritance-modes.md)

