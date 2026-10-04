---
type: Log
title: Knowledge Base Source Registry and Ingest Log
description: Authoritative registry of ingested sources and chronological history of their archive and vault changes.
tags: [log, source-registry, history, ingest]
timestamp: 2026-07-11T16:00:00Z
---

# Knowledge Base Source Registry and Ingest Log

Each `**Ingest**` entry registers exactly one source. Its source key is the
authoritative duplicate-detection record: `doi:…`, another stable publisher ID
such as `ssrn:…`, `arxiv:…` (without a revision suffix), `url:…` (normalized
canonical URL without the scheme), or `sha256:…` when no stronger identifier
exists. Do not add a second ingest entry for a registered key; append subsequent
maintenance as a non-ingest event.

## 2026-07-14 (Execution-Security Research SoK)
* **Ingest**: `doi:10.48550/arxiv.2607.05743` — `The Balkanization of Execution-Security Research for AI Coding Agents dossier` at `/dossiers/execution-security-research-ai-coding-agents.md` — canonical: https://arxiv.org/abs/2607.05743v1
* **Archive**: Moved source PDF to [/archive/execution-security-research-ai-coding-agents.pdf](/archive/execution-security-research-ai-coding-agents.pdf)
* **Vault**: Created [cross-mechanism-execution-security-evaluation](/vault/cross-mechanism-execution-security-evaluation.md)

## 2026-07-14 (Landlock/Seccomp Science Gateways)
* **Ingest**: `doi:10.48550/arxiv.2509.18548` — `Locking Down Science Gateways with Landlock and Seccomp dossier` at `/dossiers/locking-down-science-gateways-landlock-seccomp.md` — canonical: https://arxiv.org/abs/2509.18548v2
* **Archive**: Moved source PDF to [/archive/locking-down-science-gateways-landlock-seccomp.pdf](/archive/locking-down-science-gateways-landlock-seccomp.pdf)
* **Vault**: Created [runtime-activated-application-sandboxing](/vault/runtime-activated-application-sandboxing.md)

## 2026-07-14 (TERAG)
* **Ingest**: `arxiv:2509.18667` — `TERAG: Token-Efficient Graph-Based Retrieval-Augmented Generation dossier` at `/dossiers/terag-token-efficient-graph-rag.md` — canonical: https://arxiv.org/abs/2509.18667v3
* **Archive**: Moved source PDF to [/archive/terag-token-efficient-graph-rag.pdf](/archive/terag-token-efficient-graph-rag.pdf)
* **Vault**: Created [single-pass-concept-graph-construction](/vault/single-pass-concept-graph-construction.md), [frequency-weighted-personalized-pagerank](/vault/frequency-weighted-personalized-pagerank.md)

## 2026-07-14 (AgentDiet)
* **Ingest**: `doi:10.1145/3797084` — `Reducing Cost of LLM Agents with Trajectory Reduction dossier` at `/dossiers/reducing-cost-of-llm-agents-trajectory-reduction.md` — canonical: https://doi.org/10.1145/3797084
* **Archive**: Moved source PDF to [/archive/reducing-cost-of-llm-agents-trajectory-reduction.pdf](/archive/reducing-cost-of-llm-agents-trajectory-reduction.pdf)
* **Vault**: Created [delayed-local-trajectory-reduction](/vault/delayed-local-trajectory-reduction.md)

## 2026-07-13 (LLPO)
* **Ingest**: `doi:10.18653/v1/2026.eacl-long.204` — `Don't Generate, Classify! Low-Latency Prompt Optimization with Structured Complementary Prompt dossier` at `/dossiers/low-latency-prompt-optimization-structured-complementary-prompt.md` — canonical: https://aclanthology.org/2026.eacl-long.204/
* **Archive**: Moved source PDF to [/archive/low-latency-prompt-optimization-structured-complementary-prompt.pdf](/archive/low-latency-prompt-optimization-structured-complementary-prompt.pdf)
* **Vault**: Created [classifier-based-prompt-optimization](/vault/classifier-based-prompt-optimization.md)
* **Vault**: Updated [prompt-optimization](/vault/prompt-optimization.md)

## 2026-07-13 (Automatic Prompt Optimization Heuristic Search Survey)
* **Ingest**: `doi:10.48550/arxiv.2502.18746` — `A Survey of Automatic Prompt Optimization with Instruction-focused Heuristic-based Search Algorithm dossier` at `/dossiers/automatic-prompt-optimization-heuristic-search-survey.md` — canonical: https://arxiv.org/abs/2502.18746v2
* **Archive**: Moved source PDF to [/archive/automatic-prompt-optimization-heuristic-search-survey.pdf](/archive/automatic-prompt-optimization-heuristic-search-survey.pdf)
* **Vault**: Updated [prompt-optimization](/vault/prompt-optimization.md)

## 2026-07-13 (Multi-Agent Design)
* **Ingest**: `arxiv:2502.02533` — `Multi-Agent Design: Optimizing Agents with Better Prompts and Topologies dossier` at `/dossiers/multi-agent-design-prompts-topologies.md` — canonical: https://arxiv.org/abs/2502.02533v2
* **Archive**: Moved source PDF to [/archive/multi-agent-design-prompts-topologies.pdf](/archive/multi-agent-design-prompts-topologies.pdf)
* **Vault**: Created [influence-weighted-topology-search](/vault/influence-weighted-topology-search.md)
* **Vault**: Updated [configuration-aware-multi-agent-prompt-optimization](/vault/configuration-aware-multi-agent-prompt-optimization.md), [multi-agent-orchestration](/vault/multi-agent-orchestration.md), [prompt-optimization](/vault/prompt-optimization.md)

## 2026-07-13 (SCOPE)
* **Ingest**: `arxiv:2512.15374` — `SCOPE: Prompt Evolution for Enhancing Agent Effectiveness dossier` at `/dossiers/scope-prompt-evolution-agent-effectiveness.md` — canonical: https://arxiv.org/abs/2512.15374v2
* **Archive**: Moved source PDF to [/archive/scope-prompt-evolution-agent-effectiveness.pdf](/archive/scope-prompt-evolution-agent-effectiveness.pdf)
* **Vault**: Created [step-level-prompt-adaptation](/vault/step-level-prompt-adaptation.md), [scoped-guideline-memory](/vault/scoped-guideline-memory.md), [perspective-diverse-prompt-evolution](/vault/perspective-diverse-prompt-evolution.md)

## 2026-07-13 (Context Engineering Maturity Model)
* **Ingest**: `arxiv:2603.09619` — `Context Engineering: From Prompts to Corporate Multi-Agent Architecture dossier` at `/dossiers/context-engineering-corporate-multi-agent-architecture.md` — canonical: https://arxiv.org/abs/2603.09619v2
* **Archive**: Moved source PDF to [/archive/context-engineering-corporate-multi-agent-architecture.pdf](/archive/context-engineering-corporate-multi-agent-architecture.pdf)
* **Vault**: Created [intent-engineering-for-agents](/vault/intent-engineering-for-agents.md), [machine-readable-agent-specifications](/vault/machine-readable-agent-specifications.md)
* **Vault**: Updated [permission-scoped-synthesis](/vault/permission-scoped-synthesis.md)

## 2026-07-13 (File-Native Context Engineering)
* **Ingest**: `arxiv:2602.05447` — `Structured Context Engineering for File-Native Agentic Systems dossier` at `/dossiers/structured-context-engineering-file-native-agents.md` — canonical: https://arxiv.org/abs/2602.05447v2
* **Archive**: Moved source PDF to [/archive/structured-context-engineering-file-native-agents.pdf](/archive/structured-context-engineering-file-native-agents.pdf)
* **Vault**: Created [file-native-context-retrieval](/vault/file-native-context-retrieval.md), [retrieval-interface-tax](/vault/retrieval-interface-tax.md)

## 2026-07-13 (Temporal and Structural Credit Assignment)
* **Ingest**: `arxiv:2605.30227` — `Unifying Temporal and Structural Credit Assignment in LLM-Based Multi-Agent Prompt Optimization dossier` at `/dossiers/temporal-structural-credit-assignment-multi-agent-prompt-optimization.md` — canonical: https://arxiv.org/abs/2605.30227v1
* **Archive**: Moved source PDF to [/archive/temporal-structural-credit-assignment-multi-agent-prompt-optimization.pdf](/archive/temporal-structural-credit-assignment-multi-agent-prompt-optimization.pdf)
* **Vault**: Created [credit-guided-multi-agent-prompt-optimization](/vault/credit-guided-multi-agent-prompt-optimization.md)
* **Vault**: Updated [prompt-optimization](/vault/prompt-optimization.md)

## 2026-07-11
* **Ingest**: `arxiv:2604.05018` — [PaperOrchestra dossier](/dossiers/paperorchestra.md) — canonical: https://arxiv.org/abs/2604.05018v1
* **Vault**: Created [multi-agent-orchestration](/vault/multi-agent-orchestration.md)
* **Vault**: Created [hybrid-discovery-verification](/vault/hybrid-discovery-verification.md)
* **Vault**: Created [score-gated-refinement](/vault/score-gated-refinement.md)
* **Vault**: Created [closed-loop-vlm-visual-generation](/vault/closed-loop-vlm-visual-generation.md)
* **Vault**: Created [benchmark-reverse-engineering](/vault/benchmark-reverse-engineering.md)
* **Vault**: Created [anti-leakage-evaluation](/vault/anti-leakage-evaluation.md)
* **Vault**: Created [sparse-concept-note-prompt](/vault/sparse-concept-note-prompt.md)
* **Vault**: Created [dense-technical-proposal-prompt](/vault/dense-technical-proposal-prompt.md)
* **Vault**: Created [experimental-log-extraction-prompt](/vault/experimental-log-extraction-prompt.md)
* **Vault**: Created [anti-leakage-system-prompt](/vault/anti-leakage-system-prompt.md)
* **Vault**: Created [citation-f1-metric](/vault/citation-f1-metric.md)
* **Vault**: Created [llm-as-judge-with-anti-inflation](/vault/llm-as-judge-with-anti-inflation.md)
* **Setup**: Initialized knowledge base directory structure and README

## 2026-07-11 (second ingest)
* **Ingest**: `arxiv:2310.14735` — [Prompt Engineering Survey dossier](/dossiers/prompt-engineering-survey.md) — canonical: https://arxiv.org/abs/2310.14735v6
* **Vault**: Created [chain-of-thought-prompting](/vault/chain-of-thought-prompting.md)
* **Vault**: Created [self-consistency-decoding](/vault/self-consistency-decoding.md)
* **Vault**: Created [tree-of-thoughts](/vault/tree-of-thoughts.md)
* **Vault**: Created [react-framework](/vault/react-framework.md)
* **Vault**: Created [decomposed-prompting](/vault/decomposed-prompting.md)
* **Vault**: Created [active-prompt](/vault/active-prompt.md)
* **Vault**: Created [prompt-optimization](/vault/prompt-optimization.md)
* **Vault**: Created [retrieval-augmentation](/vault/retrieval-augmentation.md)
* **Vault**: Created [vlm-prompt-learning](/vault/vlm-prompt-learning.md)
* **Vault**: Created [prompt-security-taxonomy](/vault/prompt-security-taxonomy.md)
* **Vault**: Created [llm-evaluation-methods](/vault/llm-evaluation-methods.md)
* **Vault**: Created [ai-agent-evolution](/vault/ai-agent-evolution.md)

## 2026-07-12
* **Ingest**: `arxiv:2510.04618` — [Agentic Context Engineering dossier](/dossiers/agentic-context-engineering.md) — canonical: https://arxiv.org/abs/2510.04618v3
* **Archive**: Moved source PDF to [/archive/agentic-context-engineering.pdf](/archive/agentic-context-engineering.pdf)
* **Vault**: Created [evolving-context-playbooks](/vault/evolving-context-playbooks.md)
* **Vault**: Created [context-collapse](/vault/context-collapse.md)
* **Vault**: Created [incremental-delta-context-updates](/vault/incremental-delta-context-updates.md)
* **Vault**: Created [feedback-grounded-context-adaptation](/vault/feedback-grounded-context-adaptation.md)

## 2026-07-12 (second ingest)
* **Ingest**: `ssrn:5165270` — [Prompt Engineering is Complicated and Contingent dossier](/dossiers/prompt-engineering-complicated-contingent.md) — canonical: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5165270
* **Archive**: Moved source PDF to [/archive/prompt-engineering-complicated-contingent.pdf](/archive/prompt-engineering-complicated-contingent.pdf)
* **Vault**: Created [prompt-contingency](/vault/prompt-contingency.md)
* **Vault**: Updated [llm-evaluation-methods](/vault/llm-evaluation-methods.md)

## 2026-07-12 (third ingest)
* **Ingest**: `arxiv:2607.08716` — [Remember When It Matters dossier](/dossiers/proactive-memory-agent.md) — canonical: https://arxiv.org/abs/2607.08716v1
* **Archive**: Moved source PDF to [/archive/proactive-memory-agent.pdf](/archive/proactive-memory-agent.pdf)
* **Vault**: Created [behavioral-state-decay](/vault/behavioral-state-decay.md)
* **Vault**: Created [proactive-memory-intervention](/vault/proactive-memory-intervention.md)
* **Vault**: Created [structured-execution-memory](/vault/structured-execution-memory.md)

## 2026-07-12 (fourth ingest)
* **Ingest**: `url:youtube.com/watch?v=5ID22ACI7IM` — [Mergeable by Default dossier](/dossiers/context-engineering-talk.md) — canonical: https://www.youtube.com/watch?v=5ID22ACI7IM
* **Archive**: Moved source notes to [/archive/context-engineering-talk.md](/archive/context-engineering-talk.md)
* **Vault**: Created [conflict-aware-context-retrieval](/vault/conflict-aware-context-retrieval.md)
* **Vault**: Created [expert-weighted-retrieval](/vault/expert-weighted-retrieval.md)
* **Vault**: Created [permission-scoped-synthesis](/vault/permission-scoped-synthesis.md)

## 2026-07-12 (fifth ingest)
* **Ingest**: `arxiv:2602.00337` — [Smarter AI Through Prompt Engineering dossier](/dossiers/smarter-ai-through-prompt-engineering.md) — canonical: https://arxiv.org/abs/2602.00337
* **Archive**: Moved source PDF to [/archive/smarter-ai-through-prompt-engineering.pdf](/archive/smarter-ai-through-prompt-engineering.pdf)
* **Vault**: Updated [prompt-optimization](/vault/prompt-optimization.md)

## 2026-07-13 (third ingest)
* **Ingest**: `arxiv:2407.12994` — [A Survey of Prompt Engineering Methods in Large Language Models for Different NLP Tasks dossier](/dossiers/survey-prompt-engineering-methods-nlp-tasks.md) — canonical: https://arxiv.org/abs/2407.12994v2
* **Archive**: Moved source PDF to [/archive/survey-prompt-engineering-methods-nlp-tasks.pdf](/archive/survey-prompt-engineering-methods-nlp-tasks.pdf)
* **Vault**: Updated [application-centric-prompt-taxonomy](/vault/application-centric-prompt-taxonomy.md)

## 2026-07-13 (third ingest)
* **Ingest**: `arxiv:2406.06608` — [The Prompt Report dossier](/dossiers/prompt-report.md) — canonical: https://arxiv.org/abs/2406.06608v6
* **Archive**: Moved source PDF to [/archive/prompt-report.pdf](/archive/prompt-report.pdf)
* **Vault**: Created [answer-engineering](/vault/answer-engineering.md)
* **Vault**: Updated [application-centric-prompt-taxonomy](/vault/application-centric-prompt-taxonomy.md)
* **Vault**: Updated [prompt-contingency](/vault/prompt-contingency.md)
* **Vault**: Updated [llm-evaluation-methods](/vault/llm-evaluation-methods.md)

## 2026-07-12 (sixth ingest)
* **Ingest**: `arxiv:2410.12843` — [Exploring Prompt Engineering dossier](/dossiers/exploring-prompt-engineering-swot.md) — canonical: https://arxiv.org/abs/2410.12843v1
* **Archive**: Moved source PDF to [/archive/exploring-prompt-engineering-swot.pdf](/archive/exploring-prompt-engineering-swot.pdf)
* **Vault**: Created [prompt-technique-swot-analysis](/vault/prompt-technique-swot-analysis.md)
* **Vault**: Updated [llm-evaluation-methods](/vault/llm-evaluation-methods.md)

## 2026-07-12 (sixth ingest)
* **Ingest**: `arxiv:2402.07927` — [A Systematic Survey of Prompt Engineering in Large Language Models dossier](/dossiers/systematic-survey-prompt-engineering-llms.md) — canonical: https://arxiv.org/abs/2402.07927v2
* **Archive**: Moved source PDF to [/archive/systematic-survey-prompt-engineering-llms.pdf](/archive/systematic-survey-prompt-engineering-llms.pdf)
* **Vault**: Created [application-centric-prompt-taxonomy](/vault/application-centric-prompt-taxonomy.md)
* **Vault**: Updated [prompt-optimization](/vault/prompt-optimization.md)
* **Vault**: Updated [retrieval-augmentation](/vault/retrieval-augmentation.md)

## 2026-07-12 (eighth ingest)
* **Ingest**: `arxiv:2005.14165` — [Language Models are Few-Shot Learners dossier](/dossiers/language-models-are-few-shot-learners.md) — canonical: https://arxiv.org/abs/2005.14165v4
* **Archive**: Moved source PDF to [/archive/language-models-are-few-shot-learners.pdf](/archive/language-models-are-few-shot-learners.pdf)
* **Vault**: Created [in-context-learning](/vault/in-context-learning.md)
* **Vault**: Updated [anti-leakage-evaluation](/vault/anti-leakage-evaluation.md)

## 2026-07-12 (ninth ingest)
* **Ingest**: `arxiv:2201.11903` — [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models dossier](/dossiers/chain-of-thought-prompting-elicits-reasoning.md) — canonical: https://arxiv.org/abs/2201.11903v6
* **Archive**: Moved source PDF to [/archive/chain-of-thought-prompting-elicits-reasoning.pdf](/archive/chain-of-thought-prompting-elicits-reasoning.pdf)
* **Vault**: Updated [chain-of-thought-prompting](/vault/chain-of-thought-prompting.md)

## 2026-07-12 (tenth ingest)
* **Ingest**: `arxiv:2205.11916` — [Large Language Models are Zero-Shot Reasoners dossier](/dossiers/large-language-models-are-zero-shot-reasoners.md) — canonical: https://arxiv.org/abs/2205.11916v4
* **Archive**: Moved source PDF to [/archive/large-language-models-are-zero-shot-reasoners.pdf](/archive/large-language-models-are-zero-shot-reasoners.pdf)
* **Vault**: Updated [chain-of-thought-prompting](/vault/chain-of-thought-prompting.md)

## 2026-07-12 (eleventh ingest)
* **Ingest**: `arxiv:2305.10601` — [Tree of Thoughts: Deliberate Problem Solving with Large Language Models dossier](/dossiers/tree-of-thoughts-deliberate-problem-solving.md) — canonical: https://arxiv.org/abs/2305.10601v2
* **Archive**: Moved source PDF to [/archive/tree-of-thoughts-deliberate-problem-solving.pdf](/archive/tree-of-thoughts-deliberate-problem-solving.pdf)
* **Vault**: Updated [tree-of-thoughts](/vault/tree-of-thoughts.md)

## 2026-07-12 (eleventh ingest)
* **Ingest**: `arxiv:2203.11171` — [Self-Consistency Improves Chain of Thought Reasoning in Language Models dossier](/dossiers/self-consistency-improves-chain-of-thought-reasoning.md) — canonical: https://arxiv.org/abs/2203.11171v4
* **Archive**: Moved source PDF to [/archive/self-consistency-improves-chain-of-thought-reasoning.pdf](/archive/self-consistency-improves-chain-of-thought-reasoning.pdf)
* **Vault**: Updated [self-consistency-decoding](/vault/self-consistency-decoding.md)

## 2026-07-12 (twelfth ingest)
* **Ingest**: `arxiv:2210.03629` — [ReAct: Synergizing Reasoning and Acting in Language Models dossier](/dossiers/react-synergizing-reasoning-and-acting.md) — canonical: https://arxiv.org/abs/2210.03629v3
* **Archive**: Moved source PDF to [/archive/react-synergizing-reasoning-and-acting.pdf](/archive/react-synergizing-reasoning-and-acting.pdf)
* **Vault**: Updated [react-framework](/vault/react-framework.md)

## 2026-07-13
* **Ingest**: `arxiv:2205.10625` — [Least-to-Most Prompting Enables Complex Reasoning in Large Language Models dossier](/dossiers/least-to-most-prompting.md) — canonical: https://arxiv.org/abs/2205.10625v3
* **Archive**: Moved source PDF to [/archive/least-to-most-prompting.pdf](/archive/least-to-most-prompting.pdf)
* **Vault**: Created [least-to-most-prompting](/vault/least-to-most-prompting.md)

## 2026-07-13 (second ingest)
* **Ingest**: `arxiv:2310.03714` — [DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines dossier](/dossiers/dspy-compiling-declarative-language-model-calls.md) — canonical: https://arxiv.org/abs/2310.03714v1
* **Archive**: Moved source PDF to [/archive/dspy-compiling-declarative-language-model-calls.pdf](/archive/dspy-compiling-declarative-language-model-calls.pdf)
* **Vault**: Created [declarative-lm-pipeline-compilation](/vault/declarative-lm-pipeline-compilation.md)
* **Vault**: Created [metric-gated-trace-bootstrapping](/vault/metric-gated-trace-bootstrapping.md)
* **Vault**: Updated [prompt-optimization](/vault/prompt-optimization.md)

## 2026-07-13 (second ingest)
* **Ingest**: `arxiv:2211.01910` — [Large Language Models Are Human-Level Prompt Engineers dossier](/dossiers/automatic-prompt-engineer.md) — canonical: https://arxiv.org/abs/2211.01910v2
* **Archive**: Moved source PDF to [/archive/automatic-prompt-engineer.pdf](/archive/automatic-prompt-engineer.pdf)
* **Vault**: Updated [prompt-optimization](/vault/prompt-optimization.md)

## 2026-07-13 (SSRN 5285532)
* **Ingest**: `ssrn:5285532` — [Prompting Science Report 2 dossier](/dossiers/decreasing-value-chain-of-thought-prompting.md) — canonical: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5285532
* **Archive**: Moved source PDF to [/archive/decreasing-value-chain-of-thought-prompting.pdf](/archive/decreasing-value-chain-of-thought-prompting.pdf)
* **Vault**: Updated [chain-of-thought-prompting](/vault/chain-of-thought-prompting.md)
* **Vault**: Updated [llm-evaluation-methods](/vault/llm-evaluation-methods.md)

## 2026-07-13 (GitHub Blog)
* **Ingest**: `url:github.blog/ai-and-ml/generative-ai/validating-agentic-behavior-when-correct-isnt-deterministic/` — [Validating Agentic Behavior When Correct Isn't Deterministic dossier](/dossiers/validating-agentic-behavior.md) — canonical: https://github.blog/ai-and-ml/generative-ai/validating-agentic-behavior-when-correct-isnt-deterministic/
* **Vault**: Created [dominator-based-agent-validation](/vault/dominator-based-agent-validation.md)

## 2026-07-13 (web ingest)
* **Ingest**: `url:memory.cobanov.dev/` — [How AI Agent Memory Works dossier](/dossiers/how-ai-agent-memory-works.md) — canonical: https://memory.cobanov.dev/
* **Vault**: Created [memory-lifecycle-governance](/vault/memory-lifecycle-governance.md)
* **Vault**: Created [hybrid-memory-retrieval-pipeline](/vault/hybrid-memory-retrieval-pipeline.md)

## 2026-07-13 (Cursor Blog)
* **Ingest**: `url:cursor.com/blog/continually-improving-agent-harness` — [Continually Improving Our Agent Harness dossier](/dossiers/continually-improving-agent-harness.md) — canonical: https://cursor.com/blog/continually-improving-agent-harness
* **Vault**: Created [outcome-grounded-agent-evaluation](/vault/outcome-grounded-agent-evaluation.md)
* **Vault**: Created [model-aware-harness-design](/vault/model-aware-harness-design.md)

## 2026-07-13 (Turing Post)
* **Ingest**: `url:www.turingpost.com/p/guest-post-ai-inference-is-breaking-unit-economics` — [Guest post: AI Inference Is Breaking Unit Economics dossier](/dossiers/ai-inference-unit-economics.md) — canonical: https://www.turingpost.com/p/guest-post-ai-inference-is-breaking-unit-economics
* **Vault**: Created [cost-aware-inference-control](/vault/cost-aware-inference-control.md)

## 2026-07-13 (Perplexity Research)
* **Ingest**: `url:research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity` — [Designing, Refining, and Maintaining Agent Skills at Perplexity dossier](/dossiers/designing-refining-maintaining-agent-skills-perplexity.md) — canonical: https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity
* **Vault**: Created [evaluated-skill-routing](/vault/evaluated-skill-routing.md)
* **Vault**: Created [progressive-skill-disclosure](/vault/progressive-skill-disclosure.md)

## 2026-07-13 (INTERNALS.md)
* **Ingest**: `url:internals.laxmena.com/p/what-youre-actually-writing-when` — [What You're Actually Writing When You Write a SKILL.md dossier](/dossiers/skill-md-loader-specification.md) — canonical: https://internals.laxmena.com/p/what-youre-actually-writing-when
* **Vault**: Created [progressive-skill-disclosure](/vault/progressive-skill-disclosure.md)

## 2026-07-13 (Red Hat Developer)
* **Ingest**: `url:developers.redhat.com/articles/2025/09/30/vllm-or-llamacpp-choosing-right-llm-inference-engine-your-use-case` — [vLLM or llama.cpp: Choosing the right LLM inference engine for your use case dossier](/dossiers/vllm-or-llamacpp-inference-engine-selection.md) — canonical: https://developers.redhat.com/articles/2025/09/30/vllm-or-llamacpp-choosing-right-llm-inference-engine-your-use-case
* **Vault**: Created [workload-aligned-inference-engine-selection](/vault/workload-aligned-inference-engine-selection.md)

## 2026-07-13 (AXI)
* **Ingest**: `url:axi.md/` — [AXI: Agent eXperience Interface dossier](/dossiers/axi-agent-experience-interface.md) — canonical: https://axi.md/
* **Vault**: Created [agent-ergonomic-interface-design](/vault/agent-ergonomic-interface-design.md)
* **Vault**: Created [action-observation-fusion](/vault/action-observation-fusion.md)
* **Vault**: Created [bounded-tool-observations](/vault/bounded-tool-observations.md)

## 2026-07-13 (Medium)
* **Ingest**: `url:robert-mcdermott.medium.com/performance-vs-practicality-a-comparison-of-vllm-and-ollama-104acad250fd` — [Performance vs Practicality: A Comparison of vLLM and Ollama dossier](/dossiers/vllm-ollama-performance-practicality.md) — canonical: https://robert-mcdermott.medium.com/performance-vs-practicality-a-comparison-of-vllm-and-ollama-104acad250fd
* **Vault**: Updated [workload-aligned-inference-engine-selection](/vault/workload-aligned-inference-engine-selection.md)

## 2026-07-13 (Prompt Coach)
* **Ingest**: `arxiv:2607.06074` — [Prompt Coach dossier](/dossiers/prompt-coach-agentic-tutor.md) — canonical: https://arxiv.org/abs/2607.06074v1
* **Archive**: Moved source PDF to [/archive/prompt-coach-agentic-tutor.pdf](/archive/prompt-coach-agentic-tutor.pdf)
* **Vault**: Created [in-flow-socratic-prompt-coaching](/vault/in-flow-socratic-prompt-coaching.md)

## 2026-07-13 (MASTE)
* **Ingest**: `arxiv:2607.08080` — `MASTE: A Multi-Agent Pipeline for Zero-Shot Aspect Sentiment Triplet Extraction dossier` at `/dossiers/maste-zero-shot-aspect-sentiment-triplet-extraction.md` — canonical: https://arxiv.org/abs/2607.08080v1
* **Archive**: Moved source PDF to [/archive/maste-zero-shot-aspect-sentiment-triplet-extraction.pdf](/archive/maste-zero-shot-aspect-sentiment-triplet-extraction.pdf)
* **Vault**: Created [grounded-structured-extraction](/vault/grounded-structured-extraction.md)
* **Vault**: Updated [multi-agent-orchestration](/vault/multi-agent-orchestration.md)

## 2026-07-13 (Memory Compaction Survey)
* **Ingest**: `arxiv:2607.08032` — What to Keep, What to Forget: A Rate–Distortion View of Memory Compaction in LLMs and Agents dossier at `/dossiers/rate-distortion-memory-compaction.md` — canonical: https://arxiv.org/abs/2607.08032v1
* **Archive**: Moved source PDF to [/archive/rate-distortion-memory-compaction.pdf](/archive/rate-distortion-memory-compaction.pdf)
* **Vault**: Created [rate-distortion-memory-compaction](/vault/rate-distortion-memory-compaction.md), [reversible-query-conditioned-compaction](/vault/reversible-query-conditioned-compaction.md), [repeated-compaction-evaluation](/vault/repeated-compaction-evaluation.md)

## 2026-07-13 (Prompting Complexity)
* **Ingest**: `arxiv:2607.06145` — `Prompting Complexity: Shortest Prompts for Texts and Behaviors in LLMs dossier` at `/dossiers/prompting-complexity.md` — canonical: https://arxiv.org/abs/2607.06145v1
* **Archive**: Moved source PDF to [/archive/prompting-complexity.pdf](/archive/prompting-complexity.pdf)
* **Vault**: Created [prompting-complexity](/vault/prompting-complexity.md), [behavioral-prompting-complexity](/vault/behavioral-prompting-complexity.md), [prompting-distance](/vault/prompting-distance.md)

## 2026-07-13 (Harness Engineering)
* **Ingest**: `arxiv:2607.08028` — `From Prompts to Contracts: Harness Engineering for Auditable Enterprise LLM Agents dossier` at `/dossiers/auditable-enterprise-llm-harness.md` — canonical: https://arxiv.org/abs/2607.08028v1
* **Archive**: Moved source PDF to [/archive/auditable-enterprise-llm-harness.pdf](/archive/auditable-enterprise-llm-harness.pdf)
* **Vault**: Created [source-backed-claim-admission](/vault/source-backed-claim-admission.md)
* **Vault**: Created [validated-fallback-composition](/vault/validated-fallback-composition.md)

## 2026-07-13 (Agent-Native Memory Systems)
* **Ingest**: `arxiv:2606.24775` — `Are We Ready For An Agent-Native Memory System? dossier` at `/dossiers/agent-native-memory-system-readiness.md` — canonical: https://arxiv.org/abs/2606.24775v1
* **Archive**: Moved source PDF to [/archive/agent-native-memory-system-readiness.pdf](/archive/agent-native-memory-system-readiness.pdf)
* **Vault**: Created [workload-aligned-agent-memory-architecture](/vault/workload-aligned-agent-memory-architecture.md)
* **Vault**: Updated [hybrid-memory-retrieval-pipeline](/vault/hybrid-memory-retrieval-pipeline.md), [memory-lifecycle-governance](/vault/memory-lifecycle-governance.md)

## 2026-07-13 (MAS-PromptBench)
* **Ingest**: `arxiv:2606.23664` — `MAS-PromptBench: When Does Prompt Optimization Improve Multi-Agent LLM Systems? dossier` at `/dossiers/mas-promptbench.md` — canonical: https://arxiv.org/abs/2606.23664v1
* **Archive**: Moved source PDF to [/archive/mas-promptbench.pdf](/archive/mas-promptbench.pdf)
* **Vault**: Created [configuration-aware-multi-agent-prompt-optimization](/vault/configuration-aware-multi-agent-prompt-optimization.md), [structured-agent-communication-contracts](/vault/structured-agent-communication-contracts.md)
* **Vault**: Updated [prompt-optimization](/vault/prompt-optimization.md), [multi-agent-orchestration](/vault/multi-agent-orchestration.md)

## 2026-07-13 (MASPO)
* **Ingest**: `arxiv:2605.06623` — `MASPO: Joint Prompt Optimization for LLM-based Multi-Agent Systems dossier` at `/dossiers/maspo-joint-prompt-optimization.md` — canonical: https://arxiv.org/abs/2605.06623v1
* **Archive**: Moved source PDF to [/archive/maspo-joint-prompt-optimization.pdf](/archive/maspo-joint-prompt-optimization.pdf)
* **Vault**: Created [downstream-aware-prompt-evaluation](/vault/downstream-aware-prompt-evaluation.md)
* **Vault**: Updated [configuration-aware-multi-agent-prompt-optimization](/vault/configuration-aware-multi-agent-prompt-optimization.md)

## 2026-07-13 (Brevity Constraints)
* **Ingest**: `arxiv:2604.00025` — `Brevity Constraints Reverse Performance Hierarchies in Language Models dossier` at `/dossiers/brevity-constraints-reverse-performance-hierarchies.md` — canonical: https://arxiv.org/abs/2604.00025v1
* **Archive**: Moved source PDF to [/archive/brevity-constraints-reverse-performance-hierarchies.pdf](/archive/brevity-constraints-reverse-performance-hierarchies.pdf)
* **Vault**: Created [reasoning-budget-calibration](/vault/reasoning-budget-calibration.md)

## 2026-07-13 (Dataset-Level Feature Discovery)
* **Ingest**: `doi:10.48550/arxiv.2601.13922` — `Automatic Prompt Optimization for Dataset-Level Feature Discovery dossier` at `/dossiers/automatic-prompt-optimization-dataset-level-feature-discovery.md` — canonical: https://arxiv.org/abs/2601.13922v1
* **Archive**: Moved source PDF to [/archive/automatic-prompt-optimization-dataset-level-feature-discovery.pdf](/archive/automatic-prompt-optimization-dataset-level-feature-discovery.pdf)
* **Vault**: Created [dataset-level-feature-discovery](/vault/dataset-level-feature-discovery.md)

## 2026-07-13 (Promptomatix)
* **Ingest**: `arxiv:2507.14241` — `Promptomatix: An Automatic Prompt Optimization Framework for Large Language Models dossier` at `/dossiers/promptomatix-automatic-prompt-optimization.md` — canonical: https://arxiv.org/abs/2507.14241v3
* **Archive**: Moved source PDF to [/archive/promptomatix-automatic-prompt-optimization.pdf](/archive/promptomatix-automatic-prompt-optimization.pdf)
* **Vault**: Created [zero-configuration-prompt-optimization](/vault/zero-configuration-prompt-optimization.md)
* **Vault**: Updated [prompt-optimization](/vault/prompt-optimization.md)

## 2026-07-13 (AutoPDL)
* **Ingest**: `doi:10.48550/arxiv.2504.04365` — `AutoPDL: Automatic Prompt Optimization for LLM Agents dossier` at `/dossiers/autopdl-automatic-prompt-optimization-llm-agents.md` — canonical: https://arxiv.org/abs/2504.04365v5
* **Archive**: Moved source PDF to [/archive/autopdl-automatic-prompt-optimization-llm-agents.pdf](/archive/autopdl-automatic-prompt-optimization-llm-agents.pdf)
* **Vault**: Updated [prompt-optimization](/vault/prompt-optimization.md), [declarative-lm-pipeline-compilation](/vault/declarative-lm-pipeline-compilation.md)

## 2026-07-13 (Automatic Prompt Optimization Survey)
* **Ingest**: `arxiv:2502.16923` — `A Systematic Survey of Automatic Prompt Optimization Techniques dossier` at `/dossiers/automatic-prompt-optimization-techniques.md` — canonical: https://arxiv.org/abs/2502.16923v2
* **Archive**: Moved source PDF to [/archive/automatic-prompt-optimization-techniques.pdf](/archive/automatic-prompt-optimization-techniques.pdf)
* **Vault**: Created [automatic-prompt-optimization-anatomy](/vault/automatic-prompt-optimization-anatomy.md)

## 2026-07-13 (TextGrad)
* **Ingest**: `arxiv:2406.07496` — `TextGrad: Automatic “Differentiation” via Text dossier` at `/dossiers/textgrad-automatic-differentiation-via-text.md` — canonical: https://arxiv.org/abs/2406.07496v1
* **Archive**: Moved source PDF to [/archive/textgrad-automatic-differentiation-via-text.pdf](/archive/textgrad-automatic-differentiation-via-text.pdf)
* **Vault**: Created [textual-feedback-backpropagation](/vault/textual-feedback-backpropagation.md)
* **Vault**: Updated [prompt-optimization](/vault/prompt-optimization.md)

## 2026-07-14 (Lost in the Middle)
* **Ingest**: `arxiv:2307.03172` — `Lost in the Middle: How Language Models Use Long Contexts dossier` at `/dossiers/lost-in-the-middle-long-contexts.md` — canonical: https://arxiv.org/abs/2307.03172v3
* **Archive**: Moved source PDF to [/archive/lost-in-the-middle-long-contexts.pdf](/archive/lost-in-the-middle-long-contexts.pdf)
* **Vault**: Created [position-robust-context-evaluation](/vault/position-robust-context-evaluation.md), [context-ordering-as-retrieval-control](/vault/context-ordering-as-retrieval-control.md)

## 2026-07-14 (TeaRAG)
* **Ingest**: `arxiv:2511.05385` — `TeaRAG: A Token-Efficient Agentic Retrieval-Augmented Generation Framework dossier` at `/dossiers/tearag-token-efficient-agentic-rag.md` — canonical: https://arxiv.org/abs/2511.05385v1
* **Archive**: Moved source PDF to [/archive/tearag-token-efficient-agentic-rag.pdf](/archive/tearag-token-efficient-agentic-rag.pdf)
* **Vault**: Created [cooccurrence-grounded-retrieval-compression](/vault/cooccurrence-grounded-retrieval-compression.md), [process-aware-trajectory-preference-optimization](/vault/process-aware-trajectory-preference-optimization.md)

## 2026-07-14 (SupervisorAgent)
* **Ingest**: `arxiv:2510.26585` — `Stop Wasting Your Tokens: Towards Efficient Runtime Multi-Agent Systems dossier` at `/dossiers/supervisoragent-efficient-runtime-multi-agent-systems.md` — canonical: https://arxiv.org/abs/2510.26585v2
* **Archive**: Moved source PDF to [/archive/supervisoragent-efficient-runtime-multi-agent-systems.pdf](/archive/supervisoragent-efficient-runtime-multi-agent-systems.pdf)
* **Vault**: Created [adaptive-runtime-agent-supervision](/vault/adaptive-runtime-agent-supervision.md)

## 2026-07-14 (Codebase-Memory)
* **Ingest**: `doi:10.48550/arxiv.2603.27277` — `Codebase-Memory: Tree-Sitter-Based Knowledge Graphs for LLM Code Exploration via MCP dossier` at `/dossiers/codebase-memory-tree-sitter-knowledge-graphs.md` — canonical: https://arxiv.org/abs/2603.27277v1
* **Archive**: Moved source PDF to [/archive/codebase-memory-tree-sitter-knowledge-graphs.pdf](/archive/codebase-memory-tree-sitter-knowledge-graphs.pdf)
* **Vault**: Created [structural-code-retrieval](/vault/structural-code-retrieval.md), [query-class-retrieval-routing](/vault/query-class-retrieval-routing.md), [mcp-tool-supply-chain-assurance](/vault/mcp-tool-supply-chain-assurance.md)

## 2026-07-14 (Is Grep All You Need?)
* **Ingest**: `arxiv:2605.15184` — `Is Grep All You Need? How Agent Harnesses Reshape Agentic Search dossier` at `/dossiers/grep-agent-harnesses-agentic-search.md` — canonical: https://arxiv.org/abs/2605.15184v1
* **Archive**: Moved source PDF to [/archive/grep-agent-harnesses-agentic-search.pdf](/archive/grep-agent-harnesses-agentic-search.pdf)
* **Vault**: Created [harness-conditioned-retrieval-evaluation](/vault/harness-conditioned-retrieval-evaluation.md)

## 2026-07-14 (State-in-Context Minification)
* **Ingest**: `arxiv:2606.01326` — `Reducing Token Usage of State-in-Context Agents using Minification dossier` at `/dossiers/minified-state-in-context-agents.md` — canonical: https://arxiv.org/abs/2606.01326v1
* **Archive**: Moved source PDF to [/archive/minified-state-in-context-agents.pdf](/archive/minified-state-in-context-agents.pdf)
* **Vault**: Created [code-context-minification](/vault/code-context-minification.md)

## 2026-07-14 (Agents’ Last Exam)
* **Ingest**: `arxiv:2606.05405` — `Agents’ Last Exam dossier` at `/dossiers/agents-last-exam.md` — canonical: https://arxiv.org/abs/2606.05405v2
* **Archive**: Moved source PDF to [/archive/agents-last-exam.pdf](/archive/agents-last-exam.pdf)
* **Vault**: Created [artifact-gated-agent-evaluation](/vault/artifact-gated-agent-evaluation.md)

## 2026-07-14 (Reducing Token Usage of Software Engineering Agents)
* **Ingest**: `doi:10.34726/hss.2025.136382` — `Reducing Token Usage of Software Engineering Agents dossier` at `/dossiers/reducing-token-usage-software-engineering-agents.md` — canonical: https://doi.org/10.34726/hss.2025.136382
* **Archive**: Moved source PDF to [/archive/reducing-token-usage-software-engineering-agents.pdf](/archive/reducing-token-usage-software-engineering-agents.pdf)
* **Vault**: Created [code-context-minification](/vault/code-context-minification.md), [transformation-aware-patch-application](/vault/transformation-aware-patch-application.md)

## 2026-07-14 (ISOLATE GPT)
* **Ingest**: `doi:10.14722/ndss.2025.241131` — `ISOLATE GPT: An Execution Isolation Architecture for LLM-Based Agentic Systems dossier` at `/dossiers/isolate-gpt-execution-isolation-agentic-systems.md` — canonical: https://doi.org/10.14722/ndss.2025.241131
* **Archive**: Moved source PDF to [/archive/isolate-gpt-execution-isolation-agentic-systems.pdf](/archive/isolate-gpt-execution-isolation-agentic-systems.pdf)
* **Vault**: Created [mediated-agent-execution-isolation](/vault/mediated-agent-execution-isolation.md)

## 2026-07-14 (CaMeL)
* **Ingest**: `doi:10.48550/arxiv.2503.18813` — `Defeating Prompt Injections by Design dossier` at `/dossiers/defeating-prompt-injections-by-design.md` — canonical: https://arxiv.org/abs/2503.18813v2
* **Archive**: Moved source PDF to [/archive/defeating-prompt-injections-by-design.pdf](/archive/defeating-prompt-injections-by-design.pdf)
* **Vault**: Created [capability-enforced-agent-execution](/vault/capability-enforced-agent-execution.md), [control-data-plane-separation-for-agents](/vault/control-data-plane-separation-for-agents.md)

## 2026-07-14 (Securing LLM Agents against Prompt Injections)
* **Ingest**: `doi:10.48550/arxiv.2506.08837` — `Design Patterns for Securing LLM Agents against Prompt Injections dossier` at `/dossiers/design-patterns-securing-llm-agents-prompt-injections.md` — canonical: https://arxiv.org/abs/2506.08837v3
* **Archive**: Moved source PDF to [/archive/design-patterns-securing-llm-agents-prompt-injections.pdf](/archive/design-patterns-securing-llm-agents-prompt-injections.pdf)
* **Vault**: Created [privileged-quarantined-agent-split](/vault/privileged-quarantined-agent-split.md), [intent-then-isolate-execution](/vault/intent-then-isolate-execution.md)

## 2026-07-14 (SANDBOXESCAPEBENCH)
* **Ingest**: `arxiv:2603.02277` — `Quantifying Frontier LLM Capabilities for Container Sandbox Escape dossier` at `/dossiers/sandbox-escape-benchmark.md` — canonical: https://arxiv.org/abs/2603.02277v2
* **Archive**: Moved source PDF to [/archive/sandbox-escape-benchmark.pdf](/archive/sandbox-escape-benchmark.pdf)
* **Vault**: Created [nested-sandbox-capability-evaluation](/vault/nested-sandbox-capability-evaluation.md), [intended-path-benchmark-validation](/vault/intended-path-benchmark-validation.md)

## 2026-07-14 (Agent-Sentry)
* **Ingest**: `doi:10.48550/arxiv.2603.22868` — `Agent-Sentry: Bounding LLM Agents via Execution Provenance dossier` at `/dossiers/agent-sentry-execution-provenance.md` — canonical: https://arxiv.org/abs/2603.22868v2
* **Archive**: Moved source PDF to [/archive/agent-sentry-execution-provenance.pdf](/archive/agent-sentry-execution-provenance.pdf)
* **Vault**: Created [provenance-conditioned-action-admission](/vault/provenance-conditioned-action-admission.md)

## 2026-07-14 (Architecting Secure AI Agents)
* **Ingest**: `doi:10.48550/arxiv.2603.30016` — `Architecting Secure AI Agents: Perspectives on System-Level Defenses Against Indirect Prompt Injection Attacks dossier` at `/dossiers/architecting-secure-ai-agents.md` — canonical: https://arxiv.org/abs/2603.30016v1
* **Archive**: Moved source PDF to [/archive/architecting-secure-ai-agents.pdf](/archive/architecting-secure-ai-agents.pdf)
* **Vault**: Created [security-aware-replanning](/vault/security-aware-replanning.md), [bounded-model-security-adjudication](/vault/bounded-model-security-adjudication.md)

## 2026-07-14 (Parallax)
* **Ingest**: `doi:10.48550/arxiv.2604.12986` — `Parallax: Why AI Agents That Think Must Never Act dossier` at `/dossiers/parallax-architecturally-safe-autonomous-execution.md` — canonical: https://arxiv.org/abs/2604.12986v1
* **Archive**: Moved source PDF to [/archive/parallax-architecturally-safe-autonomous-execution.pdf](/archive/parallax-architecturally-safe-autonomous-execution.pdf)
* **Vault**: Created [assume-compromise-boundary-testing](/vault/assume-compromise-boundary-testing.md)
* **Vault**: Updated [mediated-agent-execution-isolation](/vault/mediated-agent-execution-isolation.md), [capability-enforced-agent-execution](/vault/capability-enforced-agent-execution.md)

## 2026-07-14 (AUTHGRAPH)
* **Ingest**: `arxiv:2605.26497` — `Aligning Provenance with Authorization: A Dual-Graph Defense for LLM Agents dossier` at `/dossiers/authgraph-dual-graph-defense.md` — canonical: https://arxiv.org/abs/2605.26497v1
* **Archive**: Moved source PDF to [/archive/authgraph-dual-graph-defense.pdf](/archive/authgraph-dual-graph-defense.pdf)
* **Vault**: Created [authorization-provenance-graph-alignment](/vault/authorization-provenance-graph-alignment.md)

## 2026-07-14 (Sandlock)
* **Ingest**: `doi:10.48550/arxiv.2605.26298` — `Sandlock: Confining AI Agent Code with Unprivileged Linux Primitives dossier` at `/dossiers/sandlock-unprivileged-linux-agent-sandbox.md` — canonical: https://arxiv.org/abs/2605.26298v1
* **Archive**: Moved source PDF to [/archive/sandlock-unprivileged-linux-agent-sandbox.pdf](/archive/sandlock-unprivileged-linux-agent-sandbox.pdf)
* **Vault**: Created [kernel-first-split-enforcement](/vault/kernel-first-split-enforcement.md)

## 2026-07-14 (AI Sandboxes)
* **Ingest**: `doi:10.48550/arxiv.2606.18532` — `AI Sandboxes: A Threat Model, Taxonomy, and Measurement Framework dossier` at `/dossiers/ai-sandboxes-threat-model-measurement-framework.md` — canonical: https://arxiv.org/abs/2606.18532v1
* **Archive**: Moved source PDF to [/archive/ai-sandboxes-threat-model-measurement-framework.pdf](/archive/ai-sandboxes-threat-model-measurement-framework.pdf)
* **Vault**: Created [claim-bounded-sandbox-evidence](/vault/claim-bounded-sandbox-evidence.md), [weakest-link-assurance-composition](/vault/weakest-link-assurance-composition.md)

## 2026-07-14 (AI Code Sandboxes)
* **Ingest**: `arxiv:2606.08433` — `AI Code Sandboxes: A Comparative Security Study — Engine-Level Properties dossier` at `/dossiers/ai-code-sandboxes-engine-level-security-study.md` — canonical: https://arxiv.org/abs/2606.08433v1
* **Archive**: Moved source PDF to [/archive/ai-code-sandboxes-engine-level-security-study.pdf](/archive/ai-code-sandboxes-engine-level-security-study.pdf)
* **Vault**: Created [deployment-conditioned-sandbox-security](/vault/deployment-conditioned-sandbox-security.md), [downstream-security-patch-propagation](/vault/downstream-security-patch-propagation.md)

## 2026-07-21 (Inbox batch)
* **Ingest**: `doi:10.18653/v1/2025.findings-emnlp.1120` — `ReviewEval: An Evaluation Framework for AI-Generated Reviews dossier` at `/dossiers/revieweval-ai-generated-reviews.md` — canonical: https://aclanthology.org/2025.findings-emnlp.1120/
* **Archive**: Moved source PDF to [/archive/revieweval-ai-generated-reviews.pdf](/archive/revieweval-ai-generated-reviews.pdf)
* **Ingest**: `doi:10.48550/arxiv.2607.12227` — `Rethinking the Evaluation of Harness Evolution for Agents dossier` at `/dossiers/rethinking-harness-evolution-evaluation.md` — canonical: https://arxiv.org/abs/2607.12227v1
* **Archive**: Moved source PDF to [/archive/rethinking-harness-evolution-evaluation.pdf](/archive/rethinking-harness-evolution-evaluation.pdf)
* **Ingest**: `doi:10.48550/arxiv.2607.13104` — `Self-Improvements in Modern Agentic Systems: A Survey dossier` at `/dossiers/self-improvements-modern-agentic-systems-survey.md` — canonical: https://arxiv.org/abs/2607.13104v1
* **Archive**: Moved source PDF to [/archive/self-improvements-modern-agentic-systems-survey.pdf](/archive/self-improvements-modern-agentic-systems-survey.pdf)
* **Ingest**: `doi:10.48550/arxiv.2607.14159` — `MemoHarness: Agent Harnesses That Learn from Experience dossier` at `/dossiers/memoharness-agent-harnesses-experience.md` — canonical: https://arxiv.org/abs/2607.14159v1
* **Archive**: Moved source PDF to [/archive/memoharness-agent-harnesses-experience.pdf](/archive/memoharness-agent-harnesses-experience.pdf)
* **Ingest**: `url:openreview.net/forum?id=7iX2Z2bPFB` — `Beyond Imitation: A Framework and Benchmark for LLM-Assisted Peer Review dossier` at `/dossiers/beyond-imitation-llm-assisted-peer-review.md` — canonical: https://openreview.net/forum?id=7iX2Z2bPFB
* **Archive**: Moved source PDF to [/archive/beyond-imitation-llm-assisted-peer-review.pdf](/archive/beyond-imitation-llm-assisted-peer-review.pdf)
* **Ingest**: `doi:10.1007/s10462-025-11147-4` — `Adversarial Machine Learning: A Review of Methods, Tools, and Critical Industry Sectors dossier` at `/dossiers/adversarial-machine-learning-review-critical-sectors.md` — canonical: https://doi.org/10.1007/s10462-025-11147-4
* **Archive**: Moved source PDF to [/archive/adversarial-machine-learning-review-critical-sectors.pdf](/archive/adversarial-machine-learning-review-critical-sectors.pdf)
* **Ingest**: `sha256:38a474d525dabe3bbcef49e19ea221fa377725bef0518d3e38e8ecba8a2020a3` — `Isolation Approaches for Concurrent AI Coding Agents: A Synthesis dossier` at `/dossiers/isolation-approaches-concurrent-ai-coding-agents-synthesis.md` — canonical: /archive/isolation-approaches-concurrent-ai-coding-agents-synthesis.pdf
* **Archive**: Moved source PDF to [/archive/isolation-approaches-concurrent-ai-coding-agents-synthesis.pdf](/archive/isolation-approaches-concurrent-ai-coding-agents-synthesis.pdf)
* **Ingest**: `sha256:92b07d28b73d85aae1ab735963bbf4e525405e6470d063ea9cf8e874601a89f4` — `Isolation Approaches for Parallel AI Coding Agents — A Deep Research Report dossier` at `/dossiers/multi-agent-isolation-deep-research.md` — canonical: /archive/multi-agent-isolation-deep-research.pdf
* **Archive**: Moved source PDF to [/archive/multi-agent-isolation-deep-research.pdf](/archive/multi-agent-isolation-deep-research.pdf)
* **Ingest**: `sha256:6f688339b34459a513fc9fda5219e6e0263ec4e1a4123b87ad6902cc717cf042` — `Multi-Agent Coding Isolation: Architectures, Implementations, and Trade-offs dossier` at `/dossiers/multi-agent-coding-isolation-report.md` — canonical: /archive/multi-agent-coding-isolation-report.pdf
* **Archive**: Moved source PDF to [/archive/multi-agent-coding-isolation-report.pdf](/archive/multi-agent-coding-isolation-report.pdf)
* **Vault**: Created [budget-matched-harness-evolution-evaluation](/vault/budget-matched-harness-evolution-evaluation.md), [self-improvement-update-targets](/vault/self-improvement-update-targets.md), [experience-conditioned-harness-adaptation](/vault/experience-conditioned-harness-adaptation.md), [verification-centric-generated-review-evaluation](/vault/verification-centric-generated-review-evaluation.md), [adversarial-ml-threat-lifecycle](/vault/adversarial-ml-threat-lifecycle.md), [layered-concurrent-agent-isolation](/vault/layered-concurrent-agent-isolation.md)

## 2026-07-21 (Tool-use inbox batch)
* **Ingest**: `arxiv:2510.22977` — `The Reasoning Trap: How Enhancing LLM Reasoning Amplifies Tool Hallucination dossier` at `/dossiers/reasoning-trap-tool-hallucination.md` — canonical: https://arxiv.org/abs/2510.22977v2
* **Archive**: Moved source PDF to [/archive/reasoning-trap-tool-hallucination.pdf](/archive/reasoning-trap-tool-hallucination.pdf)
* **Ingest**: `arxiv:2605.00136` — `Are Tools All We Need? Unveiling the Tool-Use Tax in LLM Agents dossier` at `/dossiers/tool-use-tax-llm-agents.md` — canonical: https://arxiv.org/abs/2605.00136v1
* **Archive**: Moved source PDF to [/archive/tool-use-tax-llm-agents.pdf](/archive/tool-use-tax-llm-agents.pdf)
* **Ingest**: `arxiv:2605.09252` — `LLM Agents Already Know When to Call Tools – Even Without Reasoning dossier` at `/dossiers/when2tool-tool-call-decisions.md` — canonical: https://arxiv.org/abs/2605.09252v1
* **Archive**: Moved source PDF to [/archive/when2tool-tool-call-decisions.pdf](/archive/when2tool-tool-call-decisions.pdf)
* **Vault**: Created [tool-availability-abstention](/vault/tool-availability-abstention.md), [tool-use-protocol-tax](/vault/tool-use-protocol-tax.md), [latent-tool-necessity-routing](/vault/latent-tool-necessity-routing.md)

## 2026-07-23 (Inbox batch)
* **Ingest**: `arxiv:2110.00641` — `Batch Size-invariance for Policy Optimization dossier` at `/dossiers/batch-size-invariance-policy-optimization.md` — canonical: https://arxiv.org/abs/2110.00641v3
* **Archive**: Moved source PDF to [/archive/batch-size-invariance-policy-optimization.pdf](/archive/batch-size-invariance-policy-optimization.pdf)
* **Ingest**: `arxiv:2207.04901` — `Exploring Length Generalization in Large Language Models dossier` at `/dossiers/exploring-length-generalization-language-models.md` — canonical: https://arxiv.org/abs/2207.04901v2
* **Archive**: Moved source PDF to [/archive/exploring-length-generalization-language-models.pdf](/archive/exploring-length-generalization-language-models.pdf)
* **Ingest**: `arxiv:2402.01030` — `Executable Code Actions Elicit Better LLM Agents dossier` at `/dossiers/executable-code-actions-llm-agents.md` — canonical: https://arxiv.org/abs/2402.01030v4
* **Archive**: Moved source PDF to [/archive/executable-code-actions-llm-agents.pdf](/archive/executable-code-actions-llm-agents.pdf)
* **Ingest**: `arxiv:2510.26692` — `Kimi Linear: An Expressive, Efficient Attention Architecture dossier` at `/dossiers/kimi-linear-attention-architecture.md` — canonical: https://arxiv.org/abs/2510.26692v2
* **Archive**: Moved source PDF to [/archive/kimi-linear-attention-architecture.pdf](/archive/kimi-linear-attention-architecture.pdf)
* **Ingest**: `arxiv:2601.18089` — `LatentMoE: Toward Optimal Accuracy per FLOP and Parameter in Mixture of Experts dossier` at `/dossiers/latentmoe.md` — canonical: https://arxiv.org/abs/2601.18089v1
* **Archive**: Moved source PDF to [/archive/latentmoe.pdf](/archive/latentmoe.pdf)
* **Ingest**: `arxiv:2602.02276` — `Kimi K2.5: Visual Agentic Intelligence dossier` at `/dossiers/kimi-k2-5-visual-agentic-intelligence.md` — canonical: https://arxiv.org/abs/2602.02276v1
* **Archive**: Moved source PDF to [/archive/kimi-k2-5-visual-agentic-intelligence.pdf](/archive/kimi-k2-5-visual-agentic-intelligence.pdf)
* **Ingest**: `arxiv:2603.15031` — `Attention Residuals dossier` at `/dossiers/attention-residuals.md` — canonical: https://arxiv.org/abs/2603.15031v1
* **Archive**: Moved source PDF to [/archive/attention-residuals.pdf](/archive/attention-residuals.pdf)
* **Ingest**: `arxiv:2604.27998` — `Latent-GRPO: Group Relative Policy Optimization for Latent Reasoning dossier` at `/dossiers/latent-grpo.md` — canonical: https://arxiv.org/abs/2604.27998v1
* **Archive**: Moved source PDF to [/archive/latent-grpo.pdf](/archive/latent-grpo.pdf)
* **Vault**: Created [decoupled-behavior-proximal-policies](/vault/decoupled-behavior-proximal-policies.md), [executable-code-actions](/vault/executable-code-actions.md), [hybrid-linear-global-attention](/vault/hybrid-linear-global-attention.md), [latent-space-expert-routing](/vault/latent-space-expert-routing.md), [depth-wise-attention-residuals](/vault/depth-wise-attention-residuals.md), [manifold-safe-latent-rl](/vault/manifold-safe-latent-rl.md)
* **Vault**: Updated [chain-of-thought-prompting](/vault/chain-of-thought-prompting.md), [multi-agent-orchestration](/vault/multi-agent-orchestration.md)

## 2026-07-28 (DeepReview repair ingest)
* **Ingest**: `doi:10.18653/v1/2025.acl-long.1420` — `DeepReview: Improving LLM-based Paper Review with Human-like Deep Thinking Process dossier` at `/dossiers/deepreview-structured-llm-paper-review.md` — canonical: https://aclanthology.org/2025.acl-long.1420/
* **Archive**: Registered existing source PDF at [/archive/deepreview-structured-llm-paper-review.pdf](/archive/deepreview-structured-llm-paper-review.pdf); SHA-256 `5285d1ef5137cc018e8f437a4adf5a45502bd37ce45d72fb078f66553c78d8f6`
* **Vault**: Created [staged-evidence-grounded-judgment](/vault/staged-evidence-grounded-judgment.md), [dual-axis-judge-test-time-scaling](/vault/dual-axis-judge-test-time-scaling.md), [decomposition-induced-injection-resistance](/vault/decomposition-induced-injection-resistance.md)

## 2026-07-28 (taxonomy introduction)
* **Taxonomy**: Created [/TAXONOMY.md](/TAXONOMY.md) — controlled tag vocabulary of 54 tags in 10 facets, with tagging rules, an alias map for consolidated historical tags, and a watchlist of candidate tags for periodic re-evaluation
* **Retag**: Rewrote `tags:` frontmatter on all 95 dossiers and 139 vault pages to conform to the taxonomy; dropped `study-note`/`synthesis` (redundant with `type:`) and generic `llm`/`llm-agents`
* **Ingest playbook**: Added a Tagging section to [/INGEST.md](/INGEST.md) requiring taxonomy-only tags and gap-flagging in ingest reports

## 2026-07-28 (source-access research note ingest)
* **Ingest**: `sha256:0aee1208a126d55ba10941b6c2eb41c3514f8c2b9a8b93262143c37582007a59` — [Source Access Is a Systems Property dossier](/dossiers/ai-assistant-source-access-and-retrieval-partnerships.md) — canonical: /archive/ai-assistant-source-access-and-retrieval-partnerships.md
* **Archive**: Moved source note to [/archive/ai-assistant-source-access-and-retrieval-partnerships.md](/archive/ai-assistant-source-access-and-retrieval-partnerships.md)
* **Vault**: Created [retrieval-as-host-capability](/vault/retrieval-as-host-capability.md), [source-adapter-decoupling](/vault/source-adapter-decoupling.md), [retrieval-depth-grading](/vault/retrieval-depth-grading.md)

## 2026-07-30 (Power of Scale for Parameter-Efficient Prompt Tuning)
* **Ingest**: `arxiv:2104.08691` — `The Power of Scale for Parameter-Efficient Prompt Tuning dossier` at `/dossiers/power-of-scale-prompt-tuning.md` — canonical: https://arxiv.org/abs/2104.08691v2
* **Archive**: Moved source PDF to [/archive/power-of-scale-prompt-tuning.pdf](/archive/power-of-scale-prompt-tuning.pdf)
* **Vault**: Created [prompt-tuning](/vault/prompt-tuning.md)
* **Vault**: Updated [prompt-contingency](/vault/prompt-contingency.md)

## 2026-07-30 (Emergent Abilities of Large Language Models)
* **Ingest**: `arxiv:2206.07682` — `Emergent Abilities of Large Language Models dossier` at `/dossiers/emergent-abilities-large-language-models.md` — canonical: https://arxiv.org/abs/2206.07682v2
* **Archive**: Moved source PDF to [/archive/emergent-abilities-large-language-models.pdf](/archive/emergent-abilities-large-language-models.pdf)
* **Vault**: Created [emergent-abilities](/vault/emergent-abilities.md)
* **Vault**: Updated [chain-of-thought-prompting](/vault/chain-of-thought-prompting.md), [in-context-learning](/vault/in-context-learning.md), [prompt-contingency](/vault/prompt-contingency.md)

## 2026-07-30 (SelfCheckGPT)
* **Ingest**: `arxiv:2303.08896` — `SelfCheckGPT: Zero-Resource Black-Box Hallucination Detection for Generative Large Language Models dossier` at `/dossiers/selfcheckgpt-zero-resource-black-box-hallucination-detection.md` — canonical: https://arxiv.org/abs/2303.08896v3
* **Archive**: Moved source PDF to [/archive/selfcheckgpt-zero-resource-black-box-hallucination-detection.pdf](/archive/selfcheckgpt-zero-resource-black-box-hallucination-detection.pdf)
* **Vault**: Created [sample-consistency-hallucination-detection](/vault/sample-consistency-hallucination-detection.md)

## 2026-07-30 (Just Ask for Calibration)
* **Ingest**: `arxiv:2305.14975` — `Just Ask for Calibration: Strategies for Eliciting Calibrated Confidence Scores from LMs Fine-Tuned with Human Feedback dossier` at `/dossiers/just-ask-for-calibration.md` — canonical: https://arxiv.org/abs/2305.14975v2
* **Archive**: Moved source PDF to [/archive/just-ask-for-calibration.pdf](/archive/just-ask-for-calibration.pdf)

## 2026-07-30 (Universal and Transferable Adversarial Attacks)
* **Ingest**: `arxiv:2307.15043` — `Universal and Transferable Adversarial Attacks on Aligned Language Models dossier` at `/dossiers/universal-transferable-adversarial-attacks-aligned-language-models.md` — canonical: https://arxiv.org/abs/2307.15043v2
* **Archive**: Moved source PDF to [/archive/universal-transferable-adversarial-attacks-aligned-language-models.pdf](/archive/universal-transferable-adversarial-attacks-aligned-language-models.pdf)

## 2026-07-30 (The Dawn of LMMs)
* **Ingest**: `arxiv:2309.17421` — `The Dawn of LMMs: Preliminary Explorations with GPT-4V(ision) dossier` at `/dossiers/dawn-of-lmms-gpt-4-vision.md` — canonical: https://arxiv.org/abs/2309.17421v2
* **Archive**: Moved source PDF to [/archive/dawn-of-lmms-gpt-4-vision.pdf](/archive/dawn-of-lmms-gpt-4-vision.pdf)

## 2026-07-30 (Prompt Formatting Sensitivity)
* **Ingest**: `arxiv:2310.11324` — `Quantifying Language Models' Sensitivity to Spurious Features in Prompt Design dossier` at `/dossiers/quantifying-language-models-sensitivity-spurious-features-prompt-design.md` — canonical: https://arxiv.org/abs/2310.11324v2
* **Archive**: Moved source PDF to [/archive/quantifying-language-models-sensitivity-spurious-features-prompt-design.pdf](/archive/quantifying-language-models-sensitivity-spurious-features-prompt-design.pdf)

## 2026-07-30 (Efficient Prompting Methods Survey)
* **Ingest**: `arxiv:2404.01077` — `Efficient Prompting Methods for Large Language Models: A Survey dossier` at `/dossiers/efficient-prompting-methods-large-language-models-survey.md` — canonical: https://arxiv.org/abs/2404.01077v1
* **Archive**: Moved source PDF to [/archive/efficient-prompting-methods-large-language-models-survey.pdf](/archive/efficient-prompting-methods-large-language-models-survey.pdf)

## 2026-07-30 (PEARL)
* **Ingest**: `arxiv:2601.11957` — `PEARL: Self-Evolving Assistant for Time Management with Reinforcement Learning dossier` at `/dossiers/pearl-self-evolving-assistant-time-management-reinforcement-learning.md` — canonical: https://arxiv.org/abs/2601.11957v4
* **Archive**: Moved source PDF to [/archive/pearl-self-evolving-assistant-time-management-reinforcement-learning.pdf](/archive/pearl-self-evolving-assistant-time-management-reinforcement-learning.pdf)

## 2026-07-30 (Function Calling)
* **Ingest**: `url:developers.openai.com/api/docs/guides/function-calling` — `Function Calling dossier` at `/dossiers/function-calling.md` — canonical: https://developers.openai.com/api/docs/guides/function-calling
* **Archive**: Moved local HTML capture and assets to [/archive/function-calling.html](/archive/function-calling.html)

## 2026-08-11 (GEO: Generative Engine Optimization)
* **Ingest**: `doi:10.1145/3637528.3671900` — `GEO: Generative Engine Optimization dossier` at `/dossiers/geo-generative-engine-optimization.md` — canonical: https://doi.org/10.1145/3637528.3671900
* **Archive**: Moved KDD '24 published PDF to [/archive/geo-generative-engine-optimization.pdf](/archive/geo-generative-engine-optimization.pdf)
* **Archive**: Moved duplicate arXiv:2311.09735v3 preprint copy of the same source to [/archive/geo-generative-engine-optimization-arxiv-v3.pdf](/archive/geo-generative-engine-optimization-arxiv-v3.pdf) — retained as a duplicate, not a separate ingest
* **Vault**: Created [generative-engine-optimization](/vault/generative-engine-optimization.md), [generative-engine-visibility-metrics](/vault/generative-engine-visibility-metrics.md), [generative-engines](/vault/generative-engines.md)
## 2026-08-11 (The Impact of AI-Powered Search on SEO)
* **Ingest**: `sha256:262820a4b6664de5e737918c4a1e9349b8fcfe7b70d45d2ec8fdbc3bbfa22d39` — `The Impact of AI-Powered Search on SEO: The Emergence of Answer Engine Optimization dossier` at `/dossiers/ai-powered-search-seo-answer-engine-optimization.md` — canonical: /archive/ai-powered-search-seo-answer-engine-optimization.pdf
* **Archive**: Moved source PDF to [/archive/ai-powered-search-seo-answer-engine-optimization.pdf](/archive/ai-powered-search-seo-answer-engine-optimization.pdf)
* **Vault**: Created `answer-engine-optimization` (later merged into [generative-engine-optimization](/vault/generative-engine-optimization.md); see consolidation entry), [zero-click-search](/vault/zero-click-search.md)
## 2026-08-11 (Answer Engine Optimization Measurement Framework)
* **Ingest**: `ssrn:6609678` — `Answer Engine Optimization: A Measurement Framework for Brand Visibility in Generative AI Search dossier` at `/dossiers/answer-engine-optimization-measurement-framework.md` — canonical: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6609678
* **Archive**: Moved source PDF to [/archive/answer-engine-optimization-measurement-framework.pdf](/archive/answer-engine-optimization-measurement-framework.pdf)
* **Vault**: Created [ai-search-visibility-measurement](/vault/ai-search-visibility-measurement.md), [citation-half-life](/vault/citation-half-life.md), [ai-crawler-traffic-classes](/vault/ai-crawler-traffic-classes.md), [ai-crawler-content-parsability](/vault/ai-crawler-content-parsability.md)
## 2026-08-11 (Causal Influence Control for Persistent Memory)
* **Ingest**: `sha256:ea973995ac45fd77d2b35813649dd4ad6fd8fc2516c541e98822eb4268707d2d` — `Causal Influence Control for Persistent Memory in Language Model Systems dossier` at `/dossiers/causal-influence-control-persistent-memory.md` — canonical: [/archive/causal-influence-control-persistent-memory.pdf](/archive/causal-influence-control-persistent-memory.pdf)
* **Archive**: Moved source PDF to [/archive/causal-influence-control-persistent-memory.pdf](/archive/causal-influence-control-persistent-memory.pdf)
* **Vault**: Created [causal-influence-signature](/vault/causal-influence-signature.md), [observed-effect-divergence-rollback](/vault/observed-effect-divergence-rollback.md), [falsification-bounded-architecture-proposal](/vault/falsification-bounded-architecture-proposal.md)
* **Vault**: Updated [memory-lifecycle-governance](/vault/memory-lifecycle-governance.md)
## 2026-08-11 (AutoGEO)
* **Ingest**: `arxiv:2510.11438` — `What Generative Search Engines Like and How to Optimize Web Content Cooperatively dossier` at `/dossiers/autogeo-generative-engine-optimization.md` — canonical: https://arxiv.org/abs/2510.11438v1
* **Archive**: Moved source PDF (ICLR 2026 camera-ready, OpenReview `K8EinVWtUB`) to [/archive/autogeo-generative-engine-optimization.pdf](/archive/autogeo-generative-engine-optimization.pdf)
* **Vault**: Created [generative-engine-optimization](/vault/generative-engine-optimization.md), [contrastive-preference-rule-extraction](/vault/contrastive-preference-rule-extraction.md), [rule-based-rewards](/vault/rule-based-rewards.md), [cooperative-optimization-evaluation](/vault/cooperative-optimization-evaluation.md)
## 2026-08-11 (Memory Caching)
* **Ingest**: `arxiv:2602.24281` — `Memory Caching: RNNs with Growing Memory dossier` at `/dossiers/memory-caching-rnns-growing-memory.md` — canonical: https://arxiv.org/abs/2602.24281v1
* **Archive**: Moved source PDF to [/archive/memory-caching-rnns-growing-memory.pdf](/archive/memory-caching-rnns-growing-memory.pdf)
* **Vault**: Created [segmented-memory-checkpoint-caching](/vault/segmented-memory-checkpoint-caching.md), [content-keyed-block-routing](/vault/content-keyed-block-routing.md)
* **Vault**: Updated [hybrid-linear-global-attention](/vault/hybrid-linear-global-attention.md), [rate-distortion-memory-compaction](/vault/rate-distortion-memory-compaction.md)
## 2026-08-11 (Generative Engine Optimization: How to Dominate AI Search)
* **Ingest**: `arxiv:2509.08919` — `Generative Engine Optimization: How to Dominate AI Search dossier` at `/dossiers/generative-engine-optimization-dominate-ai-search.md` — canonical: https://arxiv.org/abs/2509.08919v1
* **Archive**: Moved source PDF to [/archive/generative-engine-optimization-dominate-ai-search.pdf](/archive/generative-engine-optimization-dominate-ai-search.pdf)
* **Vault**: Created [generative-engine-optimization](/vault/generative-engine-optimization.md), [earned-media-citation-bias](/vault/earned-media-citation-bias.md), [engine-specific-citation-ecosystems](/vault/engine-specific-citation-ecosystems.md), [big-brand-bias](/vault/big-brand-bias.md)
## 2026-08-11 (Frontis-MA1)
* **Ingest**: `arxiv:2607.28568` — `Frontis-MA1: Training an AI4AI Model towards Recursive Self-Improvement in Machine Learning Engineering dossier` at `/dossiers/frontis-ma1-ai4ai-recursive-self-improvement.md` — canonical: https://arxiv.org/abs/2607.28568v1
* **Archive**: Moved source PDF to [/archive/frontis-ma1-ai4ai-recursive-self-improvement.pdf](/archive/frontis-ma1-ai4ai-recursive-self-improvement.pdf)
* **Vault**: Created [trained-program-evolution-operators](/vault/trained-program-evolution-operators.md), [operator-conditioned-search-memory](/vault/operator-conditioned-search-memory.md), [quality-progress-novelty-parent-selection](/vault/quality-progress-novelty-parent-selection.md), [policy-adaptive-reward-bounds](/vault/policy-adaptive-reward-bounds.md)
## 2026-08-11 (AI Performance in Bing Webmaster Tools)
* **Ingest**: `url:blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview` — `Introducing AI Performance in Bing Webmaster Tools (Public Preview) dossier` at `/dossiers/bing-webmaster-tools-ai-performance.md` — canonical: https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
* **Note**: Web-only source; no archive copy created.
* **Vault**: Created [ai-search-visibility-measurement](/vault/ai-search-visibility-measurement.md), [grounding-query-telemetry](/vault/grounding-query-telemetry.md), [retrieval-legible-content-structure](/vault/retrieval-legible-content-structure.md)
## 2026-08-11 (Google Search Generative AI Optimization Guide)
* **Ingest**: `url:developers.google.com/search/docs/fundamentals/ai-optimization-guide` — `Optimizing Your Website for Generative AI Features on Google Search dossier` at `/dossiers/google-search-generative-ai-optimization-guide.md` — canonical: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
* **Archive**: None — web-only source retained by canonical URL (page last updated 2026-07-10 UTC)
* **Vault**: Created [generative-engine-optimization](/vault/generative-engine-optimization.md), [query-fan-out](/vault/query-fan-out.md), [publisher-ai-usage-controls](/vault/publisher-ai-usage-controls.md)
## 2026-08-11 (GEO implementation synthesis ingest)
* **Ingest**: `sha256:8e65c83dcd033170db57478e0c027f4017050bfb08442d1728a9d18a29e94876` — `Generative Engine Optimization in Practice: A Framework-Agnostic Implementation Guide dossier` at `/dossiers/generative-engine-optimization-implementation-guide.md` — canonical: /archive/generative-engine-optimization-implementation-guide.md
* **Archive**: Authored locally and stored at [/archive/generative-engine-optimization-implementation-guide.md](/archive/generative-engine-optimization-implementation-guide.md) — original synthesis (2026-08-11) of two practitioner GEO guides: https://strapi.io/blog/generative-engine-optimization-geo-guide and https://dev.to/nerajno/geo-generative-engine-optimization-applied-27a3
* **Vault**: Created [generative-engine-optimization](/vault/generative-engine-optimization.md), `answer-first-content-structure` (later merged into [retrieval-legible-content-structure](/vault/retrieval-legible-content-structure.md); see consolidation entry), [entity-consistency](/vault/entity-consistency.md), [ai-citation-rate](/vault/ai-citation-rate.md)
* **Taxonomy gap**: No SEO/GEO/AI-search facet exists; tagged with nearest broader terms (`retrieval`, `context-engineering`, `knowledge-graphs`, `evaluation`, `provenance`). Candidates flagged for TAXONOMY.md: `generative-engine-optimization` (or `ai-search-visibility`), `content-structure`, `web-crawling`. TAXONOMY.md not edited.

## 2026-08-11 (post-merge consolidation)
* **Vault**: Merged `answer-engine-optimization` into [generative-engine-optimization](/vault/generative-engine-optimization.md) — same practice under two names; the AEO alias, zero-click cross-link, answer-engineering disambiguation, and the AEO dossier source moved to the umbrella page; duplicate page removed
* **Vault**: Merged `answer-first-content-structure` into [retrieval-legible-content-structure](/vault/retrieval-legible-content-structure.md) — same passage-self-containment discipline documented by two parallel ingests; duplicate page removed
* **Vault**: Unified the parallel drafts of [generative-engine-optimization](/vault/generative-engine-optimization.md) (five sources) and [ai-search-visibility-measurement](/vault/ai-search-visibility-measurement.md) (two sources) produced by concurrent ingest branches
* **Taxonomy**: Promoted `generative-search` to [/TAXONOMY.md](/TAXONOMY.md) (new "Generative Search & Content Visibility" facet) — flagged independently by seven ingests in this batch, with ~26 pages carrying it; added nine Watchlist candidates flagged during the batch (`web-crawling`, `citation-behavior`, `content-structure`, `recurrent-models`, `recursive-self-improvement`, `evolutionary-search`, `interpretability`, `reversibility`)
* **Retag**: Added `generative-search` as the lead tag on the 8 GEO/AEO-cluster dossiers and 18 vault pages

## 2026-08-23 (PromptBridge)
* **Ingest**: `arxiv:2512.01420` — `PromptBridge: Cross-Model Prompt Transfer for Large Language Models dossier` at `/dossiers/promptbridge-cross-model-prompt-transfer.md` — canonical: https://arxiv.org/abs/2512.01420v1
* **Archive**: Moved source PDF to [/archive/promptbridge-cross-model-prompt-transfer.pdf](/archive/promptbridge-cross-model-prompt-transfer.pdf)
* **Vault**: Created [prompt-model-drift](/vault/prompt-model-drift.md), [cross-model-prompt-mapping](/vault/cross-model-prompt-mapping.md)
* **Vault**: Updated [prompt-optimization](/vault/prompt-optimization.md), [model-aware-harness-design](/vault/model-aware-harness-design.md)

## 2026-08-25 (Towards Understanding Sycophancy)
* **Ingest**: `arxiv:2310.13548` — `Towards Understanding Sycophancy in Language Models dossier` at `/dossiers/understanding-sycophancy-language-models.md` — canonical: https://arxiv.org/abs/2310.13548v4
* **Archive**: Moved source PDF (ICLR 2024 camera-ready, arXiv v4) to [/archive/understanding-sycophancy-language-models.pdf](/archive/understanding-sycophancy-language-models.pdf)
* **Vault**: Created [sycophancy](/vault/sycophancy.md), [user-cue-perturbation-evaluation](/vault/user-cue-perturbation-evaluation.md), [preference-data-feature-attribution](/vault/preference-data-feature-attribution.md), [prompted-preference-model-debiasing](/vault/prompted-preference-model-debiasing.md)
* **Taxonomy gap**: No alignment/model-behavior facet exists (sycophancy, truthfulness, reward hacking, scalable oversight); tagged with nearest broader terms (`reliability`, `reinforcement-learning`, `human-in-the-loop`, `evaluation`). Candidate flagged for TAXONOMY.md: `alignment`.

## 2026-08-25 (Sycophancy: Causes and Mitigations)
* **Ingest**: `arxiv:2411.15287` — `Sycophancy in Large Language Models: Causes and Mitigations dossier` at `/dossiers/sycophancy-large-language-models-causes-mitigations.md` — canonical: https://arxiv.org/abs/2411.15287v1
* **Archive**: Moved source PDF to [/archive/sycophancy-large-language-models-causes-mitigations.pdf](/archive/sycophancy-large-language-models-causes-mitigations.pdf)
* **Vault**: Created [leading-query-contrastive-decoding](/vault/leading-query-contrastive-decoding.md), [side-effect-bounded-activation-steering](/vault/side-effect-bounded-activation-steering.md)
* **Vault**: Updated [sycophancy](/vault/sycophancy.md) (contributing causes, mitigations-by-intervention-point table, source) and [user-cue-perturbation-evaluation](/vault/user-cue-perturbation-evaluation.md) (FlipFlop metric definitions, source) — umbrella pages created by the same-day `arxiv:2310.13548` ingest; additions applied in the orchestrated merge
* **Taxonomy gap**: Candidates flagged for TAXONOMY.md: `alignment`, `decoding` (inference-time intervention); adds evidence to the existing `interpretability` Watchlist entry.

## 2026-08-25 (Verbosity Bias in Preference Labeling)
* **Ingest**: `arxiv:2310.10076` — `Verbosity Bias in Preference Labeling by Large Language Models dossier` at `/dossiers/verbosity-bias-preference-labeling-llms.md` — canonical: https://arxiv.org/abs/2310.10076v1
* **Archive**: Moved source PDF to [/archive/verbosity-bias-preference-labeling-llms.pdf](/archive/verbosity-bias-preference-labeling-llms.pdf)
* **Vault**: Created [verbosity-bias-in-preference-evaluation](/vault/verbosity-bias-in-preference-evaluation.md), [human-anchored-judge-bias-measurement](/vault/human-anchored-judge-bias-measurement.md), [judge-bias-as-accuracy-parity](/vault/judge-bias-as-accuracy-parity.md)
* **Taxonomy gap**: No facet for evaluator-side bias (verbosity/length, position, self-enhancement); tagged with nearest broader terms (`llm-as-judge`, `evaluation`, `reliability`). Candidate flagged: `evaluation-bias`.

## 2026-08-25 (Verbosity ≠ Veracity)
* **Ingest**: `arxiv:2411.07858` — `Verbosity ≠ Veracity: Demystify Verbosity Compensation Behavior of Large Language Models dossier` at `/dossiers/verbosity-compensation-large-language-models.md` — canonical: https://arxiv.org/abs/2411.07858v2
* **Archive**: Moved arXiv:2411.07858v2 source PDF to [/archive/verbosity-compensation-large-language-models.pdf](/archive/verbosity-compensation-large-language-models.pdf)
* **Archive**: Moved duplicate arXiv:2411.07858v1 revision of the same source to [/archive/verbosity-compensation-large-language-models-arxiv-v1.pdf](/archive/verbosity-compensation-large-language-models-arxiv-v1.pdf) — retained as a duplicate, not a separate ingest; v2 adds Appendix C supplementary experiments and was the revision ingested
* **Vault**: Created [verbosity-compensation](/vault/verbosity-compensation.md), [verbosity-as-uncertainty-signal](/vault/verbosity-as-uncertainty-signal.md), [verbosity-triggered-model-cascade](/vault/verbosity-triggered-model-cascade.md)
* **Vault**: Updated [verbosity-bias-in-preference-evaluation](/vault/verbosity-bias-in-preference-evaluation.md) (anti-correlation-with-correctness detection bullet, related link) — applied in the orchestrated merge
* **Taxonomy gap**: No uncertainty/confidence facet exists; tagged with nearest broader terms (`reliability`, `evaluation`). Candidate flagged for TAXONOMY.md: `uncertainty-quantification`.

## 2026-08-25 (FiMi-RM)
* **Ingest**: `arxiv:2505.12843` — `Bias Fitting to Mitigate Length Bias of Reward Model in RLHF dossier` at `/dossiers/fimi-rm-bias-fitting-length-bias.md` — canonical: https://arxiv.org/abs/2505.12843v2
* **Archive**: Moved source PDF to [/archive/fimi-rm-bias-fitting-length-bias.pdf](/archive/fimi-rm-bias-fitting-length-bias.pdf)
* **Vault**: Created [learned-bias-fitting-reward-debiasing](/vault/learned-bias-fitting-reward-debiasing.md), [stop-gradient-correlation-decoupling](/vault/stop-gradient-correlation-decoupling.md), [confound-partitioned-accuracy](/vault/confound-partitioned-accuracy.md)
* **Vault**: Updated [verbosity-bias-in-preference-evaluation](/vault/verbosity-bias-in-preference-evaluation.md) (reward-model manifestation, source) and [rule-based-rewards](/vault/rule-based-rewards.md) (correctable-verbosity-bias limitation) — applied in the orchestrated merge
* **Taxonomy gap**: No reward-modeling/reward-design facet exists; tagged with nearest broader terms (`reinforcement-learning`, `evaluation`, `reliability`, `generalization`). Candidates flagged for TAXONOMY.md: `reward-modeling`, `shortcut-learning`.

## 2026-08-25 (Principled Instructions)
* **Ingest**: `arxiv:2312.16171` — `Principled Instructions Are All You Need for Questioning LLaMA-1/2, GPT-3.5/4 dossier` at `/dossiers/principled-instructions-questioning-llms.md` — canonical: https://arxiv.org/abs/2312.16171v2
* **Archive**: Moved source PDF to [/archive/principled-instructions-questioning-llms.pdf](/archive/principled-instructions-questioning-llms.pdf)
* **Vault**: Created [prompt-incentive-framing](/vault/prompt-incentive-framing.md), [output-priming](/vault/output-priming.md), [quality-versus-correctness-prompt-evaluation](/vault/quality-versus-correctness-prompt-evaluation.md)
* **Vault**: Updated [prompt-contingency](/vault/prompt-contingency.md), [application-centric-prompt-taxonomy](/vault/application-centric-prompt-taxonomy.md), [answer-engineering](/vault/answer-engineering.md), [chain-of-thought-prompting](/vault/chain-of-thought-prompting.md)

## 2026-08-25 (Register Analysis for Arbitrary Style Transfer)
* **Ingest**: `arxiv:2505.00679` — `Steering Large Language Models with Register Analysis for Arbitrary Style Transfer dossier` at `/dossiers/register-analysis-arbitrary-style-transfer.md` — canonical: https://arxiv.org/abs/2505.00679v2
* **Archive**: Moved source PDF to [/archive/register-analysis-arbitrary-style-transfer.pdf](/archive/register-analysis-arbitrary-style-transfer.pdf)
* **Vault**: Created [framework-anchored-intermediate-descriptions](/vault/framework-anchored-intermediate-descriptions.md), [contrastive-exemplar-characterization](/vault/contrastive-exemplar-characterization.md), [exemplar-copy-leakage](/vault/exemplar-copy-leakage.md)
* **Taxonomy gap**: No tag covers controllable text generation / style transfer as a task family; tagged with nearest broader terms (`prompting`, `in-context-learning`, `decomposition`, `evaluation`). Candidate flagged for TAXONOMY.md: `controllable-generation`.

## 2026-08-25 (PEEM)
* **Ingest**: `arxiv:2603.10477` — `PEEM: Prompt Engineering Evaluation Metrics for Interpretable Joint Evaluation of Prompts and Responses dossier` at `/dossiers/peem-prompt-engineering-evaluation-metrics.md` — canonical: https://arxiv.org/abs/2603.10477v2
* **Archive**: Moved source PDF (arXiv:2603.10477v2, 8 Apr 2026) to [/archive/peem-prompt-engineering-evaluation-metrics.pdf](/archive/peem-prompt-engineering-evaluation-metrics.pdf)
* **Vault**: Created [joint-prompt-response-evaluation](/vault/joint-prompt-response-evaluation.md), [rationale-guided-prompt-rewriting](/vault/rationale-guided-prompt-rewriting.md), [paraphrase-adversarial-evaluator-validation](/vault/paraphrase-adversarial-evaluator-validation.md)
* **Vault**: Updated [prompt-optimization](/vault/prompt-optimization.md) (Rubric-Rationale Prompt Rewriting method entry), [llm-as-judge-with-anti-inflation](/vault/llm-as-judge-with-anti-inflation.md) (judge-leniency validation evidence), [textual-feedback-backpropagation](/vault/textual-feedback-backpropagation.md) (source)

## 2026-08-25 (LLMs Are Biased Because They Are LLMs)
* **Ingest**: `doi:10.1162/coli_a_00558` — `Large Language Models Are Biased Because They Are Large Language Models dossier` at `/dossiers/llms-are-biased-because-they-are-llms.md` — canonical: https://doi.org/10.1162/coli_a_00558
* **Archive**: Moved source PDF (Computational Linguistics 51(3):885–906, CC BY-NC-ND 4.0) to [/archive/llms-are-biased-because-they-are-llms.pdf](/archive/llms-are-biased-because-they-are-llms.pdf)
* **Vault**: Created [distributional-normativity-blindness](/vault/distributional-normativity-blindness.md), [overt-covert-bias-divergence](/vault/overt-covert-bias-divergence.md), [anchor-constrained-bias-mitigation](/vault/anchor-constrained-bias-mitigation.md), [bias-as-prior-dominance](/vault/bias-as-prior-dominance.md)
* **Taxonomy gap**: No harmful-bias/fairness/alignment facet exists; tagged with nearest broader terms (`governance`, `reinforcement-learning`, `evaluation`, `reliability`, `fine-tuning`, `verification`). Candidates flagged for TAXONOMY.md: `bias-and-fairness`, `alignment`.

## 2026-08-25 (post-merge consolidation)
* **Vault**: Applied reciprocal cross-links between the batch's parallel ingest branches — [verbosity-bias-in-preference-evaluation](/vault/verbosity-bias-in-preference-evaluation.md) ↔ [verbosity-compensation](/vault/verbosity-compensation.md), [learned-bias-fitting-reward-debiasing](/vault/learned-bias-fitting-reward-debiasing.md), and [prompted-preference-model-debiasing](/vault/prompted-preference-model-debiasing.md); [joint-prompt-response-evaluation](/vault/joint-prompt-response-evaluation.md) ↔ [quality-versus-correctness-prompt-evaluation](/vault/quality-versus-correctness-prompt-evaluation.md); [llm-as-judge-with-anti-inflation](/vault/llm-as-judge-with-anti-inflation.md) → the verbosity-bias umbrella. No duplicate pages required merging: the nine parallel ingests were pre-assigned umbrella ownership (sycophancy → `arxiv:2310.13548`; judge verbosity bias → `arxiv:2310.10076`) and all 28 new vault pages are distinct concepts.
* **Taxonomy**: Added eight Watchlist candidates flagged during the batch (`alignment` — flagged independently by three ingests, `evaluation-bias`, `uncertainty-quantification`, `reward-modeling`, `shortcut-learning`, `bias-and-fairness`, `controllable-generation`, `decoding`) and appended batch evidence to the existing `interpretability` entry. No promotions; several candidates are at or near the ~5-page bar and should be re-evaluated at the next taxonomy review.
* **Note**: Pre-existing inconsistencies observed and left untouched, apparently from unregistered late-July work: `/vault/clarification-need-decision.md`, `/vault/subscription-billed-programmatic-cli-agent-access.md`, and `/vault/cli-agent-hook-event-surfaces.md` (all created 2026-07-28) exist on disk but appear in neither `index.md` nor `log.md`; `/dossiers/scaling-instruction-finetuned-language-models.md` (created 2026-07-30, PDF present in `archive/`) is likewise unregistered in `log.md` and links to a nonexistent `/vault/instruction-tuning.md`.

## 2026-08-25 (Scaling Instruction-Finetuned LMs repair ingest)
* **Ingest**: `arxiv:2210.11416` — `Scaling Instruction-Finetuned Language Models dossier` at `/dossiers/scaling-instruction-finetuned-language-models.md` — canonical: https://arxiv.org/abs/2210.11416v5
* **Archive**: Registered existing source PDF at [/archive/scaling-instruction-finetuned-language-models.pdf](/archive/scaling-instruction-finetuned-language-models.pdf); SHA-256 `771f758c1b711c2a63ca2439e80ab90751351d721632897a058c0205ba9e2a22`
* **Repair**: Removed the unregistered 2026-07-30 remnant dossier of the same slug (noted in the post-merge consolidation entry above) — it was registered in neither `log.md`, `index.md`, nor `archive/index.md` and linked to a then-nonexistent `/vault/instruction-tuning.md`. The user redownloaded the source to `inbox/2210.11416v5.pdf`; its SHA-256 was verified byte-identical to the archived copy before and after this ingest, so the archived file was left untouched and the inbox copy was removed. The dossier was rewritten from the source, not from the remnant.
* **Vault**: Created [instruction-tuning](/vault/instruction-tuning.md) — the umbrella concept the remnant's broken link pointed at
* **Vault**: Updated [chain-of-thought-prompting](/vault/chain-of-thought-prompting.md) (post-training-mixture dependence, zero-shot CoT as an instruction-tuning artifact, source), [emergent-abilities](/vault/emergent-abilities.md) (Flan qualifying the ~100B instruction-tuning threshold while CoT-prompting benefit stayed scale-gated, source), [prompt-contingency](/vault/prompt-contingency.md) (finetuning mixture as a contingency axis distinct from scale, source)
* **Taxonomy**: No new gap unique to this source — `fine-tuning` covers instruction tuning by definition. The paper's Responsible AI appendix (toxic-generation rates, Winogender, translation misgendering) adds evidence to the existing `alignment` and `bias-and-fairness` Watchlist candidates; tagged with nearest broader terms.

## 2026-08-25 (orphaned vault page registration)
* **Repair**: Registered the three orphaned vault pages flagged in the post-merge consolidation entry above — [clarification-need-decision](/vault/clarification-need-decision.md), [subscription-billed-programmatic-cli-agent-access](/vault/subscription-billed-programmatic-cli-agent-access.md), and [cli-agent-hook-event-surfaces](/vault/cli-agent-hook-event-surfaces.md) — by adding each to `index.md`. All three are self-contained synthesis notes from unregistered mid/late-July work sessions (frontmatter timestamps 2026-07-15 to 2026-07-23, files created 2026-07-28); their content, frontmatter, and cross-links were verified intact and left unmodified. Not ingests — no external source file or source key is associated with these pages; the two CLI-transport notes are research syntheses companion to the already-registered [hook-driven-tmux-agent-transport](/vault/hook-driven-tmux-agent-transport.md).

## 2026-08-31 (Inbox and Stencil article ingest)
* **Ingest**: `arxiv:2509.19163` — `Measuring AI “Slop” in Text dossier` at `/dossiers/measuring-ai-slop-in-text.md` — canonical: https://arxiv.org/abs/2509.19163v2
* **Archive**: Moved source PDF to [/archive/measuring-ai-slop-in-text.pdf](/archive/measuring-ai-slop-in-text.pdf); SHA-256 `60defef85f66fc383366bc46bcbfefcb930c2d1eca4ba1735c0d3ef76aebcc11`
* **Vault candidate**: `purpose-conditioned-text-quality-evaluation` was drafted, then removed during corpus reconciliation in favor of existing quality-evaluation synthesis pages.
* **Ingest**: `arxiv:2608.27454` — `WikiSkill: Compiling Agent Experience into Persistent Knowledge for Skill Evolution dossier` at `/dossiers/wikiskill-persistent-knowledge-skill-evolution.md` — canonical: https://arxiv.org/abs/2608.27454v1
* **Archive**: Moved source PDF to [/archive/wikiskill-persistent-knowledge-skill-evolution.pdf](/archive/wikiskill-persistent-knowledge-skill-evolution.pdf); SHA-256 `65afc6e12f6f707483fe1b79a97ab67c03abf4b4992f82fde03eb7b8d9ad4a69`
* **Vault candidate**: `lifecycle-separated-agent-knowledge` was drafted, then removed during corpus reconciliation in favor of existing memory, gating, and model-transfer synthesis pages.
* **Ingest**: `sha256:678819db12b1c8900076341822232e49b45bdc060f243aa1b5c33cb94fba2df3` — `ASD-STE100 Simplified Technical English and Artificial Intelligence dossier` at `/dossiers/asd-ste100-ai-assisted-technical-writing.md` — canonical: /archive/asd-ste100-ai-assisted-technical-writing.pdf
* **Archive**: Moved source PDF to [/archive/asd-ste100-ai-assisted-technical-writing.pdf](/archive/asd-ste100-ai-assisted-technical-writing.pdf); SHA-256 `678819db12b1c8900076341822232e49b45bdc060f243aa1b5c33cb94fba2df3`
* **Vault**: Created [normative-source-grounded-ai-assistance](/vault/normative-source-grounded-ai-assistance.md)
* **Ingest**: `url:stencil.so/blog/prewalk` — `You Only Need the Frontier Model for One Single Edit dossier` at `/dossiers/prewalk-trajectory-preserving-model-handoff.md` — canonical: https://stencil.so/blog/prewalk
* **Vault**: Created [trajectory-preserving-model-handoff](/vault/trajectory-preserving-model-handoff.md)
* **Ingest**: `url:stencil.so/blog/snapcompact` — `Snapcompact: SoTA Compaction — Instant, Local, Free. Pick 3 dossier` at `/dossiers/snapcompact-pixel-context-carriers.md` — canonical: https://stencil.so/blog/snapcompact
* **Vault**: Created [cross-modal-context-carrier](/vault/cross-modal-context-carrier.md)
* **Vault correction**: Removed the newly created `purpose-conditioned-text-quality-evaluation` and `lifecycle-separated-agent-knowledge` pages after corpus reconciliation showed that they duplicated broader existing synthesis topics.
* **Vault**: Updated [quality-versus-correctness-prompt-evaluation](/vault/quality-versus-correctness-prompt-evaluation.md) and [llm-as-judge-with-anti-inflation](/vault/llm-as-judge-with-anti-inflation.md) from `arxiv:2509.19163`.
* **Vault**: Updated [memory-lifecycle-governance](/vault/memory-lifecycle-governance.md), [score-gated-refinement](/vault/score-gated-refinement.md), and [model-aware-harness-design](/vault/model-aware-harness-design.md) from `arxiv:2608.27454`.
* **Vault**: Retained [normative-source-grounded-ai-assistance](/vault/normative-source-grounded-ai-assistance.md), [trajectory-preserving-model-handoff](/vault/trajectory-preserving-model-handoff.md), and [cross-modal-context-carrier](/vault/cross-modal-context-carrier.md) as absent atomic concepts; expanded them with cross-source evidence and boundaries.
* **Vault**: Updated [model-aware-harness-design](/vault/model-aware-harness-design.md) from Prewalk and [rate-distortion-memory-compaction](/vault/rate-distortion-memory-compaction.md) plus [code-context-minification](/vault/code-context-minification.md) from Snapcompact.

## 2026-09-14 (To CoT or Not to CoT)
* **Ingest**: `arxiv:2409.12183` — `To CoT or Not to CoT? Chain-of-Thought Helps Mainly on Math and Symbolic Reasoning dossier` at `/dossiers/to-cot-or-not-to-cot.md` — canonical: https://arxiv.org/abs/2409.12183v3
* **Archive**: Moved source PDF to [/archive/to-cot-or-not-to-cot.pdf](/archive/to-cot-or-not-to-cot.pdf); SHA-256 `9f6aeece29b29ed4a20e7edbb430267e11ed6481ce872edc1bff91a9069573a1`
* **Vault**: Updated [chain-of-thought-prompting](/vault/chain-of-thought-prompting.md) (task-shape evidence, planning/execution ablation, solver comparison) and [prompt-contingency](/vault/prompt-contingency.md) (task shape as a contingency axis)

## 2026-09-14 (Inbox completion batch)
* **Ingest**: `arxiv:2102.09690` — `Calibrate Before Use: Improving Few-Shot Performance of Language Models dossier` at `/dossiers/calibrate-before-use.md` — canonical: https://arxiv.org/abs/2102.09690v2
* **Ingest**: `doi:10.18653/v1/2022.emnlp-main.759` — `Rethinking the Role of Demonstrations: What Makes In-Context Learning Work? dossier` at `/dossiers/rethinking-role-demonstrations-icl.md` — canonical: https://aclanthology.org/2022.emnlp-main.759/
* **Ingest**: `arxiv:2302.00093` — `Large Language Models Can Be Easily Distracted by Irrelevant Context dossier` at `/dossiers/irrelevant-context-distraction.md` — canonical: https://arxiv.org/abs/2302.00093v3
* **Ingest**: `arxiv:2305.04388` — `Language Models Don’t Always Say What They Think dossier` at `/dossiers/unfaithful-chain-of-thought-explanations.md` — canonical: https://arxiv.org/abs/2305.04388v2
* **Ingest**: `arxiv:2309.03409` — `Large Language Models as Optimizers dossier` at `/dossiers/opro-large-language-models-as-optimizers.md` — canonical: https://arxiv.org/abs/2309.03409v3
* **Ingest**: `doi:10.18653/v1/2024.findings-emnlp.888` — `When “A Helpful Assistant” Is Not Really Helpful dossier` at `/dossiers/personas-system-prompts-not-helpful.md` — canonical: https://aclanthology.org/2024.findings-emnlp.888/
* **Ingest**: `doi:10.1162/tacl_a_00681` — `State of What Art? A Call for Multi-Prompt LLM Evaluation dossier` at `/dossiers/multi-prompt-llm-evaluation.md` — canonical: https://doi.org/10.1162/tacl_a_00681
* **Ingest**: `arxiv:2406.11695` — `Optimizing Instructions and Demonstrations for Multi-Stage Language Model Programs dossier` at `/dossiers/mipro-multistage-prompt-optimization.md` — canonical: https://arxiv.org/abs/2406.11695v2
* **Ingest**: `doi:10.18653/v1/2024.emnlp-industry.91` — `Let Me Speak Freely? dossier` at `/dossiers/format-restrictions-llm-performance.md` — canonical: https://aclanthology.org/2024.emnlp-industry.91/
* **Ingest**: `doi:10.1038/s41586-025-09422-z` — `DeepSeek-R1: Reasoning Through Reinforcement Learning dossier` at `/dossiers/deepseek-r1.md` — canonical: https://doi.org/10.1038/s41586-025-09422-z
* **Ingest**: `arxiv:2505.05410` — `Reasoning Models Don’t Always Say What They Think dossier` at `/dossiers/reasoning-models-unfaithful-chain-of-thought.md` — canonical: https://arxiv.org/abs/2505.05410v1
* **Ingest**: `doi:10.18653/v1/2025.findings-emnlp.729` — `Revisiting Chain-of-Thought Prompting: Zero-shot Can Be Stronger than Few-shot dossier` at `/dossiers/zero-shot-stronger-than-few-shot-cot.md` — canonical: https://aclanthology.org/2025.findings-emnlp.729/
* **Ingest**: `arxiv:2507.19457` — `GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning dossier` at `/dossiers/gepa-reflective-prompt-evolution.md` — canonical: https://arxiv.org/abs/2507.19457v2
* **Ingest**: `arxiv:2512.13598` — `Textual Gradients are a Flawed Metaphor for Automatic Prompt Optimization dossier` at `/dossiers/textual-gradients-flawed-metaphor.md` — canonical: https://arxiv.org/abs/2512.13598v1
* **Ingest**: `arxiv:2604.27637` — `Optimization before Evaluation dossier` at `/dossiers/optimization-before-evaluation.md` — canonical: https://arxiv.org/abs/2604.27637v1
* **Ingest**: `ssrn:5879722` — `Playing Pretend: Expert Personas Don't Improve Factual Accuracy dossier` at `/dossiers/expert-personas-factual-accuracy.md` — canonical: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5879722
* **Ingest**: `url:www.anthropic.com/engineering/april-23-postmortem` — `An update on recent Claude Code quality reports dossier` at `/dossiers/anthropic-claude-code-quality-postmortem.md` — canonical: https://www.anthropic.com/engineering/april-23-postmortem
* **Ingest**: `url:trychroma.com/research/context-rot` — `Context Rot dossier` at `/dossiers/context-rot-long-context-performance.md` — canonical: https://trychroma.com/research/context-rot
* **Ingest**: `url:www.anthropic.com/engineering/demystifying-evals-for-ai-agents` — `Demystifying evals for AI agents dossier` at `/dossiers/demystifying-agent-evals.md` — canonical: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
* **Ingest**: `url:blog.dottxt.ai/say-what-you-mean.html` — `Say What You Mean dossier` at `/dossiers/say-what-you-mean-structured-output.md` — canonical: https://blog.dottxt.ai/say-what-you-mean.html
* **Ingest**: `url:platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices` — `Prompting best practices dossier` at `/dossiers/claude-prompting-best-practices.md` — canonical: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
* **Ingest**: `url:developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide` — `Codex Prompting Guide dossier` at `/dossiers/openai-codex-prompting-guide.md` — canonical: https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide
* **Ingest**: `url:developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide` — `GPT-5 prompting guide dossier` at `/dossiers/openai-gpt-5-prompting-guide.md` — canonical: https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide
* **Archive**: Moved 20 standalone source files, the two-file DeepSeek-R1 publication bundle, and four saved HTML captures with their asset trees into `/archive/`; byte-level or tree-level SHA-256 values were preserved. Relative compatibility symlinks keep the immutable HTML captures' original `_files/` references usable.
* **Vault**: Sequentially reconciled the batch into existing synthesis pages for in-context learning, chain-of-thought faithfulness and elicitation, prompt optimization, evaluation, answer extraction, prompt contingency, long-context retrieval, model-aware harnesses, reasoning budgets, agent outcomes, context loss, bounded observations, and cue perturbation. No duplicate vault concept was created.
* **Taxonomy**: No tag was promoted. The batch adds evidence to existing watchlist themes including `interpretability`, `shortcut-learning`, and `evolutionary-search`; possible structured-generation and explanation-faithfulness labels remain below the reuse threshold.

## 2026-09-24 (Agentic code-quality inbox batch)
* **Ingest**: `url:agentskills.io/specification` — `Specification dossier` at `/dossiers/agent-skills-format-specification.md` — canonical: https://agentskills.io/specification
* **Ingest**: `url:agentskills.io/skill-creation/evaluating-skills` — `Evaluating skill output quality dossier` at `/dossiers/evaluating-agent-skills-output-quality.md` — canonical: https://agentskills.io/skill-creation/evaluating-skills
* **Ingest**: `url:platform.claude.com/docs/en/agents-and-tools/agent-skills/overview` — `Agent Skills dossier` at `/dossiers/anthropic-agent-skills-platform-overview.md` — canonical: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
* **Ingest**: `url:www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills` — `Equipping agents for the real world with Agent Skills dossier` at `/dossiers/anthropic-equipping-agents-with-skills.md` — canonical: https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
* **Ingest**: `url:platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices` — `Skill authoring best practices dossier` at `/dossiers/anthropic-skill-authoring-best-practices.md` — canonical: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
* **Ingest**: `url:code.claude.com/docs/en/skills` — `Extend Claude with skills dossier` at `/dossiers/claude-code-skills-reference.md` — canonical: https://code.claude.com/docs/en/skills
* **Ingest**: `url:learn.chatgpt.com/docs/build-skills` — `Build skills dossier` at `/dossiers/openai-build-agent-skills.md` — canonical: https://learn.chatgpt.com/docs/build-skills
* **Ingest**: `arxiv:2601.10338` — `Agent Skills in the Wild: An Empirical Study of Security Vulnerabilities at Scale dossier` at `/dossiers/agent-skills-security-vulnerabilities-wild.md` — canonical: https://arxiv.org/abs/2601.10338v1
* **Ingest**: `arxiv:2602.06547` — `“Do Not Mention This to the User”: Detecting and Understanding Malicious Agent Skills in the Wild dossier` at `/dossiers/malicious-agent-skills-wild.md` — canonical: https://arxiv.org/abs/2602.06547v4
* **Ingest**: `arxiv:2607.01456` — `From Anatomy to Smells: An Empirical Study of SKILL.md in Agent Skills dossier` at `/dossiers/skill-md-anatomy-and-smells.md` — canonical: https://arxiv.org/abs/2607.01456v2
* **Ingest**: `arxiv:2608.08453` — `What Keeps Agent Skills from Being Reusable? Evidence from 138K SKILL.md Files dossier` at `/dossiers/agent-skills-reusability-defects.md` — canonical: https://arxiv.org/abs/2608.08453v1
* **Ingest**: `arxiv:2608.14036` — `Demystifying Agent Skills: Why They Work—Until They Don’t dossier` at `/dossiers/demystifying-agent-skills-why-they-work.md` — canonical: https://arxiv.org/abs/2608.14036v1
* **Ingest**: `arxiv:2602.12670` — `SkillsBench: Benchmarking How Well Agent Skills Work Across Diverse Tasks dossier` at `/dossiers/skillsbench-agent-skills-efficacy.md` — canonical: https://arxiv.org/abs/2602.12670v4
* **Ingest**: `arxiv:2602.12430` — `Agent Skills for Large Language Models: Architecture, Acquisition, Security, and the Path Forward dossier` at `/dossiers/agent-skills-architecture-acquisition-security-survey.md` — canonical: https://doi.org/10.48550/arXiv.2602.12430
* **Ingest**: `arxiv:2305.16291` — `VOYAGER: An Open-Ended Embodied Agent with Large Language Models dossier` at `/dossiers/voyager-lifelong-learning-agent.md` — canonical: https://arxiv.org/abs/2305.16291v2
* **Ingest**: `arxiv:2504.07079` — `SkillWeaver: Web Agents can Self-Improve by Discovering and Honing Skills dossier` at `/dossiers/skillweaver-web-agent-skill-learning.md` — canonical: https://arxiv.org/abs/2504.07079v1
* **Ingest**: `arxiv:2603.22455` — `SkillRouter: Skill Routing for LLM Agents at Scale dossier` at `/dossiers/skillrouter-skill-routing.md` — canonical: https://arxiv.org/abs/2603.22455v5
* **Ingest**: `arxiv:2606.00510` — `Skill or Skip? Learning Selective Skill Invocation in Agentic Tasks via Dual-Granularity Preference Learning dossier` at `/dossiers/skill-or-skip-agent-skills.md` — canonical: https://arxiv.org/abs/2606.00510v2
* **Ingest**: `arxiv:2606.07412` — `Socratic-SWE: Self-Evolving Coding Agents via Trace-Derived Agent Skills dossier` at `/dossiers/socratic-swe.md` — canonical: https://arxiv.org/abs/2606.07412v1
* **Ingest**: `arxiv:2609.11677` — `Ecdysis: Efficient and Effective Training of Runtime Harnesses for LLM Agents dossier` at `/dossiers/self-evolving-agent-harness-ecdysis.md` — canonical: https://arxiv.org/abs/2609.11677v2
* **Ingest**: `url:stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents` — `Minions: Stripe’s one-shot, end-to-end coding agents dossier` at `/dossiers/stripe-minions-one-shot-coding-agents.md` — canonical: https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents
* **Ingest**: `url:stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2` — `Minions: Stripe’s one-shot, end-to-end coding agents—Part 2 dossier` at `/dossiers/stripe-minions-blueprints-and-ci.md` — canonical: https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2
* **Ingest**: `url:openai.com/index/harness-engineering` — `Harness engineering: leveraging Codex in an agent-first world dossier` at `/dossiers/openai-harness-engineering-agent-first.md` — canonical: https://openai.com/index/harness-engineering/
* **Ingest**: `url:developers.openai.com/blog/custom-code-review-rules-for-codex` — `Custom Code Review rules for Codex dossier` at `/dossiers/openai-custom-code-review-rules.md` — canonical: https://developers.openai.com/blog/custom-code-review-rules-for-codex
* **Ingest**: `url:cognition.com/blog/testing-development` — `Verifying Agentic Development at Scale dossier` at `/dossiers/cognition-verifying-agentic-development.md` — canonical: https://cognition.com/blog/testing-development
* **Ingest**: `url:cognition.com/blog/how-cognition-uses-devin-to-build-devin` — `How Cognition Uses Devin to Build Devin dossier` at `/dossiers/cognition-devin-builds-devin.md` — canonical: https://cognition.com/blog/how-cognition-uses-devin-to-build-devin
* **Ingest**: `url:shopify.engineering/introducing-roast` — `Introducing Roast: Structured AI workflows made easy dossier` at `/dossiers/shopify-roast-structured-ai-workflows.md` — canonical: https://shopify.engineering/introducing-roast
* **Ingest**: `url:developers.googleblog.com/conductor-update-introducing-automated-reviews` — `Conductor Update: Introducing Automated Reviews dossier` at `/dossiers/google-conductor-automated-reviews.md` — canonical: https://developers.googleblog.com/conductor-update-introducing-automated-reviews/
* **Ingest**: `url:addyosmani.com/blog/agentic-code-quality` — `Agentic Code Quality dossier` at `/dossiers/agentic-code-quality.md` — canonical: https://addyosmani.com/blog/agentic-code-quality/
* **Ingest**: `url:addyosmani.com/blog/ai-coding-workflow` — `My LLM coding workflow going into 2026 dossier` at `/dossiers/ai-coding-workflow-2026.md` — canonical: https://addyosmani.com/blog/ai-coding-workflow/
* **Ingest**: `url:addyosmani.com/blog/code-agent-orchestra` — `The Code Agent Orchestra - what makes multi-agent coding work dossier` at `/dossiers/code-agent-orchestra.md` — canonical: https://addyosmani.com/blog/code-agent-orchestra/
* **Ingest**: `url:addyosmani.com/blog/code-review-ai` — `AI writes code faster. Your job is still to prove it works. dossier` at `/dossiers/ai-code-review-proof.md` — canonical: https://addyosmani.com/blog/code-review-ai/
* **Ingest**: `url:addyosmani.com/blog/good-spec` — `How to write a good spec for AI agents dossier` at `/dossiers/good-spec-ai-agents.md` — canonical: https://addyosmani.com/blog/good-spec/
* **Ingest**: `url:google.github.io/eng-practices/review/developer/small-cls.html` — `Small CLs dossier` at `/dossiers/google-small-cls.md` — canonical: https://google.github.io/eng-practices/review/developer/small-cls.html
* **Ingest**: `url:claude.com/blog/code-review` — `Bringing Code Review to Claude Code dossier` at `/dossiers/claude-code-review.md` — canonical: https://claude.com/blog/code-review
* **Ingest**: `url:resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf` — `2026 Agentic Coding Trends Report dossier` at `/dossiers/anthropic-agentic-coding-trends-2026.md` — canonical: https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf
* **Ingest**: `url:docs.github.com/en/copilot/concepts/agents/code-review` — `About GitHub Copilot code review dossier` at `/dossiers/github-copilot-code-review-concepts.md` — canonical: https://docs.github.com/en/copilot/concepts/agents/code-review
* **Ingest**: `url:github.blog/changelog/2026-08-07-copilot-code-review-effort-levels-are-generally-available` — `Copilot code review effort levels are generally available dossier` at `/dossiers/github-copilot-review-effort-levels.md` — canonical: https://github.blog/changelog/2026-08-07-copilot-code-review-effort-levels-are-generally-available/
* **Ingest**: `url:docs.github.com/en/copilot/responsible-use/inline-suggestions` — `Application card: GitHub Copilot inline suggestions dossier` at `/dossiers/github-copilot-inline-suggestions-responsible-use.md` — canonical: https://docs.github.com/en/copilot/responsible-use/inline-suggestions
* **Ingest**: `url:research.google/blog/ai-in-software-engineering-at-google-progress-and-the-path-ahead` — `AI in software engineering at Google: Progress and the path ahead dossier` at `/dossiers/google-ai-software-engineering-progress.md` — canonical: https://research.google/blog/ai-in-software-engineering-at-google-progress-and-the-path-ahead/
* **Ingest**: `doi:10.1145/3664646.3665664` — `AI-Assisted Assessment of Coding Practices in Modern Code Review dossier` at `/dossiers/google-autocommenter-coding-practices.md` — canonical: https://doi.org/10.1145/3664646.3665664
* **Ingest**: `arxiv:2501.15134` — `BitsAI-CR: Automated Code Review via LLM in Practice dossier` at `/dossiers/bytedance-bitsai-cr-code-review.md` — canonical: https://arxiv.org/abs/2501.15134v1
* **Ingest**: `arxiv:2609.15877` — `Using Agentic AI for contextualized and multifaceted code review at Ericsson dossier` at `/dossiers/ericsson-contextual-multifaceted-code-review.md` — canonical: https://arxiv.org/abs/2609.15877v1
* **Ingest**: `arxiv:2404.18496` — `AI-powered Code Review with LLMs: Early Results dossier` at `/dossiers/ai-powered-code-review-early-results.md` — canonical: https://arxiv.org/abs/2404.18496v2
* **Ingest**: `doi:10.18653/v1/2024.emnlp-main.632` — `CodeAgent: Autonomous Communicative Agents for Code Review dossier` at `/dossiers/codeagent-communicative-code-review.md` — canonical: https://aclanthology.org/2024.emnlp-main.632/
* **Ingest**: `arxiv:2603.23448` — `Code Review Agent Benchmark dossier` at `/dossiers/c-crab-code-review-agent-benchmark.md` — canonical: https://arxiv.org/abs/2603.23448v3
* **Ingest**: `doi:10.1145/3793302.3793614` — `From Industry Claims to Empirical Reality: An Empirical Study of Code Review Agents in Pull Requests dossier` at `/dossiers/industry-code-review-agent-pr-outcomes.md` — canonical: https://doi.org/10.1145/3793302.3793614
* **Ingest**: `doi:10.4230/LIPIcs.ESEM.2026.74` — `AI-to-AI Code Reviews of GitHub Pull Requests dossier` at `/dossiers/ai-to-ai-code-reviews-github-prs.md` — canonical: https://doi.org/10.4230/LIPIcs.ESEM.2026.74
* **Ingest**: `arxiv:2606.13175` — `The End of Code Review: Coding Agents Supersede Human Inspection dossier` at `/dossiers/end-of-code-review-agent-verification.md` — canonical: https://arxiv.org/abs/2606.13175v1
* **Ingest**: `arxiv:2609.04270` — `Reviewer Capability Governs Rejection Targeting, Not Repair Skill: Evidence from LLM Execute–Review–Revise Pipelines dossier` at `/dossiers/reviewer-capability-rejection-targeting.md` — canonical: https://arxiv.org/abs/2609.04270v1
* **Ingest**: `doi:10.1145/3793302.3793622` — `More Code, Less Reuse: Investigating Code Quality and Reviewer Sentiment towards AI-generated Pull Requests dossier` at `/dossiers/ai-pull-requests-semantic-redundancy.md` — canonical: https://doi.org/10.1145/3793302.3793622
* **Ingest**: `arxiv:2603.28592` — `Debt Behind the AI Boom: A Large-Scale Empirical Study of AI-Generated Code in the Wild dossier` at `/dossiers/ai-generated-code-technical-debt-wild.md` — canonical: https://arxiv.org/abs/2603.28592v2
* **Ingest**: `arxiv:2609.17598` — `Not All Agents Are Equal: Code Quality and Post-Merge Maintenance Across Five Autonomous Coding Agents in the Wild dossier` at `/dossiers/coding-agents-post-merge-maintenance.md` — canonical: https://arxiv.org/abs/2609.17598v1
* **Ingest**: `arxiv:2609.17698` — `A Large-Scale Empirical Study of Quality Assurance Practices and Gaps in AI Agents dossier` at `/dossiers/quality-assurance-gaps-ai-agent-projects.md` — canonical: https://arxiv.org/abs/2609.17698v1
* **Ingest**: `arxiv:2604.20779` — `SWE-chat: Coding Agent Interactions From Real Users in the Wild dossier` at `/dossiers/swe-chat-real-user-coding-agent-interactions.md` — canonical: https://arxiv.org/abs/2604.20779v1
* **Ingest**: `arxiv:2608.12355` — `Position: Humans are Missing from AI Coding Agent Research dossier` at `/dossiers/humans-missing-ai-coding-agent-research.md` — canonical: https://arxiv.org/abs/2608.12355v1
* **Ingest**: `arxiv:2508.11824` — `Rethinking Autonomy: Preventing Failures in AI-Driven Software Engineering dossier` at `/dossiers/rethinking-autonomy-ai-driven-software-engineering.md` — canonical: https://arxiv.org/abs/2508.11824v1
* **Ingest**: `arxiv:2510.23761` — `TDFlow: Agentic Workflows for Test Driven Development dossier` at `/dossiers/tdflow-test-driven-development.md` — canonical: https://arxiv.org/abs/2510.23761v2
* **Ingest**: `arxiv:2602.07900` — `Rethinking the Value of Agent-Generated Tests for LLM-Based Software Engineering Agents dossier` at `/dossiers/agent-generated-tests-software-engineering-value.md` — canonical: https://arxiv.org/abs/2602.07900v2
* **Ingest**: `arxiv:2605.21384` — `SpecBench: Measuring Reward Hacking in Long-Horizon Coding Agents dossier` at `/dossiers/specbench-long-horizon-reward-hacking.md` — canonical: https://arxiv.org/abs/2605.21384v2
* **Ingest**: `arxiv:2606.26300` — `The Verification Horizon: No Silver Bullet for Coding Agent Rewards dossier` at `/dossiers/verification-horizon-coding-agent-rewards.md` — canonical: https://arxiv.org/abs/2606.26300v2
* **Ingest**: `arxiv:2607.28815` — `Preventing Premature Commitment in Coding Agents with an Evidence-Conditioned Execution Layer dossier` at `/dossiers/ecloop-evidence-conditioned-execution.md` — canonical: https://arxiv.org/abs/2607.28815v1
* **Ingest**: `arxiv:2609.21190` — `SWE-Proof: Can Language Models Resolve Real-World Issues with Machine-Checked Proofs? dossier` at `/dossiers/swe-proof-machine-checked-repair.md` — canonical: https://arxiv.org/abs/2609.21190v1
* **Ingest**: `arxiv:2609.19515` — `LLM-as-an-Improver: Turning Verification into Better Candidates dossier` at `/dossiers/llm-as-an-improver-verify-repair-reselect.md` — canonical: https://arxiv.org/abs/2609.19515v1
* **Ingest**: `arxiv:2603.26233` — `Ask or Assume? Uncertainty-Aware Clarification-Seeking in Coding Agents dossier` at `/dossiers/ask-or-assume-coding-agent-clarification.md` — canonical: https://arxiv.org/abs/2603.26233v3
* **Ingest**: `arxiv:2605.25356` — `Names Are All You Need: Effective and Safe Regression Test Selection for Python dossier` at `/dossiers/namerts-python-regression-test-selection.md` — canonical: https://arxiv.org/abs/2605.25356v1
* **Ingest**: `arxiv:2606.26979` — `How Much Static Structure Do Code Agents Need? A Study of Deterministic Anchoring dossier` at `/dossiers/deterministic-anchoring-code-agents.md` — canonical: https://arxiv.org/abs/2606.26979v2
* **Ingest**: `arxiv:2509.11787` — `CodeCureAgent: Automatic Classification and Repair of Static Analysis Warnings dossier` at `/dossiers/codecureagent-static-analysis-warning-repair.md` — canonical: https://arxiv.org/abs/2509.11787v5
* **Ingest**: `arxiv:2609.12746` — `What Drives Recovery in Agentic Text-to-Cypher? LAST-CQ: An LLM Agent Self-Refinement Framework dossier` at `/dossiers/last-cq-what-drives-agentic-recovery.md` — canonical: https://arxiv.org/abs/2609.12746v1
* **Ingest**: `arxiv:2609.15381` — `Translator vs. Challenger: Adversarial Agentic Learning for C-to-Rust Translation dossier` at `/dossiers/trail-translator-challenger-c-to-rust.md` — canonical: https://arxiv.org/abs/2609.15381v1
* **Ingest**: `arxiv:2609.02750` — `Bilevel Coordinated Reflection: A Game-Theoretic Approach to Multi-Agent LLM Systems dossier` at `/dossiers/bilevel-coordinated-reflection.md` — canonical: https://arxiv.org/abs/2609.02750v1
* **Ingest**: `arxiv:2606.22484` — `Governed AI-Assisted Engineering: Graduated Human Oversight for Agentic Code Generation in Regulated Domains dossier` at `/dossiers/governed-ai-assisted-engineering.md` — canonical: https://arxiv.org/abs/2606.22484v2
* **Ingest**: `arxiv:2606.08806` — `Governance Controls for AI-Generated Test Artifacts in Autonomous Software Testing dossier` at `/dossiers/governance-controls-ai-generated-test-artifacts.md` — canonical: https://arxiv.org/abs/2606.08806v1
* **Ingest**: `doi:10.1145/3805689.3812402` — `Human oversight of agentic systems in practice: Examining the oversight work, challenges, and heuristics of developers using software agents dossier` at `/dossiers/human-oversight-agentic-systems-in-practice.md` — canonical: https://doi.org/10.1145/3805689.3812402
* **Ingest**: `doi:10.1007/s43681-026-01147-7` — `Designing meaningful human oversight in AI dossier` at `/dossiers/designing-meaningful-human-oversight-ai.md` — canonical: https://doi.org/10.1007/s43681-026-01147-7
* **Ingest**: `url:repositorio.usp.br/directbitstream/958effe4-5d49-47e9-b0f9-ae01440740b0/3325197.pdf` — `Humans in Control: A Methodological Framework for Quality Assurance in Agentic Software Engineering dossier` at `/dossiers/humans-in-control-agentic-qa.md` — canonical: https://repositorio.usp.br/directbitstream/958effe4-5d49-47e9-b0f9-ae01440740b0/3325197.pdf
* **Ingest**: `doi:10.46299/j.isjea.20260502.03` — `AI agents in software testing: a human-in-the-loop assurance model dossier` at `/dossiers/ai-agents-software-testing-human-assurance.md` — canonical: https://doi.org/10.46299/j.isjea.20260502.03
* **Ingest**: `ssrn:6252918` — `The Ethics of AI-Assisted Code Migration in Regulated Financial Systems: Accountability, Transparency, and Human Oversight in LLM-Driven Software Conversion dossier` at `/dossiers/ethics-ai-assisted-code-migration.md` — canonical: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6252918
* **Ingest**: `ssrn:7349778` — `Adaptive AI Test Governance for Enterprise Software: Risk-Based Validation, Failure Detection, and Human Oversight dossier` at `/dossiers/adaptive-ai-test-governance.md` — canonical: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7349778
* **Ingest**: `arxiv:2408.02479` — `From LLMs to LLM-based Agents for Software Engineering: A Survey of Current, Challenges and Future dossier` at `/dossiers/llm-agents-software-engineering-survey.md` — canonical: https://arxiv.org/abs/2408.02479v2
* **Ingest**: `arxiv:2508.00083` — `A Survey on Code Generation with LLM-based Agents dossier` at `/dossiers/code-generation-agents-survey.md` — canonical: https://arxiv.org/abs/2508.00083v2
* **Ingest**: `arxiv:2510.09721` — `A Comprehensive Survey on Benchmarks and Solutions in Software Engineering of LLM-Empowered Agentic System dossier` at `/dossiers/software-engineering-agent-benchmarks-survey.md` — canonical: https://arxiv.org/abs/2510.09721v3
* **Ingest**: `arxiv:2409.05808` — `The Future of Software Testing: AI-Powered Test Case Generation and Validation dossier` at `/dossiers/ai-test-generation-validation-baqar-khanda.md` — canonical: https://arxiv.org/abs/2409.05808v3
* **Ingest**: `arxiv:2505.13766` — `A Blueprint for AI-Driven Software Quality: Integrating LLMs with Established Standards dossier` at `/dossiers/standards-aligned-ai-software-quality.md` — canonical: https://arxiv.org/abs/2505.13766v5
* **Ingest**: `doi:10.15587/2706-5448.2025.330595` — `AI-Driven Tools in Modern Software Quality Assurance: An Assessment of Benefits, Challenges, and Future Directions dossier` at `/dossiers/ai-driven-software-quality-assurance-pysmennyi.md` — canonical: https://doi.org/10.15587/2706-5448.2025.330595
* **Ingest**: `url:www.harrisonacademicpress.com/index.php/JCCNI/article/view/131` — `AI-Generated Test Automation for Autonomous Software Verification: Enhancing Quality Assurance Through AI-Driven Testing dossier` at `/dossiers/autonomous-test-automation-natarajan.md` — canonical: https://www.harrisonacademicpress.com/index.php/JCCNI/article/view/131
* **Ingest**: `doi:10.1145/3803846.3807468` — `NGQA: Next-Gen Software Quality Accelerator using AI Agents and LLM Reasoning dossier` at `/dossiers/ngqa-software-quality-accelerator.md` — canonical: https://doi.org/10.1145/3803846.3807468
* **Ingest**: `arxiv:2609.14992` — `MTAC-IFBench: Benchmarking Instruction-Following in Multi-Turn Agentic Coding dossier` at `/dossiers/mtac-ifbench-multi-turn-coding-instructions.md` — canonical: https://arxiv.org/abs/2609.14992v1
* **Ingest**: `arxiv:2609.15387` — `WebCraftBench: Evaluating Web Application Generation from a Software Testing Perspective dossier` at `/dossiers/webcraftbench-web-app-testing.md` — canonical: https://arxiv.org/abs/2609.15387v3
* **Ingest**: `arxiv:2609.23363` — `TicTacBench: Benchmarking Timing Closure Capabilities of Coding Agents dossier` at `/dossiers/tictacbench-timing-closure-coding-agents.md` — canonical: https://arxiv.org/abs/2609.23363v1
* **Ingest**: `arxiv:2609.05658` — `Robustness of LLM-Generated SystemVerilog Assertions to Semantics-Preserving RTL Transformations dossier` at `/dossiers/sva-robustness-rtl-transformations.md` — canonical: https://arxiv.org/abs/2609.05658v1
* **Ingest**: `arxiv:2609.07944` — `CausalVerify: An Execution-Grounded Benchmark for LLM Causal Inference Workflows dossier` at `/dossiers/causalverify-execution-grounded-causal-inference.md` — canonical: https://arxiv.org/abs/2609.07944v1
* **Ingest**: `arxiv:2609.21843` — `Supporting Industrial Test-Failure Analysis with LLM-Based Systems: An Experience Report dossier` at `/dossiers/westermo-llm-test-failure-analysis.md` — canonical: https://arxiv.org/abs/2609.21843v1
* **Ingest**: `arxiv:2609.19825` — `EviRCA: Decoupling Evidence Extraction from Reasoning for Microservice Root-Cause Analysis dossier` at `/dossiers/evirca-microservice-root-cause-analysis.md` — canonical: https://arxiv.org/abs/2609.19825v1
* **Ingest**: `arxiv:2609.11356` — `Taming Bitwise Behavior in GPU Kernels with Tensor Core: Black-Box Reconstruction, Compiler Enforcement, and Static Verification dossier` at `/dossiers/gpu-kernel-bitwise-behavior.md` — canonical: https://arxiv.org/abs/2609.11356v1
* **Ingest**: `url:www.anthropic.com/engineering/effective-context-engineering-for-ai-agents` — `Effective context engineering for AI agents dossier` at `/dossiers/effective-context-engineering-ai-agents.md` — canonical: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
* **Ingest**: `arxiv:2609.02737` — `Language Models Can Control Their Own Attention dossier` at `/dossiers/declarative-attention-model-controlled-context.md` — canonical: https://arxiv.org/abs/2609.02737v1
* **Ingest**: `arxiv:2609.12190` — `Retrieval-Augmented Generation for Scientific Code Understanding dossier` at `/dossiers/scientific-code-understanding-local-rag.md` — canonical: https://arxiv.org/abs/2609.12190v1
* **Ingest**: `arxiv:2609.15369` — `SlopShape: Identifying AI-Generated Commercial Web Content dossier` at `/dossiers/slopshape-structural-ai-commercial-content.md` — canonical: https://arxiv.org/abs/2609.15369v2
* **Archive**: Moved 99 source files (72 PDFs, 27 HTML captures) from `inbox/` into `/archive/`; SHA-256 verified byte-identical before and after each move; all 99 registered in `archive/index.md` under 2026-09-24.
* **Vault**: Created [bounded-hybrid-coding-workflow](/vault/bounded-hybrid-coding-workflow.md), [expectation-first-coding-contract](/vault/expectation-first-coding-contract.md), [calibrated-code-review-rules](/vault/calibrated-code-review-rules.md), [risk-tiered-review-and-approval](/vault/risk-tiered-review-and-approval.md), [repository-drift-garbage-collection](/vault/repository-drift-garbage-collection.md), [repository-relative-code-quality](/vault/repository-relative-code-quality.md), [reviewable-change-units](/vault/reviewable-change-units.md), [skill-artifact-quality-gates](/vault/skill-artifact-quality-gates.md), [skill-supply-chain-admission](/vault/skill-supply-chain-admission.md), [verifier-co-evolution](/vault/verifier-co-evolution.md), [safety-constrained-regression-test-selection](/vault/safety-constrained-regression-test-selection.md), [evidence-gated-static-warning-repair](/vault/evidence-gated-static-warning-repair.md), [cross-version-differential-oracles](/vault/cross-version-differential-oracles.md), [structural-origin-signals-versus-content-quality](/vault/structural-origin-signals-versus-content-quality.md)
* **Vault**: Updated [progressive-skill-disclosure](/vault/progressive-skill-disclosure.md), [evaluated-skill-routing](/vault/evaluated-skill-routing.md), [model-aware-harness-design](/vault/model-aware-harness-design.md), [artifact-gated-agent-evaluation](/vault/artifact-gated-agent-evaluation.md), [evolving-context-playbooks](/vault/evolving-context-playbooks.md), [cross-mechanism-execution-security-evaluation](/vault/cross-mechanism-execution-security-evaluation.md), [control-data-plane-separation-for-agents](/vault/control-data-plane-separation-for-agents.md), [provenance-conditioned-action-admission](/vault/provenance-conditioned-action-admission.md), [mcp-tool-supply-chain-assurance](/vault/mcp-tool-supply-chain-assurance.md), [executable-code-actions](/vault/executable-code-actions.md), [self-improvement-update-targets](/vault/self-improvement-update-targets.md), [budget-matched-harness-evolution-evaluation](/vault/budget-matched-harness-evolution-evaluation.md), [file-native-context-retrieval](/vault/file-native-context-retrieval.md), [machine-readable-agent-specifications](/vault/machine-readable-agent-specifications.md), [verification-centric-generated-review-evaluation](/vault/verification-centric-generated-review-evaluation.md), [feedback-grounded-context-adaptation](/vault/feedback-grounded-context-adaptation.md), [multi-agent-orchestration](/vault/multi-agent-orchestration.md), [scoped-guideline-memory](/vault/scoped-guideline-memory.md), [staged-evidence-grounded-judgment](/vault/staged-evidence-grounded-judgment.md), [intent-engineering-for-agents](/vault/intent-engineering-for-agents.md), [clarification-need-decision](/vault/clarification-need-decision.md), [normative-source-grounded-ai-assistance](/vault/normative-source-grounded-ai-assistance.md), [outcome-grounded-agent-evaluation](/vault/outcome-grounded-agent-evaluation.md), [cost-aware-inference-control](/vault/cost-aware-inference-control.md), [weakest-link-assurance-composition](/vault/weakest-link-assurance-composition.md), [capability-enforced-agent-execution](/vault/capability-enforced-agent-execution.md), [adaptive-runtime-agent-supervision](/vault/adaptive-runtime-agent-supervision.md), [structural-code-retrieval](/vault/structural-code-retrieval.md), [llm-evaluation-methods](/vault/llm-evaluation-methods.md), [score-gated-refinement](/vault/score-gated-refinement.md), [intended-path-benchmark-validation](/vault/intended-path-benchmark-validation.md), [paraphrase-adversarial-evaluator-validation](/vault/paraphrase-adversarial-evaluator-validation.md), [bounded-tool-observations](/vault/bounded-tool-observations.md), [reversible-query-conditioned-compaction](/vault/reversible-query-conditioned-compaction.md), [structured-execution-memory](/vault/structured-execution-memory.md), [hybrid-linear-global-attention](/vault/hybrid-linear-global-attention.md), [content-keyed-block-routing](/vault/content-keyed-block-routing.md), [rate-distortion-memory-compaction](/vault/rate-distortion-memory-compaction.md), [query-class-retrieval-routing](/vault/query-class-retrieval-routing.md), [harness-conditioned-retrieval-evaluation](/vault/harness-conditioned-retrieval-evaluation.md), [quality-versus-correctness-prompt-evaluation](/vault/quality-versus-correctness-prompt-evaluation.md), [llm-as-judge-with-anti-inflation](/vault/llm-as-judge-with-anti-inflation.md)
* **Vault**: Consolidated 26 subagent page proposals into 14 new pages; outcome-first specifications, verification-guided candidate expansion, and agent QA boundary coverage were folded into [intent-engineering-for-agents](/vault/intent-engineering-for-agents.md), [score-gated-refinement](/vault/score-gated-refinement.md), and [capability-enforced-agent-execution](/vault/capability-enforced-agent-execution.md) rather than created as near-duplicates.
* **Taxonomy**: Promoted `code-review` and `code-quality` (flagged independently by five and six of fourteen ingest workers; 30 new dossiers retagged, plus `code-review` on [verification-centric-generated-review-evaluation](/vault/verification-centric-generated-review-evaluation.md)). Added Watchlist candidates `skill-quality`, `software-testing`, and `ai-content-detection`.
* **Not ingested**: 13 inbox files matched already-registered keys and were left in `inbox/` untouched: `2302.00093.pdf`, `2307.03172.pdf`, `2510.04618.pdf`, `2512.15374.pdf`, `2602.05447.pdf`, `2605.15184.pdf`, `2607.05743.pdf`, `2608.27454.pdf`, `ssrn-5879722.pdf`, `anthropic-april-23-postmortem.html`, `chroma-context-rot.html`, `cursor-continually-improving-agent-harness.html`, `laxmena-skill-md-loader-specification.html`.
* **Pre-existing inconsistency (untouched)**: [hybrid-discovery-verification](/vault/hybrid-discovery-verification.md) has frontmatter that does not parse as YAML (unquoted colon in `description`).

## 2026-09-25 (Inbox: harness efficiency and persona selection)
* **Ingest**: `arxiv:2609.20519` — `SoL-Pi: Recursively Scaling Auto-Research Loops for Efficient Agent Harness dossier` at `/dossiers/sol-pi-efficient-agent-harness.md` — canonical: https://arxiv.org/abs/2609.20519v1
* **Ingest**: `url:alignment.anthropic.com/2026/psm` — `The Persona Selection Model: Why AI Assistants might Behave like Humans dossier` at `/dossiers/persona-selection-model.md` — canonical: https://alignment.anthropic.com/2026/psm/
* **Archive**: Moved the PDF to [/archive/sol-pi-efficient-agent-harness.pdf](/archive/sol-pi-efficient-agent-harness.pdf) and the HTML capture to [/archive/persona-selection-model.html](/archive/persona-selection-model.html), along with its 15 original-name sibling assets; all 17 files retained their SHA-256 checksums.
* **Vault**: Created [verified-log-evidence-receipts](/vault/verified-log-evidence-receipts.md).
* **Vault**: Created [implied-character-generalization](/vault/implied-character-generalization.md) from the already-ingested [Persona Selection Model dossier](/dossiers/persona-selection-model.md); no new source ingest.
* **Vault**: Updated [anchor-constrained-bias-mitigation](/vault/anchor-constrained-bias-mitigation.md) with bounded non-local propagation, context-dependent inoculation, partial trait-probe visibility, and off-task evaluation.

## 2026-09-28 (Durable-knowledge rule and operational-content cleanup)
* **Policy**: Added "What belongs here" to `README.md` and eligibility, dossier, vault, and verification clauses to `INGEST.md`: the knowledge base holds ideas, approaches, architectures, first-hand experience, and research findings; setup steps, command syntax, configuration keys, option inventories, and troubleshooting content are not admitted or restated, and vault bodies must be product-independent.
* **Audit**: All 258 dossiers reviewed against the rule. Paper-sourced dossiers were clean; 26 docs/cookbook/vendor-blog dossiers restated operational detail and were rewritten to keep the model (boundaries, defaults, escape hatches, admitted limitations, dated behavior, measured results) without the mechanics: agent-skills-format-specification, anthropic-agent-skills-platform-overview, anthropic-skill-authoring-best-practices, claude-code-skills-reference, openai-build-agent-skills, evaluating-agent-skills-output-quality, designing-refining-maintaining-agent-skills-perplexity, openai-codex-prompting-guide, openai-gpt-5-prompting-guide, claude-prompting-best-practices, function-calling, say-what-you-mean-structured-output, promptomatix-automatic-prompt-optimization, prompt-report, anthropic-claude-code-quality-postmortem, github-copilot-code-review-concepts, google-conductor-automated-reviews, cognition-devin-builds-devin, shopify-roast-structured-ai-workflows, bing-webmaster-tools-ai-performance, google-search-generative-ai-optimization-guide, vllm-ollama-performance-practicality, vllm-or-llamacpp-inference-engine-selection, axi-agent-experience-interface, personas-system-prompts-not-helpful, generative-engine-optimization-implementation-guide.
* **Removed**: `url:github.blog/changelog/2026-08-07-copilot-code-review-effort-levels-are-generally-available` — `/dossiers/github-copilot-review-effort-levels.md` deleted as a changelog with no durable model (setting renames, plan tiers, billing); its index entry and two vault Sources bullets removed; the raw capture `/archive/github-copilot-review-effort-levels.html` is retained and its manifest row annotated. The source key remains registered above and is not eligible for re-ingest.
* **Vault**: Moved vendor settings, flags, model identifiers, tier names, prices, and file conventions out of the bodies and into Sources bullets of [evaluated-skill-routing](/vault/evaluated-skill-routing.md), [progressive-skill-disclosure](/vault/progressive-skill-disclosure.md), [model-aware-harness-design](/vault/model-aware-harness-design.md), [cost-aware-inference-control](/vault/cost-aware-inference-control.md), [risk-tiered-review-and-approval](/vault/risk-tiered-review-and-approval.md), [normative-source-grounded-ai-assistance](/vault/normative-source-grounded-ai-assistance.md), [prompt-model-drift](/vault/prompt-model-drift.md), [reversible-query-conditioned-compaction](/vault/reversible-query-conditioned-compaction.md), [publisher-ai-usage-controls](/vault/publisher-ai-usage-controls.md), [file-native-context-retrieval](/vault/file-native-context-retrieval.md), [machine-readable-agent-specifications](/vault/machine-readable-agent-specifications.md), [source-adapter-decoupling](/vault/source-adapter-decoupling.md), [bounded-tool-observations](/vault/bounded-tool-observations.md), [skill-supply-chain-admission](/vault/skill-supply-chain-admission.md), [calibrated-code-review-rules](/vault/calibrated-code-review-rules.md).
* **Reclassified**: Three vault notes with no backing dossier were product- and version-specific research records rather than product-independent syntheses. Moved [hook-driven-tmux-agent-transport](/dossiers/hook-driven-tmux-agent-transport.md) and [subscription-billed-programmatic-cli-agent-access](/dossiers/subscription-billed-programmatic-cli-agent-access.md) from `vault/` to `dossiers/` as `Study Note` local research records (content unchanged apart from type, a provenance line, and bundle-relative cross-links). Moved the original `vault/cli-agent-hook-event-surfaces.md` to [cli-agent-hook-event-surfaces-research](/dossiers/cli-agent-hook-event-surfaces-research.md) on the same terms, and rewrote [cli-agent-hook-event-surfaces](/vault/cli-agent-hook-event-surfaces.md) as a product-independent synthesis ("Controller Observability and Control Gaps in Interactive Agent CLIs") citing the three records as evidence. `index.md` updated accordingly; no source keys involved (local research, never registered as ingests).

## 2026-09-28 (Agent sandboxing, isolation, and orchestration batch — 101 sources)
* **Ingest**: `arxiv:2607.12406` — `Isolation as a First-Class Principle for LLM-Agent System Safety: Concepts, Taxonomy, Challenges and Future Directions dossier` at `/dossiers/agent-isolation-boundary-taxonomy.md` — canonical: https://arxiv.org/abs/2607.12406v2
* **Ingest**: `arxiv:2609.01035` — `Spawn Freely, Act Sparingly: Progressive Risk Vesting for Recursive LLM-Agent Trees dossier` at `/dossiers/progressive-risk-vesting-agent-trees.md` — canonical: https://arxiv.org/abs/2609.01035v1
* **Ingest**: `arxiv:2608.15888` — `Bounded Agents: Delegation Security for Multi-Agent AI Systems dossier` at `/dossiers/bounded-agents-delegation-security.md` — canonical: https://arxiv.org/abs/2608.15888v1
* **Ingest**: `arxiv:2609.00267` — `Delegation Without Trust: An Empirical Gap Analysis of Identity, Authorization, and Runtime Governance in Multi-Agent LLM Systems dossier` at `/dossiers/delegation-without-trust-authorization-broker.md` — canonical: https://arxiv.org/abs/2609.00267v1
* **Ingest**: `arxiv:2601.11893` — `Taming Various Privilege Escalation in LLM-Based Agent Systems: A Mandatory Access Control Framework dossier` at `/dossiers/seagent-mandatory-access-control.md` — canonical: https://arxiv.org/abs/2601.11893v1
* **Ingest**: `arxiv:2602.13477` — `OMNI-LEAK: Orchestrator Multi-Agent Network Induced Data Leakage dossier` at `/dossiers/omni-leak-orchestrator-data-leakage.md` — canonical: https://arxiv.org/abs/2602.13477v2
* **Ingest**: `arxiv:2503.12188` — `Multi-Agent Systems Execute Arbitrary Malicious Code dossier` at `/dossiers/multi-agent-control-flow-hijacking.md` — canonical: https://arxiv.org/abs/2503.12188v2
* **Ingest**: `arxiv:2410.07283` — `Prompt Infection: LLM-to-LLM Prompt Injection within Multi-Agent Systems dossier` at `/dossiers/prompt-infection-multi-agent-systems.md` — canonical: https://arxiv.org/abs/2410.07283v1
* **Ingest**: `url:learn.chatgpt.com/docs/sandboxing` — `Sandbox — Codex dossier` at `/dossiers/openai-codex-sandbox-boundaries.md` — canonical: https://learn.chatgpt.com/docs/sandboxing
* **Ingest**: `url:learn.chatgpt.com/docs/agent-approvals-security` — `Agent approvals & security — Codex dossier` at `/dossiers/openai-codex-approvals-security.md` — canonical: https://learn.chatgpt.com/docs/agent-approvals-security
* **Ingest**: `url:learn.chatgpt.com/docs/environments/cloud-environment` — `Cloud environment — Codex dossier` at `/dossiers/openai-codex-cloud-execution-phases.md` — canonical: https://learn.chatgpt.com/docs/environments/cloud-environment
* **Ingest**: `url:openai.com/index/building-codex-windows-sandbox` — `Building a safe, effective sandbox to enable Codex on Windows dossier` at `/dossiers/openai-windows-codex-sandbox-design.md` — canonical: https://openai.com/index/building-codex-windows-sandbox/
* **Ingest**: `url:openai.com/index/open-source-codex-orchestration-symphony` — `An open-source spec for Codex orchestration: Symphony dossier` at `/dossiers/openai-symphony-orchestration.md` — canonical: https://openai.com/index/open-source-codex-orchestration-symphony/
* **Ingest**: `url:github.com/openai/symphony/blob/main/SPEC.md` — `Symphony Service Specification dossier` at `/dossiers/openai-symphony-service-specification.md` — canonical: https://github.com/openai/symphony/blob/main/SPEC.md
* **Ingest**: `url:agent-safehouse.dev/docs/agent-investigations/codex` — `OpenAI Codex CLI — Sandbox Analysis Report dossier` at `/dossiers/agent-safehouse-codex-sandbox-audit.md` — canonical: https://agent-safehouse.dev/docs/agent-investigations/codex
* **Ingest**: `url:github.com/NVIDIA/OpenShell/blob/main/architecture/sandbox.md` — `OpenShell Sandbox Architecture dossier` at `/dossiers/nvidia-openshell-sandbox-architecture.md` — canonical: https://github.com/NVIDIA/OpenShell/blob/main/architecture/sandbox.md
* **Ingest**: `url:github.com/NVIDIA/OpenShell/blob/main/architecture/security-policy.md` — `OpenShell Security Policy Architecture dossier` at `/dossiers/nvidia-openshell-security-policy.md` — canonical: https://github.com/NVIDIA/OpenShell/blob/main/architecture/security-policy.md
* **Ingest**: `url:github.com/NVIDIA/OpenShell/blob/main/architecture/sandbox-limits.md` — `OpenShell Sandbox Limits dossier` at `/dossiers/nvidia-openshell-sandbox-limits.md` — canonical: https://github.com/NVIDIA/OpenShell/blob/main/architecture/sandbox-limits.md
* **Ingest**: `url:docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/architecture` — `NVIDIA NemoClaw Architecture dossier` at `/dossiers/nvidia-nemoclaw-architecture.md` — canonical: https://docs.nvidia.com/nemoclaw/user-guide/openclaw/reference/architecture
* **Ingest**: `url:developer.nvidia.com/blog/add-runtime-controls-to-ai-agents-with-nvidia-openshell/` — `Add Runtime Controls to AI Agents with NVIDIA OpenShell dossier` at `/dossiers/nvidia-openshell-runtime-controls.md` — canonical: https://developer.nvidia.com/blog/add-runtime-controls-to-ai-agents-with-nvidia-openshell/
* **Ingest**: `url:www.lasso.security/blog/sandboxed-ai-agents-attack-surface` — `Thinking Outside The Box — Exfiltrating OpenClaw Data from NVIDIA's Sandbox dossier` at `/dossiers/lasso-nemoclaw-authorized-egress-exfiltration.md` — canonical: https://www.lasso.security/blog/sandboxed-ai-agents-attack-surface
* **Ingest**: `url:github.com/e2b-dev/runtime/blob/main/docs/ARCHITECTURE.md` — `E2B Infrastructure Architecture dossier` at `/dossiers/e2b-runtime-architecture.md` — canonical: https://github.com/e2b-dev/runtime/blob/main/docs/ARCHITECTURE.md
* **Ingest**: `url:github.com/firecracker-microvm/firecracker/blob/main/docs/design.md` — `Firecracker Design dossier` at `/dossiers/firecracker-design.md` — canonical: https://github.com/firecracker-microvm/firecracker/blob/main/docs/design.md
* **Ingest**: `url:github.com/kata-containers/kata-containers/blob/main/docs/design/architecture/README.md` — `Kata Containers Architecture dossier` at `/dossiers/kata-containers-architecture.md` — canonical: https://github.com/kata-containers/kata-containers/blob/main/docs/design/architecture/README.md
* **Ingest**: `url:gvisor.dev/docs/architecture_guide/intro/` — `Introduction to gVisor Security dossier` at `/dossiers/gvisor-security-architecture-intro.md` — canonical: https://gvisor.dev/docs/architecture_guide/intro/
* **Ingest**: `url:gvisor.dev/blog/2026/04/15/magi-multi-agent-gvisor-isolation/` — `Multi-Agent gVisor Isolation (MAGI) dossier` at `/dossiers/gvisor-magi-multi-agent-isolation.md` — canonical: https://gvisor.dev/blog/2026/04/15/magi-multi-agent-gvisor-isolation/
* **Ingest**: `url:www.docker.com/blog/why-microvms-the-architecture-behind-docker-sandboxes/` — `Why MicroVMs: The Architecture Behind Docker Sandboxes dossier` at `/dossiers/docker-why-microvms-architecture.md` — canonical: https://www.docker.com/blog/why-microvms-the-architecture-behind-docker-sandboxes/
* **Ingest**: `doi:10.59350/70ynk-ves20` — `Under the hood with Apple's new Containerization framework dossier` at `/dossiers/anil-apple-containerization-under-the-hood.md` — canonical: https://anil.recoil.org/notes/apple-containerisation
* **Ingest**: `url:blog.cloudflare.com/dynamic-workers/` — `Sandboxing AI agents, 100x faster dossier` at `/dossiers/cloudflare-dynamic-workers-sandboxing.md` — canonical: https://blog.cloudflare.com/dynamic-workers/
* **Ingest**: `url:blog.cloudflare.com/code-mode/` — `Code Mode: the better way to use MCP dossier` at `/dossiers/cloudflare-code-mode-mcp.md` — canonical: https://blog.cloudflare.com/code-mode/
* **Ingest**: `url:blog.cloudflare.com/sandbox-auth/` — `Dynamic, identity-aware, and secure Sandbox auth dossier` at `/dossiers/cloudflare-sandbox-auth-outbound-workers.md` — canonical: https://blog.cloudflare.com/sandbox-auth/
* **Ingest**: `url:blog.cloudflare.com/mitigating-spectre-and-other-security-threats-the-cloudflare-workers-security-model/` — `Mitigating Spectre and Other Security Threats: The Cloudflare Workers Security Model dossier` at `/dossiers/cloudflare-workers-security-model-spectre.md` — canonical: https://blog.cloudflare.com/mitigating-spectre-and-other-security-threats-the-cloudflare-workers-security-model/
* **Ingest**: `url:vercel.com/blog/a-sandbox-without-a-network-boundary-is-only-half-a-sandbox` — `A sandbox without a network boundary is only half a sandbox dossier` at `/dossiers/vercel-sandbox-network-boundary.md` — canonical: https://vercel.com/blog/a-sandbox-without-a-network-boundary-is-only-half-a-sandbox
* **Ingest**: `url:vercel.com/blog/one-million-dollar-hacker-challenge-for-vercel-sandbox` — `$1 million hacker challenge for Vercel Sandbox dossier` at `/dossiers/vercel-sandbox-hacker-challenge-threat-model.md` — canonical: https://vercel.com/blog/one-million-dollar-hacker-challenge-for-vercel-sandbox
* **Ingest**: `url:www.langchain.com/blog/how-auth-proxy-secures-network-access-for-langsmith-agent-sandboxes` — `How Auth Proxy secures network access for LangSmith agent sandboxes dossier` at `/dossiers/langchain-langsmith-sandbox-auth-proxy.md` — canonical: https://www.langchain.com/blog/how-auth-proxy-secures-network-access-for-langsmith-agent-sandboxes
* **Ingest**: `url:ammar.io/blog/httpjail` — `Fine-grained HTTP filtering for Claude Code dossier` at `/dossiers/ammar-httpjail-claude-code.md` — canonical: https://ammar.io/blog/httpjail
* **Ingest**: `url:www.pillar.security/blog/the-week-of-sandbox-escapes` — `The Week of Sandbox Escapes dossier` at `/dossiers/pillar-week-of-sandbox-escapes.md` — canonical: https://www.pillar.security/blog/the-week-of-sandbox-escapes
* **Ingest**: `url:www.pillar.security/blog/one-docker-socket-to-rule-them-all-escaping-codex-cursor-and-gemini-clis-sandboxes` — `One Docker socket to rule them all: escaping Codex, Cursor, and Gemini CLI's sandboxes dossier` at `/dossiers/pillar-docker-socket-sandbox-escape.md` — canonical: https://www.pillar.security/blog/one-docker-socket-to-rule-them-all-escaping-codex-cursor-and-gemini-clis-sandboxes
* **Ingest**: `url:accomplish.ai/blog/beltdown-escaping-the-claude-code-sandbox` — `Beltdown: Escaping the Claude Code sandbox dossier` at `/dossiers/accomplish-beltdown-claude-code-sandbox-escape.md` — canonical: https://accomplish.ai/blog/beltdown-escaping-the-claude-code-sandbox/
* **Ingest**: `url:accomplish.ai/blog/beltdown2-escaping-the-cursor-cli-sandbox` — `Beltdown2: Escaping the Cursor CLI sandbox dossier` at `/dossiers/accomplish-beltdown2-cursor-cli-sandbox-escape.md` — canonical: https://accomplish.ai/blog/beltdown2-escaping-the-cursor-cli-sandbox/
* **Ingest**: `url:accomplish.ai/blog/sharedroot-escaping-claude-cowork-sandbox` — `SharedRoot: Escaping the Claude Cowork sandbox dossier` at `/dossiers/accomplish-sharedroot-claude-cowork-escape.md` — canonical: https://accomplish.ai/blog/sharedroot-escaping-claude-cowork-sandbox/
* **Ingest**: `url:github.com/Metnew/write-ups/blob/main/claude-code-worktree-sandbox-escape/README.md` — `Claude Code: unsandboxed code execution from prompt injection via .git worktree confusion dossier` at `/dossiers/metnew-claude-code-worktree-sandbox-escape.md` — canonical: https://github.com/Metnew/write-ups/blob/main/claude-code-worktree-sandbox-escape/README.md
* **Ingest**: `url:codeant.ai/blogs/claude-code-macos-sandbox-escape` — `Claude Code macOS Sandbox Escape via Literal Path and Glob Confusion dossier` at `/dossiers/codeant-claude-code-macos-glob-sandbox-escape.md` — canonical: https://codeant.ai/blogs/claude-code-macos-sandbox-escape
* **Ingest**: `url:oddguan.com/blog/second-time-same-sandbox-anthropic-claude-code-network-allowlist-bypass-data-exfiltration` — `Second Time, Same Sandbox: Another Anthropic Claude Code Network Sandbox Bypass Enables Data Exfiltration dossier` at `/dossiers/oddguan-claude-code-network-allowlist-bypass.md` — canonical: https://oddguan.com/blog/second-time-same-sandbox-anthropic-claude-code-network-allowlist-bypass-data-exfiltration/
* **Ingest**: `url:embracethered.com/blog/posts/2025/cross-agent-privilege-escalation-agents-that-free-each-other/` — `Cross-Agent Privilege Escalation: When Agents Free Each Other dossier` at `/dossiers/cross-agent-configuration-privilege-escalation.md` — canonical: https://embracethered.com/blog/posts/2025/cross-agent-privilege-escalation-agents-that-free-each-other/
* **Ingest**: `url:embracethered.com/blog/posts/2025/claude-code-exfiltration-via-dns-requests/` — `Claude Code: Data Exfiltration with DNS (CVE-2025-55284) dossier` at `/dossiers/claude-code-dns-exfiltration-cve-2025-55284.md` — canonical: https://embracethered.com/blog/posts/2025/claude-code-exfiltration-via-dns-requests/
* **Ingest**: `url:ona.com/stories/how-claude-code-escapes-its-own-denylist-and-sandbox` — `How Claude Code escapes its own denylist and sandbox dossier` at `/dossiers/ona-claude-code-denylist-sandbox-bypasses.md` — canonical: https://ona.com/stories/how-claude-code-escapes-its-own-denylist-and-sandbox
* **Ingest**: `url:blog.trailofbits.com/2026/08/26/vms-wont-contain-cyber-capable-agents/` — `VMs won't contain cyber-capable agents dossier` at `/dossiers/trail-of-bits-vm-escape-cyber-agent.md` — canonical: https://blog.trailofbits.com/2026/08/26/vms-wont-contain-cyber-capable-agents/
* **Ingest**: `url:blog.trailofbits.com/2025/10/22/prompt-injection-to-rce-in-ai-agents/` — `Prompt injection to RCE in AI agents dossier` at `/dossiers/trail-of-bits-argument-injection-rce.md` — canonical: https://blog.trailofbits.com/2025/10/22/prompt-injection-to-rce-in-ai-agents/
* **Ingest**: `url:huggingface.co/blog/lukehinds/nono-agent-sandbox` — `Introducing nono: A Secure Sandbox for AI Agents dossier` at `/dossiers/nono-kernel-enforced-agent-sandbox.md` — canonical: https://huggingface.co/blog/lukehinds/nono-agent-sandbox
* **Ingest**: `sha256:3b587bf0cfa8849a06f58912ef3306ca1f567ee463754b9093356010e90dfd75` — `An Introduction to AI Coding Agent Security dossier` at `/dossiers/ncc-group-coding-agent-security-boundaries.md` — canonical: /archive/ncc-group-coding-agent-security-boundaries.pdf
* **Ingest**: `url:ghuntley.com/ralph/` — `Ralph Wiggum as a "software engineer" dossier` at `/dossiers/ralph-wiggum-loop.md` — canonical: https://ghuntley.com/ralph/
* **Ingest**: `url:mariozechner.at/posts/2025-11-30-pi-coding-agent/` — `What I learned building an opinionated and minimal coding agent dossier` at `/dossiers/pi-minimal-coding-agent.md` — canonical: https://mariozechner.at/posts/2025-11-30-pi-coding-agent/
* **Ingest**: `url:github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/security.md` — `Run Pi safely dossier` at `/dossiers/pi-coding-agent-security.md` — canonical: https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/security.md
* **Ingest**: `url:docs.openclaw.ai/gateway/sandbox-vs-tool-policy-vs-elevated` — `Sandbox vs tool policy vs elevated dossier` at `/dossiers/openclaw-sandbox-tool-policy-elevated.md` — canonical: https://docs.openclaw.ai/gateway/sandbox-vs-tool-policy-vs-elevated
* **Ingest**: `url:www.langchain.com/blog/organizing-context-in-a-multi-agent-harness` — `Organizing Context in a Multi-Agent Harness dossier` at `/dossiers/langchain-subagent-context-modes.md` — canonical: https://www.langchain.com/blog/organizing-context-in-a-multi-agent-harness
* **Ingest**: `url:huggingface.co/docs/smolagents/tutorials/secure_code_execution` — `Secure code execution dossier` at `/dossiers/smolagents-secure-code-execution.md` — canonical: https://huggingface.co/docs/smolagents/tutorials/secure_code_execution
* **Ingest**: `url:modelcontextprotocol.io/docs/draft/tutorials/security/security_best_practices` — `MCP Security Best Practices dossier` at `/dossiers/mcp-security-best-practices.md` — canonical: https://modelcontextprotocol.io/docs/draft/tutorials/security/security_best_practices
* **Ingest**: `url:composio.dev/blog/two-questions-every-security-review-asks-us` — `Two questions every security review asks us dossier` at `/dossiers/composio-security-review.md` — canonical: https://composio.dev/blog/two-questions-every-security-review-asks-us
* **Ingest**: `url:adk.dev/safety` — `Safety and Security for AI Agents dossier` at `/dossiers/google-adk-agent-safety.md` — canonical: https://adk.dev/safety/
* **Ingest**: `url:github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md` — `Oh My Pi Tool Approval Model dossier` at `/dossiers/omp-tool-approval-model.md` — canonical: https://github.com/can1357/oh-my-pi/blob/main/docs/approval-mode.md
* **Ingest**: `url:github.com/can1357/oh-my-pi/blob/main/docs/auth-broker-gateway.md` — `Oh My Pi Credential Broker and Gateway Boundary dossier` at `/dossiers/omp-credential-broker-boundary.md` — canonical: https://github.com/can1357/oh-my-pi/blob/main/docs/auth-broker-gateway.md
* **Ingest**: `url:github.com/can1357/oh-my-pi/blob/main/docs/secrets.md` — `Oh My Pi Secret Obfuscation Model dossier` at `/dossiers/omp-secret-obfuscation.md` — canonical: https://github.com/can1357/oh-my-pi/blob/main/docs/secrets.md
* **Ingest**: `arxiv:2602.07398` — `AgentSys: Secure and Dynamic LLM Agents through Explicit Hierarchical Memory Management dossier` at `/dossiers/agentsys-hierarchical-memory.md` — canonical: https://arxiv.org/abs/2602.07398v1
* **Ingest**: `arxiv:2604.23459` — `Architecture Matters for Multi-Agent Security dossier` at `/dossiers/multi-agent-architecture-security.md` — canonical: https://arxiv.org/abs/2604.23459v1
* **Ingest**: `arxiv:2603.24775` — `AIP: Agent Identity Protocol for Verifiable Delegation Across MCP and A2A dossier` at `/dossiers/agent-identity-protocol-aip.md` — canonical: https://arxiv.org/abs/2603.24775v1
* **Ingest**: `arxiv:2609.00006` — `Harness Engineering: Anatomy, Architecture, and Evolution of Coding Agents dossier` at `/dossiers/coding-agent-harness-source-study.md` — canonical: https://arxiv.org/abs/2609.00006v1
* **Ingest**: `arxiv:2604.14228` — `Dive into Claude Code: The Design Space of Today's and Future AI Agent Systems dossier` at `/dossiers/dive-into-claude-code.md` — canonical: https://arxiv.org/abs/2604.14228v2
* **Ingest**: `arxiv:2511.03690` — `The OpenHands Software Agent SDK: A Composable and Extensible Foundation for Production Agents dossier` at `/dossiers/openhands-software-agent-sdk.md` — canonical: https://arxiv.org/abs/2511.03690v2
* **Ingest**: `arxiv:2607.25890` — `Distributing Security Controls Through Harness Engineering dossier` at `/dossiers/shard-distributed-harness-security.md` — canonical: https://arxiv.org/abs/2607.25890v1
* **Ingest**: `url:www.anthropic.com/engineering/how-we-contain-claude` — `How we contain Claude across products dossier` at `/dossiers/anthropic-agent-containment.md` — canonical: https://www.anthropic.com/engineering/how-we-contain-claude
* **Ingest**: `url:www.anthropic.com/engineering/claude-code-sandboxing` — `Beyond permission prompts: making Claude Code more secure and autonomous dossier` at `/dossiers/claude-code-sandboxing-announcement.md` — canonical: https://www.anthropic.com/engineering/claude-code-sandboxing
* **Ingest**: `url:www.anthropic.com/engineering/multi-agent-research-system` — `How we built our multi-agent research system dossier` at `/dossiers/anthropic-multi-agent-research.md` — canonical: https://www.anthropic.com/engineering/multi-agent-research-system
* **Ingest**: `url:code.claude.com/docs/en/sandboxing` — `Configure the sandboxed Bash tool dossier` at `/dossiers/claude-code-bash-sandbox-model.md` — canonical: https://code.claude.com/docs/en/sandboxing
* **Ingest**: `url:code.claude.com/docs/en/sandbox-environments` — `Sandbox environments dossier` at `/dossiers/claude-code-isolation-environments.md` — canonical: https://code.claude.com/docs/en/sandbox-environments
* **Ingest**: `url:code.claude.com/docs/en/cloud-environments` — `Cloud environments dossier` at `/dossiers/claude-code-cloud-environment-model.md` — canonical: https://code.claude.com/docs/en/cloud-environments
* **Ingest**: `url:code.claude.com/docs/en/agent-teams` — `Orchestrate teams of Claude Code sessions dossier` at `/dossiers/claude-code-agent-teams-model.md` — canonical: https://code.claude.com/docs/en/agent-teams
* **Ingest**: `url:github.com/anthropic-experimental/sandbox-runtime/blob/main/README.md` — `Anthropic Sandbox Runtime dossier` at `/dossiers/anthropic-sandbox-runtime.md` — canonical: https://github.com/anthropic-experimental/sandbox-runtime/blob/main/README.md
* **Ingest**: `url:replit.com/blog/inside-replits-snapshot-engine` — `Inside Replit’s Snapshot Engine: The Tech Making AI Agents Safe dossier` at `/dossiers/replit-snapshot-engine.md` — canonical: https://replit.com/blog/inside-replits-snapshot-engine
* **Ingest**: `url:replit.com/blog/defense-in-depth-how-replit-secures-every-layer-of-the-vibe-coding-stack` — `Defense in Depth: How Replit Secures Every Layer of the Vibe Coding Stack dossier` at `/dossiers/replit-defense-in-depth-vibe-coding-stack.md` — canonical: https://replit.com/blog/defense-in-depth-how-replit-secures-every-layer-of-the-vibe-coding-stack
* **Ingest**: `url:ona.com/stories/we-are-leaving-kubernetes` — `We’re leaving Kubernetes dossier` at `/dossiers/ona-leaving-kubernetes.md` — canonical: https://ona.com/stories/we-are-leaving-kubernetes
* **Ingest**: `url:coder.com/docs/ai-coder/agents/architecture` — `Coder Agents: Architecture dossier` at `/dossiers/coder-agents-architecture.md` — canonical: https://coder.com/docs/ai-coder/agents/architecture
* **Ingest**: `url:builders.ramp.com/post/why-we-built-our-background-agent` — `Why we built our background agent: Inspect dossier` at `/dossiers/ramp-inspect-background-agent.md` — canonical: https://builders.ramp.com/post/why-we-built-our-background-agent
* **Ingest**: `url:factory.com/news/missions-architecture` — `How Missions Work dossier` at `/dossiers/factory-missions-architecture.md` — canonical: https://factory.com/news/missions-architecture
* **Ingest**: `url:www.uber.com/us/en/blog/solving-the-agent-identity-crisis` — `Solving the Identity Crisis for AI Agents dossier` at `/dossiers/uber-agent-identity.md` — canonical: https://www.uber.com/us/en/blog/solving-the-agent-identity-crisis/
* **Ingest**: `url:github.com/gastownhall/gastown/blob/main/README.md` — `Gas Town — Multi-Agent Workspace Coordination dossier` at `/dossiers/gastown-coordination-model.md` — canonical: https://github.com/gastownhall/gastown/blob/main/README.md
* **Ingest**: `url:github.com/gastownhall/gastown/blob/main/docs/design/architecture.md` — `Gas Town Architecture — Two-Level Work Ledger and Merge Admission dossier` at `/dossiers/gastown-two-level-architecture.md` — canonical: https://github.com/gastownhall/gastown/blob/main/docs/design/architecture.md
* **Ingest**: `url:github.com/paperclipai/paperclip/blob/master/doc/execution-semantics.md` — `Paperclip Execution Semantics — Ownership and Durable Liveness dossier` at `/dossiers/paperclip-execution-liveness.md` — canonical: https://github.com/paperclipai/paperclip/blob/master/doc/execution-semantics.md
* **Ingest**: `url:github.com/paperclipai/paperclip/blob/master/doc/SPEC.md` — `Paperclip Specification — Board-Governed Agent Control Plane dossier` at `/dossiers/paperclip-control-plane-spec.md` — canonical: https://github.com/paperclipai/paperclip/blob/master/doc/SPEC.md
* **Ingest**: `url:github.com/paperclipai/paperclip/blob/master/doc/LOW-TRUST-PRESETS.md` — `Paperclip Low-Trust Presets — Containing Review Work dossier` at `/dossiers/paperclip-low-trust-review.md` — canonical: https://github.com/paperclipai/paperclip/blob/master/doc/LOW-TRUST-PRESETS.md
* **Ingest**: `url:github.com/paperclipai/paperclip/blob/master/doc/MCP-ACCESS-GOVERNANCE.md` — `Paperclip MCP Access Governance — Discovery Versus Call Authorization dossier` at `/dossiers/paperclip-mcp-gateway-governance.md` — canonical: https://github.com/paperclipai/paperclip/blob/master/doc/MCP-ACCESS-GOVERNANCE.md
* **Ingest**: `url:hermes-agent.nousresearch.com/docs/user-guide/features/delegation` — `Hermes Agent — Subagent Delegation and Ownership Boundaries dossier` at `/dossiers/hermes-subagent-delegation.md` — canonical: https://hermes-agent.nousresearch.com/docs/user-guide/features/delegation
* **Ingest**: `url:www.anthropic.com/engineering/code-execution-with-mcp` — `Code execution with MCP: Building more efficient agents dossier` at `/dossiers/anthropic-code-execution-mcp.md` — canonical: https://www.anthropic.com/engineering/code-execution-with-mcp
* **Ingest**: `url:engineering.atspotify.com/2025/12/feedback-loops-background-coding-agents-part-3` — `Background Coding Agents: Predictable Results Through Strong Feedback Loops (Honk, Part 3) dossier` at `/dossiers/spotify-honk-feedback-loops.md` — canonical: https://engineering.atspotify.com/2025/12/feedback-loops-background-coding-agents-part-3
* **Ingest**: `arxiv:1608.04303` — `SandBlaster: Reversing the Apple Sandbox dossier` at `/dossiers/sandblaster-apple-sandbox-reversing.md` — canonical: https://arxiv.org/abs/1608.04303v1
* **Ingest**: `url:www.anthropic.com/engineering/building-c-compiler` — `Building a C compiler with a team of parallel Claudes dossier` at `/dossiers/parallel-claudes-c-compiler.md` — canonical: https://www.anthropic.com/engineering/building-c-compiler
* **Ingest**: `url:cursor.com/blog/agent-sandboxing` — `Implementing a secure sandbox for local agents dossier` at `/dossiers/cursor-local-agent-sandboxing.md` — canonical: https://cursor.com/blog/agent-sandboxing
* **Ingest**: `url:github.blog/ai-and-ml/generative-ai/under-the-hood-security-architecture-of-github-agentic-workflows` — `Under the hood: Security architecture of GitHub Agentic Workflows dossier` at `/dossiers/github-agentic-workflows-security.md` — canonical: https://github.blog/ai-and-ml/generative-ai/under-the-hood-security-architecture-of-github-agentic-workflows/
* **Ingest**: `url:cursor.com/blog/cloud-agent-lessons` — `What we’ve learned building cloud agents dossier` at `/dossiers/cursor-cloud-agent-lessons.md` — canonical: https://cursor.com/blog/cloud-agent-lessons
* **Ingest**: `url:www.microsoft.com/en-us/research/articles/magentic-one-a-generalist-multi-agent-system-for-solving-complex-tasks` — `Magentic-One — Ledger-Based Generalist Orchestration dossier` at `/dossiers/magentic-one-orchestration.md` — canonical: https://www.microsoft.com/en-us/research/articles/magentic-one-a-generalist-multi-agent-system-for-solving-complex-tasks/
* **Ingest**: `url:www.microsoft.com/en-us/research/blog/magentic-ui-an-experimental-human-centered-web-agent` — `Magentic-UI — Human-Centered Web Agent Control dossier` at `/dossiers/magentic-ui-human-centered-control.md` — canonical: https://www.microsoft.com/en-us/research/blog/magentic-ui-an-experimental-human-centered-web-agent/
* **Archive**: Moved all 101 inbox sources to `/archive/` under their dossier slugs (17 PDF, 20 markdown, 64 HTML captures); SHA-256 recorded before and after each move by the ingesting worker. Manifest rows appended to `/archive/index.md`.
* **Vault**: Created [partial-scope-tool-sandboxing](/vault/partial-scope-tool-sandboxing.md), [writable-artifact-authority-handoff](/vault/writable-artifact-authority-handoff.md), [privileged-local-daemon-sandbox-bypass](/vault/privileged-local-daemon-sandbox-bypass.md), [destination-allowlist-as-capability-grant](/vault/destination-allowlist-as-capability-grant.md), [policy-compilation-fidelity](/vault/policy-compilation-fidelity.md), [tool-identity-versus-effect-authority](/vault/tool-identity-versus-effect-authority.md), [assume-guest-compromise-host-exposure](/vault/assume-guest-compromise-host-exposure.md), [egress-broker-credential-injection](/vault/egress-broker-credential-injection.md), [provider-boundary-secret-substitution](/vault/provider-boundary-secret-substitution.md), [approval-bound-to-canonical-effect](/vault/approval-bound-to-canonical-effect.md), [session-composition-authorization](/vault/session-composition-authorization.md), [attenuated-delegation-authority](/vault/attenuated-delegation-authority.md), [delegated-oauth-proxy-hazards](/vault/delegated-oauth-proxy-hazards.md), [peer-agent-message-trust](/vault/peer-agent-message-trust.md), [subagent-context-inheritance-modes](/vault/subagent-context-inheritance-modes.md), [agent-work-liveness-invariants](/vault/agent-work-liveness-invariants.md), [interruption-recovery-without-duplicate-effects](/vault/interruption-recovery-without-duplicate-effects.md), [ledger-centered-agent-control-plane](/vault/ledger-centered-agent-control-plane.md), [oracle-guided-failure-decomposition](/vault/oracle-guided-failure-decomposition.md), [staged-effect-admission](/vault/staged-effect-admission.md).
* **Vault**: Updated [kernel-first-split-enforcement](/vault/kernel-first-split-enforcement.md), [skill-supply-chain-admission](/vault/skill-supply-chain-admission.md), [downstream-security-patch-propagation](/vault/downstream-security-patch-propagation.md), [runtime-activated-application-sandboxing](/vault/runtime-activated-application-sandboxing.md), [deployment-conditioned-sandbox-security](/vault/deployment-conditioned-sandbox-security.md), [cross-mechanism-execution-security-evaluation](/vault/cross-mechanism-execution-security-evaluation.md), [risk-tiered-review-and-approval](/vault/risk-tiered-review-and-approval.md), [capability-enforced-agent-execution](/vault/capability-enforced-agent-execution.md), [authorization-provenance-graph-alignment](/vault/authorization-provenance-graph-alignment.md), [provenance-conditioned-action-admission](/vault/provenance-conditioned-action-admission.md), [security-aware-replanning](/vault/security-aware-replanning.md), [assume-compromise-boundary-testing](/vault/assume-compromise-boundary-testing.md), [privileged-quarantined-agent-split](/vault/privileged-quarantined-agent-split.md), [structured-agent-communication-contracts](/vault/structured-agent-communication-contracts.md), [multi-agent-orchestration](/vault/multi-agent-orchestration.md), [control-data-plane-separation-for-agents](/vault/control-data-plane-separation-for-agents.md), [bounded-model-security-adjudication](/vault/bounded-model-security-adjudication.md), [mediated-agent-execution-isolation](/vault/mediated-agent-execution-isolation.md), [layered-concurrent-agent-isolation](/vault/layered-concurrent-agent-isolation.md), [memory-lifecycle-governance](/vault/memory-lifecycle-governance.md), [structured-execution-memory](/vault/structured-execution-memory.md), [machine-readable-agent-specifications](/vault/machine-readable-agent-specifications.md), [adaptive-runtime-agent-supervision](/vault/adaptive-runtime-agent-supervision.md), [expectation-first-coding-contract](/vault/expectation-first-coding-contract.md), [verifier-co-evolution](/vault/verifier-co-evolution.md), [artifact-gated-agent-evaluation](/vault/artifact-gated-agent-evaluation.md), [bounded-hybrid-coding-workflow](/vault/bounded-hybrid-coding-workflow.md), [observed-effect-divergence-rollback](/vault/observed-effect-divergence-rollback.md), [executable-code-actions](/vault/executable-code-actions.md), [file-native-context-retrieval](/vault/file-native-context-retrieval.md), [model-aware-harness-design](/vault/model-aware-harness-design.md), [source-adapter-decoupling](/vault/source-adapter-decoupling.md), [agent-ergonomic-interface-design](/vault/agent-ergonomic-interface-design.md), [action-observation-fusion](/vault/action-observation-fusion.md).
* **Process**: Thirteen thematic ingest workers wrote dossiers and proposed 52 vault creations and 32 update targets; the coordinator adjudicated proposals against the existing vault (merging overlapping proposals into 20 atomic notes, converting 8 proposed creations into updates of existing concepts, and dropping 1) and dispatched eleven writers with disjoint file ownership. Back-links from each cited dossier's "Vault Ideas Extracted" section were added centrally.
* **Taxonomy**: Watchlist candidate `developer-environments` flagged independently by three cloud-agent ingests (remote interactive workspace lifecycle, snapshot freshness, session restoration); `systems-security` gained one more carrier (Cloudflare Workers security model). No promotions.
* **Vault**: Created [activation-vested-risk-budget](/vault/activation-vested-risk-budget.md) by splitting the activation-time risk accounting concept out of [attenuated-delegation-authority](/vault/attenuated-delegation-authority.md), which now cross-links it; deployed depth/fan-out caps (Hermes, Claude Code agent teams) recorded as approximations.

## 2026-10-04 (Single-source ingest: agent-swarm Git port)
* **Ingest**: `url:blog.gitbutler.com/true-grit` — `Grit: rewriting Git in Rust with agents dossier` at `/dossiers/gitbutler-grit-agent-git-port.md` — canonical: https://blog.gitbutler.com/true-grit
* **Archive**: Captured the canonical page as `/archive/gitbutler-grit-agent-git-port.html` (SHA-256 `97425b996166aeb753c72d639cdd772433b05c6db3290a161215e69c4b2eadc4`, unchanged by the move from `inbox/`); manifest row appended to `/archive/index.md`.
* **Vault**: Updated [verifier-co-evolution](/vault/verifier-co-evolution.md) (reference passthrough, assertion-only satisfaction, shared-harness breakage misread as regression), [multi-agent-orchestration](/vault/multi-agent-orchestration.md) (dependency-ordered direction versus self-selected claiming, steering cost of long-running parallel teams, spend per verified progress), [layered-concurrent-agent-isolation](/vault/layered-concurrent-agent-isolation.md) (system under test clobbering the agent's own toolchain, shared host capacity), and [ledger-centered-agent-control-plane](/vault/ledger-centered-agent-control-plane.md) (mid-run editable ledger, ledger locality tradeoff).

## 2026-10-04 (Harness-efficiency evidence batch — 20 sources)
* **Ingest**: `arxiv:2405.15793` — `SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering dossier` at `/dossiers/swe-agent-agent-computer-interfaces.md` — canonical: https://arxiv.org/abs/2405.15793v3
* **Ingest**: `arxiv:2510.12487` — `Diff-XYZ: A Benchmark for Evaluating Diff Understanding dossier` at `/dossiers/diff-xyz-diff-understanding-benchmark.md` — canonical: https://arxiv.org/abs/2510.12487v2
* **Ingest**: `url:stencil.so/blog/the-harness-problem` — `We improved 15 LLMs at coding in one afternoon. Only the harness changed. dossier` at `/dossiers/hashline-harness-problem.md` — canonical: https://stencil.so/blog/the-harness-problem
* **Ingest**: `url:aider.chat/2023/12/21/unified-diffs.html` — `Unified diffs make GPT-4 Turbo 3X less lazy dossier` at `/dossiers/aider-unified-diffs-laziness.md` — canonical: https://aider.chat/2023/12/21/unified-diffs.html
* **Ingest**: `url:openai.com/index/introducing-structured-outputs-in-the-api` — `Introducing Structured Outputs in the API dossier` at `/dossiers/openai-structured-outputs-api.md` — canonical: https://openai.com/index/introducing-structured-outputs-in-the-api/
* **Ingest**: `url:www.anthropic.com/engineering/building-effective-agents` — `Building effective agents dossier` at `/dossiers/anthropic-building-effective-agents.md` — canonical: https://www.anthropic.com/engineering/building-effective-agents
* **Ingest**: `arxiv:2508.21433` — `The Complexity Trap: Simple Observation Masking Is as Efficient as LLM Summarization for Agent Context Management dossier` at `/dossiers/complexity-trap-observation-masking.md` — canonical: https://arxiv.org/abs/2508.21433v3
* **Ingest**: `url:claude.com/blog/context-management` — `Managing context on the Claude Developer Platform dossier` at `/dossiers/anthropic-context-management-platform.md` — canonical: https://claude.com/blog/context-management
* **Ingest**: `arxiv:2601.06007` — `Don’t Break the Cache: An Evaluation of Prompt Caching for Long-Horizon Agentic Tasks dossier` at `/dossiers/dont-break-the-cache-prompt-caching.md` — canonical: https://arxiv.org/abs/2601.06007v2
* **Ingest**: `url:platform.claude.com/docs/en/build-with-claude/prompt-caching` — `Prompt caching: prefix reuse, invalidation, and lifetime economics dossier` at `/dossiers/anthropic-prompt-caching-docs.md` — canonical: https://platform.claude.com/docs/en/build-with-claude/prompt-caching
* **Ingest**: `url:manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus` — `Context Engineering for AI Agents: Lessons from Building Manus dossier` at `/dossiers/manus-context-engineering-lessons.md` — canonical: https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
* **Ingest**: `arxiv:2312.04511` — `An LLM Compiler for Parallel Function Calling dossier` at `/dossiers/llmcompiler-parallel-function-calling.md` — canonical: https://arxiv.org/abs/2312.04511v3
* **Ingest**: `arxiv:2412.07017` — `Asynchronous LLM Function Calling dossier` at `/dossiers/asynchronous-llm-function-calling.md` — canonical: https://arxiv.org/abs/2412.07017v1
* **Ingest**: `arxiv:2305.05176` — `FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance dossier` at `/dossiers/frugalgpt-llm-cascades.md` — canonical: https://arxiv.org/abs/2305.05176v1
* **Ingest**: `arxiv:2406.18665` — `RouteLLM: Learning to Route LLMs with Preference Data dossier` at `/dossiers/routellm-preference-data-routing.md` — canonical: https://arxiv.org/abs/2406.18665v4
* **Ingest**: `url:cognition.com/blog/local-fusion` — `Introducing Fusion in Devin Desktop & CLI dossier` at `/dossiers/cognition-fusion-lead-sidekick.md` — canonical: https://cognition.com/blog/local-fusion
* **Ingest**: `url:cognition.com/blog/swe-grep` — `Introducing SWE-grep and SWE-grep-mini: RL for Multi-Turn, Fast Context Retrieval dossier` at `/dossiers/cognition-swe-grep-context-retrieval.md` — canonical: https://cognition.com/blog/swe-grep
* **Ingest**: `arxiv:2601.11868` — `Terminal-Bench: Benchmarking Agents on Hard, Realistic Tasks in Command Line Interfaces dossier` at `/dossiers/terminal-bench-cli-agent-benchmark.md` — canonical: https://arxiv.org/abs/2601.11868v1
* **Ingest**: `arxiv:2607.09510` — `Failure as a Process: An Anatomy of CLI Coding Agent Trajectories dossier` at `/dossiers/failure-as-a-process-cli-agent-trajectories.md` — canonical: https://arxiv.org/abs/2607.09510v1
* **Ingest**: `arxiv:2503.13657` — `Why Do Multi-Agent LLM Systems Fail? dossier` at `/dossiers/mast-why-multi-agent-llm-systems-fail.md` — canonical: https://arxiv.org/abs/2503.13657v3
* **Archive**: Captured all 20 sources into `/inbox/` (11 arXiv PDFs at the cited versions, 8 canonical HTML pages) and moved them to `/archive/` under their dossier slugs; SHA-256 recorded before and after the move and unchanged. `openai-structured-outputs-api.md` is a reader-text capture because the site's bot challenge blocked raw HTML retrieval; some inline code samples in it are truncated. Manifest rows appended to `/archive/index.md`.
* **Not ingested**: Four further sources from the same research pass were already registered and were not re-ingested: `doi:10.1145/3797084` (AgentDiet trajectory reduction), `url:trychroma.com/research/context-rot`, `arxiv:2402.01030` (CodeAct), `url:www.anthropic.com/engineering/multi-agent-research-system`.
* **Vault**: Created [prompt-cache-stability](/vault/prompt-cache-stability.md) (cumulative prefix identity, prior-write eligibility, lifetime choice from measured inter-request gaps).
* **Vault**: Updated [model-aware-harness-design](/vault/model-aware-harness-design.md) (edit format as a model–task–applicator contract, state-sensitive anchors, guardrail ordering tradeoffs), [bounded-tool-observations](/vault/bounded-tool-observations.md) (summary-first search, window ablations, rejected-edit state, age-dependent observation masking), [structured-agent-communication-contracts](/vault/structured-agent-communication-contracts.md) (generation-time schema enforcement, distinct refusal/interruption outcomes), [tool-availability-abstention](/vault/tool-availability-abstention.md) (nested environment capabilities, unavailable executables vs denied authority), [cost-aware-inference-control](/vault/cost-aware-inference-control.md) (episode-level compaction and cache accounting, prompt-only routing vs response-informed cascades), [reversible-query-conditioned-compaction](/vault/reversible-query-conditioned-compaction.md) (durable-referent qualifications), [multi-agent-orchestration](/vault/multi-agent-orchestration.md) (dependency-ready dispatch, explicit blocked waiting, discovery/delivery/use handoff audit), [subagent-context-inheritance-modes](/vault/subagent-context-inheritance-modes.md) (persistent separate lead/worker contexts, evidence-pointer retrieval delegation), and [adaptive-runtime-agent-supervision](/vault/adaptive-runtime-agent-supervision.md) (decisive error vs lock-in vs observability, monitor recall limits).
* **Process**: Four thematic workers wrote dossiers and proposed 2 creations and 13 updates; the coordinator merged overlapping update proposals per note, folded the proposed `evidence-returning-retrieval-delegation` note into the existing subagent-context-inheritance-modes note, and dispatched three vault writers with disjoint file ownership. Back-links in each new dossier's "Vault Ideas Extracted" section were added centrally.

## 2026-10-04 (Agent coordination, verification-independence, and replay evidence batch — 22 sources)
* **Ingest**: `arxiv:2607.21909` — `Claim Plane: Enforceable Change Intents and Dynamic Scope for Parallel Coding Agents dossier` at `/dossiers/claim-plane-enforceable-change-intents.md` — canonical: https://arxiv.org/abs/2607.21909v1
* **Ingest**: `arxiv:2608.00947` — `Claim Plane: Reliability Gains and the Limits of Selective Concurrency for Parallel Coding Agents dossier` at `/dossiers/claim-plane-confirmatory-pre-write-admission.md` — canonical: https://arxiv.org/abs/2608.00947v1
* **Ingest**: `arxiv:2606.15376` — `CoAgent: Concurrency Control for Multi-Agent Systems dossier` at `/dossiers/coagent-concurrency-control-multi-agent.md` — canonical: https://arxiv.org/abs/2606.15376v1
* **Ingest**: `arxiv:2607.00041` — `ATM: CID-Brokered Pre-Write Admission for Multi-Agent Code Co-Synthesis dossier` at `/dossiers/atm-cid-brokered-pre-write-admission.md` — canonical: https://arxiv.org/abs/2607.00041v1
* **Ingest**: `arxiv:2608.23740` — `AgentRoom: Concurrent Multi-Agent Coding in a CRDT-Backed Shared Workspace dossier` at `/dossiers/agentroom-crdt-shared-workspace.md` — canonical: https://arxiv.org/abs/2608.23740v1
* **Ingest**: `arxiv:2510.18893` — `CodeCRDT: Observation-Driven Coordination for Multi-Agent LLM Code Generation dossier` at `/dossiers/codecrdt-observation-driven-coordination.md` — canonical: https://arxiv.org/abs/2510.18893v1
* **Ingest**: `arxiv:2601.13295` — `CooperBench: Why Coding Agents Cannot be Your Teammates Yet dossier` at `/dossiers/cooperbench-coding-agent-teammates.md` — canonical: https://arxiv.org/abs/2601.13295v2
* **Ingest**: `doi:10.1145/3805760.3814923` — `AgenticFlict: A Large-Scale Dataset of Merge Conflicts in AI Coding Agent Pull Requests on GitHub dossier` at `/dossiers/agenticflict-agent-pr-merge-conflicts.md` — canonical: https://doi.org/10.1145/3805760.3814923
* **Ingest**: `arxiv:2607.04697` — `AI Agent Pull Requests on GitHub: Frequency, Structure, and Merge Conflict Rates dossier` at `/dossiers/agent-pull-requests-merge-conflict-rates.md` — canonical: https://arxiv.org/abs/2607.04697v2
* **Ingest**: `arxiv:2502.06994` — `SyncMind: Measuring Agent Out-of-Sync Recovery in Collaborative Software Engineering dossier` at `/dossiers/syncmind-agent-out-of-sync-recovery.md` — canonical: https://arxiv.org/abs/2502.06994v2
* **Ingest**: `arxiv:2603.21489` — `Effective Strategies for Asynchronous Software Engineering Agents dossier` at `/dossiers/asynchronous-software-engineering-agents-strategies.md` — canonical: https://arxiv.org/abs/2603.21489v2
* **Ingest**: `arxiv:2510.20270` — `ImpossibleBench: Measuring LLMs’ Propensity of Exploiting Test Cases dossier` at `/dossiers/impossiblebench-test-exploitation.md` — canonical: https://arxiv.org/abs/2510.20270v1
* **Ingest**: `url:metr.org/blog/2025-06-05-recent-reward-hacking` — `Recent Frontier Models Are Reward Hacking dossier` at `/dossiers/metr-frontier-models-reward-hacking.md` — canonical: https://metr.org/blog/2025-06-05-recent-reward-hacking/
* **Ingest**: `arxiv:2406.12952` — `SWT-Bench: Testing and Validating Real-World Bug-Fixes with Code Agents dossier` at `/dossiers/swt-bench-test-generation-bug-fixes.md` — canonical: https://arxiv.org/abs/2406.12952v3
* **Ingest**: `arxiv:2404.13076` — `LLM Evaluators Recognize and Favor Their Own Generations dossier` at `/dossiers/llm-evaluators-self-preference.md` — canonical: https://arxiv.org/abs/2404.13076v1
* **Ingest**: `arxiv:2310.01798` — `Large Language Models Cannot Self-Correct Reasoning Yet dossier` at `/dossiers/llms-cannot-self-correct-reasoning.md` — canonical: https://arxiv.org/abs/2310.01798v2
* **Ingest**: `arxiv:2608.08239` — `The Replay Gap: Static Evaluation of Model Switching in LLM Agents Scores the Wrong World dossier` at `/dossiers/replay-gap-model-switching-evaluation.md` — canonical: https://arxiv.org/abs/2608.08239v1
* **Ingest**: `url:thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference` — `Defeating Nondeterminism in LLM Inference dossier` at `/dossiers/thinking-machines-defeating-nondeterminism.md` — canonical: https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/
* **Ingest**: `arxiv:2608.02464` — `Real-Time Detection and Repair of LLM Agent Failures dossier` at `/dossiers/realtime-detection-repair-agent-failures.md` — canonical: https://arxiv.org/abs/2608.02464v1
* **Ingest**: `arxiv:2604.22750` — `How Do AI Agents Spend Your Money? Analyzing and Predicting Token Consumption in Agentic Coding Tasks dossier` at `/dossiers/agent-token-consumption-agentic-coding.md` — canonical: https://arxiv.org/abs/2604.22750v2
* **Ingest**: `arxiv:2504.11703` — `Progent: Securing AI Agents with Privilege Control dossier` at `/dossiers/progent-privilege-control.md` — canonical: https://arxiv.org/abs/2504.11703v3
* **Ingest**: `url:openreview.net/forum?id=LfdFnakqGJ` — `A2ASecBench: A Protocol-Aware Security Benchmark for Agent-to-Agent Multi-Agent Systems dossier` at `/dossiers/a2asecbench-agent-to-agent-security.md` — canonical: https://openreview.net/forum?id=LfdFnakqGJ
* **Archive**: Captured all 22 sources into `/inbox/` (20 PDFs — arXiv at the cited versions, A2ASecBench from the ICLR 2026 proceedings PDF — and 2 canonical HTML pages) and moved them to `/archive/` under their dossier slugs; SHA-256 recorded before and after the move and unchanged. AgenticFlict is keyed by its ACM DOI with the archived copy being arXiv 2604.03551v2. Manifest rows appended to `/archive/index.md`.
* **Vault**: Created [pre-write-intent-admission](/vault/pre-write-intent-admission.md) (declared mutation authority before shared effects; region under-coverage, advisory vs enforced claims, serialization collapse, contrasting ordered notify-and-repair) and [counterfactual-agent-run-forking](/vault/counterfactual-agent-run-forking.md) (byte playback vs model re-execution, live environment forks vs logged futures, same-model controls).
* **Vault**: Updated [layered-concurrent-agent-isolation](/vault/layered-concurrent-agent-isolation.md), [interruption-recovery-without-duplicate-effects](/vault/interruption-recovery-without-duplicate-effects.md), [structured-agent-communication-contracts](/vault/structured-agent-communication-contracts.md), [multi-agent-orchestration](/vault/multi-agent-orchestration.md), [expectation-first-coding-contract](/vault/expectation-first-coding-contract.md), [verifier-co-evolution](/vault/verifier-co-evolution.md), [llm-as-judge-with-anti-inflation](/vault/llm-as-judge-with-anti-inflation.md), [score-gated-refinement](/vault/score-gated-refinement.md), [adaptive-runtime-agent-supervision](/vault/adaptive-runtime-agent-supervision.md), [cost-aware-inference-control](/vault/cost-aware-inference-control.md), [capability-enforced-agent-execution](/vault/capability-enforced-agent-execution.md), [peer-agent-message-trust](/vault/peer-agent-message-trust.md).
* **Process**: Four thematic workers wrote dossiers and proposed 3 creations and 15 updates. The coordinator folded the proposed single-source `ordered-notify-and-repair-concurrency` note into pre-write-intent-admission as a contrasting section, merged a sibling's evidence update into that new note, reassigned the A2ASecBench material from capability-enforced-agent-execution to peer-agent-message-trust, and dispatched three vault writers with disjoint file ownership. Back-links added centrally.
* **Source status notes**: AgentRoom's archived PDF is marked "Preprint" with no ICML 2026 acceptance statement; The Replay Gap is accepted at a COLM 2026 workshop, not the main conference; CoAgent's ATC 2026 status is a submission. Dossiers record these.
* **Taxonomy**: New candidate `concurrency-control` (admission, ordering, claims, convergence, repair) flagged by the pre-write admission ingest; watchlist candidate `software-testing` gained carriers (SWT-Bench, ImpossibleBench). No promotions.

## 2026-10-04 (Instruction density, multi-agent architecture, and checklist-judging batch — 7 sources)
* **Ingest**: `arxiv:2512.08296` — `Towards a Science of Scaling Agent Systems dossier` at `/dossiers/science-scaling-agent-systems.md` — canonical: https://arxiv.org/abs/2512.08296v3
* **Ingest**: `url:cognition.com/blog/dont-build-multi-agents` — `Don't Build Multi-Agents dossier` at `/dossiers/cognition-dont-build-multi-agents.md` — canonical: https://cognition.com/blog/dont-build-multi-agents
* **Ingest**: `doi:10.18653/v1/2025.findings-emnlp.896` — `When Instructions Multiply: Measuring and Estimating LLM Capabilities of Multiple Instructions Following dossier` at `/dossiers/when-instructions-multiply.md` — canonical: https://doi.org/10.18653/v1/2025.findings-emnlp.896
* **Ingest**: `arxiv:2507.11538` — `How Many Instructions Can LLMs Follow at Once? dossier` at `/dossiers/ifscale-how-many-instructions.md` — canonical: https://arxiv.org/abs/2507.11538v1
* **Ingest**: `arxiv:2607.19257` — `Prompt Design at Scale: How Format, Instruction Count, and Context Length Shape Instruction Adherence and Hallucination in Large Language Models dossier` at `/dossiers/prompt-design-at-scale.md` — canonical: https://arxiv.org/abs/2607.19257v1
* **Ingest**: `arxiv:2410.03608` — `TICKing All the Boxes: Generated Checklists Improve LLM Evaluation and Generation dossier` at `/dossiers/ticking-all-the-boxes.md` — canonical: https://arxiv.org/abs/2410.03608v1
* **Ingest**: `doi:10.18653/v1/2025.emnlp-main.796` — `CheckEval: A reliable LLM-as-a-Judge framework for evaluating text generation using checklists dossier` at `/dossiers/checkeval-reliable-checklist-judging.md` — canonical: https://doi.org/10.18653/v1/2025.emnlp-main.796
* **Archive**: Captured all 7 sources into `/inbox/` (6 PDFs — arXiv at the cited versions, the two EMNLP 2025 papers from their ACL Anthology PDFs — and 1 canonical HTML page) and moved them to `/archive/` under their dossier slugs; SHA-256 recorded before and after the move and unchanged. Manifest rows appended to `/archive/index.md`.
* **Not ingested**: The anonymous ICLR 2025 draft "Curse of Instructions" (hosted at shivam.dev) is superseded by the peer-reviewed ManyIFEval paper above, which drops the draft's self-refinement method and reports different headline numbers; LongICLBench (`arxiv:2404.02060`, TMLR 2025) was judged off-topic (extreme-label classification on 2024 models).
* **Vault**: Created [instruction-density-compliance-decay](/vault/instruction-density-compliance-decay.md) (per-rule vs all-satisfied reliability, reconciling count benchmarks by metric and rule difficulty, judge inflation with count) and [decomposed-checklist-evaluation](/vault/decomposed-checklist-evaluation.md) (explicit criterion decisions, aggregation policy, criteria vs call partitioning).
* **Vault**: Updated [multi-agent-orchestration](/vault/multi-agent-orchestration.md) (architecture–task alignment under fixed budgets, implicit decision coupling), [subagent-context-inheritance-modes](/vault/subagent-context-inheritance-modes.md) (initial history vs ongoing decision visibility, history compression), [llm-as-judge-with-anti-inflation](/vault/llm-as-judge-with-anti-inflation.md) (checklist criteria vs separate judges), [score-gated-refinement](/vault/score-gated-refinement.md) (criterion feedback is not a retention gate).
* **Repair**: Fixed three errors found by an external source audit: [progressive-skill-disclosure](/vault/progressive-skill-disclosure.md) misreported SkillsBench's one-skill lift as +19.0 (source and dossier: +18.0); [multi-agent-orchestration](/vault/multi-agent-orchestration.md) Core Principle 1 "Specialization over Generalization" had no controlled support among its sources and was reworded as a design choice to test against a single-agent baseline; [How we built our multi-agent research system](/dossiers/anthropic-multi-agent-research.md) omitted Anthropic's internal, unquantified finding that one whole-rubric judge call was more consistent and human-aligned than per-component judges — added to the dossier and to [llm-as-judge-with-anti-inflation](/vault/llm-as-judge-with-anti-inflation.md).
* **Process**: Three thematic workers wrote dossiers and proposed 2 creations and 5 updates; the coordinator condensed the checklist update to llm-as-judge-with-anti-inflation to avoid duplicating the new checklist note and assigned disjoint vault ownership. A separate worker made the repairs.
* **Source status notes**: Scaling Agent Systems, IFScale, and Prompt Design at Scale (single author, non-peer-reviewed) are arXiv preprints; TICK is an ICLR 2025 submission whose decision could not be retrieved; ManyIFEval and CheckEval are peer-reviewed EMNLP 2025 papers (Findings and main conference respectively). Dossiers record these.
* **Taxonomy**: No new gaps.
