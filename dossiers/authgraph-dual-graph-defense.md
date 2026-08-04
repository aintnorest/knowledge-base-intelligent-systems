---
type: Study Note
title: 'Aligning Provenance with Authorization: A Dual-Graph Defense for LLM Agents'
description: Study notes on AUTHGRAPH, a prompt-injection defense that aligns an execution-provenance graph with a clean, least-privilege authorization graph down to parameter sources.
resource: https://arxiv.org/abs/2605.26497v1
source: /archive/authgraph-dual-graph-defense.pdf
tags: [agent-security, prompt-injection, provenance, tool-use, access-control, agents]
timestamp: 2026-07-14T16:21:42Z
---

# AUTHGRAPH — Study Notes

**Authors**: Peiran Wang, Ying Li, and Yuan Tian
**Venue**: arXiv:2605.26497v1 [cs.CR]
**Pages**: 19

## What It Is

AUTHGRAPH is a runtime defense for indirect prompt injection in tool-using LLM agents. It compares two deliberately different artifacts: an **authorization graph** planned in a clean context from only the user request and tool catalog, and an **injected reasoning graph** (IRG) reconstructed from the actual, potentially manipulated trajectory. Its checker aligns the planned and observed tool sequences, then verifies the allowed origin of security-critical parameter values.

The useful distinction is between a permitted tool with a bad value and an unauthorized tool. A user may authorize `book_flight`, but a flight identifier observed in a hotel listing should not be allowed to fill that tool's `flight_id`. AUTHGRAPH attempts to make this distinction explicit through per-parameter source policies rather than treating syntactic validity or the tool name as sufficient authorization.

## Problem and Threat Model

An indirect injection embedded in an email, webpage, file, or other tool observation can alter control flow by adding a tool call, or data flow by supplying a value to an otherwise expected call. The paper assumes the attacker cannot change the original user instruction, system prompt, or tool definitions; the defender can instrument the agent runtime and access its complete trajectory. It does not address text-only output attacks, same-observation corruption of the intended authoritative source, or cases where the user explicitly delegates trust to an observation (for example, “do what the email says”).

The latter boundary matters. If a user directs the agent to use a value from a named observation, an attacker who changes that source can produce the same observable tool sequence and parameter-source type as a benign trace. The authors frame that as a user trust delegation outside an authorization-enforcement guarantee, not as a detectable injection under their representation.

## How AUTHGRAPH Works

1. **Plan an authorization graph in a clean context.** A Planner sees only the user prompt and tool catalog. It produces an expected tool sequence, a tool whitelist, and a `ParamPolicy` for every security-critical parameter of write-class tools. A policy can require a literal user-prompt value, a direct or semantic derivation from specified tool observations, or allow any value.
2. **Build an injected reasoning graph from the real trajectory.** A Graph Builder sees the full ReAct-style trace and records input, observation, decision, and intermediate nodes with `DERIVE`, `EXTRACT`, and `INVOKE` edges. It is intentionally not trusted to be injection-immune: a manipulated attribution is useful only when compared with the independent plan. The fixed `INVOKE` signature yields an ordered list of observed calls.
3. **Align the graphs in three layers.** A linear dual-pointer traversal first hard-blocks calls after the authorization sequence is exhausted and outside the authorized set. For other tool-name deviations, a constrained LLM check labels an extra read-only helper, a skipped step, or a suspicious deviation. Matching calls receive parameter-source checks.
4. **Check source-restricted values against raw evidence.** For a direct observation value, the checker first searches the original observations from only the policy's declared `source_tools`; it falls back to an LLM judgment only when needed. The paper reports that this string-match-first strategy avoids about 60% of LLM parameter-check calls. Checking raw observations rather than the Graph Builder's summaries prevents a poisoned attribution from becoming the enforcement evidence.
5. **Bound adaptation with replanning.** A planned step can trigger a replan after an observation. The resulting subgraph is constrained both by a prompt-level list of allowed tools and a programmatic verification that all generated steps stay within that whitelist.

## Evidence and Results

On AgentDojo, the reported GPT-4o results are attack success rate (ASR) **0.01** and utility rate (UR) **0.76**, compared with 0.40 ASR / 0.79 UR without a defense. On AgentDyn, the GPT-4o result is 0.02 ASR / 0.51 UR, compared with 0.39 / 0.53 undefended. These are benchmark results under the authors' selected models and threat boundaries, rather than a general security proof.

The ablation is particularly informative: on AgentDojo with GPT-4o, removing the hard block, tool-name check, or parameter check raises ASR from 0.01 to 0.12, 0.21, and 0.18 respectively, while reported utility remains between 0.76 and 0.79. This supports the claim that the layers cover distinct attack paths, including attacks that use an allowed tool with a wrong-source value.

The reported total AgentDojo overhead is 9.93 seconds and 47.4K tokens per task, versus 5.32 seconds and 11.2K tokens for the baseline (1.87x time and 4.23x tokens). The authorization graph, checker, and reasoning graph account for 2.20, 1.33, and 1.12 seconds respectively; the evaluation therefore presents a concrete security–latency–token trade-off rather than an enforcement mechanism with negligible cost.

## Analyst Takeaways

1. **Authorization needs a source contract for important arguments.** “This call is permitted” does not imply every value acceptable to that call is permitted. Specify which upstream tool or user literal is authoritative for recipient IDs, destinations, credentials, product IDs, and other consequential fields.
2. **Separate descriptive provenance from the policy baseline.** A trace graph produced after exposure to hostile text is useful telemetry, but should not define what the agent is allowed to do. Generate the authorization reference from a clean context and use raw runtime evidence for enforcement.
3. **Make dynamic plans narrow extensions, not blank checks.** Replanning can preserve utility in observation-dependent workflows, but the newly generated tools must be restricted to a prior least-privilege envelope and checked before execution.
4. **Layer deterministic checks before semantic judgment.** Tool set membership and source-specific string witnesses are cheap, inspectable controls. Reserve LLM judgment for helper-step relevance or nonliteral derivations, where a hard rule cannot express the task.

## Questions and Limitations

- A source-policy check cannot detect corruption within the authorized source itself. If a compromised flight-search response contains the malicious code, `source_tools = [search_flights]` will approve it.
- The IRG still depends on an LLM's ability to reconstruct attribution. Errors can create false positives and, where they bypass a parameter check, false negatives. The system's clean planner does not make its trace instrumentation trustworthy by itself.
- The work targets single-agent trajectories. Cross-agent messages introduce additional provenance edges and authorization boundaries that the design does not model.
- The tool-name layer and some parameter fallbacks remain LLM judgments. Their prompts narrow the task, but the paper does not establish robustness against adaptive attacks on those judges or on the graph-building interface.
- Excluding user-authorized observation consumption is a meaningful limitation for practical agents. It represents a real trust-boundary decision that needs complementary content validation, reputation checks, or user confirmation when the source may be compromised.

## Vault Ideas Extracted

* [Authorization–Provenance Graph Alignment](/vault/authorization-provenance-graph-alignment.md)
