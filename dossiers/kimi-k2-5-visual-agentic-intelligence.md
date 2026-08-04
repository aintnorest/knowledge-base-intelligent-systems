---
type: Study Note
title: Kimi K2.5: Visual Agentic Intelligence
description: Personal study notes on Kimi Team's multimodal technical report, covering early vision-text fusion, zero-vision supervised fine-tuning, joint multimodal RL, and learned parallel-agent orchestration.
resource: https://arxiv.org/abs/2602.02276v1
source: /archive/kimi-k2-5-visual-agentic-intelligence.pdf
tags: [multimodal, multi-agent, orchestration, reinforcement-learning, agents]
timestamp: 2026-07-23T20:03:07Z
---

# Kimi K2.5: Visual Agentic Intelligence - Study Notes

**Authors**: Kimi Team  
**Venue**: Technical report; arXiv:2602.02276v1 [cs.CL]  
**Date**: February 2, 2026  
**Pages**: 30

## What It Is

Kimi K2.5 is a multimodal agentic model report with two ideas of durable systems interest. First, it argues for joint vision-text training early in pretraining and for post-training organized around abilities rather than modalities. Second, it introduces Agent Swarm: a learned orchestrator that dynamically creates frozen specialized subagents and schedules independent work in parallel.

The report presents a broad set of internal and public benchmark results. Its strongest implementation lesson is not the headline model score but the proposed objective for when parallelism helps: minimize the critical path of a decomposed task, not merely the total number of agents or tool calls.

## Joint Text-Vision Training

The model is pretrained on about 15T mixed text and visual tokens. Under a fixed vision-text budget, the authors report that introducing a modest visual ratio early outperformed later, vision-heavy injection on their vision and text evaluations. Their tested early 10:90 vision:text mix exceeded a late 50:50 mix across the displayed visual knowledge, reasoning, OCR, text knowledge, reasoning, and code scores.

For post-training, the report proposes **zero-vision SFT**: text-only instruction data with programmatic image operations available in an interpreter. The authors argue that this activates a jointly pretrained model’s visual/tool capability more effectively than the available human-designed visual trajectories. Outcome-based visual RL then improves grounding, counting, document/chart understanding, and vision-critical STEM tasks. In their ablation, visual RL also raised text-only MMLU-Pro from 84.7 to 86.4, GPQA-Diamond from 84.3 to 86.4, and LongBench v2 from 56.7 to 58.9.

## Agent Swarm and PARL

Agent Swarm separates coordination from execution:

1. A trainable orchestrator decides whether to parallelize, creates specialist prompts, and assigns subtasks.
2. Frozen subagents, drawn from fixed intermediate checkpoints, execute those assignments as environmental actors rather than jointly optimized differentiable components.
3. The orchestrator receives bounded outcomes and selectively integrates them rather than inheriting every subagent trace.

Parallel-Agent Reinforcement Learning (PARL) combines the task outcome with temporary auxiliary rewards for starting subagents and for completed subtasks. The auxiliary terms are annealed toward zero so they encourage exploration without becoming the final objective.

The resource measure is **critical steps**: in each execution stage, the main-agent work plus the longest-running subagent branch. It rewards a balanced decomposition that shortens end-to-end latency and avoids the reward hack of spawning many irrelevant agents.

## Reported Results

The report lists strong scores across reasoning, coding, vision, computer use, and agentic search, including 76.8% on SWE-Bench Verified and 96.1% on AIME 2025 under its configurations.

For the orchestration comparison, the paper reports:

- BrowseComp: Agent Swarm 78.4% versus 60.6% for K2.5 as a single agent, a 17.8-point absolute increase.
- WideSearch: 79.0 versus 72.7 Item-F1, a 6.3-point increase.
- In-house Swarm Bench: 58.3 versus 41.6, though this benchmark is not externally inspectable.
- On WideSearch, reaching progressively higher target Item-F1 required 3x–4.5x less wall-clock time than the single-agent baseline according to the paper’s execution-time curves.

The report attributes some of the gain to proactive context management: isolated subagents retain local working context, and only task-relevant outputs return to the orchestrator. This is context sharding, not post hoc truncation.

## Analyst Takeaways

1. **Parallelism must be learned or evaluated against its critical path.** Agent count is not a proxy for latency or quality.
2. **Freeze executors while learning coordination when credit is sparse.** It makes the orchestration policy’s environment more stable and attributes outcome changes more cleanly.
3. **Use subagents as bounded context partitions.** Return conclusions, provenance, and necessary artifacts—not full histories—when the central agent only needs to coordinate.
4. **Organize multimodal post-training by transferable abilities.** Counting, structured extraction, coding, and tool use can cross modality boundaries; a modality label alone does not define the relevant skill.

## Questions and Limitations

- Many central numbers are from a vendor technical report, internal evaluations, or comparisons with different model modes and tool configurations. They need independent reproduction.
- The cost of an agent swarm includes total tokens, duplicated context, tool contention, and coordination overhead. Critical-step latency alone can conceal higher aggregate compute.
- Frozen self-hosted subagents may not model systems that call heterogeneous external models, tools, or organizations with different reliability and authorization constraints.
- The report does not establish a safety or provenance mechanism for merging conflicting parallel findings. Bounded summaries can still omit decisive evidence or propagate a wrong consensus.

## Vault Ideas Extracted

* [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md)
