---
type: Study Note
title: "vLLM or llama.cpp: Choosing the right LLM inference engine for your use case"
description: Personal study notes on Red Hat's controlled H200 comparison of vLLM and llama.cpp, emphasizing how concurrency, deployment environment, and latency objectives determine the appropriate inference engine.
resource: https://developers.redhat.com/articles/2025/09/30/vllm-or-llamacpp-choosing-right-llm-inference-engine-your-use-case
source: https://developers.redhat.com/articles/2025/09/30/vllm-or-llamacpp-choosing-right-llm-inference-engine-your-use-case
tags: [model-serving, inference-efficiency, evaluation]
timestamp: 2026-07-13T16:10:26Z
---

# vLLM or llama.cpp: Choosing the right LLM inference engine for your use case - Study Notes

**Author**: Harshith Umesh  
**Publisher**: Red Hat Developer  
**Date**: September 30, 2025  
**Format**: Engineering benchmark article

## What It Is

Red Hat compares vLLM and llama.cpp as LLM-serving engines on one NVIDIA H200 GPU. The article treats them as tools with intentionally different operating envelopes rather than substitutes: vLLM prioritizes multi-request scheduling and aggregate GPU utilization, while llama.cpp prioritizes a portable, lightweight runtime with strong single-stream behavior.

The practical decision is therefore workload-aligned. vLLM is presented as the production choice for concurrent, interactive traffic on powerful GPUs; llama.cpp is presented as the better fit for local development, desktop and embedded deployment, and low-concurrency use where small footprint and hardware reach matter more than fleet-scale throughput.

## Controlled Benchmark Setup

The comparison used OpenShift 4.18.9, CUDA 12.8, NVIDIA driver 570.148.08, and a single H200-PCIe GPU with 141 GB memory. It compared vLLM 0.10.0 serving Llama-3.1-8B-Instruct in bfloat16 with llama.cpp b6100 serving the same model as an F16 GGUF. GuideLLM 0.2.1 ran in the same cluster, using fixed prompt-response pairs and concurrent loads from 1 to 64; each concurrency point ran for 300 seconds.

The authors measured requests per second (RPS), total output tokens per second (TPS), P99 time to first token (TTFT), and P99 inter-token latency (ITL). For llama.cpp, they explicitly tuned GPU offload (`-ngl 99`) and set both prompt and batch-processing thread counts to 64 after empirically finding that setting stable in their deployment.

## What the Results Say

| Workload property | Reported result | Implication |
|---|---|---|
| One concurrent request | The engines had comparable aggregate generation performance; vLLM also had lower P99 ITL at 1–4 users. | Either can suit an isolated request; choose on deployment constraints and startup/portability needs. |
| Increasing concurrency | vLLM RPS and TPS rose with load; llama.cpp throughput remained nearly flat. | Batching and request scheduling dominate the choice for shared services. |
| Peak tested load | vLLM exceeded llama.cpp by more than 35× in RPS and 44× in total TPS. | The H200 result strongly favors vLLM when capacity must scale across many simultaneous users. |
| Initial response under load | vLLM P99 TTFT stayed low and nearly flat; llama.cpp TTFT rose sharply as requests queued. | Interactive latency needs an engine and scheduler designed for concurrency. |
| Token cadence at higher load | llama.cpp's P99 ITL became lower and more stable, while vLLM ITL increased as it formed larger batches. | Aggregate throughput and per-request token cadence are separate objectives. |

The article attributes the contrast to architecture. vLLM increases overall work completed through concurrent request scheduling and larger batches, at some cost to time between tokens for an individual request. llama.cpp's C++ core can generate individual tokens very efficiently, but its queueing behavior makes waiting for the first token unacceptable for the high-concurrency interactive case tested.

## Choosing an Engine

Choose **vLLM** when serving a shared API or application on capable accelerator hardware, particularly when concurrent demand, total throughput, and bounded first-token latency matter. The reported H200 benchmark makes a clear case that running a high-end GPU efficiently requires more than fast single-request decoding; it requires a scheduler that maintains useful parallel work.

Choose **llama.cpp** when portability, minimal dependencies, fast startup, memory-mapped model loading, or broad hardware support are primary constraints. Its CPU-first design, C/C++ implementation, and quantization support make it attractive for laptops, desktops, phones, embedded systems, and local development. The article's conclusion is not that llama.cpp is generally slow, but that it should not be expected to function as a high-concurrency inference server under this configuration.

## Analyst Takeaways

1. **Select the serving runtime from the traffic shape, not model compatibility alone.** The same Llama 3.1 8B model exhibited radically different system behavior when concurrency grew.
2. **Make P99 TTFT a first-class acceptance criterion for interactive systems.** A fast decode loop does not compensate for a request that sits in a queue before it starts.
3. **Separate capacity metrics from user-experience metrics.** RPS/TPS reveal fleet efficiency; TTFT and ITL reveal different parts of the streamed-response experience. Neither pair is sufficient alone.
4. **Benchmark the intended configuration, including tuning.** The comparison used one GPU, precise versions, fixed traffic, and llama.cpp tuning. Engine selection should be repeated with the production model, quantization, prompt lengths, hardware, concurrency distribution, and SLOs.
5. **Treat portability and scalable scheduling as different forms of performance.** llama.cpp's deployment flexibility can be decisive even where vLLM wins a datacenter throughput test.

## Limitations and Questions

- This is one controlled configuration, not a general proof across models, GPUs, quantization levels, prompt lengths, output lengths, or engine versions.
- The engines did not use byte-identical weight formats: vLLM used bfloat16 while llama.cpp used an F16 GGUF. Both are high-precision configurations, but format and implementation differences remain part of the observed system result.
- The article does not publish the raw metric values, request mix, confidence intervals, power draw, memory utilization, or cost per completed request. The stated multiples should be reproduced before sizing production capacity.
- Queueing, batching, and scheduler settings materially affect tail latency. Alternative llama.cpp server settings or a different arrival pattern could alter the observed crossover points.
- The comparison evaluates one H200. It does not establish the best choice for CPU-only, consumer-GPU, multi-GPU, or distributed clusters, even though those environments are central to llama.cpp's stated appeal.

## Vault Ideas Extracted

* [Workload-Aligned Inference Engine Selection](/vault/workload-aligned-inference-engine-selection.md)
