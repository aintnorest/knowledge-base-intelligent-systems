---
type: Study Note
title: Performance vs Practicality: A Comparison of vLLM and Ollama
description: Personal study notes on Robert McDermott's hands-on comparison of vLLM and Ollama, including a same-host concurrency benchmark and deployment trade-offs.
resource: https://robert-mcdermott.medium.com/performance-vs-practicality-a-comparison-of-vllm-and-ollama-104acad250fd
source: https://robert-mcdermott.medium.com/performance-vs-practicality-a-comparison-of-vllm-and-ollama-104acad250fd
tags: [model-serving, inference-efficiency, evaluation]
timestamp: 2026-07-13T16:12:33Z
---

# Performance vs Practicality: A Comparison of vLLM and Ollama - Study Notes

- **Author**: Robert McDermott
- **Publisher**: Medium
- **Date**: May 27, 2025
- **Format**: Practitioner tutorial and single-host benchmark

## What It Is

This article combines a vLLM quick-start with a head-to-head serving benchmark against Ollama. Its practical thesis is deliberately conditional: vLLM is the better choice when concurrent-load throughput and latency are the governing requirements; Ollama remains compelling when installation, hardware breadth, model convenience, and local development matter more than maximum throughput.

The author demonstrates both systems through OpenAI-compatible HTTP APIs. That compatibility is an important architectural point: an application that obtains its provider base URL from configuration can keep its client code stable while exchanging a local Ollama endpoint, vLLM, a proxy, or a hosted provider.

## Serving Models and Operational Differences

vLLM is presented as an accelerator-oriented serving runtime. Its relevant mechanisms include PagedAttention for KV-cache management, continuous batching, chunked prefill, speculative decoding, prefix caching, and tensor/pipeline parallelism. The article starts a Qwen3 model with `vllm serve`, exposes it on port 8000, and shows the standard OpenAI-style `/v1/models` and `/v1/chat/completions` endpoints.

Ollama is positioned as the general-purpose local runtime: its Docker-like CLI, curated model library, model switching after server start, CPU or hybrid execution, quantized GGUF support, and Windows/macOS/Linux support reduce adoption friction. The comparison is not that one endpoint is usable and the other is not; both are API-compatible. It is a trade-off between a scheduler optimized for loaded accelerator service and a portable, low-ceremony local tool.

The tutorial also surfaces deployment details that can otherwise be surprising:

1. vLLM may reserve a large fraction of available VRAM by default; `--gpu-memory-utilization` constrains that reservation when other GPU workloads must coexist.
2. Changing a vLLM-served model requires restarting the server, whereas Ollama supports on-demand model selection and switching.
3. Binding a server to localhost is not a security substitute for a remotely exposed endpoint. Remote API use needs authentication and TLS.
4. Qwen3 thinking output can substantially change token generation and latency; the benchmark uses `/no_think` to suppress it.

## Benchmark Design

The author tested one Qwen3 14B model representation on a server with two NVIDIA A6000 GPUs (48 GB each, NVLink), dual AMD EPYC 7343 processors, and 256 GB RAM. vLLM served `Qwen/Qwen3-14B` in BF16; Ollama served `qwen3:14b-fp16` in FP16. Both are described as 28 GB on disk, but the formats and numerical types are not identical, so this is a close operational comparison rather than a perfectly controlled equivalence test.

Each run issued 1,000 identical short requests with a 100-token cap, varying client concurrency from 1 through 1,000. vLLM used two-way tensor parallelism. Ollama was configured to spread work across the two GPUs and allow 32 parallel requests; the author selected that setting by increasing it until GPU VRAM was nearly fully used without CPU spillover. The two servers ran separately because each configuration required exclusive GPU access.

## Important Results

All reported requests succeeded. vLLM led in completed requests per second, generated tokens per second, and average latency at every tested concurrency. The gap widened most markedly under concurrent load.

| Concurrent requests | vLLM requests/s | Ollama requests/s | vLLM tokens/s | Ollama tokens/s | vLLM avg latency | Ollama avg latency |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 2.07 | 1.16 | 91.19 | 50.87 | 0.482 s | 0.865 s |
| 32 | 29.31 | 21.15 | 1289.47 | 930.61 | 1.078 s | 1.480 s |
| 64 | 55.70 | 22.43 | 2450.91 | 987.07 | 1.121 s | 2.760 s |
| 128 | 70.69 | 21.83 | 3110.37 | 960.61 | 1.754 s | 5.481 s |
| 1,000 | 43.50 | 21.85 | 1913.94 | 961.27 | 12.526 s | 23.502 s |

The peak observed request-throughput ratio was 3.23x at 128 concurrent requests (70.69 versus 21.83 requests/s). Ollama reached roughly 22 requests/s at 32-way concurrency and then largely plateaued; increasing concurrency mostly increased its latency. vLLM peaked at 128-way concurrency and declined thereafter, which demonstrates that it too has a saturation point rather than an unlimited concurrency benefit.

## Analyst Takeaways

1. **Select the runtime by workload shape, not by API shape.** An OpenAI-compatible endpoint allows easy substitution, but it does not make the systems operationally equivalent. Low-concurrency laptop use and high-concurrency accelerator serving optimize for different things.
2. **Concurrency tests are essential.** A single-user test understates scheduler behavior. In this study, vLLM's advantage is already visible at one request but becomes decisive as queueing and batching opportunities grow.
3. **Use saturation curves rather than a single headline ratio.** The useful operating point depends on throughput, latency, and tail latency. Here, 128 concurrent requests maximized vLLM throughput, while still higher concurrency reduced throughput and increased latency.
4. **Keep portability and local ergonomics as first-class requirements.** CPU fallback, quantized formats, broad accelerator support, model discovery, and model switching can outweigh a raw serving loss for development, edge, and modest-load workloads.
5. **Separate benchmark configuration from product truth.** Serving engine, version, model format, precision, parallelism, GPU, prompt length, output cap, reasoning mode, and request distribution all contribute to the observed result.

## Limitations and Questions

- This is a practitioner benchmark on one host, one model family, one prompt, and a fixed 100-token completion cap; it does not establish a general performance ranking.
- vLLM uses BF16 Hugging Face weights while Ollama uses an FP16 distribution. The author argues the difference should not affect performance, but differing model packaging and runtime paths still limit strict apples-to-apples interpretation.
- The report provides average, P50, and P95 request latency, but it does not separately report time-to-first-token or inter-token latency, which matter for streaming chat experience.
- The arrival pattern is a fixed client-concurrency sweep, not a production trace with variable prompt lengths, streaming, cancellations, cache hits, retries, or mixed models.
- The article's installation and hardware-support statements describe the tools as of May 2025; current support matrices and defaults should be verified against the projects' documentation before deployment.

## Vault Ideas Extracted

* [Workload-Aligned Inference Engine Selection](/vault/workload-aligned-inference-engine-selection.md)
