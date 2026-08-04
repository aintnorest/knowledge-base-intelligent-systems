---
type: Synthesis
title: Capability-Enforced Agent Execution
description: A reference-monitor pattern that propagates data provenance and permitted-reader capabilities through an agent runtime, then checks them at every consequential tool call.
tags: [agent-security, access-control, prompt-injection, tool-use, agents]
timestamp: 2026-07-14T16:09:17Z
---

# Capability-Enforced Agent Execution

Capability-enforced agent execution makes tool use conditional on machine-checkable authority, rather than asking an LLM to remember a security policy. Values in the agent runtime carry provenance and reader/recipient permissions; a policy reference monitor examines both an argument and its transitive dependencies immediately before a tool creates an external effect.

## Operating Pattern

1. **Define protected sinks.** Enumerate actions that send, publish, alter, delete, transfer, or grant access to data.
2. **Attach authority at sources.** Label user-provided literals, retrieved records, tool outputs, and transformations with a source and permitted readers or other task-relevant rights.
3. **Propagate dependencies.** Preserve labels through data transformation and through control dependencies where a branch choice can encode sensitive information.
4. **Check each call locally.** State a policy per sink: for example, a recipient must be user-specified, and every recipient must be authorized to read the message body and attachments.
5. **Fail closed or request meaningful approval.** Block a denied action by default. If declassification is allowed, present the actual data source, destination, and consequence to a user who can make an informed decision.
6. **Audit and test the enforcement surface.** Log capability decisions and adversarially test parser output, exception paths, multi-step transformations, tool adapters, and policy changes.

## Why It Matters

An isolated planning model can prevent untrusted text from selecting a new tool sequence, yet still pass attacker-controlled values into a planned `send`, `share`, or `transfer` operation. Capabilities preserve enough provenance at the action boundary to distinguish “the user asked to share this with this recipient” from “an untrusted document supplied both the recipient and the secret.”

This is a reference-monitor design: its security promise depends on complete mediation at consequential tools and on correct policy definitions, not on whether a model recognizes adversarial prose. It can therefore complement model-level prompt-injection defenses rather than replace them.

## Practical Use

- Start with a short list of high-impact sinks and a minimal label vocabulary—such as trusted user input, untrusted tool data, and allowed readers—before attempting general semantic policy.
- Make rights concrete. An email policy can check recipient authorization for each attachment and text field; a file-sharing policy can require the target address to be user-originated.
- Treat derived data as protected when it may reveal protected inputs. Do not strip a label merely because the value was formatted, summarized, or selected by a model.
- Design approval prompts as a scarce declassification channel. Generic “continue?” dialogs cause habituation and can silently become the system's weakest policy.

## Limitations

- A label system cannot protect against rights it never models, policies that are over-broad, compromised tool adapters, or a missing enforcement point.
- Correct propagation through exceptions, branches, loops, timing, and shared resources is difficult; direct-flow checks alone can miss side channels.
- Authority metadata and user identity are often incomplete for web, SaaS, and third-party tools, increasing either false blocks or unsafe assumptions.
- This pattern limits unauthorized effects, not necessarily deceptive text displayed to a user or benign-looking sequences that are individually authorized but harmful in aggregate.

## Sources

- [Defeating Prompt Injections by Design dossier](/dossiers/defeating-prompt-injections-by-design.md) — CaMeL propagates provenance and allowed-reader capabilities through a restricted interpreter, enforcing per-tool policies in AgentDojo.
- [Parallax: Why AI Agents That Think Must Never Act dossier](/dossiers/parallax-architecturally-safe-autonomous-execution.md) — proposes executor-side sensitivity tags that propagate through agent operations and are checked before writes or network egress; the implementation and results are author-reported.
