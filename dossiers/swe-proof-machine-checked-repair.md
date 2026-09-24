---
type: Study Note
title: "SWE-Proof: Can Language Models Resolve Real-World Issues with Machine-Checked Proofs?"
description: BenchProofer builds formal specifications, verified reference implementations, and audited correspondences for real issue repairs, exposing test incompleteness and the difficulty of specifying complete intent.
resource: https://arxiv.org/abs/2609.21190v1
source: /archive/swe-proof-machine-checked-repair.pdf
tags: [verification, coding-agents, benchmark, evaluation, agents]
timestamp: 2026-09-24T03:44:35Z
---

# SWE-Proof: Can Language Models Resolve Real-World Issues with Machine-Checked Proofs? — Study Notes

**Authors**: George Ma, Benjamin Mikek, Haoyu Li, Ferhat Erata, Yuhao Zhang, Zeren Shui, Behrooz Omidvar Tehrani, Jun Huan, Murali Krishna Ramanathan, Somayeh Sojoudi, Hao Zhou, and Anoop Deoras  
**Organizations**: UC Berkeley, Georgia Tech, UIUC, and AWS AI Labs  
**Venue**: arXiv:2609.21190v1 [cs.LG]; preprint under review  
**Date**: September 18, 2026

## What It Is

SWE-Proof is an attempt to pair **real repository issues** with machine-checked specifications and proofs rather than rely solely on incomplete hidden tests. BenchProofer constructs a formal specification, a verified reference implementation, a pre-fix implementation that must *fail* verification, environment axioms, and a Python patch equivalent to the modeled implementation. It covers the **500 SWE-bench Verified** issues across Nagini, Velvet, and Lean backends and builds verified artifacts for **242/266** Python SWE-bench Pro issues. It is not a theorem that an arbitrary Python patch fixes every intended behavior: proofs cover modeled code under explicit axioms, while correspondence to actual repository code and informal intent is audited empirically.

## Construction and Trust Boundaries

1. **Translate intent with privileged construction evidence.** The builder can see the original issue, buggy repository, reference/gold patch, new tests, and fail-to-pass/pass-to-pass lists; evaluation agents are not given that gold patch. It renders the fix and pre-fix behavior in the formal backend.
2. **Axiomatize unchanged callees.** Rather than prove an entire dependency graph, summarize each unchanged function with a property the proof needs. Fuzz the actual callee with random and adversarial inputs and reject any axiom an observed execution contradicts; an untested false axiom would invalidate the proof's applicability to the real program.
3. **Mechanically gate the artifact.** The reference implementation must verify; pre-fix code must not; first-order mutants should fail sufficiently often; proof escape hatches and unapproved imports are disallowed; the ground-truth patch must pass the original official test harness.
4. **Adversarially challenge correspondence.** Auditors seek wrong implementations that nevertheless verify, valid implementations wrongly rejected, violations of callee axioms, divergence between formal implementation and patched Python, and leaked patch hints. A conformance gate executes an implementation shadow against the patched repository on at least **105 generated inputs**; pure Lean/Velvet shadows require a Python translation and are particularly vulnerable to translation errors.
5. **Record auditable evidence.** The proposed verify-implies-resolve statement assumes both sound callee axioms and equivalence between formal implementation and submitted Python patch. No mechanical check proves informal intent matches the formal contract or proves the cross-language refinement relation.

## Evaluation and Results

- Across the same 500 tasks, unaided **Claude Opus 4.8** patches pass hidden tests on **85.0%** and **GPT-5.5** on **81.2%**. An adversarial audit looking for an input where a passing patch differs from the ground-truth patch lowers these to **58.2%** and **33.4%**, respectively. Relative to test-passers, the overturn fractions are about **31.5%** and **58.9%**; the source elsewhere describes “a quarter to a half” and calls **26.8 points** an overturn amount, apparently taking the Opus absolute difference. These measures are *audit-detectable divergence from a gold patch*, not a machine-proven count of all wrong patches; valid alternative behavior could also differ from the chosen gold patch.
- Asking the agent to **write its own formal spec** and verify does not raise test-resolution over unaided baseline: with Nagini **85.6%** for Opus versus **85.0%**, and **80.2%** for GPT versus **81.2%**; other backends are similarly flat or worse. Formal machinery cannot rescue a weak or incomplete self-authored contract.
- Providing a constructed **ground-truth specification** with localization raises Nagini test-resolution to **96.2%** (Opus) and **94.4%** (GPT); requiring formal verification and correspondence still gives **95.0%** and **94.6%**. The paper claims roughly **85→95%** for Opus in this setting. Localization alone yields **88.2%** and **87.0%**, so some of the gain comes simply from being told where to work.
- Independently audited *model-authored* specifications pass all five criteria (admissibility, soundness, completeness, axiom soundness, faithfulness) in **46.0%–72.0%** of model/backend cells. Faithfulness—covering the *whole* behavioral surface of the issue—is the most frequent failure: average **42.5%** for Opus and **30.0%** for GPT across backends. In end-to-end runs, specs from unresolved tasks fail audit **89.4%** of the time, versus **47.3%** for resolved tasks.
- For SWE-bench Pro, **22** of the **266** Python tasks fail under every backend because changes such as renames, signatures, internal structure, or side effects are not visible to the available pre/postcondition value semantics; **two** more face backend-specific limits. The 242 admitted tasks therefore exclude a meaningful task class.

## Analyst Takeaways

1. **An executable TDD contract is not automatically a complete specification.** Start with human-owned expectations, and actively seek counterexamples to the visible tests; a red/green witness checks one bug, not the entire behavioral surface.
2. **Use formal proof for a property you can actually state, not as a ceremonial gate.** Before trusting the verifier, review domain/preconditions, the modeled functions, unchanged-callee axioms, and the relation of proof artifact to deployed Python patch.
3. **Make missing behavior a review question.** A self-authored spec can be internally consistent and machine-checked yet fail to constrain another affected function. Trace the requirement to every observable interface and side effect, and present omissions explicitly to a human reviewer.
4. **Retain heterogeneous checks.** Property tests, mutation tests, executable witnesses, formal contracts, conformance testing, and adversarial auditors catch different errors; mechanical proof over an abstraction does not replace checking the abstraction boundary.
5. **Do not conflate gold-patch difference with real incorrectness.** Inspect distinguishing inputs to decide whether the agent violates the user's intent or merely implements a valid alternative; a benchmark gold patch is not a unique behavioral oracle.

## Questions and Limitations

- The Verify⇒Resolve “guarantee” is explicitly conditional on unproven cross-language equivalence and sound axioms, and the intent/specification correspondence is only adversarially sampled and judged. Formal verification applies to the modeled implementation, not directly to the entire Python repository.
- All 500 benchmark cases were built with construction-time access to the gold patch and hidden tests; proof of construction success does not show an agent can synthesize the contract independently. The paper says release is planned, not necessarily completed.
- An LLM auditor can miss subtly incomplete contracts or mistake legitimate alternative behavior for a defect. The source presents an audit overturn as correctness evidence while still relying on the repository's ground-truth patch as the comparator.
- Reported overturn phrasing mixes percentage-point and share-of-passers denominators; percentages must identify their denominator. Pro coverage excludes non-value-changing and side-effect-heavy patches.

## Vault Ideas Extracted

* [Artifact-Gated Agent Evaluation](/vault/artifact-gated-agent-evaluation.md)
* [Expectation-First Coding Contract](/vault/expectation-first-coding-contract.md)
* [Verifier Co-Evolution Under Optimization](/vault/verifier-co-evolution.md)
