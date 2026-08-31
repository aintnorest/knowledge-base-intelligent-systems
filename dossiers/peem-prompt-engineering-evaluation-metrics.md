---
type: Study Note
title: "PEEM: Prompt Engineering Evaluation Metrics for Interpretable Joint Evaluation of Prompts and Responses"
description: A nine-axis LLM-judge rubric that scores the prompt and the response separately with per-criterion rationales, validated against accuracy, human ratings, paraphrases, and adversarial rewrites, then reused as feedback for zero-shot prompt rewriting.
resource: https://arxiv.org/abs/2603.10477v2
source: /archive/peem-prompt-engineering-evaluation-metrics.pdf
tags: [evaluation, llm-as-judge, prompting, prompt-optimization]
timestamp: 2026-08-25T00:00:00Z
---

# PEEM: Prompt Engineering Evaluation Metrics for Interpretable Joint Evaluation of Prompts and Responses - Study Notes

**Authors**: Minki Hong, Eunsoo Lee, Sohyun Park, Jihie Kim (corresponding) — Department of Computer Science and Artificial Intelligence, Dongguk University, South Korea
**arXiv**: [2603.10477v2](https://arxiv.org/abs/2603.10477v2) [cs.CL], 8 April 2026
**Pages**: ~15 body pages plus appendices A–H

## What It Is

PEEM is an evaluation protocol, not a model or a benchmark. It asks an LLM evaluator to score a `(prompt, response)` pair against a fixed nine-axis rubric and to emit a short natural-language rationale for each axis alongside a 1–5 Likert score.

The nine axes split into two groups:

| Group | Axes |
|---|---|
| Prompt (3) | Clarity and Structure, Linguistic Quality, Fairness |
| Response (6) | Accuracy, Coherence, Relevance, Objectivity, Clarity, Conciseness |

The prompt under evaluation is defined as `P = p ⊕ q` — an engineered instruction `p` concatenated with a task query `q` — so the rubric measures the composed artifact actually sent to the model. Two aggregates are reported: `S_prompt` (mean of the three prompt axes) and `S_response` (mean of the six response axes). "PEEM's acc" refers specifically to the Accuracy axis score, which is the quantity compared against conventional accuracy.

Everything runs zero-shot from criterion-grounded f-string templates (reproduced verbatim in Appendix E), with no evaluator fine-tuning and no in-context demonstrations. GPT-4o-mini is the default evaluator; the authors report roughly $0.002 and 1.2 seconds per prompt–response pair.

## The Problem It Targets

Standard evaluation collapses model behavior to final-answer correctness, which tells you *that* a configuration failed but not *why*. Two blind spots follow. First, the prompt itself is never scored, even though the literature the paper cites establishes heavy prompt sensitivity — so a benchmark's single fixed prompt silently confounds model capability with prompt quality. Second, existing LLM-judge frameworks (GPTScore, G-EVAL, ChatGPT-as-a-judge) score responses in isolation and emit scalars, which cannot be fed back into a repair loop.

PEEM's claim is that adding a prompt-side rubric and per-axis rationales turns evaluation output into an actionable control signal, while keeping the accuracy axis aligned enough with conventional accuracy that model rankings are preserved.

## Experimental Setup

Seven benchmarks spanning classification, reasoning, commonsense, and sentiment: AG News, ARC-Challenge, ARC-Easy, BigBench-Hard, GSM8K, MMLU, SST-2 (100 instances each for the main experiments; 30 each for robustness and human studies). Five task models: Gemma-2-9B-IT, LLaMA-3.1-8B-IT, Qwen-2.5-7B-IT, GPT-4o-mini, Gemini-2.5-Flash. Five evaluator models across the various studies, with GPT-4o-mini as default. Benchmark-provided engineered prompts are used where they exist; otherwise the raw query alone stands in as the prompt.

## Results

**Alignment with accuracy.** Over all 35 model × benchmark cells, PEEM's Accuracy axis correlates with conventional accuracy at Spearman ρ ≈ 0.97 and Pearson r ≈ 0.94 (p < 0.001). Per model, LLaMA-3.1-8B-IT and Qwen-2.5-7B-IT reach ρ = 1.00 (r ≈ 0.99), GPT-4o-mini ρ ≈ 0.96, Gemini-2.5-Flash ρ ≈ 0.96. Gemma-2-9B-IT is the outlier at ρ ≈ 0.61, r ≈ 0.77 — correct answers from mid-scale instruction-tuned models are not always accompanied by robust explanations, which is precisely the divergence PEEM is meant to surface. The strong aggregate figure is driven by between-model separation, not within-model discrimination; the authors say so explicitly.

**Cross-evaluator agreement.** Pairwise Spearman ρ among Gemini-2.5-Flash, Gemma-2-9B-IT, LLaMA-3.1-8B-IT, and Qwen-2.5-7B-IT ranges 0.68–0.85 (highest LLaMA–Qwen 0.85, lowest Gemini–LLaMA 0.68). Absolute score levels differ substantially between evaluators while relative task-model ordering (Qwen > LLaMA > Gemma) holds. This supports comparing systems under one fixed evaluator, not comparing absolute PEEM numbers across evaluators.

**Human alignment.** Three AI graduate students independently scored 210 instances (Gemma-2-9B-IT outputs) on the six response axes against a PEEM consensus averaged over four evaluators. Overall Pearson r = 0.84, Spearman ρ = 0.72. Per axis, Accuracy (ρ = 0.71) and Conciseness (ρ = 0.76) align best; Objectivity is weakest at ρ = 0.35, which the authors attribute to a ceiling effect — nearly everything scores near 5, so rank correlation has almost nothing to work with. Krippendorff's α = 0.59 with 99.5% ±1 agreement. PEEM's mean (4.70) runs above the human mean (4.58): the usual judge leniency.

**Prompt rewriting.** The headline application. Each round, PEEM scores the current prompt–response pair, and a rewrite model produces two candidates: `Ps = Rewrite(P, s)` from scores only, and `Pc = Rewrite(P, s, r)` from scores plus rationales. Up to four rounds, carrying `Pc` forward. With Gemma-2-9B-IT as task model and GPT-4o-mini as evaluator:

| Method | AG News | SST-2 | GSM8K |
|---|---|---|---|
| Initial prompt `Pi` | 59.0 | 73.9 | 57.1 |
| Score-only rewrite `Ps` | 70.4 | 87.7 | 58.8 |
| Score + rationale rewrite `Pc` | 83.9 | 92.2 | 65.3 |
| PRewrite-S (RL, PaLM2-S) | 85.2 | 96.6 | 53.6 |
| TEMPERA | 81.3 | 92.0 | — |

Rationales beat scalars on all three tasks — that comparison is internally controlled and is the paper's most defensible result. The abstract's "up to 11.7 points" is the GSM8K margin over PRewrite-S (65.3 vs 53.6). On AG News and SST-2, PEEM-guided rewriting *loses* to PRewrite-S, and the baseline row is cited from the PRewrite paper under a different task model, so the cross-method comparison is not controlled.

**Perturbation tracking.** Across four iterative rewrites, prompt score, response score, and accuracy rise together on all three benchmarks (AG News 59.0 → 78.6 accuracy with prompt score 4.06 → 4.78).

**Adversarial detection.** Four manipulation types applied to 210 sampled instances. With GPT-4o-mini as evaluator, misleading (ΔP −0.40), contradictory (−0.73), and underspecified (−0.39) prompts all lose prompt-quality points with matching response-quality drops. Jailbreak prompts invert: prompt score *rises* (+0.73) because directive command structure reads as well-formed, while response quality collapses (−0.93, and −2.10 to −3.23 on reasoning benchmarks per Appendix G). This divergence is the clearest argument in the paper for scoring both sides — surface prompt form alone is not a quality signal.

**Paraphrase stability.** Three meaning-preserving paraphrases per prompt. Robustness rate 76.7–80.6% (Gemma highest at 80.6% with lowest variance 0.31; Gemini lowest at 78.1% with variance 0.45; GPT-4o-mini 76.7%).

**Error analysis.** Of 700 sampled instances, only 13 (1.9%) diverged from ground truth by |Δs| ≥ 2: 8 false positives (plausible-but-wrong reasoning, correct steps with a final arithmetic slip, genuinely ambiguous labels) and 5 false negatives (unconventional valid reasoning, terse correct answers penalized for missing justification, format mismatch).

## Analyst Takeaways

1. **Score the prompt as an object, separately from the response.** The jailbreak case makes the argument concretely: a prompt can be clearer, better structured, and more directive while being strictly worse. A single blended quality number would have hidden that; two numbers made it a diagnosis.
2. **Divergence between the two scores is the signal worth alerting on.** Prompt up / response down means form without substance. Prompt down / response up means the model is compensating for a weak prompt, which is fragile. Log the pair, not the mean.
3. **A criterion-decomposed rationale is a materially better feedback signal than a scalar.** `Pc` > `Ps` on every task tested, with no gradients, no training data, and no human annotation. If you already run an LLM judge, the marginal cost of asking for per-axis justification is small and the rewrite loop gets a target to act on.
4. **Fix one evaluator and treat its absolute scores as arbitrary.** Rank ordering survived across four evaluators; score levels did not (Gemma is consistently lenient, Qwen strict). Never compare a PEEM number produced by one judge against a number produced by another.
5. **Validate a judge in both directions.** Requiring stability under paraphrase *and* degradation under semantic corruption is a stronger test than either alone: a constant function passes the first, a noise detector passes neither, and a lexical scorer passes neither reliably.
6. **Watch for ceiling compression before trusting an axis.** Objectivity scores 4.94 mean with ρ = 0.35 against humans. An axis where everything scores near the top carries almost no information regardless of how well-defined the criterion reads.

## Questions and Limitations

- **Ceiling effects throughout.** In Table 5, essentially every prompt-overall and response-overall figure sits between 3.78 and 4.91 on a 1–5 scale. The usable dynamic range is under one and a half points, which limits how finely PEEM can rank near-neighbors even where it separates models well.
- **The prompt-quality axis partly measures the presence of an instruction.** Appendix G concedes that on AG News and SST-2 the "original prompt" is raw input text with no engineered instruction, so adversarial variants that inject directive language paradoxically raise prompt scores. Prompt-side scores are therefore not comparable across benchmarks with different prompt conventions.
- **Evaluator-agnosticism is weaker than claimed for adversarial detection.** Gemma-2-9B-IT registers only −0.05 to −0.10 ΔP on misleading, contradictory, and underspecified prompts, versus −0.39 to −0.83 for GPT-4o-mini and Gemini-2.5-Flash. A small open-weight evaluator can pass the ranking test while barely detecting semantic corruption.
- **Internal numerical inconsistencies.** (a) Section 4.3 states `Ps` improves over `Pi` by 8.2–24.9 points and `Pc` adds 1.7–13.8; the tabulated values are the reverse assignment — 8.2–24.9 is the `Pc − Pi` range and 1.7–13.8 is `Ps − Pi`. (b) Table 8's `Pc` results (AG News 83.9, SST-2 92.2) do not match Table 10's fourth-rewrite endpoints (78.6, 89.4) for the same reported setup; only GSM8K (65.3) agrees. (c) Section 4.2.2 reports evaluator means of 4.51 (Gemma) and 3.86 (Qwen) while Appendix B reports 4.64 and 3.94.
- **The rewriting comparison is not apples-to-apples.** Baseline rows are cited from PRewrite rather than re-run, under a different task model. PEEM's rewriting also uses GPT-4o-mini as evaluator and rewriter while the task model is Gemma-2-9B-IT, so part of the gain may be frontier-model distillation into the prompt rather than the rubric's contribution.
- **No cost accounting against baselines.** Four rewrite rounds, each with a response generation plus a nine-axis rationale-producing evaluation, is a real per-instance bill. The paper reports per-evaluation cost but never compares total optimization cost with the RL baselines it claims to beat.
- **Author-acknowledged gaps.** English-only benchmarks; a 210-sample human study with non-expert annotators (weakest exactly on the subjective Fairness and Objectivity axes it would most need to validate); no systematic analysis of how prompt length independently affects scores; no calibration for the identified failure modes.
- **Fairness is scored but never validated.** It is one of the three prompt axes, yet the human study covers only the six response axes. There is no evidence in the paper that PEEM's Fairness scores track any human judgment of fairness.

## Vault Ideas Extracted

* [Joint Prompt–Response Evaluation](/vault/joint-prompt-response-evaluation.md)
* [Rationale-Guided Prompt Rewriting](/vault/rationale-guided-prompt-rewriting.md)
* [Paraphrase–Adversarial Evaluator Validation](/vault/paraphrase-adversarial-evaluator-validation.md)
