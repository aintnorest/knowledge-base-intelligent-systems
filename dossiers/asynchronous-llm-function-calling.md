---
type: Study Note
title: Asynchronous LLM Function Calling
description: AsyncLM's interruptible-decoding design overlaps model generation with tool execution, while separating safe interrupt boundaries, dependency waits, and cache residency decisions.
resource: https://arxiv.org/abs/2412.07017v1
source: /archive/asynchronous-llm-function-calling.pdf
tags: [tool-use, orchestration, agents, inference-efficiency, model-serving, evaluation]
timestamp: 2026-10-04T05:20:08Z
---

# Asynchronous LLM Function Calling — Study Notes

**Authors**: In Gim, Seung-seob Lee, and Lin Zhong  
**Source**: December 9, 2024 arXiv v1 preprint; the archived paper labels itself preliminary work under review.

## What It Is

AsyncLM makes model decoding interruptible: a generated function starts executing immediately, while the model continues independent work. When a result arrives, the runtime inserts a completion notification into the live token stream. This is more than launching a parallel batch and waiting for its slowest member: generation and execution themselves overlap, and newly available dependent work can start without a whole-batch barrier.

## Problem and Motivation

Synchronous tool loops alternate between model inference and external execution. Even a parallel group leaves the model idle until results return. A changing dependency graph, such as recursively following newly discovered relationships, is difficult to pre-plan completely. The paper asks whether asynchronous interaction can expose useful work sooner without corrupting function arguments or making the model lose track of pending results.

## Mechanism as an Idea

A compact in-context protocol distinguishes function requests, identified results, temporary waits, and final completion. Calls are non-blocking; results are queued and inserted only outside critical sections where the model is generating an indivisible call. A token monitor enforces protocol structure and prevents the model from fabricating runtime interrupt markers. Result identifiers connect notifications to pending work, though the prototype does not enforce identifier uniqueness.

Fine-tuning teaches the model to select ready calls, respond to interrupts, and explicitly pause when dependencies leave no useful work. Simulated training traces assign variable execution durations and token-generation speeds so scheduling is not tied to a function name. A longest-processing-time-first heuristic launches the longest estimated ready work early. It is optimal in the paper's independent-function model, not for arbitrary dependency graphs.

A temporary wait is a runtime state, not a final answer or an invitation to keep producing idle text. During that wait, the serving system compares keeping the KV cache resident, swapping it, or dropping and recomputing it against expected time to the next completion. The choice depends on context length and restoration cost.

## Results and Admissions

The study uses BFCL scenarios and a constructed set combining three independent multi-step tasks. It reports **800 total samples**, with **200 for fine-tuning and 600 for evaluation**; function execution spans **30–500 ms**, averaging **110 ms**. Local inference uses Llama-3.2 1B/3B on an RTX 4090. GPT-4o's fully integrated asynchronous latency is **emulated** using **5 ms per output token**, not measured in a modified cloud inference service.

For independent calls, integrated asynchronous execution is **1.6×** faster than serial synchronous execution locally and **2.1×** in the cloud emulation. For multi-step parallel tasks, the corresponding gains reach **2.4×** and **5.4×**; synchronous parallel calling reaches **1.6×** and **3.2×**. Longest-first scheduling is **8%** faster on average than random ready-call selection locally, but the authors give a dependency-chain example where it is suboptimal.

Latency tests include a **ground-truth cheat sheet** to keep call sequences comparable. Accuracy is evaluated separately by exact call AST and execution-order matching. Fine-tuned Llama-3B achieves **66.07%** synchronous accuracy in the protocol versus **65.97%** asynchronous; GPT-4o with few-shot examples achieves **57.80% versus 59.61%**. The result does not extend to every model: GPT-4o-mini falls from **53.41% to 41.44%**, and few-shot Llama-3B from **17.33% to 5.46%**.

An API-only emulation that restarts a request for each interrupt is **1.5× slower** than synchronous parallel calling on GPT-4o, with **310 ms** average time to first token. The local naive version has **59 ms** average time to first token and is **1.1× faster**. Integrated execution adds about **20 tokens**, **90 ms**, and **27.5 MB** of KV cache on the 3B multi-step workload.

## Analyst Takeaways

1. **Remove unnecessary barriers, not necessary dependencies.** Dispatching ready work and consuming individual completions avoids waiting for unrelated stragglers.
2. **Waiting should be represented explicitly in the control plane.** A blocked model can release compute or cache resources without spending turns announcing that it is still blocked.
3. **Interrupt semantics are a learned capability and a runtime invariant.** Safe insertion boundaries prevent syntactic corruption; training determines whether the model can use the resulting state correctly.
4. **Serving support can decide whether asynchrony saves anything.** Repeated request startup and prefill can outweigh overlapped tool time. A prompt-level imitation is not equivalent to an interruptible inference engine.

## Questions and Limitations

- The highest cloud speedups are emulated; cheat-sheet-controlled latency does not measure autonomous end-task success at those speeds.
- AST matching does not prove that effects are safe or satisfy a user goal. Cancellation, retries, duplicate effects, and trust in injected notifications need separate enforcement.
- The prose calls the GPT-4o-mini accuracy reduction slight despite the table's 11.97-point drop from protocol-matched synchronous execution. Accuracy preservation is model- and adaptation-dependent.
- The independent-function theorem assumes equal generated work and negligible extra overhead. Its strict inequality against serial execution also needs more than one positive-duration call; it is not a universal performance guarantee.
- The source describes critical-section flag polarity inconsistently across sections. The intended invariant is clear—defer interrupts inside function-call generation—but the prose is not an implementation specification.

## Vault Ideas Extracted

* [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md)
