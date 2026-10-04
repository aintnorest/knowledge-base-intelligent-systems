---
type: Synthesis
title: Multi-Agent Orchestration
description: Decomposing a complex task into specialized agents that run in a coordinated pipeline, with explicit handoffs, configuration-aware evaluation, and parallel execution where dependencies allow.
tags: [multi-agent, orchestration, evaluation, agents]
timestamp: 2026-07-23T20:03:07Z
---

# Multi-Agent Orchestration

A design pattern where a complex task is broken into distinct sub-tasks, each handled by a specialized agent. The agents operate in a coordinated pipeline with parallel execution where dependencies allow.

## Core Principles

1. **Specialization as a Design Choice** — Focused roles can divide domain work, but add handoff and coordination costs; test the team against one competent generalist rather than assuming specialization improves outcomes.
2. **Parallel Execution** — Independent sub-tasks run concurrently to minimize wall-clock time.
3. **Decoupled Verification** — High-throughput discovery (e.g., web search with many concurrent workers) is separated from rate-limited verification (e.g., API calls with strict quotas). For structured work, a final agent can also validate the full candidate set for grounding, cross-record consistency, duplicates, and canonical output.
4. **Score-Gated Iteration** — Refinement loops accept changes only if objective quality metrics improve, preventing degradation.

## When to Use

- The task has naturally separable sub-domains with minimal cross-cutting concerns.
- Different sub-tasks have different resource constraints (latency, concurrency, API limits).
- Quality can be evaluated by an objective scoring function.
- The output is a structured artifact (document, code, plan) that can be incrementally improved.

## When Not to Use

- The task requires tight feedback loops between sub-domains (e.g., real-time dialogue).
- Sub-tasks are so interdependent that parallel execution creates race conditions.
- Quality is purely subjective with no agreed-upon scoring rubric.

## Variants

| Variant | Description | Example |
|---------|-------------|---------|
| **Sequential Pipeline** | Agents run in strict order; each output feeds the next input | Traditional data engineering pipelines |
| **Parallel Fork-Join** | Independent agents run concurrently; results merged at join point | PaperOrchestra Steps 2 & 3 (plotting + literature review) |
| **Iterative Refinement** | A single agent loops with a critic until quality threshold met | Content Refinement Agent with AgentReview |
| **Hierarchical** | A meta-agent delegates to sub-agents and integrates their outputs | AutoGPT-style task decomposition |

## Sequential Typed Pipelines

When later decisions depend on earlier structured outputs, sequence can be more valuable than parallelism. Have each stage emit a small, validated type—such as candidates, linked pairs, labels, then a final record set—and provide both those intermediates and the original evidence to downstream stages. This exposes error boundaries and avoids forcing one generation to choose spans, relations, labels, and serialization simultaneously.

The trade-off is compounding omissions and added inference cost. If an early candidate stage is mandatory, its false negatives can block later recovery. Use deterministic checks at handoffs, permit a final verifier to reopen only clearly supported omissions where appropriate, and evaluate the latency/precision/recall trade-off against a direct baseline.

## Coordination Is an Optimization Boundary

Agent count, routing topology, message protocol, and aggregation rule determine whether a local behavior improvement reaches the final outcome. They should be versioned and evaluated with prompts as one deployed configuration. More agents are not automatically better: each added handoff can dilute a useful change, create inconsistent agent assumptions, or raise the cost of attributing failures.

Use structured handoff contracts when downstream decisions repeatedly depend on status, evidence, confidence, or the next action. These contracts make the information flow inspectable and give local prompt changes a stable interface, but they should be validated for semantic usefulness rather than treated as formatting alone.

Audit three distinct handoff properties: whether the specialist discovered relevant information, whether it delivered that information, and whether the recipient used it in the next decision. A well-formed exchange can still omit a crucial requirement or turn a hypothetical check into an asserted result. Give completion an explicit owner whose evidence contract checks the requested behavior, not only compilation or subordinate assurances. Test role, verification, and topology changes as deployed configurations: bundled gains do not establish a universally superior graph or isolate one prompt change.

Topology also distributes the information needed to recognize an unsafe end-to-end request. A specialist can receive only a harmless-looking step while the coordinator alone knows the overall purpose; adding shared history can restore intent or widen the spread of adversarial content. Evaluate completed harmful actions and benign utility for the actual role, memory, and topology configuration, not just isolated model refusals. Controlled comparisons find no universally safest communication graph or memory arrangement. For injected peer messages, see [Peer-Agent Message Trust](/vault/peer-agent-message-trust.md).

## Architecture–Task Alignment Under a Fixed Budget

Choose a coordination graph by the information dependencies of the task, not by the number of available workers. Parallel evidence streams can benefit from independent investigation followed by checked integration; a tightly ordered state transition often benefits from one continuous decision stream. Under a fixed total reasoning budget, communication consumes capacity that would otherwise support local reasoning. A controlled comparison of 260 configurations across six benchmarks, five architectures, and three model families found relative changes ranging from +80.8% for centralized financial analysis to −70.0% for independent sequential planning. The planning losses of approximately −39% to −70% are observations from one planning benchmark, not a law covering every planning workload.

Starting with the same task and history does not make parallel execution independent. Actions establish implicit commitments about interfaces, style, state, and interpretation that another worker may not observe. Where those choices constrain each other, establish the shared decisions before fan-out, communicate consequential changes before dependent work proceeds, or retain one execution owner while delegating bounded investigation. A final merge cannot recover missing decision context merely by combining outputs.

Use high solo performance as a warning that coordination has little headroom, not as a universal numeric cutoff. The scaling study proposes an approximately 45% solo-baseline threshold, but its direct baseline-by-agent-count interaction loses conventional significance under cluster-robust inference. Its 87% held-out architecture-selection result concerns configurations within known task regimes; on three genuinely held-out frontier models, the equation selected a high-overhead architecture that did not win for any model. Local outcome, cost, and latency measurements remain necessary. No dedicated artifact-review or independent-verifier benchmark in that study establishes the best topology for review.

## Learn Parallelism Against the Critical Path

For broad search or naturally separable work, let an orchestrator decide whether, when, and how to create specialists rather than hard-coding a large fan-out. Evaluate a parallel stage by its longest branch plus coordination work, not by total workers or total actions. This critical-path view rewards balanced decomposition and prevents a policy from receiving credit merely for spawning many irrelevant subagents.

When outcome rewards are sparse, holding executor policies fixed while learning the orchestrator can stabilize credit assignment. Return bounded findings, evidence references, confidence, and necessary artifacts from each subagent; keep raw local traces out of the coordinator’s context unless they are required to resolve a conflict. This makes parallelism an explicit context-sharding strategy as well as a latency strategy.

Match [subagent context inheritance](/vault/subagent-context-inheritance-modes.md) to the job: distinct searches benefit from fresh, bounded questions, while continuation may benefit from established evidence. Specify branch objectives, source boundaries, effort budgets, and result shapes before launch. At a join point, budget for the slowest branch and preserve artifact references so summary compression need not erase evidence.

## Dependency-Ready Scheduling and Explicit Waiting

Separate model planning from deterministic dependency resolution. Once a plan declares tasks and result dependencies, a runtime can substitute completed outputs and dispatch ready work without another model turn. Streamed planning overlaps generation of later tasks with execution of complete earlier tasks. Replan when observations reveal genuinely unknown decisions, rather than repeatedly asking the model to authorize a known next step. Incorrect dependency graphs, execution errors, and bad final synthesis remain distinct failure boundaries.

Parallel batches and asynchronous execution are not equivalent. A batch can impose a barrier on its slowest task; individual completion delivery permits newly ready dependents and independent model work to proceed sooner. If results arrive during generation, preserve indivisible action boundaries and identify which pending work each result belongs to. Represent dependency-blocked waiting as a runtime state distinct from final completion, and resume when a completion makes useful work possible rather than spending model turns restating the wait. Interrupt processing, request startup, cache restoration, and resource limits can erase theoretical overlap gains.

## Search the Workflow in Stages

When both role instructions and routing remain unsettled, first establish competent minimal building blocks, then search a bounded workflow grammar using measured block benefit as a sampling prior, and finally adapt the prompts to the chosen graph. This reduces waste on unpromising structures without mistaking local block scores for the final decision: every selected workflow still needs end-to-end holdout evaluation for quality, cost, and safety-relevant handoffs.

## Coding Teams: Contracts, Coupling, and the Smallest Useful Team

Before fanning out coding workers, establish ownership and cross-slice API contracts. Independent workers can proceed in parallel, but a worker that depends on two others must wait for their bounded handoffs. Task lists and direct peer messages reduce lead bottlenecks, but they do not replace final integration and review. Limit work in progress by CI and reviewer throughput ([Bounded Hybrid Coding Workflow](/vault/bounded-hybrid-coding-workflow.md)).

When components build on one another, self-selected claiming ("take the next failing test") is weaker than an explicit dependency-ordered plan: foundational units first, dependents next, leaf features that nothing else consumes last. Long-running and parallel work are each manageable; combined, they make steering expensive, because redirecting the team means pausing workers, merging, rewriting the shared plan, and respawning. Track spend per unit of verified progress rather than per worker or per hour, and change worker shape when that ratio moves. Narrow, short-lived workers on cheap models can carry much of the volume, while long-lived coordinators on expensive per-token billing can dominate cost.

Bilevel Coordinated Reflection gives this a formal shape. Global utility is modeled as local utilities plus pairwise interactions induced by the decomposition. With edge strength bounded by κ and interaction degree by d_max, a unilateral worker update's local-versus-global discrepancy is bounded by 2·d_max·κ. That is conditional theory, not a measured repository coupling score. Its gated two-worker system resolves 72.2% on SWE-bench versus 58.4% for an ungated two-worker control with the same backbone and budget. This isolates the gate, not worker count.

Treat a team as a hypothesis to test against one competent agent. In Westermo's industrial test-failure study, six practitioners' preferences between single-agent and multi-agent reports reversed across scenarios. The team cost roughly 3× the latency (130 s versus 40 s) and 2× the spend per report. Anthropic forecasts broader multi-agent adoption but does not demonstrate a general advantage from agent count.

A shared task claim is not proof of completion or worker liveness. Before unblocking dependents, reconcile the marker against artifacts and the active worker; interrupted teams can leave stale status. Unlock dependent work on accepted integrated artifacts, not assignment, local success, or a completion message. Group tightly coupled units under one owner when splitting multiplies integration assumptions. Isolated branches contain intermediate interference, but the accepted branch remains a sequential coordination boundary.

Where workers share governed surfaces, distinguish ownership messages from enforced mutation authority. [Pre-Write Intent Admission](/vault/pre-write-intent-admission.md) can constrain declared overlap before effects, but must accommodate supporting edits through bounded re-admission and retain downstream semantic checks; serializing nearly everything is not useful parallelism.

Compare quality, latency, and spend against a competent solo baseline. Free-form peer cooperation can lose substantial solo capability, while manager-led isolated integration can improve quality without reducing wall-clock time. These are different execution regimes, not contradictory laws about agent count. Extra workers and review can purchase stronger results with more computation; unequal action budgets must not be described as pure coordination gains.

## Sources

- [PaperOrchestra dossier](/dossiers/paperorchestra.md) — 5 specialized agents in a fork-join pipeline; ~60–70 LLM calls; 39.6 min mean latency
- [MASTE: A Multi-Agent Pipeline for Zero-Shot Aspect Sentiment Triplet Extraction dossier](/dossiers/maste-zero-shot-aspect-sentiment-triplet-extraction.md) — sequential typed stages for aspect, opinion, sentiment, and triplet-set consistency; reported gains come with four calls per sentence and aspect-stage recall risk.
- [MAS-PromptBench dossier](/dossiers/mas-promptbench.md) — finds that prompt-optimization effects vary by task, topology, communication structure, and team size; its tested optimizers generally benefited more from structured protocols and smaller teams.
- [Multi-Agent Design: Optimizing Agents with Better Prompts and Topologies dossier](/dossiers/multi-agent-design-prompts-topologies.md) — searches prompt and topology variables in three stages, prioritizing topology blocks by measured validation influence before adapting prompts to the selected workflow.
- [Kimi K2.5: Visual Agentic Intelligence dossier](/dossiers/kimi-k2-5-visual-agentic-intelligence.md) — technical-report evidence for a frozen-subagent/trainable-orchestrator design, auxiliary parallelism/completion rewards, critical-step latency, and context sharding.
- [The Code Agent Orchestra - what makes multi-agent coding work dossier](/dossiers/code-agent-orchestra.md) — dependency-sequenced workers, task lists, and verification-limited parallelism.
- [2026 Agentic Coding Trends Report dossier](/dossiers/anthropic-agentic-coding-trends-2026.md) — forecast of coordinated agent teams with vendor case examples.
- [Bilevel Coordinated Reflection: A Game-Theoretic Approach to Multi-Agent LLM Systems dossier](/dossiers/bilevel-coordinated-reflection.md) — coupling bound and matched gated/ungated two-worker comparison.
- [Supporting Industrial Test-Failure Analysis with LLM-Based Systems: An Experience Report dossier](/dossiers/westermo-llm-test-failure-analysis.md) — single- versus multi-agent RCA reports with scenario-dependent preference and higher team cost.
- [Architecture Matters for Multi-Agent Security dossier](/dossiers/multi-agent-architecture-security.md) — controlled role, topology, and memory comparisons show nonuniform harmful-completion changes alongside benign utility; its threat is direct malicious user requests, not prompt injection.
- [How we built our multi-agent research system dossier](/dossiers/anthropic-multi-agent-research.md) — first-party parallel research account with scoped delegations, compressed source handoffs, high token consumption, and synchronous laggard waits.
- [Orchestrate teams of Claude Code sessions dossier](/dossiers/claude-code-agent-teams-model.md) — experimental shared tasks and independent teammates; resumed sessions can lose teammates and stale task statuses can block dependencies.
- [Grit: rewriting Git in Rust with agents dossier](/dossiers/gitbutler-grit-agent-git-port.md) — operator account where dependency-ordered direction beat self-selected test claiming, short-lived per-file workers did about half the work, and cost per passing test drove repeated changes of strategy; single project, no baseline.
- [An LLM Compiler for Parallel Function Calling dossier](/dossiers/llmcompiler-parallel-function-calling.md) — graph planning, deterministic ready-task dispatch, streamed execution, and dynamic replanning; benchmark and reporting limitations constrain speedup claims.
- [Asynchronous LLM Function Calling dossier](/dossiers/asynchronous-llm-function-calling.md) — interruptible decoding, explicit waits, and cache-residency decisions; highest cloud gains are emulated and naive API restarts can be slower.
- [Why Do Multi-Agent LLM Systems Fail? dossier](/dossiers/mast-why-multi-agent-llm-systems-fail.md) — MAST separates discovery, delivery, and use of findings from message shape; completion authority and verification interventions have task-, model-, and configuration-dependent results.
- [CooperBench: Why Coding Agents Cannot be Your Teammates Yet dossier](/dossiers/cooperbench-coding-agent-teammates.md) — overlapping-feature tasks exhibit substantial solo/cooperative gaps despite message passing.
- [Effective Strategies for Asynchronous Software Engineering Agents dossier](/dossiers/asynchronous-software-engineering-agents-strategies.md) — dependency-ready delegation and isolated integration improve benchmark scores with greater total actions, cost, and runtime.
- [Towards a Science of Scaling Agent Systems dossier](/dossiers/science-scaling-agent-systems.md) — standardized tools, task prompts, and budgets expose Finance-Agent gains and PlanCraft losses; capability saturation is the authors' strongest robustness result, while frontier winner selection fails despite moderate score calibration.
- [Don't Build Multi-Agents dossier](/dossiers/cognition-dont-build-multi-agents.md) — June 2025 practitioner argument that identical starting context does not prevent incompatible decisions made during parallel execution; qualitative evidence, not a measured universal disadvantage.
