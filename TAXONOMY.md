# Tag Taxonomy

The controlled tag vocabulary for this knowledge base. Every `tags:` entry in
dossier and vault frontmatter must come from this file. Adding a tag requires
adding it here — with a one-line definition, in the same commit — so the
vocabulary grows deliberately instead of sprawling.

**This is a living document.** The field moves fast: several facets below
barely existed two years ago. Re-evaluate this taxonomy as ingests accumulate —
roughly every 25–30 sources, or whenever tagging a new source feels forced.
Promote a concept to a tag when ~5 pages would genuinely carry it; demote a tag
whose cluster never materialized. Distinctive one-off concepts belong as vault
pages, not tags.

## Tagging Rules

- 3–6 tags per page, most central first.
- `agents` goes on every page about agentic systems, alongside its specifics.
- At most one genre tag (`survey`, `taxonomy`, `benchmark`).
- Do not tag `study-note` or `synthesis` — the `type:` field already records this.
- Do not invent tags during ingest. If nothing fits, use the nearest broader
  tag and flag the gap in the ingest report as a candidate for this file.

## Umbrella

| Tag | Definition |
|---|---|
| `agents` | Any page about agentic systems — LLMs that act through tools, loops, or environments. The marked half of the corpus; model/training/serving pages omit it. |

## Agents & Orchestration

| Tag | Definition |
|---|---|
| `multi-agent` | Systems of multiple coordinating agents: topologies, communication, protocols, team dynamics. |
| `orchestration` | Structuring and directing agent work: workflows, pipelines, delegation, control flow. |
| `agent-harness` | The scaffold around the model: tool surfaces, prompts, result delivery, stopping behavior, CLI agents. |
| `tool-use` | Agents calling tools: when to call, tool design, function-call formats, tool errors and taxes. |
| `coding-agents` | Agents acting on codebases through terminals, files, and developer tools. |
| `computer-use` | Agents perceiving and acting via the GUI layer (screen, mouse, keyboard) instead of structured tool APIs; contrast with `coding-agents`. |
| `mcp` | Model Context Protocol: servers, tool discovery, MCP-specific security and supply chain. |
| `agent-skills` | Packaged, reusable agent capabilities: skill definition, routing, progressive disclosure. |
| `long-horizon` | Tasks spanning many steps or sessions: persistence, drift, long-running autonomy. |
| `self-improvement` | Frozen-weights system evolution: agents improving their own prompts, memory, tools, or scaffold at deployment time. Contrast with `reinforcement-learning`. |
| `human-in-the-loop` | Human oversight, approval, feedback, or collaboration inside agent workflows. |

## Memory & Context

| Tag | Definition |
|---|---|
| `context-engineering` | Constructing what the model sees: context assembly, ordering, budgets, file-native context. |
| `agent-memory` | Persistent state across turns or sessions: memory architectures, lifecycle, governance. |
| `retrieval` | Finding relevant material: lexical and vector search, RAG, graph-RAG, agentic search. |
| `long-context` | Behavior and techniques at large context lengths: position effects, degradation, utilization. |
| `compaction` | Reducing accumulated context or memory: summarization, pruning, compression of state. |
| `token-efficiency` | Spending fewer tokens for the same outcome: minification, compact formats, observation budgets. |
| `knowledge-graphs` | Graph-structured knowledge for machines: construction, traversal, graph-backed retrieval. |

## Prompting & Reasoning

| Tag | Definition |
|---|---|
| `prompting` | Prompt design and techniques generally: instructions, few-shot, formatting, elicitation. |
| `prompt-optimization` | Automatic or systematic prompt improvement: APO, DSPy-style compilation, textual gradients. |
| `chain-of-thought` | Explicit intermediate reasoning: CoT variants, self-consistency, when CoT helps or hurts. |
| `reasoning` | Model reasoning ability beyond prompting mechanics: latent reasoning, budgets, failure modes. |
| `decomposition` | Breaking problems into solvable parts: least-to-most, task splitting, subgoal structures. |

## Security

| Tag | Definition |
|---|---|
| `agent-security` | Security of agentic systems broadly: threat models, attack surfaces, defense architectures. |
| `prompt-injection` | Adversarial instructions in model inputs: attacks, defenses, injection-resistant designs. |
| `sandboxing` | Confining execution: containers, microVMs, seccomp/Landlock, isolation boundaries. |
| `access-control` | Who may do what: permissions, least privilege, authorization, policy enforcement, information flow. |
| `provenance` | Tracking where data and actions came from: lineage, attribution, provenance-conditioned decisions. |
| `privacy` | Protecting sensitive data: leakage, extraction, confidentiality in training and inference. |
| `adversarial-robustness` | Resisting adversarial inputs beyond injection: evasion, poisoning, adversarial ML. |

## Evaluation

| Tag | Definition |
|---|---|
| `evaluation` | Measuring model or agent quality: methodology, metrics, protocols, contamination. |
| `benchmark` | Genre tag — the page's source introduces a benchmark or evaluation suite. |
| `llm-as-judge` | Models grading model outputs: judge protocols, inflation, calibration, scaling judges. |
| `verification` | Checking that outputs or behavior are correct: validation gates, formal or procedural checks. |
| `peer-review` | Scholarly review as a task or evaluation target: generated reviews, review quality. |

## Models & Architecture

| Tag | Definition |
|---|---|
| `model-architecture` | Neural architecture design: layers, blocks, structural innovations. |
| `attention` | Attention mechanisms: linear/hybrid attention, residuals, efficiency variants. |
| `mixture-of-experts` | Sparse expert models: routing, expert design, MoE serving trade-offs. |
| `multimodal` | Models spanning modalities: VLMs, visual reasoning, multimodal training. |

## Learning & Training

| Tag | Definition |
|---|---|
| `reinforcement-learning` | Weight updates from reward: RLHF, GRPO/PPO variants, policy optimization. Contrast with `self-improvement`. |
| `fine-tuning` | Supervised weight adaptation: instruction tuning, distillation, adapters. |
| `in-context-learning` | Learning from examples in the prompt without weight updates. |
| `test-time-scaling` | Spending more inference compute for quality: sampling, search, deliberation at test time. |
| `generalization` | Whether learned behavior transfers: length generalization, out-of-distribution behavior. |

## Inference & Serving

| Tag | Definition |
|---|---|
| `inference-efficiency` | Cost, latency, and throughput of running models: KV cache, batching, serving economics. |
| `model-serving` | Deployment infrastructure: inference engines, vLLM/Ollama-class systems, serving stacks. |
| `routing` | Directing requests among models, experts, tools, or strategies by predicted fit. |
| `quantization` | Reduced-precision models for cheaper inference. *(Reserved — no pages yet.)* |

## Governance & Genre

| Tag | Definition |
|---|---|
| `governance` | Organizational control of AI systems: audit, compliance, accountability, risk management. |
| `reliability` | Making systems dependable: failure modes, assurance, fallbacks, robustness in operation. |
| `enterprise` | Deployment in organizational settings: enterprise constraints, integration, adoption. |
| `survey` | Genre tag — the source is a survey or systematic review. |
| `taxonomy` | Genre tag — the source's primary contribution is a classification scheme. |

## Watchlist

Candidate tags flagged during tagging because the existing vocabulary fit
poorly. Promote one when ~5 pages would genuinely carry it; prune entries that
stop accumulating evidence.

| Candidate | Evidence so far |
|---|---|
| `systems-security` | Non-agent OS/application hardening: [locking-down-science-gateways-landlock-seccomp](/dossiers/locking-down-science-gateways-landlock-seccomp.md), [runtime-activated-application-sandboxing](/vault/runtime-activated-application-sandboxing.md). Flagged independently twice. |
| `policy-optimization-mechanics` | RL training-loop internals (staleness, importance sampling, hyperparameter transfer) distinct from reward design: [batch-size-invariance-policy-optimization](/dossiers/batch-size-invariance-policy-optimization.md), [decoupled-behavior-proximal-policies](/vault/decoupled-behavior-proximal-policies.md). Flagged independently twice. |
| `structured-extraction` | Extraction/schema-discovery as first-class task: [dataset-level-feature-discovery](/vault/dataset-level-feature-discovery.md), [maste-zero-shot-aspect-sentiment-triplet-extraction](/dossiers/maste-zero-shot-aspect-sentiment-triplet-extraction.md), [grounded-structured-extraction](/vault/grounded-structured-extraction.md). |
| `dataset-construction` | Benchmark/dataset-building methodology: [benchmark-reverse-engineering](/vault/benchmark-reverse-engineering.md), [anti-leakage-evaluation](/vault/anti-leakage-evaluation.md), [anti-leakage-system-prompt](/vault/anti-leakage-system-prompt.md). |
| `human-skill-coaching` | AI that develops the user's own skill: [prompt-coach-agentic-tutor](/dossiers/prompt-coach-agentic-tutor.md), [in-flow-socratic-prompt-coaching](/vault/in-flow-socratic-prompt-coaching.md). |
| `active-learning` | Uncertainty-driven example selection: [active-prompt](/vault/active-prompt.md). |

## Alias Map

Historical tags consolidated during the 2026-07 backfill. Do not reintroduce
the left column; use the right column.

| Old | Use instead |
|---|---|
| `prompts`, `prompt-engineering` | `prompting` |
| `automatic-prompt-optimization`, `dspy`, `textual-gradients` | `prompt-optimization` |
| `multi-agent-systems`, `coordination`, `communication-protocols` | `multi-agent` |
| `agent-orchestration` | `orchestration` |
| `cli-agents` | `agent-harness` |
| `agent-evaluation`, `llm-evaluation`, `benchmarking`, `benchmarks`, `metrics` | `evaluation` |
| `isolation`, `execution-isolation`, `containers`, `microvms`, `seccomp`, `landlock` | `sandboxing` |
| `least-privilege`, `authorization`, `permissions`, `policy-enforcement`, `information-flow-control`, `runtime-enforcement` | `access-control` |
| `memory`, `context-management` | `agent-memory` |
| `memory-compaction` | `compaction` |
| `rag`, `graph-rag`, `search` | `retrieval` (add `knowledge-graphs` when graph-based) |
| `latency`, `throughput`, `kv-cache`, `vllm`, `llm-inference` | `inference-efficiency` |
| `agent-reliability`, `assurance` | `reliability` |
| `validation` | `verification` |
| `policy-optimization`, `credit-assignment` | `reinforcement-learning` |
| `self-improving-agents`, `self-refinement` | `self-improvement` |
| `long-horizon-agents` | `long-horizon` |
| `enterprise-ai` | `enterprise` |
| `vlm` | `multimodal` |
| `agents` (as generic filler), `llm`, `llm-agents` | omit, or `agents` per the umbrella rule |
| `study-note`, `synthesis` | omit — recorded by `type:` |
