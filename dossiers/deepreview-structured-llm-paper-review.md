---
type: Study Note
title: "DeepReview: Improving LLM-based Paper Review with Human-like Deep Thinking Process"
description: Study notes on DeepReview, a three-stage decomposed reasoning framework for LLM paper review, its DeepReview-13K training dataset, DeepReviewer-14B model, and dual-axis test-time scaling.
resource: https://aclanthology.org/2025.acl-long.1420/
source: /archive/deepreview-structured-llm-paper-review.pdf
tags: [llm-as-judge, peer-review, decomposition, test-time-scaling, fine-tuning]
timestamp: 2026-07-28T21:39:03Z
---

# DeepReview: Improving LLM-based Paper Review with Human-like Deep Thinking Process — Study Notes

**Authors**: Minjun Zhu, Yixuan Weng, Linyi Yang, Yue Zhang (Zhejiang University, Westlake University, University College London)
**Venue**: ACL 2025 (Volume 1: Long Papers), pages 29330–29355
**DOI**: [10.18653/v1/2025.acl-long.1420](https://doi.org/10.18653/v1/2025.acl-long.1420)
**Code/Data**: https://github.com/zhu-minjun/Researcher
**Archived source**: [deepreview-structured-llm-paper-review.pdf](/archive/deepreview-structured-llm-paper-review.pdf)

## What It Is

DeepReview is a structured, multi-stage LLM reasoning framework for automated paper review, built to close the gap between shallow, single-shot LLM judgments and expert human review. The authors decompose review into three explicit reasoning stages — novelty verification, multi-dimension evaluation, and reliability verification — rather than asking a model to emit a rating and rationale in one pass. They train DeepReviewer-14B (a fine-tuned Phi-4 14B) on a purpose-built dataset, DeepReview-13K, and evaluate it on a held-out benchmark, DeepReview-Bench. The paper explicitly frames the work as LLM *assistance* in peer review, not replacement of human reviewers.

## The Problem

Existing LLM-based review systems fall into two camps, both limited: (1) prompt-based agents simulating the review process (AI Scientist, AgentReview), which suffer from hallucinated reasoning and are easily manipulated by prompt-injected instructions in the paper text; and (2) fine-tuned models trained on aggregated review outcomes (CycleReviewer, ReviewMT), which learn to predict a score without learning the intermediate reasoning that produced it. Neither has access to a dataset capturing fine-grained, structured review reasoning chains, so both are prone to shortcut learning, superficial feedback, and lack of evidence-based justification.

## Data Construction: DeepReview-13K

The authors scraped 18,976 ICLR 2024–2025 submissions from OpenReview, converted them to Markdown via MinerU (preferring LaTeX source when available), and assembled a review set per paper containing textual assessments (Strengths/Weaknesses/Questions), rebuttal-phase discussion, standardized scores (overall rating 1–10; Soundness/Presentation/Contribution 1–4), and meta-review text with final decision. After filtering, 13,378 valid samples remained (DeepReview-13K); a random 10% held-out split (1.2K samples) became DeepReview-Bench.

The key move is not just collecting scores but *synthesizing the reasoning chain that plausibly produced them*, via an automated three-stage pipeline:

1. **Novelty Verification (z1)** — Qwen-2.5-72B generates three research questions targeting gaps, innovation, and methodology; Gemini-2.0-Flash-Thinking analyzes the paper's motivation, ideas, methods, and experiments; Qwen-2.5-3B converts the questions into search queries against the Semantic Scholar API via OpenScholar, retrieving ~60 candidates, reranking to the top 10, and generating a grounded novelty-analysis report.
2. **Multi-dimension Review (z2)** — Qwen-2.5-72B reconstructs each human reviewer's comments together with the author's rebuttal response, converting raw criticism into concrete, evidence-backed technical suggestions under three constraints: preserve technical depth, keep feedback actionable, keep tone professional.
3. **Reliability Verification (z3)** — Gemini-2-Flash-Thinking validates weaknesses against methodology, experiments, and a comprehensive analysis, requiring supporting paper evidence and a confidence level before Qwen synthesizes a final meta-review from the original meta-review, reviewer comments, and verification outcomes. The paper calls this a four-stage chain but names only these three analysis stages.

A separate Qwen-2.5-72B quality-control pass checks each synthesized sample for logical consistency between (z1, z2, z3) and the final (score, decision), and for field completeness, discarding samples that fail.

## Model: DeepReviewer-14B

Fine-tuned from Phi-4 14B on 8×H100 with DeepSpeed ZeRO-3, context extended to 256K via LongRoPE (40K training context), 23,500 steps, batch size 16, lr 5e-6. The reasoning-chain samples are cropped into three inference modes that share one model and are selected purely by instruction at inference time:

- **Fast** — outputs (s, a) directly, skipping z1–z3 (~3,000 output tokens)
- **Standard** — executes z2 and z3 (~8,000 tokens)
- **Best** — full chain z1→z2→z3, including live Semantic Scholar/OpenScholar retrieval for novelty verification (~14,500 tokens)

Standard mode additionally supports **Reviewer Scaling**: synthesizing R=1 to R=6 simulated reviewers and aggregating their perspectives, independent of reasoning-path depth.

## Results

**Quantitative** (vs. CycleReviewer-70B and prompt-based baselines on GPT-o1/Claude-3.5-Sonnet/Gemini-2.0-Flash-Thinking/DeepSeek-V3/DeepSeek-R1 backbones): DeepReviewer-14B cuts Rating MSE by 44.80% versus CycleReviewer-70B and by an average 65.83% versus prompt-based baselines, while improving Decision Accuracy by an average 15.2 points over AI Scientist. It reaches 64.06%/68.78% decision accuracy and 0.3559/0.4047 Rating Spearman on ICLR 2024/2025 respectively — best-in-class despite being 5x smaller than CycleReviewer-70B and far cheaper per token than the closed-source baselines.

**Qualitative** (Gemini-2.0-Flash-Thinking as pairwise judge): 88.21% win rate against AI Scientist (GPT-o1) and 98.15% against AgentReview (GPT-4o) on ICLR 2024, with the largest margins in constructive value and analytical depth. Notably Gemini itself judged DeepReviewer's reviews as superior to Gemini-backed AI Scientist reviews (53.47% win) even though Gemini was also the acting judge — the authors read this as evidence the eval framework is not simply judge-favoritism.

**Adversarial robustness**: prompt-injected malicious instructions embedded in the paper text (Ye et al. 2024 attack methodology) raised DeepReviewer's overall rating by only 0.31 points (5.38→5.69) with *no adversarial training*, versus a 4.26-point jump for Gemini-2.0-Flash-Thinking (4.23→8.49) and 1.41 for DeepSeek-V3. The authors attribute this to the staged reasoning chain forcing engagement with intrinsic paper content (novelty grounding, evidence-checked weaknesses) rather than a single end-to-end judgment that an injected instruction can directly redirect.

**Test-time scaling**: two independent, instruction-controllable axes both show monotonic-ish gains — Reasoning Path Scaling (Fast→Standard→Best) raises Rating Spearman by 8.97% (0.326→0.355), and Reviewer Scaling (R=1→6) improves scoring tasks most, ranking next, and pairwise selection least, with variance around R≠4 attributed to training-distribution concentration near 4 simulated reviewers. Fast mode, at half CycleReviewer's output tokens, still outperforms it on most metrics — evidence the staged-chain training makes even the truncated inference path more information-dense per token, not just the full chain.

**Controlled-data and transfer checks**: when both systems are trained from the same ICLR 2024 source data, DeepReviewer-14B-2024 still improves Rating MSE from CycleReviewer-70B's 2.4870 to 1.4404 and leads most reported metrics, reducing—but not eliminating—training-corpus differences as an explanation. Appendix evaluations on 100 papers each from ACL, ICML, and CVPR 2024 also report that Gemini judges usually prefer DeepReviewer reviews to the tested baselines. These transfer results remain model-judge comparisons rather than independent expert review.

## Analyst Takeaways

1. **Decomposition is associated with adversarial resistance, but the mechanism is not isolated.** No adversarial samples were used in training, and the staged system shows much less rating inflation than the tested baselines. The authors attribute this to intermediate content analysis and reliability checks, but no ablation separates decomposition from the training data, base model, or fine-tuning recipe.
2. **Test-time scaling for a judge model has two genuinely separable axes**, not one: reasoning depth (more of the same chain) and ensemble width (more independent simulated perspectives aggregated). They compose and can be tuned independently per deployment cost budget.
3. **Synthesized-reasoning training data (rebuttal reconstruction, retrieval-grounded novelty reports, evidence-cited weakness statements) is itself a reusable recipe** for training small, cheap judge/evaluator models that outperform much larger general-purpose models on a narrow evaluative task — 14B beats 70B and several frontier closed models here.
4. Fits the same design lineage as PaperOrchestra's score-gated refinement and AgentReview simulation, but attacks the *reviewer* side rather than the *writer* side: this paper is effectively "how do you make the simulated reviewer itself reliable," which the writer-side systems in this KB currently treat as a given (an off-the-shelf simulated review call).

## Questions and Limitations

- The training data is entirely synthetic, generated by an automated pipeline (Qwen/Gemini) rather than human-authored reasoning chains; the authors acknowledge this may not capture the full nuance of genuine expert review despite grounding in real ICLR review outcomes.
- Best mode's live retrieval dependency (Semantic Scholar/OpenScholar) means novelty verification quality is bounded by search-API coverage and reranker quality, and adds external-service latency/cost not present in Fast/Standard modes.
- The adversarial-robustness result is against one attack methodology (Ye et al. 2024) and one metric (rating inflation); the paper itself flags room for improvement and suggests adversarial training as future work, so "resilient" should be read as "measurably more resilient than baselines here," not "robust."
- The robustness experiment does not ablate individual stages or compare the same model with and without decomposition, so it cannot establish that decomposition caused the observed resistance.
- Reviewer-count scaling shows non-monotonic variance away from R=4, a training-distribution artifact rather than a fundamental property of the scaling mechanism — worth checking before assuming higher R always helps.
- Training and primary evaluation use ICLR-style ML/AI submissions. Appendix transfer tests cover ACL, ICML, and CVPR papers, but remain within computing research and rely on Gemini judges rather than venue experts; generalization to other fields and review cultures is untested.

## Vault Ideas Extracted

* [Staged Evidence-Grounded Judgment](/vault/staged-evidence-grounded-judgment.md)
* [Dual-Axis Judge Test-Time Scaling](/vault/dual-axis-judge-test-time-scaling.md)
* [Decomposition-Induced Injection Resistance](/vault/decomposition-induced-injection-resistance.md)
