---
type: Study Note
title: Retrieval-Augmented Generation for Scientific Code Understanding
description: Local C++ repository question answering with expensive offline code-graph and explanation indexing, bounded hybrid retrieval, and a single-codebase, LLM-judged comparison against smaller models in Claude Code.
resource: https://arxiv.org/abs/2609.12190v1
source: /archive/scientific-code-understanding-local-rag.pdf
tags: [retrieval, coding-agents, context-engineering, knowledge-graphs, evaluation, agents]
timestamp: 2026-09-24T03:42:34Z
---

# Retrieval-Augmented Generation for Scientific Code Understanding — Study Notes

**Authors**: Aaron Nobile, Andreas Adelmann, and Mohsen Sadr  
**Affiliations**: ETH Zürich, Paul Scherrer Institute, and MIT  
**Venue**: arXiv:2609.12190v1 [cs.SE]  
**Date**: September 10, 2026

## What It Is

A local, repository-specialized question-answering system for IPPL, a scientific C++ framework using MPI, Kokkos, and heFFTe. It spends substantial GPU work *before* user questions to build a reusable, explanation-enriched index, then serves a compact retrieved context to a small local answering model. Despite the paper's “coding agent” terminology, the deployed system explains and locates code; it does **not** edit, execute tests, debug in a loop, or verify its answers by running code. Its demonstrated task is repository understanding, not improved code-change quality.

The architectural choice is meaningful when a private, relatively stable scientific codebase will be queried many times: amortize parsing and LLM-generated explanations over future questions and keep code on local infrastructure. For active code changes, the index staleness and missing execution loop are material limits.

## Offline Preparation Versus Online Retrieval

Offline, Tree-sitter parses `.cpp`, `.h`, and `.hpp` into functions, declarations, classes, comments, symbols, and structural relationships; Markdown/reStructuredText/plain-text documentation is sectioned and chunked. A project-structure builder records symbols, files, modules, and direct call neighborhoods. Separate local LLM stages create entity, file, module, and call-chain explanations; a fallback uses raw file content when parsing yields no symbols. The FAISS index embeds code, metadata, and these generated explanations via local `nomic-embed-text`. The illustrated manifest contains 8,013 metadata records and vectors of dimension 768. Prompt signatures and configuration enter the persisted manifest so material prompt or source changes can trigger an index rebuild; the reported preparation ran on an A100 40 GB cluster node.

Online, an intent router distinguishes API usage, location, data flow, comparison, file/module overview, and workflow questions. A candidate pool combines dense search with exact file, symbol, module, and literal API matches. It balances both subjects of comparison questions and reranks by metadata, entity type, and semantic distance. Weak or duplicate primaries are pruned, then a structural expansion follows selected file/module/call-neighborhood edges with a mode-dependent cap of 2–4 extra chunks. Supplementary chunks from referenced files are also eligible. A final low-information filter avoids redundant trivial declarations. The answer prompt includes paths, symbols, generated explanations, source excerpts, and structural relations and instructs grounding in the selected context.

This is a deliberately mixed retriever, not “vectors solve repository navigation”: exact identifiers and call relationships have explicit paths to the prompt. Generated explanations improve discoverability but are derivative claims, so direct source evidence remains important. Rebuilding after edits is expensive; the paper does not demonstrate reliable incremental invalidation.

## Evaluation and Findings

The evaluation comprises 100 GPT-5.4-generated questions over **one** repository across 11 categories, with answers scored 0/0.5/1 by GPT-5.5 against generated reference answers. Only the answer model varies inside the seven-model RAG comparison; index construction uses fixed explanation and embedding models. Standard errors below reflect the 100 questions, not independent repositories.

| Answer model | RAG mean score | Correct / partial / incorrect | Mean latency |
|---|---:|---:|---:|
| Qwen3.5 9B | **0.795 ± 0.034** | 70 / 19 / 11 | 18.14 s |
| Qwen3.5 32B | 0.765 ± 0.035 | 65 / 23 / 12 | 30.91 s |
| Qwen2.5-Coder 7B | 0.720 ± 0.037 | 59 / 26 / 15 | 3.54 s |
| Gemma4 31B | 0.710 ± 0.041 | 63 / 16 / 21 | 41.00 s |

The 9B Qwen model leads the tested configurations; more parameters do not monotonically improve this narrow benchmark. Category averages across the seven models range from API use at 0.881 to build/install at 0.371; numerical meaning is 0.548. That pattern matters: locating a function is not the same as correctly explaining how to build or validate the system.

For three smaller models also embedded in a Claude Code file-inspection loop, the dedicated RAG stack scores higher: Qwen2.5 7B **0.720 vs 0.520**, Qwen2.5 32B **0.665 vs 0.560**, and Gemma4 12B **0.675 vs 0.665** (RAG versus Claude Code). These are architecture-plus-tool-plus-prompt comparisons, not a controlled ablation identifying retrieval alone as the cause. In particular, the Gemma difference is 0.010, smaller than the reported standard errors. No frontier Claude Code model is compared, and no isolated retriever recall or human-judgment calibration is reported.

## Analyst Takeaways

1. **For recurring private repository QA, amortize expensive structural analysis.** A versioned local index of symbols, file/module summaries, call relationships, and source locations can let smaller models find concise evidence, but measure rebuild cost and freshness against query volume.
2. **Keep lexical and source fallbacks alongside vector search.** Exact names, filenames, and APIs should not depend on nearest-neighbor similarity; graph expansion can retrieve context around a located symbol, while source inspection confirms implementation claims.
3. **Do not advertise answer quality as code quality.** These scores are LLM-judged explanations over IPPL. A light AI software factory still needs tests, execution, source review, and human sign-off before accepting changes.
4. **Evaluate per question class and model–harness pair.** Strong API-location scores coexist with weak build guidance. A smaller model may benefit from prefabricated context more than an unguided agent loop, but this is contingent on models, prompts, and repository shape.
5. **Treat generated explanation chunks as cached hypotheses.** Attach source provenance and index version; rebuild or fall back to fresh code reads after changes. A fluent stale summary can be worse than an empty result.

## Questions and Limitations

- One scientific C++ codebase and 100 model-generated questions constrain generalization; there is no cross-repository or human-in-the-loop task outcome study.
- The GPT-5.4 question/reference and GPT-5.5 judge pipeline can share omissions or stylistic preferences. Partial-credit judgments lack a reported human calibration audit.
- Fixed index, prompt, and model settings are not an independent retrieval ablation; Claude Code comparisons involve a different interaction architecture and completion budget.
- The A100 preprocessing cost, end-to-end amortization threshold, ingestion failure rate, freshness under active development, and privacy/security of cached derivative artifacts are not quantitatively established.
- Very weak build/install and numerical-meaning results caution against using this alone for executable scientific-software decisions.

## Vault Ideas Extracted

* [Harness-Conditioned Retrieval Evaluation](/vault/harness-conditioned-retrieval-evaluation.md)
* [Query-Class Retrieval Routing](/vault/query-class-retrieval-routing.md)
* [Structural Code Retrieval](/vault/structural-code-retrieval.md)
