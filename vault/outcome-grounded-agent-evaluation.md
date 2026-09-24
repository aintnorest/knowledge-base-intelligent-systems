---
type: Synthesis
title: Outcome-Grounded Agent Evaluation
description: Evaluating agent changes with layered offline and online evidence, including delayed product outcomes that better reflect whether users kept the result.
tags: [evaluation, coding-agents, reliability, agents]
timestamp: 2026-07-13T16:02:28Z
---

# Outcome-Grounded Agent Evaluation

Agent quality should be evaluated with signals that approach the user's real outcome, not only with model-facing or system-efficiency proxies. A useful program combines fast offline evaluation with online experiments and delayed evidence of whether the agent's output survived real use.

## The Evaluation Stack

1. **Offline suites and benchmarks** make regressions and candidate comparisons fast and repeatable.
2. **Online A/B experiments** test candidate harnesses against real tasks, users, repositories, and failure modes.
3. **Operational metrics**—latency, token use, tool-call count, cache behavior, and error rate—explain cost and reliability but do not by themselves establish usefulness.
4. **Outcome proxies** observe whether the work was accepted or repaired: for example, the proportion of agent-authored code retained after a fixed interval, or a classifier's reading of the user's follow-up for satisfaction or a concrete failure report.

Each layer answers a different question. A change can improve a benchmark yet fail to improve product outcomes; it can reduce latency while making edits less durable; it can appear promising in an online experiment but be too expensive to deploy.

For tool-using agents, separate what the transcript says from what the environment contains. “I booked the flight” is trajectory evidence; a reservation row in the test database is outcome evidence. Grade direct state and artifacts first, then use the trace for safety, policy, efficiency, and diagnosis. A fixed tool-call sequence is usually too brittle when several valid paths reach the same state.

Production incidents add a rollout requirement. Anthropic reports that three independent Claude Code regressions affected different traffic slices and initially appeared as noisy aggregate degradation; specific user reports enabled diagnosis after existing evals and dogfooding missed them. Exact-public-build testing, soak periods, gradual rollouts, and per-slice observability belong between offline success and broad release.

## Coding-Agent Outcome Horizons

For code, "outcome" spans several horizons, each with its own evidence:

1. **Intent and patch**: requirement satisfaction and reuse of existing code.
2. **Merge boundary**: introduced *and* fixed static findings by severity, human review cost, and acceptance.
3. **Survival**: later repairs, reverts and churn at a fixed horizon.
4. **Human effort**: correction effort and understanding.

Field studies measure different slices and should not be merged into one quality ranking. Examples: agent PRs in one repository showed higher similarity to existing functions (0.2867 versus 0.1532); 105,364 of 464,900 trackable AI-introduced findings survived to HEAD; a five-agent, 37,623-PR study found no agent group with higher size-normalized 90-day churn than humans; SWE-chat separates 44.3% committed-line efficiency from 50.3% net-output survival ([Repository-Relative Code Quality](/vault/repository-relative-code-quality.md)).

**Declare the claim before choosing the benchmark.** Function-level pass@k measures whether one passing candidate exists under a selection budget, not first-try repository reliability. Localization gains are intermediate: CodeAnchor's +12.5-point repair difference applies only to 80 cases *selected because localizations differed*, and projects to roughly +2 points over all 500 Verified tasks.

## Instrument the Review-to-Merge Funnel

Keep these stages separate: posted comment, independently validated finding, applied repair, regression-checked patch, and merged code retained without escaped defects. Report the denominator at every stage.

- Google's 37% completion acceptance counts only suggestions shown for more than 750 ms while the user was not typing, and its 50% AI-character share excludes pasted code.
- More than 8% of review comments are resolved with AI assistance. That is usage, not fix correctness.
- AutoCommenter's A/B rollout found no significant change in review duration or iterations.
- An MSR sample shows 45.20% merge for bot-only-reviewed PRs versus 68.37% for human-only, confounded by assignment.
- 248,641 AI-reviewed AI-authored PRs measure prevalence, not correctness.

**Reviewers substitute proxies.** In interviews, developers reported relying on a well-formed plan, green tests or a quick skim instead of reading the agent's diff. Treat these as triage signals, not evidence of changed behavior.

For interactive software, explore the app without disclosing the acceptance checklist, keep the browser trace, and score criteria against that evidence. Keep a separate trace track for process constraints: MTAC-IFBench finds 98% runnable final projects alongside 8.7% strict turn-level constraint success.

## Practical Use

For every harness change, declare the primary outcome, guardrail metrics, comparison population, and observation window before rollout. Investigate divergence: a falling keep rate with stable benchmark scores points to a missing product-use behavior, while rising tool errors may explain both increased cost and declining quality.

Keep the evaluator independent from the acting agent where possible. Audit sampled outcome labels, especially LLM-generated labels, against human review or verifiable external states.

## Limitations

Delayed retention is still a proxy. Users may keep incorrect output, overwrite good output for unrelated reasons, or never return to the task. LLM-based satisfaction labels can encode classifier bias and need calibration. Online experiments can be noisy or ethically constrained, so they complement rather than supersede correctness tests and direct user research.

## Sources

- [Continually Improving Our Agent Harness dossier](/dossiers/continually-improving-agent-harness.md) — Cursor combines CursorBench and online A/B tests with code Keep Rate and an LLM reading of user follow-ups.
- [Demystifying evals for AI agents dossier](/dossiers/demystifying-agent-evals.md) — distinguishes outcomes from trajectories and capability from regression suites.
- [An update on recent Claude Code quality reports dossier](/dossiers/anthropic-claude-code-quality-postmortem.md) — motivates exact-build dogfooding, soak periods, gradual rollouts, and traffic-slice diagnosis.
- [AI in software engineering at Google: Progress and the path ahead dossier](/dossiers/google-ai-software-engineering-progress.md) — completion and review-assistance metric definitions and denominators.
- [AI-Assisted Assessment of Coding Practices in Modern Code Review dossier](/dossiers/google-autocommenter-coding-practices.md) — randomized rollout with no significant review-time change.
- [BitsAI-CR: Automated Code Review via LLM in Practice dossier](/dossiers/bytedance-bitsai-cr-code-review.md) — precision versus a line-change proxy for fixes.
- [From Industry Claims to Empirical Reality: An Empirical Study of Code Review Agents in Pull Requests dossier](/dossiers/industry-code-review-agent-pr-outcomes.md) — observational merge-rate differences by reviewer composition.
- [AI-to-AI Code Reviews of GitHub Pull Requests dossier](/dossiers/ai-to-ai-code-reviews-github-prs.md) — prevalence of AI review on AI-authored PRs without correctness outcomes.
- [Code Review Agent Benchmark dossier](/dossiers/c-crab-code-review-agent-benchmark.md) — executable checks for review-guided repairs on selected issues.
- [More Code, Less Reuse: Investigating Code Quality and Reviewer Sentiment towards AI-generated Pull Requests dossier](/dossiers/ai-pull-requests-semantic-redundancy.md) — semantic reuse gap in agent PRs.
- [Debt Behind the AI Boom: A Large-Scale Empirical Study of AI-Generated Code in the Wild dossier](/dossiers/ai-generated-code-technical-debt-wild.md) — introduced, fixed and surviving static findings.
- [Not All Agents Are Equal: Code Quality and Post-Merge Maintenance Across Five Autonomous Coding Agents in the Wild dossier](/dossiers/coding-agents-post-merge-maintenance.md) — 90-day churn and revert signals across five agents.
- [SWE-chat: Coding Agent Interactions From Real Users in the Wild dossier](/dossiers/swe-chat-real-user-coding-agent-interactions.md) — efficiency, survival and correction in real sessions.
- [How Much Static Structure Do Code Agents Need? A Study of Deterministic Anchoring dossier](/dossiers/deterministic-anchoring-code-agents.md) — localization improvement versus representative repair gain.
- [Human oversight of agentic systems in practice: Examining the oversight work, challenges, and heuristics of developers using software agents dossier](/dossiers/human-oversight-agentic-systems-in-practice.md) — plan, green-test and skim proxies in developer review.
- [A Comprehensive Survey on Benchmarks and Solutions in Software Engineering of LLM-Empowered Agentic System dossier](/dossiers/software-engineering-agent-benchmarks-survey.md) — pass@k on synthetic function tasks as a weak production proxy.
- [WebCraftBench: Evaluating Web Application Generation from a Software Testing Perspective dossier](/dossiers/webcraftbench-web-app-testing.md) — criterion-blind exploration with runtime evidence.
- [MTAC-IFBench: Benchmarking Instruction-Following in Multi-Turn Agentic Coding dossier](/dossiers/mtac-ifbench-multi-turn-coding-instructions.md) — final functionality versus turn-level constraint compliance.
- [From LLMs to LLM-based Agents for Software Engineering: A Survey of Current, Challenges and Future dossier](/dossiers/llm-agents-software-engineering-survey.md) — six-domain survey separating direct LLM scores from agentic workflows and their QA challenges.
- [A Survey on Code Generation with LLM-based Agents dossier](/dossiers/code-generation-agents-survey.md) — separates function, contest and repository benchmarks, and functional from non-functional quality.
