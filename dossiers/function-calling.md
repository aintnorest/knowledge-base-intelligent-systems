---
type: Study Note
title: Function Calling
description: Study notes on the captured OpenAI API guide for giving models JSON-Schema-described tools, executing requested calls in application code, and returning tool outputs to continue the response.
resource: https://developers.openai.com/api/docs/guides/function-calling
source: /archive/function-calling.html
tags: [agents, tool-use, prompting, verification]
timestamp: 2026-07-30T18:10:00Z
---

# Function Calling - Study Notes

**Source**: OpenAI API documentation capture  
**Canonical URL**: https://developers.openai.com/api/docs/guides/function-calling

## What It Is

Function calling lets an application give a model a set of tools described with JSON Schema. The model can return a structured tool-call request; the application validates and executes that request, then supplies the tool result back to the model so it can continue or produce a user-facing answer.

The core boundary matters: the model selects and proposes an action, but the application owns authorization, argument validation, execution, result shaping, and side effects.

## Workflow

1. Define narrow tool names, descriptions, and schemas.
2. Send tools with the model request and inspect output for function calls.
3. Validate the requested name and arguments against application policy and schema.
4. Execute only authorized tools in the host environment.
5. Return tool outputs associated with their call IDs, then let the model synthesize the next response.

The guide covers controls such as tool choice, parallel calls, strict-schema behavior, and programmatic tool invocation. These affect request shape and orchestration; they do not remove the need for host-side checks.

## Design Principles

- Make tools small, explicit, and capability-scoped; do not expose a catch-all executor.
- Treat tool arguments as untrusted model output, even when schema-valid.
- Return minimal, structured observations rather than hidden state or raw credentials.
- Keep confirmation and idempotency policies in the application for actions with external effects.
- Record inputs, decisions, tool calls, and results so failures can be reproduced and audited.

## Limitations

This is a documentation capture, not an API contract frozen in time. Model behavior, SDK interfaces, supported schema features, and control semantics may change. The archived HTML preserves the local source and assets; use the canonical documentation URL for current implementation details.

## Analyst Takeaways

1. **Schema is interface documentation, not authorization.** Valid JSON may still be unsafe, stale, or outside the user's intent.
2. **Keep planning separate from execution.** A function call is a request for a host decision, not permission to act.
3. **Design the return channel deliberately.** Tool outputs are part of the next prompt and should be bounded, typed, provenance-aware, and safe to expose.
4. **Test the whole loop.** Evaluate tool selection, invalid arguments, retries, partial failures, confirmations, and result-grounded final answers.
