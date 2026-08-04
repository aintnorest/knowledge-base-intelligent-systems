---
type: Study Note
title: 'SCOPE: Prompt Evolution for Enhancing Agent Effectiveness'
description: Personal study notes on SCOPE, a trace-driven framework that evolves per-agent prompts during execution with scoped guideline memory and diverse optimization perspectives.
resource: https://arxiv.org/abs/2512.15374v2
source: /archive/scope-prompt-evolution-agent-effectiveness.pdf
tags: [self-improvement, prompt-optimization, agent-memory, tool-use, agents]
timestamp: 2026-07-13T18:06:35Z
---

# SCOPE: Prompt Evolution for Enhancing Agent Effectiveness — Study Notes

**Authors**: Zehua Pei, Hui-Ling Zhen, Shixiong Kai, Sinno Jialin Pan, Yunhe Wang, Mingxuan Yuan, and Bei Yu
**Venue**: Preprint under review; arXiv:2512.15374v2 [cs.AI]
**Pages**: 33
**Code**: [github.com/JarvisPei/SCOPE](https://github.com/JarvisPei/SCOPE)

## What It Is

SCOPE (*Self-evolving Context Optimization via Prompt Evolution*) is an online prompt-adaptation layer for tool-using agents. It treats an execution trace as a learning signal: after an error or a completed subtask, a meta-agent synthesizes a short guideline, selects one candidate, routes it to task-local or persistent memory, and integrates the retained guidance into the agent's next system prompt.

The paper's central distinction is between giving an agent more context and teaching it how to process context. SCOPE aims to alter an agent's operating procedure during an episode, rather than only retrieve more material, append a reflection to chat history, or optimize a prompt offline before deployment.

## The Problem It Targets

The authors' analysis of more than 1.5 million execution-log lines identifies two static-prompt failure modes:

1. **Corrective failures**: an agent receives actionable tool errors, argument constraints, or stack traces but treats them as alarms and retries or fabricates a result instead of applying the indicated fix.
2. **Enhancement failures**: an agent completes a step without an explicit error but persists with a weak strategy, such as narrow search terms, insufficient verification, sequential calls, or needless tool use.

The argument is strongest for long, repeated agent invocations: a browser, search, analyst, or planner role may encounter the same kind of signal many times during a task, so a lesson can affect subsequent calls. This also means an incorrect lesson can propagate quickly.

## How SCOPE Works

1. **Synthesize a guideline from the latest trace.** A generator uses corrective rubrics after an error and enhancement rubrics after a successful but apparently suboptimal step. It proposes short imperative prompt additions; the configuration uses two candidates per event.
2. **Select and scope the lesson.** A selector chooses the most specific, actionable, non-duplicative candidate. A classifier labels it tactical (current task only) or strategic (persistent), assigns a confidence score, and routes low-confidence strategic candidates to tactical memory.
3. **Evolve the active prompt.** The next prompt is the base prompt plus strategic memory plus tactical memory. The paper promotes a strategic guideline only at confidence at least 0.85.
4. **Consolidate persistent memory.** When a strategic domain exceeds ten guidelines, an optimizer resolves conflicts, removes rules subsumed by broader ones, and merges similar rules. The target is eight guidelines, leaving capacity for later lessons.
5. **Maintain divergent strategy streams.** The reported system runs two independent prompt-evolution streams: **Efficiency** emphasizes fast recovery, compact context, and fewer calls; **Thoroughness** emphasizes validation, alternate sources, and domain-specific checks. It selects the successful result across the streams.

The authors place synthesized guidance in the system prompt rather than merely as reflection text in the conversation. Their claim is that this makes the lesson background operating guidance rather than an instruction the agent repeatedly acknowledges.

## Experimental Setup

The baseline is a hierarchical research agent: a GPT-4.1 planning agent and browser agent delegate to Gemini-2.5-Pro web-search and analyzer agents. The paper evaluates HLE, GAIA validation (165 tasks), and DeepSearch. It compares static prompts with implementations of Dynamic Cheatsheet (DC) and Agentic Context Engineering (ACE), and reports Pass@2, where either of two runs may solve a task.

The full SCOPE configuration uses GPT-4.1 for its generator, selector, classifier, and memory optimizer; two guideline candidates; two perspective streams; a ten-guideline strategic-memory cap per domain; and asynchronous synthesis. It also reports ablations, placement experiments, a SWE-bench Verified adaptation, and an experiment with GPT-5.4. These are author-reported preprint experiments, not an independently reproduced comparison.

## Results That Stood Out

- On the reported HLE comparison, SCOPE reaches 38.64% success versus 14.23% for the hierarchical static baseline, 18.44% for DC, and 23.72% for ACE. On GAIA it reports 56.97% versus 32.73%, 35.76%, and 38.18%; on DeepSearch, 32.00% versus 14.00%, 21.00%, and 23.00%.
- The GAIA ablation reports a move from 32.73% for the static baseline to 37.58% with guideline generation, 41.21% after dual-stream routing, 44.24% after best-of-two selection, 46.06% after memory optimization, and 56.97% after two-perspective exploration. Thus the largest stated incremental gain comes from strategy diversity, not merely a single reflection loop.
- On GAIA guideline placement, system-prompt placement reports 46.06% accuracy, ahead of user-prompt placement (41.21%), hybrid placement (43.64%), and a strategic-system/tactical-user split (35.76%). The paper interprets the lower error and timeout counts under user placement as possible over-compliance and premature stopping, not necessarily safer behavior.
- In an overhead study of 100 HLE samples, SCOPE reports 4.2% more API calls, 152% more prompt tokens, and 38.6% fewer completion tokens than its baseline; asynchronous synthesis is reported to add no per-step wall-clock latency. These measurements depend on the authors' implementation, caching, models, and workload.
- The two perspective streams have only 33.94% overlap in their solved GAIA tasks. The paper reports that Efficiency does better on Level 3 while Thoroughness does better on Level 2, which is the empirical basis for ensembling divergent strategies.

## What I Take From It

1. **Trace signals should become explicit operating rules only when the system can scope them.** A tool-error fix for one website or schema is a poor global rule; routing uncertain lessons to tactical memory is a useful guard against permanent prompt pollution.
2. **Updating at a natural action boundary can be meaningfully different from reflecting after a task.** The paper reports that over 40% of examined errors occur at step one. A mid-task update can prevent repeated use of the same defective procedure, but it requires strict auditing and rollback.
3. **A persistent playbook needs memory hygiene, not just accumulation.** Conflict resolution, subsumption pruning, and consolidation are concrete answers to the context-growth problem. They should be paired with evidence, versioning, and a way to recover a prior rule set.
4. **Divergence can be a feature.** Efficiency and thoroughness encode incompatible choices after the same event—fail over from a blocked page quickly, or spend time finding an alternate source. Keeping both until outcome selection is more honest than pretending one universal rule is best.

## Questions and Limitations

- The feedback loop uses LLM-generated guidelines, selection, classification, and consolidation. The paper shows language adoption after a guideline, but this is not proof that the guideline was correct or causally responsible for the outcome. Incorrect self-diagnosis can become persistent policy.
- The benchmark results are preprint claims from a custom hierarchical agent with mixed proprietary models and Pass@2 evaluation. They need independent reproduction with exact prompts, tool behavior, seeds, budgets, task splits, selection rules, and cost accounting before motivating deployment.
- The system-prompt placement result is counterintuitive and potentially confounded by instruction hierarchy, context length, termination behavior, and the authors' prompts. It should not be generalized as a universal rule that system prompts outperform user messages.
- Best-of-two perspective selection presumes a usable success evaluator. Many production tasks have delayed, noisy, safety-sensitive, or non-observable outcomes; choosing a stream by an untrustworthy judge risks optimizing the judge instead of the task.
- Memory consolidation may erase exceptions, and a fixed strategic-memory cap is not a safety guarantee. Store individual guidelines, their triggering traces, scope, confidence, versions, and acceptance evidence so a bad global lesson can be removed.

## Vault Ideas Extracted

* [Step-Level Prompt Adaptation](/vault/step-level-prompt-adaptation.md)
* [Scoped Guideline Memory](/vault/scoped-guideline-memory.md)
* [Perspective-Diverse Prompt Evolution](/vault/perspective-diverse-prompt-evolution.md)
