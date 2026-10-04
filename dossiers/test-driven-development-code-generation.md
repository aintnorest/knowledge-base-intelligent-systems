---
type: Study Note
title: Test-Driven Development for Code Generation
description: TGen's staged Python-generation experiments show that supplied human tests improve held-out correctness, with model-dependent gains and unresolved confounding from additional generation attempts.
resource: https://arxiv.org/abs/2402.13521v2
source: /archive/test-driven-development-code-generation.pdf
tags: [llm-code-testing, coding-agents, verification, prompting, evaluation, agents]
timestamp: 2026-10-04T07:38:12Z
---

# Test-Driven Development for Code Generation — Study Notes

**Authors**: Noble Saji Mathews and Meiyappan Nagappan (University of Waterloo)  
**Venue**: arXiv:2402.13521v2 [cs.SE, cs.AI]; related peer-reviewed ASE 2024 publication, *Test-Driven Development and LLM-based Code Generation*, pp. 1583–1594, [DOI 10.1145/3691620.3695527](https://doi.org/10.1145/3691620.3695527)  
**Date**: June 11, 2024 revision; February 21 initial submission; publisher record dated October 27, 2024

## What It Is

An empirical study of **human-written tests as input to code generation**, not an evaluation of asking an agent to invent its own tests. TGen generates Python solutions from a problem statement, retries unsuccessful tasks with supplied tests, and then uses test failures for bounded remediation. Additional private tests assess whether the apparent success generalizes beyond the examples the model saw.

The arXiv page explicitly links the ASE DOI; [Crossref](https://api.crossref.org/works/10.1145/3691620.3695527) identifies the same authors and the renamed proceedings article. These are versions of the same work, not independent studies. The registry key therefore follows publisher-identifier precedence: **`doi:10.1145/3691620.3695527`**, with arXiv:2402.13521 as the version locator. This dossier's measurements come from the complete archived **v2 prepublication manuscript**, not an assumed byte-identical version of record.

## Problem and Motivation

A natural-language requirement can omit signatures, input/output conventions, boundary cases, or mathematical details. Executable examples add constraints that a model can consume before implementation and a separate verifier can check afterward. Conversely, tests inferred from generated code can reproduce its mistaken assumptions. The authors explicitly leave “when and how should AI write tests?” outside this study.

## Design and Mechanism

- The main model is **GPT-4 Turbo v1106**, with **Llama 3 70B Instruct** used for a second model comparison. GPT-3.5 Turbo v1106 results are described as similar and included in the replication package, but are not the main quantified tables. Temperature is zero and seed is 1106.
- Function-level datasets are **399 MBPP** and **164 HumanEval** Python tasks. Human-authored original tests can enter the prompt; EvalPlus's expanded tests (**35×** and **80×** the original tests, respectively) remain private.
- A file-level set contains **1,100 CodeChef** problems: 100 popular problems from each of 11 difficulty buckets, scraped in November 2023. Public examples guide generation; platform judging supplies private evaluation.
- The pipeline first attempts the statement alone. Only after a failure does it regenerate with public tests; remaining failures go through a separate remediation advisor and coder. The advisor is instructed not to modify tests. Repair is capped at **five iterations**, with stopping after **three repeated failures**. It receives current code and failure information, not the full repair history.

This is a **staged rescue pipeline**, not a randomized equal-call comparison of test-bearing and test-free prompts across every task. The added prompt constraints and the extra attempt are not cleanly separated.

## Findings

Tables 1 and 3 report cumulative success **after private-test validation**. Parenthesized gains below are percentage-point changes from the preceding stage, not relative improvements.

| Model / benchmark | Statement alone | After supplied tests | After remediation |
|---|---:|---:|---:|
| GPT-4 / MBPP, 399 tasks | 69.67% | 82.45% (+12.78 pp) | 87.71% (+5.26 pp) |
| GPT-4 / HumanEval, 164 tasks | 78.66% | 87.81% (+9.15 pp) | 93.30% (+5.49 pp) |
| GPT-4 / CodeChef, 1,100 tasks | 23.00% | 26.09% (+3.09 pp) | 30.27% (+4.18 pp) |
| Llama 3 / MBPP, 399 tasks | 46.37% | 75.94% (+29.57 pp) | 84.96% (+9.02 pp) |
| Llama 3 / HumanEval, 164 tasks | 62.20% | 75.61% (+13.41 pp) | 84.15% (+8.54 pp) |

- **Which tasks benefit?** Manual inspection identifies signature mismatches, formulas/geometric calculations, string and regex edge cases, nested dictionaries/tuples, input/output formats, and algorithmic criteria such as sorting or maximum differences (§4.2). These are illustrative examples, not counted causal subgroups. Remediation helps arithmetic/type mistakes and boundary handling; core-requirement misunderstandings, complex constraints, and performance timeouts can persist (§4.3).
- **Difficulty matters.** CodeChef public-test success is **393/1,100** without tests, plus **85** rescued by supplied examples and **103** by remediation. Private success remains only **30.27%** after all stages versus **52.82%** public success. Easier tasks often need only examples; medium tasks benefit from repair; the hardest frequently remain unsolved (§5.1). No per-difficulty effect size is established here.
- **Test diversity is not coverage.** In the test-count experiment, subsets contain **398 MBPP** tasks with at least three tests and **143 HumanEval** tasks with at least four. Correctness generally rises as tests are added, but some previously solved tasks become incorrect, and MBPP starts declining with three tests. The first test already attains **100% reference-solution line coverage in 92.4% of MBPP and 75% of HumanEval cases** (§5.2). Semantic information can improve despite saturated coverage. The proposed “lost in the middle” explanation is a hypothesis, not a measured mechanism.
- The public-test repair account lists **21 MBPP** rescues (11/7/2/1 across attempts one through four) and **nine HumanEval** rescues (7/1/1 across attempts one through three); no task is rescued on the fifth attempt (§4.3). Those counts are useful, but their printed accompanying percentages are inconsistent with the dataset sizes.

## Analyst Takeaways

1. **Tests have two jobs in an AI factory: evidence and specification context.** Supply independently justified examples before generation where they disambiguate the contract. This supports `guides/test-quality.md`'s expected-behavior-first and explicit-value standards without establishing a mandatory TDD sequence.
2. **Do not mistake the result for “write more agent tests.”** The supplied oracles predate implementation. Compare [agent-native test creation](/dossiers/agent-generated-tests-software-engineering-value.md): prompting GPT-5.2 to write tests on 322 additional SWE-bench tasks leaves success at 359/500. Input specification quality and test-artifact production are different interventions.
3. **Expose precise signatures, boundary behavior, and input/output examples.** The qualitative task inspection suggests where examples buy the most information. Preserve explicit expectations and cover the unseen risks separately; a public pass does not certify held-out behavior or performance.
4. **Qualifies, rather than settles, the human-era hypothesis.** Small function-level tests materially help these models, so “AI needs longer workflows instead of unit examples” is not supported. Their value as prompt constraints may be specifically important for AI, but no human-versus-AI trial or matched small-versus-long test design is conducted. The no-tautology principle is not contradicted: these useful tests carry external expectations.
5. **Measure the marginal gain and cost of added examples.** Test count is not monotonically beneficial, line coverage saturates early, and rescue attempts have diminishing returns. A factory should evaluate held-out correctness under matched attempts and prompt budgets, not impose a layer ratio from this benchmark.

## Questions and Limitations

- The archived manuscript predates ASE publication. The registered proceedings article establishes publication status and source identity; its full final text was not used to claim that every v2 result survived unchanged.
- The staged design gives additional calls to failed tasks and retains earlier successes; it cannot establish the isolated causal gain of including tests versus another test-free generation attempt. There are no reported repeated-run confidence intervals for the main rates.
- **Internal numerical inconsistencies:** §4.2 says 12.0%/8.5% correspond to 51/15 extra tasks, but these counts over 399/164 are approximately 12.78%/9.15%. §4.3 labels 21/9 rescues as 2.8%/3%, although they are approximately 5.26%/5.49%. Prefer the explicitly denominated private-evaluation tables; do not silently reconcile public and private counts.
- §3.2 says verification uses “all available tests,” while §3.1 and RQ4 explicitly withhold EvalPlus tests. The public-guided/private-scored separation is the stated intent, but the wording is imprecise.
- Python puzzle and competitive-programming synthesis is not repository maintenance, browser automation, concurrency, or production regression prevention. Benchmarks may be contaminated; fixed seed and zero temperature do not eliminate model variability.
- Incorrect/non-deterministic problems and evaluator/environment errors are filtered or ignored; the paper does not present a comprehensive exclusion ledger. Tests remain imperfect proxies, including private ones.

## Vault Ideas Extracted

* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md) — add supplied tests as generation-time disambiguation, with the staged-attempt caveat.
* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md) — separate visible-example fit from expanded private evaluation.
* [Verifier Co-Evolution Under Optimization](/vault/verifier-co-evolution.md) — semantic diversity and held-out tests matter after reference line coverage saturates.
