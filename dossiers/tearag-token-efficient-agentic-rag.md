---
type: Study Note
title: "TeaRAG: A Token-Efficient Agentic Retrieval-Augmented Generation Framework"
description: Study notes on TeaRAG, an agentic RAG system that compresses per-step evidence with a co-occurrence graph and trains concise retrieval-and-reasoning paths with process-aware iterative DPO.
resource: https://arxiv.org/abs/2511.05385v1
source: /archive/tearag-token-efficient-agentic-rag.pdf
tags: [retrieval, token-efficiency, knowledge-graphs, agents, reinforcement-learning]
timestamp: 2026-07-14T15:57:43Z
---

# TeaRAG: A Token-Efficient Agentic Retrieval-Augmented Generation Framework — Study Notes

**Authors**: Chao Zhang, Yuhao Wang, Derong Xu, Haoxin Zhang, Yuanjie Lyu, Yuhao Chen, Shuochen Liu, Tong Xu, Xiangyu Zhao, Yan Gao, Yao Hu, and Enhong Chen
**Preprint**: arXiv:2511.05385v1 [cs.CL]
**Pages**: 32

## What It Is

TeaRAG is an agentic retrieval-augmented generation framework designed to reduce two sources of output-token cost: verbose retrieved passages and unnecessary retrieval/reasoning rounds. At each step, an LLM identifies anchor entities, writes a subquery, retrieves both Wikipedia chunks and graph triplets, and uses a **Knowledge Association Graph** (KAG) plus Personalized PageRank (PPR) to select a compact mixture of evidence. It summarizes that context and decides whether another step is needed.

The paper pairs that inference design with a two-stage training procedure. Supervised fine-tuning teaches the required multi-step format from constructed MuSiQue traces. Iterative Process-aware Direct Preference Optimization (IP-DPO) then ranks sampled trajectories using answer F1, format compliance, and intermediate evidence-matching rewards normalized by the number of steps. The intended result is not merely shorter answers, but trajectories that acquire the required evidence with fewer redundant actions.

## Why the Problem Matters

Agentic RAG can improve multi-hop question answering by interleaving planning and retrieval, but its costs compound: every extra round generates thought text and returns another set of passages. The authors' analysis finds that retrieved content is the largest portion of the output and that even single-hop questions frequently trigger more than one reasoning step under outcome-only training.

Graph triplets are more compact than passages but can lose the context needed to interpret a fact. Passage retrieval preserves that context but is verbose and can include semantically similar distractions. TeaRAG's central claim is that a graph over the *retrieved* chunks and triplets can use their shared provenance and entities to keep a small, mutually reinforcing evidence set, rather than choosing only one representation or concatenating both unfiltered.

## How TeaRAG Retrieves Compact Evidence

1. **Build an offline graph.** The authors extract triplets from Wikipedia chunks with Qwen2.5-14B-Instruct. Their reported graph has 51.1M entities and 130.9M relations over 21.0M chunks.
2. **Generate a focused step.** Given the question and prior summaries, the agent names important entities and writes a subquery. Identified entities are later used as PPR anchors.
3. **Retrieve two evidence types.** Semantic retrieval returns chunks for the subquery. Graph retrieval first retrieves entities using entity-plus-subquery queries, gathers their one-hop triplets, then retrieves the triplets most relevant to the subquery from that constrained set.
4. **Construct a Knowledge Association Graph.** Nodes represent the subquery, retrieved chunks, retrieved triplets, and entities. Undirected co-occurrence edges connect a triplet to its source chunk when both were retrieved, triplets to their head/tail entities, chunks to those entities, and chunks to document titles. Relevance edges connect chunks and triplets to the subquery; the triplet edge applies a similarity threshold because a sparse triplet's similarity score can be unreliable.
5. **Rank and pack with PPR.** The subquery has personalization weight 1 and recognized entities weight 0.5. PPR ranks the content nodes, and the top five chunks/triplets become the externally marked context for the current step. The agent summarizes it, then either continues or emits a `Final answer:`.

This treats co-occurrence as a confidence signal, not proof: a triplet sourced from one of the semantically retrieved chunks receives structural support, while unrelated but lexically similar content is less likely to dominate the compact context.

## How IP-DPO Rewards Concise Paths

The second stage samples eight paths per question from 10,000 training questions drawn from NQ, HotpotQA, and MuSiQue. Each path receives three scores:

- **Outcome**: word-overlap F1 against the answer.
- **Format**: whether the path follows the prescribed step structure and final-answer marker.
- **Process**: entity/subquery coverage plus knowledge matching for every golden evidence item across all subqueries, retrieved contexts, and summaries. For each evidence item, the reward retains the maximum reranker similarity achieved at any step, then normalizes the summed coverage by the number of steps.

For simple single-hop examples without golden evidence, the paper divides outcome reward by path length instead. For multi-hop questions, accepted trajectories must meet strict combinations of outcome, format, and process scores; rejected trajectories include malformed, plainly incorrect, and comparatively weaker-but-plausible paths. IP-DPO combines a DPO objective with SFT on the selected response and resamples after each round.

The normalization is the important design choice: repeatedly revisiting the same evidence does not increase the maximum-coverage term but does increase the denominator. It makes extra steps costly unless they add evidence coverage.

## Results That Matter

Across NQ, PopQA, HotpotQA, 2WikiMultiHopQA, MuSiQue, and Bamboogle, the final reported TeaRAG models have the best average scores in the paper's comparison table. TeaRAG-8B reports average **45.12 EM / 54.45 F1**, and TeaRAG-14B reports **47.41 EM / 57.11 F1**. These are paper-specific comparisons: some baselines use released models or different training data, so they should not be read as a clean universal ranking.

The authors report that final TeaRAG improves average EM by 4 percentage points while reducing output tokens by 61% on Llama3-8B-Instruct, and improves EM by 2 points with 59% fewer output tokens on Qwen2.5-14B-Instruct. In the retrieval ablation, the full TeaRAG-8B context averages 618 content tokens per retrieval, versus 879 for direct hybrid concatenation and 790 for semantic-only iterative retrieval. Its graph-only version is much shorter (88 tokens) but materially weaker, supporting the claim that compact triplets need contextual complement rather than wholesale replacement of passages.

The process-reward ablation is also informative. On Llama3-8B, the full outcome-format-process scheme ends at 1.31 average steps and 45.12 EM / 54.45 F1 after three rounds. Outcome-only training rises to 2.13 average steps and degrades in the reported final round; outcome-plus-format also degrades by that round. This supports the narrower conclusion that their intermediate reward helped stabilize this preference-training setup, not that it proves process rewards always outperform outcome rewards.

## Analyst Takeaways

1. **Compress an evidence set through agreement between representations.** A retrieved chunk and a provenance-linked triplet can corroborate each other while serving different roles: the triplet is a compact factual handle and the chunk supplies qualifiers and context. Rank the relationship, then keep only the small set needed for the answer.
2. **Reward evidence acquisition, not reasoning length.** A short trace is not inherently good. Penalize steps only after tracking whether each necessary evidence item was actually queried, retrieved, and incorporated into a summary or answer.
3. **Use stage-specific supervision.** Format-only constraints prevent parser failures; answer-only rewards can still retain a lucky or flawed path. Evidence-aware trajectory selection adds a distinct control signal, though it depends on having reliable evidence annotations.
4. **Measure retrieval payload separately from reasoning.** TeaRAG distinguishes thinking tokens, retrieved-content tokens, total tokens, and content per retrieval. This makes it possible to identify whether a gain comes from better evidence packing, fewer rounds, or both.

## Limits and Questions

- The graph is built from triplets extracted by an LLM over a Wikipedia corpus. Extraction mistakes, aliases, provenance errors, or relation ambiguity can be amplified by graph connectivity; the paper does not report graph-extraction precision or evidence-recall diagnostics at scale.
- The KAG's strongest signal is source co-occurrence. It may be less useful when relevant evidence is distributed across documents or when a correct triplet's source chunk was not returned by semantic retrieval.
- Process reward relies on golden evidence and reranker similarity. The paper's max-over-steps metric can still reward semantically similar but insufficient evidence, and it is not directly available for many production question-answering workloads.
- The evaluation uses factual QA benchmarks and an English Wikipedia corpus. It does not establish behavior on changing, private, multilingual, adversarial, citation-sensitive, or tool-execution tasks.
- Training and inference comparisons include differing baseline training setups. The claimed efficiency improvements are promising but need replication with matched retrieval infrastructure, token accounting, and serving conditions.

## Vault Ideas Extracted

* [Co-occurrence-Grounded Retrieval Compression](/vault/cooccurrence-grounded-retrieval-compression.md)
* [Process-Aware Trajectory Preference Optimization](/vault/process-aware-trajectory-preference-optimization.md)
