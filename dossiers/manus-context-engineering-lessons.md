---
type: Study Note
title: "Context Engineering for AI Agents: Lessons from Building Manus"
description: A production practitioner's account of stable prefix caching, constrained action selection, recoverable file memory, goal recitation, retained errors, and anti-repetition context design.
resource: https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
source: /archive/manus-context-engineering-lessons.html
tags: [context-engineering, agent-harness, inference-efficiency, agent-memory, long-horizon, agents]
timestamp: 2026-10-04T05:19:21Z
---

# Context Engineering for AI Agents — Study Notes

**Author**: Yichao “Peak” Ji  
**Published**: July 18, 2025  
**Evidence type**: First-party production experience, not a controlled or peer-reviewed evaluation.

## What It Is

Six context-engineering lessons from building a tool-using production agent. Ji describes choosing frontier-model in-context learning over training an end-to-end agent model so product iteration could happen in hours rather than weeks. The team rebuilt its framework **four times**; the post presents local optima from that process, explicitly not universal truth.

## Problem and Motivation

Tool loops have large repeated inputs and comparatively short outputs. Manus reports an average **100:1 input-to-output token ratio** and approximately **50 tool calls per task**. The working context must support efficient inference, valid action choice, recovery, and persistence without becoming an oversized or self-reinforcing transcript.

## Mechanism as an Idea

1. **Design around prefix reuse.** Keep early instructions stable, append new actions and observations rather than modifying old ones, and serialize deterministically. A token change invalidates reuse from that location onward. Volatile timestamps at the front and changes to early tool definitions are disproportionately expensive. Ji cites a dated tenfold cached-versus-uncached input-price difference as motivation; cache hit rate is his preferred production metric, not a demonstrated sole predictor of usefulness.
2. **Constrain choices without deleting the vocabulary.** Dynamically adding/removing tool schemas can invalidate caches and leave past calls referring to now-undefined tools. A context-aware state machine restricts allowed actions during decoding while retaining stable tool definitions. This “mask, don't remove” recommendation concerns **action availability**, not removal of old observations. It reduces selection ambiguity but is not an authorization boundary.
3. **Externalize recoverable context.** The filesystem stores large material and durable state; active context retains references that let the agent recover omitted detail. A web result can leave the prompt when its URL remains, and a document can leave when its sandbox path remains. This is meant to avoid irreversible compression that must guess future relevance.
4. **Recite objectives near the decision point.** Rewriting a durable task list places the current plan near the end of the recent context, countering goal drift and buried instructions. The claimed mechanism is attention positioning, not evidence that administrative-only turns improve outcomes.
5. **Keep failures visible.** Failed actions and environment errors are evidence for recovery. Erasing them removes the basis for changing course and can make repeated mistakes look like novel attempts.
6. **Avoid self-induced few-shot ruts.** Highly uniform action-observation histories can encourage imitation after that pattern stops being useful. The account describes structured variation in newly produced observations and actions to interrupt repetition.

## Results and Admissions

The source offers concrete workload ratios, framework-rewrite experience, and observed failure modes, but no ablation scores, matched baselines, measured recovery rates, or quantified savings for the six techniques. It cites real-world testing across **millions of users** without an evaluation protocol. Proposed agentic state-space models using file memory are explicitly speculative, not an implemented result.

Two tensions deserve explicit handling. Append-only deterministic serialization supports caching, whereas template/format variation can break reuse if applied retrospectively; the compatible interpretation is diversity in **newly appended** content while keeping old bytes stable. Likewise, repeatedly revising a task file need not rewrite earlier history: fresh observations can expose current goals at the suffix. The source does not quantify these tradeoffs.

## Analyst Takeaways

1. **Prefix identity is an architectural constraint.** Stable tool vocabulary, deterministic history, and placement of volatile state belong in harness design, not just billing configuration.
2. **Selection control and permission enforcement are different.** Masking generated actions can improve focus while external execution policy still determines what may actually happen.
3. **Reversible omission requires a durable referent.** A path or URL must still resolve to the evidence needed; a changing web page is not equivalent to an immutable archive.
4. **Preserve negative evidence through compaction.** The useful error is the attempted action, observed failure, and implication for the next choice—not an unbounded stack trace.
5. **Attention refresh has a cost.** Goal recitation should be evaluated against additional turns and repeated tokens, especially when the task already has a stable explicit state record.
6. **Do not optimize cache hits in isolation.** A perfectly reusable prefix can be stale, bloated, or behaviorally harmful; compare total cost, recovery, latency, and accepted outcomes.

## Questions and Limitations

This is an operator's narrative from one product, with no causal separation of model, tool interface, workload, and context changes. Decoder-level subset restriction depends on serving support and does not generalize to every hosted model. External storage needs searchability, versioning, scope, and freshness; “unlimited” filesystem capacity does not give unlimited reliable recall. Retained errors can be distracting or carry hostile content. Structured variation may reduce predictability or prefix reuse. The lasting patterns connect to [file-native retrieval](/vault/file-native-context-retrieval.md) and [reversible, query-conditioned compaction](/vault/reversible-query-conditioned-compaction.md), not to a guarantee that every technique should run on every turn.

## Vault Ideas Extracted

* [Prompt Cache Stability](/vault/prompt-cache-stability.md)
* [Reversible, Query-Conditioned Compaction](/vault/reversible-query-conditioned-compaction.md)
