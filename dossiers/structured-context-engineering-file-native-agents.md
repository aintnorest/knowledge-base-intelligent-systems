---
type: Study Note
title: Structured Context Engineering for File-Native Agentic Systems
description: Personal study notes on an experiment comparing file-native and prompt-injected schemas, four schema formats, model tiers, and partitioned navigation for agentic text-to-SQL.
resource: https://arxiv.org/abs/2602.05447v2
source: /archive/structured-context-engineering-file-native-agents.pdf
tags: [context-engineering, retrieval, token-efficiency, agents, tool-use]
timestamp: 2026-07-13T18:04:21Z
---

# Structured Context Engineering for File-Native Agentic Systems — Study Notes

**Author**: Damon McMillan (HxAI Australia)

**Venue**: arXiv:2602.05447v2 [cs.AI]

**Date**: February 2026
**Pages**: 8

## What It Is

This preprint tests how an LLM agent should receive structured system knowledge. It uses text-to-SQL as a proxy for programmatic agent work and compares a file agent—using `grep` and reads to retrieve a schema on demand—with a prompt baseline that receives the whole schema. Across 9,649 experiments, it varies 11 models, four schema serializations (YAML, Markdown, JSON, and TOON), two context architectures, and schema scales from 10 to 10,000 tables.

The central result is conditional rather than universal: file-native retrieval improved aggregate accuracy for the tested frontier and frontier-lab models, but was substantially worse in aggregate for the tested open-source models. The paper therefore treats context architecture as part of the model-specific harness, not as a generally superior replacement for prompt injection.

## The Problem It Addresses

Agents need enough structural context to generate correct operations, but injecting an entire schema can waste context and obscure the relevant relationships. File-based context promises selective retrieval and scalable navigation, yet practitioners lack controlled evidence about whether the retrieval interface, file representation, and scale actually help different models.

The paper also challenges a tempting proxy: a smaller representation is not necessarily cheaper at runtime. An agent's search behavior and the density of each tool result affect total observed tokens and tool calls.

## How the Evaluation Works

1. **Hold schema content constant.** The file and prompt conditions receive the same schema information; only file retrieval versus full prompt injection changes.
2. **Vary representation.** YAML, Markdown, JSON, and TOON describe the same schema. Agents receive generic `grep` guidance but no format-specific search examples, so the test measures native format handling.
3. **Vary capability and task complexity.** Eleven models are grouped into frontier, frontier-lab, and open-source tiers, and text-to-SQL queries span direct lookup through multi-step reasoning.
4. **Score executable results.** Generated SQL result sets are compared with ground truth using Jaccard similarity; a score of at least 0.9 counts as successful.
5. **Test navigation scale separately.** Schemas grow from 10 to 1,000 tables in one file, then use domain partitioning through 10,000 tables. The scale experiments use Claude models and measure schema navigation rather than full SQL-generation accuracy.

## Important Results

- For the combined tested frontier and frontier-lab tier (excluding Opus, which had no prompt condition), file agents scored 79.8% versus 77.1% for prompt injection: a +2.7 percentage-point difference (`p=0.029`). The tested open-source aggregate reversed direction: 64.6% for file agents versus 72.3% for prompts, a -7.7-point difference (`p<0.001`). Individual models varied: GPT-5-mini favored files by 7.7 points, while Qwen3-32B favored prompts by 21.9 points.
- Format had no significant aggregate accuracy effect (`chi-squared=2.45`, `p=0.484`). YAML, Markdown, JSON, and TOON produced 75.4%, 74.9%, 72.3%, and 72.3% aggregate accuracy respectively, but weaker models had materially larger within-model format spreads (up to 20.1 points in the reported table).
- Model capability dominated the tested interventions: frontier models averaged 86.0% accuracy, frontier-lab models 76.7%, and open-source models 64.6%. At the most complex tier, the reported frontier average remained 64% while the open-source average fell to 27%.
- Domain partitioning preserved high schema-navigation accuracy up to 10,000 tables in the Claude-only scale test. This keeps the per-query retrieved context bounded, but does not demonstrate text-to-SQL accuracy at that scale or generalization to other providers.
- YAML was the reported token-efficient file representation on the 24-table schema (12,729 tokens averaged over the models), ahead of JSON (16,320), TOON (17,625), and Markdown (20,382). TOON was about 25% smaller on disk than YAML yet used more agent tokens on average; the authors call this the **grep tax**.

## What I Take From It

1. **Context delivery is a model-capability decision.** The same information can help through agent-controlled retrieval for one model and hurt another that cannot navigate the interface reliably. Architecture choice needs the deployment model in its evaluation matrix.
2. **Optimize tool traces, not source-file size.** Compression can make each match denser and unfamiliar syntax can provoke failed searches. Runtime cost is determined by the sequence of observations and retries, not merely the bytes stored.
3. **Partitioning is a context-boundary technique.** A navigable index plus domain files can limit the context available to a task even when the total system schema grows. It still needs end-to-end accuracy, cost, and failure testing at realistic scale.
4. **Format is usually a secondary lever.** Format preferences differ by model and task ambiguity. A clear navigator and predictable search patterns are likely more actionable than assuming one serialization improves accuracy everywhere.

## Questions and Limitations

- The query bank has 100 TPC-DS-derived queries, and all core results use one run per condition. Other workloads, query constructions, tool implementations, or repeated sampling could change the effects.
- The file-agent implementation and the scale study use the Claude Agent SDK; scale results were not replicated across models, SDKs, or direct non-SQL agent tasks.
- Temperature was not uniformly controlled: the paper reports that the Claude SDK does not expose it and GPT-5 models enforce a minimum of 1. Single-run comparisons may therefore include unmeasured variance.
- File-based retrieval should not be inferred to improve grounding, authorization, safety, or transactional correctness. The measured outcome is SQL result-set similarity.
- TOON receives no format-specific retrieval instructions by design. Its reported penalty may be reduced by teaching its syntax, so the result is evidence about native model familiarity, not an intrinsic verdict on compact formats.

## Vault Ideas Extracted

* [File-Native Context Retrieval](/vault/file-native-context-retrieval.md)
* [Retrieval Interface Tax](/vault/retrieval-interface-tax.md)
