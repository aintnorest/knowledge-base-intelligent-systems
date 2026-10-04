---
type: Study Note
title: "Don't Build Multi-Agents"
description: Walden Yan's first-hand argument for decision continuity explains why shared starting context does not prevent divergent parallel actions, and why history compression must preserve consequential decisions.
resource: https://cognition.com/blog/dont-build-multi-agents
source: /archive/cognition-dont-build-multi-agents.html
tags: [context-engineering, multi-agent, reliability, coding-agents, compaction, agents]
timestamp: 2026-10-04T06:40:38Z
---

# Don't Build Multi-Agents — Study Notes

**Author**: Walden Yan, Cognition  
**Published**: June 12, 2025  
**Status**: First-party practitioner essay and architectural opinion, based on Cognition's trial and error; not a controlled benchmark paper.

## What It Is

An argument that reliable long-running agents need continuity of decision-relevant context, and that dispersed decision makers often lose it. The provocative title is broader than the reusable mechanism: parallel branches can agree on a task description yet disagree on consequential choices made during execution. Yan recommends a single-threaded linear decision stream as the default and discusses a separate history-compression model for tasks that outgrow a context window.

## Problem and Motivation

A task brief is not the task's full interpretation. Requirements emerge through multi-turn conversation, tool observations, and earlier choices. The essay illustrates a game-building task split into a background and a bird: workers can misunderstand their assignments, or understand the initial request but independently choose incompatible visual styles and behaviors. A final integrator then inherits a reconciliation problem rather than two genuinely independent results.

The game example is illustrative, not a reported experimental failure rate. The deeper problem is **decision coupling**: an action changes what subsequent compatible actions should be, even if the actor never writes that choice as an explicit message.

## Mechanism as an Idea

Yan presents two principles:

1. **Share context, including full agent traces rather than isolated messages.** Tool calls, observations, and the history that produced a decomposition can contain details a short instruction omits. Copying only the original user request may still drop requirements established later.
2. **Actions carry implicit decisions.** Giving workers identical initial history does not make their future decisions compatible. Their subsequent actions can establish different assumptions without either worker observing the other.

A **single-threaded linear agent** follows one continuous action–observation history. Each new decision can see the consequences of prior choices, avoiding a class of cross-branch inconsistency without needing a separate negotiation protocol. This does not make the agent infallible; its history eventually exceeds the available window.

For longer work, a **history-compression model** condenses actions and conversation into key details, events, and decisions. Yan says identifying the indispensable information is difficult and domain-dependent, and reports that Cognition has fine-tuned a smaller model for this role. The compressor is a support model, not an independent actor choosing a competing plan. Compression extends useful continuity but does not remove the eventual context limit or prove that every needed fact survives.

The essay's practical criterion is that each action be informed by all relevant prior decisions. Seeing literally everything is an idealization; Yan acknowledges finite windows and tradeoffs in how much complexity a builder accepts to meet a reliability target.

## Experiences and Admissions

The source offers **no quantitative accuracy, cost, latency, or failure-rate comparison** for multi-agent versus single-agent designs. Its evidence consists of architectural reasoning and qualitative practitioner observations:

- **Claude Code subagents, as described in June 2025**: Yan says the main agent does not work in parallel with the subtask, and the worker usually answers a well-defined question rather than writing code. Investigative traces stay out of the main history, conserving context. These are dated third-party observations inside a first-party Cognition essay, not present-day product guarantees.
- **Edit-apply models**: Yan describes a **2024** practice in which a large model explains an edit and a smaller model rewrites the file. Slight ambiguity at that interpretation boundary can produce the wrong change. At the article's **June 2025** publication, he says deciding and applying edits are more often combined in one model action. This is a historical design example, not a measured error reduction or a claim about every editing system.
- **Cross-agent negotiation**: Yan argues that contemporary agents do not reliably conduct the proactive, long-context discourse humans use to resolve conflicting work. He is optimistic that better communication can eventually enable more parallelism, but provides neither a validated protocol nor a performance result.

The author explicitly allows that Cognition's theories are imperfect and expects them to change. His prediction that multi-agent coordination improves as single-threaded agents become better human communicators is a hypothesis, not demonstrated evidence.

## Analyst Takeaways

1. **Starting-context inheritance and ongoing coordination solve different problems.** A copied parent history can preserve the initial interpretation while leaving later incompatible decisions invisible. Establish shared constraints and ownership before parallel action, and reconcile consequential changes before dependent work proceeds.
2. **A summary's value depends on what the next actor must decide.** Losing a discarded option, a discovered constraint, or an implicit design commitment can matter more than losing several routine search steps. Preserve decision-relevant evidence and a way to reopen the original trace; full trace sharing is not automatically the best context policy.
3. **Separate bounded investigation from competing execution.** A question-answering worker can shard research without independently changing a coupled artifact. Read-only work still needs evidence-level scrutiny because a faulty finding can steer the owner's next action.
4. **Interpret the title by workload, not as a universal ban.** [Anthropic's research-system account](/dossiers/anthropic-multi-agent-research.md), published **June 13, 2025**, takes the opposite promotional stance: separately contextualized parallel searches and compressed handoffs can improve broad research. Yet it also admits that tightly coupled coding and shared-context tasks fit less well. The accounts differ in workload and evidentiary basis; neither demonstrates a cost-adjusted universal winner. Cognition foregrounds continuity of shared decisions, while Anthropic deliberately purchases evidence breadth and context sharding with more tokens and integration work.
5. **Controlled evidence supports conditional alignment rather than either slogan.** [The scaling study](/dossiers/science-scaling-agent-systems.md) compares standardized architectures and finds Finance-Agent gains but severe PlanCraft losses. That supports the need to inspect decomposition and coordination cost, without validating Yan's universal 2025 claim or certifying independent-review workflows.

## Questions and Limitations

- What level of trace access prevents omission without introducing overload, anchoring, or untrusted observations? The essay advocates full traces but does not compare that policy with targeted evidence retrieval.
- How can a compressor demonstrate that it retained the decisions future work depends on? Cognition's reported fine-tuning is not accompanied by a dataset, retention metric, or controlled ablation.
- Does one decision owner with scoped parallel evidence gathering preserve continuity at acceptable latency? The article motivates the boundary but does not evaluate it.
- Context continuity is not the same as independent judgment, file isolation, or authorization. Sharing every prior rationale with a reviewer could undermine the independence sought from that reviewer; the essay does not test this tradeoff.
- The examples and skepticism reflect models and products in mid-2025. Later implementation changes do not invalidate the decision-coupling failure mode, but do invalidate reading those product descriptions as current facts.

## Vault Ideas Extracted

* [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md)
* [Subagent Context Inheritance Modes](/vault/subagent-context-inheritance-modes.md)
