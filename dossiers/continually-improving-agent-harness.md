---
type: Study Note
title: Continually Improving Our Agent Harness
description: Personal study notes on Cursor's practice of evolving a coding-agent harness through dynamic context, layered evaluation, tool reliability work, and model-specific adaptation.
resource: https://cursor.com/blog/continually-improving-agent-harness
source: https://cursor.com/blog/continually-improving-agent-harness
tags: [agent-harness, coding-agents, context-engineering, evaluation, reliability, agents]
timestamp: 2026-07-13T16:02:28Z
---

# Continually Improving Our Agent Harness - Study Notes

**Authors**: Stefan Heule and Jediah Katz  
**Publisher**: Cursor Blog  
**Date**: April 30, 2026  
**Format**: Engineering blog post; describes Cursor's internal agent-harness practices

## What It Is

Cursor presents the agent harness as the product layer around a language model: the system prompt, tool interfaces, context-management policy, orchestration, instrumentation, and model-specific configuration that jointly determine how a coding agent behaves. The post describes a continual-improvement loop: form a product hypothesis, test it with offline and online signals, then retain small changes that demonstrably improve the combined model-and-harness system.

The emphasis is operational rather than algorithmic. Large improvements occasionally appear, but the reported practice is to compound many small optimizations in context provision, evaluation, reliability, and model adaptation.

## Evolving the Context Window

Cursor describes moving away from a heavily guarded, static initial context. Earlier versions injected broad codebase information and imposed guardrails such as automatically surfacing lint/type errors, expanding narrow file reads, and limiting tool calls. As models improved at selecting their own context, the harness retained only useful static state—such as OS, Git status, and current/recent files—and exposed more dynamic ways for the agent to fetch information while working.

The important design shift is not "less context" but **agent-controlled, on-demand context**. The harness can make past conversations, active terminal sessions, and relevant tools available without forcing all of them into every initial prompt.

## How Harness Changes Are Assessed

The post argues that a benchmark alone is insufficient because it only approximates product use. Cursor combines:

1. **Offline evaluation**: public benchmarks and its internal CursorBench suite provide a fast, repeatable comparison across harness versions.
2. **Online experiments**: concurrent harness variants are A/B tested on real use. Latency, token efficiency, tool-call count, and cache-hit rate are monitored, but treated as directional rather than ultimate quality measures.
3. **Outcome proxies**: the reported "Keep Rate" measures how much agent-authored code remains in a user's codebase after fixed intervals. An LLM also classifies the user's next response for satisfaction signals, distinguishing, for example, onward feature work from a pasted stack trace.

This combination can invalidate plausible ideas. The authors give a case where a more expensive summarization model had negligible quality impact and was not worth its added cost.

## Tracking and Repairing Tool Degradations

Tool failures are treated as a major harness surface. A failed call can be self-corrected, but its error message remains in the context, consumes tokens, and may cause "context rot"—later decisions degrade because the conversation has accumulated mistakes.

Cursor classifies errors rather than treating all failures identically. Unknown errors are considered harness bugs. Expected errors are typed by cause: `InvalidArguments` and `UnexpectedEnvironment` represent model mistakes or context contradictions; `ProviderError` covers external tool/vendor outages; `UserAborted` and `Timeout` cover other expected categories.

The alerting policy follows the taxonomy. Unknown error rates have fixed thresholds, while expected-error alerts use anomaly detection against a baseline specific to each tool and model. A weekly automation searches logs for new or spiking issues and creates or updates investigated backlog tickets. The authors report an order-of-magnitude reduction in unexpected tool-call errors during a focused reliability sprint.

## Model-Specific Harnesses and Switching

The underlying abstractions are model-agnostic, but the deployed harness is customized deeply per model and model version. A concrete example is file-editing format: OpenAI models are trained with patch-oriented edits and Anthropic models with string replacement. Either interface may work, but using the familiar one is reported to reduce reasoning overhead and mistakes.

For a newly available model, Cursor starts from the closest existing harness, uses offline evaluations and internal use to expose failure modes, and iterates on prompts, tools, and behavior before shipping. The post calls out a model-specific "context anxiety" behavior—refusing or hedging as context fills—that prompt changes reduced.

Mid-conversation model changes are difficult because the new model receives a history produced under another model's prompts and tool shapes. Cursor swaps to the target harness and adds takeover instructions, including warnings not to invoke tools mentioned in history but unavailable to the new model. Switching also causes a provider/model-specific cache miss. Conversation summarization can mitigate that cost, but may discard critical task detail; for complex work, the article recommends remaining on one model or using a fresh-context subagent.

## My Takeaways

1. **The harness is a controllable product surface.** Model capability is necessary but not enough: context availability, tool ergonomics, recovery behavior, and orchestration can change the realized system substantially.
2. **Measure durable outcomes as well as fast proxies.** Tool count and latency matter, but code retention and the semantic shape of follow-up interactions are closer to whether the agent actually helped.
3. **Reliability telemetry protects reasoning quality.** Tool errors are not just operational incidents; they contaminate the model's active context. Typed errors and per-model baselines make degradation diagnosable.
4. **Model portability should preserve behavioral fit, not uniformity.** A common abstraction can coexist with model-specific prompts and tool formats. Forcing one interaction style across models may waste tokens and increase failure rates.
5. **Model switching is a context-translation problem.** The target model inherits a history, tool vocabulary, and cache state it may not recognize. A cleanly scoped subagent can be safer than transferring a long, mixed-model conversation.

## Questions and Limitations

- This is a product-engineering narrative, not a controlled study. It does not publish experimental designs, confidence intervals, or the absolute levels of its quality metrics.
- Keep Rate is a useful delayed proxy, but retained code can reflect user inertia, later unobserved defects, or a task that did not require changes. It should complement, not replace, direct correctness and user-study measures.
- LLM interpretation of follow-up messages introduces an evaluator model and classification bias. Its calibration, audit sampling, and disagreement handling are not described.
- The article says per-model adaptation improves efficiency and correctness but does not quantify each customization's effect or its maintenance cost as the model catalog grows.
- Dynamic context increases agent autonomy, but the selection and access policies need safety boundaries so that past chats, terminals, and tools are retrieved only when relevant and authorized.

## Vault Ideas Extracted

* [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md)
* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
