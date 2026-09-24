---
type: Directory Index
title: Knowledge Base Index
description: Table of contents for all dossiers and vault pages in this knowledge corpus.
tags: [index, knowledge-base, toc]
timestamp: 2026-07-11T16:00:00Z
---

# Knowledge Base

## Dossiers

* [Specification](/dossiers/agent-skills-format-specification.md) — Portable Agent Skills SKILL.md and directory specification: required metadata, optional resources, progressive disclosure, and validation rules
* [Evaluating skill output quality](/dossiers/evaluating-agent-skills-output-quality.md) — Hands-on Agent Skills evaluation loop with fresh with-skill/baseline runs, graded deliverables, timing costs, and human feedback
* [Agent Skills](/dossiers/anthropic-agent-skills-platform-overview.md) — Claude Skills across API, Code, and claude.ai: staged loading, separate deployment scopes, container limits, and security considerations
* [Equipping agents for the real world with Agent Skills](/dossiers/anthropic-equipping-agents-with-skills.md) — Anthropic's engineering rationale for portable, composable agent skills with filesystem disclosure and deterministic helpers
* [Skill authoring best practices](/dossiers/anthropic-skill-authoring-best-practices.md) — Anthropic's detailed SKILL.md authoring guidance on concise routing, conditional references, degrees of freedom, scripts, and evaluation
* [Extend Claude with skills](/dossiers/claude-code-skills-reference.md) — Claude Code's skills runtime: discovery and name precedence, invocation permissions, shell injection, subagents, compaction, and evals
* [Build skills](/dossiers/openai-build-agent-skills.md) — OpenAI's ChatGPT/Codex skills guide: context-budgeted discovery, implicit/explicit activation, local scopes, and plugin distribution
* [Agent Skills in the Wild: An Empirical Study of Security Vulnerabilities at Scale](/dossiers/agent-skills-security-vulnerabilities-wild.md) — Security census of 31,132 community skills distinguishes 26.1% risky-pattern hits from verified malicious behavior and measures scanner error
* [“Do Not Mention This to the User”: Detecting and Understanding Malicious Agent Skills in the Wild](/dossiers/malicious-agent-skills-wild.md) — Behaviorally verifies 157 malicious skills among 98,380, revealing credential-theft campaigns, instruction hijacks, shadow features, and platform-native abuse
* [From Anatomy to Smells: An Empirical Study of SKILL.md in Agent Skills](/dossiers/skill-md-anatomy-and-smells.md) — Classifies 238 popular SKILL.md files into 44 semantic components and 26 authoring smells, many persistent but not causally tied to task quality
* [What Keeps Agent Skills from Being Reusable? Evidence from 138K SKILL.md Files](/dossiers/agent-skills-reusability-defects.md) — Static audit of 138,133 skill files links routing and packaging defects to lexical discovery, while showing limits of automatic repair and AI-authorship inference
* [Demystifying Agent Skills: Why They Work—Until They Don’t](/dossiers/demystifying-agent-skills-why-they-work.md) — Matched trajectories show skills stabilize procedures better than direct workflow memories while introducing applicability and crowded-library retrieval failures
* [SkillsBench: Benchmarking How Well Agent Skills Work Across Diverse Tasks](/dossiers/skillsbench-agent-skills-efficacy.md) — Paired 87-task, 18-configuration benchmark finds +16.6-point mean lift from curated skills, task-level regressions, and self-generated skill losses
* [Agent Skills for Large Language Models: Architecture, Acquisition, Security, and the Path Forward](/dossiers/agent-skills-architecture-acquisition-security-survey.md) — Survey distinguishes procedural skill packages from MCP connectivity and proposes staged verification with revocable least-privilege trust tiers
* [VOYAGER: An Open-Ended Embodied Agent with Large Language Models](/dossiers/voyager-lifelong-learning-agent.md) — Minecraft agent converts verified exploratory code into reusable, composable skills through curriculum, feedback, and execution
* [SkillWeaver: Web Agents can Self-Improve by Discovering and Honing Skills](/dossiers/skillweaver-web-agent-skill-learning.md) — Web agents explore websites, synthesize and hone reusable Playwright APIs, and transfer them across stronger and weaker executors
* [SkillRouter: Skill Routing for LLM Agents at Scale](/dossiers/skillrouter-skill-routing.md) — Body-aware retrieval and listwise reranking improve top-1 skill routing among approximately 80,000 overlapping skills
* [Skill or Skip? Learning Selective Skill Invocation in Agentic Tasks via Dual-Granularity Preference Learning](/dossiers/skill-or-skip-agent-skills.md) — SelSkill learns when to invoke or skip a relevant skill using shared-prefix counterfactual continuations and dual-granularity preferences
* [Socratic-SWE: Self-Evolving Coding Agents via Trace-Derived Agent Skills](/dossiers/socratic-swe.md) — Trace-derived skills target executable repository repair exercises in a closed generator–solver training curriculum
* [Ecdysis: Efficient and Effective Training of Runtime Harnesses for LLM Agents](/dossiers/self-evolving-agent-harness-ecdysis.md) — Cross-task failure aggregation and collaborative diagnosis gate reusable harness repairs against model-specific accommodations
* [Minions: Stripe’s one-shot, end-to-end coding agents](/dossiers/stripe-minions-one-shot-coding-agents.md) — Stripe minions turn Slack requests into isolated, selectively tested, CI-bounded and human-reviewed agent-authored pull requests
* [Minions: Stripe’s one-shot, end-to-end coding agents—Part 2](/dossiers/stripe-minions-blueprints-and-ci.md) — Stripe blueprints interleave deterministic lint/push gates with agent implementation and repair, curated tools, and at most two CI runs
* [Harness engineering: leveraging Codex in an agent-first world](/dossiers/openai-harness-engineering-agent-first.md) — OpenAI describes a Codex-authored product supported by repository-native context, executable architecture rules, quality grades, and background drift cleanup
* [Custom Code Review rules for Codex](/dossiers/openai-custom-code-review-rules.md) — OpenAI evaluates scoped Codex review rules on violations and safe counterexamples, reporting 98% versus 58.3% custom-finding recovery
* [Verifying Agentic Development at Scale](/dossiers/cognition-verifying-agentic-development.md) — Cognition grounds Devin test plans in code, precommits expected behavior before actions, and proposes deterministic setup skills as PRs
* [How Cognition Uses Devin to Build Devin](/dossiers/cognition-devin-builds-devin.md) — Cognition describes internal Devin-triggered coding, review/autofix, ticket triage, incident workflows, and recurring design-system audits
* [Introducing Roast: Structured AI workflows made easy](/dossiers/shopify-roast-structured-ai-workflows.md) — Shopify Roast orchestrates declarative AI and deterministic workflow steps for test quality and typing; it is not a per-PR review bot
* [Conductor Update: Introducing Automated Reviews](/dossiers/google-conductor-automated-reviews.md) — Google Conductor adds post-implementation code, plan, guidelines, test, and basic security reviews without published accuracy measurements
* [Agentic Code Quality](/dossiers/agentic-code-quality.md) — Personal essay on staged quality gates, trustworthy feedback, and verification back-pressure around coding agents
* [My LLM coding workflow going into 2026](/dossiers/ai-coding-workflow-2026.md) — Personal coding workflow from an approved spec and small tasks through scoped context, real execution, review, and reversible commits
* [The Code Agent Orchestra - what makes multi-agent coding work](/dossiers/code-agent-orchestra.md) — Subagents, coordinated teams, and local/cloud orchestration with dependency contracts, file ownership, quality gates, and integration
* [AI writes code faster. Your job is still to prove it works.](/dossiers/ai-code-review-proof.md) — Evidence-bearing PR contract for AI-assisted code: intent, observed behavior, risk and AI role, plus targeted human review
* [How to write a good spec for AI agents](/dossiers/good-spec-ai-agents.md) — Outcome-first living specifications with staged planning, task-local context, action boundaries, and acceptance checks
* [Small CLs](/dossiers/google-small-cls.md) — Google code-review guide to self-contained, build-safe, test-backed changes and practical ways to split work for review
* [Bringing Code Review to Claude Code](/dossiers/claude-code-review.md) — Anthropic multi-agent PR bug review with verification and severity ranking, human-only approval, deployment figures, and usage-based pricing
* [2026 Agentic Coding Trends Report](/dossiers/anthropic-agentic-coding-trends-2026.md) — Anthropic forecasts eight shifts in coding agents while distinguishing measured collaborative use and customer anecdotes from future capabilities
* [About GitHub Copilot code review](/dossiers/github-copilot-code-review-concepts.md) — GitHub's agentic code-review feature contract: repository context, risk-tiered effort, costs, excluded files, and the policy setting that lets Copilot approvals count toward required approvals
* [Copilot code review effort levels are generally available](/dossiers/github-copilot-review-effort-levels.md) — GitHub's Lite/Balanced code-review effort levels route routine and higher-risk changes to different analysis depths with inherited defaults and visible per-run labels
* [Application card: GitHub Copilot inline suggestions](/dossiers/github-copilot-inline-suggestions-responsible-use.md) — GitHub's responsible-use card separates inline code and PR-text suggestions from code review, documenting evaluation, filters, security limitations, and explicit human acceptance
* [AI in software engineering at Google: Progress and the path ahead](/dossiers/google-ai-software-engineering-progress.md) — Google's industrial account of 37% completion-suggestion acceptance, 50% AI-assisted typed characters, >8% review-comment resolution assistance, and workflow-centered evaluation
* [AI-Assisted Assessment of Coding Practices in Modern Code Review](/dossiers/google-autocommenter-coding-practices.md) — Google AutoCommenter's industrial rollout calibrates best-practice review feedback by guideline and measures useful-comment ratios, estimated fixes, and A/B review-workflow effects
* [BitsAI-CR: Automated Code Review via LLM in Practice](/dossiers/bytedance-bitsai-cr-code-review.md) — ByteDance BitsAI-CR combines 219 review rules with a two-stage filter and feedback flywheel; reports a 75.0% online peak precision and 26.7% Go line-change proxy
* [Using Agentic AI for contextualized and multifaceted code review at Ericsson](/dossiers/ericsson-contextual-multifaceted-code-review.md) — Ericsson's four skill-guided reviewers use repository-graph context; developers judged 197/206 Python-commit findings correct and 135/197 correct findings worth fixing
* [AI-powered Code Review with LLMs: Early Results](/dossiers/ai-powered-code-review-early-results.md) — Four-role GPT-4 review proposal with preliminary qualitative findings but no measured accuracy or production impact
* [CodeAgent: Autonomous Communicative Agents for Code Review](/dossiers/codeagent-communicative-code-review.md) — Communicative multi-agent review team with QA-Checker improves selected task metrics without establishing defect recall
* [Code Review Agent Benchmark](/dossiers/c-crab-code-review-agent-benchmark.md) — Executable human-review oracles show 20.1–32.1% AI review-guided test pass rates but miss distinct useful AI comments
* [From Industry Claims to Empirical Reality: An Empirical Study of Code Review Agents in Pull Requests](/dossiers/industry-code-review-agent-pr-outcomes.md) — Observational study finds 45.20% bot-only versus 68.37% human-only merge; causation and keyword signal are unestablished
* [AI-to-AI Code Reviews of GitHub Pull Requests](/dossiers/ai-to-ai-code-reviews-github-prs.md) — Signature-based study counts 248,641 AI-authored and AI-reviewed PRs without measuring review correctness
* [The End of Code Review: Coding Agents Supersede Human Inspection](/dossiers/end-of-code-review-agent-verification.md) — Position paper proposes risk-stratified agent approval in place of universal human inspection; crossover unmeasured
* [Reviewer Capability Governs Rejection Targeting, Not Repair Skill: Evidence from LLM Execute–Review–Revise Pipelines](/dossiers/reviewer-capability-rejection-targeting.md) — Paired math-task experiment separates false-rejection targeting, critique uptake, repair and damage across reviewer tiers
* [More Code, Less Reuse: Investigating Code Quality and Reviewer Sentiment towards AI-generated Pull Requests](/dossiers/ai-pull-requests-semantic-redundancy.md) — ACM MSR study of AI-authored pull requests: higher embedding-based semantic redundancy in one repository, even where conventional complexity and review sentiment appear unremarkable
* [Debt Behind the AI Boom: A Large-Scale Empirical Study of AI-Generated Code in the Wild](/dossiers/ai-generated-code-technical-debt-wild.md) — Longitudinal analysis of warnings added, fixed and persisting in 302,579 AI-attributed commits, with category-specific debt and important unresolved denominator conflicts
* [Not All Agents Are Equal: Code Quality and Post-Merge Maintenance Across Five Autonomous Coding Agents in the Wild](/dossiers/coding-agents-post-merge-maintenance.md) — Field comparison of five coding agents across 37,623 PRs, static smell signals, human review and 90-day revert/churn outcomes; vendor and task mix complicate pooled rankings
* [A Large-Scale Empirical Study of Quality Assurance Practices and Gaps in AI Agents](/dossiers/quality-assurance-gaps-ai-agent-projects.md) — Audit of 157 public agent repositories: conventional tests are widespread, but explicit adversarial tests and coverage of high-risk model-to-action chains lag
* [SWE-chat: Coding Agent Interactions From Real Users in the Wild](/dossiers/swe-chat-real-user-coding-agent-interactions.md) — Opt-in real coding-agent sessions link prompts, interventions and commits: compares code retention, effort and Semgrep findings across human-only, collaborative and vibe modes
* [Position: Humans are Missing from AI Coding Agent Research](/dossiers/humans-missing-ai-coding-agent-research.md) — Position paper proposing task alignment, steerability, human verifiability and multi-session adaptation alongside coding-agent benchmark resolution
* [Rethinking Autonomy: Preventing Failures in AI-Driven Software Engineering](/dossiers/rethinking-autonomy-ai-driven-software-engineering.md) — SAFE-AI proposal for permissioned, auditable coding agents; simulated small-model failure percentages require caution because its incident citation and trial denominators are unreliable
* [TDFlow: Agentic Workflows for Test Driven Development](/dossiers/tdflow-test-driven-development.md) — A test-driven coding workflow that separates patch creation and single-test debugging, contrasting human-authored test resolution with error-prone agent-generated reproducers
* [Rethinking the Value of Agent-Generated Tests for LLM-Based Software Engineering Agents](/dossiers/agent-generated-tests-software-engineering-value.md) — A paired prompt-intervention study finds that creating more agent-authored test files changes cost far more than issue resolution, a counterpoint to blanket test-writing mandates
* [SpecBench: Measuring Reward Hacking in Long-Horizon Coding Agents](/dossiers/specbench-long-horizon-reward-hacking.md) — A 30-task systems benchmark exposes public-feature/hidden-composition test gaps, from isolated components to deliberate test-input memorization
* [The Verification Horizon: No Silver Bullet for Coding Agent Rewards](/dossiers/verification-horizon-coding-agent-rewards.md) — Qwen’s four reward constructions examine instruction–test alignment, trajectory hacking, interactive UI judging, user feedback, and long-horizon evaluator reliability
* [Preventing Premature Commitment in Coding Agents with an Evidence-Conditioned Execution Layer](/dossiers/ecloop-evidence-conditioned-execution.md) — ECLoop delays coding-agent edits until relevant repository observations are recorded, improving SWE-bench outcomes while exposing audited fallback and missed-condition risks
* [SWE-Proof: Can Language Models Resolve Real-World Issues with Machine-Checked Proofs?](/dossiers/swe-proof-machine-checked-repair.md) — BenchProofer attaches audited formal specifications and proofs to real repair issues, finding that self-authored specs omit behavior while trusted specs improve results
* [LLM-as-an-Improver: Turning Verification into Better Candidates](/dossiers/llm-as-an-improver-verify-repair-reselect.md) — Verify–Repair–Reselect converts criterion-level verifier feedback into new candidates, recovering some all-wrong pools but also regressing on formerly correct cases
* [Ask or Assume? Uncertainty-Aware Clarification-Seeking in Coding Agents](/dossiers/ask-or-assume-coding-agent-clarification.md) — Separates ongoing clarification-need detection from coding, reaching 69.4% resolve on underspecified SWE-bench issues with substantial query costs
* [Names Are All You Need: Effective and Safe Regression Test Selection for Python](/dossiers/namerts-python-regression-test-selection.md) — Name–code-element reachability skips 69.90% of Python test files while selecting all affected tests on 99.6% of studied commits
* [How Much Static Structure Do Code Agents Need? A Study of Deterministic Anchoring](/dossiers/deterministic-anchoring-code-agents.md) — Searchable structural code comments modestly improve Codex localization and repeated-run stability, with hub-sensitive token trade-offs
* [CodeCureAgent: Automatic Classification and Repair of Static Analysis Warnings](/dossiers/codecureagent-static-analysis-warning-repair.md) — SonarQube warning classification and repair with build, analyzer, and test gates; 96.8% plausible versus 86.3% human-checked correctness
* [What Drives Recovery in Agentic Text-to-Cypher? LAST-CQ: An LLM Agent Self-Refinement Framework](/dossiers/last-cq-what-drives-agentic-recovery.md) — Execution-grounded ablations locate retry gains in failure detection and routing rather than elaborate feedback, and expose misleading query metrics
* [Translator vs. Challenger: Adversarial Agentic Learning for C-to-Rust Translation](/dossiers/trail-translator-challenger-c-to-rust.md) — Executable Challenger counterexamples refine reusable C-to-Rust translation insights, with project correctness, safety, and transfer trade-offs
* [Bilevel Coordinated Reflection: A Game-Theoretic Approach to Multi-Agent LLM Systems](/dossiers/bilevel-coordinated-reflection.md) — Conditional coordination and verifier-gated memory theory plus grounded experiments in agent teamwork and software repair
* [Governed AI-Assisted Engineering: Graduated Human Oversight for Agentic Code Generation in Regulated Domains](/dossiers/governed-ai-assisted-engineering.md) — Graduated human oversight for agentic coding in regulated domains: impact-based tiers, deployment gates, evidence chains, and explicitly analytical velocity estimates
* [Governance Controls for AI-Generated Test Artifacts in Autonomous Software Testing](/dossiers/governance-controls-ai-generated-test-artifacts.md) — GATF validates AI-generated test artifacts across correctness, security, explainability, compliance, and audit controls; reported gains need independent reproduction
* [Human oversight of agentic systems in practice: Examining the oversight work, challenges, and heuristics of developers using software agents](/dossiers/human-oversight-agentic-systems-in-practice.md) — Interviews with 17 experienced developers reveal anticipatory control, co-planning, monitoring, and post-hoc review—and fragile shortcuts that substitute plans or tests for code verification
* [Designing meaningful human oversight in AI](/dossiers/designing-meaningful-human-oversight-ai.md) — Layered operative/evaluative agency and solve–verify asymmetry guide evidence packages, human contestability, and four oversight patterns; 12 documented cases are not efficacy trials
* [Humans in Control: A Methodological Framework for Quality Assurance in Agentic Software Engineering](/dossiers/humans-in-control-agentic-qa.md) — Human-controlled multi-agent refactoring of static-analysis findings, with issue, strategy, plan, step, and diff approvals; user study remains proposed
* [AI agents in software testing: a human-in-the-loop assurance model](/dossiers/ai-agents-software-testing-human-assurance.md) — Human-in-the-loop testing assurance matrix maps artifact risk and agent autonomy to approval, evidence, reproducibility, and CI/CD escalation; conceptual, not empirically validated
* [The Ethics of AI-Assisted Code Migration in Regulated Financial Systems: Accountability, Transparency, and Human Oversight in LLM-Driven Software Conversion](/dossiers/ethics-ai-assisted-code-migration.md) — Regulated code-migration ethics: human scoping and sign-off, generation provenance, and source-versus-target differential testing; practitioner argument without measured outcomes
* [Adaptive AI Test Governance for Enterprise Software: Risk-Based Validation, Failure Detection, and Human Oversight](/dossiers/adaptive-ai-test-governance.md) — Conceptual enterprise AI governance feedback loop coupling dynamic risk-tiered validation, deployed-model failure signals, and empowered human intervention
* [From LLMs to LLM-based Agents for Software Engineering: A Survey of Current, Challenges and Future](/dossiers/llm-agents-software-engineering-survey.md) — Survey distinguishing direct LLM tools from tool-using software agents across six engineering domains and exposing gaps in benchmark and testing evidence
* [A Survey on Code Generation with LLM-based Agents](/dossiers/code-generation-agents-survey.md) — Methods-first survey of code-generation agents, multi-agent workflows, and evaluation beyond test passing, including security and human-review costs
* [A Comprehensive Survey on Benchmarks and Solutions in Software Engineering of LLM-Empowered Agentic System](/dossiers/software-engineering-agent-benchmarks-survey.md) — Survey mapping agent solution paradigms against software-engineering benchmark families and critiquing function-level pass rates as production-readiness measures
* [The Future of Software Testing: AI-Powered Test Case Generation and Validation](/dossiers/ai-test-generation-validation-baqar-khanda.md) — Narrative review of AI test creation, optimization, and self-healing as a governed CI pipeline; broad benefits are not backed by controlled deployment measurements
* [A Blueprint for AI-Driven Software Quality: Integrating LLMs with Established Standards](/dossiers/standards-aligned-ai-software-quality.md) — Standards-oriented map of LLM quality-assurance activities to ISO, CMMI, and TMM frameworks, emphasizing evidence, ownership, and audit boundaries
* [AI-Driven Tools in Modern Software Quality Assurance: An Assessment of Benefits, Challenges, and Future Directions](/dossiers/ai-driven-software-quality-assurance-pysmennyi.md) — Journal study of generated acceptance tests and browser-agent regression on a demo application, revealing negative-test repair and runaway-loop hazards
* [AI-Generated Test Automation for Autonomous Software Verification: Enhancing Quality Assurance Through AI-Driven Testing](/dossiers/autonomous-test-automation-natarajan.md) — Critical appraisal of a proposed hybrid ML/NLP/RL testing system with precise but unsupported performance tables and an unrelated dataset description
* [NGQA: Next-Gen Software Quality Accelerator using AI Agents and LLM Reasoning](/dossiers/ngqa-software-quality-accelerator.md) — ACM study of a static-analysis-to-patch-and-test pipeline across 70 repositories; four-way test checks reveal both gains and self-generated-oracle limits
* [MTAC-IFBench: Benchmarking Instruction-Following in Multi-Turn Agentic Coding](/dossiers/mtac-ifbench-multi-turn-coding-instructions.md) — A 100-task multi-turn coding benchmark measuring persistent constraints separately from final function and build success
* [WebCraftBench: Evaluating Web Application Generation from a Software Testing Perspective](/dossiers/webcraftbench-web-app-testing.md) — An interactive web-app benchmark using coverage-guided browser exploration and evidence-based visual, usability, and feature assessment
* [TicTacBench: Benchmarking Timing Closure Capabilities of Coding Agents](/dossiers/tictacbench-timing-closure-coding-agents.md) — Thirty RTL repair tasks with formal-equivalence and post-place-and-route timing gates reveal the limits of pre-layout proxies
* [Robustness of LLM-Generated SystemVerilog Assertions to Semantics-Preserving RTL Transformations](/dossiers/sva-robustness-rtl-transformations.md) — Paired metamorphic evaluation shows assertion correctness can flip under RTL rewrites without a corresponding semantic change
* [CausalVerify: An Execution-Grounded Benchmark for LLM Causal Inference Workflows](/dossiers/causalverify-execution-grounded-causal-inference.md) — Execution-grounded benchmark of generated R causal estimates against fixed realized-data references on four design families
* [Supporting Industrial Test-Failure Analysis with LLM-Based Systems: An Experience Report](/dossiers/westermo-llm-test-failure-analysis.md) — Two-scenario Westermo case study compares single- and multi-agent test-log RCA reports on practitioner perceptions, time, and cost
* [EviRCA: Decoupling Evidence Extraction from Reasoning for Microservice Root-Cause Analysis](/dossiers/evirca-microservice-root-cause-analysis.md) — A deterministic anomaly-card and bounded-tool pipeline improves OpenRCA exact diagnosis at lower token and runtime cost than raw-telemetry coding agents
* [Taming Bitwise Behavior in GPU Kernels with Tensor Core: Black-Box Reconstruction, Compiler Enforcement, and Static Verification](/dossiers/gpu-kernel-bitwise-behavior.md) — A GPU numerical reproducibility study reconstructing cuBLAS GEMM arithmetic and checking compiled kernel bitwise classes
* [Effective context engineering for AI agents](/dossiers/effective-context-engineering-ai-agents.md) — Anthropic's practitioner guide to turn-level context curation, unambiguous tools, just-in-time retrieval, and long-horizon compaction, notes, and subagent handoffs; distinguishes vendor advice from comparative evidence
* [Language Models Can Control Their Own Attention](/dossiers/declarative-attention-model-controlled-context.md) — Declarative Attention lets off-the-shelf models declare global, chunk-focused, and local KV reads; fifteen-task ablations show large attention reductions with small average accuracy losses, while wall-time gains remain modeled
* [Retrieval-Augmented Generation for Scientific Code Understanding](/dossiers/scientific-code-understanding-local-rag.md) — A local scientific-C++ code-understanding pipeline amortizes structural parsing and generated explanations into a reusable index; single-repository, LLM-judged results favor a 9B answering model and show weak build guidance
* [SlopShape: Identifying AI-Generated Commercial Web Content](/dossiers/slopshape-structural-ai-commercial-content.md) — SlopShape finds a rewording-resistant structural signature in AI-mirrored B2B blog posts, but its origin classifier must not be conflated with human-judged prose utility or correctness
* [Calibrate Before Use: Improving Few-Shot Performance of Language Models](/dossiers/calibrate-before-use.md) — Contextual calibration corrects prompt-induced answer priors and reduces few-shot sensitivity to example choice, order, and format
* [Rethinking the Role of Demonstrations: What Makes In-Context Learning Work?](/dossiers/rethinking-role-demonstrations-icl.md) — Random-label ablations separating demonstrations' mapping, input-distribution, label-space, and format functions
* [Large Language Models Can Be Easily Distracted by Irrelevant Context](/dossiers/irrelevant-context-distraction.md) — GSM-IC evidence that a single related distractor destabilizes arithmetic reasoning and survives partial mitigation
* [Language Models Don’t Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting](/dossiers/unfaithful-chain-of-thought-explanations.md) — Counterfactual tests of rationalized prompt-induced and stereotype-aligned answers
* [Large Language Models as Optimizers](/dossiers/opro-large-language-models-as-optimizers.md) — OPRO's scored-history candidate generation, search mechanics, gains, and model- and task-specific failures
* [When “A Helpful Assistant” Is Not Really Helpful](/dossiers/personas-system-prompts-not-helpful.md) — A 162-persona study finding no reliable factual-accuracy gain from bare speaker or audience roles
* [State of What Art? A Call for Multi-Prompt LLM Evaluation](/dossiers/multi-prompt-llm-evaluation.md) — A 6.5M-instance study of prompt-dependent scores, rankings, and purpose-specific multi-prompt metrics
* [Optimizing Instructions and Demonstrations for Multi-Stage Language Model Programs](/dossiers/mipro-multistage-prompt-optimization.md) — MIPRO's joint search over module instructions and bootstrapped demonstration sets
* [Let Me Speak Freely? A Study on the Impact of Format Restrictions on Performance of Large Language Models](/dossiers/format-restrictions-llm-performance.md) — Task-dependent schema and constrained-decoding effects, including the later prompt-and-parser confound dispute
* [DeepSeek-R1: Reasoning Through Reinforcement Learning](/dossiers/deepseek-r1.md) — Reconciles the Nature article and expanded report on verifier-driven reasoning, distillation, and prompt-format contingencies
* [Reasoning Models Don’t Always Say What They Think](/dossiers/reasoning-models-unfaithful-chain-of-thought.md) — Causal hint-pair and reward-hacking evidence that reasoning traces often omit answer-changing shortcuts
* [Revisiting Chain-of-Thought Prompting: Zero-shot Can Be Stronger than Few-shot](/dossiers/zero-shot-stronger-than-few-shot-cot.md) — Capability-dependent few-shot effects and evidence that examples can mainly enforce answer format
* [GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning](/dossiers/gepa-reflective-prompt-evolution.md) — Trace-grounded prompt mutation and instance-wise Pareto selection under rollout-matched comparisons
* [Textual Gradients are a Flawed Metaphor for Automatic Prompt Optimization](/dossiers/textual-gradients-flawed-metaphor.md) — Ablations separating useful prompt search from unsupported gradient-like mechanism claims
* [Optimization before Evaluation: Evaluation with Unoptimized Prompts Can be Misleading](/dossiers/optimization-before-evaluation.md) — Per-model prompt optimization that reorders application-centric model rankings
* [Prompting Science Report 4: Playing Pretend: Expert Personas Don't Improve Factual Accuracy](/dossiers/expert-personas-factual-accuracy.md) — Repeated-sampling evidence against a general factual-accuracy benefit from expert roles
* [An update on recent Claude Code quality reports](/dossiers/anthropic-claude-code-quality-postmortem.md) — Postmortem of reasoning-effort, history-deletion, and global-prompt regressions in Claude Code
* [Context Rot: How Increasing Input Tokens Impacts LLM Performance](/dossiers/context-rot-long-context-performance.md) — Controlled long-context evidence on ambiguity, distractors, structure, retrieval burden, and output length
* [Demystifying evals for AI agents](/dossiers/demystifying-agent-evals.md) — Production guidance on capability and regression suites, repeated-trial metrics, outcomes, trajectories, and graders
* [Say What You Mean: A Response to 'Let Me Speak Freely'](/dossiers/say-what-you-mean-structured-output.md) — Vendor rebuttal identifying prompt and parser confounds in constrained-generation evaluation
* [Prompting best practices](/dossiers/claude-prompting-best-practices.md) — Anthropic's living Claude guide, split between durable mechanics and model-specific claims
* [Codex Prompting Guide](/dossiers/openai-codex-prompting-guide.md) — OpenAI's model-specific GPT-5.3-Codex harness, tool, phase-metadata, instruction-loading, and compaction guidance
* [GPT-5 prompting guide](/dossiers/openai-gpt-5-prompting-guide.md) — OpenAI guidance on reasoning effort, verbosity, autonomy, instruction hygiene, and coding harnesses
* [To CoT or Not to CoT? Chain-of-Thought Helps Mainly on Math and Symbolic Reasoning](/dossiers/to-cot-or-not-to-cot.md) — Meta-analysis and 14-model evidence that prompt-based CoT gains concentrate in mathematical and symbolic execution, where external solvers usually perform better
* [WikiSkill: Compiling Agent Experience into Persistent Knowledge for Skill Evolution](/dossiers/wikiskill-persistent-knowledge-skill-evolution.md) — Persistent raw/wiki/skill layers for validation-gated, transferable agent skill evolution
* [Measuring AI “Slop” in Text](/dossiers/measuring-ai-slop-in-text.md) — Human-centered, purpose-sensitive taxonomy of text defects and evidence that generic metrics and prompted LLM judges poorly reproduce expert assessments
* [ASD-STE100 Simplified Technical English and Artificial Intelligence](/dossiers/asd-ste100-ai-assisted-technical-writing.md) — STEMG position on supervised, accountable AI assistance for controlled technical writing
* [You Only Need the Frontier Model for One Single Edit](/dossiers/prewalk-trajectory-preserving-model-handoff.md) — Prewalk's live-trajectory handoff from a frontier coding model to a cheaper executor after the first edit
* [Snapcompact: SoTA Compaction — Instant, Local, Free. Pick 3](/dossiers/snapcompact-pixel-context-carriers.md) — Dense pixel-font images as long-context carriers, with cost/fidelity benchmarks and visual-decoding probes
* [Batch Size-invariance for Policy Optimization](/dossiers/batch-size-invariance-policy-optimization.md) — PPO/PPG analysis that separates sampling-policy correction from update-proximity control and derives small-batch EWMA scaling rules
* [Exploring Length Generalization in Large Language Models](/dossiers/exploring-length-generalization-language-models.md) — Controlled evidence that short-instance fine-tuning and scratchpads can fail to extrapolate, while few-shot scratchpads can activate a compatible pretrained sequential template
* [Executable Code Actions Elicit Better LLM Agents](/dossiers/executable-code-actions-llm-agents.md) — CodeAct’s executable-Python agent action language for tool composition, state reuse, execution feedback, and instruction tuning
* [Kimi Linear: An Expressive, Efficient Attention Architecture](/dossiers/kimi-linear-attention-architecture.md) — Hybrid Kimi Delta Attention/global-attention architecture for long-context quality, fixed-state decoding, and KV-cache-efficient serving
* [LatentMoE: Toward Optimal Accuracy per FLOP and Parameter in Mixture of Experts](/dossiers/latentmoe.md) — Hardware-aware latent expert computation that trades routed width for expert diversity, serving cost, and accuracy
* [Kimi K2.5: Visual Agentic Intelligence](/dossiers/kimi-k2-5-visual-agentic-intelligence.md) — Multimodal post-training and Agent Swarm orchestration with learned parallel decomposition, critical-step objectives, and context sharding
* [Attention Residuals](/dossiers/attention-residuals.md) — Input-dependent depth-wise attention residuals and a blockwise scalable implementation for more selective cross-layer information flow
* [Latent-GRPO: Group Relative Policy Optimization for Latent Reasoning](/dossiers/latent-grpo.md) — Latent-reasoning RL with validity masking, aligned one-sided noise, correct-path selection, and shorter reasoning traces
* [The Reasoning Trap: How Enhancing LLM Reasoning Amplifies Tool Hallucination](/dossiers/reasoning-trap-tool-hallucination.md) — Controlled evidence on unavailable or distractor tools, reasoning-enhancement-associated tool hallucination, and the reliability-capability trade-off
* [Are Tools All We Need? Unveiling the Tool-Use Tax in LLM Agents](/dossiers/tool-use-tax-llm-agents.md) — Factorized analysis of function-call formatting, protocol overhead, execution gain, and capability overlap under semantic distractors
* [LLM Agents Already Know When to Call Tools – Even Without Reasoning](/dossiers/when2tool-tool-call-decisions.md) — WHEN2TOOL benchmark and hidden-state probe for calibrated direct-answer versus tool-call routing
* [ReviewEval: An Evaluation Framework for AI-Generated Reviews](/dossiers/revieweval-ai-generated-reviews.md) — Multi-axis framework for generated scholarly reviews: factuality, actionability, depth, human-reference alignment, and guideline adherence
* [DeepReview: Improving LLM-based Paper Review with Human-like Deep Thinking Process](/dossiers/deepreview-structured-llm-paper-review.md) — Three-stage evidence-grounded paper review, DeepReviewer-14B, dual-axis test-time scaling, and bounded adversarial-resilience evidence
* [Rethinking the Evaluation of Harness Evolution for Agents](/dossiers/rethinking-harness-evolution-evaluation.md) — Controlled evidence that reusable harness evolution needs feedback-budget-matched task-discovery baselines and held-out transfer tests
* [Self-Improvements in Modern Agentic Systems: A Survey](/dossiers/self-improvements-modern-agentic-systems-survey.md) — Systems taxonomy separating foundation-model updates from prompt, memory, tool, and full-scaffold self-improvement
* [MemoHarness: Agent Harnesses That Learn from Experience](/dossiers/memoharness-agent-harnesses-experience.md) — Six-dimensional agent harness that retrieves per-case and global experience to adapt without test-time labels
* [Beyond Imitation: A Framework and Benchmark for LLM-Assisted Peer Review](/dossiers/beyond-imitation-llm-assisted-peer-review.md) — Under-review verification-centric peer-review benchmark with graph-grounded synthetic contradictions and manipulation tests
* [Adversarial Machine Learning: A Review of Methods, Tools, and Critical Industry Sectors](/dossiers/adversarial-machine-learning-review-critical-sectors.md) — Broad AML survey of evasion, privacy, poisoning, defenses, benchmarks, and safety-critical deployment domains
* [Isolation Approaches for Concurrent AI Coding Agents: A Synthesis](/dossiers/isolation-approaches-concurrent-ai-coding-agents-synthesis.md) — Local synthesis distinguishing context, workspace, runtime, service, credential, and integration boundaries for parallel coding agents
* [Isolation Approaches for Parallel AI Coding Agents — A Deep Research Report](/dossiers/multi-agent-isolation-deep-research.md) — Time-sensitive generated landscape report on worktrees, sandboxes, external state, and merge coherence
* [Multi-Agent Coding Isolation: Architectures, Implementations, and Trade-offs](/dossiers/multi-agent-coding-isolation-report.md) — Layered control-plane reference architecture for parallel agent workspaces, services, credentials, and integration
* [Locking Down Science Gateways with Landlock and Seccomp](/dossiers/locking-down-science-gateways-landlock-seccomp.md) — Runtime Landlock/Seccomp confinement for MPI science codes and a public gateway shim, with explicit limits around UDP, resources, kernel bugs, and policy design
* [AI Sandboxes: A Threat Model, Taxonomy, and Measurement Framework](/dossiers/ai-sandboxes-threat-model-measurement-framework.md) — Assurance-oriented framework that bounds AI sandbox claims by explicit assumptions, evidence artifacts, and the weakest claim-relevant dimension
* [Agents’ Last Exam](/dossiers/agents-last-exam.md) — Benchmark of long-horizon, deliverable-verified professional workflows for generalist computer-use agents across 55 industry subdomains
* [Codebase-Memory: Tree-Sitter-Based Knowledge Graphs for LLM Code Exploration via MCP](/dossiers/codebase-memory-tree-sitter-knowledge-graphs.md) — Persistent Tree-Sitter/SQLite code graph for MCP-based structural exploration, incremental refresh, hybrid source fallback, and tool-server supply-chain controls
* [Automatic Prompt Optimization for Dataset-Level Feature Discovery](/dossiers/automatic-prompt-optimization-dataset-level-feature-discovery.md) — Multi-agent prompt optimization for a shared, interpretable text-feature schema using downstream performance and label-proxy resistance
* [AutoPDL: Automatic Prompt Optimization for LLM Agents](/dossiers/autopdl-automatic-prompt-optimization-llm-agents.md) — Joint AutoML search over executable Zero-Shot, CoT, ReWOO, and ReAct programs, instructions, and few-shot demonstrations
* [A Survey of Automatic Prompt Optimization with Instruction-focused Heuristic-based Search Algorithm](/dossiers/automatic-prompt-optimization-heuristic-search-survey.md) — Five-axis taxonomy of instruction-focused automatic prompt optimization by space, target, objective, operator, and search algorithm
* [Brevity Constraints Reverse Performance Hierarchies in Language Models](/dossiers/brevity-constraints-reverse-performance-hierarchies.md) — Preprint on item-level inverse scaling under fixed prompts and the task-dependent effects of concise-response instructions
* [Large Language Models Are Human-Level Prompt Engineers](/dossiers/automatic-prompt-engineer.md) — Automatic Prompt Engineer: black-box instruction proposal, target-model scoring, and selection from demonstrations
* [Agentic Context Engineering](/dossiers/agentic-context-engineering.md) — Evolving context playbooks for self-improving LLM agents and domain reasoning
* [Are We Ready For An Agent-Native Memory System?](/dossiers/agent-native-memory-system-readiness.md) — Data-management evaluation of agent-memory architecture, evidence retrieval, update robustness, long-horizon stability, and operational cost
* [AXI: Agent eXperience Interface](/dossiers/axi-agent-experience-interface.md) — Ten testable principles for bounded, discoverable agent-facing CLI interfaces and fused action-observation operations
* [The Balkanization of Execution-Security Research for AI Coding Agents](/dossiers/execution-security-research-ai-coding-agents.md) — SoK of 39 papers on coding-agent execution security, connecting sandboxing, access control, TOCTOU, MCP, policy fragility, and scope creep through four failure patterns and five gaps
* [A Systematic Survey of Automatic Prompt Optimization Techniques](/dossiers/automatic-prompt-optimization-techniques.md) — Five-part taxonomy of black-box automatic prompt optimization: seed prompts, feedback, candidate generation, retention, and iteration control
* [MAS-PromptBench: When Does Prompt Optimization Improve Multi-Agent LLM Systems?](/dossiers/mas-promptbench.md) — Controlled benchmark of how prompt optimization varies with MAS task, topology, communication protocol, and team size
* [Guest post: AI Inference Is Breaking Unit Economics](/dossiers/ai-inference-unit-economics.md) — Practitioner overview of AI inference cost as a unit-economics constraint and the serving techniques used to control it
* [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](/dossiers/chain-of-thought-prompting-elicits-reasoning.md) — Foundational few-shot chain-of-thought paper on intermediate reasoning demonstrations, scaling, and model-generated rationale limits
* [Emergent Abilities of Large Language Models](/dossiers/emergent-abilities-large-language-models.md) — TMLR 2022 survey defining scale-threshold emergence and cataloging phase-transition curves for few-shot tasks and augmented prompting strategies
* [The Power of Scale for Parameter-Efficient Prompt Tuning](/dossiers/power-of-scale-prompt-tuning.md) — Foundational soft-prompt-tuning paper showing learned continuous prompts on frozen T5 close the gap with model tuning as scale increases
* [Context Engineering: From Prompts to Corporate Multi-Agent Architecture](/dossiers/context-engineering-corporate-multi-agent-architecture.md) — Practitioner framework for engineered agent state, explicit organizational intent, and machine-readable specifications
* [Prompting Science Report 2: The Decreasing Value of Chain of Thought in Prompting](/dossiers/decreasing-value-chain-of-thought-prompting.md) — GPQA evidence that generic explicit CoT has model- and reliability-dependent value and can impose substantial latency
* [DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines](/dossiers/dspy-compiling-declarative-language-model-calls.md) — Original DSPy paper on declarative LM programs, trace bootstrapping, and metric-driven pipeline compilation
* [Defeating Prompt Injections by Design](/dossiers/defeating-prompt-injections-by-design.md) — CaMeL architecture for isolating untrusted parsing from planning and enforcing provenance-aware, per-tool capability policies
* [Self-Consistency Improves Chain of Thought Reasoning in Language Models](/dossiers/self-consistency-improves-chain-of-thought-reasoning.md) — ICLR 2023 paper on sampling diverse reasoning paths and voting over final answers instead of greedily decoding one chain
* [SCOPE: Prompt Evolution for Enhancing Agent Effectiveness](/dossiers/scope-prompt-evolution-agent-effectiveness.md) — Trace-driven, step-level prompt evolution with scoped guideline memory, persistent-memory consolidation, and efficiency/thoroughness strategy streams
* [Exploring Prompt Engineering](/dossiers/exploring-prompt-engineering-swot.md) — Systematic prompt-engineering review with linguistic framing, SWOT analysis, technique taxonomy, and evaluation metrics
* [From Prompts to Contracts: Harness Engineering for Auditable Enterprise LLM Agents](/dossiers/auditable-enterprise-llm-harness.md) — Contract-based enterprise LLM harness with source-backed claim admission, audit traces, output validation, and deterministic fallback composition
* [Structured Context Engineering for File-Native Agentic Systems](/dossiers/structured-context-engineering-file-native-agents.md) — Empirical comparison of file-native schema retrieval, prompt injection, formats, model tiers, and partitioned navigation for agentic text-to-SQL
* [How AI Agent Memory Works](/dossiers/how-ai-agent-memory-works.md) — Interactive primer on agent memory as context construction, governed storage, hybrid retrieval, and production infrastructure
* [Is Grep All You Need? How Agent Harnesses Reshape Agentic Search](/dossiers/grep-agent-harnesses-agentic-search.md) — LongMemEval study of lexical and vector search across agent harnesses, result-delivery paths, and distractor history
* [Language Models are Few-Shot Learners](/dossiers/language-models-are-few-shot-learners.md) — Foundational GPT-3 paper on in-context learning, scaling, and benchmark contamination
* [Don't Generate, Classify! Low-Latency Prompt Optimization with Structured Complementary Prompt](/dossiers/low-latency-prompt-optimization-structured-complementary-prompt.md) — EACL 2026 classifier-based system-prompt optimization with an eight-field schema, fixed renderer, and latency-quality trade-off
* [MASTE: A Multi-Agent Pipeline for Zero-Shot Aspect Sentiment Triplet Extraction](/dossiers/maste-zero-shot-aspect-sentiment-triplet-extraction.md) — Training-free, staged LLM extraction of verbatim aspect–opinion–sentiment triplets with triplet-set consistency checks
* [Multi-Agent Design: Optimizing Agents with Better Prompts and Topologies](/dossiers/multi-agent-design-prompts-topologies.md) — Three-stage Mass search that prompt-optimizes agent blocks, prioritizes topology choices by validation benefit, and adapts prompts to the selected workflow
* [MASPO: Joint Prompt Optimization for LLM-based Multi-Agent Systems](/dossiers/maspo-joint-prompt-optimization.md) — Trace-driven multi-agent prompt optimization using local, successor, and final-outcome evaluation with misalignment-case sampling and beam refresh
* [Least-to-Most Prompting Enables Complex Reasoning in Large Language Models](/dossiers/least-to-most-prompting.md) — Decomposition-and-sequential-solving prompting for easy-to-hard reasoning generalization
* [Large Language Models are Zero-Shot Reasoners](/dossiers/large-language-models-are-zero-shot-reasoners.md) — Foundational Zero-shot-CoT paper on eliciting stepwise reasoning without worked examples
* [Lost in the Middle: How Language Models Use Long Contexts](/dossiers/lost-in-the-middle-long-contexts.md) — Controlled evidence-position evaluation showing that long-context models often underuse relevant information in the middle of an input
* [Mergeable by Default](/dossiers/context-engineering-talk.md) — Context engine design for coding agents, organizational memory, conflict handling, and permissions
* [PaperOrchestra](/dossiers/paperorchestra.md) — Multi-agent framework for automated AI research paper writing
* [Performance vs Practicality: A Comparison of vLLM and Ollama](/dossiers/vllm-ollama-performance-practicality.md) — Practitioner benchmark and deployment trade-off analysis of concurrency-oriented vLLM and locally convenient Ollama
* [Remember When It Matters](/dossiers/proactive-memory-agent.md) — Proactive memory intervention for long-horizon agents
* [Prompt Engineering is Complicated and Contingent](/dossiers/prompt-engineering-complicated-contingent.md) — Empirical report on benchmark scoring thresholds and contingent prompt effects
* [Prompt Coach: An Empirical Evaluation of an Agentic Tutor for Learning Prompt Engineering in Software Development](/dossiers/prompt-coach-agentic-tutor.md) — IDE-embedded multi-agent tutor that teaches code-generation prompting through dimensional assessment and Socratic guidance
* [Promptomatix: An Automatic Prompt Optimization Framework for Large Language Models](/dossiers/promptomatix-automatic-prompt-optimization.md) — Zero-configuration prompt-optimization wrapper that infers configuration, generates synthetic data, selects a backend and metric, and supports feedback-driven re-optimization
* [Prompting Complexity: Shortest Prompts for Texts and Behaviors in LLMs](/dossiers/prompting-complexity.md) — Theoretical framework for model-relative shortest prompts, approximate output generation, prompt causes, and behavioral controllability
* [Prompt Engineering Survey](/dossiers/prompt-engineering-survey.md) — Comprehensive survey of prompt engineering techniques for LLMs and VLMs
* [The Prompt Report: A Systematic Survey of Prompt Engineering Techniques](/dossiers/prompt-report.md) — PRISMA-grounded taxonomy of prompting methods, output extraction, evaluation, safety, and engineering practice
* [ReAct: Synergizing Reasoning and Acting in Language Models](/dossiers/react-synergizing-reasoning-and-acting.md) — Primary ReAct paper on interleaving thoughts, tool actions, and observations for grounded reasoning and decision making
* [Reducing Cost of LLM Agents with Trajectory Reduction](/dossiers/reducing-cost-of-llm-agents-trajectory-reduction.md) — AgentDiet's delayed local reflection module removes obsolete, redundant, and verbose coding-agent trajectory content while measuring total cost and task success
* [Reducing Token Usage of State-in-Context Agents using Minification](/dossiers/minified-state-in-context-agents.md) — DirectSolve replication and SWE-bench study of Python-code minification as a context-cost versus repair-success trade-off
* [Reducing Token Usage of Software Engineering Agents](/dossiers/reducing-token-usage-software-engineering-agents.md) — TU Wien thesis on source-code minification in a state-in-context repair agent, its 42% repair-input reduction, and the associated patch-validity trade-offs
* [Smarter AI Through Prompt Engineering](/dossiers/smarter-ai-through-prompt-engineering.md) — Review of prompt engineering case studies, optimization frameworks, and data science deployment tradeoffs
* [Stop Wasting Your Tokens: Towards Efficient Runtime Multi-Agent Systems](/dossiers/supervisoragent-efficient-runtime-multi-agent-systems.md) — Runtime meta-agent supervision that gates error correction, inefficiency guidance, and observation purification to reduce MAS token use
* [A Systematic Survey of Prompt Engineering in Large Language Models](/dossiers/systematic-survey-prompt-engineering-llms.md) — Application-centric taxonomy of prompt engineering techniques for LLMs
* [A Survey of Prompt Engineering Methods in Large Language Models for Different NLP Tasks](/dossiers/survey-prompt-engineering-methods-nlp-tasks.md) — Task-centered map of 39 prompting methods, 29 NLP tasks, datasets, model families, and conditional reported leaders
* [TextGrad: Automatic “Differentiation” via Text](/dossiers/textgrad-automatic-differentiation-via-text.md) — Computation-graph framework for propagating LLM textual critiques to optimize compound AI-system components
* [Tree of Thoughts: Deliberate Problem Solving with Large Language Models](/dossiers/tree-of-thoughts-deliberate-problem-solving.md) — Inference-time LLM reasoning via thought-level generation, self-evaluation, and tree search
* [Unifying Temporal and Structural Credit Assignment in LLM-Based Multi-Agent Prompt Optimization](/dossiers/temporal-structural-credit-assignment-multi-agent-prompt-optimization.md) — Credit-guided test-time refinement that targets weak recurring roles and aggregation rounds in multi-agent reasoning
* [Validating Agentic Behavior When Correct Isn't Deterministic](/dossiers/validating-agentic-behavior.md) — GitHub's dominator-analysis Trust Layer for validating non-deterministic computer-use agent execution from successful traces
* [vLLM or llama.cpp: Choosing the right LLM inference engine for your use case](/dossiers/vllm-or-llamacpp-inference-engine-selection.md) — Red Hat's controlled H200 comparison of concurrency-oriented vLLM and portability-oriented llama.cpp serving
* [Continually Improving Our Agent Harness](/dossiers/continually-improving-agent-harness.md) — Cursor's dynamic-context, layered-evaluation, reliability, and model-adaptation practices for coding agents
* [Designing, Refining, and Maintaining Agent Skills at Perplexity](/dossiers/designing-refining-maintaining-agent-skills-perplexity.md) — Perplexity's guide to Skill routing, progressive context, evaluations, and failure-driven maintenance
* [What You're Actually Writing When You Write a SKILL.md](/dossiers/skill-md-loader-specification.md) — Skill architecture as staged context loading, with portable environment guidance and model-aware evaluation
* [What to Keep, What to Forget: A Rate–Distortion View of Memory Compaction in LLMs and Agents](/dossiers/rate-distortion-memory-compaction.md) — Survey framing KV, prompt, architectural, and agent-memory compaction as a shared rate–distortion decision
* [TERAG: Token-Efficient Graph-Based Retrieval-Augmented Generation](/dossiers/terag-token-efficient-graph-rag.md) — Token-budgeted graph RAG that combines one-pass LLM concept extraction, deterministic graph construction, and frequency-aware personalized PageRank
* [TeaRAG: A Token-Efficient Agentic Retrieval-Augmented Generation Framework](/dossiers/tearag-token-efficient-agentic-rag.md) — Agentic hybrid RAG that packs co-occurring chunks and triplets with PPR and trains concise evidence-gathering paths with process-aware DPO
* [ISOLATE GPT: An Execution Isolation Architecture for LLM-Based Agentic Systems](/dossiers/isolate-gpt-execution-isolation-agentic-systems.md) — Hub-and-spoke execution isolation for third-party LLM apps, with typed mediated collaboration and permission-gated cross-app data flow
* [Design Patterns for Securing LLM Agents against Prompt Injections](/dossiers/design-patterns-securing-llm-agents-prompt-injections.md) — System-design patterns that constrain how untrusted language can influence an agent's tools, control flow, and privileged context
* [Parallax: Why AI Agents That Think Must Never Act](/dossiers/parallax-architecturally-safe-autonomous-execution.md) — Proposed process-separated agent architecture with independent action validation, sensitivity tracking, rollback, and compromise-assuming boundary tests
* [Quantifying Frontier LLM Capabilities for Container Sandbox Escape](/dossiers/sandbox-escape-benchmark.md) — Nested-sandbox CTF evaluation of agentic container escape across known orchestration, runtime, and kernel weakness classes
* [Agent-Sentry: Bounding LLM Agents via Execution Provenance](/dossiers/agent-sentry-execution-provenance.md) — Runtime defense that learns provenance-aware bounds on tool actions, using deterministic checks for routine calls and a bounded LLM judge for residual ambiguity
* [Architecting Secure AI Agents: Perspectives on System-Level Defenses Against Indirect Prompt Injection Attacks](/dossiers/architecting-secure-ai-agents.md) — Position paper advocating security-aware dynamic replanning, bounded learned judgments over structured artifacts, and human resolution of irreducibly ambiguous security decisions
* [Aligning Provenance with Authorization: A Dual-Graph Defense for LLM Agents](/dossiers/authgraph-dual-graph-defense.md) — AUTHGRAPH aligns a clean authorization graph with execution provenance to block unauthorized tools and wrong-source parameters
* [Sandlock: Confining AI Agent Code with Unprivileged Linux Primitives](/dossiers/sandlock-unprivileged-linux-agent-sandbox.md) — Unprivileged Linux agent sandbox that compiles static policy into Landlock/seccomp and uses a narrow, TOCTOU-conscious supervisor for dynamic decisions and reversible effects
* [AI Code Sandboxes: A Comparative Security Study — Engine-Level Properties](/dossiers/ai-code-sandboxes-engine-level-security-study.md) — Six-axis, time-bounded comparison of sandbox engine surface, leakage, hardening compatibility, CVE history, patch propagation, and public fuzzing posture
* [Source Access Is a Systems Property](/dossiers/ai-assistant-source-access-and-retrieval-partnerships.md) — Dated comparative map of how assistant hosts, licenses, crawler permissions, source adapters, and connectors — not model weights — determine retrievable evidence

* [SelfCheckGPT: Zero-Resource Black-Box Hallucination Detection](/dossiers/selfcheckgpt-zero-resource-black-box-hallucination-detection.md) — Black-box factuality triage by measuring claim agreement across stochastic model samples

* [Just Ask for Calibration](/dossiers/just-ask-for-calibration.md) — Evidence that directly elicited confidence can be more calibrated than answer-token probabilities in 2023 RLHF language models

* [Universal and Transferable Adversarial Attacks on Aligned Language Models](/dossiers/universal-transferable-adversarial-attacks-aligned-language-models.md) — GCG automated jailbreak optimization and the 2023 evidence for cross-model transfer

* [The Dawn of LMMs: Preliminary Explorations with GPT-4V(ision)](/dossiers/dawn-of-lmms-gpt-4-vision.md) — 2023 qualitative map of early GPT-4V multimodal interaction patterns and proposed applications

* [Quantifying Language Models' Sensitivity to Spurious Features in Prompt Design](/dossiers/quantifying-language-models-sensitivity-spurious-features-prompt-design.md) — FORMAT SPREAD evidence that semantically equivalent few-shot formatting can radically change reported accuracy

* [Efficient Prompting Methods for Large Language Models: A Survey](/dossiers/efficient-prompting-methods-large-language-models-survey.md) — 2024 taxonomy of prompt compression and automatic prompt optimization

* [PEARL: Self-Evolving Assistant for Time Management with Reinforcement Learning](/dossiers/pearl-self-evolving-assistant-time-management-reinforcement-learning.md) — Long-horizon preference-memory and RL approach to synthetic calendar conflict resolution

* [Function Calling](/dossiers/function-calling.md) — Captured OpenAI guide for model-proposed, application-executed structured tool calls
* [Memory Caching: RNNs with Growing Memory](/dossiers/memory-caching-rnns-growing-memory.md) — Per-segment recurrent memory checkpoints that let effective memory grow with sequence length, interpolating between RNN and Transformer cost and closing most of the recall gap

* [GEO: Generative Engine Optimization](/dossiers/geo-generative-engine-optimization.md) — KDD '24 paper naming the GEO paradigm, defining citation-level visibility metrics, and measuring nine black-box content rewrites on GEO-bench and Perplexity.ai
* [The Impact of AI-Powered Search on SEO: The Emergence of Answer Engine Optimization](/dossiers/ai-powered-search-seo-answer-engine-optimization.md) — Questionnaire study framing the shift from link ranking to Answer Engine Optimization, zero-click answers, and the resulting measurement gap
* [Answer Engine Optimization: A Measurement Framework for Brand Visibility in Generative AI Search](/dossiers/answer-engine-optimization-measurement-framework.md) — Practitioner framework proposing presence, citation, sentiment, and crawler-traffic signals, citation half-life, and AI bot traffic classes
* [Causal Influence Control for Persistent Memory in Language Model Systems](/dossiers/causal-influence-control-persistent-memory.md) — Architecture preprint treating memory recall as a reversible, observed intervention with predicted influence signatures, side-effect budgets, rollback, and lineage
* [What Generative Search Engines Like and How to Optimize Web Content Cooperatively](/dossiers/autogeo-generative-engine-optimization.md) — AutoGEO's mined generative-engine preference rules, prompt-based and RL-trained rewriters, and joint visibility/answer-utility evaluation

* [Generative Engine Optimization: How to Dominate AI Search](/dossiers/generative-engine-optimization-dominate-ai-search.md) — August 2025 citation audit of ChatGPT, Claude, Gemini, and Perplexity against Google, finding earned-media dominance, disjoint per-engine source ecosystems, and a big-brand default

* [Frontis-MA1: Training an AI4AI Model towards Recursive Self-Improvement in Machine Learning Engineering](/dossiers/frontis-ma1-ai4ai-recursive-self-improvement.md) — Open MLE stack that post-trains Draft/Improve/Debug/Crossover operators on execution feedback and composes the same operators into experience-guided long-horizon search

* [Introducing AI Performance in Bing Webmaster Tools (Public Preview)](/dossiers/bing-webmaster-tools-ai-performance.md) — Microsoft's publisher-facing citation telemetry for Copilot and Bing AI answers, its metric definitions and disclaimers, and what citation counts can and cannot establish

* [Optimizing Your Website for Generative AI Features on Google Search](/dossiers/google-search-generative-ai-optimization-guide.md) — Google Search Central's official AI Overviews/AI Mode guidance: RAG grounding and query fan-out, snippet-gated eligibility, and the AEO/GEO tactics Google says it ignores

* [Generative Engine Optimization in Practice](/dossiers/generative-engine-optimization-implementation-guide.md) — Locally authored, framework-agnostic synthesis of two practitioner GEO guides into a pipeline model, nine implementation areas, and a citation-based measurement loop

* [PromptBridge: Cross-Model Prompt Transfer for Large Language Models](/dossiers/promptbridge-cross-model-prompt-transfer.md) — Training-free prompt-library migration via model-specific calibration, distilled source→target prompt mappings, and unseen-task adaptation

* [Towards Understanding Sycophancy in Language Models](/dossiers/understanding-sycophancy-language-models.md) — SycophancyEval's four free-form metrics across five production assistants, and evidence that human preference data and preference models reward matching the user's beliefs
* [Sycophancy in Large Language Models: Causes and Mitigations](/dossiers/sycophancy-large-language-models-causes-mitigations.md) — Technical survey mapping sycophancy measurement methods, four causal factors, and five mitigation families by intervention point, with unreliable citations
* [Verbosity Bias in Preference Labeling by Large Language Models](/dossiers/verbosity-bias-preference-labeling-llms.md) — Evidence that GPT-4 judges favor longer answers beyond human preference, plus a signed accuracy-parity metric for verbosity bias
* [Verbosity ≠ Veracity: Demystify Verbosity Compensation Behavior of Large Language Models](/dossiers/verbosity-compensation-large-language-models.md) — Names and benchmarks verbosity compensation across 14 models and 5 QA datasets, ties padded answers to model uncertainty and a 8–20 point accuracy gap, and mitigates it with a verbosity-triggered cascade
* [Bias Fitting to Mitigate Length Bias of Reward Model in RLHF](/dossiers/fimi-rm-bias-fitting-length-bias.md) — FiMi-RM's warm-up/fit/debias staging, where a 6.4K-parameter probe fits the non-linear length–reward curve and the reward model is trained to decorrelate from it
* [Principled Instructions Are All You Need for Questioning LLaMA-1/2, GPT-3.5/4](/dossiers/principled-instructions-questioning-llms.md) — 26 directive-level prompt principles in five surface categories, paired human-evaluated on ATLAS with quality and correctness tracks and gains that grow with model scale
* [Steering Large Language Models with Register Analysis for Arbitrary Style Transfer](/dossiers/register-analysis-arbitrary-style-transfer.md) — Prompting that anchors an LLM's intermediate style description to Biber's register-analysis framework, with a contrastive variant and target-overlap checks on exemplar copying
* [PEEM: Prompt Engineering Evaluation Metrics for Interpretable Joint Evaluation of Prompts and Responses](/dossiers/peem-prompt-engineering-evaluation-metrics.md) — Nine-axis LLM-judge rubric scoring prompt and response separately with per-criterion rationales, validated against accuracy, humans, paraphrases, and adversarial rewrites, then reused as rewriting feedback
* [Large Language Models Are Biased Because They Are Large Language Models](/dossiers/llms-are-biased-because-they-are-llms.md) — Position paper arguing harmful bias is an in-principle consequence of purely distributional language modeling, not a defect that RLHF-style mitigation can remove
* [Scaling Instruction-Finetuned Language Models](/dossiers/scaling-instruction-finetuned-language-models.md) — Flan-PaLM/Flan-T5's joint scaling of task count, model size, and chain-of-thought data, with the ablation showing that a mixture missing a prompting paradigm degrades that paradigm below the no-finetuning baseline

## Vault

* [Bounded Hybrid Coding Workflow](/vault/bounded-hybrid-coding-workflow.md)
* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md)
* [Calibrated Code-Review Rules](/vault/calibrated-code-review-rules.md)
* [Risk-Tiered Review and Approval](/vault/risk-tiered-review-and-approval.md)
* [Repository Drift Garbage Collection](/vault/repository-drift-garbage-collection.md)
* [Repository-Relative Code Quality](/vault/repository-relative-code-quality.md)
* [Reviewable Change Units](/vault/reviewable-change-units.md)
* [Skill Artifact Quality Gates](/vault/skill-artifact-quality-gates.md)
* [Skill Supply-Chain Admission](/vault/skill-supply-chain-admission.md)
* [Verifier Co-Evolution Under Optimization](/vault/verifier-co-evolution.md)
* [Safety-Constrained Regression Test Selection](/vault/safety-constrained-regression-test-selection.md)
* [Evidence-Gated Static Warning Repair](/vault/evidence-gated-static-warning-repair.md)
* [Cross-Version Differential Oracles](/vault/cross-version-differential-oracles.md)
* [Structural Origin Signals Versus Content Quality](/vault/structural-origin-signals-versus-content-quality.md)
* [Normative-Source-Grounded AI Assistance](/vault/normative-source-grounded-ai-assistance.md)
* [Trajectory-Preserving Model Handoff](/vault/trajectory-preserving-model-handoff.md)
* [Cross-Modal Context Carrier](/vault/cross-modal-context-carrier.md)
* [Sample-Consistency Hallucination Detection](/vault/sample-consistency-hallucination-detection.md)
* [Staged Evidence-Grounded Judgment](/vault/staged-evidence-grounded-judgment.md)
* [Dual-Axis Judge Test-Time Scaling](/vault/dual-axis-judge-test-time-scaling.md)
* [Decomposition-Induced Injection Resistance](/vault/decomposition-induced-injection-resistance.md)
* [Decoupled Behavior and Proximal Policies](/vault/decoupled-behavior-proximal-policies.md)
* [Executable Code Actions](/vault/executable-code-actions.md)
* [Hybrid Linear–Global Attention](/vault/hybrid-linear-global-attention.md)
* [Latent-Space Expert Routing](/vault/latent-space-expert-routing.md)
* [Depth-Wise Attention Residuals](/vault/depth-wise-attention-residuals.md)
* [Manifold-Safe Latent Reinforcement Learning](/vault/manifold-safe-latent-rl.md)
* [Tool-Availability Abstention](/vault/tool-availability-abstention.md)
* [Tool-Use Protocol Tax](/vault/tool-use-protocol-tax.md)
* [Latent Tool-Necessity Routing](/vault/latent-tool-necessity-routing.md)
* [Hook-Driven tmux Agent Transport](/vault/hook-driven-tmux-agent-transport.md)
* [Budget-Matched Harness-Evolution Evaluation](/vault/budget-matched-harness-evolution-evaluation.md)
* [Self-Improvement Update Targets](/vault/self-improvement-update-targets.md)
* [Experience-Conditioned Harness Adaptation](/vault/experience-conditioned-harness-adaptation.md)
* [Verification-Centric Generated-Review Evaluation](/vault/verification-centric-generated-review-evaluation.md)
* [Adversarial-ML Threat Lifecycle](/vault/adversarial-ml-threat-lifecycle.md)
* [Layered Concurrent-Agent Isolation](/vault/layered-concurrent-agent-isolation.md)
* [Runtime-Activated Application Sandboxing](/vault/runtime-activated-application-sandboxing.md)
* [Claim-Bounded Sandbox Evidence](/vault/claim-bounded-sandbox-evidence.md)
* [Weakest-Link Assurance Composition](/vault/weakest-link-assurance-composition.md)
* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md)
* [Assume-Compromise Boundary Testing](/vault/assume-compromise-boundary-testing.md)
* [Structural Code Retrieval](/vault/structural-code-retrieval.md)
* [Query-Class Retrieval Routing](/vault/query-class-retrieval-routing.md)
* [MCP Tool Supply-Chain Assurance](/vault/mcp-tool-supply-chain-assurance.md)
* [Application-Centric Prompt Taxonomy](/vault/application-centric-prompt-taxonomy.md)
* [Action-Observation Fusion](/vault/action-observation-fusion.md)
* [Agent-Ergonomic Interface Design](/vault/agent-ergonomic-interface-design.md)
* [Adaptive Runtime Agent Supervision](/vault/adaptive-runtime-agent-supervision.md)
* [Automatic Prompt Optimization Anatomy](/vault/automatic-prompt-optimization-anatomy.md)
* [Classifier-Based Prompt Optimization](/vault/classifier-based-prompt-optimization.md)
* [Bounded Tool Observations](/vault/bounded-tool-observations.md)
* [Cost-Aware Inference Control](/vault/cost-aware-inference-control.md)
* [Cross-Mechanism Execution-Security Evaluation](/vault/cross-mechanism-execution-security-evaluation.md)
* [Code Context Minification](/vault/code-context-minification.md)
* [Influence-Weighted Topology Search](/vault/influence-weighted-topology-search.md)
* [In-Context Learning](/vault/in-context-learning.md)
* [In-Flow Socratic Prompt Coaching](/vault/in-flow-socratic-prompt-coaching.md)
* [Evolving Context Playbooks](/vault/evolving-context-playbooks.md)
* [Context Collapse](/vault/context-collapse.md)
* [Recency-Checklist Deliberation Explosion](/vault/recency-checklist-deliberation-explosion.md)
* [Effort-Conditioned Prompt Qualification](/vault/effort-conditioned-prompt-qualification.md)
* [Complementary Failure Directions Under Downgrade](/vault/complementary-failure-directions-under-downgrade.md)
* [Prompt Rule Identity](/vault/prompt-rule-identity.md)
* [Gate-Forced Parroting](/vault/gate-forced-parroting.md)
* [Two-Layer Schema Governance](/vault/two-layer-schema-governance.md)
* [Dual-Surface Example Contamination](/vault/dual-surface-example-contamination.md)
* [Position-Robust Context Evaluation](/vault/position-robust-context-evaluation.md)
* [Context Ordering as Retrieval Control](/vault/context-ordering-as-retrieval-control.md)
* [Intent Engineering for Agents](/vault/intent-engineering-for-agents.md)
* [Machine-Readable Agent Specifications](/vault/machine-readable-agent-specifications.md)
* [Configuration-Aware Multi-Agent Prompt Optimization](/vault/configuration-aware-multi-agent-prompt-optimization.md)
* [Credit-Guided Multi-Agent Prompt Optimization](/vault/credit-guided-multi-agent-prompt-optimization.md)
* [Incremental Delta Context Updates](/vault/incremental-delta-context-updates.md)
* [Feedback-Grounded Context Adaptation](/vault/feedback-grounded-context-adaptation.md)
* [File-Native Context Retrieval](/vault/file-native-context-retrieval.md)
* [Grounded Structured Extraction](/vault/grounded-structured-extraction.md)
* [Conflict-Aware Context Retrieval](/vault/conflict-aware-context-retrieval.md)
* [Expert-Weighted Retrieval](/vault/expert-weighted-retrieval.md)
* [Evaluated Skill Routing](/vault/evaluated-skill-routing.md)
* [Permission-Scoped Synthesis](/vault/permission-scoped-synthesis.md)
* [Behavioral State Decay](/vault/behavioral-state-decay.md)
* [Proactive Memory Intervention](/vault/proactive-memory-intervention.md)
* [Structured Execution Memory](/vault/structured-execution-memory.md)
* [Structured Agent Communication Contracts](/vault/structured-agent-communication-contracts.md)
* [Memory Lifecycle Governance](/vault/memory-lifecycle-governance.md)
* [Multi-Agent Orchestration](/vault/multi-agent-orchestration.md)
* [Downstream-Aware Prompt Evaluation](/vault/downstream-aware-prompt-evaluation.md)
* [Metric-Gated Trace Bootstrapping](/vault/metric-gated-trace-bootstrapping.md)
* [Hybrid Discovery + Verification](/vault/hybrid-discovery-verification.md)
* [Hybrid Memory Retrieval Pipeline](/vault/hybrid-memory-retrieval-pipeline.md)
* [Harness-Conditioned Retrieval Evaluation](/vault/harness-conditioned-retrieval-evaluation.md)
* [Score-Gated Refinement](/vault/score-gated-refinement.md)
* [Scoped Guideline Memory](/vault/scoped-guideline-memory.md)
* [Closed-Loop VLM Visual Generation](/vault/closed-loop-vlm-visual-generation.md)
* [Benchmark Reverse Engineering](/vault/benchmark-reverse-engineering.md)
* [Anti-Leakage Evaluation](/vault/anti-leakage-evaluation.md)
* [Sparse Concept Note Prompt](/vault/sparse-concept-note-prompt.md)
* [Dense Technical Proposal Prompt](/vault/dense-technical-proposal-prompt.md)
* [Dataset-Level Feature Discovery](/vault/dataset-level-feature-discovery.md)
* [Declarative LM Pipeline Compilation](/vault/declarative-lm-pipeline-compilation.md)
* [Delayed Local Trajectory Reduction](/vault/delayed-local-trajectory-reduction.md)
* [Textual Feedback Backpropagation](/vault/textual-feedback-backpropagation.md)
* [Transformation-Aware Patch Application](/vault/transformation-aware-patch-application.md)
* [Dominator-Based Agent Validation](/vault/dominator-based-agent-validation.md)
* [Experimental Log Extraction Prompt](/vault/experimental-log-extraction-prompt.md)
* [Anti-Leakage System Prompt](/vault/anti-leakage-system-prompt.md)
* [Citation F1 Metric](/vault/citation-f1-metric.md)
* [Co-occurrence-Grounded Retrieval Compression](/vault/cooccurrence-grounded-retrieval-compression.md)
* [LLM-as-Judge with Anti-Inflation](/vault/llm-as-judge-with-anti-inflation.md)
* [Chain-of-Thought Prompting](/vault/chain-of-thought-prompting.md)
* [Self-Consistency Decoding](/vault/self-consistency-decoding.md)
* [Step-Level Prompt Adaptation](/vault/step-level-prompt-adaptation.md)
* [Tree of Thoughts](/vault/tree-of-thoughts.md)
* [ReAct Framework](/vault/react-framework.md)
* [Decomposed Prompting](/vault/decomposed-prompting.md)
* [Active Prompt](/vault/active-prompt.md)
* [Prompt Optimization](/vault/prompt-optimization.md)
* [Zero-Configuration Prompt Optimization](/vault/zero-configuration-prompt-optimization.md)
* [Prompting Complexity](/vault/prompting-complexity.md)
* [Behavioral Prompting Complexity](/vault/behavioral-prompting-complexity.md)
* [Prompting Distance](/vault/prompting-distance.md)
* [Prompt-Technique SWOT Analysis](/vault/prompt-technique-swot-analysis.md)
* [Prompt Contingency](/vault/prompt-contingency.md)
* [Process-Aware Trajectory Preference Optimization](/vault/process-aware-trajectory-preference-optimization.md)
* [Retrieval Augmentation](/vault/retrieval-augmentation.md)
* [Single-Pass Concept Graph Construction](/vault/single-pass-concept-graph-construction.md)
* [Frequency-Weighted Personalized PageRank](/vault/frequency-weighted-personalized-pagerank.md)
* [Retrieval Interface Tax](/vault/retrieval-interface-tax.md)
* [VLM Prompt Learning](/vault/vlm-prompt-learning.md)
* [Prompt Tuning](/vault/prompt-tuning.md)
* [Emergent Abilities](/vault/emergent-abilities.md)
* [Workload-Aligned Agent Memory Architecture](/vault/workload-aligned-agent-memory-architecture.md)
* [Workload-Aligned Inference Engine Selection](/vault/workload-aligned-inference-engine-selection.md)
* [Prompt Security Taxonomy](/vault/prompt-security-taxonomy.md)
* [LLM Evaluation Methods](/vault/llm-evaluation-methods.md)
* [AI Agent Evolution](/vault/ai-agent-evolution.md)
* [Least-to-Most Prompting](/vault/least-to-most-prompting.md)
* [Answer Engineering](/vault/answer-engineering.md)
* [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md)
* [Model-Aware Harness Design](/vault/model-aware-harness-design.md)
* [Progressive Skill Disclosure](/vault/progressive-skill-disclosure.md)
* [Rate–Distortion Memory Compaction](/vault/rate-distortion-memory-compaction.md)
* [Reasoning-Budget Calibration](/vault/reasoning-budget-calibration.md)
* [Reversible, Query-Conditioned Compaction](/vault/reversible-query-conditioned-compaction.md)
* [Repeated-Compaction Evaluation](/vault/repeated-compaction-evaluation.md)
* [Source-Backed Claim Admission](/vault/source-backed-claim-admission.md)
* [Perspective-Diverse Prompt Evolution](/vault/perspective-diverse-prompt-evolution.md)
* [Validated Fallback Composition](/vault/validated-fallback-composition.md)
* [Mediated Agent Execution Isolation](/vault/mediated-agent-execution-isolation.md)
* [Kernel-First Split Enforcement](/vault/kernel-first-split-enforcement.md)
* [Capability-Enforced Agent Execution](/vault/capability-enforced-agent-execution.md)
* [Control-Data Plane Separation for Agents](/vault/control-data-plane-separation-for-agents.md)
* [Privileged–Quarantined Agent Split](/vault/privileged-quarantined-agent-split.md)
* [Intent-Then-Isolate Execution](/vault/intent-then-isolate-execution.md)
* [Nested Sandbox Capability Evaluation](/vault/nested-sandbox-capability-evaluation.md)
* [Intended-Path Benchmark Validation](/vault/intended-path-benchmark-validation.md)
* [Provenance-Conditioned Action Admission](/vault/provenance-conditioned-action-admission.md)
* [Security-Aware Replanning](/vault/security-aware-replanning.md)
* [Bounded Model Security Adjudication](/vault/bounded-model-security-adjudication.md)
* [Authorization–Provenance Graph Alignment](/vault/authorization-provenance-graph-alignment.md)
* [Deployment-Conditioned Sandbox Security](/vault/deployment-conditioned-sandbox-security.md)
* [Downstream Security Patch Propagation](/vault/downstream-security-patch-propagation.md)
* [Retrieval as Host Capability](/vault/retrieval-as-host-capability.md)
* [Source-Adapter Decoupling](/vault/source-adapter-decoupling.md)
* [Retrieval-Depth Grading](/vault/retrieval-depth-grading.md)
* [Generative Engine Optimization](/vault/generative-engine-optimization.md)
* [Generative Engine Visibility Metrics](/vault/generative-engine-visibility-metrics.md)
* [Generative Engines](/vault/generative-engines.md)
* [Zero-Click Search](/vault/zero-click-search.md)
* [AI Search Visibility Measurement](/vault/ai-search-visibility-measurement.md)
* [Citation Half-Life](/vault/citation-half-life.md)
* [AI Crawler Traffic Classes](/vault/ai-crawler-traffic-classes.md)
* [AI Crawler Content Parsability](/vault/ai-crawler-content-parsability.md)
* [Causal Influence Signature](/vault/causal-influence-signature.md)
* [Observed-Effect Divergence Rollback](/vault/observed-effect-divergence-rollback.md)
* [Falsification-Bounded Architecture Proposal](/vault/falsification-bounded-architecture-proposal.md)
* [Contrastive Preference Rule Extraction](/vault/contrastive-preference-rule-extraction.md)
* [Rule-Based Rewards](/vault/rule-based-rewards.md)
* [Cooperative Optimization Evaluation](/vault/cooperative-optimization-evaluation.md)
* [Segmented Memory Checkpoint Caching](/vault/segmented-memory-checkpoint-caching.md)
* [Content-Keyed Block Routing](/vault/content-keyed-block-routing.md)
* [Earned-Media Citation Bias](/vault/earned-media-citation-bias.md)
* [Engine-Specific Citation Ecosystems](/vault/engine-specific-citation-ecosystems.md)
* [Big-Brand Bias](/vault/big-brand-bias.md)
* [Trained Program-Evolution Operators](/vault/trained-program-evolution-operators.md)
* [Operator-Conditioned Search Memory](/vault/operator-conditioned-search-memory.md)
* [Quality–Progress–Novelty Parent Selection](/vault/quality-progress-novelty-parent-selection.md)
* [Policy-Adaptive Reward Bounds](/vault/policy-adaptive-reward-bounds.md)
* [Grounding Query Telemetry](/vault/grounding-query-telemetry.md)
* [Retrieval-Legible Content Structure](/vault/retrieval-legible-content-structure.md)
* [Query Fan-Out](/vault/query-fan-out.md)
* [Publisher AI Usage Controls](/vault/publisher-ai-usage-controls.md)
* [Entity Consistency](/vault/entity-consistency.md)
* [AI Citation Rate](/vault/ai-citation-rate.md)
* [Prompt–Model Drift](/vault/prompt-model-drift.md)
* [Cross-Model Prompt Mapping](/vault/cross-model-prompt-mapping.md)
* [Sycophancy](/vault/sycophancy.md)
* [User-Cue Perturbation Evaluation](/vault/user-cue-perturbation-evaluation.md)
* [Preference-Data Feature Attribution](/vault/preference-data-feature-attribution.md)
* [Prompted Preference-Model Debiasing](/vault/prompted-preference-model-debiasing.md)
* [Leading-Query Contrastive Decoding](/vault/leading-query-contrastive-decoding.md)
* [Side-Effect-Bounded Activation Steering](/vault/side-effect-bounded-activation-steering.md)
* [Verbosity Bias in Preference Evaluation](/vault/verbosity-bias-in-preference-evaluation.md)
* [Human-Anchored Judge-Bias Measurement](/vault/human-anchored-judge-bias-measurement.md)
* [Judge Bias as Accuracy Parity](/vault/judge-bias-as-accuracy-parity.md)
* [Verbosity Compensation](/vault/verbosity-compensation.md)
* [Verbosity as an Uncertainty Signal](/vault/verbosity-as-uncertainty-signal.md)
* [Verbosity-Triggered Model Cascade](/vault/verbosity-triggered-model-cascade.md)
* [Learned Bias Fitting for Reward Debiasing](/vault/learned-bias-fitting-reward-debiasing.md)
* [Stop-Gradient Correlation Decoupling](/vault/stop-gradient-correlation-decoupling.md)
* [Confound-Partitioned Accuracy](/vault/confound-partitioned-accuracy.md)
* [Prompt Incentive Framing](/vault/prompt-incentive-framing.md)
* [Output Priming](/vault/output-priming.md)
* [Quality Versus Correctness Prompt Evaluation](/vault/quality-versus-correctness-prompt-evaluation.md)
* [Framework-Anchored Intermediate Descriptions](/vault/framework-anchored-intermediate-descriptions.md)
* [Contrastive Exemplar Characterization](/vault/contrastive-exemplar-characterization.md)
* [Exemplar Copy Leakage](/vault/exemplar-copy-leakage.md)
* [Joint Prompt–Response Evaluation](/vault/joint-prompt-response-evaluation.md)
* [Rationale-Guided Prompt Rewriting](/vault/rationale-guided-prompt-rewriting.md)
* [Paraphrase–Adversarial Evaluator Validation](/vault/paraphrase-adversarial-evaluator-validation.md)
* [Distributional Normativity Blindness](/vault/distributional-normativity-blindness.md)
* [Overt–Covert Bias Divergence](/vault/overt-covert-bias-divergence.md)
* [Anchor-Constrained Bias Mitigation](/vault/anchor-constrained-bias-mitigation.md)
* [Bias as Prior Dominance](/vault/bias-as-prior-dominance.md)
* [Clarification Need Decision](/vault/clarification-need-decision.md)
* [Subscription-Billed Programmatic CLI Agent Access](/vault/subscription-billed-programmatic-cli-agent-access.md)
* [CLI Agent Hook Event Surfaces](/vault/cli-agent-hook-event-surfaces.md)
* [Instruction Tuning](/vault/instruction-tuning.md)
