---
type: Synthesis
title: Control-Data Plane Separation for Agents
description: An agent-security architecture that confines untrusted content to structured parsing while a privileged planner determines the allowed action structure and a separate runtime mediates effects.
tags: [agent-security, prompt-injection, tool-use, access-control, agents]
timestamp: 2026-07-14T16:09:17Z
---

# Control-Data Plane Separation for Agents

Control-data plane separation keeps untrusted content from changing an agent's action structure. A privileged planner sees only the trusted request and writes a bounded plan; an unprivileged parser can turn selected untrusted content into a declared typed schema but cannot call tools. A deterministic runtime, not either model, decides whether the resulting values may cross an action boundary.

## Architecture

1. **Trusted control plane.** Give the planner the user's request, available tool signatures, policy-relevant constraints, and no raw retrieval/tool output.
2. **Untrusted data plane.** Give a quarantined parser only the retrieval material necessary for one extraction task and a narrow output schema. Remove tool access and do not route parser prose back to the planner as instructions.
3. **Typed handoff.** Request fields such as an email address, document identifier, date, or classification—not a free-form plan, tool name, or arbitrary argument dictionary.
4. **Mediated execution.** Execute the planner's restricted program in a runtime that validates types, records dependencies, and authorizes every consequential call under policy.
5. **Safe recovery.** Redact error content influenced by untrusted data, avoid treating it as planner feedback, and preserve state/retry semantics so repairs cannot duplicate side effects.

## What It Prevents—and What It Does Not

The separation stops a retrieved page from directly convincing a tool-capable model to call a different tool or follow a different sequence. It is stronger than surrounding a tool result with delimiters because the privileged planner does not receive the hostile text at all.

It does not make extracted data trustworthy. A malicious source can still supply an attacker address, a sensitive filename, or a value that changes the result of an allowed operation. Nor can it safely fulfill requests whose very meaning is “read untrusted instructions and decide what actions to take”; that request deliberately turns data into control flow. Use explicit capability/policy checks, user confirmation, or a redesigned task contract for those cases.

## Practical Use

- Use schemas that name the smallest legitimate data object; reject schemas that include `tool_name`, executable code, arbitrary URLs, or free-form parameters unless a policy layer constrains them.
- Keep the planner's visible context auditable. A plan should be explainable as a transformation of the trusted request and published tool contract, not of opaque retrieval.
- Treat retries and exception messages as cross-plane channels. A parser-controlled failure that changes whether an observable action occurs can leak a protected bit or steer the planner.
- Measure the price of separation: some tasks become impossible without user clarification, complete API schemas, or a richer mediated operation. Those failures identify an interface contract gap, not just a model weakness.

## Limitations

- The boundary relies on correct isolation, restricted schemas, runtime enforcement, and tools that do not themselves smuggle untrusted instructions into the control plane.
- Strict dependency tracking may over-taint values and increase user confirmations; loose tracking risks implicit-flow and side-channel leaks.
- A privileged planner can still misunderstand a trusted request, and the arrangement does not validate truthfulness or quality of a parser's extracted data.
- The pattern is a systems architecture, not a formal proof of a particular implementation; security claims must state the threat model and test the actual tool/runtime combination.

## Sources

- [Defeating Prompt Injections by Design dossier](/dossiers/defeating-prompt-injections-by-design.md) — CaMeL implements privileged planning, quarantined structured parsing, restricted code execution, and documents data-to-control and side-channel limitations.
