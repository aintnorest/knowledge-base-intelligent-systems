---
type: Synthesis
title: Disagreement-Selected Clarification
description: Selecting concrete intent questions from behavioral differences among candidate programs or formalized requirements, without mistaking consensus for correctness.
tags: [requirements-engineering, human-in-the-loop, verification, llm-code-testing, coding-agents, agents]
timestamp: 2026-10-05T21:56:46Z
---

# Disagreement-Selected Clarification

When a request admits competing interpretations, ask the intent owner about a concrete behavior that separates them. Candidate disagreement can both gate **whether to ask** and supply **what to ask**; the owner's answer supplies authority. This complements [Clarification Need Decision](/vault/clarification-need-decision.md), which also considers answerability, stakes, and interruption cost.

## How It Works

There are three useful routes to a behavioral difference:

- **Execute candidate programs against distinguishing tests.** Generate programs and proposed tests independently from the request, then prefer tests that split surviving programs into approximately equal passing and failing groups. Ask whether the proposed input/output assertion matches intent. Accepting or rejecting it filters candidates mechanically; asking for the correct output provides a stronger constraint but demands more mental computation.
- **Compare sampled formalizations by semantic equivalence.** Translate requirements into multiple logical models and group logically equivalent translations rather than counting differences in wording. A scenario accepted by one interpretation and rejected by another becomes a bounded question about intended behavior.
- **Cluster observed outputs, then regenerate.** Execute sampled programs on shared inputs without requiring trusted expected outputs. Behavioral differences trigger clarification and supply representative interpretations for question generation. Append the answers to the request and generate a new implementation, rather than only pruning the original population. Regeneration can escape a deficient pool, but the new code must still be checked for answer incorporation.

Agreement permits only provisional selection of a dominant interpretation. Meaningful disagreement can trigger clarification; very high disagreement can instead justify abstaining and asking for reformulation, because the system may lack a usable interpretation. These are decision patterns, not calibrated universal entropy thresholds.

## Practical Use

Present the input or situation, the competing observable outcomes, and the assumption being resolved. Let the owner accept or reject a proposed outcome, provide another outcome, or mark the case undefined or uncertain. An undefined case should not justify candidate pruning. Preserve approved examples as partial specification and regression evidence, not proof that all intended behavior has been captured.

After a decision, enforce it through execution or revise the formal model and reanalyze. Do not replace the owner with a model critic without making that transfer of interpretive authority explicit. Formal-model review also needs the [translation and premise trust boundary](/vault/machine-readable-agent-specifications.md).

A published execution-disagreement study reported **88.57% precision, 87.94% recall, and 88.25% F1** against manually annotated task descriptions. With test-informed human answers, Pass@1 rose **70.96%→80.80%** under ordinary tests and **51.52%→60.19%** under extended tests on the same task descriptions. These results support a detector-plus-regeneration intervention under an extra trusted-information channel, not equal-information superiority or calibrated asking in open-ended development.

## Limitations

- Consensus can share a wrong meaning; disagreement can reflect translator weakness rather than actual ambiguity. Sampling cannot recover a correct candidate or interpretation absent from its population.
- Incorrect user answers can prune correct programs. Expected-output questions increase burden and expose calculation errors; skipping uncertain questions sacrifices information but avoids unjustified elimination.
- Binary alternatives can anchor the owner or omit a third intended reading. Scenario filtering can hide rare consequential differences, and finite examples leave unseen behavior unresolved.
- Benchmark gains under a perfect reference oracle do not establish real-user gains, equal-cost superiority, or production-scale applicability. Small curated human studies and qualitative vendor designs support different strengths of claim.
- Shared implementation errors can hide ambiguity; implementation defects or invalid generated inputs can create spurious disagreement. Repeated sampling and execution add cost, especially with complex inputs or side effects. Oracle-assisted human or simulated answers must not be presented as unaided stakeholder intent.

## Sources

- [LLM-Based Test-Driven Interactive Code Generation: User Study and Empirical Evaluation dossier](/dossiers/ticoder-test-driven-interactive-code-generation.md) — TiCoder selects partitioning tests and filters programs with user feedback; its human study uses curated small tasks, while benchmark gains assume a perfect oracle and aggregate headlines contain internal inconsistencies.
- [Requirements analysis: catching requirement bugs before they become code dossier](/dossiers/kiro-requirements-analysis.md) — Kiro's May 2026 vendor design account describes logical-equivalence clustering, entropy-gated clarification or abstention, and distinguishing scenarios; it supplies no quantitative effectiveness or threshold-calibration evidence.
- [ClarifyGPT: A Framework for Enhancing LLM-Based Code Generation via Requirements Clarification dossier](/dossiers/clarifygpt-requirements-clarification-code-generation.md) — published FSE 2024 evidence for behavioral-cluster gating, targeted questions, and regeneration; measured detection and Pass@1 gains use test-informed answers and 25-program sampling. Earlier arXiv v1 materially differs from the published experimental version.
