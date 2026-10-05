---
type: Study Note
title: "Grounding AI Agents in Contracts: An Empirical Evaluation of Spec-Driven Test Generation"
description: "Explicit inferred API contracts improve historical fault detection in fixed-code greenfield testing, but add tokens and remain neither independent intent authority nor complete specifications."
resource: https://doi.org/10.1145/3842652.3843195
source: /archive/grounding-ai-agents-contracts-spec-driven-test-generation.pdf
tags: [llm-code-testing, requirements-engineering, coding-agents, evaluation, verification, agents]
timestamp: 2026-10-05T23:18:33Z
---

# Grounding AI Agents in Contracts — Study Notes

**Authors**: Michele Tufano, James McClure, José Cambronero, Runxiang Cheng, Sherry Y. Shi, Renyao Wei, Dorothy Chen, Franjo Ivančić, Livio Dalloro, and Pat Rondon; Google.  
**Published**: arXiv first posted August 17, 2026; archived revision 2 dated August 21, 2026. ACM publication dated October 4, 2026; accepted July 16, 2026.  
**Status**: SpecOps 2026 workshop proceedings article, *1st International Workshop on Specification-Driven Development Life Cycle*, DOI [10.1145/3842652.3843195](https://doi.org/10.1145/3842652.3843195). The archived arXiv manuscript includes this ACM reference; DOI metadata matches its exact title and ten authors, confirming the same work. It is workshop evidence, not a full main-conference result.

## What It Is

A two-phase agentic testing method: first infer an explicit semi-formal API contract, then generate tests against its stated conditions. The evaluation compares this cognitive scaffold with direct test generation on **90 historical Google production bugs**. It studies recovery of bug-catching expectations from **already fixed code**, not unknown-bug discovery from a faulty implementation.

## Problem and Motivation

Tests generated directly from code can execute obvious paths while missing behavioral boundaries, state transitions, and exceptional cases. An intermediate contract makes those expectations inspectable before they become assertions. The intended benefit is systematic state-space exploration, not a proof that an agent's inferred requirements are correct.

## Mechanism as an Idea

For each API, including private methods and helpers, the agent records a natural-language behavioral description, preconditions, postconditions, and test suggestions for untested conditions. It consults code, comments, documentation, caller usage, and available requirements; existing tests may be used in the general framework. Conditions are labeled tested or untested, and the second phase translates the missing protections into executable suites.

Human contract curation is supported in the design but **omitted from the experiment**: every agent-generated suggestion is accepted automatically. API coverage is encouraged rather than programmatically enforced. Semi-formal structure makes omissions easier to discuss but provides no mathematical completeness, semantic precision, or independent authority.

Both conditions use Gemini 3 Flash in the same harness and tool environment. In the **greenfield evaluation**, the target's existing tests are removed and agents see the human-fixed source, not the issue, commit message, or patch diff. Generated tests must pass fixed code; an unchanged suite is then run on reverse-patched buggy code. Detection requires a behavioral test failure, not a build failure. Post-run auditing discards, without rerunning, attempts that change pre-existing production sources; permitted edits are confined to tests and necessary build configuration, with auxiliary reasoning artifacts allowed.

## Results and Admissions

### Historical fault sensitivity and cost

There are **five independent attempts per bug per condition**. The 90 bugs span C++, Java, Python, and Go, but are filtered to reproducible faults whose human fixes affect a single production file plus tests and optional build configuration.

| Metric | Direct agent | Spec-driven agent | Interpretation |
| --- | ---: | ---: | --- |
| detect@1 | 36.9% | 41.1% | +4.2 points; p = 0.3075, not significant |
| detect@5 | 53.4% | 63.2% | +9.8 points; p = 0.0352 |
| pass@5 on fixed code | 98.9% | 98.9% | Compilation/current-code pass is not discrimination |
| Mean line coverage | 74.8% | 74.4% | −0.4 points; p = 0.3659 |
| Mean branch coverage | 46.4% | 48.9% | +2.5 points; p = 0.0034 |

The detect@5 bootstrapped 95% intervals are **43.3–63.3% baseline** and **53.3–73.3% spec-driven**. Raw distinct detections are **48 versus 57 bugs**: 45 shared, 12 unique to spec-driven, and three unique to baseline. Those counts are distinct from the reported estimated detect@5 percentages. Significant detection gains appear at k = 4 and 5, not at one or two attempts.

Table 4 reports **243.9 million versus 336.7 million total tokens**, a **38.0% increase**, with input +36.2% and output +59.1%. Tokens per unique detected bug rise **5.1M → 5.9M**, about 16.2%. The prose instead gives 336.6M total and 30.9M/19.4M output versus the table's 31.0M/19.5M; these minor reporting differences remain unresolved. The method purchases greater sensitivity, not measured token efficiency or a cost-matched superiority claim.

### Contract coverage and judged rigor

An LLM judge sees the issue, human commit description, fix diff, and inferred contract, and decides whether the contract contains the particular expectation violated by that bug. **ContractCoverage@1 is 61.1%**, increasing to **78.9% at five attempts**. This is target-defect coverage, not the fraction of all component behavior specified.

Across **450 spec-driven attempts**, detection occurs in **151/275 (54.9%)** contract-covered cases versus **34/175 (19.4%)** uncovered cases, with phi = 0.35 and Fisher p = 3.62e-14. This is an association: easier bugs can be easier both to specify and to expose. It does not prove that inserting the specific condition would cause detection.

The judge attributes **141 specification failures** to omitted methods (35), missing error handling (32), omitted transformations (27), abstracted constants (25), and missing execution constraints (22). Among **110 test-generation failures** despite judged contract coverage, inadequate inputs (37), omitted scenarios (36), weak assertions (20), flawed test logic (12), and invalid test code (5) recur. The text says these 110 exclude compilation failures but then includes five invalid-code/compilation cases; the category boundary is internally inconsistent. Fourteen additional framework/compilation failures are described separately.

Gemini 3.1 Pro judges spec-driven suites superior to baseline in **77.8%** and human suites in **56.7%** of cases; reported baseline-comparison preferences include 65.6% best practices, 68.9% readability, and 83.3% edge-case coverage. The qualitative section says it compares **83 successfully generated tests**, while these percentages appear normalized to 90-case increments; the exact denominator and suite selection are not reconciled. Randomized order, anonymized origin, and five-vote majority judgments reduce some instability, but high self-agreement (≥90%) is not human validation or proof of human-equivalent rigor.

## Analyst Takeaways

1. **An explicit contract can be useful even when inferred after implementation.** The benefit is inspectable expectations before test synthesis, not mandatory testing chronology. [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md) should distinguish a proposed scaffold from an owner-authorized acceptance contract.
2. **Keep implementation exposure in the claim.** The agent sees repaired code. [Implementation-Anchored Test Oracles](/vault/implementation-anchored-test-oracles.md) explains why this cannot establish resistance to learning faulty behavior from buggy code.
3. **Measure specification omissions separately from executable-test omissions.** Contract coverage helps locate one bottleneck; a stated expectation can still yield weak inputs, omitted scenarios, or ineffective assertions.
4. **Prefer actual two-version evidence to green-suite rhetoric.** Fixed-pass/buggy-fail evaluation grounds historical sensitivity. Neither line coverage nor judge preference substitutes for that outcome.

## Questions and Limitations

The proprietary single-organization dataset, narrow fix scope, removed tests, one generator family, and repeated-attempt budget limit transfer. No public dataset permits independent reproduction of the production results. The design offers human review but does not measure it. Contract coverage checks recall for one known bug, not hallucinated conditions, over-specification, or full semantic correctness. The direct baseline already reasons, but there is no comparison to equally budgeted explicit test planning or another structured scaffold; the intervention is not isolated from added inference. Seeing the same model in both conditions does not by itself prove contamination is irrelevant. The authors explicitly leave discovery of new production bugs to future work.

## Vault Ideas Extracted

* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md)
* [Implementation-Anchored Test Oracles](/vault/implementation-anchored-test-oracles.md)
