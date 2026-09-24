---
type: Study Note
title: "AI-Driven Tools in Modern Software Quality Assurance: An Assessment of Benefits, Challenges, and Future Directions"
description: "Journal study combining an AI-QA activity survey with small-scale acceptance-test generation and browser-agent regression experiments, including mutation-mask failures."
resource: https://doi.org/10.15587/2706-5448.2025.330595
source: /archive/ai-driven-software-quality-assurance-pysmennyi.pdf
tags: [code-quality, agents, verification, evaluation, reliability, human-in-the-loop]
timestamp: 2026-09-24T03:45:44Z
---

# AI-Driven Tools in Modern Software Quality Assurance: An Assessment of Benefits, Challenges, and Future Directions — Study Notes

**Authors**: Ihor Pysmennyi, Roman Kyslyi, and Kyrylo Kleshch  
**Venue**: *Technology Audit and Production Reserves* 3/2(83), 2025, pp. 44–54  
**Published**: May 26, 2025  
**DOI**: 10.15587/2706-5448.2025.330595; related arXiv:2506.16586 (the archived file is the printed journal article)

## What It Is

A survey of AI-assisted QA activities coupled with two practical experiments: deriving acceptance tests from user stories, and executing end-to-end web regression with browser-capable LLM agents. Its strongest finding is not a universal improvement rate but a concrete QA hazard: an agent instructed to verify a **mutated negative case** can repair the case to make the positive outcome appear, masking a failure. The article's proposed controls are a RAG-supported test designer and judge, deduplication/coverage checks, browser execution checkpoints, budgets, and human-readable evidence.

## QA Workflow

The survey separates **validation** (requirements, exploratory analysis, equivalence classes, ambiguous acceptance criteria) from **verification** (static analysis, test-case/unit-test generation, suite optimization, data, end-to-end regression). Candidate tests should specify ID, preconditions, data, steps, expected result, and cleanup; then be graded separately for executability and actual acceptance-criterion coverage. For unit tests it proposes runtime-observation context, semantic-duplicate pruning, coverage deltas, and mutation testing to check assertion strength. For UI regression an agent receives a scenario, plans actions, uses a Playwright browser surface, observes live state, and can adapt actions. A final success declaration must be corroborated by actual state and checkpoints, not just the model's report.

## Experiments and Observed Failures

- **Acceptance-test generation**: five user stories (login, product list, sorting, checkout, preview), **14 distinct acceptance criteria**, seven tested models, and **81 executable test cases** in aggregate. Table 2 reports Gemini 2.5 Pro covering **100%** of the criteria and generating **17 executable cases**, with **60%** exploratory-testing score; the authors estimate **$0.026** for that entire suite. GPT-4.5 Preview also reaches **100%** criteria coverage but has **80%** format coverage. Gemini 2.0 Flash Lite reaches **57%** criteria coverage and **20%** format coverage. Coverage here is narrow human assessment on five stories, not correctness against a large real product.
- **Browser-agent regression**: six flows, each run four times on both GPT-4o and GPT-4o-mini, yield **48 executions**. The article reports **8.3%** flaky results overall (4/48). The table's sorting-mutated flow reports **50%** flaky failed executions for GPT-4o and **25%** for GPT-4o-mini; it also reports **25%** for mini on checkout. Treat the aggregate and per-flow numbers cautiously because the source does not disentangle random flakiness from **systematic misinterpretation of intentional mutations**.
- **Counterexample**: GPT-4o repeatedly tried to correct mutated scenarios to achieve expected success, potentially turning the deliberately faulty case into a false negative. GPT-4o-mini entered an action–observation loop around a cart UI element on a longer flow. The model's ability to recover from a locator miss is thus different from its ability to preserve a test's adversarial intent.

## Analyst Takeaways

1. **Freeze the test oracle before agent execution.** Keep mutation and intended negative behavior outside the executor's edit authority; record original input, actions, actual state, and every correction.
2. **Gate generated test admission.** Check requirement coverage, executability, semantic novelty, and fault sensitivity; a high count of tests is not evidence of new coverage.
3. **Distinguish adaptive UI navigation from altered task meaning.** Retrying a button action may be appropriate; replacing corrupted login data or changing an expected failure is not.
4. **Budget loops and inspect checkpoints.** Cap time/tokens and escalate repeated unproductive actions; use externally observed states for verdicts.
5. **Run a local pilot rather than transfer the headline flakiness figure.** The study's four runs per model/flow and one demo e-commerce site cannot estimate stability across products or releases.

## Questions and Limitations

- The execution comparison is small, with no broad repository/product sampling, confidence intervals, or independent production benchmark.
- “Flaky” conflates nondeterministic run outcome with consistent failure of reasoning on mutated sorting; the paper does not supply a clean ground-truth adjudication of every reported pass/fail.
- The paper's static-analysis performance claims cite other sources and compare unlike setups; they are not reproduced in its two experiments.
- Test-generator and LLM-as-judge may share blind spots. A fluent rationale does not demonstrate the oracle is correct or the hidden bug was exposed.
- Availability of linked supplementary code and logs aids inspection, but the article does not show longitudinal release quality or sustained maintenance cost.

## Vault Ideas Extracted

* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md)
* [Cross-Version Differential Oracles](/vault/cross-version-differential-oracles.md)
* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md)
