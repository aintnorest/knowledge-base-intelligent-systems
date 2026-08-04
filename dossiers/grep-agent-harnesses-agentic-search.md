---
type: Study Note
title: Is Grep All You Need? How Agent Harnesses Reshape Agentic Search
description: Personal study notes on a LongMemEval comparison of grep and vector retrieval across custom and provider-native agent harnesses, inline and file-based result delivery, and increasing distractor history.
resource: https://arxiv.org/abs/2605.15184v1
source: /archive/grep-agent-harnesses-agentic-search.pdf
tags: [retrieval, agent-harness, context-engineering, evaluation, agents]
timestamp: 2026-07-14T16:02:15Z
---

# Is Grep All You Need? How Agent Harnesses Reshape Agentic Search — Study Notes

**Authors**: Sahil Sen, Akhil Kasturi, Elias Lumer, Anmol Gulati, and Vamse Kumar Subbiah (PricewaterhouseCoopers, U.S.)

**Venue**: arXiv:2605.15184v1 [cs.CL]

**Date**: May 2026
**Pages**: 9

## What It Is

This preprint argues that an agentic retrieval result is a property of the whole stack, not of the retriever alone. It compares regex-style grep with vector search on 116 LongMemEval-S long-memory questions using a custom Chronos harness and three provider-native CLIs: Claude Code, Codex, and Gemini CLI. It also changes whether search outputs arrive inline in the model context or are written to files that the agent must read separately.

The headline is deliberately conditional. Inline grep beat inline vector search for every tested harness–model pair, but the delivery path and harness could narrow, reverse, or erase that advantage. The authors do not claim that grep is generally superior to dense retrieval.

## The Problem It Addresses

Static retrieval comparisons omit the agent loop that turns ranked passages into an answer. A harness controls the tool surface, prompt construction, result rendering, sandbox, and stopping behavior; file-based delivery also adds a read–integrate–retry step. The paper asks whether lexical versus dense retrieval retains its ordering after those operational choices change, and whether either method degrades predictably as unrelated conversation history grows.

## How the Evaluation Works

1. **Task and corpus.** The 116-question LongMemEval-S subset covers knowledge updates, multi-session aggregation, assistant and user recall, preferences, and temporal reasoning. Per-question local files contain conversation turns plus Chronos-extracted temporal events.
2. **Retrievers.** Grep applies regex matching to raw turn and event text, scores by match count, and needs no embedding index. Vector retrieval embeds turns and events into a per-question ANN index, then reranks its top-*k* results.
3. **Harnesses and models.** Chronos is a LangChain custom harness with category-conditioned guidance and an initial top-15 vector context block. Provider CLI agents receive generated search strategies and bash-callable wrappers. The tested models are Claude Opus 4.6, Claude Haiku 4.5, GPT-5.4, Gemini 3.1 Pro, and Gemini 3.1 Flash-Lite, subject to each provider harness.
4. **Delivery modes.** Standard mode appends results inline; programmatic mode writes them to a file, requiring the agent to explicitly inspect it. GPT-4o grades each answer under LongMemEval's category-conditioned protocol.
5. **Noise sweep.** A second experiment retains oracle sessions while adding sampled distractor sessions at limits of 5, 10, 20, 30, and the complete 39–66-session haystack. The paper pairs grep and vector conditions within each sampled configuration, though it notes incomplete Codex scaling rows.

## Important Results

- In the full-haystack inline comparison, grep exceeded vector retrieval in all ten reported harness–model rows. The largest reported gap was Chronos with Gemini 3.1 Flash-Lite (86.2% grep versus 62.9% vector); Codex with GPT-5.4 tied the strongest inline grep result at 93.1%, versus 75.9% for vector.
- Changing the harness could matter as much as changing the retriever. Claude Opus 4.6 with inline grep scored 93.1% in Chronos and 76.7% in Claude Code despite using the same underlying model and corpus.
- File-based delivery changed the ordering in half of the ten rows: programmatic vector exceeded programmatic grep in five. The sharpest reported failure was Codex/GPT-5.4, which declined from 93.1% with inline grep to 55.2% with programmatic grep; its programmatic vector result was 67.2%.
- The noise sweep was non-monotonic and stack-dependent rather than a simple “dense wins at scale” law. For example, Gemini 3.1 Pro on Gemini CLI favored vector at every reported session limit and reached 89.7% vector versus 78.5% grep at full; Claude Code favored grep for both reported Claude models throughout its grid.
- The authors attribute grep's inline strength plausibly to LongMemEval's frequent need for literal dates, counts, preferences, and spans. That is an interpretation, not trace-level causal proof. They also warn that distractors are resampled at each limit, so intermediate peaks are not smooth capacity curves.

## What I Take From It

1. **Benchmark retrieval as a deployed interaction.** Evaluate retriever, harness, tool transcript, and result-delivery path together against final task quality; a standalone recall metric cannot predict their composition.
2. **Treat file pointers as an extra agent task.** Moving output out of context can preserve context budget, but it only helps if the agent reliably finds, reads, and uses the artifact. The correct comparison is end-to-end, including the added navigation loop.
3. **Match retrieval to evidence shape.** Exact lexical recovery is a strong baseline for workloads licensed by distinctive literal strings. Dense search remains valuable for paraphrase and indirect mentions, but needs testing against topical distractors and the model's query behavior.
4. **Use scaling sweeps as interaction diagnostics.** Vary distractors, model, and harness while preserving oracle evidence; report randomization and incomplete cells rather than treating a noisy one-shot curve as a universal scaling law.

## Questions and Limitations

- Results cover a small LongMemEval subset and a conversational-memory corpus enriched with structured temporal events. They do not establish the same ordering for scientific synthesis, visual documents, code semantics, or other non-literal evidence.
- Each configuration's result depends on proprietary provider harnesses whose internal prompt construction, stdout handling, and control policy are opaque. The paper does not provide trace-level causal attribution for the observed differences.
- Chronos begins with a top-15 vector context block even in its grep-only configurations, so its conditions should not be read as a pure no-vector baseline.
- The grader is GPT-4o and the paper reports accuracy, not retrieval recall, latency, token consumption, or reproducibility over repeated stochastic runs.
- Codex has only a complete vector scaling row and no grep scaling row; the paper explicitly withholds a vendor-complete scaling conclusion.

## Vault Ideas Extracted

* [Harness-Conditioned Retrieval Evaluation](/vault/harness-conditioned-retrieval-evaluation.md)
