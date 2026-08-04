---
type: Study Note
title: AXI: Agent eXperience Interface
description: Personal study notes on AXI's ten design principles for token-efficient, discoverable command-line interfaces for agents and its browser and GitHub benchmark claims.
resource: https://axi.md/
source: https://axi.md/
tags: [agent-harness, tool-use, mcp, token-efficiency, agents]
timestamp: 2026-07-13T16:13:34Z
---

# AXI: Agent eXperience Interface - Study Notes

**Author**: Kun Chen  
**Format**: Design framework, reference implementations, and benchmark report  
**Scope**: Agent-facing command-line interfaces, evaluated with GitHub and browser-automation tasks

## What It Is

AXI (Agent eXperience Interface) is a proposed set of ten principles for designing command-line tools that agents can use with low context cost and fewer discovery steps. Its central claim is that the important choice is not CLI versus MCP as a protocol; it is whether the interface gives an agent concise, actionable observations and combines the operations that routinely occur together.

The project supplies `gh-axi`, an agent-oriented wrapper around GitHub's `gh` CLI, and `chrome-devtools-axi`, a wrapper around Chrome DevTools MCP. It also publishes a catalog of third-party AXI-style tools. The source describes 490 browser-automation runs across seven interface conditions and a separate 425-run GitHub benchmark. Those are project-reported evaluations, not independent replications.

## Motivation: Tool Calls Are Also Context Design

The source identifies three recurring interface costs:

1. **Separated action and observation.** A conventional browser CLI may make an agent navigate, wait, and request a snapshot as separate commands. The agent incurs a turn and must reconstruct state between each operation.
2. **Schema and result overhead.** Direct MCP use can place many tool schemas in context and pass large intermediate results through the model. AXI reports 185K average input tokens per browser task for its MCP conditions versus 79K for AXI, but that comparison is limited to its evaluated implementation and model.
3. **Poor discovery.** A tool that returns only a completion acknowledgement, generic help, or ambiguous empty output forces the agent to guess its next command or spend a turn inspecting help.

AXI treats these as interface-design problems. The tool should return just enough structured state for the next decision and make the likely next action visible without flooding the conversation.

## The Ten Principles

| Area | Principles | Practical interpretation |
| --- | --- | --- |
| Efficiency | token-efficient output; minimal default schemas; content truncation | Use a compact unambiguous representation; return roughly the few fields needed for a list; state when content is truncated and expose `--full` or explicit field selection. |
| Robustness | pre-computed aggregates; definitive empty states; structured errors and exit codes | Return counts and derived status inline, say explicitly when there are zero results, and make mutations idempotent and failures machine-distinguishable. |
| Discoverability | ambient context; content first | Offer a small opt-in session integration or loadable Skill, and make a no-argument invocation show useful current state rather than only a command reference. |
| Guidance | contextual disclosure; consistent help | End results with concrete command templates for logical next steps, while retaining concise `--help` at every level. |

The output examples use TOON, a compact tabular notation. Its value is not the particular notation so much as a stable, low-noise contract: default results are bounded; optional detail is explicitly requested; and the output contains counts, state, and recovery information that prevent needless round trips.

## Fused Operations and Filtered Observations

The most consequential AXI pattern is an **action-observation fusion**. A command such as `open` navigates and returns a snapshot; `fill --submit` fills, submits, waits, and returns the result; `click --query` both follows a link and filters the resulting snapshot for the requested terms. Specialized commands such as `tables --url` can navigate and return structured table data in one operation.

This differs from merely exposing lower-level capabilities. The command boundary is shaped around an agent's next decision, so a successful action provides immediate evidence of the resulting state. A `--query` option can further constrain the observation to the evidence relevant to that decision rather than emit a full accessibility tree.

## Reported Evaluation

For 14 public, read-only browser tasks run five times per condition with Claude Sonnet 4.6 as both agent and judge, AXI reports that `chrome-devtools-axi` achieved 100% task success, $0.074 average cost, 21.5 seconds, and 4.5 tool turns. The closest reported cost condition, `dev-browser`, was 99% successful at $0.078 and 4.9 turns. The reported AXI advantage is attributed to specialized extraction commands, shell-side filtering, and combined operations that remove separate snapshot calls.

The separate GitHub benchmark reports 100% success at $0.050 per task for `gh-axi`, compared with 86% at $0.054 for raw `gh` and 82–87% at $0.101–$0.148 for the tested MCP conditions. One counterexample is also important: script-based browser work occasionally beat AXI on multi-site research by batching several visits, although failed scripts increased variance through write-run-debug loops.

## My Takeaways

1. **An observation is part of the action API.** An acknowledgement such as “Done” is rarely enough for an agent. Return the postcondition or the evidence needed to choose the next step.
2. **Context budgets are shaped by defaults.** A compact output format helps, but bounded schemas, truncation with an escape hatch, and targeted filtering control the far larger cost of irrelevant fields and snapshots.
3. **Useful help is trajectory-local.** A next-step template following a result is more valuable than a large global catalog because it narrows discovery after the agent has learned some state.
4. **Benchmark the whole trajectory.** Success alone masks differences in turns, tokens, latency, and recovery behavior. Conversely, average wins should be checked against task classes where batch scripting or a different interaction model is superior.

## Questions and Limitations

- The browser benchmark covers public sites, read and navigation operations, and one agent model. Authenticated applications, writes, and other model families may behave differently.
- Task success is judged by an LLM, which can introduce rubric or evaluator bias. The published source makes strong comparative claims but does not substitute for independent replication on a production workload.
- Combining operations can hide intermediate state and make recovery harder when a compound command partially fails. Fused commands need explicit postconditions, structured errors, idempotency, and lower-level escape hatches.
- A schema count alone does not determine total cost: tool selection, result sizes, host behavior, cache use, and task structure all matter. The protocol choice remains relevant when it changes those factors.

## Vault Ideas Extracted

* [Agent-Ergonomic Interface Design](/vault/agent-ergonomic-interface-design.md)
* [Action-Observation Fusion](/vault/action-observation-fusion.md)
* [Bounded Tool Observations](/vault/bounded-tool-observations.md)
