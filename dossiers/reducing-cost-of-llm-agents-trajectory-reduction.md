---
type: Study Note
title: Reducing Cost of LLM Agents with Trajectory Reduction
description: Personal study notes on Xiao et al.'s AgentDiet, an inference-time reflection module that locally removes useless, redundant, and expired agent-trajectory content to cut coding-agent cost.
resource: https://doi.org/10.1145/3797084
source: /archive/reducing-cost-of-llm-agents-trajectory-reduction.pdf
tags: [coding-agents, compaction, token-efficiency, agents]
timestamp: 2026-07-14T15:00:00Z
---

# Reducing Cost of LLM Agents with Trajectory Reduction - Study Notes

**Authors**: Yuan-An Xiao, Pengfei Gao, Chao Peng, and Yingfei Xiong
**Venue**: Proceedings of the ACM on Software Engineering, Vol. 3, FSE, Article FSE056
**Date**: July 2026
**Pages**: 22
**DOI**: [10.1145/3797084](https://doi.org/10.1145/3797084)
**Preprint**: arXiv:2509.23586v2 [cs.SE]

## What It Is

This paper studies the cost created by a coding agent's growing interaction trajectory. In a conventional tool loop, each assistant action and tool result remains in the prompt for every later model call. Verbose listings, test output, superseded searches, and duplicated edit payloads therefore compound across the rest of an episode.

The authors introduce **AgentDiet**, an inference-time trajectory reducer integrated into Trae Agent. A separate, cheaper reflection model rewrites one older trajectory step at a time, retaining a short takeaway while removing useless, redundant, or expired material. The system aims to cut cost without changing the primary coding agent or requiring white-box access to its model.

## Why the Trajectory Is the Cost Center

The paper's inspection of 100 Trae Agent traces on SWE-bench Verified finds three common kinds of removable content:

1. **Useless information** — irrelevant file listings and verbose build or test output.
2. **Redundant information** — repeated source fragments and edit contents appearing in both a tool request and result.
3. **Expired information** — exploratory material that ceased to matter after the agent identified the relevant file or hypothesis.

Their average sampled issue trajectory contains 48.4K tokens in 40 steps, but repeated inclusion in later prompts raises accumulated input usage to about 1.0M tokens. Tool messages are the largest component. KV caching reduces some repeated computation, but long prefixes still consume resources and editing an old message invalidates the cache after that point.

## AgentDiet's Local Reflection Loop

After an agent action and tool result are appended, AgentDiet considers a delayed target step rather than asking the primary agent to compact itself. The primary model was unreliable at switching from repair to reduction even under an explicit reflection instruction, so the controller invokes a separate reflection module instead.

The reducer receives a bounded sliding window: `b` preceding steps, the target at `s - a`, and the `a` later steps that establish whether the target's details are still needed. It only processes a target longer than a threshold `theta`, and replaces it only if the proposed reduction saves more than that threshold. This bounds the reflector's input, protects recent state from modification, and limits KV-cache invalidation to the suffix after one older step.

The final configuration uses GPT-5 mini as the reflector with `a = 2`, `b = 1`, and `theta = 500` tokens. The reduction prompt preserves the message structure and asks for compact takeaways rather than blind deletion. A fixed delay also makes failures less catastrophic: the primary agent can still recover omitted information by making another tool call.

## Results That Matter

On 200 held-out SWE-bench Verified tasks and 300 Multi-SWE-bench Flash tasks, with Claude 4 Sonnet and Gemini 2.5 Pro as the coding agent, AgentDiet removes 69.2%–77.4% of the content in the steps it actually processes. Across the four benchmark/model combinations, that produces:

- **39.9%–59.7%** lower accumulated input-token use;
- **21.1%–35.9%** lower final cost after including the reflector's overhead; and
- task success within **-1.0% to +2.0%** of the unmodified agent.

For example, on SWE-bench Verified with Claude, the reported pass rate rises from 64.5% to 66.5% while agent cost falls to 71.4% of baseline plus 7.4% reflector overhead. On Multi-SWE-bench Flash with Gemini, average steps fall from 57.20 to 43.90; the authors attribute that case to fewer long-context invalid-tool-call loops, not to a general guarantee that compaction improves reasoning.

The hyperparameter experiment is equally instructive. GPT-5 mini matched the original agent's 65% validation pass rate while reducing average steps; random or total deletion kept pass rates relatively close but increased steps sharply. A delay of two steps and one earlier context step was the smallest tested setting with negligible performance impact. These are results for this Trae Agent implementation and the stated pricing, not universal operating values.

## Analyst Takeaways

1. **Optimize repeated prompt exposure, not just raw transcript length.** A long observation costs more than its own tokens because it is carried through every later decision. Track accumulated input, cache behavior, step count, and end-task success together.
2. **Separate control-plane compression from task execution.** An agent focused on solving a task may ignore a request to revise its own context. An externally scheduled, low-cost reducer makes intervention timing testable and prevents compaction instructions from competing with the task.
3. **Make reduction local, delayed, and thresholded.** Preserve the latest evidence, give the reducer enough neighboring context to recognize expiration, and skip small steps where model overhead or cache disruption outweighs savings.
4. **Do not equate fewer tokens with safe deletion.** The useful comparison is against a task-quality and total-cost baseline. Blind deletion can appear acceptable on coarse success metrics while causing recovery work, longer episodes, or failures on detail-dependent tasks.

## Questions and Limitations

- The implementation is evaluated only in Trae Agent. The claim that it transfers to other agents rests on similar tool-loop designs rather than direct experiments.
- The reflector is an LLM with no formal preservation guarantee. The prompt, 500-token threshold, delayed target, and bounded window reduce risk but do not make a lossy rewrite reversible.
- The study does not report end-to-end latency because commercial API latency was unstable. Reflection adds a call; parallelizing it could reduce latency but gives the reflector less context.
- The evaluation uses test-passing software-repair metrics. Passing tests may not prove semantic equivalence to a developer patch, and proprietary models may have benchmark exposure.
- Cost depends on model prices, cache discounts, trajectory shape, and tool-output conventions. The reported dollar savings should not be transplanted without a trace-level measurement on the target system.

## Vault Ideas Extracted

* [Delayed Local Trajectory Reduction](/vault/delayed-local-trajectory-reduction.md)
