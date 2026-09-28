---
type: Study Note
title: "Code Mode: the better way to use MCP"
description: Cloudflare's conversion of MCP tools to a typed programming interface executed in disposable network-isolated Workers, with privileged RPC calls mediated by the agent host.
resource: https://blog.cloudflare.com/code-mode/
source: /archive/cloudflare-code-mode-mcp.html
tags: [agents, tool-use, mcp, sandboxing, access-control, token-efficiency]
timestamp: 2026-09-28T00:00:00Z
---

# Code Mode: the better way to use MCP — Study Notes

**Publisher:** Cloudflare

## What It Is

Rather than present every MCP tool as a separate model-facing call, Cloudflare turns connected servers' tool schemas and documentation into a TypeScript interface. The model writes a program that composes calls and returns its selected output. Intermediate results can stay inside execution rather than repeatedly entering the model context. Cloudflare reports better handling of large, complex tool surfaces, but this post offers no reproducible benchmark for the broad quality claim. MCP remains the discovery, connectivity, documentation, and out-of-band authorization layer.

## The Execution Boundary

The code runs inside a fresh V8 Worker isolate for each snippet, not inside the privileged agent loop. In the described Code Mode design, arbitrary network functions are blocked and the sandbox receives only RPC bindings for connected MCP servers. Calls travel back through the agent supervisor, which holds credentials and dispatches to the MCP service. The interface grants *the operation* without giving generated code the bearer token. The host therefore controls both what is reachable and which server operations are visible; the sandbox's apparent TypeScript objects are remote authority, not ordinary local libraries.

Cloudflare contrasts this with HTTP allowlists: permitted addresses alone do not define permitted actions, and auditing a generic HTTP proxy requires understanding request semantics. The code-facing interface is also more legible to a model than many unfamiliar special tool-call formats, but that explanation is a hypothesis, not proof of the training-data mechanism.

## Limits and Reading

At publication the SDK loaded the whole converted API into context, explicitly leaving dynamic search or browsing of huge APIs as future work. Cheap isolate creation makes snippet-level disposal feasible, but the runtime is still JavaScript-oriented and the full security guarantee depends on correct host-side bindings and the isolate stack. Keeping keys hidden does not prevent misuse of *authorized* calls or leakage of readable data through an allowed service. The post describes the Worker Loader as a production beta at that time; later availability should be checked separately.

## Analyst Takeaways

Code execution is a useful tool-interface compression technique only when its authority is constrained outside the generated program. A typed capability surface shrinks ambiguity for both the agent and its policy reviewer; the trust boundary is the mediator that implements each RPC, not the TypeScript declaration itself.

## Vault Ideas Extracted

* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
* [Tool-Use Protocol Tax](/vault/tool-use-protocol-tax.md)
