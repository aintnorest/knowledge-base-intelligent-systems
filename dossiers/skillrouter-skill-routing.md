---
type: Study Note
title: "SkillRouter: Skill Routing for LLM Agents at Scale"
description: "Body-aware skill retrieval and listwise reranking across an approximately 80,000-skill registry, with downstream coding-agent and efficiency evaluations."
resource: https://arxiv.org/abs/2603.22455v5
source: /archive/skillrouter-skill-routing.pdf
tags: [agents, agent-skills, routing, retrieval, coding-agents, evaluation]
timestamp: 2026-09-24T03:43:40Z
---

# SkillRouter: Skill Routing for LLM Agents at Scale — Study Notes

**Authors**: YanZhao Zheng, ZhenTao Zhang, Chao Ma, YuanQiang Yu, JiHuai Zhu, Yong Wu, Tianze Xu, Baohua Dong, Hangcheng Zhu, Ruohui Huang, and Gang Yu  
**Venue**: arXiv:2603.22455v5 [cs.LG]  
**Date**: July 20, 2026  
**Setting**: Approximately 80,000 agent skills, SkillsBench-derived tasks, four coding-agent backbones

## What It Is

SkillRouter investigates a hidden-body mismatch: agents often see only skill names and short descriptions until a skill is loaded, but an upstream router can index the complete body. In a large, overlapping catalog, concise metadata may not distinguish two superficially similar skills that do different work. The authors show a large loss from hiding the body and train a compact two-stage retrieve-and-rerank system that uses body text offline and in its router without injecting every body into the executor's context.

That separation matters for a software factory. Progressive disclosure still protects the worker's context budget, but the selector need not make a blind choice using the same tiny index the worker sees. Full-body inspection at indexing/routing time is not the same as exposing 80,000 full skills on every request.

## Benchmark and Method

The core set contains **75 expert-verified** SkillsBench-derived queries: **24 single-skill** and **51 multi-skill**. Easy has **78,361** candidate skills; Hard has **79,141** after adding **780** deliberately plausible but functionally wrong distractors. A supplementary test has **256 single-label, LLM-generated** queries from three skill sources over roughly 77,000 candidates. The main metric, Hit@1, marks a multi-skill query correct if **any** required skill is first; recall and full-coverage metrics are needed to tell whether the whole required set is available.

SkillRouter's **0.6B bi-encoder** indexes name, description, and a capped body and retrieves 20 candidates. A **0.6B cross-encoder** reranks these using all fields. Training uses **37,979** synthetic query–skill pairs for retrieval and **32,283** candidate lists for reranking; labeled benchmark skills are excluded from positive training examples. Negative sampling mixes semantic neighbors, BM25 hits, same-category distractors, and random entries. Near-duplicate negatives are removed using names, text overlap, and embeddings, because equivalent skills would otherwise be falsely labeled wrong. Listwise reranking explicitly compares competing top-20 candidates rather than treating each in isolation.

## What the Numbers Support

- Removing the body reduces average Hit@1 from **56.0% to 18.7%** for Qwen3-Emb-0.6B, **64.0% to 25.3%** for Qwen3-Emb-8B, and **68.0% to 24.0%** for an 8B+8B base pipeline: losses of **37.3–44.0 percentage points** on this registry.
- Query-blind, body-distilled replacement descriptions recover much of the gap but still trail all-field routing by **6.7–21.3 points** in the tested configurations. Matched metadata-only encoder fine-tuning reaches **51.3%** versus **65.3%** with all-field inputs. The issue is not simply that the body adds more tokens.
- The tuned **1.2B** pipeline reaches **74.0% Hit@1** against **68.0%** for the strongest **16B** untuned base pipeline. Negative filtering improves encoder Hit@1 by **4.0 points**; listwise training gives **74.0%** versus **43.3%** under pointwise fine-tuning. Median online query latency is **495.8 ms**, **5.8× faster** than the 16B base pipeline in the reported GPU benchmark.
- On the independent supplementary benchmark, the same checkpoints attain **64.1%** versus **63.7%** Hit@1 for the large base pipeline—a much narrower margin than the core result.
- Across four coding agents, three trials, and the core 75 tasks, top-1 retrieved skills raise average downstream success to **27.56%** versus **25.78%** under the strongest base router; top-10 gives **27.78%** versus **25.45%**. No skills yield **14.89%**, oracle gold skills **32.67%**. Routing gain is not identical to solved-task gain.
- A trade-off remains: for multi-skill queries, the strongest base router has **38.2% FC@10** versus **35.3%** for SkillRouter. Better top-1 does not mean better exhaustive dependency coverage.

## Analyst Takeaways

1. **Index the full skill, reveal only the selected skill.** Keep progressive disclosure for agent execution while permitting the router to use body-level affordances, preconditions, and negative constraints. This is especially valuable when descriptions collapse distinct procedures into the same broad promise.
2. **Evaluate the catalog as a competitive set.** Build near-miss and forbidden-load cases; diagnose whether a bad choice is missing retrieval recall, weak reranking, ambiguous metadata, or incorrect downstream invocation.
3. **Remove functional duplicates from negative training labels.** Teaching a router that a valid alternative is wrong rewards arbitrary catalog identity instead of task fit. Test full-set recall where multi-skill workflows require several capabilities.
4. **Measure end-to-end quality, not routing alone.** A coding agent with a correct skill can still fail; routing improvements buy more when the executor is capable of using them. Report both shortlist composition and actual verified task completion.
5. **Do not copy these model-training requirements into every small library.** If a human-maintained factory has dozens of skills, a simple rule or metadata route plus negative tests may be preferable; the study's body-aware trained reranker addresses ~80K overlapping entries.

## Questions and Limitations

- The expert-verified core comprises only 75 queries; supplementary queries are model-generated. Hard distractors are intentionally synthetic, not an estimate of natural distractor frequency.
- Synthetic training queries and curated source/target pools can leave unmeasured domain and catalog biases. The reported cross-source gain for the compact pipeline is small.
- Downstream comparison uses four agents in one Claude Code harness and one timeout budget, without significance tests; skills' routing metrics are not a universal estimate of user value.
- Some body content is truncated; full indexing also creates governance issues if skill bodies contain secrets, untrusted text, or instructions the router should not treat as authority.
- Multi-skill FC@10 regresses versus the strongest base pipeline; a factory needing all prerequisites should not select the router by Hit@1 alone.

## Vault Ideas Extracted

* [Evaluated Skill Routing](/vault/evaluated-skill-routing.md)
* [Progressive Skill Disclosure](/vault/progressive-skill-disclosure.md)
* [Self-Improvement Update Targets](/vault/self-improvement-update-targets.md)
