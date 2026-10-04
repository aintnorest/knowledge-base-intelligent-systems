---
type: Study Note
title: "Don’t Break the Cache: An Evaluation of Prompt Caching for Long-Horizon Agentic Tasks"
description: A cross-provider preprint measuring agent prompt-cache cost and first-token latency, with stable-prefix benefits and substantial experimental and reporting caveats.
resource: https://arxiv.org/abs/2601.06007v2
source: /archive/dont-break-the-cache-prompt-caching.pdf
tags: [inference-efficiency, context-engineering, agent-harness, evaluation, agents]
timestamp: 2026-10-04T05:19:21Z
---

# Don’t Break the Cache — Study Notes

**Authors**: Akshaya Jangiti, Elias Lumer, Faheem Nizar, Kevin Frank, Anmol Gulati, Mandar Phadate, and Vamse Kumar Subbiah (PwC U.S.)  
**Source**: arXiv v2, January 31, 2026; PDF also labels itself “Preprint. February 3, 2026.” No peer-reviewed venue is established here.

## What It Is

A commercial-API experiment comparing no caching, full-context caching, system-prefix caching, and a condition described as excluding tool results. Four models across three providers run research agents with **10,000-token system prompts** on DeepResearch Bench questions. The evaluation measures API cost and streaming time to first token (TTFT), not the quality of the generated research reports.

## Problem and Motivation

Agent histories repeatedly expose a growing prefix to inference. Prompt caching reuses computed prefix state rather than recomputing it. Yet changing early content, paying for entries that never receive reads, or rewriting old history can erase the expected benefit. Billing savings and latency savings need not select the same cache policy.

## Mechanism as an Idea

The experiment intentionally introduces changing identifiers at selected positions to prevent exact-prefix reuse. An identifier at the beginning creates the no-cache baseline; one after the system prompt preserves only the stable system prefix. Full-context caching leaves history unchanged. The “exclude tool results” condition inserts identifiers both after the system prompt and after each tool result.

This last design deserves scrutiny: with exact cumulative prefix matching, a changing identifier immediately after the system prompt already prevents downstream reuse. Thus its distinction from system-only caching is not cleanly explained, and it does not establish a general ability to cache arbitrary noncontiguous pieces around excluded results.

Within an append-only session, an old tool result can remain identical across many later requests even if it is unique across sessions. The source sometimes conflates these two kinds of reuse when arguing that dynamic tool results are poor cache candidates. What matters is whether the serialized prefix remains unchanged and gets another eligible request before expiration.

## Results and Admissions

The main protocol specifies **40 sessions per condition per model**, independent-sample t-tests, and cache priming before evaluation, with creation tokens recorded separately. It says sessions start fresh and measures reuse within conversations. The abstract says “over 500” sessions and the body says “500”; four models × four conditions × 40 implies **640**, so the reported total is internally inconsistent.

Table 1's selected modes report:

- GPT-5.2, excluding tool results: **79.6% cost reduction; 13.0% TTFT improvement**.
- Sonnet 4.5, system-only: **78.5%; 22.9%**.
- Gemini 2.5 Pro, system-only: **41.4%; 6.1%**.
- GPT-4o, system-only: **45.9%; 30.9%**.

Full-context GPT-5.2 actually has the highest tabulated cost saving, **81.4%**, while the selected mode has better TTFT. GPT-4o full-context caching saves **47.8%** but worsens TTFT by **8.8%**. Gemini's exclude-results condition saves **27.8%** while worsening TTFT by **2.9%**. The abstract/conclusion's **13–31%** TTFT range omits Gemini's **6.1%**, which the results section correctly rounds into a **6–31%** range. General claims that all strategies have similar cost benefits are also weaker for Gemini than for the other models.

Ablations cover system prompts of **500–50,000 tokens** and **3–50 tool calls**. Larger prompts show greater measured savings; at 50,000 tokens the paper reports **89%** for GPT-5.2 and **88%** for Sonnet. But it also reports positive cost savings at **500 tokens** while stating that caching cannot activate below the model minimums. This unexplained discrepancy prevents interpreting all ablation savings as causal cache effects.

Costs use early-January-2026 pricing, with explicit write charges and Google storage charges described in the accounting. Priming is separated from evaluation; the paper does not make total cold-start amortization sufficiently transparent to transfer its headline savings to deployment.

## Analyst Takeaways

1. **Stable-prefix layout is a harness-level economic decision.** Put volatile state after reusable instructions and avoid gratuitous mutation of earlier serialized content.
2. **Measure reads, writes, and uncached input separately.** Cache-enabled traffic can still spend heavily on repeated writes without reuse.
3. **Evaluate latency independently of billing.** Reduced input cost does not certify lower first-token delay or total completion time.
4. **Do not inflate prompts to improve a percentage saving.** The source recommends maximizing system-prompt size; the appropriate objective is absolute cost at required quality, not a larger discount against an artificially expensive baseline.
5. **Keep within-session and cross-session reuse distinct.** Session-specific content can be valuable to cache when later turns reuse it unchanged.

## Questions and Limitations

Different questions are used in independent sessions rather than a paired task comparison, leaving task difficulty and trajectory shape as confounds. The large fixed system prompt dominates these workloads; leaner harnesses may see much less benefit. No report-quality evaluation establishes behavioral equivalence of the cache-breaking inputs. Production load and network conditions make TTFT noisy; statistical tests do not isolate cache-write overhead as the cause of regressions. Session-count, low-token savings, and boundary-definition inconsistencies warrant replication. Cache policy and model pricing are dated provider behaviors, and timing side channels require a separate security analysis.

## Vault Ideas Extracted

* [Cost-Aware Inference Control](/vault/cost-aware-inference-control.md)
* [Prompt Cache Stability](/vault/prompt-cache-stability.md)
