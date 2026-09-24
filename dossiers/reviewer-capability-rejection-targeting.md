---
type: Study Note
title: "Reviewer Capability Governs Rejection Targeting, Not Repair Skill: Evidence from LLM Execute–Review–Revise Pipelines"
description: "Paired 100-problem review experiment separating error detection, false rejection, critique uptake, repairs, damage, and token cost across reviewer capability tiers."
resource: https://arxiv.org/abs/2609.04270v1
source: /archive/reviewer-capability-rejection-targeting.pdf
tags: [agents, multi-agent, evaluation, verification, llm-as-judge, reliability]
timestamp: 2026-09-24T03:45:40Z
---

# Reviewer Capability Governs Rejection Targeting, Not Repair Skill: Evidence from LLM Execute–Review–Revise Pipelines — Study Notes

**Author**: Faizan Tanveer  
**Venue**: arXiv:2609.04270v1 [cs.SE]  
**Date**: September 2, 2026  
**Actual test domain**: Numeric-answer olympiad mathematics, **not code review**. Its execution/reviewer pipeline is relevant by analogy to AI reviewing AI code but does not demonstrate code-review performance.

## What It Is

A paired experiment asking whether adding a reviewer helps a fixed executor, and whether error-detection recall predicts final quality. For each of 100 Omni-MATH problems, Gemini 3.1 Flash-Lite produces one initial answer. The identical answer is reviewed under self-review (Gemini 3.1 Flash-Lite), cross-family mid-tier review (gpt-oss-20b), and weak review (Llama-3.1-8B); a no-review condition retains the initial answer. A reviewer sees problem and answer, emits accept or reject plus critique without ground truth; on rejection the original executor gets one revision. Exact numeric reference answers grade both initial and final responses, with no model judge in the scoring path.

The study separates **targeting** (does the reviewer reject wrong answers without rejecting right ones?) from **repair/uptake** (does an actual revision correct the answer, damage it, leave it unchanged, or change one wrong answer to another?). This distinction directly challenges using criticism frequency or “detected error” counts as the sole way to select a model reviewer.

## Experimental Boundaries

Problems are selected from Omni-MATH difficulty 5.0–6.0, restricted to integer/decimal references and cleaned for malformed chained tasks, then shuffled to 100 with a recorded seed. This favors number theory/combinatorics and excludes proofs or symbolic expressions. All conditions start from the *same* initial solutions (52 correct, 48 wrong). Reviews empty or unparseable are counted as accepts and flagged. An initial 8,000-token/minute provider rate limit truncated 29% of mid-tier reviews; the authors shortened reviewer inputs for *all* conditions, preserving the last 2,000 characters of each answer, and regenerated the final run. Still **16%** of cross-family reviews remained unparseable, so its measured recall is conservative; the weak model's behavior is prompt-length-dependent.

## Results

| Reviewer | Final correct / 100 | Wrong-answer rejection (recall) | False rejection of 52 correct | Total rejections |
|---|---:|---:|---:|---:|
| None | 52 | — | — | 0 |
| Same-model self-review | 58 (+6 pp; McNemar p = 0.146) | 0.85 | 18/52 (35%) | 59 |
| Cross-family mid-tier | **64 (+12 pp; p = 0.0005)** | 0.56 | **1/52 (2%)** | 28 |
| Weak | 52 (no gain) | 0.04 | 0/52 | 2 |

Self-review rejected **2.1 times** as many answers as cross-family review and had higher detection recall, but 18 false rejections versus one. Among all rejections, its repairs were **9/59 (15%)**, damage **3/59**, no-change **24/59 (41%)**, and wrong-to-wrong **23/59**. Cross-family review repaired **12/28 (43%)**, damaged **zero of 28 observed**, returned no change **4/28 (14%)**, and wrong-to-wrong **12/28**. The repair-rate comparison gives Fisher p = 0.0074; paired false-rejection difference p = 0.000015. However, conditional on the executor *actually changing* an answer, repair is 9/35 (26%) versus 12/24 (50%), p = 0.096: evidence for superior **targeting** is stronger than evidence for inherent **repair skill**.

Of 18 correct answers falsely rejected by self-review, the executor ignored 15 and changed three; **all three changed answers became wrong**. Its low observed damage thus reflects revision inertia, not good reviewer calibration. The weak reviewer accepted almost everything and changed no final answer under the shortened prompt; it doubled approximate token cost without benefit. Provider-reported tokens/task: no review **668**, self **2,207**, cross-family **3,511**, weak **1,353**. Incremental tokens per extra correct answer are approximately **25,600** for self and **23,700** for cross-family. The direct cross-family versus self final-accuracy difference is *not statistically established* (p = 0.238).

## Analyst Takeaways

1. **Assess a critic by final decision quality, not how many defects it flags.** Track incorrect initial answers recovered, correct answers broken, false-rejection rate, ignored critiques, and marginal tokens/cost on the same examples.
2. **Gate critique uptake.** A harsh reviewer can appear harmless if a conservative executor ignores it; if the workflow later increases compliance, previously latent false-rejection risk becomes real.
3. **Pilot reviewer selection on paired real coding tasks before porting this result.** Cross-family selectivity is promising in this math setup but tells us nothing directly about review comments on repository PRs, novel requirements, or security defects.
4. **Include no-review and weak-review baselines.** Adding a cheap checker can consume tokens and time without changing anything; a high-recall checker can reduce usefulness by flooding revision with bad rejections.
5. **Keep grader and reviewer separate.** Exact numeric references make these outcomes credible; code tasks require independently checkable tests, behavior, and expert adjudication for cases executable oracles miss.

## Questions and Limitations

- Only 100 filtered numeric math problems, one executor, one revision, one prompt, three specific models, and free-tier provider constraints; code-review transfer is untested.
- Sixteen percent cross-family malformed reviews counted as accepts; input truncation may hide steps necessary for a valid critique.
- Small repair/damage denominators and uncorrected multiple pairwise tests limit fine ranking; cross-family versus self final accuracy is underpowered.
- Exact-answer grading does not model partially correct reasoning, code maintainability, test insufficiency, or collaborative human decisions.

## Vault Ideas Extracted

* [Staged Evidence-Grounded Judgment](/vault/staged-evidence-grounded-judgment.md)
* [Verification-Centric Generated-Review Evaluation](/vault/verification-centric-generated-review-evaluation.md)
