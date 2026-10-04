---
type: Study Note
title: "Prompt caching: prefix reuse, invalidation, and lifetime economics"
description: The documented cache model separates cumulative prefix identity, bounded lookup, paid writes, refreshed lifetimes, and observable token classes rather than treating caching as a switch.
resource: https://platform.claude.com/docs/en/build-with-claude/prompt-caching
source: /archive/anthropic-prompt-caching-docs.html
tags: [inference-efficiency, context-engineering, model-serving, agent-harness, agents]
timestamp: 2026-10-04T05:19:21Z
---

# Prompt caching — Study Notes

**Publisher**: Anthropic  
**Evidence type**: First-party documentation, archived October 2026. Behaviors and price multipliers below describe that snapshot, not a permanent contract.

## What It Is

A specification of provider-managed prompt-prefix reuse. Its knowledge value is the cache model: an exact, cumulative identity over an ordered prompt, explicit creation points, bounded lookup, refreshable lifetimes, and separately billed token classes. It is not response caching and does not shorten the context the model logically receives.

## Problem and Motivation

Repeated instructions, documents, and growing conversations make prefill expensive. A usable cache must distinguish genuinely reusable prefixes from content that merely looks stable somewhere inside a changed request. Misplaced creation boundaries can yield a fresh paid write on every call without ever producing a read.

## Mechanism as an Idea

### Cumulative identity and lookup

The serialized hierarchy is **tool definitions → system content → messages**. A change at one level invalidates that level and later content, not earlier unchanged prefixes. Exact identity includes text and images; stable object serialization matters too.

A creation boundary writes one cumulative prefix entry at its endpoint, not an entry at every earlier block. On the next request, lookup checks that endpoint and walks backward through at most **20 positions per boundary**, searching for entries previous requests actually wrote. It does **not** discover arbitrary stable content and retroactively cache it. On the direct API, consecutive parallel tool-call blocks count as one lookup position, and consecutive result blocks likewise count as one.

Automatic management advances the endpoint with an append-only conversation. This works when lookup can still reach a prior creation point. A large block jump can miss a valid older entry; independently established boundaries preserve reuse for content with different change frequencies. The snapshot allows up to **four** boundaries. These constraints are consequences of lookup structure, not reasons to copy a flag inventory.

### Invalidation is broader than visible text edits

Changing early tool definitions invalidates the whole hierarchy. Search or citation capability toggles and speed changes affect system and message caches. Action-selection changes or adding/removing images affect message caches. Thinking and effort changes are rendered into the prompt: they always invalidate message prefixes and may invalidate earlier levels depending on model. Dropping or rewriting retained reasoning changes identity from that point onward.

The snapshot also documents an important escape from the blanket rule that all new instructions or tools destroy the cache: supported models can append mid-conversation system instructions and tool definitions while leaving the original prefix unchanged. Availability and exceptions are model-specific. Stable-prefix design means locating change after the prefix, not freezing useful capabilities forever.

### Lifetime and economics

The default lifetime is **five minutes**, refreshed on a read without another write charge; **one hour** is available at a higher write price. Lifetime begins at the **start of the writing or reading request**, not when generation ends. A four-minute response leaves about one minute for a follow-up under a five-minute lifetime. Long tool work, delegation, or human pauses can therefore cause a miss even in an apparently continuous session.

As documented in October 2026, writes cost **1.25× base input** for five minutes and **2×** for one hour. Reads/refreshes normally cost **0.1×**; the archived snapshot gives exceptions of **0.025×** for Fable 5.1/Mythos 5.1 and **0.05×** for Opus 5.5. These are dated facts about reuse economics, not a pricing table. Longer-lived prefixes must precede shorter-lived ones when lifetimes are mixed. Only unmatched suffix portions are written at their applicable lifetime rate.

Entries become usable after the first response begins, so simultaneous cold requests can race ahead of cache creation. Prewarming moves that write and latency cost before a real request; it does not eliminate the charge and must establish the same prefix and inference configuration the subsequent request uses.

## Results and Admissions

This page is a behavioral specification, not an independent performance experiment. Minimum cacheable lengths vary by model; requests below the minimum can proceed without caching or an error. The documented minimums span **512–4,096 tokens** in this snapshot. Cache presence should therefore be observed, not inferred from a request's declared intent.

Telemetry separates **read tokens**, **creation tokens**, and **ordinary uncached input**; their sum is total input. Treating the ordinary-input count as the entire prompt can drastically understate exposure. Creation telemetry also separates five-minute and one-hour writes. Request-comparison diagnostics can identify where prefix identity diverged.

The documented direct-API isolation scope is the workspace within an organization; some cloud integrations isolate only at organization scope. The source claims cached representations and hashes remain in memory rather than at rest, with entries deleted promptly but not immediately after the minimum lifetime. It documents no manual clearing mechanism. Lifetime is not a precise deletion deadline.

## Analyst Takeaways

1. **A stable prefix is necessary but not sufficient.** There must be a matching prior write, reachable lookup position, sufficient length, compatible configuration, and unexpired entry.
2. **Read-to-write behavior is the economic signal.** High creation volume with few reads suggests unstable boundaries, expiration, or cold-start concurrency—not necessarily a model problem.
3. **Schedule cache lifetime around elapsed work.** Generation, tool latency, and pauses all consume the reuse window; a short TTL can expire mid-episode.
4. **Keep context quality separate from cache quality.** Caching a large obsolete history reduces repeated computation, not distraction, logical token exposure, or information-retention risk.
5. **Append change where supported instead of rewriting history.** Policy and capability updates can preserve reuse when the interface offers a true suffix mechanism, but model-specific behavior must be measured.

## Questions and Limitations

The documentation is mutable and platform/model-specific. Stated privacy isolation and zero-retention eligibility are first-party claims, not a security audit or an application-level authorization scheme. The FAQ's broad statement that arbitrary-user-input boundaries “never” hit is best read in the varying-request setting: an unchanged prior user block can still be reused inside an append-only conversation. Cached reasoning retention varies across generations. Neither the page nor an attractive hit rate proves task quality, total-latency improvement, or that compaction is uneconomic; those require workload-level accounting.

## Vault Ideas Extracted

* [Cost-Aware Inference Control](/vault/cost-aware-inference-control.md)
* [Prompt Cache Stability](/vault/prompt-cache-stability.md)
