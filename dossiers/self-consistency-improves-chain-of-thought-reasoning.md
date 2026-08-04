---
type: Study Note
title: Self-Consistency Improves Chain of Thought Reasoning in Language Models
description: Study notes on the ICLR 2023 paper that replaces greedy chain-of-thought decoding with sampled reasoning paths and answer-level aggregation.
resource: https://arxiv.org/abs/2203.11171v4
source: /archive/self-consistency-improves-chain-of-thought-reasoning.pdf
tags: [chain-of-thought, reasoning, test-time-scaling]
timestamp: 2026-07-12T23:58:09Z
---

# Self-Consistency Improves Chain of Thought Reasoning in Language Models - Study Notes

**Authors**: Xuezhi Wang, Jason Wei, Dale Schuurmans, Quoc V. Le, Ed H. Chi, Sharan Narang, Aakanksha Chowdhery, Denny Zhou  
**Venue**: ICLR 2023; arXiv:2203.11171v4 [cs.CL]  
**Pages**: 24  

## What It Is

This paper introduces **self-consistency decoding** for chain-of-thought (CoT) prompting. Instead of greedily taking one reasoning trace, sample several diverse traces from one language model, extract each final answer, and select the answer with the most support. The authors frame this as marginalizing the latent reasoning paths rather than committing to one locally likely trajectory.

The method is inference-only: it uses no fine-tuning, verifier, additional human labels, or separate model ensemble. It is best understood as a single-model self-ensemble over generated solution paths.

## The Problem It Solves

Greedy CoT decoding picks the first high-probability trajectory, even when a small arithmetic, factual, or semantic error sends that trajectory to the wrong answer. A reasoning problem can have several valid routes to the same answer, so the paper hypothesizes that correct answers will recur across diverse traces more often than individual mistakes.

The important shift is from asking, “Which complete trace looks most likely?” to asking, “Which final answer remains supported after integrating over several plausible traces?” In the paper's experiments, raw sequence likelihood was a poor judge: unnormalized weighted voting underperformed simple answer-frequency voting, while length-normalized weighting was close to it.

## How It Works

1. Prompt a model with few-shot CoT examples, or another intermediate-reasoning format.
2. Sample `m` completions using a diversity-producing decoder such as temperature, top-k, or nucleus sampling.
3. Parse a final answer from every completion using a task-specific answer format.
4. Group traces by final answer and choose the answer with the largest count (or, in the paper's alternative, the greatest length-normalized probability mass).

For arithmetic tasks, the evaluation parses the first numeric item after `The answer is`; for commonsense tasks it parses the following string. That parser is part of the method, not an incidental implementation detail. The core vote assumes a bounded, comparable answer space; extending the idea to open-ended generation needs a defensible semantic-agreement or contradiction measure.

## Evaluation Setup

- **Models**: UL2-20B, GPT-3/Codex `code-davinci-001` and `code-davinci-002`, LaMDA-137B, and PaLM-540B.
- **Tasks**: arithmetic (AddSub, MultiArith, ASDiv, AQuA, SVAMP, GSM8K), commonsense (CommonsenseQA, StrategyQA, ARC), and symbolic last-letter and coin-flip tasks.
- **Prompting**: few-shot CoT; arithmetic tasks use eight hand-written exemplars, while commonsense tasks use four to seven examples.
- **Sampling**: main results average ten runs with 40 independently sampled outputs. UL2 and LaMDA use temperature 0.5 with top-k 40; PaLM uses temperature 0.7 and top-k 40; GPT-3 uses temperature 0.7 without top-k truncation.

The figures show that more sampled paths generally improved the reported benchmark accuracy, though the conclusion explicitly recommends trying 5 or 10 paths first because performance often saturates before 40.

## Results That Stood Out

All figures below are historical results for the paper's models, prompts, parsers, and benchmarks.

- On PaLM-540B, self-consistency raised GSM8K from 56.5% to 74.4% (+17.9 points), AQuA from 35.8% to 48.3% (+12.5), SVAMP from 79.0% to 86.6% (+7.6), and StrategyQA from 75.3% to 81.6% (+6.3).
- On `code-davinci-002`, it raised GSM8K from 60.1% to 78.0%, AQuA from 39.8% to 52.0%, and SVAMP from 75.8% to 86.8%.
- Improvements were larger on the paper's stronger models for many arithmetic tasks; UL2-20B gains were smaller, and the symbolic tasks showed little benefit at smaller scales.
- On PaLM-540B common NLP tasks where CoT sometimes regressed from standard prompting, self-consistency beat both reported baselines: for example, e-SNLI was 88.4% versus 85.8% standard prompting and 81.0% CoT.
- Against matched sample budgets, it outperformed sample-and-rank, beam search, prompt-order ensembles, and manually varied prompt ensembles. Beam search was less effective because it produced less-diverse paths.
- A GSM8K ablation found answer agreement correlated with accuracy. The paper treats low agreement as a potential uncertainty signal, not as a calibrated guarantee of correctness.

## What the Ablations Add

Self-consistency retained gains across temperature, top-k, and nucleus variants in the reported PaLM and LaMDA ablations. It also helped with deliberately corrupted CoT demonstrations: LaMDA-137B's GSM8K result rose from 14.9% with the imperfect prompt to 23.4% with 40 paths. It worked with equation-style intermediate representations, but less strongly than with natural-language paths, plausibly because shorter equations offered less room for useful diversity.

The zero-shot-CoT combination is consequential: on PaLM-540B GSM8K, the paper reports 43.0% for zero-shot CoT and 69.2% with self-consistency. This reinforces that the technique is a decoding and aggregation layer, rather than being tied only to manually authored few-shot rationales.

## Limitations and Questions

- **Cost and latency**: sampling 40 full traces multiplies inference work. The paper's practical advice to start with 5–10 paths is a tradeoff, not a universal optimum.
- **Correlated mistakes**: a frequent answer can still be consistently wrong when paths share a misconception, bias, prompt artifact, or retrieval failure. Agreement is useful evidence, not proof.
- **Parser and answer space dependence**: a fragile answer extractor, aliases, equivalent numeric forms, or genuinely open-ended outputs can split correct support or merge distinct answers.
- **Rationales remain unreliable**: the paper's own examples contain sampled paths with inaccurate supporting facts even when the final answer is correct. Voting does not ground the explanation.
- **Historical transfer**: the reported absolute scores and model-scale behavior concern UL2, GPT-3/Codex, LaMDA, and PaLM under 2022–2023 conditions. They should not be treated as present-day model guidance without local evaluation.

## Analyst Takeaways

1. **Make answer aggregation an explicit inference component.** For constrained-output reasoning, several cheap, diverse attempts plus an answer-level vote can be more useful than one polished-looking trace.
2. **Diversity is instrumental, not decorative.** Beam expansion or repeated near-identical samples will not supply the independent error patterns that a vote needs.
3. **Normalize before voting.** Production implementations need canonicalization for units, numerical tolerances, option labels, aliases, and malformed or abstaining answers; otherwise the vote measures formatting rather than reasoning.
4. **Use agreement as a routing signal.** High agreement can justify a low-risk answer path; low agreement should trigger abstention, tool use, retrieval, a verifier, or human review. Calibrate that policy on the deployment task.
5. **Evaluate the whole pipeline.** Prompt examples, decoder settings, path count, stopping rule, answer parser, aggregation, cost, and latency jointly determine whether self-consistency helps.

## Vault Ideas Extracted

* [Self-Consistency Decoding](/vault/self-consistency-decoding.md)
* [Chain-of-Thought Prompting](/vault/chain-of-thought-prompting.md)
