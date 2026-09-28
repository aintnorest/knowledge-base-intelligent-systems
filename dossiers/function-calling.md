---
type: Study Note
title: Function Calling
description: Study notes on the model-proposes, application-authorizes boundary in tool use, including validation, side effects, and feedback into later model turns.
resource: https://developers.openai.com/api/docs/guides/function-calling
source: /archive/function-calling.html
tags: [agents, tool-use, prompting, verification]
timestamp: 2026-07-30T18:10:00Z
---

# Function Calling - Study Notes

**Source**: OpenAI API documentation capture  
**Canonical URL**: https://developers.openai.com/api/docs/guides/function-calling

## What It Is

Function calling lets an application expose bounded capabilities to a model. The model can propose an action in structured form; the application checks whether it is permitted, executes it if authorized, and returns an observation so the model can continue or answer.

The core boundary matters: the model selects and proposes an action, but the application owns authorization, argument validation, execution, result shaping, and side effects.

## Workflow

1. Expose narrow capabilities with enough description for the model to choose among them.
2. Treat the proposed action and its arguments as untrusted output.
3. Check that the action is authorized and its inputs fit application policy.
4. Execute only after that decision, within the host's actual permissions.
5. Associate the returned observation with the action before asking the model to continue.

Choice and concurrency controls affect orchestration, but structured requests alone do not remove the need for host-side checks.

## Design Principles

- Make tools small, explicit, and capability-scoped; do not expose a catch-all executor.
- Treat tool arguments as untrusted model output, even when schema-valid.
- Return minimal, structured observations rather than hidden state or raw credentials.
- Keep confirmation and idempotency policies in the application for actions with external effects.
- Record inputs, decisions, tool calls, and results so failures can be reproduced and audited.

## Limitations

This is a documentation capture, not a frozen behavioral guarantee. Model behavior and tool-control semantics can change; the canonical source governs current implementation details.

## Analyst Takeaways

1. **Structure is not authorization.** Well-formed arguments may still be unsafe, stale, or outside the user's intent.
2. **Keep planning separate from execution.** A function call is a request for a host decision, not permission to act.
3. **Design the return channel deliberately.** Tool outputs are part of the next prompt and should be bounded, typed, provenance-aware, and safe to expose.
4. **Test the whole loop.** Evaluate tool selection, invalid arguments, retries, partial failures, confirmations, and result-grounded final answers.
