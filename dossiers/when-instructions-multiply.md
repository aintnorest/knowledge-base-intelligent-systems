---
type: Study Note
title: "When Instructions Multiply: Measuring and Estimating LLM Capabilities of Multiple Instructions Following"
description: Controlled text and code benchmarks separate individual-rule accuracy from all-satisfied reliability, expose count-dependent judge inflation, and estimate joint success with count-only logistic regression.
resource: https://doi.org/10.18653/v1/2025.findings-emnlp.896
source: /archive/when-instructions-multiply.pdf
tags: [prompting, evaluation, verification, reliability, benchmark, llm-as-judge]
timestamp: 2026-10-04T06:39:21Z
---

# When Instructions Multiply — Study Notes

**Authors**: Keno Harada, Yudai Yamazaki, Masachika Taniguchi, Edison Marrese-Taylor, Takeshi Kojima, Yusuke Iwasawa, and Yutaka Matsuo; University of Tokyo, Kyoto University, and University of the Ryukyus.  
**Status**: Peer-reviewed Findings of EMNLP 2025 paper, November 2025, pp. 16506–16526; archived ACL Anthology publication. This is the published successor of the anonymous ICLR 2025 draft *Curse of Instructions*. The draft is not separately ingested, and its self-refinement results must not be attributed to this published paper.

## What It Is

Two benchmarks and a performance-estimation study of satisfying multiple compatible instructions in one response. **ManyIFEval** holds 216 text-generation task descriptions fixed while varying added instructions from 1 to 10, producing **2,160 prompts**. **StyleMBPP** adds 1–6 code-style requirements to 500 Python problems, producing **3,000 prompts**. Ten models are evaluated; multiple reasoning-effort conditions for one model do not increase the model count.

## Problem and Motivation

Success on an isolated rule does not establish reliability on a whole contract. Existing benchmarks often change the underlying task with instruction count, have uneven sample counts, or use model judges that miss violations. Exhaustively evaluating instruction combinations is also expensive. The paper tries to measure count effects under a stable task distribution and estimate joint success without testing every combination.

## Mechanism as an Idea

ManyIFEval retains **15 programmatically verifiable instruction types** from IFEval, removing incompatible or extremely difficult types and selecting non-conflicting combinations. These cover required/forbidden words, length/counts, formatting, letter case, beginnings/endings, and punctuation. StyleMBPP checks license text, indentation, docstrings, comparison style, line length, and variable-name length; functional correctness is separately assessed by the underlying test cases.

The paper explicitly separates:

- **Instruction-level accuracy**: satisfied individual checks divided by all checks across responses.
- **Prompt-level accuracy**: fraction of responses satisfying **every** added instruction. One failed rule makes that response a failure.
- **Task success plus all instructions**: in code generation, passing all functional tests **and** all style constraints. Prompt-level style accuracy alone is not functional correctness.

Prediction models estimate the probability of all-satisfied success. A naive product of isolated-rule success rates assumes independence and ignores how a rule becomes harder in company. A beta-binomial models shared variation; logistic regression instead fits joint success from instruction count alone or count plus rule identities. Held-out splits exclude shared task descriptions and selected instruction combinations; combination disjointness is explicitly enforced for the five-instruction text and three-instruction code cases, not claimed for every possible count.

## Results and Admissions

Tables 8 and 9 expose the gap between whole-response and individual-rule performance at **10 instructions**:

| Model | Prompt-level: all satisfied | Instruction-level: average check |
|---|---:|---:|
| GPT-4o | 0.21 | 0.85 |
| Claude 3.5 Sonnet | 0.48 | 0.93 |
| Gemini 1.5 Pro | 0.39 | 0.92 |
| DeepSeek-R1 | 0.38 | 0.92 |
| o3-mini, high reasoning effort | 0.78 | 0.98 |

At six code-style instructions, Table 11 gives **GPT-4o 0.68**, **Claude 3.5 Sonnet 0.01**, **Gemini 1.5 Pro 0.13**, and **o3-mini high 0.37** prompt-level accuracy. These are style-only joint scores. Functional test success remains comparatively stable, but simultaneous functional-and-style success degrades. Line-length adherence falls from **99% to 20%** for Gemini and **97% to 2%** for Claude when combined with five other rules. A model's text-generation ranking therefore need not transfer to code-style compliance.

**Judge inflation grows with count.** Table 2 compares rule-based prompt accuracy with a zero-shot GPT-4o judge: at five instructions **0.574 vs. 0.815**, and at ten **0.213 vs. 0.657**. The apparent success gap increases from **24.1 to 44.4 percentage points** (differences calculated from the table). A judge can conceal the failure curve instead of merely adding constant noise.

Count-only logistic regression predicts held-out prompt-level accuracy with mean absolute errors within **0.1** in the reported comparisons. Table 3 gives **0.04 ± 0.03 at n=5** and **0.02 ± 0.03 at n=10** for ManyIFEval, and **0.06 ± 0.05 at n=3** and **0.05 ± 0.03 at n=6** for StyleMBPP. The abstract's “approximately 10% error” is an approximate **absolute probability error**, not a 10% relative-error guarantee or an individual-response classifier's error rate. Training on counts up to nine and predicting ten yields **0.03 ± 0.04** mean absolute error across six models; training only through five yields **0.15 ± 0.16** (Table 4).

The sample-size experiment on GPT-4o stabilizes around **500 text samples** and **300 code samples**, roughly 50 task descriptions per count. This is an empirical calibration result for these distributions, not a universal sample-size theorem. Products using isolated-rule accuracy predict poorly; products using accuracy measured under the actual count fit much better, illustrating why isolated compliance cannot be carried unchanged into a dense prompt.

## Reconciliation with the Other Count Studies

[IFScale](/dossiers/ifscale-how-many-instructions.md) reports **per-keyword inclusion**, whereas the low values in this paper's Table 8 are **all-satisfied response rates**. Its roughly 68% score at 500 simple keyword rules is not better or worse on the same scale as GPT-4o's 21% joint success at ten heterogeneous rules. The companion Table 9 is the closer metric match, but rule families, task domain, retries, and models still differ.

[Prompt Design at Scale](/dossiers/prompt-design-at-scale.md) uses an all-satisfied primary metric too, but five persistent structural rules plus an increasing number of include/forbid constraints. That changes the difficulty mix as count rises, unlike a stable homogeneous keyword task. Its near-zero perfect-response rate by 80 rules is not inconsistent with high per-rule inclusion through 150+ rules in IFScale.

The model populations also differ: this study includes 2024 GPT-4o, Claude 3.5 and Gemini 1.5 snapshots alongside newer reasoning models; IFScale evaluates a 2025 generation including o3 and Gemini 2.5; the July 2026 preprint reports Sonnet 5 and Gemini 3.5 Flash. **Neither count cutoffs nor vendor rankings are portable across these populations.**

## Analyst Takeaways

1. **Measure the whole contract alongside its components.** A high average-rule score can coexist with low deliverable reliability; keep core task success as a third axis.
2. **Validate count-dependent judge error.** Use executable oracles for crisp rules and audit errors across the count ladder, not only on sparse examples.
3. **Calibrate a local density curve before optimizing wording.** Count-only prediction can be a cheap empirical baseline; it is not evidence that identities and interactions never matter.
4. **Treat reasoning as a measured trade-off.** It improves several tested conditions, but code-style rankings and individual rules reveal exceptions rather than a universal reasoning advantage.

## Questions and Limitations

- Compatible, mechanically verifiable requirements exclude semantic, conditional, sequential, and conflicting instructions. Real policy systems need additional tests.
- Very difficult isolated rules were filtered out. The benchmark is not an unbiased sample of every real requirement.
- Observation of decay and an illustrative reasoning trace do not identify an internal causal mechanism.
- How far can a locally fitted count model extrapolate to new rule families, longer outputs, or unseen model revisions? The tested range does not establish a general law.
- Can staged disclosure or external verification reduce active-rule load without losing cross-stage obligations? This paper does not test that intervention.

## Vault Ideas Extracted

* [Instruction-Density Compliance Decay](/vault/instruction-density-compliance-decay.md)
* [LLM-as-Judge with Anti-Inflation](/vault/llm-as-judge-with-anti-inflation.md)
