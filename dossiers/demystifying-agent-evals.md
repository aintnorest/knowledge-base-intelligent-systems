---
type: Study Note
title: Demystifying evals for AI agents
description: Anthropic's practical guide to building agent evaluations around distinct capability and regression suites, outcome-grounded grading, repeated-trial reliability metrics, and isolated task environments.
resource: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
source: /archive/demystifying-agent-evals.html
tags: [evaluation, agents, reliability, verification, agent-harness]
timestamp: 2026-09-14T17:12:48Z
---

# Demystifying evals for AI agents — Study Notes

**Authors**: Mikaela Grace, Jeremy Hadfield, Rodrigo Olivares, and Jiri De Jonghe  
**Publisher**: Anthropic, Engineering at Anthropic  
**Published**: January 9, 2026

## What It Is

This is a production-oriented guide to automated evaluation of agents: systems that act over multiple turns, call tools, and change an environment. Its most useful contribution is not a new benchmark or metric, but an operating model for treating evaluation as maintained product infrastructure. A task defines inputs and success criteria; repeated attempts are trials; graders score transcript or outcome properties; the evaluation harness runs, records, grades, and aggregates those trials; and the agent harness is the model-plus-scaffold system being evaluated.

That vocabulary prevents a common category error. An agent's final message, its trajectory, and the environment state it leaves behind are different observables. “Your flight has been booked” is transcript evidence; a reservation row in the database is outcome evidence. Likewise, a model score is always conditional on the tools, orchestration, prompts, resource limits, and environment supplied by the agent harness.

## Capability Suites and Regression Suites

The guide separates two jobs that teams often collapse into one score:

- **Capability or quality evals** ask what the agent can do well. They should contain difficult tasks and initially leave substantial headroom, creating a useful hill to climb.
- **Regression evals** ask whether the agent still reliably performs previously solved tasks. They should sit near 100% and run continuously to expose backsliding.

A capability task that saturates should graduate into the regression suite rather than remain the headline measure of progress. This creates a lifecycle: discover a weak capability, improve it, preserve the now-solved behavior, and replenish the capability suite with harder or more representative tasks. Running both matters because hill-climbing on difficult cases can silently break routine ones, while a saturated suite can protect stability but cannot distinguish better systems.

The distinction appears concretely in Descript's video-editing agent. Its criteria are “don't break things, do what I asked, and do it well”; the team moved from manual grading to product-defined LLM criteria with periodic human calibration and now runs separate quality-benchmarking and regression suites. Anthropic describes Claude Code following a similar maturation path: early employee and user feedback preceded narrow evals for concision and file editing, then more complex behaviors such as over-engineering.

## Grading Outcomes Without Ignoring Trajectories

The recommended grader stack is deliberately mixed:

1. **Code-based graders** cover exact or fuzzy matches, tests, static analysis, state checks, tool calls, turns, tokens, and latency. They are cheap and reproducible but can reject valid variation.
2. **Model-based graders** cover rubrics, natural-language assertions, references, pairwise comparisons, and multi-judge consensus. They handle open-ended quality but are non-deterministic, more expensive, and require human calibration.
3. **Human graders** provide expert review, spot checks, A/B judgments, and the reference signal used to calibrate model graders, at much higher cost and latency.

The strongest general rule is to grade the produced outcome rather than prescribe the path. Coding agents can be checked with fail-to-pass and pass-to-pass tests; support agents can be checked against ticket and refund state; computer-use agents can be checked against URLs, page state, backend state, files, or application databases. Transcript grading remains valuable for properties the outcome cannot show—interaction quality, grounding, policy compliance, tool selection, turn count, token use, and diagnostic failure categories—but requiring a fixed tool-call sequence is usually brittle. Creative, valid solutions should not fail merely because they differ from the designer's imagined trajectory.

This is not an argument to discard traces. Reading transcripts is how teams determine whether a failure belongs to the agent, task specification, grader, harness, or environment. The right hierarchy is: use direct outcome evidence for task completion; use trajectory evidence for constraints, quality, and diagnosis; and inspect both when a score is surprising. Partial credit is appropriate when a multi-part task has meaningful intermediate outcomes, but non-negotiable correctness or safety checks can remain hard gates.

## Non-Determinism: `pass@k` Versus `pass^k`

Repeated trials answer two opposite deployment questions:

- **`pass@k`** asks whether at least one of $k$ attempts succeeds. For independent attempts with per-trial success probability $p$, this is $1-(1-p)^k$. It rises with more attempts and fits search or best-of-many workflows where one successful candidate is enough.
- **`pass^k`** asks whether all $k$ attempts succeed. Under the same independence assumption, this is $p^k$. It falls with more attempts and fits customer-facing workflows where every run is expected to work. The article's example gives $p=0.75$ and $k=3$, yielding $0.75^3 \approx 42\%$.

At $k=1$ the metrics coincide. As $k$ grows, they can make the same agent look simultaneously highly capable and highly unreliable. Reporting only `pass@k` can therefore disguise poor default behavior behind retry budget. The metric must match the product: a coding workflow that can cheaply generate and verify alternatives may value `pass@k`, while a support action with real side effects needs a consistency measure such as `pass^k`.

The formula also exposes why environment isolation matters. Shared files, caches, history, resource pressure, or other cross-trial state makes attempts correlated, so the simple interpretation of repeated trials no longer holds.

## Debug the Evaluation Before Diagnosing the Agent

The guide treats tasks and graders as software that can be wrong. Its practical debugging sequence is strong:

- Start with 20–50 tasks drawn from manual checks, support reports, and production failures rather than waiting for a nominally comprehensive set.
- Make specifications unambiguous enough that two domain experts would reach the same verdict, and disclose everything the grader checks.
- Keep a reference solution that passes every grader. With frontier models, repeated 0% performance—even `pass@100`—is often a broken-task signal worth investigating rather than immediate evidence of incapability.
- Balance positive and negative cases. Anthropic's web-search evals had to cover both when Claude should search and when it should answer directly; testing only triggering behavior encouraged over-triggering.
- Inspect failed and successful transcripts, test graders against valid alternatives, calibrate model judges to experts, let a judge return “Unknown,” and isolate rubric dimensions rather than asking one judge for an undifferentiated score.
- Harden real bypasses without mistaking legitimate alternative strategies for cheating.

Several cases show how large evaluation artifacts can be. A Terminal-Bench audit found tasks that requested a script without stating the filepath assumed by the tests. Opus 4.5 reportedly moved from 42% to 95% on CORE-Bench after fixing overly precise numeric matching, ambiguous specifications, irreproducible stochastic tasks, and a restrictive scaffold. METR found time-horizon tasks whose instructions asked agents to reach a threshold while grading required exceeding it, perversely rewarding systems that ignored the stated goal. In each case, the score initially measured the evaluation defect together with agent performance.

## Environmental Isolation Is Measurement Validity

Every trial should start from a clean, production-resembling environment. Leftover files and caches can leak answers; shared resource exhaustion can make nominally distinct failures correlated; network or application state can drift; and a harness unlike production can dominate the result. Anthropic reports internal cases where Claude gained an unfair advantage by reading Git history left by previous trials. It also notes that multiple trials failing from the same CPU-memory constraint are not independent observations.

Isolation therefore means more than containment. It is experimental control: reset mutable state, version the environment, prevent access to evaluator-only information, provision sufficient resources, and record the model, harness, tools, and budgets that define the tested system. An isolated but unrealistic environment measures the wrong deployment; a realistic but contaminated one produces unreliable comparisons.

## Named Production Lessons

The source uses deployment examples to show different failure modes rather than claim one universal evaluator:

- **Bolt AI** built an evaluation system in three months after its product was already widely used, combining static analysis, browser agents that test generated applications, and LLM judges for instruction following.
- **Claude for Chrome** evaluates context-dependent tool choice because DOM interaction is fast but token-heavy, while screenshot interaction is slower but can be more token-efficient.
- **Qodo** initially found little improvement from Opus 4.5 because one-shot coding tasks missed gains on longer, more agentic work; it responded by building a more suitable framework.
- **SWE-bench Verified** and **Terminal-Bench** illustrate deterministic outcome testing for code and end-to-end technical work, while **τ-Bench/τ2-Bench**, **BrowseComp**, **WebArena**, and **OSWorld** illustrate conversational, research, browser, and desktop task shapes.
- **Anthropic's web-search evals** show why trigger/no-trigger balance is a first-class dataset property rather than a final prompt tweak.

These cases support the guide's core position: eval quality depends more on realistic tasks, valid graders, and faithful environments than on the framework chosen to execute them.

## Operating the Suite Over Time

An evaluation suite is a living artifact. Anthropic recommends dedicated teams own core infrastructure while product and domain experts contribute the tasks and run the evaluations. Capability suites must be refreshed as they saturate; regression suites must remain stable enough to detect drift; and production failures should become new cases. Automated evals should run before launch and in CI, but remain one layer alongside production monitoring, A/B tests, user feedback, manual transcript review, and systematic human studies.

The Swiss-cheese analogy is apt: offline evals are reproducible but can miss real usage, monitoring is realistic but reactive, A/B tests measure deployed outcomes but are slow, user feedback is sparse and self-selected, transcript review is rich but inconsistent, and human studies are high-quality but expensive. No single layer earns the label “ground truth” across all questions.

## Analyst Takeaways

1. **Do not optimize a single suite for two incompatible jobs.** Keep difficult capability discovery separate from near-perfect regression protection, and graduate saturated tasks deliberately.
2. **Choose the reliability question before choosing the metric.** `pass@k` rewards finding one success; `pass^k` punishes inconsistency. Attempt count, selection policy, and retry cost are part of the reported system.
3. **Treat the final environment state as the default completion signal.** Add trace grading when process, interaction, safety, or efficiency matters, not to force one imagined solution path.
4. **A surprising score is a debugging prompt, not a verdict.** Reference solutions, transcript inspection, valid-alternative tests, and environment checks should precede claims about model capability.
5. **Trial isolation is statistical hygiene.** Cross-run state and shared infrastructure failures can both leak capability and manufacture correlated errors.
6. **The task bank is the durable asset.** Frameworks can accelerate execution, but a polished harness cannot rescue ambiguous, unrepresentative, or gameable tasks.

## Questions and Limitations

- This is a practitioner guide from a model and agent vendor, not a controlled comparative study. Most named company cases lack task counts, sampling plans, uncertainty intervals, cost data, or before/after outcome measurements.
- The dramatic CORE-Bench figures illustrate evaluator sensitivity but are not decomposed into the contribution of each task, grader, or scaffold fix in this article.
- `pass@k` and `pass^k` are explained intuitively, but the guide does not address confidence intervals, heterogeneous per-task rates, correlated trials, censored timeouts, or unbiased estimation from finite samples.
- “Grade outcomes, not paths” needs domain-specific exceptions. Unsafe actions, policy violations, privacy breaches, and irreversible side effects can matter even when the final state looks correct.
- Human calibration is recommended without a detailed protocol for sampling, disagreement resolution, judge drift, or acceptable divergence between experts and model graders.
- The framework appendix and benchmark saturation claims are point-in-time as of January 2026. Tool capabilities, framework features, benchmark versions, and frontier scores can become stale quickly.
- Automated pre-production evals cannot establish performance on the full live distribution. The source explicitly positions monitoring, experiments, user feedback, and human review as complementary evidence.

## Vault Ideas Extracted

* [LLM Evaluation Methods](/vault/llm-evaluation-methods.md)
* [Outcome-Grounded Agent Evaluation](/vault/outcome-grounded-agent-evaluation.md)
* [Intended-Path Benchmark Validation](/vault/intended-path-benchmark-validation.md)
* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md)
