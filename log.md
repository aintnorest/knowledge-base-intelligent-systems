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
* **Vault**: Created [answer-engine-optimization](/vault/answer-engine-optimization.md), [zero-click-search](/vault/zero-click-search.md)
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
