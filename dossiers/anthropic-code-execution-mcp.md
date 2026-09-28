---
type: Study Note
title: "Code execution with MCP: Building more efficient agents"
description: Anthropic's design for exposing tools as discoverable code APIs so agents compose operations and reduce context transfer, with explicit execution-security costs.
resource: https://www.anthropic.com/engineering/code-execution-with-mcp
source: /archive/anthropic-code-execution-mcp.html
tags: [agents, mcp, tool-use, context-engineering, token-efficiency, sandboxing]
timestamp: 2026-09-28T18:38:44Z
---

# Code execution with MCP: Building more efficient agents — Study Notes

**Publisher**: Anthropic  
**Date**: November 4, 2025

## What It Is

A proposal to shift tool composition from the model's direct tool-call loop into an execution environment. Tool APIs can be represented as discoverable files or searched on demand, and agent-written code chains selected tools, transforms results, and sends only needed observations back to the model. This treats context as scarce while retaining source data outside the model's working window.

## Mechanism and Evidence

The article's example shrinks loaded tool definitions from 150,000 to 2,000 tokens, a claimed 98.7% reduction for that illustrative selection rather than a measured average across workloads. A full meeting transcript otherwise enters the model context on retrieval and again when copied into a second tool call; local code can forward it directly. Likewise, large tables can be filtered or aggregated before the agent sees a few relevant rows. Loops and conditional branches execute without paying a model round trip at each step. Persisted intermediate artifacts and reusable functions extend the pattern beyond a single call.

A proposed privacy extension tokenizes sensitive fields at the tool boundary, letting execution code pass opaque tokens between authorized tools while the model sees placeholders. This requires a trustworthy client-side token map and flow policy; merely logging less information is not equivalent to preventing code from reading or sending secrets.

## Tradeoff and Limits

Generated code enlarges the security boundary. It needs confinement, resource limits, monitoring, and mediation of external tool effects, whereas direct tool calls can expose a smaller set of individually authorized operations. On-demand interfaces save prompt space but can spend tool calls discovering definitions; the article does not provide an end-to-end latency or success-rate comparison across tasks. Its privacy and execution sketches are architectural examples, not independently validated leakage or safety measurements.

## Analyst Takeaways

Use executable composition when intermediate data volume or multi-step tool control dominates context and latency. Keep authorization at the real tool-effect boundary even if the agent calls through locally generated code; otherwise compact context is bought by silently expanding authority. Tool discovery and result reduction are separate levers: one avoids loading irrelevant schemas, the other avoids shipping intermediate data through the model.

## Vault Ideas Extracted

* [Executable Code Actions](/vault/executable-code-actions.md)
* [File-Native Context Retrieval](/vault/file-native-context-retrieval.md)
* [Bounded Tool Observations](/vault/bounded-tool-observations.md)
