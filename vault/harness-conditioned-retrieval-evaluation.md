---
type: Synthesis
title: Harness-Conditioned Retrieval Evaluation
description: Evaluating retrieval as an end-to-end agent behavior whose quality depends jointly on retriever, model, harness, tool-result delivery, and corpus conditions.
tags: [retrieval, agent-harness, evaluation, tool-use, context-engineering, agents]
timestamp: 2026-07-14T16:02:15Z
---

# Harness-Conditioned Retrieval Evaluation

Retrieval quality in an agent system is an interaction outcome, not a property of sparse or dense ranking alone. A harness decides how the agent is prompted, what tools it sees, how observations are shaped, and when it stops. Result delivery adds another policy: evidence can be injected into the active context or stored behind a path that the agent must navigate. Evaluate the resulting agent behavior, not just the retriever in isolation.

## Evaluation Pattern

1. Hold the source corpus, oracle evidence, task set, and answer grader fixed.
2. Vary the candidate retrievers with the deployed model and each target harness.
3. Test the whole delivery path: inline result messages, bounded summaries, and any file- or artifact-based expansion workflow.
4. Sweep workload conditions that change evidence shape, such as paraphrase versus exact identifiers, history length, distractor ratio, and multi-source support.
5. Record final task success alongside retrieval traces, query counts, tool errors, retrieved tokens, latency, and cost; mark stochastic sampling and missing conditions.

## Practical Use

Use lexical search as a serious baseline when a workload depends on exact identifiers, dates, literals, or rare terms, and use dense or hybrid retrieval where paraphrase and conceptual similarity matter. Do not promote either result across models or agent frameworks until it survives the target harness and tool transcript. If a file-based result path lowers quality, inspect whether the failure is retrieval, artifact discovery, reading, integration, or stopping rather than changing the index first.

## Limitations

An end-to-end score can show that a configuration works without identifying the causal mechanism. Harnesses and provider CLIs can be opaque and change over time, while repeated agent runs and multiple graders may be needed to separate a real interaction from sampling variance. A benchmark's evidence distribution also limits transfer: literal conversational recall does not represent every retrieval workload.

## Sources

- [Is Grep All You Need? How Agent Harnesses Reshape Agentic Search dossier](/dossiers/grep-agent-harnesses-agentic-search.md) — compares grep and vector retrieval over LongMemEval across custom and provider-native harnesses, inline and file-based delivery, and distractor-history limits; observed rankings vary with the stack.
